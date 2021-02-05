export const constructSquare = (number) => {
  const numberOfSquares = number * number;
  let squareArray = [];
  for (let i = 0; i < numberOfSquares; i++) {
    squareArray[i] = i;
  }
  const matrixSquare = [];
  while (squareArray.length) matrixSquare.push(squareArray.splice(0, number));
  console.log(matrixSquare);
  return matrixSquare;
};

/** Winning combination of squares */
const winningSquareCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

/** To check if all the squares are filled */
export const isBoardFull = (squares) => {
  for (let i = 0; i < squares.length; i++) {
    if (squares[i] === "") {
      return false;
    }
  }
  return true;
};

/** To calculate the winner */
export const calculateWinner = (squares) => {
  for (let i = 0; i < winningSquareCombos.length; i++) {
    const [a, b, c] = winningSquareCombos[i];
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

/** Spread a 2D array into 1D array */
export const twoDArraytoOneD = (twoDArray) => {
  return [].concat.apply([], twoDArray);
};