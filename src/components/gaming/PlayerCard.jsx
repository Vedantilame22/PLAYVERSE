// ============================================================
// NEXORA — Player Card (Reusable)
// ============================================================
import Avatar from '@/components/common/Avatar';
import { VerifiedBadge, RankBadge } from '@/components/common/Badge';
import { getRankColor } from '@/utils';

export default function PlayerCard({ player, onConnect, onFollow, connected, followed, compact = false }) {
  const rankColor = getRankColor(player.currentRank || '');

  if (compact) return (
    <div className="nexora-card" style={{ padding: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
      <Avatar user={player} size="md" online={player.isOnline} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ fontWeight: 700, fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }} className="truncate">
            {player.displayName}
          </span>
          {player.isVerified && <VerifiedBadge />}
        </div>
        <p className="truncate" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>{player.primaryRole} • {player.primaryGame}</p>
        {player.currentRank && (
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: rankColor, fontWeight: 700 }}>{player.currentRank}</p>
        )}
      </div>
      <button
        className={`btn btn-sm ${connected ? 'btn-ghost' : 'btn-secondary'}`}
        onClick={() => onConnect?.(player.id)}
        style={{ fontSize: 11, padding: '5px 12px', flexShrink: 0 }}
      >
        {connected ? 'Connected' : 'Connect'}
      </button>
    </div>
  );

  return (
    <div className="nexora-card" style={{ padding: 0, overflow: 'hidden' }}>
      {/* Card cover */}
      <div style={{
        height: 60,
        background: `linear-gradient(135deg, ${player.avatarColor}22, ${player.avatarColor}08)`,
        borderBottom: `1px solid ${player.avatarColor}15`,
      }} />
      <div style={{ padding: '0 16px 16px' }}>
        <div style={{ marginTop: -24, marginBottom: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <Avatar user={player} size="lg" online={player.isOnline} ring />
          {player.lookingForTeam && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 4, padding: '3px 8px',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)',
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', display: 'block' }} />
              <span style={{ fontSize: 9, fontWeight: 700, color: '#10b981', letterSpacing: '0.04em' }}>LFT</span>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', marginBottom: 2 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-base)', color: 'var(--color-text-white)' }}>
            {player.displayName}
          </span>
          {player.isVerified && <VerifiedBadge />}
        </div>
        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: 10 }} className="truncate">
          {player.primaryRole} • {player.primaryGame} • {player.location}
        </p>

        {player.currentRank && (
          <div style={{ marginBottom: 12 }}>
            <span style={{
              fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 'var(--text-xs)',
              color: rankColor, background: `${rankColor}15`,
              padding: '3px 8px', borderRadius: 'var(--radius-full)',
              border: `1px solid ${rankColor}25`,
            }}>
              {player.currentRank}
            </span>
          </div>
        )}

        {player.mutualReason && (
          <p style={{ fontSize: 10, color: 'var(--color-text-muted)', marginBottom: 10 }}>
            {player.mutualsCount > 0 ? `${player.mutualsCount} mutual connections • ` : ''}{player.mutualReason}
          </p>
        )}

        <div style={{ display: 'flex', gap: 8 }}>
          <button
            className={`btn ${connected ? 'btn-ghost' : 'btn-primary'} btn-sm`}
            onClick={() => onConnect?.(player.id)}
            style={{ flex: 1, fontSize: 12 }}
          >
            {connected ? '✓ Connected' : '🤝 Connect'}
          </button>
          <button
            className={`btn ${followed ? 'btn-ghost' : 'btn-secondary'} btn-sm`}
            onClick={() => onFollow?.(player.id)}
            style={{ flex: 1, fontSize: 12 }}
          >
            {followed ? 'Following' : 'Follow'}
          </button>
        </div>
      </div>
    </div>
  );
}
