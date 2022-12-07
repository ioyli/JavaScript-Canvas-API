class Enemy{
    constructor(gameWidth, gameHeight){ 
        this.gameWidth = gameWidth
        this.gameHeight = gameHeight
        this.width = 160
        this.height = 119
        this.image = document.getElementById('enemyImage')
        this.x = this.gameWidth
        this.y = this.gameHeight - this.height
        this.frameX = 0
        this.maxFrame = 5
        this.fps = 20
        this.frameTimer = 0
        this.frameInterval = 1000/this.fps;
        this.speed = 8
        this.markedForDeletion = false
    }
    draw(context){ 
        context.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height,
        this.x, this.y, this.width, this.height)
    }
    update(deltaTime){
        if (this.frameTimer > this.frameInterval){
            if (this.frameX >= this.maxFrame) this.frameX = 0;
            else this.frameX++;
            this.frameTimer = 0;
        } else {
            this.frameTimer += deltaTime;
        }
        this.x -= this.speed;
        if (this.x < 0 - this.width) this.markedForDeletion = true;
    }
}

function handleEnemies(deltaTime){ 
    if (enemyTimer > enemyInterval + randomEnemyInterval){ 
        enemies.push(new Enemy(canvas.width, canvas.height))
        enemyTimer = 0
    } else { 
        enemyTimer += deltaTime
    } 
    enemies.forEach(enemy => { 
        enemy.draw(ctx)
        enemy.update(deltaTime)
    });
    enemies = enemies.filter(enemy => !enemy.markedForDeletion)
}

const enemy = new Enemy(canvas.width, canvas.height)

let enemyTimer = 0
let enemyInterval = 1000
let randomEnemyInterval = Math.random() * 1000 + 500

