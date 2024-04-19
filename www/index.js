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

// Genera el contenido de las tablas de productos y faboritos
// dada una lista de productos y un id
function generateContent(list,id){

    let div = document.getElementById(id);
    let tabla = document.createElement("table");
    let tabl_body = document.createElement("tbody"); 
    let products_fields = ["name","quantity","sport","price","desc"];
    let header_elems = ["Username","Product Name","Max Quantity","Sport","Price","Desc"];
    
    //Títulos de tabla
    let header = document.createElement("tr");
    for (let i = 0; i < 6; i++) {
      let node = document.createTextNode(header_elems[i]);
      let celda = document.createElement("td");
      celda.appendChild(node);
      header.appendChild(celda);
    }
    header.style.backgroundColor = "#31BE3F";
    tabl_body.appendChild(header);

    // Productos de la misma
    for (let i =0;i<list.length;i+=1){

      let hilera = document.createElement("tr");
      let celdaUser = document.createElement("td"); 
      //console.log("Producto: "+list[i]["user"]);
      let textoUser = document.createTextNode(list[i]["user"]);
      celdaUser.appendChild(textoUser); 
      hilera.appendChild(celdaUser); 
          
      for (const etiqueta of products_fields){
        let celdaProd = document.createElement("td");
        celdaProd.appendChild(document.createTextNode(list[i]["prod"][etiqueta]));
        hilera.appendChild(celdaProd);
      } 

      tabl_body.appendChild(hilera);
    }

  tabla.appendChild(tabl_body);
  div.innerHTML = "";
  div.appendChild(tabla);
  tabla.setAttribute("border","2");
}

// Genera las tablas dinámicamente
// dependiendo del tipo que sean
function generateTable(id,content){ 

  if (content === "fabs"){
    socket.emit("centerGetFabs");
    socket.on("retCenterGetFabs",function(list){
        generateContent(list,id);
    }) 

  } else if (content === "cart"){
    socket.emit("centerGetCart");
    socket.on("retCenterGetCart",function(list){
      generateContent(list,id);
    })

  } else if (content === "users"){
    socket.emit("centerGetFabUsers");
    socket.on("retCenterGetFabUsers",function(dataFab){
      
      socket.emit("centerGetCartUsers");
      socket.on("retCenterGetCartUsers",function(dataCart){

        let users = dataFab.concat(dataCart);
        let users_dup = [];
        users.forEach(element => {
          if ( !users_dup.includes(element)){
            users_dup.push(element);
          }
        });

        let div = document.getElementById(id);
        let tabla = document.createElement("table");
        let tabl_body = document.createElement("tbody");
        
        // Título de la tabla
        let header = document.createElement("tr");
        let node = document.createTextNode("Username");
        let celda = document.createElement("td");
        celda.appendChild(node);
        header.appendChild(celda); 
        header.style.backgroundColor = "#31BE3F";
        tabl_body.appendChild(header);

        // Productos en sí
        for (let i =0;i<users_dup.length;i+=1){
          let hilera = document.createElement("tr"); 
          let celda = document.createElement("td");
          let textoCelda = document.createTextNode(users_dup[i]);
          celda.appendChild(textoCelda);
          hilera.appendChild(celda); 
          tabl_body.appendChild(hilera);
        }

        tabla.appendChild(tabl_body);
        div.innerHTML = "";
        div.appendChild(tabla);
        tabla.setAttribute("border","2");

      });
    }); 

  }
}

// Función para iniciar el servicio de 
// actualización de la interfaz.
function initUpdateService(){
  socket.emit("centerStartMonitoring");
  intervalMonitor = setInterval(() => {
    generateTable("fabs_table","fabs");
    generateTable("prods_table","cart");
    generateTable("users_table","users");
    console.log("Display actualizado");
  },3000);
}



