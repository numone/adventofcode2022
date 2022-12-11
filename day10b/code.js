import constants from './input.js'

function parseInput(input) {
    return input.split('\n').map(line => line.split(' '))
}

function executeInstructions(instructions) {
    let cycle = 0
    let xval = 1
    const outputDisplay = []

    instructions.forEach(inst => {
        if(inst[0] === 'noop') {
            processCycle(inst)
            checkMatch()
            return
        }

        processCycle(inst)
        checkMatch()
        processCycle(inst)
        checkMatch()
        xval = xval + parseInt(inst[1])
    });

    function processCycle(inst) {
        cycle++
        if(cycle >= 40) {
            cycle = cycle - 40
        }
    }

    function checkMatch() {
        if([xval, xval + 1, xval + 2].includes(cycle)) {
            outputDisplay.push('#')
        } else {
            outputDisplay.push('.')
        }
    }

    return outputDisplay
}

function chunckArray(array, chunckSize) {
    const result = []

    for(var i=0;i<array.length;i=i+chunckSize) {
        result.push(array.slice(i, i+chunckSize))
    }

    return result
}

function printResults(results) {
    let toPrint = ''

    results.forEach(result => {
        toPrint = toPrint + result.join('') + '\n'
    });

    console.log(toPrint)
}

const executionInstructions = parseInput(constants.MY_INPUT)
const instructionResults = executeInstructions(executionInstructions)
const resultArrays = chunckArray(instructionResults, 40)
printResults(resultArrays)

