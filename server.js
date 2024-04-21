// Importación de módulos útiles
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const server = require('http').Server(app);
const io = require('socket.io')(server);

// Importación de módulos del proyecto
const products = require("./store");
const fabs = require("./fabs");
const shopping_cart = require("./shopping_cart");
const command_center = require('./command_center');

// Configuración inicial del servidor
app.use('/', express.static(path.join(__dirname, 'www')));
app.use('/client', express.static(path.join(__dirname, 'www', 'client')));

let clientSocket;
let pedido = false;
let tiempo = 0;

// Secuencia de eventos principal.
// Empieza cuando un usuario se conecta.
io.on('connection', (socket) => {
  console.log(`socket connected ${socket.id}`); 
  
  // Declaración de los distintos manejadores:
  // - Faboritos
  // - Carrito
  // - Panel Central
  let fabs_handler = fabs.fabs_handler;
  let shopping_cart_handler = shopping_cart.handler;
  let command_center_handler = command_center.handler;

  // Evento de inicio de conexión
  socket.on("CLIENT_CONNECTED", () => {
    clientSocket = socket;
    clientSocket.emit("ACK_CONNECTION");

  })

  //-----------Eventos de base de datos-------------

  // evento para pedir productos al servidor de un
  // determinado deporte.
  socket.on("getProdSport",function(sport){
    socket.emit("retProdSport",products.store.seekProds(sport));
  });

  // evento para pedir un producto de la base de datos con su nombre
  socket.on("getProd", function(name){ 
    let prod = products.store.locateProd(name);
    socket.emit("retProd",prod);
  });

  // evento de escritura de contenido a un archivo
  socket.on("writeDataFile",function(rute,data){
    fs.writeFileSync(rute,data,{flag: "w"});
    console.log("Escritura realizada con éxito");
  });

  // evento de carga de un archivo. Devuelve el contenido
  socket.on("loadDataFile",function(rute){
    fs.readFileSync(rute,(err,data) => {
      if (err) {console.log("Error de lectura ",rute);}
      else {socket.emit("retLoadDataFile",data);}
    });
    console.log("carga de datos realizada con éxito");
  });

  // evento que comprueba si un archivo existe
  socket.on("existFile",function(rute){
    socket.emit("retExistFile",fs.existsSync(rute));
  })

//-----------Eventos de gestor de favoritos-------------

  // cambiar de usuario
  socket.on("fabSwitchUser",function(user){
    fabs_handler.setUser(user);
    console.log("Usuario "+user+" cambiado fabs!!") 
  })

  // añadir un producto
  socket.on("fabAddProd",function(name){
    fabs_handler.addProd(name);
    console.log("Producto añadido en fabs!!");
    console.log("Usuario insertado: "+fabs_handler.user);
  })

  // quitar un producto
  socket.on("fabRemProd",function(name){
    fabs_handler.remProd(name);
    console.log("Producto eliminado de fabs!!");
  })

  // obtener los favoritos
  socket.on("fabsGet",function(){
    socket.emit("retFabsGet",fabs_handler.getFabs());
    console.log("Faboritos retornados");
  })

//-----------Eventos de Gestión de carrito-------------
  
  // Cambiar de usuario gestionado
  socket.on("shoppingCartSwitchUser",function(user){
    shopping_cart_handler.setUser(user);
    console.log("Usuario "+user+" cambiado carrito!!");
  })

  // Añadir un producto
  socket.on("shoppingCartAddProd",function(name){
    shopping_cart_handler.addProd(name);
    console.log("Producto añadido a carrito!!");
  })

  // Quitar un producto
  socket.on("shoppingCartRemProd",function(name){
    shopping_cart_handler.remProd(name);
    console.log("Producto eliminado de carrito!!");
  })

  // Obtener productos del carrito
  socket.on("shoppingCartGetProds",function(){
    socket.emit("retShoppingCartGetProds",shopping_cart_handler.getCart());
    console.log("Carrito retornado");
  })

  // Obtener usuario gestionado
  socket.on("shoppingCartGetUser", function(){
    socket.emit("retShoppingCartGetUser", shopping_cart_handler.getUser());
  })

//-----------Eventos de Gestión de carrito-------------

  // Empezar a monitorizar
  socket.on("centerStartMonitoring",function(){
    command_center_handler.startMonitoring();
    console.log("Servicio de monitorización activado!!");
    
  })

  // Parar la monitorización
  socket.on("centerStopMonitoring",function(){
    command_center_handler.stopMonitoring();
    console.log("Servicio de monitorización desactivado!!");
  })

  // Obtener los productos de faboritos
  socket.on("centerGetFabs",function(){
    command_center_handler.getFabProds(); 
    socket.emit("retCenterGetFabs",command_center_handler.list_fab_prods);
  })
  
  // Obtener los productos del carrito
  socket.on("centerGetCart",function(){
    command_center_handler.getCartProds(); 
    socket.emit("retCenterGetCart",command_center_handler.list_cart_prods);
  })

  // Obtener el usuario gestionado por faboritos
  socket.on("centerGetFabUsers",function(){
    socket.emit("retCenterGetFabUsers", command_center_handler.getFabUsers());
  })

  // Obtener el usuario gestionado por el carrito
  socket.on("centerGetCartUsers",function(){
    socket.emit("retCenterGetCartUsers", command_center_handler.getCartUsers()); 
  })

  socket.on("RequestConf", function(part){
    if (part == "start"){
      pedido = true;
      tiempo = new Date();
    }
    else if (part == "end"){
      pedido = false;
      tiempo = 0;
    }
  })

  socket.on("GetDataPedido", function(){
    let lista = [pedido, tiempo];
    return lista;
  })
});

// Función de escucha del servidor en el puerto 3000
server.listen(3000, () => {
  console.log("Server listening...");
});
