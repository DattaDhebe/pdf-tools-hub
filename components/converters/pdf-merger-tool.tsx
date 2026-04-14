'use client';

import { useState, useRef } from 'react';
import { PDFDocument } from 'pdf-lib';

interface SelectedFile {
  file: File;
  order: number;
}

export function PdfMergerTool() {
  const [files, setFiles] = useState<SelectedFile[]>([]);
  const [merging, setMerging] = useState(false);
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (newFiles: FileList) => {
    const newSelectedFiles = Array.from(newFiles).map((file, index) => ({
      file,
      order: files.length + index,
    }));

    for (const { file } of newSelectedFiles) {
      if (file.type !== 'application/pdf') {
        setError('All files must be valid PDF files');
        return;
      }
    }

    setFiles([...files, ...newSelectedFiles]);
    setError('');
  };

  const handleRemoveFile = (order: number) => {
    setFiles(files.filter((f) => f.order !== order));
  };

  const handleReorder = (fromOrder: number, direction: 'up' | 'down') => {
    const fromIndex = files.findIndex((f) => f.order === fromOrder);
    if (direction === 'up' && fromIndex > 0) {
      const newFiles = [...files];
      [newFiles[fromIndex - 1], newFiles[fromIndex]] = [newFiles[fromIndex], newFiles[fromIndex - 1]];
      setFiles(newFiles);
    } else if (direction === 'down' && fromIndex < files.length - 1) {
      const newFiles = [...files];
      [newFiles[fromIndex], newFiles[fromIndex + 1]] = [newFiles[fromIndex + 1], newFiles[fromIndex]];
      setFiles(newFiles);
    }
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      setError('Please select at least 2 PDF files to merge');
      return;
    }

    setMerging(true);
    setError('');

    try {
      const mergedPdf = await PDFDocument.create();

      for (const { file } of files) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'merged.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Merge failed');
    } finally {
      setMerging(false);
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
            multiple
            onChange={(e) => e.target.files && handleFileSelect(e.target.files)}
            className="hidden"
          />
          <div className="text-center">
            <p className="text-xl font-semibold text-slate-900">Drop PDFs here</p>
            <p className="text-sm text-slate-600">or click to browse (select multiple files)</p>
          </div>
        </label>
      </div>

      {files.length > 0 && (
        <div className="rounded-2xl border border-slate-200/80 p-6 space-y-4">
          <div>
            <p className="text-sm font-semibold text-slate-900 mb-4">
              Selected Files ({files.length})
            </p>
            <div className="space-y-2">
              {files.map((item, index) => (
                <div key={item.order} className="flex items-center justify-between bg-slate-50 p-3 rounded-lg">
                  <div className="flex items-center gap-3 flex-1">
                    <span className="text-xs font-bold bg-slate-200 px-2 py-1 rounded text-slate-700">
                      {index + 1}
                    </span>
                    <span className="text-sm text-slate-700 flex-1 truncate">{item.file.name}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleReorder(item.order, 'up')}
                      disabled={index === 0}
                      className="px-2 py-1 text-xs rounded bg-slate-200 hover:bg-slate-300 disabled:opacity-50"
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => handleReorder(item.order, 'down')}
                      disabled={index === files.length - 1}
                      className="px-2 py-1 text-xs rounded bg-slate-200 hover:bg-slate-300 disabled:opacity-50"
                    >
                      ↓
                    </button>
                    <button
                      onClick={() => handleRemoveFile(item.order)}
                      className="px-2 py-1 text-xs rounded bg-red-100 hover:bg-red-200 text-red-700"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 border-t pt-4">
            <button
              onClick={handleMerge}
              disabled={merging}
              className="flex-1 rounded-lg bg-green-600 px-4 py-3 font-semibold text-white hover:bg-green-700 disabled:opacity-50"
            >
              {merging ? 'Merging...' : 'Merge PDFs'}
            </button>
            <button
              onClick={() => setFiles([])}
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
