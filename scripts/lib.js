// Preloaded configurations for environments
const quadrants = () => {
    // Order: TL, TR, BL, BR
    // Order: None, Dead, Revive, Life
    let deadZones = [];
    let reviveZones = [];
    let lifeZones = [];

    // dead
    for (let i = 0; i <= 11; i++) {
        for (let j = 12; j <= 23; j++) {
            deadZones.push([i, j])
        }
    }

    // revive
    for (let i = 12; i <= 23; i++) {
        for (let j = 0; j <= 11; j++) {
            reviveZones.push([i, j])
        }
    }

    // life
    for (let i = 12; i <= 23; i++) {
        for (let j = 12; j <= 23; j++) {
            lifeZones.push([i, j])
        }
    }
    
    return {
        cells: [],
        cellCount: 200,
        size: [24, 24],
        deadZones: deadZones,
        reviveZones: reviveZones,
        lifeZones: lifeZones
    }
}

const dangerOnly = (sparsity = 8) => {
    if (!sparsity) {
        sparsity = 8;
    }
    let deadZones = [];

    let size = [35, 35];
    let cellCount = 600;

    for (let i = 0; i < 1224; i++) {
        let index = [Math.trunc(i / 35), i % 35]
        let zone = Math.floor(Math.random() * sparsity)
        switch (zone) {
            case 1: {
                deadZones.push(index)
                break;
            }
            default: {
                break;
            }
        }
    }
    return {
        cells: [],
        cellCount: cellCount,
        size: size,
        deadZones: deadZones,
        reviveZones: [],
        lifeZones: []
    }
}

const randomized = (sparsity = 6) => {
    let deadZones = [];
    let reviveZones = [];
    let lifeZones = [];

    let size = [35, 35]
    let cellCount = 400;

    if (!sparsity) {
        sparsity = 6;
    }

    for (let i = 0; i < 1224; i++) {
        let index = [Math.trunc(i / 35), i % 35]
        let zone = Math.floor(Math.random() * sparsity)
        switch (zone) {
            case 1: {
                deadZones.push(index)
                break;
            }
            case 2: {
                reviveZones.push(index)
                break;
            }
            case 3: {
                lifeZones.push(index)
                break;
            }
            default: {
                break;
            }
        }
    }

    return {
        cells: [],
        cellCount: cellCount,
        size: size,
        deadZones: deadZones,
        reviveZones: reviveZones,
        lifeZones: lifeZones
    }
}

const lifeOnly = (sparsity) => {
    let cellCount = 200;
    let size = [35, 35]
    let lifeZones = []

    for (let i = 0; i < 1224; i++) {
        let index = [Math.trunc(i / 35), i % 35]
        let zone = Math.floor(Math.random() * sparsity)
        if (zone === 1) {
            lifeZones.push(index)
        }
    }

    return {
        cells: [],
        cellCount: cellCount,
        size: size,
        deadZones: [],
        reviveZones: [],
        lifeZones: lifeZones
    }
}