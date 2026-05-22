import { useMB } from '../store/MBProvider';
import { IMG } from '../data/products';
import Section from '../components/Section';
import Eyebrow from '../components/Eyebrow';
import Display from '../components/Display';
import Body from '../components/Body';
import Button from '../components/Button';
import Footer from '../components/Footer';

export default function About({ viewport = 'desktop' }) {
  const { theme, go, copy } = useMB();
  const { c, t, d } = theme;
  const isMobile = viewport === 'mobile';

  return (
    <>
      <section style={{ background: c.paper, padding: `${isMobile ? 80 : 140}px ${isMobile ? d.padX / 2 : d.padX}px ${isMobile ? 48 : 100}px` }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', textAlign: 'center' }}>
          <Eyebrow>Est. 2025</Eyebrow>
          <Display size={isMobile ? 44 : 96}>{copy('aboutH')}</Display>
          <div style={{ maxWidth: 620, margin: isMobile ? '24px auto 0' : '32px auto 0' }}>
            <Body size={isMobile ? 17 : 19}>{copy('aboutSub')}</Body>
          </div>
        </div>
      </section>

      <section style={{ padding: `0 ${isMobile ? d.padX / 2 : d.padX}px` }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', aspectRatio: isMobile ? '4/5' : '21/9', overflow: 'hidden', background: c.sand }}>
          <img src={IMG.pouring} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Pouring"/>
        </div>
      </section>

      <Section viewport={viewport}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.2fr', gap: isMobile ? 32 : 80 }}>
          <div>
            <Eyebrow>Three things</Eyebrow>
            <Display size={isMobile ? 36 : 56}>We don&rsquo;t compromise on.</Display>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {[
              ['01', 'Wax',       'A blend of coconut and soy. Cleaner burn, better scent throw, no paraffin. Sourced from Stellenbosch.'],
              ['02', 'Fragrance', 'IFRA-certified oils, blended in-house. Heavy on the heart, light on the synthetics. No phthalates, ever.'],
              ['03', 'Vessels',   'Hand-finished ceramic or upcycled glass. We send a return label with every order — refill kits coming late 2026.'],
            ].map(([n, h, b]) => (
              <div key={n} style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: 18, padding: '24px 0', borderTop: `1px solid ${c.line}` }}>
                <div style={{ fontFamily: t.label, fontSize: 11, letterSpacing: '0.2em', color: c.slate }}>{n}</div>
                <div>
                  <div style={{ fontFamily: t.display, fontStyle: t.displayItalic, fontSize: 26, color: c.navy, marginBottom: 8 }}>{h}</div>
                  <Body>{b}</Body>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <section style={{ background: c.navy, color: '#fff', padding: `${isMobile ? d.section * 0.7 : d.section}px ${isMobile ? d.padX / 2 : d.padX}px` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <Eyebrow dark>The slow way</Eyebrow>
          <Display dark size={isMobile ? 36 : 56}>From wax to wick,<br/>about 14 days.</Display>
          <div style={{ marginTop: 56, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(5, 1fr)', gap: isMobile ? 24 : 32 }}>
            {[
              ['Source', 'Wax from Stellenbosch, oils from blender partners in France and Grasse.'],
              ['Blend',  'We test a new fragrance for 4–6 weeks before it joins the range.'],
              ['Pour',   'Hand-poured in 60-candle batches. Every batch numbered.'],
              ['Cure',   'Cure for 7 days minimum so the wax marries with the fragrance.'],
              ['Ship',   'Hand-packed in recycled wool insulation. Tracked from our door to yours.'],
            ].map(([h, b], i) => (
              <div key={i}>
                <div style={{ fontFamily: t.display, fontStyle: t.displayItalic, fontSize: 36, color: '#fff', marginBottom: 12 }}>{i + 1}</div>
                <div style={{ fontFamily: t.label, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#fff', marginBottom: 8 }}>{h}</div>
                <Body dark size={13}>{b}</Body>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Section viewport={viewport}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 32 : 80, alignItems: 'center' }}>
          <div style={{ aspectRatio: '4/5', overflow: 'hidden', background: c.sand }}>
            <img src={IMG.crafting} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Studio"/>
          </div>
          <div>
            <Eyebrow>The people</Eyebrow>
            <Display size={isMobile ? 36 : 56}></Display>
            <Body style={{ marginTop: 24 }}>
              We met working at a perfumery in Johannesburg, found we both kept reaching for the same scents, and started Melt &amp; Bloom out of a small space in Sandton in 2021. The studio moved to Coventry Road, Bryanston last year. We pour everything ourselves on Tuesdays, Wednesdays, and Thursdays.
            </Body>
            <Body style={{ marginTop: 16 }}>
              We don&rsquo;t outsource, white-label, or use scent libraries. Every fragrance is something we&rsquo;ve worked on for months.
            </Body>
            <div style={{ marginTop: 32 }}><Button variant="secondary" onClick={() => go('contact')}>Visit the studio</Button></div>
          </div>
        </div>
      </Section>

      <Footer viewport={viewport}/>
    </>
  );
}
