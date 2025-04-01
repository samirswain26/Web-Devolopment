const addTaskBtn = document.getElementById("add-task")

const todoboard = document.getElementById("todo-board")

const dragable = document.getElementsByClassName("item")

const allboards = document.querySelector("#progress-board")

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