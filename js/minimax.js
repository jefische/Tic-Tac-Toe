function bestMove () {
	// AI to make its turn
	let bestScore = Infinity;
	let move;
	let tempBoard = board.slice();
	depthCount[0].push(tempBoard);
	
	for (let i = 0; i < board.length ; i++) {
		// Is the spot available?
		if (board[i] == undefined) {
			board[i] = -1;
			countMinimaxCalls++;
			let score = minimax(board, 1, true, i);
			board[i] = undefined;
			if (score < bestScore) {
				bestScore = score;
				move = i;
			}
			if (availableMoves <= 4) {
				// console.log("move: " + i + " with score: " + score);
			}
		}
	}
	return Number(move);
}

function minimax(board, depth, isMaximizing, currentMove) {

	if (availableMoves <= 4) {
		viewMinimax.disabled = false;
		depthMapping.push(depth);
		let tempBoard = board.slice();
		if (isMaximizing) {
			tempBoard[currentMove] = -99;
		}
		else {
			tempBoard[currentMove] = 99;
		}
		depthCount[depth].push(tempBoard);

		// need to check for number of game states
	}

	{ let result = checkForWinner();
		if (result !== null) {
			return result;
		}
	}

	if (isMaximizing) {
		let bestScore = -Infinity;
		for (let i = 0; i < board.length ; i++) {
			// Is the spot available?
			if (board[i] == undefined) {
				board[i] = 1;
				countMinimaxCalls++;
				let score = minimax(board, depth + 1, false, i) - depth;
				board[i] = undefined;
				bestScore = Math.max(score, bestScore);
			}
		}
		return bestScore;
	}
	else {
		let bestScore = Infinity;
		for (let i = 0; i < board.length ; i++) {
			// Is the spot available?
			if (board[i] == undefined) {
				board[i] = -1;
				countMinimaxCalls++;
				let score = minimax(board, depth + 1, true, i) + depth;
				board[i] = undefined;
				bestScore = Math.min(score, bestScore);
			}
		}
		return bestScore;
	}
}