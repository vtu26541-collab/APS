var findOrder = function(numCourses, prerequisites) {
    let graph = new Array(numCourses).fill(0).map(() => []);
    let indegree = new Array(numCourses).fill(0);

    // Build graph
    for (let [a, b] of prerequisites) {
        graph[b].push(a);
        indegree[a]++;
    }

    let queue = [];

    // Step 1: nodes with no prerequisites
    for (let i = 0; i < numCourses; i++) {
        if (indegree[i] === 0) {
            queue.push(i);
        }
    }

    let result = [];

    // BFS
    while (queue.length > 0) {
        let course = queue.shift();
        result.push(course);

        for (let next of graph[course]) {
            indegree[next]--;
            if (indegree[next] === 0) {
                queue.push(next);
            }
        }
    }

    // If cycle exists
    return result.length === numCourses ? result : [];
};