import QRCode from "qrcode";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const url = "https://ziminikita.ru";
const output = path.resolve(__dirname, "../src/assets/qr-code.png");

fs.mkdirSync(path.dirname(output), { recursive: true });

await QRCode.toFile(output, url, {
  type: "png",
  width: 1024,
  margin: 2,
  color: {
    dark: "#101010",
    light: "#FFFFFF",
  },
});

console.log(`QR code saved to ${output}`);
