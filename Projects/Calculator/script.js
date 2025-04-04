const dispalyDrc = document.getElementById("dispaly-src");
const buttonkeys = document.getElementsByClassName("keys");
const one = document.getElementById("one")
const two = document.getElementById("two")

one.addEventListener("click", ()=>{
    const value = one.innerText
    // dispalyDrc.innerText = value
    if(value === one.innerText){
        dispalyDrc.innerText += value
        console.log(value);
        
    }    
})
two.addEventListener("click", ()=>{
    const value = two.innerText
    // dispalyDrc.innerText = value
    if(value === two.innerText){
        dispalyDrc.innerText += value
        console.log(value);
        
    }    
})
