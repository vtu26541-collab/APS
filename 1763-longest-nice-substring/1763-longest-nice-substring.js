var longestNiceSubstring = function(s) {
    if (s.length < 2) return "";

    let set = new Set(s);

    for (let i = 0; i < s.length; i++) {
        let ch = s[i];

        if (
            set.has(ch.toLowerCase()) &&
            set.has(ch.toUpperCase())
        ) continue;

        let left = longestNiceSubstring(s.slice(0, i));
        let right = longestNiceSubstring(s.slice(i + 1));

        return left.length >= right.length ? left : right;
    }

    return s;
};