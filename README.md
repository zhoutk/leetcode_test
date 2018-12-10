## description

A easy case test tool for leetcode. 

## install

npm i leetcode_test

## example

codes:

```
let test = require('leetcode_test').test

var twoSum = function(nums, target) {
    if (nums.length < 2)
        return null
    for (let i = 0; i < nums.length; i++) {
        let ele1 = nums[i]
        let ele2index  = nums.indexOf(target - ele1)
        if(ele2index > -1 && ele2index !== i)
            return [i, ele2index]
    }
    return null
};

let cases = [
    [[[2, 7, 11, 15], 91], [0, 1]],
    [[[2, 7, 11, 15], 9], [0, 1]],
]

test(twoSum, cases)
```

out:

```
test [1] fail, Input: [2,7,11,15], 91; Expected: [0,1]; Output: null
index.js:20
test [2] success, Input: [2,7,11,15], 9; Expected: [0,1]; Output: [0,1]
index.js:18
Result: test 2 cases, success: 1, fail: 1
index.js:28
running 4 ms
```