import { useMB } from '../store/MBProvider';
import { products } from '../data/products';
import Section from '../components/Section';
import Eyebrow from '../components/Eyebrow';
import Display from '../components/Display';
import Body from '../components/Body';
import Button from '../components/Button';
import ScentDots from '../components/ScentDots';
import CartRow from '../components/CartRow';
import SummaryRow from '../components/SummaryRow';
import Footer from '../components/Footer';

export default function Cart({ viewport = 'desktop' }) {
  const { theme, cart, setQty, removeFromCart, cartSubtotal, go, copy } = useMB();
  const { c, t, d } = theme;
  const isMobile = viewport === 'mobile';
  const shipping  = cartSubtotal > 500 ? 0 : 65;
  const total     = cartSubtotal + shipping;

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
            <ScentDots notes={{ top: ['a'], heart: ['b', 'c'], base: ['d'] }} size={96} color={c.slate}/>
            <Display size={32}>{copy('cartEmptyH')}</Display>
            <Body>{copy('cartEmptySub')}</Body>
            <div style={{ marginTop: 8 }}><Button variant="primary" onClick={() => go('products')}>Shop scents</Button></div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.4fr 1fr', gap: 48, alignItems: 'flex-start' }}>
            <div style={{ borderTop: `1px solid ${c.line}` }}>
              {cart.map((it) => {
                const p = products.find((x) => x.id === it.id);
                return <CartRow key={it.id} p={p} qty={it.qty} setQty={(q) => setQty(it.id, q)} remove={() => removeFromCart(it.id)}/>;
              })}
            </div>
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
