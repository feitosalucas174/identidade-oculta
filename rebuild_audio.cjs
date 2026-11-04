const fs = require('fs');
const p1 = fs.readFileSync('audio_part1.txt', 'utf8');
const p2 = fs.readFileSync('audio_part2.txt', 'utf8');
const fullB64 = p1 + p2;
const dir = 'public/assets/aistudio';
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync('public/assets/aistudio/EV1_e4d9c0c5.wav', Buffer.from(fullB64, 'base64'));
console.log('Arquivo de áudio restaurado com sucesso!');
