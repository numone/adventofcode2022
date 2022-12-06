import constants from './input.js'

function findFirstUniqueFourChars(input, length) {
    for(let i=0;i<input.length;i++) {
        const testUniqueArray = []
        for(let j=0;j<length;j++) {
            testUniqueArray.push(input[i+j])
        }
        
        if(testUniqueArray.filter((item, i, ar) => ar.indexOf(item) === i).length === length) {
            return i+length
        }
    }
}

console.log(findFirstUniqueFourChars(constants.MY_INPUT, 14))