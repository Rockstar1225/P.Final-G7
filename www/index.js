const socket = io();


//------------Eventos de conexión------------------
socket.on("connect", () => {
  socket.emit("CLIENT_CONNECTED", { id: 1 });

  socket.on("ACK_CONNECTION", () => {
    console.log("ACK");
  });
});
//------------------------------------------------


// declaración local de intervalo de monitorización
let intervalMonitor;

// Función para empezar a monitorear los productos
function startMonitoring(){
  socket.emit("centerStartMonitoring");
}

// Función que dicta el cambio de pestaña entre
// - Faboritos
// - Carrito
// - Lista de usuarios
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

    // Obtención de los elementos principales del HTML
    // y creación de los nuevos dinámicamente.
    let div = document.getElementById(id);
    let tabla = document.createElement("table");
    let tabl_body = document.createElement("tbody"); 
    let products_fields = ["name","quantity","sport","price","desc"];
    let header_elems = ["Username","Product Name","Max Quantity","Sport","Price","Desc"];
    
    // Generar la cabecera de la tabl
    let header = document.createElement("tr");
    for (let i = 0; i < 6; i++) {
      let node = document.createTextNode(header_elems[i]);
      let celda = document.createElement("td");
      celda.appendChild(node);
      header.appendChild(celda);
    }

    // Dar estilo a la cabecera
    header.style.backgroundColor = "#31BE3F";
    tabl_body.appendChild(header);

    // Rellenar el contenido de la tabla
    for (let i =0;i<list.length;i+=1){
      
      // Creación de las filas y celdas contenedoras
      let hilera = document.createElement("tr");
      let celdaUser = document.createElement("td"); 
      let textoUser = document.createTextNode(list[i]["user"]);
      celdaUser.appendChild(textoUser); 
      hilera.appendChild(celdaUser); 
          
      // Asignación dinámica de los valores a las celdas
      for (const etiqueta of products_fields){
        let celdaProd = document.createElement("td");
        celdaProd.appendChild(document.createTextNode(list[i]["prod"][etiqueta]));
        hilera.appendChild(celdaProd);
      } 

      // Agregar la hilera al cuerpo de la tabla
      tabl_body.appendChild(hilera);
    }
  
  // Mostrar y estilar la tabla
  tabla.appendChild(tabl_body);
  div.innerHTML = "";
  div.appendChild(tabla);
  tabla.setAttribute("border","2");
}

// Genera las tablas dinámicamente
// dependiendo del tipo que sean
function generateTable(id,content){ 

  // Caso de tabla para la pestaña de faboritos
  if (content === "fabs"){
    socket.emit("centerGetFabs");
    socket.on("retCenterGetFabs",function(list){
        generateContent(list,id);
    }) 

  // Caso para la de los productos del carrito
  } else if (content === "cart"){
    socket.emit("centerGetCart");
    socket.on("retCenterGetCart",function(list){
      generateContent(list,id);
    })

  // Caso para la pestaña de usuarios
  } else if (content === "users"){
    socket.emit("centerGetFabUsers");
    socket.on("retCenterGetFabUsers",function(dataFab){
      
      socket.emit("centerGetCartUsers");
      socket.on("retCenterGetCartUsers",function(dataCart){
        
        // concatenación y eliminación de duplicados de nombres
        let users = dataFab.concat(dataCart);
        let users_dup = [];
        users.forEach(element => {
          if ( !users_dup.includes(element)){
            users_dup.push(element);
          }
        });

        // Creación de los elementos principales
        let div = document.getElementById(id);
        let tabla = document.createElement("table");
        let tabl_body = document.createElement("tbody");
        
        // Creación del header de la tabla
        let header = document.createElement("tr");
        let node = document.createTextNode("Username");
        let celda = document.createElement("td");
        
        // Estilizado de la tabla e inserción de su contenido
        celda.appendChild(node);
        header.appendChild(celda); 
        header.style.backgroundColor = "#31BE3F";
        tabl_body.appendChild(header);

        // Creación del contenido principal de la tabla
        // con todos los usuarios.
        for (let i =0;i<users_dup.length;i+=1){
          let hilera = document.createElement("tr"); 
          let celda = document.createElement("td");
          let textoCelda = document.createTextNode(users_dup[i]);
          celda.appendChild(textoCelda);
          hilera.appendChild(celda); 
          tabl_body.appendChild(hilera);
        }

        // Display de la tabla
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



