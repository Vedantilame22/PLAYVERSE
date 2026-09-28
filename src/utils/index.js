// ============================================================
// NEXORA — Utility Functions
// ============================================================

/** Format large numbers: 1200 → 1.2K */
export function formatCount(n) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(n);
}

/** Get initials from display name */
export function getInitials(name = '') {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

/** Map rank string to a color */
export function getRankColor(rank = '') {
  const r = rank.toLowerCase();
  if (r.includes('radiant') || r.includes('predator')) return '#ff4655';
  if (r.includes('immortal') || r.includes('conqueror')) return '#8b5cf6';
  if (r.includes('ascendant') || r.includes('champion')) return '#4f8ef7';
  if (r.includes('diamond') || r.includes('master')) return '#00d4ff';
  if (r.includes('platinum') || r.includes('global')) return '#10b981';
  if (r.includes('gold') || r.includes('ace')) return '#f59e0b';
  if (r.includes('silver')) return '#94a3b8';
  if (r.includes('bronze') || r.includes('iron')) return '#f97316';
  return '#9095b4';
}

/** Map rarity to a color */
export function getRarityColor(rarity = '') {
  switch (rarity.toLowerCase()) {
    case 'legendary': return '#f59e0b';
    case 'epic': return '#8b5cf6';
    case 'rare': return '#4f8ef7';
    case 'uncommon': return '#10b981';
    default: return '#9095b4';
  }
}

/** Clamp number between min and max */
export function clamp(n, min, max) {
  return Math.min(Math.max(n, min), max);
}

/** Generate avatar gradient from color */
export function avatarGradient(color) {
  return `linear-gradient(135deg, ${color}dd, ${color}88)`;
}

/** Pluralize a word */
export function pluralize(count, singular, plural) {
  return `${count} ${count === 1 ? singular : plural ?? singular + 's'}`;
}

/** Truncate text to a max length */
export function truncate(text, max = 100) {
  if (!text || text.length <= max) return text;
  return text.slice(0, max) + '…';
}

/** Parse game type badge variant */
export function gameTypeBadge(type = '') {
  const t = type.toLowerCase();
  if (t.includes('competitive') || t.includes('pro') || t.includes('semi')) return 'primary';
  if (t.includes('casual') || t.includes('community')) return 'green';
  if (t.includes('content')) return 'violet';
  return 'ghost';
}
