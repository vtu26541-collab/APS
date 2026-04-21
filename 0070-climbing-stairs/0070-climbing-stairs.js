var climbStairs = function(n) {
    if (n <= 2) return n;

    let prev2 = 1; // dp[1]
    let prev1 = 2; // dp[2]

    for (let i = 3; i <= n; i++) {
        let curr = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
    }

    return prev1;
};