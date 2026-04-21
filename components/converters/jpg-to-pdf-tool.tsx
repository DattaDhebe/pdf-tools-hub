'use client';

import { useRef, useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { PdfDropZone } from '@/components/converters/pdf-drop-zone';

export function JpgToPdfTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSelect = (selected: FileList | File | null) => {
    const list = selected instanceof FileList ? Array.from(selected) : selected ? [selected] : [];
    const valid = list.filter((f) => f.type === 'image/jpeg' || f.type === 'image/jpg' || f.name.toLowerCase().endsWith('.jpg') || f.name.toLowerCase().endsWith('.jpeg'));
    if (valid.length === 0) {
      setError('Please upload JPG/JPEG files only');
      return;
    }
    setFiles(valid);
    setError('');
  };

  const handleConvert = async () => {
    if (files.length === 0) return;
    setProcessing(true);
    setError('');
    try {
      const pdf = await PDFDocument.create();
      for (const file of files) {
        const bytes = await file.arrayBuffer();
        const img = await pdf.embedJpg(bytes);
        const page = pdf.addPage([img.width, img.height]);
        page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
      }
      const out = await pdf.save();
      const blob = new Blob([new Uint8Array(out)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'jpg-to-pdf.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Conversion failed');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <PdfDropZone
        inputRef={fileInputRef}
        onSelect={handleSelect}
        multiple
        accept="image/jpeg,.jpg,.jpeg"
        title="Drop JPG files here"
        helperText="or click to browse (select multiple JPG files)"
      />
      {files.length > 0 && (
        <div className="theme-card rounded-2xl border p-6 space-y-4">
          <p className="text-sm theme-muted">{files.length} JPG file(s) selected</p>
          <button onClick={handleConvert} disabled={processing} className="w-full rounded-lg bg-emerald-600 px-4 py-3 font-semibold text-white disabled:opacity-50">
            {processing ? 'Converting...' : 'Convert JPG to PDF'}
          </button>
        </div>
      )}
      {error && <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-900">{error}</div>}
    </div>
  );
}
