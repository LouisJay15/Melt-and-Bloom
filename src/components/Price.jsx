import { useMB } from '../store/MBProvider';

export default function Price({ value, size = 16 }) {
  const { theme } = useMB();
  return (
    <span style={{ fontFamily: theme.t.body, fontSize: size, color: theme.c.slate, letterSpacing: '0.04em' }}>
      R{value}
    </span>
  );
}
