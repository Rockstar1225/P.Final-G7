// category product search
// Listen for the 'seekProds' event on the socket
socket.on('retProdSport', (data) => {
    console.log(`Received seekProds event with data: ${data}`);
    // Change window location with query parameters
    data.push("");
    data.push("");
    // redirect to search page
    window.location.href = `/client/client_busqueda.html?data=${JSON.stringify(data)}`;

});

// Function to emit the 'seekProds' event with the provided category
function get_products_by_category(category) {
    console.log(category);
    socket.emit('getProdSport', category);
}

// On the client_busqueda.html page
function load_sports() {
    // Extract data from query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const dataString = urlParams.get('data');
    let data = JSON.parse(dataString);
    if (data === null){
        return ;
    }
    let order_type = data.pop();
    if (order_type === "Precio (Menor a mayor)"){
        data.sort(function (a, b) {
            if (a.price == b.price)
                return 0;
            if (a.price < b.price)
                return -1;
            if (a.price > b.price)
                return 1;
        });
        let order = document.querySelector("#s_order");
        order.value = "p_up";
    }
    if (order_type === "Precio (Mayor a menor)") {
        data.sort(function (a, b) {
            if (a.price == b.price)
                return 0;
            if (a.price < b.price)
                return 1;
            if (a.price > b.price)
                return -1;
        });
        let order = document.querySelector("#s_order");
        order.value = "p_down";
    }
    
    let search_bar = data.pop();
    document.querySelector("#search_p").value = search_bar;
    // Use the extracted data
    let parent_div = document.getElementById("result_list");
    data.forEach(element => {
        if (element.name === undefined){
            return;
        }
        // Define the dynamic structure.
        let product_div = document.createElement("div");
        let product = document.createElement("p");
        let button = document.createElement("a");
        
        // Setting the content
        button.innerHTML = "<img src='./imgs/info.png' width=50px height=50px>";
        product.innerHTML = `${element.name}. Precio: ${element.price}€.`

        button.addEventListener("click",(ev) => {
            // call a function for displaying the product.
            console.log("Displaying Prod!!");
            displayProduct(element);
        });
        // append to html
        product_div.appendChild(product);
        product_div.appendChild(button);
        parent_div.appendChild(product_div);
    });
    // remove excess clutter from URL
    history.replaceState({}, document.title, "/client/client_busqueda.html");
}

// individual product search
function search_sport() {
    let input = document.querySelector("#search_p").value;
    if (input === ""){
        return null;
    }
    socket.emit("getProd", input);
}
socket.on('retProd', (data) => {
    console.log(`Received seekProds event with data: ${data}`);
    // Change window location with query parameters
    data.push(document.querySelector("#search_p").value);
    let order = document.querySelector("#s_order");
    data.push(order.options[order.selectedIndex].text)
    window.location.href = `/client/client_busqueda.html?data=${JSON.stringify(data)}`;

});

// displaying the product
function displayProduct(element){
    // configuration of style for display of products
   let modal = document.getElementById("product");

   let title = document.createElement("h1");
   let descr = document.createElement("p");
   let category = document.createElement("p");
   let price = document.createElement("p");
   let add_remove_div = document.createElement("div");
   let add_Fabs_img = document.createElement("img");
   let add_cart_img = document.createElement("img");

   // adding the content to the dialog
   title.innerText = `${element.name}`;
   descr.innerText = `Description: ${element.desc}`;
   category.innerText = `Category of product: ${element.sport}`;
   price.innerText = `Price: ${element.price}€`;
   add_Fabs_img.src = "./imgs/favoritos.png";
   add_cart_img.src = "./imgs/shopping_cart.webp"; 
   add_Fabs_img.style.width = "50px";
   add_cart_img.style.width = "50px";
   add_Fabs_img.style.height = "50px";
   add_cart_img.style.height = "50px";
   add_remove_div.style.width = "100%";
   add_remove_div.style.height = "auto";
   add_remove_div.style.justifyContent = "space-between"; 

   // Buttons that change for adding o removing products to fabs
   socket.emit("centerGetFabs");
   socket.on("retCenterGetFabs",(data) => {
    let data_prods = Array.from(data,(up) => {return JSON.stringify(up.prod)});
    

    if (data_prods.includes(JSON.stringify(element))){
       add_Fabs_img.style.backgroundColor = "red";
       
       // remove product from fabs.
       add_Fabs_img.addEventListener("click",(ev) => {
            socket.emit("fabRemProd",element.name);
       }) 
    } else {
        add_Fabs_img.style.backgroundColor = "orange";
        
        // add product to fabs
        add_Fabs_img.addEventListener("click",(ev) => {
            socket.emit("fabAddProd",element.name);
        })
    }
    add_Fabs_img.style.borderRadius = "50px";
   })

   // Buttons that change for adding o removing products from the cart
   socket.emit("centerGetCart");
   socket.on("retCenterGetCart",(data) => {

    let data_prods = Array.from(data,(up) => {return JSON.stringify(up.prod)});
    console.log("Data:",data_prods);
    console.log("Elemento: "+JSON.stringify(element));

    if (data_prods.includes(JSON.stringify(element))){
       add_cart_img.style.backgroundColor = "red";
       add_cart_img.addEventListener("click",(ev)=>{
            socket.emit("shoppingCartRemProd",element.name);
       }) 
    } else {
        add_cart_img.style.backgroundColor = "orange";
        add_cart_img.addEventListener("click",(ev)=>{
            socket.emit("shoppingCartAddProd",element.name);
        })
    }
    add_cart_img.style.borderRadius = "50px";
   })


    // diplaying the product info    
   modal.innerHTML = "";
   add_remove_div.innerHTML = "";

   add_remove_div.appendChild(add_Fabs_img);
   add_remove_div.appendChild(add_cart_img);
   modal.appendChild(title);
   modal.appendChild(category);
   modal.appendChild(descr);
   modal.appendChild(price);
   modal.appendChild(add_remove_div);
    // showing product info   
   modal.showModal();
    // removing info after 10 seconds    
   let interval = setTimeout(() => {
    modal.close();
   },10000);
}