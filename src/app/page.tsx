import Link from "next/link";
import Image from "next/image";
import { Search } from "@/components/search";
import { searchArtists } from "@/lib/spotify";
import { Badge } from "@/components/ui/badge";
import { Music2 } from "lucide-react";
import type { SpotifyArtist } from "@/types/spotify";

export default async function Home(props: {
  searchParams: Promise<{ q?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams.q || "";

  let artists: SpotifyArtist[] = [];
  let searchError: string | null = null;

  if (query.trim()) {
    try {
      artists = await searchArtists(query, 20);
    } catch (error) {
      console.error("Search error:", error);
      searchError =
        error instanceof Error ? error.message : "検索に失敗しました";
    }
  }

  return (
    <>
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-muted/30 to-background">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                音楽の世界を探索しよう
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Spotifyの膨大な音楽データベースから、お気に入りのアーティストやアルバムを見つけましょう。
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2">
              <Search placeholder="アーティストやアルバムを検索..." />
            </div>
          </div>
        </div>
      </section>

      {/* Search Results / Empty State */}
      {query ? (
        <SearchResults
          query={query}
          artists={artists}
          error={searchError}
        />
      ) : (
        <EmptyState />
      )}
    </>
  );
}

/** 検索結果の表示 */
function SearchResults({
  query,
  artists,
  error,
}: {
  query: string;
  artists: SpotifyArtist[];
  error: string | null;
}) {
  if (error) {
    return (
      <section className="container px-4 md:px-6 py-12 md:py-16 mx-auto">
        <div className="text-center py-12">
          <p className="text-destructive mb-2">検索エラーが発生しました</p>
          <p className="text-sm text-muted-foreground">{error}</p>
        </div>
      </section>
    );
  }

  if (artists.length === 0) {
    return (
      <section className="container px-4 md:px-6 py-12 md:py-16 mx-auto">
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            「{query}」の検索結果が見つかりませんでした。
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="container px-4 md:px-6 py-12 md:py-16 mx-auto">
      <div className="space-y-12">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Music2 className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold tracking-tight">アーティスト</h2>
            <Badge variant="secondary" className="ml-2">
              {artists.length}
            </Badge>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {artists.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/** アーティストカード */
function ArtistCard({ artist }: { artist: SpotifyArtist }) {
  return (
    <Link href={`/artist/${artist.id}`} className="group">
      <div className="flex flex-col gap-3">
        <div className="relative aspect-square w-full overflow-hidden rounded-full bg-muted shadow-md group-hover:shadow-xl transition-all duration-300">
          <Image
            src={artist.images?.[0]?.url || "/placeholder-artist.png"}
            alt={artist.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
          />
        </div>
        <div className="text-center">
          <p className="font-semibold line-clamp-1 group-hover:text-primary transition-colors">
            {artist.name}
          </p>
          {artist.genres?.length > 0 && (
            <p className="text-xs text-muted-foreground line-clamp-1 mt-1">
              {artist.genres[0]}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}

/** 検索未入力時の空状態 */
function EmptyState() {
  return (
    <section className="container px-4 md:px-6 py-12 md:py-16 mx-auto">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <Music2 className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold">音楽を検索して始めましょう</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          上の検索バーにアーティスト名やアルバム名を入力して、お気に入りの音楽を探してください。
        </p>
      </div>
    </section>
  );
}
