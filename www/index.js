const socket = io();

//-----SECCIÓN BÚSQUEDA-MENÚS---------------
let sesion = 0;
function logged(){
    alert(sesion);
    if (sesion == 0){
          window.location.href = "./client/client_login.html";
        }
        else{
          window.location.href = "./client/client_user_profile.html";
        }
}



socket.on("connect", () => {
  socket.emit("CLIENT_CONNECTED", { id: 1 });

  socket.on("ACK_CONNECTION", () => {
    console.log("ACK");
  });


});