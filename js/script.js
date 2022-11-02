"use strict";

document.addEventListener("DOMContentLoaded",()=>{
    const url = window.location.pathname.split("/");
    const path = url[url.length-1].slice(0,-5);
    switch(path){
        case"index":
            //aca van las funcionalidades de la seccion index
            const contador = document.querySelector("#odometer");
            odometer(contador);
            break;
        case"sucursales":
            //aca van las funcionalidades de la seccion sucursales
            break;
        case "contacto":
            //aca van las funcionalidades de la seccion contacto
            break;
        default:
            console.log("este error no deberia ocurrir");
    }
    const btnCruz = document.querySelector("#cruz");
    const btnDespliegue = document.querySelector("#desp");
    const nav = document.querySelector("#nav");
    btnCruz.addEventListener("click",()=>{
        nav.style.transform = "translate(-100%)";
        btnCruz.style.display = "none";
        btnDespliegue.style.display = "initial";
    });
    btnDespliegue.addEventListener("click",()=>{
        nav.style.transform = "translate(0)";
        btnCruz.style.display = "initial";
        btnDespliegue.style.display = "none";
    })
});

//aca van las funciones de utilidad
function odometer(elem){
    let inicio = Math.floor(Math.random()*10000)+1000;
    elem.innerHTML = inicio;
    setInterval(() => {
        inicio = inicio + Math.floor(Math.random()*1000)+50;
        elem.innerHTML = inicio;
    }, 5000);
}