const base = import.meta.env.BASE_URL;

export default function Logo({ size = 48, variant = 'dark' }) {
  const src = variant === 'light'
    ? `${base}images/logo-sand-on-navy.png`
    : `${base}images/logo-navy-on-sand.png`;
  return (
    <img
      src={src}
      alt="Melt & Bloom"
      style={{ height: size, width: size, display: 'inline-block', verticalAlign: 'middle', userSelect: 'none', flex: 'none' }}
    />
  );
}
