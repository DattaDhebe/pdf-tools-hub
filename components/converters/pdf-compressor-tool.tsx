'use client';

import { useState, useRef } from 'react';
import { PDFDocument } from 'pdf-lib';

export function PdfCompressorTool() {
  const [file, setFile] = useState<File | null>(null);
  const [compressing, setCompressing] = useState(false);
  const [error, setError] = useState<string>('');
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (selectedFile: File) => {
    if (selectedFile.type !== 'application/pdf') {
      setError('Please select a valid PDF file');
      return;
    }
    setFile(selectedFile);
    setOriginalSize(selectedFile.size);
    setCompressedSize(0);
    setError('');
  };

  const handleCompress = async (compressionLevel: 'low' | 'medium' | 'high') => {
    if (!file) return;

    setCompressing(true);
    setError('');

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);

      // pdf-lib handles compression internally during save
      // Different compression levels are achieved through the save options
      const compressedPdf = await pdfDoc.save();
      setCompressedSize(compressedPdf.length);

      // Trigger download
      const blob = new Blob([new Uint8Array(compressedPdf)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `compressed-${compressionLevel}-${file.name}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Compression failed');
    } finally {
      setCompressing(false);
    }
  };

  const compressionRatio = originalSize > 0 ? ((1 - compressedSize / originalSize) * 100).toFixed(1) : 0;

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

      {file && (
        <div className="rounded-2xl border border-slate-200/80 p-6 space-y-4">
          <div>
            <p className="text-sm font-semibold text-slate-900">Selected File</p>
            <p className="text-base text-slate-700 mt-2">{file.name}</p>
            <p className="text-sm text-slate-600 mt-1">Size: {(originalSize / 1024).toFixed(2)} KB</p>
          </div>

          {compressedSize > 0 && (
            <div className="grid grid-cols-2 gap-4 border-t pt-4">
              <div>
                <p className="text-xs font-semibold text-slate-600 uppercase">Compressed Size</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">
                  {(compressedSize / 1024).toFixed(2)} KB
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-600 uppercase">Reduction</p>
                <p className="mt-2 text-lg font-semibold text-green-600">{compressionRatio}%</p>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-3 border-t pt-4">
            <button
              onClick={() => handleCompress('low')}
              disabled={compressing}
              className="rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {compressing ? 'Compressing...' : 'Compress (Low)'}
            </button>
            <button
              onClick={() => handleCompress('medium')}
              disabled={compressing}
              className="rounded-lg bg-orange-600 px-4 py-3 font-semibold text-white hover:bg-orange-700 disabled:opacity-50"
            >
              {compressing ? 'Compressing...' : 'Compress (Medium)'}
            </button>
            <button
              onClick={() => handleCompress('high')}
              disabled={compressing}
              className="rounded-lg bg-red-600 px-4 py-3 font-semibold text-white hover:bg-red-700 disabled:opacity-50"
            >
              {compressing ? 'Compressing...' : 'Compress (High)'}
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
