# 小田井窯 ウェブサイトリニューアル

美濃焼 小田井窯（おだいがま）の公式ウェブサイトリニューアルプロジェクトです。

## プロジェクト概要

| 項目 | 内容 |
|------|------|
| サイト名 | 美濃焼 小田井窯 |
| 現行URL | http://www.otai.co.jp/ |
| 運営会社 | 有限会社 小田井商店 |
| 所在地 | 〒507-0828 岐阜県多治見市三笠町2-10 |
| 開設日 | 1999年7月15日（リニューアル対象） |

### 目的

1999年に開設されたレガシーサイトを、モダンで安全なECサイトへ刷新します。

### 解決する課題

- Shift_JIS → UTF-8（文字化け解消）
- HTTP → HTTPS（セキュリティ強化）
- テーブルレイアウト → レスポンシブデザイン（スマホ対応）
- CGIスクリプト → モダンなフォーム（セキュリティリスク排除）

---

## 技術スタック

```
フレームワーク: Astro 5.x
スタイリング:   TailwindCSS 3.x
ホスティング:   Azure Static Web Apps
API:           Azure Functions (Node.js 18, Managed Functions)
インフラ:      Bicep (Azure Developer CLI対応)
CI/CD:         GitHub Actions
```

### 共通

```
分析: Google Analytics 4
SEO: Schema.org構造化データ
アクセシビリティ: WCAG 2.1 AA
```

---

## ディレクトリ構成

```
otai-ceramics-tajimi/
├── src/
│   ├── components/     # UIコンポーネント (Header, Footer等)
│   ├── content/        # コンテンツデータ
│   ├── layouts/        # レイアウトコンポーネント
│   ├── pages/          # ページコンポーネント
│   │   ├── index.astro      # トップページ
│   │   ├── about.astro      # 小田井窯について
│   │   ├── contact.astro    # お問い合わせ
│   │   ├── custom.astro     # オリジナル製品(OEM)
│   │   ├── products/        # 商品ページ
│   │   ├── thanks.astro     # 送信完了
│   │   └── 404.astro        # 404エラー
│   └── styles/         # グローバルスタイル
├── .github/workflows/  # GitHub Actions CI/CD
├── api/                # Azure Functions (お問い合わせAPI)
├── infra/              # Bicepテンプレート (Azure IaC)
├── public/             # 静的ファイル
├── docs/               # ドキュメント
│   ├── Requirements.md # 要件定義書
│   └── SPEC.md         # 仕様書
├── astro.config.mjs    # Astro設定
├── tailwind.config.mjs # TailwindCSS設定
├── azure.yaml          # Azure Developer CLI設定
└── staticwebapp.config.json # Static Web Apps設定
```

---

## ドキュメント

| ドキュメント | 説明 |
|-------------|------|
| [CLAUDE.md](CLAUDE.md) | 開発ガイドライン |
| [docs/Requirements.md](docs/Requirements.md) | 要件定義書 |
| [docs/SPEC.md](docs/SPEC.md) | 仕様書（仕様駆動開発） |

---

## 開発方針

本プロジェクトは **仕様駆動開発（SPEC-Driven Development）** を採用しています。

```
要件確認 → SPEC作成 → レビュー → 実装 → テスト → SPEC更新
```

詳細は [CLAUDE.md](CLAUDE.md) を参照してください。

---

## セットアップ

### 前提条件

- Node.js 18以上
- Azure Developer CLI (azd) - デプロイ時に必要

### インストール

```bash
# リポジトリをクローン
git clone <repository-url>
cd otai-ceramics-tajimi

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev
```

### 開発コマンド

| コマンド | 説明 |
|---------|------|
| `npm run dev` | 開発サーバーを起動 (localhost:4321) |
| `npm run build` | プロダクションビルド |
| `npm run preview` | ビルド結果をプレビュー |

### Azureへのデプロイ

#### 方法1: GitHub Actions（自動デプロイ・推奨）

`main`ブランチへのプッシュで自動デプロイされます。

```bash
git push origin main
```

**初回セットアップ:**
1. Azure PortalでStatic Web Appsのデプロイトークンを取得
2. GitHubリポジトリのSecretsに`AZURE_STATIC_WEB_APPS_API_TOKEN`として登録

#### 方法2: Azure Developer CLI（手動デプロイ）

```bash
azd up
```

---

## 商品シリーズ

小田井窯の主要商品シリーズ：

| シリーズ | 特徴 |
|----------|------|
| 二輪花シリーズ | 二輪の花をモチーフにした絵付け |
| 鳥絵シリーズ | 青鳥・茶鳥など（サライ掲載） |
| 楽々絵シリーズ | カジュアルなデザイン |
| 六絵シリーズ | ろく絵（サライ掲載） |
| ばら絵シリーズ | バラをモチーフにした絵付け |
| 園絵シリーズ | その他の絵付けシリーズ |
| 染付シリーズ | 呉須による藍色の絵付け（朝日新聞掲載） |
| 赤絵シリーズ | 赤を基調とした絵付け |
| 徳利・盃 | 酒器専門カタログ |

---

## ライセンス

Copyright (c) 有限会社 小田井商店. All rights reserved.

---

## 連絡先

- TEL: 0572-22-2161
- FAX: 0572-22-2163
- Email: webmaster@otai.co.jp
- 営業時間: 午前8時〜午後5時（日曜定休）
