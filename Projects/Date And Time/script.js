function clock(){
    const timeElement =  document.getElementById("time")
    const dateElement =  document.getElementById("date")
    
    const now = new Date();
    
    const hours = now.getHours() % 12 || 12
    const minutes = now.getMinutes().toString().padStart(2,"0")
    const seconds = now.getSeconds().toString().padStart(2,"0")
    const ampm = now.getHours() >= 12 ? "AM" : "PM"
    timeElement.innerText = `${hours}:${minutes}:${seconds}:${ampm} `
    dateElement.innerText = now.toDateString(undefined, clock)
}
setInterval(clock, 10000)
clock()

