class Stick {
  constructor(ball) {
    this.ball = ball

    this.len = 150
    this.direction = createVector(0, 0)
    this.strength = 0
    this.maxStrength = 50
    this.pulling = false
    this.pullDirection = 1
  }

  hit() {
    this.pulling = false
    this.ball.velocity = this.direction.copy().setMag(-this.strength)
    this.strength = 0
  }

  pull() {
    this.pulling = true
  }

  run() {
    this.update()
    this.display()
  }

  update() {
    if (this.pulling) {
      this.strength += (this.maxStrength / 60) * this.pullDirection

      if (this.strength > this.maxStrength) {
        this.strength = this.maxStrength
        this.pullDirection = -1

      } else if (this.strength < 0) {
        this.strength = 0
        this.pullDirection = 1
      }
    }
  }

  display() {
    if (!this.pulling) return

    // stick
    let mouseDirection = p5.Vector.sub(this.ball.position, createVector(mouseX, mouseY))
    let pull = mouseDirection.setMag(map(this.strength, 0, this.maxStrength, 0, 100) + this.ball.radius)

    this.direction = mouseDirection.copy().setMag(this.len)

    let { x, y } = this.ball.position

    stroke(100, 50, 100)
    strokeWeight(10)
    line(x + pull.x, y + pull.y, x + this.direction.x + pull.x, y + this.direction.y + pull.y)
    strokeWeight(1)

    // direction hightlight
    push()
    let hl = this.direction.copy().mult(-1).setMag(500)

    stroke(255, 50)
    strokeWeight(this.ball.radius * 2)
    line(x, y, x + hl.x, y + hl.y)

    stroke(255, 150)
    let s = map(this.strength, 0, this.maxStrength, 0, 10)
    strokeWeight(s)
    drawingContext.setLineDash([5, 10])
    line(x, y, x + hl.x, y + hl.y)
    pop()
  }
}