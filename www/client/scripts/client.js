const socket = io();
let sesion;
let global_user = "";
window.onload = checkUser();
alert(sesion);

//-----SECCIÓN BÚSQUEDA-MENÚS---------------
function logged(principal){
    if (sesion == 0){
          if (principal){
            window.location.href = "./client/client_login.html";
          } else {
            window.location.href = "./client_login.html"; 
          }
    } else{
        if (principal){
          window.location.href = "./client/client_user_profile.html";
        } else {
          window.location.href = "./client_user_profile.html";
        }

    }
}

function chart_in(principal){
  alert(sesion);
    if (sesion == 0){
          if (principal){
            window.location.href = "./client/client_login.html";
          } else {
            window.location.href = "./client_login.html"; 
          }
    } else{
        if (principal){
          window.location.href = "./client/client_carrito.html";
        } else {
          window.location.href = "./client_carrito.html";
        }
    } 
  }


//-----SECCIÓN INICIO DE SESIÓN-----------------------------------

function setUser(){
    let user = document.querySelector("#init_user").value; 
    global_user = user;   
    sesion = 1;

    // mandar al servicio de faboritos que se cree el usuario en favoritos
    if (checkUser() === true){
      socket.emit("fabSwitchUser",global_user);
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

