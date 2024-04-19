let posicion_inicial;
let velocidad_inicial;
let posicion_actual;
let velocidad_actual;
let aceleracion = null;
let tiempo = null;
let angulo_inicial;
let angulo_actual;
let mov_time = false;



function inicio(event){
    posicion_inicial = {x: 0, y: 0, z: 0};
    velocidad_inicial = {x: 0, y: 0, z: 0};
    angulo_inicial = {alpha: event.alpha, beta: event.beta, gamma: event.gamma};
    console.log(angulo_inicial.alpha, angulo_inicial.beta, angulo_inicial.gamma);
    console.log(posicion_inicial.x, posicion_inicial.y, posicion_inicial.z);
    window.removeEventListener("deviceorientation", inicio);
}

function movimientos(event){
    if (aceleracion == null || tiempo == null) {
        return;
    }
    angulo_actual = {alpha: event.alpha, beta: event.beta, gamma: event.gamma};

    velocidad_actual = {
        x: aceleracion.x * tiempo + velocidad_inicial.x,
        y: aceleracion.y * tiempo + velocidad_inicial.y,
        z: aceleracion.z * tiempo + velocidad_inicial.z
    };

    posicion_actual = {
        x: 0.5 * aceleracion.x * tiempo * tiempo + tiempo * velocidad_actual.x + posicion_inicial.x,
        y: 0.5 * aceleracion.y * tiempo * tiempo + tiempo * velocidad_actual.y + posicion_inicial.y,
        z: 0.5 * aceleracion.z * tiempo * tiempo + tiempo * velocidad_actual.z + posicion_inicial.z
    };
    let dif_angulo_z = angulo_actual.gamma - angulo_inicial.gamma;
    let dif_angulo_x = angulo_actual.alpha - angulo_inicial.alpha;
    let dif_angulo_y = angulo_actual.beta - angulo_inicial.beta;
    if ( -10 < dif_angulo_z < 10 && -10 < dif_angulo_x < 10 && -10 < dif_angulo_y < 10){
        console.log(posicion_actual.z - posicion_inicial.z);
        if (posicion_actual.z - posicion_inicial.z > 0.5){
            console.log("Opcion11");
            chart_in();
        }
    }
    else{
        if (dif_angulo_y > 30 && -0.05 < posicion_actual.z - posicion_inicial.z < 0.05 && posicion_actual.x - posicion_inicial.x < 0){
            logged();
        }
        else if (dif_angulo_y > 30 && -0.05 < posicion_actual.z - posicion_inicial.z < 0.05 && posicion_actual.x - posicion_inicial.x > 0){
            alert("Hola");
        }
    }
    angulo_actual = angulo_inicial;
    velocidad_actual = velocidad_inicial;
    posicion_actual = posicion_inicial;
}

function iniciarUnaVez() {
    window.addEventListener("deviceorientation", inicio);
    window.addEventListener("devicemotion", function(event){
        aceleracion = event.acceleration;
        tiempo = 1;
    });
}
setInterval(cambio_bool, 1000);
function cambio_bool(){
    if(!mov_time){mov_time = true;}
    else{mov_time = false;}
}
document.addEventListener("DOMContentLoaded", iniciarUnaVez);
window.addEventListener("deviceorientation", function(event){
    if(mov_time){
        movimientos(event);
        mov_time = false;
    }
});