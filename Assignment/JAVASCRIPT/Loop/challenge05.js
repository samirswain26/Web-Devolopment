// Create a function that uses a loop to count the number of steps during a workout.
// The loop should continue untill you reach the target step count.

function countstep(targetstep){
    let count = 0
    while (count < targetstep){
        count++
    }
    return count
}

console.log(countstep(8))