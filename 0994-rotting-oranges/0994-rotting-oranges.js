var orangesRotting = function(grid) {
    let rows = grid.length;
    let cols = grid[0].length;
    
    let queue = [];
    let fresh = 0;

    // Step 1: initialize
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === 2) queue.push([r, c]);
            if (grid[r][c] === 1) fresh++;
        }
    }

    if (fresh === 0) return 0;

    let minutes = 0;
    let directions = [[1,0],[-1,0],[0,1],[0,-1]];

    // BFS
    while (queue.length > 0) {
        let size = queue.length;
        let infected = false;

        for (let i = 0; i < size; i++) {
            let [r, c] = queue.shift();

            for (let [dr, dc] of directions) {
                let nr = r + dr;
                let nc = c + dc;

                if (
                    nr >= 0 && nr < rows &&
                    nc >= 0 && nc < cols &&
                    grid[nr][nc] === 1
                ) {
                    grid[nr][nc] = 2;
                    fresh--;
                    queue.push([nr, nc]);
                    infected = true;
                }
            }
        }

        if (infected) minutes++;
    }

    return fresh === 0 ? minutes : -1;
};