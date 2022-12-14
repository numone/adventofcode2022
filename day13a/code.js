function parseInput(input) {
    const lines = input.split('\n')
    const groupings = []

    for(let i=0;i<lines.length;i=i+3) {
        groupings.push([
            eval(lines[i]),
            eval(lines[i+1])
        ])
    }

    return groupings
}

function getIndiciesInRightOrder(signalData) {
    const indiciesInRightOrder = []

    signalData.forEach((data, idx) => {
        figureIfInRightOrder(data[0], data[1], idx)

    })

    function figureIfInRightOrder(firstPacket, secondPacket, idx) {
        if(typeof(firstPacket[0]) === 'number' && typeof(secondPacket[0]) === 'number') {
            if(firstPacket[0] < secondPacket[0]) {
                indiciesInRightOrder.push(idx)
                return true
            } else if(firstPacket[0] === secondPacket[0]) {
                let result = false
                while(!result && firstPacket.length > 1 && secondPacket.length > 1) {
                    firstPacket.shift()
                    secondPacket.shift()
                    result = figureIfInRightOrder(firstPacket, secondPacket, idx)
                }

                if(!result && firstPacket.length === 1 && secondPacket.length === 1) {
                    return false
                }

                if(!result && firstPacket.length === 1 && secondPacket.length > 1) {
                    indiciesInRightOrder.push(idx)
                    return true
                }

                if(secondPacket.length === 1 && firstPacket.length > 1) {
                    return true
                }
                return result
            } else {
                return true
            }
        } else if(typeof(firstPacket[0]) === 'object' && typeof(secondPacket[0]) === 'number') {
            let convertToArrayIdx = 0
            const arrayOfNums = []
            while(secondPacket.length > convertToArrayIdx && typeof(secondPacket[convertToArrayIdx]) === 'number') {
                arrayOfNums.push(secondPacket[convertToArrayIdx])
                convertToArrayIdx++
            }
            return figureIfInRightOrder(firstPacket[0], arrayOfNums, idx)
        } else if(typeof(firstPacket[0]) === 'number' && typeof(secondPacket[0]) === 'object') {
            let convertToArrayIdx = 0
            const arrayOfNums = []
            while(firstPacket.length > convertToArrayIdx && typeof(firstPacket[convertToArrayIdx]) === 'number') {
                arrayOfNums.push(firstPacket[convertToArrayIdx])
                convertToArrayIdx++
            }
            return figureIfInRightOrder(arrayOfNums, secondPacket[0], idx)
        } else if(typeof(firstPacket[0]) === 'object' && typeof(secondPacket[0]) === 'object') {
            let result = figureIfInRightOrder(firstPacket[0], secondPacket[0], idx)
            while(!result && firstPacket.length > 1 && secondPacket.length > 1) {
                if(firstPacket[0].length > 0 && secondPacket[0].length > 0) {
                    firstPacket[0].shift()
                    secondPacket[0].shift()
                } else {
                    firstPacket.shift()
                    secondPacket.shift()
                }

                result = figureIfInRightOrder(firstPacket, secondPacket, idx)
            }
            return result
        } else if(firstPacket.length === 0 && secondPacket.length > 0) {
            indiciesInRightOrder.push(idx)
            return true
        } else if(secondPacket.length === 0 && firstPacket.length > 0) {
            return true
        } else if(firstPacket.length === 0 && firstPacket.length === 0) {
            return false
        } else {
            console.error(`why am i here? firstPacket: ${firstPacket} secondPacket: ${secondPacket} idx: ${idx}`)
        }
    }

    return indiciesInRightOrder.filter((val, idx, arr) => arr.indexOf(val) === idx).map(val => val + 1)
}

function sumIndicies(indicies) {
    return indicies.reduce((sum, val) => sum + val, 0)
}

export default {
    parseInput,
    getIndiciesInRightOrder,
    sumIndicies
}