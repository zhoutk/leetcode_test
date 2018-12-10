let test = require('./index').test

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