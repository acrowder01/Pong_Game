

// let gameStart = null;
// while ( gameStart  !== "yes" && gameStart  !== "no") {
//   gameStart = window.prompt("begin game", "yes/no")
// }






// grab a reference of our "canvas" using its id
const canvas = document.getElementById('canvas');
/* get a "context". Without "context", we can't draw on canvas */
const ctx = canvas.getContext('2d');

//  sounds
const hitSound = new Audio('/sound/hitSound.wav');
const scoreSound = new Audio('/sound/scoreSound.wav');
const wallHitSound = new Audio('/sound/wallHitSound.wav');

 
 

/* some extra variables */
const netWidth = 4;
const netHeight = canvas.height;

const paddleWidth = 10;
const paddleHeight = 100;

let upArrowPressed = false;
let downArrowPressed = false;

/* some extra variables ends */

/* objects */
// net
const net = {
  x: canvas.width / 2 - netWidth / 2,
  y: 0,
  width: netWidth,
  height: netHeight,
  color: "white"
};

// user paddle
const user = {
  x: 5,
  y: canvas.height / 2 - paddleHeight / 2,
  width: paddleWidth,
  height: 130,
  color: 'blue',
  score: 0
};

const computer = {
  x: canvas.width - (paddleWidth + 10),
  y: canvas.height / 2 - paddleHeight / 2,
  width: paddleWidth,
  height: paddleHeight,
  color: 'red',
  score: 0
};

// ball
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 10,
  speed: 5,
  velocityX: 5,
  velocityY: 5,
  color: 'yellow'
};

/* objects declaration ends */

/* drawing functions */
// function to draw net
function drawNet() {
  // set the color of net
  ctx.fillStyle = net.color;

  // syntax --> fillRect(x, y, width, height)
  ctx.fillRect(net.x, net.y, net.width, net.height);
}

// function to draw score
function drawScore(x, y, score) {
  ctx.fillStyle = 'yellow';
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

/* moving Paddles */
// add an eventListener to browser window
window.addEventListener('keydown', keyDownHandler);
window.addEventListener('keyup', keyUpHandler);

// gets activated when we press down arrow key
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


//control the user paddle with mouse
canvas.addEventListener("mousemove", movepaddle);
function movepaddle(evt){
    let rect = canvas.getBoundingClientRect();

    user.y = evt.clientY - rect.top - user.height/2 

}


// reset the ball

// collision Detect function
function collisionDetect(player, ball) {
    // returns true or false
    player.top = player.y;
    player.right = player.x + player.width;
    player.bottom = player.y + player.height;
    player.left = player.x;
  
    ball.top = ball.y - ball.radius;
    ball.right = ball.x + ball.radius;
    ball.bottom = ball.y + ball.radius;
    ball.left = ball.x - ball.radius;
  
    return ball.left < player.right && ball.top < player.bottom && ball.right > player.left && ball.bottom > player.top;
  }
function reset() {
  
    // reset ball's value to older values
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.speed = 7;
  
    // changes the direction of ball
    ball.velocityX = -ball.velocityX;
    ball.velocityY = -ball.velocityY;
  }

// update function, my logic to control the game
function update() {
  console.log("ace1 in update")
    // move the paddle
    if (upArrowPressed && user.y > 0) {
        user.y -= 8;
      } else if (downArrowPressed && (user.y < canvas.height - user.height)) {
        user.y += 8;
      }

  
    // check if ball hits top or bottom wall
    if (ball.y + ball.radius >= canvas.height || ball.y - ball.radius <= 0) {
        // play wallHitSound
         wallHitSound.play();
    
        ball.velocityY = -ball.velocityY;
      }
    
       // if ball hit on right wall
       if (ball.x + ball.radius >= canvas.width) {
        // play scoreSound
        scoreSound.play();

        // increment user score by 1
        user.score += 1;
        
        reset();
      }
    
      // if ball hit on left wall
      if (ball.x - ball.radius <= 0) {
        // play scoreSound
         scoreSound.play();
    
        // increment computer  score by 1
        computer.score += 1;
        reset();
      }

  
    // move the ball
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
  
    // computer paddle movement
    //increase the value of .04 to make game harder
    computer.y += ((ball.y - (computer.y + computer.height / 2))) * 0.03;
  
    // collision detection on paddles
    let player = (ball.x < canvas.width / 2) ? user : computer;

  if (collisionDetect(player, ball)) {
    // play hitSound
     hitSound.play();
     
    

    // default angle is 0deg in Radian
    let angle = 0;

    // if ball hit the top of paddle
    if (ball.y < (player.y + player.height / 2)) {
      // then -1 * Math.PI / 4 = -45deg
      angle = -1 * Math.PI / 4;
    } else if (ball.y > (player.y + player.height / 2)) {
      // if it hit the bottom of paddle
      // then angle will be Math.PI / 4 = 45deg
      angle = Math.PI / 4;
    }

    /* change velocity of ball according to on which paddle the ball hitted */
    ball.velocityX = (player === user ? 1 : -1) * ball.speed * Math.cos(angle);
    ball.velocityY = ball.speed * Math.sin(angle);

    // increase ball speed
    ball.speed += 0.2;

  
  }

   
  
  }

  



// render function draws everything on to canvas
function render() {
  // set a style
  ctx.fillStyle = "darkgoldenrod"; /* whatever comes below this acquires black color (#000). */
  // draws the black board
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // draw net
  drawNet();

  // draw user score
  drawScore(canvas.width / 4, canvas.height / 6, user.score);

  // draw computer score
  drawScore(3 * canvas.width / 4, canvas.height / 6, computer.score,);

  // draw user paddle
  drawPaddle(user.x, user.y, user.width, user.height, user.color);
  // draw computer paddle

  drawPaddle(computer.x, computer.y, computer.width, computer.height, computer.color);

  // draw ball
  drawBall(ball.x, ball.y, ball.radius, ball.color);

  
}





// gameLoop - control flow - keeps loop going until the user quits
function gameLoop() {
   console.log("ace in gameloop function")

  
  // update() function here
  update();

  


  // render() function here
  render();
}


// calls gameLoop() function 60 times per second
setInterval(gameLoop, 1000 / 60);

function startgame(){
  gameLoop()
}
 
//StartGame function here
 startgame();