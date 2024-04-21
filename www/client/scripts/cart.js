function updateCartData(){

    let prods_div = document.getElementById("products");
    let price = document.getElementById("price"); 

    socket.emit("centerGetCart");
    socket.on("retCenterGetCart",(list)=> {
        prods_div.innerHTML = "";
        let total_price = 0;
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
        price.innerHTML += ` ${total_price} €`
    })
}