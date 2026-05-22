import { useState } from 'react';
import { useMB } from '../store/MBProvider';
import { products } from '../data/products';
import Section from '../components/Section';
import Eyebrow from '../components/Eyebrow';
import Display from '../components/Display';
import Body from '../components/Body';
import Button from '../components/Button';
import MBIcon from '../components/MBIcon';
import Price from '../components/Price';
import Field from '../components/Field';
import SummaryRow from '../components/SummaryRow';
import Footer from '../components/Footer';

function FieldGroup({ title, children }) {
  const { theme } = useMB();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ fontFamily: theme.t.label, fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: theme.c.slate, marginBottom: 4 }}>{title}</div>
      {children}
    </div>
  );
}

export default function Checkout({ viewport = 'desktop' }) {
  const { theme, cart, cartSubtotal, go } = useMB();
  const { c, t, d } = theme;
  const isMobile = viewport === 'mobile';
  const [step,  setStep]  = useState('details');
  const [pay,   setPay]   = useState('payfast');
  const [email, setEmail] = useState('');
  const shipping = cartSubtotal > 500 ? 0 : 65;
  const total    = cartSubtotal + shipping;

  if (cart.length === 0 && step !== 'done') {
    return (
      <>
        <Section viewport={viewport}>
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <Display size={32}>No items to check out</Display>
            <div style={{ marginTop: 20 }}><Button variant="primary" onClick={() => go('products')}>Shop scents</Button></div>
          </div>
        </Section>
        <Footer viewport={viewport}/>
      </>
    );
  }

  if (step === 'done') {
    return (
      <>
        <Section viewport={viewport}>
          <div style={{ textAlign: 'center', maxWidth: 580, margin: '0 auto', padding: '60px 0' }}>
            <div style={{ width: 80, height: 80, borderRadius: 999, border: `1px solid ${c.navy}`, margin: '0 auto 32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MBIcon name="check" size={36} color={c.navy}/>
            </div>
            <Eyebrow>Order #MB-{Math.floor(Math.random() * 9000 + 1000)}</Eyebrow>
            <Display size={isMobile ? 36 : 56}>Thank you.</Display>
            <Body style={{ marginTop: 20 }}>
              A confirmation is on its way to {email || 'your inbox'}. We&rsquo;ll pour, pack, and ship within 48 hours.
            </Body>
            <div style={{ marginTop: 36, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button variant="primary" onClick={() => go('account')}>View order</Button>
              <Button variant="ghost" onClick={() => go('home')}>Back home →</Button>
            </div>
          </div>
        </Section>
        <Footer viewport={viewport}/>
      </>
    );
  }

  return (
    <>
      <Section viewport={viewport} style={{ paddingBottom: isMobile ? 48 : 96 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 36, fontFamily: t.label, fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: c.slate, flexWrap: 'wrap' }}>
          <span style={{ color: c.navy }}>01 Bag</span>
          <span>—</span>
          <span style={{ color: step === 'details' ? c.navy : c.slate, fontWeight: step === 'details' ? 600 : 400 }}>02 Details</span>
          <span>—</span>
          <span style={{ color: step === 'payment' ? c.navy : c.slate, fontWeight: step === 'payment' ? 600 : 400 }}>03 Pay</span>
        </div>

        <Display size={isMobile ? 36 : 48}>{step === 'details' ? 'Where to?' : 'And how?'}</Display>

        <div style={{ marginTop: 40, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.4fr 1fr', gap: 56, alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {step === 'details' && (
              <>
                <FieldGroup title="Contact">
                  <Field label="Email" value={email} onChange={setEmail} placeholder="you@example.com"/>
                  <Field label="Phone (optional)" placeholder="+27 ..."/>
                </FieldGroup>
                <FieldGroup title="Shipping address">
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <Field label="First name"/><Field label="Last name"/>
                  </div>
                  <Field label="Address"/>
                  <Field label="Apartment, suite (optional)"/>
                  <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: 12 }}>
                    <Field label="City"/><Field label="Postal code"/><Field label="Country" value="South Africa"/>
                  </div>
                </FieldGroup>
                <FieldGroup title="Delivery">
                  {[
                    ['standard', 'Standard · 3–5 days', shipping === 0 ? 'Free' : 'R65'],
                    ['express',  'Express · next day',  'R150'],
                    ['pickup',   'Studio pickup · Bryanston', 'Free'],
                  ].map(([k, label, price], i) => (
                    <label key={k} style={{ display: 'flex', alignItems: 'center', padding: '14px 16px', border: `1px solid ${i === 0 ? c.navy : c.line}`, borderRadius: 4, cursor: 'pointer', gap: 14, background: i === 0 ? c.paper : 'transparent' }}>
                      <input type="radio" name="ship" defaultChecked={i === 0} style={{ accentColor: c.navy }}/>
                      <span style={{ flex: 1, fontFamily: t.body, fontSize: 14, color: c.navy }}>{label}</span>
                      <span style={{ fontFamily: t.body, fontSize: 13, color: c.slate }}>{price}</span>
                    </label>
                  ))}
                </FieldGroup>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
                  <a onClick={() => go('cart')} style={{ cursor: 'pointer', fontFamily: t.label, fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: c.slate }}>← Back to bag</a>
                  <Button variant="primary" size="lg" onClick={() => setStep('payment')}>Continue to payment →</Button>
                </div>
              </>
            )}

            {step === 'payment' && (
              <>
                <FieldGroup title="Payment method">
                  {[
                    ['payfast', 'PayFast',             'Card · Instant EFT · SnapScan'],
                    ['card',    'Credit / debit card', 'Visa · Mastercard · Amex'],
                    ['eft',     'Manual EFT',          'Bank reference sent by email'],
                  ].map(([k, label, sub]) => (
                    <label key={k} onClick={() => setPay(k)} style={{ display: 'flex', alignItems: 'center', padding: '14px 16px', border: `1px solid ${pay === k ? c.navy : c.line}`, borderRadius: 4, cursor: 'pointer', gap: 14, background: pay === k ? c.paper : 'transparent' }}>
                      <input type="radio" name="pay" checked={pay === k} onChange={() => setPay(k)} style={{ accentColor: c.navy }}/>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: t.body, fontSize: 14, color: c.navy, fontWeight: 600 }}>{label}</div>
                        <div style={{ fontFamily: t.body, fontSize: 12, color: c.slate }}>{sub}</div>
                      </div>
                    </label>
                  ))}
                </FieldGroup>
                {pay === 'card' && (
                  <FieldGroup title="Card details">
                    <Field label="Card number" placeholder="•••• •••• •••• ••••"/>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                      <Field label="Expiry"/><Field label="CVC"/><Field label="ZIP"/>
                    </div>
                  </FieldGroup>
                )}
                <FieldGroup title="A note (optional)">
                  <textarea placeholder="Gift message, delivery instructions…" style={{ width: '100%', minHeight: 80, padding: 14, border: `1px solid ${c.line}`, borderRadius: 4, fontFamily: t.body, fontSize: 14, background: '#fff', outline: 'none', resize: 'vertical' }}/>
                </FieldGroup>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
                  <a onClick={() => setStep('details')} style={{ cursor: 'pointer', fontFamily: t.label, fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: c.slate }}>← Back</a>
                  <Button variant="primary" size="lg" onClick={() => setStep('done')}>Place order · R{total}</Button>
                </div>
              </>
            )}
          </div>

          <div style={{ background: c.paper, border: `1px solid ${c.line}`, padding: 28, position: isMobile ? 'static' : 'sticky', top: 100 }}>
            <div style={{ fontFamily: t.display, fontStyle: t.displayItalic, fontSize: 22, color: c.navy, marginBottom: 16 }}>Order summary</div>
            <div style={{ borderBottom: `1px solid ${c.line}`, paddingBottom: 12, marginBottom: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {cart.map((it) => {
                const p = products.find((x) => x.id === it.id);
                if (!p) return null;
                return (
                  <div key={it.id} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <div style={{ width: 48, height: 48, overflow: 'hidden', background: c.sand, borderRadius: 4, flex: 'none', position: 'relative' }}>
                      <img src={p.img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt=""/>
                      <span style={{ position: 'absolute', top: -6, right: -6, background: c.navy, color: '#fff', borderRadius: 999, fontSize: 10, padding: '0 5px', fontFamily: t.body }}>{it.qty}</span>
                    </div>
                    <div style={{ flex: 1, fontFamily: t.body, fontSize: 13, color: c.navy }}>{p.name}</div>
                    <Price value={p.price * it.qty} size={13}/>
                  </div>
                );
              })}
            </div>
            <SummaryRow label="Subtotal" value={`R${cartSubtotal}`}/>
            <SummaryRow label="Shipping" value={shipping === 0 ? 'Free' : `R${shipping}`}/>
            <div style={{ height: 1, background: c.line, margin: '12px 0' }}/>
            <SummaryRow label="Total" value={`R${total}`} bold/>
          </div>
        </div>
      </Section>
      <Footer viewport={viewport}/>
    </>
  );
}
