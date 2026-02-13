# Music Discovery

Spotify Web APIを活用した音楽発見プラットフォーム。アーティストやアルバムを検索し、詳細情報を表示できます。

## 機能

- **リアルタイム検索**: Spotify APIを使用したアーティスト・アルバム検索
- **アーティスト詳細**: 人気曲、アルバム一覧、フォロワー数など
- **アルバム詳細**: トラックリスト、リリース日、レーベル情報など
- **Spotify連携**: 気に入った楽曲をSpotifyで直接開く

## セットアップ

### 1. Spotify API認証情報の取得

1. [Spotify for Developers](https://developer.spotify.com/dashboard)にアクセス
2. ログインして新しいアプリを作成
3. **Client ID**と**Client Secret**をコピー

### 2. 環境変数の設定

`.env.local`ファイルに以下を追加：

```bash
SPOTIFY_CLIENT_ID="your_spotify_client_id_here"
SPOTIFY_CLIENT_SECRET="your_spotify_client_secret_here"
```

### 3. 依存関係のインストールと開発サーバー起動

```bash
npm install
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

## 技術スタック

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **API**: Spotify Web API (Client Credentials Flow)
- **Database**: Vercel Postgres (Prisma)

## ディレクトリ構造

```
src/
├── app/
│   ├── page.tsx              # ホームページ（検索）
│   ├── artist/[id]/page.tsx  # アーティスト詳細
│   ├── album/[id]/page.tsx   # アルバム詳細
│   └── about/page.tsx        # Aboutページ
├── components/
│   ├── site-header.tsx       # ヘッダーコンポーネント
│   ├── search.tsx            # 検索コンポーネント
│   └── ui/                   # shadcn/uiコンポーネント
└── lib/
    ├── spotify.ts            # Spotify APIクライアント
    └── utils.ts              # ユーティリティ関数
```

## ライセンス

MIT

---

Powered by [Spotify Web API](https://developer.spotify.com/documentation/web-api)
