import { useState } from 'react';
import { useMB } from '../store/MBProvider';
import { products, IMG } from '../data/products';
import Section from '../components/Section';
import Eyebrow from '../components/Eyebrow';
import Display from '../components/Display';
import Body from '../components/Body';
import Button from '../components/Button';
import Price from '../components/Price';
import ScentDots from '../components/ScentDots';
import MBIcon from '../components/MBIcon';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';

export default function ProductDetail({ viewport = 'desktop' }) {
  const { theme, route, go, addToCart, setCartOpen } = useMB();
  const { c, t, d } = theme;
  const isMobile = viewport === 'mobile';
  const id      = route.params?.id || 'midnight-jasmine';
  const p       = products.find((x) => x.id === id) || products[0];
  const [qty,  setQtyState] = useState(1);
  const [size, setSizeState] = useState('Standard');
  const [tab,  setTab]      = useState('Notes');
  const related = products.filter((x) => x.id !== p.id && x.family === p.family).slice(0, 3);

  return (
    <>
      <div style={{ padding: `${isMobile ? 16 : 24}px ${isMobile ? d.padX / 2 : d.padX}px`, fontFamily: t.label, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: c.slate }}>
        <a onClick={() => go('products')} style={{ cursor: 'pointer' }}>Shop</a>
        {' / '}
        <a onClick={() => go('products')} style={{ cursor: 'pointer' }}>{p.family}</a>
        {' / '}
        <span style={{ color: c.navy }}>{p.name}</span>
      </div>

      <Section viewport={viewport} style={{ paddingTop: 0, paddingBottom: isMobile ? 48 : 96 }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.05fr 1fr', gap: isMobile ? 32 : 72, alignItems: 'flex-start' }}>

          {/* gallery */}
          <div>
            <div style={{ position: 'relative', aspectRatio: '4/5', overflow: 'hidden', background: c.sand }}>
              <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
              <button aria-label="Wishlist" style={{ position: 'absolute', top: 18, right: 18, background: 'rgba(255,255,255,0.85)', border: 'none', borderRadius: 999, padding: 10, cursor: 'pointer' }}>
                <MBIcon name="heart" size={16}/>
              </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginTop: 10 }}>
              {[p.img, IMG.linen, IMG.arranged, IMG.crafting].map((src, i) => (
                <div key={i} style={{ aspectRatio: '1/1', overflow: 'hidden', background: c.sand, cursor: 'pointer', border: i === 0 ? `1px solid ${c.navy}` : '1px solid transparent' }}>
                  <img src={src} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt=""/>
                </div>
              ))}
            </div>
          </div>

          {/* details */}
          <div>
            <div style={{ fontFamily: t.label, fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: c.slate }}>{p.family} · {p.size}</div>
            <Display size={isMobile ? 40 : 56} style={{ marginTop: 12 }}>{p.name}</Display>
            <div style={{ fontFamily: t.display, fontStyle: t.displayItalic, fontSize: 20, color: c.slate, marginTop: 6 }}>{p.tagline}</div>
            <div style={{ marginTop: 18, display: 'flex', alignItems: 'center', gap: 14 }}>
              <Price value={p.price} size={22}/>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: c.ember }}>
                {[1,2,3,4,5].map((i) => <MBIcon key={i} name="star" size={12} color={c.emberDeep}/>)}
                <span style={{ fontFamily: t.body, fontSize: 12, color: c.slate, marginLeft: 6 }}>4.9 · 218 reviews</span>
              </span>
            </div>
            <div style={{ marginTop: 20 }}><Body>{p.desc}</Body></div>

            <div style={{ marginTop: 32, padding: 24, background: c.paper, border: `1px solid ${c.line}`, display: 'flex', alignItems: 'center', gap: 24 }}>
              <ScentDots notes={p.notes} size={88} color={c.navy}/>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
                {[['TOP', p.notes.top], ['HEART', p.notes.heart], ['BASE', p.notes.base]].map(([lab, arr]) => (
                  <div key={lab} style={{ display: 'flex', gap: 12, alignItems: 'baseline' }}>
                    <span style={{ fontFamily: t.label, fontSize: 9, letterSpacing: '0.22em', color: c.slate, width: 44 }}>{lab}</span>
                    <span style={{ fontFamily: t.body, fontSize: 13, color: c.navy }}>{arr.join(' · ')}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginTop: 28 }}>
              <div style={{ fontFamily: t.label, fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: c.slate, marginBottom: 10 }}>Size</div>
              <div style={{ display: 'flex', gap: 8 }}>
                {['Travel · 40g', 'Standard · 220g', 'Hearth · 400g'].map((s) => {
                  const active = s.startsWith(size);
                  return (
                    <button key={s} onClick={() => setSizeState(s.split(' ·')[0])} style={{ padding: '12px 16px', fontFamily: t.body, fontSize: 13, color: active ? '#fff' : c.navy, background: active ? c.navy : 'transparent', border: `1px solid ${active ? c.navy : c.line}`, borderRadius: 4, cursor: 'pointer', flex: 1, textAlign: 'left' }}>{s}</button>
                  );
                })}
              </div>
            </div>

            <div style={{ marginTop: 24, display: 'flex', gap: 12, alignItems: 'stretch' }}>
              <div style={{ display: 'flex', alignItems: 'center', border: `1px solid ${c.line}`, borderRadius: 999 }}>
                <button onClick={() => setQtyState(Math.max(1, qty - 1))} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '14px 16px' }}><MBIcon name="minus" size={14}/></button>
                <span style={{ fontFamily: t.body, fontSize: 14, width: 28, textAlign: 'center' }}>{qty}</span>
                <button onClick={() => setQtyState(qty + 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '14px 16px' }}><MBIcon name="plus" size={14}/></button>
              </div>
              <Button variant="primary" size="lg" full onClick={() => { addToCart(p.id, qty); setCartOpen(true); }} style={{ flex: 1 }}>
                Add to bag · R{p.price * qty}
              </Button>
            </div>

            <div style={{ marginTop: 28, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, fontFamily: t.body, fontSize: 12, color: c.slate }}>
              {[['flame', p.burn ? `${p.burn} hr burn` : 'Always-on'], ['leaf', p.wax], ['wave', `${p.wick} wick`]].map(([icon, lab], i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}><MBIcon name={icon} size={14}/> {lab}</div>
              ))}
            </div>

            <div style={{ marginTop: 40, borderTop: `1px solid ${c.line}` }}>
              <div style={{ display: 'flex', gap: 24, paddingTop: 16 }}>
                {['Notes', 'Care', 'Shipping'].map((x) => (
                  <button key={x} onClick={() => setTab(x)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: t.label, fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 600, color: tab === x ? c.navy : c.slate, padding: '8px 0', borderBottom: `1px solid ${tab === x ? c.navy : 'transparent'}` }}>{x}</button>
                ))}
              </div>
              <div style={{ paddingTop: 20, minHeight: 100 }}>
                {tab === 'Notes'    && <Body size={14}>Hand-blended fragrance oil, IFRA-certified. We test every batch for soot, scent throw, and clean burn before it leaves the studio.</Body>}
                {tab === 'Care'     && <Body size={14}>Burn for at least 2 hours the first time so the wax pools edge to edge. Trim the wick to 5mm before each burn. Never leave unattended.</Body>}
                {tab === 'Shipping' && <Body size={14}>Free shipping over R500 within South Africa. International orders calculated at checkout. Most orders ship within 48 hours.</Body>}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {related.length > 0 && (
        <Section viewport={viewport} style={{ background: c.paper, paddingTop: isMobile ? 48 : 80 }}>
          <Eyebrow>You might also like</Eyebrow>
          <Display size={isMobile ? 28 : 40}>More from the {p.family.toLowerCase()} family</Display>
          <div style={{ marginTop: 40, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : `repeat(${related.length}, 1fr)`, gap: isMobile ? 32 : 56 }}>
            {related.map((r) => <ProductCard key={r.id} p={r} viewport={viewport} onClick={() => go('pdp', { id: r.id })}/>)}
          </div>
        </Section>
      )}

      <Footer viewport={viewport}/>
    </>
  );
}
