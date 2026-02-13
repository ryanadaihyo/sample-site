import { SiteHeader } from "@/components/site-header";

export default function AboutPage() {
    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground">
            <SiteHeader />

            <main className="flex-1 container px-4 md:px-6 py-12 md:py-16 mx-auto max-w-3xl">
                <div className="space-y-8">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight">Music Discoveryについて</h1>
                        <p className="text-xl text-muted-foreground">
                            Spotify APIを活用した、音楽発見プラットフォーム。
                        </p>
                    </div>

                    <div className="prose dark:prose-invert">
                        <p>
                            Music Discoveryは、Spotify Web APIを使用して、世界中の音楽を探索できるプラットフォームです。
                            お気に入りのアーティストやアルバムを見つけたり、新しい音楽を発見したりすることができます。
                        </p>

                        <h3>ミッション</h3>
                        <p>
                            私たちのミッションは、Spotifyの膨大な音楽データベースを活用し、
                            誰もが簡単に素晴らしい音楽を発見できるようにすることです。
                            アーティストの詳細情報からアルバムのトラックリストまで、
                            リッチな音楽体験を提供します。
                        </p>

                        <h3>主な機能</h3>
                        <ul>
                            <li>
                                <strong>リアルタイム検索:</strong> Spotify APIを使用して、アーティストやアルバムをリアルタイムで検索できます。
                            </li>
                            <li>
                                <strong>アーティスト詳細:</strong> 人気曲、アルバム一覧、フォロワー数など、充実したアーティスト情報を表示します。
                            </li>
                            <li>
                                <strong>アルバム詳細:</strong> トラックリスト、リリース日、レーベル情報など、詳細なアルバム情報を確認できます。
                            </li>
                            <li>
                                <strong>Spotify連携:</strong> 気に入った曲やアルバムは、Spotifyで直接開くことができます。
                            </li>
                        </ul>

                        <h3>技術スタック</h3>
                        <p>
                            このプラットフォームは、Next.js 15、TypeScript、Tailwind CSS、shadcn/uiを使用して構築されています。
                            Spotify Web API（Client Credentials Flow）により、認証なしで音楽データを取得しています。
                        </p>

                        <p>
                            このプロジェクトは現在開発中です。フィードバックや機能リクエストをお待ちしております。
                        </p>
                    </div>
                </div>
            </main>

            <footer className="border-t py-6 md:py-0">
                <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row mx-auto px-4">
                    <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                        &copy; 2026 Music Discovery. Powered by Spotify.
                    </p>
                </div>
            </footer>
        </div>
    );
}
