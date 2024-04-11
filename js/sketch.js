/******** p5.js *************************/

const p5Container = document.querySelector("#treeContainer");
const viewMinimax = document.querySelector(".view-minimax");

viewMinimax.addEventListener("click", startSketch);


function startSketch() {

	const s = function(sketch) {
		let w = p5Container.clientWidth;
		let h = 1000;
		let edge;
		let dimX;
		let initialHeight;
		let heightMultiplier;
		let rowSpacing;
		let maxColumns = 6;
		
		sketch.setup = function() {
			sketch.createCanvas(w, h);
			sketch.noLoop();
		};
		
		sketch.draw = function() {

			sketch.background(270);
			maxColumns = Math.max(6, Math.max(...depthCount.map((x)=> x.length)));
			if (maxColumns > 18) {
				maxColumns = 18;
			}
			dimX = sketch.width/(maxColumns*2.5);
			edge = dimX / 3;

			let firstCornerX = (sketch.width/2)-(dimX/2);
			let dimensionMapCopy = [mutateArray(depthMapping, 0)];
			let currentDepth = 0;

			initialHeight = 10;
			heightMultiplier = 2;
			rowSpacing = 5;
			sketch.textSize(w/75);
			// sketch.textAlign(RIGHT);

			if (depthCount[1].length == 4) { // if depth 1 has 4 boards increase height and spacing
				heightMultiplier = 4;
				rowSpacing = 11;
				sketch.textSize(w/100);
			}
			
			boardStates = JSON.parse(JSON.stringify(depthCount)) // deep clone the original array.
			sketch.drawTree(dimensionMapCopy, firstCornerX, currentDepth, rowSpacing, initialHeight+heightMultiplier*dimX);
		};
		sketch.drawTree = function(mapArray, corner, depth, spacing, height) {
			let subRowLength;
			let newCorner;
			if (depth == 2 && depthCount[1].length > 3) {
				subRowLength = mapArray.length*dimX + (spacing-1)*dimX*(mapArray.length-1) - 4*dimX;
			}
			else {
				subRowLength = mapArray.length*dimX + (spacing-1)*dimX*(mapArray.length-1);
			}

			newCorner = (corner+(dimX/2)) - (subRowLength/2);

			// console.log("at depth: " + depth + " drawing " + mapArray.length + " game states; with a spacing " + spacing + " and row length: " + subRowLength + " with new corner: " + newCorner + " and dimX: " + dimX);

			for (let i = 0; i < mapArray.length; i++) {
				let x = newCorner+i*spacing*dimX;
				let	y = height*depth;
				if (depth == 0) {
					y = 10;
				}
				if (depth == 2 && depthCount[1].length == 4) {
					x = newCorner+i*(spacing-2)*dimX;
				}

				// draw board
				sketch.stroke('black');
				sketch.strokeWeight(2);
				sketch.line(x+edge, y, x+edge, y+dimX); // vertical line 1
				sketch.line(x+2*edge, y, x+2*edge, y+dimX); // vertical line 2
				sketch.line(x, y+edge, x+dimX, y+edge); // horizontal line 1
				sketch.line(x, y+2*edge, x+dimX, y+2*edge); // horizontal line 2

				// draw branches
				if (i > 0) {
					sketch.strokeWeight(3);
					if (depth == 2 && depthCount[1].length == 4) {
						sketch.line(x-(spacing-3)*dimX+10, y+(dimX/2), x-10, y+(dimX/2));
					}
					else {
						sketch.line(x-(spacing-1)*dimX+15, y+(dimX/2), x-15, y+(dimX/2));
					}
				}
				if (depth == 0 | mapArray[i].length >= 1) {
					sketch.strokeWeight(3);
					sketch.line(x+(dimX/2), y+dimX+10, x+(dimX/2), y+height-40);
					sketch.triangle(x+(dimX/2), y+height-20, x+(dimX/2)-10, y+height-40, x+(dimX/2)+10, y+height-40);
				}

				// mark the boards
				let position = sketch.make2DArray(3,3,boardStates[depth][0]);

				for (let i = 0; i < position.length; i++) {
					for (let j = 0; j < position.length; j++) {
						if (position[i][j] == 1) { // drawing X
						sketch.stroke('black');
						sketch.strokeWeight(2);
						sketch.line(x+j*edge,y+i*edge,x+(j+1)*edge,y+(i+1)*edge); // X line-1
						sketch.line(x+j*edge,y+(i+1)*edge,x+(j+1)*edge,y+i*edge); // X line-2
						}
						else if (position[i][j] == -1) { // drawing O
						sketch.stroke('black');
						sketch.strokeWeight(2);
						sketch.circle(x+(j+0.5)*edge, y+(i+0.5)*edge, 0.8*edge);
						}
						else if (position[i][j] == 99) { // drawing blue X
						sketch.stroke('blue');
						sketch.strokeWeight(3);
						sketch.line(x+j*edge,y+i*edge,x+(j+1)*edge,y+(i+1)*edge); // X line-1
						sketch.line(x+j*edge,y+(i+1)*edge,x+(j+1)*edge,y+i*edge); // X line-2
						}
						else if (position[i][j] == -99) { // drawing blue O
						sketch.stroke('blue');
						sketch.strokeWeight(3);
						sketch.circle(x+(j+0.5)*edge, y+(i+0.5)*edge, 0.8*edge);
						}
					}
				}
				
				// Highlight the best move
				if (depth == 1) {
					let bestBoard = boardStates[depth][0].findIndex((ele) => ele == -99);
					if (bestBoard == computerMove) {
						sketch.fill(52,174,235);
						sketch.strokeWeight(0.25);
						sketch.text("Best Move!", x, y-15);
					}
					sketch.fill(255);
				}
				boardStates[depth].splice(0,1);
			}
			
			// step through next branch
			if (mapArray.length > 1 | depth == 0) {
				for (let i = 0; i < mapArray.length; i++) {
					if (depth == 2 && depthCount[1].length > 3) {
						sketch.drawTree(mapArray[i], newCorner+i*(spacing-2)*dimX, depth + 1, spacing/(depth+1), height);
					}
					else {
						sketch.drawTree(mapArray[i], newCorner+i*spacing*dimX, depth + 1, spacing/(depth+1), height);
					}
				}
			}
		};
		sketch.make2DArray = function(cols, rows, board) {
			let arr = new Array(cols);
			for (let i = 0; i < arr.length; i++) {
				arr[i] = new Array(rows);
			}
			let k = 0;
			for (let i = 0; i < cols; i++) {
				for (let j = 0; j < rows; j++) {
					arr[i][j] = board[k];
					k++;
				}
			}
			return arr;
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


function mutateArray(depthArray, depthValue) {
	depthValue++;
	let initialBranches = depthArray.filter(function(x) {return x==depthValue}).length;
	let finalArray = [];
	let nesting = [];
	
	if (initialBranches <= 1) {
		return depthArray;
	}
	else {
		let tempArray = depthArray.slice();
		for (let i = 0; i < initialBranches; i++) {
			let start = tempArray.indexOf(depthValue, 0);
			let end = tempArray.indexOf(depthValue,1);
			if (end > 0 & (start+1 != end)) {
				nesting = tempArray.slice(start+1, end);
				tempArray.splice(start,end);
			}
			else if (end > 0 & (start+1 == end)) {
				tempArray.splice(start,1);
				continue;
			}
			else {
				nesting = tempArray.slice(start+1);
			}
			finalArray[i] = mutateArray(nesting,depthValue);
			replace(finalArray,depthValue);
		}
	}
	return finalArray;
}

function replace(array, value) {
	if (array.includes(undefined)) {
		let idx = array.findIndex((x) => x==undefined);
		array[idx] = value;
		replace(array,value);
	}
}