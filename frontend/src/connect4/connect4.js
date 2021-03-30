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
        return ((x < 6) && (y < 7))
    }

    win() {
        return (this.winDiag() || this.winRow() || this.winCol())
    }

    winDiag() {
        
    }

    winRow() {
        let count = 1;
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 6; j++) {
                let currPiece = this.grid[i][j]
                let next = this.grid[i][j+1] 
                if ((currPiece instanceof Piece) && (next instanceof Piece)) {
                    if (currPiece.color == next.color) {
                        count += 1 
                    }
                } else {
                    count = 1
                }
                if (count == 4) return true;
            }
        }
    }

    winCol() {
       let count = 1; 
       for (let j = 0; j < 7; j++) {
           for (let i = 0; i < 5; i++) {
               let curr = this.grid[i][j] 
               let next = this.grid[i+1][j]
               if ((curr instanceof Piece) && (next instanceof Piece)) {
                   if (curr.color == next.color) {
                       count += 1
                   }
               } else {
                   count = 1
               }  
               if (count == 4) return true;
           }
       }
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