import constants from './input.js'


function parseInput(input) {
    const parsedValues = []
    
    const lines = input.split('\n')
    lines.forEach(line => {
        parsedValues.push(line.split(' '))
    });

    return parsedValues
}

function doGameRounds(rounds) {
    const roundScores = []

    rounds.forEach(round => {
        if(round[0] === constants.OPPONENT.ROCK) {
            if(round[1] === constants.ME.LOSE) {
                roundScores.push(constants.GAME_RESULT_SCORE.LOSE + constants.SHAPE_BONUS.SCISSORS)
            } else if(round[1] === constants.ME.DRAW) {
                roundScores.push(constants.GAME_RESULT_SCORE.DRAW + constants.SHAPE_BONUS.ROCK)
            } else if(round[1] === constants.ME.WIN) {
                roundScores.push(constants.GAME_RESULT_SCORE.WIN + constants.SHAPE_BONUS.PAPER)
            }
        } else if(round[0] === constants.OPPONENT.PAPER) {
            if(round[1] === constants.ME.LOSE) {
                roundScores.push(constants.GAME_RESULT_SCORE.LOSE + constants.SHAPE_BONUS.ROCK)
            } else if(round[1] === constants.ME.DRAW) {
                roundScores.push(constants.GAME_RESULT_SCORE.DRAW + constants.SHAPE_BONUS.PAPER)
            } else if(round[1] === constants.ME.WIN) {
                roundScores.push(constants.GAME_RESULT_SCORE.WIN + constants.SHAPE_BONUS.SCISSORS)
            }
        } else if(round[0] === constants.OPPONENT.SCISSORS) {
            if(round[1] === constants.ME.LOSE) {
                roundScores.push(constants.GAME_RESULT_SCORE.LOSE + constants.SHAPE_BONUS.PAPER)
            } else if(round[1] === constants.ME.DRAW) {
                roundScores.push(constants.GAME_RESULT_SCORE.DRAW + constants.SHAPE_BONUS.SCISSORS)
            } else if(round[1] === constants.ME.WIN) {
                roundScores.push(constants.GAME_RESULT_SCORE.WIN + constants.SHAPE_BONUS.ROCK)
            }
        }
    })

    return roundScores
}

const roundValues = parseInput(constants.MY_INPUT)
const roundResults = doGameRounds(roundValues)
console.log(roundResults.reduce((a, b) => a + b, 0))