const express = require("express")
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const port = 3000;


/*app.use("/", express.static(path.join(__dirname,"www")));

app.listen(port, function (){
    console.log("Servidor en ejecución en puerto ${port}");
})

app.get("/api/data/get", (req,res) => {
    const arr = [1,2,3,4];
    res.end(JSON.stringify(arr));
})

// Ejemplo de mandar parámetros por la ruta
app.get("/user/:id",function (req,res) {
    res.send("user: "+req.params.id);
})
*/
app.use(express.static('www'));

server.listen(3000, () => console.log('server started'));

io.on("connection",function(socket) {
    console.log("nuevo cliente");
    socket.on("mes",function(mes){
        console.log("Mensaje de cliente: "+mes.msg);
        socket.emit("mes", "adios");
    })
})