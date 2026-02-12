import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import JsonLd from '@/components/seo/JsonLd';

import { featuredContent } from '@/lib/mock-data';

type Props = {
    params: Promise<{
        type: string;
        slug: string;
    }>;
};

// Helper function to find content
async function findContent(type: string, slug: string) {
    // Use mock data only
    const mockItem = featuredContent.find(
        (item) => item.slug === slug && item.type === type
    );
    return mockItem || null;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
    const params = await props.params;
    const { type, slug } = params;
    const normalizedType = type.toUpperCase();

    const content = await findContent(normalizedType, slug);

    if (!content) {
        return {
            title: 'ページが見つかりません',
        };
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
    const params = await props.params;
    const { type, slug } = params;

    const normalizedType = type.toUpperCase();
    if (normalizedType !== 'MOVIE' && normalizedType !== 'MUSIC') {
        notFound();
    }

    const content = await findContent(normalizedType, slug);

    if (!content) {
        notFound();
    }

    // JSON-LD data construction
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': content.type === 'MOVIE' ? 'Movie' : 'MusicRecording',
        name: content.title,
        description: content.description,
        image: content.imageUrl,
        datePublished: content.releaseDate ? content.releaseDate.toISOString() : undefined,
    };

    return (
        <main className="container mx-auto py-10 px-4">
            <JsonLd data={jsonLd} />
            <article className="prose lg:prose-xl dark:prose-invert mx-auto">
                <h1 className="font-bold text-3xl md:text-4xl mb-6 text-center md:text-left">{content.title}</h1>
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
                    <p className="text-lg leading-relaxed text-muted-foreground">{content.description}</p>

                    <div className="flex items-center gap-4 mt-4">
                        <span className="inline-flex items-center justify-center rounded-full border px-3 py-1 text-sm font-medium shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">
                            {content.type === 'MOVIE' ? '映画' : '音楽'}
                        </span>
                        {content.releaseDate && (
                            <span className="text-sm text-muted-foreground">
                                公開日: {new Date(content.releaseDate).toLocaleDateString('ja-JP')}
                            </span>
                        )}
                    </div>
                </div>
            </article>
        </main>
    );
}
