const { exec } = require('child_process');
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

// Prints multiple strings onto the same line, in different positions
// args should be pairs of strings and numbers, like: line('hello', 3, 'bye', 15, 'end', 50);
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
    print(`│${repeat(width, ' ')}│`, posX, posY + t);
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

function pad(text = '', size, char = '0') {
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





module.exports.init       = init;
module.exports.exit       = exit;
module.exports.cmd        = cmd;
module.exports.sleep      = sleep;
module.exports.move       = move;
module.exports.print      = print;
module.exports.line       = line;
module.exports.repeat     = repeat;
module.exports.color      = color;
module.exports.setColor   = setColor;
module.exports.resetColor = resetColor;
module.exports.printBox   = printBox;
module.exports.red        = function(text) { return color(text, 'red'    ); };
module.exports.green      = function(text) { return color(text, 'green'  ); };
module.exports.yellow     = function(text) { return color(text, 'yellow' ); };
module.exports.blue       = function(text) { return color(text, 'blue'   ); };
module.exports.gray       = function(text) { return color(text, 'white', 'dim'); };
module.exports.grayDark   = function(text) { return color(text, 'gray'   ); };
module.exports.cyan       = function(text) { return color(text, 'cyan'   ); };
module.exports.black      = function(text) { return color(text, 'black',  ''); };
module.exports.brown      = function(text) { return color(text, 'yellow', ''); };
module.exports.white      = function(text) { return color(text, 'white'  ); };
module.exports.dirExist = dirExist;
module.exports.pad        = pad;
module.exports.formatTime = formatTime;
module.exports.formatSize = formatSize;
