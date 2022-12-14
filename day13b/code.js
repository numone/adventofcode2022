function parseInput(input) {
    const lines = input.split('\n')
    const groupings = []

    for(let i=0;i<lines.length;i++) {
        if(lines[i] === '') {
            continue
        }
        groupings.push(JSON.parse(lines[i]))
    }

    groupings.push([[2]])
    groupings.push([[6]])

    return groupings
}

function getIndiciesInRightOrder(signalData) {

    signalData.sort((a, b) => figureIfInRightOrder([...a], [...b]) ? -1 : 1)


    function figureIfInRightOrder(firstPacket, secondPacket) {
        firstPacket = JSON.parse(JSON.stringify(firstPacket))
        secondPacket = JSON.parse(JSON.stringify(secondPacket))
        if(typeof(firstPacket[0]) === 'number' && typeof(secondPacket[0]) === 'number') {
            if(firstPacket[0] < secondPacket[0]) {
                return true
            } else if(firstPacket[0] === secondPacket[0]) {
                let result = false
                let newFirstPacket = [...firstPacket]
                let newSecondPacket = [...secondPacket]
                while(!result && newFirstPacket.length > 1 && newSecondPacket.length > 1) {
                    newFirstPacket.shift()
                    newSecondPacket.shift()
                    result = figureIfInRightOrder(newFirstPacket, newSecondPacket)
                }

                if(!result && firstPacket.length === 1 && secondPacket.length === 1) {
                    return false
                }

                if(!result && firstPacket.length === 1 && secondPacket.length > 1) {
                    return true
                }

                if(secondPacket.length === 1 && firstPacket.length > 1) {
                    return false
                }
                return result
            } else {
                return false
            }
        } else if(typeof(firstPacket[0]) === 'object' && typeof(secondPacket[0]) === 'number') {
            let convertToArrayIdx = 0
            const arrayOfNums = []
            while(secondPacket.length > convertToArrayIdx && typeof(secondPacket[convertToArrayIdx]) === 'number') {
                arrayOfNums.push(secondPacket[convertToArrayIdx])
                convertToArrayIdx++
            }
            return figureIfInRightOrder(firstPacket[0], arrayOfNums)
        } else if(typeof(firstPacket[0]) === 'number' && typeof(secondPacket[0]) === 'object') {
            let convertToArrayIdx = 0
            const arrayOfNums = []
            while(firstPacket.length > convertToArrayIdx && typeof(firstPacket[convertToArrayIdx]) === 'number') {
                arrayOfNums.push(firstPacket[convertToArrayIdx])
                convertToArrayIdx++
            }
            return figureIfInRightOrder(arrayOfNums, secondPacket[0])
        } else if(typeof(firstPacket[0]) === 'object' && typeof(secondPacket[0]) === 'object') {
            let result = figureIfInRightOrder(firstPacket[0], secondPacket[0])
            let newFirstPacket = [...firstPacket]
            let newSecondPacket = [...secondPacket]
            while(!result && newFirstPacket.length > 1 && newSecondPacket.length > 1) {
                if(newFirstPacket[0].length > 0 && newSecondPacket[0].length > 0) {
                    newFirstPacket[0].shift()
                    newSecondPacket[0].shift()
                } else {
                    newFirstPacket.shift()
                    newSecondPacket.shift()
                }

                result = figureIfInRightOrder(newFirstPacket, newSecondPacket)
            }
            return result
        } else if(firstPacket.length === 0 && secondPacket.length > 0) {
            return true
        } else if(secondPacket.length === 0 && firstPacket.length > 0) {
            return false
        } else if(firstPacket.length === 0 && firstPacket.length === 0) {
            return false
        } else {
            console.error(`why am i here? firstPacket: ${firstPacket} secondPacket: ${secondPacket}`)
        }
    }

    return signalData
}

function productSixAndTwoIndicies(indicies) {
    return indicies.reduce((product, val, idx) => (JSON.stringify(val) === '[[2]]' || JSON.stringify(val) === '[[6]]') ? product * (idx + 1) : product, 1)
}

export default {
    parseInput,
    getIndiciesInRightOrder,
    productSixAndTwoIndicies
}