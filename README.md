# jb-node-lib

This **node.js** library contains a set of common utility functions to build NodeJs apps.

## Instalation
The library is published on NPM, so you can easily install it with → `npm install jb-node-lib`<br/>

The library is written as a CommonJS module, so it can be imported as a **CommonJS** or **ECMAScript** Module.

### ECMAScript
```javascript
import { init, exit, cmd, sleep, dirExist, formatTime, formatSize } from 'jb-node-lib';
import { move, print, line, repeat, color, setColor, resetColor, printBox } from 'jb-node-lib';
import { black, red, green, yellow, blue, magenta, cyan, white, gray } from 'jb-node-lib';
// Remember to add "type": "module", in package.json to use ES modules

init();
print(yellow('Hello World!'), 10, 2);
exit();
```

### CommonJS
```javascript
const { init, exit, cmd, sleep, dirExist, formatTime, formatSize } = require('jb-node-lib');
const { move, print, line, repeat, color, setColor, resetColor, printBox } = require('jb-node-lib');
const { black, red, green, yellow, blue, magenta, cyan, white, gray } = require('jb-node-lib');

init();
print(yellow('Hello World!'), 10, 2);
exit();
```

## Initialization

You can simply init everything calling `init();`

Most of the character printing is done through the `process.stdout.write()` api.
The cursor is moved to any position on the terminal using `readline.cursorTo(process.stdout, x, y)`.
For this reason the library imports and uses the native resources internally.
```javascript
const { exec } = require('child_process');
const readline = require('readline');
```
If you want to use the keyboard to handle key strike events (like arrows), the `init()` function will set the `readline` and `process.stdin`:
```javascript
readline.emitKeypressEvents(process.stdin);
if (process.stdin.setRawMode != null) { process.stdin.setRawMode(true); }
```
So you cand simply listen to the event:
```javascript
init();
process.stdin.on('keypress', (str, key) => {
  if (key.name === 'c' && key.ctrl) { exit(); } // Ctrl+C stop signal
  if (key.name === 'up')     { doSomething(); }
  if (key.name === 'down')   { doSomething(); }
  if (key.name === 'return') { doSomething(); }
  if (key.name === 'space')  { doSomething(); }
  if (key.name === 'escape') { doSomething(); }
});
```


## List of Functions
The library exports functions of different purposes, although it focuses on printing elements on a terminal.

- [`init()`](#init)       → It initializes the readline and process stdin for keyboard event handling.
- [`exit()`](#exit)         → Terminates the process (`process.exit(0)`) and moves the cursor to the last line.
- [`cmd()`](#cmd)           → Use it to run a terminal command within the app.
- [`sleep()`](#sleep)       → Async function to await N milliseconds.
- [`move()`](#move)         → Move the cursor to a given position in the terminal.
- [`print()`](#print)       → Prints a string to a given position in the terminal.
- [`line()`](#line)         → Prints 1 or more strings on different positions of the same line.
- [`repeat()`](#repeat)     → It returns a string repeating the given char N times.
- [`color()`](#color)       → It returns the same string but wrapped with the control chars to print it colored.
- [`setColor()`](#setcolor)     → It prints a color control char, so every print after is done in that color.
- [`resetColor()`](#resetcolor) → Resets the current color to the default (after a setColor).
- [`printBox()`](#printbox)     → It prints a line box to the given position, with additional colomns inside.
- [`dirExist()`](#direxist)     → Validates whether a directory exists (true) or not (false).
- [`pad()`](#pad)               → A shortcut for `.padStart()` left padding.
- [`formatTime()`](#formattime) → It returns a string with a formated time.
- [`formatSize()`](#formatsize) → It returns a string with a formated file size (KB, MB, GB...)
- [`color functions`](#color-functions)` → Shortcuts for coloring text strings.


<hr>

### init()
```javascript
function init(clear = true): void

// Example:
init();
```
This function initializes the readline and process.stdin so you can use the keyboard to handle key strike events.<br/>
It also clears all the characters on the terminal by default. You can opt out passing the `clear = false` parameter.

<hr>

### exit()
```javascript
function exit(clear = false): void

// Example:
exit();
```
This function terminates the process with `process.exit(0)` and moves the cursor to the last line.
It doesn't clears all the characters on the terminal by default, but you can pass `clear = true` to do it.

<hr>

### cmd()        
```javascript
function cmd(command: string): Promise<stdout>

// Example:
await cmd(`rm -rf ${file.path}`);
```
Use it to run a terminal command within the app.
It uses the `exec` api to run the command, so it returns a promise when that is completed/error.

<hr>

### sleep()      
```javascript
function sleep(ms: number): Promise<void>

// Example:
await sleep(3000);
```
Async function to await N milliseconds.

<hr>

### move()       
```javascript
function move(x = 1, y = 1): void

// Example:
move(30, 5);
```
Move the cursor to a given position in the terminal.

<hr>

### print()      
```javascript
function print(text: string, posX ?: number, posY ?: number, color ?: string): void

// Example:
print('Hello World!');
print('Hello World!', 10, 3, 'yellow');
```
Prints the string `text` to a given position `posX, posY` in the terminal.<br/>
It does not break the line. The next print will continue from the current cursor position (if not provided).<br/>
You can also add the `color` of the text (See [colors palette](#color-palette)).

<hr>

### line()
```javascript
function line([..., strN: string, posN: number]): void

// Example:
line('Player1: 00   Player2: 00   Player3: 00', 0);
line('99', 10, '99', 24, '99', 38); // It only prints the values
```
Prints multiple strings onto the same line, in different positions.<br/>
`args` should be pairs of strings and numbers, like: line('hello', 3, 'bye', 15, 'end', 50);

<hr>

### repeat()
```javascript
function repeat(num: number, char: string): string

// Example:
repeat(10, '-'); // Returns: ----------
```
Returns a string with 'char' repeated 'num' times

<hr>

### color()
```javascript
function color(text: string, color = 'green', effect = 'bright', bgColor = ''): string

// Example:
print(color('This text is green', 'green'), 1, 1);
print(color('This text is green bg blinking text', 'white', 'blink', 'green'), 1, 2);
```
It returns the same string but wrapped with the control chars to print it colored.
- 2nd argument (`color`) → Text color
- 3rd argument (`effect`) → Text effect 
- 4th argument (`bgColor`) → Background color

Colors: `black`, `red`, `green`, `yellow`, `blue`, `magenta`, `cyan`, `white`, `gray` <br/>
Effects: `bright`, `dim`, `underscore`, `blink`, `reverse`, `hidden`

There is a set of [shortcut functions for every color](#color-functions).

See [colors palette](#color-palette) for more.

<hr>

### setColor()
```javascript
function setColor(color = 'green', effect = 'bright', bgColor = ''): string

// Example:
setColor('green');  // Returns `\x1b[32m`
print('This text is green');
resetColor();       // Returns `\x1b[0m`
print('This text is white default');
```
It prints a color control char, so every print after is done in that color.<br/>
See [colors palette](#color-palette) for more.

<hr>

### resetColor() 
```javascript
function resetColor(): void

// Example:
setColor('green');  // Returns `\x1b[32m`
print('This text is green');
resetColor();       // Returns `\x1b[0m`
print('This text is white default');
```
Resets the current color to the default (after a `setColor()`).<br/>
See [colors palette](#color-palette) for more.

<hr>

### printBox()   
```javascript
function printBox(posX = 0, posY = 0, width = 80, height = 20, cols = []): void;

// Example:
printBox(1, 1, 30, 7, [7, 15]);   
// ┌──────┬───────┬───────────────┐
// │      │       │               │
// │      │       │               │
// └──────┴───────┴───────────────┘
// 1      7       15             31
```
It prints a line box to the given position, with additional colomns inside.

<hr>

### dirExist()
```javascript
function dirExist(fullPath: string): boolean;

// Example:
dirExist(`/home/barba/testDir`);
```
Validates whether a directory exists (true) or not (false).
It uses `try`/`catch`, so it can be expensive in terms of performance (use it accordingly).

<hr>

### pad() 
```javascript
function pad(text: string, size = 1, char = '0'): string;

// Example:
pad(25, 4, '0'); // = 0025
```
A shortcut for left padding `.padStart()`.

<hr>

### formatTime() 
```javascript
function formatTime(ms: number): string;

// Example:
print(`Time (mm:ss) = ` + formatTime(160*1000)); // Time = 02:40
```
It returns a string with a formated time (minutes and seconds).<br/>
It doesn't account hours.

<hr>

### formatSize() 
```javascript
function formatSize(bytes = 0): string;

// Example:
print(`Size = ` + formatSize(160220)); // Size = 156.4 KB
print(`1 Byte = ` + formatSize(1)); // Size = 1 B
```
It returns a string with a formated file size (KB, MB, GB...)

<hr>

## Color Functions
There is a set of color shortcut functions for every of the 9 colors, so you can improve verbosity:
```javascript
black('Hello');       // = print(color('Hello', 'black'));
red('Hello');         // = print(color('Hello', 'red'));
green('Hello');       // = print(color('Hello', 'green'));
yellow('Hello');      // = print(color('Hello', 'yellow'));
blue('Hello');        // = print(color('Hello', 'blue'));
magenta('Hello');     // = print(color('Hello', 'magenta'));
cyan('Hello');        // = print(color('Hello', 'cyan'));
white('Hello');       // = print(color('Hello', 'white'));
gray('Hello');        // = print(color('Hello', 'gray'));
```

## Color Palette
There is a palette of 9 different colors you can use to print text:
```javascript
print(color('This text is black',   'black'),   1, 1);
print(color('This text is red',     'red'),     1, 2);
print(color('This text is green',   'green'),   1, 3);
print(color('This text is yellow',  'yellow'),  1, 4);
print(color('This text is blue',    'blue'),    1, 5);
print(color('This text is magenta', 'magenta'), 1, 6);
print(color('This text is cyan',    'cyan'),    1, 7);
print(color('This text is white',   'white'),   1, 8);
print(color('This text is gray',    'gray'),    1, 9);
```

![Screenshot of the main list](./colors-vscode.png)
<!-- ![Screenshot of the main list](./colors-terminal.png) -->

You can also use **background** colors, and 6 different effects:
- bright (default, means bold, not lighter)
- dim
- underscore
- blink
- reverse
- hidden





## Further help
You can leave some comments on the project or contact [me](mailto:joel.barba.vidal@gmail.com) directly for more information.
