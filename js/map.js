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
        this.height = 30
        //this.image = document.getElementById('ObstacleImage')
        this.x = this.gameWidth
        this.y = this.gameHeight - Math.floor((Math.random() * 250) + 250)
        this.speed = 4
        this.delete = false
    }
    draw(context) {
        //context.drawImage(this.image, this.x, this.y, this.width, this.height)
        context.fillStyle = 'black'
        context.fillRect(this.x, this.y, this.width, this.height)
    }
    update() {
        this.x -= this.speed
        if (this.x < 0 - this.width) this.delete = true // mark obstacles past the canvas for deletion
    }
}


function handleObstacles(deltaTime) {
    if (obstacleTimer > obstacleInterval + randomObstacleInterval) {
        obstacles.push(new Obstacle(canvas.width, canvas.height))
        obstacleTimer = 0
        randomObstacleInterval = Math.random() * 4000 + 500
    } else {
        obstacleTimer += deltaTime
    }

    // draw each obstacle from array onto the canvas
    obstacles.forEach(obstacle => {
        obstacle.draw(ctx)
        obstacle.update()
        obstacleCollision(player, obstacle)
    })

    // remove obstacles that have moved past the canvas from obstacle array
    obstacles = obstacles.filter(obstacle => !obstacle.delete)
}

function obstacleCollision(player, obstacle) {
    if (player.x + player.width >= obstacle.x
        && player.x <= obstacle.x + obstacle.width
        && player.y + player.height >= obstacle.y
        && player.y <= obstacle.y + obstacle.height) {
            player.vy = 0

            // enable jumping off of platform only if player is not under
            if (input.keys.indexOf('w') > -1
                && player.y < obstacle.y) {
                player.vy -= 30;
            }

            // drop player to ground if under platform and not pressing W
            if (player.y >= obstacle.y
                && input.keys.indexOf('w') === -1) {
                player.y = player.gameHeight - player.height
            }
    }
}

const background = new Background(canvas.width, canvas.height)

let obstacleTimer = 0
let obstacleInterval = 2000
let randomObstacleInterval = Math.random() * 4000 + 500