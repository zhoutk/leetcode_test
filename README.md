## description

A easy case test tool for leetcode. 

## install

npm i leetcode_test

## example 1 (question 010)

codes:

```
let test = require('leetcode_test').test
/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function (s, p) {
    if (p.length === 0) {
        return s.length === 0
    }
    firstMath = s.length > 0 && 
                (p[0] === s[0] ||
                p[0] === '.')
    if (p.length >= 2 && p[1] === '*') {
        //the following two parts can't exchange their position
        return firstMath && isMatch(s.substring(1), p) || isMatch(s, p.substring(2))
    } else {
        return firstMath && isMatch(s.substring(1), p.substring(1))
    }
};
let cases = [              // [[[],''],],   //first params is empty array
    [['abbabaaaaaaacaa', 'a*.*b.a.*c*b*a*c*'], true],
    [['aaa', 'a*ac'], true],
    [['a', '..*'], true],
]
test(isMatch, cases)
```

out:

```
test [1] success, Input: ('abbabaaaaaaacaa','a*.*b.a.*c*b*a*c*'); Expected: true; Output: true
test [2] fail, Input: ('aaa','a*ac'); Expected: true; Output: false
test [3] success, Input: ('a','..*'); Expected: true; Output: true
Result: test 3 cases, success: 2, fail: 1
running 5 ms
```

## example 2 (question 015)

codes:

```
let test = require('leetcode_test').test
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
    nums = nums.sort((a,b) => a - b);
    const rs = [];
    let i = 0;
    while (i < nums.length) {
        let one = nums[i];
        let two = i + 1;                    //start from queue head
        let three = nums.length - 1;        //start from queue tail

        while (two < three) {
            let sum = one + nums[two] + nums[three];
            if (sum === 0) {
                rs.push([one,nums[two],nums[three]]);
                two++;
                three--;
                while (two < three && nums[two] === nums[two - 1]) {
                    two++;
                }
                while (two < three && nums[three] === nums[three + 1]) {
                    three--;
                }
            } else if (sum > 0) three--;
            else two++;
        }
        i++;
        while (i < nums.length && nums[i] === nums[i - 1]) i++;
    }
    return rs;
};
let cases = [               // [[[],''],],   //first params is empty array
    [[[]],[]],
    [[[1,-1,-1,0]],[-1,0,1]],
    [[[-1,0,1,0]],[[-1,0,1]]],
    [[[0,0,0,0]],[0,0,0]],
    [[[-1,2,-1]],[-1,-1,2]],
    [[[0,0,0]],[0,0,0]],
    [[[-1,0,1,2,-1,-4]],[[-1,-1,2],[-1,0,1]]],            //answer's sequence is not important
    [[[-1,0,1,2,-1,-4]],[[-1,0,1],[-1,-1,2]]],            //answer's sequence is not important
    [[[-4,-2,-2,-2,0,1,2,2,2,3,3,4,4,6,6]],[[-4,-2,6],[-4,0,4],[-4,1,3],[-4,2,2],[-2,-2,4],[-2,0,2]]],
    [[[-4,-2,1,-5,-4,-4,4,-2,0,4,0,-2,3,1,-5,0]],[[-5,1,4],[-4,0,4],[-4,1,3],[-2,-2,4],[-2,1,1],[0,0,0]]],
]
test(threeSum,cases)
```

> notice:

test 7 & 8, though answer's sequence is different, but judgement is right.

out:

```
test [1] success, Input: ([]); Expected: []; Output: []
test [2] success, Input: ([-1,-1,0,1]); Expected: [-1,0,1]; Output: [[-1,0,1]]
test [3] success, Input: ([-1,0,0,1]); Expected: [[-1,0,1]]; Output: [[-1,0,1]]
test [4] success, Input: ([0,0,0,0]); Expected: [0,0,0]; Output: [[0,0,0]]
test [5] success, Input: ([-1,-1,2]); Expected: [-1,-1,2]; Output: [[-1,-1,2]]
test [6] success, Input: ([0,0,0]); Expected: [0,0,0]; Output: [[0,0,0]]
test [7] success, Input: ([-4,-1,-1,0,1,2]); Expected: [[-1,-1,2],[-1,0,1]]; Output: [[-1,-1,2],[-1,0,1]]
test [8] success, Input: ([-4,-1,-1,0,1,2]); Expected: [[-1,-1,2],[-1,0,1]]; Output: [[-1,-1,2],[-1,0,1]]
test [9] success, Input: ([-4,-2,-2,-2,0,1,2,2,2,3,3,4,4,6,6]); Expected: [[-2,-2,4],[-2,0,2],[-4,-2,6],[-4,0,4],[-4,1,3],[-4,2,2]]; Output: [[-2,-2,4],[-2,0,2],[-4,-2,6],[-4,0,4],[-4,1,3],[-4,2,2]]
test [10] success, Input: ([-5,-5,-4,-4,-4,-2,-2,-2,0,0,0,1,1,3,4,4]); Expected: [[-2,-2,4],[-2,1,1],[-4,0,4],[-4,1,3],[-5,1,4],[0,0,0]]; Output: [[-2,-2,4],[-2,1,1],[-4,0,4],[-4,1,3],[-5,1,4],[0,0,0]]
Result: test 10 cases, success: 10, fail: 0
```