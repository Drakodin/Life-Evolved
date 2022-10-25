class Cell {
    /**
     * Creates a cell at the position. Cells present are alive. Dead cells
     * are removed from the environment tracking.
     * @param {[number, number]} position The grid position of the cell
     */
    constructor(position) {
        this.position = position;
    }

    get location() {
        return this.position
    }

    /**
     * Comparator for two cells (does not affect the "==").
     * 
     * Recommended that this function is used, like in Java with
     * all objects.
     * @param {Cell} cell 
     * @returns 
     */
    equals(cell) {
        let [r, c] = this.location
        let [or, oc] = cell.location
        return r === or && c === oc;
    }
}

class CellSet {
    constructor(tracking = []) {
        this.backing = []
        tracking.forEach(cell => {
            this.add(cell)
        })
    }

    /**
     * Adds a cell to the set.
     * @param {Cell} cell 
     */
    add(cell) {
        if (this.backing.findIndex(v => cell.equals(v)) > -1) {
            return
        } else {
            this.backing.push(cell)
        }
    }
    
    values() {
        return this.backing;
    }

    get size() {
        return this.backing.length;
    }
}

/**
 * Returns the status of the cell given its neighbors following
 * the condensed four rules of Conway's Game of Life.
 * 
 * 1. If the cell is alive and has 2 or 3 neighbors, it stays alive.
 * 2. If the cell is alive and has less than 2 or more than 3 neighbors, it dies.
 * 3. If the cell is not alive and has 3 neighbors, it becomes alive.
 * 4. If the cell is not alive and has 2 or less or more than 3 neighbors, it stays dead.
 * 
 * @param {boolean} alive The life status of the cell
 * @param {number} neighbors The number of neighbors
 * @returns {boolean} The next status of the cell
 */
const conway = (alive, neighbors) => {
    if (alive && (neighbors === 2 || neighbors === 3)) {
        return true;
    }

    if (alive) {
        return false
    }

    if (neighbors === 3) {
        return true
    }

    return false
}

const ENVIRONMENT_DEFAULT_PARAMS = {
    cells: [],
    cellCount: 225,
    size: [30, 30],
    deadZones: [],
    reviveZones: [],
    lifeZones: []
}

class Environment {
    /**
     * Initializes the environment state using
     * 
     * @param {{
     *  cells: Cell[],
     *  cellCount: number,
     *  size: [number, number],
     *  deadZones: [number, number][],
     *  reviveZones: [number, number][],
     *  lifeZones: [number, number][]
     * }} params Environment parameters
     */
    constructor(params = ENVIRONMENT_DEFAULT_PARAMS) {
        this.size = params.size;
        this.grid = Array.from({length: params.size[0]}, (v, i) => Array.from({length: params.size[1]}, (v, i) => 0))
        
        params.deadZones.forEach(v => {
            this.grid[v[0]][v[1]] = 1
        })

        params.reviveZones.forEach(v => {
            this.grid[v[0]][v[1]] = 2
        })

        params.lifeZones.forEach(v => {
            this.grid[v[0]][v[1]] = 3
        })

        if (params.cellCount > 0) {
            let indices = new Set()
            while (indices.size < params.cellCount) {
                indices.add(Math.trunc(Math.random() * (this.size[0] * this.size[1])))
            }
            this.cells = Array.from(indices).map(v => {
                let index = [Math.floor(v / this.size[1]), v % this.size[1]]
                return new Cell(index)
            })
        } else if (params.cells.length > 0) {
            this.cells = params.cells
        }

        this.pause = true
        this.executionId = ""
    }

    get info() {
        return {
            cells: this.cells,
            grid: this.grid,
            pause: this.pause,
            size: this.size,
            executionId: this.executionId
        }
    }

    get zoneInfo() {
        let zones = {
            normal: 0,
            dead: 0,
            revive: 0,
            life: 0
        }

        for (let i = 0; i < this.size[0]; i++) {
            for (let j = 0; j < this.size[1]; j++) {
                switch (this.grid[i][j]) {
                    case 1: {
                        zones.dead += 1;
                        break;
                    }
                    case 2: {
                        zones.revive += 1;
                        break;
                    }
                    case 3: {
                        zones.life += 1;
                        break;
                    }
                    default: {
                        zones.normal += 1;
                        break;
                    }
                }
            }
        }
        return zones;
    }

    /**
     * Updates a location's status on the board.
     * 
     * Cells will be added after every single location is updated
     * to maintain synchronicity.
     * @param {[number, number]} loc 
     * @returns {Cell | undefined}
     */
    update(loc) {
        let [r, c] = loc
        let neighbors = [
            [r - 1, c - 1],
            [r - 1, c],
            [r - 1, c + 1],
            [r, c - 1],
            [r, c + 1],
            [r + 1, c - 1],
            [r + 1, c],
            [r + 1, c + 1]
        ]
        let zone = this.grid[r][c]

        let cells = 0
        neighbors.forEach(v => {
            let [row, col] = v;
            let cell = this.cells.findIndex(v => {
                let [cr, cc] = v.location
                return row === cr && col === cc
            })
            cells += (cell > -1) ? 1 : 0
        })

        let currCell = this.cells.find(v => {
            let [cr, cc] = v.location
            return r === cr && c === cc
        })

        switch (zone) {
            case 1: {
                // Never returns a cell
                return undefined;
            }
            case 2: {
                // Opposite of the default case, if the cell is slated to die, it will not.
                if (!conway(!!currCell, cells)) {
                    return new Cell([r, c])
                }
                return undefined;
            }
            case 3: {
                // Always returns a new cell
                return new Cell([r, c])
            }
            default: {
                // Follows Conway's rules to determine if a cell exists
                if (conway(!!currCell, cells)) {
                    return new Cell([r, c])
                }
                return undefined;                
            }
        }
    }

    /**
     * Runs a single generation of the cells of the board
     * If the simulation is paused while executing, then the simulation
     * will stop.
     */
    next() {
        if (this.pause) {
            clearInterval(this.executionId)
            return
        }

        let nextCells = []

        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[0].length; j++) {
                let cell = this.update([i, j])
                if (cell) {
                    nextCells.push(cell)
                }
            }
        }

        this.updateCells(this.cells, nextCells)
    }

    /**
     * Updates the tracking Cell array with the following rules:
     * - If the cell is in prev and not in curr, it died
     * - If the cell is in prev and in curr, it lived
     * - If the cell is not in prev and in curr, it is new
     * 
     * @param {Cell[]} prev 
     * @param {Cell[]} curr 
     */
    updateCells(prev, curr) {
        let union = new CellSet([...prev, ...curr])
        let updated = []
        for (let cell of union.values()) {
            let prevIdx = prev.findIndex(v => v.equals(cell))
            let currIdx = curr.findIndex(v => v.equals(cell))

            if (prevIdx === -1 && currIdx > -1) {
                updated.push(cell)
            } else if (prevIdx > -1 && currIdx > -1) {
                updated.push(cell)
            }
        }

        this.cells = updated;
    }

    /**
     * Sets the pause property to true, which stops execution.
     */
    halt() {
        this.pause = true
        clearInterval(this.executionId)
    }

    /**
     * Sets the pause property to false, which resumes execution
     */
    resume() {
        this.pause = false
    }

    setExecutionLoop(id) {
        this.executionId = id;
    }

    /**
     * Runs the simulation, calling next() on a regular interval
     * determined by the reciprocal of speed.
     * 
     * If the simulation has been previously paused, it is unpaused
     * and the execution continues.
     * 
     * If a simulation is already running, another will not spawn.
     * 
     * @param {number} speed The speed of the simulation
     */
    run(speed = 10) {
        if (this.executionId) {
            return
        }

        if (this.pause) {
            this.pause = false
        }
        this.executionId = setInterval(this.next, 1 / speed)
    }
}