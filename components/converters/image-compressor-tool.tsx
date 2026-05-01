'use client';

import { useRef, useState } from 'react';
import { ImageDropZone } from './image-drop-zone';

export function ImageCompressorTool() {
  const [files, setFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (selectedFiles: FileList | File | null) => {
    if (!selectedFiles) return;
    
    if (selectedFiles instanceof FileList) {
      setFiles(Array.from(selectedFiles));
    } else {
      setFiles([selectedFiles]);
    }
  };

  const handleReset = () => {
    setFiles([]);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-8">
      {files.length === 0 ? (
        <ImageDropZone
          inputRef={inputRef}
          onSelect={handleFileSelect}
          multiple
          title="Drop images here to compress"
          helperText="Supports JPG, PNG, and WebP formats. All processing is 100% private."
        />
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold theme-title">
              {files.length} {files.length === 1 ? 'Image' : 'Images'} Selected
            </h3>
            <button
              onClick={handleReset}
              className="text-sm font-medium text-rose-600 hover:text-rose-700"
            >
              Clear all
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {files.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex flex-col rounded-2xl border p-4 theme-card"
              >
                <div className="mb-3 aspect-video w-full overflow-hidden rounded-xl bg-slate-100">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold theme-title">{file.name}</p>
                  <p className="mt-1 text-xs theme-muted">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border bg-slate-50 p-6 dark:bg-slate-900/50">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold theme-title">Compression Settings</p>
                <p className="mt-1 text-sm theme-muted">
                  Adjust quality to balance file size and visual clarity.
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium theme-title">Quality: 80%</span>
                <input
                  type="range"
                  min="1"
                  max="100"
                  defaultValue="80"
                  className="h-2 w-32 cursor-pointer appearance-none rounded-lg bg-slate-200 dark:bg-slate-700"
                />
              </div>
            </div>

            <button
              className="mt-8 inline-flex w-full items-center justify-center rounded-2xl bg-slate-950 px-5 py-4 text-sm font-semibold text-white transition hover:opacity-90 dark:bg-rose-600 dark:hover:bg-rose-700"
            >
              Compress Images
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
