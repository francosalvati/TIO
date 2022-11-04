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
            let operaciones = ["+", "-", "*"];
            let cuenta = (Math.floor(Math.random()*100)+1)+operaciones[Math.floor(Math.random()*operaciones.length)]+(Math.floor(Math.random()*100)+1);
            const captcha = document.querySelector("#suma-captcha");
            captcha.innerHTML = cuenta;
            const formContacto = document.querySelector("#form-contacto");
            formContacto.addEventListener("submit",(e)=>{
                e.preventDefault();
                let datos = getData(formContacto);
                const msgError = document.querySelector("#error");
                console.log(cuenta);
                if(!datos.gusta){
                    msgError.innerHTML = "Si no te gusta la cerveza entonces no nos interesa su contacto, que tenga un buen dia"
                    msgError.classList.remove("message-success");
                    msgError.classList.add("message-error");
                }
                else{
                    if(datos.nombre && datos.apellido && datos.email && datos.pais && datos.ciudad && datos.consulta && datos.resultado){
                        console.log(datos.resultado);
                        if(datos.resultado == eval(cuenta)){
                            let form = new FormData(formContacto);
                            enviarMail(formContacto, form);
                            formContacto.reset();
                            msgError.innerHTML = "Gracias por contactarte con nosotros, contestaremos lo antes posible";
                            msgError.classList.remove("message-error");
                            msgError.classList.add("message-success");
                        }
                        else{
                            msgError.innerHTML = "El captcha esta mal resuelto!";
                            msgError.classList.remove("message-success");
                            msgError.classList.add("message-error");    
                        }
                    }
                    else{
                        msgError.innerHTML = "Algo no salio bien, no intentes romper el formulario por favor";
                        msgError.classList.remove("message-success");
                        msgError.classList.add("message-error");
                    }
                }
            })
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

async function enviarMail(form, data){
    try{
        console.log(form.action, form.method)
        let respuesta = await fetch(form.action, {
                                    method: form.method,
                                    body: data,
                                    headers: {
                                        'Accept': 'application/json'
                                    }
        })
        if(respuesta.ok){
            console.log("mensaje enviado");
        }
    }
    catch(error){
        console.log(error);
    }
}

function getData(formulario){
    let form = new FormData(formulario);
    let respuesta = {
        nombre : form.get("nombre"),
        apellido : form.get("apellido"),
        telefono : form.get("telefono"),
        email : form.get("email"),
        pais : form.get("pais"),
        ciudad : form.get("ciudad"),
        gusta : Boolean(form.get("gusta")),
        consulta : form.get("consulta"),
        resultado : form.get("captcha")
    };
    return respuesta;
}