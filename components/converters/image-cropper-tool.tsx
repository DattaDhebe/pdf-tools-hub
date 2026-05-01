'use client';

import { useRef, useState, useEffect } from 'react';
import { ImageDropZone } from './image-drop-zone';

interface CroppedFile {
  original: File;
  cropped: Blob | null;
  status: 'pending' | 'cropping' | 'completed' | 'error';
}

export function ImageCropperTool() {
  const [files, setFiles] = useState<CroppedFile[]>([]);
  const [cropRect, setCropRect] = useState({ x: 10, y: 10, w: 80, h: 80 }); // Percentage based
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (selectedFiles: FileList | File | null) => {
    if (!selectedFiles) return;
    
    let newFiles: File[] = [];
    if (selectedFiles instanceof FileList) {
      newFiles = Array.from(selectedFiles);
    } else {
      newFiles = [selectedFiles];
    }

    const wrappedFiles: CroppedFile[] = newFiles.map(file => ({
      original: file,
      cropped: null,
      status: 'pending'
    }));

    setFiles(prev => [...prev, ...wrappedFiles]);
  };

  const handleReset = () => {
    setFiles([]);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const cropImage = async (file: CroppedFile): Promise<CroppedFile> => {
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

        const realX = (cropRect.x / 100) * img.width;
        const realY = (cropRect.y / 100) * img.height;
        const realW = (cropRect.w / 100) * img.width;
        const realH = (cropRect.h / 100) * img.height;

        canvas.width = realW;
        canvas.height = realH;
        
        ctx.drawImage(img, realX, realY, realW, realH, 0, 0, realW, realH);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve({
                ...file,
                cropped: blob,
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

  const handleCrop = async () => {
    setFiles(prev => prev.map(f => ({ ...f, status: 'cropping' })));
    const results = await Promise.all(files.map(f => cropImage(f)));
    setFiles(results);
  };

  const downloadFile = (file: CroppedFile) => {
    if (!file.cropped) return;
    const url = URL.createObjectURL(file.cropped);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cropped_${file.original.name}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {files.length === 0 ? (
        <ImageDropZone
          inputRef={inputRef}
          onSelect={handleFileSelect}
          multiple
          title="Drop images here to crop"
          helperText="Adjust the crop area and trim images locally."
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
                   {file.status === 'completed' && file.cropped ? (
                      <img src={URL.createObjectURL(file.cropped)} alt="Cropped" className="h-full w-full object-contain" />
                   ) : (
                      <div className="relative h-full w-full">
                        <img src={URL.createObjectURL(file.original)} alt="Original" className="h-full w-full object-contain opacity-50" />
                        <div 
                          className="absolute border-2 border-rose-500 bg-rose-500/20"
                          style={{
                            left: `${cropRect.x}%`,
                            top: `${cropRect.y}%`,
                            width: `${cropRect.w}%`,
                            height: `${cropRect.h}%`
                          }}
                        />
                      </div>
                   )}
                  {file.status === 'cropping' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm">
                      <div className="h-6 w-6 animate-spin rounded-full border-2 border-rose-600 border-t-transparent"></div>
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1 text-center">
                  <p className="truncate text-sm font-semibold theme-title">{file.original.name}</p>
                  {file.status === 'completed' && (
                    <button onClick={() => downloadFile(file)} className="mt-3 w-full rounded-xl bg-rose-100 py-2 text-xs font-bold text-rose-700 transition hover:bg-rose-200">
                      Download Cropped
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border bg-slate-50 p-6 dark:bg-slate-900/50">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <p className="font-semibold theme-title">Crop Settings (%)</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold theme-muted-2">X Position</label>
                    <input type="range" value={cropRect.x} onChange={(e) => setCropRect({...cropRect, x: parseInt(e.target.value)})} className="w-full accent-rose-600" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold theme-muted-2">Y Position</label>
                    <input type="range" value={cropRect.y} onChange={(e) => setCropRect({...cropRect, y: parseInt(e.target.value)})} className="w-full accent-rose-600" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold theme-muted-2">Width</label>
                    <input type="range" value={cropRect.w} onChange={(e) => setCropRect({...cropRect, w: parseInt(e.target.value)})} className="w-full accent-rose-600" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold theme-muted-2">Height</label>
                    <input type="range" value={cropRect.h} onChange={(e) => setCropRect({...cropRect, h: parseInt(e.target.value)})} className="w-full accent-rose-600" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-end">
                <button
                  onClick={handleCrop}
                  disabled={files.some(f => f.status === 'cropping')}
                  className="w-full rounded-2xl bg-slate-950 px-5 py-4 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50 dark:bg-rose-600 dark:hover:bg-rose-700"
                >
                  {files.some(f => f.status === 'cropping') ? 'Cropping...' : 'Apply Crop'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
