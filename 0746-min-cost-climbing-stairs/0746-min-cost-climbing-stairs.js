var minCostClimbingStairs = function(cost) {
    let prev2 = 0; // dp[i-2]
    let prev1 = 0; // dp[i-1]

    for (let c of cost) {
        let curr = Math.min(prev1, prev2) + c;
        prev2 = prev1;
        prev1 = curr;
    }

    return Math.min(prev1, prev2);
};