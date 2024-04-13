const socket = io();

class fabourites {
  
  // Datos iniciales
  ruta = "./fabs/";
  fabs_data = {
    "fabs": []
  };
  
  constructor(user){
    this.ruta += user + ".json";
    if (user !== ""){
      socket.emit("existFile",this.ruta);
      socket.on("retExistFile",(bool) => {
        if (bool === false){
          this.saveData();
        } else {
          this.loadData(); 
        }
      }) 
    }

  }

  // Guardar la base de datos en un archivo JSON
  saveData() {
    let json = JSON.stringify(this.fabs_data);
    // Guardar en el almacenamiento local del navegador
    socket.emit("writeDataFile",this.ruta,json);
  }

  // Recuperar los favoritos desde el archivo JSON
  loadData() { 
    socket.emit("loadDataFile",this.ruta);
    socket.on("retLoadDataFile",(data) => {
      this.fabs_data = JSON.parse(data);
    }) 
  }

  // Añadir un nuevo producto a favoritos
  // nombre: el nombre del objeto.
  addProd(nombre) { 
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

let fabs = null;