import { useState } from 'react';
import { useMB } from '../store/MBProvider';
import { gallery } from '../data/products';
import Section from '../components/Section';
import Eyebrow from '../components/Eyebrow';
import Display from '../components/Display';
import Body from '../components/Body';
import Button from '../components/Button';
import MBIcon from '../components/MBIcon';
import Footer from '../components/Footer';

export default function Gallery({ viewport = 'desktop' }) {
  const { theme, copy } = useMB();
  const { c, t } = theme;
  const isMobile = viewport === 'mobile';
  const [lightbox, setLightbox] = useState(null);

  return (
    <>
      <Section viewport={viewport} style={{ paddingBottom: isMobile ? 32 : 56 }}>
        <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto', paddingTop: isMobile ? 16 : 32 }}>
          <Eyebrow>From the studio &amp; beyond</Eyebrow>
          <Display size={isMobile ? 44 : 84}>{copy('galleryH')}</Display>
          <div style={{ marginTop: 18 }}><Body>{copy('gallerySub')}</Body></div>
        </div>
      </Section>

      <Section viewport={viewport} style={{ paddingTop: 0 }}>
        <div style={{ columnCount: isMobile ? 2 : 3, columnGap: isMobile ? 12 : 20 }}>
          {gallery.map((g, i) => (
            <div
              key={i}
              onClick={() => setLightbox(g)}
              style={{ breakInside: 'avoid', marginBottom: isMobile ? 12 : 20, position: 'relative', cursor: 'pointer', overflow: 'hidden', background: c.sand, aspectRatio: g.ratio }}
            >
              <img
                src={g.src}
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: `transform ${theme.m.dur * 2}ms ${theme.m.ease}` }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.04)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
              />
              <div style={{ position: 'absolute', bottom: 12, left: 12, fontFamily: t.label, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#fff', mixBlendMode: 'overlay' }}>{g.caption}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 56, textAlign: 'center' }}>
          <Button variant="secondary">Load more</Button>
        </div>
      </Section>

      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(15,28,55,0.85)', zIndex: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, backdropFilter: 'blur(8px)' }}
        >
          <button onClick={() => setLightbox(null)} style={{ position: 'absolute', top: 24, right: 24, background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: 999, padding: 12, cursor: 'pointer', color: '#fff' }}>
            <MBIcon name="close" size={18} color="#fff"/>
          </button>
          <img src={lightbox.src} onClick={(e) => e.stopPropagation()} style={{ maxWidth: '90%', maxHeight: '85vh', objectFit: 'contain' }} alt=""/>
          <div style={{ position: 'absolute', bottom: 24, color: '#fff', fontFamily: t.label, fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase' }}>{lightbox.caption}</div>
        </div>
      )}

      <Footer viewport={viewport}/>
    </>
  );
}
