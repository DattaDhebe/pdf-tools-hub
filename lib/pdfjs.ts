const PDFJS_WORKER_PATH = '/pdf.worker.min.mjs';

function getPdfJsWorkerSrc() {
  if (typeof window === 'undefined') {
    return PDFJS_WORKER_PATH;
  }

  return new URL(PDFJS_WORKER_PATH, window.location.origin).toString();
}

export async function getPdfJs() {
  const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');
  pdfjs.GlobalWorkerOptions.workerSrc = getPdfJsWorkerSrc();
  return pdfjs;
}
