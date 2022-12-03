import constants from './input.js'

function parseInput(input) {
    const lines = input.split('\n')
    const items = []
    
    lines.forEach(line => {
        const lineHalfPoint = Math.ceil(line.length / 2);
        items.push([line.slice(0, lineHalfPoint), line.slice(lineHalfPoint)])
    });

    return items
}

function findDuplicateItems(itemsList) {
    const duplicateItems = []

    itemsList.forEach(items => {
        const firstItem = items[0]
        const secondItem = items[1]

        loop1:
            for(let i=0;i<firstItem.length;i++) {
                for(let j=0;j<secondItem.length;j++) {
                    if(firstItem[i] === secondItem[j]) {
                        duplicateItems.push(firstItem[i])
                        break loop1
                    }
                }
            }
    });

    return duplicateItems
}

function calculatePriotiryOfDuplicateItems(duplicateItems) {
    return duplicateItems.reduce((currentPriorityLevel, duplicateItem) => currentPriorityLevel + constants.PRIORITIES[duplicateItem], 0)
}

const rucksackItemsList = parseInput(constants.MY_INPUT)
const duplicateItems = findDuplicateItems(rucksackItemsList)

console.log(calculatePriotiryOfDuplicateItems(duplicateItems))