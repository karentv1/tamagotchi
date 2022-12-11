import * as GameEngine from "../scripts/game.js";

// Global variables for Canvas
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
const canvasWidth = 1024 
const canvasHeight = 576

// Define Buttons
var a =  ( ) => {
  console.log('you clicked a playbutton')
}
var b = () => {
  console.log("you clicked feed")
}



var animations = {
  idle: {
    frames: [0,1],
    width: 31,
    offset:0
  },
  sleep:{
    frames: [0,1,2],
    width:30,
    offset:447
  }
}

console.log(animations['sleep'].frames)
console.log(animations['sleep'].width)
//Report the mouse position on click
canvas.addEventListener("click", function (evt) {
  var mousePos = getMousePos(canvas, evt);
  buttons.forEach((button => {
    if (button.checkCollision(mousePos.x, mousePos.y,
      button.x, button.y, 
      button.width, button.height)){
        button.clickEvent();      
      }}))
}, false);



//Get Mouse Position
function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
  };
}

// Define Tamagotchi Sprite
let spritesToRender = []
const cycleLoop = [0,1];
var myTamaIdle = new GameEngine.Sprite(canvasWidth/2, canvasHeight/2, 
  29, 31, 0, 0, 'white', c, "img/tamagotchi.png", 
  290, 0, 7, 20, cycleLoop, animations)
var myTamaIdle2 = new GameEngine.Sprite(canvasWidth/3, canvasHeight/3, 
  29, 31, 0, 0, 'white', c, "img/tamagotchi.png", 
  290, 0, 7, 100, [0,1,2,3,2,0,1], animations)

var blueTama = new GameEngine.Sprite(200, 200, 
32, 32, 0, 0, 'white', c, "img/bluetama.png", 
0, 7, 0, 100, [0,1,2,3,2,0,1], animations)

var playButton = new GameEngine.TamaButton(100, canvas.height-100, 25, 100, 0, 0, 'white', c, function(){
  myTamaIdle.changeAnimation('sleep')
})
var feedButton = new GameEngine.TamaButton(250, canvas.height-100, 25, 100, 0, 0, 'white', c, function(){
  myTamaIdle.changeAnimation('idle')
})
var statusButton = new GameEngine.TamaButton(500, canvas.height-100, 25, 100, 0, 0, 'white', c, a)
var mateButton = new GameEngine.TamaButton(750, canvas.height-100, 25, 100, 0, 0, 'white', c, a)
let buttons = [
  playButton,
  feedButton,
  statusButton,
  mateButton
]

spritesToRender.push(myTamaIdle)
spritesToRender.push(myTamaIdle2)
spritesToRender.push(blueTama)

console.log(myTamaIdle.animations['sleep'].frames)

var frameCount = 0;
var now = Date.now();
var then = now;
var time_for_new_frame = 1000

function frameController(){
  now = Date.now()
  console.log(now)
  console.log(then)
  if ((now - then) > time_for_new_frame){
    requestAnimationFrame(step)
    then = now;
  }
}
var start = Date.now()
console.log(start)
var count = 0
var currentTime = 0;
var currentFps = 0;
function step() {
  currentTime = Date.now()
  count++
  currentFps = (count / (currentTime - start))

  c.clearRect(0, 0, canvas.width, canvas.height);
  c.fillStyle = 'pink'
  c.fillRect(0, 0, canvas.width, canvas.height);

  spritesToRender.forEach((sprite => {
    sprite.render()
  }))
  buttons.forEach((button => {
    button.render()
  }))
  c.font = "24px serif";
  c.fillText(fps + ' fps', 10, 25);
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
  const customColor = document.querySelector('#colorpicker').value
  document.body.style.backgroundColor = customColor;
}
var fps = 60

var intervalId = window.setInterval(function(){
  window.requestAnimationFrame(step)
}, (1/fps) * 1000);