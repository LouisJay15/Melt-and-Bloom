// Cart, Checkout, Account, CartDrawer
const { useState: cs_useState, useEffect: cs_useEffect } = React;

// ─── CART DRAWER (slide-out) ────────────────────────────────────────
function CartDrawer({ viewport = 'desktop' }) {
  const { theme, cart, cartOpen, setCartOpen, setQty, removeFromCart, cartSubtotal, go } = useMB();
  const { c, t, m } = theme;
  if (!cartOpen) return null;
  const isMobile = viewport === 'mobile';
  return (
    <div onClick={() => setCartOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(15,28,55,0.4)', zIndex: 70, backdropFilter: 'blur(6px)' }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        position: 'absolute', right: 0, top: 0, bottom: 0, width: isMobile ? '100%' : 440,
        background: c.paper, display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ padding: '20px 24px', borderBottom: `1px solid ${c.line}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: t.display, fontStyle: t.displayItalic, fontSize: 24, color: c.navy }}>Your bag</div>
          <button onClick={() => setCartOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><MBIcon name="close" size={20}/></button>
        </div>
        {cart.length === 0 ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40, textAlign: 'center', gap: 12 }}>
            <ScentDots notes={{ top: ['a'], heart: ['b','c'], base: ['d'] }} size={64} color={c.slate}/>
            <Display size={28} style={{ marginTop: 12 }}>{copy('cartEmptyH')}</Display>
            <Body>{copy('cartEmptySub')}</Body>
            <div style={{ marginTop: 16 }}><Button variant="primary" onClick={() => { setCartOpen(false); go('products'); }}>Shop scents</Button></div>
          </div>
        ) : (
          <>
            <div style={{ flex: 1, overflow: 'auto', padding: 0 }}>
              {cart.map((it) => {
                const p = window.MB.products.find((x) => x.id === it.id);
                return <CartRow key={it.id} p={p} qty={it.qty} setQty={(q) => setQty(it.id, q)} remove={() => removeFromCart(it.id)}/>;
              })}
              <div style={{ padding: '20px 24px', display: 'flex', gap: 10, alignItems: 'center', fontFamily: t.body, fontSize: 13, color: c.slate }}>
                <MBIcon name="check" size={14}/>
                Free wick trimmer at R800 — <strong style={{ color: c.navy, marginLeft: 4 }}>R{Math.max(0, 800 - cartSubtotal)} away</strong>
              </div>
            </div>
            <div style={{ padding: '20px 24px', borderTop: `1px solid ${c.line}`, background: c.paper }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontFamily: t.body, fontSize: 14, color: c.inkDim }}>
                <span>Subtotal</span><span>R{cartSubtotal}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, fontFamily: t.body, fontSize: 14, color: c.inkDim }}>
                <span>Shipping</span><span>Calculated next</span>
              </div>
              <Button variant="primary" full size="lg" onClick={() => { setCartOpen(false); go('checkout'); }}>Checkout · R{cartSubtotal}</Button>
              <button onClick={() => { setCartOpen(false); go('cart'); }} style={{ width: '100%', marginTop: 10, background: 'none', border: 'none', cursor: 'pointer', fontFamily: t.label, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: c.slate, padding: 8 }}>View full bag →</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function CartRow({ p, qty, setQty, remove, dense }) {
  const { theme } = useMB();
  const { c, t } = theme;
  if (!p) return null;
  return (
    <div style={{ padding: dense ? '16px 0' : '20px 24px', borderBottom: `1px solid ${c.line}`, display: 'flex', gap: 14 }}>
      <div style={{ width: 80, height: 80, flex: 'none', overflow: 'hidden', background: c.sand, borderRadius: 4 }}>
        <img src={p.img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt=""/>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
          <div style={{ fontFamily: t.display, fontStyle: t.displayItalic, fontSize: 18, color: c.navy }}>{p.name}</div>
          <button onClick={remove} style={{ background: 'none', border: 'none', cursor: 'pointer', color: c.slate, padding: 0 }}><MBIcon name="close" size={14}/></button>
        </div>
        <div style={{ fontFamily: t.body, fontSize: 12, color: c.slate }}>{p.family} · {p.size}</div>
        <div style={{ marginTop: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', border: `1px solid ${c.line}`, borderRadius: 999 }}>
            <button onClick={() => setQty(qty - 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px 10px' }}><MBIcon name="minus" size={12}/></button>
            <span style={{ fontFamily: t.body, fontSize: 13, width: 22, textAlign: 'center' }}>{qty}</span>
            <button onClick={() => setQty(qty + 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px 10px' }}><MBIcon name="plus" size={12}/></button>
          </div>
          <Price value={p.price * qty} size={14}/>
        </div>
      </div>
    </div>
  );
}

// ─── FULL CART PAGE ─────────────────────────────────────────────────
function Cart({ viewport = 'desktop' }) {
  const { theme, cart, setQty, removeFromCart, cartSubtotal, go } = useMB();
  const { c, t, d } = theme;
  const isMobile = viewport === 'mobile';
  const shipping = cartSubtotal > 500 ? 0 : 65;
  const total = cartSubtotal + shipping;

  return (
    <>
      <Section viewport={viewport} style={{ paddingBottom: isMobile ? 32 : 48 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexDirection: isMobile ? 'column' : 'row', gap: 16, marginBottom: 32 }}>
          <div>
            <Eyebrow>Step 1 of 2</Eyebrow>
            <Display size={isMobile ? 40 : 60}>Your bag</Display>
          </div>
          <a onClick={() => go('products')} style={{ cursor: 'pointer', fontFamily: t.label, fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: c.slate, borderBottom: `1px solid ${c.line}`, paddingBottom: 4 }}>← Keep browsing</a>
        </div>

        {cart.length === 0 ? (
          <div style={{ padding: '80px 0', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <ScentDots notes={{ top: ['a'], heart: ['b','c'], base: ['d'] }} size={96} color={c.slate}/>
            <Display size={32}>{copy('cartEmptyH')}</Display>
            <Body>{copy('cartEmptySub')}</Body>
            <div style={{ marginTop: 8 }}><Button variant="primary" onClick={() => go('products')}>Shop scents</Button></div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.4fr 1fr', gap: 48, alignItems: 'flex-start' }}>
            <div style={{ borderTop: `1px solid ${c.line}` }}>
              {cart.map((it) => {
                const p = window.MB.products.find((x) => x.id === it.id);
                return <CartRow key={it.id} p={p} qty={it.qty} setQty={(q) => setQty(it.id, q)} remove={() => removeFromCart(it.id)}/>;
              })}
            </div>
            {/* sticky summary */}
            <div style={{ background: c.paper, border: `1px solid ${c.line}`, padding: 28, position: isMobile ? 'static' : 'sticky', top: 100 }}>
              <div style={{ fontFamily: t.display, fontStyle: t.displayItalic, fontSize: 26, color: c.navy, marginBottom: 20 }}>Summary</div>
              <SummaryRow label="Subtotal" value={`R${cartSubtotal}`}/>
              <SummaryRow label="Shipping" value={shipping === 0 ? 'Free' : `R${shipping}`}/>
              <SummaryRow label="VAT included"/>
              <div style={{ height: 1, background: c.line, margin: '16px 0' }}/>
              <SummaryRow label="Total" value={`R${total}`} bold/>
              <div style={{ marginTop: 20 }}><Button variant="primary" full size="lg" onClick={() => go('checkout')}>Checkout</Button></div>
              <div style={{ marginTop: 16, fontFamily: t.body, fontSize: 12, color: c.slate, lineHeight: 1.6, textAlign: 'center' }}>
                Secure payment via PayFast · 30-day returns
              </div>
            </div>
          </div>
        )}
      </Section>
      <Footer viewport={viewport}/>
    </>
  );
}

function SummaryRow({ label, value, bold }) {
  const { theme } = useMB();
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontFamily: theme.t.body, fontSize: bold ? 17 : 14, color: bold ? theme.c.navy : theme.c.inkDim, fontWeight: bold ? 600 : 400 }}>
      <span>{label}</span><span>{value || ''}</span>
    </div>
  );
}

// ─── CHECKOUT ──────────────────────────────────────────────────────
function Checkout({ viewport = 'desktop' }) {
  const { theme, cart, cartSubtotal, go } = useMB();
  const { c, t, d } = theme;
  const isMobile = viewport === 'mobile';
  const [step, setStep] = cs_useState('details'); // details, payment, done
  const [pay, setPay] = cs_useState('payfast');
  const [email, setEmail] = cs_useState('');
  const shipping = cartSubtotal > 500 ? 0 : 65;
  const total = cartSubtotal + shipping;

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
            <Eyebrow>Order #MB-{Math.floor(Math.random()*9000+1000)}</Eyebrow>
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
        {/* progress */}
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
                    <Field label="First name"/>
                    <Field label="Last name"/>
                  </div>
                  <Field label="Address"/>
                  <Field label="Apartment, suite (optional)"/>
                  <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: 12 }}>
                    <Field label="City"/>
                    <Field label="Postal code"/>
                    <Field label="Country" value="South Africa"/>
                  </div>
                </FieldGroup>
                <FieldGroup title="Delivery">
                  {[
                    ['standard', 'Standard · 3–5 days', shipping === 0 ? 'Free' : 'R65'],
                    ['express', 'Express · next day', 'R150'],
                    ['pickup', 'Studio pickup · Cape Town', 'Free'],
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
                    ['payfast', 'PayFast', 'Card · Instant EFT · SnapScan'],
                    ['card', 'Credit / debit card', 'Visa · Mastercard · Amex'],
                    ['eft', 'Manual EFT', 'Bank reference sent by email'],
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
                      <Field label="Expiry"/>
                      <Field label="CVC"/>
                      <Field label="ZIP"/>
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

          {/* summary */}
          <div style={{ background: c.paper, border: `1px solid ${c.line}`, padding: 28, position: isMobile ? 'static' : 'sticky', top: 100 }}>
            <div style={{ fontFamily: t.display, fontStyle: t.displayItalic, fontSize: 22, color: c.navy, marginBottom: 16 }}>Order summary</div>
            <div style={{ borderBottom: `1px solid ${c.line}`, paddingBottom: 12, marginBottom: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {cart.map((it) => {
                const p = window.MB.products.find((x) => x.id === it.id);
                if (!p) return null;
                return (
                  <div key={it.id} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <div style={{ width: 48, height: 48, overflow: 'hidden', background: c.sand, borderRadius: 4, flex: 'none', position: 'relative' }}>
                      <img src={p.img} style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
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

function FieldGroup({ title, children }) {
  const { theme } = useMB();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ fontFamily: theme.t.label, fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: theme.c.slate, marginBottom: 4 }}>{title}</div>
      {children}
    </div>
  );
}

function Field({ label, value, onChange, placeholder }) {
  const { theme } = useMB();
  const { c, t } = theme;
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span style={{ fontFamily: t.body, fontSize: 12, color: c.slate }}>{label}</span>
      <input value={value ?? ''} onChange={(e) => onChange && onChange(e.target.value)} placeholder={placeholder} style={{
        padding: '12px 14px', border: `1px solid ${c.line}`, borderRadius: 4, fontFamily: t.body, fontSize: 14,
        background: '#fff', outline: 'none', color: c.navy,
      }} onFocus={(e) => e.currentTarget.style.borderColor = c.navy} onBlur={(e) => e.currentTarget.style.borderColor = c.line}/>
    </label>
  );
}

// ─── ACCOUNT ────────────────────────────────────────────────────────
function Account({ viewport = 'desktop' }) {
  const { theme, go } = useMB();
  const { c, t, d } = theme;
  const isMobile = viewport === 'mobile';
  const [tab, setTab] = cs_useState('orders');
  const tabs = [
    { k: 'orders', label: 'Orders' },
    { k: 'subscriptions', label: 'Ritual' },
    { k: 'wishlist', label: 'Saved' },
    { k: 'addresses', label: 'Addresses' },
    { k: 'profile', label: 'Profile' },
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

      <div style={{ borderTop: `1px solid ${c.line}`, borderBottom: `1px solid ${c.line}`, padding: `0 ${isMobile ? d.padX/2 : d.padX}px`, overflow: 'auto' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', gap: 28 }}>
          {tabs.map((x) => (
            <button key={x.k} onClick={() => setTab(x.k)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: t.label, fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: tab === x.k ? 600 : 400, color: tab === x.k ? c.navy : c.slate, padding: '18px 0', borderBottom: `2px solid ${tab === x.k ? c.navy : 'transparent'}`, whiteSpace: 'nowrap' }}>{x.label}</button>
          ))}
        </div>
      </div>

      <Section viewport={viewport} style={{ paddingTop: isMobile ? 40 : 64 }}>
        {tab === 'orders' && <AccountOrders/>}
        {tab === 'subscriptions' && <AccountSubscription/>}
        {tab === 'wishlist' && <AccountWishlist/>}
        {tab === 'addresses' && <AccountAddresses/>}
        {tab === 'profile' && <AccountProfile/>}
      </Section>

      <Footer viewport={viewport}/>
    </>
  );
}

function AccountOrders() {
  const { theme, go } = useMB();
  const { c, t } = theme;
  const orders = [
    { id: 'MB-4081', date: '12 May 2026', status: 'In transit', total: 'R1,290', items: ['Midnight Jasmine', 'Smoked Sandalwood'], img: window.MB.IMG.midnight, eta: 'Arrives Thu, 21 May' },
    { id: 'MB-3924', date: '02 April 2026', status: 'Delivered', total: 'R450', items: ['Quiet Evening'], img: window.MB.IMG.quietevening, eta: 'Delivered 06 Apr' },
    { id: 'MB-3702', date: '14 March 2026', status: 'Delivered', total: 'R870', items: ['Discovery Set', 'Sea Salt & Sage'], img: window.MB.IMG.seasalt, eta: 'Delivered 18 Mar' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {orders.map((o, i) => (
        <div key={o.id} style={{ border: `1px solid ${c.line}`, background: '#fff', padding: 20, display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ width: 80, height: 80, overflow: 'hidden', background: c.sand, borderRadius: 4, flex: 'none' }}>
            <img src={o.img} style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
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
          <button style={{ background: 'transparent', border: `1px solid ${c.navy}`, padding: '10px 18px', borderRadius: 999, cursor: 'pointer', fontFamily: t.label, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: c.navy, fontWeight: 600 }}>{o.status === 'In transit' ? 'Track' : 'Reorder'}</button>
        </div>
      ))}
    </div>
  );
}

function AccountSubscription() {
  const { theme, go } = useMB();
  const { c, t } = theme;
  const next = window.MB.products.slice(0, 3);
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
                  <img src={p.img} style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
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
        <KV label="Plan" value="The Sanctuary · R950 / mo"/>
        <KV label="Frequency" value="Every month"/>
        <KV label="Cycle" value="3 of 12"/>
        <KV label="Method" value="•••• 4242"/>
      </div>
    </div>
  );
}

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

function AccountWishlist({ viewport }) {
  const { theme, go } = useMB();
  const saved = window.MB.products.slice(2, 6);
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
    { tag: 'Home · default', name: 'Naledi Mokwena', lines: ['12 Loop Street, Apt 4', 'Cape Town · 8001', 'South Africa'] },
    { tag: 'Studio', name: 'Naledi Mokwena', lines: ['41 Bree Street', 'Cape Town · 8000', 'South Africa'] },
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
      <Field label="Last name" value="Mokwena"/>
      <Field label="Email" value="naledi@example.com"/>
      <Field label="Phone" value="+27 82 555 0117"/>
    </div>
  );
}

Object.assign(window, { Cart, Checkout, Account, CartDrawer });
