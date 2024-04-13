const socket = io();

class shopping_cart {
  
  // Datos iniciales
  shopping_cart= {
    "cart": []
  };
  
  constructor(){}

  // Añadir un nuevo producto al carrito
  // nombre: el nombre del objeto.
  addProd(nombre) { 
    socket.emit("getProd",nombre);
    socket.on("retProd",function(prod){
        if (prod != {}){
            this.shopping_cart.cart.push(prod);   
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

    this.fabs_data.fabs.splice(index,1);
  } 
   

  // Localizar un producto en el carrito por su nombre.
  // retorna el producto vacío si no lo encuentra.
  locateCart(name){
    for (const prod of this.fabs_data.fabs) {
      if (prod["name"] === name){
        return prod;
      }
    }
    return {}
  }

  // Retornar todos los productos del carrito. 
  getCart(){
    let res = [];
    for (const prod of this.fabs_data.fabs) {
        res.push(prod);
    }
    return res
  }
}

let cart = null;