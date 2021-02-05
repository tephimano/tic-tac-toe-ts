# tic-tac-toe-ts
Tic tac toe game

Features in the project

1. Created a login page (LoginPage.js)
2. Created Routes for Login and Game Pages
3. Added a protected Route for the game page
4. Added a suggested move button
5. Accomodated to create a n X n matrix with a given n
6. Applied the logic to find the winner and loser or if the game is draw
7. Handled lost token errors
8. Used Ant Design Library for the components

If i had more time, I would do

1. Add an error boundary
2. Create an algorithm to calculate the winning moves
3. Organize the CSS
4. In production ideally the react app would be hosted in a web server like a Express JS app with the routes setup to communicate with the AI engine
5. Improve the user experience to show the position of the move in a matrix
6. Write unit tests for the components and util functions before creating the project

App.js - Holds all routes for the components
LoginPage.js - Displays the login page
GamePage.js - Displays the Game
SquaresBoard.js - Displays the squares in the tic-tac-toe-board and handles the game logic
SquareButton.js - Displays the button to display the value
UtilFunctions.js - Contains the utility functions for the game