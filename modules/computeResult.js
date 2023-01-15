const { ADD, SUBTRACT, MULTIPLY, DIVIDE, EXP, NUM_LEVELS, SWITCH } = require('./operations')

function computeResult(operation, args) {
    switch (operation) {
        case "ADD":
            return ADD(args)
        case "SUBTRACT":
            return SUBTRACT(args)
        case "MULTIPLY":
            return MULTIPLY(args)
        case "DIVIDE":
            return DIVIDE(args)
        case "EXP":
            return EXP(args)
        case "NUM_LEVELS_ASC":
            return NUM_LEVELS(args, true)
        case "NUM_LEVELS_DESC":
            return NUM_LEVELS(args, false)
        default:
            return null
    }
}

module.exports = computeResult