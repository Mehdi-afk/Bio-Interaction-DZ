export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading2"; text: string }
  | { type: "heading3"; text: string }
  | { type: "quote"; text: string }
  | { type: "image"; url: string; caption?: string };

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
