// Cretae a function that adds a puppy to the front of the queue and returns the uplaoded queue.

function addPuppy(queue, puppyName) {
    queue.unshift(puppyName)
    return queue
}