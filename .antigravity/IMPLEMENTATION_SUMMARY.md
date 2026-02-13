# 音楽検索アプリへの変更 - 実装完了

## 概要

映画と音楽の混在アプリを、**Spotify API**を使用した音楽専用の検索・発見プラットフォームに変更しました。

## 実装内容

### 1. Spotify API連携

#### ✅ 作成したファイル
- `src/lib/spotify.ts` - Spotify Web APIクライアント

#### 機能
- **認証**: Client Credentials Flowによるアクセストークン取得（キャッシュ機能付き）
- **検索**: `searchSpotify()` - アーティストとアルバムの検索
- **アーティスト詳細**: `getArtistDetails()` - 人気曲、アルバム一覧、フォロワー数など
- **アルバム詳細**: `getAlbumDetails()` - トラックリスト、リリース情報など
- **ユーティリティ関数**: 
  - `formatDuration()` - ミリ秒を MM:SS 形式に変換
  - `formatNumber()` - 数値をカンマ区切りで表示

### 2. ページの実装・更新

#### ✅ ホームページ (`src/app/page.tsx`)
- Spotify APIを使用したリアルタイム検索
- アーティストとアルバムを別セクションで表示
- 検索クエリがない場合は、検索を促すプロンプトを表示
- レスポンシブグリッドレイアウト（最大6カラム）

#### ✅ アーティスト詳細ページ (`src/app/artist/[id]/page.tsx`)
- ヒーローセクション: アーティスト画像、名前、フォロワー数、人気度、ジャンル
- 人気曲トップ10のリスト表示
- アルバム・シングル一覧（グリッド表示）
- Spotifyへの外部リンク

#### ✅ アルバム詳細ページ (`src/app/album/[id]/page.tsx`)
- ヒーローセクション: アルバム画像、タイトル、アーティスト、リリース年、曲数、総再生時間
- 全トラックリスト（トラック番号、曲名、再生時間）
- アルバム情報: レーベル、リリース日、著作権情報
- Spotifyへの外部リンク

#### ✅ Aboutページ (`src/app/about/page.tsx`)
- 音楽専用サービスの説明に更新
- Spotify API使用についての記載
- 技術スタックの説明

### 3. コンポーネントの更新

#### ✅ ヘッダー (`src/components/site-header.tsx`)
- ロゴを Music2 アイコンに変更
- サイト名を「Music Discovery」に変更
- ナビゲーションをシンプル化（「探す」と「About」のみ）
- 映画関連のメニュー項目を削除

#### ✅ 検索コンポーネント (`src/components/search.tsx`)
- placeholderプロパティを追加してカスタマイズ可能に

### 4. 環境設定

#### ✅ `.env.local`
```bash
SPOTIFY_CLIENT_ID="your_spotify_client_id_here"
SPOTIFY_CLIENT_SECRET="your_spotify_client_secret_here"
```

#### ✅ `README.md`
- Spotify API認証情報の取得方法を記載
- セットアップ手順を明記
- プロジェクト構造を文書化

### 5. UIコンポーネントの追加

```bash
npx shadcn@latest add separator
```

## セットアップ手順

### 必須: Spotify API認証情報の設定

アプリを動作させるには、Spotify Developerアカウントが必要です：

1. **Spotify for Developersにアクセス**
   - https://developer.spotify.com/dashboard
   
2. **新しいアプリを作成**
   - 「Create app」をクリック
   - アプリ名、説明を入力
   - Redirect URIsは不要（Client Credentials Flowを使用）
   
3. **認証情報を取得**
   - Client IDをコピー
   - 「Show client secret」をクリックしてClient Secretをコピー
   
4. **`.env.local`に設定**
   ```bash
   SPOTIFY_CLIENT_ID="コピーしたClient ID"
   SPOTIFY_CLIENT_SECRET="コピーしたClient Secret"
   ```

5. **開発サーバーを再起動**
   ```bash
   # Ctrl+C で停止してから
   npm run dev
   ```

## 主な機能

### 🔍 検索機能
- アーティスト名やアルバム名で検索
- リアルタイムでSpotify APIから結果を取得
- アーティストとアルバムを別々に表示

### 👤 アーティスト詳細
- プロフィール画像（円形表示）
- フォロワー数、人気度、ジャンル
- 人気曲トップ10
- アルバム・シングル一覧
- Spotifyで開くリンク

### 💿 アルバム詳細
- アルバムアートワーク
- 全トラックリスト（曲番号、曲名、再生時間）
- リリース情報（レーベル、日付）
- 著作権情報
- Spotifyで開くリンク

## デザインのハイライト

- **グラデーション**: ヒーローセクションでプライマリカラーのグラデーションを使用
- **ホバーエフェクト**: カード、画像に滑らかなホバーアニメーション
- **レスポンシブ**: モバイル（2列）からデスクトップ（6列）まで対応
- **シャドウ**: カードに微妙な影をつけて深みを演出
- **アイコン**: lucide-reactの音楽関連アイコンを活用

## 注意事項

⚠️ **現時点では、実際にSpotify APIを使用するには、有効なClient IDとClient Secretが必要です。**

`.env.local`のプレースホルダー値を、実際の認証情報に置き換えてください。

## 今後の拡張案

- [ ] お気に入り機能（ローカルストレージまたはDB保存）
- [ ] プレイリスト表示
- [ ] ユーザー認証（Authorization Code Flow）でパーソナライズ
- [ ] 曲のプレビュー再生機能
- [ ] 検索履歴の保存
- [ ] ジャンル別ブラウジング

---

以上で音楽専用アプリへの変更が完了しました！🎵
