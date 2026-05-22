import { useMB } from '../store/MBProvider';

export default function Chip({ children, active, onClick }) {
  const { theme } = useMB();
  return (
    <button
      onClick={onClick}
      style={{
        fontFamily: theme.t.label, fontSize: 11, letterSpacing: '0.16em',
        textTransform: 'uppercase', fontWeight: 600,
        padding: '8px 16px', borderRadius: 999, cursor: 'pointer',
        border: `1px solid ${active ? theme.c.navy : theme.c.line}`,
        background: active ? theme.c.navy : 'transparent',
        color: active ? '#fff' : theme.c.navy,
        transition: `all ${theme.m.dur}ms ${theme.m.ease}`,
      }}
    >
      {children}
    </button>
  );
}
