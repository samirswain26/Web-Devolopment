import React from "https://esm.sh/react@19.1.0"
import ReactDOM from "https://esm.sh/react-dom@19.1.0/client"

// React-19 we can use the js module...

const App = () => {
    return React.createElement(
        "div",
        {class : "tset"},
        React.createElement(
            "h1",
            {},
            "Learn React From Scratch"
        )
    )
}

const container = document.getElementById("root")
const root = ReactDOM.createRoot(container)

root.render(React.createElement(App))
