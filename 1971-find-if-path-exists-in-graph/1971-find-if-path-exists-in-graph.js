var validPath = function(n, edges, source, destination) {
    let graph = new Array(n).fill(0).map(() => []);
    
    // Build graph
    for (let [u, v] of edges) {
        graph[u].push(v);
        graph[v].push(u);
    }

    let visited = new Set();

    function dfs(node) {
        if (node === destination) return true;
        visited.add(node);

        for (let neighbor of graph[node]) {
            if (!visited.has(neighbor)) {
                if (dfs(neighbor)) return true;
            }
        }
        return false;
    }

    return dfs(source);
};