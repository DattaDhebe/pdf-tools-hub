export const pdfTools = [
  {
    id: 'compress',
    label: 'PDF Compressor',
    description: 'Reduce PDF file size while maintaining quality.',
    longDescription:
      'Compress PDF documents by removing unnecessary data, optimizing images, and reducing redundancy. Adjust compression levels to balance between file size and visual quality.',
  },
  {
    id: 'merge',
    label: 'PDF Merger',
    description: 'Combine multiple PDF files into one document.',
    longDescription:
      'Merge multiple PDF files into a single document. Drag and drop or select files, arrange them in the desired order, and download the combined result.',
  },
  {
    id: 'split',
    label: 'PDF Splitter',
    description: 'Extract pages and split PDF documents.',
    longDescription:
      'Split PDF files by extracting specific page ranges or individual pages into separate documents. Perfect for breaking apart large PDFs or isolating sections.',
  },
  {
    id: 'rotate',
    label: 'PDF Rotator',
    description: 'Rotate selected PDF pages in seconds.',
    longDescription:
      'Rotate one page, a page range, or multiple custom page selections inside a PDF. Great for fixing scans, sideways exports, and mixed-orientation documents directly in your browser.',
  },
  {
    id: 'remove-pages',
    label: 'PDF Page Remover',
    description: 'Delete unwanted pages from a PDF.',
    longDescription:
      'Remove selected pages from a PDF without uploading your file anywhere. Keep the pages you need, delete the rest, and download a cleaned-up document instantly.',
  },
];

export interface PdfTool {
  id: string;
  label: string;
  description: string;
  longDescription: string;
}

export function getPdfToolById(id: string): PdfTool | undefined {
  return pdfTools.find((tool) => tool.id === id);
}
