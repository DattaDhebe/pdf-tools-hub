export interface PdfTool {
  id: string;
  label: string;
  description: string;
  longDescription: string;
  status: 'ready' | 'soon';
}

export const pdfTools: PdfTool[] = [
  {
    id: 'compress',
    label: 'PDF Compressor',
    description: 'Reduce PDF file size while maintaining quality.',
    longDescription:
      'Compress PDF documents by removing unnecessary data, optimizing images, and reducing redundancy. Adjust compression levels to balance between file size and visual quality.',
    status: 'ready',
  },
  {
    id: 'merge',
    label: 'PDF Merger',
    description: 'Combine multiple PDF files into one document.',
    longDescription:
      'Merge multiple PDF files into a single document. Drag and drop or select files, arrange them in the desired order, and download the combined result.',
    status: 'ready',
  },
  {
    id: 'split',
    label: 'PDF Splitter',
    description: 'Extract pages and split PDF documents.',
    longDescription:
      'Split PDF files by extracting specific page ranges or individual pages into separate documents. Perfect for breaking apart large PDFs or isolating sections.',
    status: 'ready',
  },
  {
    id: 'pdf-to-word',
    label: 'PDF to Word',
    description: 'Convert PDFs into editable Word documents.',
    longDescription:
      'Turn a PDF into an editable Word document for quick text updates, copy changes, and content reuse. This is one of the most common PDF workflows across major online PDF suites.',
    status: 'soon',
  },
  {
    id: 'edit',
    label: 'Edit PDF',
    description: 'Add text, notes, shapes, and basic edits.',
    longDescription:
      'Edit PDF content with common markup and document-updating actions such as adding text, notes, shapes, or visual changes. This is one of the most requested online PDF workflows.',
    status: 'soon',
  },
  {
    id: 'sign',
    label: 'Sign PDF',
    description: 'Add your signature and complete PDF forms.',
    longDescription:
      'Sign PDF documents online, complete form fields, and prepare files for approvals or document exchange. Signing is one of the most-used PDF tasks on major web platforms.',
    status: 'soon',
  },
  {
    id: 'protect',
    label: 'Protect PDF',
    description: 'Add a password and basic document protection.',
    longDescription:
      'Protect sensitive PDFs with a password and security settings before sharing them. PDF protection is a standard online workflow for contracts, statements, and personal documents.',
    status: 'soon',
  },
  {
    id: 'rotate',
    label: 'PDF Rotator',
    description: 'Rotate selected PDF pages in seconds.',
    longDescription:
      'Rotate one page, a page range, or multiple custom page selections inside a PDF. Great for fixing scans, sideways exports, and mixed-orientation documents directly in your browser.',
    status: 'ready',
  },
  {
    id: 'organize',
    label: 'Organize PDF',
    description: 'Reorder, insert, and manage PDF pages.',
    longDescription:
      'Organize PDF pages by rearranging, inserting, or restructuring the document. Page organization shows up repeatedly as a core PDF workflow across major PDF tools.',
    status: 'soon',
  },
  {
    id: 'remove-pages',
    label: 'PDF Page Remover',
    description: 'Delete unwanted pages from a PDF.',
    longDescription:
      'Remove selected pages from a PDF without uploading your file anywhere. Keep the pages you need, delete the rest, and download a cleaned-up document instantly.',
    status: 'ready',
  },
  {
    id: 'ocr',
    label: 'OCR PDF',
    description: 'Make scanned PDFs searchable and selectable.',
    longDescription:
      'Use OCR to recognize text from scanned PDF files so the content becomes searchable, selectable, and easier to reuse. OCR consistently appears among the most-used PDF features online.',
    status: 'soon',
  },
];

export function getPdfToolById(id: string): PdfTool | undefined {
  return pdfTools.find((tool) => tool.id === id);
}
