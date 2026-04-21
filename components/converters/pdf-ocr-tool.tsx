'use client';

import { useRef, useState } from 'react';
import { createWorker } from 'tesseract.js';
import { PdfDropZone } from '@/components/converters/pdf-drop-zone';
import { getPdfJs } from '@/lib/pdfjs';

function downloadText(text: string, filename: string) {
  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function PdfOcrTool() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string>('');
  const [ocrResult, setOcrResult] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (selectedFile: File) => {
    if (selectedFile.type !== 'application/pdf') {
      setError('Please select a valid PDF file.');
      return;
    }
    setFile(selectedFile);
    setOcrResult('');
    setError('');
  };

  const handleOcr = async () => {
    if (!file) return;

    setProcessing(true);
    setError('');

    let worker: Awaited<ReturnType<typeof createWorker>> | null = null;
    try {
      const buffer = await file.arrayBuffer();
      const { getDocument } = await getPdfJs();
      const pdf = await getDocument({ data: buffer } as never).promise;
      const firstPage = await pdf.getPage(1);
      const viewport = firstPage.getViewport({ scale: 2 });

      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (!context) {
        throw new Error('Unable to create canvas context for OCR.');
      }

      canvas.width = Math.floor(viewport.width);
      canvas.height = Math.floor(viewport.height);
      await firstPage.render({ canvas, canvasContext: context, viewport } as never).promise;

      worker = await createWorker('eng');
      const result = await worker.recognize(canvas);
      const text = result.data.text.trim();

      if (!text) {
        setError('No OCR text was detected on page 1.');
        return;
      }

      const output = `OCR output from page 1 of ${file.name}\n\n${text}`;
      setOcrResult(output);
      downloadText(output, `ocr-${file.name.replace(/\.pdf$/i, '')}.txt`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'OCR processing failed.');
    } finally {
      if (worker) {
        await worker.terminate();
      }
      setProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <PdfDropZone
        inputRef={fileInputRef}
        onSelect={(selected) => selected instanceof File && handleFileSelect(selected)}
        title="Drop your PDF here"
        helperText="or click to browse (scanned PDFs work best)"
      />

      {file && (
        <div className="theme-card rounded-2xl border p-6 space-y-4">
          <div>
            <p className="text-sm font-semibold theme-title">Selected File</p>
            <p className="mt-2 text-base theme-muted">{file.name}</p>
            <p className="mt-1 text-sm theme-muted">Size: {(file.size / 1024).toFixed(2)} KB</p>
          </div>

          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm text-amber-900">
              For static hosting performance, OCR currently processes page 1. This keeps memory use low and works reliably on shared hosting plans.
            </p>
          </div>

          <div className="flex gap-3 border-t pt-4">
            <button
              onClick={handleOcr}
              disabled={processing}
              className="flex-1 rounded-lg bg-amber-600 px-4 py-3 font-semibold text-white hover:bg-amber-700 disabled:opacity-50"
            >
              {processing ? 'Processing OCR...' : 'Run OCR'}
            </button>
            <button
              onClick={() => {
                setFile(null);
                setOcrResult('');
              }}
              className="theme-card rounded-lg px-4 py-3 font-semibold theme-title transition hover:brightness-95"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {ocrResult && (
        <div className="theme-card rounded-2xl border p-6 space-y-4">
          <p className="text-sm font-semibold theme-title">OCR Result</p>
          <div className="theme-card-soft max-h-[320px] overflow-y-auto rounded-lg border p-4 whitespace-pre-wrap text-sm theme-muted">
            {ocrResult}
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
