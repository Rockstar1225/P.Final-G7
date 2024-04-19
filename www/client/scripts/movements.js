let posicion_inicial = { alpha: DeviceOrientationEvent.alpha, beta: DeviceOrientationEvent.beta, gamma: DeviceOrientationEvent.gamma };

window.addEventListener("deviceorientation", function(event){
    let posicion_actual ={ alpha: event.alpha, beta: event.beta, gamma: event.gamma };
    console.log("hola");
    
    if (posicion_inicial.alpha ===-1) {
        posicion_inicial.alpha = event.alpha;
        posicion_inicial.beta = event.beta;
        posicion_inicial.gamma = event.gamma;
    } else {
        if ((posicion_actual.gamma - posicion_inicial.gamma)> 40){
            chart_in();
        }
        else if ((posicion_actual.beta - posicion_inicial.beta)> 40){
            logged();
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
