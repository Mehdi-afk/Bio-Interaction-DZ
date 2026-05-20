"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { collection, addDoc, doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/src/lib/firebase";
import { useAuth } from "@/src/context/AuthContext";
import type { ContentBlock } from "@/src/types/blog";

type EditorBlock =
  | { id: string; type: "paragraph"; text: string }
  | { id: string; type: "heading2"; text: string }
  | { id: string; type: "heading3"; text: string }
  | { id: string; type: "quote"; text: string }
  | { id: string; type: "image"; url: string; caption: string; uploading?: boolean };

function uid() { return crypto.randomUUID(); }

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

const BLOCK_LABELS: Record<EditorBlock["type"], string> = {
  paragraph: "Paragraphe",
  heading2:  "Titre H2",
  heading3:  "Titre H3",
  quote:     "Citation",
  image:     "Image",
};

function BlockEditor({
  block, onChange, onDelete, onMoveUp, onMoveDown, isFirst, isLast, articleId,
}: {
  block: EditorBlock;
  onChange: (b: EditorBlock) => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isFirst: boolean;
  isLast: boolean;
  articleId: string;
}) {
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleImageFile(file: File) {
    onChange({ ...block, uploading: true } as EditorBlock);
    const path = `blog-images/${articleId}/${uid()}`;
    const sRef = storageRef(storage, path);
    await uploadBytes(sRef, file);
    const url = await getDownloadURL(sRef);
    onChange({ ...block, url, uploading: false } as EditorBlock);
  }

  const inputCls = "w-full px-4 py-2.5 border border-[#E5E3DC] rounded-xl text-[14px] bg-white outline-none focus:border-[#29A864] focus:shadow-[0_0_0_3px_rgba(41,168,100,0.12)] transition-all duration-150";
  const textareaCls = `${inputCls} resize-none min-h-[100px]`;

  return (
    <div className="group relative bg-white border border-[#E5E3DC] rounded-xl p-4 hover:border-[#29A864] transition-colors">
      {/* Type label + controls */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] font-semibold uppercase tracking-[0.5px] text-[#A9ADAA]">
          {BLOCK_LABELS[block.type]}
        </span>
        <div className="flex items-center gap-1">
          <button onClick={onMoveUp} disabled={isFirst} className="w-6 h-6 flex items-center justify-center rounded text-[#A9ADAA] hover:text-[#1B1F1D] hover:bg-[#F7F6F2] disabled:opacity-30 transition-colors border-none bg-transparent cursor-pointer text-[12px]">↑</button>
          <button onClick={onMoveDown} disabled={isLast} className="w-6 h-6 flex items-center justify-center rounded text-[#A9ADAA] hover:text-[#1B1F1D] hover:bg-[#F7F6F2] disabled:opacity-30 transition-colors border-none bg-transparent cursor-pointer text-[12px]">↓</button>
          <button onClick={onDelete} className="w-6 h-6 flex items-center justify-center rounded text-[#A9ADAA] hover:text-[#B30C2F] hover:bg-[#F8E8EC] transition-colors border-none bg-transparent cursor-pointer text-[14px]">×</button>
        </div>
      </div>

      {/* Content */}
      {(block.type === "paragraph") && (
        <textarea
          value={block.text}
          onChange={(e) => onChange({ ...block, text: e.target.value })}
          placeholder="Écrivez votre paragraphe…"
          className={textareaCls}
        />
      )}
      {(block.type === "heading2" || block.type === "heading3") && (
        <input
          type="text"
          value={block.text}
          onChange={(e) => onChange({ ...block, text: e.target.value })}
          placeholder={block.type === "heading2" ? "Titre principal…" : "Sous-titre…"}
          className={inputCls}
        />
      )}
      {block.type === "quote" && (
        <textarea
          value={block.text}
          onChange={(e) => onChange({ ...block, text: e.target.value })}
          placeholder="Citation ou mise en avant…"
          className={`${textareaCls} min-h-[70px] italic`}
        />
      )}
      {block.type === "image" && (
        <div className="space-y-2">
          {block.url ? (
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={block.url} alt="" className="w-full max-h-[240px] object-cover rounded-lg" />
              <button
                onClick={() => onChange({ ...block, url: "" })}
                className="absolute top-2 right-2 w-7 h-7 bg-black/50 text-white rounded-full flex items-center justify-center text-[14px] border-none cursor-pointer hover:bg-black/70"
              >×</button>
            </div>
          ) : (
            <button
              onClick={() => fileRef.current?.click()}
              disabled={block.uploading}
              className="w-full py-8 border-2 border-dashed border-[#E5E3DC] rounded-xl text-[13px] text-[#A9ADAA] hover:border-[#29A864] hover:text-[#29A864] transition-colors cursor-pointer bg-transparent"
            >
              {block.uploading ? "Chargement…" : "Cliquez pour uploader une image"}
            </button>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) handleImageFile(f); }}
          />
          <input
            type="text"
            value={block.caption}
            onChange={(e) => onChange({ ...block, caption: e.target.value })}
            placeholder="Légende (optionnel)"
            className={inputCls}
          />
        </div>
      )}
    </div>
  );
}

function NewArticleContent() {
  const router      = useRouter();
  const params      = useSearchParams();
  const editId      = params.get("edit");
  const { user, loading, isAdmin } = useAuth();

  const [title,       setTitle]       = useState("");
  const [subtitle,    setSubtitle]    = useState("");
  const [excerpt,     setExcerpt]     = useState("");
  const [tags,        setTags]        = useState("");
  const [slug,        setSlug]        = useState("");
  const [coverImage,  setCoverImage]  = useState("");
  const [coverFile,   setCoverFile]   = useState<File | null>(null);
  const [coverPreview,setCoverPreview]= useState<string | null>(null);
  const [blocks,      setBlocks]      = useState<EditorBlock[]>([
    { id: uid(), type: "paragraph", text: "" },
  ]);
  const [status,      setStatus]      = useState<"draft" | "published">("draft");
  const [saving,      setSaving]      = useState(false);
  const [error,       setError]       = useState("");
  const [articleId]                   = useState(() => editId ?? uid());
  const coverRef = useRef<HTMLInputElement>(null);

  // Redirect if not admin
  useEffect(() => {
    if (!loading && !isAdmin) router.replace("/blog");
  }, [loading, isAdmin, router]);

  // Load existing article for editing
  useEffect(() => {
    if (!editId) return;
    getDoc(doc(db, "articles", editId)).then((snap) => {
      if (!snap.exists()) return;
      const d = snap.data();
      setTitle(d.title ?? "");
      setSubtitle(d.subtitle ?? "");
      setExcerpt(d.excerpt ?? "");
      setTags((d.tags ?? []).join(", "));
      setSlug(d.slug ?? "");
      setCoverImage(d.coverImage ?? "");
      setStatus(d.status ?? "draft");
      setBlocks(
        (d.body ?? []).map((b: ContentBlock) => ({
          id: uid(),
          ...b,
          ...(b.type === "image" ? { caption: (b as { caption?: string }).caption ?? "" } : {}),
        }))
      );
    });
  }, [editId]);

  // Auto-generate slug from title
  useEffect(() => {
    if (title) setSlug(generateSlug(title));
  }, [title]);

  function handleCoverChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (coverPreview) URL.revokeObjectURL(coverPreview);
    setCoverFile(file);
    setCoverPreview(URL.createObjectURL(file));
  }

  function addBlock(type: EditorBlock["type"]) {
    const newBlock: EditorBlock =
      type === "image"
        ? { id: uid(), type: "image", url: "", caption: "" }
        : { id: uid(), type, text: "" };
    setBlocks((prev) => [...prev, newBlock]);
  }

  function updateBlock(id: string, updated: EditorBlock) {
    setBlocks((prev) => prev.map((b) => b.id === id ? updated : b));
  }

  function deleteBlock(id: string) {
    setBlocks((prev) => prev.filter((b) => b.id !== id));
  }

  function moveBlock(id: string, dir: -1 | 1) {
    setBlocks((prev) => {
      const idx = prev.findIndex((b) => b.id === id);
      if (idx < 0) return prev;
      const next = [...prev];
      const target = idx + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[idx], next[target]] = [next[target], next[idx]];
      return next;
    });
  }

  async function handleSave(targetStatus: "draft" | "published") {
    if (!title.trim()) { setError("Le titre est obligatoire."); return; }
    if (!slug.trim())  { setError("Le slug est obligatoire.");  return; }
    setError("");
    setSaving(true);

    try {
      // Upload cover image if new file selected
      let finalCover = coverImage;
      if (coverFile) {
        const sRef = storageRef(storage, `blog-covers/${articleId}`);
        await uploadBytes(sRef, coverFile);
        finalCover = await getDownloadURL(sRef);
      }

      const body: ContentBlock[] = blocks
        .filter((b) => b.type !== "image" || (b as { url: string }).url)
        .map(({ id: _id, ...rest }) => {
          if (rest.type === "image") {
            const { uploading: _u, ...clean } = rest as typeof rest & { uploading?: boolean };
            return clean as ContentBlock;
          }
          return rest as ContentBlock;
        });

      const tagsArr = tags.split(",").map((t) => t.trim()).filter(Boolean);
      const now = { seconds: Math.floor(Date.now() / 1000), nanoseconds: 0 };

      const payload = {
        title:       title.trim(),
        subtitle:    subtitle.trim(),
        excerpt:     excerpt.trim(),
        slug:        slug.trim(),
        coverImage:  finalCover,
        body,
        tags:        tagsArr,
        status:      targetStatus,
        authorName:  user?.displayName ?? user?.email ?? "",
        authorId:    user?.uid ?? "",
        ...(targetStatus === "published" && status !== "published" ? { publishedAt: now } : {}),
      };

      if (editId) {
        await updateDoc(doc(db, "articles", editId), payload);
      } else {
        await addDoc(collection(db, "articles"), {
          ...payload,
          createdAt: serverTimestamp(),
        });
      }

      router.push(`/blog/${slug.trim()}`);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSaving(false);
    }
  }

  if (loading || !isAdmin) return null;

  const inputCls = "w-full px-4 py-2.5 border border-[#E5E3DC] rounded-xl text-[14px] bg-white outline-none focus:border-[#29A864] focus:shadow-[0_0_0_3px_rgba(41,168,100,0.12)] transition-all duration-150";

  return (
    <div className="max-w-[820px] mx-auto px-6 py-10 min-h-[calc(100vh-68px)] max-[600px]:px-4">

      {/* Header */}
      <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
        <div>
          <h1 className="font-serif text-[28px] text-[#1B1F1D]">
            {editId ? "Modifier l'article" : "Nouvel article"}
          </h1>
          <p className="text-[13px] text-[#A9ADAA] mt-1">
            {status === "published" ? "Publié" : "Brouillon — non visible par les visiteurs"}
          </p>
        </div>
        <a href="/blog" className="text-[13px] text-[#6E6E6E] hover:text-[#29A864] transition-colors no-underline">
          ← Blog
        </a>
      </div>

      <div className="flex flex-col gap-6">

        {/* Cover image */}
        <div>
          <label className="block text-[13px] font-medium text-[#1B1F1D] mb-2">Image de couverture</label>
          <div
            onClick={() => coverRef.current?.click()}
            className="w-full border-2 border-dashed border-[#E5E3DC] rounded-2xl overflow-hidden cursor-pointer hover:border-[#29A864] transition-colors"
            style={{ aspectRatio: "16/5" }}
          >
            {(coverPreview || coverImage) ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={coverPreview ?? coverImage} alt="" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-[#A9ADAA] gap-2">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                  <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
                <span className="text-[13px]">Cliquez pour ajouter une image de couverture</span>
              </div>
            )}
          </div>
          <input ref={coverRef} type="file" accept="image/*" className="hidden" onChange={handleCoverChange} />
        </div>

        {/* Title */}
        <div>
          <label className="block text-[13px] font-medium text-[#1B1F1D] mb-1.5">Titre *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Titre de l'article"
            className={`${inputCls} text-[18px] font-semibold`}
          />
        </div>

        {/* Subtitle */}
        <div>
          <label className="block text-[13px] font-medium text-[#1B1F1D] mb-1.5">Sous-titre</label>
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="Accroche ou description courte"
            className={inputCls}
          />
        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-[13px] font-medium text-[#1B1F1D] mb-1.5">Extrait (affiché dans la liste)</label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Résumé court de l'article…"
            rows={2}
            className={`${inputCls} resize-none`}
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-[13px] font-medium text-[#1B1F1D] mb-1.5">Slug URL</label>
          <div className="w-full px-4 py-2.5 border border-[#E5E3DC] rounded-xl text-[13px] font-mono bg-[#F7F6F2] text-[#6E6E6E] select-all">
            {slug || <span className="text-[#C0C4C1]">généré depuis le titre…</span>}
          </div>
          <p className="text-[11px] text-[#A9ADAA] mt-1">biointeractiondz.com/blog/<strong>{slug || "…"}</strong></p>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-[13px] font-medium text-[#1B1F1D] mb-1.5">Tags (séparés par des virgules)</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Hématologie, Réactifs, Biochimie"
            className={inputCls}
          />
        </div>

        {/* Body editor */}
        <div>
          <label className="block text-[13px] font-medium text-[#1B1F1D] mb-3">Contenu</label>
          <div className="flex flex-col gap-3">
            {blocks.map((block, i) => (
              <BlockEditor
                key={block.id}
                block={block}
                onChange={(b) => updateBlock(block.id, b)}
                onDelete={() => deleteBlock(block.id)}
                onMoveUp={() => moveBlock(block.id, -1)}
                onMoveDown={() => moveBlock(block.id, 1)}
                isFirst={i === 0}
                isLast={i === blocks.length - 1}
                articleId={articleId}
              />
            ))}

            {/* Add block */}
            <div className="flex gap-2 flex-wrap pt-1">
              {(["paragraph", "heading2", "heading3", "quote", "image"] as EditorBlock["type"][]).map((type) => (
                <button
                  key={type}
                  onClick={() => addBlock(type)}
                  className="px-3 py-1.5 border border-dashed border-[#E5E3DC] rounded-lg text-[12px] text-[#A9ADAA] hover:border-[#29A864] hover:text-[#29A864] transition-colors bg-transparent cursor-pointer"
                >
                  + {BLOCK_LABELS[type]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <p className="text-[13px] text-[#B30C2F] bg-[#F8E8EC] px-4 py-3 rounded-xl">{error}</p>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-2 flex-wrap">
          <button
            onClick={() => handleSave("draft")}
            disabled={saving}
            className="px-6 py-2.5 border border-[#E5E3DC] rounded-xl text-[14px] font-medium text-[#6E6E6E] bg-white cursor-pointer hover:border-[#29A864] hover:text-[#29A864] transition-colors disabled:opacity-50"
          >
            {saving ? "Enregistrement…" : "Enregistrer comme brouillon"}
          </button>
          <button
            onClick={() => handleSave("published")}
            disabled={saving}
            className="px-6 py-2.5 bg-[#29A864] text-white rounded-xl text-[14px] font-medium border-none cursor-pointer hover:bg-[#48BC7E] transition-colors disabled:opacity-50"
          >
            {saving ? "Publication…" : "Publier l'article"}
          </button>
        </div>

      </div>
    </div>
  );
}

export default function NewArticlePage() {
  return <Suspense><NewArticleContent /></Suspense>;
}
