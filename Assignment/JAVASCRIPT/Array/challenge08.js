// Create a function that inserts the partner's name at the start of the message and return the updated message.

function writeLoveLetter(message, name) {
    message.unshift(name)
    return message
}
console.log(writeLoveLetter(["a"], "b"));

