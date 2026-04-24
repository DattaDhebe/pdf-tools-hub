'use client';

import { useRef, useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { PdfDropZone } from '@/components/converters/pdf-drop-zone';
import { getPdfJs } from '@/lib/pdfjs';

type PdfExporterMode =
  | 'repair'
  | 'convert-from-pdf'
  | 'pdf-to-powerpoint'
  | 'pdf-to-excel'
  | 'pdf-to-pdfa';

type ConvertFromPdfOutput = 'word' | 'text' | 'jpg';

interface PdfExporterToolProps {
  mode: PdfExporterMode;
}

interface PositionedTextItem {
  text: string;
  x: number;
  y: number;
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getBaseName(name: string) {
  return name.replace(/\.[^.]+$/, '') || 'document';
}

async function extractPageTexts(file: File) {
  const { getDocument } = await getPdfJs();
  const pdf = await getDocument({ data: await file.arrayBuffer() } as never).promise;
  const pages: string[] = [];

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const textContent = await page.getTextContent();
    const items = textContent.items
      .map((item) =>
        'str' in item
          ? {
              text: item.str,
              x: item.transform[4],
              y: item.transform[5],
            }
          : null,
      )
      .filter((item): item is PositionedTextItem => item !== null && item.text.trim().length > 0);

    const grouped = new Map<number, PositionedTextItem[]>();

    for (const item of items) {
      const key = Math.round(item.y);
      const line = grouped.get(key) ?? [];
      line.push(item);
      grouped.set(key, line);
    }

    const lines = Array.from(grouped.entries())
      .sort((left, right) => right[0] - left[0])
      .map(([, lineItems]) =>
        lineItems
          .sort((left, right) => left.x - right.x)
          .map((item) => item.text.trim())
          .join(' ')
          .replace(/\s+/g, ' ')
          .trim(),
      )
      .filter(Boolean);

    pages.push(lines.join('\n'));
  }

  return pages;
}

async function exportPdfPagesToJpg(file: File) {
  const { getDocument } = await getPdfJs();
  const pdf = await getDocument({ data: await file.arrayBuffer() } as never).promise;

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const viewport = page.getViewport({ scale: 1.8 });
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) {
      throw new Error('Unable to create a rendering canvas.');
    }

    canvas.width = Math.floor(viewport.width);
    canvas.height = Math.floor(viewport.height);
    await page.render({ canvasContext: context, viewport } as never).promise;

    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(resolve, 'image/jpeg', 0.92);
    });

    if (!blob) {
      throw new Error(`Unable to export page ${pageNumber} as JPG.`);
    }

    downloadBlob(blob, `${getBaseName(file.name)}-page-${pageNumber}.jpg`);
    canvas.width = 0;
    canvas.height = 0;
  }
}

function buildWordHtml(fileName: string, pageTexts: string[]) {
  const pages = pageTexts
    .map(
      (pageText, index) =>
        `<h2>Page ${index + 1}</h2><p>${escapeHtml(pageText || '[No selectable text found on this page]')}</p>`,
    )
    .join('\n');

  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>${escapeHtml(fileName)}</title>
  <style>
    body { font-family: Calibri, Arial, sans-serif; margin: 24px; line-height: 1.5; }
    h1 { font-size: 20px; margin-bottom: 12px; }
    h2 { font-size: 15px; margin-top: 20px; margin-bottom: 8px; }
    p { margin: 0 0 12px 0; white-space: pre-wrap; }
  </style>
</head>
<body>
  <h1>Converted from PDF: ${escapeHtml(fileName)}</h1>
  ${pages}
</body>
</html>`;
}

function buildExcelHtml(pageTexts: string[]) {
  const sections = pageTexts
    .map((pageText, index) => {
      const rows = pageText
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) =>
          line
            .split(/\t| {2,}|,(?=(?:[^"]*"[^"]*")*[^"]*$)/)
            .map((cell) => `<td>${escapeHtml(cell.trim())}</td>`)
            .join(''),
        )
        .map((cells) => `<tr>${cells}</tr>`)
        .join('');

      return `
        <table border="1" cellspacing="0" cellpadding="4">
          <caption>Page ${index + 1}</caption>
          ${rows || '<tr><td>No selectable text found.</td></tr>'}
        </table>
        <br />
      `;
    })
    .join('\n');

  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    body { font-family: Calibri, Arial, sans-serif; }
    caption { text-align: left; font-weight: 700; margin: 8px 0; }
    td { min-width: 120px; }
  </style>
</head>
<body>
  ${sections}
</body>
</html>`;
}

function buildPowerPointHtml(pageTexts: string[]) {
  const slides = pageTexts
    .map(
      (pageText, index) => `
        <section class="slide">
          <h1>Slide ${index + 1}</h1>
          <pre>${escapeHtml(pageText || 'No selectable text found on this page.')}</pre>
        </section>
      `,
    )
    .join('\n');

  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    body { margin: 0; font-family: Calibri, Arial, sans-serif; background: #eef2ff; }
    .slide { width: 960px; min-height: 540px; margin: 24px auto; padding: 48px; background: #fff; box-sizing: border-box; box-shadow: 0 20px 40px rgba(15, 23, 42, 0.12); }
    h1 { margin: 0 0 20px 0; font-size: 30px; color: #1e3a8a; }
    pre { white-space: pre-wrap; font: 18px/1.6 Calibri, Arial, sans-serif; color: #1f2937; }
  </style>
</head>
<body>
  ${slides}
</body>
</html>`;
}

function getModeCopy(mode: PdfExporterMode) {
  switch (mode) {
    case 'repair':
      return {
        title: 'Repair PDF',
        helper: 'Load a PDF and rebuild a clean copy in your browser.',
        button: 'Repair PDF',
      };
    case 'convert-from-pdf':
      return {
        title: 'Convert from PDF',
        helper: 'Export into Word, JPG, or plain text.',
        button: 'Export PDF',
      };
    case 'pdf-to-powerpoint':
      return {
        title: 'PDF to POWERPOINT',
        helper: 'Export page text into a slide-ready deck file.',
        button: 'Create Slide Deck',
      };
    case 'pdf-to-excel':
      return {
        title: 'PDF to EXCEL',
        helper: 'Export extracted page text into an Excel-readable sheet file.',
        button: 'Create Excel File',
      };
    case 'pdf-to-pdfa':
      return {
        title: 'PDF to PDF/A',
        helper: 'Create an archival-style cleaned copy with normalized metadata.',
        button: 'Create Archive Copy',
      };
  }
}

export function PdfExporterTool({ mode }: PdfExporterToolProps) {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const [convertOutput, setConvertOutput] = useState<ConvertFromPdfOutput>('word');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const copy = getModeCopy(mode);

  const handleFileSelect = (selectedFile: File) => {
    if (selectedFile.type !== 'application/pdf') {
      setError('Please select a valid PDF file.');
      return;
    }

    setFile(selectedFile);
    setError('');
  };

  const handleProcess = async () => {
    if (!file) {
      return;
    }

    setProcessing(true);
    setError('');

    try {
      if (mode === 'repair' || mode === 'pdf-to-pdfa') {
        const pdfDoc = await PDFDocument.load(await file.arrayBuffer(), {
          ignoreEncryption: true,
        } as never);

        try {
          pdfDoc.getForm().flatten();
        } catch {
          // Ignore when the PDF has no forms.
        }

        pdfDoc.setProducer('DHEBE PDF Studio');
        pdfDoc.setCreator('DHEBE Studios');
        pdfDoc.setModificationDate(new Date());
        if (mode === 'pdf-to-pdfa') {
          pdfDoc.setSubject('Archival-style browser copy');
          pdfDoc.setTitle(`Archive Copy - ${file.name}`);
        }

        const bytes = new Uint8Array(await pdfDoc.save());
        downloadBlob(
          new Blob([Uint8Array.from(bytes).buffer], { type: 'application/pdf' }),
          `${mode === 'repair' ? 'repaired' : 'archived'}-${file.name}`,
        );
        return;
      }

      const pageTexts = await extractPageTexts(file);

      if (mode === 'convert-from-pdf') {
        if (convertOutput === 'jpg') {
          await exportPdfPagesToJpg(file);
          return;
        }

        if (convertOutput === 'text') {
          downloadBlob(
            new Blob([pageTexts.join('\n\n---\n\n')], { type: 'text/plain' }),
            `${getBaseName(file.name)}.txt`,
          );
          return;
        }

        const htmlDoc = buildWordHtml(file.name, pageTexts);
        downloadBlob(
          new Blob([htmlDoc], { type: 'application/msword' }),
          `${getBaseName(file.name)}.doc`,
        );
        return;
      }

      if (mode === 'pdf-to-powerpoint') {
        const htmlDeck = buildPowerPointHtml(pageTexts);
        downloadBlob(
          new Blob([htmlDeck], { type: 'application/vnd.ms-powerpoint' }),
          `${getBaseName(file.name)}-slides.ppt`,
        );
        return;
      }

      if (mode === 'pdf-to-excel') {
        const htmlSheet = buildExcelHtml(pageTexts);
        downloadBlob(
          new Blob([htmlSheet], { type: 'application/vnd.ms-excel' }),
          `${getBaseName(file.name)}.xls`,
        );
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Processing failed.');
    } finally {
      setProcessing(false);
    }
  };

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
            <p className="text-sm font-semibold theme-title">{copy.title}</p>
            <p className="mt-2 text-base theme-muted">{file.name}</p>
            <p className="mt-1 text-sm theme-muted">{copy.helper}</p>
          </div>

          {mode === 'convert-from-pdf' && (
            <div className="border-t pt-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] theme-muted-2">
                Export Format
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {(['word', 'text', 'jpg'] as const).map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setConvertOutput(option)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      convertOutput === option
                        ? 'bg-slate-950 text-white'
                        : 'theme-card border theme-title hover:brightness-95'
                    }`}
                  >
                    {option === 'word' ? 'Word (.doc)' : option === 'text' ? 'Text (.txt)' : 'JPG pages'}
                  </button>
                ))}
              </div>
            </div>
          )}

          {mode === 'pdf-to-pdfa' && (
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
              This browser workflow creates an archival-style cleaned PDF copy. It does not perform formal PDF/A validation.
            </div>
          )}

          <button
            onClick={handleProcess}
            disabled={processing}
            className="w-full rounded-lg bg-cyan-600 px-4 py-3 font-semibold text-white hover:bg-cyan-700 disabled:opacity-50"
          >
            {processing ? 'Processing...' : copy.button}
          </button>
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
