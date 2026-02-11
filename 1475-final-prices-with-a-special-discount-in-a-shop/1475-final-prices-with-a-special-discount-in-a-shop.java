import java.util.Stack;

class Solution {
    public int[] finalPrices(int[] prices) {
        Stack<Integer> stack = new Stack<>();
        int[] answer = prices.clone();

        for (int i = 0; i < prices.length; i++) {
            // Apply discount to previous items
            while (!stack.isEmpty() && prices[stack.peek()] >= prices[i]) {
                int idx = stack.pop();
                answer[idx] -= prices[i];
            }
            stack.push(i);
        }

        return answer;
    }
}
