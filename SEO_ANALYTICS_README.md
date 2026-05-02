# DHEBE Studios - SEO & Analytics Configuration

## 🎯 Overview

DHEBE Studios implements comprehensive SEO and analytics strategies across all studios and pages to ensure maximum visibility and user engagement.

---

## 📊 Analytics Configuration

### Google Analytics (GA4)

**Tracking ID:** `G-D9BJ344ZDV`

**Implementation:**
```typescript
// app/layout.tsx
<Script
  src="https://www.googletagmanager.com/gtag/js?id=G-D9BJ344ZDV"
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-D9BJ344ZDV');
  `}
</Script>
```

**Metrics Tracked:**
- Page views and sessions
- User demographics and interests
- Device and browser data
- Traffic sources
- Conversion events
- Tool usage patterns

---

## 🔍 SEO Structure

### 1. Global SEO Configuration (app/layout.tsx)

**Title Template:** `%s | DHEBE Studios`
- Automatically appends studio name to each page

**Keywords (Global):**
- base64 converter
- base64 encoder
- pdf compressor
- pdf merger
- pdf splitter
- online tools
- free tools
- dhebe studios

**Meta Tags:**
- Robots: index, follow
- Referrer: origin-when-cross-origin
- Category: technology
- Creator: DHEBE
- Publisher: DHEBE Studios

### 2. OpenGraph Tags (All Pages)

**Configured for:**
- Facebook sharing
- LinkedIn sharing
- Discord embeds
- Twitter enriched cards

**Sample:**
```typescript
openGraph: {
  type: 'website',
  url: 'https://www.dhebe.com/base64-studio',
  siteName: 'DHEBE Studios',
  title: 'Base64 Studio - Free Online Encoder & Decoder',
  description: '...',
  locale: 'en_US',
}
```

### 3. Twitter Card Tags (All Pages)

**Card Type:** `summary_large_image`

**Includes:**
- Custom title
- Description
- Creator handle: `@dhebestudios`

---

## 📄 Page-Specific SEO

### Home Page (/)

**Title:** DHEBE Studios - Free Online Tools for Base64, PDF & Email
**Description:** Professional tools suite featuring Base64 Studio, PDF Studio, and Email Template Studio...

**Keywords:**
- dhebe studios
- free online tools
- base64 tools
- pdf tools
- email templates

**Structured Data:**
- WebSite (with SearchAction)
- Organization (with ContactPoint)

**Canonical:** https://www.dhebe.com

---

### Base64 Studio (/base64-studio)

**Title:** Base64 Studio - Free Online Base64 Encoder & Decoder
**Description:** Free online Base64 converter with 18+ tools...

**Keywords:**
- base64 encoder
- base64 decoder
- base64 converter
- image to base64
- base64 to image
- text to base64
- pdf to base64

**Structured Data:**
- WebSite (with SearchAction)
- SoftwareApplication (18+ features)
- FAQPage (3 common questions)
- BreadcrumbList

**Canonical:** https://www.dhebe.com/base64-studio

---

### PDF Studio (/pdf-studio)

**Title:** PDF Studio - Free Online PDF Compressor, Merger & Splitter
**Description:** Free online PDF tools for compression, merging, and page extraction...

**Keywords:**
- pdf compressor
- pdf merger
- pdf splitter
- compress pdf
- merge pdf
- split pdf
- online pdf tools
- reduce pdf size

**Structured Data:**
- WebApplication
- SoftwareApplication (3 features)
- BreadcrumbList

**Canonical:** https://www.dhebe.com/pdf-studio

---

### Email Template Studio (/email-studio)

**Title:** Email Template Studio - Coming Soon | DHEBE
**Description:** Professional email template builder with drag-and-drop editor...

**Keywords:**
- email templates
- email builder
- responsive emails
- email designer
- html email

**Structured Data:**
- WebApplication
- BreadcrumbList

**Canonical:** https://www.dhebe.com/email-studio

---

## 🏗️ Structured Data (JSON-LD)

### WebSite Schema
```json
{
  "@type": "WebSite",
  "name": "DHEBE Studios",
  "url": "https://www.dhebe.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://www.dhebe.com/?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

### SoftwareApplication Schema
```json
{
  "@type": "SoftwareApplication",
  "name": "Base64 Studio",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "featureList": ["Text to Base64", "Image to Base64", ...]
}
```

### Organization Schema
```json
{
  "@type": "Organization",
  "name": "DHEBE Studios",
  "url": "https://www.dhebe.com",
  "email": "support@dhebe.com",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer support",
    "email": "support@dhebe.com"
  }
}
```

### FAQPage Schema
```json
{
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Base64 Studio used for?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "..."
      }
    }
  ]
}
```

### BreadcrumbList Schema
```json
{
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.dhebe.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Base64 Studio",
      "item": "https://www.dhebe.com/base64-studio"
    }
  ]
}
```

---

## 🤖 robots.txt Configuration

```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /.next/

Sitemap: https://www.dhebe.com/sitemap.xml
```

---

## 📋 Sitemap Integration

**File:** `app/sitemap.ts`

**Includes:**
- / (home)
- /base64-studio
- /pdf-studio
- /email-studio
- /support
- /tools/[all-slugs]

**Priority:**
- Home: 1.0
- Studios: 0.9
- Individual tools: 0.8

**Change Frequency:** weekly

---

## 🔐 Security Headers

**Recommended additions to Next.js config:**
```javascript
// next.config.js
headers: [
  {
    source: '/:path*',
    headers: [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'X-XSS-Protection', value: '1; mode=block' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    ],
  },
]
```

---

## 📱 Mobile & Responsive Design

**Meta Tags:**
```html
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="apple-mobile-web-app-capable" content="true" />
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
<meta name="apple-mobile-web-app-title" content="DHEBE Studios" />
```

**Responsive Breakpoints:**
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

---

## 🎨 Brand Colors & Theming

**Theme Variables:**
- Orange: #ea580c (Base64 Studio)
- Purple: #a855f7 (PDF Studio)
- Cyan: #06b6d4 (Email Studio)

**Dark Mode Support:**
- Automatic via `data-theme` attribute
- localStorage persistence

---

## 📈 Performance Metrics (Core Web Vitals)

**Targets:**
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

**Optimization:**
- Static page generation
- Image optimization
- CSS minification
- JavaScript code splitting

---

## 🔗 Canonical URLs

**All pages have explicit canonical URLs:**

| Page | Canonical |
|------|-----------|
| Home | https://www.dhebe.com |
| Base64 Studio | https://www.dhebe.com/base64-studio |
| PDF Studio | https://www.dhebe.com/pdf-studio |
| Email Studio | https://www.dhebe.com/email-studio |
| Base64 Tools | https://www.dhebe.com/tools/[slug] |

---

## 📝 Meta Descriptions

**Character Limits:** 150-160 characters

**Best Practices:**
- ✅ Unique for each page
- ✅ Include primary keyword
- ✅ Include call-to-action
- ✅ Descriptive and accurate

---

## 🔍 Search Console Integration

**Setup Steps:**
1. Add property: https://www.dhebe.com
2. Verify ownership via DNS TXT record
3. Submit sitemap: https://www.dhebe.com/sitemap.xml
4. Monitor crawl errors
5. Check mobile usability

**Monitoring:**
- Impressions and clicks
- Average position
- Click-through rate (CTR)
- Core Web Vitals

---

## 🌐 International SEO (Future)

**Prepared for multilingual support:**
- hreflang tags ready
- Language-specific routes
- Translated metadata

---

## ✅ SEO Audit Checklist

- [x] Title tags (all pages)
- [x] Meta descriptions (all pages)
- [x] Keywords (all pages)
- [x] H1 tags (single per page)
- [x] Alt text (images)
- [x] OpenGraph tags
- [x] Twitter cards
- [x] Canonical URLs
- [x] Structured data (JSON-LD)
- [x] robots.txt
- [x] sitemap.xml
- [x] Mobile responsive
- [x] Fast loading (Core Web Vitals)
- [x] Google Analytics
- [x] Internal linking
- [x] Breadcrumbs

---

## 🚀 Deployment Checklist

Before deploying to production:

1. **Google Search Console**
   - [ ] Verify ownership
   - [ ] Submit sitemap
   - [ ] Check coverage

2. **Google Analytics**
   - [ ] Verify tracking code
   - [ ] Check data collection
   - [ ] Set up goals/conversions

3. **Performance**
   - [ ] Test Core Web Vitals
   - [ ] Verify images optimized
   - [ ] Check loading speed

4. **Security**
   - [ ] SSL/HTTPS enabled
   - [ ] Security headers configured
   - [ ] No mixed content

5. **Functionality**
   - [ ] All links working
   - [ ] Forms working
   - [ ] Analytics events firing

---

## 📞 Support & Resources

- **Google Search Console:** https://search.google.com/search-console
- **Google Analytics:** https://analytics.google.com
- **Lighthouse:** Chrome DevTools > Lighthouse
- **PageSpeed Insights:** https://pagespeed.web.dev

---

**Last Updated:** April 14, 2026
**Version:** 1.0.0
**Status:** ✅ Production Ready
