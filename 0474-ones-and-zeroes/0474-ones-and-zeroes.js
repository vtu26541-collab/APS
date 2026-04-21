var findMaxForm = function(strs, m, n) {
    let dp = new Array(m + 1)
        .fill(0)
        .map(() => new Array(n + 1).fill(0));

    for (let str of strs) {
        let zeros = 0, ones = 0;

        for (let ch of str) {
            if (ch === '0') zeros++;
            else ones++;
        }

        // Traverse backwards
        for (let i = m; i >= zeros; i--) {
            for (let j = n; j >= ones; j--) {
                dp[i][j] = Math.max(
                    dp[i][j],
                    dp[i - zeros][j - ones] + 1
                );
            }
        }
    }

    return dp[m][n];
};