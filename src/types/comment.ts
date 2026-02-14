/** コメント機能の型定義 */

/** DBから取得したコメント（createdAt は Date） */
export interface CommentRecord {
    id: string;
    content: string;
    name: string | null;
    page: string;
    createdAt: Date;
    parentId: string | null;
}

/** クライアントに渡すシリアライズ済みコメント（createdAt は string） */
export interface SerializedComment {
    id: string;
    content: string;
    name: string | null;
    page: string;
    createdAt: string;
    parentId: string | null;
}

/** コメントツリー構造 */
export type CommentNode = SerializedComment & {
    children: CommentNode[];
};

/** Server Action のレスポンス型 */
export type ActionResult =
    | { success: true; error?: never }
    | { success?: never; error: string };
