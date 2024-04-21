let socket = io("http://localhost:3000");
let sesion;
let shopping_cart;
getUser();


//-----MENÚS AFECTADOS POR EL INICIO DE SESIÓN (Si la variable sesion es 0 mandan al loggin).---------------
function logged(){
    if (sesion == 0){ 
        window.location.href = "./client_login.html"; 
    } else{
        window.location.href = "./client_user_profile.html";
    }
}

function chart_in(){
    if (sesion == 0){
        window.location.href = "./client_login.html"; 
    } else{
        window.location.href = "./client_carrito.html";
    } 
  }


//-----FUNCIONES PARA ACTIVAR EL USUARIO----------------------------

function setUser(){
    let user = document.querySelector("#init_user").value; 
    sesion = 1; // mandar al servicio de faboritos que se cree el usuario en favoritos
    console.log("User local: "+user);
    socket.emit("fabSwitchUser",user);
    socket.emit("shoppingCartSwitchUser",user);
    alert("Inicio de sesión realizado");
    window.location.href="./index.html"
}

function getUser(){
  socket.emit('shoppingCartGetUser');
  socket.on('retShoppingCartGetUser',(resultado) =>{
    console.log(resultado);
      if (resultado != ""){
        sesion = 1;
      }
      else{ sesion = 0;}
  });

}



//-----SECCIÓN AJUSTES DE USUARIO/ FILTROS DE BÚSQUEDA------------
function init_settings(){
  document.getElementById("user_settings").style.display = "none";
  document.getElementById("user_open").style.transform = "none";
  document.getElementById("not_settings").style.display = "none";
  document.getElementById("not_open").style.transform = "none";
  document.getElementById("fav_settings").style.display = "none";
  document.getElementById("fav_open").style.transform = "none";
}

function init_filt(){
  document.getElementById("filt").style.display = "none";
  document.getElementById("b_filt").style.transform = "none";
}


function settingsCat(id){
    let bot = document.getElementById(id);
    let submenu;
    if (id == "user_open"){
        submenu = document.getElementById("user_settings");
    }
    if (id == "not_open"){
        submenu = document.getElementById("not_settings");
    }
    if (id == "fav_open"){
        submenu = document.getElementById("fav_settings");
    }
    if (id== "b_filt"){
      submenu = document.getElementById("filt");
    }
    let rotation = bot.style.transform;
    if (rotation == "none"){
        submenu.style.display = "block";
        bot.style.transform = 'rotate(90deg)';
    }
    else{
        submenu.style.display = "none";
        bot.style.transform = 'none';
        
    }
}



function acceptPedido(){
  if (sesion == 0){
    alert("No hay usuario indicado");
  }
  socket.emit("shoppingCartGetProds");
  socket.on('retShoppingCartGetProds', (resultado) => {
    shopping_cart = resultado;
    if (shopping_cart.cart.length == 0){
      alert("No hay productos");
    }
});
  window.location.href="./aceptar_pago.html";
}

