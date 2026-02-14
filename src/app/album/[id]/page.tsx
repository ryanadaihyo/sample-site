import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Comments } from "@/components/comments/comments";
import { getComments } from "@/lib/actions/comments";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getAlbumDetails, formatDuration } from "@/lib/spotify";
import { ExternalLink, Clock, Calendar, Disc3 } from "lucide-react";
import type { SpotifyTrack, SpotifyCopyright } from "@/types/spotify";

export default async function AlbumPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    let album;
    try {
        album = await getAlbumDetails(id);
    } catch (error) {
        console.error("Failed to fetch album:", error);
        notFound();
    }

    const { comments } = await getComments(id);
    const imageUrl = album.images?.[0]?.url || "/placeholder-album.png";
    const releaseYear = album.release_date
        ? new Date(album.release_date).getFullYear()
        : null;
    const totalDuration =
        album.tracks?.items?.reduce((acc, track) => acc + track.duration_ms, 0) ??
        0;

    return (
        <>
            {/* Hero Section */}
            <section className="relative w-full h-[400px] overflow-hidden bg-gradient-to-b from-primary/20 to-background">
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent z-10" />
                <Image
                    src={imageUrl}
                    alt={album.name}
                    fill
                    className="object-cover opacity-30 blur-xl"
                    priority
                />
                <div className="relative z-20 container mx-auto px-4 h-full flex items-end pb-8">
                    <div className="flex gap-6 items-end">
                        <div className="relative w-48 h-48 rounded-lg overflow-hidden shadow-2xl ring-4 ring-background">
                            <Image
                                src={imageUrl}
                                alt={album.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="flex-1 space-y-3 pb-2">
                            <Badge variant="secondary" className="mb-2 capitalize">
                                {album.album_type}
                            </Badge>
                            <h1 className="text-4xl md:text-6xl font-bold">{album.name}</h1>
                            <div className="flex flex-wrap gap-2 text-sm">
                                {album.artists?.map((artist, index) => (
                                    <span key={artist.id}>
                                        <Link
                                            href={`/artist/${artist.id}`}
                                            className="font-semibold hover:underline hover:text-primary"
                                        >
                                            {artist.name}
                                        </Link>
                                        {index < (album.artists?.length ?? 0) - 1 && ", "}
                                    </span>
                                ))}
                            </div>
                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground pt-2">
                                {releaseYear && (
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        <span>{releaseYear}</span>
                                    </div>
                                )}
                                <div className="flex items-center gap-2">
                                    <Disc3 className="h-4 w-4" />
                                    <span>{album.total_tracks} 曲</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4" />
                                    <span>{formatDuration(totalDuration)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content */}
            <div className="container mx-auto px-4 py-8 max-w-5xl">
                {/* Track List */}
                {album.tracks?.items?.length > 0 && (
                    <TrackListSection tracks={album.tracks.items} />
                )}

                {/* Album Info */}
                {(album.label || album.copyrights?.length > 0) && (
                    <AlbumInfoSection
                        label={album.label}
                        releaseDate={album.release_date}
                        copyrights={album.copyrights}
                    />
                )}

                {/* Spotify Link */}
                {album.external_urls?.spotify && (
                    <div className="mt-12 text-center">
                        <Button asChild size="lg" className="gap-2">
                            <a
                                href={album.external_urls.spotify}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Spotifyで開く
                                <ExternalLink className="h-4 w-4" />
                            </a>
                        </Button>
                    </div>
                )}

                <Separator className="my-12" />

                {/* Comments */}
                <div className="max-w-3xl mx-auto">
                    <Comments initialComments={comments} pageId={id} />
                </div>
            </div>
        </>
    );
}

/** トラックリストセクション */
function TrackListSection({ tracks }: { tracks: SpotifyTrack[] }) {
    return (
        <section>
            <h2 className="text-2xl font-bold mb-6">トラックリスト</h2>
            <div className="space-y-1">
                {tracks.map((track) => (
                    <div
                        key={track.id}
                        className="group flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                        <span className="text-muted-foreground w-8 text-center">
                            {track.track_number}
                        </span>
                        <div className="flex-1 min-w-0">
                            <p className="font-medium truncate group-hover:text-primary transition-colors">
                                {track.name}
                            </p>
                        </div>
                        <span className="text-sm text-muted-foreground tabular-nums">
                            {formatDuration(track.duration_ms)}
                        </span>
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
    );
}

/** アルバム情報セクション */
function AlbumInfoSection({
    label,
    releaseDate,
    copyrights,
}: {
    label?: string;
    releaseDate?: string;
    copyrights?: SpotifyCopyright[];
}) {
    return (
        <>
            <Separator className="my-8" />
            <section className="space-y-4 text-sm text-muted-foreground">
                {label && (
                    <div>
                        <span className="font-semibold text-foreground">レーベル: </span>
                        {label}
                    </div>
                )}
                {releaseDate && (
                    <div>
                        <span className="font-semibold text-foreground">
                            リリース日:{" "}
                        </span>
                        {new Date(releaseDate).toLocaleDateString("ja-JP", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </div>
                )}
                {copyrights && copyrights.length > 0 && (
                    <div className="space-y-1">
                        {copyrights.map((copyright, index) => (
                            <div key={index} className="text-xs">
                                {copyright.text}
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </>
    );
}
