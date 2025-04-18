// Cretae a function that takes an array of water amount (in liters) for each bottle and add them up.
// The fumction should return the total amount of water you've filled in all the bottles.

function totalWater(waterAmounts) {
    let total = 0;

    for (let i = 0; i < waterAmounts.length; i++){
        total = total + waterAmounts[i]
    }
    return total
}

console.log(totalWater([1,2,3,4]));
