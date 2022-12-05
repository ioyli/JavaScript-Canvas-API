const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
let enemies = [];
let obstacles = []

const gameEle = document.getElementById('game')
const startEle = document.getElementById('start')
const endEle = document.getElementById('end')

document.getElementById('startBtn').addEventListener('click', start)
document.getElementById('restartBtn').addEventListener('click', restart)

function start() {
    showGame()
    animate(0)
}

function restart() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    gameOver = false
    score = 0
    enemies = []
    obstacles = []
    randomObstacleInterval = Math.random() * 4000 + 500
    player.x = 0
    showGame()
    animate(0)
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

let lastTime = 0

function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime
    lastTime = timeStamp

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    background.draw(ctx);
    background.update();

    handleObstacles(deltaTime)

    player.draw(ctx);
    player.update(input);

    displayStatus(ctx)

    if (!gameOver) requestAnimationFrame(animate);

    handleEnemies();
}