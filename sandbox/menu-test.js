const { init, exit, cmd, sleep, dirExist, formatTime, formatSize } = require('../index.js');
const { move, print, line, repeat, color, setColor, resetColor, printBox } = require('../index.js');
const { black, red, green, yellow, blue, magenta, cyan, white, gray } = require('../index.js');
const { setKeyboard, createMenu } = require('../index.js');

init();

const keyboard = setKeyboard();
// const keyboard = setKeyboard((str, key) => print(`You pressed: ${key.name}`, 60, 0));
// const keyboard = setKeyboard((str, key) => print(`menu.sel = ${menu.sel}`, 60, 0));

const mainMenu = createMenu([
  { code: 'op1', title: `Option 1` },
  { code: 'op2', title: `Option 2` },
  { code: 'op3', title: `Option 3` },
  { code: 'op4', title: `Option 4` },
  { code: 'op5', title: `Option 5` },
  { code: 'op6', title: `Option 6` },
  { code: 'op7', title: `Option 7` },
  { code: 'op8', title: `Option 8 (with suboptions)` },
], 3, 3);

mainMenu.setMenu = () => {
  printBox(1, 1, 40, 11);
  print(`Select Option:`, 1, 1);
  mainMenu.print();
  keyboard.pushKeyMap({
    keyEsc:   () => { exit(); },
    keyUp   : () => { mainMenu.prev(); },
    keyDown : () => { mainMenu.next(); },
    keyEnter: () => { selectMainMenuOption(mainMenu.currOp()); },
  });
}

mainMenu.setMenu();

async function selectMainMenuOption(opt) {
  keyboard.pop();
  let top = mainMenu.ops.length + 5;
  print(opt.code + ' selected', 0, top);
  if (opt.code === 'op1')   { /* ... */ }
  if (opt.code === 'op2')   { /* ... */ }
  if (opt.code === 'op3')   { /* ... */ }
  if (opt.code === 'op4')   { /* ... */ }
  if (opt.code === 'op5')   { /* ... */ }
  if (opt.code === 'op6')   { /* ... */ }
  if (opt.code === 'op7')   { /* ... */ }
  if (opt.code === 'op8')   { await subMenu(top); }
  mainMenu.setMenu();
}


async function subMenu(top = 0) {
  let release = () => {};
  const subMenu = createMenu([
    { code: 'sop1', title: `Sub Option 1` },
    { code: 'sop2', title: `Sub Option 2` },
    { code: 'sop3', title: `Sub Option 3` },
    { code: 'sop4', title: `Sub Option 4` },
  ], 2, top + 5);

  subMenu.setMenu = () => {
    print(`This is a submenu. Select one (${cyan('Enter')})`, 0, top + 1);
    subMenu.print();
    keyboard.pushKeyMap({
      keyEsc:   () => { release(); },
      keyUp   : () => { subMenu.prev(); },
      keyDown : () => { subMenu.next(); },
      keyEnter: () => { 
        print(` <-- Selected`, 25, top + 5 + subMenu.sel);
        release();
      },
    });
  }  
  subMenu.setMenu();
  await new Promise((resolve) => release = resolve);
}


