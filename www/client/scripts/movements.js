
let posicion_inicial = { alpha: -1, beta: -1, gamma: -1 };
let aceleracion = 0;
let radio = 0.25; //Radio aprox. de un movil

window.addEventListener("devicemotion", function(event){
    let posicion_actual = event.rotationRate;
    let v_aceleracion = event.acceleration;
    let tiempo = event.interval*0.001;//En segundos
    
    aceleracion = Math.round(Math.sqrt(v_aceleracion.x ** 2 + v_aceleracion.y ** 2 + v_aceleracion.z ** 2), 2);
    
    if (posicion_inicial.alpha ===-1) {
        posicion_inicial.alpha = posicion_actual.alpha;
        posicion_inicial.beta = posicion_actual.beta;
        posicion_inicial.gamma = posicion_actual.gamma;
    } else {
        let distancia_z = Math.abs(radio*(posicion_actual.alpha - posicion_inicial.alpha)*tiempo, 2);
        let distancia_y = Math.abs(radio*(posicion_actual.gamma - posicion_inicial.gamma)*tiempo, 2);
        let distancia_x = Math.abs(radio*(posicion_actual.beta - posicion_inicial.beta)*tiempo, 2);
        if (distancia_z > 0.5){
            mostrarMensaje("Eje z movido" + distancia_z);
        } else if (distancia_x > 0.5){
            mostrarMensaje("Eje x movido" + distancia_x);
        } else if (distancia_y > 0.5){
            mostrarMensaje("Eje y movido" + distancia_y);
        }
    }
    posicion_inicial.alpha = posicion_actual.alpha;
    posicion_inicial.beta = posicion_actual.beta;
    posicion_inicial.gamma = posicion_actual.gamma;
});

function mostrarMensaje(mensaje) {
    let resultados = document.getElementById("resultados");
    resultados.innerHTML = `<p>${mensaje}</p>`;
}
