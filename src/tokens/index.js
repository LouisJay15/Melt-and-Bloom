export const TWEAK_DEFAULTS = {
  typePair: 'editorial',
  heroLayout: 'cinematic',
  cardStyle: 'circular',
  density: 'breathable',
  motion: 'subtle',
  tone: 'poetic',
};

export const TYPE_PAIRS = {
  editorial: { display: "'Libre Caslon Text', 'Cormorant Garamond', serif", body: "'Hanken Grotesk', system-ui, sans-serif", label: "'Hanken Grotesk', system-ui, sans-serif", weightBody: 400, weightDisplay: 400, displayItalic: 'italic', kerning: '-0.01em' },
  soft:      { display: "'Cormorant Garamond', 'Libre Caslon Text', serif", body: "'Manrope', system-ui, sans-serif",          label: "'Manrope', system-ui, sans-serif",          weightBody: 400, weightDisplay: 500, displayItalic: 'italic', kerning: '-0.015em' },
  crisp:     { display: "'Playfair Display', serif",                         body: "'Outfit', system-ui, sans-serif",           label: "'Outfit', system-ui, sans-serif",           weightBody: 400, weightDisplay: 500, displayItalic: 'italic', kerning: '-0.02em' },
};

export const DENSITY = {
  cozy:       { section: 64,  block: 32, gap: 16, padX: 28 },
  breathable: { section: 96,  block: 48, gap: 24, padX: 40 },
  spacious:   { section: 128, block: 64, gap: 32, padX: 56 },
};

export const MOTION = {
  off:        { dur: 0,   ease: 'linear',                   hover: 1.0  },
  subtle:     { dur: 350, ease: 'cubic-bezier(.2,.7,.2,1)', hover: 1.02 },
  expressive: { dur: 600, ease: 'cubic-bezier(.16,1,.3,1)', hover: 1.05 },
};

export const COLORS = {
  navy:      '#0f1c37',
  navyDeep:  '#091022',
  slate:     '#2b4162',
  slateDim:  '#3a4664',
  sand:      '#e2d2c0',
  sandDeep:  '#d8c8b7',
  paper:     '#ede0d4',
  ink:       '#1a1c1c',
  inkDim:    '#6b6760',
  line:      '#c8baa7',
  ember:     'oklch(0.72 0.08 60)',
  emberDeep: 'oklch(0.55 0.10 50)',
};
