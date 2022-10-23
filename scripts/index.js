let env;

const generateEnvironment = (params = undefined) => {
    if (params) {
        env = new Environment(params)
    } else {
        env = new Environment()
    }

    let root = document.getElementById("env-board");
    // Clear any present environment
    root.innerHTML = ""
}

/**
 * Updates the UI grid
 * 
 * @param {number[][]} grid 
 * @param {Cell[]} cells 
 */
const updateGUI = (grid, cells) => {
    
}