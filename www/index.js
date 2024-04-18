const socket = io();


//------------Eventos de conexión------------------
socket.on("connect", () => {
  socket.emit("CLIENT_CONNECTED", { id: 1 });

  socket.on("ACK_CONNECTION", () => {
    console.log("ACK");
  });
});

let intervalMonitor;
function startMonitoring(){
  socket.emit("centerStartMonitoring");
}

function stopMonitoring(){
  socket.emit("centerStopMonitoring");
}

function changeState(state){
  let fabs_div = document.getElementById("fabs_table");
  let cart_div = document.getElementById("prods_table");
  let users_div = document.getElementById("users_table");
  
  if (state === 1){
    fabs_div.style.display = "block";
    cart_div.style.display = "none";
    users_div.style.display = "none";
  } else if (state === 2){
    fabs_div.style.display = "none";
    cart_div.style.display = "block";
    users_div.style.display = "none";
  } else if (state === 3){
    fabs_div.style.display = "none";
    cart_div.style.display = "none";
    users_div.style.display = "block";
  } else {
    console.log("Estado no reconocido!!");
  }
}

function generateTable(id,content){
  let div = document.getElementById(id); 
  let fabs_prods = [];
  let cart_prods = [];
  let users = [];
  let tabla = document.createElement("table");
  let tabl_body = document.createElement("tbody"); 
  let products_fields = ["name","quantity","sport","price","desc"];

  if (content === "fabs"){
    socket.emit("centerGetFabProds");
    socket.on("retCenterGetFabProds",function(list){
        for (const prod of list) {
          fabs_prods.push(prod);
        }
    })
    
    for (let i =0;i<fabs_prods.length;i+=1){
      let hilera = document.createElement("tr");

      for (let j=0;j<products_fields.length;j+=1){
        let celda = document.createElement("td");
        let textoCelda = document.createTextNode(fabs_prods[i][products_fields[j]]);
        celda.appendChild(textoCelda);
        hilera.appendChild(celda);
      }
      tabl_body.appendChild(hilera);
    }
    tabla.appendChild(tabl_body);
    div.innerHTML = "";
    div.appendChild(tabla);
    tabla.setAttribute("border","2");

  } else if (content === "cart"){
    socket.emit("centerGetCartProds");
    socket.on("retCenterGetCartProds",function(list){
        for (const prod of list) {
          cart_prods.push(prod);
        }
    })

    for (let i =0;i<cart_prods.length;i+=1){
      let hilera = document.createElement("tr");

      for (let j=0;j<products_fields.length;j+=1){
        let celda = document.createElement("td");
        let textoCelda = document.createTextNode(cart_prods[i][products_fields[j]]);
        celda.appendChild(textoCelda);
        hilera.appendChild(celda);
      }
      tabl_body.appendChild(hilera);
    }
    tabla.appendChild(tabl_body);
    div.innerHTML = "";
    div.appendChild(tabla);
    tabla.setAttribute("border","2");

  } else if (content === "users"){
    socket.emit("centerGetFabUsers");
    socket.on("retCenterGetFabUsers",function(data){
      for (const user of data) {
        users.push(user);
      }
    });

    socket.emit("centerGetCartProds");
    socket.on("retCenterGetCartProds",function(data){
      for (const user of data) {
        users.push(user);
      }
    });
    console.log("Usuarios: "+users); 
    for (let i =0;i<users.length;i+=1){
      let hilera = document.createElement("tr");
      
      let celda = document.createElement("td");
      let textoCelda = document.createTextNode(users[i][products_fields[j]]);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda); 
      tabl_body.appendChild(hilera);
    }
    tabla.appendChild(tabl_body);
    div.innerHTML = "";
    div.appendChild(tabla);
    tabla.setAttribute("border","2");

  }
}

function initUpdateService(){
  socket.emit("centerStartMonitoring");
  intervalMonitor = setInterval(() => {
    generateTable("fabs_table","fabs");
    generateTable("prods_table","cart");
    generateTable("users_table","users");
    console.log("Display actualizado");
  },3000);
}

function stopUpdateService(){
  clearInterval(intervalMonitor);
}



