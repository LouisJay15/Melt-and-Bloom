// Shared store + tweak system + design tokens. Exposes window.useMB, window.MBProvider, window.MBTheme.
const { createContext, useContext, useState, useEffect, useMemo, useCallback, useRef } = React;

const MBCtx = createContext(null);

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "typePair": "editorial",
  "heroLayout": "cinematic",
  "cardStyle": "circular",
  "density": "breathable",
  "motion": "subtle",
  "tone": "poetic"
}/*EDITMODE-END*/;

// type pairings — declare loudly
const TYPE_PAIRS = {
  editorial: { display: "'Libre Caslon Text', 'Cormorant Garamond', serif", body: "'Hanken Grotesk', system-ui, sans-serif", label: "'Hanken Grotesk', system-ui, sans-serif", weightBody: 400, weightDisplay: 400, displayItalic: 'italic', kerning: '-0.01em' },
  soft: { display: "'Cormorant Garamond', 'Libre Caslon Text', serif", body: "'Manrope', system-ui, sans-serif", label: "'Manrope', system-ui, sans-serif", weightBody: 400, weightDisplay: 500, displayItalic: 'italic', kerning: '-0.015em' },
  crisp: { display: "'Playfair Display', serif", body: "'Outfit', system-ui, sans-serif", label: "'Outfit', system-ui, sans-serif", weightBody: 400, weightDisplay: 500, displayItalic: 'italic', kerning: '-0.02em' },
};

const DENSITY = {
  cozy:        { section: 64,  block: 32, gap: 16, padX: 28 },
  breathable:  { section: 96,  block: 48, gap: 24, padX: 40 },
  spacious:    { section: 128, block: 64, gap: 32, padX: 56 },
};

const MOTION = {
  off:        { dur: 0,   ease: 'linear',                    hover: 1.0  },
  subtle:     { dur: 350, ease: 'cubic-bezier(.2,.7,.2,1)',  hover: 1.02 },
  expressive: { dur: 600, ease: 'cubic-bezier(.16,1,.3,1)',  hover: 1.05 },
};

const COLORS = {
  navy: '#0f1c37',
  navyDeep: '#091022',
  slate: '#2b4162',
  slateDim: '#3a4664',
  sand: '#e2d2c0',       // accent section bg — sits a touch deeper than paper
  sandDeep: '#d8c8b7',   // image placeholder / hover
  paper: '#ede0d4',      // primary body bg — matches the brand warm-sand & logo backdrop
  ink: '#1a1c1c',
  inkDim: '#6b6760',
  line: '#c8baa7',
  ember: 'oklch(0.72 0.08 60)',
  emberDeep: 'oklch(0.55 0.10 50)',
};

function MBProvider({ children }) {
  // single shared store across both viewports
  const [tweaks, setTweaksState] = useState(TWEAK_DEFAULTS);
  const [route, setRoute] = useState({ name: 'home', params: {} });
  const [cart, setCart] = useState([]); // { id, qty }
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const setTweak = useCallback((kOrObj, v) => {
    setTweaksState((prev) => {
      const edits = typeof kOrObj === 'object' ? kOrObj : { [kOrObj]: v };
      const next = { ...prev, ...edits };
      try { window.parent?.postMessage({ type: '__edit_mode_set_keys', edits }, '*'); } catch (e) {}
      return next;
    });
  }, []);

  const go = useCallback((name, params = {}) => {
    setRoute({ name, params });
    // scroll both scrollers to top
    setTimeout(() => {
      document.querySelectorAll('[data-mb-scroll]').forEach((el) => { el.scrollTop = 0; });
    }, 10);
  }, []);

  const addToCart = useCallback((id, qty = 1) => {
    setCart((c) => {
      const idx = c.findIndex((it) => it.id === id);
      if (idx >= 0) { const next = [...c]; next[idx] = { ...next[idx], qty: next[idx].qty + qty }; return next; }
      return [...c, { id, qty }];
    });
    const p = window.MB.products.find((p) => p.id === id);
    if (p) {
      setToast({ msg: `Added \u00b7 ${p.name}`, ts: Date.now() });
      setTimeout(() => setToast((t) => (t && Date.now() - t.ts > 1600 ? null : t)), 1800);
    }
  }, []);
  const setQty = useCallback((id, qty) => {
    setCart((c) => qty <= 0 ? c.filter((it) => it.id !== id) : c.map((it) => it.id === id ? { ...it, qty } : it));
  }, []);
  const removeFromCart = useCallback((id) => setCart((c) => c.filter((it) => it.id !== id)), []);
  const cartCount = cart.reduce((n, it) => n + it.qty, 0);
  const cartSubtotal = cart.reduce((s, it) => {
    const p = window.MB.products.find((p) => p.id === it.id);
    return s + (p ? p.price * it.qty : 0);
  }, 0);

  // (Tweaks panel handles its own edit-mode protocol — we don't post here.)

  // derived theme
  const t = TYPE_PAIRS[tweaks.typePair] || TYPE_PAIRS.editorial;
  const d = DENSITY[tweaks.density] || DENSITY.breathable;
  const m = MOTION[tweaks.motion] || MOTION.subtle;

  const theme = useMemo(() => ({ t, d, m, c: COLORS, tweaks }), [tweaks, t, d, m]);

  const api = {
    tweaks, setTweak,
    route, go,
    cart, cartCount, cartSubtotal, addToCart, setQty, removeFromCart,
    cartOpen, setCartOpen,
    toast,
    theme,
  };

  return React.createElement(MBCtx.Provider, { value: api }, children);
}

function useMB() {
  const c = useContext(MBCtx);
  if (!c) throw new Error('useMB outside provider');
  return c;
}

// copy helpers — copy tone tweak switches voicing
function copy(key) {
  const c = useMB();
  const tone = c.tweaks.tone;
  const COPY = {
    heroH: { poetic: 'Home, Space and Body', plain: 'Home, Space and Body' },
    heroSub: { poetic: 'Hand-poured candles and home scent for rooms that should feel like exhaling.', plain: 'Clean-burning candles and diffusers, made in small batches.' },
    shopCta: { poetic: 'Find your scent', plain: 'Shop the range' },
    aboutH: { poetic: 'Made slowly, on purpose.', plain: 'How we make them.' },
    aboutSub: { poetic: 'Every candle is poured by hand in our Johannesburg studio. Coconut and soy wax, lead-free cotton or crackling wood wicks, fragrance loads we can stand behind.', plain: 'Hand-poured in Johannesburg. Coconut and soy wax. Cotton and wood wicks. No paraffin, no phthalates.' },
    productH: { poetic: 'Every scent, every season.', plain: 'All products' },
    productSub: { poetic: 'Curated and rotated through the year. Some scents stay; some are only here for a season.', plain: 'Browse the full range. Filter by family.' },
    pricingH: { poetic: 'A standing rhythm.', plain: 'Subscribe & save' },
    pricingSub: { poetic: 'A small ritual on schedule \u2014 the same candle each month, or three that rotate with the season.', plain: 'Save up to 20% with a monthly box. Skip or cancel anytime.' },
    contactH: { poetic: 'Say something. We read everything.', plain: 'Get in touch' },
    contactSub: { poetic: 'For custom blends, wholesale, press, or just to recommend a song.', plain: 'For wholesale, custom orders, or product questions.' },
    galleryH: { poetic: 'Moments of calm.', plain: 'Gallery' },
    gallerySub: { poetic: 'Imagery from the studio, the kitchen table, the long afternoon.', plain: 'Lifestyle photography of our candles and studio.' },
    cartEmptyH: { poetic: 'Your shelf is empty.', plain: 'Your cart is empty' },
    cartEmptySub: { poetic: 'Start with one scent. The rest tend to follow.', plain: 'Add a product to get started.' },
  };
  const v = COPY[key];
  if (!v) return key;
  return v[tone] || v.poetic;
}

Object.assign(window, { MBProvider, useMB, MBCtx, copy, TYPE_PAIRS, DENSITY, MOTION, COLORS });
