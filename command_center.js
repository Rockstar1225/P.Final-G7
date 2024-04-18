const fs = require('fs');
const io = require('socket.io-client');
const fabs = require('./fabs');
const cart = require('./shopping_cart');
const store = require('./store');
const socket = io("http://localhost:3000");

class command_center{
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

    startMonitoring(){
        this.monitoring_intervalId = setInterval(this.update_users,3000);
        console.log("Monitoreo activado!!");
    }

    stopMonitoring(){
        setTimeout(() => {
            clearInterval(this.monitoring_intervalId);
            console.log('Monitoreo detenido!!');
        }, 10000);
    }

    updateUsers(){
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

    getFabProds(){
        for (const user of this.list_users_fabs) {
            this.fabs_handler.setUser(user);
            for (const prod of this.fabs_handler.fabs_data.fabs){
                this.list_fab_prods.push({"user":user,"prod": prod});
            }
        }
    }

    getCartProds(){
        for (const user of this.list_users_cart) {
            this.cart_handler.setUser(user);
            for (const prod of this.cart_handler.shopping_cart.cart){
                this.list_cart_prods.push({"user":user,"prod": prod});
            }
        }
    }



}

exports.handler = new command_center();