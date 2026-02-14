/** Spotify API の型定義 */

export interface SpotifyImage {
    url: string;
}

export interface SpotifyExternalUrls {
    spotify: string;
}

export interface SpotifyFollowers {
    total: number;
}

export interface SpotifyArtistRef {
    id: string;
    name: string;
}

export interface SpotifyCopyright {
    text: string;
    type: string;
}

/** アーティスト（検索結果用） */
export interface SpotifyArtist {
    id: string;
    name: string;
    images: SpotifyImage[];
    genres: string[];
    followers: SpotifyFollowers;
    popularity: number;
    external_urls: SpotifyExternalUrls;
}

/** アルバム（一覧用） */
export interface SpotifyAlbum {
    id: string;
    name: string;
    artists: SpotifyArtistRef[];
    images: SpotifyImage[];
    release_date: string;
    total_tracks: number;
    album_type: string;
    external_urls: SpotifyExternalUrls;
}

/** トラック */
export interface SpotifyTrack {
    id: string;
    name: string;
    duration_ms: number;
    track_number: number;
    external_urls: SpotifyExternalUrls;
}

/** アーティスト詳細（トップトラック+アルバム付き） */
export interface SpotifyArtistDetail extends SpotifyArtist {
    top_tracks: SpotifyTrack[];
    albums: SpotifyAlbum[];
}

/** アルバム詳細（トラックリスト+メタ情報付き） */
export interface SpotifyAlbumDetail extends SpotifyAlbum {
    tracks: {
        items: SpotifyTrack[];
    };
    label: string;
    copyrights: SpotifyCopyright[];
}
