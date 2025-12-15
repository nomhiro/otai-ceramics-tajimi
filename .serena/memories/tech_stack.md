# 技術スタック

## 最新更新: 2025-12-16 元サイトデザイン要素の融合

### 元サイト（otai.co.jp）デザイン融合
- 徳利アイコン（`/images/legacy/tokkuri-icon.gif`） - ヘッダーロゴ左
- OTAI CERAMICS TAJIMIタイトル（`/images/legacy/otai-title.gif`） - ヘッダーロゴ下
- 背景パターン（`/images/legacy/otai-pattern.gif`） - 全ページ透かし背景（opacity: 0.06）

### 新規追加ファイル
- `public/images/legacy/` - 元サイト画像アセット（3ファイル）

---

## 更新: 2025-12-15 ご利用ガイドページ群追加

### 新規ページ
- `/guide/` - お買い物の流れ
- `/guide/shipping/` - 送料・配送（地域別送料表）
- `/guide/payment/` - お支払い方法
- `/guide/return/` - 返品・交換

### 新規コンポーネント
- `TrustBadges.astro` - 信頼性バッジ（創業75年、手描き、送料無料、返品可）

### 新規データファイル
- `src/data/shipping.ts` - 送料データ（地域別、10,000円以上送料無料）

---

## フレームワーク
- **Astro** v5.16.5 - 静的サイトジェネレーター（SSG）
- **出力モード**: static（静的サイト生成）

## スタイリング
- **Tailwind CSS** v3.4.19 - ユーティリティファーストCSS
- **@astrojs/tailwind** v6.0.2 - Astro統合

## カラーパレット（日本の伝統色）
- `gosu-blue` (#2C4A6B) - 藍色（呉須の色）
- `kinari` (#F5F2EB) - 生成り（和紙の色）
- `sumi` (#333333) - 墨色
- `akae-red` (#B54A32) - 赤絵の赤
- `yuu-green` (#5D7E5D) - 釉薬の緑

## フォント
- **Noto Serif JP** - 見出し・本文（明朝体）
- **Noto Sans JP** - UI要素（ゴシック体）

## 言語・型システム
- **TypeScript** - 厳格モード（astro/tsconfigs/strict）
- パスエイリアス: `@/*` → `src/*`

## ホスティング
- **Azure Static Web Apps** - 静的サイトホスティング
- 設定ファイル: `staticwebapp.config.json`, `azure.yaml`

## CI/CD
- **GitHub Actions** - 自動デプロイ
- ワークフロー: `.github/workflows/azure-static-web-apps.yml`
- トリガー: `main`ブランチへのプッシュ、PRでプレビュー環境作成

## API (Azure Functions)
- **ランタイム**: Node.js 18 (Managed Functions)
- **形式**: JavaScript (v3互換、function.json使用)
- **エンドポイント**: `/api/contact` (お問い合わせフォーム)

## ディレクトリ構造
```
src/
├── components/    # UIコンポーネント
├── content/       # コンテンツ（MD/MDX）
├── layouts/       # レイアウトテンプレート
├── pages/         # ページ（ルーティング）
└── styles/        # グローバルスタイル
```
