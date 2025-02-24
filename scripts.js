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
        const getSpace = (row, column) => board[row][column];
        const updateSpace = (row, column, value) => board[row][column] = value;
        const reset = () => {
            for (let i = 0; i < size; i++) {
                for (let j = 0; j < size; j++) {
                    board[i][j] = '';
                }
            }
        }
        return {getBoard, getSpace, updateSpace, reset};
    })();

    let turn = 'X';

    const play = (row, column) => {
        gameBoard.updateSpace(row, column, turn);
        turn = turn === 'X' ? 'O' : 'X'
    }

    const getBoard = () => gameBoard.getBoard();
    const getTurn = () => turn;
    const resetGame = () => {
        gameBoard.reset();
        turn = 'X';
    }
    return {play, getTurn, resetGame, getBoard};
}