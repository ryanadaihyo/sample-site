import type { ContentItem } from "@/types/content";

export const featuredContent: ContentItem[] = [
    {
        id: "3",
        title: "Kind of Blue",
        type: "MUSIC",
        description:
            "アメリカのジャズトランペット奏者マイルス・デイヴィスによるスタジオ・アルバム。",
        imageUrl:
            "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=60",
        slug: "kind-of-blue",
        releaseDate: new Date("1959-08-17"),
    },
    {
        id: "5",
        title: "Abbey Road",
        type: "MUSIC",
        description: "ビートルズによる12作目のスタジオ・アルバム。",
        imageUrl:
            "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=800&auto=format&fit=crop&q=60",
        slug: "abbey-road",
        releaseDate: new Date("1969-09-26"),
    },
    {
        id: "6",
        title: "The Dark Side of the Moon",
        type: "MUSIC",
        description: "ピンク・フロイドによる8作目のスタジオ・アルバム。",
        imageUrl:
            "https://images.unsplash.com/photo-1481833761820-0509d3217039?w=800&auto=format&fit=crop&q=60",
        slug: "dark-side-of-the-moon",
        releaseDate: new Date("1973-03-01"),
    },
    {
        id: "8",
        title: "Thriller",
        type: "MUSIC",
        description: "マイケル・ジャクソンによる6作目のスタジオ・アルバム。",
        imageUrl:
            "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=60",
        slug: "thriller",
        releaseDate: new Date("1982-11-30"),
    },
    {
        id: "9",
        title: "The Beatles",
        type: "ARTIST",
        description:
            "イギリス・リヴァプール出身のロックバンド。20世紀を代表する音楽グループ。",
        imageUrl:
            "https://images.unsplash.com/photo-1526478806334-5fd488fcaabc?w=800&auto=format&fit=crop&q=60",
        slug: "the-beatles",
        releaseDate: new Date("1960-01-01"),
    },
    {
        id: "10",
        title: "Revolver",
        type: "ALBUM",
        description: "ビートルズの7作目のイギリス盤公式オリジナル・アルバム。",
        imageUrl:
            "https://images.unsplash.com/photo-1514525253440-b393452e8d26?w=800&auto=format&fit=crop&q=60",
        slug: "revolver",
        releaseDate: new Date("1966-08-05"),
    },
];
