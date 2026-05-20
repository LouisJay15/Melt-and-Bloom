// Home, Products, PDP. Exposes Home, Products, PDP via window.
const { useState: ps_useState, useEffect: ps_useEffect, useMemo: ps_useMemo, useRef: ps_useRef } = React;

// ─── HOME ───────────────────────────────────────────────────────────
function Home({ viewport = 'desktop' }) {
  const { theme, go, addToCart } = useMB();
  const { c, t, m, d, tweaks } = theme;
  const isMobile = viewport === 'mobile';
  const featured = window.MB.products.slice(0, 3);

  // hero variants
  const Hero = HeroVariants[tweaks.heroLayout] || HeroVariants.cinematic;

  return (
    <>
      <Hero viewport={viewport}/>

      {/* Featured strip */}
      <Section viewport={viewport}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexDirection: isMobile ? 'column' : 'row', gap: 16, marginBottom: isMobile ? 32 : 56 }}>
          <div style={{ maxWidth: 540 }}>
            <Eyebrow>The Range · Hand-poured in small batches</Eyebrow>
            <Display size={isMobile ? 34 : 52}>Curated scents{isMobile ? ' ' : <br/>}for slow rooms.</Display>
          </div>
          <a onClick={() => go('products')} style={{ cursor: 'pointer', fontFamily: t.label, fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: c.navy, borderBottom: `1px solid ${c.navy}`, paddingBottom: 4, alignSelf: isMobile ? 'flex-start' : 'flex-end' }}>
            See all 10 →
          </a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? 48 : 64 }}>
          {featured.map((p) => <ProductCard key={p.id} p={p} onClick={() => go('pdp', { id: p.id })} viewport={viewport}/>)}
        </div>
      </Section>

      {/* Scent finder strip — novel feature */}
      <ScentFinderTeaser viewport={viewport}/>

      {/* Craft story split */}
      <CraftStory viewport={viewport}/>

      {/* Subscribe CTA */}
      <SubscribeCTA viewport={viewport}/>

      <Footer viewport={viewport}/>
    </>
  );
}

const HeroVariants = {
  cinematic({ viewport }) {
    const { theme, go } = useMB();
    const { c, t, d } = theme;
    const isMobile = viewport === 'mobile';
    return (
      <section style={{ position: 'relative', minHeight: isMobile ? 580 : 720, overflow: 'hidden', background: c.paper }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img src={window.MB.IMG.hero} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85, filter: 'saturate(0.95) contrast(1.02)' }} alt="Candle in warm light"/>
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, rgba(246,241,234,0.15) 0%, rgba(246,241,234,0.6) 70%, ${c.paper} 100%)` }}/>
        </div>
        <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: `${isMobile ? 120 : 180}px ${isMobile ? d.padX/2 : d.padX}px ${isMobile ? 60 : 100}px`, textAlign: isMobile ? 'left' : 'center' }}>
          <Eyebrow>Edition 04 · Late autumn</Eyebrow>
          <Display size={isMobile ? 44 : 86}>{copy('heroH')}</Display>
          <div style={{ maxWidth: 560, margin: isMobile ? '24px 0 0' : '32px auto 0' }}>
            <Body size={isMobile ? 16 : 18}>{copy('heroSub')}</Body>
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: isMobile ? 32 : 44, justifyContent: isMobile ? 'flex-start' : 'center', flexWrap: 'wrap' }}>
            <Button variant="primary" onClick={() => go('products')}>{copy('shopCta')}</Button>
            <Button variant="secondary" onClick={() => go('pricing')}>Start a ritual</Button>
          </div>
        </div>
        {/* tiny live "now burning" cue */}
        <NowBurning isMobile={isMobile}/>
      </section>
    );
  },

  split({ viewport }) {
    const { theme, go } = useMB();
    const { c, t, d } = theme;
    const isMobile = viewport === 'mobile';
    return (
      <section style={{ background: c.paper, paddingTop: isMobile ? 24 : 48 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: `0 ${isMobile ? d.padX/2 : d.padX}px`, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.1fr 1fr', gap: isMobile ? 32 : 64, alignItems: 'center' }}>
          <div style={{ paddingTop: isMobile ? 32 : 64, paddingBottom: isMobile ? 16 : 64 }}>
            <Eyebrow>Edition 04 · Late autumn</Eyebrow>
            <Display size={isMobile ? 44 : 84} style={{ lineHeight: 0.95 }}>{copy('heroH')}</Display>
            <div style={{ marginTop: 28, maxWidth: 480 }}><Body size={17}>{copy('heroSub')}</Body></div>
            <div style={{ display: 'flex', gap: 12, marginTop: 36, flexWrap: 'wrap' }}>
              <Button variant="primary" onClick={() => go('products')}>{copy('shopCta')}</Button>
              <Button variant="ghost" onClick={() => go('about')}>Our story →</Button>
            </div>
            <div style={{ marginTop: 48, display: 'flex', gap: 32, fontFamily: t.label, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: c.slate }}>
              <span>Coconut + soy</span><span>48 hr burn</span><span>Cape Town</span>
            </div>
          </div>
          <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden' }}>
            <img src={window.MB.IMG.hero} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt=""/>
            <div style={{ position: 'absolute', bottom: 16, left: 16, right: 16, background: 'rgba(15,28,55,0.7)', backdropFilter: 'blur(6px)', padding: '12px 16px', borderRadius: 4, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: t.body, fontSize: 13 }}>
              <span style={{ fontFamily: t.display, fontStyle: t.displayItalic, fontSize: 18 }}>Midnight Jasmine</span>
              <span style={{ fontFamily: t.label, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase' }}>New →</span>
            </div>
          </div>
        </div>
      </section>
    );
  },

  typeled({ viewport }) {
    const { theme, go } = useMB();
    const { c, t, d } = theme;
    const isMobile = viewport === 'mobile';
    return (
      <section style={{ background: c.paper, position: 'relative' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: `${isMobile ? 80 : 140}px ${isMobile ? d.padX/2 : d.padX}px ${isMobile ? 40 : 80}px` }}>
          <Eyebrow>Melt &amp; Bloom · Edition 04</Eyebrow>
          <div style={{ fontFamily: t.display, fontStyle: t.displayItalic, fontSize: isMobile ? 56 : 140, lineHeight: 0.92, color: c.navy, letterSpacing: t.kerning }}>
            Home,<br/>
            <span style={{ color: c.slate }}>Space</span><br/>
            and Body.
          </div>
          <div style={{ marginTop: 40, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr', gap: 24, alignItems: 'end' }}>
            <Body size={17} style={{ maxWidth: 380 }}>{copy('heroSub')}</Body>
            <div></div>
            <div style={{ display: 'flex', gap: 12, justifyContent: isMobile ? 'flex-start' : 'flex-end', flexWrap: 'wrap' }}>
              <Button variant="primary" onClick={() => go('products')}>{copy('shopCta')}</Button>
              <Button variant="ghost" onClick={() => go('pricing')}>Subscribe →</Button>
            </div>
          </div>
        </div>
        <div style={{ borderTop: `1px solid ${c.line}`, padding: `16px ${isMobile ? d.padX/2 : d.padX}px`, display: 'flex', justifyContent: 'space-between', fontFamily: t.label, fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: c.slate }}>
          <span>01 · Floral</span><span>02 · Woody</span>{!isMobile && <span>03 · Fresh</span>}<span>04 · Warm</span>
        </div>
      </section>
    );
  },
};

function NowBurning({ isMobile }) {
  const { theme } = useMB();
  const { c, t } = theme;
  return (
    <div style={{ position: 'absolute', bottom: isMobile ? 20 : 32, left: isMobile ? 20 : 40, background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(10px)', border: `1px solid ${c.line}`, borderRadius: 999, padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 10, fontFamily: t.label, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: c.navy }}>
      <span style={{ position: 'relative', width: 6, height: 6 }}>
        <span style={{ position: 'absolute', inset: 0, background: c.ember, borderRadius: 999, animation: 'mb-pulse 2.4s ease-in-out infinite' }}/>
      </span>
      Now burning · Smoked Sandalwood
    </div>
  );
}

function ScentFinderTeaser({ viewport }) {
  const { theme, go } = useMB();
  const { c, t, d } = theme;
  const isMobile = viewport === 'mobile';
  return (
    <section style={{ background: c.sand, padding: `${isMobile ? d.section * 0.6 : d.section}px ${isMobile ? d.padX/2 : d.padX}px` }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.3fr 1fr', gap: isMobile ? 32 : 80, alignItems: 'center' }}>
        <div>
          <Eyebrow>Two minutes</Eyebrow>
          <Display size={isMobile ? 36 : 56}>Find your scent.</Display>
          <Body style={{ marginTop: 20, maxWidth: 480 }}>Six quick questions about your room, your hours, and what you reach for. We&rsquo;ll recommend three candles to start.</Body>
          <div style={{ marginTop: 28 }}><Button variant="primary" onClick={() => go('products')}>Start the finder</Button></div>
        </div>
        <ConstellationDecor/>
      </div>
    </section>
  );
}

function ConstellationDecor() {
  const { theme } = useMB();
  const { c, t } = theme;
  const families = [
    { label: 'Floral', x: 20, y: 30 },
    { label: 'Woody', x: 70, y: 40 },
    { label: 'Fresh', x: 35, y: 70 },
    { label: 'Warm', x: 80, y: 80 },
  ];
  return (
    <div style={{ position: 'relative', aspectRatio: '1/1', maxWidth: 380, width: '100%', justifySelf: 'center' }}>
      <svg viewBox="0 0 100 100" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <circle cx="50" cy="50" r="44" fill="none" stroke={c.navy} strokeWidth="0.3" opacity="0.3"/>
        <circle cx="50" cy="50" r="30" fill="none" stroke={c.navy} strokeWidth="0.3" opacity="0.3"/>
        <circle cx="50" cy="50" r="16" fill="none" stroke={c.navy} strokeWidth="0.3" opacity="0.3"/>
        {families.map((f, i) => <line key={i} x1="50" y1="50" x2={f.x} y2={f.y} stroke={c.navy} strokeWidth="0.2" opacity="0.25"/>)}
        <circle cx="50" cy="50" r="3" fill={c.ember}/>
        {families.map((f, i) => <circle key={i} cx={f.x} cy={f.y} r="1.6" fill={c.navy}/>)}
      </svg>
      {families.map((f, i) => (
        <div key={i} style={{ position: 'absolute', left: `${f.x}%`, top: `${f.y}%`, transform: 'translate(8px, -50%)', fontFamily: t.label, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: c.navy, whiteSpace: 'nowrap' }}>{f.label}</div>
      ))}
      <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -130%)', fontFamily: t.label, fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: c.slate }}>You</div>
    </div>
  );
}

function CraftStory({ viewport }) {
  const { theme, go } = useMB();
  const { c, t, d } = theme;
  const isMobile = viewport === 'mobile';
  return (
    <Section viewport={viewport} style={{ background: c.paper }}>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 32 : 80, alignItems: 'center' }}>
        <div style={{ position: 'relative', aspectRatio: '4/5', overflow: 'hidden', order: isMobile ? 1 : 0 }}>
          <img src={window.MB.IMG.pouring2} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Pouring wax"/>
          <div style={{ position: 'absolute', bottom: 16, left: 16, fontFamily: t.label, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#fff', background: 'rgba(15,28,55,0.6)', padding: '5px 10px', borderRadius: 4 }}>Studio · Thursday</div>
        </div>
        <div>
          <Eyebrow>The studio</Eyebrow>
          <Display size={isMobile ? 36 : 60}>{copy('aboutH')}</Display>
          <Body style={{ marginTop: 24, maxWidth: 480 }}>{copy('aboutSub')}</Body>
          <div style={{ marginTop: 36, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, maxWidth: 460 }}>
            <Stat n="48 hr" l="Average burn"/>
            <Stat n="0%" l="Paraffin"/>
            <Stat n="100%" l="Hand poured"/>
            <Stat n="Cape Town" l="Made in"/>
          </div>
          <div style={{ marginTop: 36 }}><Button variant="secondary" onClick={() => go('about')}>Read our story</Button></div>
        </div>
      </div>
    </Section>
  );
}

function Stat({ n, l }) {
  const { theme } = useMB();
  return (
    <div style={{ borderLeft: `1px solid ${theme.c.line}`, paddingLeft: 14 }}>
      <div style={{ fontFamily: theme.t.display, fontStyle: theme.t.displayItalic, fontSize: 28, color: theme.c.navy, lineHeight: 1 }}>{n}</div>
      <div style={{ fontFamily: theme.t.label, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: theme.c.slate, marginTop: 6 }}>{l}</div>
    </div>
  );
}

function SubscribeCTA({ viewport }) {
  const { theme, go } = useMB();
  const { c, t, d } = theme;
  const isMobile = viewport === 'mobile';
  return (
    <section style={{ background: c.navy, color: '#fff', padding: `${isMobile ? d.section * 0.7 : d.section}px ${isMobile ? d.padX/2 : d.padX}px` }}>
      <div style={{ maxWidth: 980, margin: '0 auto', textAlign: 'center' }}>
        <Eyebrow dark>The Ritual · members only</Eyebrow>
        <Display dark size={isMobile ? 40 : 72}>A standing rhythm,<br/>delivered.</Display>
        <Body dark style={{ maxWidth: 520, margin: '24px auto 0' }}>Three complementary candles each season, chosen for you and shipped before the old ones finish. Skip or pause anytime.</Body>
        <div style={{ marginTop: 36, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button variant="ember" onClick={() => go('pricing')}>Plans from R350/mo</Button>
          <Button variant="ghost" onClick={() => go('pricing')} style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.4)' }}>How it works →</Button>
        </div>
      </div>
    </section>
  );
}

// ─── PRODUCTS ─────────────────────────────────────────────────────────
function Products({ viewport = 'desktop' }) {
  const { theme, go } = useMB();
  const { c, t, d } = theme;
  const isMobile = viewport === 'mobile';
  const [filter, setFilter] = ps_useState('All');
  const [sort, setSort] = ps_useState('Featured');
  const families = ['All', 'Floral', 'Woody', 'Fresh', 'Warm', 'Sets'];

  const visible = ps_useMemo(() => {
    let list = window.MB.products.slice();
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

      {/* filter bar */}
      <div style={{ position: 'sticky', top: 58, zIndex: 30, background: c.paper, borderTop: `1px solid ${c.line}`, borderBottom: `1px solid ${c.line}`, padding: `12px ${isMobile ? d.padX/2 : d.padX}px` }}>
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

// ─── PDP ──────────────────────────────────────────────────────────────
function PDP({ viewport = 'desktop' }) {
  const { theme, route, go, addToCart, setCartOpen } = useMB();
  const { c, t, d } = theme;
  const isMobile = viewport === 'mobile';
  const id = route.params.id || 'midnight-jasmine';
  const p = window.MB.products.find((x) => x.id === id) || window.MB.products[0];
  const [qty, setQty] = ps_useState(1);
  const [size, setSize] = ps_useState('Standard');
  const [tab, setTab] = ps_useState('Notes');
  const related = window.MB.products.filter((x) => x.id !== p.id && x.family === p.family).slice(0, 3);

  return (
    <>
      {/* breadcrumb */}
      <div style={{ padding: `${isMobile ? 16 : 24}px ${isMobile ? d.padX/2 : d.padX}px`, fontFamily: t.label, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: c.slate }}>
        <a onClick={() => go('products')} style={{ cursor: 'pointer' }}>Shop</a> / <a onClick={() => go('products')} style={{ cursor: 'pointer' }}>{p.family}</a> / <span style={{ color: c.navy }}>{p.name}</span>
      </div>

      <Section viewport={viewport} style={{ paddingTop: 0, paddingBottom: isMobile ? 48 : 96 }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.05fr 1fr', gap: isMobile ? 32 : 72, alignItems: 'flex-start' }}>
          {/* gallery */}
          <div>
            <div style={{ position: 'relative', aspectRatio: '4/5', overflow: 'hidden', background: c.sand }}>
              <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
              <button onClick={() => {}} aria-label="Wishlist" style={{ position: 'absolute', top: 18, right: 18, background: 'rgba(255,255,255,0.85)', border: 'none', borderRadius: 999, padding: 10, cursor: 'pointer' }}>
                <MBIcon name="heart" size={16}/>
              </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginTop: 10 }}>
              {[p.img, window.MB.IMG.linen, window.MB.IMG.arranged, window.MB.IMG.crafting].map((src, i) => (
                <div key={i} style={{ aspectRatio: '1/1', overflow: 'hidden', background: c.sand, cursor: 'pointer', border: i === 0 ? `1px solid ${c.navy}` : '1px solid transparent' }}>
                  <img src={src} style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
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

            {/* scent constellation */}
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

            {/* size selector */}
            <div style={{ marginTop: 28 }}>
              <div style={{ fontFamily: t.label, fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: c.slate, marginBottom: 10 }}>Size</div>
              <div style={{ display: 'flex', gap: 8 }}>
                {['Travel · 40g', 'Standard · 220g', 'Hearth · 400g'].map((s) => {
                  const active = s.startsWith(size);
                  return (
                    <button key={s} onClick={() => setSize(s.split(' ·')[0])} style={{
                      padding: '12px 16px', fontFamily: t.body, fontSize: 13, color: active ? '#fff' : c.navy,
                      background: active ? c.navy : 'transparent', border: `1px solid ${active ? c.navy : c.line}`, borderRadius: 4, cursor: 'pointer', flex: 1, textAlign: 'left'
                    }}>{s}</button>
                  );
                })}
              </div>
            </div>

            {/* qty + add */}
            <div style={{ marginTop: 24, display: 'flex', gap: 12, alignItems: 'stretch' }}>
              <div style={{ display: 'flex', alignItems: 'center', border: `1px solid ${c.line}`, borderRadius: 999 }}>
                <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '14px 16px' }}><MBIcon name="minus" size={14}/></button>
                <span style={{ fontFamily: t.body, fontSize: 14, width: 28, textAlign: 'center' }}>{qty}</span>
                <button onClick={() => setQty(qty + 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '14px 16px' }}><MBIcon name="plus" size={14}/></button>
              </div>
              <Button variant="primary" size="lg" full onClick={() => { addToCart(p.id, qty); setCartOpen(true); }} style={{ flex: 1 }}>Add to bag · R{p.price * qty}</Button>
            </div>

            {/* reassurance row */}
            <div style={{ marginTop: 28, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, fontFamily: t.body, fontSize: 12, color: c.slate }}>
              {[['flame', p.burn ? `${p.burn} hr burn` : 'Always-on'], ['leaf', p.wax], ['wave', `${p.wick} wick`]].map(([icon, lab], i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}><MBIcon name={icon} size={14}/> {lab}</div>
              ))}
            </div>

            {/* tabs */}
            <div style={{ marginTop: 40, borderTop: `1px solid ${c.line}` }}>
              <div style={{ display: 'flex', gap: 24, paddingTop: 16 }}>
                {['Notes', 'Care', 'Shipping'].map((x) => (
                  <button key={x} onClick={() => setTab(x)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: t.label, fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 600, color: tab === x ? c.navy : c.slate, padding: '8px 0', borderBottom: `1px solid ${tab === x ? c.navy : 'transparent'}` }}>{x}</button>
                ))}
              </div>
              <div style={{ paddingTop: 20, minHeight: 100 }}>
                {tab === 'Notes' && <Body size={14}>Hand-blended fragrance oil, IFRA-certified. We test every batch for soot, scent throw, and clean burn before it leaves the studio.</Body>}
                {tab === 'Care' && <Body size={14}>Burn for at least 2 hours the first time so the wax pools edge to edge. Trim the wick to 5mm before each burn. Never leave unattended.</Body>}
                {tab === 'Shipping' && <Body size={14}>Free shipping over R500 within South Africa. International orders calculated at checkout. Most orders ship within 48 hours.</Body>}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* related */}
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

Object.assign(window, { Home, Products, PDP });
