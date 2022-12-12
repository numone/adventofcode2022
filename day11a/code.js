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
                inspections: 0
            }
            monkeyData.push(currMonkey)
        }

        if(line.startsWith('Starting items')) {
            currMonkey.items = line.split(':')[1].split(',').map(item => parseInt(item.trim()))
        }

        if(line.startsWith('Operation')) {
            currMonkey.operation = line.split('=')[1].trim()
        }

        if(line.startsWith('Test')) {
            currMonkey.test = parseInt(line.split(' ').pop())
        }

        if(line.includes('If true')) {
            currMonkey.resultTrue = parseInt(line.split(' ').pop())
        }

        if(line.includes('If false')) {
            currMonkey.resultFalse = parseInt(line.split(' ').pop())
        }
    });

    return monkeyData
}

function doRounds(monkeyData, numberOfRounds) {
    for(let i=0;i<numberOfRounds;i++) {
        monkeyData.forEach(monkey => {
            const items = monkey.items
            monkey.items = []
            items.forEach(item => {
                monkey.inspections++
                const multipliedWorryLevel = eval(monkey.operation.replaceAll('old', item))
                const loweredWorryLevel = Math.floor(multipliedWorryLevel/3)
                const remainder = loweredWorryLevel % monkey.test
                if(remainder === 0) {
                    monkeyData[monkey.resultTrue].items.push(loweredWorryLevel)
                } else {
                    monkeyData[monkey.resultFalse].items.push(loweredWorryLevel)
                }
            });
        });
    }

    return monkeyData
}

function multiplyTwoHighestInspections(monkeyData) {
    const inspections = monkeyData.map(monkey => monkey.inspections)
    const sortedInspections = inspections.sort((a, b) => b - a)
    return sortedInspections[0] * sortedInspections[1]
}

const monkeyData = parseInput(constants.MY_INPUT)
const completedMonkeyData = doRounds(monkeyData, 20)

console.log(multiplyTwoHighestInspections(completedMonkeyData))