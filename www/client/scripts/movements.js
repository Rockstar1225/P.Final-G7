//Movimiento basado en ángulos. En caso de desequilibrio reiniciar la página.
let angulo_actual;
let touch_time = false;

function movimientos(event){
    angulo_actual = {alpha: event.alpha, beta: event.beta, gamma: event.gamma};
    if (angulo_actual.beta >= 110){ //Hacia atras
        window.location.href = "./index.html";
    }
    if (angulo_actual.beta <= 50){ //Hacia delante
        chart_in();
    }

    if (angulo_actual.gamma <= -50){ // Izquierda
        logged();
    }
    if (angulo_actual.gamma >= 50){ // Derecha
        alert("Por motivos de dificultad de ajuste entre movimientos y voz, este movimiento no estará disponible hasta la siguiente actualización. Lamentamos las molestias.")
        window.location.href = "./client_busqueda.html";
    }
    
}

let boton = document.getElementById("movement"); //Los movimientos solo cuando se pulsa el botón
boton.addEventListener("touchstart", function(){
    touch_time = true;
});

boton.addEventListener("touchend", function(){
    touch_time = false;
});

//Evento que activa los movimientos solo si el botón esta pulsado.
window.addEventListener("deviceorientationabsolute", function(event){
    if(touch_time){
        movimientos(event);
    }
});
