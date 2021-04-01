import {Piece, Board} from './connect4';


export function bestMove(board, color) {
    let bestScore = -Infinity
    let bestStep;
    for(let i = 0; i < 6; i++) { //rows
        for(let j = 0; j < 7; j++) { //columns
            if((board.emptyAt(i,j))&&(!board.emptyAt(i+1,j) || i === 5)) { //make sure it's the bottom most empty in col
                board.grid[i][j] = new Piece(color); //place the piece
                let pos = [i,j]
                let score= minimax(board, false, color, pos, 6); //run algo, search 7 moves ahead
                board.grid[i][j] = null; // remove that piece
                if(score > bestScore) {
                    bestScore = score;
                    bestStep = {i, j}
                }
            }
        }
    }
    return [bestStep.i,bestStep.j]
}

let scores = {
    red: -10,
    // black: 10,
    yellow: 10,
    tie: 0
};

export function minimax(board, isMaximizing, color, pos, depth) {
    //need to check each winning position
    // debugger;
    let result = board.aiWin(pos[0],pos[1]); //, but need to return the color that wins or tie
    // let wincolor;
    // wincolor = result ? "black" : "red" : "tie"
    
    if(result !== null){
        return scores[result]; //key into scores object
    }
    if (depth === 0) { //don't search too far down the tree and just return a value
    //apply a value to that move. let's say middle has most value.
    let colpos = pos[1]
        if(colpos === 3){ //check the middle column
            return 5
        } else if( colpos=== 2 || colpos=== 4){
            return 5
        } else if( colpos=== 1 || colpos=== 5){
            return 5
        } else if( colpos=== 0 || colpos=== 6){
            return 5
        }
    }

    if(isMaximizing) {
        let bestScore = -Infinity;
        for(let i = 0; i < 6; i++) { //rows
            for(let j = 0; j < 7; j++){ //columns
                if ((board.emptyAt(i,j))&&(!board.emptyAt(i+1,j) || i === 5)){ 
                    // board.grid[i][j] = new Piece("black"); //place that piece.
                    board.grid[i][j] = new Piece("yellow"); //place that piece.

                    let score = minimax(board, false, color, [i,j], depth-1); //run the minimax algo
                    board.grid[i][j] = null; //put it back to null
                    bestScore = Math.max(score, bestScore); //put the score in.
                }
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for(let i = 0; i < 6; i++) { //rows
            for(let j = 0; j < 7; j++){ // columns
                if ((board.emptyAt(i,j))&&(!board.emptyAt(i+1,j) || i === 5)){ //checks if bottom of the column
                    board.grid[i][j] = new Piece("red"); //place that piece.
                    let score = minimax(board, true, color, [i,j], depth-1); //run the minimax algo
                    board.grid[i][j] = null; //put it back to null
                    bestScore = Math.min(score, bestScore); //put the score in.
                }
            }
        }
        return bestScore;
    }
}
