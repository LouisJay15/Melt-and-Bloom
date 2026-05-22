import { useMB } from '../store/MBProvider';

export default function Toast({ msg }) {
  const { theme } = useMB();
  const { c, t }  = theme;
  return (
    <div style={{
      position: 'fixed', bottom: 24, left: '50%',
      transform: 'translateX(-50%)',
      background: c.navy, color: '#fff',
      padding: '12px 24px', borderRadius: 999,
      fontFamily: t.body, fontSize: 14,
      zIndex: 110, pointerEvents: 'none',
      boxShadow: '0 8px 24px rgba(15,28,55,0.25)',
      whiteSpace: 'nowrap',
      animation: 'mb-slide-up 0.25s ease',
    }}>
      {msg}
    </div>
  );
}
