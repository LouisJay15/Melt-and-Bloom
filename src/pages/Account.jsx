import { useState } from 'react';
import { useMB } from '../store/MBProvider';
import { products, IMG } from '../data/products';
import Section from '../components/Section';
import Eyebrow from '../components/Eyebrow';
import Display from '../components/Display';
import Body from '../components/Body';
import ProductCard from '../components/ProductCard';
import Field from '../components/Field';
import Footer from '../components/Footer';

function KV({ label, value }) {
  const { theme } = useMB();
  const { c, t } = theme;
  return (
    <div style={{ border: `1px solid ${c.line}`, padding: 20, background: '#fff' }}>
      <div style={{ fontFamily: t.label, fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: c.slate, marginBottom: 6 }}>{label}</div>
      <div style={{ fontFamily: t.body, fontSize: 15, color: c.navy }}>{value}</div>
    </div>
  );
}

function AccountOrders() {
  const { theme, go } = useMB();
  const { c, t } = theme;
  const orders = [
    { id: 'MB-4081', date: '12 May 2026',   status: 'In transit', total: 'R1,290', items: ['Midnight Jasmine', 'Smoked Sandalwood'], img: IMG.midnight,     eta: 'Arrives Thu, 21 May' },
    { id: 'MB-3924', date: '02 April 2026', status: 'Delivered',  total: 'R450',   items: ['Quiet Evening'],                         img: IMG.quietevening, eta: 'Delivered 06 Apr' },
    { id: 'MB-3702', date: '14 March 2026', status: 'Delivered',  total: 'R870',   items: ['Discovery Set', 'Sea Salt & Sage'],      img: IMG.seasalt,      eta: 'Delivered 18 Mar' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {orders.map((o) => (
        <div key={o.id} style={{ border: `1px solid ${c.line}`, background: '#fff', padding: 20, display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ width: 80, height: 80, overflow: 'hidden', background: c.sand, borderRadius: 4, flex: 'none' }}>
            <img src={o.img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt=""/>
          </div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ fontFamily: t.label, fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: c.slate, marginBottom: 4 }}>{o.id} · {o.date}</div>
            <div style={{ fontFamily: t.display, fontStyle: t.displayItalic, fontSize: 20, color: c.navy, marginBottom: 4 }}>{o.items.join(' + ')}</div>
            <div style={{ fontFamily: t.body, fontSize: 13, color: c.inkDim }}>{o.eta}</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10 }}>
            <span style={{ fontFamily: t.label, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 999, background: o.status === 'In transit' ? c.ember : c.sand, color: c.navy }}>{o.status}</span>
            <span style={{ fontFamily: t.body, fontSize: 15, color: c.navy }}>{o.total}</span>
          </div>
          <button style={{ background: 'transparent', border: `1px solid ${c.navy}`, padding: '10px 18px', borderRadius: 999, cursor: 'pointer', fontFamily: t.label, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: c.navy, fontWeight: 600 }}>
            {o.status === 'In transit' ? 'Track' : 'Reorder'}
          </button>
        </div>
      ))}
    </div>
  );
}

function AccountSubscription() {
  const { theme } = useMB();
  const { c, t } = theme;
  const next = products.slice(0, 3);
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 24, maxWidth: 880 }}>
      <div style={{ background: c.navy, color: '#fff', padding: 36, position: 'relative', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ fontFamily: t.label, fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)' }}>Active · The Sanctuary</div>
            <Display dark size={36} style={{ marginTop: 8 }}>Next box ships<br/>02 June</Display>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <button style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.4)', color: '#fff', padding: '10px 18px', borderRadius: 999, cursor: 'pointer', fontFamily: t.label, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Skip month</button>
            <button style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.7)', padding: 8, cursor: 'pointer', fontFamily: t.label, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Pause →</button>
          </div>
        </div>
        <div style={{ marginTop: 28, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.15)' }}>
          <div style={{ fontFamily: t.label, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: 16 }}>Inside next month</div>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {next.map((p) => (
              <div key={p.id} style={{ flex: '1 1 180px', display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 56, height: 56, borderRadius: 999, overflow: 'hidden', background: c.sand }}>
                  <img src={p.img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt=""/>
                </div>
                <div>
                  <div style={{ fontFamily: t.display, fontStyle: t.displayItalic, fontSize: 16 }}>{p.name}</div>
                  <div style={{ fontFamily: t.body, fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>{p.family}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
        <KV label="Plan"      value="The Sanctuary · R950 / mo"/>
        <KV label="Frequency" value="Every month"/>
        <KV label="Cycle"     value="3 of 12"/>
        <KV label="Method"    value="•••• 4242"/>
      </div>
    </div>
  );
}

function AccountWishlist() {
  const { theme, go } = useMB();
  const saved = products.slice(2, 6);
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 48, rowGap: 64 }}>
      {saved.map((p) => <ProductCard key={p.id} p={p} onClick={() => go('pdp', { id: p.id })}/>)}
    </div>
  );
}

function AccountAddresses() {
  const { theme } = useMB();
  const { c, t } = theme;
  const addresses = [
    { tag: 'Home · default', name: 'Naledi Mokwena', lines: ['24 Rivonia Road, Apt 3', 'Sandton · 2196', 'South Africa'] },
    { tag: 'Studio',         name: 'Naledi Mokwena', lines: ['11 Coventry Road, Bryanston', 'Sandton · 2021', 'South Africa'] },
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
      {addresses.map((a, i) => (
        <div key={i} style={{ border: `1px solid ${c.line}`, padding: 20, background: '#fff' }}>
          <div style={{ fontFamily: t.label, fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: c.slate, marginBottom: 10 }}>{a.tag}</div>
          <div style={{ fontFamily: t.body, fontSize: 14, color: c.navy, lineHeight: 1.7 }}>
            <strong>{a.name}</strong><br/>
            {a.lines.map((l, j) => <span key={j}>{l}<br/></span>)}
          </div>
          <div style={{ display: 'flex', gap: 16, marginTop: 16, fontFamily: t.label, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            <a style={{ cursor: 'pointer', color: c.navy }}>Edit</a>
            <a style={{ cursor: 'pointer', color: c.slate }}>Delete</a>
          </div>
        </div>
      ))}
      <button style={{ border: `1px dashed ${c.line}`, padding: 20, background: 'transparent', cursor: 'pointer', fontFamily: t.label, fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: c.slate }}>+ Add new address</button>
    </div>
  );
}

function AccountProfile() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, maxWidth: 800 }}>
      <Field label="First name" value="Naledi"/>
      <Field label="Last name"  value="Mokwena"/>
      <Field label="Email"      value="naledi@example.com"/>
      <Field label="Phone"      value="+27 82 555 0117"/>
    </div>
  );
}

export default function Account({ viewport = 'desktop' }) {
  const { theme, go } = useMB();
  const { c, t, d } = theme;
  const isMobile = viewport === 'mobile';
  const [tab, setTab] = useState('orders');
  const tabs = [
    { k: 'orders',        label: 'Orders' },
    { k: 'subscriptions', label: 'Ritual' },
    { k: 'wishlist',      label: 'Saved' },
    { k: 'addresses',     label: 'Addresses' },
    { k: 'profile',       label: 'Profile' },
  ];

  return (
    <>
      <Section viewport={viewport} style={{ paddingBottom: isMobile ? 24 : 48 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexDirection: isMobile ? 'column' : 'row', gap: 16 }}>
          <div>
            <Eyebrow>Hello, Naledi</Eyebrow>
            <Display size={isMobile ? 40 : 60}>Your shelf.</Display>
          </div>
          <div style={{ display: 'flex', gap: 12, fontFamily: t.label, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            <span style={{ color: c.slate }}>3 ORDERS · 1 RITUAL · 8 SAVED</span>
          </div>
        </div>
      </Section>

      <div style={{ borderTop: `1px solid ${c.line}`, borderBottom: `1px solid ${c.line}`, padding: `0 ${isMobile ? d.padX / 2 : d.padX}px`, overflow: 'auto' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', gap: 28 }}>
          {tabs.map((x) => (
            <button key={x.k} onClick={() => setTab(x.k)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: t.label, fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: tab === x.k ? 600 : 400, color: tab === x.k ? c.navy : c.slate, padding: '18px 0', borderBottom: `2px solid ${tab === x.k ? c.navy : 'transparent'}`, whiteSpace: 'nowrap' }}>
              {x.label}
            </button>
          ))}
        </div>
      </div>

      <Section viewport={viewport} style={{ paddingTop: isMobile ? 40 : 64 }}>
        {tab === 'orders'        && <AccountOrders/>}
        {tab === 'subscriptions' && <AccountSubscription/>}
        {tab === 'wishlist'      && <AccountWishlist/>}
        {tab === 'addresses'     && <AccountAddresses/>}
        {tab === 'profile'       && <AccountProfile/>}
      </Section>

      <Footer viewport={viewport}/>
    </>
  );
}
