function inputOutOfBounds(r, c, size) {
    const rowOutOfBounds = (r < 0 || r >= size);
    const colOutOfBounds = (c < 0 || c >= size);
    return (rowOutOfBounds || colOutOfBounds);
}

function isOccupiedSpace(space) {
    return (space === 'X' || space === 'O');
}

function newGame(boardSize = 3) {
    const gameBoard = (function (size = boardSize) {
        const board = [];

        for (let i = 0; i < size; i++) {
            board.push([]);
            for (let j = 0; j < size; j++) {
                board[i].push('');
            }
        }

        const getBoard = () => board;
        const getSize = () => board.length;
        const getSpace = (row, column) => board[row][column];
        const updateSpace = (row, column, value) => board[row][column] = value;
        const reset = () => {
            for (let i = 0; i < size; i++) {
                for (let j = 0; j < size; j++) {
                    board[i][j] = '';
                }
            }
        }
        return {getBoard, getSize, getSpace, updateSpace, reset};
    })();

    let turn = 'X';

    const play = (row, column) => {
        if (inputOutOfBounds(row, column, gameBoard.getSize())) {
            console.log("Invalid input. Try again.");
            return;
        }
        
        if (isOccupiedSpace(gameBoard.getSpace(row, column))) {
            console.log("Invalid placement. Try again.");
            return;
        }

        gameBoard.updateSpace(row, column, turn);
        turn = turn === 'X' ? 'O' : 'X';
    }

    const getBoard = () => gameBoard.getBoard();
    const getTurn = () => turn;
    const resetGame = () => {
        gameBoard.reset();
        turn = 'X';
    }
    return {play, getTurn, resetGame, getBoard};
}