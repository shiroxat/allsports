var request = require("request");
const readline = require('readline');

// Random
var rand = (option) => {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  if (option == 'address') {
    for (var i = 0; i < 41; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  } else if (option == 'telegram') {
    for (var i = 0; i < 8; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return (option == 'address' ? '0x':'t.me/')+text;
};

var config = {
  ref: 'https://drop.allsportschain.com/EN/index?r=9434f832',
  proses: 0
};

var data = {
  addr: rand('address'),
  sns: rand('telegram')
};

var send = (addr, sns) => {
  request({
    method: 'POST',
    url: 'https://drop.allsportschain.com/inner/recorder/submit',
    headers: {
      'Cache-Control': 'no-cache',
      Referer: config.ref,
      'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
    },
    formData: {
      addr: addr,
      sns: sns
    }
  }, function (error, response, body) {
    if (error) throw new Error(error);

    return '';
  });

  return 'Sukses : ' + addr;
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('close', () => {
  console.log('Berhasil Keluar');
  process.exit(0);
});

setInterval(function() {
  console.log(send(rand('address'), rand('telegram')));
}, 1500);
