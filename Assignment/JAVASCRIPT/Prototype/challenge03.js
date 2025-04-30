// Problem statement
// You need to create a Counter constructor function that initializes a count property to 0. The counter should have two prototype methods:
    // decrement() decreases the count by 1.
    // increment() increases the count by 1.

// Challenge
    // Implement a constructor function Counter that initializes count to 0.
    // Attach increment() and decrement() methods to the prototype.

function Counter(initialcount) {
  this.count = initialcount;
}

// Define increment method on Counter's prototype
Counter.prototype.increment = function (){
  return this.count += 1 
}

// Define decrement method on Counter's prototype
Counter.prototype.decrement = function (){
  return this.count -= 1
}

const counter = new Counter(5);
console.log(counter.increment())
console.log(counter.decrement())
