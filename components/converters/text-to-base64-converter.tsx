'use client';

import { TextSourceConverter } from '@/components/converters/text-source-converter';
import { textToBase64 } from '@/lib/base64';

export function TextToBase64Converter() {
  return (
    <TextSourceConverter
      inputLabel="Type Text"
      inputDescription="Encode plain text, notes, or multi-language content into a UTF-8 safe Base64 string."
      inputPlaceholder={`Base64 Converter keeps conversion local, fast, and predictable.`}
      outputTitle="Base64 Output"
      outputDescription="The input text is converted with UTF-8 encoding before Base64 output is generated."
      emptyState="Type or paste plain text and run the conversion to generate Base64 output."
      downloadName="text"
      transform={textToBase64}
    />
  );
}
