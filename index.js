const { exec } = require('child_process');
const { clear } = require('console');
const { title } = require('process');
const readline = require('readline');

function cmd(command) {
  return new Promise((resolve, reject) => exec(command, (error, stdout, stderr) => {
    if (error) { reject(error.message); return; }
    if (stderr) { reject(stderr); return; }
    return resolve(stdout);
  }));
}

function init(clear = true) {
  readline.emitKeypressEvents(process.stdin);
  if (process.stdin.setRawMode != null) { process.stdin.setRawMode(true); }
  if (clear) { console.clear(); }
}

function exit(clear = false) {
  let bottomLine = process.stdout.rows;
  if (clear) {
    console.clear();
    bottomLine = 0;
  }
  move(0, bottomLine);
  process.exit(0); 
}


function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)) }

function move(x = 1, y = 1) { readline.cursorTo(process.stdout, x, y); }

function print(text = '', x, y, color) {
  if (x !== null && y === null) { readline.cursorTo(process.stdout, x); }
  if (x !== null && y !== null) { readline.cursorTo(process.stdout, x, y); }
  if (color) { text = colorFn(text, color); }
  process.stdout.write(text);
}

// Joins multiple strings into one, each on its specific position.
// args should be pairs of strings and numbers.
// Ex: line('hello', 3, 'bye', 15, 'end', 20); = '   hello       bye     end'
function line(...args) { // str1, pos1, ... strN, posN
  const str = args.filter((v,i) => !(i % 2)); // strings to print
  const pos = args.filter((v,i) => (i % 2));  // positions where to print them
  if (str.length > pos.length) { pos.push(str.at(-1).length + pos.at(-1)); }
  let width = Math.max(...pos.map((p, i) => p + str[i].length));  
  let arr = Array.from(Array(width)).map(_ => ' ');
  for (let q = 0; q < str.length; q++) { 
    for (let t = 0; t < str[q].length; t++) { arr[pos[q] + t] = str[q].charAt(t); }
  }
  return arr.join('');
}

// Returns a string with 'char' repeated 'num' times
function repeat(num, char) { return Array.from(Array(num)).map(_ => char).join(''); }


// Example: printBox(30, 3, 100, 15, [20, 50, 70]);
function printBox(posX = 0, posY = 0, width = 80, height = 20, cols = []) {
  print(`┌${repeat(width, '─')}┐`, posX, posY);
  print(`└${repeat(width, '─')}┘`, posX, posY + height);
  for (let t = 1; t < height; t++) {
    print(`│`, posX, posY + t);
    print(`│`, posX + width + 1, posY + t);
  }
  cols.forEach(col => {
    print(`┬`, posX + col, posY);
    print(`┴`, posX + col, posY + height);
    for (let t = 1; t < height; t++) {
      print(`│`, posX + col, posY + t);
    }
  });
}

const reset = `\x1b[0m`;
const allEffects = {
  bright     : `\x1b[1m`,
  dim        : `\x1b[2m`,
  underscore : `\x1b[4m`,
  blink      : `\x1b[5m`,
  reverse    : `\x1b[7m`,
  hidden     : `\x1b[8m`,
}
const allColors = {
  black   : `\x1b[30m`,  bg_black:   '\x1b[40m',
  red     : `\x1b[31m`,  bg_red:     '\x1b[41m',
  green   : `\x1b[32m`,  bg_green:   '\x1b[42m',
  yellow  : `\x1b[33m`,  bg_yellow:  '\x1b[43m',
  blue    : `\x1b[34m`,  bg_blue:    '\x1b[44m',
  magenta : `\x1b[35m`,  bg_magenta: '\x1b[45m',
  cyan    : `\x1b[36m`,  bg_cyan:    '\x1b[46m',
  white   : `\x1b[37m`,  bg_white:   '\x1b[47m',
  gray    : `\x1b[90m`,  bg_gray:    '\x1b[100m',
};
const colorFn = color;
function color(text, color = 'green', effect = 'bright', bgColor = '') {
  const effectCodes = effect.split(' ').map(eff => allEffects[eff] || '').join('');
  return `${effectCodes}${allColors[color] || ''}${allColors['bg_' + bgColor] || ''}${text}${reset}`;
}

function setColor(color = 'green', effect = 'bright', bgColor = '') {
  const effectCodes = effect.split(' ').map(eff => allEffects[eff] || '').join('');
  let code = '';
  if (effect)  { code += (effectCodes || ''); }
  if (color)   { code += (allColors[color] || ''); }
  if (bgColor) { code += (allColors['bg_' + bgColor] || ''); }
  process.stdout.write(code);
}
function resetColor() {
  process.stdout.write(reset);
}




function dirExist(fullPath) { // Check if a directory exists
  try {
    if (fs.existsSync(fullPath)) { return true; }
  } catch(err) { return false; }
}

function pad(text = '', size = 1, char = '0') {
  return String(text).padStart(size, char);
}

function formatTime(ms) {
  if (ms < 1000) { return `00:00`; }
  if (ms < 60000) {
    const sec = Math.round(ms / 1000);
    return `00:${pad(sec, 2, '0')}`;
  }
  const min = Math.floor(ms / 60000);
  const sec = Math.round((ms - (min * 60000)) / 1000);
  return `${pad(min, 2, '0')}:${pad(sec, 2, '0')}`;
  // return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

function formatSize(size = 0) {
  const KB = Math.pow(1024, 1);
  const MB = Math.pow(1024, 2);
  const GB = Math.pow(1024, 3);
  if (size < KB) { return `${size}  B`; }
  if (size < MB) { return `${Math.floor(10 * size / KB) / 10} KB`; }
  if (size < GB) { return `${Math.floor(10 * size / MB) / 10} MB`; }
  return `${Math.floor(10 * size / GB) / 10} GB`;
}


function setKeyboard(keyPress = (str, key) => {}) {
  const keyboard = {
    keyPress: keyPress,
    enable: true,
    maps: [],
    clear() { this.maps = []; },
    pushKeyMap(map) { this.maps.push(map); },
    pop() { this.maps.pop(); },
    disable() { this.enable = false; },
    enable()  { this.enable = true; },
    onKeyPress(callbackFn) { this.keyPress = callbackFn; },
  };
  process.stdin.on('keypress', (str, key) => {
    (function() {
      const keyMap = keyboard.maps[keyboard.maps.length - 1];
      if (!keyboard.enable) { return; }
      if (key.name === 'c' && key.ctrl) { return exit(); }
      if (key.name === 'up')      { return keyMap.keyUp    && keyMap.keyUp(); }
      if (key.name === 'down')    { return keyMap.keyDown  && keyMap.keyDown(); }
      if (key.name === 'return')  { return keyMap.keyEnter && keyMap.keyEnter(); }
      if (key.name === 'space')   { return keyMap.keySpace && keyMap.keySpace(); }
      if (key.name === 'escape')  { return keyMap.keyEsc   && keyMap.keyEsc(); }
      if (keyMap[key.name])       { return keyMap[key.name](); }
    }());
    keyboard.keyPress(str, key);
  });
  return keyboard;
}

function createMenu(menuOps = [], posX = 0, posY = 0, defaultSel = 0) {
  const printOp = (ind, title, selected) => {
    const opNum = (ind + 1) + '.';
    let cursor = `    `;
    let opTxt = line(opNum, 0, title, 4);
    if (selected) { 
      cursor = color(`-->`, 'yellow');
      opTxt = color(opTxt, 'white', 'bright', 'yellow');
    }
    print(cursor, posX,     posY + ind);
    print(opTxt,  posX + 5, posY + ind);
  }
  const menu = {
    ops: menuOps, // [ ...{ code, title }]
    sel: defaultSel, // selected option index
    print() {
      this.ops.forEach((op, ind) => {
        printOp(ind, op.title, this.sel === ind);
      });
      this.move();
    },
    move(sel = this.sel) {
      if (sel < 0 || sel >= this.ops.length) { return; }
      printOp(this.sel, this.ops[this.sel].title, false); // unselect previous
      this.sel = sel;
      printOp(this.sel, this.ops[this.sel].title, true); // select new
      move(posX + 4, posY + this.sel);
    },
    prev() { this.move(this.sel - 1); },
    next() { this.move(this.sel + 1); },
    currOp(sel = this.sel) { // Select current option: return ops[sel]
      if (sel < 0 || sel >= this.ops.length) { return; }
      return this.ops[sel];
    }
  };
  menu.print();
  return menu;
}




module.exports.init        = init;
module.exports.exit        = exit;
module.exports.cmd         = cmd;
module.exports.sleep       = sleep;
module.exports.move        = move;
module.exports.print       = print;
module.exports.line        = line;
module.exports.repeat      = repeat;
module.exports.color       = color;
module.exports.setColor    = setColor;
module.exports.resetColor  = resetColor;
module.exports.printBox    = printBox;
module.exports.dirExist    = dirExist;
module.exports.pad         = pad;
module.exports.formatTime  = formatTime;
module.exports.formatSize  = formatSize;
module.exports.setKeyboard = setKeyboard;
module.exports.createMenu  = createMenu;
module.exports.black       = function(text) { return color(text, 'black'   ); };
module.exports.red         = function(text) { return color(text, 'red'     ); };
module.exports.green       = function(text) { return color(text, 'green'   ); };
module.exports.yellow      = function(text) { return color(text, 'yellow'  ); };
module.exports.blue        = function(text) { return color(text, 'blue'    ); };
module.exports.magenta     = function(text) { return color(text, 'magenta' ); };
module.exports.cyan        = function(text) { return color(text, 'cyan'    ); };
module.exports.white       = function(text) { return color(text, 'white'   ); };
module.exports.gray        = function(text) { return color(text, 'gray'    ); };
