import constants from './input.js'

function parseInput(input) {
    const monkeyData = []
    let currMonkey
    const lines = input.split('\n')

    lines.forEach(line => {
        if(line === '') {
            return
        }

        if(line.startsWith('Monkey')) {
            currMonkey = {
                inspections: BigInt(0)
            }
            monkeyData.push(currMonkey)
        }

        if(line.startsWith('Starting items')) {
            currMonkey.items = line.split(':')[1].split(',').map(item => BigInt(item.trim()))
        }

        if(line.startsWith('Operation')) {
            currMonkey.operation = line.split('=')[1].trim()
        }

        if(line.startsWith('Test')) {
            currMonkey.test = BigInt(line.split(' ').pop())
        }

        if(line.includes('If true')) {
            currMonkey.resultTrue = BigInt(line.split(' ').pop())
        }

        if(line.includes('If false')) {
            currMonkey.resultFalse = BigInt(line.split(' ').pop())
        }
    });

    return monkeyData
}

function findLeastCommonMultiple(monkeyData) {
    let lcm = 1
    let primeNumbersIdx = 0
    let numbers = monkeyData.map(monkey => parseInt(monkey.test))

    while(!numbers.every(val => val === 1)) {
        if(numbers.some(val => val % constants.PRIME_NUMBERS[primeNumbersIdx] === 0)) {
            lcm = lcm * constants.PRIME_NUMBERS[primeNumbersIdx]
            numbers = numbers.map(val => (val % constants.PRIME_NUMBERS[primeNumbersIdx] === 0 ? val / constants.PRIME_NUMBERS[primeNumbersIdx] : val))
        } else {
            primeNumbersIdx++
        }
    }

    return BigInt(lcm)
}

function doRounds(monkeyData, numberOfRounds, leastCommonMultiple) {
    for(let i=0;i<numberOfRounds;i++) {
        monkeyData.forEach(monkey => {
            const items = monkey.items
            monkey.items = []
            items.forEach(item => {
                monkey.inspections = monkey.inspections + 1n
                let newWorriedLevel
                const opsParts = monkey.operation.split(' ')
                if(monkey.operation === 'old * old') {
                    newWorriedLevel = item * item
                } else if(opsParts[1] === '*') {
                    newWorriedLevel = item * BigInt(opsParts[2])
                } else {
                    newWorriedLevel = item + BigInt(opsParts[2])
                }

                newWorriedLevel = newWorriedLevel % leastCommonMultiple
                if(newWorriedLevel % monkey.test === 0n) {
                    monkeyData[monkey.resultTrue].items.push(newWorriedLevel)
                } else {
                    monkeyData[monkey.resultFalse].items.push(newWorriedLevel)
                }
            });
        });
    }

    return monkeyData
}

function multiplyTwoHighestInspections(monkeyData) {
    const inspections = monkeyData.map(monkey => monkey.inspections)
    const sortedInspections = inspections.sort((a, b) => (a < b) ? -1 : ((a > b) ? 1 : 0))
    return sortedInspections[sortedInspections.length - 1] * sortedInspections[sortedInspections.length - 2]
}

const monkeyData = parseInput(constants.MY_INPUT)
const leastCommonMultiple = findLeastCommonMultiple(monkeyData)
const completedMonkeyData = doRounds(monkeyData, 10000, leastCommonMultiple)
console.log(parseInt(multiplyTwoHighestInspections(completedMonkeyData)))