/**
 * Spotify Web API client - Mock version
 *
 * 型定義は @/types/spotify に分離。
 * 本番移行時は、このファイル内のモック関数を実API呼び出しに差し替える。
 */

import type {
    SpotifyArtist,
    SpotifyAlbum,
    SpotifyTrack,
    SpotifyArtistDetail,
    SpotifyAlbumDetail,
} from "@/types/spotify";

// Re-export types for backward compatibility
export type {
    SpotifyArtist,
    SpotifyAlbum,
    SpotifyTrack,
    SpotifyArtistDetail,
    SpotifyAlbumDetail,
} from "@/types/spotify";

// --- MOCK DATA ---

const MOCK_ARTISTS: SpotifyArtist[] = [
    {
        id: "mock-artist-1",
        name: "Mock Artist 1",
        images: [
            {
                url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=60",
            },
        ],
        genres: ["Pop", "Rock"],
        followers: { total: 1234567 },
        popularity: 85,
        external_urls: { spotify: "https://open.spotify.com/artist/mock1" },
    },
    {
        id: "mock-artist-2",
        name: "Mock Artist 2",
        images: [
            {
                url: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=800&auto=format&fit=crop&q=60",
            },
        ],
        genres: ["Jazz", "Blues"],
        followers: { total: 54321 },
        popularity: 65,
        external_urls: { spotify: "https://open.spotify.com/artist/mock2" },
    },
    {
        id: "mock-artist-3",
        name: "Mock Artist 3",
        images: [
            {
                url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=60",
            },
        ],
        genres: ["Indie", "Alternative"],
        followers: { total: 98765 },
        popularity: 72,
        external_urls: { spotify: "https://open.spotify.com/artist/mock3" },
    },
];

const MOCK_ALBUMS: SpotifyAlbum[] = [
    {
        id: "mock-album-1",
        name: "Greatest Hits",
        artists: [{ id: "mock-artist-1", name: "Mock Artist 1" }],
        images: [
            {
                url: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=800&auto=format&fit=crop&q=60",
            },
        ],
        release_date: "2023-01-01",
        total_tracks: 12,
        album_type: "album",
        external_urls: { spotify: "https://open.spotify.com/album/mock1" },
    },
    {
        id: "mock-album-2",
        name: "Live at Tokyo",
        artists: [{ id: "mock-artist-2", name: "Mock Artist 2" }],
        images: [
            {
                url: "https://images.unsplash.com/photo-1496293455970-f8581aae0e3c?w=800&auto=format&fit=crop&q=60",
            },
        ],
        release_date: "2024-05-20",
        total_tracks: 8,
        album_type: "compilation",
        external_urls: { spotify: "https://open.spotify.com/album/mock2" },
    },
];

const MOCK_TRACKS: SpotifyTrack[] = [
    {
        id: "mock-track-1",
        name: "Mock Song 1",
        duration_ms: 210000,
        track_number: 1,
        external_urls: { spotify: "https://open.spotify.com/track/mock1" },
    },
    {
        id: "mock-track-2",
        name: "Mock Song 2",
        duration_ms: 180000,
        track_number: 2,
        external_urls: { spotify: "https://open.spotify.com/track/mock2" },
    },
    {
        id: "mock-track-3",
        name: "Mock Song 3",
        duration_ms: 240000,
        track_number: 3,
        external_urls: { spotify: "https://open.spotify.com/track/mock3" },
    },
];

// --- MOCK FUNCTIONS ---

/** アーティストを検索する */
export async function searchArtists(
    query: string,
    _limit = 20
): Promise<SpotifyArtist[]> {
    const results = MOCK_ARTISTS.filter((artist) =>
        artist.name.toLowerCase().includes(query.toLowerCase())
    );
    return results.length > 0 ? results : MOCK_ARTISTS;
}

/** アルバムを検索する */
export async function searchAlbums(
    query: string,
    _limit = 20
): Promise<SpotifyAlbum[]> {
    const results = MOCK_ALBUMS.filter((album) =>
        album.name.toLowerCase().includes(query.toLowerCase())
    );
    return results.length > 0 ? results : MOCK_ALBUMS;
}

/** アーティスト詳細を取得する */
export async function getArtistDetails(
    artistId: string
): Promise<SpotifyArtistDetail> {
    const artist =
        MOCK_ARTISTS.find((a) => a.id === artistId) ?? MOCK_ARTISTS[0];
    return {
        ...artist,
        top_tracks: MOCK_TRACKS,
        albums: MOCK_ALBUMS,
    };
}

/** アルバム詳細を取得する */
export async function getAlbumDetails(
    albumId: string
): Promise<SpotifyAlbumDetail> {
    const album = MOCK_ALBUMS.find((a) => a.id === albumId) ?? MOCK_ALBUMS[0];
    return {
        ...album,
        tracks: { items: MOCK_TRACKS },
        label: "Mock Records",
        copyrights: [{ text: "© 2024 Mock Records", type: "C" }],
    };
}

// --- Utility Functions ---

/** 再生時間(ms)を "分:秒" 形式にフォーマットする */
export function formatDuration(ms: number): string {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

/** 数値をロケールに合わせてフォーマットする */
export function formatNumber(num: number): string {
    return num.toLocaleString("ja-JP");
}
