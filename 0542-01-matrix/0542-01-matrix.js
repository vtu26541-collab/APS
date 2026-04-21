var updateMatrix = function(mat) {
    let rows = mat.length;
    let cols = mat[0].length;
    
    let queue = [];

    // Step 1: initialize
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (mat[r][c] === 0) {
                queue.push([r, c]);
            } else {
                mat[r][c] = Infinity;
            }
        }
    }

    let directions = [[1,0],[-1,0],[0,1],[0,-1]];

    // Step 2: BFS
    while (queue.length > 0) {
        let [r, c] = queue.shift();

        for (let [dr, dc] of directions) {
            let nr = r + dr;
            let nc = c + dc;

            if (
                nr >= 0 && nr < rows &&
                nc >= 0 && nc < cols &&
                mat[nr][nc] > mat[r][c] + 1
            ) {
                mat[nr][nc] = mat[r][c] + 1;
                queue.push([nr, nc]);
            }
        }
    }

    return mat;
};