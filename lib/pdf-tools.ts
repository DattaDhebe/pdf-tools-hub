export interface PdfTool {
  id: string;
  label: string;
  description: string;
  longDescription: string;
  status: 'ready' | 'soon';
}

export const pdfTools: PdfTool[] = [
  { id: 'organize', label: 'Organize PDF', description: 'Reorder PDF pages quickly.', longDescription: 'Rearrange page order and structure for final delivery.', status: 'ready' },
  { id: 'merge', label: 'Merge PDF', description: 'Combine multiple PDFs into one.', longDescription: 'Merge documents in sequence to create a single output file.', status: 'ready' },
  { id: 'split', label: 'Split PDF', description: 'Split documents by page ranges.', longDescription: 'Extract specific ranges into a new PDF file.', status: 'ready' },
  { id: 'remove-pages', label: 'Remove Pages', description: 'Delete unwanted pages.', longDescription: 'Remove selected pages and download a clean file.', status: 'ready' },
  { id: 'extract-pages', label: 'Extract Pages', description: 'Extract pages into a new PDF.', longDescription: 'Select exact pages and export just those pages.', status: 'ready' },
  { id: 'scan-to-pdf', label: 'Scan to PDF', description: 'Convert scanned images into a PDF.', longDescription: 'Combine JPG or PNG scan images into a clean PDF document.', status: 'ready' },
  { id: 'optimize', label: 'Optimize PDF', description: 'Optimize PDF for web or sharing.', longDescription: 'Reduce PDF size for quicker sharing with browser-side compression presets.', status: 'ready' },
  { id: 'compress', label: 'Compress PDF', description: 'Reduce file size while keeping quality.', longDescription: 'Compress PDF files using browser-side workflows and presets.', status: 'ready' },
  { id: 'repair', label: 'Repair PDF', description: 'Rebuild a clean copy of a PDF.', longDescription: 'Load and rewrite a PDF in the browser to fix minor structure issues.', status: 'ready' },
  { id: 'ocr', label: 'OCR PDF', description: 'Make scanned PDFs searchable.', longDescription: 'Recognize text from scanned PDFs for search and copy workflows.', status: 'ready' },
  { id: 'convert-to-pdf', label: 'Convert to PDF', description: 'Convert images, text, or HTML into PDF.', longDescription: 'Build PDFs from browser-friendly image, text, or HTML content.', status: 'ready' },
  { id: 'jpg-to-pdf', label: 'JPG to PDF', description: 'Convert JPG images to PDF.', longDescription: 'Build PDFs from one or multiple JPG files.', status: 'ready' },
  { id: 'word-to-pdf', label: 'WORD to PDF', description: 'Turn Word-style text into PDF.', longDescription: 'Paste document content and export a browser-generated PDF copy.', status: 'ready' },
  { id: 'powerpoint-to-pdf', label: 'POWERPOINT to PDF', description: 'Turn slide outlines into PDF.', longDescription: 'Paste slide titles and notes, then generate a presentation-style PDF.', status: 'ready' },
  { id: 'excel-to-pdf', label: 'EXCEL to PDF', description: 'Convert table data into PDF.', longDescription: 'Paste CSV or tabular data and export a clean PDF table.', status: 'ready' },
  { id: 'html-to-pdf', label: 'HTML to PDF', description: 'Convert HTML content to PDF.', longDescription: 'Turn pasted HTML text and headings into a readable PDF layout.', status: 'ready' },
  { id: 'convert-from-pdf', label: 'Convert from PDF', description: 'Export PDF content to other formats.', longDescription: 'Export PDF content into Word, text, or JPG outputs.', status: 'ready' },
  { id: 'pdf-to-jpg', label: 'PDF to JPG', description: 'Convert PDF pages to JPG images.', longDescription: 'Export PDF pages as JPG files for sharing and design use.', status: 'ready' },
  { id: 'pdf-to-word', label: 'PDF to WORD', description: 'Convert PDF to editable Word.', longDescription: 'Extract and export PDF content into Word-readable documents.', status: 'ready' },
  { id: 'pdf-to-powerpoint', label: 'PDF to POWERPOINT', description: 'Export PDF text into slides.', longDescription: 'Convert page text into a slide-ready deck file for presentation cleanup.', status: 'ready' },
  { id: 'pdf-to-excel', label: 'PDF to EXCEL', description: 'Export PDF text into sheets.', longDescription: 'Extract page text into an Excel-readable sheet export.', status: 'ready' },
  { id: 'pdf-to-pdfa', label: 'PDF to PDF/A', description: 'Create an archival-style PDF copy.', longDescription: 'Produce a cleaned archival-style PDF copy with normalized metadata.', status: 'ready' },
  { id: 'edit', label: 'Edit PDF', description: 'Live-edit text on PDF pages.', longDescription: 'Place and edit content directly with live preview before export.', status: 'ready' },
  { id: 'rotate', label: 'Rotate PDF', description: 'Rotate specific pages.', longDescription: 'Rotate single, range, or custom selected pages.', status: 'ready' },
  { id: 'add-page-numbers', label: 'Add Page Numbers', description: 'Number all pages automatically.', longDescription: 'Insert page numbers in chosen positions across the document.', status: 'ready' },
  { id: 'watermark', label: 'Add Watermark', description: 'Overlay text watermark on pages.', longDescription: 'Apply text watermarks with opacity and placement control.', status: 'ready' },
  { id: 'crop-pdf', label: 'Crop PDF', description: 'Crop page area and margins.', longDescription: 'Trim outer whitespace by applying consistent crop margins.', status: 'ready' },
];

export function getPdfToolById(id: string): PdfTool | undefined {
  return pdfTools.find((tool) => tool.id === id);
}
