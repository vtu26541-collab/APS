var shortestAlternatingPaths = function(n, redEdges, blueEdges) {
    let redGraph = new Array(n).fill(0).map(() => []);
    let blueGraph = new Array(n).fill(0).map(() => []);

    for (let [u, v] of redEdges) redGraph[u].push(v);
    for (let [u, v] of blueEdges) blueGraph[u].push(v);

    let result = new Array(n).fill(-1);
    let visited = new Array(n).fill(0).map(() => [false, false]);

    let queue = [];
    
    // Start from node 0 with both colors
    queue.push([0, 0]); // last edge red
    queue.push([0, 1]); // last edge blue

    visited[0][0] = true;
    visited[0][1] = true;

    let steps = 0;

    while (queue.length > 0) {
        let size = queue.length;

        for (let i = 0; i < size; i++) {
            let [node, color] = queue.shift();

            if (result[node] === -1) {
                result[node] = steps;
            }

            // Alternate color
            let nextGraph = color === 0 ? blueGraph : redGraph;
            let nextColor = color === 0 ? 1 : 0;

            for (let nei of nextGraph[node]) {
                if (!visited[nei][nextColor]) {
                    visited[nei][nextColor] = true;
                    queue.push([nei, nextColor]);
                }
            }
        }

        steps++;
    }

    return result;
};