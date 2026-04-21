var floodFill = function(image, sr, sc, newColor) {
    let rows = image.length;
    let cols = image[0].length;
    let original = image[sr][sc];

    if (original === newColor) return image;

    function dfs(r, c) {
        if (
            r < 0 || r >= rows ||
            c < 0 || c >= cols ||
            image[r][c] !== original
        ) return;

        image[r][c] = newColor;

        dfs(r+1, c);
        dfs(r-1, c);
        dfs(r, c+1);
        dfs(r, c-1);
    }

    dfs(sr, sc);
    return image;
};