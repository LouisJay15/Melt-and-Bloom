import { useMB } from '../store/MBProvider';

export default function Field({ label, value, onChange, placeholder }) {
  const { theme } = useMB();
  const { c, t }  = theme;
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span style={{ fontFamily: t.body, fontSize: 12, color: c.slate }}>{label}</span>
      <input
        value={value ?? ''}
        onChange={(e) => onChange && onChange(e.target.value)}
        placeholder={placeholder}
        style={{ padding: '12px 14px', border: `1px solid ${c.line}`, borderRadius: 4, fontFamily: t.body, fontSize: 14, background: '#fff', outline: 'none', color: c.navy }}
        onFocus={(e)  => { e.currentTarget.style.borderColor = c.navy; }}
        onBlur={(e)   => { e.currentTarget.style.borderColor = c.line; }}
      />
    </label>
  );
}
