import { execSync } from 'child_process';
import fs from 'fs';

let token = process.env.SURGE_TOKEN;
if (!token && fs.existsSync('.env.local')) {
  const envContent = fs.readFileSync('.env.local', 'utf-8');
  const match = envContent.match(/SURGE_TOKEN=([^\r\n]+)/);
  if (match) token = match[1].trim();
}

console.log('Building production bundle...');
execSync('npm run build', { stdio: 'inherit' });

if (fs.existsSync('dist/index.html')) {
  fs.copyFileSync('dist/index.html', 'dist/200.html');
}

console.log('Deploying to identidade-oculta.surge.sh...');
const tokenFlag = token ? `--token ${token}` : '';
execSync(`npx surge dist identidade-oculta.surge.sh ${tokenFlag}`, { stdio: 'inherit' });
console.log('Successfully deployed to https://identidade-oculta.surge.sh');
