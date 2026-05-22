import { useMB } from '../store/MBProvider';
import { IMG, products as allProducts } from '../data/products';
import Section from '../components/Section';
import Eyebrow from '../components/Eyebrow';
import Display from '../components/Display';
import Body from '../components/Body';
import Button from '../components/Button';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';

// ─── Hero variants ───────────────────────────────────────────────────

function HeroCinematic({ viewport }) {
  const { theme, go, copy } = useMB();
  const { c, t, d } = theme;
  const isMobile = viewport === 'mobile';
  return (
    <section style={{ position: 'relative', minHeight: isMobile ? 580 : 720, overflow: 'hidden', background: c.paper }}>
      <div style={{ position: 'absolute', inset: 0 }}>
        <img src={IMG.hero} fetchpriority="high" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85, filter: 'saturate(0.95) contrast(1.02)' }} alt="Candle in warm light"/>
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, rgba(246,241,234,0.15) 0%, rgba(246,241,234,0.6) 70%, ${c.paper} 100%)` }}/>
      </div>
      <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: `${isMobile ? 120 : 180}px ${isMobile ? d.padX / 2 : d.padX}px ${isMobile ? 60 : 100}px`, textAlign: isMobile ? 'left' : 'center' }}>
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
      <NowBurning isMobile={isMobile}/>
    </section>
  );
}

function HeroSplit({ viewport }) {
  const { theme, go, copy } = useMB();
  const { c, t, d } = theme;
  const isMobile = viewport === 'mobile';
  return (
    <section style={{ background: c.paper, paddingTop: isMobile ? 24 : 48 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: `0 ${isMobile ? d.padX / 2 : d.padX}px`, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.1fr 1fr', gap: isMobile ? 32 : 64, alignItems: 'center' }}>
        <div style={{ paddingTop: isMobile ? 32 : 64, paddingBottom: isMobile ? 16 : 64 }}>
          <Eyebrow>Edition 04 · Late autumn</Eyebrow>
          <Display size={isMobile ? 44 : 84} style={{ lineHeight: 0.95 }}>{copy('heroH')}</Display>
          <div style={{ marginTop: 28, maxWidth: 480 }}><Body size={17}>{copy('heroSub')}</Body></div>
          <div style={{ display: 'flex', gap: 12, marginTop: 36, flexWrap: 'wrap' }}>
            <Button variant="primary" onClick={() => go('products')}>{copy('shopCta')}</Button>
            <Button variant="ghost" onClick={() => go('about')}>Our story →</Button>
          </div>
          <div style={{ marginTop: 48, display: 'flex', gap: 32, fontFamily: t.label, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: c.slate }}>
            <span>Coconut + soy</span><span>48 hr burn</span><span>Sandton</span>
          </div>
        </div>
        <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden' }}>
          <img src={IMG.hero} fetchpriority="high" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt=""/>
          <div style={{ position: 'absolute', bottom: 16, left: 16, right: 16, background: 'rgba(15,28,55,0.7)', backdropFilter: 'blur(6px)', padding: '12px 16px', borderRadius: 4, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: t.body, fontSize: 13 }}>
            <span style={{ fontFamily: t.display, fontStyle: t.displayItalic, fontSize: 18 }}>Midnight Jasmine</span>
            <span style={{ fontFamily: t.label, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase' }}>New →</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroTypeled({ viewport }) {
  const { theme, go, copy } = useMB();
  const { c, t, d } = theme;
  const isMobile = viewport === 'mobile';
  return (
    <section style={{ background: c.paper, position: 'relative' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: `${isMobile ? 80 : 140}px ${isMobile ? d.padX / 2 : d.padX}px ${isMobile ? 40 : 80}px` }}>
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
      <div style={{ borderTop: `1px solid ${c.line}`, padding: `16px ${isMobile ? d.padX / 2 : d.padX}px`, display: 'flex', justifyContent: 'space-between', fontFamily: t.label, fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: c.slate }}>
        <span>01 · Floral</span><span>02 · Woody</span>{!isMobile && <span>03 · Fresh</span>}<span>04 · Warm</span>
      </div>
    </section>
  );
}

const HeroVariants = { cinematic: HeroCinematic, split: HeroSplit, typeled: HeroTypeled };

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
    <section style={{ background: c.sand, padding: `${isMobile ? d.section * 0.6 : d.section}px ${isMobile ? d.padX / 2 : d.padX}px` }}>
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
    { label: 'Woody',  x: 70, y: 40 },
    { label: 'Fresh',  x: 35, y: 70 },
    { label: 'Warm',   x: 80, y: 80 },
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
  const { theme, go, copy } = useMB();
  const { c, t, d } = theme;
  const isMobile = viewport === 'mobile';
  return (
    <Section viewport={viewport} style={{ background: c.paper }}>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 32 : 80, alignItems: 'center' }}>
        <div style={{ position: 'relative', aspectRatio: '4/5', overflow: 'hidden', order: isMobile ? 1 : 0 }}>
          <img src={IMG.pouring2} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Pouring wax"/>
          <div style={{ position: 'absolute', bottom: 16, left: 16, fontFamily: t.label, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#fff', background: 'rgba(15,28,55,0.6)', padding: '5px 10px', borderRadius: 4 }}>Studio · Thursday</div>
        </div>
        <div>
          <Eyebrow>The studio</Eyebrow>
          <Display size={isMobile ? 36 : 60}>{copy('aboutH')}</Display>
          <Body style={{ marginTop: 24, maxWidth: 480 }}>{copy('aboutSub')}</Body>
          <div style={{ marginTop: 36, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, maxWidth: 460 }}>
            <Stat n="48 hr"    l="Average burn"/>
            <Stat n="0%"       l="Paraffin"/>
            <Stat n="100%"     l="Hand poured"/>
            <Stat n="Sandton" l="Made in"/>
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
    <section style={{ background: c.navy, color: '#fff', padding: `${isMobile ? d.section * 0.7 : d.section}px ${isMobile ? d.padX / 2 : d.padX}px` }}>
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

// ─── Home page ───────────────────────────────────────────────────────

export default function Home({ viewport = 'desktop' }) {
  const { theme, go } = useMB();
  const { t, c } = theme;
  const isMobile = viewport === 'mobile';
  const featured = allProducts.slice(0, 3);

  const Hero = HeroVariants[theme.tweaks.heroLayout] || HeroVariants.cinematic;

  return (
    <>
      <Hero viewport={viewport}/>

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

      <ScentFinderTeaser viewport={viewport}/>
      <CraftStory viewport={viewport}/>
      <SubscribeCTA viewport={viewport}/>
      <Footer viewport={viewport}/>
    </>
  );
}
