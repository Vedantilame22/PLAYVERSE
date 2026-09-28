// ============================================================
// NEXORA — Badge Component
// ============================================================

export default function Badge({ children, variant = 'primary', className = '', style = {} }) {
  return (
    <span className={`badge badge-${variant} ${className}`} style={style}>
      {children}
    </span>
  );
}

/** Verification badge with icon */
export function VerifiedBadge({ type = 'verified', size = 'sm' }) {
  const configs = {
    verified: { icon: '✓', color: '#4f8ef7', label: 'Verified' },
    organizer: { icon: '🏆', color: '#f59e0b', label: 'Organizer Verified' },
    team: { icon: '🛡️', color: '#10b981', label: 'Team Verified' },
    platform: { icon: '🔗', color: '#8b5cf6', label: 'Platform Verified' },
    self: { icon: '📝', color: '#9095b4', label: 'Self Reported' },
  };
  const cfg = configs[type] || configs.verified;
  const sz = size === 'sm' ? 16 : 20;
  return (
    <span
      title={cfg.label}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: sz,
        height: sz,
        background: `${cfg.color}20`,
        border: `1px solid ${cfg.color}40`,
        borderRadius: '50%',
        fontSize: sz * 0.5,
        color: cfg.color,
        flexShrink: 0,
        cursor: 'default',
      }}
    >
      {cfg.icon}
    </span>
  );
}

/** Rank badge */
export function RankBadge({ rank, color }) {
  return (
    <span
      className="badge font-mono"
      style={{
        background: `${color}15`,
        color: color,
        border: `1px solid ${color}30`,
        fontSize: 'var(--text-xs)',
        letterSpacing: '0.05em',
      }}
    >
      {rank}
    </span>
  );
}

/** Game tag badge */
export function GameBadge({ game, color }) {
  return (
    <span
      className="badge"
      style={{
        background: `${color}12`,
        color: color,
        border: `1px solid ${color}25`,
        fontSize: 'var(--text-xs)',
      }}
    >
      {game}
    </span>
  );
}

/** Type badge: Competitive / Casual / Content */
export function TypeBadge({ type }) {
  const map = {
    Competitive: 'primary',
    'Semi-Professional': 'cyan',
    'Content + Competitive': 'violet',
    'Amateur Competitive': 'ghost',
    Casual: 'green',
  };
  const variant = map[type] || 'ghost';
  return <Badge variant={variant}>{type}</Badge>;
}
