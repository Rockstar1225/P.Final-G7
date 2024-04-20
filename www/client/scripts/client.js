const socket = io();
let sesion;
let global_user = "";
window.onload = checkUser();

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
      socket.emit("fabSwitchUser",global_user);
      socket.emit("shoppingCartSwitchUser",global_user);
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

// parte de deporte
// Listen for the 'seekProds' event on the socket
socket.on('retProdSport', (data) => {
  console.log(`Received seekProds event with data: ${data}`);
  // Change window location with query parameters
  console.log(data);
  window.location.href = `/client/client_busqueda.html?data=${JSON.stringify(data)}`;
 
});

// Function to emit the 'seekProds' event with the provided category
function get_products_by_category(category) {
  console.log(category);
  socket.emit('getProdSport', category);
}

// On the client_busqueda.html page
function load_sports() {
  // Extract data from query parameters
  const urlParams = new URLSearchParams(window.location.search);
  const dataString = urlParams.get('data');
  const data = JSON.parse(dataString);

  // Use the extracted data
  let parent_div = document.getElementById("result_list");
  data.forEach(element => {
    let product = document.createElement("p");
    product.innerHTML = `nombre: ${element.name}. Deporte: ${element.sport}.
        Descripcion: ${element.desc} Precio: ${element.price}€.`
    parent_div.appendChild(product);
  });
  history.replaceState({}, document.title, "/client/client_busqueda.html");
}