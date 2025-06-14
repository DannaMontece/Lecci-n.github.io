// Variables del juego
const canvas = document.getElementById("gameCanvas")
const ctx = canvas.getContext("2d")

// Elementos del DOM
const playerScoreElement = document.getElementById("playerScore")
const cpuScoreElement = document.getElementById("cpuScore")
const gameMenu = document.getElementById("gameMenu")
const gameOverMenu = document.getElementById("gameOver")
const pauseMenu = document.getElementById("pauseMenu")
const winnerText = document.getElementById("winnerText")
const startButton = document.getElementById("startButton")
const restartButton = document.getElementById("restartButton")

// Estado del juego
let gameState = "menu" // 'menu', 'playing', 'paused', 'gameOver'
let playerScore = 0
let cpuScore = 0
const winningScore = 5

// Configuración del juego
const gameConfig = {
  paddleWidth: 10,
  paddleHeight: 80,
  ballSize: 10,
  paddleSpeed: 6,
  ballSpeed: 4,
  maxBallSpeed: 8,
}

// Objetos del juego
const player = {
  x: 20,
  y: canvas.height / 2 - gameConfig.paddleHeight / 2,
  width: gameConfig.paddleWidth,
  height: gameConfig.paddleHeight,
  speed: gameConfig.paddleSpeed,
  dy: 0,
}

const cpu = {
  x: canvas.width - 30,
  y: canvas.height / 2 - gameConfig.paddleHeight / 2,
  width: gameConfig.paddleWidth,
  height: gameConfig.paddleHeight,
  speed: gameConfig.paddleSpeed * 0.8, // CPU un poco más lenta
}

const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  width: gameConfig.ballSize,
  height: gameConfig.ballSize,
  dx: gameConfig.ballSpeed,
  dy: gameConfig.ballSpeed,
  speed: gameConfig.ballSpeed,
}

// Controles
const keys = {
  w: false,
  s: false,
  space: false,
}

// Event Listeners
document.addEventListener("keydown", handleKeyDown)
document.addEventListener("keyup", handleKeyUp)
startButton.addEventListener("click", startGame)
restartButton.addEventListener("click", restartGame)

// Manejo de teclas
function handleKeyDown(e) {
  switch (e.key.toLowerCase()) {
    case "w":
      keys.w = true
      break
    case "s":
      keys.s = true
      break
    case " ":
      e.preventDefault()
      if (gameState === "playing") {
        pauseGame()
      } else if (gameState === "paused") {
        resumeGame()
      }
      break
  }
}

function handleKeyUp(e) {
  switch (e.key.toLowerCase()) {
    case "w":
      keys.w = false
      break
    case "s":
      keys.s = false
      break
  }
}

// Funciones del juego
function startGame() {
  gameState = "playing"
  gameMenu.classList.add("hidden")
  resetGame()
  gameLoop()
}

function pauseGame() {
  gameState = "paused"
  pauseMenu.classList.remove("hidden")
}

function resumeGame() {
  gameState = "playing"
  pauseMenu.classList.add("hidden")
  gameLoop()
}

function restartGame() {
  gameState = "playing"
  gameOverMenu.classList.add("hidden")
  playerScore = 0
  cpuScore = 0
  updateScore()
  resetGame()
  gameLoop()
}

function resetGame() {
  // Resetear posiciones
  player.y = canvas.height / 2 - gameConfig.paddleHeight / 2
  cpu.y = canvas.height / 2 - gameConfig.paddleHeight / 2

  // Resetear pelota
  ball.x = canvas.width / 2
  ball.y = canvas.height / 2
  ball.dx = (Math.random() > 0.5 ? 1 : -1) * gameConfig.ballSpeed
  ball.dy = (Math.random() > 0.5 ? 1 : -1) * gameConfig.ballSpeed
}

function updatePlayer() {
  // Movimiento del jugador
  if (keys.w && player.y > 0) {
    player.y -= player.speed
  }
  if (keys.s && player.y < canvas.height - player.height) {
    player.y += player.speed
  }
}

function updateCPU() {
  // IA simple para la CPU
  const cpuCenter = cpu.y + cpu.height / 2
  const ballCenter = ball.y + ball.height / 2

  if (cpuCenter < ballCenter - 35) {
    cpu.y += cpu.speed
  } else if (cpuCenter > ballCenter + 35) {
    cpu.y -= cpu.speed
  }

  // Mantener CPU dentro de los límites
  if (cpu.y < 0) cpu.y = 0
  if (cpu.y > canvas.height - cpu.height) cpu.y = canvas.height - cpu.height
}

function updateBall() {
  ball.x += ball.dx
  ball.y += ball.dy

  // Rebote en paredes superior e inferior
  if (ball.y <= 0 || ball.y >= canvas.height - ball.height) {
    ball.dy = -ball.dy
    playSound("bounce")
  }

  // Colisión con paleta del jugador
  if (
    ball.x <= player.x + player.width &&
    ball.x + ball.width >= player.x &&
    ball.y <= player.y + player.height &&
    ball.y + ball.height >= player.y
  ) {
    if (ball.dx < 0) {
      // Solo si la pelota se mueve hacia el jugador
      ball.dx = -ball.dx

      // Cambiar ángulo basado en dónde golpea la paleta
      const hitPos = ball.y + ball.height / 2 - (player.y + player.height / 2)
      ball.dy = hitPos * 0.1

      // Aumentar velocidad gradualmente
      if (Math.abs(ball.dx) < gameConfig.maxBallSpeed) {
        ball.dx *= 1.05
      }

      playSound("paddle")
    }
  }

  // Colisión con paleta de la CPU
  if (
    ball.x + ball.width >= cpu.x &&
    ball.x <= cpu.x + cpu.width &&
    ball.y <= cpu.y + cpu.height &&
    ball.y + ball.height >= cpu.y
  ) {
    if (ball.dx > 0) {
      // Solo si la pelota se mueve hacia la CPU
      ball.dx = -ball.dx

      // Cambiar ángulo basado en dónde golpea la paleta
      const hitPos = ball.y + ball.height / 2 - (cpu.y + cpu.height / 2)
      ball.dy = hitPos * 0.1

      // Aumentar velocidad gradualmente
      if (Math.abs(ball.dx) < gameConfig.maxBallSpeed) {
        ball.dx *= 1.05
      }

      playSound("paddle")
    }
  }

  // Puntuación
  if (ball.x < 0) {
    cpuScore++
    updateScore()
    resetBall()
    playSound("score")
  } else if (ball.x > canvas.width) {
    playerScore++
    updateScore()
    resetBall()
    playSound("score")
  }

  // Verificar fin del juego
  if (playerScore >= winningScore || cpuScore >= winningScore) {
    endGame()
  }
}

function resetBall() {
  ball.x = canvas.width / 2
  ball.y = canvas.height / 2
  ball.dx = (Math.random() > 0.5 ? 1 : -1) * gameConfig.ballSpeed
  ball.dy = (Math.random() > 0.5 ? 1 : -1) * gameConfig.ballSpeed
}

function updateScore() {
  playerScoreElement.textContent = playerScore
  cpuScoreElement.textContent = cpuScore
}

function endGame() {
  gameState = "gameOver"
  if (playerScore >= winningScore) {
    winnerText.textContent = "¡GANASTE!"
  } else {
    winnerText.textContent = "¡PERDISTE!"
  }
  gameOverMenu.classList.remove("hidden")
}

function render() {
  // Limpiar canvas
  ctx.fillStyle = "#000"
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Dibujar línea central
  ctx.setLineDash([5, 15])
  ctx.beginPath()
  ctx.moveTo(canvas.width / 2, 0)
  ctx.lineTo(canvas.width / 2, canvas.height)
  ctx.strokeStyle = "#00ff00"
  ctx.lineWidth = 2
  ctx.stroke()
  ctx.setLineDash([])

  // Dibujar paletas
  ctx.fillStyle = "#00ff00"
  ctx.fillRect(player.x, player.y, player.width, player.height)
  ctx.fillRect(cpu.x, cpu.y, cpu.width, cpu.height)

  // Dibujar pelota
  ctx.fillRect(ball.x, ball.y, ball.width, ball.height)

  // Efectos de brillo
  ctx.shadowColor = "#00ff00"
  ctx.shadowBlur = 10
  ctx.fillRect(player.x, player.y, player.width, player.height)
  ctx.fillRect(cpu.x, cpu.y, cpu.width, cpu.height)
  ctx.fillRect(ball.x, ball.y, ball.width, ball.height)
  ctx.shadowBlur = 0
}

function gameLoop() {
  if (gameState !== "playing") return

  updatePlayer()
  updateCPU()
  updateBall()
  render()

  requestAnimationFrame(gameLoop)
}

// Función para simular sonidos (visual feedback)
function playSound(type) {
  // En un juego real, aquí reproducirías sonidos
  // Por ahora, solo agregamos un efecto visual
  switch (type) {
    case "paddle":
      canvas.style.filter = "brightness(1.2)"
      setTimeout(() => (canvas.style.filter = "brightness(1)"), 100)
      break
    case "bounce":
      canvas.style.filter = "hue-rotate(30deg)"
      setTimeout(() => (canvas.style.filter = "hue-rotate(0deg)"), 100)
      break
    case "score":
      canvas.style.filter = "contrast(1.5)"
      setTimeout(() => (canvas.style.filter = "contrast(1)"), 200)
      break
  }
}

// Inicializar el juego
function init() {
  updateScore()
  render()
}

// Iniciar cuando se carga la página
init()
