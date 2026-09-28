const fs = require('fs');
let css = fs.readFileSync('src/styles/globals.css', 'utf8');

// Replace CSS Variables
css = css.replace(/:root\s*\{[\s\S]*?\/\* Shadows \*\//, `:root {
  /* Base Colors - Deep Ink Black / Anime Comic Palette */
  --color-bg-primary: #09090b;
  --color-bg-secondary: #121214;
  --color-bg-tertiary: #18181b;
  --color-bg-card: #18181b;
  --color-bg-card-hover: #27272a;
  --color-bg-elevated: #27272a;
  --color-bg-glass: rgba(9, 9, 11, 0.7);
  --color-bg-glass-hover: rgba(24, 24, 27, 0.8);
  --color-bg-overlay: rgba(9, 9, 11, 0.95);

  /* Accent Colors - High Energy Anime */
  --color-primary: #00f0ff; /* Electric Cyan */
  --color-primary-light: #66f5ff;
  --color-primary-dim: rgba(0, 240, 255, 0.15);
  --color-primary-glow: rgba(0, 240, 255, 0.4);

  --color-cyan: #00d4ff;
  --color-violet: #a855f7;
  --color-magenta: #ff0055;
  --color-gold: #facc15;
  --color-green: #39ff14;
  --color-red: #ff3366;
  --color-orange: #ff6600;

  /* Ink & Comic outlines */
  --color-ink: #000000;

  /* Text Colors */
  --color-text-primary: #fafafa;
  --color-text-secondary: #a1a1aa;
  --color-text-muted: #52525b;
  --color-text-accent: #00f0ff;
  --color-text-white: #ffffff;

  /* Border Colors */
  --color-border: #3f3f46;
  --color-border-strong: #52525b;
  --color-border-accent: #00f0ff;

  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;

  /* Border Radius (Comic Style - Sharp) */
  --radius-sm: 0px;
  --radius-md: 4px;
  --radius-lg: 8px;
  --radius-xl: 12px;
  --radius-2xl: 16px;
  --radius-full: 9999px;

  /* Fonts */
  --font-comic: 'Bangers', cursive;
  --font-comic-sub: 'Teko', sans-serif;
  --font-display: 'Outfit', sans-serif;
  --font-body: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Font Sizes */
  --text-xs: 0.7rem;
  --text-sm: 0.8rem;
  --text-base: 0.9rem;
  --text-md: 1rem;
  --text-lg: 1.15rem;
  --text-xl: 1.3rem;
  --text-2xl: 1.6rem;
  --text-3xl: 2rem;
  --text-4xl: 2.5rem;

  /* Shadows */`);

// Replace body block
css = css.replace(/body\s*\{[\s\S]*?\}/, `body {
  font-family: var(--font-body);
  background-color: var(--color-bg-primary);
  background-image: 
    radial-gradient(var(--color-border-strong) 1px, transparent 1px),
    radial-gradient(var(--color-border-strong) 1px, transparent 1px);
  background-size: 20px 20px;
  background-position: 0 0, 10px 10px;
  background-attachment: fixed;
  color: var(--color-text-primary);
  line-height: 1.6;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}`);

// Replace nexora-card
css = css.replace(/\.nexora-card\s*\{[\s\S]*?\}/, `.nexora-card {
  background: var(--color-bg-card);
  border: 2px solid var(--color-ink);
  border-radius: 0;
  box-shadow: 6px 6px 0px var(--color-ink);
  position: relative;
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%);
}`);

css = css.replace(/\.nexora-card:hover\s*\{[\s\S]*?\}/, `.nexora-card:hover {
  transform: translate(-2px, -2px) rotate(-0.5deg);
  box-shadow: 8px 8px 0px var(--color-primary);
  border-color: var(--color-primary);
}`);

// Replace Section Title
css = css.replace(/\.section-title\s*\{[\s\S]*?\}/, `.section-title {
  font-family: var(--font-comic);
  font-size: var(--text-3xl);
  font-weight: normal;
  letter-spacing: 0.05em;
  color: var(--color-text-white);
  text-shadow: 2px 2px 0 var(--color-ink);
  text-transform: uppercase;
}`);

// Replace btn
css = css.replace(/\.btn\s*\{[\s\S]*?\}/, `.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: 10px 20px;
  font-family: var(--font-comic-sub);
  font-size: var(--text-xl);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border: 2px solid var(--color-ink);
  border-radius: 0;
  cursor: pointer;
  transition: all var(--transition-fast);
  position: relative;
  overflow: hidden;
  box-shadow: 4px 4px 0px var(--color-ink);
}

/* Add generic comic utility classes */
.comic-burst {
  font-family: var(--font-comic);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--color-primary);
  text-shadow: 2px 2px 0 var(--color-ink);
}

.comic-border {
  border: 2px solid var(--color-ink);
  box-shadow: 4px 4px 0px var(--color-ink);
}

.comic-clip {
  clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px);
}
`);

fs.writeFileSync('src/styles/globals.css', css);
console.log('Done!');
