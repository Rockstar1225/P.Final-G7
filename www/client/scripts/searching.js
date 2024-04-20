// parte de deporte
// Listen for the 'seekProds' event on the socket
socket.on('retProdSport', (data) => {
    console.log(`Received seekProds event with data: ${data}`);
    // Change window location with query parameters
    data.push("");
    
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
    let search_bar = data.pop();
    document.querySelector("#search_p").value = search_bar;
    // Use the extracted data
    let parent_div = document.getElementById("result_list");
    data.forEach(element => {
        if (element.name === undefined){
            return;
        }
        let product = document.createElement("p");
        product.innerHTML = `nombre: ${element.name}. Deporte: ${element.sport}.
        Descripcion: ${element.desc} Precio: ${element.price}€.`
        parent_div.appendChild(product);
    });
    history.replaceState({}, document.title, "/client/client_busqueda.html");
}


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
    let data_obj = [data]
    data_obj.push(document.querySelector("#search_p").value);
    window.location.href = `/client/client_busqueda.html?data=${JSON.stringify(data_obj)}`;

});