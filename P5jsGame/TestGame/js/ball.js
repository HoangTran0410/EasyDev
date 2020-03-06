class Ball {
  constructor(x = 0, y = 0, radius = 10, color = '#fff', value) {
    this.position = createVector(x, y)
    this.radius = radius
    this.color = color
    this.value = value
    this.mass = this.radius //(4 * PI / 3) * (this.radius ** 3)
    this.friction = 0.99

    this.velocity = createVector(0, 0)
    this.blurs = []
  }

  update() {
    let vel = this.velocity.copy().mult((deltaTime / 50))

    this.position.add(vel)
    this.velocity.mult(this.friction)
  }

  display() {
    fill(this.color)
    noStroke()
    circle(this.position.x, this.position.y, this.radius * 2)

    fill(255)
    textSize(14)
    textAlign(CENTER, CENTER)
    text(this.value, this.position.x, this.position.y)
  }

  pocket(board) {
    for (let hole of board.holes) {
      let holePos = createVector(hole[0], hole[1])
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

  blur() {
    if (this.velocity.mag() > 0.1) {

      // add current position to blur path
      this.blurs.push({
        x: this.position.x,
        y: this.position.y
      })

      // limit size of path
      if (this.blurs.length > 10) this.blurs.shift()

      // show path
      noFill()
      stroke('#fff3')
      strokeJoin(ROUND)
      strokeWeight(this.radius * 2)

      beginShape()
      for (let b of this.blurs) {
        vertex(b.x, b.y)
      }
      endShape()

    } else {
      // delete old blurs path after ball stopped
      this.blurs = []
    }
  }

  collisionBoard(board) {

    let { x: ballX, y: ballY } = this.position
    let { x: boardX, y: boardY } = board.position
    let { x: boardW, y: boardH } = board.size
    let ballR = this.radius

    if ((ballX - ballR) < boardX) {
      this.velocity.x *= -this.friction
      this.position.x = boardX + ballR
    }
    else if (ballX + ballR > boardX + boardW) {
      this.velocity.x *= -this.friction
      this.position.x = boardX + boardW - ballR
    }

    if ((ballY - ballR) < boardY) {
      this.velocity.y *= -this.friction
      this.position.y = boardY + ballR
    }
    else if (ballY + ballR > boardY + boardH) {
      this.velocity.y *= -this.friction
      this.position.y = boardY + boardH - ballR
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
      // const angle = -Math.atan2(b2.position.y - b1.position.y, b2.position.x - b1.position.x);
      const angle = -p5.Vector.sub(b1.position, b2.position).heading()

      const m1 = b1.mass
      const m2 = b2.mass

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