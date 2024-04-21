// Declaración de módulos principales
const fs = require('fs');
const io = require('socket.io-client');
const fabs = require('./fabs');
const cart = require('./shopping_cart');
const store = require('./store');
const { userInfo } = require('os');
const socket = io("http://localhost:3000");

// Clase que representará toda la gestión en el panel de 
// control del lado del servidor
class command_center{

    // Rutas y atributos principales
    ruta_fabs = "./fabs/";
    ruta_cart = "./cart/";
    list_users_cart = [];
    list_users_fabs = [];
    list_fab_prods = [];
    list_cart_prods = [];
    monitoring_intervalId;
    fabs_handler = fabs.fabs_handler;
    cart_handler = cart.handler;
    store_handler = store.store;

    constructor(){
        this.updateUsers();
    }

    // Método para monitorizar los productos cada 3 segundos
    startMonitoring(){
        this.monitoring_intervalId = setInterval(() => {this.updateUsers();},3000);
        console.log("Monitoreo activado!!");
    }

    // Método para detener la monitorización
    stopMonitoring(){
        setTimeout(() => {
            clearInterval(this.monitoring_intervalId);
            console.log('Monitoreo detenido!!');
        }, 10000);
    }

    // Método que actualiza el nombre de los usuarios registrados por el sistema.
    updateUsers(){
        this.list_users_cart = [];
        this.list_users_fabs = [];
        fs.readdir(this.ruta_cart, (err,archivos) => {
            if (err) {
                console.error("Error de lectura de usuarios faboritos", err);
                return;
            }

            archivos.forEach(archivo => {
                this.list_users_cart.push(archivo.replace(".json",""));
            })
        })

        fs.readdir(this.ruta_fabs, (err,archivos) => {
            if (err) {
                console.error("Error de lectura de usuarios faboritos", err);
                return;
            }

            archivos.forEach(archivo => {
                this.list_users_fabs.push(archivo.replace(".json",""));
            })
        })
    }

    // Getters para las listas de usuarios
    //------------------------------------
    getFabUsers(){
        return this.list_users_fabs;
    }
    getCartUsers(){
        return this.list_users_cart;
    }
    //------------------------------------
    

    // Método que obtiene todos los productos añadidos a faboritos
    getFabProds(){
        this.list_fab_prods = [];
        let user = this.fabs_handler.user;
        console.log("Users fabs:",this.list_users_fabs); 
        for (const user of this.list_users_fabs) {
            this.fabs_handler.setUser(user); 
            for (const prod of this.fabs_handler.fabs_data.fabs){
                this.list_fab_prods.push({"user":user,"prod": prod});
            }
        }
        this.fabs_handler.setUser(user);
    }

    // Método que obtiene los productos añadidos al carrito
    getCartProds(){
        let user = this.fabs_handler.user;
        this.list_cart_prods = [];
        for (const user of this.list_users_cart) {
            this.cart_handler.setUser(user);
            for (const prod of this.cart_handler.shopping_cart.cart){
                this.list_cart_prods.push({"user":user,"prod": prod});
            }
        }
        this.cart_handler.setUser(user);
    }



}

// Atributo principal del módulo
exports.handler = new command_center();