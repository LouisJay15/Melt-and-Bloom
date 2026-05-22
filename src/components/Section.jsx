import { useMB } from '../store/MBProvider';

export default function Section({ children, dark, narrow, style = {}, viewport }) {
  const { theme, viewport: ctxVP } = useMB();
  const { c, d } = theme;
  const isMobile = (viewport || ctxVP) === 'mobile';
  const pY = isMobile ? d.section * 0.6 : d.section;
  const pX = isMobile ? d.padX / 2 : d.padX;
  // Pull any padding-side overrides out of the style prop so we always set
  // a single `padding` shorthand — prevents the React shorthand/longhand warning.
  const { paddingTop = pY, paddingBottom = pY, paddingLeft = pX, paddingRight = pX, ...rest } = style;
  return (
    <section style={{
      background: dark ? c.navy : 'transparent',
      color: dark ? '#fff' : c.ink,
      padding: `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`,
      ...rest,
    }}>
      <div style={{ maxWidth: narrow ? 880 : 1280, margin: '0 auto' }}>{children}</div>
    </section>
  );
}
