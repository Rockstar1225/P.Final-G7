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
5. Con google chrome en el ordenador o un móvil enchufado al ordenador acceder a: "http://localhost:3000/client/index.html"(página de cliente).
6. A continuación aparecera la pantalla principal de la aplicación.
7. Si se desea acceder al panel de control (interfaz del lado del servidor), se accederá desde un dispositivo a: "http://localhost:3000/index.html".
8. A continuación serán mostrados 3 apartados para visualizar los productos en faboritos, los del carrito y los usuarios logeados en la plataforma.

funcionalidades:
    añadir*:
        Esta función se realiza buscando un producto, y luego 
        dando click al botón de más informaciòn y luego cliquear el icóno del carrito.

    eliminar*:
        Una vez que un producto ha sido añadido al carrito o a la lista de favoritos
        de un usuario logeado, Los botones de añadir producto al carrito o a favoritos
        se reemplazan por los de eliminar (carácterísticos por llevar el fondo rojo).

    Marcar como Favorito*: 
        Esta función se realiza buscando un producto, dando click al botón de más informaciòn 
        y luego cliquear el icóno de favoritos (carácterístico por su fondo amarillo).

    Ordenar*:
        Para Ordenar los productos el usuario tiene que dirigirse a la página de busqueda.
        Ahi busca un producto (ej: "zapatos"). Y por defecto se ordena con precio de 
        mayor a menor. Si el usuario desea cambiarlo puede ir al menu desplegable 
        y seleccionar entre las opciones de orden.

    Notificación:
        Para tener la notificación de compra se utiliza un gesto para avisar al 
        que tiene que ejecutar la compra.

    * Por cuestiones de tiempo, las funcionalidades de arriba no se han 
    podido implementar de forma úbicua.




Funcionalidades adicionales:

    Gestos básicos:
    Los gestos que tenemos en el movil son los siguientes.
    1. ir a carrito: se hace moviendo el movil hacia adelante.
    2. ir a perfil: se hace moviendo el movil hacia la izquierda.
    3. ir a busqueda: se hace moviendo el movil hacia la derecha.
    3. ir a categorias: se hace moviendo el movil hacia atras.

    Gestos extra:
    Para realizar los pagos, se puede realizar mediante un input y un botón o girando el móvil a la derecha.
    En caso de querer volver al carro, solo basta con girar a la izquierda. Si se ha aceptado el encargo, hay también
    opción de botón o girar a la izquierda. Ambos te devuelven al menú principal.

    *ADVERTENCIA: En caso de fallas en la realización de movimientos, se recomienda refrescar la página. Esto es debido a
    problemas de la captación de las coordenadas alpha, beta y gamma.

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



    Gestor de archivos incorporado:
    Se ha desarrollado para esta práctica un sistema de gestión de lista de faboritos y carrito
    independiente a cada usuario, el cual almacena los productos añadidos en ficheros. Se organiza de la siguiente manera:
        
        - Carpeta "/cart": Localización de todos los archivos correspondientes a los usuarios logeados.
            Estos contienen los productos añadidos a faboritos por su correspondiente usuario en la interfaz.
            Se crea un fichero llamado ".json" al principio de todo, el cual representa el usuario no logueado.
            De ésta manera, también se almacenarán los productos agregados al carrito de un usuario que no esté logueado o
            registrado. Se puede identificar qué usuario a guardado qué productos según el nombre del archivo ".json" almacenado.
            Ej.: El fichero "Adri.json" almacena los productos del usuario "Adri".

        - Carpeta "/fabs": Ubicación de todos los ficheros que registran los productos añadidos a faboritos por los usuarios logueados.
            También incluye un fichero ".json" con el nombre vacío para incluir al usuario no registrado en la plataforma.
            Se utilizará el mismo sistema de asociación que en la carpeta anterior para identificar qué productos han sido añadidos por
            qué usuarios al carrito de la compra.
    


    Panel de control:
    Hemos desarrollado del lado del servidor, un panel de mando desde el que se puede visualizar que productos han sido añadidos a faboritos,
    cuales han sido añadidos al carrito de la compra y los usuarios existentes dentro de la plataforma. Esto es representado a través de un módulo
    en Node.js llamado "command_center.js". Es reutilizado por el servidor para la gestión de esta interfaz. Sus secciones serán las siguientes:
        
        - Favoritos: Esta sección se rellena automáticamente con una tabla que periodicamente, comprueba los productos que se han añadido
        a faboritos para todos los usuarios existentes en la plataforma. La información se presenta con el formato: "Usuario-Producto".

        - Carrito: Dicha sección ilustra los productos que han sido añadidos al carrito de la compra en la interfaz por todos los usuarios.
        Los datos se presentan con el mismo formato que la sección anterior dinámicamente.

        - Usuarios: Sección que recopila los usuarios logueados en la plataforma o interfaz. Cabe a resaltar que aparece una fila en la tabla
        con el nombre vacío debido al usuario sin nombre que representa a los que no se han logueado. Dichos usuarios se verán representados por
        el usuario en blanco, por defecto al entrar en la plataforma.
    

    Gestión de Favorito:
    La gestión de las listas de faboritos de cada uno de los usuarios implementada a través de ficheros ".json" es utilizada por medio de un módulo
    de node.js que corresponde al archivo "fabs.js". Este módulo del proyecto es importado y manejado por el servidor según los eventos emitidos por
    los usuarios en la interfaz.

    Gestión de Carrito:
    La gestión de carritos de la compra con los productos añadidos por los usuarios, seguirá la misma implementación que la gestión anterior (ficheros ".json").
    Aunque para ésta, se utilizará un módulo diferente de node.js asociado al archivo "shopping_cart.js". Este módulo, al igual que el anterior,
    será manipulado por el servidor según se haga falta por el tratamiento de eventos de los clientes.

    Base de datos:
    Se ha incluido la implementación de una base de datos, con el propósito de almacenar los productos disponibles en el almacén de la tienda deportiva.
    Al igual que las gestiones anteriores, la de la base de datos se hace a través de otro módulo separado con el nombre "store.js". Se importará en el
    servidor y manejará según así se requiera.

    Estructura modular:
    Se ha optado por implementar una estructura modular por la parte del servidor o backend de la aplicación. Esto se ha diseñado así para ser
    altamente reutilizable y escalable en futuras actualizaciones.

    Diseño de Peticiones:
    Cada una de las interacciones de los usuarios en la interfaz se ve representada por un evento en el lado del servidor. Esto se ha diseñado
    de esta manera para que sea altamente manejable y cada acción en la interfaz tenga su consecuencia de gestión por parte del servidor central.

