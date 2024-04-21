let angulo_actual;
let touch_time = false;

function movimientos(event){
    angulo_actual = {alpha: event.alpha, beta: event.beta, gamma: event.gamma};
    if (angulo_actual.beta >= 110){
        window.location.href = "./index.html";
    }
    if (angulo_actual.beta <= 50){
        chart_in();
    }

    if (angulo_actual.gamma <= -50){
        logged();
    }
    if (angulo_actual.gamma >= 50){
        window.location.href = "./client_busqueda.html";
    }
    
}

let boton = document.getElementById("movement");
boton.addEventListener("touchstart", function(){
    touch_time = true;
});

boton.addEventListener("touchend", function(){
    touch_time = false;
});

window.addEventListener("deviceorientationabsolute", function(event){
    if(touch_time){
        movimientos(event);
    }
});
