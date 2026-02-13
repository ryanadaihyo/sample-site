// Spotify Web API client - Simplified version

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET) {
    console.error('⚠️  Spotify credentials are not set!');
}

const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const SEARCH_ENDPOINT = 'https://api.spotify.com/v1/search';
const ARTIST_ENDPOINT = 'https://api.spotify.com/v1/artists';
const ALBUM_ENDPOINT = 'https://api.spotify.com/v1/albums';

// Token cache
let tokenCache: { token: string; expires: number } | null = null;

// Helper: Sleep function
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Get access token with polite delay
async function getAccessToken(): Promise<string> {
    // Return cached token if valid (add buffer of 5 minutes)
    if (tokenCache && tokenCache.expires > Date.now() + 300000) {
        return tokenCache.token;
    }

    // Add random delay to prevent thundering herd (500ms - 1500ms)
    await sleep(500 + Math.random() * 1000);

    const basic = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64');

    const response = await fetch(TOKEN_ENDPOINT, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${basic}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'grant_type=client_credentials',
        cache: 'no-store',
    });

    if (!response.ok) {
        const error = await response.text();
        console.error('❌ Token error:', response.status, error);
        throw new Error(`Failed to get token: ${response.status}`);
    }

    const data = await response.json();

    tokenCache = {
        token: data.access_token,
        expires: Date.now() + (data.expires_in - 60) * 1000,
    };

    console.log('✅ Token obtained successfully');
    return data.access_token;
}

// Artist interface
export interface SpotifyArtist {
    id: string;
    name: string;
    images: { url: string }[];
    genres: string[];
    followers: { total: number };
    popularity: number;
    external_urls: { spotify: string };
}

// Album interface
export interface SpotifyAlbum {
    id: string;
    name: string;
    artists: { id: string; name: string }[];
    images: { url: string }[];
    release_date: string;
    total_tracks: number;
    album_type: string;
    external_urls: { spotify: string };
}

// Track interface
export interface SpotifyTrack {
    id: string;
    name: string;
    duration_ms: number;
    track_number: number;
    external_urls: { spotify: string };
}

// Search for artists
export async function searchArtists(query: string, limit = 20): Promise<SpotifyArtist[]> {
    if (!query || !query.trim()) {
        return [];
    }

    const token = await getAccessToken();

    // Ensure limit is a valid integer between 1 and 50
    const validLimit = Math.max(1, Math.min(50, Math.floor(limit)));

    const params = new URLSearchParams();
    params.append('q', query);
    params.append('type', 'artist');

    // Only append limit if it's not the default (20) to avoid potential API issues
    if (validLimit !== 20) {
        params.append('limit', validLimit.toString());
    }

    const url = `${SEARCH_ENDPOINT}?${params.toString()}`;

    console.log('🔍 Searching artists calling:', url);

    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        cache: 'no-store',
    });

    if (!response.ok) {
        const error = await response.text();
        console.error('❌ Search error:', response.status, error);
        throw new Error(`Search failed: ${response.status} ${error}`);
    }

    const data = await response.json();
    return data.artists?.items || [];
}

// Search for albums
export async function searchAlbums(query: string, limit = 20): Promise<SpotifyAlbum[]> {
    if (!query || !query.trim()) {
        return [];
    }

    const token = await getAccessToken();

    const params = new URLSearchParams();
    params.append('q', query);
    params.append('type', 'album');
    params.append('limit', limit.toString());

    const url = `${SEARCH_ENDPOINT}?${params.toString()}`;

    console.log('🔍 Searching albums:', url);

    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        cache: 'no-store',
    });

    if (!response.ok) {
        const error = await response.text();
        console.error('❌ Search error:', response.status, error);
        throw new Error(`Search failed: ${response.status} ${error}`);
    }

    const data = await response.json();
    return data.albums?.items || [];
}

// Artist Detail interface
export interface SpotifyArtistDetail extends SpotifyArtist {
    top_tracks: SpotifyTrack[];
    albums: SpotifyAlbum[];
}

// Album Detail interface
export interface SpotifyAlbumDetail extends SpotifyAlbum {
    tracks: {
        items: SpotifyTrack[];
    };
    label: string;
    copyrights: { text: string; type: string }[];
}

// Get artist details
export async function getArtistDetails(artistId: string): Promise<SpotifyArtistDetail> {
    const token = await getAccessToken();
    console.log(`🔍 Fetching details for artist ID: ${artistId}`);

    // 1. Fetch artist (basic info)
    const artistResponse = await fetch(`${ARTIST_ENDPOINT}/${artistId}`, {
        headers: { 'Authorization': `Bearer ${token}` },
        cache: 'no-store',
    });

    if (!artistResponse.ok) {
        throw new Error(`Failed to fetch artist: ${artistResponse.status}`);
    }

    const artist = await artistResponse.json();
    console.log(`✅ Artist fetched: ${artist.name}`);

    // 2. Fetch Albums (Simplified parameters to avoid 400 errors)
    // Removed market parameter and include_groups to be safe
    const albumParams = new URLSearchParams({
        limit: '10', // Just get 10 recent items
    });

    const albumsResponse = await fetch(`${ARTIST_ENDPOINT}/${artistId}/albums?${albumParams}`, {
        headers: { 'Authorization': `Bearer ${token}` },
        cache: 'no-store',
    });

    let albums: SpotifyAlbum[] = [];
    if (albumsResponse.ok) {
        const data = await albumsResponse.json();
        albums = data.items || [];
        console.log(`✅ Albums fetched: ${albums.length}`);
    } else {
        console.error(`❌ Albums fetch failed: ${albumsResponse.status}`);
    }

    // 3. Get generic "Top Tracks" from the latest album
    // Since /top-tracks endpoint is unreliable with client credentials sometimes
    let topTracks: SpotifyTrack[] = [];

    if (albums.length > 0) {
        try {
            // Find the first actual album (not single) if possible, otherwise just first item
            const mainAlbum = albums.find(a => a.album_type === 'album') || albums[0];
            const targetAlbumId = mainAlbum.id;

            console.log(`🔄 Fetching tracks from album: ${targetAlbumId} (${mainAlbum.name})`);

            // Re-use getAlbumDetails which calls /albums/{id}
            // This endpoint reliably returns tracks as per user documentation
            const albumDetails = await getAlbumDetails(targetAlbumId);

            if (albumDetails.tracks?.items) {
                topTracks = albumDetails.tracks.items.slice(0, 5);
                console.log(`✅ Extracted ${topTracks.length} tracks from album`);
            }
        } catch (fallbackError) {
            console.error('❌ Failed to extract tracks from album:', fallbackError);
        }
    }

    return {
        ...artist,
        top_tracks: topTracks,
        albums: albums,
    };
}

// Get album details
export async function getAlbumDetails(albumId: string): Promise<SpotifyAlbumDetail> {
    const token = await getAccessToken();

    const response = await fetch(`${ALBUM_ENDPOINT}/${albumId}`, {
        headers: { 'Authorization': `Bearer ${token}` },
        cache: 'no-store',
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch album: ${response.status}`);
    }

    return response.json();
}

// Utility: Format duration
export function formatDuration(ms: number): string {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// Utility: Format number
export function formatNumber(num: number): string {
    return num.toLocaleString('ja-JP');
}
