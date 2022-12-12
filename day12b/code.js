import constants from './input.js'

function parseInput(input) {
    return input.split('\n').map(line => line.split(''))
}

function findEndLocation(mapData) {
    for(var i=0;i<mapData.length;i++) {
        if(mapData[i].includes('E')) {
            return [i, mapData[i].indexOf('E')]
        }
    }
}

function findALocations(mapData) {
    const aLocations = []

    for(var i=0;i<mapData.length;i++) {
        if(mapData[i].includes('a')) {
            for(var j=0;j<mapData[i].length;j++) {
                if(mapData[i][j] === 'a') {
                    aLocations.push([i, j])
                }
            }
        }
    }

    return aLocations
}

function goToEnd(mapData, currentSpot) {
    if(!currentSpot) {
        currentSpot = findStartingSpot(mapData)
    }
    const visitedMap = mapData.map(row => row.map(() => Number.MAX_VALUE))
    visitedMap[currentSpot[0]][currentSpot[1]] = 0
    let timesThrough = 0
    const maxTimes = visitedMap.length * 5 // * visitedMap[0].length

    while(timesThrough < maxTimes) {
        for(var i=0;i<visitedMap.length;i++) {
            for(var j=0;j<visitedMap[i].length;j++) {
                const currentLetterIndex = constants.ALPHABET.indexOf(mapData[i][j])

                if(visitedMap[i][j] === Number.MAX_VALUE) {
                    continue
                }

                // fill in nonvisited values
                // up
                if(i > 0 && containsCurrentOrNextLetter(currentLetterIndex, mapData[i - 1][j])) {
                    visitedMap[i - 1][j] = Math.min(visitedMap[i][j] + 1, visitedMap[i - 1][j])
                }
                // down
                if(i < visitedMap.length - 1 && containsCurrentOrNextLetter(currentLetterIndex, mapData[i + 1][j])) {
                    visitedMap[i + 1][j] = Math.min(visitedMap[i][j] + 1, visitedMap[i + 1][j])
                }
                // left
                if(j > 0 && containsCurrentOrNextLetter(currentLetterIndex, mapData[i][j - 1])) {
                    visitedMap[i][j - 1] = Math.min(visitedMap[i][j] + 1, visitedMap[i][j - 1])
                }
                // right
                if(j < visitedMap[i].length - 1 && containsCurrentOrNextLetter(currentLetterIndex, mapData[i][j + 1])) {
                    visitedMap[i][j + 1] = Math.min(visitedMap[i][j] + 1, visitedMap[i][j + 1])
                }
            }
        }
        timesThrough++
    }

    return visitedMap
}

function containsCurrentOrNextLetter(currentLetterIndex, currentLetter) {
    const checkLetters = [...constants.ALPHABET.slice(0, currentLetterIndex + 1)]
    if(currentLetterIndex !== constants.ALPHABET.length - 1) {
        checkLetters.push(constants.ALPHABET[currentLetterIndex + 1])
    }
    return checkLetters.includes(currentLetter)
}

function findStartingSpot(mapData) {
    for(let i=0;i<mapData.length;i++) {
        if(mapData[i].includes('S')) {
            return [i, mapData[i].indexOf('S')]
        }
    }
}

function goToEndFromAs(aLocations, mapData) {
    const maps = []
    const oldStartingSpot = findStartingSpot(mapData)

    mapData[oldStartingSpot[0]][oldStartingSpot[1]] = 'a'

    for(var i=0;i<aLocations.length;i++) {
        const curALocation = aLocations[i]
        maps.push(goToEnd(mapData, curALocation))
    }

    return maps
}

function findShortestDistance(mapFromS, mapsFromA, endLocation) {
    const distances = mapsFromA.map(curMap => curMap[endLocation[0]][endLocation[1]])
    distances.push(mapFromS[endLocation[0]][endLocation[1]])

    return distances.sort((a, b) => a - b)[0]
}

const mapData = parseInput(constants.MY_INPUT)
const endLocation = findEndLocation(mapData)
const locationFromS = goToEnd(mapData)
const aLocations = findALocations(mapData)
const mapsFromAs = goToEndFromAs(aLocations, mapData)
console.log(findShortestDistance(locationFromS, mapsFromAs, endLocation))
