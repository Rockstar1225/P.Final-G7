var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

var phrases = [
    'ir a búsqueda',
    'ir a carrito',
    'ir a categorías',
    'ir a login',
    'ir a producto',
    'ir a perfil',
    'ir a inicio'
];

var redirects = [
    '/client/client_busqueda.html',
    '/client/client_carrito.html',
    '/client/client_categorias.html',
    '/client/client_login.html',
    '/client/client_product.html',
    '/client/client_user_profile.html',
    '/'
];


var activate_button_tablet = document.querySelector('#voice_commands');
var activate_button_phone = document.querySelector('#footer_voice');
var tile_content_created = false;
// for text-to-speeech
const synth = window.speechSynthesis;

function testSpeech(button) {
    button.disabled = true;
    
    
    if (window.location.href === "http://localhost:3000/"){
        let categories = document.querySelectorAll(".c_title");
        categories.forEach(element =>{
            let str = 'ir a ';
            str = str.concat(element.innerHTML.toLowerCase())
            phrases.push(str)

        })
        console.log(phrases);
    }
    let in_login_html = false;
    if (window.location.href === "http://localhost:3000/client/client_login.html"){
        in_login_html = true;
    }
        

    var grammar = '#JSGF V1.0; grammar phrase; public <phrase> = ' + phrases.join(' | ') + ';';
    var recognition = new SpeechRecognition();
    var speechRecognitionList = new SpeechGrammarList();
    speechRecognitionList.addFromString(grammar, 1);
    recognition.grammars = speechRecognitionList;
    recognition.lang = 'es-ES';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = function (event) {

        let speechResult = event.results[0][0].transcript.toLowerCase();
        if (phrases.includes(speechResult)) {
            // comandos con gramatica
            let index = phrases.indexOf(speechResult)
            if (index >= 7){
                window.location.href = `${redirects[0]}`;
            }
            else{
            window.location.href = `${redirects[index]}`;
            }
        } else {
            // comandos sin gramatica
            if (speechResult.includes("usuario") && in_login_html === true){
                let user_str = speechResult.replace("usuario", "");
                let username_object = document.querySelector("#init_user");
                username_object.value = user_str;
            }
            if (speechResult.includes("contraseña") && in_login_html === true) {
                let user_str = speechResult.replace("contraseña", "");
                let username_object = document.querySelector("#init_password");
                username_object.value = user_str;
            }

        }
        console.log('Confidence: ' + event.results[0][0].confidence);
    }

    recognition.onspeechend = function () {
        recognition.stop();
        button.disabled = false;
    }

    recognition.onerror = function (event) {
        button.disabled = false;
    }

    recognition.onaudiostart = function (event) {
        //Fired when the user agent has started to capture audio.
        console.log('SpeechRecognition.onaudiostart');
    }

    recognition.onaudioend = function (event) {
        //Fired when the user agent has finished capturing audio.
        console.log('SpeechRecognition.onaudioend');
    }

    recognition.onend = function (event) {
        //Fired when the speech recognition service has disconnected.
        button.style.backgroundColor = "#007bff";
        console.log('SpeechRecognition.onend');
    }

    recognition.onnomatch = function (event) {
        //Fired when the speech recognition service returns a final result with no significant recognition. This may involve some degree of recognition, which doesn't meet or exceed the confidence threshold.
        console.log('SpeechRecognition.onnomatch');
    }

    recognition.onsoundstart = function (event) {
        //Fired when any sound — recognisable speech or not — has been detected.
        console.log('SpeechRecognition.onsoundstart');
    }

    recognition.onsoundend = function (event) {
        //Fired when any sound — recognisable speech or not — has stopped being detected.
        console.log('SpeechRecognition.onsoundend');
    }

    recognition.onspeechstart = function (event) {
        //Fired when sound that is recognised by the speech recognition service as speech has been detected.
        console.log('SpeechRecognition.onspeechstart');
    }
    recognition.onstart = function (event) {
        button.style.backgroundColor = "#FF1D25";
        //Fired when the speech recognition service has begun listening to incoming audio with intent to recognize grammars associated with the current SpeechRecognition.
        console.log('SpeechRecognition.onstart');
    }
}
function toggle_options(button) {
    
    // speech function
    function speak(){
        // instructions
        let message = new SpeechSynthesisUtterance(
            `Bienvenido a Sportify. 
            Los comandos de voz son de la forma: 'ir a', acompañado de la seccion. 
            Adicionalmente en la pagina principal se puede usar: 'ir a', seguido del deporte.`
        );
        message.lang = "es-Es";
        message.pitch = 10;
        message.rate = 0.7;
        message.volume = 1;
        // Speak the message
        synth.speak(message);

    }
    
    // fill the tile with the phrases
    if (!tile_content_created) {
        let tile_content = document.querySelector(".tile-content");
        phrases.forEach(element => {
            let individual_phrase = document.createElement("p");
            individual_phrase.className = "phrases";
            individual_phrase.innerText = element;
            tile_content.appendChild(individual_phrase);
        });
        tile_content_created = true;
    }

    let optionsWindow = document.getElementById('optionsWindow');
    // Calculate the position of the button
    let buttonRect = button.getBoundingClientRect();

    // Check if the button is in the footer
    let isFooterIcon = button.classList.contains('footer_icons');

    // Set the position of the options window relative to the button
    if (isFooterIcon) {
        // For buttons in the footer, position the options window higher than the button
        optionsWindow.style.top = (buttonRect.top - optionsWindow.offsetHeight - 215 + window.scrollY) + 'px';
    } else {
        // For buttons in the header or elsewhere, position the options window below the button
        optionsWindow.style.top = (buttonRect.bottom + window.scrollY) + 'px';
        
    }
    optionsWindow.style.left = (buttonRect.left + window.scrollX) + 'px';
    
    // Toggle the visibility of the options window
    if (optionsWindow.style.display === 'none' || optionsWindow.style.display === '') {
        optionsWindow.style.display = 'block';
        speak();
    } else {
        optionsWindow.style.display = 'none';
        synth.cancel();
    }

}




