import { useMB } from '../store/MBProvider';
import MBIcon from './MBIcon';
import Price from './Price';

export default function CartRow({ p, qty, setQty, remove, dense }) {
  const { theme } = useMB();
  const { c, t }  = theme;
  if (!p) return null;
  return (
    <div style={{ padding: dense ? '16px 0' : '20px 24px', borderBottom: `1px solid ${c.line}`, display: 'flex', gap: 14 }}>
      <div style={{ width: 80, height: 80, flex: 'none', overflow: 'hidden', background: c.sand, borderRadius: 4 }}>
        <img src={p.img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt=""/>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
          <div style={{ fontFamily: t.display, fontStyle: t.displayItalic, fontSize: 18, color: c.navy }}>{p.name}</div>
          <button onClick={remove} style={{ background: 'none', border: 'none', cursor: 'pointer', color: c.slate, padding: 0 }}>
            <MBIcon name="close" size={14}/>
          </button>
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
