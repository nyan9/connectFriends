export class Game {
    constructor(board, players) {
        this.board = board;
        this.players = players;
        this.currentPlayer = this.players[0];
    }

    play() {

    }

    swap_turn() {

    }
}

export class Board {
    constructor(gridSize) {
        this.gridSize = gridSize;
        this.grid = []
        this.generateBoard(this.gridSize);
    }


    indexAt(pos) {

    }

    indexAtEquals(pos, piece) {

    }

    gameOver() {

    }

    winDiagonal() {

    }

    winRow() {

    }

    winCol() {

    }

    emptyPos(pos) {

    }

    validCol(rowIdx) {

    }

    dropPiece(piece, rowIdx) {

    }

    isFull() {

    }

    generateBoard(gridSize) {
        for (let i = 0; i < gridSize; i++) {
            this.grid.push([]);
            for (let j = 0; j < gridSize; j++) {
                this.grid[i].push(null);
            }
        }
    }
}

export class Piece {
    constructor(color) {
        this.color = color;
    }
}

export class Player {
    constructor(color, name) {
        this.color = color;
        this.name = name;
    }

    getMove() {

    }
}