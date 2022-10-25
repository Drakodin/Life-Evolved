# Life-Evolved
Life, or Conway's Game of Life, is an early automaton created by John Conway. This project is the same, following the rules set, but with the addition of environment parameters to change execution.

## Environment
Cells and the Environment have classes which track their properties, but the environment is special: there are zones in which special effects can be applied which override the default rule. Environment tiles are mapped to integer values. The current environment zones are the following:
* Normal - 0 - No special effect
* Dead - 1 - Cells on this space will die. This overrides the reproduction rule.
* Revive - 2 - Cells on this space will be revived if they are to die that turn.
* Life - 3 - Cells on this space will not die. This overrides any rule that may cause a cell to die.

## Execution
Current Release: 0.0.1
Live: Yes
UI: No

### Instructions
- In your browser, open the dev console.
- Call `initialize(keyword?, kwargs?)` with one of the following options.

|Keyword|kwargs|Effect|
|-------|------|------|
|`none`|`{}`|Initializes a 30x30 grid, playing the original Game of Life with no added effects|
|`"random"`|`{sparsity: number \| 50}` |Initializes a 35x35 grid, playing the Game of Life, except with special zones randomly scattered, each consuming about 2% of the board. The special zones are specified under [Environment](#environment)|
|`quad`|`{}`|Initializes a 24x24 grid where the board is divided into 4 quadrants of special zones and regular zones. This is demonstrate the intended effects of the board.|
|`danger`|`{sparsity: number \| 50}`|Initializes a 35x35 grid, playing the Game of Life, except with danger zones randomly scattered, each consuming about 2% of the board.|
|`life`|`{sparsity: number \| 50}`|Initializes a 35x35 grid, playing the Game of Life, except with life zones randomly scattered, each consuming about 2% of the board.|
As kwargs, note that the exact word must be spelled out. Else, it is assumed to be not present and the default value is used.