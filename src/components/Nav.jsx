import { useState, useEffect } from 'react';
import { useMB } from '../store/MBProvider';
import Logo from './Logo';
import MBIcon from './MBIcon';

function NavLink({ l, active, onClick }) {
  const { theme } = useMB();
  return (
    <a
      onClick={onClick}
      style={{
        fontFamily: theme.t.body, fontSize: 14, cursor: 'pointer',
        color: active ? theme.c.navy : theme.c.slate,
        fontWeight: active ? 600 : 400,
        letterSpacing: '0.01em',
        borderBottom: active ? `1px solid ${theme.c.navy}` : '1px solid transparent',
        paddingBottom: 2,
        transition: `all ${theme.m.dur}ms ${theme.m.ease}`,
      }}
    >
      {l.label}
    </a>
  );
}

export default function Nav({ viewport = 'desktop' }) {
  const { theme, route, go, cartCount, setCartOpen } = useMB();
  const { c, t, m, d } = theme;
  const [scrolled,  setScrolled]  = useState(false);
  const [mobMenu,   setMobMenu]   = useState(false);

  useEffect(() => {
    const onS = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onS, { passive: true });
    onS();
    return () => window.removeEventListener('scroll', onS);
  }, []);

  const links = [
    { name: 'home',    label: 'Home' },
    { name: 'products', label: 'Shop' },
    { name: 'about',   label: 'About' },
    { name: 'gallery', label: 'Gallery' },
    { name: 'pricing', label: 'Subscribe' },
    { name: 'contact', label: 'Contact' },
  ];

  const navBase = {
    position: 'sticky', top: 0, zIndex: 40,
    background: scrolled ? 'rgba(226,210,192,0.94)' : 'rgba(226,210,192,0)',
    backdropFilter: scrolled ? 'blur(14px) saturate(1.05)' : 'none',
    WebkitBackdropFilter: scrolled ? 'blur(14px) saturate(1.05)' : 'none',
    borderBottom: scrolled ? `1px solid ${c.line}` : '1px solid transparent',
    transition: `all ${m.dur}ms ${m.ease}`,
  };

  if (viewport === 'mobile') {
    return (
      <>
        <header style={{ ...navBase, padding: `14px ${d.padX / 2}px` }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <button onClick={() => setMobMenu(true)} aria-label="Menu" style={{ background: 'none', border: 'none', cursor: 'pointer', color: c.navy, padding: 4 }}>
              <MBIcon name="menu" size={22}/>
            </button>
            <a onClick={() => go('home')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              <Logo size={48}/>
            </a>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
              <button onClick={() => setCartOpen(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: c.navy, position: 'relative', padding: 4 }}>
                <MBIcon name="bag" size={22}/>
                {cartCount > 0 && (
                  <span style={{ position: 'absolute', top: -2, right: -4, background: c.ember, color: c.navy, borderRadius: 999, fontSize: 9, padding: '1px 5px', fontFamily: t.label, fontWeight: 700 }}>{cartCount}</span>
                )}
              </button>
            </div>
          </div>
        </header>

        {mobMenu && (
          <div onClick={() => setMobMenu(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(15,28,55,0.4)', zIndex: 60, backdropFilter: 'blur(4px)' }}>
            <div onClick={(e) => e.stopPropagation()} style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '82%', background: c.paper, padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <Logo size={44}/>
                <button onClick={() => setMobMenu(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
                  <MBIcon name="close" size={20}/>
                </button>
              </div>
              {links.map((l) => (
                <a key={l.name} onClick={() => { go(l.name); setMobMenu(false); }} style={{ fontFamily: t.display, fontStyle: t.displayItalic, fontSize: 30, color: route.name === l.name ? c.navy : c.slate, padding: '10px 0', cursor: 'pointer', borderBottom: `1px solid ${c.line}` }}>
                  {l.label}
                </a>
              ))}
              <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 12, fontFamily: t.label, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: c.slate }}>
                <a onClick={() => { go('account'); setMobMenu(false); }} style={{ cursor: 'pointer' }}>Account</a>
                <a onClick={() => { go('cart'); setMobMenu(false); }} style={{ cursor: 'pointer' }}>Cart ({cartCount})</a>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <header style={{ ...navBase, padding: `18px ${d.padX}px` }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: 24, maxWidth: 1440, margin: '0 auto' }}>
        <nav style={{ display: 'flex', gap: 28 }}>
          {links.slice(0, 3).map((l) => (
            <NavLink key={l.name} l={l} active={route.name === l.name} onClick={() => go(l.name)}/>
          ))}
        </nav>
        <a onClick={() => go('home')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          <Logo size={68}/>
        </a>
        <nav style={{ display: 'flex', gap: 28, justifyContent: 'flex-end', alignItems: 'center' }}>
          {links.slice(3).map((l) => (
            <NavLink key={l.name} l={l} active={route.name === l.name} onClick={() => go(l.name)}/>
          ))}
          <div style={{ display: 'flex', gap: 14, alignItems: 'center', borderLeft: `1px solid ${c.line}`, paddingLeft: 18, marginLeft: 4 }}>
            <button onClick={() => go('account')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: c.navy, padding: 4 }}>
              <MBIcon name="user" size={18}/>
            </button>
            <button onClick={() => setCartOpen(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: c.navy, position: 'relative', padding: 4 }}>
              <MBIcon name="bag" size={18}/>
              {cartCount > 0 && (
                <span style={{ position: 'absolute', top: -3, right: -5, background: c.ember, color: c.navy, borderRadius: 999, fontSize: 9, padding: '1px 5px', fontFamily: t.label, fontWeight: 700 }}>{cartCount}</span>
              )}
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
