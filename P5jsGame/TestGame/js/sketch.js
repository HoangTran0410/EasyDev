let balls = []
let board
let stick

let effects = []

function setup() {
  createCanvas(500, 700)

  init()
}

function draw() {
  background(200)

  board.display()
  runBalls()
  runEffect()

  stick.update()
  stick.display()

  showCursor()
}

function mousePressed() {
  stick.pull()
}

function mouseReleased() {
  stick.hit()
}

// =========================================

function init() {
  createBoard()
  createBalls()
  createStick()
}

function createBoard() {
  board = new Board(80, 80, 320, 550)
}

function createStick() {
  stick = new Stick(balls[0])
}

function createBalls() {
  balls = []
  balls.push(new Ball(250, 450, 11, 'rgb(255, 255, 255)', 0, true)) // whiteBall
  balls.push(new Ball(250, 250, 11, 'rgb(250, 200, 0)', 1, false))
  balls.push(new Ball(235, 230, 11, 'rgb(10, 0, 230)', 2, false))
  balls.push(new Ball(265, 230, 11, 'rgb(200, 50, 20)', 3, false))
  balls.push(new Ball(220, 210, 11, 'rgb(100, 100, 250)', 4, false))
  balls.push(new Ball(250, 210, 11, 'rgb(250, 130, 20)', 5, false))
  balls.push(new Ball(280, 210, 11, 'rgb(0, 100, 20)', 6, false))
  balls.push(new Ball(205, 190, 11, 'rgb(150, 20, 20)', 7, false))
  balls.push(new Ball(235, 190, 11, 'rgb(0, 0, 0)', 8, false))
  balls.push(new Ball(265, 190, 11, 'rgb(240, 170, 0)', 9, false))
  balls.push(new Ball(295, 190, 11, 'rgb(20, 90, 250)', 10, false))
  balls.push(new Ball(190, 170, 11, 'rgb(230, 50, 20)', 11, false))
  balls.push(new Ball(220, 170, 11, 'rgb(100, 100, 250)', 12, false))
  balls.push(new Ball(250, 170, 11, 'rgb(220, 100, 20)', 13, false))
  balls.push(new Ball(280, 170, 11, 'rgb(10, 120, 20)', 14, false))
  balls.push(new Ball(310, 170, 11, 'rgb(120, 50, 20)', 15, false))
}

function showCursor() {
  noFill()
  stroke(255)
  strokeWeight(2)
  circle(mouseX, mouseY, 10)
}

function runBalls() {
  for (let i = 0; i < balls.length; i++) {
    if (balls[i].pocketed) continue

    balls[i].update()
    balls[i].collisionBoard(board)
    balls[i].display()

    for (let j = i + 1; j < balls.length; j++) {
      balls[i].colisionResolve(balls[j])
    }

    let holePos = balls[i].pocket(board)
    if (holePos) {
      if (balls[i].value == 0) {
        init()
        alert('Thua rồi, hahahahahahhahhahaah')
        return
      }
      effects.push(new Effect(holePos.x, holePos.y))
      balls.splice(balls.indexOf(balls[i]), 1)
    }
  }
}

function runEffect() {
  for (let e of effects) {
    e.run()
    if (e.isEnd()) effects.splice(effects.indexOf(e), 1)
  }
}