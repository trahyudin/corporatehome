import fs from 'fs';
import path from 'path';
import archiver from 'archiver';

const rootDir = process.cwd();
const distDir = path.join(rootDir, 'dist');
const zipFile = path.join(rootDir, 'cpanel-deploy.zip');

console.log('🚀 Packaging Korpora Web Atelier for cPanel deployment...');

if (!fs.existsSync(distDir)) {
  console.error('❌ dist/ directory not found! Run "npm run build" first.');
  process.exit(1);
}

// 1. Copy API to dist/api
const apiSrc = path.join(rootDir, 'api');
const apiDest = path.join(distDir, 'api');
console.log('📦 Copying API folder to dist/api...');
fs.cpSync(apiSrc, apiDest, { recursive: true });

// 2. Copy Database schema to dist/database
const dbSrc = path.join(rootDir, 'database');
const dbDest = path.join(distDir, 'database');
console.log('📦 Copying Database schema to dist/database...');
fs.cpSync(dbSrc, dbDest, { recursive: true });

// 3. Copy root .htaccess to dist/.htaccess
const htaccessSrc = path.join(rootDir, '.htaccess');
const htaccessDest = path.join(distDir, '.htaccess');
if (fs.existsSync(htaccessSrc)) {
  console.log('📦 Copying .htaccess to dist/.htaccess...');
  fs.copyFileSync(htaccessSrc, htaccessDest);
}

// 4. Copy .env.example to dist/.env.example
const envSrc = path.join(rootDir, '.env.example');
const envDest = path.join(distDir, '.env.example');
if (fs.existsSync(envSrc)) {
  console.log('📦 Copying .env.example to dist/.env.example...');
  fs.copyFileSync(envSrc, envDest);
}

// 5. Create cpanel-deploy.zip archive
console.log('🗜️ Creating cpanel-deploy.zip archive...');
const output = fs.createWriteStream(zipFile);
const archive = archiver('zip', { zlib: { level: 9 } });

output.on('close', () => {
  const sizeMb = (archive.pointer() / 1024 / 1024).toFixed(2);
  console.log(`✅ Success! cpanel-deploy.zip generated (${sizeMb} MB)`);
  console.log('📁 You can now upload cpanel-deploy.zip directly to cPanel public_html and extract it!');
});

archive.on('error', (err) => {
  throw err;
});

archive.pipe(output);
archive.directory(distDir, false);
archive.finalize();
