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