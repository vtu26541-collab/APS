class Solution {
    public String minRemoveToMakeValid(String s) {
        Set<Integer> indicesToRemove = new HashSet<>();
        Deque<Integer> stack = new ArrayDeque<>();
        
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (c == '(') {
                stack.push(i);
            } else if (c == ')') {
                if (stack.isEmpty()) {
                    indicesToRemove.add(i); // Unmatched ')'
                } else {
                    stack.pop(); // Matched!
                }
            }
        }
        
        // Anything left in stack is an unmatched '('
        while (!stack.isEmpty()) {
            indicesToRemove.add(stack.pop());
        }
        
        StringBuilder result = new StringBuilder();
        for (int i = 0; i < s.length(); i++) {
            if (!indicesToRemove.contains(i)) {
                result.append(s.charAt(i));
            }
        }
        
        return result.toString();
    }
}