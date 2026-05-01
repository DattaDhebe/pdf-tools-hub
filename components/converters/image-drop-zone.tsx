'use client';

import type { ChangeEvent, DragEvent, RefObject } from 'react';
import { useState } from 'react';

interface ImageDropZoneProps {
  inputRef: RefObject<HTMLInputElement | null>;
  onSelect: (files: FileList | File | null) => void;
  multiple?: boolean;
  accept?: string;
  title?: string;
  helperText?: string;
}

export function ImageDropZone({
  inputRef,
  onSelect,
  multiple = false,
  accept = 'image/jpeg,image/png,image/webp',
  title = 'Drop images here',
  helperText = 'or click to browse from your device',
}: ImageDropZoneProps) {
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
            ? 'border-rose-500 bg-rose-50'
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
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-100 text-rose-600">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              className="h-8 w-8"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16V7m0 0-3 3m3-3 3 3M5 17.5A3.5 3.5 0 0 1 8.5 14H9a4 4 0 0 1 7.74-1.2A3.5 3.5 0 1 1 18.5 20H8.5A3.5 3.5 0 0 1 5 16.5v1Z"
              />
            </svg>
          </div>
          <p className="text-xl font-semibold theme-title">{title}</p>
          <p className="mt-2 text-sm theme-muted">{helperText}</p>
        </div>
      </label>
      {uploadMessage && (
        <p className="mt-3 text-sm font-medium text-emerald-600 dark:text-emerald-400">{uploadMessage}</p>
      )}
    </div>
  );
}
