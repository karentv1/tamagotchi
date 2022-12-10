import * as GameEngine from "../scripts/game.js";


const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')




let img = new Image();
img.src = 'img/tamagotchi.png';
img.onload = function() {
  init();
};




var myObject = new GameEngine.GameObject(100,100,25,25,1,5,'blue', c)

var playButton = new GameEngine.GameObject(100, canvas.height-100, 25, 100, 0, 0, 'white', c)
var feedButton = new GameEngine.GameObject(250, canvas.height-100, 25, 100, 0, 0, 'white', c)
var statusButton = new GameEngine.GameObject(500, canvas.height-100, 25, 100, 0, 0, 'white', c)
var mateButton = new GameEngine.GameObject(750, canvas.height-100, 25, 100, 0, 0, 'white', c)
var buttons = {
  playButton,
  feedButton,
  statusButton,
  mateButton
} 

// function animate() {
//   window.requestAnimationFrame(animate)
//   c.fillStyle = 'black'
//   c.fillRect(0, 0, canvas.width, canvas.height)
//   myObject.update()
//   myObject.render()
//   playButton.render()
//   feedButton.render()
//   statusButton.render()
//   mateButton.render()
// }
const scale = 7;
const width = 31 ;
const height = 29;
const scaledWidth = scale * width;
const scaledHeight = scale * height;

function drawFrame(frameX, frameY, canvasX, canvasY) {
  c.drawImage(img,
                frameX * width, (frameY * height)+290, width, height,
                canvasX, canvasY, scaledWidth, scaledHeight);
}

const cycleLoop = [0,1];
let currentLoopIndex = 0;
let frameCount = 0;

function step() {
  frameCount++;
  if (frameCount < 50) {
    window.requestAnimationFrame(step);
    return;
  }
  frameCount = 0;
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.fillStyle = 'pink'
  c.fillRect(0, 0, canvas.width, canvas.height);
  drawFrame(cycleLoop[currentLoopIndex], 0, 350, 150); // sprite thing
  playButton.render()
  feedButton.render()
  statusButton.render()
  mateButton.render()
  currentLoopIndex++;
  if (currentLoopIndex >= cycleLoop.length) {
    currentLoopIndex = 0;
  }
  window.requestAnimationFrame(step);
}

function init() {
  window.requestAnimationFrame(step);
}

function checkCollision(px, py, rx, ry, rw, rh){
    if (px >= rx &&         // right of the left edge AND
    px <= rx + rw &&    // left of the right edge AND
    py >= ry &&         // below the top AND
    py <= ry + rh) {    // above the bottom
        return true;
  }
  return false;
}

canvas.addEventListener("click", function (evt) {
  var mousePos = getMousePos(canvas, evt);
  console.log(mousePos.x + ',' + mousePos.y);
}, false);

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
  };
}

window.playMusic = playMusic;
window.changeColor = changeColor;

let play = false
var audio = new Audio('music/song.m4a');
function playMusic(){
  var note = document.querySelector('.note')
  if (play == true){
    audio.pause()
    play = false;
    note.src = 'img/cross.png'
    return
  }
  audio.play();
  play = true;
  note.src = 'img/note.png'
}

function changeColor() {
  const custom_color = document.querySelector('#colorpicker').value
  document.body.style.backgroundColor = custom_color;
}