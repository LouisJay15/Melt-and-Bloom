import { useMB } from '../store/MBProvider';

export default function Eyebrow({ children, dark }) {
  const { theme } = useMB();
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      fontFamily: theme.t.label, fontSize: 11, letterSpacing: '0.24em',
      textTransform: 'uppercase',
      color: dark ? 'rgba(255,255,255,0.7)' : theme.c.slate,
      marginBottom: 18,
    }}>
      <span style={{ display: 'inline-block', width: 24, height: 1, background: dark ? 'rgba(255,255,255,0.4)' : theme.c.slate }}/>
      {children}
    </div>
  );
}
