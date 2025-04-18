// Create a function that takes an array of arrays  (representing the numbers of stars in each level) and return the total number of stars.

function totalStars(starLevels) {
    let star = 0
    for (let i = 0; i < starLevels.length;i++){
        // star = star + starLevels[i].length
        star += starLevels[i].length
    }
    return star
}
console.log(totalStars([["*","*","*"],["*","*"],["*"]]));
console.log(totalStars([["1","1","1"],["1","1"],["1"]]));
