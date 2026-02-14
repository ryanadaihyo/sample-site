/**
 * 共通サイトフッター
 * レイアウトコンポーネントとして使用し、各ページでの重複を排除。
 */
export function SiteFooter() {
    return (
        <footer className="border-t py-6 md:py-0 mt-auto">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row mx-auto px-4">
                <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                    &copy; {new Date().getFullYear()} Music Discovery. Powered by
                    Spotify.
                </p>
            </div>
        </footer>
    );
}
