import { Music2 } from "lucide-react";

export default function Loading() {
    return (
        <div className="flex items-center justify-center py-32">
            <div className="flex flex-col items-center gap-4">
                <Music2 className="h-10 w-10 text-primary animate-pulse" />
                <p className="text-muted-foreground text-sm animate-pulse">
                    読み込み中...
                </p>
            </div>
        </div>
    );
}
