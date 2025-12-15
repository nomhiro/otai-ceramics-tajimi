# SendGrid 設定手順書

お問い合わせフォームからのメール送信に使用するSendGridの設定手順です。

## 目次

1. [SendGridアカウント作成](#1-sendgridアカウント作成)
2. [APIキーの発行](#2-apiキーの発行)
3. [送信元メールの認証](#3-送信元メールの認証)
4. [Azure Static Web Appsへの設定](#4-azure-static-web-appsへの設定)
5. [ローカル開発環境の設定](#5-ローカル開発環境の設定)
6. [動作確認](#6-動作確認)
7. [トラブルシューティング](#7-トラブルシューティング)

---

## 1. SendGridアカウント作成

1. [SendGrid公式サイト](https://sendgrid.com/) にアクセス
2. 「Start For Free」をクリック
3. 必要事項を入力してアカウントを作成
   - 無料プラン: 月100通まで送信可能
   - 有料プランは送信量に応じて選択

> **注意**: アカウント作成後、本人確認が完了するまで数時間〜1日かかる場合があります。

---

## 2. APIキーの発行

1. [SendGridダッシュボード](https://app.sendgrid.com/) にログイン
2. 左メニューから **Settings** → **API Keys** を選択
3. **Create API Key** をクリック
4. 以下を設定:
   - **API Key Name**: `otai-contact-form`（任意の名前）
   - **API Key Permissions**: **Restricted Access** を選択
5. **Mail Send** の項目で **Full Access** を選択
6. **Create & View** をクリック
7. 表示されたAPIキーをコピーして安全な場所に保存

> **重要**: APIキーはこの画面でしか表示されません。必ずコピーして保存してください。紛失した場合は再発行が必要です。

### APIキーの形式

```
SG.xxxxxxxxxxxxxxxxxxxxxxxx.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## 3. 送信元メールの認証

SendGridでメールを送信するには、送信元メールアドレスの認証が必要です。

### 方法A: Single Sender Verification（簡易）

個別のメールアドレスを認証する方法です。

1. **Settings** → **Sender Authentication** を選択
2. **Single Sender Verification** の **Get Started** をクリック
3. **Create a Sender** をクリック
4. 以下を入力:
   - **From Email Address**: `noreply@otai.co.jp`
   - **From Name**: `小田井窯`
   - **Reply To**: `webmaster@otai.co.jp`
   - その他必要事項
5. **Create** をクリック
6. 入力したメールアドレスに確認メールが届くので、リンクをクリックして認証

### 方法B: Domain Authentication（推奨）

ドメイン全体を認証する方法です。より信頼性が高く、迷惑メール判定されにくくなります。

1. **Settings** → **Sender Authentication** を選択
2. **Domain Authentication** の **Get Started** をクリック
3. DNSホストを選択（不明な場合は「Other Host」）
4. ドメイン名 `otai.co.jp` を入力
5. 表示されるDNSレコード（CNAME）をドメインのDNS設定に追加
6. DNSレコード追加後、**Verify** をクリック

> **注意**: DNS設定の反映には最大48時間かかる場合があります。

---

## 4. Azure Static Web Appsへの設定

### 必要な環境変数

| 環境変数名 | 必須 | 説明 | デフォルト値 |
|-----------|:----:|------|-------------|
| `SENDGRID_API_KEY` | ✅ | SendGrid APIキー | なし |
| `CONTACT_TO_EMAIL` | - | 送信先メール | `webmaster@otai.co.jp` |
| `CONTACT_FROM_EMAIL` | - | 送信元メール | `noreply@otai.co.jp` |

### 方法A: Azureポータルから設定

1. [Azureポータル](https://portal.azure.com/) にログイン
2. 対象のStatic Web Appsリソースを開く
3. 左メニューから **設定** → **構成** を選択
4. **アプリケーション設定** タブで **+ 追加** をクリック
5. 以下を設定:

   | 名前 | 値 |
   |------|-----|
   | `SENDGRID_API_KEY` | 取得したAPIキー |

6. 必要に応じて `CONTACT_TO_EMAIL`、`CONTACT_FROM_EMAIL` も追加
7. **保存** をクリック

### 方法B: Azure CLIから設定

```bash
az staticwebapp appsettings set \
  --name <your-static-web-app-name> \
  --resource-group <your-resource-group> \
  --setting-names \
    SENDGRID_API_KEY="SG.xxxxxxxxxxxxxxxxxxxxx"
```

---

## 5. ローカル開発環境の設定

### 5.1 local.settings.json の作成

`api/` フォルダに `local.settings.json` を作成:

```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "",
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "SENDGRID_API_KEY": "SG.xxxxxxxxxxxxxxxxxxxxx",
    "CONTACT_TO_EMAIL": "your-test-email@example.com",
    "CONTACT_FROM_EMAIL": "noreply@otai.co.jp"
  }
}
```

### 5.2 .gitignore の確認

`local.settings.json` が `.gitignore` に含まれていることを確認:

```gitignore
api/local.settings.json
```

### 5.3 ローカルでの実行

```bash
swa start dist --api-location api
```

---

## 6. 動作確認

### 6.1 テスト送信

1. ウェブサイトのお問い合わせフォームにアクセス
2. テストデータを入力して送信
3. 送信先メールアドレスにメールが届くことを確認

### 6.2 SendGridダッシュボードで確認

1. [SendGridダッシュボード](https://app.sendgrid.com/) にログイン
2. **Activity** → **Activity Feed** でメール送信履歴を確認

---

## 7. トラブルシューティング

### メールが届かない

| 症状 | 原因 | 対処法 |
|------|------|--------|
| 送信自体が失敗 | APIキーが無効 | APIキーを再確認・再発行 |
| 送信成功だが届かない | 送信元未認証 | Sender Authenticationを完了 |
| 迷惑メールに入る | ドメイン認証未完了 | Domain Authenticationを設定 |
| 403エラー | APIキーの権限不足 | Mail Send権限を確認 |

### よくあるエラー

| エラー | 原因 | 対処法 |
|--------|------|--------|
| `401 Unauthorized` | APIキーが正しくない | APIキーを再確認 |
| `403 Forbidden` | 送信元未認証 or 権限不足 | Sender Authentication完了、権限確認 |
| `400 Bad Request` | リクエスト形式エラー | メールアドレス形式を確認 |

---

## 参考リンク

- [SendGrid公式ドキュメント](https://docs.sendgrid.com/)
- [SendGrid API v3リファレンス](https://docs.sendgrid.com/api-reference/mail-send/mail-send)
- [Azure Static Web Apps 環境変数設定](https://docs.microsoft.com/ja-jp/azure/static-web-apps/application-settings)
