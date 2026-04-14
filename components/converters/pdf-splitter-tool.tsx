'use client';

import { useState, useRef } from 'react';
import { PDFDocument } from 'pdf-lib';

export function PdfSplitterTool() {
  const [file, setFile] = useState<File | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [startPage, setStartPage] = useState<string>('1');
  const [endPage, setEndPage] = useState<string>('1');
  const [splitting, setSplitting] = useState(false);
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
      setStartPage('1');
      setEndPage(String(pages));
      setError('');
    } catch (err) {
      setError('Failed to load PDF file');
    }
  };

  const handleSplit = async () => {
    if (!file) return;

    const start = parseInt(startPage) || 1;
    const end = parseInt(endPage) || totalPages;

    if (start < 1 || end > totalPages || start > end) {
      setError(`Please enter valid page range (1 - ${totalPages})`);
      return;
    }

    setSplitting(true);
    setError('');

    try {
      const arrayBuffer = await file.arrayBuffer();
      const sourceDoc = await PDFDocument.load(arrayBuffer);
      const newDoc = await PDFDocument.create();

      const pagesToExtract = [];
      for (let i = start - 1; i < end; i++) {
        pagesToExtract.push(i);
      }

      const copiedPages = await newDoc.copyPages(sourceDoc, pagesToExtract);
      copiedPages.forEach((page) => newDoc.addPage(page));

      const newPdfBytes = await newDoc.save();
      const blob = new Blob([newPdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `extracted-pages-${start}-${end}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Split failed');
    } finally {
      setSplitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200/80 p-6 theme-card-soft">
        <label className="flex cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-slate-300 py-12 hover:border-slate-400 hover:bg-slate-50">
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
            className="hidden"
          />
          <div className="text-center">
            <p className="text-xl font-semibold text-slate-900">Drop your PDF here</p>
            <p className="text-sm text-slate-600">or click to browse</p>
          </div>
        </label>
      </div>

      {file && totalPages > 0 && (
        <div className="rounded-2xl border border-slate-200/80 p-6 space-y-4">
          <div>
            <p className="text-sm font-semibold text-slate-900">Selected File</p>
            <p className="text-base text-slate-700 mt-2">{file.name}</p>
            <p className="text-sm text-slate-600 mt-1">Total Pages: {totalPages}</p>
          </div>

          <div className="border-t pt-4 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Start Page (1 - {totalPages})
              </label>
              <input
                type="number"
                min="1"
                max={totalPages}
                value={startPage}
                onChange={(e) => setStartPage(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                End Page (1 - {totalPages})
              </label>
              <input
                type="number"
                min="1"
                max={totalPages}
                value={endPage}
                onChange={(e) => setEndPage(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex gap-3 border-t pt-4">
            <button
              onClick={handleSplit}
              disabled={splitting}
              className="flex-1 rounded-lg bg-purple-600 px-4 py-3 font-semibold text-white hover:bg-purple-700 disabled:opacity-50"
            >
              {splitting ? 'Splitting...' : 'Extract Pages'}
            </button>
            <button
              onClick={() => {
                setFile(null);
                setTotalPages(0);
              }}
              className="rounded-lg bg-slate-200 px-4 py-3 font-semibold text-slate-700 hover:bg-slate-300"
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
