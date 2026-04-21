'use client';

import { useRef, useState } from 'react';
import { PDFDocument } from 'pdf-lib';

export function PdfEncryptTool() {
  const [file, setFile] = useState<File | null>(null);
  const [flattenForms, setFlattenForms] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (selectedFile: File) => {
    if (selectedFile.type !== 'application/pdf') {
      setError('Please select a valid PDF file.');
      return;
    }
    setFile(selectedFile);
    setError('');
  };

  const handleProtect = async () => {
    if (!file) {
      setError('Please select a PDF file.');
      return;
    }

    setProcessing(true);
    setError('');

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);

      if (flattenForms) {
        const form = pdfDoc.getForm();
        form.flatten();
      }

      // Lightweight hardening for static/client setup:
      // remove editable form fields by flattening and set sanitized metadata.
      pdfDoc.setProducer('DHEBE PDF Studio');
      pdfDoc.setCreator('DHEBE Studios');
      pdfDoc.setSubject('Protected copy');
      pdfDoc.setModificationDate(new Date());

      const protectedPdf = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(protectedPdf)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `protected-${file.name}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Protection failed.');
    } finally {
      setProcessing(false);
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

          <label className="flex items-center gap-2 border-t pt-4 text-sm theme-title">
            <input
              type="checkbox"
              checked={flattenForms}
              onChange={(e) => setFlattenForms(e.target.checked)}
            />
            Flatten interactive form fields
          </label>

          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
            <p className="text-sm text-blue-900">
              This static-hosting-safe protection mode locks form edits by flattening fields and exports a hardened copy in your browser. For true password encryption, a server-backed PDF engine is required.
            </p>
          </div>

          <div className="flex gap-3 border-t pt-4">
            <button
              onClick={handleProtect}
              disabled={processing}
              className="flex-1 rounded-lg bg-orange-600 px-4 py-3 font-semibold text-white hover:bg-orange-700 disabled:opacity-50"
            >
              {processing ? 'Protecting...' : 'Protect PDF'}
            </button>
            <button
              onClick={() => setFile(null)}
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
