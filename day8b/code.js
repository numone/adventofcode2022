import constants from './input.js'

function parseInput(input) {
    return input.split('\n').map(line => line.split(''))
}

function getTreeVisibilities(treeMap) {
    const treeVisibilities = []

    for(var i=0;i<treeMap.length;i++) {
        treeVisibilities.push(...treeMap[i].map(calculateTreeVisibility))
    }

    function calculateTreeVisibility(ele, idx, array) {
        // border trees are always 0
        if(i === 0 || idx === 0 || idx === array.length -1 || i === treeMap.length -1) {
            return 0
        }

        let itterator, distanceTop = 0, distanceLeft = 0, distanceRight = 0, distanceBottom = 0
        // calculate distance left
        itterator = idx - 1
        while(itterator >= 0) {
            if(treeMap[i][itterator] >= ele || itterator === 0) {
                distanceLeft = idx - itterator
                break
            }
            itterator--
        }

        // calculate distane top
        itterator = i - 1
        while(itterator >= 0) {
            if(treeMap[itterator][idx] >= ele || itterator === 0) {
                distanceTop = i - itterator
                break
            }
            itterator--
        }

        // calculate distance right
        itterator = idx + 1
        while(itterator < treeMap[i].length) {
            if(treeMap[i][itterator] >= ele || itterator === treeMap[i].length - 1) {
                distanceRight = itterator - idx
                break
            }
            itterator++
        }

        // calclulate distance bottom
        itterator = i + 1
        while(itterator < treeMap.length) {
            if(treeMap[itterator][idx] >= ele || itterator === treeMap.length - 1) {
                distanceBottom = itterator - i
                break
            }
            itterator++
        }

        // console.log(`Total: ${distanceTop * distanceBottom * distanceLeft * distanceRight} Top: ${distanceTop} Left: ${distanceLeft} Right: ${distanceRight} Bottom: ${distanceBottom} i: ${i} idx: ${idx}`)
        return distanceTop * distanceBottom * distanceLeft * distanceRight
    }

    return treeVisibilities
}

const treeMap = parseInput(constants.MY_INPUT)
const treeVisibilities = getTreeVisibilities(treeMap)
console.log(treeVisibilities.sort((a, b) => b - a)[0])