
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const gameEle = document.getElementById('game')
const startEle = document.getElementById('start')
const endEle = document.getElementById('end')

document.getElementById('startBtn').addEventListener('click', start)

function start() {
    showGame()
    animate()
}

function showGame() {
    hideEnd()
    hideStart()
    gameEle.style.display = 'block'
}

function showEnd() {
    endEle.style.display = 'block'
}

function hideGame() {
    gameEle.style.display = 'none'
}

function hideEnd() {
    endEle.style.display = 'none'
}

function hideStart() {
    startEle.style.display = 'none'
}

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

class Obstacles {
    
}

const background = new Background(canvas.width, canvas.height)

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    background.draw(ctx)
    background.update()
    requestAnimationFrame(animate)
}