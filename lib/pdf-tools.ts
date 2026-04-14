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
