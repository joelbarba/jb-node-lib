const { exec } = require('child_process');
const readline = require('readline');

function cmd(command) {
  return new Promise((resolve, reject) => exec(command, (error, stdout, stderr) => {
    if (error) { reject(error.message); return; }
    if (stderr) { reject(stderr); return; }
    return resolve(stdout);
  }));

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
function line(str1, pos1, str2 = '', pos2 = 0, str3 = '', pos3 = 0, str4 = '', pos4 = 0, str5 = '', pos5 = 0) {
  let arr = Array.from(Array(100)).map(_ => ' ');
  for (let t = 0; t < str1.length; t++) { arr[pos1 + t] = str1.charAt(t); }
  for (let t = 0; t < str2.length; t++) { arr[pos2 + t] = str2.charAt(t); }
  for (let t = 0; t < str3.length; t++) { arr[pos3 + t] = str3.charAt(t); }
  for (let t = 0; t < str4.length; t++) { arr[pos4 + t] = str4.charAt(t); }
  for (let t = 0; t < str5.length; t++) { arr[pos5 + t] = str5.charAt(t); }
  return arr.join('');
}

// Returns a string with 'char' repeated 'num' times
function repeat(num, char) { return Array.from(Array(num)).map(_ => char).join(''); }

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


module.exports.cmd        = cmd;
module.exports.sleep      = sleep;
module.exports.move       = move;
module.exports.print      = print;
module.exports.line       = line;
module.exports.repeat     = repeat;
module.exports.color      = color;
module.exports.setColor   = setColor;
module.exports.resetColor = resetColor;
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
