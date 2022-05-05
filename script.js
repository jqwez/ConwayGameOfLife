const canvas = document.getElementById('main')
const c = canvas.getContext('2d')

canvas.height = 200
canvas.width = 200

const gridBox = 10
const gridHeight = Math.floor(canvas.height / gridBox)
const gridWidth = Math.floor(canvas.width / gridBox)

c.fillStyle = 'grey'
c.fillRect(0, 0, canvas.width, canvas.height)

function randColor() {
  const a = Math.floor(Math.random()*255)
  const b = Math.floor(Math.random()*255)
  const c = Math.floor(Math.random()*255)
  return `rgb(${a},${b},${c})`
}


c.fillStyle = randColor();
c.fillRect(0, 0, gridBox, gridBox)


class Square {
  constructor(x, y, width, height, color, position, pState, nState) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.position = position;
    this.pState = pState;
    this.nState = nState
  }
  draw() {
  c.fillStyle = this.color
  c.fillRect(this.x, this.y, this.width, this.height)
  }
}
const squares = []

function gridify(x, y) {
  x = Math.floor(x/gridBox) + 1;
  y = Math.floor(y/gridBox) + 1;
  return {x, y}
}

for (let x=0; x<canvas.height; x+=gridBox) {
  for (let y=0; y<canvas.width; y+=gridBox) {
  squares.push(new Square(x, y, gridBox, gridBox, 'black', gridify(x, y), 0, 0))
  }
  }

function drawBoxes() {
for (square in squares) {
  let box = squares[square]
  box.draw()
}}


function callBox(a, b) {
  let thisBox = squares.filter(n=>n['position']['x']==a && n['position']['y']==b)[0]
 
  return thisBox}

function flipColor(a,b) {
  if (callBox(a,b).color == 'white') {
    callBox(a,b).nState = 0
    callBox(a,b).color = 'black'
  } else {
    callBox(a,b).pState = 1;
    callBox(a,b).color = 'white';
    callBox(a,b).nState = 1}
  callBox(a,b)
}

function setWhite(a,b) {
  callBox(a,b).color = 'white'
  callBox(a,b).pState = 1
}

let coord1, coord2
function randcoord() {
  coord1 = Math.floor(Math.random()*gridHeight+1)
  coord2 = Math.floor(Math.random()*gridWidth+1)
}



setWhite(1,8)
setWhite(1,10)
setWhite(2,7)
setWhite(3,7)
setWhite(4,7)
setWhite(5,7)
setWhite(6,7)
setWhite(7,7)
setWhite(7,8)
setWhite(7,9)
setWhite(6,10)
setWhite(3,11)
setWhite(4,11)

drawBoxes()

const fun = setInterval(()=> {
  game()
  for (square in squares) {
  const box = squares[square]
    if (box.nState === 1) {
      box.color = 'white'
    } else if (box.nState ===0) {
      box.color = 'black'
    }
 drawBoxes()
    box.pState = box.nState
}
}, 300)

const game = () => {
  //iterate over each square
  for (square in squares) {
    const thisOne = squares[square]
    const arr = []
    const thisX = thisOne['position']['x']
    const thisY = thisOne['position']['y']
    if (thisX>1) {
      arr.push(callBox(thisX-1, thisY))
    }
    if (thisX<gridWidth) {
      arr.push(callBox(thisX+1, thisY))
    }
    if (thisY>1) {
      arr.push(callBox(thisX, thisY-1))
    }
    if (thisY<gridHeight) {
      arr.push(callBox(thisX, thisY+1))
    }
    if (thisX>1 && thisY>1) {
      arr.push(callBox(thisX-1, thisY-1))
    }
    if (thisX>1 && thisY<gridHeight) {
      arr.push(callBox(thisX-1, thisY+1))
    }
    if (thisX<gridWidth && thisY<gridHeight) {
      arr.push(callBox(thisX+1, thisY+1))
    }
    if (thisX<gridWidth && thisY>1) {
      arr.push(callBox(thisX+1, thisY-1))
    }
    
    
    if (thisOne['pState']==1) {
      if (arr.filter(n=>n['pState']===1).length=== 2 | arr.filter(n=>n['pState']===1).length === 3) {
      thisOne.nState = 1
      } else {
      thisOne.nState = 0
    } }
    if (thisOne['pState']===0) {
      thisOne['nState']=0
    }
    if (thisOne['pState']==0 && arr.filter(n=>n['pState']==1).length == 3) {
        thisOne.nState = 1
    }
    
}
}



