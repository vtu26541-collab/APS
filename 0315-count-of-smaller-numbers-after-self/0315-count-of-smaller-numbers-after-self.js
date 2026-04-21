var countSmaller = function(nums) {
    let n = nums.length;
    let result = new Array(n).fill(0);

    let arr = nums.map((val, idx) => [val, idx]);

    function mergeSort(start, end) {
        if (end - start <= 1) return;

        let mid = Math.floor((start + end) / 2);
        mergeSort(start, mid);
        mergeSort(mid, end);

        let temp = [];
        let i = start, j = mid;
        let rightCount = 0;

        while (i < mid && j < end) {
            if (arr[j][0] < arr[i][0]) {
                temp.push(arr[j]);
                rightCount++;
                j++;
            } else {
                result[arr[i][1]] += rightCount;
                temp.push(arr[i]);
                i++;
            }
        }

        while (i < mid) {
            result[arr[i][1]] += rightCount;
            temp.push(arr[i]);
            i++;
        }

        while (j < end) {
            temp.push(arr[j]);
            j++;
        }

        for (let k = start; k < end; k++) {
            arr[k] = temp[k - start];
        }
    }

    mergeSort(0, n);
    return result;
};