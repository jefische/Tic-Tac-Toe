class Board {
	constructor(sketch, startX, startY, width, move) {
		this.sketch = sketch;
		this.startX = startX;
		this.startY = startY;
		this.width = width;	
		this.move = move;
		this.boardPosition = [];
	}
	init() {
		let dim = this.width / 3;
		
		if (this.move < this.width) {
			this.sketch.line(this.startX + dim, this.startY, this.startX + dim, this.startY + this.move); // vertical line 1
			this.sketch.line(this.startX + dim*2, this.startY, this.startX + dim*2, this.startY + this.move); // vertical line 2
			this.sketch.line(this.startX, this.startY + dim, this.startX + this.move, this.startY + dim); // horizontal line 1
			this.sketch.line(this.startX, this.startY + dim*2, this.startX + this.move, this.startY + dim*2); // horizontal line 2
		} else {
			this.sketch.line(this.startX + dim, this.startY, this.startX + dim, this.startY + dim*3); // vertical line 1
			this.sketch.line(this.startX + dim*2, this.startY, this.startX + dim*2, this.startY + dim*3); // vertical line 2
			this.sketch.line(this.startX, this.startY + dim, this.startX + dim*3, this.startY + dim); // horizontal line 1
			this.sketch.line(this.startX, this.startY + dim*2, this.startX + dim*3, this.startY + dim*2); // horizontal line 2
		}
	}
	getBoardPosition() {

	}
	setBoardPosition() {

	}
}

/******** p5.js *************************/

const Container = document.querySelector("#canvas-container");
let depthMapping = [1,2,3,2,3,1,2,2,3,1,2,2,3];
let boardStates = [
	[	[-1,-1,1,1,1,undefined,-1,undefined,undefined]], // depth 0

	[	[-1,-1,1,1,1,-99,-1,undefined,undefined],  // depth 1
		[-1,-1,1,1,1,undefined,-1,-99,undefined],
		[-1,-1,1,1,1,undefined,-1,undefined,-99]],

	[	[-1,-1,1,1,1,-1,-1,99,undefined],  // depth 2
		[-1,-1,1,1,1,-1,-1,undefined,99],
		[-1,-1,1,1,1,99,-1,-1,undefined],
		[-1,-1,1,1,1,undefined,-1,-1,99],
		[-1,-1,1,1,1,99,-1,undefined,-1],
		[-1,-1,1,1,1,undefined,-1,99,-1]],

	[	[-1,-1,1,1,1,-1,-1,1,-99],  // depth 3
		[-1,-1,1,1,1,-1,-1,-99,1],
		[-1,-1,1,1,1,-99,-1,-1,1],
		[-1,-1,1,1,1,-99,-1,1,-1]],

];

const s = function(sketch) {
	let w = Container.clientWidth;
	let h = sketch.displayHeight;
	// let frameRateP;
	// let x = (Math.random()*2 - 1); // generate a random number between -1 and 1
	var x, y;
	let font;
	let cloudOneX = 50;
	let moveXY = 0;

	sketch.preload = function() {
		font = sketch.loadFont('/assets/fonts/inconsolata.otf'); // WEBGL mode requires a loadFont
	}

	sketch.setup = function() {

		// sketch.createCanvas(800,500, sketch.WEBGL); // WEBGL example for random walk with translate() and box()
		// frameRateP = sketch.createP();
		// sketch.debugMode();
		// sketch.background(220);
		// x = 0;
		// y = 0;
		
		sketch.createCanvas(w,500);
		sketch.textFont(font);

	}
	sketch.draw = function() {
		// frameRateP.html(sketch.round(sketch.frameRate())); // this displays the frameRate below the canvas. 30-60 is usually very good.
		
		
		// sketch.fill(255, 0, 0);
		// console.log(sketch.frameCount) // frameCount is an increasing value that increases each time draw() is called.

		// sketch.translate(x, y, 0);
		// sketch.box(10);  // box is only supported in WEBGL mode

		// var r = sketch.floor(sketch.random(2));
		// switch (r) {
		// 	case 0:
		// 		x = x + (Math.random()*2 - 1)*5;
		// 		break;
		// 	case 1:
		// 		y = y + (Math.random()*2 - 1)*5;
		// 		break;
			
		// }

		sketch.background('navy');
		// sketch.frameRate(15)
		
		// moon
		// sketch.fill(255);
		// sketch.stroke(0);
		// sketch.circle(350, 50, 100)

		//overlapping navy circle for crescent moon
		// sketch.stroke("navy");
		// sketch.fill("navy");
		// sketch.circle(320,50,100);

		 //big gray mountains
		//  sketch.stroke(0);
		//  sketch.fill(80);
		//  sketch.triangle(100,300,300,100, 500,300);

		//cloud
		// sketch.fill(255);
		// sketch.ellipse(cloudOneX, 50, 80, 40);

		//sets the x coordinate to the frame count resets at left edge
		// cloudOneX = sketch.frameCount % sketch.width // using the modulo or remainder allows the motion and movement of the ellipse to repeat/reset from the beginning of the page.

		// sketch.fill(255);
		// sketch.text(`${sketch.mouseX}, ${sketch.mouseY}`, 20, 20);

		//try creating a tic-tac-toe board
		sketch.stroke(255);
		let myBoard = new Board(sketch, startX=600, startY=100, width=100, moveXY);
		myBoard.init();
		moveXY += 1;

	}
}

let myp5 = new p5(s, Container);
