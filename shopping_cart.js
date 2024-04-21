const fs = require('fs');
const io = require('socket.io-client');

const socket = io("http://localhost:3000");


class shopping_cart {
  
  // Datos iniciales
  ruta = "./cart/";
  user = "";
  shopping_cart= {
    "cart": []
  };
 
  // Setear un usuario
  setUser(user){
    this.user = user;
    if (fs.existsSync(this.ruta+user+".json") === false){
        this.saveData();
    } else {this.loadData();}
    
  }


  // Reportar el usuario actual de la sesión
  getUser(){
    return this.user;
  }
  // Guardar la base de datos en un archivo JSON
  saveData() {
    let json = JSON.stringify(this.shopping_cart);
    // Guardar en el almacenamiento local del navegador
    fs.writeFileSync(this.ruta+this.user+".json",json,() => {
        console.log("Datos guardados de usuario: "+this.user);
    }) 
  }

  // Recuperar los favoritos desde el archivo JSON
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

exports.handler = new shopping_cart();

