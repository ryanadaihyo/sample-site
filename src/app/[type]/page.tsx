import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
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

export default async function TypePage(props: {
    params: Promise<{ type: string }>;
}) {
    const params = await props.params;
    const { type } = params;

    // Map plural URLs to singular types
    let normalizedType = "";
    if (type === "movies") {
        normalizedType = "MOVIE";
    } else if (type === "music") {
        normalizedType = "MUSIC";
    } else {
        // Direct match or 404
        normalizedType = type.toUpperCase();
        if (normalizedType !== "MOVIE" && normalizedType !== "MUSIC") {
            notFound();
        }
    }

    const items = featuredContent.filter((item) => item.type === normalizedType);
    const title = normalizedType === "MOVIE" ? "映画一覧" : "音楽一覧";

    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground">
            <SiteHeader />

            <main className="flex-1 container px-4 md:px-6 py-12 md:py-16 mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
                </div>

                {items.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {items.map((item) => (
                            <Card key={item.id} className="overflow-hidden group hover:shadow-lg transition-all duration-300 border-muted">
                                <div className="relative aspect-[2/3] w-full overflow-hidden bg-muted">
                                    <Image
                                        src={item.imageUrl}
                                        alt={item.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                        priority={true}
                                    />
                                    <div className="absolute top-2 right-2 z-10">
                                        <Badge variant={item.type === 'MOVIE' ? 'default' : 'secondary'} className="shadow-sm">
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
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">コンテンツが見つかりませんでした。</p>
                    </div>
                )}
            </main>

            <footer className="border-t py-6 md:py-0">
                <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row mx-auto px-4">
                    <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                        &copy; 2026 Culture DB. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
