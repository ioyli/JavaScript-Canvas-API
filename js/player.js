class InputHandler {
  constructor(){
    this.keys = [];
    window.addEventListener('keydown', e => {
      if ((   e.key === 's' ||
              e.key === 'w' ||
              e.key === 'a' ||
              e.key === 'd')
              && this.keys.indexOf(e.key) === -1){
        this.keys.push(e.key);
      }
    });
    window.addEventListener('keyup', e => {
      if (    e.key === 's' ||
              e.key === 'w' ||
              e.key === 'a' ||
              e.key === 'd' ){
        this.keys.splice(this.keys.indexOf(e.key), 1);
      }
    });
  }
}


class Player {
  constructor(gameWidth, gameHeight){
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.width = 200;
    this.height = 200;
    this.x = 0;
    this.y = this.gameHeight - this.height;
    this.image = document.getElementById('playerImage')
    this.frameX = 0;
    this.maxFrame = 8;
    this.FrameY = 0;
    this.fps = 20
    this.frameTimer = 0
    this.frameInterval = 1000/this.fps;
    this.speed = 0; 
    this.vy = 0;
    this.weight = 1;
}
draw(context){ 
    //context.fillStyle = 'white';
    //context.fillRect(this.x, this.y, this.width, this.height);
    context.drawImage(this.image, this.frameX * this.width, this.FrameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
}
update(input, deltaTime){ 
  // sprite animation
  if (this.frameTimer > this.frameInterval){ 
      if (this.frameX >= this.maxFrame) this.frameX = 0;
      else this.frameX++;
      this.frameTimer = 0;
  } else { 
      this.frameTimer += deltaTime;
  }
  // controls
  if (input.keys.indexOf('d') > -1){
      this.speed = 5;
    } else  if (input.keys.indexOf('a') > -1){
      this.speed = -5;
    } else  if (input.keys.indexOf('w') > -1 && this.onGround()){
      this.vy -= 30;
    } else {
      this.speed = 0;
    }
    // horizontal movement
    this.x+= this.speed;
    if (this.x < 0) this.x = 0;
    else if (this.x > this.gameWidth - this.width) this.x = this.gameWidth - this.width
    // vertical movement
    this.y += this.vy;
    if (!this.onGround()){
      this.vy += this.weight;
      this.maxFrame = 5;
      this.frameY = 1;
    } else {
      this.vy = 0;
      this.maxFrame = 8;
      this.frameY = 0;
    }
    if (this.y > this.gameHeight - this.height) this.y = this.gameHeight - this.height
  }
  onGround(){ 
    return this.y >= this.gameHeight - this.height;
  }
}

const input = new InputHandler();
const player = new Player(canvas.width, canvas.height);