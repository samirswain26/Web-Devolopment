// Create a function that counts how many boxes you need based on the total number of chocolate bars and the number of chocolate bars per box, using a loop.

function countBoxes(totalBars, barsPerBox) {
    let boxes = 0
    while(totalBars >= barsPerBox){
      boxes++
      totalBars = totalBars - barsPerBox
    }
    return boxes
}

console.log(countBoxes(17,5))