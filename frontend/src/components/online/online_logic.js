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

    //

    win(x, y) {
        return (this.winDiagL(x, y) || this.winDiagR(x, y) || this.winRow(x, y) || this.winCol(x, y)); 
    }

    winDiagL(x, y) {
        let dRight = 0
        let uLeft = 0
        let startX = x
        let startY = y
        while (this.validPos(startX + 1, startY + 1)) {
            let curr = this.grid[startX][startY]
            let next = this.grid[startX + 1][startY + 1]
            if (next instanceof Piece) {
                if (curr.color === next.color) {
                    dRight++;
                    startX++;
                    startY++;
                } else {
                    break;
                }
            } else {
                break;
            }
        }
        startX = x
        startY = y
        while (this.validPos(startX - 1, startY - 1)) {
            let curr = this.grid[startX][startY]
            let next = this.grid[startX - 1][startY - 1]
            if (next instanceof Piece) {
                if (curr.color === next.color) {
                    uLeft++;
                    startX--;
                    startY--;
                } else {
                    break;
                }
            } else {
                break;
            }
        }
        if (uLeft + 1 + dRight >= 4) return true;
    }

    winDiagR(x, y) {
        let dLeft = 0
        let uRight = 0
        let startX = x
        let startY = y
        while (this.validPos(startX + 1, startY - 1)) {
            let curr = this.grid[startX][startY]
            let next = this.grid[startX + 1][startY - 1]
            if (next instanceof Piece) {
                if (curr.color === next.color) {
                    dLeft++;
                    startX++;
                    startY--;
                } else {
                    break;
                }
            } else {
                break;
            }
        }
        startX = x
        startY = y
        while (this.validPos(startX - 1, startY + 1)) {
            let curr = this.grid[startX][startY]
            let next = this.grid[startX - 1][startY + 1]
            if (next instanceof Piece) {
                if (curr.color === next.color) {
                    uRight++;
                    startX--;
                    startY++;
                } else {
                    break;
                }
            } else {
                break;
            }
        }
        if (dLeft + 1 + uRight >= 4) return true;
    }
    winRow(x, y) {
        let left = 0
        let right = 0
        let start = y
        while (this.validPos(x, start + 1)) {
            let curr = this.grid[x][start]
            let next = this.grid[x][start + 1]
            if (next instanceof Piece) {
                if (curr.color === next.color) {
                    right++;
                    start++;
                } else {
                    break;
                }
            } else {
                break;
            }
        }
        start = y
        while (this.validPos(x, start - 1)) {
            let curr = this.grid[x][start]
            let next = this.grid[x][start - 1]
            if (next instanceof Piece) {
                if (curr.color === next.color) {
                    left++;
                    start--;
                } else {
                    break;
                }
            } else {
                break;
            }
        }
        if (left + 1 + right >= 4) return true;
    }

    winCol(x, y) {
        let up = 0
        let start = x
        while (this.validPos(start + 1, y)) {
            let curr = this.grid[start][y]
            let next = this.grid[start + 1][y]
            if (next instanceof Piece) {
                if (curr.color === next.color) {
                    up++;
                    start++;
                } else {
                    break;
                }
            } else {
                break;
            }
        }
        if (up + 1 >= 4) return true;
    }
    
    full() {
        return (
            this.grid.flat().every(ele => ele instanceof Piece)
        )
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

