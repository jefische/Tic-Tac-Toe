/******** p5.js *************************/

const p5Container = document.querySelector("#treeContainer");
const viewMinimax = document.querySelector(".view-minimax");


viewMinimax.addEventListener("click", startSketch);


function startSketch() {

	const s = function(sketch) {
		let w = p5Container.clientWidth;
		let h = 1000;
		let x = 0;
		let board_w;
		let board_h;
		let edge;
		let maxDepth = Math.max(...depthCount);
		// let depthCountTest = [0,3,6,4,0];
		console.log(depthCount);
		console.log(maxDepth);

		sketch.setup = function() {
			sketch.createCanvas(w, h);
		};

		sketch.draw = function() {
			board_w = sketch.width / 3;
			board_h = sketch.height / 3;
			// maxDepth = Math.max(...depthCount);

			sketch.background(220);
			
			let dimX = sketch.width/(maxDepth*3);
			let firstCorner = (sketch.width/2)-(dimX/2);
			edge = dimX / 3;

			// depth = 0;
		  	sketch.rect(firstCorner, 10, dimX);
		  	sketch.line(firstCorner+edge, 10, firstCorner+edge, 10+dimX);
		  	sketch.line(firstCorner+2*edge, 10, firstCorner+2*edge, 10+dimX);
		  	sketch.line(firstCorner, 10+edge, firstCorner+dimX, 10+edge);
		  	sketch.line(firstCorner, 10+2*edge, firstCorner+dimX, 10+2*edge);

			// depth = 1;
		  	sketch.rect((sketch.width/2)-(dimX/2), 10+1.5*dimX, dimX);
		  	sketch.rect((sketch.width/2)-3*dimX, 10+1.5*dimX, dimX);
		  	sketch.rect((sketch.width/2)+2*dimX, 10+1.5*dimX, dimX);

		  	// depth = 2;
		  	sketch.rect((sketch.width/2)-3*dimX, 10+3*dimX, dimX);
		  	sketch.rect((sketch.width/2)-4.5*dimX, 10+3*dimX, dimX);
		  	sketch.rect((sketch.width/2)-(dimX/2), 10+3*dimX, dimX);

			sketch.line(board_w, 0, board_w, x);
			x++;
		};
		sketch.windowResized = () => {
			w = p5Container.clientWidth;
			sketch.resizeCanvas(w, h);
		};
	};

	let myp5 = new p5(s, p5Container);

}


// The width variable is the width of the canvas, which when the canvas gets resized this variable auto updates.
// width variable is only defined inside the function setup and draw scopes


