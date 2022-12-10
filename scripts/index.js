
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = 1024
canvas.height = 576
c.fillRect(0, 0, canvas.width, canvas.height)


let img = new Image();
img.src = 'img/tamagotchi.png';
img.onload = function() {
  init();
};

function changeColor() {
  const custom_color = document.querySelector('#colorpicker').value
  document.body.style.backgroundColor = custom_color;
}

class GameObject {
  constructor(x, y, height, width, vx, vy, color='white', canvas){
    this.x=x
    this.y=y

    this.height =height
    this.width = width

    this.vx = vx
    this.vy = vy

    this.color = color
    this.canvas = canvas
  }

  update(){
    // this stinks
    if (this.x + this.vx >= canvas.width || this.x + this.vx <= 0){
      this.vx = - this.vx;
    } 
    if (this.y + this.vy >= canvas.height || this.y + this.vy <= 0){
      this.vy = - this.vy;
    }
    this.x += this.vx
    this.y += this.vy
  }
  render(){
    this.canvas.fillStyle = this.color
    this.canvas.fillRect(this.x, this.y, this.width, this.height)
  }
}

class Sprite extends GameObject {
  constructor(x, y, height, width, vx, vy, color='white', canvas,img, offsetX, offsetY,animations, scale){
    super(x, y, height, width, vx, vy, color='white', canvas)
    this.img = img
    this.offsetX = offsetX
    this.offsetY =offsetY
    this.animations = animations
    this.currentFrame = 0
  }

  render(){
    if (this.currentFrame > this.animations.maxFrame){
      this.currentFrame = 0;
    } 
    this.canvas.drawImage(img,
      this.currentFrame * this.width, this.height + this.offsetY, this.width, this.height,
      this.x, this.y, this.width * this.scale, this.scale *this.height);
  }
}



var myObject = new GameObject(100,100,25,25,1,5,'blue', c)

var playButton = new GameObject(100, canvas.height-100, 25, 100, 0, 0, 'white', c)
var feedButton = new GameObject(250, canvas.height-100, 25, 100, 0, 0, 'white', c)
var statusButton = new GameObject(500, canvas.height-100, 25, 100, 0, 0, 'white', c)
var mateButton = new GameObject(750, canvas.height-100, 25, 100, 0, 0, 'white', c)
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

tamaButton.yell()