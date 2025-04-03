function changebackgroundcolor(color){
    document.body.style.backgroundColor = color
    
    
}

const themeButton = document.getElementById("theme-color");

themeButton.addEventListener("click", ()=>{
    const currentcolor = document.body.style.backgroundColor
    
    if(!currentcolor || currentcolor==="white" ){
        changebackgroundcolor("black")
        document.body.style.color = "white"
        themeButton.innerText = "Light Mode"
    }else{
        changebackgroundcolor("white")
        document.body.style.color="black"
        themeButton.innerText = "Dark Mode"
    }
})