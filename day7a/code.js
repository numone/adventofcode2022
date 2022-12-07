import constants from './input.js'

function parseInput(input) {
    const lines = input.split('\n')
    const treeStructure = {
        'children': []
    }
    let currSpot = treeStructure

    lines.forEach(commandOrOutput => {
        if(commandOrOutput.startsWith('$ cd') && commandOrOutput !== '$ cd ..') {
            const itemToAdd = {}
            const parts = commandOrOutput.split(' ')
            itemToAdd.name = parts.pop()
            itemToAdd.size = 0
            itemToAdd.children = []
            itemToAdd.parent = currSpot
            currSpot.children.push(itemToAdd)
            currSpot = itemToAdd
        } else if(commandOrOutput === '$ cd ..') {
            currSpot = currSpot.parent
        } else if(commandOrOutput === '$ ls') {
            return
        } else if(commandOrOutput.startsWith('dir')) {
            return
        } else {
            // file
            const parts = commandOrOutput.split(' ')
            const itemToAdd = {}
            itemToAdd.size = parts[0]
            itemToAdd.name = parts[1]
            currSpot.children.push(itemToAdd)
        }
    });

    return treeStructure
}

function removeParentsKey(dirStruct) {
    if(dirStruct.children && dirStruct.children.length > 0) {
        dirStruct.children.forEach(child => {
            removeParentsKey(child)
        })
    }

    if(dirStruct.parent) {
        delete dirStruct.parent
    }

    return dirStruct
}

function addSizeCounts(dirStruct) {
    let size = 0

    if(dirStruct.children && dirStruct.children.length > 0) {
        dirStruct.children.forEach(child => {
            if(child.children) {
                addSizeCounts(child)
            }
            size += parseInt(child.size)
        })
        dirStruct.size = size
    }

    return dirStruct
}

function findDirsLessThan(dirStruct, size) {
    const theDirs = []

    function addDirs(currSpot) {
        if(currSpot.children && currSpot.children.length > 0) {
            currSpot.children.forEach(child => {
                if(child.children) {
                    addDirs(child)

                    if(child.size <= size) {
                        theDirs.push(child.size)
                    }
                }
            })
        }
    }

    addDirs(dirStruct)
    return theDirs
}

const initialDirStructure = parseInput(constants.MY_INPUT)
const dirStructureWithoutParents = removeParentsKey(initialDirStructure)
const dirStructureWithSizeCounts = addSizeCounts(dirStructureWithoutParents)
const dirSizes = findDirsLessThan(dirStructureWithSizeCounts, 100000)
console.log(dirSizes.reduce((count, curr) => count + curr))