import constants from './input.js'

function parseInput(input) {
    return input.split('\n').map(line => line.split(' '))
}

function executeInstructions(instructions) {
    let cycle = 0
    let xval = 1
    const specialCycleValues = []

    instructions.forEach(inst => {
        if(inst[0] === 'noop') {
            cycle++
            if([20, 60, 100, 140, 180, 220].includes(cycle)) {
                specialCycleValues.push(xval * cycle)
            }
            return
        }

        cycle++
        if([20, 60, 100, 140, 180, 220].includes(cycle)) {
            specialCycleValues.push(xval * cycle)
        }
        cycle++
        if([20, 60, 100, 140, 180, 220].includes(cycle)) {
            specialCycleValues.push(xval * cycle)
        }
        xval = xval + parseInt(inst[1])
    });

    return specialCycleValues
}

const executionInstructions = parseInput(constants.MY_INPUT)
console.log(executeInstructions(executionInstructions).reduce((prev, curr) => prev + curr, 0))

