import { Trophy, Target, Swords, PenSquare, Megaphone, Video, Heart, MessageCircle, Repeat2, Bookmark, Share2, MoreHorizontal } from 'lucide-react';
// ============================================================
// NEXORA — Post Card Component
// ============================================================
import { useState } from 'react';
import Avatar from '@/components/common/Avatar';
import { VerifiedBadge, GameBadge } from '@/components/common/Badge';
import { formatCount } from '@/utils';

const TYPE_CONFIG = {
  clip: { icon: <Video size={18} />, color: '#8b5cf6', label: 'Clip' },
  achievement: { icon: <Trophy size={18} />, color: '#f59e0b', label: 'Achievement' },
  'team-announcement': { icon: <Megaphone size={18} />, color: '#4f8ef7', label: 'Team Announcement' },
  tournament: { icon: <Swords size={18} />, color: '#10b981', label: 'Tournament' },
  'looking-for-team': { icon: <Target size={18} />, color: '#d946ef', label: 'Looking for Team' },
  post: { icon: <PenSquare size={18} />, color: '#9095b4', label: 'Post' },
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
    <article className="nexora-card" style={{
      padding: 20,
      border: '2px solid var(--color-ink)',
      boxShadow: '5px 5px 0px var(--color-ink)',
      position: 'relative',
      background: 'var(--color-bg-card)',
      transition: 'transform 0.15s ease, box-shadow 0.15s ease'
    }}>
      {/* Post type indicator */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: 'var(--color-bg-elevated)', border: '2px solid var(--color-ink)',
          boxShadow: '2px 2px 0px var(--color-ink)', padding: '2px 8px'
        }}>
          <span style={{ fontSize: 13, color: typeConfig.color }}>{typeConfig.icon}</span>
          <span style={{ fontFamily: 'var(--font-comic-sub)', fontSize: '15px', color: typeConfig.color, letterSpacing: '0.04em' }}>
            {typeConfig.label.toUpperCase()}
          </span>
        </div>
        <span style={{ fontFamily: 'var(--font-comic-sub)', fontSize: '15px', color: 'var(--color-text-muted)', marginLeft: 'auto' }}>
          {post.timestamp}
        </span>
      </div>

      {/* Author */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 14 }}>
        <div style={{ border: '2px solid var(--color-ink)', boxShadow: '2px 2px 0px var(--color-ink)' }}>
          <Avatar user={authorUser} size="md" />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'var(--font-comic-sub)', fontSize: '22px', color: 'var(--color-text-white)', letterSpacing: '0.03em', lineHeight: 1 }}>
              {post.authorName}
            </span>
            {post.authorVerified && <VerifiedBadge type="verified" />}
            <GameBadge game={post.game} color={gameColor} />
          </div>
          <p style={{ fontFamily: 'var(--font-comic-sub)', fontSize: '14px', color: 'var(--color-primary)', marginTop: 2 }}>{post.authorTitle}</p>
        </div>
        <button className="btn btn-icon btn-ghost btn-sm" aria-label="More options" style={{ border: '2px solid var(--color-ink)' }}>
          <MoreHorizontal size={16} />
        </button>
      </div>

      {/* Content */}
      <div style={{ marginBottom: 14 }}>
        <p style={{
          color: 'var(--color-text-primary)',
          fontSize: '15px',
          lineHeight: 1.6,
          whiteSpace: 'pre-line',
        }}>
          {post.content}
        </p>
      </div>

      {/* Media */}
      {post.mediaType && <MediaPlaceholder type={post.mediaType} />}

      {/* Tags */}
      {post.tags && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
          {post.tags.map((tag) => (
            <span key={tag} style={{
              fontFamily: 'var(--font-comic-sub)', fontSize: '15px',
              color: 'var(--color-primary)', background: 'var(--color-bg-elevated)',
              border: '1px solid var(--color-ink)', padding: '2px 8px',
              boxShadow: '1px 1px 0px var(--color-ink)', cursor: 'pointer'
            }}>
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Stats */}
      <div style={{
        display: 'flex', gap: 16, paddingBottom: 10,
        borderBottom: '2px dashed var(--color-border)',
        fontFamily: 'var(--font-comic-sub)', fontSize: '15px', color: 'var(--color-text-muted)',
      }}>
        <span>{formatCount(likes)} LIKES</span>
        <span>{formatCount(post.comments)} COMMENTS</span>
        <span>{formatCount(post.reposts)} REPOSTS</span>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 6, paddingTop: 10 }}>
        <button
          className="btn btn-sm"
          onClick={toggleLike}
          style={{
            flex: 1, gap: 6,
            background: liked ? 'var(--color-magenta)' : 'var(--color-bg-card)',
            color: liked ? 'var(--color-ink)' : 'var(--color-text-white)',
            border: '2px solid var(--color-ink)',
            boxShadow: '2px 2px 0px var(--color-ink)',
            fontFamily: 'var(--font-comic-sub)', fontSize: '16px'
          }}
        >
          <Heart size={16} fill={liked ? 'currentColor' : 'none'} /> LIKE
        </button>
        <button
          className="btn btn-sm"
          onClick={() => setShowComments((v) => !v)}
          style={{
            flex: 1, gap: 6,
            background: 'var(--color-bg-card)',
            color: 'var(--color-text-white)',
            border: '2px solid var(--color-ink)',
            boxShadow: '2px 2px 0px var(--color-ink)',
            fontFamily: 'var(--font-comic-sub)', fontSize: '16px'
          }}
        >
          <MessageCircle size={16} /> COMMENT
        </button>
        <button
          className="btn btn-sm"
          onClick={onRepost}
          style={{
            flex: 1, gap: 6,
            background: 'var(--color-bg-card)',
            color: 'var(--color-text-white)',
            border: '2px solid var(--color-ink)',
            boxShadow: '2px 2px 0px var(--color-ink)',
            fontFamily: 'var(--font-comic-sub)', fontSize: '16px'
          }}
        >
          <Repeat2 size={16} /> REPOST
        </button>
        <button
          className="btn btn-sm"
          onClick={toggleSave}
          style={{
            gap: 6,
            background: saved ? 'var(--color-primary)' : 'var(--color-bg-card)',
            color: saved ? 'var(--color-ink)' : 'var(--color-text-white)',
            border: '2px solid var(--color-ink)',
            boxShadow: '2px 2px 0px var(--color-ink)',
            fontFamily: 'var(--font-comic-sub)', fontSize: '16px'
          }}
        >
          <Bookmark size={16} fill={saved ? 'currentColor' : 'none'} />
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
