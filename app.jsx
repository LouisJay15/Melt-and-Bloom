// App: viewport wrappers + router + tweaks panel
const { useState: a_useState, useEffect: a_useEffect, useRef: a_useRef } = React;

function Router({ viewport }) {
  const { route } = useMB();
  const map = {
    home: window.Home, products: window.Products, pdp: window.PDP,
    cart: window.Cart, checkout: window.Checkout, account: window.Account,
    about: window.About, gallery: window.Gallery, pricing: window.Pricing, contact: window.Contact,
  };
  const Page = map[route.name] || window.Home;
  return <Page viewport={viewport}/>;
}

// One App instance per viewport — they share state via context above
function AppFrame({ viewport, width, height }) {
  const { theme, route, toast } = useMB();
  const { c, t } = theme;
  return (
    <div data-screen-label={viewport === 'desktop' ? 'Desktop · 1440' : 'Mobile · 390'} style={{
      width, height,
      background: c.paper, color: c.ink, fontFamily: t.body,
      overflow: 'auto', position: 'relative',
    }} data-mb-scroll={viewport}>
      <Nav viewport={viewport}/>
      <Router viewport={viewport}/>
      <CartDrawer viewport={viewport}/>
      {toast && <Toast text={toast.msg} viewport={viewport}/>}
    </div>
  );
}

function Toast({ text, viewport }) {
  const { theme } = useMB();
  const { c, t } = theme;
  return (
    <div style={{
      position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)',
      background: c.navy, color: '#fff', padding: '12px 20px', borderRadius: 999,
      fontFamily: t.label, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase',
      zIndex: 90, animation: 'mb-toast-in 200ms ease-out',
      boxShadow: '0 20px 40px rgba(15,28,55,0.3)',
    }}>{text}</div>
  );
}

// ─── Tweaks panel ────────────────────────────────────────────────────
function MBTweaks() {
  const { tweaks, setTweak } = useMB();
  return (
    <window.TweaksPanel title="Tweaks · Melt & Bloom">
      <window.TweakSection label="Typography">
        <window.TweakRadio label="Pairing" value={tweaks.typePair} options={[
          { value: 'editorial', label: 'Editorial' },
          { value: 'soft', label: 'Soft' },
          { value: 'crisp', label: 'Crisp' },
        ]} onChange={(v) => setTweak('typePair', v)}/>
      </window.TweakSection>
      <window.TweakSection label="Hero">
        <window.TweakRadio label="Layout" value={tweaks.heroLayout} options={[
          { value: 'cinematic', label: 'Cinema' },
          { value: 'split', label: 'Split' },
          { value: 'typeled', label: 'Type-led' },
        ]} onChange={(v) => setTweak('heroLayout', v)}/>
      </window.TweakSection>
      <window.TweakSection label="Product card">
        <window.TweakRadio label="Style" value={tweaks.cardStyle} options={[
          { value: 'circular', label: 'Circular' },
          { value: 'squared', label: 'Squared' },
          { value: 'editorial', label: 'Editorial' },
        ]} onChange={(v) => setTweak('cardStyle', v)}/>
      </window.TweakSection>
      <window.TweakSection label="Layout">
        <window.TweakRadio label="Density" value={tweaks.density} options={[
          { value: 'cozy', label: 'Cozy' },
          { value: 'breathable', label: 'Air' },
          { value: 'spacious', label: 'Wide' },
        ]} onChange={(v) => setTweak('density', v)}/>
        <window.TweakRadio label="Motion" value={tweaks.motion} options={[
          { value: 'off', label: 'Off' },
          { value: 'subtle', label: 'Subtle' },
          { value: 'expressive', label: 'Bold' },
        ]} onChange={(v) => setTweak('motion', v)}/>
      </window.TweakSection>
      <window.TweakSection label="Voice">
        <window.TweakRadio label="Copy tone" value={tweaks.tone} options={[
          { value: 'poetic', label: 'Poetic' },
          { value: 'plain', label: 'Plain' },
        ]} onChange={(v) => setTweak('tone', v)}/>
      </window.TweakSection>
    </window.TweaksPanel>
  );
}

// ─── Canvas root ─────────────────────────────────────────────────────
function App() {
  const { go, route } = useMB();
  // shared cross-viewport nav indicator strip (route label between artboards)
  return (
    <>
      <MBTweaks/>
      <window.DesignCanvas>
        <window.DCSection id="responsive" title="Melt & Bloom · Responsive prototype" subtitle="Same app, same state — desktop and mobile in lockstep. Tap any link in either frame to navigate both. Toggle Tweaks for variants.">
          <window.DCArtboard id="desktop" label="Desktop · 1440 × 900" width={1440} height={900}>
            <window.ChromeWindow tabs={[{ title: 'Melt & Bloom' }]} activeIndex={0} url={`meltandbloom.co.za/${route.name === 'home' ? '' : route.name}${route.name === 'pdp' && route.params.id ? '/' + route.params.id : ''}`} width={1440} height={900}>
              <AppFrame viewport="desktop" width={1440} height={840}/>
            </window.ChromeWindow>
          </window.DCArtboard>
          <window.DCArtboard id="mobile" label="Mobile · iPhone 15" width={402} height={874}>
            <window.IOSDevice width={402} height={874} dark={false}>
              <AppFrame viewport="mobile" width={402} height={874}/>
            </window.IOSDevice>
          </window.DCArtboard>
        </window.DCSection>
      </window.DesignCanvas>
    </>
  );
}

function Root() {
  return (
    <window.MBProvider>
      <App/>
    </window.MBProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Root/>);
