let socket = io();
let angulo_actual;
document.getElementById("acept_p").style.display = "block";
document.getElementById("aceptado").style.display = "none";
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
  vibration();
  }

  function backtoMenu(){ //Devuelve al usuario al menu
    window.navigator.vibrate(0);
    window.location.href="./index.html";
}

  function mov_ending(event){ //Para alcanzar las dos funciones anteriores moviendo el móvil
    angulo_actual = {alpha: event.alpha, beta: event.beta, gamma: event.gamma};
    console.log(angulo_actual.gamma);
    if(document.getElementById("acept_p").style.display == "none"){ //endPedido
        if (angulo_actual.gamma <= -50){ window.location.href = "./client_carrito.html"; }
        if (angulo_actual.gamma >= 50){ endPedido();}
    }
    else{
        if (Math.abs(angulo_actual.gamma) >= 50){ backtoMenu();} //backtoMenu
    }
  }

  function vibration(){ //Patrón de vibración para alertar al usuario del pago realizado
    window.navigator.vibrate([200, 100, 200]);
    let t1 = new Date();
    let t2 = new Date();
    while (t2.getSeconds() - t1.getSeconds() < 20){ t2 = new Date(); }
    window.navigator.vibrate(0);
  }
  