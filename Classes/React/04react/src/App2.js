import React from "https://esm.sh/react@19.1.0"
import ReactDOM from "https://esm.sh/react-dom@19.1.0/client"



// It is the Generic Component in react that can be used in many times....
const chai = (props) => {
    console.log(props)

    return React.createElement(
        "div" , {} , [
            React.createElement("h1", {}, props.name),
            React.createElement("h1", {}, props.price),

        ]
    )
}


const App = () => {
    return React.createElement(
        "div",
        {class : "tset"},
        [
            React.createElement(
                "h1",
                {},
                "chai variation are:-"
            ),
            React.createElement(chai, {
                name: "Masala Chai",
                price: 40
            }),
            React.createElement(chai, {
                name: "Giner Chai",
                price: 40
            }),
            React.createElement(chai, {
                name: "Lemon Tea",
                price: 40
            }),
            React.createElement(chai, {
                name: "Green Tea",
                price: 40
            }),
            React.createElement(chai, {
                name: "Dolang Chai",
                price: 40
            }),
        ]   
    )
}

const container = document.getElementById("root")
const root = ReactDOM.createRoot(container)

root.render(React.createElement(App))
