const displaysrc = document.getElementById("dispaly-src");
const buttonKeys = document.querySelectorAll(".keys");

buttonKeys.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.innerText;
        console.log(value);
        if(value === "AC"){
            displaysrc.innerText = ""
        }else if(value === "="){
            try{
                displaysrc.innerText = eval(displaysrc.innerText)
            }catch{
                displaysrc.innerText = "Error"
            }
        } else if(value === "-/+"){
            if(displaysrc.innerText){
                displaysrc.innerText = displaysrc.innerText.startsWith("-")
                ? displaysrc.innerText.slice(1)
                :"-" + displaysrc.innerText;
            }
        }
        else{
            displaysrc.innerText += value
        }
        
    });
});
