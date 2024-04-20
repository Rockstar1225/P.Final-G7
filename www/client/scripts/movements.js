let angulo_inicial = {alpha: 0, beta: 0, gamma: 0};
let angulo_actual;
let touch_time = false;

function movimientos(event){
    angulo_actual = {alpha: event.alpha, beta: event.beta, gamma: event.gamma};
    
    if (angulo_inicial.alpha === 0){
        angulo_inicial = angulo_actual;
        return;
    }
    
    let dif_angulo_y = angulo_actual.gamma - angulo_inicial.gamma;
    let dif_angulo_z = angulo_actual.alpha - angulo_inicial.alpha;
    let dif_angulo_x = angulo_actual.beta - angulo_inicial.beta;
    console.log(dif_angulo_x, dif_angulo_y, dif_angulo_z);
    
    if (dif_angulo_y < -45){
        alert("op1");
        logged();
    }
    else if (dif_angulo_x > 45){
        alert("op2");
        chart_in();
    }
    else if (dif_angulo_y < -45 && Math.abs(dif_angulo_x) < 10){
        alert("op3");
        window.location.href = "./client_busqueda.html";
    }
    
    angulo_inicial = angulo_actual;
}

let boton = document.getElementById("movement");
boton.addEventListener("touchstart", function(){
    touch_time = true;
});

boton.addEventListener("touchend", function(){
    touch_time = false;
});

window.addEventListener("deviceorientation", function(event){
    if(touch_time){
        movimientos(event);
    }
});
