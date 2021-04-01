// export class Game {
//     constructor(board, players) {
//         this.board = board;
//         this.players = players;
//         this.currentPlayer = this.players[0];
//     }
// }

export class Board {
    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.grid = [];
        this.gameOver = false;
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

    emptyAt(x, y) {
        return (
            this.validPos(x,y) ? (this.grid[x][y] === null) : false
        )
    }

    fillPos(x, y, color) {
        this.grid[x][y] = new Piece(color);
    }

    validPos(x, y) {
        return (((0 <= x) &&  (x < 6)) && ((0 <= y) && (y < 7)))
    }
    aiWin(x, y) {
        if(this.full()){
            if (this.winDiagL(x,y) || this.winDiagR(x,y) || this.winRow(x,y) || this.winCol(x,y)) {
                return this.grid[x][y].color
            } else {
                return "tie";
            }
        } else {
            if (this.winDiagL(x,y) || this.winDiagR(x,y) || this.winRow(x,y) || this.winCol(x,y)) {
                return this.grid[x][y].color
            } else {
                return null
            }
        }
    }
    win(x, y) {
        if (this.winDiagL(x,y) || this.winDiagR(x,y) || this.winRow(x,y) || this.winCol(x,y)) this.gameOver = true;
    }

    winDiagL(x,y) {
        let dRight = 0
        let uLeft = 0

        let startX = x
        let startY = y

        while (this.validPos(startX+1, startY + 1)) {
            let curr = this.grid[startX][startY]
            let next = this.grid[startX+1][startY + 1]
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
    

    winDiagR(x,y) {
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

    winRow(x,y) {
        let left = 0 
        let right = 0 
        let start = y

        while (this.validPos(x, start+1)) {
            let curr = this.grid[x][start]
            let next = this.grid[x][start+1] 
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

    winCol(x,y) {
        let up = 0
        let start = x

        while (this.validPos(start + 1, y)) {
            let curr = this.grid[start][y]
            let next = this.grid[start+1][y]
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
        return(
            this.grid.flat().every(ele => ele instanceof Piece)
        )
    }
}

export class Piece {
    constructor(color) {
        this.color = color;
    }
}

// export class Player {
//     constructor(color, name) {
//         this.color = color;
//         this.name = name;
//     }
// }