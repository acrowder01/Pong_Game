console.log('Ace')




const canvas = document.getElementById('canvas');
// console.log('canvas')


/*creating the  "context". Without "context", we can't draw on canvas */
const ctx = canvas.getContext('2d');

/* some extra variables */
const netWidth = 4;
const netHeight = canvas.height;

const paddleWidth = 10;
const paddleHeight = 100;

let upArrowPressed = false;
let downArrowPressed = false;

/* some extra variables ends */


/* Creating the objects */
// the net object
const net = {
    x: canvas.width / 2 - netWidth / 2,
    y: 0,
    width: netWidth,
    height: netHeight,
    color: "#FFF"
};

// creating the user1 paddle
const user = {
    x: 10,
    y: canvas.height /2  - paddleHeight  /2,
    width: paddleWidth,
    height: paddleHeight,
    color: '#FFF',
    score: 0
};

const ai = {
    x: canvas.width - (paddleWidth + 10),
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    color: 'yellow',
    score: 0
};

// creating the ball object
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 7,
    speed: 7,
    velocityX: 5,
    velocityY: 5,
    color: '#05EDF'
};
/* creating the objects  ends */


/* Creating the functions to draw out the objects  */
// function to draw net
function drawNet() {
    // set the color of net
    ctx.fillStyle = net.color;

    // syntax --> fillRect(x, y, width, height)
    ctx.fillRect(net.x, net.y, net.width, net.height);
}

// function to draw score button
function drawScore(x, y, score) {
    ctx.fillStyle = '#fff';
    ctx.font = '35px sans-serif';

    // syntax --> fillText(text, x, y)
    ctx.fillText(score, x, y);
}

// function to draw paddle
function drawPaddle(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

// function to draw ball
function drawBall(x, y, radius, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    // syntax --> arc(x, y, radius, startAngle, endAngle, antiClockwise_or_not)
    ctx.arc(x, y, radius, 0, Math.PI * 2, true); // π * 2 Radians = 360 degrees
    ctx.closePath();
    ctx.fill();
}


/* drawing functions end */


 // render functions allows us to draw on the canvas
function render() {
    // set a style
    /* whatever comes below this acquires black color (#000). */
    ctx.fillStyle = "black";

    // draws the black board
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // draw net
    drawNet();
    // draw user score
    drawScore(canvas.width / 4, canvas.height / 6, user.score);
    // draw ai score
    drawScore(3 * canvas.width / 4, canvas.height / 6, ai.score);
    // draw user paddle
    drawPaddle(user.x, user.y, user.width, user.height, user.color);
    // draw ai paddle
    drawPaddle(ai.x, ai.y, ai.width, ai.height, ai.color);
    // draw ball
    drawBall(ball.x, ball.y, ball.radius, ball.color);

}



// creating the game Loop - flow control - 
// keeps game going in a loop over and over untill the user quits game.
function gameLoop() {
    // update() function here
    // update function, to update things position
      function update() {
    // move the paddle
    if (upArrowPressed && user.y > 0) {
        user.y -= 8;
      } else if (downArrowPressed && (user.y < canvas.height - user.height)) {
        user.y += 8;
      }

    /* moving Paddles */

// add an eventListener to browser window
window.addEventListener('keydown', keyDownHandler);
window.addEventListener('keyup', keyUpHandler);

// gets activated when we press down a key
function keyDownHandler(event) {
  // get the keyCode
  switch (event.keyCode) {
    // "up arrow" key
    case 38:
      // set upArrowPressed = true
      upArrowPressed = true;
      break;
    // "down arrow" key
    case 40:
      downArrowPressed = true;
      break;
  }
}

// gets activated when we release the key
function keyUpHandler(event) {
  switch (event.keyCode) {
    // "up arraow" key
    case 38:
      upArrowPressed = false;
      break;
    // "down arrow" key
    case 40:
      downArrowPressed = false;
      break;
  }
}

/* moving paddles section end */
  


    // check if ball hits top or bottom wall

    
  
    // move the ball
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
  
    // ai paddle movement
  
    // collision detection on paddles
  
  }

    update();

    // calling the render function() to create my dimensions for the canvas
    // render() function here
    render();
  }
  
  // calls gameLoop() function 60 times per second
  setInterval(gameLoop, 1000 / 60);