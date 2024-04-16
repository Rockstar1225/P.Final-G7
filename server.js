const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const server = require('http').Server(app);
const io = require('socket.io')(server);

const products = require("./store");
const fabs = require("./fabs");
const shopping_cart = require("./shopping_cart");

app.use('/', express.static(path.join(__dirname, 'www')));
app.use('/client', express.static(path.join(__dirname, 'www', 'client')));

let clientSocket;

io.on('connection', (socket) => {
  console.log(`socket connected ${socket.id}`); 
  let fabs_handler = fabs.fabs_handler;
  let shopping_cart_handler = shopping_cart.handler;

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

  socket.on("writeDataFile",function(rute,data){
    fs.writeFileSync(rute,data,{flag: "w"});
    console.log("Escritura realizada con éxito");
  });

  socket.on("loadDataFile",function(rute){
    fs.readFileSync(rute,(err,data) => {
      if (err) {console.log("Error de lectura ",rute);}
      else {socket.emit("retLoadDataFile",data);}
    });
    console.log("carga de datos realizada con éxito");
  });

  socket.on("existFile",function(rute){
    socket.emit("retExistFile",fs.existsSync(rute));
  })

  // eventos para los faboritos de cada usuario
  socket.on("fabSwitchUser",function(user){
    fabs_handler.setUser(user);
    console.log("Usuario "+user+" cambiado fabs!!") 
  })

  socket.on("fabAddProd",function(name){
    fabs_handler.addProd(name);
    console.log("Producto añadido en fabs!!");
  })

  socket.on("fabRemProd",function(name){
    fabs_handler.remProd(name);
    console.log("Producto eliminado de fabs!!");
  })
  socket.on("fabsGet",function(){
    socket.emit("retFabsGet",fabs_handler.getFabs());
    console.log("Faboritos retornados");
  })

  // eventos para la gestión de carritos de la compra
  socket.on("shoppingCartSwitchUser",function(user){
    shopping_cart_handler.setUser(user);
    console.log("Usuario "+user+" cambiado carrito!!");
    
  })

  socket.on("shoppingCartAddProd",function(name){
    shopping_cart_handler.addProd(name);
    console.log("Producto añadido a carrito!!");
  })

  socket.on("shoppingCartRemProd",function(name){
    shopping_cart_handler.remProd(name);
    console.log("Producto eliminado de carrito!!");
  })
  socket.on("shoppingCartGet",function(){
    socket.emit("retFabsGet",shopping_cart_handler.getCart());
    console.log("Carrito retornado");
  })

});
server.listen(3000, () => {
  console.log("Server listening...");
});
