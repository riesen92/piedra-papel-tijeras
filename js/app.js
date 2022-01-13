'use strict';

const animacionJugador = document.getElementById('animacion-jugador');
const animacionIa = document.getElementById('animacion-ia');
const animacionIa1 = document.getElementById('ia-animacion');
const imgeleccion = document.getElementById('img-eleccion');

const ronda = document.getElementById('ronda');
const puntaje = document.getElementById('puntaje');
const aviso = document.getElementById('aviso');
const ultimosPtsTabla = document.getElementById('tabla-ultimos');

const juego = { numero: 0, puntaje: 0 };


const gana = 100;
const pierde = -30;
const empata = 0; 

let lista = '';
let ele = '';
let puntuacion = [];


const imagenesEleccion = [
  {
    eleccion: 'piedra',
    usuario_url: './img/jugador/piedra-jugador1.gif',
    ia_url: './img/ia/piedra-ia1.gif',
  },
  {
    eleccion: 'papel',
    usuario_url: './img/jugador/papel-jugador1.gif',
    ia_url: './img/ia/papel-ia1.gif',
  },
  {
    eleccion: 'tijera',
    usuario_url: './img/jugador/tijera-jugador1.gif',
    ia_url: './img/ia/tijera-ia1.gif',
  },
];

const seleccion = [
  { usuario: 'piedra', ia: 'piedra', resultado: 'empate', pts: empata },
  { usuario: 'papel', ia: 'papel', resultado: 'empate', pts: empata },
  { usuario: 'tijera', ia: 'tijera', resultado: 'empate', pts: empata },

  { usuario: 'papel', ia: 'piedra', resultado: 'gana', pts: gana },
  { usuario: 'tijera', ia: 'papel', resultado: 'gana', pts: gana },
  { usuario: 'piedra', ia: 'tijera', resultado: 'gana', pts: gana },

  { usuario: 'tijera', ia: 'piedra', resultado: 'pierde', pts: pierde },
  { usuario: 'piedra', ia: 'papel', resultado: 'pierde', pts: pierde },
  { usuario: 'papel', ia: 'tijera', resultado: 'pierde', pts: pierde },
];

const usuario = async (eleccion) => {
  const { eleccion: eleccionUsuario, usuario_url } = imagenesEleccion.filter(
    (el) => el.eleccion === eleccion
  )[0];
  animacionJugador.setAttribute('src', usuario_url);

  return { eleccionUsuario };
};

const ia = async () => {

  const azar = Math.floor(Math.random() * 3);
  const azar1 = Math.floor(azar);

  switch (azar1) {
    case 0:
      ele = 'piedra';
      break;
    case 1:
      ele = 'papel';
      break;
    case 2:
      ele = 'tijera';
      break;
  }

  const { eleccion: eleccionIa, ia_url } = imagenesEleccion.filter(
    (el) => el.eleccion === ele )[0];

  animacionIa.setAttribute('src', ia_url);

  return { eleccionIa };
};

const turno = (pts) => {

  juego.puntaje = juego.puntaje + pts;
  juego.numero++;

  ronda.innerText= juego.numero+' Ronda'
  puntaje.innerText = 'PUNTAJE= ' + juego.puntaje;  

  if (juego.numero === 10) {    
    
    puntaje.innerText = 'PUNTAJE FINAL= ' + juego.puntaje; 
    puntuacion.unshift(juego.puntaje);
    puntuacion.length > 5 && puntuacion.pop();
    localStorage.removeItem('puntuacion');
    localStorage.setItem('puntuacion', puntuacion);

    lista = puntuacion.reduce((i, el) => (i += `<tr><td>${el}</td></tr>`),'' );
    
    ultimosPtsTabla.innerHTML = lista;
  }
};

const mensaje = (resultado) => {
  if (resultado === 'gana') {
    aviso.innerText = 'Ganaste';
  } else if (resultado === 'pierde') {
    aviso.innerText = 'Perdiste';
  } else {
    aviso.innerText = 'Empate';
  }
};


const arbitro = (usuario, ia) => {
  
  const { resultado, pts } = seleccion.filter(
    (el) => el.usuario === usuario && el.ia === ia
  )[0];
  turno(pts);  
  setTimeout(() => {
    mensaje(resultado);
    animacionIa1.setAttribute('src', './img/ia/ok1.png');
  }, 1000);

};


const jugar = async (eleccion) => {
  if(juego.numero>=10){
    termino();
  }
  else{
  animacionIa1.setAttribute('src', './img/ia/pensando.gif');
  const { eleccionUsuario } = await usuario(eleccion);  
  const { eleccionIa } = await ia();

  arbitro(eleccionUsuario,eleccionIa);
}
};


const termino = ()=>{    
    juego.numero = 0;
    juego.puntaje = 0;           

  animacionJugador.setAttribute('src', './img/ia/0i.jpg');
  animacionIa.setAttribute('src', './img/jugador/0j.jpg');

  alert('Termino de ronda');
  aviso.innerText = '';
};


window.addEventListener('DOMContentLoaded', () => {

  ultimosPtsTabla.innerHTML = localStorage
    .getItem('puntuacion')
    .split(',')
    .reduce((acc, el) => (acc += `<tr><td>${el}</td></tr>`), '');
  puntuacion = localStorage.getItem('puntuacion').split(',');
  
});
