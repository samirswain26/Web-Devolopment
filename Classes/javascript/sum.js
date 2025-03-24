let array = [1, 2, 3, 4, 5, 7]

let anotherarray = []

function addarray(num){
    let sum = 0;
    for(let i = 0; i < num.length; i++){
        sum = sum + num[i]
    }

    return sum
}


let total = addarray(array)
console.log(total);

anotherarray = addarray([1,4,3,9,10])
console.log(`Another result is ${anotherarray}`);