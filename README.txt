Integrantes:
Adrián Cortazar Leria 100475860@alumnos.uc3m.es
Jaime Vaquero Rabahieh 100472248@alumnos.uc3m.es
Tomás Mendizábal 100461170@alumnos.uc3m.es

Grupo: 81-07

Ejecución del código:

Para ejecutar el código se debe realizar los siguientes pasos:
1. Descomprimir el archivo .zip.
2. Instalar todos los módulos de node que se especifican en los archivos
package-lock.json y package.json.
3. Usando una terminal acceder al directorio del proyecto.
4. Inicializar el servidor con el comando: "node server.js".
5. Con google chrome en el ordenador o un móvil enchufado al ordenador acceder a: "http://localhost:3000/client/index.html".
6. A continuación aparecera la pantalla principal de la aplicación.

Funcionalidades:





Comandos de voz y texto a voz con Web Speech API (SpeechGrammar y SpeechSynthesis respectivamente)*:
El primer paso para usar los comandos de voz es visualizar la lista de comandos. 
Para esto se debe hacer click en el botón con el signo de interogación. Al cliquear,
se mostraran los comandos disponibles y también habrá una voz que explique los comandos.
La mayoría de comandos usan una gramática, sin embargo hay unos comandos especiales en la página de login
que no la utilizan. Para empezar a reconocer un comando se debe pulsar en el botón cuyo icóno es una persona
hablando. Dicho botón se pondrá rojo y entonces el usuario deberá decir en voz alta el comando. 
Si funciona el ejecutará y el botón volverá a su color original. Si el comando no es
el correcto el botón volverá a su color original y el estado quedará igual. 

En la página del login hay dos comandos especiales para dictar el nombre de usuario y la contraseña. 
Diciendo usuario ...todo lo que se diga despues quedará guardado en el campo de usuario.
Lo mismo pasa al decir contraseña ... .

* Si se ejecuta desde chromium en Linux se debera usar los siguientes comandos para que funcione el SpeechSynthesis:
sudo apt-get install espeak;
chromium-browser --enable-speech-dispatcher;


Busqueda de productos:
La busqueda se puede hacer de dos maneras. La primera con todos los productos 
de una categoría y la segunda con un producto singular. Para hacer la primera, 
simplemente hay que hacer click en la categoría. 
Para realizar la busqueda por producto el usuario debe dirigirse a la página 
de busqueda usando el comando: "ir a busqueda". Ahí el usuario puede buscar un
producto usando el buscador y la lupa. Cabe destacar que solo se devolverán
productos que tengan el mismo nombre que el campo de busqueda.  

