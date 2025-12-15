# コードスタイル・規約

## ファイル命名規則
| 種類 | 規則 | 例 |
|------|------|-----|
| コンポーネント | PascalCase | `ProductCard.astro` |
| ユーティリティ | camelCase | `formatPrice.ts` |
| スタイル | kebab-case | `product-card.css` |
| テスト | `*.test.ts` または `*.spec.ts` | `formatPrice.test.ts` |

## コメント規則
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
function formatPriceWithTax(price: number, taxRate = 0.10): string { ... }
```

## テスト命名規則
```
[対象]_[条件]_[期待結果]

例:
- calculateTotal_withValidItems_returnsCorrectSum
- contactForm_withEmptyEmail_showsValidationError
```

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

## セキュリティ
### 禁止事項
- 機密情報（APIキー等）のハードコーディング
- `eval()` の使用
- ユーザー入力の直接HTML出力

### 必須対応
- SSL/TLS暗号化（HTTPS必須）
- CSRF対策（フォーム送信）
- 入力値のサニタイズ
- SQLインジェクション対策
