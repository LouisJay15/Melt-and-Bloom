import { useState } from 'react';
import { useMB } from '../store/MBProvider';
import Section from '../components/Section';
import Eyebrow from '../components/Eyebrow';
import Display from '../components/Display';
import Body from '../components/Body';
import Button from '../components/Button';
import MBIcon from '../components/MBIcon';
import Field from '../components/Field';
import Footer from '../components/Footer';

function InfoBlock({ title, lines }) {
  const { theme } = useMB();
  const { c, t } = theme;
  return (
    <div style={{ borderLeft: `1px solid ${c.line}`, paddingLeft: 18 }}>
      <div style={{ fontFamily: t.label, fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: c.slate, marginBottom: 8 }}>{title}</div>
      <div style={{ fontFamily: t.body, fontSize: 15, color: c.navy, lineHeight: 1.7 }}>
        {lines.map((l, i) => <div key={i}>{l}</div>)}
      </div>
    </div>
  );
}

export default function Contact({ viewport = 'desktop' }) {
  const { theme, copy } = useMB();
  const { c, t, d } = theme;
  const isMobile = viewport === 'mobile';
  const [sent, setSent] = useState(false);

  return (
    <>
      <Section viewport={viewport} style={{ paddingBottom: isMobile ? 32 : 56 }}>
        <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto', paddingTop: isMobile ? 16 : 32 }}>
          <Eyebrow>Hello, hello</Eyebrow>
          <Display size={isMobile ? 40 : 80}>{copy('contactH')}</Display>
          <div style={{ marginTop: 18 }}><Body>{copy('contactSub')}</Body></div>
        </div>
      </Section>

      <Section viewport={viewport} style={{ paddingTop: 0 }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1fr', gap: isMobile ? 32 : 56, alignItems: 'flex-start' }}>
          <div style={{ background: '#fff', border: `1px solid ${c.line}`, padding: isMobile ? 24 : 36 }}>
            {!sent ? (
              <>
                <div style={{ fontFamily: t.display, fontStyle: t.displayItalic, fontSize: 28, color: c.navy, marginBottom: 24 }}>Send us a note</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <Field label="Name"/><Field label="Email"/>
                  </div>
                  <div>
                    <span style={{ fontFamily: t.body, fontSize: 12, color: c.slate, display: 'block', marginBottom: 8 }}>About</span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {['Product question', 'Wholesale', 'Custom blend', 'Press', 'Other'].map((x, i) => (
                        <button key={x} style={{ padding: '8px 14px', borderRadius: 999, border: `1px solid ${i === 0 ? c.navy : c.line}`, background: i === 0 ? c.paper : 'transparent', color: c.navy, fontFamily: t.label, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', cursor: 'pointer', fontWeight: 600 }}>{x}</button>
                      ))}
                    </div>
                  </div>
                  <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <span style={{ fontFamily: t.body, fontSize: 12, color: c.slate }}>Message</span>
                    <textarea placeholder="Tell us about your rooms, your project, anything." style={{ width: '100%', minHeight: 120, padding: 14, border: `1px solid ${c.line}`, borderRadius: 4, fontFamily: t.body, fontSize: 14, background: '#fff', outline: 'none', resize: 'vertical', color: c.navy }}/>
                  </label>
                  <Button variant="primary" size="lg" full onClick={() => setSent(true)}>Send the note</Button>
                </div>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div style={{ width: 64, height: 64, borderRadius: 999, border: `1px solid ${c.navy}`, margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MBIcon name="check" size={28}/>
                </div>
                <Display size={28}>Sent.</Display>
                <Body style={{ marginTop: 12 }}>We read everything &mdash; typically reply within two working days.</Body>
              </div>
            )}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <InfoBlock title="Studio" lines={['11 Coventry Road, Bryanston', 'Sandton · 2021', 'Mon–Sat · By Appointment']}/>
            <InfoBlock title="Email"  lines={['hello@meltandbloom.co.za', 'wholesale@meltandbloom.co.za']}/>
            <InfoBlock title="Phone"  lines={['083 600 8725', 'Mon–Sat · By Appointment']}/>
            <InfoBlock title="Follow" lines={['Instagram · @meltandbloom', 'Journal · /journal']}/>
          </div>
        </div>
      </Section>

<Footer viewport={viewport}/>
    </>
  );
}
