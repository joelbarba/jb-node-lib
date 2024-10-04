import process from 'process';
import readline from 'readline';
import { move, print, repeat, color } from 'jb-node-lib';

readline.emitKeypressEvents(process.stdin);
if (process.stdin.setRawMode != null) { process.stdin.setRawMode(true); }


process.stdin.on('keypress', (str, key) => {
  if (key.name === 'c' && key.ctrl) { 
    // console.clear();
    move(1, 14);
    process.exit(0); 
  }
});

console.clear();
printBox();

function printBox(x = 0, y = 0) {
  const height = 20;
  print(`┌${repeat(80, '─')}┬${repeat(30, '─')}┬${repeat(20, '─')}┐`, x, y);
  print(`└${repeat(80, '─')}┴${repeat(30, '─')}┴${repeat(20, '─')}┘`, x, y + height);
  for (let t = 1; t < height; t++) {
    print(`│${repeat(80, ' ')}│${repeat(30, ' ')}│${repeat(20, ' ')}│`, x, y + t);
  }
  // print(`├${repeat(80, '─')}┤`, x, y);
}