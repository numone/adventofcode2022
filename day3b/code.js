import constants from './input.js'

function parseInput(input) {
    const lines = input.split('\n')
    const groupRucksacks = []
    
    for(let i=0;i<lines.length;i+=3) {
        groupRucksacks.push(lines.slice(i, i + 3))
    }

    return groupRucksacks
}

function findDuplicateItems(groupsOfRucksacks) {
    const duplicateItems = []

    groupsOfRucksacks.forEach(items => {
        const firstItem = items[0]
        const secondItem = items[1]
        const thirdItem = items[2]

        loop1:
            for(let i=0;i<firstItem.length;i++) {
                for(let j=0;j<secondItem.length;j++) {
                    for(let k=0;k<thirdItem.length;k++) {
                        if(firstItem[i] === secondItem[j] && firstItem[i] === thirdItem[k]) {
                            duplicateItems.push(firstItem[i])
                            break loop1
                        }
                    }
                }
            }
    });

    return duplicateItems
}

function calculatePriotiryOfDuplicateItems(duplicateItems) {
    return duplicateItems.reduce((currentPriorityLevel, duplicateItem) => currentPriorityLevel + constants.PRIORITIES[duplicateItem], 0)
}

const groupsOfRucksacks = parseInput(constants.MY_INPUT)
const duplicateItems = findDuplicateItems(groupsOfRucksacks)

console.log(calculatePriotiryOfDuplicateItems(duplicateItems))