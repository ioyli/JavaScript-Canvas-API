class Enemy{
    constructor(gameWidth, gameHeight){ 
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.width = 160;
        this.height = 119;
        this.image = document.getElementById('enemyImage');
        this.x = this.gameWidth;
        this.y = this.gameHeight - this.height;
        this.frameX = 0;
        this.speed = 8;
    }
    draw(context){ 
        context.drawImage(this.image, this.frameX * this.width, 0 * this.height, sw, sh, this.x, this.y, this.width, this.height);
    }
    update(){
        this.x -= this.speed;
    }
}


function handleEnemies(deltaTime){ 
    if (enemyTimer > enemyInterval + randomEnemyInterval){ 
        enemies.push(new Enemy(canvas.width, canvas.height));
        enemyTimer = 0;
    } else { 
        enemyTimer += deltaTime;
    } 
    enemies.forEach(enemy => { 
        enemy.draw(ctx);
        enemy.update();
    })
}

const enemy1 = new Enemy(canvas.width, canvas.height);
