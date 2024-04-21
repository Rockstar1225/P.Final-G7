let angulo_inicial = {alpha: 0, beta: 90, gamma: 0};
let angulo_actual;
let touch_time = false;

function movimientos(event){
    angulo_actual = {alpha: event.alpha, beta: event.beta, gamma: event.gamma};
    console.log(angulo_actual.beta, angulo_actual.gamma, angulo_actual.alpha);
    if (angulo_actual.gamma <= -45){
        alert("op2");
        chart_in();
    }
    if (angulo_actual.beta <= 45){
        alert("op1");
        logged();
    }
    if (angulo_actual.gamma >= 45){
        alert("op3");
        window.location.href = "./client_busqueda.html";
    }
    /*else if (dif_angulo_x > 45 && dif_angulo_y > 45 && Math.abs(dif_angulo_z) < 10){
        console.log(dif_angulo_x, dif_angulo_y, dif_angulo_z);
        alert("op2");
        chart_in();
    }
    else if (dif_angulo_x < -45 && dif_angulo_y < -45 && Math.abs(dif_angulo_z) < 10){
        console.log(dif_angulo_x, dif_angulo_y, dif_angulo_z);
        alert("op3");
        window.location.href = "./client_busqueda.html";
    }*/
    
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
