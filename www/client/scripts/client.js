let socket = io("http://localhost:3000");
let sesion; //Si es 1, hay un inicio de sesión. Si es 0, hace falta un login
let shopping_cart;
getUser();


//-----MENÚS AFECTADOS POR EL INICIO DE SESIÓN (Si la variable sesion es 0 mandan al loggin).---------------
function logged(){ //Perfil
    if (sesion == 0){ 
        window.location.href = "./client_login.html"; 
    } else{
        window.location.href = "./client_user_profile.html";
    }
}

function chart_in(){//Carrito
    if (sesion == 0){
        window.location.href = "./client_login.html"; 
    } else{
        window.location.href = "./client_carrito.html";
    } 
  }


//-----FUNCIONES PARA GESTIÓN DE USUARIO (set -> lo activa) (get-> lo recoge)----------------------------

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
//Para los filtros y ajustes escondidos. Aquí se configuran sus posiciones y los botones > que las cambian
function init_settings(){ //Posicion inicial de los ajustes de perfil
  document.getElementById("user_settings").style.display = "none";
  document.getElementById("user_open").style.transform = "none";
  document.getElementById("not_settings").style.display = "none";
  document.getElementById("not_open").style.transform = "none";
  document.getElementById("fav_settings").style.display = "none";
  document.getElementById("fav_open").style.transform = "none";
}

function init_filt(){//Posicion inicial filtros de búsqueda
  document.getElementById("filt").style.display = "none";
  document.getElementById("b_filt").style.transform = "none";
}


function settingsCat(id){ //Con el id de la sección cambiaas su poción y la de su botón correspondiente
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


//--SECCIÓN ACEPTAR EL PEDIDO DESDE EL CARRITO
function acceptPedido(){ //Si hay usuario y productos, da inicio a la compra.
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

