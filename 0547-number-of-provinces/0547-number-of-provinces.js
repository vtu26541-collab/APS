var findCircleNum = function(isConnected) {
    let n = isConnected.length;
    let visited = new Array(n).fill(false);
    let provinces = 0;

    function dfs(city) {
        for (let j = 0; j < n; j++) {
            if (isConnected[city][j] === 1 && !visited[j]) {
                visited[j] = true;
                dfs(j);
            }
        }
    }

    for (let i = 0; i < n; i++) {
        if (!visited[i]) {
            visited[i] = true;
            dfs(i);
            provinces++;
        }
    }

    return provinces;
};