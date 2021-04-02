export class Board {
    constructor(grid) {
        this.grid = grid
    }

    generateBoard(){
        let newGrid = []
        for (let i = 0; i < 6; i++) {
            newGrid.push([]);
            for (let j = 0; j < 7; j++) {
                newGrid[i].push(null)
            }
        }
    }
}

export class Piece {
    constructor(color) {
        this.color = color;
    }
}

