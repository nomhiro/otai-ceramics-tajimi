/**
 * 追加画像ダウンロードスクリプト（徳利・猪口・塩釉）
 */

import * as fs from 'fs';
import * as path from 'path';
import * as http from 'http';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const BASE_URL = 'http://www.otai.co.jp';

const DIRS = {
  sake: path.join(ROOT_DIR, 'public/images/sake'),
  gallery: path.join(ROOT_DIR, 'public/images/gallery'),
};

// 徳利コード
const TOKURI_CODES = ['101', '102', '103', '104', '105', '106', '107', '108', '109', '110', '111', '112', '113'];

// 猪口コード
const CHOKO_CODES = ['201', '202', '203', '204', '205', '206', '207', '208', '209', '210', '211', '212', '213', '214', '215', '216', '217', '218', '219', '220', '221', '222', '223', '224', '225'];

// 塩釉コード
const SHIOYUU_CODES = ['001', '002', '003', '006', '007', '008', '010', '011', '012', '013', '014', '015', '016', '017', '019', '022', '024', '026'];

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(filepath)) {
      console.log(`Already exists: ${path.basename(filepath)}`);
      resolve();
      return;
    }

    const file = fs.createWriteStream(filepath);

    http.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`Downloaded: ${path.basename(filepath)}`);
          resolve();
        });
      } else {
        file.close();
        if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
        console.log(`Not found (${response.statusCode}): ${url}`);
        resolve();
      }
    }).on('error', (err) => {
      file.close();
      if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
      console.error(`Error: ${err.message}`);
      resolve();
    });
  });
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function downloadTokuri() {
  console.log('\n=== 徳利画像 ===');
  ensureDir(DIRS.sake);

  for (const code of TOKURI_CODES) {
    // サムネイル: /tokuri/t_images/101s.jpg
    const thumbUrl = `${BASE_URL}/tokuri/t_images/${code}s.jpg`;
    const thumbPath = path.join(DIRS.sake, `tokuri_${code}.jpg`);
    await downloadImage(thumbUrl, thumbPath);
    await delay(50);

    // メイン画像: /tokuri/t_images/101.jpg
    const mainUrl = `${BASE_URL}/tokuri/t_images/${code}.jpg`;
    const mainPath = path.join(DIRS.sake, `tokuri_${code}_main.jpg`);
    await downloadImage(mainUrl, mainPath);
    await delay(50);
  }
}

async function downloadChoko() {
  console.log('\n=== 猪口画像 ===');
  ensureDir(DIRS.sake);

  for (const code of CHOKO_CODES) {
    // サムネイル: /tokuri/t_images/201s.jpg
    const thumbUrl = `${BASE_URL}/tokuri/t_images/${code}s.jpg`;
    const thumbPath = path.join(DIRS.sake, `choko_${code}.jpg`);
    await downloadImage(thumbUrl, thumbPath);
    await delay(50);

    // メイン画像
    const mainUrl = `${BASE_URL}/tokuri/t_images/${code}.jpg`;
    const mainPath = path.join(DIRS.sake, `choko_${code}_main.jpg`);
    await downloadImage(mainUrl, mainPath);
    await delay(50);
  }
}

async function downloadShioyuu() {
  console.log('\n=== 塩釉画像 ===');
  ensureDir(DIRS.gallery);

  for (const code of SHIOYUU_CODES) {
    // サムネイル: /otai/sio/001-thumb.jpg
    const thumbUrl = `${BASE_URL}/otai/sio/${code}-thumb.jpg`;
    const thumbPath = path.join(DIRS.gallery, `shioyuu_${code}.jpg`);
    await downloadImage(thumbUrl, thumbPath);
    await delay(50);

    // メイン画像: /otai/sio/001.jpg
    const mainUrl = `${BASE_URL}/otai/sio/${code}.jpg`;
    const mainPath = path.join(DIRS.gallery, `shioyuu_${code}_main.jpg`);
    await downloadImage(mainUrl, mainPath);
    await delay(50);
  }
}

async function main() {
  console.log('=== 追加画像ダウンロード ===\n');

  await downloadTokuri();
  await downloadChoko();
  await downloadShioyuu();

  // 統計
  const sakeCount = fs.readdirSync(DIRS.sake).filter(f => f.endsWith('.jpg')).length;
  const galleryCount = fs.readdirSync(DIRS.gallery).filter(f => f.endsWith('.jpg')).length;

  console.log('\n=== 完了 ===');
  console.log(`酒器画像: ${sakeCount}枚`);
  console.log(`ギャラリー画像: ${galleryCount}枚`);
}

main();
