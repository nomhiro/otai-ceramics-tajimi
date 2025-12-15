# コンテンツ移行完了記録

## 移行日時
2025-12-16

## 移行元
http://www.otai.co.jp

## 移行内容

### 1. 画像ダウンロード
- **商品画像**: 85枚 (`public/images/products/`)
- **酒器画像**: 76枚 (`public/images/sake/`)
- **ギャラリー画像**: 39枚 (`public/images/gallery/`)
- **合計**: 約200枚

### 2. Content Collection
#### Products (77件)
- 白釉二輪花: 12商品
- 鳥絵（青鳥+茶鳥）: 18商品
- 楽々絵: 12商品
- 波絵: 12商品
- ばら絵: 3商品
- 動物絵: 11商品
- 染付: 5商品
- 赤絵: 4商品

#### Sakeware (38件)
- 徳利: 13種類 (コード: 101-113)
- 猪口: 25種類 (コード: 201-225)

#### Gallery (39件)
- ジョッキ: 21点
- 塩釉: 18点 (先代 加藤静男の作品)

### 3. 新規作成ページ
#### ギャラリー (`/gallery/`)
- `/gallery/` - ギャラリートップ
- `/gallery/jokki/` - ジョッキコレクション
- `/gallery/shioyuu/` - 塩釉作品

#### 教育コンテンツ (`/learn/`)
- `/learn/` - 学ぶトップ
- `/learn/minoyaki/` - 美濃焼とは
- `/learn/basics/` - 陶器の基本（窯・釉・土・顔料）
- `/learn/sometsuke/` - 染付講座
- `/learn/guide/` - 器の選び方

### 4. 更新ファイル
- `src/content/config.ts` - sakeware, galleryコレクション追加
- `src/pages/products/sake.astro` - 実データ表示に拡張
- `src/components/Header.astro` - ギャラリー・学ぶリンク追加

### 5. スクリプト
- `scripts/download-images.mjs` - 商品画像ダウンロード
- `scripts/download-additional.mjs` - 酒器・ギャラリー画像ダウンロード
- `scripts/generate-content.mjs` - Markdownコンテンツ生成

## シリーズアイコン画像
2025-12-16 更新: 商品シリーズのアイコンを文字から画像に変更
- `src/pages/index.astro` で `series_${slug}.jpg` を使用
- 鳥絵は `tori_a.JPG` が存在しないため `ao_a.JPG`（青鳥絵）を代用

## 画像URLパターン（元サイト）
```
商品詳細: /kaimono/hin/{code}.JPG
サムネイル: /kaimono/shin/{code}.jpg
徳利: /tokuri/t_images/{code}s.jpg (thumb), /tokuri/t_images/{code}.jpg (main)
猪口: /tokuri/t_images/{code}s.jpg
塩釉: /otai/sio/{code}-thumb.jpg
ジョッキ: /otai/jokki/{code}.jpg
```

## ビルド結果
- 112ページが正常に生成
- ビルド時間: 約3.5秒
