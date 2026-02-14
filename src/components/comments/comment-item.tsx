"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Reply } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CommentNode } from "@/types/comment";

interface CommentItemProps {
    comment: CommentNode;
    replyingTo: string | null;
    setReplyingTo: (id: string | null) => void;
    replyName: string;
    setReplyName: (name: string) => void;
    replyContent: string;
    setReplyContent: (content: string) => void;
    onReplySubmit: (e: React.FormEvent, parentId: string) => void;
    isSubmitting: boolean;
    depth?: number;
}

export function CommentItem({
    comment,
    replyingTo,
    setReplyingTo,
    replyName,
    setReplyName,
    replyContent,
    setReplyContent,
    onReplySubmit,
    isSubmitting,
    depth = 0,
}: CommentItemProps) {
    const formattedDate = new Date(comment.createdAt).toLocaleDateString();
    const formattedTime = new Date(comment.createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <div
            className={cn(
                "flex flex-col gap-2",
                depth > 0 && "ml-4 pl-4 border-l-2 border-muted"
            )}
        >
            <div className="py-4">
                <div className="flex justify-between items-baseline mb-2">
                    <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm">
                            {comment.name || "匿名"}
                        </span>
                        <span className="text-xs text-muted-foreground">
                            {formattedDate} {formattedTime}
                        </span>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 gap-1 text-xs"
                        onClick={() =>
                            setReplyingTo(replyingTo === comment.id ? null : comment.id)
                        }
                    >
                        <Reply className="h-3 w-3" />
                        返信
                    </Button>
                </div>
                <p className="text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed">
                    {comment.content}
                </p>

                {replyingTo === comment.id && (
                    <form
                        onSubmit={(e) => onReplySubmit(e, comment.id)}
                        className="mt-4 p-4 bg-muted/50 rounded-lg space-y-3"
                    >
                        <Input
                            placeholder="名前（任意）"
                            value={replyName}
                            onChange={(e) => setReplyName(e.target.value)}
                            className="bg-background max-w-xs text-sm"
                        />
                        <div className="flex gap-2">
                            <Input
                                placeholder="返信を書く..."
                                value={replyContent}
                                onChange={(e) => setReplyContent(e.target.value)}
                                required
                                className="bg-background flex-1 text-sm"
                                autoFocus
                            />
                            <Button type="submit" size="sm" disabled={isSubmitting}>
                                {isSubmitting ? "送信中..." : "返信"}
                            </Button>
                        </div>
                    </form>
                )}
            </div>

            {comment.children.length > 0 && (
                <div className="space-y-0">
                    {comment.children.map((child) => (
                        <CommentItem
                            key={child.id}
                            comment={child}
                            depth={depth + 1}
                            replyingTo={replyingTo}
                            setReplyingTo={setReplyingTo}
                            replyName={replyName}
                            setReplyName={setReplyName}
                            replyContent={replyContent}
                            setReplyContent={setReplyContent}
                            onReplySubmit={onReplySubmit}
                            isSubmitting={isSubmitting}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
