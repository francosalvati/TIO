"use strict";

document.addEventListener("DOMContentLoaded",()=>{
    const popup = document.querySelector(".popup");
    const altoAhi = document.querySelector(".verificador img");
    const formEdad = document.querySelector("#formEdad");
    if(localStorage.getItem("esMayor")==="si"){
        document.querySelector("div.verificador").remove();
        document.querySelector(".head-nav").classList.remove("blur");
        document.querySelector("#main").classList.remove("blur");
    }
    formEdad.addEventListener("submit",(e)=>{
        e.preventDefault();
        let formData = new FormData(formEdad);
        let fecha = formData.get("fecha");
        if(retornarEdad(fecha) < 18 || (retornarEdad(fecha)===null)){
            localStorage.setItem("esMayor", "no");
            window.open("https://www.danonino.com.ar/");
        }
        else{
            localStorage.setItem("esMayor", "si");
            popup.classList.add("desaparecer");
            altoAhi.classList.add("desaparecer-translate");
            setTimeout(()=>{
                document.querySelector(".verificador").remove();
            }, 1000);
            document.querySelector("#main").classList.remove("blur");
            document.querySelector(".head-nav").classList.remove("blur");
        }
    });
});

function retornarEdad(fecha){
    if(fecha === "")
        return null;
    let hoy = new Date();
    let cumple = new Date(fecha);
    let edad = hoy.getFullYear() - cumple.getFullYear();
    let mes = hoy.getMonth() - cumple.getMonth();
    if(mes < 0 || (mes === 0 && hoy.getDate() < cumple.getDate())){
        edad--;
    }
    return edad;
}