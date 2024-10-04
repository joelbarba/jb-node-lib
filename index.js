const readline = require('readline');

function move(x = 1, y = 1) { readline.cursorTo(process.stdout, x, y); }

function print(text = '', options) {
  const defaults = { x: null, y: null, color: '' };
  const ops = { ...defaults, ...options};
  if (ops.x !== null && ops.y === null) { readline.cursorTo(process.stdout, ops.x); }
  if (ops.x !== null && ops.y !== null) { readline.cursorTo(process.stdout, ops.x, ops.y); }
  if (ops.color) { text = color(text, ops.color, ops.effect, ops.bgColor); }
  process.stdout.write(text);
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
function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)) }


module.exports.move   = move;
module.exports.print  = print;
module.exports.color  = color;
module.exports.sleep  = sleep;
