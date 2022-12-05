import constants from './input.js'

function parseInput(input) {
    const lines = input.split('\n')
    const stacks = []
    const directions = []
    
    lines.filter(line => line.indexOf('[') >= 0).forEach(line => {
        const stacksRow = []
        while(line.indexOf('[') >= 0) {
            const block = line.substring(0, 4)
            line = line.substring(4)
            stacksRow.push(block.replace('[', '').replace(']', '').trim())
        }
        stacks.push(stacksRow)
    });

    const rotatedStacks = rotateStack(stacks)

    lines.filter(line => line.indexOf('move') >= 0).forEach(line => {
        const parts = line.match(/\d+/g)
        directions.push(parts.map(numAsString => parseInt(numAsString)))
    });

    return {
        rotatedStacks,
        directions
    }
}

function rotateStack(stacks) {
    const rotatedStacks = []

    for (let i = stacks[stacks.length - 1].length - 1; i >= 0; i--) {
        const rotatedStackRow = []
        for (let j = 0; j < stacks.length; j++) {
            if (stacks[j][i] && stacks[j][i] !== '') {
                rotatedStackRow.push(stacks[j][i])
            }
        }
        rotatedStacks.push(rotatedStackRow)
    }
    return rotatedStacks.reverse()
}

function executeMove(stacksAndDirections) {
    let rotatedStacks = stacksAndDirections.rotatedStacks
    stacksAndDirections.directions.forEach(direction => {
        const toMove = rotatedStacks[direction[1] - 1].splice(0, direction[0])
        rotatedStacks[direction[2] - 1].unshift(...toMove)
    });

    return rotatedStacks
}

function grabTopOfStacks(movedStacks) {
    return movedStacks.reduce((letters, currentStack) => letters + currentStack[0], '')
}

const stacksAndDirections = parseInput(constants.MY_INPUT)
const movedStacks = executeMove(stacksAndDirections)
console.log(grabTopOfStacks(movedStacks))