class Board {
  constructor(x, y, w, h) {
    this.position = createVector(x, y)
    this.size = createVector(w, h)

    this.border = 25
    this.defaultHoleSize = 17
    this.holes = [
      [5, 5],
      [5, this.size.y - 5],
      [this.size.x - 5, 5],
      [this.size.x - 5, this.size.y - 5],
      [0, this.size.y * .5],
      [this.size.x, this.size.y * .5],
    ]
  }

  getRealPos(x, y) {
    return {
      x: x + this.position.x,
      y: y + this.position.y
    }
  }

  display() {
    push()
    translate(this.position.x, this.position.y)

    noStroke()

    fill(100, 50, 42)
    rect(-this.border, -this.border, this.size.x + this.border * 2, this.size.y + this.border * 2)

    fill(60, 250, 100)
    rect(-this.border * .5, -this.border * .5, this.size.x + this.border, this.size.y + this.border)

    fill(60, 160, 100)
    rect(0, 0, this.size.x, this.size.y)

    fill(60, 160, 100)
    stroke(40, 150, 80)
    strokeWeight(2)
    for (let hole of this.holes) {
      circle(hole[0], hole[1], hole[2] || this.defaultHoleSize * 2)
    }

    pop()
  }
}