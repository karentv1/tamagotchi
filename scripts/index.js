const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

canvas.width = 1024
canvas.height = 576
c.fillRect(0, 0, canvas.width, canvas.height)



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
      this.vx = -this.vx;
    } 
    if (this.y + this.vy >= canvas.height || this.y + this.vy <= 0){
      this.vy =-this.vy;
    }
    this.x += this.vx
    this.y += this.vy
  }
  render(){
    this.canvas.fillStyle = this.color
    this.canvas.fillRect(this.x, this.y, this.width, this.height)
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

function animate() {
  window.requestAnimationFrame(animate)
  c.fillStyle = 'black'
  c.fillRect(0, 0, canvas.width, canvas.height)
  myObject.update()
  myObject.render()
  playButton.render()
  feedButton.render()
  statusButton.render()
  mateButton.render()

}



animate()
