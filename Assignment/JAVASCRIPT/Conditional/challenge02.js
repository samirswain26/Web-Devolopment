// Create a function that takes three numbers and return the largest using if-else.

function findlargest(a, b, c){
    if (a>=b && a>=c){
        return a
    }else if(b>=a && b>=c){
        return b
    }else{
        return c
    }
}
console.log(findlargest(13, 99999, 89));