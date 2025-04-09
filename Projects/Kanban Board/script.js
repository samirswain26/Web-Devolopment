const addTaskBtn = document.getElementById("add-task")

const todoboard = document.getElementById("todo-board")

const dragable = document.getElementsByClassName("item")

const allboards = document.querySelector("#progress-board")

const container = document.getElementById("container")
const addboard = document.getElementById("add-board")

// function attachBoardListeners(board) {
//     board.addEventListener("dragover", (e) => {
//         e.preventDefault();
//         const flyingElement = document.querySelector(".flying");
//         if (flyingElement) {
//             board.appendChild(flyingElement);
//         }
//     });
// }




addboard.addEventListener("click", ()=>{
    console.log("hello")
    const input = prompt("Add Conatiner")
    if(!input) return

    const heading = document.createElement("h4")
    heading.innerText = input

    const created = document.createElement("div")
    created.id = "added-board"
    created.className = "boards"
    created.style.border = "2px solid white"
    created.style.width = "200px"
    created.style.height = "70vh"
    created.style.borderRadius = "10px"
    created.style.display = "flex"
    created.style.fontFamily = " Segoe UI, Tahoma, Geneva, Verdana, sans-serif;"
    created.style.padding = "10px"

    created.addEventListener("dragover", (e) => {
        e.preventDefault();
        const flyingElement = document.querySelector(".flying");
        console.log("Dragging over:", created);
        if (flyingElement) {
            created.appendChild(flyingElement);
        }
    });

    console.log(created.className)
    console.log(created.id)

    // attachBoardListeners(created);

    created.appendChild(heading)
    container.appendChild(created)
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