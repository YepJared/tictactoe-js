function inputOutOfBounds(r, c, size) {
    const rowOutOfBounds = (r < 0 || r >= size);
    const colOutOfBounds = (c < 0 || c >= size);
    return (rowOutOfBounds || colOutOfBounds);
}

function isOccupiedSpace(space) {
    return (space === 'X' || space === 'O');
}

function isVictory(rowStart, rowIncrement, colStart, colIncrement, board, size, turn) {
    let r = rowStart;
    let c = colStart;

    while (inputOutOfBounds(r, c, size) === false) {
        if (board[r][c] != turn) {
            return false;
        }

        c += colIncrement;
        r += rowIncrement;
    }

    return true;
}

function victoryAchieved(r, c, board, size, turn) {
    const rowVictory = isVictory(r, 0, 0, 1, board, size, turn);
    const colVictory = isVictory(0, 1, c, 0, board, size, turn);
    let topLeftBottomRightDiagVictory = false;
    let bottomLeftTopRightDiagVictory = false;
    if (r === c) {
        topLeftBottomRightDiagVictory = isVictory(0, 1, 0, 1, board, size, turn);
    }

    if (r === size - c - 1) {
        bottomLeftTopRightDiagVictory = isVictory(size - 1, -1, 0, 1, board, size, turn);
    }

    return rowVictory || colVictory || topLeftBottomRightDiagVictory || bottomLeftTopRightDiagVictory;
}

function changeTurn(turn) {
    const newTurn = turn === 'X' ? 'O' : 'X';
    displayController.updateTurn(newTurn);
    return newTurn;
}

const game = (function() {
    const gameBoard = (function () {
        const board = [];
        const size = 3;

        for (let i = 0; i < size; i++) {
            board.push([]);
            for (let j = 0; j < size; j++) {
                board[i].push('');
            }
        }

        const getBoard = () => board;
        const getSize = () => size;
        const getSpace = (row, column) => board[row][column];
        const updateSpace = (row, column, value) => {
            board[row][column] = value;
            displayController.updateDisplay(row, column, value);
        }
        const reset = () => {
            for (let i = 0; i < size; i++) {
                for (let j = 0; j < size; j++) {
                    board[i][j] = '';
                    displayController.updateDisplay(i, j, '');
                }
            }
        }
        return {getBoard, getSize, getSpace, updateSpace, reset};
    })();

    let turn = 'X';
    let turnCount = 0;
    let gameOver = false;

    const play = (row, column) => {
        if (gameOver) {
            console.log("Game is over. Start a new game.");
            return;
        }

        if (inputOutOfBounds(row, column, gameBoard.getSize())) {
            console.log("Invalid input. Try again.");
            return;
        }
        
        if (isOccupiedSpace(gameBoard.getSpace(row, column))) {
            console.log("Invalid placement. Try again.");
            return;
        }

        gameBoard.updateSpace(row, column, turn);

        if (victoryAchieved(row, column, gameBoard.getBoard(), gameBoard.getSize(), turn)) {
            gameOver = true;
            console.log(`Congratulations! ${turn} wins!`);
            return;
        }

        turnCount++;
        if (turnCount === game.getBoardSize() ** 2) {
            gameOver = true;
            console.log('Stalemate. Nobody wins.');
            return;
        }

        turn = changeTurn(turn);
    }

    const getBoard = () => gameBoard.getBoard();
    const getBoardSize = () => gameBoard.getSize();
    const getTurn = () => turn;
    const resetGame = () => {
        gameBoard.reset();
        turn = changeTurn('O');
        turnCount = 0;
        gameOver = false;
    }
    return {play, getBoard, getBoardSize, getTurn, resetGame};
})();

/* 
Assuming the tic tac toe board spaces are numbered starting from the top-left
and that the spaces start being numbered at 0 increasing by one as you move left to right
any given space's id can be given by the formula id = (boardSize * row) + column
*/

function getRowColFromID(id, size) {
    const column = id % size;
    const row = (id - column) / size;
    return {
        row: row,
        column: column
    };
}

function getIDFromRowCol(row, col, size) {
    return size * row + col;
}

const displayController = (function() {
    const boardContainer = document.querySelector(".gameboard");
    for (let i = 0; i < game.getBoardSize() ** 2; i++) {
        const button = document.createElement("button");
        button.classList.add("space");
        button.id = i;
        button.addEventListener("click", () => {
            const space = getRowColFromID(button.id, game.getBoardSize());
            game.play(space.row, space.column);
        });
        boardContainer.appendChild(button);
    }

    const turnIndicator = document.querySelector(".turn");
    turnIndicator.textContent = 'X';
    turnIndicator.style.color = "darkred";

    const updateDisplay = (row, column, turn) => {
        const buttonID = getIDFromRowCol(row, column, game.getBoardSize());
        const button = document.getElementById(`${buttonID}`);
        button.textContent = turn;
    }

    const updateTurn = (turn) => {
        turnIndicator.textContent = turn;
        turnIndicator.style.color = turn === 'X' ? "darkred" : "darkblue";
    }

    return {updateDisplay, updateTurn};
})();