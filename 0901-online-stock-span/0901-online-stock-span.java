import java.util.Stack;

class StockSpanner {

    // Stack to store pairs of (price, span)
    private Stack<int[]> stack;

    public StockSpanner() {
        stack = new Stack<>();
    }

    public int next(int price) {
        int span = 1;

        // Pop elements while stack top price <= current price
        while (!stack.isEmpty() && stack.peek()[0] <= price) {
            span += stack.peek()[1];
            stack.pop();
        }

        // Push current price and its span
        stack.push(new int[]{price, span});

        return span;
    }
}

