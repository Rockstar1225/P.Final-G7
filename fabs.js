// Importación de módulos requeridos
const fs = require('fs');
const io = require('socket.io-client');

// conexión al servidor por medio del puerto anterior
const socket = io("http://localhost:3000");

// Clase representativa de la gestión de faboritos
// para cada usuario registrado.
class fabourites {
  
  // Atributos y rutas relevantes
  ruta = "./fabs/";
  user = "";
  fabs_data = {
    "fabs": []
  };
    
  // Cambiar el usuario que se está manejando
  setUser(user){ 
    this.user = user;
    if (fs.existsSync(this.ruta+user+".json") === false){
        this.saveData();
    } else {this.loadData();}
    
  }

  // Guardar los datos de productos favoritos gestionados en un archivo JSON
  saveData() {
    let json = JSON.stringify(this.fabs_data);
    // Guardar en el almacenamiento local del navegador
    fs.writeFileSync(this.ruta+this.user+".json",json,() => {
        console.log("Datos guardados de usuario: "+this.user);
    }) 
  }

  // Recuperar los productos favoritos desde el archivo JSON
  loadData() { 
    let ruta = this.ruta+this.user+".json";
    let data = fs.readFileSync(ruta); 
    this.fabs_data = JSON.parse(data);
  }

  // Añadir un nuevo producto a favoritos
  addProd(nombre) {
    console.log("Usuario para añadir: "+this.user); 
    socket.emit("getProd",nombre);
    socket.on("retProd",(prod) => {
        console.log("Producto recibido",prod);
        if (prod){
            this.fabs_data.fabs.push(prod);
            this.saveData();   
        } else {
            console.log("No se encontró producto para añadir a faboritos.");
        }
    }); 
  }

  // Quitar un producto de favoritos
  remProd(name) {    
    let index = this.fabs_data.fabs.findIndex((prod) => prod["name"] === name);
    if (index === -1){
        console.log("No se encontró elemento en favoritos para eliminar.");
        return
    }
    this.fabs_data.fabs.splice(index,1);
    this.saveData();
  } 
   

  // Localizar un producto favorito por su nombre.
  // retorna el producto vacío si no lo encuentra.
  locateFab(name){
    for (const prod of this.fabs_data.fabs) {
      if (prod["name"] === name){
        return prod;
      }
    }
    return {}
  }

  // Retornar todos los productos favoritos. 
  getFabs(){
    let res = [];
    for (const prod of this.fabs_data.fabs) {
        res.push(prod);
    }
    return res
  }
}

// Atributo principal del módulo
exports.fabs_handler = new fabourites();
