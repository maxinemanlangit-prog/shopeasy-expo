const QRCode = require('qrcode');
const url = 'exp://192.168.1.56:8081';
QRCode.toFile('C:/Users/Maxine Manlangit/Documents/Default Project/shopeasy-expo/qr.png', url, { width: 400, margin: 2 }, err => {
  if (err) { console.error(err); process.exit(1); }
  QRCode.toString(url, { type: 'terminal', small: true }, (err, str) => {
    if (err) console.error(err);
    console.log(str);
    console.log(url);
  });
});
