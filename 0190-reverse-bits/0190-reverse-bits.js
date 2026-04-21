var reverseBits = function(n) {
    let result = 0;

    for (let i = 0; i < 32; i++) {
        result <<= 1;           // shift result left
        result |= (n & 1);      // add last bit of n
        n >>>= 1;               // unsigned right shift
    }

    return result >>> 0; // ensure unsigned result
};