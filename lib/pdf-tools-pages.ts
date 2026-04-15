export interface PdfToolPageEntry {
  slug: string;
  id:
    | 'compress'
    | 'merge'
    | 'split'
    | 'pdf-to-word'
    | 'edit'
    | 'sign'
    | 'protect'
    | 'rotate'
    | 'organize'
    | 'remove-pages'
    | 'ocr'
    | 'watermark'
    | 'annotate'
    | 'form-fill';
  label: string;
  description: string;
  longDescription: string;
}

export const pdfToolPages: PdfToolPageEntry[] = [
  {
    slug: 'compress-pdf',
    id: 'compress',
    label: 'Compress PDF',
    description: 'Compress PDF files online to reduce size while maintaining quality. Fast, free, and 100% client-side.',
    longDescription:
      'Compress PDF files online with browser-based processing and simple compression presets. This workflow is one of the most common PDF tasks on major online PDF platforms.',
  },
  {
    slug: 'merge-pdf',
    id: 'merge',
    label: 'Merge PDF',
    description: 'Merge multiple PDF files into one document online with drag-and-drop ordering.',
    longDescription:
      'Combine multiple PDF files into one polished document with a drag-and-drop merge workflow. Merging is one of the most repeated features across online PDF suites.',
  },
  {
    slug: 'split-pdf',
    id: 'split',
    label: 'Split PDF',
    description: 'Split PDFs by range or extract selected pages online without uploading files.',
    longDescription:
      'Split PDFs into smaller documents or extract just the pages you need. Splitting consistently appears as a top PDF workflow because it makes large documents easier to share and reuse.',
  },
  {
    slug: 'pdf-to-word',
    id: 'pdf-to-word',
    label: 'PDF to Word',
    description: 'Convert PDF files to editable Word documents online.',
    longDescription:
      'Turn PDF files into editable Word documents for quick updates and reuse. PDF to Word shows up as one of the most common conversion tasks across Adobe Acrobat, Smallpdf, and iLovePDF.',
  },
  {
    slug: 'edit-pdf',
    id: 'edit',
    label: 'Edit PDF',
    description: 'Edit PDF files online with text, markup, and document update workflows.',
    longDescription:
      'Edit PDF content online with support for text updates, notes, shapes, or markup-style changes. PDF editing is a high-demand workflow on major online PDF platforms.',
  },
  {
    slug: 'sign-pdf',
    id: 'sign',
    label: 'Sign PDF',
    description: 'Sign PDF documents online and complete forms faster.',
    longDescription:
      'Add signatures to PDF files and complete form-ready document workflows online. Signing is a recurring top PDF task because it supports approvals, contracts, and everyday document exchange.',
  },
  {
    slug: 'protect-pdf',
    id: 'protect',
    label: 'Protect PDF',
    description: 'Protect PDF files with password-based security online.',
    longDescription:
      'Protect PDF files with password access and simple document security controls. PDF protection is a frequent online workflow for contracts, statements, and shared business files.',
  },
  {
    slug: 'rotate-pdf',
    id: 'rotate',
    label: 'Rotate PDF',
    description: 'Rotate PDF pages online to fix scans, sideways exports, and mixed orientation files.',
    longDescription:
      'Rotate PDF pages by 90, 180, or 270 degrees directly in your browser. Rotation is a common cleanup workflow for scanned PDFs and imported documents.',
  },
  {
    slug: 'organize-pdf',
    id: 'organize',
    label: 'Organize PDF',
    description: 'Organize PDF pages by reordering, inserting, and managing page structure online.',
    longDescription:
      'Organize PDF pages by rearranging and restructuring document order. Page organization appears repeatedly across leading PDF platforms because it helps users prepare polished final documents.',
  },
  {
    slug: 'remove-pdf-pages',
    id: 'remove-pages',
    label: 'Remove PDF Pages',
    description: 'Delete unwanted PDF pages online and download a cleaned-up file instantly.',
    longDescription:
      'Remove blank pages, cover pages, or unwanted sections from a PDF directly in your browser. Page deletion is a practical cleanup task that often follows scanning, merging, or splitting.',
  },
  {
    slug: 'ocr-pdf',
    id: 'ocr',
    label: 'OCR PDF',
    description: 'Make scanned PDFs searchable and selectable with OCR-style workflows.',
    longDescription:
      'Use OCR PDF workflows to make scanned documents searchable, selectable, and easier to reuse. OCR remains one of the most requested PDF capabilities for archive and scan-heavy use cases.',
  },
  {
    slug: 'watermark-pdf',
    id: 'watermark',
    label: 'Watermark PDF',
    description: 'Add text watermarks to PDF pages online for branding or marking documents.',
    longDescription:
      'Add text watermarks to PDF pages with customizable opacity and positioning. Perfect for marking documents as drafts, confidential, or branded materials before sharing.',
  },
  {
    slug: 'annotate-pdf',
    id: 'annotate',
    label: 'Annotate PDF',
    description: 'Add notes and annotations to PDF pages online.',
    longDescription:
      'Add text annotations and notes to specific pages of your PDF. Highlight important information and add comments directly to documents for better collaboration and documentation.',
  },
  {
    slug: 'fill-pdf-forms',
    id: 'form-fill',
    label: 'Fill PDF Forms',
    description: 'Auto-fill PDF forms with your personal information online.',
    longDescription:
      'Fill PDF forms with your personal information. Save time by auto-filling common fields like name, email, and address across form documents for faster submission.',
  },
  {
    slug: 'sign-pdf',
    id: 'sign',
    label: 'Sign PDF',
    description: 'Sign PDF documents online quickly.',
    longDescription:
      'Add signatures to PDF files and complete document signing workflows online. Signing supports approvals, contracts, and everyday document exchange.',
  },
  {
    slug: 'organize-pdf',
    id: 'organize',
    label: 'Organize PDF',
    description: 'Organize PDF pages by reordering and restructuring.',
    longDescription:
      'Organize PDF pages by rearranging and restructuring document order. Page organization is essential for preparing polished final documents from multiple sources.',
  },
  {
    slug: 'ocr-pdf',
    id: 'ocr',
    label: 'OCR PDF',
    description: 'Make scanned PDFs searchable and selectable with OCR.',
    longDescription:
      'Use OCR to recognize text from scanned PDF files so content becomes searchable and easier to reuse. OCR is popular for archiving and scan-heavy workflows.',
  },
];

export function getPdfToolPageBySlug(slug: string): PdfToolPageEntry | undefined {
  return pdfToolPages.find((tool) => tool.slug === slug);
}
