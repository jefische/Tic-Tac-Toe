# [Tic-Tac-Toe]()
This is a simple and custom built Tic Tac Toe web application. The application has options to play against a computer that makes random moves, and  to play against an intelligent computer player which implements the well known minimax algorithm. 

If playing against the intelligent computer player, there is an added educational feature which gives the user an option to view the minimax decision tree for the previous move.  Given that in the beginning of the game, the algorithm iterates through thousands of possible game states, this feature becomes available when the View Minimax button is highlighted.  This occurs when the decision tree has 15 or fewer game states to generate.

When generated, the decision tree is drawn using the p5.js library.  The code for sketching the decision tree is in the [sketch.js](js/sketch.js) file.

