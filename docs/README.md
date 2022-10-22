# Life-Evolved
Life, or Conway's Game of Life, is an early automaton created by John Conway. This project is the same, following the rules set, but with the addition of environment parameters to change execution.

## Environment
Cells and the Environment have classes which track their properties, but the environment is special: there are zones in which special effects can be applied which override the default rule. Environment tiles are mapped to integer values. The current environment zones are the following:
* Normal - 0 - No special effect
* Dead - 1 - Cells on this space will die. This overrides the reproduction rule.
* Revive - 2 - Cells on this space will be revived if they are to die that turn.
* Life - 3 - Cells on this space will not die. This overrides any rule that may cause a cell to die.