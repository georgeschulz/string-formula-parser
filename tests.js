const test = require('./modules/test')
const parseFormula = require('./parser')
const Service = require('./serviceClass')

let testTwo = "ADD(3, 4)"
let resultTwo = parseFormula(testTwo, {})
test(resultTwo, 7, "Basic Addition")

let testOne = "ADD(ADD(4, DIVIDE(4, 2)), SUBTRACT([square_footage], 2))"
let resultOne = parseFormula(testOne, { square_footage: 2000 })
test(resultOne, 2004, "3 Deep Nesting + Interpolation")

let testThree = "MULTIPLY([square_footage], [subjective_scale])"
let resultThree = parseFormula(testThree, { square_footage: 2000, subjective_scale: 3 })
test(resultThree, 6000, "Double Interpolation")

let testFour = "ADD(ADD(ADD(ADD(2, 2),2),2),2)"
let resultFour = parseFormula(testFour, {})
test(resultFour, 10, "Five Deep Nesting")

let testFive = "EXP(ADD(ADD(ADD(4,2),2),DIVIDE(4, 2)), DIVIDE(4, 1)"
let resultFive = parseFormula(testFive, {})
test(resultFive, Math.pow(10, 4),  "Exponents")

let testSix = "SWITCH([pest_name], ants=1/ spiders=2/ rodents=4/)"
let resultSix = parseFormula(testSix, {pest_name: 'ants'}) 
test(resultSix, 1, "Simple Switch first element")

let resultSixB = parseFormula(testSix, {pest_name: 'spiders'})
test(resultSixB, 2, "Simple Switch second element")

let resultSixC = parseFormula(testSix, {pest_name: 'rodents'})
test(resultSixC, 4, "Simple Switch final element")

let testSeven = "ADD(SWITCH([pest_name], ants=1/ spiders=2/ rodents=4/), 1)"
let resultSeven = parseFormula(testSeven, {pest_name: 'ants'})
test(resultSeven, 2, "Switch with other operations")

let testEight = "ADD(SWITCH([current_warranty], ANR=75/ EAR=75/ WTR=75/ PER=75/ PTR=75/ ETM=100/ ATM=100/), DIVIDE(SUBTRACT([current_price], 150), 6))"

let resultEight = parseFormula(testEight, {current_warranty: 'ANR', current_price: 200})
test(resultEight, (75) + (50/6), "Switch with other operations")

let resultEightB = parseFormula(testEight, {current_warranty: 'ETM', current_price: 233})
test(resultEightB, (100) + ((233-150)/6), "Switch with other operations")

let testNine = "ADD(MULTIPLY(0.005, [square_footage]), 75)"
let resultNine = parseFormula(testNine, {square_footage : 2000})
test(resultNine, (0.005 * 2000) + 75, "Decimals")


let testTen = "NUM_LEVELS_ASC(2100, 1000=5/ 2000=10/ 3000=15/ 4000=20/)"
let resultTen = parseFormula(testTen, {})
test(resultTen, 15, "Ascending Levels Test")

let testEleven = "NUM_LEVELS_DESC(3001, 4000=5/ 3000=10/ 2000=15/ 1000=20/)"
let resultEleven = parseFormula(testEleven, {})
test(resultEleven, 10, "Descending Levels Test")

let interpolatedNumLevelsAsc = "ADD(NUM_LEVELS_ASC([square_footage], 1000=5/ 2000=10/ 3000=15/ 4000=20), 1)"
let resultTwelve = parseFormula(interpolatedNumLevelsAsc, {square_footage: 1800})
test(resultTwelve, 11, "Interpolated Ascending Levels Test")

let testThirteen = `
    ADD(
        10,
        SWITCH([pest_name],
            ants=1/
            spiders=2/
            rodents=4/
        )
    )
`
let resultThirteen = parseFormula(testThirteen, {pest_name: 'ants'})
test(resultThirteen, 11, "Adding tabs and indentation")

let testFourteen = "MULTIPLY(2, -3)"
let resultFourteen = parseFormula(testFourteen, {})
test(resultFourteen, -6, "Negative numbers")

//testing negative numbers in NUM_LEVELS_ASC
let testFifteen = "NUM_LEVELS_ASC(-3000, -4000=5/ -3000=10/ -2000=15/ -1000=20/)"
let resultFifteen = parseFormula(testFifteen, {})
test(resultFifteen, 10, "Negative numbers in NUM_LEVELS_ASC")

//testing negative numbers in NUM_LEVELS_DESC
let testSixteen = "NUM_LEVELS_DESC(-3000, -4000=5/ -3000=10/ -2000=15/ -1000=20/)"
let resultSixteen = parseFormula(testSixteen, {})
test(resultSixteen, 10, "Negative numbers in NUM_LEVELS_DESC")

//testing floor function
let testSeventeen = "FLOOR(2.5, 0)"
let resultSeventeen = parseFormula(testSeventeen, {})
test(resultSeventeen, 2, "Floor function")

let testEighteen = "FLOOR(2.5, 1)"
let resultEighteen = parseFormula(testEighteen, {})
test(resultEighteen, 3, "Floor function")

//test floor in nested functions using the 0 parameter for position 2
let testNineteen = "ADD(FLOOR(2.5, 0), 1)"
let resultNineteen = parseFormula(testNineteen, {})
test(resultNineteen, 3, "Floor function in nested functions")

//simple test for absolute value functions, ABS with parameter 2 = 0
let testTwenty = "ABS(-2, 0)"
let resultTwenty = parseFormula(testTwenty, {})
test(resultTwenty, 2, "Absolute value function")

//simple test for absolute value functions, ABS with parameter 2 = 1
let testTwentyOne = "ABS(-2, 1)"
let resultTwentyOne = parseFormula(testTwentyOne, {})
test(resultTwentyOne, -2, "Absolute value function with negative number")

//test absolute value function in nested functions
let testTwentyTwo = "ADD(ABS(-2, 0), 1)"
let resultTwentyTwo = parseFormula(testTwentyTwo, {})
test(resultTwentyTwo, 3, "Absolute value function in nested functions")

//test the round function with parameter 2 = 0
let testTwentyThree = "ROUND(2.5, 0)"
let resultTwentyThree = parseFormula(testTwentyThree, {})
test(resultTwentyThree, 3, "Round function")

//test the round function with parameter 2 = 2 for higher precision
let testTwentyFour = "ROUND(2.555, 2)"
let resultTwentyFour = parseFormula(testTwentyFour, {})
test(resultTwentyFour, 2.56, "Round function")

//test the round function in nested functions
let testTwentyFive = "ADD(ROUND(2.555, 2), 1)"
let resultTwentyFive = parseFormula(testTwentyFive, {})
test(resultTwentyFive, 3.56, "Round function in nested functions")

const all = new Service(
    "All",
    "Bi-Monthly",
    ["Service", "Monthly", "Annual Prepay", "Quarterly"],
    "SWITCH([severity], Low=50/ Medium=100/ High=150/)",
    "ADD(SWITCH([current_warranty], ANR=75/ EAR=75/ WTR=75/ PER=75/ PTR=75/ ETM=100/ ATM=100/), DIVIDE(SUBTRACT([current_price], 150), 6))",
    [],
    0.05
)

let allPricingExample = all.calculatePrice({
    severity: 'High',
    current_price: 200,
    current_warranty: 'ANR'
})


test(allPricingExample.contractValue, 566.6666666666666, "All Service Pricing Example")
test(allPricingExample.options.find(o => o.name === "Monthly").billingAmount, 41.666666666666664, "All Service Pricing Example")
test(allPricingExample.options.find(o => o.name === "Annual Prepay").billingAmount, 475, "All Service Pricing Example")