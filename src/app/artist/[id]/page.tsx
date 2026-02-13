import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getArtistDetails, formatNumber } from "@/lib/spotify";
import { ExternalLink, Music2, Users } from "lucide-react";

export default async function ArtistPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    let artist;
    try {
        artist = await getArtistDetails(id);
    } catch (error) {
        console.error("Failed to fetch artist:", error);
        notFound();
    }

    const imageUrl = artist.images?.[0]?.url || "/placeholder-artist.png";

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <SiteHeader />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative w-full h-[400px] overflow-hidden bg-gradient-to-b from-primary/20 to-background">
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent z-10" />
                    <Image
                        src={imageUrl}
                        alt={artist.name}
                        fill
                        className="object-cover opacity-30 blur-sm"
                        priority
                    />
                    <div className="relative z-20 container mx-auto px-4 h-full flex items-end pb-8">
                        <div className="flex gap-6 items-end">
                            <div className="relative w-48 h-48 rounded-full overflow-hidden shadow-2xl ring-4 ring-background">
                                <Image src={imageUrl} alt={artist.name} fill className="object-cover" />
                            </div>
                            <div className="flex-1 space-y-3 pb-2">
                                <Badge variant="secondary" className="mb-2">
                                    アーティスト
                                </Badge>
                                <h1 className="text-4xl md:text-6xl font-bold">{artist.name}</h1>
                                <div className="flex gap-4 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <Users className="h-4 w-4" />
                                        <span>{formatNumber(artist.followers?.total || 0)} フォロワー</span>
                                    </div>
                                    {artist.popularity > 0 && (
                                        <div className="flex items-center gap-2">
                                            <span>人気度: {artist.popularity}/100</span>
                                        </div>
                                    )}
                                </div>
                                {artist.genres?.length > 0 && (
                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {artist.genres?.slice(0, 5).map((genre) => (
                                            <Badge key={genre} variant="outline" className="capitalize">
                                                {genre}
                                            </Badge>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                <div className="container mx-auto px-4 py-8 max-w-7xl">
                    {/* Top Tracks */}
                    {artist.top_tracks?.length > 0 && (
                        <section className="mb-12">
                            <div className="flex items-center gap-2 mb-6">
                                <Music2 className="h-6 w-6 text-primary" />
                                <h2 className="text-2xl font-bold">人気曲</h2>
                            </div>
                            <div className="space-y-2">
                                {artist.top_tracks?.slice(0, 10).map((track, index) => (
                                    <div
                                        key={track.id}
                                        className="group flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                                    >
                                        <span className="text-muted-foreground w-6 text-center">
                                            {index + 1}
                                        </span>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium truncate group-hover:text-primary transition-colors">
                                                {track.name}
                                            </p>
                                        </div>
                                        {track.external_urls?.spotify && (
                                            <Button variant="ghost" size="sm" asChild>
                                                <a
                                                    href={track.external_urls.spotify}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <ExternalLink className="h-4 w-4" />
                                                </a>
                                            </Button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    <Separator className="my-8" />

                    {/* Albums */}
                    {artist.albums?.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold mb-6">アルバム & シングル</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                                {artist.albums?.map((album) => (
                                    <Link key={album.id} href={`/album/${album.id}`} className="group">
                                        <Card className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300">
                                            <div className="relative aspect-square w-full overflow-hidden bg-muted">
                                                <Image
                                                    src={album.images?.[0]?.url || "/placeholder-album.png"}
                                                    alt={album.name}
                                                    fill
                                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                                                />
                                            </div>
                                            <CardHeader className="p-3">
                                                <CardTitle className="text-sm line-clamp-2 group-hover:text-primary transition-colors">
                                                    {album.name}
                                                </CardTitle>
                                                <CardDescription className="text-xs">
                                                    {new Date(album.release_date).getFullYear()} • {album.album_type}
                                                </CardDescription>
                                            </CardHeader>
                                        </Card>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Spotify Link */}
                    {artist.external_urls?.spotify && (
                        <div className="mt-12 text-center">
                            <Button asChild size="lg" className="gap-2">
                                <a
                                    href={artist.external_urls.spotify}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Spotifyで開く
                                    <ExternalLink className="h-4 w-4" />
                                </a>
                            </Button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
