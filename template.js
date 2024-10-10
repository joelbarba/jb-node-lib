import process from 'process';
import readline from 'readline';
import { cmd, sleep, move, print, line, repeat, color } from 'jb-node-lib';
import { red, green, yellow, blue, gray, grayDark, cyan, black, brown, white } from 'jb-node-lib';


readline.emitKeypressEvents(process.stdin);
if (process.stdin.setRawMode != null) { process.stdin.setRawMode(true); }

const keyboard = [];
process.stdin.on('keypress', (str, key) => {
  if (key.name === 'c' && key.ctrl) { exit(); }
  const keys = keyboard[keyboard.length - 1];
  if (key.name === 'up')     { return keys.keyUp    && keys.keyUp(); }
  if (key.name === 'down')   { return keys.keyDown  && keys.keyDown(); }
  if (key.name === 'return') { return keys.keyEnter && keys.keyEnter(); }
  if (key.name === 'space')  { return keys.keySpace && keys.keySpace(); }
  if (key.name === 'escape')  { return keys.keyEsc  && keys.keyEsc(); }
  if (keys[key.name]) { keys[key.name](); }
});
function exit() {
  // console.clear();
  move(0, 20);
  process.exit(0); 
}

const maxWidth = 100;
let pos = 0;
const menu = [
  { code: 'op1', title: `Option 1` },
  { code: 'op2', title: `Option 2` },
  { code: 'op3', title: `Option 3` },
  { code: 'op4', title: `Option 4` },
  { code: 'op5', title: `Option 5` },
  { code: 'op6', title: `Option 6` },
  { code: 'op7', title: `Option 7` },
  { code: 'op8', title: `Option 8` },
];

console.clear();


printMenu();
keyboard.push({
  keyUp   : () => { if (pos > 0) { pos--; printMenu(); } },
  keyDown : () => { if (pos < menu.length - 1) { pos++; printMenu(); } },
  keyEnter: () => { selectMainMenuOption(menu[pos]); },
});

function printMenu() {  
  print(`Select Option:`, 0, 0);
  for (let t = 0; t < menu.length; t++) {
    const option = menu[t];
    let txt = line((t+1) + '.', 5, option.title, 9);
    if (pos === t) { txt = color(txt, 'white', 'bright', 'yellow'); }
    print(txt, 1, t + 2);
  }
  print(yellow(`--> `), 1, pos + 2);
}


let top = menu.length + 5;
async function selectMainMenuOption(opt) {
  for (let t = 0; t < 20; t++) { print(repeat(maxWidth, ' '), 0, menu.length + 5 + t); } // Clear screen
  print(opt.code + ' selected', 0, top);
  move(0, top + 1);
  keyboard.push({}); // Disable menu
  if (opt.code === 'op1')   { /* ... */ }
  if (opt.code === 'op2')   { /* ... */ }
  if (opt.code === 'op3')   { /* ... */ }
  if (opt.code === 'op4')   { /* ... */ }
  if (opt.code === 'op5')   { /* ... */ }
  if (opt.code === 'op6')   { /* ... */ }
  if (opt.code === 'op7')   { /* ... */ }
  if (opt.code === 'op8')   { await subMenu(); }
  keyboard.pop(); // Back to main menu keyboard
  printMenu();
}

async function subMenu() {
  let pos2 = 0;
  print(`This is a submenu. Select one (${cyan('Enter')})`, 0, top + 1);
  const subMenu = [
    { code: 'sop1', title: `Sub Option 1` },
    { code: 'sop2', title: `Sub Option 2` },
    { code: 'sop3', title: `Sub Option 3` },
    { code: 'sop4', title: `Sub Option 4` },
  ];
  function printSubMenu() {
    for (let t = 0; t < subMenu.length; t++) {
      let txt = subMenu[t].title;
      if (t === pos2) { txt = color(txt, 'white', 'bright', 'yellow'); }
      print('     ' + txt, 2, top + 4 + t);
    }
    print('-->', 2, top + 4 + pos2);
  }
  printSubMenu();
  keyboard.push({
    keyUp   : () => { if (pos2 > 0)                  { pos2--; printSubMenu(); } },
    keyDown : () => { if (pos2 < subMenu.length - 1) { pos2++; printSubMenu(); } },
    keyEnter: () => {
      print(` <-- Selected`, 25, top + 4 + pos2);
      release();
    },
  });
  let release = () => {};
  await new Promise((resolve) => release = resolve);
  keyboard.pop(); // Back to main menu
}

