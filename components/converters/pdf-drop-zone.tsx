'use client';

import type { ChangeEvent, DragEvent, RefObject } from 'react';
import { useState } from 'react';

interface PdfDropZoneProps {
  inputRef: RefObject<HTMLInputElement | null>;
  onSelect: (files: FileList | File | null) => void;
  multiple?: boolean;
  accept?: string;
  title?: string;
  helperText?: string;
}

export function PdfDropZone({
  inputRef,
  onSelect,
  multiple = false,
  accept = 'application/pdf',
  title = 'Drop PDF files here',
  helperText = 'or click to browse',
}: PdfDropZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadMessage, setUploadMessage] = useState<string>('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (multiple) {
      const files = event.target.files;
      onSelect(files ?? null);
      setUploadMessage(files && files.length > 0 ? `${files.length} file(s) selected successfully.` : '');
      return;
    }

    const file = event.target.files?.[0] ?? null;
    onSelect(file);
    setUploadMessage(file ? `Upload complete: ${file.name}` : '');
  };

  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);

    if (multiple) {
      const files = event.dataTransfer.files ?? null;
      onSelect(files);
      setUploadMessage(files && files.length > 0 ? `${files.length} file(s) dropped successfully.` : '');
      return;
    }

    const file = event.dataTransfer.files?.[0] ?? null;
    onSelect(file);
    setUploadMessage(file ? `Upload complete: ${file.name}` : '');
  };

  return (
    <div className="rounded-2xl border p-6 theme-card-soft">
      <label
        className={`flex cursor-pointer items-center justify-center rounded-xl border-2 border-dashed py-12 transition ${
          isDragging
            ? 'border-cyan-500 bg-cyan-50'
            : 'border-[var(--app-card-border)] hover:brightness-95'
        }`}
        onDrop={handleDrop}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={(event) => {
          event.preventDefault();
          setIsDragging(false);
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleInputChange}
          className="hidden"
        />
        <div className="text-center">
          <p className="text-xl font-semibold theme-title">{title}</p>
          <p className="text-sm theme-muted">{helperText}</p>
        </div>
      </label>
      {uploadMessage && (
        <p className="mt-3 text-sm font-medium text-emerald-700">{uploadMessage}</p>
      )}
    </div>
  );
}
