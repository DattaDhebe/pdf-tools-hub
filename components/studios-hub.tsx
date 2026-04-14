'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export function StudiosHub() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const storedTheme = window.localStorage.getItem('studios-theme');
    const preferredTheme =
      storedTheme === 'dark' || storedTheme === 'light' ? storedTheme : 'light';

    setTheme(preferredTheme);
    document.documentElement.dataset.theme = preferredTheme;
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem('studios-theme', nextTheme);
  };

  const studios = [
    {
      id: 'base64',
      name: 'Base64 Studio',
      description: 'Encode and decode files, text, images, PDFs, and more using Base64',
      icon: '🔤',
      href: '/base64-studio',
      color: 'from-orange-500 to-orange-600',
      features: ['Text Encoding', 'Image Conversion', 'PDF Handling', 'URL Encoding', 'Audio Files'],
      status: 'live',
    },
    {
      id: 'pdf',
      name: 'PDF Studio',
      description: 'Powerful PDF tools for compression, merging, splitting, and manipulation',
      icon: '📄',
      href: '/pdf-studio',
      color: 'from-purple-500 to-purple-600',
      features: ['Compression', 'Merging', 'Splitting', 'Page Extraction', 'Fast Processing'],
      status: 'live',
    },
    {
      id: 'email',
      name: 'Email Template Studio',
      description: 'Create and manage beautiful responsive email templates with drag-and-drop',
      icon: '✉️',
      href: '/email-studio',
      color: 'from-cyan-500 to-cyan-600',
      features: ['Drag & Drop', 'Responsive Design', 'Templates', 'Preview', 'Export'],
      status: 'coming-soon',
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 text-slate-900 transition-colors duration-200">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200/50 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                DHEBE Studios
              </h1>
              <p className="text-xs text-slate-600 mt-1">Professional Tools Suite</p>
            </div>
            <button
              onClick={toggleTheme}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              <span className="text-lg">{theme === 'dark' ? '☀️' : '🌙'}</span>
              <span className="hidden sm:inline">{theme === 'dark' ? 'Light' : 'Dark'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl sm:text-6xl font-bold tracking-tight text-slate-900 mb-4">
            All Your Tools
            <br />
            <span className="bg-gradient-to-r from-orange-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              In One Place
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
            Professional-grade utilities for encoding, PDF manipulation, and email design. 
            All tools run 100% in your browser with complete privacy.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <span className="text-lg">🔒</span>
              <span>100% Private</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-slate-300"></div>
            <div className="flex items-center gap-2">
              <span className="text-lg">⚡</span>
              <span>Lightning Fast</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-slate-300"></div>
            <div className="flex items-center gap-2">
              <span className="text-lg">∞</span>
              <span>No Limits</span>
            </div>
          </div>
        </div>

        {/* Studios Grid */}
        <div className="grid gap-6 md:grid-cols-3 mb-16">
          {studios.map((studio) => (
            <Link
              key={studio.id}
              href={studio.status === 'coming-soon' ? '#' : studio.href}
              onClick={(e) => studio.status === 'coming-soon' && e.preventDefault()}
              className={`group relative overflow-hidden rounded-2xl border border-slate-200 transition-all duration-300 ${
                studio.status === 'coming-soon'
                  ? 'cursor-not-allowed opacity-60'
                  : 'hover:border-slate-300 hover:shadow-xl hover:-translate-y-1'
              }`}
            >
              {/* Gradient Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${studio.color} opacity-0 transition-opacity duration-300 ${
                  studio.status !== 'coming-soon' ? 'group-hover:opacity-5' : ''
                }`}
              ></div>

              {/* Content */}
              <div className="relative p-8">
                {/* Status Badge */}
                <div className="mb-4 flex items-center justify-between">
                  <div className={`text-5xl`}>{studio.icon}</div>
                  {studio.status === 'coming-soon' ? (
                    <span className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800">
                      Coming Soon
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                      ✓ Live
                    </span>
                  )}
                </div>

                {/* Title & Description */}
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{studio.name}</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">{studio.description}</p>

                {/* Features */}
                <div className="mb-6 space-y-2">
                  {studio.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                      {feature}
                    </div>
                  ))}
                </div>

                {/* Button */}
                {studio.status === 'coming-soon' ? (
                  <button
                    disabled
                    className="w-full rounded-lg bg-slate-100 px-4 py-3 font-semibold text-slate-500 cursor-not-allowed"
                  >
                    Coming Soon
                  </button>
                ) : (
                  <button className={`w-full rounded-lg bg-gradient-to-r ${studio.color} px-4 py-3 font-semibold text-white transition-all duration-300 group-hover:shadow-lg`}>
                    Access Studio →
                  </button>
                )}
              </div>
            </Link>
          ))}
        </div>

        {/* Features Highlight */}
        <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-12 mb-16">
          <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">
            Why Choose DHEBE Studios?
          </h3>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="text-4xl mb-4">🔒</div>
              <h4 className="font-semibold text-slate-900 mb-2">100% Private</h4>
              <p className="text-sm text-slate-600">
                All processing happens in your browser. Your files never leave your device.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h4 className="font-semibold text-slate-900 mb-2">Lightning Fast</h4>
              <p className="text-sm text-slate-600">
                No server delays. Process files instantly on your own device.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🆓</div>
              <h4 className="font-semibold text-slate-900 mb-2">Always Free</h4>
              <p className="text-sm text-slate-600">
                No subscriptions, no ads, no limits. Use all tools completely free.
              </p>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="text-center border-t border-slate-200 pt-16">
          <p className="text-slate-600 mb-6">
            More studios coming soon! Join our community for updates.
          </p>
          <div className="flex items-center justify-center gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="rounded-lg border border-slate-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 w-full max-w-xs"
            />
            <button className="rounded-lg bg-gradient-to-r from-orange-600 to-orange-500 px-6 py-3 font-semibold text-white hover:shadow-lg transition">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
