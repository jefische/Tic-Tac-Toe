# Tic-Tac-Toe
This is a custom built tic-tac-toe web application. The application has options to play against a computer that makes random moves, or against an intelligent computer player which implements the well known [minimax algorithm](https://cs.stanford.edu/people/eroberts/courses/soco/projects/2003-04/intelligent-search/minimax.html). There is also an option to choose which player goes first. Note the user is always player 'X' and the computer is always 'O'. Finally there is an option to visualize the minimax algorithm.  See an example screenshot from the game below.

![alt text](https://github.com/jefische/Tic-Tac-Toe/blob/main/assets/TTT_game_empty.png "Tic-Tac-Toe")

## Minimax Visualized
If playing against the intelligent computer player, there is an added **educational feature** which gives the user an option to view the minimax decision tree for the previous move.  Given that in the beginning of the game, the algorithm iterates through thousands of possible game states, this feature becomes available when the View Minimax button is active.  This occurs when the computer player has 4 or fewer moves left to consider, which means the decision tree has less than 50 game states to generate.

When generated, the decision tree is drawn using the [p5.js](https://github.com/processing/p5.js) library.  The code for sketching the decision tree is in the [sketch.js](js/sketch.js) file.

To learn more about how this added feature is implemented checkout the [Drawing the Decision Tree](https://github.com/jefische/Tic-Tac-Toe/wiki/Drawing-the-Decision-Tree) wiki page!
