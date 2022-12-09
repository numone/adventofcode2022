import constants from './input.js'

function parseInput(input) {
    return input.split('\n').map(line => line.split(' '))
}

function doRopeMovements(ropeMotions) {
    let currHeadLocation = [0, 0]
    let currTailLocations = [
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0]
    ]
    const ropeLocations = {
        '0/0': 1
    }

    ropeMotions.forEach(ropeMotion => {
        if(ropeMotion[0] === 'U') {
            for(var i=0;i<ropeMotion[1];i++) {
                currHeadLocation = [currHeadLocation[0], currHeadLocation[1] + 1]
                for(var j=0;j<currTailLocations.length;j++) {
                    if(j === 0) {
                        currTailLocations[j] = moveTailIfNeeded(currTailLocations[j], currHeadLocation)
                    } else {
                        currTailLocations[j] = moveTailIfNeeded(currTailLocations[j], currTailLocations[j - 1])
                    }

                    if(j === currTailLocations.length - 1) {
                        if(!ropeLocations[`${currTailLocations[j][0]}/${currTailLocations[j][1]}`]) {
                            ropeLocations[`${currTailLocations[j][0]}/${currTailLocations[j][1]}`] = 1
                        }
                    }
                }
            }
        }else if(ropeMotion[0] === 'D') {
            for(var i=0;i<ropeMotion[1];i++) {
                currHeadLocation = [currHeadLocation[0], currHeadLocation[1] - 1]
                for(var j=0;j<currTailLocations.length;j++) {
                    if(j === 0) {
                        currTailLocations[j] = moveTailIfNeeded(currTailLocations[j], currHeadLocation)
                    } else {
                        currTailLocations[j] = moveTailIfNeeded(currTailLocations[j], currTailLocations[j - 1])
                    }

                    if(j === currTailLocations.length - 1) {
                        if(!ropeLocations[`${currTailLocations[j][0]}/${currTailLocations[j][1]}`]) {
                            ropeLocations[`${currTailLocations[j][0]}/${currTailLocations[j][1]}`] = 1
                        }
                    }
                }
            }
        }else if(ropeMotion[0] === 'L') {
            for(var i=0;i<ropeMotion[1];i++) {
                currHeadLocation = [currHeadLocation[0] - 1, currHeadLocation[1]]
                for(var j=0;j<currTailLocations.length;j++) {
                    if(j === 0) {
                        currTailLocations[j] = moveTailIfNeeded(currTailLocations[j], currHeadLocation)
                    } else {
                        currTailLocations[j] = moveTailIfNeeded(currTailLocations[j], currTailLocations[j - 1])
                    }

                    if(j === currTailLocations.length - 1) {
                        if(!ropeLocations[`${currTailLocations[j][0]}/${currTailLocations[j][1]}`]) {
                            ropeLocations[`${currTailLocations[j][0]}/${currTailLocations[j][1]}`] = 1
                        }
                    }
                }
            }
        }else if(ropeMotion[0] === 'R') {
            for(var i=0;i<ropeMotion[1];i++) {
                currHeadLocation = [currHeadLocation[0] + 1, currHeadLocation[1]]
                for(var j=0;j<currTailLocations.length;j++) {
                    if(j === 0) {
                        currTailLocations[j] = moveTailIfNeeded(currTailLocations[j], currHeadLocation)
                    } else {
                        currTailLocations[j] = moveTailIfNeeded(currTailLocations[j], currTailLocations[j - 1])
                    }

                    if(j === currTailLocations.length - 1) {
                        if(!ropeLocations[`${currTailLocations[j][0]}/${currTailLocations[j][1]}`]) {
                            ropeLocations[`${currTailLocations[j][0]}/${currTailLocations[j][1]}`] = 1
                        }
                    }
                }
            }
        }
    });

    return ropeLocations
}

function moveTailIfNeeded(tailLocation, headLocation) {
    if(isTailTouchingHead(tailLocation, headLocation)) {
        return tailLocation
    }

    // ok lets move the tail!
    if(headLocation[0] > tailLocation[0]) {
        tailLocation[0] = tailLocation[0] + 1
    }

    if(headLocation[0] < tailLocation[0]) {
        tailLocation[0] = tailLocation[0] - 1
    }

    if(headLocation[1] > tailLocation[1]) {
        tailLocation[1] = tailLocation[1] + 1
    }

    if(headLocation[1] < tailLocation[1]) {
        tailLocation[1] = tailLocation[1] - 1
    }

    return tailLocation
}

function isTailTouchingHead(tailLocation, headLocation) {
        // is same as tail
        if(tailLocation[0] === headLocation[0] && tailLocation[1] === headLocation[1]) {
            return true
        }
    
        // is above tail
        if(tailLocation[0] === headLocation[0] && tailLocation[1] + 1 === headLocation[1]) {
            return true
        }
    
        // is below tail
        if(tailLocation[0] === headLocation[0] && tailLocation[1] - 1 === headLocation[1]) {
            return true
        }
    
        // is left of tail
        if(tailLocation[0] - 1 === headLocation[0] && tailLocation[1] === headLocation[1]) {
            return true
        }
    
        // is right of tail
        if(tailLocation[0] + 1 === headLocation[0] && tailLocation[1] === headLocation[1]) {
            return true
        }
    
        // is top left
        if(tailLocation[0] - 1 === headLocation[0] && tailLocation[1] + 1 === headLocation[1]) {
            return true
        }
    
        // is top right
        if(tailLocation[0] + 1 === headLocation[0] && tailLocation[1] + 1 === headLocation[1]) {
            return true
        }
    
        // is bottom left
        if(tailLocation[0] - 1 === headLocation[0] && tailLocation[1] - 1 === headLocation[1]) {
            return true
        }
    
        // is bottom right
        if(tailLocation[0] + 1 === headLocation[0] && tailLocation[1] - 1 === headLocation[1]) {
            return true
        }

        return false
}

const ropeMotions = parseInput(constants.MY_INPUT)
const tailLocations = doRopeMovements(ropeMotions)

console.log(Object.entries(tailLocations).length)