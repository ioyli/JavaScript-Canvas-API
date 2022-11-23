class Background {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth
        this.gameHeight = gameHeight
        this.image = document.getElementById('backgroundImage')
        this.x = 0
        this.y = 0
        this.width = 1600
        this.height = 800
        this.speed = 4
    }
    draw(context) {
        context.drawImage(this.image, this.x, this.y, this.width, this.height)
        context.drawImage(this.image, this.x + this.width - this.speed, this.y, this.width, this.height)
    }
    update() {
        this.x -= this.speed
        if (this.x < 0 - this.width) this.x = 0
    }
}

class Obstacle {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth
        this.gameHeight = gameHeight
        this.width = Math.random() * 300 + 100
        this.height = 50
        //this.image = document.getElementById('ObstacleImage')
        this.x = this.gameWidth
        this.y = this.gameHeight - 300 // add random y position
        this.speed = 4
        this.delete = false
    }
    draw(context) {
        //context.drawImage(this.image, this.x, this.y, this.width, this.height)
        context.fillRect(this.x, this.y, this.width, this.height)
    }
    update() {
        this.x -= this.speed
        if (this.x < 0 - this.width) this.delete = true
    }
}


function handleObstacles(deltaTime) {
    if (obstacleTimer > obstacleInterval + randomObstacleInterval) {
        obstacles.push(new Obstacle(canvas.width, canvas.height))
        obstacleTimer = 0
        randomObstacleInterval = Math.random() * 3000 + 500
    } else {
        obstacleTimer += deltaTime
    }

    // draw each obstacle from array onto the canvas
    obstacles.forEach(obstacle => {
        obstacle.draw(ctx)
        obstacle.update()
    })

    // remove obstacles that have moved past the canvas from obstacle array
    obstacles = obstacles.filter(obstacle => !obstacle.delete)
}

const background = new Background(canvas.width, canvas.height)

let obstacleTimer = 0
let obstacleInterval = 1000
let randomObstacleInterval = Math.random() * 3000 + 500