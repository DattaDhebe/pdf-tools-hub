'use client';

import { useState, useRef } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';

export function PdfEditTool() {
  const [file, setFile] = useState<File | null>(null);
  const [editText, setEditText] = useState<string>('');
  const [selectedPage, setSelectedPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (selectedFile: File) => {
    if (selectedFile.type !== 'application/pdf') {
      setError('Please select a valid PDF file');
      return;
    }

    try {
      const arrayBuffer = await selectedFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = pdfDoc.getPageCount();

      setFile(selectedFile);
      setTotalPages(pages);
      setSelectedPage(1);
      setEditText('');
      setError('');
    } catch (err) {
      setError('Failed to load PDF file');
    }
  };

  const handleAddText = async () => {
    if (!file || !editText) {
      setError('Please enter text to add');
      return;
    }

    if (selectedPage < 1 || selectedPage > totalPages) {
      setError(`Please select a valid page (1 - ${totalPages})`);
      return;
    }

    setEditing(true);
    setError('');

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = pdfDoc.getPages();
      const page = pages[selectedPage - 1];

      if (!page) throw new Error('Page not found');

      const { height } = page.getSize();

      // Add text at the top of the page
      page.drawText(editText, {
        x: 50,
        y: height - 80,
        size: 14,
        color: rgb(0, 0, 0),
      });

      const editedPdf = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(editedPdf)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `edited-${file.name}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setEditText('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Edit failed');
    } finally {
      setEditing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border p-6 theme-card-soft">
        <label className="flex cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-[var(--app-card-border)] py-12 transition hover:brightness-95">
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
            className="hidden"
          />
          <div className="text-center">
            <p className="text-xl font-semibold theme-title">Drop your PDF here</p>
            <p className="text-sm theme-muted">or click to browse</p>
          </div>
        </label>
      </div>

      {file && totalPages > 0 && (
        <div className="theme-card rounded-2xl border p-6 space-y-4">
          <div>
            <p className="text-sm font-semibold theme-title">Selected File</p>
            <p className="mt-2 text-base theme-muted">{file.name}</p>
            <p className="mt-1 text-sm theme-muted">Total Pages: {totalPages}</p>
          </div>

          <div className="border-t pt-4 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-semibold theme-title">
                Select Page (1 - {totalPages})
              </label>
              <input
                type="number"
                min="1"
                max={totalPages}
                value={selectedPage}
                onChange={(e) => setSelectedPage(parseInt(e.target.value) || 1)}
                className="theme-card w-full rounded-lg border px-4 py-2 theme-title focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold theme-title">
                Text to Add
              </label>
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="theme-card w-full rounded-lg border px-4 py-2 theme-title focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter text to add to PDF"
                rows={4}
              />
            </div>
          </div>

          <div className="flex gap-3 border-t pt-4">
            <button
              onClick={handleAddText}
              disabled={editing}
              className="flex-1 rounded-lg bg-cyan-600 px-4 py-3 font-semibold text-white hover:bg-cyan-700 disabled:opacity-50"
            >
              {editing ? 'Editing...' : 'Add Text'}
            </button>
            <button
              onClick={() => {
                setFile(null);
                setEditText('');
                setTotalPages(0);
              }}
              className="theme-card rounded-lg px-4 py-3 font-semibold theme-title transition hover:brightness-95"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-4">
          <p className="text-sm font-semibold text-red-900">{error}</p>
        </div>
      )}
    </div>
  );
}
