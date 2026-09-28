// ============================================================
// NEXORA — Post Card Component
// ============================================================
import { useState } from 'react';
import { Heart, MessageCircle, Repeat2, Bookmark, Share2, MoreHorizontal } from 'lucide-react';
import Avatar from '@/components/common/Avatar';
import { VerifiedBadge, GameBadge } from '@/components/common/Badge';
import { formatCount } from '@/utils';

const TYPE_CONFIG = {
  clip: { icon: '📹', color: '#8b5cf6', label: 'Clip' },
  achievement: { icon: '🏆', color: '#f59e0b', label: 'Achievement' },
  'team-announcement': { icon: '📢', color: '#4f8ef7', label: 'Team Announcement' },
  tournament: { icon: '⚔️', color: '#10b981', label: 'Tournament' },
  'looking-for-team': { icon: '🎯', color: '#d946ef', label: 'Looking for Team' },
  post: { icon: '📝', color: '#9095b4', label: 'Post' },
};

const GAME_COLORS = {
  Valorant: '#ff4655', BGMI: '#f59e0b', CS2: '#00d4ff',
  'Apex Legends': '#10b981', Minecraft: '#84cc16',
  'League of Legends': '#a78bfa', Fortnite: '#6ee7b7',
};

function MediaPlaceholder({ type }) {
  if (type === 'video') return (
    <div style={{
      height: 180, borderRadius: 'var(--radius-md)',
      background: 'linear-gradient(135deg, #111523, #1a1e30)',
      border: '1px solid var(--color-border)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      gap: 8, cursor: 'pointer', marginBottom: 12,
      transition: 'border-color var(--transition-fast)',
    }}
    onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--color-border-accent)'}
    onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--color-border)'}
    >
      <div style={{
        width: 48, height: 48, borderRadius: '50%',
        background: 'rgba(79,142,247,0.15)',
        border: '2px solid rgba(79,142,247,0.3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 20,
      }}>▶</div>
      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>Game Clip</p>
    </div>
  );
  if (type === 'image') return (
    <div style={{
      height: 160, borderRadius: 'var(--radius-md)',
      background: 'linear-gradient(135deg, #1a0533, #0d1a3a)',
      border: '1px solid var(--color-border)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 32, marginBottom: 12,
    }}>🖼️</div>
  );
  return null;
}

export default function PostCard({ post, onLike, onComment, onRepost, onSave }) {
  const [liked, setLiked] = useState(post.liked);
  const [saved, setSaved] = useState(post.saved);
  const [likes, setLikes] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState('');

  const typeConfig = TYPE_CONFIG[post.type] || TYPE_CONFIG.post;
  const gameColor = GAME_COLORS[post.game] || '#4f8ef7';
  const authorUser = { displayName: post.authorName, avatarColor: post.authorAvatarColor };

  function toggleLike() {
    setLiked((v) => !v);
    setLikes((c) => c + (liked ? -1 : 1));
    onLike?.(post.id);
  }

  function toggleSave() {
    setSaved((v) => !v);
    onSave?.(post.id);
  }

  return (
    <article className="nexora-card" style={{ padding: 20, animation: 'fadeIn 0.4s ease forwards' }}>
      {/* Post type indicator */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
        <span style={{ fontSize: 12, color: typeConfig.color }}>{typeConfig.icon}</span>
        <span style={{ fontSize: 'var(--text-xs)', color: typeConfig.color, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {typeConfig.label}
        </span>
        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginLeft: 'auto' }}>
          {post.timestamp}
        </span>
      </div>

      {/* Author */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 14 }}>
        <Avatar user={authorUser} size="md" />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
            <span style={{ fontWeight: 700, color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)' }}>
              {post.authorName}
            </span>
            {post.authorVerified && <VerifiedBadge type="verified" />}
            <GameBadge game={post.game} color={gameColor} />
          </div>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: 2 }}>{post.authorTitle}</p>
        </div>
        <button className="btn btn-icon btn-ghost btn-sm" aria-label="More options">
          <MoreHorizontal size={16} />
        </button>
      </div>

      {/* Content */}
      <div style={{ marginBottom: 14 }}>
        <p style={{
          color: 'var(--color-text-primary)',
          fontSize: 'var(--text-base)',
          lineHeight: 1.7,
          whiteSpace: 'pre-line',
        }}>
          {post.content}
        </p>
      </div>

      {/* Media */}
      {post.mediaType && <MediaPlaceholder type={post.mediaType} />}

      {/* Tags */}
      {post.tags && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
          {post.tags.map((tag) => (
            <span key={tag} style={{ fontSize: 'var(--text-xs)', color: 'var(--color-primary)', cursor: 'pointer' }}>
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Stats */}
      <div style={{
        display: 'flex', gap: 16, paddingBottom: 12,
        borderBottom: '1px solid var(--color-border)',
        fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)',
      }}>
        <span>{formatCount(likes)} likes</span>
        <span>{formatCount(post.comments)} comments</span>
        <span>{formatCount(post.reposts)} reposts</span>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 4, paddingTop: 10 }}>
        <button
          className="btn btn-ghost btn-sm"
          onClick={toggleLike}
          style={{
            flex: 1, gap: 6,
            color: liked ? '#ef4444' : 'var(--color-text-muted)',
            borderColor: liked ? 'rgba(239,68,68,0.2)' : 'transparent',
          }}
        >
          <Heart size={15} fill={liked ? '#ef4444' : 'none'} /> Like
        </button>
        <button
          className="btn btn-ghost btn-sm"
          onClick={() => setShowComments((v) => !v)}
          style={{ flex: 1, gap: 6, color: 'var(--color-text-muted)' }}
        >
          <MessageCircle size={15} /> Comment
        </button>
        <button
          className="btn btn-ghost btn-sm"
          style={{ flex: 1, gap: 6, color: 'var(--color-text-muted)' }}
        >
          <Repeat2 size={15} /> Repost
        </button>
        <button
          className="btn btn-ghost btn-sm"
          onClick={toggleSave}
          style={{
            gap: 6,
            color: saved ? 'var(--color-primary)' : 'var(--color-text-muted)',
            borderColor: saved ? 'var(--color-border-accent)' : 'transparent',
          }}
        >
          <Bookmark size={15} fill={saved ? 'var(--color-primary)' : 'none'} />
        </button>
      </div>

      {/* Comment Box */}
      {showComments && (
        <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
          <Avatar user={{ displayName: 'V', avatarColor: '#4f8ef7' }} size="sm" />
          <div style={{ flex: 1, display: 'flex', gap: 8 }}>
            <input
              className="input"
              placeholder="Write a comment…"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              style={{ flex: 1, height: 36, fontSize: 'var(--text-sm)' }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && comment.trim()) {
                  setComment('');
                  onComment?.(post.id, comment);
                }
              }}
            />
            <button
              className="btn btn-primary btn-sm"
              disabled={!comment.trim()}
              onClick={() => { onComment?.(post.id, comment); setComment(''); }}
            >
              Post
            </button>
          </div>
        </div>
      )}
    </article>
  );
}
