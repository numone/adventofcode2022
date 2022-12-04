import constants from './input.js'

function parseInput(input) {
    const lines = input.split('\n')
    const flattenedAssignments = []
    
    lines.forEach(line => {
        const assignments = line.split(',')
        const assignmentMap = {}
        assignmentMap.firstAssignment = [parseInt(assignments[0].split('-')[0]), parseInt(assignments[0].split('-')[1])]
        assignmentMap.secondAssignment = [parseInt(assignments[1].split('-')[0]), parseInt(assignments[1].split('-')[1])]

        flattenedAssignments.push(assignmentMap)
    });

    return flattenedAssignments
}

function getCrossedAssignmentCount(assignments) {
    let crossedCount = 0

    assignments.forEach(assignment => {
        if(assignment.firstAssignment[0] >= assignment.secondAssignment[0] && assignment.firstAssignment[1] <= assignment.secondAssignment[1]) {
            crossedCount++
        } else if(assignment.secondAssignment[0] >= assignment.firstAssignment[0] && assignment.secondAssignment[1] <= assignment.firstAssignment[1]) {
            crossedCount++
        }
    });

    return crossedCount
}


const assignments = parseInput(constants.MY_INPUT)
console.log(getCrossedAssignmentCount(assignments))