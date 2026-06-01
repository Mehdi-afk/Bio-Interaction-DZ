import DOMPurify from "dompurify";

// Tags produced by the rich-text editor (bold, italic, underline, strikethrough, links, font-size spans, line-breaks).
// Everything else — including all event handlers and javascript: hrefs — is stripped by DOMPurify.
export function sanitizeHtml(dirty: string): string {
  if (typeof window === "undefined") return dirty; // SSR guard (not reached; files are "use client")
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ["strong", "em", "u", "s", "a", "span", "br"],
    ALLOWED_ATTR: ["href", "target", "rel", "style"],
    FORCE_BODY:   true,
  }) as string;
}
