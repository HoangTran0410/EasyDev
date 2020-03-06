let balls = []
let board
let stick
let pocketed
let effects
let currentMode = 'Carom'

function setup() {
  createCanvas(windowWidth, windowHeight)

  init(currentMode)
}

function draw() {
  background(50, 200)

  board.display()
  stick.run()
  effects.run()
  pocketed.display()

  runBalls()
  runButtons()
  displayCursor()
}

function mousePressed() {
  stick.pull()
}

function mouseReleased() {
  stick.hit()
}

// =========================================

function init(mode) {
  let game = getGameMode(mode)

  board = game.board
  balls = game.balls
  stick = new Stick(balls[0])
  pocketed = new Pocketed(board.position.x - 50, 30, 'horizoltal')
  effects = new ListEffect()
}

function runBalls() {
  for (let i = 0; i < balls.length; i++) {
    balls[i].update()
    balls[i].collisionBoard(board)
    balls[i].pocket(board)
    balls[i].blur()
    balls[i].display()

    for (let j = i + 1; j < balls.length; j++) {
      balls[i].colisionResolve(balls[j])
    }
  }
}

function runButtons() {
  if (button('Carom', width / 2 - 100, 10, 100, 30, '#333', '#666')) {
    init("Carom")
  }

  if (button('Pool 8', width / 2, 10, 100, 30, '#333', '#666')) {
    init("Pool 8")
  }
}

function displayCursor() {
  noFill()
  stroke(255)
  strokeWeight(2)
  circle(mouseX, mouseY, 10)
}

function pointRect(x, y, rx, ry, rw, rh) {
  return !(
    x < rx ||
    x > rx + rw ||
    y < ry ||
    y > ry + rh
  )
}

function button(t, x, y, w, h, fillColor, hoverColor) {
  let hover = pointRect(mouseX, mouseY, x, y, w, h)

  fill(hover ? hoverColor : fillColor)
  stroke(255)
  rect(x, y, w, h)

  fill(255)
  noStroke()
  textAlign(CENTER, CENTER)
  text(t, x + w / 2, y + h / 2)

  if (mouseIsPressed && hover) {
    return true
  }
  return false
}