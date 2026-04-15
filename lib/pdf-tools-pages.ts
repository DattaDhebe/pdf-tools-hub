export interface PdfToolPageEntry {
  slug: string;
  id: 'compress' | 'merge' | 'split' | 'rotate' | 'remove-pages';
  label: string;
  description: string;
  longDescription: string;
}

export const pdfToolPages: PdfToolPageEntry[] = [
  {
    slug: 'compress-pdf',
    id: 'compress',
    label: 'PDF Compressor',
    description: 'Compress PDF files online to reduce size while maintaining quality. Fast, free, and 100% client-side processing.',
    longDescription:
      'Easily compress PDF files online with three preset compression levels. Choose between Low, Medium, or High compression to find the perfect balance between file size and quality. All processing happens directly in your browser with no file uploads required.',
  },
  {
    slug: 'merge-pdf',
    id: 'merge',
    label: 'PDF Merger',
    description: 'Merge multiple PDF files into one. Reorder pages, combine documents, and create single PDFs online effortlessly.',
    longDescription:
      'Combine multiple PDF files into a single document with easy drag-and-drop reordering. Select your PDFs, arrange them in the desired order, and merge them instantly. Perfect for combining invoices, contracts, or any PDF documents.',
  },
  {
    slug: 'split-pdf',
    id: 'split',
    label: 'PDF Splitter',
    description: 'Extract specific pages from PDF files. Split PDFs by page range or extract individual pages online.',
    longDescription:
      'Easily extract specific pages from your PDF files. Define a page range or list individual pages you want to extract and create a new PDF with just those pages. Perfect for removing unwanted pages or isolating specific content.',
  },
  {
    slug: 'rotate-pdf',
    id: 'rotate',
    label: 'PDF Rotator',
    description: 'Rotate PDF pages online. Fix sideways scans, rotate selected pages, and save a corrected PDF instantly.',
    longDescription:
      'Rotate specific PDF pages by 90, 180, or 270 degrees directly in your browser. Select individual pages or ranges, correct document orientation, and download the updated PDF without any uploads.',
  },
  {
    slug: 'remove-pdf-pages',
    id: 'remove-pages',
    label: 'PDF Page Remover',
    description: 'Remove unwanted pages from a PDF online. Delete single pages or ranges and download a cleaned PDF instantly.',
    longDescription:
      'Delete specific pages from your PDF with simple page-range controls. Remove cover pages, blank pages, or unnecessary sections directly in your browser and save the updated PDF privately.',
  },
];

export function getPdfToolPageBySlug(slug: string): PdfToolPageEntry | undefined {
  return pdfToolPages.find((tool) => tool.slug === slug);
}
