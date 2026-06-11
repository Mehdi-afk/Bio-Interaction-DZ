"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { collection, addDoc, doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/src/lib/firebase";
import { useAuth } from "@/src/context/AuthContext";
import type { ContentBlock } from "@/src/types/blog";
import { sanitizeHtml } from "@/src/lib/sanitize";

type TCellData = { content: string; colspan?: number; rowspan?: number };
type TGrid     = (TCellData | null)[][];

/* ── Shared style constants ── */
const INPUT_CLS = "w-full px-4 py-2.5 border border-[#E5E3DC] rounded-xl text-[14px] bg-white outline-none focus:border-[#29A864] focus:shadow-[0_0_0_3px_rgba(41,168,100,0.12)] transition-all duration-150";
const FIELD_CLS = "flex-1 px-3 py-1.5 border border-[#E5E3DC] rounded-lg text-[13px] bg-white outline-none focus:border-[#29A864] focus:shadow-[0_0_0_3px_rgba(41,168,100,0.12)] transition-all duration-150";

type EditorBlock =
  | { id: string; type: "paragraph"; text: string; align?: "left" | "center" | "right" }
  | { id: string; type: "heading2"; text: string; align?: "left" | "center" | "right" }
  | { id: string; type: "heading3"; text: string; align?: "left" | "center" | "right" }
  | { id: string; type: "quote"; text: string }
  | { id: string; type: "image"; url: string; caption: string; uploading?: boolean; align?: "full" | "float-left" | "float-right" }
  | { id: string; type: "list"; listStyle: "bullet" | "dash" | "numbered"; items: string[] }
  | { id: string; type: "table"; rows: TGrid; hasHeader?: boolean }
  | { id: string; type: "divider" }
  | { id: string; type: "button"; text: string; url: string; variant?: "primary" | "secondary" | "ghost"; align?: "left" | "center" | "right"; size?: "sm" | "md" | "lg" };

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
  list:      "Liste",
  table:     "Tableau",
  divider:   "Séparateur",
  button:    "Bouton",
};

/* ── Alignment header button ── */
function ABtn({ active, title, onClick, children }: {
  active: boolean; title: string; onClick: () => void; children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`w-6 h-6 rounded flex items-center justify-center border transition-colors bg-transparent cursor-pointer ${
        active ? "border-[#29A864] text-[#29A864] bg-[#EDF8F1]" : "border-[#E5E3DC] text-[#A9ADAA] hover:border-[#29A864] hover:text-[#29A864]"
      }`}
    >{children}</button>
  );
}

/* ── Rich-text toolbar button (mousedown to preserve selection) ── */
function FmtBtn({ active, title, onAction, children }: {
  active: boolean; title: string; onAction: () => void; children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      onMouseDown={(e) => { e.preventDefault(); onAction(); }}
      className={`h-6 min-w-[24px] px-1.5 rounded flex items-center justify-center border transition-colors cursor-pointer text-[13px] ${
        active ? "border-[#29A864] text-[#29A864] bg-[#EDF8F1]" : "border-[#E5E3DC] text-[#6E6E6E] hover:border-[#29A864] hover:text-[#29A864] bg-transparent"
      }`}
    >{children}</button>
  );
}

/* ── SVG alignment icons ── */
const IconAlignLeft   = () => <svg viewBox="0 0 14 10" fill="currentColor" className="w-3 h-3"><rect x="0" y="0" width="14" height="2" rx="1"/><rect x="0" y="4" width="9" height="2" rx="1"/><rect x="0" y="8" width="11" height="2" rx="1"/></svg>;
const IconAlignCenter = () => <svg viewBox="0 0 14 10" fill="currentColor" className="w-3 h-3"><rect x="0" y="0" width="14" height="2" rx="1"/><rect x="2.5" y="4" width="9" height="2" rx="1"/><rect x="1.5" y="8" width="11" height="2" rx="1"/></svg>;
const IconAlignRight  = () => <svg viewBox="0 0 14 10" fill="currentColor" className="w-3 h-3"><rect x="0" y="0" width="14" height="2" rx="1"/><rect x="5" y="4" width="9" height="2" rx="1"/><rect x="3" y="8" width="11" height="2" rx="1"/></svg>;
const IconFloatLeft   = () => <svg viewBox="0 0 16 12" fill="currentColor" className="w-3.5 h-3"><rect x="0" y="0" width="6" height="7" rx="1"/><rect x="8" y="0" width="8" height="2" rx="1"/><rect x="8" y="4" width="7" height="2" rx="1"/><rect x="0" y="9" width="16" height="2" rx="1"/></svg>;
const IconFloatRight  = () => <svg viewBox="0 0 16 12" fill="currentColor" className="w-3.5 h-3"><rect x="10" y="0" width="6" height="7" rx="1"/><rect x="0" y="0" width="8" height="2" rx="1"/><rect x="1" y="4" width="7" height="2" rx="1"/><rect x="0" y="9" width="16" height="2" rx="1"/></svg>;
const IconImageFull   = () => <svg viewBox="0 0 14 10" fill="currentColor" className="w-3 h-3"><rect x="0" y="0" width="14" height="10" rx="1.5"/></svg>;
const IconLink = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" className="w-3.5 h-3.5">
    <path d="M6.5 9.5a3.5 3.5 0 0 0 5 0l2-2a3.5 3.5 0 0 0-5-5l-1 1"/>
    <path d="M9.5 6.5a3.5 3.5 0 0 0-5 0l-2 2a3.5 3.5 0 0 0 5 5l1-1"/>
  </svg>
);
const IconUnlink = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" className="w-3.5 h-3.5">
    <path d="M6.5 9.5a3.5 3.5 0 0 0 5 0l2-2a3.5 3.5 0 0 0-5-5l-1 1" strokeDasharray="3 2"/>
    <path d="M9.5 6.5a3.5 3.5 0 0 0-5 0l-2 2a3.5 3.5 0 0 0 5 5l1-1" strokeDasharray="3 2"/>
    <line x1="2" y1="2" x2="14" y2="14"/>
  </svg>
);

/* ── Rich Text Editor ── */
function RichTextEditor({ value, onChange, align, minHeight = "180px", placeholder = "Écrivez ici…" }: {
  value: string;
  onChange: (html: string) => void;
  align?: "left" | "center" | "right";
  minHeight?: string;
  placeholder?: string;
}) {
  const editorRef  = useRef<HTMLDivElement>(null);
  const isEditing  = useRef(false);
  const savedRange = useRef<Range | null>(null);

  const [linkMode,   setLinkMode]   = useState(false);
  const [linkUrl,    setLinkUrl]    = useState("");
  const [isBold,     setIsBold]     = useState(false);
  const [isItalic,   setIsItalic]   = useState(false);
  const [isUnder,    setIsUnder]    = useState(false);

  /* Sync value from outside (e.g. loading article) without resetting cursor */
  useEffect(() => {
    if (isEditing.current) { isEditing.current = false; return; }
    if (editorRef.current && editorRef.current.innerHTML !== (value || ""))
      editorRef.current.innerHTML = value || "";
  }, [value]);

  function handleInput() {
    isEditing.current = true;
    const html  = editorRef.current?.innerHTML ?? "";
    const empty = (editorRef.current?.textContent ?? "").trim() === "";
    onChange(empty ? "" : html);
  }

  function updateStates() {
    try {
      setIsBold(document.queryCommandState("bold"));
      setIsItalic(document.queryCommandState("italic"));
      setIsUnder(document.queryCommandState("underline"));
    } catch { /* ignored */ }
  }

  function execCmd(cmd: string) {
    editorRef.current?.focus();
    document.execCommand(cmd, false);
    onChange(editorRef.current?.innerHTML ?? "");
    updateStates();
  }

  function applyFontSize(size: string) {
    editorRef.current?.focus();
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0 || sel.isCollapsed) return;
    const range = sel.getRangeAt(0);
    const span  = document.createElement("span");
    span.style.fontSize = size;
    try {
      range.surroundContents(span);
    } catch {
      const frag = range.extractContents();
      span.appendChild(frag);
      range.insertNode(span);
    }
    sel.removeAllRanges();
    onChange(editorRef.current?.innerHTML ?? "");
  }

  function startLink() {
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed) return;
    savedRange.current = sel.getRangeAt(0).cloneRange();
    setLinkMode(true);
    setLinkUrl("https://");
  }

  function applyLink() {
    const url = linkUrl.trim();
    if (!savedRange.current || !url) return;
    const sel = window.getSelection();
    sel?.removeAllRanges();
    sel?.addRange(savedRange.current);
    document.execCommand("createLink", false, url);
    editorRef.current?.querySelectorAll("a").forEach((a) => {
      if (!a.getAttribute("target")) a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener noreferrer");
    });
    onChange(editorRef.current?.innerHTML ?? "");
    setLinkMode(false);
    setLinkUrl("");
    savedRange.current = null;
  }

  return (
    <div>
      {/* Formatting toolbar */}
      <div className="flex items-center gap-1 mb-2 px-2 py-1.5 bg-[#F7F6F2] rounded-xl border border-[#E5E3DC] flex-wrap">
        <FmtBtn active={isBold}   title="Gras (Ctrl+B)"   onAction={() => execCmd("bold")}>
          <span className="font-bold">B</span>
        </FmtBtn>
        <FmtBtn active={isItalic} title="Italique (Ctrl+I)" onAction={() => execCmd("italic")}>
          <span className="italic">I</span>
        </FmtBtn>
        <FmtBtn active={isUnder}  title="Souligné (Ctrl+U)" onAction={() => execCmd("underline")}>
          <span className="underline">S</span>
        </FmtBtn>
        <FmtBtn active={false}    title="Barré" onAction={() => execCmd("strikeThrough")}>
          <span className="line-through text-[11px]">ab</span>
        </FmtBtn>

        <div className="w-px h-4 bg-[#D5D5D0] mx-0.5 shrink-0" />

        {/* Font sizes */}
        {([["S", "12px"], ["M", "15px"], ["L", "19px"], ["XL", "25px"]] as [string, string][]).map(([label, size]) => (
          <button
            key={size}
            type="button"
            title={`Taille ${label} — ${size}`}
            onMouseDown={(e) => { e.preventDefault(); applyFontSize(size); }}
            className="h-6 px-2 rounded border border-[#E5E3DC] text-[#6E6E6E] hover:border-[#29A864] hover:text-[#29A864] bg-transparent cursor-pointer transition-colors text-[11px]"
          >{label}</button>
        ))}

        <div className="w-px h-4 bg-[#D5D5D0] mx-0.5 shrink-0" />

        <FmtBtn active={linkMode} title="Sélectionnez du texte puis cliquez pour insérer un lien" onAction={startLink}>
          <IconLink />
        </FmtBtn>
        <FmtBtn active={false} title="Supprimer le lien" onAction={() => execCmd("unlink")}>
          <IconUnlink />
        </FmtBtn>

        <div className="w-px h-4 bg-[#D5D5D0] mx-0.5 shrink-0" />

        <FmtBtn active={false} title="Effacer la mise en forme" onAction={() => execCmd("removeFormat")}>
          <span className="text-[10px]">T×</span>
        </FmtBtn>
      </div>

      {/* Link URL input (shown after clicking the link button) */}
      {linkMode && (
        <div className="flex gap-2 mb-2 items-center">
          <input
            type="url"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter")  { e.preventDefault(); applyLink(); }
              if (e.key === "Escape") { setLinkMode(false); setLinkUrl(""); }
            }}
            placeholder="https://…"
            autoFocus
            className={FIELD_CLS}
          />
          <button
            type="button"
            onClick={applyLink}
            className="px-3 py-1.5 bg-[#29A864] text-white rounded-lg text-[12px] border-none cursor-pointer hover:bg-[#48BC7E] transition-colors shrink-0"
          >Appliquer</button>
          <button
            type="button"
            onClick={() => { setLinkMode(false); setLinkUrl(""); }}
            className="px-3 py-1.5 border border-[#E5E3DC] text-[#6E6E6E] rounded-lg text-[12px] bg-transparent cursor-pointer hover:border-[#29A864] hover:text-[#29A864] transition-colors shrink-0"
          >Annuler</button>
        </div>
      )}

      {/* Content-editable area */}
      <div className="relative">
        {!value && (
          <span className="absolute top-3 left-4 text-[#C0C4C1] text-[15px] pointer-events-none select-none">
            {placeholder}
          </span>
        )}
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onInput={handleInput}
          onKeyUp={updateStates}
          onMouseUp={updateStates}
          onFocus={updateStates}
          className="w-full px-4 py-3 border border-[#E5E3DC] rounded-xl text-[15px] bg-white outline-none focus:border-[#29A864] focus:shadow-[0_0_0_3px_rgba(41,168,100,0.12)] transition-all duration-150 leading-relaxed [&_a]:text-[#29A864] [&_a]:underline"
          style={{ textAlign: align as React.CSSProperties["textAlign"], minHeight }}
        />
      </div>
    </div>
  );
}

/* ── Rich List Item (un item contentEditable avec initialisation stable) ── */
function RichListItem({ idx, initialContent, marker, onActive, onUpdate, onEnter, onBackspaceEmpty, onDelete }: {
  idx: number;
  initialContent: string;
  marker: string;
  onActive: (el: HTMLDivElement, idx: number) => void;
  onUpdate: (html: string) => void;
  onEnter: () => void;
  onBackspaceEmpty: () => void;
  onDelete?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { if (ref.current) ref.current.innerHTML = initialContent || ""; }, []); // eslint-disable-line
  return (
    <div className="flex items-start gap-2 mb-2">
      <span className="text-[#A9ADAA] text-[13px] min-w-[20px] select-none text-right pt-2.5 shrink-0">{marker}</span>
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onFocus={() => { if (ref.current) onActive(ref.current, idx); }}
        onMouseUp={() => { if (ref.current) onActive(ref.current, idx); }}
        onInput={(e) => onUpdate((e.target as HTMLDivElement).innerHTML)}
        onKeyDown={(e) => {
          if (e.key === "Enter") { e.preventDefault(); onEnter(); }
          if (e.key === "Backspace" && (e.target as HTMLDivElement).textContent === "") {
            e.preventDefault(); onBackspaceEmpty();
          }
        }}
        className="flex-1 px-3 py-2 border border-[#E5E3DC] rounded-xl text-[13px] bg-white outline-none focus:border-[#29A864] focus:shadow-[0_0_0_3px_rgba(41,168,100,0.12)] transition-all min-h-[38px] leading-relaxed [&_a]:text-[#29A864] [&_a]:underline"
      />
      {onDelete && (
        <button onClick={onDelete}
          className="w-6 h-6 mt-2 flex items-center justify-center text-[#A9ADAA] hover:text-[#B30C2F] transition-colors bg-transparent border-none cursor-pointer text-[14px] shrink-0"
        >×</button>
      )}
    </div>
  );
}

/* ── Rich List Editor (toolbar partagé + items contentEditable) ── */
function RichListEditor({ block, onChange }: {
  block: Extract<EditorBlock, { type: "list" }>;
  onChange: (b: EditorBlock) => void;
}) {
  const activeEl  = useRef<HTMLDivElement | null>(null);
  const activeIdx = useRef<number>(-1);
  const savedRange = useRef<Range | null>(null);
  // Clés React stables alignées sur block.items (items = chaînes sans id) — gérées en state.
  const [keys, setKeys] = useState<string[]>(() => block.items.map(() => uid()));
  // Garde-fou : si la longueur diverge hors des handlers, on réaligne pendant le rendu
  // (pattern React « ajuster un state pendant le rendu ») sans lire ni muter de ref.
  let renderKeys = keys;
  if (keys.length !== block.items.length) {
    renderKeys = keys.slice(0, block.items.length);
    while (renderKeys.length < block.items.length) renderKeys.push(uid());
    setKeys(renderKeys);
  }

  const [isBold,   setIsBold]   = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnder,  setIsUnder]  = useState(false);
  const [linkMode, setLinkMode] = useState(false);
  const [linkUrl,  setLinkUrl]  = useState("");

  function updateStates() {
    try { setIsBold(document.queryCommandState("bold")); setIsItalic(document.queryCommandState("italic")); setIsUnder(document.queryCommandState("underline")); } catch {}
  }

  function syncActive() {
    const idx = activeIdx.current;
    if (idx < 0 || !activeEl.current) return;
    const items = [...block.items]; items[idx] = activeEl.current.innerHTML;
    onChange({ ...block, items });
  }

  function execCmd(cmd: string) {
    activeEl.current?.focus(); document.execCommand(cmd, false);
    syncActive(); updateStates();
  }

  function applyFontSize(size: string) {
    activeEl.current?.focus();
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0 || sel.isCollapsed) return;
    const range = sel.getRangeAt(0);
    const span = document.createElement("span"); span.style.fontSize = size;
    try { range.surroundContents(span); } catch { const f = range.extractContents(); span.appendChild(f); range.insertNode(span); }
    sel.removeAllRanges(); syncActive();
  }

  function startLink() {
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed) return;
    savedRange.current = sel.getRangeAt(0).cloneRange();
    setLinkMode(true); setLinkUrl("https://");
  }

  function applyLink() {
    if (!savedRange.current || !linkUrl.trim()) return;
    const sel = window.getSelection(); sel?.removeAllRanges(); sel?.addRange(savedRange.current);
    document.execCommand("createLink", false, linkUrl.trim());
    activeEl.current?.querySelectorAll("a").forEach(a => { if (!a.getAttribute("target")) a.setAttribute("target", "_blank"); a.setAttribute("rel", "noopener noreferrer"); });
    syncActive(); setLinkMode(false); setLinkUrl("");
  }

  return (
    <div>
      <div className="flex gap-2 mb-3">
        {(["bullet","dash","numbered"] as const).map(s => (
          <button key={s} onClick={() => onChange({ ...block, listStyle: s })}
            className={`px-3 py-1 rounded-lg text-[12px] border transition-colors cursor-pointer ${block.listStyle === s ? "border-[#29A864] text-[#29A864] bg-[#EDF8F1]" : "border-[#E5E3DC] text-[#A9ADAA] bg-transparent hover:border-[#29A864] hover:text-[#29A864]"}`}
          >{s === "bullet" ? "• Puces" : s === "dash" ? "— Tirets" : "1. Numéros"}</button>
        ))}
      </div>

      <div className="flex items-center gap-1 mb-2 px-2 py-1.5 bg-[#F7F6F2] rounded-xl border border-[#E5E3DC] flex-wrap">
        <FmtBtn active={isBold}   title="Gras"    onAction={() => execCmd("bold")}><span className="font-bold">B</span></FmtBtn>
        <FmtBtn active={isItalic} title="Italique" onAction={() => execCmd("italic")}><span className="italic">I</span></FmtBtn>
        <FmtBtn active={isUnder}  title="Souligné" onAction={() => execCmd("underline")}><span className="underline">S</span></FmtBtn>
        <FmtBtn active={false}    title="Barré"    onAction={() => execCmd("strikeThrough")}><span className="line-through text-[11px]">ab</span></FmtBtn>
        <div className="w-px h-4 bg-[#D5D5D0] mx-0.5 shrink-0"/>
        {([["S","12px"],["M","15px"],["L","19px"],["XL","25px"]] as [string,string][]).map(([l,s]) => (
          <button key={s} type="button" onMouseDown={e => { e.preventDefault(); applyFontSize(s); }}
            className="h-6 px-2 rounded border border-[#E5E3DC] text-[#6E6E6E] hover:border-[#29A864] hover:text-[#29A864] bg-transparent cursor-pointer transition-colors text-[11px]"
          >{l}</button>
        ))}
        <div className="w-px h-4 bg-[#D5D5D0] mx-0.5 shrink-0"/>
        <FmtBtn active={linkMode} title="Insérer un lien"   onAction={startLink}><IconLink /></FmtBtn>
        <FmtBtn active={false}    title="Supprimer le lien" onAction={() => execCmd("unlink")}><IconUnlink /></FmtBtn>
        <div className="w-px h-4 bg-[#D5D5D0] mx-0.5 shrink-0"/>
        <FmtBtn active={false} title="Effacer la mise en forme" onAction={() => execCmd("removeFormat")}><span className="text-[10px]">T×</span></FmtBtn>
      </div>

      {linkMode && (
        <div className="flex gap-2 mb-2 items-center">
          <input type="url" value={linkUrl} onChange={e => setLinkUrl(e.target.value)}
            onKeyDown={e => { if (e.key==="Enter"){e.preventDefault();applyLink();} if (e.key==="Escape"){setLinkMode(false);setLinkUrl("");} }}
            placeholder="https://…" autoFocus className={FIELD_CLS} />
          <button type="button" onClick={applyLink} className="px-3 py-1.5 bg-[#29A864] text-white rounded-lg text-[12px] border-none cursor-pointer hover:bg-[#48BC7E] transition-colors shrink-0">Appliquer</button>
          <button type="button" onClick={() => {setLinkMode(false);setLinkUrl("");}} className="px-3 py-1.5 border border-[#E5E3DC] text-[#6E6E6E] rounded-lg text-[12px] bg-transparent cursor-pointer transition-colors shrink-0">Annuler</button>
        </div>
      )}

      <div>
        {block.items.map((item, idx) => (
          <RichListItem
              key={renderKeys[idx]}
              idx={idx}
              initialContent={item}
              marker={block.listStyle === "numbered" ? `${idx+1}.` : block.listStyle === "dash" ? "—" : "•"}
              onActive={(el, i) => { activeEl.current = el; activeIdx.current = i; updateStates(); }}
              onUpdate={(html) => { const items=[...block.items]; items[idx]=html; onChange({...block,items}); }}
              onEnter={() => {
                const items=[...block.items]; items.splice(idx+1,0,"");
                setKeys(k => { const n=[...k]; n.splice(idx+1,0,uid()); return n; });
                onChange({...block,items});
              }}
              onBackspaceEmpty={() => {
                if (block.items.length<=1) return;
                const items=block.items.filter((_,i)=>i!==idx);
                setKeys(k => k.filter((_,i)=>i!==idx));
                onChange({...block,items});
              }}
              onDelete={block.items.length>1 ? () => {
                const items=block.items.filter((_,i)=>i!==idx);
                setKeys(k => k.filter((_,i)=>i!==idx));
                onChange({...block,items});
              } : undefined}
          />
        ))}
      </div>

      <button onClick={() => { setKeys(k => [...k, uid()]); onChange({...block,items:[...block.items,""]}); }}
        className="px-3 py-1.5 border border-dashed border-[#E5E3DC] rounded-lg text-[12px] text-[#A9ADAA] hover:border-[#29A864] hover:text-[#29A864] transition-colors bg-transparent cursor-pointer mt-1"
      >+ Ajouter un élément</button>
    </div>
  );
}

/* ── Table Editor ── */
function TableEditor({ block, onChange }: {
  block: Extract<EditorBlock, { type: "table" }>;
  onChange: (b: EditorBlock) => void;
}) {
  const rows      = block.rows as TGrid;
  const numRows   = rows.length;
  const numCols   = rows[0]?.length ?? 0;
  const hasHeader = block.hasHeader ?? true;

  const [selStart, setSelStart] = useState<[number, number] | null>(null);
  const [selEnd,   setSelEnd]   = useState<[number, number] | null>(null);

  const activeEl   = useRef<HTMLDivElement | null>(null);
  const cellRefs   = useRef<Map<string, HTMLDivElement>>(new Map());
  const savedRange = useRef<Range | null>(null);
  const [isBold,   setIsBold]   = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnder,  setIsUnder]  = useState(false);
  const [linkMode, setLinkMode] = useState(false);
  const [linkUrl,  setLinkUrl]  = useState("");

  const sr = selStart && selEnd
    ? { r1: Math.min(selStart[0], selEnd[0]), r2: Math.max(selStart[0], selEnd[0]),
        c1: Math.min(selStart[1], selEnd[1]), c2: Math.max(selStart[1], selEnd[1]) }
    : null;
  const isSingleSel = sr ? (sr.r1 === sr.r2 && sr.c1 === sr.c2) : true;
  function inSel(ri: number, ci: number) { return sr ? ri>=sr.r1 && ri<=sr.r2 && ci>=sr.c1 && ci<=sr.c2 : false; }

  const canMerge = !!sr && !isSingleSel && (() => {
    for (let r=sr.r1; r<=sr.r2; r++) for (let c=sr.c1; c<=sr.c2; c++) {
      const cell = rows[r]?.[c];
      if (!cell || (cell.colspan??1)>1 || (cell.rowspan??1)>1) return false;
    }
    return true;
  })();
  const selCell  = selStart ? rows[selStart[0]]?.[selStart[1]] : null;
  const canSplit = isSingleSel && !!selCell && ((selCell.colspan??1)>1 || (selCell.rowspan??1)>1);

  /* Rich text */
  function updateStates() { try { setIsBold(document.queryCommandState("bold")); setIsItalic(document.queryCommandState("italic")); setIsUnder(document.queryCommandState("underline")); } catch {} }

  function syncActive() {
    const el = activeEl.current; if (!el) return;
    const [riStr,ciStr] = (el.dataset.cellkey ?? "").split("-");
    const ri=parseInt(riStr), ci=parseInt(ciStr);
    if (isNaN(ri)||isNaN(ci)||!rows[ri]?.[ci]) return;
    const newRows = rows.slice() as TGrid;
    newRows[ri] = [...rows[ri]];
    newRows[ri][ci] = { ...newRows[ri][ci]!, content: el.innerHTML };
    onChange({ ...block, rows: newRows });
  }

  function execCmd(cmd: string) { activeEl.current?.focus(); document.execCommand(cmd,false); syncActive(); updateStates(); }

  function applyFontSize(size: string) {
    activeEl.current?.focus();
    const sel=window.getSelection(); if (!sel||sel.rangeCount===0||sel.isCollapsed) return;
    const range=sel.getRangeAt(0); const span=document.createElement("span"); span.style.fontSize=size;
    try { range.surroundContents(span); } catch { const f=range.extractContents(); span.appendChild(f); range.insertNode(span); }
    sel.removeAllRanges(); syncActive();
  }

  function startLink() { const sel=window.getSelection(); if (!sel||sel.isCollapsed) return; savedRange.current=sel.getRangeAt(0).cloneRange(); setLinkMode(true); setLinkUrl("https://"); }

  function applyLink() {
    if (!savedRange.current||!linkUrl.trim()) return;
    const sel=window.getSelection(); sel?.removeAllRanges(); sel?.addRange(savedRange.current);
    document.execCommand("createLink",false,linkUrl.trim());
    activeEl.current?.querySelectorAll("a").forEach(a=>{ if (!a.getAttribute("target")) a.setAttribute("target","_blank"); a.setAttribute("rel","noopener noreferrer"); });
    syncActive(); setLinkMode(false); setLinkUrl("");
  }

  /* Cell init: set innerHTML on mount (ref fires once per mount) */
  function setCellRef(el: HTMLDivElement|null, key: string, content: string) {
    if (!el) { cellRefs.current.delete(key); return; }
    cellRefs.current.set(key,el); el.dataset.cellkey=key; el.innerHTML=content||"";
  }

  /* Mutations */
  function merge() {
    if (!sr||!canMerge) return;
    const newRows=rows.map(r=>r.map(c=>c?{...c}:null)) as TGrid; const contents:string[]=[];
    for (let r=sr.r1;r<=sr.r2;r++) for (let c=sr.c1;c<=sr.c2;c++) {
      if (newRows[r][c]?.content) contents.push(newRows[r][c]!.content);
      if (r!==sr.r1||c!==sr.c1) newRows[r][c]=null;
    }
    const cs=sr.c2-sr.c1+1, rs=sr.r2-sr.r1+1;
    newRows[sr.r1][sr.c1]={ content:contents.filter(Boolean).join(" "), ...(cs>1?{colspan:cs}:{}), ...(rs>1?{rowspan:rs}:{}) };
    onChange({ ...block, rows:newRows }); setSelStart([sr.r1,sr.c1]); setSelEnd([sr.r1,sr.c1]);
  }
  function split() {
    if (!selStart||!canSplit||!selCell) return;
    const [ri,ci]=selStart; const cs=selCell.colspan??1, rs=selCell.rowspan??1;
    const newRows=rows.map(r=>r.map(c=>c?{...c}:null)) as TGrid;
    newRows[ri][ci]={content:selCell.content};
    for (let r=ri;r<ri+rs;r++) for (let c=ci;c<ci+cs;c++) if (r!==ri||c!==ci) newRows[r][c]={content:""};
    onChange({ ...block, rows:newRows });
  }
  function addRow()  { onChange({ ...block, rows:[...rows, Array(numCols).fill(null).map(()=>({content:""}))] }); }
  function removeRow(ri:number) { if (numRows<=1) return; onChange({ ...block, rows:rows.filter((_,i)=>i!==ri) }); setSelStart(null);setSelEnd(null); }
  function addCol()  { onChange({ ...block, rows:rows.map(r=>[...r,{content:""}]) }); }
  function removeCol(ci:number) { if (numCols<=1) return; onChange({ ...block, rows:rows.map(r=>r.filter((_,j)=>j!==ci)) }); setSelStart(null);setSelEnd(null); }

  function handleCellMouseDown(e:React.MouseEvent,ri:number,ci:number) {
    if (e.shiftKey) { e.preventDefault(); setSelEnd([ri,ci]); }
    else { setSelStart([ri,ci]); setSelEnd([ri,ci]); }
  }

  const dbtn = "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] border font-medium transition-colors cursor-pointer";

  return (
    <div>
      {/* Row 1: header + merge/split */}
      <div className="flex items-center gap-2 mb-2 flex-wrap">
        <button type="button" onClick={() => onChange({ ...block, hasHeader: !hasHeader })}
          className={`${dbtn} ${hasHeader ? "border-[#29A864] text-[#29A864] bg-[#EDF8F1]" : "border-[#E5E3DC] text-[#A9ADAA] bg-transparent hover:border-[#29A864] hover:text-[#29A864]"}`}
        >
          <span className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 ${hasHeader ? "border-[#29A864] bg-[#29A864]" : "border-[#C0C4C1]"}`}>
            {hasHeader && <svg viewBox="0 0 10 8" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-2.5 h-2.5"><polyline points="1 4 4 7 9 1"/></svg>}
          </span>
          En-tête
        </button>
        {canMerge && <button type="button" onClick={merge} className={`${dbtn} border-[#29A864] text-[#29A864] bg-[#EDF8F1] hover:bg-[#D8F2E6]`}>⊞ Fusionner</button>}
        {canSplit && <button type="button" onClick={split} className={`${dbtn} border-[#D97706] text-[#D97706] bg-[#FEF3CD] hover:bg-[#FDE68A]`}>⊟ Scinder</button>}
        {sr && !isSingleSel && !canMerge && <span className="text-[11px] text-[#A9ADAA]">Sélection invalide</span>}
      </div>

      {/* Row 2: rich text toolbar */}
      <div className="flex items-center gap-1 mb-2 px-2 py-1.5 bg-[#F7F6F2] rounded-xl border border-[#E5E3DC] flex-wrap">
        <FmtBtn active={isBold}   title="Gras"    onAction={() => execCmd("bold")}><span className="font-bold">B</span></FmtBtn>
        <FmtBtn active={isItalic} title="Italique" onAction={() => execCmd("italic")}><span className="italic">I</span></FmtBtn>
        <FmtBtn active={isUnder}  title="Souligné" onAction={() => execCmd("underline")}><span className="underline">S</span></FmtBtn>
        <FmtBtn active={false}    title="Barré"    onAction={() => execCmd("strikeThrough")}><span className="line-through text-[11px]">ab</span></FmtBtn>
        <div className="w-px h-4 bg-[#D5D5D0] mx-0.5 shrink-0"/>
        {([["S","12px"],["M","15px"],["L","19px"],["XL","25px"]] as [string,string][]).map(([l,s]) => (
          <button key={s} type="button" onMouseDown={e => { e.preventDefault(); applyFontSize(s); }}
            className="h-6 px-2 rounded border border-[#E5E3DC] text-[#6E6E6E] hover:border-[#29A864] hover:text-[#29A864] bg-transparent cursor-pointer transition-colors text-[11px]"
          >{l}</button>
        ))}
        <div className="w-px h-4 bg-[#D5D5D0] mx-0.5 shrink-0"/>
        <FmtBtn active={linkMode} title="Insérer un lien"   onAction={startLink}><IconLink /></FmtBtn>
        <FmtBtn active={false}    title="Supprimer le lien" onAction={() => execCmd("unlink")}><IconUnlink /></FmtBtn>
        <div className="w-px h-4 bg-[#D5D5D0] mx-0.5 shrink-0"/>
        <FmtBtn active={false} title="Effacer la mise en forme" onAction={() => execCmd("removeFormat")}><span className="text-[10px]">T×</span></FmtBtn>
      </div>

      {linkMode && (
        <div className="flex gap-2 mb-2 items-center">
          <input type="url" value={linkUrl} onChange={e => setLinkUrl(e.target.value)}
            onKeyDown={e => { if(e.key==="Enter"){e.preventDefault();applyLink();} if(e.key==="Escape"){setLinkMode(false);setLinkUrl("");} }}
            placeholder="https://…" autoFocus className={FIELD_CLS} />
          <button type="button" onClick={applyLink} className="px-3 py-1.5 bg-[#29A864] text-white rounded-lg text-[12px] border-none cursor-pointer hover:bg-[#48BC7E] transition-colors shrink-0">Appliquer</button>
          <button type="button" onClick={() => {setLinkMode(false);setLinkUrl("");}} className="px-3 py-1.5 border border-[#E5E3DC] text-[#6E6E6E] rounded-lg text-[12px] bg-transparent cursor-pointer transition-colors shrink-0">Annuler</button>
        </div>
      )}

      {/* Remove-column buttons */}
      <div className="flex mb-1">
        {Array.from({ length: numCols }, (_, ci) => (
          <div key={ci} className="flex-1 flex justify-end min-w-[80px]">
            {numCols > 1 && <button onClick={() => removeCol(ci)} title="Supprimer la colonne" className="w-5 h-5 rounded text-[10px] text-[#A9ADAA] hover:text-[#B30C2F] hover:bg-[#F8E8EC] border-none bg-transparent cursor-pointer flex items-center justify-center mr-1">×</button>}
          </div>
        ))}
        <div className="w-7 shrink-0" />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => {
                  if (cell === null) return null;
                  const cellKey = `${ri}-${ci}`;
                  const sel   = inSel(ri, ci);
                  const isHdr = ri === 0 && hasHeader;
                  const isMerged = (cell.colspan??1)>1 || (cell.rowspan??1)>1;
                  return (
                    <td key={cellKey} colSpan={cell.colspan} rowSpan={cell.rowspan}
                      onMouseDown={(e) => handleCellMouseDown(e, ri, ci)}
                      className={`border p-0 transition-colors ${sel ? "border-[#29A864] bg-[#EDF8F1]" : isHdr ? "border-[#E5E3DC] bg-[#F7F6F2]" : "border-[#E5E3DC] bg-white"}`}
                    >
                      <div className="relative">
                        {isMerged && <span className="absolute top-0.5 right-1 text-[9px] text-[#C0C4C1] pointer-events-none select-none">{(cell.colspan??1)>1?`${cell.colspan}c`:""}{(cell.rowspan??1)>1?`${cell.rowspan}l`:""}</span>}
                        <div
                          ref={(el) => setCellRef(el as HTMLDivElement|null, cellKey, cell.content)}
                          contentEditable suppressContentEditableWarning
                          onFocus={(e) => { activeEl.current=e.target as HTMLDivElement; updateStates(); }}
                          onKeyUp={updateStates} onMouseUp={updateStates}
                          onInput={(e) => {
                            const html=(e.target as HTMLDivElement).innerHTML;
                            const newRows=rows.slice() as TGrid;
                            newRows[ri]=[...rows[ri]];
                            if (newRows[ri][ci]) newRows[ri][ci]={...newRows[ri][ci]!,content:html};
                            onChange({ ...block, rows:newRows });
                          }}
                          className={`w-full px-3 py-2 text-[13px] bg-transparent outline-none rounded min-w-[80px] focus:bg-white focus:shadow-[inset_0_0_0_2px_#29A864] transition-all min-h-[36px] leading-relaxed [&_a]:text-[#29A864] [&_a]:underline [&_strong]:font-bold [&_em]:italic ${isHdr ? "font-semibold" : ""}`}
                        />
                      </div>
                    </td>
                  );
                })}
                <td className="border-0 pl-1 w-7">
                  {numRows > 1 && <button onClick={() => removeRow(ri)} title="Supprimer la ligne" className="w-5 h-5 rounded text-[10px] text-[#A9ADAA] hover:text-[#B30C2F] hover:bg-[#F8E8EC] border-none bg-transparent cursor-pointer flex items-center justify-center">×</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex gap-2 mt-2 flex-wrap">
        <button onClick={addRow} className="px-3 py-1.5 border border-dashed border-[#E5E3DC] rounded-lg text-[12px] text-[#A9ADAA] hover:border-[#29A864] hover:text-[#29A864] transition-colors bg-transparent cursor-pointer">+ Ligne</button>
        <button onClick={addCol} className="px-3 py-1.5 border border-dashed border-[#E5E3DC] rounded-lg text-[12px] text-[#A9ADAA] hover:border-[#29A864] hover:text-[#29A864] transition-colors bg-transparent cursor-pointer">+ Colonne</button>
      </div>
      {selStart && !canMerge && !canSplit && <p className="text-[11px] text-[#A9ADAA] mt-2">Maj+clic pour sélectionner plusieurs cellules, puis <strong>Fusionner</strong></p>}
    </div>
  );
}

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

  const textAlign = (block.type === "paragraph" || block.type === "heading2" || block.type === "heading3")
    ? (block.align ?? "left") : undefined;

  return (
    <div className="group relative bg-white border border-[#E5E3DC] rounded-xl p-4 hover:border-[#29A864] transition-colors">

      {/* Header */}
      <div className="flex items-center justify-between mb-3 gap-2">
        <span className="text-[11px] font-semibold uppercase tracking-[0.5px] text-[#A9ADAA] shrink-0">
          {BLOCK_LABELS[block.type]}
        </span>

        <div className="flex items-center gap-1 flex-wrap justify-end">

          {/* Text alignment */}
          {(block.type === "paragraph" || block.type === "heading2" || block.type === "heading3") && (
            <>
              <ABtn active={textAlign === "left"}   title="Aligner à gauche" onClick={() => onChange({ ...block, align: "left" })}><IconAlignLeft /></ABtn>
              <ABtn active={textAlign === "center"} title="Centrer"          onClick={() => onChange({ ...block, align: "center" })}><IconAlignCenter /></ABtn>
              <ABtn active={textAlign === "right"}  title="Aligner à droite" onClick={() => onChange({ ...block, align: "right" })}><IconAlignRight /></ABtn>
              <div className="w-px h-4 bg-[#E5E3DC]" />
            </>
          )}

          {/* Image placement */}
          {block.type === "image" && (
            <>
              <ABtn active={!block.align || block.align === "full"} title="Pleine largeur"                   onClick={() => onChange({ ...block, align: "full" })}><IconImageFull /></ABtn>
              <ABtn active={block.align === "float-left"}           title="Flotter à gauche (texte à droite)" onClick={() => onChange({ ...block, align: "float-left" })}><IconFloatLeft /></ABtn>
              <ABtn active={block.align === "float-right"}          title="Flotter à droite (texte à gauche)" onClick={() => onChange({ ...block, align: "float-right" })}><IconFloatRight /></ABtn>
              <div className="w-px h-4 bg-[#E5E3DC]" />
            </>
          )}

          <button onClick={onMoveUp}   disabled={isFirst} className="w-6 h-6 flex items-center justify-center rounded text-[#A9ADAA] hover:text-[#1B1F1D] hover:bg-[#F7F6F2] disabled:opacity-30 transition-colors border-none bg-transparent cursor-pointer text-[12px]">↑</button>
          <button onClick={onMoveDown} disabled={isLast}  className="w-6 h-6 flex items-center justify-center rounded text-[#A9ADAA] hover:text-[#1B1F1D] hover:bg-[#F7F6F2] disabled:opacity-30 transition-colors border-none bg-transparent cursor-pointer text-[12px]">↓</button>
          <button onClick={onDelete}                      className="w-6 h-6 flex items-center justify-center rounded text-[#A9ADAA] hover:text-[#B30C2F] hover:bg-[#F8E8EC] transition-colors border-none bg-transparent cursor-pointer text-[14px]">×</button>
        </div>
      </div>

      {/* Content */}
      {block.type === "paragraph" && (
        <RichTextEditor
          value={block.text}
          onChange={(html) => onChange({ ...block, text: html })}
          align={block.align}
        />
      )}

      {(block.type === "heading2" || block.type === "heading3") && (
        <RichTextEditor
          value={block.text}
          onChange={(html) => onChange({ ...block, text: html })}
          align={block.align}
          minHeight="44px"
          placeholder={block.type === "heading2" ? "Titre principal…" : "Sous-titre…"}
        />
      )}

      {block.type === "quote" && (
        <RichTextEditor
          value={block.text}
          onChange={(html) => onChange({ ...block, text: html })}
          minHeight="80px"
          placeholder="Citation ou mise en avant…"
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
              {(block.align === "float-left" || block.align === "float-right") && (
                <span className="absolute bottom-2 left-2 text-[10px] bg-black/50 text-white px-2 py-0.5 rounded">
                  {block.align === "float-left" ? "⇠ Texte à droite" : "Texte à gauche ⇢"}
                </span>
              )}
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
          <input ref={fileRef} type="file" accept="image/*" className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) handleImageFile(f); }} />
          <input
            type="text"
            value={block.caption}
            onChange={(e) => onChange({ ...block, caption: e.target.value })}
            placeholder="Légende (optionnel)"
            className={INPUT_CLS}
          />
        </div>
      )}

      {block.type === "list" && (
        <RichListEditor block={block} onChange={onChange} />
      )}

      {block.type === "table" && (
        <TableEditor block={block} onChange={onChange} />
      )}

      {block.type === "divider" && (
        <div className="flex items-center gap-3 py-1">
          <div className="flex-1 h-px bg-[#E5E3DC]" />
          <span className="text-[11px] text-[#C0C4C1] select-none">ligne de séparation</span>
          <div className="flex-1 h-px bg-[#E5E3DC]" />
        </div>
      )}

      {block.type === "button" && (() => {
        const variantCls: Record<string, string> = {
          primary:   "bg-[#29A864] text-white",
          secondary: "border-2 border-[#29A864] text-[#29A864]",
          ghost:     "text-[#29A864] underline",
        };
        const sizeCls: Record<string, string> = {
          sm: "px-4 py-2 text-[13px]",
          md: "px-6 py-2.5 text-[15px]",
          lg: "px-8 py-3 text-[17px]",
        };
        const v = block.variant ?? "primary";
        const s = block.size ?? "md";
        const a = block.align ?? "center";
        const optBtn = (active: boolean, onClick: () => void, label: string) => (
          <button type="button" onClick={onClick}
            className={`px-3 py-1 rounded-lg text-[12px] border transition-colors cursor-pointer ${active ? "border-[#29A864] text-[#29A864] bg-[#EDF8F1]" : "border-[#E5E3DC] text-[#A9ADAA] bg-transparent hover:border-[#29A864] hover:text-[#29A864]"}`}
          >{label}</button>
        );
        return (
          <div className="space-y-3">
            {/* Preview */}
            <div className={`flex py-1 ${a === "center" ? "justify-center" : a === "right" ? "justify-end" : "justify-start"}`}>
              <span className={`inline-block rounded-xl font-semibold pointer-events-none ${variantCls[v] ?? variantCls.primary} ${sizeCls[s] ?? sizeCls.md}`}>
                {block.text || "Texte du bouton"}
              </span>
            </div>
            {/* Text */}
            <div>
              <label className="block text-[11px] text-[#A9ADAA] mb-1 uppercase tracking-[0.5px]">Texte</label>
              <input type="text" value={block.text} onChange={e => onChange({...block,text:e.target.value})} placeholder="En savoir plus" className={INPUT_CLS} />
            </div>
            {/* URL */}
            <div>
              <label className="block text-[11px] text-[#A9ADAA] mb-1 uppercase tracking-[0.5px]">Lien (URL)</label>
              <input type="url" value={block.url} onChange={e => onChange({...block,url:e.target.value})} placeholder="https://…" className={INPUT_CLS} />
            </div>
            {/* Options */}
            <div className="flex gap-4 flex-wrap">
              <div>
                <label className="block text-[11px] text-[#A9ADAA] mb-1 uppercase tracking-[0.5px]">Style</label>
                <div className="flex gap-1.5">
                  {optBtn(v==="primary",   ()=>onChange({...block,variant:"primary"}),   "Plein")}
                  {optBtn(v==="secondary", ()=>onChange({...block,variant:"secondary"}), "Contour")}
                  {optBtn(v==="ghost",     ()=>onChange({...block,variant:"ghost"}),     "Texte")}
                </div>
              </div>
              <div>
                <label className="block text-[11px] text-[#A9ADAA] mb-1 uppercase tracking-[0.5px]">Taille</label>
                <div className="flex gap-1.5">
                  {optBtn(s==="sm", ()=>onChange({...block,size:"sm"}), "Petit")}
                  {optBtn(s==="md", ()=>onChange({...block,size:"md"}), "Moyen")}
                  {optBtn(s==="lg", ()=>onChange({...block,size:"lg"}), "Grand")}
                </div>
              </div>
              <div>
                <label className="block text-[11px] text-[#A9ADAA] mb-1 uppercase tracking-[0.5px]">Position</label>
                <div className="flex gap-1.5">
                  {optBtn(a==="left",   ()=>onChange({...block,align:"left"}),   "← Gauche")}
                  {optBtn(a==="center", ()=>onChange({...block,align:"center"}), "Centre")}
                  {optBtn(a==="right",  ()=>onChange({...block,align:"right"}),  "Droite →")}
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}

function NewArticleContent() {
  const router   = useRouter();
  const params   = useSearchParams();
  const editId   = params.get("edit");
  const { user, loading, isAdmin } = useAuth();

  const [title,        setTitle]        = useState("");
  const [subtitle,     setSubtitle]     = useState("");
  const [excerpt,      setExcerpt]      = useState("");
  const [tags,         setTags]         = useState("");
  const [slug,         setSlug]         = useState("");
  const [coverImage,   setCoverImage]   = useState("");
  const [coverFile,    setCoverFile]    = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [blocks,       setBlocks]       = useState<EditorBlock[]>([
    { id: uid(), type: "paragraph", text: "" },
  ]);
  const [status,  setStatus]  = useState<"draft" | "published">("draft");
  const [saving,  setSaving]  = useState(false);
  const [error,   setError]   = useState("");
  const [articleId]           = useState(() => editId ?? uid());
  const coverRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!loading && !isAdmin) router.replace("/blog");
  }, [loading, isAdmin, router]);

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
        (d.body ?? []).map((b: ContentBlock) => {
          const base = { id: uid(), ...b };
          if (b.type === "image") return { ...base, caption: (b as { caption?: string }).caption ?? "" };
          if (b.type === "list")  return { ...base, items: (b as { items?: string[] }).items ?? [""] };
          if (b.type === "table") {
            const rawRows = (b as { rows?: unknown[] }).rows ?? [];
            const rows: TGrid = rawRows.map((r: unknown) =>
              Array.isArray(r) ? r : ((r as { cells?: (TCellData | null)[] }).cells ?? [])
            );
            return { ...base, rows };
          }
          return base;
        })
      );
    });
  }, [editId]);

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
      type === "image" ? { id: uid(), type: "image", url: "", caption: "" } :
      type === "list"  ? { id: uid(), type: "list", listStyle: "bullet", items: [""] } :
      type === "table"   ? { id: uid(), type: "table", hasHeader: true, rows: [
          [{ content: "" }, { content: "" }, { content: "" }],
          [{ content: "" }, { content: "" }, { content: "" }],
          [{ content: "" }, { content: "" }, { content: "" }],
        ] } :
      type === "divider" ? { id: uid(), type: "divider" } :
      type === "button"  ? { id: uid(), type: "button", text: "En savoir plus", url: "", variant: "primary", align: "center", size: "md" } :
                           { id: uid(), type, text: "" };
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
          if (rest.type === "table") {
            const t = rest as { type: "table"; rows: TGrid; hasHeader?: boolean };
            return {
              type: "table",
              hasHeader: t.hasHeader,
              rows: t.rows.map(row => ({
                cells: row.map(cell =>
                  cell ? { ...cell, content: sanitizeHtml(cell.content) } : null
                ),
              })),
            } as ContentBlock;
          }
          if (rest.type === "list") {
            return { ...rest, items: rest.items.map(sanitizeHtml) } as ContentBlock;
          }
          if (
            rest.type === "paragraph" ||
            rest.type === "heading2"  ||
            rest.type === "heading3"  ||
            rest.type === "quote"
          ) {
            return { ...rest, text: sanitizeHtml(rest.text) } as ContentBlock;
          }
          return rest as ContentBlock;
        });

      const tagsArr = tags.split(",").map((t) => t.trim()).filter(Boolean);
      const now     = { seconds: Math.floor(Date.now() / 1000), nanoseconds: 0 };

      const payload = {
        title:      title.trim(),
        subtitle:   subtitle.trim(),
        excerpt:    excerpt.trim(),
        slug:       slug.trim(),
        coverImage: finalCover,
        body,
        tags:       tagsArr,
        status:     targetStatus,
        authorName: user?.displayName ?? user?.email ?? "",
        authorId:   user?.uid ?? "",
        ...(targetStatus === "published" && status !== "published" ? { publishedAt: now } : {}),
      };

      if (editId) {
        await updateDoc(doc(db, "articles", editId), payload);
      } else {
        await addDoc(collection(db, "articles"), { ...payload, createdAt: serverTimestamp() });
      }

      router.push(`/blog/${slug.trim()}`);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSaving(false);
    }
  }

  if (loading || !isAdmin) return null;


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
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
            placeholder="Titre de l'article" className={`${INPUT_CLS} text-[18px] font-semibold`} />
        </div>

        {/* Subtitle */}
        <div>
          <label className="block text-[13px] font-medium text-[#1B1F1D] mb-1.5">Sous-titre</label>
          <input type="text" value={subtitle} onChange={(e) => setSubtitle(e.target.value)}
            placeholder="Accroche ou description courte" className={INPUT_CLS} />
        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-[13px] font-medium text-[#1B1F1D] mb-1.5">Extrait (affiché dans la liste)</label>
          <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Résumé court de l'article…" rows={2} className={`${INPUT_CLS} resize-none`} />
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
          <input type="text" value={tags} onChange={(e) => setTags(e.target.value)}
            placeholder="Hématologie, Réactifs, Biochimie" className={INPUT_CLS} />
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
              {(["paragraph", "heading2", "heading3", "quote", "image", "list", "table", "divider", "button"] as EditorBlock["type"][]).map((type) => (
                <button
                  key={type}
                  onClick={() => addBlock(type)}
                  className="px-3 py-1.5 border border-dashed border-[#E5E3DC] rounded-lg text-[12px] text-[#A9ADAA] hover:border-[#29A864] hover:text-[#29A864] transition-colors bg-transparent cursor-pointer"
                >+ {BLOCK_LABELS[type]}</button>
              ))}
            </div>
          </div>
        </div>

        {error && (
          <p className="text-[13px] text-[#B30C2F] bg-[#F8E8EC] px-4 py-3 rounded-xl">{error}</p>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-2 flex-wrap">
          <button
            onClick={() => handleSave("draft")}
            disabled={saving}
            className="px-6 py-2.5 border border-[#E5E3DC] rounded-xl text-[14px] font-medium text-[#6E6E6E] bg-white cursor-pointer hover:border-[#29A864] hover:text-[#29A864] transition-colors disabled:opacity-50"
          >{saving ? "Enregistrement…" : "Enregistrer comme brouillon"}</button>
          <button
            onClick={() => handleSave("published")}
            disabled={saving}
            className="px-6 py-2.5 bg-[#29A864] text-white rounded-xl text-[14px] font-medium border-none cursor-pointer hover:bg-[#48BC7E] transition-colors disabled:opacity-50"
          >{saving ? "Publication…" : "Publier l'article"}</button>
        </div>

      </div>
    </div>
  );
}

export default function NewArticlePage() {
  return <Suspense><NewArticleContent /></Suspense>;
}
