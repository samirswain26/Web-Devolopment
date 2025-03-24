// Create an object representing a type of tea with properties for name, type, and caffeine content.

const teas = {
    name : "Lemon Tea",
    type: "Green",
    caffine: "Low"
}

// Access and print the name and the type properties of the object.

console.log(teas.name);
console.log(teas["type"]);

// Add a new property origin to the tea object.

teas.origin = "china"

// Change the caffeine level of the tea object to "Medium".

teas.caffine = "Medium"

// Remove the type property from the tea object.

delete teas.type

// Check if the tea object has the property origin.

console.log("origin" in teas)
console.log(teas.hasOwnProperty("origin"));

// Use a For-In  loop to print all properties of the object.
for (let key in teas) {
   console.log(`${key} : ${teas}`);
}

// Created a nested object representing different types of teas and their properties.

const newTeas = {
    greenteas: {
        name : "Green Teas"
    },
    blackteas : {
        name : "Black tea"
    }
}

// Create a copy of the tea object.
let copyteas = JSON.stringify(teas)
let copiedtea = JSON.parse(copyteas)
console.log(typeof copiedtea )

const tocopy = {...teas} //Shallow Copy
const anothercopy = teas // reference


console.log(teas);
