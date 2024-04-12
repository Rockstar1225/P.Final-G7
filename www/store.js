class database {
  // Datos iniciales
  let ruta = "";

  let database = {
    "usuarios": [
      {"name":"Gorro", "cantidad":2, "deporte": "swim", "price":10.3}
    ]
  };
  
  constructor(rute){
    this.ruta = rute;
  }
  // Guardar la base de datos en un archivo JSON
  function saveData() {
    let json = JSON.stringify(this.database);
    // Guardar en el almacenamiento local del navegador
    localStorage.setItem(this.ruta, json);
  }

  // Recuperar la base de datos desde el archivo JSON
  function loadData() {
    let json = localStorage.getItem(this.ruta);
    if (json) {
      this.database = JSON.parse(json);
    }
  }  
  
  // Añadir un nuevo usuario a la base de datos
  // nombre: el nombre del objeto.
  // cantidad: cantidad de productos en el almacén
  // dep: el deporte/categoría de cada producto
  // price: el precio de cada producto
  // fab: si el producto está en faboritos o no.
  // cart: si el producto está añadido al carrito localmente.
  function agregarUsuario(nombre, cantidad, dep, price) {
    database.usuarios.push({"name": nombre, "cantidad": cantidad, "deporte": dep, "price": price});
    saveData(); 
  }

  // Obtener todos los usuarios
  function obtenerUsuarios(sport) {
    let res = [];
    for (const prod of database.usuarios) {
      if (prod["deporte"] === sport) {
        res.push(prod);
      }
    }
    return res;
  }
}

const products = database();
