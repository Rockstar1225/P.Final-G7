const fs = require("fs");

class database {
  // Datos iniciales
  ruta = "";

  database = {
    "productos": [
      { "name": "Gorro", "quantity": 2, "sport": "natación", "price":10.3, "desc": "Gorro de goma perfecto para natación."}
    ]
  };
  
  constructor(rute){
    this.ruta = rute; 
    if (fs.existsSync(this.ruta)){
      this.loadData();
    } else {
      this.saveData(); 
    }

  }

  // Guardar la base de datos en un archivo JSON
  saveData() {
    let json = JSON.stringify(this.database);
    // Guardar en el almacenamiento local del navegador
    fs.writeFileSync(this.ruta,json);
  }

  // Recuperar la base de datos desde el archivo JSON
  loadData() {
    let json = fs.readFileSync(this.ruta); 
    this.database = JSON.parse(json);
  }  
  
  // Añadir un nuevo producto a la base de datos
  // nombre: el nombre del objeto.
  // cantidad: cantidad de productos en el almacén
  // dep: el deporte/categoría de cada producto
  // price: el precio de cada producto 
  addProd(nombre, cantidad, dep, price,desc) {
    this.database.productos.push({"name": nombre, "quantity": cantidad, "sport": dep, "price": price, "desc": desc});
    saveData(); 
  }

  // Obtener todos los productos de un determinado deporte
  seekProds(sport) {
    let res = [];
    for (const prod of this.database.productos) {
      if (prod["sport"] === sport) {
        res.push(prod);
      }
    }
    return res;
  }

  // Localizar un producto por su nombre.
  // retorna el producto vacío si no lo encuentra.
  locateProd(name){
    for (const prod of this.database.productos) {
      if (prod["name"] === name){
        return prod;
      }
    }
    return {}
  }

  // Retornar todos los productos de la base de datos
  getProds(){
    let res = [];
    for (const prod of this.database.productos) {
        res.push(prod);
    }
    return res
  }
}

exports.store = new database("./store.json");