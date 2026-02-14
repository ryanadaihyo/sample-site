"use client";

import { useState, useMemo, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { addComment } from "@/lib/actions/comments";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import { CommentItem } from "@/components/comments/comment-item";
import type { SerializedComment, CommentNode, ActionResult } from "@/types/comment";

interface CommentsProps {
    initialComments: SerializedComment[];
    pageId: string;
}

/** コメント配列をツリー構造に変換する */
function buildCommentTree(comments: SerializedComment[]): CommentNode[] {
    const map = new Map<string, CommentNode>();
    const roots: CommentNode[] = [];

    // Initialize map
    for (const comment of comments) {
        map.set(comment.id, { ...comment, children: [] });
    }

    // Build tree
    for (const comment of comments) {
        const node = map.get(comment.id)!;
        if (comment.parentId) {
            const parent = map.get(comment.parentId);
            if (parent) {
                parent.children.push(node);
            } else {
                roots.push(node);
            }
        } else {
            roots.push(node);
        }
    }

    // Sort: newest first for roots, oldest first for replies
    roots.sort(
        (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    const sortChildren = (nodes: CommentNode[]) => {
        nodes.sort(
            (a, b) =>
                new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        for (const node of nodes) {
            sortChildren(node.children);
        }
    };

    for (const root of roots) {
        sortChildren(root.children);
    }

    return roots;
}

export function Comments({ initialComments, pageId }: CommentsProps) {
    const [name, setName] = useState("");
    const [content, setContent] = useState("");
    const [replyingTo, setReplyingTo] = useState<string | null>(null);
    const [replyContent, setReplyContent] = useState("");
    const [replyName, setReplyName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const router = useRouter();
    const pathname = usePathname();

    const commentTree = useMemo(
        () => buildCommentTree(initialComments),
        [initialComments]
    );

    const handleSubmit = useCallback(
        async (e: React.FormEvent, parentId: string | null = null) => {
            e.preventDefault();
            const commentContent = parentId ? replyContent : content;
            const commentName = parentId ? replyName : name;

            if (!commentContent.trim()) return;

            setIsSubmitting(true);
            setErrorMessage(null);

            const formData = new FormData();
            formData.append("name", commentName);
            formData.append("content", commentContent);
            formData.append("page", pageId);
            if (parentId) {
                formData.append("parentId", parentId);
            }
            formData.append("pathname", pathname);

            try {
                const result: ActionResult = await addComment(formData);

                if (result.error) {
                    setErrorMessage(result.error);
                    return;
                }

                if (parentId) {
                    setReplyContent("");
                    setReplyName("");
                    setReplyingTo(null);
                } else {
                    setContent("");
                }
                router.refresh();
            } catch {
                setErrorMessage("コメントの送信に失敗しました");
            } finally {
                setIsSubmitting(false);
            }
        },
        [content, name, replyContent, replyName, pageId, router]
    );

    return (
        <Card className="w-full mt-10 border-none shadow-none bg-transparent">
            <CardHeader className="px-0 pt-0">
                <CardTitle className="flex items-center gap-2 text-xl">
                    <MessageSquare className="h-5 w-5" />
                    コメント ({initialComments.length})
                </CardTitle>
            </CardHeader>
            <CardContent className="px-0">
                <form
                    onSubmit={(e) => handleSubmit(e)}
                    className="space-y-4 mb-10 bg-card p-6 rounded-xl border shadow-sm"
                >
                    <Input
                        placeholder="名前（任意）"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="max-w-xs"
                        maxLength={50}
                    />
                    <div className="flex gap-2">
                        <Input
                            placeholder="コメントを書く..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                            className="flex-1"
                            maxLength={2000}
                        />
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "送信中..." : "送信"}
                        </Button>
                    </div>
                    {errorMessage && (
                        <p className="text-sm text-destructive">{errorMessage}</p>
                    )}
                </form>

                <div className="divide-y">
                    {commentTree.map((comment) => (
                        <CommentItem
                            key={comment.id}
                            comment={comment}
                            replyingTo={replyingTo}
                            setReplyingTo={setReplyingTo}
                            replyName={replyName}
                            setReplyName={setReplyName}
                            replyContent={replyContent}
                            setReplyContent={setReplyContent}
                            onReplySubmit={handleSubmit}
                            isSubmitting={isSubmitting}
                        />
                    ))}
                    {initialComments.length === 0 && (
                        <p className="text-sm text-muted-foreground text-center py-8 bg-muted/20 rounded-lg border border-dashed">
                            まだコメントはありません。最初のコメントを投稿しましょう！
                        </p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
