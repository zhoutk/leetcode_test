let color = require('cli-color')

exports.test = (fn, cases) => {
    let testFn = fn
    let start = Date.now()
    let success = 0, index = 1
    for(let al of cases) {
        let out = testFn.apply(null, al[0])
        let paramStr = ''
        for (let ele of al[0]) {
            if (paramStr.length > 0) {
                paramStr += ', '
            }
            paramStr += strFormat(ele)
        }
        if (out == null && al[1] == null || out != null && al[1] != null && out.toString() === al[1].toString()) {
            success++
            console.log(color.green(`test [${index}] success, Input: ${paramStr}; Expected: ${strFormat(al[1])}; Output: ${strFormat(out)}`))
        } else {
            console.log(color.red(`test [${index}] fail, Input: ${paramStr}; Expected: ${strFormat(al[1])}; Output: ${strFormat(out)}`))
        }
        index++
    }
    let testResult = `Result: test ${cases.length} cases, success: ${success}, fail: ${cases.length - success}`
    if(cases.length == success)
        console.log(color.bgGreen(testResult))
    else
        console.log(color.bgRed(testResult))
    console.log(`running ${Date.now() - start} ms`)
}

function strFormat(params) {
    let paramStr = ''
    if (Array.isArray(params)) {
        paramStr = `[${params}]`
    } else if (typeof params === 'number') {
        paramStr = params && params.toString()
    } else if (typeof params === 'string') {
        paramStr = `'${params}'`
    } else {
        paramStr = params && params.toString()
    }
    return paramStr
}

