// In backward-compatible js/ react-18 we can use the const as lowercase. 
// But it in the higher version we can not use this because JSX Transpilation and Capitalization Rules.


const app = () => {
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

root.render(React.createElement(app))
