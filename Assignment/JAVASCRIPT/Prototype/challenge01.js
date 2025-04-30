// Problem statement 
// You need to create a constructor function Animal that takes a name parameter. Add a method makesound to its prototype, which always returns "some generic sound".

// challenge
    // I,plement a constructor function Animal that initializes the name property.
    // Attach a method "makesound" to its prototype that returns "some generic sound".

function Animal(name){
    this.name = name
}
Animal.prototype.makesound = function (){
    return "Some generic sound"
}
const myAnimal = new Animal("Leo");
console.log(myAnimal.name);       // Output: Buddy
console.log(myAnimal.makesound());