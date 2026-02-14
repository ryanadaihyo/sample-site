import { z } from "zod";

/** コメント投稿のバリデーションスキーマ */
export const addCommentSchema = z.object({
    content: z
        .string()
        .min(1, "コメント内容は必須です")
        .max(2000, "コメントは2000文字以内で入力してください")
        .trim(),
    page: z
        .string()
        .min(1, "ページIDは必須です"),
    name: z
        .string()
        .max(50, "名前は50文字以内で入力してください")
        .trim()
        .optional()
        .default("匿名"),
    parentId: z
        .string()
        .nullable()
        .optional()
        .default(null),
});

export type AddCommentInput = z.infer<typeof addCommentSchema>;
