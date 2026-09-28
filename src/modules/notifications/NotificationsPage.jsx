// ============================================================
// NEXORA — Notifications Page
// ============================================================
import { useState } from 'react';
import Avatar from '@/components/common/Avatar';
import { NOTIFICATIONS } from '@/data/index';

function NotificationItem({ notif, onRead }) {
  const actorUser = notif.actorId ? { displayName: notif.actorName, avatarColor: notif.actorColor } : null;
  return (
    <div
      onClick={() => onRead(notif.id)}
      style={{
        display: 'flex', gap: 14, padding: '14px 18px',
        background: notif.read ? 'transparent' : 'var(--color-primary-dim)',
        borderLeft: `3px solid ${notif.read ? 'transparent' : 'var(--color-primary)'}`,
        borderBottom: '1px solid var(--color-border)',
        cursor: 'pointer', transition: 'all var(--transition-fast)',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-bg-elevated)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = notif.read ? 'transparent' : 'var(--color-primary-dim)'; }}
    >
      <div style={{ position: 'relative', flexShrink: 0 }}>
        {actorUser
          ? <Avatar user={actorUser} size="md" />
          : (
            <div style={{
              width: 44, height: 44, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)', fontSize: 20,
            }}>{notif.icon}</div>
          )
        }
        {!notif.read && (
          <span style={{
            position: 'absolute', bottom: 2, right: 2, width: 8, height: 8,
            background: 'var(--color-primary)', borderRadius: '50%', border: '2px solid var(--color-bg-primary)',
          }} />
        )}
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: 'var(--text-sm)', fontWeight: notif.read ? 400 : 600, color: 'var(--color-text-primary)', marginBottom: 4, lineHeight: 1.5 }}>
          {notif.title}
        </p>
        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: 4 }}>{notif.body}</p>
        <p style={{ fontSize: 10, color: 'var(--color-text-muted)' }}>{notif.timestamp}</p>
      </div>
    </div>
  );
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const [filter, setFilter] = useState('all');

  function markRead(id) {
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  }

  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  const unreadCount = notifications.filter((n) => !n.read).length;
  const filtered = notifications.filter((n) => filter === 'all' || (filter === 'unread' && !n.read));

  return (
    <div style={{ width: '100%', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <h1 className="section-title" style={{ fontSize: 'var(--text-2xl)' }}>Notifications</h1>
          {unreadCount > 0 && (
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-primary)', marginTop: 4 }}>
              {unreadCount} unread notification{unreadCount > 1 ? 's' : ''}
            </p>
          )}
        </div>
        {unreadCount > 0 && (
          <button className="btn btn-ghost btn-sm" onClick={markAllRead}>Mark all as read</button>
        )}
      </div>

      {/* Filter */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {['all', 'unread'].map((f) => (
          <button key={f} className={`chip ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)} style={{ textTransform: 'capitalize' }}>{f}</button>
        ))}
      </div>

      <div className="nexora-card" style={{ overflow: 'hidden', padding: 0 }}>
        {filtered.length === 0
          ? <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--color-text-muted)' }}>No notifications</div>
          : filtered.map((n) => <NotificationItem key={n.id} notif={n} onRead={markRead} />)
        }
      </div>
    </div>
  );
}
