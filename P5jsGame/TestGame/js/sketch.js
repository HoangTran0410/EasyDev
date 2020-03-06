let balls = []
let board
let stick
let pocketed
let effects

function setup() {
  createCanvas(500, 700)

  init("Carom")
}

function draw() {
  background(255)

  board.display()
  stick.run()
  effects.run()
  pocketed.display()

  runBalls()
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
  pocketed = new Pocketed(30, 30, 'horizoltal')
  effects = new ListEffect()
}

function displayCursor() {
  noFill()
  stroke(255)
  strokeWeight(2)
  circle(mouseX, mouseY, 10)
}

function runBalls() {
  for (let i = 0; i < balls.length; i++) {
    balls[i].update()
    balls[i].collisionBoard(board)
    balls[i].blur()
    balls[i].display()

    for (let j = i + 1; j < balls.length; j++) {
      balls[i].colisionResolve(balls[j])
    }
  }

  for (let i = 0; i < balls.length; i++) {
    let holePos = balls[i].pocket(board)
    if (holePos) {
      if (balls[i].value == 0) {
        init()
        alert('Thua rồi, hahahahahahhahhahaah')
        return
      }
      effects.add(holePos.x, holePos.y)
      pocketed.addBall(balls[i])
      balls.splice(i, 1)
    }
  }
}