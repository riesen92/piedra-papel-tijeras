'use strict'

const login = () =>{

const usuario1 = document.getElementById('usuario');
const clave = document.getElementById('clave');

const avisoUsuario = document.getElementById('usuario-aviso');
const avisoClave = document.getElementById('clave-aviso');
const aviso1 = document.getElementById('validacion-aviso');

const login = document.getElementById('login');
const juego1 = document.getElementById('juego');

const user='admin';
const pass='12345';

    if(usuario1.value.length < 1 || usuario1.value == '' ){
        avisoUsuario.style.display='flex';
        }else{
            avisoUsuario.style.display='none';
        }

    if(clave.value.length < 1 || clave.value == '' ){
        avisoClave.style.display='flex';
        }else{
            avisoClave.style.display='none';
        }
  
    if(usuario1.value === user && clave.value === pass){        
           login.style.display ='none';
           juego1.style.display ='block'       
    }else if(usuario1.value === user && clave.value != pass){
        aviso1.innerText='Contraseña incorrecta';
        aviso1.style.display='flex';
    }else if(usuario1.value != user && clave.value === pass){
        aviso1.innerText='Usuario incorrecto';
        aviso1.style.display='flex';
    }else if(usuario1.value != user && clave.value != pass){
        aviso1.innerText='Usuario y Contraseña incorrecto';
        aviso1.style.display='flex';
}


}



