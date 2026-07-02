"use client";

import { useState, useRef } from "react";

interface Props {
  name: string;
  defaultUrl?: string;
  label?: string;
  hint?: string;
  aspectRatio?: "square" | "video" | "auto";
}

export default function ImageUpload({
  name,
  defaultUrl = "",
  label,
  hint,
  aspectRatio = "auto",
}: Props) {
  const [url,       setUrl]      = useState(defaultUrl);
  const [uploading, setUploading] = useState(false);
  const [error,     setError]    = useState("");
  const [dragging,  setDragging] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  async function upload(file: File) {
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file (JPG, PNG, WEBP, etc.)");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("Image must be under 10 MB");
      return;
    }
    setError("");
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res  = await fetch("/api/upload", { method: "POST", body: fd });
      const json = await res.json().catch(() => ({ error: "Upload failed" }));
      if (!res.ok) throw new Error(json.error ?? "Upload failed");
      setUrl(json.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed — please try again");
    } finally {
      setUploading(false);
    }
  }

  const aspectClass = aspectRatio === "square"
    ? "aspect-square"
    : aspectRatio === "video"
      ? "aspect-video"
      : "min-h-[160px]";

  return (
    <div className="w-full">
      {label && (
        <p className="text-xs font-medium text-slate-600 mb-1.5">{label}</p>
      )}

      {/* Hidden input — carries the CDN URL when the form submits */}
      <input type="hidden" name={name} value={url} />

      {url ? (
        /* ── Preview state ── */
        <div className={`relative group rounded-xl overflow-hidden border border-slate-200 bg-slate-50 ${aspectClass}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt="Uploaded" className="w-full h-full object-cover" />

          {/* Hover overlay with actions */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => ref.current?.click()}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-white/20 hover:bg-white/30 rounded-lg backdrop-blur-sm transition-colors"
            >
              Change
            </button>
            <button
              type="button"
              onClick={() => setUrl("")}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-red-500/80 hover:bg-red-500 rounded-lg transition-colors"
            >
              Remove
            </button>
          </div>

          {/* Upload progress overlay */}
          {uploading && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>
      ) : (
        /* ── Drop-zone state ── */
        <div
          onClick={() => ref.current?.click()}
          onDragEnter={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={(e) => { e.preventDefault(); setDragging(false); }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            const file = e.dataTransfer.files[0];
            if (file) upload(file);
          }}
          className={`
            cursor-pointer rounded-xl border-2 border-dashed transition-all
            flex flex-col items-center justify-center gap-3 p-8 ${aspectClass}
            ${dragging
              ? "border-slate-900 bg-slate-100"
              : "border-slate-200 bg-slate-50 hover:border-slate-400 hover:bg-white"
            }
          `}
        >
          {uploading ? (
            <div className="w-8 h-8 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                </svg>
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-slate-600">
                  {dragging ? "Drop image here" : "Upload image"}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Click or drag &amp; drop &middot; JPG, PNG, WEBP &middot; Max 10 MB
                </p>
              </div>
            </>
          )}
        </div>
      )}

      {/* Hidden file picker (accepts photos from phone gallery too) */}
      <input
        ref={ref}
        type="file"
        accept="image/*"
        capture={undefined}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) upload(file);
          e.target.value = ""; // reset so same file can be re-selected
        }}
      />

      {error && (
        <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
          <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
          </svg>
          {error}
        </p>
      )}

      {hint && !error && (
        <p className="mt-1.5 text-xs text-slate-400">{hint}</p>
      )}
    </div>
  );
}
