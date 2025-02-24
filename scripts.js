function createBoard(size) {
    const board = [];
    for (let i = 0; i < size; i++) {
        board.push([]);
        for (let j = 0; j < size; j++) {
            board[i].push('');
        }
    }
    return board;
}

function newGame(size = 3) {
    const board = createBoard(size);
    let turn = 'X';

    const play = (row, column) => {
        board[row][column] = turn;
        turn = turn === 'X' ? 'O' : 'X'
    }

    const getTurn = () => turn;
    const getBoard = () => board;
    return {play, getTurn, getBoard};
}