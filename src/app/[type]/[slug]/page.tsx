import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import JsonLd from "@/components/seo/JsonLd";
import { Comments } from "@/components/comments/comments";
import { getComments } from "@/lib/actions/comments";
import { featuredContent } from "@/lib/mock-data";
import {
    VALID_CONTENT_TYPES,
    TYPE_LABEL_MAP,
    type ContentType,
    type ContentItem,
} from "@/types/content";

type Props = {
    params: Promise<{
        type: string;
        slug: string;
    }>;
};

/** モックデータからコンテンツを検索する */
function findContent(type: ContentType, slug: string): ContentItem | null {
    return (
        featuredContent.find(
            (item) => item.slug === slug && item.type === type
        ) ?? null
    );
}

export async function generateMetadata(props: Props): Promise<Metadata> {
    const { type, slug } = await props.params;
    const normalizedType = type.toUpperCase() as ContentType;
    const content = findContent(normalizedType, slug);

    if (!content) {
        return { title: "ページが見つかりません" };
    }

    return {
        title: content.title,
        description: content.description,
        openGraph: {
            title: content.title,
            description: content.description || undefined,
            images: content.imageUrl ? [{ url: content.imageUrl }] : undefined,
        },
    };
}

export default async function ContentPage(props: Props) {
    const { type, slug } = await props.params;

    const normalizedType = type.toUpperCase() as ContentType;
    if (!VALID_CONTENT_TYPES.includes(normalizedType)) {
        notFound();
    }

    const content = findContent(normalizedType, slug);
    if (!content) {
        notFound();
    }

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": content.type === "ARTIST" ? "MusicGroup" : "MusicAlbum",
        name: content.title,
        description: content.description,
        image: content.imageUrl,
        datePublished: content.releaseDate?.toISOString(),
    };

    const { comments } = await getComments(slug);

    const typeLabel = TYPE_LABEL_MAP[content.type];

    return (
        <div className="container mx-auto py-10 px-4">
            <JsonLd data={jsonLd} />
            <article className="prose lg:prose-xl dark:prose-invert mx-auto mb-16">
                <h1 className="font-bold text-3xl md:text-4xl mb-6 text-center md:text-left">
                    {content.title}
                </h1>
                {content.imageUrl && (
                    <div className="relative w-full aspect-video mb-8 rounded-lg overflow-hidden bg-muted shadow-md">
                        <Image
                            src={content.imageUrl}
                            alt={content.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 60vw"
                            priority
                        />
                    </div>
                )}
                <div className="flex flex-col gap-6">
                    <p className="text-lg leading-relaxed text-muted-foreground">
                        {content.description}
                    </p>
                    <div className="flex items-center gap-4 mt-4">
                        <span className="inline-flex items-center justify-center rounded-full border px-3 py-1 text-sm font-medium shadow-sm border-transparent bg-primary text-primary-foreground hover:bg-primary/80">
                            {typeLabel}
                        </span>
                        {content.releaseDate && (
                            <span className="text-sm text-muted-foreground">
                                公開日:{" "}
                                {new Date(content.releaseDate).toLocaleDateString("ja-JP")}
                            </span>
                        )}
                    </div>
                </div>
            </article>

            <div className="max-w-3xl mx-auto">
                <Comments initialComments={comments} pageId={slug} />
            </div>
        </div>
    );
}
