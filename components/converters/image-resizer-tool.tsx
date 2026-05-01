'use client';

import { useRef, useState } from 'react';
import { ImageDropZone } from './image-drop-zone';

interface ResizedFile {
  original: File;
  resized: Blob | null;
  status: 'pending' | 'resizing' | 'completed' | 'error';
}

export function ImageResizerTool() {
  const [files, setFiles] = useState<ResizedFile[]>([]);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [originalDimensions, setOriginalDimensions] = useState<{ w: number; h: number } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (selectedFiles: FileList | File | null) => {
    if (!selectedFiles) return;
    
    let newFiles: File[] = [];
    if (selectedFiles instanceof FileList) {
      newFiles = Array.from(selectedFiles);
    } else {
      newFiles = [selectedFiles];
    }

    if (newFiles.length > 0) {
      const img = new Image();
      img.src = URL.createObjectURL(newFiles[0]);
      img.onload = () => {
        setOriginalDimensions({ w: img.width, h: img.height });
        setWidth(img.width);
        setHeight(img.height);
      };
    }

    const wrappedFiles: ResizedFile[] = newFiles.map(file => ({
      original: file,
      resized: null,
      status: 'pending'
    }));

    setFiles(prev => [...prev, ...wrappedFiles]);
  };

  const handleWidthChange = (val: string) => {
    const newWidth = parseInt(val) || 0;
    setWidth(newWidth);
    if (maintainAspectRatio && originalDimensions && newWidth > 0) {
      setHeight(Math.round((newWidth / originalDimensions.w) * originalDimensions.h));
    }
  };

  const handleHeightChange = (val: string) => {
    const newHeight = parseInt(val) || 0;
    setHeight(newHeight);
    if (maintainAspectRatio && originalDimensions && newHeight > 0) {
      setWidth(Math.round((newHeight / originalDimensions.h) * originalDimensions.w));
    }
  };

  const resizeImage = async (file: ResizedFile): Promise<ResizedFile> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = URL.createObjectURL(file.original);
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          resolve({ ...file, status: 'error' });
          return;
        }

        canvas.width = width || img.width;
        canvas.height = height || img.height;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve({
                ...file,
                resized: blob,
                status: 'completed'
              });
            } else {
              resolve({ ...file, status: 'error' });
            }
          },
          file.original.type,
          0.9
        );
      };

      img.onerror = () => {
        resolve({ ...file, status: 'error' });
      };
    });
  };

  const handleResize = async () => {
    setFiles(prev => prev.map(f => ({ ...f, status: 'resizing' })));
    const results = await Promise.all(files.map(f => resizeImage(f)));
    setFiles(results);
  };

  const downloadFile = (file: ResizedFile) => {
    if (!file.resized) return;
    const url = URL.createObjectURL(file.resized);
    const a = document.createElement('a');
    a.href = url;
    a.download = `resized_${file.original.name}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setFiles([]);
    setOriginalDimensions(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="space-y-8">
      {files.length === 0 ? (
        <ImageDropZone
          inputRef={inputRef}
          onSelect={handleFileSelect}
          multiple
          title="Drop images here to resize"
          helperText="Supports JPG, PNG, and WebP. Resize locally with high precision."
        />
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold theme-title">
              {files.length} {files.length === 1 ? 'Image' : 'Images'} Selected
            </h3>
            <button onClick={handleReset} className="text-sm font-medium text-rose-600 hover:text-rose-700">
              Clear all
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {files.map((file, index) => (
              <div key={`${file.original.name}-${index}`} className="flex flex-col rounded-2xl border p-4 theme-card">
                <div className="relative mb-3 aspect-video w-full overflow-hidden rounded-xl bg-slate-100">
                  <img src={URL.createObjectURL(file.original)} alt={file.original.name} className="h-full w-full object-contain" />
                  {file.status === 'resizing' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm">
                      <div className="h-6 w-6 animate-spin rounded-full border-2 border-rose-600 border-t-transparent"></div>
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1 text-center">
                  <p className="truncate text-sm font-semibold theme-title">{file.original.name}</p>
                  {file.status === 'completed' && (
                    <button onClick={() => downloadFile(file)} className="mt-3 w-full rounded-xl bg-rose-100 py-2 text-xs font-bold text-rose-700 transition hover:bg-rose-200">
                      Download Resized
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border bg-slate-50 p-6 dark:bg-slate-900/50">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <p className="font-semibold theme-title">Target Dimensions</p>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <label className="text-xs font-semibold uppercase theme-muted-2">Width (px)</label>
                    <input
                      type="number"
                      value={width}
                      onChange={(e) => handleWidthChange(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-rose-500 dark:border-slate-700 dark:bg-slate-800"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs font-semibold uppercase theme-muted-2">Height (px)</label>
                    <input
                      type="number"
                      value={height}
                      onChange={(e) => handleHeightChange(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-rose-500 dark:border-slate-700 dark:bg-slate-800"
                    />
                  </div>
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={maintainAspectRatio}
                    onChange={(e) => setMaintainAspectRatio(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-rose-600 focus:ring-rose-500"
                  />
                  <span className="text-sm theme-muted">Maintain aspect ratio</span>
                </label>
              </div>

              <div className="flex flex-col justify-end">
                <button
                  onClick={handleResize}
                  disabled={files.some(f => f.status === 'resizing') || !width || !height}
                  className="w-full rounded-2xl bg-slate-950 px-5 py-4 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50 dark:bg-rose-600 dark:hover:bg-rose-700"
                >
                  {files.some(f => f.status === 'resizing') ? 'Resizing...' : 'Apply Resizing'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
