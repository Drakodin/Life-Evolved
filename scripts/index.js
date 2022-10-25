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
        cellDiv.id = `cell:${r}-${c}`
        cellDiv.classList.add("cell")
        square.appendChild(cellDiv)
    })
}

/**
 * Render-level loop runner using Environment.next()
 */
const runLoop = (speed = 10) => {
    let info = env.info
    if (info.executionId) {
        return
    }

    if (info.pause) {
        env.resume()
    }
    env.setExecutionLoop(setInterval(renderLoop, 1000/speed))
}

/**
 * Updates the UI grid
 * 
 * @param {number[][]} grid 
 * @param {Cell[]} cells 
 */
const updateGUI = (grid, cells) => {
    // Some zones can spread
    grid.forEach((row, idx) => {
        row.forEach((v, i) => {
            let square = document.getElementById(`sq:${idx}-${i}`);
            let zoneClass = [...square.classList].filter(v => {
                return /zone/.test(v)
            })
            square.classList.replace(zoneClass[0], `zone-${v}`)
        })
    })

    // Update all cells
    let currCells = [...document.querySelectorAll(".cell")]
    let matched = []
    cells.forEach(cell => {
        let [r, c] = cell.location;
        if (currCells.find(v => v.id === `cell:${r}-${c}`)) {
            matched.push(cell)
        } else {
            let square = document.getElementById(`sq:${r}-${c}`)
            let cellDiv = document.createElement("div")
            cellDiv.id = `cell:${r}-${c}`
            cellDiv.classList.add("cell")
            square.appendChild(cellDiv)
        }
    })

    currCells.forEach(cellEl => {
        let loc = cellEl.id.split(":")[1].split("-").map(v => Number.parseInt(v))
        if (!cells.find(c => c.location[0] === loc[0] && c.location[1] === loc[1])) {
            cellEl.remove()
        }
    })
}

const renderLoop = () => {
    env.next()
    let info = env.info;

    updateGUI(info.grid, info.cells)
}

/**
 * Loads a predefined board using a parameter
 * generator from lib.js.
 * 
 * Passing no parameters nets the default board with
 * no special zones that alter rules.
 * 
 * @param {string} type 
 */
const initialize = (type = "", kwargs = {}) => {
    if (env) {
        env.halt()
    }

    switch(type) {
        case "random": {
            let params = randomized(kwargs["sparsity"]?? 6)
            generateEnvironment(params)
            runLoop()
            break;
        }
        case "danger": {
            let params = dangerOnly(kwargs["sparsity"]?? 8);
            generateEnvironment(params)
            runLoop()
            break;
        }
        case "quad": {
            let params = quadrants()
            generateEnvironment(params)
            runLoop()
            break;
        }
        case "life": {
            let params = lifeOnly(kwargs["sparsity"]?? 20)
            generateEnvironment(params)
            runLoop()
            break;
        }
        default: {
            generateEnvironment()
            runLoop()
            break;
        }
    }
}