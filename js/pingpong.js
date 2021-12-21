let canvas = document.getElementById('canvas');


/*creating the  "context". Without "context", we can't draw on canvas */
let ctx = canvas.getContext('2d');


// render functions allows us to draw on the canvas
function render() {
    // set a style
    /* whatever comes below this acquires black color (#000). */
    ctx.fillStyle = "black";

    // draws the black board
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// calling the render function() to create dimensions for the canvas
render();

