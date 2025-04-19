// create a function that adds a vip guest to the front of the queue and returns the updated list.

function addVIP(queue, vipGuest) {
    queue.unshift(vipGuest)
    return queue
}

console.log(addVIP(["a"], "b"));
