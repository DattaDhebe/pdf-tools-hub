'use client';

import { useState, useRef } from 'react';
import { PDFDocument, rgb, degrees } from 'pdf-lib';

export function PdfWatermarkTool() {
  const [file, setFile] = useState<File | null>(null);
  const [watermarkText, setWatermarkText] = useState<string>('WATERMARK');
  const [opacity, setOpacity] = useState<number>(0.3);
  const [watermarking, setWatermarking] = useState(false);
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (selectedFile: File) => {
    if (selectedFile.type !== 'application/pdf') {
      setError('Please select a valid PDF file');
      return;
    }
    setFile(selectedFile);
    setError('');
  };

  const handleWatermark = async () => {
    if (!file || !watermarkText) return;

    setWatermarking(true);
    setError('');

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = pdfDoc.getPages();

      const fontSize = 60;
      const textWidth = watermarkText.length * (fontSize * 0.5);
      const textHeight = fontSize;

      for (const page of pages) {
        const { width, height } = page.getSize();
        
        // Calculate position (center, diagonal)
        const x = (width - textWidth) / 2;
        const y = (height - textHeight) / 2;

        page.drawText(watermarkText, {
          x,
          y,
          size: fontSize,
          color: rgb(0, 0, 0),
          opacity,
          rotate: degrees(-45),
        });
      }

      const watermarkedPdf = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(watermarkedPdf)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `watermarked-${file.name}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Watermarking failed');
    } finally {
      setWatermarking(false);
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

      {file && (
        <div className="theme-card rounded-2xl border p-6 space-y-4">
          <div>
            <p className="text-sm font-semibold theme-title">Selected File</p>
            <p className="mt-2 text-base theme-muted">{file.name}</p>
            <p className="mt-1 text-sm theme-muted">Size: {(file.size / 1024).toFixed(2)} KB</p>
          </div>

          <div className="border-t pt-4 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-semibold theme-title">
                Watermark Text
              </label>
              <input
                type="text"
                value={watermarkText}
                onChange={(e) => setWatermarkText(e.target.value)}
                className="theme-card w-full rounded-lg border px-4 py-2 theme-title focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter watermark text"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold theme-title">
                Opacity: {(opacity * 100).toFixed(0)}%
              </label>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.1"
                value={opacity}
                onChange={(e) => setOpacity(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>
          </div>

          <div className="flex gap-3 border-t pt-4">
            <button
              onClick={handleWatermark}
              disabled={watermarking}
              className="flex-1 rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
            >
              {watermarking ? 'Adding Watermark...' : 'Add Watermark'}
            </button>
            <button
              onClick={() => {
                setFile(null);
                setWatermarkText('WATERMARK');
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
