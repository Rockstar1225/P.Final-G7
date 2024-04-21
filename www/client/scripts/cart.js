
// Función para actualizar los datos de producto
function updateCartData(){

    // Declaración de elementos principales del HTML
    let prods_div = document.getElementById("products");
    let price = document.getElementById("price"); 

    // Obtener información sobre los productos del carrito grupal
    socket.emit("centerGetCart");
    socket.on("retCenterGetCart",(list)=> {
        prods_div.innerHTML = "";
        let total_price = 0;

        // Generación automática de la estructura de los productos
        for (const prod of list){
            total_price += prod.prod.price;
            
            let elem = document.createElement("div");

            let text_prod = document.createElement("p");
            text_prod.innerHTML = `Name: ${prod.prod.name}`;
            let text_price = document.createElement("p");
            text_price.innerHTML = `Precio: ${prod.prod.price}€`;
            elem.appendChild(text_prod);
            elem.appendChild(text_price);

            prods_div.appendChild(elem);
        }

        // Actualizar el precio final
        price.innerHTML += ` ${total_price} €`
    })
}