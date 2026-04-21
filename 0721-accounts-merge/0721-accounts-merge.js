var accountsMerge = function(accounts) {
    let parent = new Map();

    function find(x) {
        if (parent.get(x) !== x) {
            parent.set(x, find(parent.get(x)));
        }
        return parent.get(x);
    }

    function union(x, y) {
        parent.set(find(x), find(y));
    }

    let emailToName = new Map();

    // Step 1 & 2
    for (let acc of accounts) {
        let name = acc[0];

        for (let i = 1; i < acc.length; i++) {
            let email = acc[i];

            if (!parent.has(email)) {
                parent.set(email, email);
            }

            emailToName.set(email, name);

            if (i > 1) {
                union(acc[1], email);
            }
        }
    }

    // Step 3: group emails
    let groups = new Map();

    for (let email of parent.keys()) {
        let root = find(email);

        if (!groups.has(root)) {
            groups.set(root, []);
        }
        groups.get(root).push(email);
    }

    // Step 4: build result
    let result = [];

    for (let [root, emails] of groups) {
        emails.sort();
        result.push([emailToName.get(root), ...emails]);
    }

    return result;
};