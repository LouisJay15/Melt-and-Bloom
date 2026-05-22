import { useState, useMemo } from 'react';
import { useMB } from '../store/MBProvider';
import { products } from '../data/products';
import Section from '../components/Section';
import Eyebrow from '../components/Eyebrow';
import Display from '../components/Display';
import Body from '../components/Body';
import Chip from '../components/Chip';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';

export default function Products({ viewport = 'desktop' }) {
  const { theme, go, copy } = useMB();
  const { c, t, d } = theme;
  const isMobile = viewport === 'mobile';
  const [filter, setFilter] = useState('All');
  const [sort,   setSort]   = useState('Featured');
  const families = ['All', 'Floral', 'Woody', 'Fresh', 'Warm', 'Sets'];

  const visible = useMemo(() => {
    let list = products.slice();
    if (filter !== 'All') list = list.filter((p) => p.family === filter);
    if (sort === 'Price ↑') list.sort((a, b) => a.price - b.price);
    if (sort === 'Price ↓') list.sort((a, b) => b.price - a.price);
    return list;
  }, [filter, sort]);

  return (
    <>
      <Section viewport={viewport} style={{ paddingBottom: isMobile ? 32 : 48 }}>
        <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto', paddingTop: isMobile ? 16 : 40 }}>
          <Eyebrow>The full collection</Eyebrow>
          <Display size={isMobile ? 44 : 80}>{copy('productH')}</Display>
          <div style={{ marginTop: 18 }}><Body>{copy('productSub')}</Body></div>
        </div>
      </Section>

      <div style={{ position: 'sticky', top: 58, zIndex: 30, background: c.paper, borderTop: `1px solid ${c.line}`, borderBottom: `1px solid ${c.line}`, padding: `12px ${isMobile ? d.padX / 2 : d.padX}px` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {families.map((f) => <Chip key={f} active={filter === f} onClick={() => setFilter(f)}>{f}</Chip>)}
          </div>
          {!isMobile && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontFamily: t.label, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: c.slate }}>{visible.length} scents · Sort:</span>
              {['Featured', 'Price ↑', 'Price ↓'].map((s) => (
                <button key={s} onClick={() => setSort(s)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: t.body, fontSize: 13, color: sort === s ? c.navy : c.slate, fontWeight: sort === s ? 600 : 400, padding: 0 }}>{s}</button>
              ))}
            </div>
          )}
        </div>
      </div>

      <Section viewport={viewport} style={{ paddingTop: isMobile ? 32 : 64 }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(3, 1fr)', gap: isMobile ? 28 : 56, rowGap: isMobile ? 40 : 80 }}>
          {visible.map((p) => <ProductCard key={p.id} p={p} viewport={viewport} onClick={() => go('pdp', { id: p.id })}/>)}
        </div>
        {visible.length === 0 && (
          <div style={{ textAlign: 'center', padding: 80, color: c.slate, fontFamily: t.body }}>No scents in this family yet.</div>
        )}
      </Section>

      <Footer viewport={viewport}/>
    </>
  );
}
