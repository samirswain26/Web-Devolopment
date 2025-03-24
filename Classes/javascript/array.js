let teas = ['Green tea',"Black tea", 'oolang tea', "white tea","Herbal tea",  ]

// Add "chomomile Tea" to the existing list of teas
teas.push("chamomil tea")

// Remove "Oolang Tea" from the list of exixting lists of teas.

let index = teas.indexOf("oolang tea")
if(index > -1){
  teas.splice(index, 2)
}
// console.log(teas);

// Filter the list to only include teas that are caffeinated.
const caffinatedteas = teas.filter((tea)=>tea !== "Herbal tea")
// console.log(caffinatedteas)

// Sort the lists of teas in aplhabetical order.
// console.log(teas.sort());


// Use a for loop to print each type of tea in the array.
for(let i = 0; i < teas.length; i++){
    console.log(teas[i])
}

// Use a for loop to count how many teas are caffinated (excluding "Herbal Tea")

let caffinatedmyteas = 0
for (let i = 0; i < teas.length; i++){
    if(teas[i] !== "Herbal tea"){
        caffinatedmyteas++
    }
}
console.log(caffinatedmyteas);

// Use a for loop to create a new array with tea names in uppercse.
const uppercaseTeas = []
for (let i = 0; i < teas.length; i++) {
    uppercaseTeas.push(teas[i].toUpperCase())
}
console.log(uppercaseTeas);

// use a for loop to find the teas name with the most characters.
let longestTea = ""
for (let i = 0; i< teas.length; i++){
    if(teas[i].length > longestTea.length){
        longestTea = teas[i]
    }
}
console.log(longestTea);

// Use a For loop to reverse the order of teas in the array.
const reversetea = []
for(let i = teas.length - 1; i >= 0; i--){
    reversetea.push(teas[i])
}
console.log(reversetea);
