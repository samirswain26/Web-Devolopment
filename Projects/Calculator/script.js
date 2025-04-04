const dispalyDrc = document.getElementById("dispaly-src");
const buttonkeys = document.getElementsByClassName("keys");
const one = document.getElementById("one")

one.addEventListener("click", ()=>{
    const value = one.innerText
    // dispalyDrc.innerText = value
    if(value === one.innerText){
        dispalyDrc.innerText += value
        console.log(value);
        
    }    
})
