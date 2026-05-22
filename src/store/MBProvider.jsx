import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { TYPE_PAIRS, DENSITY, MOTION, COLORS, TWEAK_DEFAULTS } from '../tokens';
import { products } from '../data/products';

const MBCtx = createContext(null);

function routeToPath(name, params = {}) {
  switch (name) {
    case 'home':     return '/';
    case 'products': return '/products';
    case 'pdp':      return `/product/${params.id}`;
    case 'cart':     return '/cart';
    case 'checkout': return '/checkout';
    case 'account':  return '/account';
    case 'about':    return '/about';
    case 'gallery':  return '/gallery';
    case 'pricing':  return '/pricing';
    case 'contact':  return '/contact';
    default:         return '/';
  }
}

function pathToRoute(pathname) {
  if (pathname === '/')           return { name: 'home',     params: {} };
  if (pathname === '/products')   return { name: 'products', params: {} };
  if (pathname === '/cart')       return { name: 'cart',     params: {} };
  if (pathname === '/checkout')   return { name: 'checkout', params: {} };
  if (pathname === '/account')    return { name: 'account',  params: {} };
  if (pathname === '/about')      return { name: 'about',    params: {} };
  if (pathname === '/gallery')    return { name: 'gallery',  params: {} };
  if (pathname === '/pricing')    return { name: 'pricing',  params: {} };
  if (pathname === '/contact')    return { name: 'contact',  params: {} };
  if (pathname.startsWith('/product/')) {
    return { name: 'pdp', params: { id: pathname.replace('/product/', '') } };
  }
  return { name: 'home', params: {} };
}

export function MBProvider({ children }) {
  const navigate   = useNavigate();
  const location   = useLocation();

  const [tweaks, setTweaksState] = useState(TWEAK_DEFAULTS);
  const [route,  setRoute]       = useState(() => pathToRoute(location.pathname));
  const [cart,   setCart]        = useState([]);
  const [cartOpen, setCartOpen]  = useState(false);
  const [toast,  setToast]       = useState(null);

  const [viewport, setViewport]  = useState(
    typeof window !== 'undefined' && window.innerWidth < 768 ? 'mobile' : 'desktop'
  );

  useEffect(() => {
    const onResize = () => setViewport(window.innerWidth < 768 ? 'mobile' : 'desktop');
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Sync browser back/forward to route state
  useEffect(() => {
    setRoute(pathToRoute(location.pathname));
    window.scrollTo({ top: 0 });
  }, [location.pathname]);

  const go = useCallback((name, params = {}) => {
    setRoute({ name, params });
    navigate(routeToPath(name, params));
    setTimeout(() => window.scrollTo({ top: 0 }), 10);
  }, [navigate]);

  const addToCart = useCallback((id, qty = 1) => {
    setCart((c) => {
      const idx = c.findIndex((it) => it.id === id);
      if (idx >= 0) {
        const next = [...c];
        next[idx] = { ...next[idx], qty: next[idx].qty + qty };
        return next;
      }
      return [...c, { id, qty }];
    });
    const p = products.find((p) => p.id === id);
    if (p) {
      setToast({ msg: `Added · ${p.name}`, ts: Date.now() });
      setTimeout(() => setToast((t) => (t && Date.now() - t.ts > 1600 ? null : t)), 1800);
    }
  }, []);

  const setQty = useCallback((id, qty) => {
    setCart((c) =>
      qty <= 0 ? c.filter((it) => it.id !== id) : c.map((it) => it.id === id ? { ...it, qty } : it)
    );
  }, []);

  const removeFromCart = useCallback((id) => setCart((c) => c.filter((it) => it.id !== id)), []);

  const cartCount    = cart.reduce((n, it) => n + it.qty, 0);
  const cartSubtotal = cart.reduce((s, it) => {
    const p = products.find((p) => p.id === it.id);
    return s + (p ? p.price * it.qty : 0);
  }, 0);

  const t = TYPE_PAIRS[tweaks.typePair] || TYPE_PAIRS.editorial;
  const d = DENSITY[tweaks.density]    || DENSITY.breathable;
  const m = MOTION[tweaks.motion]      || MOTION.subtle;
  const theme = useMemo(() => ({ t, d, m, c: COLORS, tweaks }), [tweaks, t, d, m]);

  const copyFn = useCallback((key) => {
    const tone = tweaks.tone;
    const COPY = {
      heroH:      { poetic: 'Home, Space and Body',                                                                                                       plain: 'Home, Space and Body' },
      heroSub:    { poetic: 'Hand-poured candles and home scent for rooms that should feel like exhaling.',                                                plain: 'Clean-burning candles and diffusers, made in small batches.' },
      shopCta:    { poetic: 'Find your scent',                                                                                                             plain: 'Shop the range' },
      aboutH:     { poetic: 'Made slowly, on purpose.',                                                                                                    plain: 'How we make them.' },
      aboutSub:   { poetic: 'Every candle is poured by hand in our Johannesburg studio. Coconut and soy wax, lead-free cotton or crackling wood wicks, fragrance loads we can stand behind.', plain: 'Hand-poured in Johannesburg. Coconut and soy wax. Cotton and wood wicks. No paraffin, no phthalates.' },
      productH:   { poetic: 'Every scent, every season.',                                                                                                  plain: 'All products' },
      productSub: { poetic: 'Curated and rotated through the year. Some scents stay; some are only here for a season.',                                   plain: 'Browse the full range. Filter by family.' },
      pricingH:   { poetic: 'A standing rhythm.',                                                                                                          plain: 'Subscribe & save' },
      pricingSub: { poetic: 'A small ritual on schedule — the same candle each month, or three that rotate with the season.',                              plain: 'Save up to 20% with a monthly box. Skip or cancel anytime.' },
      contactH:   { poetic: 'Say something. We read everything.',                                                                                          plain: 'Get in touch' },
      contactSub: { poetic: 'For custom blends, wholesale, press, or just to recommend a song.',                                                           plain: 'For wholesale, custom orders, or product questions.' },
      galleryH:   { poetic: 'Moments of calm.',                                                                                                            plain: 'Gallery' },
      gallerySub: { poetic: 'Imagery from the studio, the kitchen table, the long afternoon.',                                                             plain: 'Lifestyle photography of our candles and studio.' },
      cartEmptyH:  { poetic: 'Your shelf is empty.',                                                                                                       plain: 'Your cart is empty' },
      cartEmptySub:{ poetic: 'Start with one scent. The rest tend to follow.',                                                                             plain: 'Add a product to get started.' },
    };
    const v = COPY[key];
    if (!v) return key;
    return v[tone] || v.poetic;
  }, [tweaks.tone]);

  const api = {
    tweaks,
    route, go,
    cart, cartCount, cartSubtotal, addToCart, setQty, removeFromCart,
    cartOpen, setCartOpen,
    toast,
    theme,
    viewport,
    copy: copyFn,
  };

  return <MBCtx.Provider value={api}>{children}</MBCtx.Provider>;
}

export function useMB() {
  const c = useContext(MBCtx);
  if (!c) throw new Error('useMB must be used inside MBProvider');
  return c;
}
