// Variable definitions
var availableMoves = 9;
var board = [...Array(9)];
var gameOver = false;
var computerPlayer = "random";
var countMinimaxCalls = 0;
let depthCount = [[],[],[],[],[]];
let depthMapping = [];

var ai = "O";
var human = "X";
var currentPlayer = human;

const playerX = document.querySelectorAll(".board button");
const gameReset = document.querySelector(".reset");
const gameStart = document.querySelector(".start");
const revealWinner = document.querySelector(".game-winner");
const radioButtonsComputerAI = document.querySelectorAll('input[name="player_type"]');
const radioButtonsWhoGoesFirst = document.querySelectorAll('input[name="go_first"]');
const allRadioButtons = document.querySelectorAll("input");
const algorithmOutput1 = document.querySelector(".algo-text-1");
const algorithmOutput2 = document.querySelector(".algo-text-2");



gameReset.addEventListener("click", resetGame);

for (const radioButtonFirst of radioButtonsComputerAI) {
	radioButtonFirst.addEventListener("change", setComputerPlayer);
}

for (const radioButtonSecond of radioButtonsWhoGoesFirst) {
	radioButtonSecond.addEventListener("change", setFirstPlayer);
}

gameStart.addEventListener("click", startGame);




/*************************************/
function setComputerPlayer() {
	if (this.checked) {
		computerPlayer = this.value;
	}
	if (this.value == "genius") {
		algorithmOutput1.style.opacity = 1;
		algorithmOutput2.style.opacity = 1;
	}
	else {
		algorithmOutput1.style.opacity = 0;
		algorithmOutput2.style.opacity = 0;
	}
}

function setFirstPlayer() {
	if (this.checked & this.value == "Computer") {
		currentPlayer = ai;
	}
	else {
		currentPlayer = human;
	}
}

function startGame() {
	for (let radioButtons of allRadioButtons) {
		radioButtons.disabled = true;
	}
	if (currentPlayer == ai) {
		computerPlayerTurn();
	}
	playerX.forEach(markSquare);
}

function markSquare(record) {
	record.addEventListener("click", selectSquare);
}

function unmarkSquare(record) {
	record.removeEventListener("click", selectSquare);
}

function selectSquare(event) {
		var isWinner = null;
		// Check if square is free and mark X
		var square = event.currentTarget.lastChild;
		var squareNum = square.className;
		squareNum = Number(squareNum.match(/[0-9]/g)[0]);

		if (board[squareNum] == undefined & !gameOver) {
			square.textContent = human;
			board[squareNum] = 1;
			availableMoves--;
			depthCount = [[],[],[],[],[]];
			depthMapping = [];
		}
		else if (gameOver) {
			return;
		}
		else {
			revealWinner.textContent = "Choose another square";
			return;
		}

		isWinner = checkForWinner();
		if (isWinner == 100) {
			revealWinner.textContent = `${human} wins!`;
			revealWinner.style.opacity = 1;
			gameOver = true;
		}
		else if (isWinner == -100) {
			revealWinner.textContent = `${ai} wins!`;
			revealWinner.style.opacity = 1;
			gameOver = true;
		}
		else if (isWinner == 0) {
			revealWinner.textContent = "Draw"
			revealWinner.style.opacity = 1;
			gameOver = true;
		}
	
		// Computer Move
		if (!gameOver) {
			computerPlayerTurn();		
		}
}

function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function computerPlayerTurn() {
	if (computerPlayer == "random") {
		var computerMove = randomMove();
	}
	else if (computerPlayer == "genius") {
		var computerMove = bestMove();
		algorithmOutput1.textContent = `Number of minimax function calls: ${numberWithCommas(countMinimaxCalls)}`;
		algorithmOutput2.textContent = `Number of minimax function calls: ${numberWithCommas(countMinimaxCalls)}`;
	}
	
	board[computerMove] = -1;
	countMinimaxCalls = 0;

	// mark square O
	var computerSquare = document.querySelector(`.position${computerMove}`);
	computerSquare.innerHTML = "O";

	availableMoves--;
	console.log("Number of moves left: " + availableMoves);

	var isWinner = null;
	isWinner = checkForWinner();
	if (isWinner == 100) {
		revealWinner.textContent = `${human} wins!`;
		revealWinner.style.opacity = 1;
		gameOver = true;
	}
	else if (isWinner == -100) {
		revealWinner.textContent = `${ai} wins!`;
		revealWinner.style.opacity = 1;
		gameOver = true;
	}
	else if (isWinner == 0) {
		revealWinner.textContent = "Draw"
		revealWinner.style.opacity = 1;
		gameOver = true;
	}
}

function randomMove () {
	let nextMove = Math.floor(Math.random()*availableMoves) + 1;
	let count = 0;
	// use the random number to select one of the open moves
	for (let i = 0; i < board.length; i++) {
		if (board[i] == undefined) {
			count++;
			if (nextMove == count) {
				return i;
			}
		}
	}
}

function checkForWinner() {
	// Check rows
	for (let i = 0; i < 9; i += 3) {
		if (sum(...board.slice(i,i+3)) == 3) {
			return 100;
		}
		else if (sum(...board.slice(i,i+3)) == -3) {
			return -100;
		}
	}
	// Check columns
	for (let i = 0; i < 3; i++) {
		if (sum(board[i],board[i+3],board[i+6]) == 3) {
			return 100;
		}
		else if (sum(board[i],board[i+3],board[i+6]) == -3) {
			return -100;
		}
	}
	// Check diagonals;
	for (let i = 0; i < 1; i++) {
		if (sum(board[i],board[i+4],board[i+8]) == 3 | 
			sum(board[i+2],board[i+4],board[i+6]) == 3) {
			return 100;
		}
		else if (sum(board[i],board[i+4],board[i+8]) == -3 | 
			sum(board[i+2],board[i+4],board[i+6]) == -3) {
			return -100;
		}
	}
	let isOver = true;
	for (let i = 0; i < 9; i++) {
		if (board[i] == undefined) {
			isOver = false;
		}
	}
	if (isOver) {
		return 0;
	}
	return null;
}

function sum(x, y, z) {
  return x + y + z;
}

function resetGame() {
	availableMoves = 9;
	board = [...Array(9)];
	gameOver = false;
	revealWinner.style.opacity = 0;
	algorithmOutput.style.opacity = 0;

	for (let radioButtons of allRadioButtons) {
		radioButtons.disabled = false;
	}

	playerX.forEach(resetSquares);
	playerX.forEach(unmarkSquare);

}

function resetSquares(record) {
	record.children[0].textContent = "";
}

