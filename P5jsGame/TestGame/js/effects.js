class Effect {
  constructor(x, y) {
    this.position = createVector(x, y)
    this.radius = 0
    this.maxRadius = 200
  }

  run() {
    this.display()
    if (!this.isEnd())
      this.radius++
  }

  isEnd() {
    return (this.radius > this.maxRadius)
  }

  display() {
    noFill()
    strokeWeight(3)
    stroke(255, 0, 0, map(this.radius, 0, this.maxRadius, 255, 0))
    circle(this.position.x, this.position.y, this.radius)
  }
}

class ListEffect {
  constructor() {
    this.effects = []
  }

  add(x, y) {
    this.effects.push(new Effect(x, y))
  }

  run() {
    for (let i = 0; i < this.effects.length; i++) {
      this.effects[i].run()

      if (this.effects[i].isEnd()) {
        this.effects.splice(i, 1)
      }
    }
  }
}