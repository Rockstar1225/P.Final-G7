let global_user = "";

function setUser(){
    let user = document.querySelector("#init_user").value;
    console.log("Valor de usuario",user);
    global_user = user;    
}