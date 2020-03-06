const GAMEMODE = {
  "Carom": {
    names: ["Carom", "Phăng"],
    board: {
      fillColor: '#3ca064',
      borderColorIn: '#3cfa64',
      borderColorOut: '#6c3030',
      size: [320, 550]
    },
    holes: [],
    balls: [
      // [x, y, radius, color, value]
      ['random', 'random', 15, 'white', ''],
      ['random', 'random', 15, 'red', ''],
      ['random', 'random', 15, 'yellow', ''],
    ]
  },

  "Pool 8": {
    names: ["Pool 8"],
    board: [320, 550],
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
      [250, 450, 13, 'rgb(255, 255, 255)', 0], // whiteBall
      [250, 250, 12, 'rgb(250, 200, 0)', 1],
      [235, 230, 12, 'rgb(10, 0, 230)', 2],
      [265, 230, 12, 'rgb(200, 50, 20)', 3],
      [220, 210, 12, 'rgb(100, 100, 250)', 4],
      [250, 210, 12, 'rgb(250, 130, 20)', 5],
      [280, 210, 12, 'rgb(0, 100, 20)', 6],
      [205, 190, 12, 'rgb(150, 20, 20)', 7],
      [235, 190, 12, 'rgb(0, 0, 0)', 8],
      [265, 190, 12, 'rgb(240, 170, 0)', 9],
      [295, 190, 12, 'rgb(20, 90, 250)', 10],
      [190, 170, 12, 'rgb(230, 50, 20)', 11],
      [220, 170, 12, 'rgb(100, 100, 250)', 12],
      [250, 170, 12, 'rgb(220, 100, 20)', 13],
      [280, 170, 12, 'rgb(10, 120, 20)', 14],
      [310, 170, 12, 'rgb(120, 50, 20)', 15],
    ]
  }
}

function getGameMode(mode) {
  let data = GAMEMODE[mode]

  // create board
  let boardWidth = data.board.size[0]
  let boardHeight = data.board.size[1]
  let x = (width - boardWidth) / 2
  let y = (height - boardHeight) / 2

  let board = new Board(x, y, boardWidth, boardHeight)

  // create holes
  board.addHoles(data.holes)

  // create balls
  let balls = []
  for (let ballData of data.balls) {
    let x = (ballData[0] == 'random' ? random(board.position.x, board.position.x + board.size.x) : ballData[0])
    let y = (ballData[1] == 'random' ? random(board.position.y, board.position.y + board.size.y) : ballData[1])
    balls.push(new Ball(x, y, ballData[2], ballData[3], ballData[4]))
  }

  return {
    board,
    balls
  }
}