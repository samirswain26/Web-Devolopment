let person1 = {
    name: "Samir",
    greet: function(q){
        console.log(`Hello ${this.name}`);
    }
}

console.log(person1.greet());

let person2 = {
    name: "Sam",
};

let bindGreet = person1.greet.bind(person2)    // Bind returns the new function but call method is used to call that function.
bindGreet()
