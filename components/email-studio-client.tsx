'use client';

import { useMemo, useState } from 'react';
import Script from 'next/script';

interface EmailStudioClientProps {
  structuredData: any;
}

type BlockType = 'hero' | 'text' | 'button' | 'image' | 'divider' | 'footer';

interface EmailBlock {
  id: string;
  type: BlockType;
  content: string;
}

const START_BLOCKS: EmailBlock[] = [
  { id: 'hero-1', type: 'hero', content: 'Welcome to DHEBE Studios' },
  { id: 'text-1', type: 'text', content: 'Share announcements, product launches, and updates with clear and responsive email layouts.' },
  { id: 'button-1', type: 'button', content: 'Explore Now|https://dhebe.com' },
  { id: 'divider-1', type: 'divider', content: '' },
  { id: 'footer-1', type: 'footer', content: 'You are receiving this email from DHEBE Studios.' },
];

export function EmailStudioClient({ structuredData }: EmailStudioClientProps) {
  const [brandName, setBrandName] = useState('DHEBE Studios');
  const [accentColor, setAccentColor] = useState('#0ea5e9');
  const [blocks, setBlocks] = useState<EmailBlock[]>(START_BLOCKS);
  const [activeId, setActiveId] = useState<string>(START_BLOCKS[0].id);
  const [dragId, setDragId] = useState<string | null>(null);

  const activeBlock = blocks.find((block) => block.id === activeId) ?? null;

  const html = useMemo(() => {
    const blockHtml = blocks
      .map((block) => {
        if (block.type === 'hero') {
          return `<h1 style="margin:0 0 14px 0;color:#0f172a;font-size:30px;line-height:1.2;">${block.content}</h1>`;
        }
        if (block.type === 'text') {
          return `<p style="margin:0 0 14px 0;color:#334155;font-size:16px;line-height:1.7;">${block.content}</p>`;
        }
        if (block.type === 'button') {
          const [label, url] = block.content.split('|');
          return `<a href="${url || '#'}" style="display:inline-block;margin:8px 0 14px 0;background:${accentColor};color:#ffffff;text-decoration:none;padding:12px 18px;border-radius:8px;font-weight:600;">${label || 'Open'}</a>`;
        }
        if (block.type === 'image') {
          return `<img src="${block.content}" alt="" style="width:100%;max-width:540px;height:auto;border-radius:10px;margin:4px 0 14px 0;" />`;
        }
        if (block.type === 'divider') {
          return '<hr style="border:none;border-top:1px solid #e2e8f0;margin:18px 0;" />';
        }
        return `<p style="margin:16px 0 0 0;color:#64748b;font-size:12px;line-height:1.6;">${block.content}</p>`;
      })
      .join('\n');

    return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${brandName}</title>
</head>
<body style="margin:0;padding:0;background:#f4f7fb;font-family:Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7fb;padding:24px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;">
          <tr>
            <td style="background:${accentColor};padding:24px 28px;color:#ffffff;font-size:20px;font-weight:700;">
              ${brandName}
            </td>
          </tr>
          <tr>
            <td style="padding:28px;">
              ${blockHtml}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
  }, [brandName, accentColor, blocks]);

  const setActiveContent = (value: string) => {
    setBlocks((prev) => prev.map((block) => (block.id === activeId ? { ...block, content: value } : block)));
  };

  const addBlock = (type: BlockType) => {
    const id = `${type}-${Date.now()}`;
    const defaultContent =
      type === 'hero' ? 'New heading' :
      type === 'text' ? 'New paragraph' :
      type === 'button' ? 'Click here|https://dhebe.com' :
      type === 'image' ? 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200' :
      type === 'footer' ? 'Footer note' : '';

    setBlocks((prev) => [...prev, { id, type, content: defaultContent }]);
    setActiveId(id);
  };

  const removeActive = () => {
    if (!activeBlock) return;
    setBlocks((prev) => prev.filter((block) => block.id !== activeBlock.id));
    setActiveId((prevId) => {
      const remain = blocks.filter((block) => block.id !== activeBlock.id);
      return remain.length > 0 ? remain[0].id : '';
    });
  };

  const handleDropOn = (targetId: string) => {
    if (!dragId || dragId === targetId) return;
    setBlocks((prev) => {
      const next = [...prev];
      const from = next.findIndex((b) => b.id === dragId);
      const to = next.findIndex((b) => b.id === targetId);
      if (from < 0 || to < 0) return prev;
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
    setDragId(null);
  };

  const copyHtml = async () => {
    await navigator.clipboard.writeText(html);
  };

  const downloadHtml = () => {
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'email-template.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Script
        id="email-studio-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(34,197,94,0.18),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(6,182,212,0.16),_transparent_32%),linear-gradient(180deg,_#f0fdf4_0%,_#f0fdfa_38%,_#fdf8fc_100%)] px-4 py-6 text-[var(--app-text)] transition-colors duration-200 xl:px-6">
        <section className="mx-auto grid max-w-[1550px] gap-6 xl:grid-cols-[23rem_24rem_minmax(0,1fr)]">
          <div className="rounded-[1.75rem] border p-5 theme-panel">
            <h1 className="text-2xl font-semibold theme-title">Email Template Editor</h1>
            <p className="mt-2 text-sm theme-muted">Drag blocks to reorder, then edit content and export HTML.</p>

            <div className="mt-4 space-y-3">
              <Field label="Brand Name" value={brandName} onChange={setBrandName} />
              <div>
                <label className="mb-1 block text-sm font-semibold theme-title">Accent Color</label>
                <input type="color" value={accentColor} onChange={(e) => setAccentColor(e.target.value)} className="h-10 w-full rounded border bg-transparent" />
              </div>
            </div>

            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] theme-muted-2">Add Block</p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {(['hero', 'text', 'button', 'image', 'divider', 'footer'] as BlockType[]).map((type) => (
                <button key={type} onClick={() => addBlock(type)} className="theme-card rounded-lg border px-2 py-2 text-xs font-semibold capitalize">
                  + {type}
                </button>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <button onClick={copyHtml} className="rounded-lg bg-cyan-600 px-4 py-2 text-sm font-semibold text-white">Copy HTML</button>
              <button onClick={downloadHtml} className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white">Download HTML</button>
            </div>
          </div>

          <div className="rounded-[1.75rem] border p-5 theme-panel">
            <p className="text-sm font-semibold theme-title">Blocks (Drag to reorder)</p>
            <div className="mt-3 space-y-2">
              {blocks.map((block) => (
                <button
                  key={block.id}
                  draggable
                  onDragStart={() => setDragId(block.id)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleDropOn(block.id)}
                  onClick={() => setActiveId(block.id)}
                  className={`w-full rounded-lg border px-3 py-2 text-left text-sm capitalize ${
                    activeId === block.id ? 'border-cyan-500 bg-cyan-50' : 'theme-card'
                  }`}
                >
                  {block.type}
                </button>
              ))}
            </div>

            {activeBlock && (
              <div className="mt-5 space-y-2 border-t pt-4">
                <p className="text-sm font-semibold capitalize theme-title">Edit {activeBlock.type}</p>
                <textarea
                  value={activeBlock.content}
                  onChange={(e) => setActiveContent(e.target.value)}
                  rows={5}
                  className="theme-card w-full rounded-lg border px-3 py-2 text-sm theme-title"
                  placeholder={activeBlock.type === 'button' ? 'Label|https://url' : activeBlock.type === 'image' ? 'https://image-url' : 'Content'}
                />
                <button onClick={removeActive} className="rounded-lg bg-rose-600 px-3 py-2 text-xs font-semibold text-white">
                  Remove Block
                </button>
              </div>
            )}
          </div>

          <div className="rounded-[1.75rem] border p-4 theme-panel">
            <p className="mb-3 text-sm font-semibold theme-title">Live Preview</p>
            <iframe title="Email template preview" srcDoc={html} className="h-[76vh] w-full rounded-xl border bg-white" />
          </div>
        </section>
      </main>
    </>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-semibold theme-title">{label}</label>
      <input value={value} onChange={(e) => onChange(e.target.value)} className="theme-card w-full rounded-lg border px-3 py-2 text-sm theme-title" />
    </div>
  );
}
