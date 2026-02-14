"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/db";
import { addCommentSchema } from "@/schemas/comment";
import type { ActionResult, SerializedComment, CommentRecord } from "@/types/comment";

/**
 * コメントを追加する Server Action
 * Zodスキーマでバリデーション後、DBに保存する。
 */
export async function addComment(formData: FormData): Promise<ActionResult> {
    const raw = {
        content: formData.get("content"),
        page: formData.get("page"),
        name: formData.get("name") || undefined,
        parentId: formData.get("parentId") || null,
    };

    const parsed = addCommentSchema.safeParse(raw);

    if (!parsed.success) {
        const firstError = parsed.error.issues[0]?.message ?? "入力値が不正です";
        return { error: firstError };
    }

    const { content, page, name, parentId } = parsed.data;

    try {
        await prisma.comment.create({
            data: { content, page, name, parentId },
        });

        revalidatePath(page);
        return { success: true };
    } catch (error) {
        console.error("Failed to add comment:", error);
        return { error: "コメントの追加に失敗しました" };
    }
}

/**
 * 指定ページのコメントを取得する
 * 親子関係を含めて取得し、シリアライズ済みで返す。
 */
export async function getComments(
    page: string
): Promise<{ comments: SerializedComment[]; error?: string }> {
    try {
        const comments: CommentRecord[] = await prisma.comment.findMany({
            where: { page },
            orderBy: { createdAt: "desc" },
        });

        const serialized: SerializedComment[] = comments.map((c) => ({
            id: c.id,
            content: c.content,
            name: c.name,
            page: c.page,
            createdAt: c.createdAt.toISOString(),
            parentId: c.parentId,
        }));

        return { comments: serialized };
    } catch (error) {
        console.error("Failed to get comments:", error);
        return { comments: [], error: "コメントの取得に失敗しました" };
    }
}
