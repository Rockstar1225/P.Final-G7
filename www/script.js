/*document.querySelector('button').addEventListener('click', async function(ev){ 
  const response = await fetch("/api/data/get");
  const data = await response.json();
  console.log(data);
});
*/

const socket = io();

document.querySelector("button").addEventListener("click",function(e){
    socket.emit("mes",{msg: "hola que tal"});
});

socket.on("mes",function(mes){
    console.log("respuesta del servidor: "+mes);
});