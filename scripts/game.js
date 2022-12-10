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

export class FeedButton extends GameObject {
}

export class Sprite extends GameObject {
  constructor(x, y, height, width, vx, vy, color='white', canvas, img, offset, scale, fps){
    super(x, y, height, width, vx, vy, color='white', canvas)
    this.img = new Image() // image object
    this.img.src = img // image source
    this.offset = offset
    //this.animations = animations // represents each state of the sprite (standing, sitting, etc.)
    this.scale = scale
    this.fps = fps
  }

  render(frameX, frameY, canvasX, canvasY){
    this.canvas.drawImage(this.img,
                  frameX * this.width, (frameY * this.height)+this.offset, this.width, this.height,
                  canvasX, canvasY, this.scale * this.width, this.scale * this.height);
    } //offset = 290
}