export interface PdfToolPageEntry {
  slug: string;
  id: string;
  label: string;
  description: string;
  longDescription: string;
}

export const pdfToolPages: PdfToolPageEntry[] = [
  { slug: 'organize-pdf', id: 'organize', label: 'Organize PDF', description: 'Reorder and structure PDF pages online.', longDescription: 'Organize page order and flow for polished documents.' },
  { slug: 'merge-pdf', id: 'merge', label: 'Merge PDF', description: 'Combine multiple PDFs into one.', longDescription: 'Merge files in order and export a single document.' },
  { slug: 'split-pdf', id: 'split', label: 'Split PDF', description: 'Split by page range and export.', longDescription: 'Create smaller PDFs from larger source files.' },
  { slug: 'remove-pdf-pages', id: 'remove-pages', label: 'Remove Pages', description: 'Delete unwanted pages from PDF.', longDescription: 'Remove selected pages and keep the rest.' },
  { slug: 'extract-pdf-pages', id: 'extract-pages', label: 'Extract Pages', description: 'Extract specific pages into a PDF.', longDescription: 'Pick exact pages and export them as a new file.' },
  { slug: 'scan-to-pdf', id: 'scan-to-pdf', label: 'Scan to PDF', description: 'Convert scans/images into PDF.', longDescription: 'Build PDF files from scanned pages and images.' },
  { slug: 'optimize-pdf', id: 'optimize', label: 'Optimize PDF', description: 'Optimize files for sharing and speed.', longDescription: 'Tune PDFs for better performance and delivery.' },
  { slug: 'compress-pdf', id: 'compress', label: 'Compress PDF', description: 'Reduce PDF file size online.', longDescription: 'Compress documents using browser-side processing.' },
  { slug: 'repair-pdf', id: 'repair', label: 'Repair PDF', description: 'Repair damaged PDF files.', longDescription: 'Attempt PDF recovery and output a readable file.' },
  { slug: 'ocr-pdf', id: 'ocr', label: 'OCR PDF', description: 'Make scanned PDFs searchable.', longDescription: 'Run OCR to extract selectable text from scans.' },
  { slug: 'convert-to-pdf', id: 'convert-to-pdf', label: 'Convert to PDF', description: 'Convert various formats to PDF.', longDescription: 'Create PDFs from source document formats.' },
  { slug: 'jpg-to-pdf', id: 'jpg-to-pdf', label: 'JPG to PDF', description: 'Convert JPG images into PDF.', longDescription: 'Combine one or more JPG files into a PDF.' },
  { slug: 'word-to-pdf', id: 'word-to-pdf', label: 'WORD to PDF', description: 'Convert Word content to PDF.', longDescription: 'Generate PDF documents from Word-style inputs.' },
  { slug: 'powerpoint-to-pdf', id: 'powerpoint-to-pdf', label: 'POWERPOINT to PDF', description: 'Convert presentations to PDF.', longDescription: 'Export slide content into PDF format.' },
  { slug: 'excel-to-pdf', id: 'excel-to-pdf', label: 'EXCEL to PDF', description: 'Convert spreadsheets to PDF.', longDescription: 'Create PDFs from sheet-style data and layouts.' },
  { slug: 'html-to-pdf', id: 'html-to-pdf', label: 'HTML to PDF', description: 'Convert HTML into PDF output.', longDescription: 'Generate print-friendly PDF from HTML content.' },
  { slug: 'convert-from-pdf', id: 'convert-from-pdf', label: 'Convert from PDF', description: 'Convert PDF into other formats.', longDescription: 'Transform PDF files into editable/export formats.' },
  { slug: 'pdf-to-jpg', id: 'pdf-to-jpg', label: 'PDF to JPG', description: 'Convert PDF pages to JPG.', longDescription: 'Export each page as an image file.' },
  { slug: 'pdf-to-word', id: 'pdf-to-word', label: 'PDF to WORD', description: 'Convert PDF to editable Word.', longDescription: 'Extract text and generate Word-readable output.' },
  { slug: 'pdf-to-powerpoint', id: 'pdf-to-powerpoint', label: 'PDF to POWERPOINT', description: 'Convert PDF to slide format.', longDescription: 'Turn PDF content into presentation-style output.' },
  { slug: 'pdf-to-excel', id: 'pdf-to-excel', label: 'PDF to EXCEL', description: 'Convert PDF tables to Excel.', longDescription: 'Extract table-like PDF data for spreadsheets.' },
  { slug: 'pdf-to-pdfa', id: 'pdf-to-pdfa', label: 'PDF to PDF/A', description: 'Convert PDF into archival PDF/A.', longDescription: 'Prepare files for long-term archival compatibility.' },
  { slug: 'edit-pdf', id: 'edit', label: 'Edit PDF', description: 'Edit content on PDF with live preview.', longDescription: 'Place text visually and export edited PDF output.' },
  { slug: 'rotate-pdf', id: 'rotate', label: 'Rotate PDF', description: 'Rotate selected pages.', longDescription: 'Adjust page orientation for scans and exports.' },
  { slug: 'add-page-numbers', id: 'add-page-numbers', label: 'Add Page Numbers', description: 'Insert page numbers in PDF.', longDescription: 'Apply consistent page numbering across documents.' },
  { slug: 'add-watermark', id: 'watermark', label: 'Add Watermark', description: 'Apply text watermark to pages.', longDescription: 'Overlay watermark text for branding or draft marking.' },
  { slug: 'crop-pdf', id: 'crop-pdf', label: 'Crop PDF', description: 'Crop margins and page area.', longDescription: 'Trim page boundaries for cleaner document framing.' },
];

export function getPdfToolPageBySlug(slug: string): PdfToolPageEntry | undefined {
  return pdfToolPages.find((tool) => tool.slug === slug);
}
