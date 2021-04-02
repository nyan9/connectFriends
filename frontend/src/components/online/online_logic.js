class Board {
    constructor(grid) {
        this.grid = grid
    }

    validPos(x, y) {
        return (((0 <= x) && (x < 6)) && ((0 <= y) && (y < 7)))
    }

    emptyAt(x, y) {
        return (
            this.validPos(x, y) ? (this.grid[x][y] === null) : false
        )
    }

    lastPiecePos(col) {
        for (let row = 0; row < 6; row++) {
            if (this.emptyAt(row, col) && (!this.emptyAt(row+1, col) || (row===5))) {
                return [row, col]
            }
        }
    }

    fillPos(x, y, color) {
        this.grid[x][y] = new Piece(color);
    }
}

class Piece {
    constructor(color) {
        this.color = color;
    }
}

module.exports = {
    Board,
    Piece
}

