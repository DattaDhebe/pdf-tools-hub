'use client';

import { TextSourceConverter } from '@/components/converters/text-source-converter';
import { textToBase64 } from '@/lib/base64';

export function HtmlToBase64Converter() {
  return (
    <TextSourceConverter
      inputLabel="Paste HTML"
      inputDescription="Encode a snippet, component template, or full HTML document into Base64."
      inputPlaceholder={`<!doctype html>\n<html lang="en">\n  <body>\n    <section class="hero">Base64 Converter</section>\n  </body>\n</html>`}
      outputTitle="Base64 Output"
      outputDescription="The HTML source is encoded locally as UTF-8 and converted into a Base64 string."
      emptyState="Paste HTML and run the conversion to generate Base64 output."
      downloadName="markup"
      transform={textToBase64}
    />
  );
}
