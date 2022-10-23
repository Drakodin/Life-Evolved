let env;

const generateEnvironment = (params = undefined) => {
    if (params) {
        console.log("Generating environment using provided parameters.")
        env = new Environment(params)
    } else {
        console.log("Generating environment using default parameters.")
        env = new Environment()
    }

    let root = document.getElementById("env-board");
    // Clear any present environment
    root.innerHTML = ""

    // Set up grid columns
    let info = env.info
    root.style.gridTemplateColumns = `repeat(${info.size[1]}, 15px)`

    console.log("Current environment:", info)

    env.info.grid.forEach((row, idx) => {
        row.forEach((v, i) => {
            let square = document.createElement("div")
            square.classList.add("grid-square", `zone-${v}`)
            square.id = `sq:${idx}-${i}`;
            root.appendChild(square)
        })
    })

    env.info.cells.forEach(cell => {
        let [r, c] = cell.location;
        let square = document.getElementById(`sq:${r}-${c}`)
        let cellDiv = document.createElement("div")
        cellDiv.classList.add("cell")
        square.appendChild(cellDiv)
    })
}

/**
 * Updates the UI grid
 * 
 * @param {number[][]} grid 
 * @param {Cell[]} cells 
 */
const updateGUI = (grid, cells) => {
    
}