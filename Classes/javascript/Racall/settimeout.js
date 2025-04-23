const obj = {
    personName : "Samir",
    greet: function (){
        console.log(`Hello, ${this.personName}`)
    }
}

console.log("Hii");

Promise.resolve().then(()=>{
    console.log("Promise 1")
    Promise.resolve().then(function p1(){
        console.log("Promise 2")
    })
    Promise.resolve().then(function p2(){
        console.log("Promise 3")
    })
    Promise.resolve().then(function p4(){
        console.log("Promise 4")
    })
})

setTimeout(obj.greet.bind(obj) , 0);

console.log("Bye");

// In this peace of code there is the main concept of call stack, Task Queue, Microtask Queue, and Event Loop..
// The Callback Queue, also known as the Task Queue, is where asynchronous tasks such as event handlers, setTimeout callbacks, and I/O operations are queued for execution. These tasks are typically non-promise related.

// The Micro Task Queue is a special queue that holds micro-tasks, which are small, short-lived tasks. Promises, mutation observations, and other similar asynchronous operations enqueue their callbacks into the Micro Task Queue.

// Priority and Execution Order: When the event loop runs, it first processes tasks from the Micro Task Queue before moving on to tasks in the Callback Queue.

// Starvation: If micro tasks keep popping up without allowing other tasks a chance to run, what happens next? Well, in this scenario, the Callback Queue won’t get an opportunity to execute its tasks. This situation is what we call the starvation of tasks in the Callback Queue.
// A web site to practice call stack:- javascript visualizer 9000.