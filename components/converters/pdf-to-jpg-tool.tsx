'use client';

import { useRef, useState } from 'react';
import { PdfDropZone } from '@/components/converters/pdf-drop-zone';
import { getPdfJs } from '@/lib/pdfjs';

export function PdfToJpgTool() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
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

  const handleConvert = async () => {
    if (!file) return;
    setProcessing(true);
    setError('');
    try {
      const { getDocument } = await getPdfJs();
      const pdf = await getDocument({ data: await file.arrayBuffer() } as never).promise;
      for (let i = 1; i <= pdf.numPages; i += 1) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 1.8 });
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Canvas init failed');
        canvas.width = Math.floor(viewport.width);
        canvas.height = Math.floor(viewport.height);
        await page.render({ canvas, canvasContext: ctx, viewport } as never).promise;
        const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = `${file.name.replace(/\.pdf$/i, '')}-page-${i}.jpg`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Conversion failed');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <PdfDropZone inputRef={fileInputRef} onSelect={(f) => f instanceof File && handleFileSelect(f)} title="Drop your PDF here" />
      {file && (
        <div className="theme-card rounded-2xl border p-6 space-y-4">
          <p className="text-sm theme-muted">Selected: {file.name}</p>
          <button onClick={handleConvert} disabled={processing} className="w-full rounded-lg bg-cyan-600 px-4 py-3 font-semibold text-white disabled:opacity-50">
            {processing ? 'Converting...' : 'Convert PDF to JPG'}
          </button>
        </div>
      )}
      {error && <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-900">{error}</div>}
    </div>
  );
}
