const QRCode = require("qrcode");
const fs = require("fs");
const path = require("path");

const url = "https://ziminikita.ru";
const output = path.resolve(__dirname, "../src/assets/qr-code.png");

QRCode.toFile(output, url, {
  type: "png",
  width: 1024,
  margin: 2,
  color: {
    dark: "#101010",
    light: "#FFFFFF",
  },
})
  .then(() => console.log(`QR code saved to ${output}`))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
