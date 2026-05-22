export default function MBIcon({ name, size = 18, color = 'currentColor' }) {
  const s  = { width: size, height: size, display: 'inline-block', flex: 'none' };
  const sw = 1.25;
  switch (name) {
    case 'menu':    return <svg viewBox="0 0 24 24" style={s} fill="none" stroke={color} strokeWidth={sw}><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="17" x2="20" y2="17"/></svg>;
    case 'close':   return <svg viewBox="0 0 24 24" style={s} fill="none" stroke={color} strokeWidth={sw}><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>;
    case 'bag':     return <svg viewBox="0 0 24 24" style={s} fill="none" stroke={color} strokeWidth={sw}><path d="M5 8h14l-1 12H6L5 8z"/><path d="M9 8V6a3 3 0 016 0v2"/></svg>;
    case 'user':    return <svg viewBox="0 0 24 24" style={s} fill="none" stroke={color} strokeWidth={sw}><circle cx="12" cy="9" r="3.5"/><path d="M5 20c1-3.5 4-5 7-5s6 1.5 7 5"/></svg>;
    case 'search':  return <svg viewBox="0 0 24 24" style={s} fill="none" stroke={color} strokeWidth={sw}><circle cx="11" cy="11" r="6"/><line x1="20" y1="20" x2="16" y2="16"/></svg>;
    case 'arrow':   return <svg viewBox="0 0 24 24" style={s} fill="none" stroke={color} strokeWidth={sw}><line x1="4" y1="12" x2="20" y2="12"/><polyline points="14,6 20,12 14,18"/></svg>;
    case 'minus':   return <svg viewBox="0 0 24 24" style={s} fill="none" stroke={color} strokeWidth={sw}><line x1="6" y1="12" x2="18" y2="12"/></svg>;
    case 'plus':    return <svg viewBox="0 0 24 24" style={s} fill="none" stroke={color} strokeWidth={sw}><line x1="12" y1="6" x2="12" y2="18"/><line x1="6" y1="12" x2="18" y2="12"/></svg>;
    case 'check':   return <svg viewBox="0 0 24 24" style={s} fill="none" stroke={color} strokeWidth={sw}><polyline points="5,13 10,18 19,7"/></svg>;
    case 'flame':   return <svg viewBox="0 0 24 24" style={s} fill="none" stroke={color} strokeWidth={sw}><path d="M12 3c0 4 4 5 4 9a4 4 0 11-8 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-2-4 0-8z"/></svg>;
    case 'leaf':    return <svg viewBox="0 0 24 24" style={s} fill="none" stroke={color} strokeWidth={sw}><path d="M4 20C4 11 11 4 20 4c0 9-7 16-16 16z"/><line x1="4" y1="20" x2="14" y2="10"/></svg>;
    case 'star':    return <svg viewBox="0 0 24 24" style={s} fill={color} stroke={color} strokeWidth={0.5}><polygon points="12,3 14.5,9 21,9.5 16,14 17.5,20.5 12,17 6.5,20.5 8,14 3,9.5 9.5,9"/></svg>;
    case 'dot':     return <svg viewBox="0 0 24 24" style={s}><circle cx="12" cy="12" r="3" fill={color}/></svg>;
    case 'heart':   return <svg viewBox="0 0 24 24" style={s} fill="none" stroke={color} strokeWidth={sw}><path d="M12 20s-7-4.5-7-10a4 4 0 017-2.5A4 4 0 0119 10c0 5.5-7 10-7 10z"/></svg>;
    case 'wave':    return <svg viewBox="0 0 24 24" style={s} fill="none" stroke={color} strokeWidth={sw}><path d="M3 12c2-3 4-3 6 0s4 3 6 0 4-3 6 0"/></svg>;
    case 'chevR':   return <svg viewBox="0 0 24 24" style={s} fill="none" stroke={color} strokeWidth={sw}><polyline points="9,5 16,12 9,19"/></svg>;
    case 'chevL':   return <svg viewBox="0 0 24 24" style={s} fill="none" stroke={color} strokeWidth={sw}><polyline points="15,5 8,12 15,19"/></svg>;
    case 'chevD':   return <svg viewBox="0 0 24 24" style={s} fill="none" stroke={color} strokeWidth={sw}><polyline points="5,9 12,16 19,9"/></svg>;
    case 'sparkle': return <svg viewBox="0 0 24 24" style={s} fill="none" stroke={color} strokeWidth={sw}><path d="M12 3v6M12 15v6M3 12h6M15 12h6"/></svg>;
    case 'home':    return <svg viewBox="0 0 24 24" style={s} fill="none" stroke={color} strokeWidth={sw}><path d="M4 11l8-7 8 7v9a1 1 0 01-1 1h-4v-6h-6v6H5a1 1 0 01-1-1z"/></svg>;
    case 'grid':    return <svg viewBox="0 0 24 24" style={s} fill="none" stroke={color} strokeWidth={sw}><rect x="4" y="4" width="7" height="7"/><rect x="13" y="4" width="7" height="7"/><rect x="4" y="13" width="7" height="7"/><rect x="13" y="13" width="7" height="7"/></svg>;
    default:        return null;
  }
}
