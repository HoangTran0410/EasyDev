let ball;
let bullets = [];
let vel;

function setup() {
  createCanvas(windowWidth, windowHeight);

  ball = new Ball(100, 100, 20)

  vel = createVector(0, 0)
}

function globalToViewport(x, y) {

  // width / 2 = playerX, 
  // height / 2 = playerY

  // mouseX ~ width /2
  // mouseY ~ height / 2

  let delX = x - width / 2;
  let delY = y - height / 2;

  let vx = ball.position.x + delX;
  let vy = ball.position.y + delY;

  return createVector(vx, vy)
}


function draw() {
  background(30);

  // tách hệ toạ độ của canvas riêng ra khỏi hệ toạ độ của game
  translate(-ball.position.x + width / 2, -ball.position.y + height / 2)

  ball.control()
  ball.update()
  ball.show()

  let vMouse = globalToViewport(mouseX, mouseY)

  stroke(255)
  line(ball.position.x, ball.position.y, vMouse.x, vMouse.y)

  fill('green')
  circle(0, 0, 20)

  beginShape()
  for (let bullet of bullets) {
    bullet.update()
    bullet.show()

    vertex(bullet.position.x, bullet.position.y)

    if (bullet.isFinish()) bullets.splice(bullets.indexOf(bullet), 1)
  }
  noFill()
  endShape()


  strokeWeight(2)
  stroke(255)
  line(ball.position.x, ball.position.y, ball.position.x + vel.x, ball.position.y + vel.y)

  // hộp
  noFill()
  stroke(255)
  rect(0, 0, width, height)

  if (mouseIsPressed) fire()

  noStroke()
  fill(255)
  text(bullets.length, vMouse.x, vMouse.y)
}

function drawWithMouse() {
  let vMouse = globalToViewport(mouseX, mouseY)
  let d = 1
  bullets.push(new Ball(vMouse.x, vMouse.y, 15, random(-d, d), random(-d, d)))
}

function fire() {

  let direction = p5.Vector.sub(createVector(mouseX, mouseY), ball.position);

  direction = globalToViewport(direction.x, direction.y)

  vel = direction.setMag(20).add(random(-1, 1), random(-1, 1))

  bullets.push(new Ball(ball.position.x, ball.position.y, 15, vel.x, vel.y))

}



// =======================================

class Ball {
  constructor(x, y, d, vx, vy) {
    this.position = createVector(x, y);
    this.velocity = createVector(vx || 0, vy || 0);
    this.diameter = d;

    this.born = millis();
  }

  control() {
    if (keyIsDown(65)) {
      this.velocity.add(-1, 0)
    }
    if (keyIsDown(68)) {
      this.velocity.add(1, 0)
    }
    if (keyIsDown(87)) {
      this.velocity.add(0, -1)
    }
    if (keyIsDown(83)) {
      this.velocity.add(0, 1)
    }
  }

  update() {
    this.position.add(this.velocity); // di chuyen
    this.velocity.mult(0.95) // giam dan van toc
  }

  isFinish() {
    return (millis() - this.born > 5000)
  }

  show() {
    // let alpha = map((millis() - this.born), 0, 5000, 255, 20)
    // fill(255, 0, 0, alpha);
    // stroke(255, alpha)

    fill('red')
    circle(this.position.x, this.position.y, this.diameter);
  }
}