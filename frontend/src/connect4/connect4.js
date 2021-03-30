export class Game {
    constructor(board, players) {
        this.board = board;
        this.players = players;
        this.currentPlayer = this.players[0];
    }
}

export class Board {
    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.grid = [];
        this.generateBoard(row, col);
    }

    generateBoard(row, col) {
        for (let i = 0; i < row; i++) {
            this.grid.push([]);
            for (let j = 0; j < col; j++) {
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
}