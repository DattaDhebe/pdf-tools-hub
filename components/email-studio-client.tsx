'use client';

import { Fragment, useMemo, useState } from 'react';

type Align = 'left' | 'center';
type BlockType = 'hero' | 'text' | 'image' | 'cta' | 'divider' | 'footer';
type PreviewMode = 'desktop' | 'mobile' | 'html';

interface ThemeSettings {
  brandName: string;
  subjectLine: string;
  preheader: string;
  accentColor: string;
  backgroundColor: string;
  surfaceColor: string;
  titleColor: string;
  bodyColor: string;
}

interface EmailBlock {
  id: string;
  type: BlockType;
  eyebrow: string;
  title: string;
  body: string;
  buttonLabel: string;
  buttonUrl: string;
  imageUrl: string;
  altText: string;
  secondaryText: string;
  align: Align;
  tone: string;
}

interface PresetDefinition {
  id: string;
  title: string;
  description: string;
  theme: ThemeSettings;
  blocks: Omit<EmailBlock, 'id'>[];
}

type DragPayload =
  | { kind: 'new'; blockType: BlockType }
  | { kind: 'existing'; blockId: string };

const BLOCK_LIBRARY: Array<{ type: BlockType; label: string; description: string }> = [
  { type: 'hero', label: 'Hero Banner', description: 'Headline, body copy, and a strong CTA.' },
  { type: 'text', label: 'Content Section', description: 'Editorial, newsletter, or marketing copy.' },
  { type: 'image', label: 'Image Spotlight', description: 'Product shot, visual banner, or creative.' },
  { type: 'cta', label: 'CTA Panel', description: 'Conversion-focused section with a button.' },
  { type: 'divider', label: 'Divider', description: 'Clean spacing between email sections.' },
  { type: 'footer', label: 'Footer', description: 'Brand, support, and unsubscribe messaging.' },
];

const PRESETS: PresetDefinition[] = [
  {
    id: 'newsletter',
    title: 'Newsletter',
    description: 'Editorial layout for weekly updates and digest emails.',
    theme: {
      brandName: 'DHEBE Weekly',
      subjectLine: 'Your weekly digest is ready',
      preheader: 'A responsive newsletter template with clear sections and one focused CTA.',
      accentColor: '#0f766e',
      backgroundColor: '#ecfeff',
      surfaceColor: '#ffffff',
      titleColor: '#0f172a',
      bodyColor: '#475569',
    },
    blocks: [
      {
        type: 'hero',
        eyebrow: 'Weekly digest',
        title: 'Build a professional email newsletter in minutes',
        body: 'Share launches, stories, and product updates with a polished HTML email that looks clean on mobile and desktop.',
        buttonLabel: 'Read the issue',
        buttonUrl: 'https://dhebe.com',
        imageUrl: '',
        altText: '',
        secondaryText: '',
        align: 'left',
        tone: '#f0fdfa',
      },
      {
        type: 'text',
        eyebrow: '',
        title: 'Lead with clarity',
        body: 'The best newsletter templates make scanning easy. Keep paragraphs short, separate ideas with headings, and use one primary CTA per major section.',
        buttonLabel: '',
        buttonUrl: '',
        imageUrl: '',
        altText: '',
        secondaryText: '',
        align: 'left',
        tone: '#ffffff',
      },
      {
        type: 'cta',
        eyebrow: '',
        title: 'Guide the next click',
        body: 'Close the email with one simple action so readers know exactly what to do next.',
        buttonLabel: 'Open the campaign',
        buttonUrl: 'https://dhebe.com',
        imageUrl: '',
        altText: '',
        secondaryText: '',
        align: 'left',
        tone: '#ccfbf1',
      },
      {
        type: 'footer',
        eyebrow: '',
        title: 'DHEBE Studios',
        body: 'You are receiving this email because you subscribed to product and content updates.',
        buttonLabel: '',
        buttonUrl: '',
        imageUrl: '',
        altText: '',
        secondaryText: 'Reply for support or update your preferences at any time.',
        align: 'left',
        tone: '#ffffff',
      },
    ],
  },
  {
    id: 'welcome',
    title: 'Welcome Email',
    description: 'Onboarding layout for new leads, members, or customers.',
    theme: {
      brandName: 'DHEBE Onboarding',
      subjectLine: 'Welcome — here is how to get started',
      preheader: 'Introduce your brand, explain the next step, and reduce friction right away.',
      accentColor: '#2563eb',
      backgroundColor: '#eff6ff',
      surfaceColor: '#ffffff',
      titleColor: '#0f172a',
      bodyColor: '#475569',
    },
    blocks: [
      {
        type: 'hero',
        eyebrow: 'Welcome',
        title: 'Help new subscribers feel confident right away',
        body: 'Use a warm, professional welcome email to explain what happens next and where readers can find value quickly.',
        buttonLabel: 'Complete setup',
        buttonUrl: 'https://dhebe.com',
        imageUrl: '',
        altText: '',
        secondaryText: '',
        align: 'center',
        tone: '#dbeafe',
      },
      {
        type: 'text',
        eyebrow: '',
        title: 'Keep the first message focused',
        body: 'A welcome email performs best when it introduces the brand, sets expectations, and guides one clear first action.',
        buttonLabel: '',
        buttonUrl: '',
        imageUrl: '',
        altText: '',
        secondaryText: '',
        align: 'left',
        tone: '#ffffff',
      },
      {
        type: 'footer',
        eyebrow: '',
        title: 'DHEBE Studios',
        body: 'This message was sent to help you get more value from your account or subscription.',
        buttonLabel: '',
        buttonUrl: '',
        imageUrl: '',
        altText: '',
        secondaryText: 'Need help? Reply to this email and our team will help.',
        align: 'left',
        tone: '#ffffff',
      },
    ],
  },
  {
    id: 'promotion',
    title: 'Promotional Campaign',
    description: 'A sharper sales layout for launches, offers, and announcements.',
    theme: {
      brandName: 'DHEBE Campaigns',
      subjectLine: 'Limited-time offer inside',
      preheader: 'Create a launch or sales email with a premium visual feel and a clear CTA.',
      accentColor: '#db2777',
      backgroundColor: '#fff1f2',
      surfaceColor: '#ffffff',
      titleColor: '#0f172a',
      bodyColor: '#475569',
    },
    blocks: [
      {
        type: 'hero',
        eyebrow: 'Limited offer',
        title: 'Design a launch email that feels premium and conversion-ready',
        body: 'Use a bold headline, a focused value proposition, and one main CTA to move readers from attention to action.',
        buttonLabel: 'Claim the offer',
        buttonUrl: 'https://dhebe.com',
        imageUrl: '',
        altText: '',
        secondaryText: '',
        align: 'left',
        tone: '#ffe4e6',
      },
      {
        type: 'image',
        eyebrow: '',
        title: 'Feature your campaign visual',
        body: 'Swap in a product shot, launch creative, or event banner to support the message.',
        buttonLabel: '',
        buttonUrl: '',
        imageUrl: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&q=80',
        altText: 'Campaign visual',
        secondaryText: '',
        align: 'left',
        tone: '#ffffff',
      },
      {
        type: 'cta',
        eyebrow: '',
        title: 'Close with one strong action',
        body: 'Repeat the benefit and give high-intent readers one final place to click.',
        buttonLabel: 'Shop now',
        buttonUrl: 'https://dhebe.com',
        imageUrl: '',
        altText: '',
        secondaryText: '',
        align: 'left',
        tone: '#fce7f3',
      },
      {
        type: 'footer',
        eyebrow: '',
        title: 'DHEBE Studios',
        body: 'You are receiving promotional updates because you joined our list or engaged with our brand.',
        buttonLabel: '',
        buttonUrl: '',
        imageUrl: '',
        altText: '',
        secondaryText: 'Manage preferences or opt out of promotional messages any time.',
        align: 'left',
        tone: '#ffffff',
      },
    ],
  },
];

const INITIAL = instantiatePreset(PRESETS[0]);

export function EmailStudioClient() {
  const [theme, setTheme] = useState<ThemeSettings>(INITIAL.theme);
  const [blocks, setBlocks] = useState<EmailBlock[]>(INITIAL.blocks);
  const [activeId, setActiveId] = useState<string>(INITIAL.blocks[0]?.id ?? '');
  const [selectedPresetId, setSelectedPresetId] = useState<string>(PRESETS[0].id);
  const [previewMode, setPreviewMode] = useState<PreviewMode>('desktop');
  const [dragPayload, setDragPayload] = useState<DragPayload | null>(null);
  const [dropIndex, setDropIndex] = useState<number | null>(null);
  const [statusMessage, setStatusMessage] = useState('Drag blocks into the canvas, then export your HTML email.');

  const activeBlock = blocks.find((block) => block.id === activeId) ?? null;
  const html = useMemo(() => buildEmailHtml(theme, blocks), [theme, blocks]);

  const updateTheme = <K extends keyof ThemeSettings>(key: K, value: ThemeSettings[K]) => {
    setTheme((prev) => ({ ...prev, [key]: value }));
  };

  const updateActiveBlock = <K extends keyof EmailBlock>(key: K, value: EmailBlock[K]) => {
    if (!activeBlock) {
      return;
    }

    setBlocks((prev) =>
      prev.map((block) => (block.id === activeBlock.id ? { ...block, [key]: value } : block)),
    );
  };

  const addBlock = (type: BlockType) => {
    const nextBlock = createBlock(type);
    setBlocks((prev) => [...prev, nextBlock]);
    setActiveId(nextBlock.id);
    setStatusMessage(`${labelFor(type)} added to the email layout.`);
  };

  const removeBlock = (blockId: string) => {
    setBlocks((prev) => {
      const next = prev.filter((block) => block.id !== blockId);
      setActiveId(next[0]?.id ?? '');
      return next;
    });
    setStatusMessage('Section removed.');
  };

  const duplicateBlock = (blockId: string) => {
    setBlocks((prev) => {
      const index = prev.findIndex((block) => block.id === blockId);
      if (index < 0) {
        return prev;
      }
      const clone = { ...prev[index], id: createId(prev[index].type) };
      const next = [...prev];
      next.splice(index + 1, 0, clone);
      setActiveId(clone.id);
      return next;
    });
    setStatusMessage('Section duplicated.');
  };

  const applyPreset = (presetId: string) => {
    const preset = PRESETS.find((entry) => entry.id === presetId);
    if (!preset) {
      return;
    }
    const next = instantiatePreset(preset);
    setTheme(next.theme);
    setBlocks(next.blocks);
    setActiveId(next.blocks[0]?.id ?? '');
    setSelectedPresetId(preset.id);
    setStatusMessage(`${preset.title} preset loaded.`);
  };

  const handleDrop = (index: number) => {
    if (!dragPayload) {
      return;
    }

    setBlocks((prev) => {
      const next = [...prev];
      if (dragPayload.kind === 'new') {
        const nextBlock = createBlock(dragPayload.blockType);
        next.splice(index, 0, nextBlock);
        setActiveId(nextBlock.id);
      } else {
        const from = next.findIndex((block) => block.id === dragPayload.blockId);
        if (from < 0) {
          return prev;
        }
        const [moved] = next.splice(from, 1);
        const targetIndex = from < index ? index - 1 : index;
        next.splice(targetIndex, 0, moved);
        setActiveId(moved.id);
      }
      return next;
    });

    setDragPayload(null);
    setDropIndex(null);
    setStatusMessage('Layout order updated.');
  };

  const copyHtml = async () => {
    try {
      await navigator.clipboard.writeText(html);
      setStatusMessage('HTML copied to the clipboard.');
    } catch {
      setStatusMessage('Clipboard access is unavailable. Use the HTML preview tab instead.');
    }
  };

  const downloadHtml = () => {
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${slugify(theme.brandName || 'email-template')}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setStatusMessage('HTML template downloaded.');
  };

  return (
    <section id="email-editor" className="grid gap-6 xl:grid-cols-[20rem_minmax(0,1fr)_28rem]">
      <aside className="space-y-6 xl:sticky xl:top-24 xl:self-start">
        <div className="rounded-[2rem] border p-5 theme-panel">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-600">Email Builder</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight theme-title">
            Build responsive HTML emails with professional controls
          </h2>
          <p className="mt-3 text-sm leading-7 theme-muted">
            Configure your subject line, preheader, and brand colors once. Then drag sections into place and export clean email HTML.
          </p>

          <div className="mt-5 space-y-3">
            <TextField label="Brand Name" value={theme.brandName} onChange={(value) => updateTheme('brandName', value)} />
            <TextField label="Subject Line" value={theme.subjectLine} onChange={(value) => updateTheme('subjectLine', value)} />
            <TextAreaField label="Preheader" value={theme.preheader} rows={3} onChange={(value) => updateTheme('preheader', value)} />
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <ColorField label="Accent" value={theme.accentColor} onChange={(value) => updateTheme('accentColor', value)} />
            <ColorField label="Canvas" value={theme.backgroundColor} onChange={(value) => updateTheme('backgroundColor', value)} />
            <ColorField label="Card" value={theme.surfaceColor} onChange={(value) => updateTheme('surfaceColor', value)} />
            <ColorField label="Heading" value={theme.titleColor} onChange={(value) => updateTheme('titleColor', value)} />
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button onClick={copyHtml} className="rounded-full bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90">
              Copy HTML
            </button>
            <button onClick={downloadHtml} className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90">
              Download HTML
            </button>
          </div>
        </div>

        <div className="rounded-[2rem] border p-5 theme-panel">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] theme-muted-2">Template Presets</p>
          <h2 className="mt-2 text-lg font-semibold theme-title">Start from a professional layout</h2>
          <div className="mt-4 grid gap-3">
            {PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => applyPreset(preset.id)}
                className={`rounded-[1.35rem] border p-4 text-left transition ${
                  selectedPresetId === preset.id ? 'border-cyan-300 bg-cyan-50 shadow-sm' : 'theme-card-soft hover:border-cyan-200'
                }`}
              >
                <p className="text-sm font-semibold theme-title">{preset.title}</p>
                <p className="mt-2 text-sm leading-6 theme-muted">{preset.description}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border p-5 theme-panel">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] theme-muted-2">Drag And Drop</p>
          <h2 className="mt-2 text-lg font-semibold theme-title">Add blocks to your canvas</h2>
          <div className="mt-4 grid gap-3">
            {BLOCK_LIBRARY.map((item) => (
              <div
                key={item.type}
                draggable
                onDragStart={() => setDragPayload({ kind: 'new', blockType: item.type })}
                onDragEnd={() => {
                  setDragPayload(null);
                  setDropIndex(null);
                }}
                className="rounded-[1.35rem] border p-4 theme-card-soft transition hover:border-cyan-200"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold theme-title">{item.label}</p>
                    <p className="mt-2 text-sm leading-6 theme-muted">{item.description}</p>
                  </div>
                  <button onClick={() => addBlock(item.type)} className="rounded-full bg-cyan-50 px-3 py-1.5 text-xs font-semibold text-cyan-700 transition hover:bg-cyan-100">
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>

      <div className="rounded-[2rem] border p-5 theme-panel">
        <div className="flex flex-col gap-3 border-b border-[var(--app-card-border)] pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] theme-muted-2">Canvas</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight theme-title">Drag sections to build your email template</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700">{blocks.length} sections</span>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">Responsive preview</span>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          <DropZone active={dropIndex === 0} onDragOver={() => setDropIndex(0)} onDrop={() => handleDrop(0)} />
          {blocks.map((block, index) => (
            <Fragment key={block.id}>
              <button
                draggable
                onDragStart={() => setDragPayload({ kind: 'existing', blockId: block.id })}
                onDragEnd={() => {
                  setDragPayload(null);
                  setDropIndex(null);
                }}
                onClick={() => setActiveId(block.id)}
                className={`w-full rounded-[1.5rem] border p-5 text-left transition ${
                  activeId === block.id ? 'border-cyan-300 bg-cyan-50 shadow-sm' : 'theme-card-soft hover:border-cyan-200'
                }`}
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-600">{labelFor(block.type)}</p>
                    <p className="mt-2 text-lg font-semibold theme-title">{block.title || 'Untitled section'}</p>
                    <p className="mt-2 text-sm leading-6 theme-muted">{summaryFor(block)}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full border border-cyan-200 bg-white px-3 py-1 text-xs font-semibold text-cyan-700">Drag</span>
                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        duplicateBlock(block.id);
                      }}
                      className="rounded-full border border-[var(--app-card-border)] px-3 py-1 text-xs font-semibold theme-title transition hover:bg-cyan-50"
                    >
                      Duplicate
                    </button>
                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        removeBlock(block.id);
                      }}
                      className="rounded-full border border-rose-200 px-3 py-1 text-xs font-semibold text-rose-700 transition hover:bg-rose-50"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </button>
              <DropZone active={dropIndex === index + 1} onDragOver={() => setDropIndex(index + 1)} onDrop={() => handleDrop(index + 1)} />
            </Fragment>
          ))}
        </div>
      </div>

      <aside className="space-y-6 xl:sticky xl:top-24 xl:self-start">
        <div className="rounded-[2rem] border p-5 theme-panel">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] theme-muted-2">Section Inspector</p>
          <h2 className="mt-2 text-lg font-semibold theme-title">{activeBlock ? `Edit ${labelFor(activeBlock.type)}` : 'Select a section'}</h2>

          {!activeBlock ? (
            <p className="mt-4 text-sm leading-6 theme-muted">Choose a section in the canvas to update text, alignment, button labels, or imagery.</p>
          ) : (
            <div className="mt-4 space-y-4">
              {activeBlock.type === 'hero' ? (
                <TextField label="Eyebrow" value={activeBlock.eyebrow} onChange={(value) => updateActiveBlock('eyebrow', value)} />
              ) : null}

              {activeBlock.type !== 'divider' ? (
                <>
                  <TextField label={activeBlock.type === 'footer' ? 'Brand Name' : 'Heading'} value={activeBlock.title} onChange={(value) => updateActiveBlock('title', value)} />
                  <TextAreaField label={activeBlock.type === 'image' ? 'Caption' : 'Body Copy'} value={activeBlock.body} rows={activeBlock.type === 'footer' ? 4 : 5} onChange={(value) => updateActiveBlock('body', value)} />
                </>
              ) : null}

              {activeBlock.type === 'footer' ? (
                <TextAreaField label="Secondary Line" value={activeBlock.secondaryText} rows={3} onChange={(value) => updateActiveBlock('secondaryText', value)} />
              ) : null}

              {activeBlock.type === 'image' ? (
                <>
                  <TextField label="Image URL" value={activeBlock.imageUrl} onChange={(value) => updateActiveBlock('imageUrl', value)} />
                  <TextField label="Alt Text" value={activeBlock.altText} onChange={(value) => updateActiveBlock('altText', value)} />
                </>
              ) : null}

              {activeBlock.type === 'hero' || activeBlock.type === 'cta' ? (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <TextField label="Button Label" value={activeBlock.buttonLabel} onChange={(value) => updateActiveBlock('buttonLabel', value)} />
                    <TextField label="Button URL" value={activeBlock.buttonUrl} onChange={(value) => updateActiveBlock('buttonUrl', value)} />
                  </div>
                  <SelectField
                    label="Alignment"
                    value={activeBlock.align}
                    onChange={(value) => updateActiveBlock('align', value as Align)}
                    options={[
                      { value: 'left', label: 'Left aligned' },
                      { value: 'center', label: 'Centered' },
                    ]}
                  />
                  <ColorField label="Section Tone" value={activeBlock.tone} onChange={(value) => updateActiveBlock('tone', value)} />
                </>
              ) : null}

              {activeBlock.type === 'text' ? (
                <SelectField
                  label="Alignment"
                  value={activeBlock.align}
                  onChange={(value) => updateActiveBlock('align', value as Align)}
                  options={[
                    { value: 'left', label: 'Left aligned' },
                    { value: 'center', label: 'Centered' },
                  ]}
                />
              ) : null}

              {activeBlock.type === 'divider' ? (
                <div className="rounded-[1.35rem] border p-4 theme-card-soft">
                  <p className="text-sm leading-6 theme-muted">Divider blocks create breathing room between key email sections. Drag them where the layout needs a visual pause.</p>
                </div>
              ) : null}
            </div>
          )}
        </div>

        <div className="rounded-[2rem] border p-5 theme-panel">
          <div className="flex flex-col gap-3 border-b border-[var(--app-card-border)] pb-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] theme-muted-2">Live Preview</p>
              <h2 className="mt-2 text-lg font-semibold theme-title">Desktop, mobile, and raw HTML</h2>
            </div>
            <div className="flex gap-2">
              {(['desktop', 'mobile', 'html'] as PreviewMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setPreviewMode(mode)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] transition ${
                    previewMode === mode ? 'bg-cyan-600 text-white' : 'border border-[var(--app-card-border)] theme-title hover:bg-cyan-50'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 rounded-[1.35rem] border p-4 theme-card-soft">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-600">Inbox preview</p>
            <p className="mt-2 text-base font-semibold theme-title">{theme.subjectLine}</p>
            <p className="mt-2 text-sm leading-6 theme-muted">{theme.preheader}</p>
          </div>

          <p className="mt-4 text-sm theme-muted">{statusMessage}</p>

          <div className="mt-4 rounded-[1.5rem] border bg-white p-3">
            {previewMode === 'html' ? (
              <pre className="max-h-[32rem] overflow-auto whitespace-pre-wrap break-words text-xs leading-6 text-slate-700">{html}</pre>
            ) : (
              <div className={previewMode === 'mobile' ? 'mx-auto w-[375px] max-w-full' : 'w-full'}>
                <iframe title="Email template preview" srcDoc={html} className="h-[38rem] w-full rounded-[1rem] border bg-white" />
              </div>
            )}
          </div>
        </div>
      </aside>
    </section>
  );
}

function DropZone({ active, onDragOver, onDrop }: { active: boolean; onDragOver: () => void; onDrop: () => void }) {
  return (
    <div
      onDragOver={(event) => {
        event.preventDefault();
        onDragOver();
      }}
      onDrop={(event) => {
        event.preventDefault();
        onDrop();
      }}
      className={`rounded-full border border-dashed px-4 py-2 text-center text-xs font-semibold uppercase tracking-[0.2em] transition ${
        active ? 'border-cyan-400 bg-cyan-50 text-cyan-700' : 'border-transparent text-transparent'
      }`}
    >
      Drop section here
    </div>
  );
}

function TextField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold theme-title">{label}</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} className="theme-card w-full rounded-xl border px-3 py-2.5 text-sm theme-title" />
    </label>
  );
}

function TextAreaField({
  label,
  value,
  rows,
  onChange,
}: {
  label: string;
  value: string;
  rows: number;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold theme-title">{label}</span>
      <textarea value={value} rows={rows} onChange={(event) => onChange(event.target.value)} className="theme-card w-full rounded-xl border px-3 py-2.5 text-sm theme-title" />
    </label>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: Array<{ value: string; label: string }>;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold theme-title">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className="theme-card w-full rounded-xl border px-3 py-2.5 text-sm theme-title">
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold theme-title">{label}</span>
      <div className="theme-card flex items-center gap-3 rounded-xl border px-3 py-2.5">
        <input type="color" value={value} onChange={(event) => onChange(event.target.value)} className="h-8 w-10 rounded border-0 bg-transparent p-0" />
        <span className="text-sm font-medium theme-title">{value}</span>
      </div>
    </label>
  );
}

function instantiatePreset(preset: PresetDefinition) {
  return {
    theme: { ...preset.theme },
    blocks: preset.blocks.map((block) => ({ ...block, id: createId(block.type) })),
  };
}

function createBlock(type: BlockType): EmailBlock {
  return {
    id: createId(type),
    type,
    eyebrow: type === 'hero' ? 'New section' : '',
    title:
      type === 'footer'
        ? 'Your brand'
        : type === 'divider'
          ? 'Divider'
          : type === 'image'
            ? 'Show a visual highlight'
            : 'Add a professional section title',
    body:
      type === 'divider'
        ? ''
        : type === 'footer'
          ? 'You are receiving this email because you signed up for updates or purchased from our brand.'
          : 'Use this section to explain the value, share an update, or guide the reader toward the next step.',
    buttonLabel: type === 'hero' || type === 'cta' ? 'Take action' : '',
    buttonUrl: type === 'hero' || type === 'cta' ? 'https://dhebe.com' : '',
    imageUrl:
      type === 'image'
        ? 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80'
        : '',
    altText: type === 'image' ? 'Email campaign visual' : '',
    secondaryText: type === 'footer' ? 'Add support details, preferences, or unsubscribe instructions here.' : '',
    align: 'left',
    tone: type === 'hero' ? '#f8fafc' : type === 'cta' ? '#eff6ff' : '#ffffff',
  };
}

function createId(type: BlockType) {
  return `${type}-${Math.random().toString(36).slice(2, 8)}-${Date.now().toString(36)}`;
}

function labelFor(type: BlockType) {
  return BLOCK_LIBRARY.find((item) => item.type === type)?.label ?? 'Section';
}

function summaryFor(block: EmailBlock) {
  if (block.type === 'divider') {
    return 'Adds breathing room between major email sections.';
  }
  return block.body || 'Click to edit this section.';
}

function buildEmailHtml(theme: ThemeSettings, blocks: EmailBlock[]) {
  const content = blocks.map((block) => renderBlockHtml(block, theme)).join('');
  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(theme.subjectLine)}</title>
  <style>
    @media screen and (max-width: 620px) {
      .email-shell { width: 100% !important; border-radius: 18px !important; }
      .email-pad { padding: 24px 18px !important; }
      .mobile-full { width: 100% !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background:${theme.backgroundColor};font-family:Arial,sans-serif;color:${theme.bodyColor};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${escapeHtml(theme.preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${theme.backgroundColor};padding:28px 10px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" class="email-shell" style="width:100%;max-width:600px;background:${theme.surfaceColor};border-radius:24px;overflow:hidden;">
          <tr>
            <td style="background:${theme.accentColor};padding:26px 32px;color:#ffffff;">
              <p style="margin:0;font-size:12px;line-height:1.5;letter-spacing:0.18em;text-transform:uppercase;opacity:0.88;">${escapeHtml(theme.subjectLine)}</p>
              <p style="margin:10px 0 0 0;font-size:24px;line-height:1.3;font-weight:700;">${escapeHtml(theme.brandName)}</p>
              <p style="margin:8px 0 0 0;font-size:14px;line-height:1.7;opacity:0.92;">${escapeHtml(theme.preheader)}</p>
            </td>
          </tr>
          <tr>
            <td class="email-pad" style="padding:32px;">${content}</td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function renderBlockHtml(block: EmailBlock, theme: ThemeSettings) {
  if (block.type === 'hero') {
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 26px 0;background:${block.tone};border-radius:20px;">
      <tr><td style="padding:28px;">
        <p style="margin:0 0 12px 0;font-size:12px;line-height:1.5;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:${theme.accentColor};text-align:${block.align};">${escapeHtml(block.eyebrow)}</p>
        <h1 style="margin:0 0 14px 0;font-size:32px;line-height:1.2;font-weight:700;color:${theme.titleColor};text-align:${block.align};">${formatText(block.title)}</h1>
        <p style="margin:0 0 20px 0;font-size:16px;line-height:1.8;color:${theme.bodyColor};text-align:${block.align};">${formatText(block.body)}</p>
        ${renderButton(block.buttonLabel, block.buttonUrl, theme.accentColor, block.align)}
      </td></tr>
    </table>`;
  }

  if (block.type === 'text') {
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px 0;">
      <tr><td>
        <h2 style="margin:0 0 12px 0;font-size:24px;line-height:1.3;font-weight:700;color:${theme.titleColor};text-align:${block.align};">${formatText(block.title)}</h2>
        <p style="margin:0;font-size:16px;line-height:1.8;color:${theme.bodyColor};text-align:${block.align};">${formatText(block.body)}</p>
      </td></tr>
    </table>`;
  }

  if (block.type === 'image') {
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px 0;">
      <tr><td>
        <h2 style="margin:0 0 14px 0;font-size:24px;line-height:1.3;font-weight:700;color:${theme.titleColor};">${formatText(block.title)}</h2>
        <img src="${escapeHtml(safeUrl(block.imageUrl))}" alt="${escapeHtml(block.altText)}" class="mobile-full" style="display:block;width:100%;max-width:536px;height:auto;border:0;border-radius:18px;" />
        <p style="margin:14px 0 0 0;font-size:14px;line-height:1.7;color:${theme.bodyColor};">${formatText(block.body)}</p>
      </td></tr>
    </table>`;
  }

  if (block.type === 'cta') {
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 28px 0;background:${block.tone};border-radius:20px;">
      <tr><td style="padding:28px;">
        <h2 style="margin:0 0 12px 0;font-size:24px;line-height:1.3;font-weight:700;color:${theme.titleColor};text-align:${block.align};">${formatText(block.title)}</h2>
        <p style="margin:0 0 20px 0;font-size:16px;line-height:1.8;color:${theme.bodyColor};text-align:${block.align};">${formatText(block.body)}</p>
        ${renderButton(block.buttonLabel, block.buttonUrl, theme.accentColor, block.align)}
      </td></tr>
    </table>`;
  }

  if (block.type === 'divider') {
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px 0;"><tr><td><hr style="border:none;border-top:1px solid #e2e8f0;margin:0;" /></td></tr></table>`;
  }

  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0;">
    <tr><td style="padding-top:12px;">
      <p style="margin:0 0 10px 0;font-size:14px;line-height:1.7;font-weight:700;color:${theme.titleColor};">${escapeHtml(block.title)}</p>
      <p style="margin:0 0 8px 0;font-size:12px;line-height:1.8;color:${theme.bodyColor};">${formatText(block.body)}</p>
      <p style="margin:0;font-size:12px;line-height:1.8;color:${theme.bodyColor};">${formatText(block.secondaryText)}</p>
    </td></tr>
  </table>`;
}

function renderButton(label: string, url: string, color: string, align: Align) {
  const target = align === 'center' ? 'center' : 'left';
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="${target === 'center' ? 'margin-left:auto;margin-right:auto;' : ''}">
    <tr><td align="${target}">
      <a href="${escapeHtml(safeUrl(url))}" style="display:inline-block;background:${color};color:#ffffff;text-decoration:none;padding:14px 22px;border-radius:999px;font-size:14px;font-weight:700;line-height:1.2;">${escapeHtml(label || 'Open')}</a>
    </td></tr>
  </table>`;
}

function safeUrl(value: string) {
  const trimmed = value.trim();
  if (!trimmed) {
    return '#';
  }
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('mailto:') || trimmed.startsWith('tel:') || trimmed.startsWith('#') || trimmed.startsWith('/')) {
    return trimmed;
  }
  return `https://${trimmed.replace(/^\/+/, '')}`;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatText(value: string) {
  return escapeHtml(value).replace(/\n/g, '<br />');
}

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'email-template';
}

