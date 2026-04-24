'use client';

import { useRef, useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { PdfDropZone } from '@/components/converters/pdf-drop-zone';
import { getPdfJs } from '@/lib/pdfjs';

type CompressionLevel = 'low' | 'medium' | 'high';

const compressionSettings: Record<CompressionLevel, { scale: number; quality: number }> = {
  low: { scale: 1.8, quality: 0.92 },
  medium: { scale: 1.4, quality: 0.75 },
  high: { scale: 1.1, quality: 0.55 },
};

async function canvasToJpegBytes(canvas: HTMLCanvasElement, quality: number) {
  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, 'image/jpeg', quality);
  });

  if (!blob) {
    throw new Error('Failed to convert a rendered PDF page into a JPEG.');
  }

  return new Uint8Array(await blob.arrayBuffer());
}

function getFriendlyPdfError(error: unknown) {
  if (!(error instanceof Error)) {
    return 'Compression failed.';
  }

  if (
    error.message.includes('PasswordException') ||
    error.message.toLowerCase().includes('password')
  ) {
    return 'This PDF appears to be password-protected. Please unlock it before compressing.';
  }

  if (error.message.includes('InvalidPDFException')) {
    return 'This PDF could not be read. It may be corrupted or use an unsupported format.';
  }

  return error.message;
}

export function PdfCompressorTool() {
  const [file, setFile] = useState<File | null>(null);
  const [compressing, setCompressing] = useState(false);
  const [error, setError] = useState<string>('');
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (selectedFile: File) => {
    if (selectedFile.type !== 'application/pdf') {
      setError('Please select a valid PDF file');
      return;
    }

    try {
      const sourceBytes = await selectedFile.arrayBuffer();
      const { getDocument } = await getPdfJs();
      const pdf = await getDocument({ data: sourceBytes } as never).promise;

      setFile(selectedFile);
      setOriginalSize(selectedFile.size);
      setCompressedSize(0);
      setPageCount(pdf.numPages);
      setProgress(0);
      setError('');
    } catch (err) {
      setFile(null);
      setOriginalSize(0);
      setCompressedSize(0);
      setPageCount(0);
      setProgress(0);
      setError(getFriendlyPdfError(err));
    }
  };

  const handleCompress = async (compressionLevel: CompressionLevel) => {
    if (!file) return;

    setCompressing(true);
    setError('');
    setCompressedSize(0);
    setProgress(0);

    try {
      const settings = compressionSettings[compressionLevel];
      const { getDocument } = await getPdfJs();
      const sourceBytes = await file.arrayBuffer();
      const sourcePdf = await getDocument({ data: sourceBytes } as never).promise;
      const outputPdf = await PDFDocument.create();

      for (let i = 1; i <= sourcePdf.numPages; i += 1) {
        setProgress(Math.round(((i - 1) / sourcePdf.numPages) * 100));
        const page = await sourcePdf.getPage(i);
        const viewport = page.getViewport({ scale: settings.scale });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (!context) throw new Error('Failed to initialize compression canvas');

        canvas.width = Math.floor(viewport.width);
        canvas.height = Math.floor(viewport.height);
        await page.render({ canvasContext: context, viewport } as never).promise;

        const jpegBytes = await canvasToJpegBytes(canvas, settings.quality);
        const embeddedImage = await outputPdf.embedJpg(jpegBytes);

        const outputPage = outputPdf.addPage([viewport.width, viewport.height]);
        outputPage.drawImage(embeddedImage, {
          x: 0,
          y: 0,
          width: viewport.width,
          height: viewport.height,
        });

        canvas.width = 0;
        canvas.height = 0;
      }

      const compressedPdf = await outputPdf.save();
      setCompressedSize(compressedPdf.length);
      setProgress(100);

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
      setError(getFriendlyPdfError(err));
    } finally {
      setCompressing(false);
    }
  };

  const compressionRatio = originalSize > 0 ? ((1 - compressedSize / originalSize) * 100).toFixed(1) : '0';

  return (
    <div className="space-y-6">
      <PdfDropZone
        inputRef={fileInputRef}
        onSelect={(selected) => selected instanceof File && handleFileSelect(selected)}
        title="Drop your PDF here"
      />

      {file && (
        <div className="theme-card rounded-2xl border p-6 space-y-4">
          <div>
            <p className="text-sm font-semibold theme-title">Selected File</p>
            <p className="mt-2 text-base theme-muted">{file.name}</p>
            <p className="mt-1 text-sm theme-muted">Size: {(originalSize / 1024).toFixed(2)} KB</p>
            <p className="mt-1 text-sm theme-muted">Pages: {pageCount}</p>
          </div>

          <div className="rounded-2xl border p-4 theme-card-soft">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase theme-muted">Compression status</p>
                <p className="mt-1 text-sm font-medium theme-title">
                  {compressing
                    ? `${progress}% complete`
                    : compressedSize > 0
                      ? 'Finished and downloaded'
                      : 'Ready to compress'}
                </p>
              </div>
              <p className="text-xs theme-muted">
                {compressing
                  ? `${Math.max(1, Math.ceil((progress / 100) * pageCount))}/${pageCount || 1} pages`
                  : `${pageCount} page${pageCount === 1 ? '' : 's'}`}
              </p>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-cyan-500 transition-[width] duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {compressedSize > 0 && (
            <div className="grid grid-cols-2 gap-4 border-t pt-4">
              <div>
                <p className="text-xs font-semibold uppercase theme-muted">Compressed Size</p>
                <p className="mt-2 text-lg font-semibold theme-title">{(compressedSize / 1024).toFixed(2)} KB</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase theme-muted">Reduction</p>
                <p className="mt-2 text-lg font-semibold text-green-600">{compressionRatio}%</p>
              </div>
            </div>
          )}

          <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900">
            Compression works by re-rendering pages as optimized images. This gives meaningful size reduction for large/scanned PDFs; text-heavy vector PDFs may see smaller gains.
          </div>

          <div className="flex flex-col gap-3 border-t pt-4">
            <button
              onClick={() => handleCompress('low')}
              disabled={compressing || !file}
              className="rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {compressing ? 'Compressing...' : 'Compress (Low - Better Quality)'}
            </button>
            <button
              onClick={() => handleCompress('medium')}
              disabled={compressing || !file}
              className="rounded-lg bg-orange-600 px-4 py-3 font-semibold text-white hover:bg-orange-700 disabled:opacity-50"
            >
              {compressing ? 'Compressing...' : 'Compress (Medium)'}
            </button>
            <button
              onClick={() => handleCompress('high')}
              disabled={compressing || !file}
              className="rounded-lg bg-red-600 px-4 py-3 font-semibold text-white hover:bg-red-700 disabled:opacity-50"
            >
              {compressing ? 'Compressing...' : 'Compress (High - Smaller Size)'}
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
