var subsets = function(nums) {
    let result = [];

    function backtrack(start, path) {
        result.push([...path]);

        for (let i = start; i < nums.length; i++) {
            path.push(nums[i]);              // choose
            backtrack(i + 1, path);         // explore
            path.pop();                     // undo
        }
    }

    backtrack(0, []);
    return result;
};