import { useMB } from '../store/MBProvider';
import Logo from './Logo';
import MBIcon from './MBIcon';

function FooterCol({ title, links, go, t }) {
  return (
    <div>
      <h4 style={{ fontFamily: t.label, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 16, color: 'rgba(255,255,255,0.7)' }}>{title}</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {links.map(([label, route]) => (
          <a
            key={label}
            onClick={() => go(route)}
            style={{ fontFamily: t.body, fontSize: 14, color: 'rgba(255,255,255,0.7)', cursor: 'pointer', transition: 'color 200ms' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
          >
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function Footer({ viewport, flush = false }) {
  const { theme, go, viewport: ctxVP } = useMB();
  const { c, t, d } = theme;
  const isMobile = (viewport || ctxVP) === 'mobile';

  return (
    <footer style={{
      background: c.navy, color: '#fff',
      padding: isMobile ? `48px ${d.padX / 2}px 32px` : `${d.section}px ${d.padX}px ${d.section / 2}px`,
      marginTop: flush ? 0 : d.section,
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.4fr 1fr 1fr 1.2fr', gap: isMobile ? 36 : 48 }}>
        <div>
          <div style={{ marginBottom: 20 }}><Logo size={isMobile ? 72 : 96} variant="light"/></div>
          <p style={{ fontFamily: t.body, fontSize: 14, lineHeight: 1.7, color: 'rgba(255,255,255,0.6)', maxWidth: 320 }}>
            Hand-poured candles and home scent. Made in Sandton, in small batches, on purpose.
          </p>
        </div>
        <FooterCol title="Shop"   links={[['All scents', 'products'], ['Subscriptions', 'pricing'], ['Discovery set', 'products'], ['Wholesale', 'contact']]} go={go} t={t}/>
        <FooterCol title="Studio" links={[['Our story', 'about'], ['Gallery', 'gallery'], ['Journal', 'about'], ['Contact', 'contact']]} go={go} t={t}/>
        <div>
          <h4 style={{ fontFamily: t.label, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 16, color: 'rgba(255,255,255,0.7)' }}>Newsletter</h4>
          <p style={{ fontFamily: t.body, fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 14, lineHeight: 1.6 }}>One mail a month. Seasonal scents, slow reading.</p>
          <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: 4 }}>
            <input placeholder="Email address" style={{ flex: 1, background: 'transparent', border: 'none', color: '#fff', fontFamily: t.body, fontSize: 14, padding: '8px 0', outline: 'none' }}/>
            <button style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: 4 }}>
              <MBIcon name="arrow" size={18}/>
            </button>
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 1280, margin: '40px auto 0', paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.12)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, fontFamily: t.body, fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
        <span>© 2026 Melt &amp; Bloom · South Africa</span>
        <span>Crafted for mindful living</span>
      </div>
    </footer>
  );
}
