import { Trophy, Target, Award, Gamepad2, Calendar, Megaphone, Video, CircleDot, PenLine } from 'lucide-react';
// ============================================================
// NEXORA — Home Feed Page
// ============================================================
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
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
    <div className="nexora-card" style={{ padding: 18, border: '2px solid var(--color-ink)', boxShadow: '4px 4px 0px var(--color-ink)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14, borderBottom: '2px solid var(--color-ink)', paddingBottom: 8 }}>
        <h3 style={{ fontFamily: 'var(--font-comic)', fontSize: '24px', color: 'var(--color-primary)', margin: 0, letterSpacing: '0.04em' }}>UPCOMING TOURNAMENTS</h3>
        <button className="btn btn-sm btn-secondary" onClick={() => navigate('/events')} style={{ fontFamily: 'var(--font-comic-sub)', fontSize: '15px', padding: '2px 8px' }}>ALL</button>
      </div>
      {EVENTS.slice(0, 3).map((event) => (
        <div key={event.id} style={{
          display: 'flex', gap: 10, padding: '10px 0',
          borderBottom: '2px dashed var(--color-border)',
          alignItems: 'center'
        }}>
          <div style={{
            width: 38, height: 38, flexShrink: 0,
            background: 'var(--color-bg-elevated)', border: '2px solid var(--color-ink)',
            boxShadow: '2px 2px 0px var(--color-ink)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
          }}>{event.icon}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontFamily: 'var(--font-comic-sub)', fontSize: '18px', color: 'var(--color-text-white)', margin: 0, lineHeight: 1.1 }} className="truncate">
              {event.shortName}
            </p>
            <p style={{ fontFamily: 'var(--font-comic-sub)', fontSize: '14px', color: 'var(--color-cyan)', margin: 0 }}>
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
    <div className="nexora-card" style={{ padding: 18, border: '2px solid var(--color-ink)', boxShadow: '4px 4px 0px var(--color-ink)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14, borderBottom: '2px solid var(--color-ink)', paddingBottom: 8 }}>
        <h3 style={{ fontFamily: 'var(--font-comic)', fontSize: '24px', color: 'var(--color-accent)', margin: 0, letterSpacing: '0.04em' }}>ACTIVE GUILDS</h3>
        <button className="btn btn-sm btn-secondary" onClick={() => navigate('/communities')} style={{ fontFamily: 'var(--font-comic-sub)', fontSize: '15px', padding: '2px 8px' }}>ALL</button>
      </div>
      {COMMUNITIES.slice(0, 4).map((c) => (
        <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '2px dashed var(--color-border)' }}>
          <div style={{
            width: 36, height: 36, flexShrink: 0,
            background: 'var(--color-bg-elevated)', border: '2px solid var(--color-ink)',
            boxShadow: '2px 2px 0px var(--color-ink)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
          }}>{c.icon}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontFamily: 'var(--font-comic-sub)', fontSize: '18px', color: 'var(--color-text-white)', margin: 0, lineHeight: 1.1 }} className="truncate">{c.name}</p>
            <p style={{ fontFamily: 'var(--font-comic-sub)', fontSize: '14px', color: 'var(--color-text-muted)', margin: 0 }}>{formatCount(c.memberCount)} MEMBERS</p>
          </div>
          <button
            className={`btn btn-sm ${(joined[c.id] || c.isJoined) ? 'btn-ghost' : 'btn-primary'}`}
            onClick={() => setJoined((p) => ({ ...p, [c.id]: !p[c.id] }))}
            style={{ fontFamily: 'var(--font-comic-sub)', fontSize: 15, padding: '3px 10px', flexShrink: 0 }}
          >
            {(joined[c.id] || c.isJoined) ? 'JOINED' : '+ JOIN'}
          </button>
        </div>
      ))}
    </div>
  );
}

// Left widget: Player Hero (Comic Anime Style)
function ProfileSummary() {
  const navigate = useNavigate();
  const u = CURRENT_USER;
  const rankColor = getRankColor(u.currentRank);
  return (
    <div className="nexora-card" style={{ overflow: 'hidden', cursor: 'pointer', padding: 0 }} onClick={() => navigate('/profile')}>
      {/* Anime Header Cover */}
      <div style={{
        height: 100,
        background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-cyan) 100%)',
        position: 'relative',
        clipPath: 'polygon(0 0, 100% 0, 100% 80%, 0 100%)',
        overflow: 'hidden'
      }}>
        {/* Speed lines effect */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(0,0,0,0.1) 10px, rgba(0,0,0,0.1) 20px)',
          opacity: 0.5,
          transform: 'skewX(-20deg) scale(1.5)'
        }} />
        <div style={{ position: 'absolute', bottom: 10, right: 10, fontSize: 40, opacity: 0.2, fontWeight: 900, fontFamily: 'var(--font-comic)', color: 'var(--color-ink)', transform: 'rotate(-5deg)' }}>
          {u.primaryGame}
        </div>
      </div>

      <div style={{ padding: '0 16px 16px', position: 'relative' }}>
        {/* Avatar with comic thick border */}
        <div style={{ marginTop: -40, marginBottom: 12, display: 'inline-block', position: 'relative', zIndex: 2 }}>
          <div style={{ border: '3px solid var(--color-ink)', background: 'var(--color-bg-primary)', display: 'inline-block', boxShadow: '4px 4px 0px var(--color-ink)' }}>
            <Avatar user={u} size="lg" online={u.isOnline} />
          </div>
        </div>
        
        <p style={{ fontFamily: 'var(--font-comic)', fontSize: '28px', color: 'var(--color-text-white)', lineHeight: 1, textShadow: '2px 2px 0px var(--color-ink)' }}>
          {u.displayName}
        </p>
        <p style={{ fontFamily: 'var(--font-comic-sub)', fontSize: '20px', color: 'var(--color-primary)', textTransform: 'uppercase', marginBottom: 12 }}>{u.title}</p>
        
        {u.lookingForTeam && (
          <div style={{
            display: 'inline-flex', alignItems: 'center',
            padding: '4px 12px', background: 'var(--color-green)',
            border: '2px solid var(--color-ink)', boxShadow: '2px 2px 0px var(--color-ink)',
            marginBottom: 16, transform: 'rotate(-2deg)'
          }}>
            <span style={{ fontFamily: 'var(--font-comic-sub)', fontSize: 16, fontWeight: 600, color: 'var(--color-ink)' }}>LOOKING FOR TEAM</span>
          </div>
        )}
        
        {/* Stats Grid - Comic Style */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8,
          padding: '12px 0 0', borderTop: '2px dashed var(--color-border-strong)',
        }}>
          {[
            { label: 'CONNS', value: formatCount(u.connections) },
            { label: 'FOLLOWS', value: formatCount(u.followers) },
          ].map(({ label, value }) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <p style={{ fontFamily: 'var(--font-comic)', fontSize: '22px', color: 'var(--color-text-white)', lineHeight: 1 }}>{value}</p>
              <p style={{ fontFamily: 'var(--font-comic-sub)', fontSize: 16, color: 'var(--color-text-muted)' }}>{label}</p>
            </div>
          ))}
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontFamily: 'var(--font-comic)', fontSize: '22px', color: rankColor, lineHeight: 1, textShadow: '1px 1px 0px var(--color-ink)' }}>{u.currentRank}</p>
            <p style={{ fontFamily: 'var(--font-comic-sub)', fontSize: 16, color: 'var(--color-text-muted)' }}>RANK</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Feed Composer
function FeedComposer({ onOpen }) {
  return (
    <div style={{ marginBottom: 20 }}>
      {/* Anime Comic Action Banner */}
      <div className="nexora-card" style={{ 
        padding: '24px 28px', 
        marginBottom: 20, 
        background: 'linear-gradient(135deg, #1f1144 0%, #0d0b1a 100%)',
        border: '3px solid var(--color-ink)',
        boxShadow: '6px 6px 0px var(--color-ink)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Halftone dot pattern overlay */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: 'radial-gradient(var(--color-primary-dim) 1.5px, transparent 1.5px)',
          backgroundSize: '12px 12px',
          opacity: 0.35,
          pointerEvents: 'none'
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'var(--color-accent)', padding: '2px 8px', border: '2px solid var(--color-ink)', boxShadow: '2px 2px 0px var(--color-ink)', marginBottom: 8, transform: 'rotate(-1deg)' }}>
            <span style={{ fontFamily: 'var(--font-comic-sub)', fontSize: '15px', color: 'var(--color-ink)', fontWeight: 800 }}>PLAYER BROADCAST</span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-comic)', fontSize: '32px', color: 'var(--color-primary)', margin: '0 0 6px 0', letterSpacing: '0.04em', textShadow: '2px 2px 0px var(--color-ink)', lineHeight: 1 }}>
            BROADCAST YOUR PLAY, {CURRENT_USER.displayName.split(' ')[0]}!
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', maxWidth: '85%', margin: 0, fontFamily: 'var(--font-comic-sub)', letterSpacing: '0.02em' }}>
            Unleash your battle highlights, assemble your squad, or call out for high-tier scrims.
          </p>
        </div>
      </div>

      <div className="nexora-card" style={{ padding: 18, border: '2px solid var(--color-ink)', boxShadow: '4px 4px 0px var(--color-ink)' }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16 }}>
          <div style={{ border: '2px solid var(--color-ink)', boxShadow: '2px 2px 0px var(--color-ink)' }}>
            <Avatar user={CURRENT_USER} size="md" online />
          </div>
          <button
            onClick={onOpen}
            style={{
              flex: 1, padding: '12px 18px', background: 'var(--color-bg-elevated)',
              border: '2px solid var(--color-ink)',
              color: 'var(--color-text-muted)', fontSize: '18px', cursor: 'pointer',
              textAlign: 'left', transition: 'all var(--transition-fast)',
              fontFamily: 'var(--font-comic-sub)', letterSpacing: '0.04em',
              boxShadow: '3px 3px 0px var(--color-ink)'
            }}
            onMouseEnter={(e) => { 
              e.currentTarget.style.borderColor = 'var(--color-primary)'; 
              e.currentTarget.style.transform = 'translate(-2px, -2px)';
              e.currentTarget.style.boxShadow = '5px 5px 0px var(--color-primary)';
            }}
            onMouseLeave={(e) => { 
              e.currentTarget.style.borderColor = 'var(--color-ink)'; 
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = '3px 3px 0px var(--color-ink)';
            }}
          >
            WRITE A NEW DISPATCH OR SHARE A CLIP...
          </button>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', paddingTop: 12, borderTop: '2px dashed var(--color-border-strong)' }}>
          {[
            { icon: <Gamepad2 size={16} />, label: 'ACHIEVEMENT', color: 'var(--color-primary)' },
            { icon: <Video size={16} />, label: 'CLIP', color: 'var(--color-cyan)' },
            { icon: <Trophy size={16} />, label: 'TOURNAMENT', color: 'var(--color-primary)' },
            { icon: <Megaphone size={16} />, label: 'TEAM OPENING', color: 'var(--color-magenta)' },
            { icon: <Target size={16} />, label: 'L F T', color: 'var(--color-green)' },
          ].map(({ icon, label, color }) => (
            <button
              key={label}
              className="btn btn-sm"
              onClick={onOpen}
              style={{
                background: 'var(--color-bg-card)',
                border: '2px solid var(--color-ink)',
                boxShadow: '2px 2px 0px var(--color-ink)',
                color: 'var(--color-text-white)',
                padding: '6px 12px',
                fontFamily: 'var(--font-comic-sub)',
                fontSize: '16px',
                letterSpacing: '0.04em',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translate(-1px, -1px)';
                e.currentTarget.style.boxShadow = '3px 3px 0px var(--color-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '2px 2px 0px var(--color-ink)';
              }}
            >
              <span style={{ color }}>{icon}</span> 
              <span>{label}</span>
            </button>
          ))}
        </div>
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
        <div className="nexora-card" style={{ padding: 16, border: '2px solid var(--color-ink)', boxShadow: '4px 4px 0px var(--color-ink)' }}>
          <h3 style={{ fontFamily: 'var(--font-comic)', fontSize: '22px', color: 'var(--color-primary)', marginBottom: 10, letterSpacing: '0.04em' }}>QUICK DISPATCH</h3>
          {[
            { icon: <Target size={18} color="var(--color-primary)" />, label: 'MY SQUAD OPENINGS', path: '/teams' },
            { icon: <CircleDot size={18} color="var(--color-cyan)" />, label: 'LOOKING FOR TEAM (LFT)', path: '/opportunities' },
            { icon: <Award size={18} color="var(--color-magenta)" />, label: 'BATTLE ACHIEVEMENTS', path: '/profile' },
            { icon: <Calendar size={18} color="var(--color-green)" />, label: 'TOURNAMENT SCHEDULE', path: '/events' },
          ].map(({ icon, label, path }) => (
            <div key={label} style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '10px 8px', cursor: 'pointer',
              borderBottom: '1px dashed var(--color-border)', transition: 'all 0.15s ease'
            }}
              onClick={() => navigate(path)}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-bg-elevated)'; e.currentTarget.style.transform = 'translateX(4px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'none'; }}
            >
              <span>{icon}</span>
              <span style={{ fontFamily: 'var(--font-comic-sub)', fontSize: '17px', color: 'var(--color-text-white)', letterSpacing: '0.03em' }}>{label}</span>
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
        <div className="nexora-card" style={{ padding: 18, border: '2px solid var(--color-ink)', boxShadow: '4px 4px 0px var(--color-ink)' }}>
          <h3 style={{ fontFamily: 'var(--font-comic)', fontSize: '24px', color: 'var(--color-cyan)', margin: '0 0 12px 0', letterSpacing: '0.04em' }}>TOP RIVALS</h3>
          {PLAYERS.slice(0, 4).map((p) => (
            <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: '2px dashed var(--color-border)' }}>
              <div style={{ border: '2px solid var(--color-ink)', boxShadow: '2px 2px 0px var(--color-ink)' }}>
                <Avatar user={p} size="sm" online={p.isOnline} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontFamily: 'var(--font-comic-sub)', fontSize: '18px', color: 'var(--color-text-white)', margin: 0, lineHeight: 1.1 }} className="truncate">{p.displayName}</p>
                <p style={{ fontFamily: 'var(--font-comic-sub)', fontSize: '14px', color: 'var(--color-primary)', margin: 0 }} className="truncate">{p.primaryRole} • {p.primaryGame}</p>
              </div>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => showToast?.(`Challenged ${p.displayName}!`, 'info')}
                style={{ fontFamily: 'var(--font-comic-sub)', fontSize: 15, padding: '3px 10px', flexShrink: 0 }}
              >
                CONNECT
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
