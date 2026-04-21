var combine = function(n, k) {
    let result = [];

    function backtrack(start, path) {
        if (path.length === k) {
            result.push([...path]);
            return;
        }

        for (let i = start; i <= n; i++) {
            path.push(i);
            backtrack(i + 1, path);
            path.pop(); // undo
        }
    }

    backtrack(1, []);
    return result;
};