function bestMove () {
	// AI to make its turn
	let bestScore = Infinity;
	let move;
	
	for (let i = 0; i < board.length ; i++) {
		// Is the spot available?
		if (board[i] == undefined) {
			board[i] = -1;
			countMinimaxCalls++;
			let score = minimax(board, 1, true);
			board[i] = undefined;
			if (score < bestScore) {
				bestScore = score;
				move = i;
			}
		}
	}
	return Number(move);
}

function minimax(board, depth, isMaximizing) {

	if (availableMoves <= 4) {
		console.log("We are at depth: " + depth);
		// depthCount[depth]++;
		let tempBoard = board.slice();
		depthCount[depth].push(tempBoard);
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
				let score = minimax(board, depth + 1, false) - depth;
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
				let score = minimax(board, depth + 1, true) + depth;
				board[i] = undefined;
				bestScore = Math.min(score, bestScore);
			}
		}
		return bestScore;
	}
}