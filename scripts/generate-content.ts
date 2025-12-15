/**
 * 商品・酒器・ギャラリーのMarkdownコンテンツを生成するスクリプト
 *
 * 使用方法:
 * npx ts-node scripts/generate-content.ts
 */

import * as fs from 'fs';
import * as path from 'path';

// ディレクトリ
const CONTENT_DIR = 'src/content';
const PRODUCTS_DIR = path.join(CONTENT_DIR, 'products');
const SAKEWARE_DIR = path.join(CONTENT_DIR, 'sakeware');
const GALLERY_DIR = path.join(CONTENT_DIR, 'gallery');

// シリーズ名のマッピング
const SERIES_NAMES: Record<string, { ja: string; en: string }> = {
  nirin: { ja: '白釉二輪花', en: 'Hakuyu Nirinka' },
  tori: { ja: '鳥絵', en: 'Tori-e (Bird)' },
  raku: { ja: '楽々絵', en: 'Rakuraku-e' },
  roku: { ja: '波絵', en: 'Nami-e (Wave)' },
  bara: { ja: 'ばら絵', en: 'Bara-e (Rose)' },
  sono: { ja: '動物絵', en: 'Doubutsu-e (Animal)' },
  some: { ja: '染付', en: 'Sometsuke (Indigo)' },
  akae: { ja: '赤絵', en: 'Aka-e (Red)' },
};

// 商品データ（元サイトから抽出）
interface ProductData {
  code: string;
  series: string;
  name: string;
  price: number;
  size: string;
  weight?: string;
  description?: string;
}

// 商品データ一覧
const PRODUCTS: ProductData[] = [
  // 白釉二輪花
  { code: '600042', series: 'nirin', name: '白釉二輪花 ９吋丸皿', price: 3360, size: '約24cm', weight: '600g' },
  { code: '600043', series: 'nirin', name: '白釉二輪花 ７吋半丸皿', price: 2520, size: '約19cm', weight: '430g' },
  { code: '600044', series: 'nirin', name: '白釉二輪花 ６吋半丸皿', price: 1890, size: '約16cm', weight: '280g' },
  { code: '600050', series: 'nirin', name: '白釉二輪花 飯碗', price: 1260, size: '約11.5cm', weight: '200g' },
  { code: '600056', series: 'nirin', name: '白釉二輪花 湯呑', price: 1050, size: '約8cm', weight: '180g' },
  { code: '600057', series: 'nirin', name: '白釉二輪花 マグカップ', price: 1680, size: '約8cm', weight: '280g' },
  { code: '600058', series: 'nirin', name: '白釉二輪花 コーヒー碗皿', price: 2520, size: '碗約8cm 皿約15cm' },
  { code: '600073', series: 'nirin', name: '白釉二輪花 角皿', price: 2100, size: '約18cm角' },
  { code: '600074', series: 'nirin', name: '白釉二輪花 パスタ皿', price: 2940, size: '約26cm' },
  { code: '600084', series: 'nirin', name: '白釉二輪花 スープ碗', price: 1890, size: '約12cm' },
  { code: '600086', series: 'nirin', name: '白釉二輪花 サラダボウル', price: 2520, size: '約21cm' },
  { code: '600087', series: 'nirin', name: '白釉二輪花 深鉢', price: 3150, size: '約24cm' },

  // 鳥絵（青鳥）
  { code: '600165', series: 'tori', name: '青鳥絵 ９吋丸皿', price: 3360, size: '約24cm' },
  { code: '600167', series: 'tori', name: '青鳥絵 ７吋半丸皿', price: 2520, size: '約19cm' },
  { code: '600168', series: 'tori', name: '青鳥絵 ６吋半丸皿', price: 1890, size: '約16cm' },
  { code: '600170', series: 'tori', name: '青鳥絵 飯碗', price: 1260, size: '約11.5cm' },
  { code: '600171', series: 'tori', name: '青鳥絵 湯呑', price: 1050, size: '約8cm' },
  { code: '600183', series: 'tori', name: '青鳥絵 マグカップ', price: 1680, size: '約8cm' },
  { code: '600184', series: 'tori', name: '青鳥絵 コーヒー碗皿', price: 2520, size: '碗約8cm 皿約15cm' },
  { code: '600190', series: 'tori', name: '青鳥絵 角皿', price: 2100, size: '約18cm角' },
  { code: '600191', series: 'tori', name: '青鳥絵 パスタ皿', price: 2940, size: '約26cm' },

  // 鳥絵（茶鳥）
  { code: '600142', series: 'tori', name: '茶鳥絵 ９吋丸皿', price: 3360, size: '約24cm' },
  { code: '600144', series: 'tori', name: '茶鳥絵 ７吋半丸皿', price: 2520, size: '約19cm' },
  { code: '600145', series: 'tori', name: '茶鳥絵 ６吋半丸皿', price: 1890, size: '約16cm' },
  { code: '600147', series: 'tori', name: '茶鳥絵 飯碗', price: 1260, size: '約11.5cm' },
  { code: '600148', series: 'tori', name: '茶鳥絵 湯呑', price: 1050, size: '約8cm' },
  { code: '600160', series: 'tori', name: '茶鳥絵 マグカップ', price: 1680, size: '約8cm' },
  { code: '600161', series: 'tori', name: '茶鳥絵 コーヒー碗皿', price: 2520, size: '碗約8cm 皿約15cm' },
  { code: '600162', series: 'tori', name: '茶鳥絵 角皿', price: 2100, size: '約18cm角' },
  { code: '601831', series: 'tori', name: '茶鳥絵 パスタ皿', price: 2940, size: '約26cm' },

  // 楽々絵
  { code: '600540', series: 'raku', name: '楽々絵 ９吋丸皿', price: 3360, size: '約24cm' },
  { code: '600541', series: 'raku', name: '楽々絵 ７吋半丸皿', price: 2520, size: '約19cm' },
  { code: '600542', series: 'raku', name: '楽々絵 ６吋半丸皿', price: 1890, size: '約16cm' },
  { code: '600543', series: 'raku', name: '楽々絵 飯碗', price: 1260, size: '約11.5cm' },
  { code: '600544', series: 'raku', name: '楽々絵 湯呑', price: 1050, size: '約8cm' },
  { code: '600545', series: 'raku', name: '楽々絵 マグカップ', price: 1680, size: '約8cm' },
  { code: '600551', series: 'raku', name: '楽々絵 コーヒー碗皿', price: 2520, size: '碗約8cm 皿約15cm' },
  { code: '600552', series: 'raku', name: '楽々絵 角皿', price: 2100, size: '約18cm角' },
  { code: '600553', series: 'raku', name: '楽々絵 パスタ皿', price: 2940, size: '約26cm' },
  { code: '600557', series: 'raku', name: '楽々絵 スープ碗', price: 1890, size: '約12cm' },
  { code: '600558', series: 'raku', name: '楽々絵 サラダボウル', price: 2520, size: '約21cm' },
  { code: '600559', series: 'raku', name: '楽々絵 深鉢', price: 3150, size: '約24cm' },

  // 波絵
  { code: '600751', series: 'roku', name: '波絵 ９吋丸皿', price: 3360, size: '約24cm' },
  { code: '600752', series: 'roku', name: '波絵 ７吋半丸皿', price: 2520, size: '約19cm' },
  { code: '600753', series: 'roku', name: '波絵 ６吋半丸皿', price: 1890, size: '約16cm' },
  { code: '600762', series: 'roku', name: '波絵 飯碗', price: 1260, size: '約11.5cm' },
  { code: '600763', series: 'roku', name: '波絵 湯呑', price: 1050, size: '約8cm' },
  { code: '600764', series: 'roku', name: '波絵 マグカップ', price: 1680, size: '約8cm' },
  { code: '600773', series: 'roku', name: '波絵 コーヒー碗皿', price: 2520, size: '碗約8cm 皿約15cm' },
  { code: '600774', series: 'roku', name: '波絵 角皿', price: 2100, size: '約18cm角' },
  { code: '600775', series: 'roku', name: '波絵 パスタ皿', price: 2940, size: '約26cm' },
  { code: '600780', series: 'roku', name: '波絵 スープ碗', price: 1890, size: '約12cm' },
  { code: '600781', series: 'roku', name: '波絵 サラダボウル', price: 2520, size: '約21cm' },
  { code: '600782', series: 'roku', name: '波絵 深鉢', price: 3150, size: '約24cm' },

  // ばら絵
  { code: '601630', series: 'bara', name: 'ばら絵 飯碗', price: 1260, size: '約11.5cm' },
  { code: '601631', series: 'bara', name: 'ばら絵 湯呑', price: 1050, size: '約8cm' },
  { code: '601632', series: 'bara', name: 'ばら絵 マグカップ', price: 1680, size: '約8cm' },

  // 動物絵
  { code: '600173', series: 'sono', name: '動物絵 ９吋丸皿', price: 3360, size: '約24cm' },
  { code: '600174', series: 'sono', name: '動物絵 ７吋半丸皿', price: 2520, size: '約19cm' },
  { code: '600179', series: 'sono', name: '動物絵 飯碗', price: 1260, size: '約11.5cm' },
  { code: '600180', series: 'sono', name: '動物絵 湯呑', price: 1050, size: '約8cm' },
  { code: '600182', series: 'sono', name: '動物絵 マグカップ', price: 1680, size: '約8cm' },
  { code: '600194', series: 'sono', name: '動物絵 コーヒー碗皿', price: 2520, size: '碗約8cm 皿約15cm' },
  { code: '600195', series: 'sono', name: '動物絵 角皿', price: 2100, size: '約18cm角' },
  { code: '601843', series: 'sono', name: '動物絵 スープ碗', price: 1890, size: '約12cm' },
  { code: '601844', series: 'sono', name: '動物絵 サラダボウル', price: 2520, size: '約21cm' },
  { code: '601845', series: 'sono', name: '動物絵 深鉢', price: 3150, size: '約24cm' },
  { code: '601988', series: 'sono', name: '動物絵 パスタ皿', price: 2940, size: '約26cm' },

  // 染付
  { code: '601987', series: 'some', name: '染付 飯碗', price: 1260, size: '約11.5cm' },
  { code: '601989', series: 'some', name: '染付 湯呑', price: 1050, size: '約8cm' },
  { code: '601990', series: 'some', name: '染付 マグカップ', price: 1680, size: '約8cm' },
  { code: '601991', series: 'some', name: '染付 コーヒー碗皿', price: 2520, size: '碗約8cm 皿約15cm' },
  { code: '601993', series: 'some', name: '染付 角皿', price: 2100, size: '約18cm角' },

  // 赤絵
  { code: '600561', series: 'akae', name: '赤絵 飯碗', price: 1260, size: '約11.5cm' },
  { code: '600562', series: 'akae', name: '赤絵 湯呑', price: 1050, size: '約8cm' },
  { code: '601525', series: 'akae', name: '赤絵 マグカップ', price: 1680, size: '約8cm' },
  { code: '601526', series: 'akae', name: '赤絵 コーヒー碗皿', price: 2520, size: '碗約8cm 皿約15cm' },
];

// 徳利データ
interface TokuriData {
  code: string;
  name: string;
  capacity: string;
  description?: string;
}

const TOKURI_DATA: TokuriData[] = [
  { code: '101', name: '白磁徳利', capacity: '一合' },
  { code: '102', name: '白磁徳利', capacity: '二合' },
  { code: '103', name: '織部徳利', capacity: '一合' },
  { code: '104', name: '織部徳利', capacity: '二合' },
  { code: '105', name: '黒釉徳利', capacity: '一合' },
  { code: '106', name: '黒釉徳利', capacity: '二合' },
  { code: '107', name: '青磁徳利', capacity: '一合' },
  { code: '108', name: '青磁徳利', capacity: '二合' },
  { code: '109', name: '染付徳利', capacity: '一合' },
  { code: '110', name: '染付徳利', capacity: '二合' },
  { code: '111', name: '粉引徳利', capacity: '一合' },
  { code: '112', name: '粉引徳利', capacity: '二合' },
  { code: '113', name: '志野徳利', capacity: '二合' },
];

// 猪口データ
interface ChokoData {
  code: string;
  name: string;
  description?: string;
}

const CHOKO_DATA: ChokoData[] = [
  { code: '201', name: '白磁猪口' },
  { code: '202', name: '白磁ぐい呑み' },
  { code: '203', name: '織部猪口' },
  { code: '204', name: '織部ぐい呑み' },
  { code: '205', name: '黒釉猪口' },
  { code: '206', name: '黒釉ぐい呑み' },
  { code: '207', name: '青磁猪口' },
  { code: '208', name: '青磁ぐい呑み' },
  { code: '209', name: '染付猪口' },
  { code: '210', name: '染付ぐい呑み' },
  { code: '211', name: '粉引猪口' },
  { code: '212', name: '粉引ぐい呑み' },
  { code: '213', name: '志野猪口' },
  { code: '214', name: '志野ぐい呑み' },
  { code: '215', name: '平盃 白磁' },
  { code: '216', name: '平盃 織部' },
  { code: '217', name: '平盃 黒釉' },
  { code: '218', name: '平盃 青磁' },
  { code: '219', name: '平盃 染付' },
  { code: '220', name: '平盃 粉引' },
  { code: '221', name: '平盃 志野' },
  { code: '222', name: '片口 白磁' },
  { code: '223', name: '片口 織部' },
  { code: '224', name: '片口 黒釉' },
  { code: '225', name: '片口 染付' },
];

// ジョッキデータ
interface JokkiData {
  code: string;
  name: string;
  maker: string;
  description?: string;
}

const JOKKI_DATA: JokkiData[] = [
  { code: '001', name: 'ジョッキ No.1', maker: '小田井窯', description: 'オリジナルジョッキ' },
  { code: '002', name: 'ジョッキ No.2', maker: '小田井窯', description: 'オリジナルジョッキ' },
  { code: '004', name: 'ジョッキ No.4', maker: '小田井窯', description: 'オリジナルジョッキ' },
  { code: '005', name: 'ジョッキ No.5', maker: '小田井窯', description: 'オリジナルジョッキ' },
  { code: '010', name: 'ジョッキ No.10', maker: '小田井窯', description: 'オリジナルジョッキ' },
  { code: '011', name: 'ジョッキ No.11', maker: '小田井窯', description: 'オリジナルジョッキ' },
  { code: '012', name: 'ジョッキ No.12', maker: '小田井窯', description: 'オリジナルジョッキ' },
  { code: '014', name: 'ジョッキ No.14', maker: '小田井窯', description: 'オリジナルジョッキ' },
  { code: '017', name: 'ジョッキ No.17', maker: '小田井窯', description: 'オリジナルジョッキ' },
  { code: '803', name: 'コレクション No.803', maker: 'その他', description: '所蔵品' },
  { code: '806', name: 'コレクション No.806', maker: 'その他', description: '所蔵品' },
  { code: '807', name: 'コレクション No.807', maker: 'その他', description: '所蔵品' },
  { code: '808', name: 'コレクション No.808', maker: 'その他', description: '所蔵品' },
  { code: '809', name: 'コレクション No.809', maker: 'その他', description: '所蔵品' },
  { code: '813', name: 'コレクション No.813', maker: 'その他', description: '所蔵品' },
  { code: '815', name: 'コレクション No.815', maker: 'その他', description: '所蔵品' },
  { code: '816', name: 'コレクション No.816', maker: 'その他', description: '所蔵品' },
  { code: '818', name: 'コレクション No.818', maker: 'その他', description: '所蔵品' },
  { code: '819', name: 'コレクション No.819', maker: 'その他', description: '所蔵品' },
  { code: '820', name: 'コレクション No.820', maker: 'その他', description: '所蔵品' },
  { code: '821', name: 'コレクション No.821', maker: 'その他', description: '所蔵品' },
];

// 塩釉データ
interface ShioyuuData {
  code: string;
  name: string;
  artist: string;
  description?: string;
}

const SHIOYUU_DATA: ShioyuuData[] = [
  { code: '001', name: '塩釉作品 No.1', artist: '加藤静男', description: '先代作品' },
  { code: '002', name: '塩釉作品 No.2', artist: '加藤静男', description: '先代作品' },
  { code: '003', name: '塩釉作品 No.3', artist: '加藤静男', description: '先代作品' },
  { code: '006', name: '塩釉作品 No.6', artist: '加藤静男', description: '先代作品' },
  { code: '007', name: '塩釉作品 No.7', artist: '加藤静男', description: '先代作品' },
  { code: '008', name: '塩釉作品 No.8', artist: '加藤静男', description: '先代作品' },
  { code: '010', name: '塩釉作品 No.10', artist: '加藤静男', description: '先代作品' },
  { code: '011', name: '塩釉作品 No.11', artist: '加藤静男', description: '先代作品' },
  { code: '012', name: '塩釉作品 No.12', artist: '加藤静男', description: '先代作品' },
  { code: '013', name: '塩釉作品 No.13', artist: '加藤静男', description: '先代作品' },
  { code: '014', name: '塩釉作品 No.14', artist: '加藤静男', description: '先代作品' },
  { code: '015', name: '塩釉作品 No.15', artist: '加藤静男', description: '先代作品' },
  { code: '016', name: '塩釉作品 No.16', artist: '加藤静男', description: '先代作品' },
  { code: '017', name: '塩釉作品 No.17', artist: '加藤静男', description: '先代作品' },
  { code: '019', name: '塩釉作品 No.19', artist: '加藤静男', description: '先代作品' },
  { code: '022', name: '塩釉作品 No.22', artist: '加藤静男', description: '先代作品' },
  { code: '024', name: '塩釉作品 No.24', artist: '加藤静男', description: '先代作品' },
  { code: '026', name: '塩釉作品 No.26', artist: '加藤静男', description: '先代作品' },
];

/**
 * ディレクトリ作成
 */
function ensureDir(dir: string): void {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
}

/**
 * 商品Markdownを生成
 */
function generateProductMarkdown(product: ProductData): string {
  const seriesName = SERIES_NAMES[product.series];
  const description = product.description || `${seriesName.ja}シリーズの${product.name.replace(seriesName.ja + ' ', '')}。小田井窯オリジナルの手描き陶器です。`;

  return `---
title: "${product.name}"
series: "${product.series}"
images:
  - "/images/products/${product.code}.jpg"
price: ${product.price}
size: "${product.size}"
inStock: true
featured: false
---

${description}

${product.weight ? `重量: ${product.weight}` : ''}
`.trim();
}

/**
 * 酒器Markdownを生成
 */
function generateSakewareMarkdown(type: 'tokuri' | 'choko', data: TokuriData | ChokoData): string {
  if (type === 'tokuri') {
    const tokuri = data as TokuriData;
    return `---
title: "${tokuri.name}"
type: "tokuri"
code: "${tokuri.code}"
images:
  - "/images/sake/tokuri_${tokuri.code}.jpg"
capacity: "${tokuri.capacity}"
inStock: true
---

${tokuri.name}（${tokuri.capacity}）。美濃焼の伝統的な徳利です。
`.trim();
  } else {
    const choko = data as ChokoData;
    return `---
title: "${choko.name}"
type: "choko"
code: "${choko.code}"
images:
  - "/images/sake/choko_${choko.code}.jpg"
inStock: true
---

${choko.name}。美濃焼の伝統的な猪口です。
`.trim();
  }
}

/**
 * ギャラリーMarkdownを生成
 */
function generateGalleryMarkdown(category: 'jokki' | 'shioyuu', data: JokkiData | ShioyuuData): string {
  if (category === 'jokki') {
    const jokki = data as JokkiData;
    return `---
title: "${jokki.name}"
category: "jokki"
code: "${jokki.code}"
image: "/images/gallery/jokki_${jokki.code}.jpg"
description: "${jokki.description || ''}"
---

${jokki.maker}の${jokki.name}。
`.trim();
  } else {
    const shioyuu = data as ShioyuuData;
    return `---
title: "${shioyuu.name}"
category: "shioyuu"
code: "${shioyuu.code}"
image: "/images/gallery/shioyuu_${shioyuu.code}.jpg"
artist: "${shioyuu.artist}"
description: "${shioyuu.description || ''}"
---

先代 ${shioyuu.artist}の塩釉作品。平成13年「美濃の民芸展」出品作品。
`.trim();
  }
}

/**
 * 商品コンテンツを生成
 */
function generateProducts(): void {
  console.log('\n=== 商品Markdownの生成 ===');

  // 既存のサンプルファイルを削除（オプション）
  const existingFiles = ['raku-meshiwan-01.md', 'some-chawan-01.md', 'tori-mug-01.md'];
  for (const file of existingFiles) {
    const filepath = path.join(PRODUCTS_DIR, file);
    if (fs.existsSync(filepath)) {
      // fs.unlinkSync(filepath);
      console.log(`Keeping existing: ${file}`);
    }
  }

  for (const product of PRODUCTS) {
    const filename = `${product.series}-${product.code}.md`;
    const filepath = path.join(PRODUCTS_DIR, filename);
    const content = generateProductMarkdown(product);

    fs.writeFileSync(filepath, content, 'utf-8');
    console.log(`Generated: ${filename}`);
  }

  console.log(`\n商品ファイル生成完了: ${PRODUCTS.length}件`);
}

/**
 * 酒器コンテンツを生成
 */
function generateSakeware(): void {
  console.log('\n=== 酒器Markdownの生成 ===');
  ensureDir(SAKEWARE_DIR);

  // 徳利
  for (const tokuri of TOKURI_DATA) {
    const filename = `tokuri-${tokuri.code}.md`;
    const filepath = path.join(SAKEWARE_DIR, filename);
    const content = generateSakewareMarkdown('tokuri', tokuri);

    fs.writeFileSync(filepath, content, 'utf-8');
    console.log(`Generated: ${filename}`);
  }

  // 猪口
  for (const choko of CHOKO_DATA) {
    const filename = `choko-${choko.code}.md`;
    const filepath = path.join(SAKEWARE_DIR, filename);
    const content = generateSakewareMarkdown('choko', choko);

    fs.writeFileSync(filepath, content, 'utf-8');
    console.log(`Generated: ${filename}`);
  }

  console.log(`\n酒器ファイル生成完了: ${TOKURI_DATA.length + CHOKO_DATA.length}件`);
}

/**
 * ギャラリーコンテンツを生成
 */
function generateGallery(): void {
  console.log('\n=== ギャラリーMarkdownの生成 ===');
  ensureDir(GALLERY_DIR);

  // ジョッキ
  for (const jokki of JOKKI_DATA) {
    const filename = `jokki-${jokki.code}.md`;
    const filepath = path.join(GALLERY_DIR, filename);
    const content = generateGalleryMarkdown('jokki', jokki);

    fs.writeFileSync(filepath, content, 'utf-8');
    console.log(`Generated: ${filename}`);
  }

  // 塩釉
  for (const shioyuu of SHIOYUU_DATA) {
    const filename = `shioyuu-${shioyuu.code}.md`;
    const filepath = path.join(GALLERY_DIR, filename);
    const content = generateGalleryMarkdown('shioyuu', shioyuu);

    fs.writeFileSync(filepath, content, 'utf-8');
    console.log(`Generated: ${filename}`);
  }

  console.log(`\nギャラリーファイル生成完了: ${JOKKI_DATA.length + SHIOYUU_DATA.length}件`);
}

/**
 * メイン実行
 */
function main(): void {
  console.log('=== 小田井窯 コンテンツ生成スクリプト ===\n');

  ensureDir(PRODUCTS_DIR);
  ensureDir(SAKEWARE_DIR);
  ensureDir(GALLERY_DIR);

  generateProducts();
  generateSakeware();
  generateGallery();

  console.log('\n=== 生成完了 ===');
  console.log(`商品: ${PRODUCTS.length}件`);
  console.log(`酒器: ${TOKURI_DATA.length + CHOKO_DATA.length}件`);
  console.log(`ギャラリー: ${JOKKI_DATA.length + SHIOYUU_DATA.length}件`);
  console.log(`合計: ${PRODUCTS.length + TOKURI_DATA.length + CHOKO_DATA.length + JOKKI_DATA.length + SHIOYUU_DATA.length}件`);
}

// 実行
main();
