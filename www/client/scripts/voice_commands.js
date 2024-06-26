// grammar variables
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

// grammar phrases
var phrases = [
    'ir a búsqueda',
    'ir a carrito',
    'ir a login',
    'ir a producto',
    'ir a perfil',
    'ir a inicio'
];
// redirects corresponding to the phrases above
var redirects = [
    '/client/client_busqueda.html',
    '/client/client_carrito.html',
    '/client/client_login.html',
    '/client/client_product.html',
    '/client/client_user_profile.html',
    '/client/index.html'
];


// var for creating the tile content
var tile_content_created = false;
// for text-to-speeech
const synth = window.speechSynthesis;

// speech function
function testSpeech(button) {
    button.disabled = true;
    // insert additional phrases if in category page
    if (window.location.href === "http://localhost:3000/client/index.html"){
        let categories = document.querySelectorAll(".c_title");
        categories.forEach(element =>{
            let str = 'ir a ';
            str = str.concat(element.innerHTML.toLowerCase())
            phrases.push(str)

        })
    }
    // will be used to write username and password it user is in login page
    let in_login_html = false;
    if (window.location.href === "http://localhost:3000/client/client_login.html"){
        in_login_html = true;
    }
        
    // gramar variables
    var grammar = '#JSGF V1.0; grammar phrase; public <phrase> = ' + phrases.join(' | ') + ';';
    var recognition = new SpeechRecognition();
    var speechRecognitionList = new SpeechGrammarList();
    speechRecognitionList.addFromString(grammar, 1);
    recognition.grammars = speechRecognitionList;
    recognition.lang = 'es-ES';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    
    // recognition start
    recognition.start();
    // recognition result
    recognition.onresult = function (event) {
        // handle redirects
        let speechResult = event.results[0][0].transcript.toLowerCase();
        if (phrases.includes(speechResult)) {
            // comandos con gramatica
            let index = phrases.indexOf(speechResult)
            if (index >= 6){
                window.location.href = `${redirects[0]}`;
            }
            else{
            window.location.href = `${redirects[index]}`;
            }
        } else {
            // commands without grammar
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
    // rest of events
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
    // change button background to green
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
    // change button background to red
    recognition.onstart = function (event) {
        button.style.backgroundColor = "#FF1D25";
        //Fired when the speech recognition service has begun listening to incoming audio with intent to recognize grammars associated with the current SpeechRecognition.
        console.log('SpeechRecognition.onstart');
    }
}
// speech-to-text function and tile dispay
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
    var phrases = [
        'ir a búsqueda',
        'ir a carrito',
        'ir a login',
        'ir a producto',
        'ir a perfil',
        'ir a inicio',
        "COMANDOS EXTRA EN PÁGINA CATEGORIAS: ir a 'X'. X=deporte"
    ];
    
    // create and fill the tile if it hasn't already been done
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
    // logic for the position of the tile
    let optionsWindow = document.getElementById('optionsWindow');
    // Calculate the position of the button
    let buttonRect = button.getBoundingClientRect();

    // Check if the button is in the footer
    let isFooterIcon = button.classList.contains('footer_icons');

    // Set the position of the options window relative to the button
    if (isFooterIcon) {
        // For buttons in the footer, position the options window higher than the button
        optionsWindow.style.top = (buttonRect.top - optionsWindow.offsetHeight - 220 + window.scrollY) + 'px';
    } else {
        // For buttons in the header or elsewhere, position the options window below the button
        optionsWindow.style.top = (buttonRect.bottom + window.scrollY) + 'px';
        
    }
    optionsWindow.style.left = (buttonRect.left + window.scrollX) + 'px';
    
    // Toggle the visibility of the options window
    if (optionsWindow.style.display === 'none' || optionsWindow.style.display === '') {
        optionsWindow.style.display = 'block';
        // begin text-to-speech
        speak();
    } else {
        optionsWindow.style.display = 'none';
        // prematurely end texto-to-speech
        synth.cancel();
    }

}




