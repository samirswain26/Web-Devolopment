const addTaskBtn = document.getElementById("add-task")

const todoboard = document.getElementById("todo-board")

const dragable = document.getElementsByClassName("item")

const allboards = document.querySelector("#progress-board")

const container = document.getElementById("container")
const addboard = document.getElementById("add-board")

addboard.addEventListener("click", ()=>{
    console.log("hello")
    const input = prompt("Add Conatiner")
    if(!input) return

    const created = document.createElement("div")
    created.innerText = input 
    created.style.border = "2px solid black"
    created.style.width = "200px"
    created.style.height = "70vh"
    created.style.borderRadius = "10px"
    created.style.display = "flex"
    created.style.fontFamily = " Segoe UI, Tahoma, Geneva, Verdana, sans-serif;"
    created.style.padding = "10px"
    container.appendChild(created)
})
allboards.addEventListener("click", ()=> {
    console.log("This div was clicked")
})

function attachDragElemnet(target){

    target.addEventListener('dragstart', ()=>{
        target.classList.add("flying")
    })
    target.addEventListener('dragend', ()=>{
        target.classList.remove("flying")
    })

}

addTaskBtn.addEventListener("click", ()=>{
    const input = prompt("Add Task")
    if(!input) return

    const taskcard = document.createElement('p')
    taskcard.classList.add("item")
    taskcard.setAttribute("draggable", true)
    taskcard.innerText=input

    attachDragElemnet(taskcard)
    
    todoboard.appendChild(taskcard)
})



const allboard = document.querySelectorAll(".boards")  
const allitems = document.querySelectorAll(".item")

allitems.forEach(attachDragElemnet)




allboard.forEach((boa)  => {
    boa.addEventListener("dragover", ()=>{
        const flyingElement = document.querySelector(".flying")
        console.log(boa,"kuch toh upar se gaya", flyingElement);
        boa.appendChild(flyingElement)
    })
});






// ((element)=>{
//     element.addEventListener(("dragstart"), ()=>{
//         element.classList.add("flying")
//     });
//     element.addEventListener(("dragend"),()=> {
//         element.classList.remove("flying")
//     })
// })