const base = import.meta.env.BASE_URL;

export default function Logo({ size = 48, variant = 'dark' }) {
  const src = variant === 'light'
    ? `${base}images/logo-sand-on-navy.png`
    : `${base}images/logo-navy-on-sand.png`;
  const bg = variant === 'light' ? '#0f1c37' : '#e2d2c0';
  return (
    <span style={{
      display: 'inline-block', height: size, width: size,
      borderRadius: '50%', overflow: 'hidden', background: bg,
      userSelect: 'none', flex: 'none', verticalAlign: 'middle',
    }}>
      <img
        src={src}
        alt="Melt & Bloom"
        style={{ height: '108%', width: '108%', marginLeft: '-4%', marginTop: '-4%', display: 'block', objectFit: 'contain' }}
      />
    </span>
  );
}
