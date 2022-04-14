//aba de variáveis:
let xBolinha = 300;
let yBolinha = 200;
let dBolinha = 15;

let rBolinha = dBolinha / 2;

let velXBolinha = 6;
let velYBolinha = 6;

let xRaquete = 5;
let yRaquete = 150;
let compRaquete = 10;
let altRaquete = 90;

let colidiu = false;

let xOponente = 585;
let yOponente = 150;
let velYOponente;

let meusPontos = 0;
let pontosOponente = 0;

let raquetada;
let ponto;
let trilha;

let chanceDeErrar = 0;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada =loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  moveBolinha();
  verificaBordas();
  mostraRaquete(xRaquete, yRaquete);
  moveMinhaRaquete();
  verificaMinhaRaquete();
  colideBiblioteca(xRaquete, yRaquete);
  mostraRaquete(xOponente, yOponente);
  movimentaOponente();
  colideBiblioteca(xOponente, yOponente);
  bolinhaNaoFicaPresa();
  incluiPlacar();
  marcaPonto();
}

function bolinhaNaoFicaPresa(){
  if(xBolinha - rBolinha < xRaquete && yBolinha - rBolinha < yRaquete + altRaquete && yBolinha + rBolinha > yRaquete){
    xBolinha *= 3
  } 
}
     
function mostraBolinha(){
  circle(xBolinha, yBolinha, dBolinha);
}

function moveBolinha(){
  xBolinha += velXBolinha;
  yBolinha += velYBolinha;
}

function verificaBordas(){
  if(xBolinha + rBolinha > width || xBolinha - rBolinha < 0){
    velXBolinha *= -1;
  }
  if(yBolinha + rBolinha > height || yBolinha - rBolinha <0){
    velYBolinha *= -1;
  }
}

function mostraRaquete(x, y){
  rect(x, y, compRaquete, altRaquete);
}

function moveMinhaRaquete(){
  if(keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if(keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
}

function verificaMinhaRaquete(){
  if(xBolinha - rBolinha < xRaquete + compRaquete && yBolinha - rBolinha < yRaquete + altRaquete && yBolinha + rBolinha > yRaquete){
    velXBolinha *= -1;
  }
}

function colideBiblioteca(x, y){
  colidiu =
  collideRectCircle(x, y, compRaquete, altRaquete, xBolinha, yBolinha, rBolinha);
  if(colidiu){
   velXBolinha *= -1; 
    raquetada.play();
  }
}

function movimentaOponente(){
  if(keyIsDown(87)){
    yOponente -= 10;
  }
  if(keyIsDown(83)){
    yOponente += 10;
  }
}

function incluiPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(255, 140, 0));
  rect (450, 10, 40, 20);
  fill(255);
  text(pontosOponente, 470, 26);
}

function marcaPonto(){
  if (xBolinha > 590){
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 10){
    pontosOponente += 1;
    ponto.play();
  }
}