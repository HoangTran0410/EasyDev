const MODES = {
  ADDVEC: 'add_vector',
  DELVEC: 'delete_vector',
  DRAG: 'drag_vector',
}

let mode = MODES.ADDVEC
let vectors = []
let current

function addVec(x1, y1, x2, y2, color) {
  vectors.push(new VVector({
    base: createVector(x1, y1),
    vec: createVector(x2 - x1, y2 - y1),
    color
  }))
}

function setup() {
  createCanvas(800, 600)
  textAlign(CENTER, CENTER)

  // vectors.push(new VVector({
  //   base: createVector(100, 245),
  //   vec: createVector(40, 150),
  //   color: "#f00"
  // }))
}

function draw() {
  background(30)

  // display all vectors
  for (let vec of vectors) {
    vec.show()

    if (vec.isHover())
      vec.showValues()
  }

  // display mouse
  // fill(255)
  // triangle(mouseX - 3, mouseY + 5, mouseX, mouseY, mouseX + 3, mouseY + 5)

  // modes
  // if (mode == MODES.ADDVEC) {
  //   fill(255)
  //   noStroke()
  //   text(`(${mouseX},${mouseY})`, mouseX, mouseY - 10)
  // }
}

function mousePressed() {
  if (mode == MODES.ADDVEC) {

  }
}

function mouseReleased() {
  if (mode == MODES.ADDVEC) {

  }
}

// =====================================================

class VVector {
  constructor(config = {}) {
    const {
      base = createVector(0, 0),
      vec = createVector(0, 0),
      color = "#fff"
    } = config

    this.base = base
    this.vec = vec
    this.vecColor = color
  }

  show() {
    VVector.drawArrow(this.base, this.vec, this.vecColor)
  }

  showValues() {
    let { x, y } = this.base
    let end = p5.Vector.add(this.base, this.vec)

    fill(255)
    noStroke()

    // base text
    text(`(${x},${y})`, x, y)

    // end text
    text(`(${end.x},${end.y})`, end.x, end.y)

    // vec text
    push()
    translate((end.x + x) * .5, (end.y + y) * .5)
    text(`(${this.vec.x},${this.vec.y})`, 0, 0)
    pop()
  }

  isHover() {
    let end = p5.Vector.add(this.base, this.vec)
    return linePoint(this.base.x, this.base.y, end.x, end.y, mouseX, mouseY, 10)
  }

  move(x, y) {
    this.base.add(x, y)
  }

  // https://p5js.org/reference/#/p5.Vector/sub
  static drawArrow(base, vec, myColor) {
    push();
    stroke(myColor);
    strokeWeight(3);
    fill(myColor);
    translate(base.x, base.y);
    circle(0, 0, 5);
    line(0, 0, vec.x, vec.y);
    rotate(vec.heading());
    let arrowSize = 7;
    translate(vec.mag() - arrowSize, 0);
    triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
    pop();
  }
}

function linePoint(x1, y1, x2, y2, px, py, b) {

  // get distance from the point to the two ends of the line
  let d1 = dist(px, py, x1, y1);
  let d2 = dist(px, py, x2, y2);

  // get the length of the line
  let lineLen = dist(x1, y1, x2, y2);

  // since s are so minutely accurate, add
  // a little buffer zone that will give collision
  let buffer = b || 0.1;    // higher # = less accurate

  // if the two distances are equal to the line's
  // length, the point is on the line!
  // note we use the buffer here to give a range,
  // rather than one #
  if (d1 + d2 >= lineLen - buffer && d1 + d2 <= lineLen + buffer) {
    return true;
  }
  return false;
}