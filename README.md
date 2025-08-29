# jb-node-lib

This node.js library contains a set of common functions for basic utilities, to build NodeJs apps.

## Instalation
The library is published on NPM, so you can easily install it with → `npm install jb-node-lib`<br/>

The library is written as a CommonJS module, so it can be imported as a **CommonJS** or **ECMAScript** Module.

### ECMAScript
```javascript
// Remember to add "type": "module" in package.json to use ES modules
import { cmd, exit, sleep, move, print, line, repeat, color, printBox } from 'jb-node-lib';
import { red, green, yellow, blue, gray, grayDark, cyan, black, brown, white } from 'jb-node-lib';

import readline from 'readline';
readline.emitKeypressEvents(process.stdin);
if (process.stdin.setRawMode != null) { process.stdin.setRawMode(true); }

console.clear();
print(yellow('Hello World!'), 10, 2);
exit();
```

### CommonJS
```javascript
const { exit, print, yellow } = require('jb-node-lib');

const readline = require('readline');
readline.emitKeypressEvents(process.stdin);
if (process.stdin.setRawMode != null) { process.stdin.setRawMode(true); }

console.clear();
print(yellow('Hello World!'), 10, 2);
exit();
```


## List of Functions

### Control Functions

### Print Functions

### Filesystem Functions


## Further help
You can leave some comments on the project or contact [me](mailto:joel.barba.vidal@gmail.com) directly for more information.