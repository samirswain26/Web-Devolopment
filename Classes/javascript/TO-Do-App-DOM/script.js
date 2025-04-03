const addbtn = document.getElementById("add-btn");
const todoinput = document.getElementById("todo-input");

const todoitemcontainer = document.getElementById("todo-items-conatiner");

// addbtn.addEventListener("click", ()=>{
//     const value = todoinput.value
//     console.log(value);

//     const li = document.createElement('li')
//     li.innerText = value

//     const btn = document.createElement("button")
//     btn.innerText = "-"
//     li.appendChild(btn)

//     btn.addEventListener("click", ()=>{
//         li.remove()
//     })

//     todoitemcontainer.appendChild(li)
//     todoinput.value = ""
// })




// Done By Using "ENTER" key as add.

todoinput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("add-btn").click();  // Works as button click

        const value = todoinput.value

        const li = document.createElement("li");
        li.innerText = value;

        const btn = document.createElement("button");
        btn.innerText = "-";
        li.appendChild(btn);

        btn.addEventListener("click", () => {
            li.remove();
        });

        todoitemcontainer.appendChild(li);
        todoinput.value = "";
    }
});

