export type TableCell = { content: string; colspan?: number; rowspan?: number };
export type TableRow  = { cells: (TableCell | null)[] };

export type ContentBlock =
  | { type: "paragraph"; text: string; align?: "left" | "center" | "right" }
  | { type: "heading2"; text: string; align?: "left" | "center" | "right" }
  | { type: "heading3"; text: string; align?: "left" | "center" | "right" }
  | { type: "quote"; text: string }
  | { type: "image"; url: string; caption?: string; align?: "full" | "float-left" | "float-right" }
  | { type: "list"; listStyle: "bullet" | "dash" | "numbered"; items: string[] }
  | { type: "table"; rows: TableRow[]; hasHeader?: boolean }
  | { type: "divider" }
  | { type: "button"; text: string; url: string; variant?: "primary" | "secondary" | "ghost"; align?: "left" | "center" | "right"; size?: "sm" | "md" | "lg" };

export type Article = {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  excerpt?: string;
  coverImage?: string;
  body: ContentBlock[];
  status: "draft" | "published";
  authorName: string;
  authorId: string;
  createdAt: { seconds: number } | null;
  publishedAt?: { seconds: number } | null;
  tags?: string[];
};
