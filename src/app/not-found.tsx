import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Music2 } from "lucide-react";

export default function NotFound() {
    return (
        <div className="flex items-center justify-center py-32">
            <div className="flex flex-col items-center gap-6 text-center max-w-md px-4">
                <div className="rounded-full bg-muted p-4">
                    <Music2 className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                    <h1 className="text-4xl font-bold">404</h1>
                    <h2 className="text-xl font-semibold">ページが見つかりません</h2>
                    <p className="text-sm text-muted-foreground">
                        お探しのページは存在しないか、移動された可能性があります。
                    </p>
                </div>
                <Button asChild>
                    <Link href="/">トップページに戻る</Link>
                </Button>
            </div>
        </div>
    );
}
