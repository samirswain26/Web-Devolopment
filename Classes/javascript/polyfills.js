// A polyfill is a piece of code (usually JavaScript on the Web) used to provide modern functionality on older browsers that do not natively support it.


// Error: .forEach function does not exist on arr variable

// Real Signature ko samjho - No return, function input,  value index
// calls my fn for every value



if (!Array.prototype.myForEach){
    Array.prototype.myForEach = function (userfn, add){
        const originalArr = this;  // Points to the Current object.

        for (let i = 0; i < originalArr.length; i++){
            userfn(originalArr[i], i);
        }
        for (let i = 0; i < originalArr.length; i++){
            add(originalArr[i], i);
        }
    }

}

const arr = [1,2,3,4,5,6,7,8]

const nextarray = arr.myForEach(function (value, index){
    console.log(`My For Each at index ${index} is ${value}`);
    
}, function(value, index){
    console.log(`My for Each value is ${value} and index is ${index}`)
})
console.log(nextarray);

// forEach gives one parameter but to understyand i created two parameter in this case. That is "userfn" and "add".


// Signature .map
// Return? - new array , Each Element Iterate, userfn



if (!Array.prototype.mymap){
    Array.prototype.mymap = function(userfn){
        const result = []

        for(let i = 0; i < this.length; i++){
            const value = userfn(this[i], i)
            result.push(value)
        }

        return result
    }
}

const n1 = arr.map((d) => d*2)
console.log(n1);

const n2 = arr.mymap((b) => b*3)
console.log(n2);



// Filter
//  Signature: Return - new array | input: userfn,
// agar user ka function true return karta hai toh current value ko new array mai store kardo


const n3 = arr.filter((a) => a % 2 === 0 )
console.log(n3);

if(!Array.prototype.myfilter){
    Array.prototype.myfilter = function (userfn){
        const result = []

        for(let i = 0; i < this.length; i++){
            if (userfn(this[i])){
                result.push(this[i])
            }
        }
        return result
    }
}

const n4 = arr.myfilter((a) => a % 2 === 0 )
console.log(n4);
