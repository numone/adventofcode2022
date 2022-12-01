import constants from './input.js'

function parseInput(input) {
    const lines = input.split('\n')
    let elfGroupings = []

    let lineIndex = 0;
    let currentElfCount = 0
    while(lineIndex < lines.length) {
        if(lines[lineIndex] === "") {
            lineIndex++
            elfGroupings.push(currentElfCount)
            currentElfCount = 0 
            continue
        }

        currentElfCount = currentElfCount + parseInt(lines[lineIndex])

        lineIndex++
    }

    elfGroupings.push(currentElfCount)

    return elfGroupings
}

const elfCalorieCounts = parseInput(constants.MY_INPUT)

console.log(elfCalorieCounts.sort(function(a, b){return b-a})[0])