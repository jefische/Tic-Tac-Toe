/******** p5.js *************************/

const p5Container = document.querySelector("#treeContainer");
const viewMinimax = document.querySelector(".view-minimax");


viewMinimax.addEventListener("click", startSketch);


function startSketch() {

	const s = function(sketch) {
		let w = p5Container.clientWidth;
		let h = 1000;
		let edge;
		// let maxColumns = Math.max(...depthCount.map((x) => x.length));
		let maxColumns = 6;
		depthMapping = [1,2,3,2,3,1,2,2,3,1,2,2,3];

		sketch.setup = function() {
			sketch.createCanvas(w, h);
			sketch.noLoop();
		};

		sketch.draw = function() {

			sketch.background(220);
			
			let dimX = sketch.width/(maxColumns*2.5);
			let firstCornerX = (sketch.width/2)-(dimX/2);
			edge = dimX / 3;
			let mapCopy = mutateArray(depthMapping, 0);

			// depth = 0;
		  	sketch.rect(firstCornerX, 10, dimX);

			let multiplierD1 = 5;
			let spacingD1 = (multiplierD1 - 1)*dimX;
			let multiplierD2 = 2.5;
			let spacingD2 = (multiplierD2 - 1)*dimX

			// depth = 1;
			let rowLengthD1 = mapCopy.length*dimX + (spacingD1)*(mapCopy.length-1);
			let firstCornerXD1 = (sketch.width/2) - (rowLengthD1/2);

			for (let i = 0; i < mapCopy.length; i++) {
				sketch.rect(firstCornerXD1+i*(multiplierD1)*dimX, 10+2*dimX, dimX);
				// need to grab the board state here
				
				let currentDepth = 1;
				sketch.drawTree(mapCopy[i], firstCornerXD1+i*(multiplierD1)*dimX, currentDepth+1, dimX, multiplierD2, spacingD2);
			}
		};
		sketch.windowResized = () => {
			w = p5Container.clientWidth;
			sketch.resizeCanvas(w, h);
		};
		sketch.drawTree = function(mapArray, corner, depth, dimX, multiplierD2, spacingD2) {
			let subRowLength = mapArray.length*dimX + spacingD2*(mapArray.length-1);
			let newCorner = (corner+(dimX/2)) - (subRowLength/2);

			if (mapArray.length > 1) {
				for (let i = 0; i < mapArray.length; i++) {
					sketch.drawTree(mapArray[i], newCorner+i*multiplierD2*dimX, depth + 1, dimX, multiplierD2, spacingD2);
				}
			}
			for (let i = 0; i < mapArray.length; i++) {
				// draw board
				sketch.rect(newCorner+i*multiplierD2*dimX, 10+2*dimX*depth, dimX);
			}
		};
	};
	let myp5 = new p5(s, p5Container);
}

// The width variable is the width of the canvas, which when the canvas gets resized this variable auto updates.
// width variable is only defined inside the function setup and draw scopes


function mutateArray(enter, value) {
	value++;
	let initialBranches = enter.filter(function(x) {return x==value}).length;
	let newArray = [];
	let tempArray = [];
	
	if (initialBranches <= 1) {
		return enter;
	}
	else {
		for (let i = 0; i < initialBranches; i++) {
			let start = enter.indexOf(value, 0);
			let end = enter.indexOf(value,1);
			if (end > 0 & (start+1 != end)) {
				tempArray = enter.slice(start+1, end);
				enter.splice(start,end);
			}
			else if (end > 0 & (start+1 == end)) {
				tempArray = enter.slice(start, end);
				enter.splice(start,1);
				continue;
			}
			else {
				tempArray = enter.slice(start+1);
			}
			newArray[i] = mutateArray(tempArray,value);
			replace(newArray,value);
		}
	}
	return newArray;
}

function replace(array, value) {
	if (array.includes(undefined)) {
		let idx = array.findIndex((x) => x==undefined);
		array[idx] = value;
		replace(array,value);
	}
}