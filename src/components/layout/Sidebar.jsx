// ============================================================
// NEXORA — Sidebar Navigation
// ============================================================
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Home, User, Users, Gamepad2, Shield, Globe, Compass,
  Briefcase, Trophy, MessageSquare, Bell, Settings,
  ChevronLeft, ChevronRight, LogOut
} from 'lucide-react';
import Avatar from '@/components/common/Avatar';
import { CURRENT_USER } from '@/data/users';
import { formatCount } from '@/utils';

const NAV_ITEMS = [
  { path: '/home', icon: Home, label: 'Home' },
  { path: '/profile', icon: User, label: 'My Profile' },
  { path: '/network', icon: Users, label: 'My Network' },
  { path: '/games', icon: Gamepad2, label: 'Games' },
  { path: '/teams', icon: Shield, label: 'Teams & Clans' },
  { path: '/communities', icon: Globe, label: 'Communities' },
  { path: '/discover', icon: Compass, label: 'Discover' },
  { path: '/opportunities', icon: Briefcase, label: 'Opportunities' },
  { path: '/events', icon: Trophy, label: 'Events' },
  { path: '/messages', icon: MessageSquare, label: 'Messages', badge: 3 },
  { path: '/notifications', icon: Bell, label: 'Notifications', badge: 4 },
];

export default function Sidebar({ collapsed, onToggle }) {
  const navigate = useNavigate();

  return (
    <>
      {/* Sidebar */}
      <aside
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          width: collapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)',
          background: 'var(--color-bg-card)',
          borderRight: '2px solid var(--color-border-strong)',
          boxShadow: '4px 0 20px rgba(0, 0, 0, 0.4)',
          display: 'flex',
          flexDirection: 'column',
          transition: 'width var(--transition-base)',
          zIndex: 200,
          overflowX: 'hidden',
          overflowY: 'auto',
        }}
      >
        {/* Logo */}
        <div
          style={{
            padding: collapsed ? '18px 0' : '18px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'space-between',
            borderBottom: '1px solid var(--color-border)',
            minHeight: 'var(--topbar-height)',
            gap: 8,
          }}
        >
          {!collapsed && (
            <div
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
              onClick={() => navigate('/home')}
            >
              <div style={{
                width: 32,
                height: 32,
                background: 'linear-gradient(135deg, var(--color-primary), var(--color-cyan))',
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: 14,
                color: 'white',
                boxShadow: 'var(--shadow-glow-blue)',
                flexShrink: 0,
              }}>N</div>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: 'var(--text-xl)',
                letterSpacing: '-0.02em',
                background: 'linear-gradient(135deg, var(--color-text-white), var(--color-primary))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>NEXORA</span>
            </div>
          )}
          {collapsed && (
            <div
              style={{
                width: 32, height: 32,
                background: 'linear-gradient(135deg, var(--color-primary), var(--color-cyan))',
                borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 14, color: 'white',
                boxShadow: 'var(--shadow-glow-blue)', cursor: 'pointer',
              }}
              onClick={() => navigate('/home')}
            >N</div>
          )}
          {!collapsed && (
            <button className="btn btn-icon btn-ghost" onClick={onToggle} title="Collapse sidebar">
              <ChevronLeft size={16} />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: '12px 8px', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {NAV_ITEMS.map(({ path, icon: Icon, label, badge }) => (
            <NavLink
              key={path}
              to={path}
              title={collapsed ? label : undefined}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: collapsed ? 0 : 10,
                padding: collapsed ? '10px 0' : '10px 12px',
                justifyContent: collapsed ? 'center' : 'flex-start',
                borderRadius: 'var(--radius-md)',
                color: isActive ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                background: isActive ? 'var(--color-primary-dim)' : 'transparent',
                border: isActive ? '1px solid var(--color-border-accent)' : '1px solid transparent',
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-sm)',
                fontWeight: 600,
                transition: 'all var(--transition-fast)',
                textDecoration: 'none',
                position: 'relative',
                boxShadow: isActive ? 'var(--shadow-glow-blue)' : 'none',
              })}
            >
              {({ isActive }) => (
                <>
                  <Icon size={18} style={{ flexShrink: 0, opacity: isActive ? 1 : 0.7 }} />
                  {!collapsed && <span style={{ flex: 1 }}>{label}</span>}
                  {!collapsed && badge && (
                    <span style={{
                      background: 'var(--color-primary)',
                      color: 'white',
                      borderRadius: 'var(--radius-full)',
                      fontSize: 10,
                      fontWeight: 700,
                      padding: '1px 6px',
                      minWidth: 18,
                      textAlign: 'center',
                    }}>{badge}</span>
                  )}
                  {collapsed && badge && (
                    <span style={{
                      position: 'absolute', top: 6, right: 6,
                      width: 8, height: 8,
                      background: 'var(--color-primary)',
                      borderRadius: '50%',
                      border: '2px solid var(--color-bg-secondary)',
                    }} />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Bottom: Settings + Profile */}
        <div style={{ padding: '8px', borderTop: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: 2 }}>
          <NavLink
            to="/settings"
            title={collapsed ? 'Settings' : undefined}
            style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: collapsed ? 0 : 10,
              padding: collapsed ? '10px 0' : '10px 12px',
              justifyContent: collapsed ? 'center' : 'flex-start',
              borderRadius: 'var(--radius-md)',
              color: isActive ? 'var(--color-primary)' : 'var(--color-text-secondary)',
              background: isActive ? 'var(--color-primary-dim)' : 'transparent',
              border: '1px solid transparent',
              fontFamily: 'var(--font-display)', fontSize: 'var(--text-sm)', fontWeight: 600,
              textDecoration: 'none', transition: 'all var(--transition-fast)',
            })}
          >
            <Settings size={18} style={{ flexShrink: 0, opacity: 0.7 }} />
            {!collapsed && <span>Settings</span>}
          </NavLink>

          {/* Profile card */}
          <div
            onClick={() => navigate('/profile')}
            style={{
              display: 'flex', alignItems: 'center', gap: collapsed ? 0 : 10,
              padding: collapsed ? '10px 0' : '10px 12px',
              justifyContent: collapsed ? 'center' : 'flex-start',
              borderRadius: 'var(--radius-md)', cursor: 'pointer',
              border: '1px solid var(--color-border)',
              background: 'var(--color-bg-elevated)',
              transition: 'all var(--transition-fast)',
              marginTop: 4,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-border-accent)';
              e.currentTarget.style.background = 'var(--color-bg-card-hover)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-border)';
              e.currentTarget.style.background = 'var(--color-bg-elevated)';
            }}
          >
            <Avatar user={CURRENT_USER} size="sm" online={CURRENT_USER.isOnline} />
            {!collapsed && (
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }} className="truncate">
                  {CURRENT_USER.displayName}
                </p>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }} className="truncate">
                  {formatCount(CURRENT_USER.connections)} connections
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Expand button when collapsed */}
        {collapsed && (
          <button
            className="btn btn-icon btn-ghost"
            onClick={onToggle}
            title="Expand sidebar"
            style={{ margin: '8px auto', marginBottom: 12 }}
          >
            <ChevronRight size={16} />
          </button>
        )}
      </aside>
    </>
  );
}
