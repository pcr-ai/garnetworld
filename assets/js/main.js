/* GarnetWorld – global JS: SEO injection, nav, reveal, cart, social */
(function () {
  // ---------- SITE CONFIG ----------
  const SITE = {
    name: "GarnetWorld",
    tagline: "Premium Beach-Sand Garnet — IRE Authorized Vendor",
    domain: "https://www.garnetworld.example",
    email: "sales@garnetworld.example",
    phone: "+91-00000-00000",
    whatsapp: "910000000000",
    address: "Chennai, Tamil Nadu, India",
    social: {
      facebook: "https://facebook.com/garnetworld",
      instagram: "https://instagram.com/garnetworld",
      linkedin: "https://linkedin.com/company/garnetworld",
      youtube: "https://youtube.com/@garnetworld",
      x: "https://x.com/garnetworld"
    },
    // Plug your real IDs here for ad / analytics tracking:
    ga4: "G-XXXXXXX",
    metaPixel: "0000000000",
    linkedInPartner: "0000000"
  };
  window.SITE = SITE;

  // ---------- AUTO SEO ----------
  function setMeta(name, content, attr = "name") {
    if (!content) return;
    let el = document.head.querySelector(`meta[${attr}="${name}"]`);
    if (!el) { el = document.createElement("meta"); el.setAttribute(attr, name); document.head.appendChild(el); }
    el.setAttribute("content", content);
  }
  function injectSEO() {
    const page = document.body.dataset;
    const title = page.title ? `${page.title} | ${SITE.name}` : `${SITE.name} – ${SITE.tagline}`;
    const desc = page.description || "Buy premium beach-sand Garnet (mesh 20/40, 30/60, 80) for waterjet cutting, sandblasting, and water filtration. IRE authorized vendor exporting worldwide.";
    const keywords = page.keywords || "garnet sand, beach sand garnet, IRE garnet, waterjet garnet, sandblasting garnet, almandine garnet, garnet abrasive, garnet exporter India";
    const url = SITE.domain + location.pathname.replace(/index\.html$/, "");
    const image = SITE.domain + "/assets/img/og-cover.svg";

    document.title = title;
    setMeta("description", desc);
    setMeta("keywords", keywords);
    setMeta("robots", "index,follow,max-image-preview:large");
    setMeta("author", SITE.name);
    setMeta("theme-color", "#460e1a");
    // Open Graph
    setMeta("og:title", title, "property");
    setMeta("og:description", desc, "property");
    setMeta("og:type", "website", "property");
    setMeta("og:url", url, "property");
    setMeta("og:image", image, "property");
    setMeta("og:site_name", SITE.name, "property");
    // Twitter
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", desc);
    setMeta("twitter:image", image);
    // Canonical
    let canon = document.head.querySelector('link[rel="canonical"]');
    if (!canon) { canon = document.createElement("link"); canon.rel = "canonical"; document.head.appendChild(canon); }
    canon.href = url;

    // JSON-LD Organization + Product (if product page)
    const ld = [{
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": SITE.name,
      "url": SITE.domain,
      "logo": SITE.domain + "/assets/img/logo.svg",
      "sameAs": Object.values(SITE.social),
      "contactPoint": [{
        "@type": "ContactPoint",
        "telephone": SITE.phone,
        "contactType": "sales",
        "areaServed": "Worldwide",
        "availableLanguage": ["English", "Hindi", "Tamil"]
      }]
    }];
    if (page.productJson) {
      try { ld.push(JSON.parse(page.productJson)); } catch (e) { }
    }
    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.text = JSON.stringify(ld);
    document.head.appendChild(s);
  }

  // ---------- NAV + FOOTER ----------
  function navHTML(active) {
    const links = [
      ["index.html", "Home"], ["products.html", "Products"], ["process.html", "IRE Process"],
      ["applications.html", "Applications"], ["index.html#reviews", "Reviews"],
      ["about.html", "About"], ["contact.html", "Quote"]
    ];
    return `
    <header class="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-black/40 border-b border-white/10">
      <div class="max-w-7xl mx-auto flex items-center justify-between px-5 py-4">
        <a href="index.html" class="flex items-center gap-2">
          <span class="w-9 h-9 rounded-full" style="background:radial-gradient(circle at 30% 30%,#ff8a96,#c8323f 60%,#561218);box-shadow:0 0 18px rgba(226,84,97,.6)"></span>
          <span class="font-display text-xl tracking-wide">Garnet<span style="color:#e25461">World</span></span>
        </a>
        <nav class="hidden md:flex items-center gap-7 text-sm">
          ${links.map(([h, t]) => `<a href="${h}" class="${active === h ? 'text-[color:var(--garnet-400)]' : 'text-white/80 hover:text-white'}">${t}</a>`).join("")}
        </nav>
        <div class="flex items-center gap-3">
          <a href="contact.html" class="btn btn-primary text-sm">Request Quote →</a>
          <button id="navToggle" class="md:hidden text-white/90" aria-label="Menu">☰</button>
        </div>
      </div>
      <div id="mobileNav" class="md:hidden hidden border-t border-white/10 bg-black/70">
        <div class="px-5 py-3 flex flex-col gap-3">
          ${links.map(([h, t]) => `<a href="${h}" class="py-1">${t}</a>`).join("")}
        </div>
      </div>
    </header>`;
  }
  function footerHTML() {
    return `
    <footer class="mt-24 border-t border-white/10 bg-black/40">
      <div class="max-w-7xl mx-auto px-5 py-14 grid md:grid-cols-4 gap-10 text-sm">
        <div>
          <div class="font-display text-2xl mb-3">Garnet<span style="color:#e25461">World</span></div>
          <p class="text-white/70">Premium beach-sand Garnet sourced & processed via IRE. Exported worldwide with verified COA per batch.</p>
          <div class="flex gap-3 mt-4">
            <a href="${SITE.social.facebook}" aria-label="Facebook" class="hover:opacity-80">📘</a>
            <a href="${SITE.social.instagram}" aria-label="Instagram" class="hover:opacity-80">📸</a>
            <a href="${SITE.social.linkedin}" aria-label="LinkedIn" class="hover:opacity-80">💼</a>
            <a href="${SITE.social.youtube}" aria-label="YouTube" class="hover:opacity-80">▶️</a>
            <a href="${SITE.social.x}" aria-label="X" class="hover:opacity-80">𝕏</a>
          </div>
        </div>
        <div>
          <div class="font-semibold mb-3 text-white">Products</div>
          <ul class="space-y-2 text-white/70">
            <li><a href="products.html#g3060">Garnet Sand Mesh 30-60</a></li>
            <li><a href="products.html#g80">Garnet Sand Mesh 80 (Waterjet)</a></li>
            <li><a href="products.html#g120">Garnet Sand Mesh 120</a></li>
          </ul>
        </div>
        <div>
          <div class="font-semibold mb-3 text-white">Company</div>
          <ul class="space-y-2 text-white/70">
            <li><a href="about.html">About IRE Partnership</a></li>
            <li><a href="process.html">Mining → Export Process</a></li>
            <li><a href="applications.html">Applications</a></li>
            <li><a href="contact.html">Contact / RFQ</a></li>
          </ul>
        </div>
        <div>
          <div class="font-semibold mb-3 text-white">Get in touch</div>
          <p class="text-white/70">${SITE.address}</p>
          <p class="text-white/70 mt-1">📧 ${SITE.email}</p>
          <p class="text-white/70">📞 ${SITE.phone}</p>
          <a href="https://wa.me/${SITE.whatsapp}" class="btn btn-ghost text-xs mt-3">WhatsApp Sales</a>
        </div>
      </div>
      <div class="border-t border-white/10 py-5 text-center text-xs text-white/50">
        © ${new Date().getFullYear()} ${SITE.name}. IRE Authorized Vendor. All rights reserved.
      </div>
    </footer>`;
  }
  function mountChrome() {
    const nav = document.getElementById("site-nav");
    const ft = document.getElementById("site-footer");
    if (nav) nav.innerHTML = navHTML(location.pathname.split("/").pop() || "index.html");
    if (ft) ft.innerHTML = footerHTML();
    const t = document.getElementById("navToggle");
    if (t) t.addEventListener("click", () => document.getElementById("mobileNav").classList.toggle("hidden"));
  }

  // ---------- REVEAL ON SCROLL ----------
  function reveal() {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => e.isIntersecting && e.target.classList.add("visible"));
    }, { threshold: .12 });
    els.forEach(el => io.observe(el));
  }

  // ---------- SIMPLE CART (localStorage) ----------
  const CART_KEY = "gw_cart";
  function getCart() { try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch { return []; } }
  function saveCart(c) { localStorage.setItem(CART_KEY, JSON.stringify(c)); updateCartBadge(); }
  function updateCartBadge() {
    const b = document.getElementById("cartCount");
    if (!b) return;
    const n = getCart().reduce((s, i) => s + i.qty, 0);
    b.textContent = n;
    b.style.display = n ? "inline-block" : "none";
  }
  window.GW = {
    addToCart(item) {
      const c = getCart();
      const ex = c.find(i => i.sku === item.sku);
      if (ex) ex.qty += item.qty || 1; else c.push({ ...item, qty: item.qty || 1 });
      saveCart(c);
      toast(`Added ${item.name} to inquiry cart`);
    },
    cart: getCart, clearCart() { saveCart([]); }
  };

  function toast(msg) {
    const t = document.createElement("div");
    t.textContent = msg;
    t.className = "fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl text-sm";
    t.style.cssText += "background:linear-gradient(135deg,#e25461,#a52230);color:#fff;box-shadow:0 12px 30px rgba(200,50,63,.4)";
    document.body.appendChild(t);
    setTimeout(() => t.style.opacity = "0", 2200);
    setTimeout(() => t.remove(), 2800);
  }

  // ---------- ANALYTICS / ADS placeholders ----------
  function loadAnalytics() {
    if (SITE.ga4 && !SITE.ga4.includes("XXX")) {
      const s = document.createElement("script");
      s.async = true; s.src = `https://www.googletagmanager.com/gtag/js?id=${SITE.ga4}`;
      document.head.appendChild(s);
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { dataLayer.push(arguments); };
      gtag("js", new Date()); gtag("config", SITE.ga4);
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    injectSEO(); mountChrome(); reveal(); updateCartBadge(); loadAnalytics();
  });
})();
