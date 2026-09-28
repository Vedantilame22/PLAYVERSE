import { Home, User, Users, Gamepad2, Shield, Globe, Compass, Briefcase, Trophy, MessageSquare, Bell, Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate, NavLink } from 'react-router-dom';
import Avatar from '@/components/common/Avatar';
import { CURRENT_USER } from '@/data/users';
import { formatCount } from '@/utils';

const NAV_ITEMS = [
  { path: '/home', icon: Home, label: 'HOME' },
  { path: '/profile', icon: User, label: 'MY PROFILE' },
  { path: '/network', icon: Users, label: 'NETWORK' },
  { path: '/games', icon: Gamepad2, label: 'GAMES' },
  { path: '/teams', icon: Shield, label: 'SQUADS' },
  { path: '/communities', icon: Globe, label: 'COMMUNITIES' },
  { path: '/discover', icon: Compass, label: 'DISCOVER' },
  { path: '/opportunities', icon: Briefcase, label: 'OPPORTUNITIES' },
  { path: '/events', icon: Trophy, label: 'EVENTS' },
  { path: '/messages', icon: MessageSquare, label: 'MESSAGES', badge: 3 },
  { path: '/notifications', icon: Bell, label: 'ALERTS', badge: 4 },
];

export default function Sidebar({ collapsed, onToggle }) {
  const navigate = useNavigate();

  return (
    <aside
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        width: collapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)',
        background: 'var(--color-bg-primary)',
        borderRight: '2px solid var(--color-ink)',
        boxShadow: '4px 0 0px var(--color-ink)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'width var(--transition-fast)',
        zIndex: 200,
        overflowX: 'hidden',
        overflowY: 'auto',
      }}
    >
      {/* Animated Comic Halftone Overlay inside sidebar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        pointerEvents: 'none',
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '10px 10px',
        zIndex: -1
      }} />

      {/* Logo */}
      <div
        style={{
          padding: collapsed ? '18px 0' : '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
          borderBottom: '2px solid var(--color-ink)',
          minHeight: 'var(--topbar-height)',
          background: 'var(--color-primary)',
        }}
      >
        {!collapsed && (
          <div
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, transform: 'rotate(-2deg)' }}
            onClick={() => navigate('/home')}
          >
            <span style={{
              fontFamily: 'var(--font-comic)',
              fontSize: '28px',
              letterSpacing: '0.05em',
              color: 'var(--color-ink)',
              textShadow: '2px 2px 0px white'
            }}>PLAYVERSE</span>
          </div>
        )}
        {collapsed && (
          <div
            style={{
              fontFamily: 'var(--font-comic)', fontSize: 24, color: 'var(--color-ink)',
              cursor: 'pointer', textShadow: '2px 2px 0px white', transform: 'rotate(-2deg)'
            }}
            onClick={() => navigate('/home')}
          >P</div>
        )}
        {!collapsed && (
          <button style={{ 
            background: 'var(--color-ink)', color: 'var(--color-primary)', border: 'none',
            borderRadius: '0', padding: 4, cursor: 'pointer', boxShadow: '2px 2px 0px rgba(0,0,0,0.5)' 
          }} onClick={onToggle} title="Collapse">
            <ChevronLeft size={16} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        {NAV_ITEMS.map(({ path, icon: Icon, label, badge }) => (
          <NavLink
            key={path}
            to={path}
            title={collapsed ? label : undefined}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: collapsed ? 0 : 12,
              padding: collapsed ? '12px 0' : '10px 16px',
              justifyContent: collapsed ? 'center' : 'flex-start',
              color: isActive ? 'var(--color-ink)' : 'var(--color-text-secondary)',
              background: isActive ? 'var(--color-primary)' : 'transparent',
              border: isActive ? '2px solid var(--color-ink)' : '2px solid transparent',
              fontFamily: 'var(--font-comic-sub)',
              fontSize: '22px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              transition: 'all 100ms ease',
              textDecoration: 'none',
              position: 'relative',
              boxShadow: isActive ? '4px 4px 0px var(--color-ink)' : 'none',
              transform: isActive && !collapsed ? 'translateX(4px)' : 'none',
              clipPath: isActive ? 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' : 'none',
            })}
          >
            {({ isActive }) => (
              <>
                <Icon size={20} style={{ flexShrink: 0, opacity: isActive ? 1 : 0.7 }} />
                {!collapsed && <span style={{ flex: 1 }}>{label}</span>}
                {!collapsed && badge && (
                  <span style={{
                    background: isActive ? 'var(--color-ink)' : 'var(--color-primary)',
                    color: isActive ? 'var(--color-primary)' : 'var(--color-ink)',
                    fontSize: 14,
                    fontWeight: 700,
                    padding: '2px 8px',
                    border: '2px solid var(--color-ink)',
                    boxShadow: '2px 2px 0px rgba(0,0,0,0.5)',
                    fontFamily: 'var(--font-comic)'
                  }}>{badge}</span>
                )}
                {collapsed && badge && (
                  <span style={{
                    position: 'absolute', top: 6, right: 6,
                    width: 10, height: 10,
                    background: 'var(--color-red)',
                    border: '2px solid var(--color-ink)',
                  }} />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom: Profile */}
      <div style={{ padding: '12px', borderTop: '2px solid var(--color-ink)', background: 'var(--color-bg-secondary)' }}>
        <div
          onClick={() => navigate('/profile')}
          style={{
            display: 'flex', alignItems: 'center', gap: collapsed ? 0 : 12,
            padding: collapsed ? '12px 0' : '8px',
            justifyContent: collapsed ? 'center' : 'flex-start',
            cursor: 'pointer',
            border: '2px solid var(--color-ink)',
            background: 'var(--color-bg-card)',
            transition: 'all var(--transition-fast)',
            boxShadow: '4px 4px 0px var(--color-ink)',
            clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translate(-2px, -2px)';
            e.currentTarget.style.boxShadow = '6px 6px 0px var(--color-primary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = '4px 4px 0px var(--color-ink)';
          }}
        >
          <Avatar user={CURRENT_USER} size="sm" online={CURRENT_USER.isOnline} />
          {!collapsed && (
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-white)', fontFamily: 'var(--font-comic-sub)', letterSpacing: '0.05em' }} className="truncate">
                {CURRENT_USER.displayName}
              </p>
              <p style={{ fontSize: '12px', color: 'var(--color-primary)', fontFamily: 'var(--font-display)', fontWeight: 700 }} className="truncate">
                {CURRENT_USER.rank}
              </p>
            </div>
          )}
        </div>
      </div>

      {collapsed && (
        <button
          className="btn btn-icon btn-ghost"
          onClick={onToggle}
          title="Expand sidebar"
          style={{ margin: '8px auto', marginBottom: 12, border: '2px solid var(--color-ink)' }}
        >
          <ChevronRight size={16} color="var(--color-text-white)" />
        </button>
      )}
    </aside>
  );
}
