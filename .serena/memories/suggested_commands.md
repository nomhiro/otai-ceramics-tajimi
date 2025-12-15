# 推奨コマンド

## 開発コマンド
```bash
# 開発サーバー起動（ホットリロード）
npm run dev

# プロダクションビルド
npm run build

# ビルドプレビュー
npm run preview
```

## システムコマンド（Windows）
```powershell
# ディレクトリ一覧
dir
ls  # Git Bashの場合

# ファイル検索
dir /s /b *.astro  # CMD
Get-ChildItem -Recurse -Filter "*.astro"  # PowerShell
find . -name "*.astro"  # Git Bash

# 文字列検索
findstr /s /i "searchterm" *.ts  # CMD
Select-String -Path "*.ts" -Pattern "searchterm" -Recurse  # PowerShell
grep -r "searchterm" --include="*.ts"  # Git Bash

# カレントディレクトリ確認
cd  # CMD
Get-Location  # PowerShell

# Git操作
git status
git add .
git commit -m "[SPEC-XXX] 変更内容"
git push
```

## Azure Static Web Apps
```bash
# Azure CLIログイン
az login

# デプロイ（azure.yaml使用）
azd up
```
