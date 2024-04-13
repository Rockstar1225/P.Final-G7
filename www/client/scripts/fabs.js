const socket = io();

class fabourites {
  
  // Datos iniciales
  fabs_data = {
    "fabs": []
  };
  
  // Añadir un nuevo producto a faboritos
  // nombre: el nombre del objeto.
  addProd(nombre) { 
    socket.emit("getProd",nombre);
    socket.on("retProd",function(prod){
        if (prod != {}){
            this.fabs_data.fabs.push(prod);   
        } else {
            console.log("No se encontró producto para añadir a faboritos.");
        }
    }.apply(this)); 
  }

  // Quitar un producto de faboritos
  remProd(name) {
    
    let index = this.fabs_data.fabs.findIndex((prod) => prod["name"] === name);
    if (index === -1){
        console.log("No se encontró elemento en favoritos para eliminar.");
        return
    }

    this.fabs_data.fabs.splice(index,1);
  } 
   

  // Localizar un producto faborito por su nombre.
  // retorna el producto vacío si no lo encuentra.
  locateFab(name){
    for (const prod of this.fabs_data.fabs) {
      if (prod["name"] === name){
        return prod;
      }
    }
    return {}
  }

  // Retornar todos los productos faboritos. 
  getFabs(){
    let res = [];
    for (const prod of this.fabs_data.fabs) {
        res.push(prod);
    }
    return res
  }
}

const fabs = fabourites();