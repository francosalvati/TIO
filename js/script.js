"use strict";

const sucursales = ["Brewery Playa Grande","Brewery Constitución", "Brewery San Telmo", "Brewery Caballito", "Brewery Las Lomitas", "Brewery Campana", "Brewery City Bell", "Brewery Quilmes", "Brewery Berazategui", "Parador Brewery La Plata", "Brewery  La Plata", "Brewery San Isidro", "Brewery Ramos Mejía", "Brewery Bahía Blanca", "Parador Brewery Vicente López", "Brewery Pilar", "Parador Brewery Córdoba", "Brewery Córdoba", "Parador Brewery Villa del Parque", "Brewery Naón", "Brewery Ituzaingó", "Brewery Tucuman", "Brewery Necochea", "Brewery Rosario", "Parador Brewery Villa Urquiza", "Parador Brewery Rosario", "Brewery Calle Olavarria", "Brewery Tandil"];

document.addEventListener("DOMContentLoaded",()=>{
    const url = window.location.pathname.split("/");
    const path = url[url.length-1].slice(0,-5);
    switch(path){
        case"index":
            const contador = document.querySelector("#odometer");
            odometer(contador);
            break;
        case"sucursales":
            let pagina=1;
            const comentarios = document.querySelector("#idComentarios");
            const paginadoIzquierda = document.querySelector("#pagIzq");
            paginadoIzquierda.addEventListener("click",()=>{
                if(pagina>1){
                    pagina-=1;
                    comentarios.innerHTML = "";
                    getUsuarios(pagina).then(users=>{
                        for(const user of users.data){
                            let comentario = generarComentario(user);
                            comentarios.appendChild(comentario);
                        }
                    });
                }
            });
            const paginadoDerecha = document.querySelector("#pagDer");
            paginadoDerecha.addEventListener("click",()=>{
                if(pagina<3){
                    pagina+=1;
                    comentarios.innerHTML = "";
                    getUsuarios(pagina).then(users=>{
                        for(const user of users.data){
                            let comentario = generarComentario(user);
                            comentarios.appendChild(comentario);
                        }
                    });
                }
            });
            getUsuarios(pagina).then(users=>{
                for(const user of users.data){
                    let comentario = generarComentario(user);
                    comentarios.appendChild(comentario);
                }
            });
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

function generarComentario(usuario){
    let card = document.createElement("div");
    let valoracion = '<i class="fi fi-br-beer"></i>';
    for(let i=0; i<Math.floor(Math.random() * 3)+2; i++)
        valoracion+='<i class="fi fi-br-beer"></i>';
    card.innerHTML = `<div class="card">
                        <span class="imagen" style="background: url('${usuario.avatar}') no-repeat center/cover;"></span>
                        <h1>${sucursales[Math.floor(Math.random()*sucursales.length-1)]} <span>@${usuario.first_name}</span></h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque consectetur, quidem laborum illum eius id quisquam vero accusamus dolor aspernatur, officia aliquid! Illum eius dignissimos, doloremque explicabo optio quia rerum!</p>
                        <span class="valoracion">valoración: ${valoracion}</span>
                    </div>`
    return card;
}

async function getUsuarios(pagina){
    try{
        let respuesta = await fetch(`https://reqres.in/api/users?per_page=4&page=${pagina}`);
        if(respuesta.ok){
            let arreglo = await respuesta.json();
            return arreglo;
        }
    }catch(error){
        console.log(error);
    }
}

function agregarUsuarios(comentarios, usuarios){
    console.log(comentarios);
    console.log(usuarios);
}

function odometer(elem){
    let inicio = Math.floor(Math.random()*10000)+1000;
    elem.innerHTML = inicio;
    setInterval(() => {
        inicio = inicio + Math.floor(Math.random()*1000)+50;
        elem.innerHTML = inicio;
    }, 5000);
}
