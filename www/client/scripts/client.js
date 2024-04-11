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


//-----SECCIÓN AJUSTES DE USUARIO------------
document.getElementById("user_settings").style.display = "none";
document.getElementById("user_open").style.transform = "none";
document.getElementById("not_settings").style.display = "none";
document.getElementById("not_open").style.transform = "none";


function settingsCat(id){
    let bot = document.getElementById(id);
    let submenu;
    if (id == "user_open"){
        submenu = document.getElementById("user_settings");
    }
    if (id == "not_open"){
        submenu = document.getElementById("not_settings");
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
