// About, Gallery, Pricing, Contact
const { useState: pi_useState, useEffect: pi_useEffect } = React;

// ─── ABOUT ──────────────────────────────────────────────────────────
function About({ viewport = 'desktop' }) {
  const { theme, go } = useMB();
  const { c, t, d } = theme;
  const isMobile = viewport === 'mobile';
  return (
    <>
      {/* editorial hero */}
      <section style={{ background: c.paper, padding: `${isMobile ? 80 : 140}px ${isMobile ? d.padX/2 : d.padX}px ${isMobile ? 48 : 100}px` }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', textAlign: 'center' }}>
          <Eyebrow>Est. 2025</Eyebrow>
          <Display size={isMobile ? 44 : 96}>{copy('aboutH')}</Display>
          <div style={{ maxWidth: 620, margin: isMobile ? '24px auto 0' : '32px auto 0' }}>
            <Body size={isMobile ? 17 : 19}>{copy('aboutSub')}</Body>
          </div>
        </div>
      </section>

      {/* big lifestyle image */}
      <section style={{ padding: `0 ${isMobile ? d.padX/2 : d.padX}px` }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', aspectRatio: isMobile ? '4/5' : '21/9', overflow: 'hidden', background: c.sand }}>
          <img src={window.MB.IMG.pouring} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Pouring"/>
        </div>
      </section>

      {/* values */}
      <Section viewport={viewport}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.2fr', gap: isMobile ? 32 : 80 }}>
          <div>
            <Eyebrow>Three things</Eyebrow>
            <Display size={isMobile ? 36 : 56}>We don&rsquo;t compromise on.</Display>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {[
              ['01', 'Wax', 'A blend of coconut and soy. Cleaner burn, better scent throw, no paraffin. Sourced from Stellenbosch.'],
              ['02', 'Fragrance', 'IFRA-certified oils, blended in-house. Heavy on the heart, light on the synthetics. No phthalates, ever.'],
              ['03', 'Vessels', 'Hand-finished ceramic or upcycled glass. We send a return label with every order — refill kits coming late 2026.'],
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

      {/* timeline */}
      <section style={{ background: c.navy, color: '#fff', padding: `${isMobile ? d.section * 0.7 : d.section}px ${isMobile ? d.padX/2 : d.padX}px` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <Eyebrow dark>The slow way</Eyebrow>
          <Display dark size={isMobile ? 36 : 56}>From wax to wick,<br/>about 14 days.</Display>
          <div style={{ marginTop: 56, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(5, 1fr)', gap: isMobile ? 24 : 32 }}>
            {[
              ['Source', 'Wax from Stellenbosch, oils from blender partners in France and Grasse.'],
              ['Blend', 'We test a new fragrance for 4–6 weeks before it joins the range.'],
              ['Pour', 'Hand-poured in 60-candle batches. Every batch numbered.'],
              ['Cure', 'Cure for 7 days minimum so the wax marries with the fragrance.'],
              ['Ship', 'Hand-packed in recycled wool insulation. Tracked from our door to yours.'],
            ].map(([h, b], i) => (
              <div key={i}>
                <div style={{ fontFamily: t.display, fontStyle: t.displayItalic, fontSize: 36, color: '#fff', marginBottom: 12 }}>{i+1}</div>
                <div style={{ fontFamily: t.label, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#fff', marginBottom: 8 }}>{h}</div>
                <Body dark size={13}>{b}</Body>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* founders */}
      <Section viewport={viewport}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 32 : 80, alignItems: 'center' }}>
          <div style={{ aspectRatio: '4/5', overflow: 'hidden', background: c.sand }}>
            <img src={window.MB.IMG.crafting} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Studio"/>
          </div>
          <div>
            <Eyebrow>The people</Eyebrow>
            <Display size={isMobile ? 36 : 56}></Display>
            <Body style={{ marginTop: 24 }}>
              We met working at a perfumery in Cape Town, found we both kept reaching for the same scents, and started Melt &amp; Bloom out of a flat in Tamboerskloof in 2021. The studio moved to Loop Street last year. We pour everything ourselves on Tuesdays, Wednesdays, and Thursdays.
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

// ─── GALLERY ────────────────────────────────────────────────────────
function Gallery({ viewport = 'desktop' }) {
  const { theme } = useMB();
  const { c, t, d } = theme;
  const isMobile = viewport === 'mobile';
  const [lightbox, setLightbox] = pi_useState(null);
  const items = window.MB.gallery;
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
        <div style={{
          columnCount: isMobile ? 2 : 3, columnGap: isMobile ? 12 : 20,
        }}>
          {items.map((g, i) => (
            <div key={i} onClick={() => setLightbox(g)} style={{ breakInside: 'avoid', marginBottom: isMobile ? 12 : 20, position: 'relative', cursor: 'pointer', overflow: 'hidden', background: c.sand, aspectRatio: g.ratio }}>
              <img src={g.src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: `transform ${theme.m.dur * 2}ms ${theme.m.ease}` }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.04)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}/>
              <div style={{ position: 'absolute', bottom: 12, left: 12, fontFamily: t.label, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#fff', mixBlendMode: 'overlay' }}>{g.caption}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 56, textAlign: 'center' }}>
          <Button variant="secondary">Load more</Button>
        </div>
      </Section>

      {/* lightbox */}
      {lightbox && (
        <div onClick={() => setLightbox(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(15,28,55,0.85)', zIndex: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, backdropFilter: 'blur(8px)' }}>
          <button onClick={() => setLightbox(null)} style={{ position: 'absolute', top: 24, right: 24, background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: 999, padding: 12, cursor: 'pointer', color: '#fff' }}><MBIcon name="close" size={18} color="#fff"/></button>
          <img src={lightbox.src} onClick={(e) => e.stopPropagation()} style={{ maxWidth: '90%', maxHeight: '85vh', objectFit: 'contain' }}/>
          <div style={{ position: 'absolute', bottom: 24, color: '#fff', fontFamily: t.label, fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase' }}>{lightbox.caption}</div>
        </div>
      )}

      <Footer viewport={viewport}/>
    </>
  );
}

// ─── PRICING ────────────────────────────────────────────────────────
function Pricing({ viewport = 'desktop' }) {
  const { theme, go, addToCart, setCartOpen } = useMB();
  const { c, t, d } = theme;
  const isMobile = viewport === 'mobile';
  const tiers = window.MB.tiers;
  const [picked, setPicked] = pi_useState('sanctuary');

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
              <div key={tier.id} onClick={() => setPicked(tier.id)} style={{
                position: 'relative', cursor: 'pointer',
                background: sel ? c.navy : '#fff', color: sel ? '#fff' : c.navy,
                border: `1px solid ${sel ? c.navy : c.line}`,
                padding: 36, display: 'flex', flexDirection: 'column',
                transform: sel && !isMobile ? 'translateY(-12px)' : 'translateY(0)',
                transition: `all ${theme.m.dur}ms ${theme.m.ease}`,
                boxShadow: sel ? '0 30px 60px rgba(15,28,55,0.18)' : '0 0 0 transparent',
              }}>
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
                <button style={{
                  padding: '14px 22px', borderRadius: 999, cursor: 'pointer',
                  background: sel ? c.ember : 'transparent', color: c.navy,
                  border: `1px solid ${sel ? c.ember : c.navy}`,
                  fontFamily: t.label, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600,
                }}>{sel ? 'Continue with this plan' : 'Choose plan'}</button>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Ritual builder — novel */}
      <RitualBuilder viewport={viewport}/>

      {/* How it works */}
      <Section viewport={viewport} style={{ background: c.paper }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <Eyebrow>How a ritual works</Eyebrow>
          <Display size={isMobile ? 32 : 48}>Three steps. Then a quiet box arrives every month.</Display>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? 24 : 48 }}>
          {[
            ['Choose a tier', 'Essential, Sanctuary, or Ritual. Switch any time.'],
            ['Tell us your rooms', 'Two minutes. Where the candles live and how long you burn them for.'],
            ['Settle in', 'Your box arrives the first week of every month. Skip, pause, or cancel anytime.'],
          ].map(([h, b], i) => (
            <div key={i}>
              <div style={{ fontFamily: t.display, fontStyle: t.displayItalic, fontSize: 64, color: c.slate, marginBottom: 12, opacity: 0.4 }}>0{i+1}</div>
              <div style={{ fontFamily: t.display, fontStyle: t.displayItalic, fontSize: 24, color: c.navy, marginBottom: 10 }}>{h}</div>
              <Body>{b}</Body>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section viewport={viewport} narrow>
        <Eyebrow>FAQ</Eyebrow>
        <Display size={isMobile ? 32 : 44}>Quietly asked questions.</Display>
        <div style={{ marginTop: 32 }}>
          {[
            ['Can I skip a month?', 'Yes — anytime, up until the 25th of the prior month. Your subscription resumes the following cycle.'],
            ['What if I don\u2019t like a scent?', 'Tell us and we\u2019ll swap it on the next box, or send a replacement if it was truly off.'],
            ['Can I gift a subscription?', 'Yes. Choose 1, 3, 6, or 12 months. We\u2019ll send a card with the first box.'],
            ['Where do you ship?', 'South Africa, Namibia, Botswana, Lesotho, eSwatini. International coming end of 2026.'],
          ].map(([q, a], i) => <FAQ key={i} q={q} a={a}/>)}
        </div>
      </Section>

      <Footer viewport={viewport}/>
    </>
  );
}

function RitualBuilder({ viewport }) {
  const { theme } = useMB();
  const { c, t, d } = theme;
  const isMobile = viewport === 'mobile';
  const [vibes, setVibes] = pi_useState(['Grounded']);
  const [rooms, setRooms] = pi_useState(2);
  const allVibes = ['Grounded', 'Bright', 'Floral', 'Smoky', 'Cool', 'Sweet'];
  const toggleVibe = (v) => setVibes((s) => s.includes(v) ? s.filter((x) => x !== v) : [...s, v]);

  return (
    <section style={{ background: c.navy, color: '#fff', padding: `${isMobile ? d.section * 0.7 : d.section}px ${isMobile ? d.padX/2 : d.padX}px` }}>
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
                  <button key={v} onClick={() => toggleVibe(v)} style={{
                    padding: '8px 16px', borderRadius: 999, cursor: 'pointer',
                    background: on ? c.ember : 'transparent', color: on ? c.navy : '#fff',
                    border: `1px solid ${on ? c.ember : 'rgba(255,255,255,0.25)'}`,
                    fontFamily: t.label, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600,
                  }}>{v}</button>
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

function FAQ({ q, a }) {
  const { theme } = useMB();
  const { c, t } = theme;
  const [open, setOpen] = pi_useState(false);
  return (
    <div style={{ borderTop: `1px solid ${c.line}`, padding: '20px 0' }}>
      <button onClick={() => setOpen(!open)} style={{ background: 'none', border: 'none', cursor: 'pointer', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 0, textAlign: 'left' }}>
        <span style={{ fontFamily: t.display, fontStyle: t.displayItalic, fontSize: 22, color: c.navy }}>{q}</span>
        <span style={{ transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 200ms', color: c.slate }}><MBIcon name="chevD" size={16}/></span>
      </button>
      {open && <div style={{ marginTop: 12, paddingRight: 40 }}><Body size={15}>{a}</Body></div>}
    </div>
  );
}

// ─── CONTACT ────────────────────────────────────────────────────────
function Contact({ viewport = 'desktop' }) {
  const { theme } = useMB();
  const { c, t, d } = theme;
  const isMobile = viewport === 'mobile';
  const [sent, setSent] = pi_useState(false);
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
          {/* form */}
          <div style={{ background: '#fff', border: `1px solid ${c.line}`, padding: isMobile ? 24 : 36 }}>
            {!sent ? (
              <>
                <div style={{ fontFamily: t.display, fontStyle: t.displayItalic, fontSize: 28, color: c.navy, marginBottom: 24 }}>Send us a note</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <Field label="Name"/>
                    <Field label="Email"/>
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
          {/* info column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <InfoBlock title="Studio" lines={['41 Bree Street', 'Cape Town · 8000', 'By appointment, Tue–Thu']}/>
            <InfoBlock title="Email" lines={['hello@meltandbloom.co.za', 'wholesale@meltandbloom.co.za']}/>
            <InfoBlock title="Phone" lines={['+27 21 555 0114', 'Mon–Fri · 09:00–17:00 SAST']}/>
            <InfoBlock title="Follow" lines={['Instagram · @meltandbloom', 'Journal · /journal']}/>
          </div>
        </div>
      </Section>

      {/* map placeholder */}
      <Section viewport={viewport} style={{ paddingTop: 0 }}>
        <div style={{ position: 'relative', aspectRatio: isMobile ? '4/3' : '21/8', background: c.sand, overflow: 'hidden', border: `1px solid ${c.line}` }}>
          {/* faux topographic map */}
          <svg viewBox="0 0 800 240" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            {[...Array(12)].map((_, i) => (
              <path key={i} d={`M-50 ${30 + i * 18} Q 200 ${10 + i * 18}, 400 ${40 + i * 18} T 850 ${20 + i * 18}`} stroke={c.navy} strokeWidth="0.6" fill="none" opacity={0.18}/>
            ))}
          </svg>
          <div style={{ position: 'absolute', left: '40%', top: '46%', width: 12, height: 12, borderRadius: 999, background: c.ember, boxShadow: '0 0 0 6px rgba(255,180,120,0.25)' }}/>
          <div style={{ position: 'absolute', left: '42%', top: '46%', fontFamily: t.label, fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: c.navy, transform: 'translateY(-20px)' }}>Studio · 41 Bree St</div>
        </div>
      </Section>

      <Footer viewport={viewport}/>
    </>
  );
}

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

Object.assign(window, { About, Gallery, Pricing, Contact });
