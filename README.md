# GarnetWorld — Beach‑Sand Garnet Ecommerce Portal

Premium ecommerce site for selling **beach‑sand Garnet** worldwide as an **IRE (Indian Rare Earths Limited) authorized vendor**.

## ✨ What's included

- **6 polished pages** — Home, Products, IRE Process, Applications, About, Quote/Contact.
- **Fancy modern UI** — Tailwind CDN + custom Garnet/Sand theme, glass cards, animated crystals, scroll‑reveal, marquee, responsive nav.
- **Product catalog** — 4 grades (20/40, 30/60, 80 mesh waterjet, filtration). Add‑to‑RFQ cart in `localStorage`.
- **RFQ form** — Auto saves to local queue + opens prefilled `mailto:` to your sales desk (works without backend).
- **Auto SEO** — `assets/js/main.js` injects `<title>`, meta description/keywords, Open Graph, Twitter cards, canonical URL and JSON‑LD (Organization + Product ItemList) on every page from `data-*` attributes.
- **Sitemap + robots.txt + web manifest** for indexing & PWA install.
- **Social + Ads hooks** — Facebook, Instagram, LinkedIn, YouTube, X links in footer; placeholders for **GA4**, **Meta Pixel**, **LinkedIn Insight** in `main.js → SITE`.

## 📁 Structure

```
stone/
├─ index.html          # Home (hero, products, process, apps, testimonials, CTA)
├─ products.html       # Catalog with grades, specs, add‑to‑RFQ
├─ process.html        # 6‑stage IRE process timeline
├─ applications.html   # Industry use‑cases
├─ about.html          # IRE partnership story
├─ contact.html        # RFQ form
├─ sitemap.xml
├─ robots.txt
├─ manifest.webmanifest
└─ assets/
   ├─ css/styles.css
   ├─ js/main.js       # SEO + nav/footer + cart + analytics
   └─ img/             # logo + OG cover (SVG)
```

## 🚀 Run locally

Just open `index.html` in a browser, or serve it:

```powershell
# from the stone/ folder
python -m http.server 8080
# then visit http://localhost:8080
```

## 🌐 Deploy (free options)

- **Netlify** / **Vercel** — drag & drop the folder, you're live in ~30 seconds.
- **GitHub Pages** — push to a repo and enable Pages.
- **Azure Static Web Apps** — `swa deploy ./stone`.

## 🔧 Configure before going live

Edit the `SITE` block at the top of `assets/js/main.js`:

| Field | What to set |
|---|---|
| `domain` | Your real domain (e.g. `https://garnetworld.com`) |
| `email`, `phone`, `whatsapp`, `address` | Your sales contact info |
| `social.*` | Real Facebook / Instagram / LinkedIn / YouTube / X URLs |
| `ga4` | Google Analytics 4 measurement ID |
| `metaPixel` | Facebook/Meta Pixel ID |
| `linkedInPartner` | LinkedIn Insight Tag ID |

Also update `sitemap.xml` and `robots.txt` to use your real domain, and replace the SVG logo / OG cover under `assets/img/` with your branded artwork when ready.

## 📈 Auto SEO — how it works

Each page has data attributes on `<body>`:

```html
<body data-title="..." data-description="..." data-keywords="..." data-product-json='{...}'>
```

`main.js` reads these and builds:

- `<title>` and meta description / keywords
- Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`)
- Twitter Card tags
- `<link rel="canonical">`
- JSON‑LD `Organization` schema (always)
- JSON‑LD `Product`/`ItemList` schema (when `data-product-json` is present)

So any new page just needs the right `data-*` attributes — no boilerplate.

## 📣 Social media advertising — next steps

The footer already links your social profiles. To run ads:

1. **Meta (Facebook/Instagram) Ads** — paste your Pixel ID into `SITE.metaPixel`, then create a Catalog from `products.html` JSON‑LD.
2. **Google Ads / Shopping** — connect Google Merchant Center to the same product schema.
3. **LinkedIn Ads** — paste Insight Tag ID into `SITE.linkedInPartner`.
4. **WhatsApp Business API** — already wired (`https://wa.me/<number>` buttons in nav, footer, CTA, contact page).

## 🛒 Going from RFQ → real ecommerce checkout

When you're ready to take online payments, swap the RFQ submit handler in `contact.html` with a backend or use **Stripe Checkout / Razorpay** (international + India). The cart state already lives in `localStorage` under `gw_cart`.

---

© GarnetWorld — IRE Authorized Vendor.
