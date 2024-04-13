const socket = io();


//------------Eventos de conexión------------------
socket.on("connect", () => {
  socket.emit("CLIENT_CONNECTED", { id: 1 });

  socket.on("ACK_CONNECTION", () => {
    console.log("ACK");
  });
});

//-----------Eventos de base de datos-------------
const products = database("./store.json");

// evento para pedir productos al servidor de un
// determinado deporte.
socket.on("getProdSport",function(sport){
  socket.emit("retProdSport",products.seekProds(sport));
})

// evento para pedir un producto de la base de datos con su nombre
socket.on("getProd", function(name){
  socket.emit("retProd",products.locateProd(name));
})
