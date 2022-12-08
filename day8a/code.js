import constants from './input.js'

function parseInput(input) {
    return input.split('\n').map(line => line.split(''))
}

function findVisibleTrees(treeMap) {
    const visibleTrees = []

    for(var i=0;i<treeMap.length;i++) {
        visibleTrees.push(...treeMap[i].filter(isTreeVisible, i))
    }

    function isTreeVisible(ele, idx, array) {
        // border trees are always visible
        if(this === 0 || idx === 0 || idx === array.length -1 || this === treeMap.length -1) {
            return true
        }

        let itterator
        let foundHigherTop = false
        let foundHigherLeft = false
        let foundHigherRight = false
        let foundHigherBottom = false

        // check to left
        itterator = idx - 1
        while(itterator >= 0) {
            if(treeMap[i][itterator] >= ele) {
                foundHigherLeft = true
                break
            }
            itterator--
        }

        // check to top
        itterator = i - 1
        while(itterator >= 0) {
            if(treeMap[itterator][idx] >= ele) {
                foundHigherTop = true
                break
            }
            itterator--
        }

        // check to right
        itterator = idx + 1
        while(itterator < treeMap[i].length) {
            if(treeMap[i][itterator] >= ele) {
                foundHigherRight = true
                break
            }
            itterator++
        }

        // check to bottom
        itterator = i + 1
        while(itterator < treeMap.length) {
            if(treeMap[itterator][idx] >= ele) {
                foundHigherBottom = true
                break
            }
            itterator++
        }

        if(foundHigherTop && foundHigherLeft && foundHigherRight && foundHigherBottom) {
            return false
        }

        return true
    }

    return visibleTrees
}

const treeMap = parseInput(constants.MY_INPUT)
const visibleTrees = findVisibleTrees(treeMap)

console.log(visibleTrees.length)