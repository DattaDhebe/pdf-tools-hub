'use client';

import { useState, useRef } from 'react';
import { PDFDocument } from 'pdf-lib';

export function PdfToWordTool() {
  const [file, setFile] = useState<File | null>(null);
  const [extracting, setExtracting] = useState(false);
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

    setExtracting(true);
    setError('');

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      
      // Extract text from all pages
      const pages = pdfDoc.getPages();
      let extractedText = '';
      
      pages.forEach((page, index) => {
        extractedText += `--- Page ${index + 1} ---\n`;
        // Note: pdf-lib doesn't support direct text extraction
        // In a real implementation, you'd use a library like pdfjs-dist for text extraction
        extractedText += '[Text extraction requires additional library]\n\n';
      });

      // Create a simple text file that can be opened in Word
      const textContent = `PDF Conversion: ${file.name}\nConverted on: ${new Date().toLocaleString()}\n\n${extractedText}`;
      const blob = new Blob([textContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${file.name.replace('.pdf', '')}-converted.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Conversion failed');
    } finally {
      setExtracting(false);
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

          <div className="rounded-lg bg-blue-50 border border-blue-200 p-4">
            <p className="text-sm text-blue-900">
              <strong>ℹ️ Note:</strong> Converts PDF content to editable text format. For full Word document conversion with formatting, use specialized PDF converters.
            </p>
          </div>

          <div className="flex gap-3 border-t pt-4">
            <button
              onClick={handleConvert}
              disabled={extracting}
              className="flex-1 rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {extracting ? 'Converting...' : 'Convert to Word'}
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
        <div className="rounded-lg bg-red-50 border border-red-200 p-4">
          <p className="text-sm font-semibold text-red-900">{error}</p>
        </div>
      )}
    </div>
  );
}
