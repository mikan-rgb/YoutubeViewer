# YouTube Clone App

YouTubeのような動画検索・視聴アプリケーションです。React、Express.js、YouTube Data APIを使用して構築されています。

## 機能

- 🔍 YouTube動画検索
- 📺 動画再生（埋め込みプレイヤー）
- 🎬 人気動画の表示
- 🌙 ダーク/ライトテーマ切り替え
- 📱 レスポンシブデザイン
- 🎨 YouTubeライクなUI

## Renderでのデプロイ方法

### 1. GitHubリポジトリの準備
1. このコードをGitHubリポジトリにプッシュ
2. `render.yaml`ファイルが含まれていることを確認

### 2. YouTube Data API キーの取得
1. [Google Cloud Console](https://console.cloud.google.com/)にアクセス
2. 新しいプロジェクトを作成（または既存のものを選択）
3. YouTube Data API v3を有効化
4. APIキーを作成してコピー

### 3. Renderでのデプロイ
1. [Render](https://render.com/)にサインアップ/ログイン
2. 「New +」→ 「Web Service」を選択
3. GitHubリポジトリを接続
4. 環境変数を設定：
   - `YOUTUBE_API_KEY`: 取得したYouTubeのAPIキー
5. 「Deploy」をクリック

### 環境変数

本番環境では以下の環境変数が必要です：

```
YOUTUBE_API_KEY=your_youtube_api_key_here
NODE_ENV=production
```

## ローカル開発

```bash
# 依存関係のインストール
npm install

# 開発サーバー開始
npm run dev

# 本番ビルド
npm run build

# 本番サーバー開始
npm start
```

## 技術スタック

- **フロントエンド**: React 18, TypeScript, Tailwind CSS, shadcn/ui
- **バックエンド**: Express.js, Node.js
- **API**: YouTube Data API v3
- **ルーティング**: Wouter
- **状態管理**: TanStack Query
- **ビルドツール**: Vite

## API エンドポイント

- `GET /api/youtube/popular` - 人気動画の取得
- `GET /api/youtube/search?q={query}` - 動画検索
- `GET /api/youtube/videos?id={videoId}` - 動画詳細情報

## ライセンス

MIT