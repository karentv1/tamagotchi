export class GameObject {
  constructor(x, y, height, width, vx, vy, color='white', canvas){
    this.x=x
    this.y=y

    this.height = height
    this.width = width

    this.vx = vx
    this.vy = vy

    this.color = color
    this.canvas = canvas
  }

  render(){
    this.canvas.fillStyle = this.color
    this.canvas.fillRect(this.x, this.y, this.width, this.height)
  }
  
  checkCollision(px, py, rx, ry, rw, rh){
    if (px >= rx &&         // right of the left edge AND
    px <= rx + rw &&    // left of the right edge AND
    py >= ry &&         // below the top AND
    py <= ry + rh) {    // above the bottom
        return true;
    }
  return false;
  }
}

export class TamaButton extends GameObject {
  constructor(x, y, height, width, vx, vy, color='white', canvas, clickEvent){
    super (x, y, height, width, vx, vy, color='white', canvas)
    this.clickEvent = clickEvent;
  }
}

export class Sprite extends GameObject {
  constructor(x, y, height, width, vx, vy, color='white', canvas, img, offset, scale, frames, animationFrames){
    super(x, y, height, width, vx, vy, color='white', canvas)
    this.img = new Image() // image object
    this.img.src = img // image source
    this.offset = offset
    //this.animations = animations // represents each state of the sprite (standing, sitting, etc.)
    this.scale = scale
    this.frames = frames
    this.animationFrames = animationFrames //list of cycle loops
    this.currentFrameX = 0
    this.currentFrameY = 0; // this moves us down the y-axis for sprite sheet
    this.frameCount = 0;
  }


  render(){
    this.canvas.drawImage(
      this.img,
      this.animationFrames[this.currentFrameX] * this.width, 
      (this.currentFrameY * this.height)+this.offset,  
      this.width, 
      this.height,
      this.x, 
      this.y, 
      this.scale * this.width, 
      this.scale * this.height);

      this.frameCount++;
      if (this.frameCount >= this.frames) {
        this.currentFrameX++;
        this.frameCount = 0;
        if (this.currentFrameX >= this.animationFrames.length) {
          this.currentFrameX = 0;
        }
      }

    } //offset = 290
}