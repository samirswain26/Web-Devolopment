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
