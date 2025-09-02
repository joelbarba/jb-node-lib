// import { init, exit, cmd, sleep, dirExist, formatTime, formatSize, pad } from 'jb-node-lib';
// import { move, print, line, repeat, color, setColor, resetColor, printBox } from 'jb-node-lib';
// import { black, red, green, yellow, blue, magenta, cyan, white, gray } from 'jb-node-lib';
const { init, exit, cmd, sleep, dirExist, formatTime, formatSize } = require('../index.js');
const { move, print, line, repeat, color, setColor, resetColor, printBox } = require('../index.js');
const { black, red, green, yellow, blue, magenta, cyan, white, gray } = require('../index.js');


init();


print(`color('', '` + color('black',   'black') + `') ------>  ` + color('This text is black',   'black'),   1, 1);
print(`color('', '` + color('red',     'red') + `') -------->  ` + color('This text is red',     'red'),     1, 2);
print(`color('', '` + color('green',   'green') + `') ------>  ` + color('This text is green',   'green'),   1, 3);
print(`color('', '` + color('yellow',  'yellow') + `') ----->  ` + color('This text is yellow',  'yellow'),  1, 4);
print(`color('', '` + color('blue',    'blue') + `') ------->  ` + color('This text is blue',    'blue'),    1, 5);
print(`color('', '` + color('magenta', 'magenta') + `') ---->  ` + color('This text is magenta', 'magenta'), 1, 6);
print(`color('', '` + color('cyan',    'cyan') + `') ------->  ` + color('This text is cyan',    'cyan'),    1, 7);
print(`color('', '` + color('white',   'white') + `') ------>  ` + color('This text is white',   'white'),   1, 8);
print(`color('', '` + color('gray',    'gray') + `') ------->  ` + color('This text is gray',    'gray'),    1, 9);

print(`color('', 'white', '', '` + color('black',   'white', '', 'black') + `') ------>  ` + color(' This text has background black ',   'white', '', 'black'),   60,  1);
print(`color('', 'white', '', '` + color('red',     'white', '', 'red') + `') -------->  ` + color(' This text has background black ',   'white', '', 'red'),     60,  2);
print(`color('', 'white', '', '` + color('green',   'white', '', 'green') + `') ------>  ` + color(' This text has background black ',   'white', '', 'green'),   60,  3);
print(`color('', 'white', '', '` + color('yellow',  'white', '', 'yellow') + `') ----->  ` + color(' This text has background black ',   'white', '', 'yellow'),  60,  4);
print(`color('', 'white', '', '` + color('blue',    'white', '', 'blue') + `') ------->  ` + color(' This text has background black ',   'white', '', 'blue'),    60,  5);
print(`color('', 'white', '', '` + color('magenta', 'white', '', 'magenta') + `') ---->  ` + color(' This text has background black ',   'white', '', 'magenta'), 60,  6);
print(`color('', 'white', '', '` + color('cyan',    'white', '', 'cyan') + `') ------->  ` + color(' This text has background black ',   'white', '', 'cyan'),    60,  7);
print(`color('', 'white', '', '` + color('white',   'white', '', 'white') + `') ------>  ` + color(' This text has background black ',   'white', '', 'white'),   60,  8);
print(`color('', 'white', '', '` + color('gray',    'white', '', 'gray') + `') ------->  ` + color(' This text has background black ',   'white', '', 'gray'),    60,  9);

print(`This is ` + black('black();'),     150,  1);
print(`This is ` + red('red();'),         150,  2);
print(`This is ` + green('green();'),     150,  3);
print(`This is ` + yellow('yellow();'),   150,  4);
print(`This is ` + blue('blue();'),       150,  5);
print(`This is ` + magenta('magenta();'), 150,  6);
print(`This is ` + cyan('cyan();'),       150,  7);
print(`This is ` + white('white();'),     150,  8);
print(`This is ` + gray('gray();'),       150,  9);

print(color(`This is color('', 'black',   'dim');`,    'black', 'bright dim'), 180, 1);
print(color(`This is color('', 'red',     'dim');`,      'red', 'bright dim'), 180, 2);
print(color(`This is color('', 'green',   'dim');`,    'green', 'bright dim'), 180, 3);
print(color(`This is color('', 'yellow',  'dim');`,   'yellow', 'bright dim'), 180, 4);
print(color(`This is color('', 'blue',    'dim');`,     'blue', 'bright dim'), 180, 5);
print(color(`This is color('', 'magenta', 'dim');`,  'magenta', 'bright dim'), 180, 6);
print(color(`This is color('', 'cyan',    'dim');`,     'cyan', 'bright dim'), 180, 7);
print(color(`This is color('', 'white',   'dim');`,    'white', 'bright dim'), 180, 8);
print(color(`This is color('', 'gray',    'dim');`,     'gray', 'bright dim'), 180, 9);

// const variants = (colorName, row) => {
//   let cFn = txt => txt;
//   cFn = (txt) => color(txt, colorName, 'dim');    print(`color('', '` + cFn(colorName) + `', '` + cFn('dim')    + `') ------>  ` + cFn(`This text is ${colorName} dim`),      60, row);
//   cFn = (txt) => color(txt, colorName, 'bright'); print(`color('', '` + cFn(colorName) + `', '` + cFn('bright') + `') ------>  ` + cFn(`This text is ${colorName} bright`),   135, row);
// }
// variants('black',   1);
// variants('red',     2);
// variants('green',   3);
// variants('yellow',  4);
// variants('blue',    5);
// variants('magenta', 6);
// variants('cyan',    7);
// variants('white',   8);
// variants('gray',    9);



print(`color('', 'green') ------------------> ` + color('This text is default   ', 'green'),               1, 12 + 0);
print(`color('', 'green', 'bright') --------> ` + color('This text is bright    ', 'green', 'bright'),     1, 12 + 1);
print(`color('', 'green', 'dim') -----------> ` + color('This text is dim       ', 'green', 'dim'),        1, 12 + 2);
print(`color('', 'green', 'underscore') ----> ` + color('This text is underscore', 'green', 'underscore'), 1, 12 + 3);
print(`color('', 'green', 'blink') ---------> ` + color('This text is blink     ', 'green', 'blink'),      1, 12 + 4);
print(`color('', 'green', 'reverse') -------> ` + color('This text is reverse   ', 'green', 'reverse'),    1, 12 + 5);
print(`color('', 'green', 'hidden') --------> ` + color('This text is hidden    ', 'green', 'hidden'),     1, 12 + 6);






exit();



// const allColors = {
//   black   : `\x1b[30m`,  bg_black:   '\x1b[40m',
//   red     : `\x1b[31m`,  bg_red:     '\x1b[41m',
//   green   : `\x1b[32m`,  bg_green:   '\x1b[42m',
//   yellow  : `\x1b[33m`,  bg_yellow:  '\x1b[43m',
//   blue    : `\x1b[34m`,  bg_blue:    '\x1b[44m',
//   magenta : `\x1b[35m`,  bg_magenta: '\x1b[45m',
//   cyan    : `\x1b[36m`,  bg_cyan:    '\x1b[46m',
//   white   : `\x1b[37m`,  bg_white:   '\x1b[47m',
//   gray    : `\x1b[90m`,  bg_gray:    '\x1b[100m',
// };
// const allEffects = {
//   bright     : `\x1b[1m`,
//   dim        : `\x1b[2m`,
//   underscore : `\x1b[4m`,
//   blink      : `\x1b[5m`,
//   reverse    : `\x1b[7m`,
//   hidden     : `\x1b[8m`,
// }