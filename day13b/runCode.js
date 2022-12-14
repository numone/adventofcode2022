import constants from './input.js'
import code from './code.js'

const parsedOutOfOrderDistressSignal = code.parseInput(constants.MY_INPUT)
const indiciesInRightOrder = code.getIndiciesInRightOrder(parsedOutOfOrderDistressSignal)

// parsedOutOfOrderDistressSignal.forEach(ele => console.log(JSON.stringify(ele)))
indiciesInRightOrder.forEach(ele => console.log(JSON.stringify(ele)))
console.log(code.productSixAndTwoIndicies(indiciesInRightOrder))