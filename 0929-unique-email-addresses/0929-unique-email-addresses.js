var numUniqueEmails = function(emails) {
    let set = new Set();

    for (let email of emails) {
        let [local, domain] = email.split('@');

        // Remove everything after '+'
        local = local.split('+')[0];

        // Remove dots
        local = local.replace(/\./g, '');

        set.add(local + '@' + domain);
    }

    return set.size;
};