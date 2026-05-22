import { useMB } from '../store/MBProvider';

export default function Button({ children, variant = 'primary', size = 'md', onClick, full, style = {} }) {
  const { theme } = useMB();
  const { c, m } = theme;
  const base = {
    fontFamily: theme.t.label,
    fontWeight: 600,
    letterSpacing: '0.16em',
    textTransform: 'uppercase',
    fontSize: size === 'sm' ? 11 : 12,
    padding: size === 'sm' ? '10px 18px' : size === 'lg' ? '18px 32px' : '14px 26px',
    border: '1px solid transparent',
    borderRadius: 999,
    cursor: 'pointer',
    transition: `all ${m.dur}ms ${m.ease}`,
    width: full ? '100%' : 'auto',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
    whiteSpace: 'nowrap',
  };
  const v = {
    primary:   { background: c.navy,        color: '#fff',   borderColor: c.navy },
    secondary: { background: 'transparent', color: c.navy,   borderColor: c.navy },
    ghost:     { background: 'transparent', color: c.navy,   borderColor: 'transparent' },
    ember:     { background: c.ember,       color: c.navy,   borderColor: c.ember },
    light:     { background: '#fff',        color: c.navy,   borderColor: '#fff' },
  }[variant] || {};

  return (
    <button
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = `scale(${m.hover})`;
        if (variant === 'primary') e.currentTarget.style.background = c.slate;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        if (variant === 'primary') e.currentTarget.style.background = c.navy;
      }}
      onClick={onClick}
      style={{ ...base, ...v, ...style }}
    >
      {children}
    </button>
  );
}
