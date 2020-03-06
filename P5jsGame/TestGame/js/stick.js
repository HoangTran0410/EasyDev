class Stick {
  constructor(ball) {
    this.ball = ball

    this.len = 150
    this.direction = createVector(0, 0)
    this.strength = 0
    this.maxStrength = 20
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

  update() {
    if (this.pulling) {
      this.strength += 0.25 * this.pullDirection

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
    this.direction = p5.Vector.sub(this.ball.position, createVector(mouseX, mouseY))

    let pull = this.direction.copy().setMag(map(this.strength, 0, this.maxStrength, 0, 100) + this.ball.radius)
    this.direction.setMag(this.len)

    let { x, y } = this.ball.position

    stroke(100, 50, 100)
    strokeWeight(10)
    line(x + pull.x, y + pull.y, x + this.direction.x + pull.x, y + this.direction.y + pull.y)
    strokeWeight(1)

    // direction hightlight
    push()
    let hl = this.direction.copy().mult(-1).setMag(500)
    stroke(255)
    strokeWeight(map(this.strength, 0, this.maxStrength, 0, 10))
    drawingContext.setLineDash([5, 10])
    line(x, y, x + hl.x, y + hl.y)
    pop()
  }
}