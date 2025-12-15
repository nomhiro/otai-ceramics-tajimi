# タスク完了時のチェックリスト

## 1. コード品質チェック
- [ ] TypeScriptエラーがないこと（`npm run build`で確認）
- [ ] Tailwind CSSクラスが正しく適用されていること
- [ ] レスポンシブデザインが機能していること

## 2. 仕様駆動開発（SPEC-Driven Development）
- [ ] 新機能の場合：`docs/SPEC.md`にSPECが追加されているか
- [ ] 仕様変更の場合：SPECが更新されているか
- [ ] 受け入れ条件を満たしているか

## 3. テスト（導入後）
- [ ] ユニットテスト：`npm run test`
- [ ] E2Eテスト：Playwright実行

## 4. ビルド確認
```bash
# 本番ビルド実行
npm run build

# ビルド結果のプレビュー
npm run preview
```

## 5. Git コミット
```bash
git add .
git commit -m "[SPEC-XXX] 変更内容の要約"
```

## 6. カバレッジ目標
- ビジネスロジック: 80%以上
- ユーティリティ関数: 90%以上
- E2Eシナリオ: 主要ユーザーフロー100%
