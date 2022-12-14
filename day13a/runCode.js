import constants from './input.js'
import code from './code.js'

const parsedOutOfOrderDistressSignal = code.parseInput(constants.MY_INPUT)
const indiciesInRightOrder = code.getIndiciesInRightOrder(parsedOutOfOrderDistressSignal)

console.log(indiciesInRightOrder)
console.log(code.sumIndicies(indiciesInRightOrder))