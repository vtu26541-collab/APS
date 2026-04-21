var maxAreaOfIsland = function(grid) {
    let rows = grid.length;
    let cols = grid[0].length;
    let maxArea = 0;

    function dfs(r, c) {
        if (
            r < 0 || r >= rows ||
            c < 0 || c >= cols ||
            grid[r][c] === 0
        ) return 0;

        grid[r][c] = 0; // mark visited

        return 1 +
            dfs(r+1, c) +
            dfs(r-1, c) +
            dfs(r, c+1) +
            dfs(r, c-1);
    }

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === 1) {
                let area = dfs(r, c);
                maxArea = Math.max(maxArea, area);
            }
        }
    }

    return maxArea;
};