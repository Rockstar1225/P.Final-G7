let socket = io();
let sesion;
let global_user = "";
let shopping_cart;
window.onload = getUser();

//-----SECCIÓN BÚSQUEDA-MENÚS---------------
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


//-----SECCIÓN INICIO DE SESIÓN-----------------------------------

function setUser(){
    let user = document.querySelector("#init_user").value; 
    global_user = user;   
    sesion = 1;

    // mandar al servicio de faboritos que se cree el usuario en favoritos
    if (checkUser() === true){
      console.log("User local: "+global_user);
      socket.emit("fabSwitchUser",global_user);
      socket.emit("shoppingCartSwitchUser",global_user);
      socket.emit("shoppingCartGetProds", shopping_cart);
      window.location.href = "./index.html";
    } else {
      console.log("Usuario Inválido!!");
    } 
    
}

function checkUser(){
  if (global_user != ""){
    sesion = 1;
    return true;
  }
  else{
    sesion = 0;
    return false;
  }
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

function getUser(){
  if (checkUser()){
    socket.emit("shoppingCartGetUser", global_user);
    socket.emit("shoppingCartGetProds", shopping_cart);
  }
}

function acceptPedido(){
  if (global_user == ""){
    alert("No hay usuario indicado");
  }
  if (shopping_cart.cart.length == 0){
    alert("No hay productos");
  }
  socket.emit("RequestConf", "start");
  alert("Pedido enviado.");
  let proceso = true;
  while(proceso){
    let lista;
    socket.emit("GetDataPedido", lista);
    if (lista[0] != true){
      alert("Error al configurar el pedido. Abort");
      socket.emit("RequestConf", "end");
      proceso = false;
    }
    else {
      let t_actual = new Date();
      if (t_actual.getSeconds() - lista[1].getSeconds() >= 120){
        alert("Pedido alcanzado");
        socket.emit("RequestConf", "end");
        let longitud = shopping_cart.cart.length;
        for (let i = 0; i < longitud; i++){}

      }
    }
  }

}
function updatetableFabs(){}
function showCart(){
}
function updateUser(){

}

