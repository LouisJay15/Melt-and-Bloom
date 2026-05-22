import { useMB } from '../store/MBProvider';

export default function Body({ children, size = 16, dark, style = {} }) {
  const { theme } = useMB();
  return (
    <p style={{
      fontFamily: theme.t.body,
      fontSize: size,
      lineHeight: 1.7,
      margin: 0,
      textWrap: 'pretty',
      color: dark ? 'rgba(255,255,255,0.75)' : 'rgb(15, 28, 55)',
      ...style,
    }}>
      {children}
    </p>
  );
}
