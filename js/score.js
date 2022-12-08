let score = 0
let gameOver = false

function enemyCollision(player, enemy) {
    // check for collision between player and enemies using pythagorean theorem
    // imaginary triangle, hypotenuse = distance between player and enemy
    const distancex = enemy.x - player.x - 30
    const distancey = enemy.y - player.y
    const distance = Math.sqrt(distancex * distancex + distancey * distancey)

    if (distance < enemy.width / 2 + player.width / 2) {
         gameOver = true
    }

    // increase score for successfully avoiding enemies
    if (enemy.markedForDeletion) {
        score++
    }
}

function displayStatus(context) {
    // score shadow
    context.textAlign = 'left'
    context.fillStyle = 'black'
    context.font = '30px Arial'
    context.fillText(`Score: ${score}`, 20, 40)

    // score
    context.textAlign = 'left'
    context.fillStyle = 'white'
    context.font = '30px Arial'
    context.fillText(`Score: ${score}`, 22, 40)

    if (gameOver) {
        const gameOverText = `GAME OVER! Final Score: ${score}`

        context.fillStyle = 'rgba(0, 0, 0, 0.5)'
        context.fillRect(0, 0, canvas.width, canvas.height)

        // game over shadow
        context.textAlign = 'center'
        context.fillStyle = 'black'
        context.font = '30px Arial'
        context.fillText(gameOverText, canvas.width / 2, canvas.height / 2)

        // game over
        context.textAlign = 'center'
        context.fillStyle = 'white'
        context.font = '30px Arial'
        context.fillText(gameOverText, canvas.width / 2 + 2, canvas.height / 2)

        const restartButton = document.getElementById('end')
        restartButton.style.display = 'block'
    }
}