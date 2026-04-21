'use client';

import { useEffect, useRef, useState } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';
import { PdfDropZone } from '@/components/converters/pdf-drop-zone';

interface EditMark {
  id: string;
  page: number;
  xRatio: number;
  yRatio: number;
  text: string;
}

export function PdfEditTool() {
  const [file, setFile] = useState<File | null>(null);
  const [inputText, setInputText] = useState<string>('Sample text');
  const [selectedPage, setSelectedPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [editing, setEditing] = useState(false);
  const [previewing, setPreviewing] = useState(false);
  const [error, setError] = useState<string>('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [marks, setMarks] = useState<EditMark[]>([]);
  const [activeMarkId, setActiveMarkId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewWrapRef = useRef<HTMLDivElement>(null);

  const clearPreviewUrl = () => {
    setPreviewUrl((current) => {
      if (current) URL.revokeObjectURL(current);
      return null;
    });
  };

  const handleFileSelect = async (selectedFile: File) => {
    if (selectedFile.type !== 'application/pdf') {
      setError('Please select a valid PDF file');
      return;
    }

    try {
      const arrayBuffer = await selectedFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = pdfDoc.getPageCount();

      clearPreviewUrl();
      const sourceUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(sourceUrl);
      setFile(selectedFile);
      setTotalPages(pages);
      setSelectedPage(1);
      setMarks([]);
      setActiveMarkId(null);
      setError('');
    } catch {
      setError('Failed to load PDF file');
    }
  };

  const updatePreview = async () => {
    if (!file) return;

    setPreviewing(true);
    try {
      const bytes = await buildEditedPdfBytes();
      const blob = new Blob([new Uint8Array(bytes)], { type: 'application/pdf' });
      const nextUrl = URL.createObjectURL(blob);
      setPreviewUrl((current) => {
        if (current) URL.revokeObjectURL(current);
        return nextUrl;
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Preview update failed');
    } finally {
      setPreviewing(false);
    }
  };

  const handlePreviewClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!previewWrapRef.current || !inputText.trim()) return;

    const rect = previewWrapRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const xRatio = Math.min(Math.max(x / rect.width, 0), 1);
    const yRatio = Math.min(Math.max(y / rect.height, 0), 1);

    const mark: EditMark = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      page: selectedPage,
      xRatio,
      yRatio,
      text: inputText.trim(),
    };

    setMarks((prev) => [...prev, mark]);
    setActiveMarkId(mark.id);
  };

  const buildEditedPdfBytes = async () => {
    if (!file) throw new Error('No file selected');

    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const pages = pdfDoc.getPages();

    for (const mark of marks) {
      const page = pages[mark.page - 1];
      if (!page) continue;
      const { width, height } = page.getSize();
      page.drawText(mark.text, {
        x: mark.xRatio * width,
        y: height - mark.yRatio * height,
        size: 14,
        color: rgb(0, 0, 0),
      });
    }

    return pdfDoc.save();
  };

  useEffect(() => {
    if (!file) return;
    const timer = setTimeout(() => {
      void updatePreview();
    }, 250);
    return () => clearTimeout(timer);
  }, [marks, file]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    return () => {
      clearPreviewUrl();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDownloadEditedPdf = async () => {
    if (!file) return;
    setEditing(true);
    setError('');
    try {
      const editedPdf = await buildEditedPdfBytes();
      const blob = new Blob([new Uint8Array(editedPdf)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `edited-${file.name}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Edit failed');
    } finally {
      setEditing(false);
    }
  };

  return (
    <div className="space-y-6">
      <PdfDropZone
        inputRef={fileInputRef}
        onSelect={(selected) => selected instanceof File && handleFileSelect(selected)}
        title="Drop your PDF here"
      />

      {file && totalPages > 0 && (
        <div className="theme-card rounded-2xl border p-6 space-y-4">
          <div>
            <p className="text-sm font-semibold theme-title">Selected File</p>
            <p className="mt-2 text-base theme-muted">{file.name}</p>
            <p className="mt-1 text-sm theme-muted">Total Pages: {totalPages}</p>
          </div>

          <div className="grid gap-4 border-t pt-4 lg:grid-cols-2">
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold theme-title">
                  Active Page (for placing text)
                </label>
                <input
                  type="number"
                  min="1"
                  max={totalPages}
                  value={selectedPage}
                  onChange={(e) => setSelectedPage(parseInt(e.target.value, 10) || 1)}
                  className="theme-card w-full rounded-lg border px-4 py-2 theme-title focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold theme-title">Text to place</label>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="theme-card w-full rounded-lg border px-4 py-2 theme-title focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Type text, then click preview to place it"
                  rows={3}
                />
                <p className="mt-2 text-xs theme-muted">
                  Click anywhere on the preview to place this text on the selected page.
                </p>
              </div>

              <div className="rounded-xl border p-3 theme-card-soft">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] theme-muted-2">
                  Placed edits
                </p>
                <p className="mt-2 text-sm theme-title">{marks.length} item(s)</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {marks.map((mark) => (
                    <button
                      key={mark.id}
                      type="button"
                      onClick={() => setActiveMarkId(mark.id)}
                      className={`rounded px-2 py-1 text-xs ${
                        activeMarkId === mark.id
                          ? 'bg-cyan-600 text-white'
                          : 'theme-card border theme-title'
                      }`}
                    >
                      P{mark.page}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm font-semibold theme-title">Live PDF Editor</p>
              <div className="theme-card-soft rounded-xl border p-2">
                <div
                  ref={previewWrapRef}
                  onClick={handlePreviewClick}
                  className="relative cursor-crosshair rounded-lg border"
                >
                  {previewUrl ? (
                    <iframe
                      title="Live PDF preview"
                      src={previewUrl}
                      className="h-[430px] w-full rounded-lg pointer-events-none"
                    />
                  ) : (
                    <div className="flex h-[430px] items-center justify-center text-sm theme-muted">
                      Preview not available
                    </div>
                  )}

                  {marks
                    .filter((mark) => mark.page === selectedPage)
                    .map((mark) => (
                      <span
                        key={mark.id}
                        className={`absolute -translate-x-1/2 -translate-y-1/2 rounded px-1.5 py-0.5 text-xs ${
                          activeMarkId === mark.id
                            ? 'bg-cyan-600 text-white'
                            : 'bg-white/90 text-slate-900'
                        }`}
                        style={{
                          left: `${mark.xRatio * 100}%`,
                          top: `${mark.yRatio * 100}%`,
                        }}
                      >
                        {mark.text}
                      </span>
                    ))}
                </div>
              </div>
              {previewing && <p className="mt-2 text-xs theme-muted">Updating live preview...</p>}
            </div>
          </div>

          <div className="flex gap-3 border-t pt-4">
            <button
              onClick={handleDownloadEditedPdf}
              disabled={editing}
              className="flex-1 rounded-lg bg-cyan-600 px-4 py-3 font-semibold text-white hover:bg-cyan-700 disabled:opacity-50"
            >
              {editing ? 'Preparing...' : 'Download Edited PDF'}
            </button>
            <button
              onClick={() => {
                clearPreviewUrl();
                setFile(null);
                setInputText('Sample text');
                setTotalPages(0);
                setMarks([]);
                setActiveMarkId(null);
              }}
              className="theme-card rounded-lg px-4 py-3 font-semibold theme-title transition hover:brightness-95"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-sm font-semibold text-red-900">{error}</p>
        </div>
      )}
    </div>
  );
}
