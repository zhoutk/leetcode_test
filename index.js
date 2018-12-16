let color = require('cli-color')

exports.test = (fn, cases) => {
    let testFn = fn
    let start = Date.now()
    let success = 0, index = 1
    for(let al of cases) {
        let out = testFn.apply(null, al[0])
        let sort = al[2] === undefined ? true : al[2]
        if (checkAnswer(out, al[1], sort)) {
            success++
            console.log(color.green(`test [${index}] success, Input: (${strFormat(al[0])}); Expected: ${Array.isArray(al[1]) ? `[${strFormat(al[1])}]` : strFormat(al[1])}; Output: ${Array.isArray(out) ? `[${strFormat(out)}]` : strFormat(out)}`))
        } else {
            console.log(color.red(`test [${index}] failure, Input: (${strFormat(al[0])}); Expected: ${Array.isArray(al[1]) ? `[${strFormat(al[1])}]` : strFormat(al[1])}; Output: ${Array.isArray(out) ? `[${strFormat(out)}]` : strFormat(out)}`))
        }
        index++
    }
    let testResult = `Result: test ${cases.length} cases, success: ${success}, failure: ${cases.length - success}`
    if(cases.length == success)
        console.log(color.bgGreen(testResult))
    else
        console.log(color.bgRed(testResult))
    console.log(`running ${Date.now() - start} ms`)
}

function checkAnswer(out, ans, sort = true) {
    if( out == null && ans == null) {
        return true
    } else if (out != null && ans !== null) {
        if (Array.isArray(out) && Array.isArray(ans)) {
            if(out.length !== ans.length)
                return false
            else {
                if (sort) {
                    out.sort()
                    ans.sort()
                }
                return out.toString() === ans.toString()
            }
        } else if (!Array.isArray(out) && !Array.isArray(ans)) {
            return out.toString() === ans.toString()
        } else 
            return false
    } else 
        return false
}

function strFormat(params) {
    let paramStr = ''
    if (Array.isArray(params)) {
        params.forEach((al) => {
            if(Array.isArray(al)) {
                paramStr += (paramStr.length > 0 ? ',' : '') + `[${al}]`
            } else
                paramStr += (paramStr.length > 0 ? ',' : '') + strFormat(al)
        })
    } else if (typeof params === 'number') {
        paramStr = params && params.toString()
    } else if (typeof params === 'string') {
        paramStr = `'${params}'`
    } else {
        paramStr = params && params.toString()
    }
    return paramStr
}

