export function bestMove(grid, color) {
    let bestScore = -Infinity
    let bestStep;
    for(let i = 0; i < 6; i++) {
        for(let j = 0; j < 7; j++) {
            if(grid[i][j] === null) {
                grid[i][j] = color;
                let score= minimax(grid, false, color);
                grid[i][j] = null;
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
    red: 10,
    black: -10,
    tie: 0
};

export function minimax(grid, isMaximizing, color) {
    //need to check each winning position
    let result = win(); //takes in position, but need to return the color that wins
    if(result !== null){
        return scores[result]; //key into scores object
    }

    if(isMaximizing) {
        let bestScore = -Infinity;
        for(let i = 0; i < 6; i++) {
            for(let j = 0; j < 7; j++){
                if (grid[i][j] === null){ //instead of this, check each column for the bottom most open space.
                    grid[i][j] = color === "red" ? "black" : "red"; //place that piece.
                    let score = minimax(grid, true, color); //run the minimax algo
                    grid[i][j] = null; //put it back to null
                    bestScore = min(score, bestScore); //put the score in.
                }
            }
        }
        return bestScore;
    }
}
