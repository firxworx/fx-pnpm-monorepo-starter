# @workspace/common

Package of common functions that can be shared across multiple packages.

The examples are _pure functions_ and _side-effect_-free that can be used in both client-side and server-side code.

`package.json` specifies `sideEffects: false` to allow bundlers to tree-shake the code. If you revise the code in this library to have side effects then you should remove this line.
