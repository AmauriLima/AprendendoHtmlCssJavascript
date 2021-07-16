let altura;
let largura;
let mosca;
let totVidas = 3;
var spawningMoscas;

let variaveis = window.location.search;
 
variaveis = variaveis.replace('?', '').split(',');
const nivel = variaveis[0];
const tempo = variaveis[1]
console.log(nivel);
console.log(tempo);
let tempoSpawn = 1500;
if (nivel === 'normal') {
  tempoSpawn = 1500;
} else if (nivel === 'dificil') {
  tempoSpawn = 1000;
} else if (nivel === 'mwzera') {
  tempoSpawn = 750;
}
function spawningMoscas() {
  spawningMoscas = window.setInterval(function () {
    spawnMosca()
  }, tempoSpawn);
}

function removeMosca(mosca) {
  mosca.remove();
  loseLife(totVidas);
}


function loseLife(vidas) {
  if (vidas >= 1){
    let vida = document.querySelector(`#vida${vidas}`);
    vida.className = `coracao vazio`;
    totVidas--;
  } else {
    window.location.href = 'gameOver.html';
  }
}

function ajustaTamanhoPalcoJogo() {
  altura = window.innerHeight;
  largura = window.innerWidth;
}
function spawnMosca() {
  ajustaTamanhoPalcoJogo();
  
  
  if (document.querySelector('#mosca')) {
    removeMosca(mosca);
  }
  mosca = document.createElement('img');
  var mTop = geraMargin(altura - 90);
  var mLeft = geraMargin(largura - 90);
  var size = randomSize();
  var side = randomSide();
  criaMosca(mTop, mLeft, size, side);
  mosca.onclick = function() {
    this.remove();
  }

  document.body.appendChild(mosca);

}

function criaMosca(mTop, mLeft, size, side) {
  mosca.src = 'assets/images/mosca.png';
  mosca.className = `${size} ${side}`;
  mosca.style.marginTop = mTop + "px";
  mosca.style.marginLeft = mLeft + "px";
  mosca.position = 'absolute';
  mosca.id = 'mosca';
}

function randomSize() {
  var classe = Math.floor(Math.random() * 3) + 1;
  return `mosca${classe}`
}

function randomSide() {
  var classe = Math.floor(Math.random() * 2) + 1;
  return `lado${classe}`
}

function geraMargin(marginMax) {
  var margin = Math.random() * marginMax;
  return Math.floor(margin);
}

const timer = document.querySelector('#tempo');

let second = 10;
if (tempo === 'dez') {
  second = 10;
} else if (tempo === 'vinte') {
  second = 20;
} else if (tempo === 'trinta'){
  second = 30;
} else if (tempo === 'sessenta') {
  second = 60;
}
  
function cronometro() {
  timer.innerHTML = second;
  let cronometro = window.setInterval(function() {
    second--;
    if (second < 0) {
      window.location.href = 'vitoria.html';
      clearInterval(cronometro);
      clearInterval(spawningMoscas)
    } else {
      timer.innerHTML = second;
    }
  }, 1000)
}