import { useMB } from '../store/MBProvider';

export default function SummaryRow({ label, value, bold }) {
  const { theme } = useMB();
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontFamily: theme.t.body, fontSize: bold ? 17 : 14, color: bold ? theme.c.navy : theme.c.inkDim, fontWeight: bold ? 600 : 400 }}>
      <span>{label}</span>
      <span>{value || ''}</span>
    </div>
  );
}
