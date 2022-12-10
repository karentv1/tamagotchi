import * as GameEngine from "../scripts/game.js";

// Global variables for Canvas
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
const canvasWidth = 1024 
const canvasHeight = 576

// Define Buttons
var playButton = new GameEngine.GameObject(100, canvas.height-100, 25, 100, 0, 0, 'white', c)
var feedButton = new GameEngine.GameObject(250, canvas.height-100, 25, 100, 0, 0, 'white', c)
var statusButton = new GameEngine.GameObject(500, canvas.height-100, 25, 100, 0, 0, 'white', c)
var mateButton = new GameEngine.GameObject(750, canvas.height-100, 25, 100, 0, 0, 'white', c)
let buttons = [
  playButton,
  feedButton,
  statusButton,
  mateButton
]

// Add event listener to Canvas for buttons
canvas.addEventListener("click", function (evt) {
  var mousePos = getMousePos(canvas, evt);
  console.log(mousePos.x + ',' + mousePos.y);

  buttons.forEach((button => {
    if (button.checkCollision(mousePos.x, mousePos.y,
      button.x, button.y,
      button.width, button.height))
      {
        button.color = "blue";
      }
  }))

}, false);


function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
  };
}

// Define Tamagotchi Sprite
let spritesToRender = []
var myTamaIdle = new GameEngine.Sprite(canvasWidth/2, canvasHeight/2, 
  29, 31, 0, 0, 'white', c, "img/tamagotchi.png", 
  290, 7, 50)

var myTamaIdle_2 = new GameEngine.Sprite(canvasWidth/3, canvasHeight/3, 
29, 31, 0, 0, 'white', c, "img/tamagotchi.png", 
290, 7, 50)

spritesToRender.push(myTamaIdle)
spritesToRender.push(myTamaIdle_2)

// Set onload function for all sprites in spritesToRender
spritesToRender.forEach((sprite) => {
  sprite.img.onload = function() {
    init();
  }
})

const cycleLoop = [0,1];
let currentLoopIndex = 0;
let frameCount = 0;

function step() {
  frameCount++;
  if (frameCount < myTamaIdle.fps) {
    window.requestAnimationFrame(step);
    return;
  }
  frameCount = 0;
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.fillStyle = 'pink'
  c.fillRect(0, 0, canvas.width, canvas.height);
  myTamaIdle.render(cycleLoop[currentLoopIndex], 0, 350, 150); // sprite thing 350 150
  myTamaIdle_2.render(cycleLoop[currentLoopIndex], 0, 240, 100); // sprite thing 350 150

  buttons.forEach((button => {
    button.render()
  }))

  currentLoopIndex++;
  if (currentLoopIndex >= cycleLoop.length) {
    currentLoopIndex = 0;
  }
  window.requestAnimationFrame(step);
}

function init() {
  window.requestAnimationFrame(step);
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