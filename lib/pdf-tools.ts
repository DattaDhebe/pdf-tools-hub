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
  { id: 'scan-to-pdf', label: 'Scan to PDF', description: 'Convert scans/images to PDF.', longDescription: 'Create PDFs from scanned pages and image sources.', status: 'soon' },
  { id: 'optimize', label: 'Optimize PDF', description: 'Optimize PDF for web or sharing.', longDescription: 'Adjust and optimize document internals for better delivery.', status: 'soon' },
  { id: 'compress', label: 'Compress PDF', description: 'Reduce file size while keeping quality.', longDescription: 'Compress PDF files using browser-side workflows and presets.', status: 'ready' },
  { id: 'repair', label: 'Repair PDF', description: 'Attempt recovery for problematic PDFs.', longDescription: 'Repair and recover readable content from broken PDF files.', status: 'soon' },
  { id: 'ocr', label: 'OCR PDF', description: 'Make scanned PDFs searchable.', longDescription: 'Recognize text from scanned PDFs for search and copy workflows.', status: 'ready' },
  { id: 'convert-to-pdf', label: 'Convert to PDF', description: 'Convert files into PDF.', longDescription: 'Convert supported office/image formats into PDF output.', status: 'soon' },
  { id: 'jpg-to-pdf', label: 'JPG to PDF', description: 'Convert JPG images to PDF.', longDescription: 'Build PDFs from one or multiple JPG files.', status: 'ready' },
  { id: 'word-to-pdf', label: 'WORD to PDF', description: 'Convert Word docs to PDF.', longDescription: 'Transform Word-style content into fixed-layout PDF documents.', status: 'soon' },
  { id: 'powerpoint-to-pdf', label: 'POWERPOINT to PDF', description: 'Convert slides to PDF.', longDescription: 'Export presentation-style files into PDF format.', status: 'soon' },
  { id: 'excel-to-pdf', label: 'EXCEL to PDF', description: 'Convert spreadsheets to PDF.', longDescription: 'Create PDF output from spreadsheet-like content.', status: 'soon' },
  { id: 'html-to-pdf', label: 'HTML to PDF', description: 'Convert HTML pages to PDF.', longDescription: 'Generate a PDF from HTML content or templates.', status: 'soon' },
  { id: 'convert-from-pdf', label: 'Convert from PDF', description: 'Convert PDFs to other formats.', longDescription: 'Transform PDF files into editable or image-based outputs.', status: 'soon' },
  { id: 'pdf-to-jpg', label: 'PDF to JPG', description: 'Convert PDF pages to JPG images.', longDescription: 'Export PDF pages as JPG files for sharing and design use.', status: 'ready' },
  { id: 'pdf-to-word', label: 'PDF to WORD', description: 'Convert PDF to editable Word.', longDescription: 'Extract and export PDF content into Word-readable documents.', status: 'ready' },
  { id: 'pdf-to-powerpoint', label: 'PDF to POWERPOINT', description: 'Convert PDF to slides.', longDescription: 'Transform PDFs into presentation-style slide output.', status: 'soon' },
  { id: 'pdf-to-excel', label: 'PDF to EXCEL', description: 'Convert PDF tables to sheets.', longDescription: 'Extract tabular data from PDFs into spreadsheet format.', status: 'soon' },
  { id: 'pdf-to-pdfa', label: 'PDF to PDF/A', description: 'Convert to archival PDF/A.', longDescription: 'Create long-term archival PDF/A compatible output.', status: 'soon' },
  { id: 'edit', label: 'Edit PDF', description: 'Live-edit text on PDF pages.', longDescription: 'Place and edit content directly with live preview before export.', status: 'ready' },
  { id: 'rotate', label: 'Rotate PDF', description: 'Rotate specific pages.', longDescription: 'Rotate single, range, or custom selected pages.', status: 'ready' },
  { id: 'add-page-numbers', label: 'Add Page Numbers', description: 'Number all pages automatically.', longDescription: 'Insert page numbers in chosen positions across the document.', status: 'ready' },
  { id: 'watermark', label: 'Add Watermark', description: 'Overlay text watermark on pages.', longDescription: 'Apply text watermarks with opacity and placement control.', status: 'ready' },
  { id: 'crop-pdf', label: 'Crop PDF', description: 'Crop page area and margins.', longDescription: 'Trim page boundaries to remove unwanted edges or whitespace.', status: 'soon' },
];

export function getPdfToolById(id: string): PdfTool | undefined {
  return pdfTools.find((tool) => tool.id === id);
}
