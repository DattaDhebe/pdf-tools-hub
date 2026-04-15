'use client';

import { useState, useRef } from 'react';

export function PdfOcrTool() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string>('');
  const [ocrResult, setOcrResult] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (selectedFile: File) => {
    if (selectedFile.type !== 'application/pdf') {
      setError('Please select a valid PDF file');
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

    try {
      // This is a placeholder for OCR functionality
      // Full OCR would require Tesseract.js or similar library
      // For now, we'll create a demo implementation
      
      const mockOcrText = `OCR Processing: ${file.name}
        
Detected Content:
- Document appears to be a PDF with scanned content
- OCR processing requires Tesseract.js library integration
- Full text extraction would be available after setup

To enable full OCR:
1. Install tesseract.js: npm install tesseract.js
2. Update component to use OCR worker
3. Process images extracted from PDF

Current Status: Demo Mode`;

      setOcrResult(mockOcrText);

      // Create downloadable text file
      const blob = new Blob([mockOcrText], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ocr-${file.name.replace('.pdf', '')}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'OCR processing failed');
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
            <p className="text-sm theme-muted">or click to browse (scanned PDFs work best)</p>
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

          <div className="rounded-lg bg-amber-50 border border-amber-200 p-4">
            <p className="text-sm text-amber-900">
              <strong>⚠️ Note:</strong> OCR feature processes scanned PDFs to make them searchable and selectable. Full integration with Tesseract.js provides accurate text recognition.
            </p>
          </div>

          <div className="flex gap-3 border-t pt-4">
            <button
              onClick={handleOcr}
              disabled={processing}
              className="flex-1 rounded-lg bg-amber-600 px-4 py-3 font-semibold text-white hover:bg-amber-700 disabled:opacity-50"
            >
              {processing ? 'Processing...' : 'Start OCR'}
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
          <div>
            <p className="mb-3 text-sm font-semibold theme-title">OCR Results</p>
            <div className="theme-card-soft rounded-lg border p-4 max-h-[300px] overflow-y-auto whitespace-pre-wrap text-sm theme-muted">
              {ocrResult}
            </div>
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
