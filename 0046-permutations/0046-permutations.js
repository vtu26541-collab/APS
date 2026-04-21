var permute = function(nums) {
    let result = [];
    let used = new Array(nums.length).fill(false);

    function backtrack(path) {
        if (path.length === nums.length) {
            result.push([...path]);
            return;
        }

        for (let i = 0; i < nums.length; i++) {
            if (used[i]) continue;

            used[i] = true;
            path.push(nums[i]);

            backtrack(path);

            path.pop();        // undo
            used[i] = false;
        }
    }

    backtrack([]);
    return result;
};