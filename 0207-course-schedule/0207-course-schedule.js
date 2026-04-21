var canFinish = function(numCourses, prerequisites) {
    let graph = new Array(numCourses).fill(0).map(() => []);
    let indegree = new Array(numCourses).fill(0);

    // Build graph
    for (let [a, b] of prerequisites) {
        graph[b].push(a);
        indegree[a]++;
    }

    let queue = [];

    // Add courses with no prerequisites
    for (let i = 0; i < numCourses; i++) {
        if (indegree[i] === 0) queue.push(i);
    }

    let completed = 0;

    // BFS
    while (queue.length > 0) {
        let course = queue.shift();
        completed++;

        for (let next of graph[course]) {
            indegree[next]--;
            if (indegree[next] === 0) {
                queue.push(next);
            }
        }
    }

    return completed === numCourses;
};