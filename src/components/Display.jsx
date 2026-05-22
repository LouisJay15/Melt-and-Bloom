import { useMB } from '../store/MBProvider';

export default function Display({ children, size, dark, italic = true, style = {} }) {
  const { theme } = useMB();
  return (
    <h1 style={{
      fontFamily: theme.t.display,
      fontStyle: italic ? theme.t.displayItalic : 'normal',
      fontSize: size,
      fontWeight: theme.t.weightDisplay,
      color: dark ? '#fff' : theme.c.navy,
      letterSpacing: theme.t.kerning,
      lineHeight: 1.05,
      margin: 0,
      textWrap: 'pretty',
      ...style,
    }}>
      {children}
    </h1>
  );
}
