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
let pos = 1;
const opts = [
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
  keyUp   : () => { if (pos > 1) { pos--; printMenu(); } },
  keyDown : () => { if (pos < opts.length) { pos++; printMenu(); } },
  keyEnter: () => { selectMainMenuOption(opts[pos-1]); },
});

function printMenu() {  
  print(`Select Option:`, 0, 0);
  print(`Raspberry Pi IP = ` + green(ip), 25, 0);
  for (let t = 0; t < opts.length; t++) {
    const opt = opts[t];
    let txt = line((t+1) + '.', 5, opt.title, 9, opt.com(), 25, opt.desc, 75);
    if (pos === t + 1) { txt = color(txt, 'white', 'bright', 'yellow'); }
    print(txt, 0, t + 2);
  }

  print(yellow(`--> `), 0, pos + 1);
}






const top = opts.length + 5;
async function selectMainMenuOption(opt) {
  for (let t = 0; t < 20; t++) { print(repeat(maxWidth, ' '), 0, opts.length + 5 + t); } // Clear screen
  print(yellow(opt.com()), 0, top);
  move(0, top + 1);
  keyboard.push({}); // Disable menu
  if (opt.code === 'start')       { await deatachXTerm('start'); }
  if (opt.code === 'stop')        { await terminateSH(); }
  if (opt.code === 'pingPi')      { await pingPi();  }
  if (opt.code === 'pingApp')     { await pingApp(); }
  if (opt.code === 'scan')        { await scanIPs(); }
  if (opt.code === 'check')       { await checkMain(); }
  if (opt.code === 'activate')    { await activation('activate'); }
  if (opt.code === 'deactivate')  { await activation('deactivate'); }
  if (opt.code === 'update')      { await updateSH(``); }
  if (opt.code === 'killAll')     { await killAllXTerm(); }
  if (opt.code === 'shutdown')    { await shutDown(); }
  if (opt.code === 'tail')        { await deatachXTerm('tail'); }
  if (opt.code === 'ssh')         { await deatachXTerm('ssh'); }
  keyboard.pop(); // Back to main menu keyboard
  printMenu();
}




async function pingPi() {
  const res = await cmd(`ping -c 1 ${ip} | head -2`);
  if (res.indexOf(`Destination Host Unreachable`) >= 0) {
    print(red(res), 0, top + 2);
  } else {
    print(green(res), 0, top + 2);
  }
  // PING 192.168.1.132 (192.168.1.132) 56(84) bytes of data.                                            
  // OK = 64 bytes from 192.168.1.132: icmp_seq=1 ttl=64 time=62.4 ms 
  // KO = From 192.168.1.137 icmp_seq=1 Destination Host Unreachable       
}

async function pingApp() {
  return cmd(`curl -s -X GET http://${ip}:4358/ping`).then(res => {
    print(green(res + ': The main.js process is running on the Raspberry Pi'), 0, top + 2);
  }).catch(err => {
    print(red(err), 0, top + 2);
  });
}

async function activation(verb) {
  return cmd(`curl -s -X GET http://${ip}:4358/${verb}`).then(res => {
    print('The Alarm is now: ' + green(res), 0, top + 2);
  }).catch(err => {
    print(red(err), 0, top + 2);
  });
}

async function scanIPs() {
  // print(yellow(`nmap -sn 192.168.1.0/24 ...`), 0, top);
  const res = await cmd(`nmap -sn 192.168.1.0/24 | grep "scan report"`);
  let ips = []; // Nmap scan report for 192.168.1.128
  res.split(`\n`).filter(r => !!r).forEach(r => {
    const ip = r.split('Nmap scan report for ')[1];
    if (ip && ip.split('.').every(n => n.length <= 3)) { ips.push(ip); }
  });

  let sel = 0;
  print(`The following IPs are detected on the local network. Select one (${cyan('Enter')})`, 0, top + 1);
  print(`or press ${cyan('t')} to test a curl -X GET http://$ip:4358/ping on the IP`, 0, ips.length + 4);
  printIps();
  function printIps() {
    for (let t = 0; t < ips.length; t++) {
      let txt = ips[t];
      if (t === sel) { txt = color(ips[t], 'white', 'bright', 'yellow'); }
      print('     ' + txt, 2, top + 4 + t);
    }
    print('-->', 2, top + 4 + sel);
  }
  keyboard.push({
    keyUp   : () => { if (sel > 0)          { sel--; printIps(); } },
    keyDown : () => { if (sel < ips.length) { sel++; printIps(); } },
    keyEnter: () => {
      ip = ips[sel];
      fs.writeFileSync(LAST_IP_FILE, ip);
      print(` <-- Selected`, 25, top + 4 + sel);
      release();
    },
    ['t']: async () => {
      print(`curl -X GET http://${ips[sel]}:4358/ping`, 25, top + 4 + sel);
      cmd(`curl -s -X GET http://${ips[sel]}:4358/ping`).then(res => {
        print(green(res) + repeat(80, ' '), 25, top + 4 + sel);
        printIps();
      }).catch(err => {
        print(red(err), 25, top + 4 + sel);
        if (sel < ips.length) { sel++ }
        printIps();
      });
    },
  });
  let release = () => {};
  await new Promise((resolve) => release = resolve);
  keyboard.pop(); // Back to main menu
}

