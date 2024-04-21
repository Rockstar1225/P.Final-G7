// Importación de módulos relevantes
const fs = require('fs');
const io = require('socket.io-client');

// Conexión al servidor por medio del puerto 3000
const socket = io("http://localhost:3000");


// Clase que representa el carrito de productos
// de cada usuario.
class shopping_cart {
  
  // Rutas y atributos iniciales
  ruta = "./cart/";
  user = "";
  shopping_cart= {
    "cart": []
  };
 
  // Establecer el usuario gestionado
  setUser(user){
    this.user = user;
    if (fs.existsSync(this.ruta+user+".json") === false){
        this.saveData();
        this.shopping_cart = {
          "cart": []
        }
    } else {this.loadData();}
    
  }


  // Reportar el usuario actual de la sesión
  getUser(){
    return this.user;
  }

  // Guardar los productos de carrito de un usuario en un archivo JSON
  saveData() {
    let json = JSON.stringify(this.shopping_cart);
    // Guardar en el almacenamiento local del navegador
    fs.writeFileSync(this.ruta+this.user+".json",json,() => {
        console.log("Datos guardados de usuario: "+this.user);
    }) 
  }

  // Recuperar el carrito desde el archivo JSON
  loadData() { 
    let ruta = this.ruta+this.user+".json";
    let data = fs.readFileSync(ruta); 
    this.shopping_cart = JSON.parse(data);
  }


  // Añadir un nuevo producto al carrito
  // nombre: el nombre del objeto.
  addProd(nombre) { 
    socket.emit("getProd",nombre);
    socket.on("retProd",(prod) => {
        if (prod != {}){
            this.shopping_cart.cart.push(prod);
            this.saveData();
        } else {
            console.log("No se encontró producto para añadir a faboritos.");
        }
    }); 
  }

  // Quitar un producto del carrito
  remProd(name) { 
    let index = this.shopping_cart.cart.findIndex((prod) => prod["name"] === name);
    if (index === -1){
        console.log("No se encontró elemento en el carrito para eliminar.");
        return
    }
    this.shopping_cart.cart.splice(index,1);
    this.saveData();
  } 
   

  // Localizar un producto en el carrito por su nombre.
  // retorna el producto vacío si no lo encuentra.
  locateCart(name){
    for (const prod of this.shopping_cart.cart) {
      if (prod["name"] === name){
        return prod;
      }
    }
    return {}
  }

  // Retornar todos los productos del carrito. 
  getCart(){
    let res = [];
    for (const prod of this.shopping_cart.cart) {
        res.push(prod);
    }
    return res
  }
}


// Atributo principal del módulo
exports.handler = new shopping_cart();

