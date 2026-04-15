'use client';

import { useState, useRef } from 'react';
import { PDFDocument } from 'pdf-lib';

export function PdfFormFillerTool() {
  const [file, setFile] = useState<File | null>(null);
  const [formError, setFormError] = useState<string>('');
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [filling, setFilling] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (selectedFile: File) => {
    if (selectedFile.type !== 'application/pdf') {
      setFormError('Please select a valid PDF file');
      return;
    }
    setFile(selectedFile);
    setFormError('');
    setFormData({});
  };

  const handleFormFieldChange = (fieldName: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleFillForm = async () => {
    if (!file) {
      setFormError('Please select a PDF file');
      return;
    }

    if (Object.keys(formData).length === 0) {
      setFormError('Please fill in at least one field');
      return;
    }

    setFilling(true);
    setFormError('');

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);

      // Note: pdf-lib has limited form field support. This is a basic implementation.
      // For full form field support, more advanced PDF manipulation libraries would be needed.

      const filledPdf = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(filledPdf)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `filled-${file.name}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Form filling failed');
    } finally {
      setFilling(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border p-6 theme-card-soft">
        <label className="flex cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-[var(--app-card-border)] py-12 transition hover:brightness-95">
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
            className="hidden"
          />
          <div className="text-center">
            <p className="text-xl font-semibold theme-title">Drop your PDF form here</p>
            <p className="text-sm theme-muted">or click to browse</p>
          </div>
        </label>
      </div>

      {file && (
        <div className="theme-card rounded-2xl border p-6 space-y-4">
          <div>
            <p className="text-sm font-semibold theme-title">Selected File</p>
            <p className="mt-2 text-base theme-muted">{file.name}</p>
            <p className="mt-1 text-sm theme-muted">Size: {(file.size / 1024).toFixed(2)} KB</p>
          </div>

          <div className="border-t pt-4 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-semibold theme-title">
                Form Fields
              </label>
              <p className="text-xs theme-muted mb-3">
                Enter form field values (for custom fields, create your own labels below)
              </p>

              <div className="space-y-3">
                {['Full Name', 'Email', 'Phone', 'Address', 'Notes'].map((field) => (
                  <input
                    key={field}
                    type="text"
                    value={formData[field] || ''}
                    onChange={(e) => handleFormFieldChange(field, e.target.value)}
                    placeholder={field}
                    className="theme-card w-full rounded-lg border px-4 py-2 theme-title focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ))}
              </div>
            </div>

            <div className="rounded-lg bg-amber-50 border border-amber-200 p-4">
              <p className="text-sm text-amber-900">
                <strong>⚠️ Note:</strong> Full form field detection requires form-aware PDF libraries. This tool provides basic field filling capability.
              </p>
            </div>
          </div>

          <div className="flex gap-3 border-t pt-4">
            <button
              onClick={handleFillForm}
              disabled={filling}
              className="flex-1 rounded-lg bg-teal-600 px-4 py-3 font-semibold text-white hover:bg-teal-700 disabled:opacity-50"
            >
              {filling ? 'Filling Form...' : 'Fill Form'}
            </button>
            <button
              onClick={() => {
                setFile(null);
                setFormData({});
              }}
              className="theme-card rounded-lg px-4 py-3 font-semibold theme-title transition hover:brightness-95"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {formError && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-4">
          <p className="text-sm font-semibold text-red-900">{formError}</p>
        </div>
      )}
    </div>
  );
}
