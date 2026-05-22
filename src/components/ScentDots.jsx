export default function ScentDots({ notes, size = 88, color = '#0f1c37' }) {
  const stroke = 0.8;
  const rings = [
    { r: size * 0.42, notes: notes.top },
    { r: size * 0.30, notes: notes.heart },
    { r: size * 0.16, notes: notes.base },
  ];
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: 'block' }}>
      {rings.map((ring, i) => (
        <g key={i}>
          <circle cx={size / 2} cy={size / 2} r={ring.r} stroke={color} strokeWidth={stroke} fill="none" opacity={0.25}/>
          {ring.notes.map((_, j) => {
            const total = Math.max(ring.notes.length, 1);
            const a  = (j / total) * Math.PI * 2 - Math.PI / 2;
            const cx = size / 2 + Math.cos(a) * ring.r;
            const cy = size / 2 + Math.sin(a) * ring.r;
            return <circle key={j} cx={cx} cy={cy} r={2.2} fill={color}/>;
          })}
        </g>
      ))}
    </svg>
  );
}
