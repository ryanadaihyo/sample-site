import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardHeader,
    CardContent,
    CardFooter,
    CardDescription,
    CardTitle,
} from "@/components/ui/card";
import { featuredContent } from "@/lib/mock-data";
import {
    VALID_CONTENT_TYPES,
    TYPE_PATH_MAP,
    TYPE_TITLE_MAP,
    type ContentType,
    type ContentItem,
} from "@/types/content";

export default async function TypePage(props: {
    params: Promise<{ type: string }>;
}) {
    const { type } = await props.params;

    // パスを正規化してContentTypeに変換
    const normalizedType: ContentType | undefined =
        TYPE_PATH_MAP[type] ??
        (VALID_CONTENT_TYPES.includes(type.toUpperCase() as ContentType)
            ? (type.toUpperCase() as ContentType)
            : undefined);

    if (!normalizedType) {
        notFound();
    }

    const items: ContentItem[] = featuredContent.filter(
        (item) => item.type === normalizedType
    );
    const title = TYPE_TITLE_MAP[normalizedType] ?? "コンテンツ一覧";

    return (
        <div className="container px-4 md:px-6 py-12 md:py-16 mx-auto">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
            </div>

            {items.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {items.map((item) => (
                        <ContentCard key={item.id} item={item} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <p className="text-muted-foreground">
                        コンテンツが見つかりませんでした。
                    </p>
                </div>
            )}
        </div>
    );
}

/** コンテンツカード */
function ContentCard({ item }: { item: ContentItem }) {
    return (
        <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 border-muted">
            <div className="relative aspect-[2/3] w-full overflow-hidden bg-muted">
                <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    priority
                />
                <div className="absolute top-2 right-2 z-10">
                    <Badge variant="secondary" className="shadow-sm">
                        {item.type}
                    </Badge>
                </div>
            </div>
            <CardHeader className="p-4 pb-2">
                <CardTitle className="line-clamp-1 text-lg">{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 pb-2">
                <CardDescription className="line-clamp-2 text-xs h-8">
                    {item.description}
                </CardDescription>
            </CardContent>
            <CardFooter className="p-4 pt-2">
                <Button asChild className="w-full" variant="outline" size="sm">
                    <Link href={`/${item.type.toLowerCase()}/${item.slug}`}>
                        詳細を見る
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
