var sortItems = function(n, m, group, beforeItems) {
    // Step 1: assign new groups
    for (let i = 0; i < n; i++) {
        if (group[i] === -1) group[i] = m++;
    }

    let itemGraph = new Array(n).fill(0).map(() => []);
    let itemIndegree = new Array(n).fill(0);

    let groupGraph = new Array(m).fill(0).map(() => []);
    let groupIndegree = new Array(m).fill(0);

    // Step 2: build graphs
    for (let i = 0; i < n; i++) {
        for (let prev of beforeItems[i]) {
            itemGraph[prev].push(i);
            itemIndegree[i]++;

            if (group[i] !== group[prev]) {
                groupGraph[group[prev]].push(group[i]);
                groupIndegree[group[i]]++;
            }
        }
    }

    function topoSort(graph, indegree, size) {
        let queue = [];
        let res = [];

        for (let i = 0; i < size; i++) {
            if (indegree[i] === 0) queue.push(i);
        }

        while (queue.length) {
            let node = queue.shift();
            res.push(node);

            for (let nei of graph[node]) {
                indegree[nei]--;
                if (indegree[nei] === 0) {
                    queue.push(nei);
                }
            }
        }

        return res.length === size ? res : [];
    }

    let itemOrder = topoSort(itemGraph, itemIndegree, n);
    let groupOrder = topoSort(groupGraph, groupIndegree, m);

    if (itemOrder.length === 0 || groupOrder.length === 0) return [];

    // Step 4: group items
    let groupItems = new Map();
    for (let g of groupOrder) {
        groupItems.set(g, []);
    }

    for (let item of itemOrder) {
        groupItems.get(group[item]).push(item);
    }

    let result = [];
    for (let g of groupOrder) {
        result.push(...groupItems.get(g));
    }

    return result;
};