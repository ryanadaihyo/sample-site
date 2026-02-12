import { SiteHeader } from "@/components/site-header";

export default function AboutPage() {
    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground">
            <SiteHeader />

            <main className="flex-1 container px-4 md:px-6 py-12 md:py-16 mx-auto max-w-3xl">
                <div className="space-y-8">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight">Culture DBについて</h1>
                        <p className="text-xl text-muted-foreground">
                            映画と音楽のための、コミュニティ主導型データベース。
                        </p>
                    </div>

                    <div className="prose dark:prose-invert">
                        <p>
                            Culture DBは、映画や音楽などのカルチャーコンテンツを整理し、共有するためのプラットフォームです。
                            お気に入りの作品を見つけたり、自分だけのコレクションを作成したりすることができます。
                        </p>

                        <h3>ミッション</h3>
                        <p>
                            私たちのミッションは、世界中の素晴らしいカルチャーコンテンツを誰もが簡単にアクセスできるようにすることです。
                            隠れた名作から最新のヒット作まで、幅広い情報を網羅することを目指しています。
                        </p>

                        <h3>主な機能</h3>
                        <ul>
                            <li>
                                <strong>検索機能:</strong> タイトルやキーワードから作品を素早く検索できます。
                            </li>
                            <li>
                                <strong>カテゴリ別表示:</strong> 映画や音楽といったジャンルごとに作品を閲覧できます。
                            </li>
                            <li>
                                <strong>詳細情報:</strong> 各作品のあらすじ、公開日、アーティスト情報などを確認できます。
                            </li>
                        </ul>

                        <p>
                            このプロジェクトは現在開発中です。フィードバックや機能リクエストをお待ちしております。
                        </p>
                    </div>
                </div>
            </main>

            <footer className="border-t py-6 md:py-0">
                <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row mx-auto px-4">
                    <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                        &copy; 2026 Culture DB. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
