let socket = io();
let angulo_actual;
document.getElementById("acept_p").style.display = "block";
document.getElementById("aceptado").style.display = "none";
let paso1 = true;
window.addEventListener("deviceorientationabsolute", function(event){  mov_ending(event);}); // Caso con movimietno lateral


function decision(){ //Boton dentro del div acept_p
    let respuesta = document.getElementById("resp_not_mov").value;
    if (respuesta == "S"){
        endPedido();
    }
    else if (respuesta == "N"){
        window.location.href = "./client_carrito.html"; 
    }
    else{
        alert("Vuelva a leer las normas del input, por favor.")
    }
    
}

function endPedido(){ //Termina el pedido
    socket.emit("shoppingCartGetProds");
    socket.on('retShoppingCartGetProds', (resultado) => {
      let longitud = resultado.cart.length;
      for(let i = 0; i < longitud; i++){
        socket.emit("shoppingCartRemProd", shopping_cart.cart[i].name);
      }
  });
  document.getElementById("acept_p").style.display = "none";
  document.getElementById("aceptado").style.display = "block";
  paso1 = false;
  }

  function backtoMenu(){ //Devuelve al usuario al menu
    window.location.href="./index.html";
}

  function mov_ending(event){ //Para alcanzar las dos funciones anteriores moviendo el móvil
    angulo_actual = {alpha: event.alpha, beta: event.beta, gamma: event.gamma};
    console.log(angulo_actual.gamma);
    if(paso1){ //endPedido
        if (angulo_actual.gamma <= -60){ window.location.href = "./client_carrito.html"; }
        if (angulo_actual.gamma >= 60){ endPedido();}
    }
    else{
        if (angulo_actual.gamma <= -60){ backtoMenu();} //backtoMenu
    }
  }
