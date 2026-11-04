const fs = require('fs');
const https = require('https');
const path = require('path');

const url = 'https://identidade-oculta.surge.sh/assets/aistudio/EV1_e4d9c0c5.wav';
const dest = path.join(__dirname, 'public', 'assets', 'aistudio', 'EV1_e4d9c0c5.wav');

const dir = path.dirname(dest);
if (!fs.existsSync(dir)){ fs.mkdirSync(dir, { recursive: true }); }

console.log('Baixando áudio do site...');
https.get(url, (res) => {
    if (res.statusCode !== 200) {
        console.error('Erro ' + res.statusCode);
        return;
    }
    const file = fs.createWriteStream(dest);
    res.pipe(file);
    file.on('finish', () => { console.log('Sucesso! Áudio salvo.'); });
});
