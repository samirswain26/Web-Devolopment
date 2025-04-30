// Problem statement
// You are designing a simple robot system. Each robot has a name and a batteryLevel. The robot should have a method charge() that increases the battery level by 20, but it cannot exceed 100.

// Challenge
    // Implement a constructor function Robot that initializes name and batteryLevel.
    // Attach a method charge() to its prototype that increases batteryLevel by 20, ensuring it does not go above 100.

function Robot(name, batteryLevel) {
    
   this.name = name
   this.batteryLevel = batteryLevel
}
Robot.prototype.charge = function (){
   this.batteryLevel = Math.min(this.batteryLevel + 20, 100)
}

let r1 = new Robot("Robo", 5);
let r2 = new Robot("Robo", 5);
r1.charge()
console.log(r1);
console.log(r2);