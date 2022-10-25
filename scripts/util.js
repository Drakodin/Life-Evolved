/**
 * Toggles the area on the grid with the specified type of zone. When toggled on,
 * any cells on those areas will have their type of zone underneath highlighted.
 * 
 * The input is in the format of the class name (zone-#)
 * 
 * @param {string} className The class
 */
const toggle = (className) => {
    // Zone-0 is a regular square with no effects. Thus no highlighting is required.
    if (className === "zone-0") {
        return;
    }

    let cells = [...document.querySelectorAll(`.${className}`)].map(el => el.children.item(0))
    cells.forEach(v => {
        if (v.classList.contains(`${className}-visible`)) {
            v.classList.remove(`${className}-visible`)
        } else {
            v.classList.add(`${className}-visible`)
        }
    })
}