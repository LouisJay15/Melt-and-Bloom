import { useMB } from '../store/MBProvider';
import { products } from '../data/products';
import MBIcon from './MBIcon';
import Button from './Button';
import Display from './Display';
import Body from './Body';
import ScentDots from './ScentDots';
import CartRow from './CartRow';

export default function CartDrawer({ viewport = 'desktop' }) {
  const { theme, cart, cartOpen, setCartOpen, setQty, removeFromCart, cartSubtotal, go, copy } = useMB();
  const { c, t } = theme;
  if (!cartOpen) return null;
  const isMobile = viewport === 'mobile';

  return (
    <div
      onClick={() => setCartOpen(false)}
      style={{ position: 'fixed', inset: 0, background: 'rgba(15,28,55,0.4)', zIndex: 70, backdropFilter: 'blur(6px)' }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: isMobile ? '100%' : 440, background: c.paper, display: 'flex', flexDirection: 'column' }}
      >
        <div style={{ padding: '20px 24px', borderBottom: `1px solid ${c.line}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: t.display, fontStyle: t.displayItalic, fontSize: 24, color: c.navy }}>Your bag</div>
          <button onClick={() => setCartOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <MBIcon name="close" size={20}/>
          </button>
        </div>

        {cart.length === 0 ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40, textAlign: 'center', gap: 12 }}>
            <ScentDots notes={{ top: ['a'], heart: ['b', 'c'], base: ['d'] }} size={64} color={c.slate}/>
            <Display size={28} style={{ marginTop: 12 }}>{copy('cartEmptyH')}</Display>
            <Body>{copy('cartEmptySub')}</Body>
            <div style={{ marginTop: 16 }}>
              <Button variant="primary" onClick={() => { setCartOpen(false); go('products'); }}>Shop scents</Button>
            </div>
          </div>
        ) : (
          <>
            <div style={{ flex: 1, overflow: 'auto' }}>
              {cart.map((it) => {
                const p = products.find((x) => x.id === it.id);
                return <CartRow key={it.id} p={p} qty={it.qty} setQty={(q) => setQty(it.id, q)} remove={() => removeFromCart(it.id)}/>;
              })}
              <div style={{ padding: '20px 24px', display: 'flex', gap: 10, alignItems: 'center', fontFamily: t.body, fontSize: 13, color: c.slate }}>
                <MBIcon name="check" size={14}/>
                Free wick trimmer at R800 —{' '}
                <strong style={{ color: c.navy, marginLeft: 4 }}>R{Math.max(0, 800 - cartSubtotal)} away</strong>
              </div>
            </div>
            <div style={{ padding: '20px 24px', borderTop: `1px solid ${c.line}`, background: c.paper }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontFamily: t.body, fontSize: 14, color: c.inkDim }}>
                <span>Subtotal</span><span>R{cartSubtotal}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, fontFamily: t.body, fontSize: 14, color: c.inkDim }}>
                <span>Shipping</span><span>Calculated next</span>
              </div>
              <Button variant="primary" full size="lg" onClick={() => { setCartOpen(false); go('checkout'); }}>
                Checkout · R{cartSubtotal}
              </Button>
              <button
                onClick={() => { setCartOpen(false); go('cart'); }}
                style={{ width: '100%', marginTop: 10, background: 'none', border: 'none', cursor: 'pointer', fontFamily: t.label, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: c.slate, padding: 8 }}
              >
                View full bag →
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
