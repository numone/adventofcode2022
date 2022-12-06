import constants from './input.js'

function findFirstUniqueChars(input, length) {
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

console.log(findFirstUniqueChars(constants.MY_INPUT, 4))