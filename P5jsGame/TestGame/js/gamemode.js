const GAMEMODE = {
  "Carom": {
    names: ["Carom", "Phăng"],
    board: {
      size: [320, 550],
      ...THEMEBOARD.deepblue
    },
    holes: [],
    balls: [
      // [x, y, radius, color, value]
      [160, 500, 15, 'white', ''],
      [120, 100, 14, 'red', ''],
      [200, 100, 14, 'yellow', ''],
    ],
    events: {
      onCollideBall: function (x, y) {
        effects.add(x, y, 4)
      },
      onCollideBoard: function () { },
      onPocketed: function () { }
    }
  },

  "Pool 8": {
    names: ["Pool 8"],
    board: {
      size: [320, 550],
      ...THEMEBOARD.green
    },
    holes: [
      HOLEPOS.topleft,
      HOLEPOS.topright,
      HOLEPOS.bottomleft,
      HOLEPOS.bottomright,
      HOLEPOS.left,
      HOLEPOS.right,
    ],
    balls: [
      // [x, y, radius, color, value]
      [160, 500, 13, "rgb(255, 255, 255)", 0],
      [160, 150, 12, "rgb(250, 200, 0)", 1],
      [145, 130, 12, "rgb(10, 0, 230)", 2],
      [175, 130, 12, "rgb(200, 50, 20)", 3],
      [130, 110, 12, "rgb(100, 100, 250)", 4],
      [160, 110, 12, "rgb(250, 130, 20)", 5],
      [190, 110, 12, "rgb(0, 100, 20)", 6],
      [115, 90, 12, "rgb(150, 20, 20)", 7],
      [145, 90, 12, "rgb(0, 0, 0)", 8],
      [175, 90, 12, "rgb(240, 170, 0)", 9],
      [205, 90, 12, "rgb(20, 90, 250)", 10],
      [100, 70, 12, "rgb(230, 50, 20)", 11],
      [130, 70, 12, "rgb(100, 100, 250)", 12],
      [160, 70, 12, "rgb(220, 100, 20)", 13],
      [190, 70, 12, "rgb(10, 120, 20)", 14],
      [220, 70, 12, "rgb(120, 50, 20)", 15],
    ],
    events: {
      onCollideBall: function () { },
      onCollideBoard: function () { },
      onPocketed: function (hole) {
        effects.add(hole.x, hole.y)

        if (this.value == 0) {
          let x = board.position.x + board.size.x / 2
          let y = board.position.y + board.size.y - 100
          this.position = createVector(x, y)
          return
        }
        pocketed.addBall(this)
        balls.splice(balls.indexOf(this), 1)
      }
    }
  }
}

function getGameMode(mode) {
  let data = GAMEMODE[mode]

  // create board
  let b = data.board
  let boardWidth = b.size[0]
  let boardHeight = b.size[1]

  let board = new Board({
    x: (width - boardWidth) / 2,
    y: (height - boardHeight) / 2,
    boardWidth,
    boardHeight,
    fillColor: b.fillColor,
    borderColorIn: b.borderColorIn,
    borderColorOut: b.borderColorOut
  })

  // create holes
  board.addHoles(data.holes)

  // create balls
  let balls = []
  for (let ballData of data.balls) {
    let x = ballData[0] + board.position.x
    let y = ballData[1] + board.position.y
    balls.push(new Ball({
      x, y,
      radius: ballData[2],
      color: ballData[3],
      value: ballData[4],
      events: data.events // add events
    }))
  }

  return {
    board,
    balls
  }
}