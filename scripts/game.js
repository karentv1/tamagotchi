export class tamaButton {
  constructor(){}
  yell() {
    console.log('aaaaaaaaaaaaaaaaa')
  }
}

export function yell(){
  console.log('aaaaa')
}

export class GameObject {
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