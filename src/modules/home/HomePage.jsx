// ============================================================
// NEXORA — Home Feed Page
// ============================================================
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { PenLine } from 'lucide-react';
import Avatar from '@/components/common/Avatar';
import PostCard from './components/PostCard';
import CreatePostModal from './components/CreatePostModal';
import { CURRENT_USER, PLAYERS, POSTS, EVENTS, COMMUNITIES } from '@/data/index';
import { formatCount, getRankColor } from '@/utils';
import { useModal } from '@/hooks';

// Right widget: Upcoming Events
function UpcomingEvents() {
  const navigate = useNavigate();
  return (
    <div className="nexora-card" style={{ padding: 18 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <h3 className="section-title" style={{ fontSize: 'var(--text-base)' }}>Upcoming Events</h3>
        <button className="btn btn-ghost btn-sm" onClick={() => navigate('/events')}>See all</button>
      </div>
      {EVENTS.slice(0, 3).map((event) => (
        <div key={event.id} style={{
          display: 'flex', gap: 10, padding: '10px 0',
          borderBottom: '1px solid var(--color-border)',
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 8, flexShrink: 0,
            background: `${event.color}15`, border: `1px solid ${event.color}25`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
          }}>{event.icon}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-text-primary)' }} className="truncate">
              {event.shortName}
            </p>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
              {event.date} • {event.game}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

// Right widget: Suggested Communities
function SuggestedCommunities() {
  const navigate = useNavigate();
  const [joined, setJoined] = useState({});
  return (
    <div className="nexora-card" style={{ padding: 18 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <h3 className="section-title" style={{ fontSize: 'var(--text-base)' }}>Communities</h3>
        <button className="btn btn-ghost btn-sm" onClick={() => navigate('/communities')}>See all</button>
      </div>
      {COMMUNITIES.slice(0, 4).map((c) => (
        <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid var(--color-border)' }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8, flexShrink: 0,
            background: `${c.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14,
          }}>{c.icon}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-text-primary)' }} className="truncate">{c.name}</p>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>{formatCount(c.memberCount)} members</p>
          </div>
          <button
            className={`btn btn-sm ${(joined[c.id] || c.isJoined) ? 'btn-ghost' : 'btn-secondary'}`}
            onClick={() => setJoined((p) => ({ ...p, [c.id]: !p[c.id] }))}
            style={{ fontSize: 11, padding: '4px 10px', flexShrink: 0 }}
          >
            {(joined[c.id] || c.isJoined) ? 'Joined' : '+ Join'}
          </button>
        </div>
      ))}
    </div>
  );
}

// Left widget: Profile Summary
function ProfileSummary() {
  const navigate = useNavigate();
  const u = CURRENT_USER;
  const rankColor = getRankColor(u.currentRank);
  return (
    <div className="nexora-card" style={{ overflow: 'hidden', cursor: 'pointer' }} onClick={() => navigate('/profile')}>
      {/* Cover */}
      <div style={{ height: 60, background: u.coverGradient }} />
      <div style={{ padding: '0 16px 16px' }}>
        {/* Avatar */}
        <div style={{ marginTop: -24, marginBottom: 8 }}>
          <Avatar user={u} size="lg" ring online={u.isOnline} />
        </div>
        <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-base)', color: 'var(--color-text-white)' }}>
          {u.displayName}
        </p>
        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: 8 }}>{u.title}</p>
        {u.lookingForTeam && (
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '3px 10px', borderRadius: 'var(--radius-full)',
            background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)',
            marginBottom: 10,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', animation: 'dotPulse 2s ease-in-out infinite', display: 'block' }} />
            <span style={{ fontSize: 10, fontWeight: 600, color: '#10b981', letterSpacing: '0.04em' }}>LOOKING FOR TEAM</span>
          </div>
        )}
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          padding: '10px 0', borderTop: '1px solid var(--color-border)', marginTop: 4,
        }}>
          {[
            { label: 'Connections', value: formatCount(u.connections) },
            { label: 'Followers', value: formatCount(u.followers) },
          ].map(({ label, value }) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <p style={{ fontWeight: 700, color: 'var(--color-primary)', fontFamily: 'var(--font-display)', fontSize: 'var(--text-sm)' }}>{value}</p>
              <p style={{ fontSize: 10, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</p>
            </div>
          ))}
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 'var(--text-xs)', color: rankColor }}>{u.currentRank}</p>
            <p style={{ fontSize: 10, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Rank</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Feed Composer
function FeedComposer({ onOpen }) {
  return (
    <div className="nexora-card" style={{ padding: 16 }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 14 }}>
        <Avatar user={CURRENT_USER} size="md" online />
        <button
          onClick={onOpen}
          style={{
            flex: 1, padding: '10px 16px', background: 'var(--color-bg-elevated)',
            border: '1px solid var(--color-border)', borderRadius: 'var(--radius-full)',
            color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)', cursor: 'text',
            textAlign: 'left', transition: 'all var(--transition-fast)',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-border-accent)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
        >
          What are you gaming today, {CURRENT_USER.displayName.split(' ')[0]}?
        </button>
      </div>
      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
        {[
          { icon: '🎮', label: 'Achievement' },
          { icon: '📹', label: 'Clip' },
          { icon: '🏆', label: 'Tournament' },
          { icon: '📢', label: 'Team Opening' },
          { icon: '🎯', label: 'LFT' },
        ].map(({ icon, label }) => (
          <button key={label} className="btn btn-ghost btn-sm" onClick={onOpen} style={{ gap: 6, fontSize: 11 }}>
            {icon} {label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  const { showToast } = useOutletContext() || {};
  const [posts, setPosts] = useState(POSTS);
  const createModal = useModal();

  return (
    <div className="main-grid-3" style={{ paddingTop: 8 }}>
      {/* Left Column */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <ProfileSummary />
        <div className="nexora-card" style={{ padding: 16 }}>
          <h3 className="section-title" style={{ fontSize: 'var(--text-sm)', marginBottom: 12 }}>Quick Links</h3>
          {[
            { icon: '🎯', label: 'My Team Openings', path: '/teams' },
            { icon: '🟢', label: 'Looking for Team', path: '/opportunities' },
            { icon: '🏅', label: 'My Achievements', path: '/profile' },
            { icon: '📅', label: 'Upcoming Events', path: '/events' },
          ].map(({ icon, label }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 4px', cursor: 'pointer', borderRadius: 'var(--radius-sm)' }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-bg-elevated)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <span>{icon}</span>
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Center Column - Feed */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <FeedComposer onOpen={createModal.open} />
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onComment={() => showToast?.('Comment posted!', 'success')}
            onRepost={() => showToast?.('Reposted!', 'success')}
          />
        ))}
      </div>

      {/* Right Column */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <UpcomingEvents />
        <SuggestedCommunities />
        {/* Trending players */}
        <div className="nexora-card" style={{ padding: 18 }}>
          <h3 className="section-title" style={{ fontSize: 'var(--text-base)', marginBottom: 14 }}>Players to Know</h3>
          {PLAYERS.slice(0, 4).map((p) => (
            <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid var(--color-border)' }}>
              <Avatar user={p} size="sm" online={p.isOnline} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-text-primary)' }} className="truncate">{p.displayName}</p>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }} className="truncate">{p.primaryRole} • {p.primaryGame}</p>
              </div>
              <button className="btn btn-secondary btn-sm" style={{ fontSize: 11, padding: '4px 10px', flexShrink: 0 }}>
                Connect
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={createModal.isOpen}
        onClose={createModal.close}
        onSubmit={() => { createModal.close(); showToast?.('Post published!', 'success'); }}
      />
    </div>
  );
}
