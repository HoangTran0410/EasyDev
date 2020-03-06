class Ball {
  constructor(x, y, radius, color, value) {
    this.position = createVector(x || 0, y || 0)
    this.radius = radius || 10
    this.color = color || '#fff'
    this.value = value
    this.mass = this.radius

    this.velocity = createVector(0, 0)
  }

  update() {
    this.position.add(this.velocity)
    this.velocity.mult(0.985)
  }

  display() {
    fill(this.color)
    noStroke()
    circle(this.position.x, this.position.y, this.radius * 2)

    noStroke()
    fill(255)
    textSize(14)
    textAlign(CENTER, CENTER)
    text(this.value, this.position.x, this.position.y)
  }

  pocket(board) {
    for (let hole of board.holes) {
      let holePos = board.getRealPos(hole[0], hole[1])
      let d = dist(
        this.position.x,
        this.position.y,
        holePos.x,
        holePos.y
      )
      if (d < (hole[2] || board.defaultHoleSize)) {
        this.pocketed = true
        return holePos
      }
    }

    return false
  }

  collisionBoard(board) {
    if ((this.position.x - this.radius) < board.position.x) {
      this.velocity.x *= -1
      this.position.x = board.position.x + this.radius
    }
    else if (this.position.x + this.radius > board.position.x + board.size.x) {
      this.velocity.x *= -1
      this.position.x = board.position.x + board.size.x - this.radius
    }

    if ((this.position.y - this.radius) < board.position.y) {
      this.velocity.y *= -1
      this.position.y = board.position.x + this.radius
    }
    else if (this.position.y + this.radius > board.position.y + board.size.y) {
      this.velocity.y *= -1
      this.position.y = board.position.y + board.size.y - this.radius
    }
  }

  isCollideWith(otherBall) {
    let o = otherBall.position
    let b = this.position

    return (dist(o.x, o.y, b.x, b.y) < otherBall.radius + this.radius)
  }

  colisionResolve(otherBall) {
    if (!this.isCollideWith(otherBall) || otherBall == this) return

    let b1 = this
    let b2 = otherBall

    const vxDiff = b1.velocity.x - b2.velocity.x;
    const vyDiff = b1.velocity.y - b2.velocity.y;

    const xDist = b2.position.x - b1.position.x;
    const yDist = b2.position.y - b1.position.y;

    if (vxDiff * xDist + vyDiff * yDist >= 0) {
      const angle = -Math.atan2(b2.position.y - b1.position.y, b2.position.x - b1.position.x);

      const m1 = b1.mass || 1
      const m2 = b2.mass || 1

      const u1 = b1.velocity.copy().rotate(angle)// rotateVector(b1.velocity, angle);
      const u2 = b2.velocity.copy().rotate(angle)// rotateVector(b2.velocity, angle);

      const v1 = createVector(u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), u1.y);
      const v2 = createVector(u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), u2.y);

      const vFinal1 = v1.rotate(-angle)// rotateVector(v1, -angle);
      const vFinal2 = v2.rotate(-angle)// rotateVector(v2, -angle);

      b1.velocity.x = vFinal1.x;
      b1.velocity.y = vFinal1.y;

      b2.velocity.x = vFinal2.x;
      b2.velocity.y = vFinal2.y;
    }
  }
}