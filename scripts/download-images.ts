/**
 * 元サイト（otai.co.jp）から画像をダウンロードするスクリプト
 *
 * 使用方法:
 * npx ts-node scripts/download-images.ts
 *
 * または Node.js で直接実行:
 * node --loader ts-node/esm scripts/download-images.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';
import * as http from 'http';

const BASE_URL = 'http://www.otai.co.jp';

// 画像保存先ディレクトリ
const DIRS = {
  products: 'public/images/products',
  sake: 'public/images/sake',
  gallery: 'public/images/gallery',
};

// 商品コード一覧（元サイトのメモリから取得）
const PRODUCT_CODES = {
  // 白釉二輪花
  nirin: ['600042', '600043', '600044', '600050', '600056', '600057', '600058', '600073', '600074', '600084', '600086', '600087'],
  // 鳥絵 - 青鳥
  tori_blue: ['600165', '600167', '600168', '600170', '600171', '600183', '600184', '600190', '600191'],
  // 鳥絵 - 茶鳥
  tori_brown: ['600142', '600144', '600145', '600147', '600148', '600160', '600161', '600162', '601831'],
  // 楽々絵
  raku: ['600540', '600541', '600542', '600543', '600544', '600545', '600551', '600552', '600553', '600557', '600558', '600559'],
  // 波絵
  roku: ['600751', '600752', '600753', '600762', '600763', '600764', '600773', '600774', '600775', '600780', '600781', '600782'],
  // ばら絵
  bara: ['601630', '601631', '601632'],
  // 動物絵
  sono: ['600173', '600174', '600179', '600180', '600182', '600194', '600195', '601843', '601844', '601845', '601988'],
  // 染付
  some: ['601987', '601989', '601990', '601991', '601993'],
  // 赤絵
  akae: ['600561', '600562', '601525', '601526'],
};

// 徳利コード（101-113）
const TOKURI_CODES = Array.from({ length: 13 }, (_, i) => String(101 + i));

// 猪口コード（201-225）
const CHOKO_CODES = Array.from({ length: 25 }, (_, i) => String(201 + i));

// ジョッキコード
const JOKKI_CODES = ['001', '002', '004', '005', '010', '011', '012', '014', '017', '803', '806', '807', '808', '809', '813', '815', '816', '818', '819', '820', '821'];

// 塩釉コード
const SHIOYUU_CODES = ['001', '002', '003', '006', '007', '008', '010', '011', '012', '013', '014', '015', '016', '017', '019', '022', '024', '026'];

/**
 * ディレクトリを作成
 */
function ensureDir(dir: string): void {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
}

/**
 * 画像をダウンロード
 */
function downloadImage(url: string, filepath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(filepath);

    protocol.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`Downloaded: ${filepath}`);
          resolve();
        });
      } else if (response.statusCode === 302 || response.statusCode === 301) {
        // リダイレクト処理
        const redirectUrl = response.headers.location;
        if (redirectUrl) {
          file.close();
          fs.unlinkSync(filepath);
          downloadImage(redirectUrl, filepath).then(resolve).catch(reject);
        } else {
          reject(new Error(`Redirect without location: ${url}`));
        }
      } else {
        file.close();
        fs.unlinkSync(filepath);
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      file.close();
      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
      }
      reject(err);
    });
  });
}

/**
 * 遅延
 */
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * 商品画像をダウンロード
 */
async function downloadProductImages(): Promise<void> {
  console.log('\n=== 商品画像のダウンロード ===');
  ensureDir(DIRS.products);

  for (const [series, codes] of Object.entries(PRODUCT_CODES)) {
    console.log(`\nシリーズ: ${series}`);
    for (const code of codes) {
      // メイン画像（JPG）
      const mainUrl = `${BASE_URL}/kaimono/hin/${code}.JPG`;
      const mainPath = path.join(DIRS.products, `${code}.jpg`);

      // サムネイル画像
      const thumbUrl = `${BASE_URL}/kaimono/shin/${code}.jpg`;
      const thumbPath = path.join(DIRS.products, `${code}_thumb.jpg`);

      try {
        if (!fs.existsSync(mainPath)) {
          await downloadImage(mainUrl, mainPath);
          await delay(100); // サーバー負荷軽減
        }
        if (!fs.existsSync(thumbPath)) {
          await downloadImage(thumbUrl, thumbPath);
          await delay(100);
        }
      } catch (err) {
        console.error(`Error downloading ${code}:`, err);
      }
    }
  }
}

/**
 * 酒器画像をダウンロード
 */
async function downloadSakeImages(): Promise<void> {
  console.log('\n=== 酒器画像のダウンロード ===');
  ensureDir(DIRS.sake);

  // 徳利
  console.log('\n徳利:');
  for (const code of TOKURI_CODES) {
    const url = `${BASE_URL}/tokuri/${code}.jpg`;
    const filepath = path.join(DIRS.sake, `tokuri_${code}.jpg`);

    try {
      if (!fs.existsSync(filepath)) {
        await downloadImage(url, filepath);
        await delay(100);
      }
    } catch (err) {
      console.error(`Error downloading tokuri ${code}:`, err);
    }
  }

  // 猪口
  console.log('\n猪口:');
  for (const code of CHOKO_CODES) {
    const url = `${BASE_URL}/tokuri/${code}.jpg`;
    const filepath = path.join(DIRS.sake, `choko_${code}.jpg`);

    try {
      if (!fs.existsSync(filepath)) {
        await downloadImage(url, filepath);
        await delay(100);
      }
    } catch (err) {
      console.error(`Error downloading choko ${code}:`, err);
    }
  }
}

/**
 * ギャラリー画像をダウンロード
 */
async function downloadGalleryImages(): Promise<void> {
  console.log('\n=== ギャラリー画像のダウンロード ===');
  ensureDir(DIRS.gallery);

  // ジョッキ
  console.log('\nジョッキ:');
  for (const code of JOKKI_CODES) {
    const url = `${BASE_URL}/otai/jokki/${code}.jpg`;
    const filepath = path.join(DIRS.gallery, `jokki_${code}.jpg`);

    try {
      if (!fs.existsSync(filepath)) {
        await downloadImage(url, filepath);
        await delay(100);
      }
    } catch (err) {
      console.error(`Error downloading jokki ${code}:`, err);
    }
  }

  // 塩釉
  console.log('\n塩釉:');
  for (const code of SHIOYUU_CODES) {
    const url = `${BASE_URL}/otai/sio/${code}.jpg`;
    const filepath = path.join(DIRS.gallery, `shioyuu_${code}.jpg`);

    try {
      if (!fs.existsSync(filepath)) {
        await downloadImage(url, filepath);
        await delay(100);
      }
    } catch (err) {
      console.error(`Error downloading shioyuu ${code}:`, err);
    }
  }
}

/**
 * シリーズ画像をダウンロード
 */
async function downloadSeriesImages(): Promise<void> {
  console.log('\n=== シリーズ画像のダウンロード ===');
  ensureDir(DIRS.products);

  const seriesNames = ['nirin', 'tori', 'raku', 'roku', 'bara', 'sono', 'some', 'akae'];

  for (const name of seriesNames) {
    // メイン画像
    // 鳥絵は tori_a.JPG が存在しないため、ao_a.JPG（青鳥絵）を使用
    const mainUrl = name === 'tori'
      ? `${BASE_URL}/kaimono/hin/ao_a.JPG`
      : `${BASE_URL}/kaimono/hin/${name}_a.JPG`;
    const mainPath = path.join(DIRS.products, `series_${name}.jpg`);

    // GIFサムネイル
    const gifUrl = `${BASE_URL}/kaimono/hin/${name}.GIF`;
    const gifPath = path.join(DIRS.products, `series_${name}.gif`);

    try {
      if (!fs.existsSync(mainPath)) {
        await downloadImage(mainUrl, mainPath);
        await delay(100);
      }
    } catch (err) {
      console.log(`Main image not found for ${name}, trying alternative...`);
    }

    try {
      if (!fs.existsSync(gifPath)) {
        await downloadImage(gifUrl, gifPath);
        await delay(100);
      }
    } catch (err) {
      console.error(`Error downloading series ${name}:`, err);
    }
  }
}

/**
 * メイン実行
 */
async function main(): Promise<void> {
  console.log('=== 小田井窯 画像ダウンロードスクリプト ===\n');
  console.log(`ベースURL: ${BASE_URL}`);
  console.log(`保存先: ${Object.values(DIRS).join(', ')}\n`);

  try {
    await downloadProductImages();
    await downloadSakeImages();
    await downloadGalleryImages();
    await downloadSeriesImages();

    console.log('\n=== ダウンロード完了 ===');
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

// 実行
main();
