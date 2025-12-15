# 技術スタック

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
