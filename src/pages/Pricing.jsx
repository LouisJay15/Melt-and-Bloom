import { useState } from 'react';
import { useMB } from '../store/MBProvider';
import { tiers } from '../data/products';
import Section from '../components/Section';
import Eyebrow from '../components/Eyebrow';
import Display from '../components/Display';
import Body from '../components/Body';
import MBIcon from '../components/MBIcon';
import Footer from '../components/Footer';

function FAQ({ q, a }) {
  const { theme } = useMB();
  const { c, t } = theme;
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderTop: `1px solid ${c.line}`, padding: '20px 0' }}>
      <button onClick={() => setOpen(!open)} style={{ background: 'none', border: 'none', cursor: 'pointer', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 0, textAlign: 'left' }}>
        <span style={{ fontFamily: t.display, fontStyle: t.displayItalic, fontSize: 22, color: c.navy }}>{q}</span>
        <span style={{ transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 200ms', color: c.slate }}>
          <MBIcon name="chevD" size={16}/>
        </span>
      </button>
      {open && <div style={{ marginTop: 12, paddingRight: 40 }}><Body size={15}>{a}</Body></div>}
    </div>
  );
}

function RitualBuilder({ viewport }) {
  const { theme } = useMB();
  const { c, t, d } = theme;
  const isMobile = viewport === 'mobile';
  const [vibes, setVibes] = useState(['Grounded']);
  const [rooms, setRooms] = useState(2);
  const allVibes = ['Grounded', 'Bright', 'Floral', 'Smoky', 'Cool', 'Sweet'];
  const toggleVibe = (v) => setVibes((s) => s.includes(v) ? s.filter((x) => x !== v) : [...s, v]);

  return (
    <section style={{ background: c.navy, color: '#fff', padding: `${isMobile ? d.section * 0.7 : d.section}px ${isMobile ? d.padX / 2 : d.padX}px` }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.2fr', gap: isMobile ? 32 : 64, alignItems: 'flex-start' }}>
          <div>
            <Eyebrow dark>Tell us about your home</Eyebrow>
            <Display dark size={isMobile ? 36 : 56}>Build your ritual.</Display>
            <Body dark style={{ marginTop: 20 }}>A two-minute version of our scent consult. We&rsquo;ll show three candles we think suit the way you live.</Body>
          </div>
          <div style={{ background: c.navyDeep, padding: 32, border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ fontFamily: t.label, fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: 14 }}>Pick your moods</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
              {allVibes.map((v) => {
                const on = vibes.includes(v);
                return (
                  <button key={v} onClick={() => toggleVibe(v)} style={{ padding: '8px 16px', borderRadius: 999, cursor: 'pointer', background: on ? c.ember : 'transparent', color: on ? c.navy : '#fff', border: `1px solid ${on ? c.ember : 'rgba(255,255,255,0.25)'}`, fontFamily: t.label, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600 }}>{v}</button>
                );
              })}
            </div>
            <div style={{ fontFamily: t.label, fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: 14 }}>Rooms with candles · {rooms}</div>
            <input type="range" min="1" max="5" value={rooms} onChange={(e) => setRooms(+e.target.value)} style={{ width: '100%', accentColor: c.ember }}/>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: t.body, fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 6 }}>
              <span>One nook</span><span>Whole home</span>
            </div>
            <div style={{ marginTop: 24, padding: 20, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontFamily: t.label, fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: 10 }}>We suggest</div>
              <div style={{ fontFamily: t.display, fontStyle: t.displayItalic, fontSize: 22, marginBottom: 4 }}>{vibes.includes('Smoky') ? 'Smoked Sandalwood' : vibes.includes('Floral') ? 'Midnight Jasmine' : 'Quiet Evening'}</div>
              <div style={{ fontFamily: t.body, fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>+ 2 complementary picks for the {rooms}-room layout</div>
            </div>
            <button style={{ marginTop: 20, width: '100%', padding: '14px 22px', background: c.ember, border: 'none', borderRadius: 999, cursor: 'pointer', fontFamily: t.label, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600, color: c.navy }}>See picks →</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Pricing({ viewport = 'desktop' }) {
  const { theme, go, copy } = useMB();
  const { c, t, d } = theme;
  const isMobile = viewport === 'mobile';
  const [picked, setPicked] = useState('sanctuary');

  return (
    <>
      <Section viewport={viewport} style={{ paddingBottom: isMobile ? 24 : 40 }}>
        <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto', paddingTop: isMobile ? 16 : 32 }}>
          <Eyebrow>The Ritual · Subscription box</Eyebrow>
          <Display size={isMobile ? 44 : 84}>{copy('pricingH')}</Display>
          <div style={{ marginTop: 18 }}><Body>{copy('pricingSub')}</Body></div>
        </div>
      </Section>

      <Section viewport={viewport} style={{ paddingTop: 0 }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? 16 : 24, alignItems: 'stretch' }}>
          {tiers.map((tier) => {
            const sel = picked === tier.id;
            return (
              <div key={tier.id} onClick={() => setPicked(tier.id)} style={{ position: 'relative', cursor: 'pointer', background: sel ? c.navy : '#fff', color: sel ? '#fff' : c.navy, border: `1px solid ${sel ? c.navy : c.line}`, padding: 36, display: 'flex', flexDirection: 'column', transform: sel && !isMobile ? 'translateY(-12px)' : 'translateY(0)', transition: `all ${theme.m.dur}ms ${theme.m.ease}`, boxShadow: sel ? '0 30px 60px rgba(15,28,55,0.18)' : 'none' }}>
                {tier.badge && <div style={{ position: 'absolute', top: -12, left: 28, background: c.ember, color: c.navy, fontFamily: t.label, fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', padding: '4px 12px', borderRadius: 999, fontWeight: 700 }}>{tier.badge}</div>}
                <div style={{ fontFamily: t.label, fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: sel ? 'rgba(255,255,255,0.6)' : c.slate, marginBottom: 12 }}>Tier · {tier.id.toUpperCase()}</div>
                <div style={{ fontFamily: t.display, fontStyle: t.displayItalic, fontSize: 36, lineHeight: 1.1, marginBottom: 12 }}>{tier.name}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 16 }}>
                  <span style={{ fontFamily: t.display, fontSize: 40, lineHeight: 1, fontWeight: 500 }}>R{tier.price}</span>
                  <span style={{ fontFamily: t.body, fontSize: 14, opacity: 0.6 }}>/ month</span>
                </div>
                <Body dark={sel} size={14} style={{ marginBottom: 24, color: sel ? 'rgba(255,255,255,0.7)' : c.inkDim }}>{tier.lede}</Body>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
                  {tier.items.map((x, i) => (
                    <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'baseline', fontFamily: t.body, fontSize: 14 }}>
                      <MBIcon name="check" size={14} color={sel ? '#fff' : c.navy}/> <span>{x}</span>
                    </div>
                  ))}
                </div>
                <button style={{ padding: '14px 22px', borderRadius: 999, cursor: 'pointer', background: sel ? c.ember : 'transparent', color: c.navy, border: `1px solid ${sel ? c.ember : c.navy}`, fontFamily: t.label, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600 }}>
                  {sel ? 'Continue with this plan' : 'Choose plan'}
                </button>
              </div>
            );
          })}
        </div>
      </Section>

      <RitualBuilder viewport={viewport}/>

      <Section viewport={viewport} style={{ background: c.paper }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <Eyebrow>How a ritual works</Eyebrow>
          <Display size={isMobile ? 32 : 48}>Three steps. Then a quiet box arrives every month.</Display>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? 24 : 48 }}>
          {[
            ['Choose a tier',       'Essential, Sanctuary, or Ritual. Switch any time.'],
            ['Tell us your rooms',  'Two minutes. Where the candles live and how long you burn them for.'],
            ['Settle in',           'Your box arrives the first week of every month. Skip, pause, or cancel anytime.'],
          ].map(([h, b], i) => (
            <div key={i}>
              <div style={{ fontFamily: t.display, fontStyle: t.displayItalic, fontSize: 64, color: c.slate, marginBottom: 12, opacity: 0.4 }}>0{i + 1}</div>
              <div style={{ fontFamily: t.display, fontStyle: t.displayItalic, fontSize: 24, color: c.navy, marginBottom: 10 }}>{h}</div>
              <Body>{b}</Body>
            </div>
          ))}
        </div>
      </Section>

      <Section viewport={viewport} narrow>
        <Eyebrow>FAQ</Eyebrow>
        <Display size={isMobile ? 32 : 44}>Quietly asked questions.</Display>
        <div style={{ marginTop: 32 }}>
          {[
            ['Can I skip a month?',            'Yes — anytime, up until the 25th of the prior month. Your subscription resumes the following cycle.'],
            ['What if I don’t like a scent?', 'Tell us and we’ll swap it on the next box, or send a replacement if it was truly off.'],
            ['Can I gift a subscription?',     'Yes. Choose 1, 3, 6, or 12 months. We’ll send a card with the first box.'],
            ['Where do you ship?',             'South Africa, Namibia, Botswana, Lesotho, eSwatini. International coming end of 2026.'],
          ].map(([q, a], i) => <FAQ key={i} q={q} a={a}/>)}
        </div>
      </Section>

      <Footer viewport={viewport}/>
    </>
  );
}
