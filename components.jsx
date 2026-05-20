// Shared UI components for Melt & Bloom. Exposes window.MBUI.
// All components consume useMB() for theme + nav.

const { useState: u_useState, useEffect: u_useEffect, useRef: u_useRef, useMemo: u_useMemo } = React;

function MBIcon({ name, size = 18, color = 'currentColor' }) {
  // hand-tuned simple icons — we deliberately don't use Material Symbols here
  // to maintain a tighter brand silhouette.
  const s = { width: size, height: size, display: 'inline-block', flex: 'none' };
  const sw = 1.25;
  switch (name) {
    case 'menu':return <svg viewBox="0 0 24 24" style={s} fill="none" stroke={color} strokeWidth={sw}><line x1="4" y1="7" x2="20" y2="7" /><line x1="4" y1="17" x2="20" y2="17" /></svg>;
    case 'close':return <svg viewBox="0 0 24 24" style={s} fill="none" stroke={color} strokeWidth={sw}><line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" /></svg>;
    case 'bag':return <svg viewBox="0 0 24 24" style={s} fill="none" stroke={color} strokeWidth={sw}><path d="M5 8h14l-1 12H6L5 8z" /><path d="M9 8V6a3 3 0 016 0v2" /></svg>;
    case 'user':return <svg viewBox="0 0 24 24" style={s} fill="none" stroke={color} strokeWidth={sw}><circle cx="12" cy="9" r="3.5" /><path d="M5 20c1-3.5 4-5 7-5s6 1.5 7 5" /></svg>;
    case 'search':return <svg viewBox="0 0 24 24" style={s} fill="none" stroke={color} strokeWidth={sw}><circle cx="11" cy="11" r="6" /><line x1="20" y1="20" x2="16" y2="16" /></svg>;
    case 'arrow':return <svg viewBox="0 0 24 24" style={s} fill="none" stroke={color} strokeWidth={sw}><line x1="4" y1="12" x2="20" y2="12" /><polyline points="14,6 20,12 14,18" /></svg>;
    case 'minus':return <svg viewBox="0 0 24 24" style={s} fill="none" stroke={color} strokeWidth={sw}><line x1="6" y1="12" x2="18" y2="12" /></svg>;
    case 'plus':return <svg viewBox="0 0 24 24" style={s} fill="none" stroke={color} strokeWidth={sw}><line x1="12" y1="6" x2="12" y2="18" /><line x1="6" y1="12" x2="18" y2="12" /></svg>;
    case 'check':return <svg viewBox="0 0 24 24" style={s} fill="none" stroke={color} strokeWidth={sw}><polyline points="5,13 10,18 19,7" /></svg>;
    case 'flame':return <svg viewBox="0 0 24 24" style={s} fill="none" stroke={color} strokeWidth={sw}><path d="M12 3c0 4 4 5 4 9a4 4 0 11-8 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-2-4 0-8z" /></svg>;
    case 'leaf':return <svg viewBox="0 0 24 24" style={s} fill="none" stroke={color} strokeWidth={sw}><path d="M4 20C4 11 11 4 20 4c0 9-7 16-16 16z" /><line x1="4" y1="20" x2="14" y2="10" /></svg>;
    case 'star':return <svg viewBox="0 0 24 24" style={s} fill={color} stroke={color} strokeWidth={0.5}><polygon points="12,3 14.5,9 21,9.5 16,14 17.5,20.5 12,17 6.5,20.5 8,14 3,9.5 9.5,9" /></svg>;
    case 'dot':return <svg viewBox="0 0 24 24" style={s}><circle cx="12" cy="12" r="3" fill={color} /></svg>;
    case 'heart':return <svg viewBox="0 0 24 24" style={s} fill="none" stroke={color} strokeWidth={sw}><path d="M12 20s-7-4.5-7-10a4 4 0 017-2.5A4 4 0 0119 10c0 5.5-7 10-7 10z" /></svg>;
    case 'wave':return <svg viewBox="0 0 24 24" style={s} fill="none" stroke={color} strokeWidth={sw}><path d="M3 12c2-3 4-3 6 0s4 3 6 0 4-3 6 0" /></svg>;
    case 'chevR':return <svg viewBox="0 0 24 24" style={s} fill="none" stroke={color} strokeWidth={sw}><polyline points="9,5 16,12 9,19" /></svg>;
    case 'chevL':return <svg viewBox="0 0 24 24" style={s} fill="none" stroke={color} strokeWidth={sw}><polyline points="15,5 8,12 15,19" /></svg>;
    case 'chevD':return <svg viewBox="0 0 24 24" style={s} fill="none" stroke={color} strokeWidth={sw}><polyline points="5,9 12,16 19,9" /></svg>;
    case 'sparkle':return <svg viewBox="0 0 24 24" style={s} fill="none" stroke={color} strokeWidth={sw}><path d="M12 3v6M12 15v6M3 12h6M15 12h6" /></svg>;
    case 'home':return <svg viewBox="0 0 24 24" style={s} fill="none" stroke={color} strokeWidth={sw}><path d="M4 11l8-7 8 7v9a1 1 0 01-1 1h-4v-6h-6v6H5a1 1 0 01-1-1z" /></svg>;
    case 'grid':return <svg viewBox="0 0 24 24" style={s} fill="none" stroke={color} strokeWidth={sw}><rect x="4" y="4" width="7" height="7" /><rect x="13" y="4" width="7" height="7" /><rect x="4" y="13" width="7" height="7" /><rect x="13" y="13" width="7" height="7" /></svg>;
    default:return null;
  }
}

function Button({ children, variant = 'primary', size = 'md', onClick, full, style = {} }) {
  const { theme } = useMB();
  const { c, m } = theme;
  const base = {
    fontFamily: theme.t.label,
    fontWeight: 600,
    letterSpacing: '0.16em',
    textTransform: 'uppercase',
    fontSize: size === 'sm' ? 11 : 12,
    padding: size === 'sm' ? '10px 18px' : size === 'lg' ? '18px 32px' : '14px 26px',
    border: '1px solid transparent',
    borderRadius: 999,
    cursor: 'pointer',
    transition: `all ${m.dur}ms ${m.ease}`,
    width: full ? '100%' : 'auto',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
    whiteSpace: 'nowrap'
  };
  const v = {
    primary: { background: c.navy, color: '#fff', borderColor: c.navy },
    secondary: { background: 'transparent', color: c.navy, borderColor: c.navy },
    ghost: { background: 'transparent', color: c.navy, borderColor: 'transparent' },
    ember: { background: c.ember, color: c.navy, borderColor: c.ember },
    light: { background: '#fff', color: c.navy, borderColor: '#fff' }
  }[variant] || {};
  return (
    <button onMouseEnter={(e) => {e.currentTarget.style.transform = `scale(${m.hover})`;if (variant === 'primary') e.currentTarget.style.background = c.slate;}}
    onMouseLeave={(e) => {e.currentTarget.style.transform = 'scale(1)';if (variant === 'primary') e.currentTarget.style.background = c.navy;}}
    onClick={onClick} style={{ ...base, ...v, ...style }}>
      {children}
    </button>);

}

function Chip({ children, active, onClick }) {
  const { theme } = useMB();
  return (
    <button onClick={onClick} style={{
      fontFamily: theme.t.label, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600,
      padding: '8px 16px', borderRadius: 999, cursor: 'pointer',
      border: `1px solid ${active ? theme.c.navy : theme.c.line}`,
      background: active ? theme.c.navy : 'transparent', color: active ? '#fff' : theme.c.navy,
      transition: `all ${theme.m.dur}ms ${theme.m.ease}`
    }}>{children}</button>);

}

function Price({ value, size = 16 }) {
  const { theme } = useMB();
  return <span style={{ fontFamily: theme.t.body, fontSize: size, color: theme.c.slate, letterSpacing: '0.04em' }}>R{value}</span>;
}

// scent constellation — a novel mini-graphic for PDP / cards
function ScentDots({ notes, size = 88, color = '#0f1c37' }) {
  // top / heart / base — render three concentric arcs
  const stroke = 0.8;
  const rings = [
  { r: size * 0.42, notes: notes.top, label: 'TOP' },
  { r: size * 0.30, notes: notes.heart, label: 'HEART' },
  { r: size * 0.16, notes: notes.base, label: 'BASE' }];

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: 'block' }}>
      {rings.map((r, i) =>
      <g key={i}>
          <circle cx={size / 2} cy={size / 2} r={r.r} stroke={color} strokeWidth={stroke} fill="none" opacity={0.25} />
          {r.notes.map((_, j) => {
          const total = Math.max(r.notes.length, 1);
          const a = j / total * Math.PI * 2 - Math.PI / 2;
          const cx = size / 2 + Math.cos(a) * r.r;
          const cy = size / 2 + Math.sin(a) * r.r;
          return <circle key={j} cx={cx} cy={cy} r={2.2} fill={color} />;
        })}
        </g>
      )}
    </svg>);

}

function Logo({ size = 48, variant = 'dark' }) {
  // variant: 'light' (sand mark for dark bgs) | 'dark' (navy mark for light bgs)
  // size = diameter in px. Image is square; we crop the surrounding square
  // bg via border-radius so only the circular composition is visible.
  const src = variant === 'light' ? 'assets/logo-sand-on-navy.png' : 'assets/logo-navy-on-sand.png';
  return (
    <span style={{
      display: 'inline-block', height: size, width: size, borderRadius: '50%',
      overflow: 'hidden', userSelect: 'none', flex: 'none', verticalAlign: 'middle'
    }}>
      <img src={src} alt="Melt & Bloom" style={{
        height: '108%', width: '108%', marginLeft: '-4%', marginTop: '-4%',
        display: 'block', objectFit: "contain"
      }} />
    </span>);

}

// Top navigation bar — adapts to viewport via prop
function Nav({ viewport = 'desktop' }) {
  const { theme, route, go, cartCount, setCartOpen } = useMB();
  const { c, t, m, d } = theme;
  const [scrolled, setScrolled] = u_useState(false);
  const [mobMenu, setMobMenu] = u_useState(false);

  u_useEffect(() => {
    const scrollEl = document.querySelector(`[data-mb-scroll="${viewport}"]`);
    if (!scrollEl) return;
    const onS = () => setScrolled(scrollEl.scrollTop > 24);
    scrollEl.addEventListener('scroll', onS, { passive: true });
    onS();
    return () => scrollEl.removeEventListener('scroll', onS);
  }, [viewport]);

  const links = [
  { name: 'home', label: 'Home' },
  { name: 'products', label: 'Shop' },
  { name: 'about', label: 'About' },
  { name: 'gallery', label: 'Gallery' },
  { name: 'pricing', label: 'Subscribe' },
  { name: 'contact', label: 'Contact' }];


  const navBase = {
    position: 'sticky', top: 0, zIndex: 40,
    background: scrolled ? 'rgba(237,224,212,0.92)' : 'rgba(237,224,212,0)',
    backdropFilter: scrolled ? 'blur(14px) saturate(1.05)' : 'none',
    WebkitBackdropFilter: scrolled ? 'blur(14px) saturate(1.05)' : 'none',
    borderBottom: scrolled ? `1px solid ${c.line}` : '1px solid transparent',
    transition: `all ${m.dur}ms ${m.ease}`
  };

  if (viewport === 'mobile') {
    return (
      <>
        <header style={{ ...navBase, padding: `14px ${d.padX / 2}px` }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <button onClick={() => setMobMenu(true)} aria-label="Menu" style={{ background: 'none', border: 'none', cursor: 'pointer', color: c.navy, padding: 4 }}>
              <MBIcon name="menu" size={22} />
            </button>
            <a onClick={() => go('home')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}><Logo size={48} /></a>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
              <button onClick={() => setCartOpen(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: c.navy, position: 'relative', padding: 4 }}>
                <MBIcon name="bag" size={22} />
                {cartCount > 0 && <span style={{ position: 'absolute', top: -2, right: -4, background: c.ember, color: c.navy, borderRadius: 999, fontSize: 9, padding: '1px 5px', fontFamily: t.label, fontWeight: 700 }}>{cartCount}</span>}
              </button>
            </div>
          </div>
        </header>
        {mobMenu &&
        <div onClick={() => setMobMenu(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(15,28,55,0.4)', zIndex: 60, backdropFilter: 'blur(4px)' }}>
            <div onClick={(e) => e.stopPropagation()} style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '82%', background: c.paper, padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <Logo size={44} />
                <button onClick={() => setMobMenu(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}><MBIcon name="close" size={20} /></button>
              </div>
              {links.map((l) =>
            <a key={l.name} onClick={() => {go(l.name);setMobMenu(false);}} style={{
              fontFamily: t.display, fontStyle: t.displayItalic, fontSize: 30, color: route.name === l.name ? c.navy : c.slate,
              padding: '10px 0', cursor: 'pointer', borderBottom: `1px solid ${c.line}`
            }}>{l.label}</a>
            )}
              <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 12, fontFamily: t.label, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: c.slate }}>
                <a onClick={() => {go('account');setMobMenu(false);}} style={{ cursor: 'pointer' }}>Account</a>
                <a onClick={() => {go('cart');setMobMenu(false);}} style={{ cursor: 'pointer' }}>Cart ({cartCount})</a>
              </div>
            </div>
          </div>
        }
      </>);

  }

  // desktop
  return (
    <header style={{ ...navBase, padding: `18px ${d.padX}px` }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: 24, maxWidth: 1440, margin: '0 auto' }}>
        <nav style={{ display: 'flex', gap: 28 }}>
          {links.slice(0, 3).map((l) => <NavLink key={l.name} l={l} active={route.name === l.name} onClick={() => go(l.name)} />)}
        </nav>
        <a onClick={() => go('home')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}><Logo size={68} /></a>
        <nav style={{ display: 'flex', gap: 28, justifyContent: 'flex-end', alignItems: 'center' }}>
          {links.slice(3).map((l) => <NavLink key={l.name} l={l} active={route.name === l.name} onClick={() => go(l.name)} />)}
          <div style={{ display: 'flex', gap: 14, alignItems: 'center', borderLeft: `1px solid ${c.line}`, paddingLeft: 18, marginLeft: 4 }}>
            <button onClick={() => go('account')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: c.navy, padding: 4 }}><MBIcon name="user" size={18} /></button>
            <button onClick={() => setCartOpen(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: c.navy, position: 'relative', padding: 4 }}>
              <MBIcon name="bag" size={18} />
              {cartCount > 0 && <span style={{ position: 'absolute', top: -3, right: -5, background: c.ember, color: c.navy, borderRadius: 999, fontSize: 9, padding: '1px 5px', fontFamily: t.label, fontWeight: 700 }}>{cartCount}</span>}
            </button>
          </div>
        </nav>
      </div>
    </header>);

}

function NavLink({ l, active, onClick }) {
  const { theme } = useMB();
  return (
    <a onClick={onClick} style={{
      fontFamily: theme.t.body, fontSize: 14, cursor: 'pointer',
      color: active ? theme.c.navy : theme.c.slate,
      fontWeight: active ? 600 : 400,
      letterSpacing: '0.01em',
      borderBottom: active ? `1px solid ${theme.c.navy}` : '1px solid transparent',
      paddingBottom: 2, transition: `all ${theme.m.dur}ms ${theme.m.ease}`
    }}>{l.label}</a>);

}

// Footer
function Footer({ viewport = 'desktop' }) {
  const { theme, go } = useMB();
  const { c, t, d } = theme;
  const isMobile = viewport === 'mobile';
  return (
    <footer style={{
      background: c.navy, color: '#fff',
      padding: isMobile ? `48px ${d.padX / 2}px 32px` : `${d.section}px ${d.padX}px ${d.section / 2}px`,
      marginTop: d.section
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.4fr 1fr 1fr 1.2fr', gap: isMobile ? 36 : 48 }}>
        <div>
          <div style={{ marginBottom: 20 }}><Logo size={isMobile ? 72 : 96} variant="light" /></div>
          <p style={{ fontFamily: t.body, fontSize: 14, lineHeight: 1.7, color: 'rgba(255,255,255,0.6)', maxWidth: 320 }}>
            Hand-poured candles and home scent. Made in Cape Town, in small batches, on purpose.
          </p>
        </div>
        <FooterCol title="Shop" links={[['All scents', 'products'], ['Subscriptions', 'pricing'], ['Discovery set', 'products'], ['Wholesale', 'contact']]} go={go} t={t} />
        <FooterCol title="Studio" links={[['Our story', 'about'], ['Gallery', 'gallery'], ['Journal', 'about'], ['Contact', 'contact']]} go={go} t={t} />
        <div>
          <h4 style={{ fontFamily: t.label, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 16, color: 'rgba(255,255,255,0.7)' }}>Newsletter</h4>
          <p style={{ fontFamily: t.body, fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 14, lineHeight: 1.6 }}>One mail a month. Seasonal scents, slow reading.</p>
          <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: 4 }}>
            <input placeholder="Email address" style={{ flex: 1, background: 'transparent', border: 'none', color: '#fff', fontFamily: t.body, fontSize: 14, padding: '8px 0', outline: 'none' }} />
            <button style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: 4 }}><MBIcon name="arrow" size={18} /></button>
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 1280, margin: '40px auto 0', paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.12)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, fontFamily: t.body, fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
        <span>© 2026 Melt & Bloom · South Africa</span>
        <span>Crafted for mindful living</span>
      </div>
    </footer>);

}

function FooterCol({ title, links, go, t }) {
  return (
    <div>
      <h4 style={{ fontFamily: t.label, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 16, color: 'rgba(255,255,255,0.7)' }}>{title}</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {links.map(([label, route]) =>
        <a key={label} onClick={() => go(route)} style={{ fontFamily: t.body, fontSize: 14, color: 'rgba(255,255,255,0.7)', cursor: 'pointer', transition: 'color 200ms' }}
        onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
        onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}>{label}</a>
        )}
      </div>
    </div>);

}

// Product card — three styles depending on tweaks.cardStyle
function ProductCard({ p, onClick, viewport = 'desktop' }) {
  const { theme, addToCart } = useMB();
  const { c, t, m, tweaks } = theme;
  const [hover, setHover] = u_useState(false);
  const style = tweaks.cardStyle;
  const card = { cursor: 'pointer', display: 'flex', flexDirection: 'column' };

  if (style === 'editorial') {
    return (
      <div onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={card}>
        <div style={{ position: 'relative', aspectRatio: '4/5', overflow: 'hidden', background: c.sand }}>
          <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: hover ? 'scale(1.04)' : 'scale(1)', transition: `transform ${m.dur * 2}ms ${m.ease}` }} />
          <div style={{ position: 'absolute', top: 14, left: 14, fontFamily: t.label, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#fff', background: 'rgba(15,28,55,0.55)', padding: '4px 10px', borderRadius: 999, backdropFilter: 'blur(4px)' }}>{p.family}</div>
          <button onClick={(e) => {e.stopPropagation();addToCart(p.id);}} style={{
            position: 'absolute', bottom: 14, right: 14, background: '#fff', color: c.navy,
            border: 'none', borderRadius: 999, padding: '10px 16px', cursor: 'pointer',
            fontFamily: t.label, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600,
            opacity: hover ? 1 : 0, transform: hover ? 'translateY(0)' : 'translateY(8px)',
            transition: `all ${m.dur}ms ${m.ease}`
          }}>+ Add</button>
        </div>
        <div style={{ paddingTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
          <div>
            <div style={{ fontFamily: t.display, fontStyle: t.displayItalic, fontSize: viewport === 'mobile' ? 20 : 22, color: c.navy, lineHeight: 1.2 }}>{p.name}</div>
            <div style={{ fontFamily: t.body, fontSize: 13, color: c.inkDim, marginTop: 4 }}>{p.tagline}</div>
          </div>
          <Price value={p.price} size={14} />
        </div>
      </div>);

  }

  if (style === 'squared') {
    return (
      <div onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{ ...card, background: '#fff', border: `1px solid ${c.line}`, padding: 16, borderRadius: 8, transition: `all ${m.dur}ms ${m.ease}`, boxShadow: hover ? '0 18px 40px rgba(15,28,55,0.08)' : '0 0 0 rgba(0,0,0,0)' }}>
        <div style={{ aspectRatio: '1/1', overflow: 'hidden', background: c.sand, borderRadius: 4 }}>
          <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: hover ? 'scale(1.04)' : 'scale(1)', transition: `transform ${m.dur * 2}ms ${m.ease}` }} />
        </div>
        <div style={{ paddingTop: 14, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ fontFamily: t.label, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: c.slate }}>{p.family}</div>
          <div style={{ fontFamily: t.display, fontStyle: t.displayItalic, fontSize: 19, color: c.navy }}>{p.name}</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
            <Price value={p.price} size={14} />
            <button onClick={(e) => {e.stopPropagation();addToCart(p.id);}} style={{ background: c.navy, color: '#fff', border: 'none', padding: '8px 14px', borderRadius: 999, cursor: 'pointer', fontFamily: t.label, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600 }}>+ Add</button>
          </div>
        </div>
      </div>);

  }

  // circular (default)
  return (
    <div onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{ ...card, alignItems: 'center', textAlign: 'center' }}>
      <div style={{ width: '100%', maxWidth: 260, aspectRatio: '1/1', borderRadius: '50%', overflow: 'hidden', background: c.sand, boxShadow: hover ? '0 28px 60px rgba(15,28,55,0.18)' : '0 6px 18px rgba(15,28,55,0.05)', transition: `all ${m.dur * 1.4}ms ${m.ease}`, transform: hover ? 'translateY(-4px)' : 'translateY(0)' }}>
        <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: hover ? 'scale(1.06)' : 'scale(1)', transition: `transform ${m.dur * 2}ms ${m.ease}` }} />
      </div>
      <div style={{ marginTop: 18, fontFamily: t.label, fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: c.slate }}>{p.family}</div>
      <div style={{ marginTop: 6, fontFamily: t.display, fontStyle: t.displayItalic, fontSize: viewport === 'mobile' ? 20 : 24, color: c.navy, lineHeight: 1.2, maxWidth: 220 }}>{p.name}</div>
      <div style={{ marginTop: 6 }}><Price value={p.price} size={14} /></div>
      <button onClick={(e) => {e.stopPropagation();addToCart(p.id);}} style={{
        marginTop: 14, background: 'transparent', color: c.navy, border: `1px solid ${c.navy}`, padding: '8px 18px', borderRadius: 999, cursor: 'pointer',
        fontFamily: t.label, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600,
        opacity: hover ? 1 : 0.65, transition: `all ${m.dur}ms ${m.ease}`
      }}>Add to bag</button>
    </div>);

}

// Section wrapper — applies density
function Section({ children, dark, narrow, style = {}, viewport }) {
  const { theme } = useMB();
  const { c, d } = theme;
  const isMobile = viewport === 'mobile';
  return (
    <section style={{
      background: dark ? c.navy : 'transparent',
      color: dark ? '#fff' : c.ink,
      padding: `${isMobile ? d.section * 0.6 : d.section}px ${isMobile ? d.padX / 2 : d.padX}px`,
      ...style
    }}>
      <div style={{ maxWidth: narrow ? 880 : 1280, margin: '0 auto' }}>{children}</div>
    </section>);

}

function Eyebrow({ children, dark }) {
  const { theme } = useMB();
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: theme.t.label, fontSize: 11, letterSpacing: '0.24em', textTransform: 'uppercase', color: dark ? 'rgba(255,255,255,0.7)' : theme.c.slate, marginBottom: 18 }}>
      <span style={{ display: 'inline-block', width: 24, height: 1, background: dark ? 'rgba(255,255,255,0.4)' : theme.c.slate }} />
      {children}
    </div>);

}

function Display({ children, size, dark, italic = true, style = {} }) {
  const { theme } = useMB();
  return (
    <h1 style={{
      fontFamily: theme.t.display, fontStyle: italic ? theme.t.displayItalic : 'normal',
      fontSize: size, fontWeight: theme.t.weightDisplay, color: dark ? '#fff' : theme.c.navy,
      letterSpacing: theme.t.kerning, lineHeight: 1.05, margin: 0, textWrap: 'pretty',
      ...style
    }}>{children}</h1>);

}

function Body({ children, size = 16, dark, style = {} }) {
  const { theme } = useMB();
  return <p style={{ ...{ fontFamily: theme.t.body, fontSize: size, lineHeight: 1.7, color: dark ? 'rgba(255,255,255,0.75)' : theme.c.inkDim, margin: 0, textWrap: 'pretty', ...style }, color: "rgb(15, 28, 55)" }}>{children}</p>;
}

Object.assign(window, { MBIcon, Button, Chip, Price, ScentDots, Logo, Nav, Footer, ProductCard, Section, Eyebrow, Display, Body });