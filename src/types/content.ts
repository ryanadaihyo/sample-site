/** コンテンツ（モックデータ）の型定義 */

export type ContentType = "MUSIC" | "ARTIST" | "ALBUM";

export interface ContentItem {
    id: string;
    title: string;
    type: ContentType;
    description: string;
    imageUrl: string;
    slug: string;
    releaseDate: Date;
}

/** 有効なルートパラメータ型 */
export const VALID_CONTENT_TYPES: readonly ContentType[] = [
    "MUSIC",
    "ARTIST",
    "ALBUM",
] as const;

/** URL パスから ContentType への正規化マッピング */
export const TYPE_PATH_MAP: Record<string, ContentType> = {
    music: "MUSIC",
    artists: "ARTIST",
    album: "ALBUM",
    artist: "ARTIST",
    albums: "ALBUM",
};

/** ContentType から日本語タイトルへのマッピング */
export const TYPE_TITLE_MAP: Record<ContentType, string> = {
    MUSIC: "音楽一覧",
    ARTIST: "有名人一覧",
    ALBUM: "アルバム一覧",
};

/** ContentType から日本語ラベルへのマッピング */
export const TYPE_LABEL_MAP: Record<ContentType, string> = {
    MUSIC: "音楽",
    ARTIST: "アーティスト",
    ALBUM: "アルバム",
};
