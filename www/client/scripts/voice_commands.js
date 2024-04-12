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

// var phrasePara = document.querySelector('.phrase');
// var resultPara = document.querySelector('.result');
// var diagnosticPara = document.querySelector('.output');

var testBtn = document.querySelector('#voice_commands');

function randomPhrase() {
    var number = Math.floor(Math.random() * phrases.length);
    return number;
}

function testSpeech() {
    testBtn.disabled = true;
    
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
        
    
    // To ensure case consistency while checking with the returned output text
    // phrase = phrase.toLowerCase();
    // phrasePara.textContent = phrases;
    // resultPara.textContent = 'Right or wrong?';
    // resultPara.style.background = 'rgba(0,0,0,0.2)';
    // diagnosticPara.textContent = '...diagnostic messages';

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
        // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
        // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
        // It has a getter so it can be accessed like an array
        // The first [0] returns the SpeechRecognitionResult at position 0.
        // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
        // These also have getters so they can be accessed like arrays.
        // The second [0] returns the SpeechRecognitionAlternative at position 0.
        // We then return the transcript property of the SpeechRecognitionAlternative object 
        let speechResult = event.results[0][0].transcript.toLowerCase();
        // diagnosticPara.textContent = 'Speech received: ' + speechResult + '.';
        if (phrases.includes(speechResult)) {
            // resultPara.textContent = 'I heard the correct phrase!';
            // resultPara.style.background = 'lime';
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
        testBtn.disabled = false;
        
    }

    recognition.onerror = function (event) {
        testBtn.disabled = false;
        diagnosticPara.textContent = 'Error occurred in recognition: ' + event.error;
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
        //Fired when the speech recognition service has begun listening to incoming audio with intent to recognize grammars associated with the current SpeechRecognition.
        console.log('SpeechRecognition.onstart');
    }
}

testBtn.addEventListener('click', testSpeech);