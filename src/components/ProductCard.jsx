import { useState } from 'react';
import { useMB } from '../store/MBProvider';
import Price from './Price';

export default function ProductCard({ p, onClick, viewport }) {
  const { theme, addToCart, viewport: ctxVP } = useMB();
  const { c, t, m, tweaks } = theme;
  const [hover, setHover] = useState(false);
  const vp    = viewport || ctxVP;
  const style = tweaks.cardStyle;
  const card  = { cursor: 'pointer', display: 'flex', flexDirection: 'column' };

  if (style === 'editorial') {
    return (
      <div onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={card}>
        <div style={{ position: 'relative', aspectRatio: '4/5', overflow: 'hidden', background: c.sand }}>
          <img src={p.img} alt={p.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', transform: hover ? 'scale(1.04)' : 'scale(1)', transition: `transform ${m.dur * 2}ms ${m.ease}` }}/>
          <div style={{ position: 'absolute', top: 14, left: 14, fontFamily: t.label, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#fff', background: 'rgba(15,28,55,0.55)', padding: '4px 10px', borderRadius: 999, backdropFilter: 'blur(4px)' }}>{p.family}</div>
          <button onClick={(e) => { e.stopPropagation(); addToCart(p.id); }} style={{ position: 'absolute', bottom: 14, right: 14, background: '#fff', color: c.navy, border: 'none', borderRadius: 999, padding: '10px 16px', cursor: 'pointer', fontFamily: t.label, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600, opacity: hover ? 1 : 0, transform: hover ? 'translateY(0)' : 'translateY(8px)', transition: `all ${m.dur}ms ${m.ease}` }}>+ Add</button>
        </div>
        <div style={{ paddingTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
          <div>
            <div style={{ fontFamily: t.display, fontStyle: t.displayItalic, fontSize: vp === 'mobile' ? 20 : 22, color: c.navy, lineHeight: 1.2 }}>{p.name}</div>
            <div style={{ fontFamily: t.body, fontSize: 13, color: c.inkDim, marginTop: 4 }}>{p.tagline}</div>
          </div>
          <Price value={p.price} size={14}/>
        </div>
      </div>
    );
  }

  if (style === 'squared') {
    return (
      <div onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{ ...card, background: '#fff', border: `1px solid ${c.line}`, padding: 16, borderRadius: 8, transition: `all ${m.dur}ms ${m.ease}`, boxShadow: hover ? '0 18px 40px rgba(15,28,55,0.08)' : 'none' }}>
        <div style={{ aspectRatio: '1/1', overflow: 'hidden', background: c.sand, borderRadius: 4 }}>
          <img src={p.img} alt={p.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', transform: hover ? 'scale(1.04)' : 'scale(1)', transition: `transform ${m.dur * 2}ms ${m.ease}` }}/>
        </div>
        <div style={{ paddingTop: 14, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ fontFamily: t.label, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: c.slate }}>{p.family}</div>
          <div style={{ fontFamily: t.display, fontStyle: t.displayItalic, fontSize: 19, color: c.navy }}>{p.name}</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
            <Price value={p.price} size={14}/>
            <button onClick={(e) => { e.stopPropagation(); addToCart(p.id); }} style={{ background: c.navy, color: '#fff', border: 'none', padding: '8px 14px', borderRadius: 999, cursor: 'pointer', fontFamily: t.label, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600 }}>+ Add</button>
          </div>
        </div>
      </div>
    );
  }

  // circular (default)
  return (
    <div onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{ ...card, alignItems: 'center', textAlign: 'center' }}>
      <div style={{ width: '100%', maxWidth: 260, aspectRatio: '1/1', borderRadius: '50%', overflow: 'hidden', background: c.sand, boxShadow: hover ? '0 28px 60px rgba(15,28,55,0.18)' : '0 6px 18px rgba(15,28,55,0.05)', transition: `all ${m.dur * 1.4}ms ${m.ease}`, transform: hover ? 'translateY(-4px)' : 'translateY(0)' }}>
        <img src={p.img} alt={p.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', transform: hover ? 'scale(1.06)' : 'scale(1)', transition: `transform ${m.dur * 2}ms ${m.ease}` }}/>
      </div>
      <div style={{ marginTop: 18, fontFamily: t.label, fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: c.slate }}>{p.family}</div>
      <div style={{ marginTop: 6, fontFamily: t.display, fontStyle: t.displayItalic, fontSize: vp === 'mobile' ? 20 : 24, color: c.navy, lineHeight: 1.2, maxWidth: 220 }}>{p.name}</div>
      <div style={{ marginTop: 6 }}><Price value={p.price} size={14}/></div>
      <button onClick={(e) => { e.stopPropagation(); addToCart(p.id); }} style={{ marginTop: 14, background: 'transparent', color: c.navy, border: `1px solid ${c.navy}`, padding: '8px 18px', borderRadius: 999, cursor: 'pointer', fontFamily: t.label, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600, opacity: hover ? 1 : 0.65, transition: `all ${m.dur}ms ${m.ease}` }}>Add to bag</button>
    </div>
  );
}
