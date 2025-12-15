# CLAUDE.md - 開発ガイドライン

小田井窯ウェブサイトリニューアルプロジェクトの開発ガイドラインです。

## プロジェクト概要

| 項目 | 内容 |
|------|------|
| プロジェクト名 | 小田井窯（otai.co.jp）サイトリニューアル |
| 目的 | 1999年開設のレガシーサイトをモダンなECサイトへ刷新 |
| 対象 | 美濃焼（陶器）のオンラインショップ |

### 主要ドキュメント

- [Requirements.md](docs/Requirements.md) - 要件定義書（ユーザーストーリー、機能要件）
- [SPEC.md](docs/SPEC.md) - 仕様書（仕様駆動開発のマスター仕様）

---

## 仕様駆動開発（SPEC-Driven Development）

本プロジェクトは **仕様駆動開発** を採用しています。

### 開発フロー

```
1. 要件確認 → 2. SPEC作成 → 3. SPECレビュー → 4. 実装 → 5. テスト → 6. SPEC更新
```

### ルール

1. **実装前にSPECを書く**: 新機能の実装前に必ず `docs/SPEC.md` にSPECを追加する
2. **SPECと実装の整合性**: 実装はSPECに記載された受け入れ条件を満たすこと
3. **SPECの更新**: 仕様変更時は実装前にSPECを更新する

### SPECの構造

```markdown
## SPEC-XXX: 機能名

### 目的
この機能が必要な理由

### 要件
- [ ] 機能要件1
- [ ] 機能要件2

### 受け入れ条件
- [ ] 条件を満たしているか確認可能な項目

### テスト計画
- ユニットテスト: 対象と方針
- E2Eテスト: シナリオ
```

---

## テスト自動化方針

### テストの種類と優先度

| 優先度 | テスト種類 | 対象 | ツール例 |
|--------|-----------|------|----------|
| 高 | E2Eテスト | ユーザーフロー（購入、問い合わせ） | Playwright |
| 高 | 統合テスト | API、フォーム送信 | Jest, Vitest |
| 中 | ユニットテスト | ビジネスロジック、ユーティリティ | Jest, Vitest |
| 中 | アクセシビリティテスト | WCAG 2.1 AA準拠 | axe-core |
| 低 | パフォーマンステスト | Core Web Vitals | Lighthouse |

### カバレッジ目標

- ビジネスロジック: 80%以上
- ユーティリティ関数: 90%以上
- E2Eシナリオ: 主要ユーザーフロー100%

### テスト命名規則

```
[対象]_[条件]_[期待結果]

例:
- calculateTotal_withValidItems_returnsCorrectSum
- contactForm_withEmptyEmail_showsValidationError
```

---

## コーディング規約

### ファイル命名規則

| 種類 | 規則 | 例 |
|------|------|-----|
| コンポーネント | PascalCase | `ProductCard.tsx` |
| ユーティリティ | camelCase | `formatPrice.ts` |
| スタイル | kebab-case | `product-card.css` |
| テスト | `*.test.ts` または `*.spec.ts` | `formatPrice.test.ts` |

### ディレクトリ構成

```
otai-ceramics-tajimi/
├── CLAUDE.md              # 本ファイル
├── README.md              # プロジェクト概要
├── .github/workflows/     # GitHub Actions CI/CD
├── api/                   # Azure Functions API
│   ├── contact/           # お問い合わせAPI
│   └── host.json          # Functions設定
├── docs/
│   ├── Requirements.md    # 要件定義書
│   └── SPEC.md            # 仕様書
├── src/
│   ├── components/        # UIコンポーネント
│   ├── pages/             # ページコンポーネント
│   ├── utils/             # ユーティリティ関数
│   ├── hooks/             # カスタムフック
│   ├── types/             # 型定義
│   └── tests/             # テストファイル
├── infra/                 # Bicep (Azure IaC)
├── public/                # 静的ファイル
└── staticwebapp.config.json # SWA設定
```

### コメント規則

- **必須**: 複雑なビジネスロジックには日本語コメントを追加
- **禁止**: 自明なコードへのコメント
- **推奨**: JSDoc形式で関数のパラメータと戻り値を記述

```typescript
/**
 * 商品価格を税込み表示用にフォーマット
 * @param price - 税抜き価格
 * @param taxRate - 消費税率（デフォルト: 0.10）
 * @returns フォーマットされた税込み価格文字列（例: "¥1,100"）
 */
function formatPriceWithTax(price: number, taxRate = 0.10): string {
  // ...
}
```

---

## エラーハンドリング

### フォームバリデーション

- クライアントサイドで即座にフィードバック
- サーバーサイドでも必ず再検証
- エラーメッセージは日本語で具体的に

### APIエラー

- 適切なHTTPステータスコードを返す
- ユーザー向けエラーメッセージと開発者向けログを分離

---

## セキュリティ

### 必須対応

- [ ] SSL/TLS暗号化（HTTPS必須）
- [ ] CSRF対策（フォーム送信）
- [ ] 入力値のサニタイズ
- [ ] SQLインジェクション対策

### 禁止事項

- 機密情報（APIキー等）のハードコーディング
- `eval()` の使用
- ユーザー入力の直接HTML出力

---

## Git規約

### ブランチ命名

```
feature/SPEC-001-responsive-design
fix/SPEC-002-form-validation
```

### コミットメッセージ

```
[SPEC-XXX] 変更内容の要約

- 詳細1
- 詳細2
```

---

## CI/CD

### GitHub Actions 自動デプロイ

`main`ブランチへのプッシュで自動的にAzure Static Web Appsへデプロイされます。

**ワークフローファイル**: `.github/workflows/azure-static-web-apps.yml`

### デプロイフロー

```
main へプッシュ → GitHub Actions → ビルド → Azure Static Web Apps へデプロイ
```

### PRプレビュー環境

Pull Request作成時にステージング環境が自動作成されます。PRマージ/クローズで自動削除。

### 必要なSecrets

| Secret名 | 説明 |
|---------|------|
| `AZURE_STATIC_WEB_APPS_API_TOKEN` | Static Web Appsデプロイトークン |

### API (Azure Functions)

- **ランタイム**: Node.js 18
- **形式**: JavaScript (Managed Functions v3互換)
- **設定**: `staticwebapp.config.json` で `apiRuntime: "node:18"` を指定

---

## 参照ドキュメント

- [docs/Requirements.md](docs/Requirements.md) - 要件定義書
- [docs/SPEC.md](docs/SPEC.md) - 仕様書
