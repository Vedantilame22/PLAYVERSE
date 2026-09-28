import { Home, Trophy, Handshake, Gamepad, User, Users, PenSquare, Megaphone, MessageSquare, Shield, Search, Bell, Plus, X, Gamepad2, Globe } from 'lucide-react';
import { useState, useRef } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import Avatar from '@/components/common/Avatar';
import { useOutsideClick } from '@/hooks';
import { CURRENT_USER } from '@/data/users';
import { PLAYERS } from '@/data/users';
import { TEAMS } from '@/data/teams';

const QUICK_CREATE_ITEMS = [
  { icon: <PenSquare size={20} />, label: 'Create Post', action: 'post' },
  { icon: <Gamepad2 size={20} />, label: 'Add Gaming Experience', action: 'experience' },
  { icon: <Shield size={20} />, label: 'Create Team', action: 'team' },
  { icon: <Megaphone size={20} />, label: 'Team Opening', action: 'opening' },
  { icon: <Users size={20} />, label: 'Create Community', action: 'community' },
  { icon: <Trophy size={20} />, label: 'Create Event', action: 'event' },
];

export default function Topbar({ sidebarCollapsed, onQuickCreate }) {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const navigate = useNavigate();
  const searchRef = useOutsideClick(() => setShowResults(false));
  const createRef = useOutsideClick(() => setShowCreate(false));

  const marginLeft = sidebarCollapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)';

  // Simple local search
  const results = query.trim().length > 1
    ? [
        ...PLAYERS.filter((p) =>
          p.displayName.toLowerCase().includes(query.toLowerCase()) ||
          p.primaryGame?.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 3).map((p) => ({ type: 'player', data: p })),
        ...TEAMS.filter((t) =>
          t.name.toLowerCase().includes(query.toLowerCase()) ||
          t.game.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 2).map((t) => ({ type: 'team', data: t })),
      ]
    : [];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: marginLeft,
        right: 0,
        height: 'var(--topbar-height)',
        background: 'var(--color-bg-primary)',
        borderBottom: '2px solid var(--color-ink)',
        boxShadow: '0 4px 0px var(--color-ink)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',
        gap: 16,
        zIndex: 100,
        transition: 'left var(--transition-fast)',
      }}
    >
      {/* Animated Comic Halftone Overlay inside header */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        pointerEvents: 'none',
        backgroundImage: 'radial-gradient(var(--color-border-strong) 1px, transparent 1px)',
        backgroundSize: '10px 10px',
        zIndex: -1
      }} />

      {/* Search */}
      <div ref={searchRef} style={{ flex: 1, maxWidth: 440, position: 'relative' }}>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <Search
            size={18}
            style={{
              position: 'absolute', left: 12,
              color: 'var(--color-ink)', pointerEvents: 'none',
              zIndex: 1
            }}
          />
          <input
            placeholder="SEARCH PLAYERS, TEAMS, GAMES..."
            value={query}
            onChange={(e) => { setQuery(e.target.value); setShowResults(true); }}
            onFocus={() => setShowResults(true)}
            style={{ 
              width: '100%',
              paddingLeft: 40, paddingRight: query ? 36 : 14, height: 42, 
              fontSize: '20px', fontFamily: 'var(--font-comic-sub)', letterSpacing: '0.05em',
              background: 'var(--color-bg-elevated)', border: '2px solid var(--color-ink)',
              color: 'var(--color-text-white)', outline: 'none',
              boxShadow: '4px 4px 0px var(--color-ink)',
              transition: 'all 0.1s ease'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translate(-2px, -2px)'; e.currentTarget.style.boxShadow = '6px 6px 0px var(--color-primary)'; e.currentTarget.style.borderColor = 'var(--color-primary)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '4px 4px 0px var(--color-ink)'; e.currentTarget.style.borderColor = 'var(--color-ink)'; }}
            onFocus={(e) => { e.currentTarget.style.background = 'var(--color-primary)'; e.currentTarget.style.color = 'var(--color-ink)'; }}
            onBlur={(e) => { e.currentTarget.style.background = 'var(--color-bg-elevated)'; e.currentTarget.style.color = 'var(--color-text-white)'; }}
            aria-label="Global search"
          />
          {query && (
            <button
              onClick={() => { setQuery(''); setShowResults(false); }}
              style={{
                position: 'absolute', right: 10,
                background: 'var(--color-ink)', border: 'none', cursor: 'pointer', color: 'var(--color-primary)',
                padding: 4, display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Search Results Dropdown */}
        {showResults && results.length > 0 && (
          <div style={{
            position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 8,
            background: 'var(--color-bg-card)', border: '2px solid var(--color-ink)',
            boxShadow: '6px 6px 0px var(--color-ink)', zIndex: 10,
            display: 'flex', flexDirection: 'column'
          }}>
            {results.map(({ type, data }) => (
              <div
                key={data.id}
                onClick={() => {
                  setShowResults(false); setQuery('');
                  if (type === 'player') navigate('/profile'); // mock nav
                  if (type === 'team') navigate('/teams'); // mock nav
                }}
                style={{
                  padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12,
                  cursor: 'pointer', borderBottom: '2px solid var(--color-ink)',
                  background: 'var(--color-bg-card)', transition: 'background 0.1s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-primary-dim)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'var(--color-bg-card)'}
              >
                {type === 'player' ? (
                  <Avatar user={data} size="sm" />
                ) : (
                  <div style={{ width: 32, height: 32, background: 'var(--color-bg-secondary)', border: '2px solid var(--color-ink)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Shield size={16} color="var(--color-primary)" />
                  </div>
                )}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontFamily: 'var(--font-comic-sub)', fontSize: '20px', letterSpacing: '0.05em', color: 'var(--color-text-white)' }} className="truncate">
                    {type === 'player' ? data.displayName : data.name}
                  </p>
                  <p style={{ fontSize: '12px', color: 'var(--color-primary)', fontFamily: 'var(--font-display)', fontWeight: 700 }} className="truncate">
                    {type === 'player' ? data.primaryGame : data.game}
                  </p>
                </div>
              </div>
            ))}
            <button style={{
              background: 'var(--color-primary)', color: 'var(--color-ink)', border: 'none',
              padding: '12px', fontFamily: 'var(--font-comic-sub)', fontSize: '18px', cursor: 'pointer'
            }}>
              VIEW ALL RESULTS
            </button>
          </div>
        )}
      </div>

      <div style={{ flex: 1 }} />

      {/* Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div ref={createRef} style={{ position: 'relative' }}>
          <button
            className="btn btn-primary"
            onClick={() => setShowCreate(!showCreate)}
            title="Create"
            style={{ padding: '8px 12px', fontSize: '22px' }}
          >
            <Plus size={20} strokeWidth={3} />
            <span style={{ marginLeft: 4 }}>CREATE</span>
          </button>
          
          {/* Quick Create Dropdown */}
          {showCreate && (
            <div style={{
              position: 'absolute', top: '100%', right: 0, marginTop: 12, width: 240,
              background: 'var(--color-bg-card)', border: '2px solid var(--color-ink)',
              boxShadow: '6px 6px 0px var(--color-ink)', zIndex: 10,
              display: 'flex', flexDirection: 'column'
            }}>
              <div style={{ padding: '12px', background: 'var(--color-primary)', borderBottom: '2px solid var(--color-ink)' }}>
                <h3 style={{ fontFamily: 'var(--font-comic-sub)', fontSize: '22px', color: 'var(--color-ink)', margin: 0, lineHeight: 1 }}>WHAT'S YOUR NEXT PLAY?</h3>
              </div>
              <div style={{ padding: 0 }}>
                {QUICK_CREATE_ITEMS.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setShowCreate(false);
                      if (onQuickCreate) onQuickCreate(item.action);
                    }}
                    style={{
                      width: '100%', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12,
                      background: 'transparent', border: 'none', borderBottom: i < QUICK_CREATE_ITEMS.length - 1 ? '2px solid var(--color-border)' : 'none',
                      color: 'var(--color-text-white)', fontFamily: 'var(--font-comic-sub)', fontSize: '20px',
                      cursor: 'pointer', textAlign: 'left', transition: 'all 0.1s'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-primary)'; e.currentTarget.style.color = 'var(--color-ink)'; e.currentTarget.style.paddingLeft = '20px'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--color-text-white)'; e.currentTarget.style.paddingLeft = '16px'; }}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export function MobileNavigation() {
  const navItems = [
    { path: '/home', icon: Home, label: 'HOME' },
    { path: '/network', icon: Users, label: 'NETWORK' },
    { path: '/messages', icon: MessageSquare, label: 'CHAT', badge: 3 },
    { path: '/notifications', icon: Bell, label: 'ALERTS', badge: 4 },
    { path: '/profile', icon: User, label: 'PROFILE' },
  ];

  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: 60,
        background: 'var(--color-bg-primary)',
        borderTop: '2px solid var(--color-ink)',
        boxShadow: '0 -4px 0px var(--color-ink)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        zIndex: 1000,
        padding: '0 8px',
      }}
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.path}
            to={item.path}
            style={({ isActive }) => ({
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              position: 'relative',
              padding: '6px 12px',
              color: isActive ? 'var(--color-ink)' : 'var(--color-text-muted)',
              background: isActive ? 'var(--color-primary)' : 'transparent',
              border: isActive ? '2px solid var(--color-ink)' : '2px solid transparent',
              boxShadow: isActive ? '2px 2px 0px var(--color-ink)' : 'none',
              transform: isActive ? 'translateY(-2px)' : 'none',
              transition: 'all 0.15s ease',
            })}
          >
            <div style={{ position: 'relative' }}>
              <Icon size={20} />
              {item.badge ? (
                <span
                  style={{
                    position: 'absolute',
                    top: -6,
                    right: -10,
                    background: 'var(--color-accent)',
                    color: 'var(--color-ink)',
                    fontSize: '10px',
                    fontWeight: 900,
                    padding: '1px 4px',
                    border: '1px solid var(--color-ink)',
                  }}
                >
                  {item.badge}
                </span>
              ) : null}
            </div>
            <span
              style={{
                fontFamily: 'var(--font-comic-sub)',
                fontSize: '12px',
                letterSpacing: '0.05em',
                lineHeight: 1,
                marginTop: 2,
              }}
            >
              {item.label}
            </span>
          </NavLink>
        );
      })}
    </nav>
  );
}

