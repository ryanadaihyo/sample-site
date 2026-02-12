import Link from "next/link";
import Image from "next/image";
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
import { Search } from "@/components/search";

import { featuredContent } from "@/lib/mock-data";

export default async function Home(props: {
  searchParams: Promise<{ q?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams.q || "";

  const filteredContent = featuredContent.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/20">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  至高のカルチャーを発見しよう
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  映画や音楽のための厳選されたデータベース。お気に入りのコンテンツを探して、整理しましょう。
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <Search />
              </div>
            </div>
          </div>
        </section>

        <section className="container px-4 md:px-6 py-12 md:py-16 mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold tracking-tight">注目コンテンツ</h2>
            {/* リンク先の実装がまだのため、一旦無効化、あるいは将来実装予定 */}
            {/* <Link href="/browse" className="text-sm font-medium hover:underline text-primary">
              すべて見る
            </Link> */}
          </div>

          {filteredContent.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredContent.map((item) => (
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
              <p className="text-muted-foreground">検索結果が見つかりませんでした。</p>
            </div>
          )}
        </section>
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
