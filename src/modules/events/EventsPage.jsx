// ============================================================
// NEXORA — Events Page
// ============================================================
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import Modal from '@/components/common/Modal';
import { EVENTS } from '@/data/index';
import { useModal } from '@/hooks';

function EventCard({ event, onRegister, registered }) {
  const isReg = registered || event.isRegistered;
  return (
    <div className="nexora-card" style={{ padding: 18, display: 'flex', gap: 16 }}>
      <div style={{
        width: 52, height: 52, borderRadius: 14, flexShrink: 0,
        background: `${event.color}15`, border: `1px solid ${event.color}25`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28,
      }}>{event.icon}</div>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 4 }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-base)', color: 'var(--color-text-white)' }}>
            {event.name}
          </h3>
          <span style={{
            fontSize: 9, fontWeight: 700, padding: '2px 8px', borderRadius: 4, flexShrink: 0,
            background: `${event.color}15`, color: event.color, border: `1px solid ${event.color}25`,
          }}>{event.type.toUpperCase()}</span>
        </div>
        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: 10 }}>
          {event.date}{event.endDate !== event.date ? ` – ${event.endDate}` : ''} •{' '}
          {event.isOnline ? '🌐 Online' : `🏟️ ${event.location}`} •{' '}
          {event.organizer}
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 12 }}>
          {event.prize && (
            <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--color-gold)' }}>
              💰 {event.prize}
            </span>
          )}
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
            👥 {event.participants}/{event.maxParticipants}
          </span>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
            📋 {event.format}
          </span>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button
            className={`btn btn-sm ${isReg ? 'btn-ghost' : event.registrationOpen ? 'btn-primary' : 'btn-ghost'}`}
            disabled={!event.registrationOpen && !isReg}
            onClick={() => event.registrationOpen && !isReg && onRegister(event.id)}
            style={{ fontSize: 12 }}
          >
            {isReg ? '✓ Registered' : event.registrationOpen ? 'Register Now' : 'Registration Closed'}
          </button>
          <button className="btn btn-ghost btn-sm" style={{ fontSize: 12 }}>View Details</button>
        </div>
      </div>
    </div>
  );
}

export default function EventsPage() {
  const { showToast } = useOutletContext() || {};
  const [registered, setRegistered] = useState({});
  const [filter, setFilter] = useState('All');

  function handleRegister(id) {
    setRegistered((p) => ({ ...p, [id]: true }));
    showToast?.('Successfully registered! Check your inbox for confirmation.', 'success');
  }

  const types = ['All', 'Tournament', 'Community Event', 'LAN'];
  const filtered = EVENTS.filter((e) => filter === 'All' || e.type === filter || (filter === 'LAN' && !e.isOnline));

  const myEvents = EVENTS.filter((e) => e.isRegistered || registered[e.id]);
  const upcoming = filtered.filter((e) => !e.isRegistered && !registered[e.id]);

  return (
    <div style={{ width: '100%', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 className="section-title" style={{ fontSize: 'var(--text-2xl)' }}>Events & Tournaments</h1>
          <p className="section-subtitle">Compete, participate, and grow your gaming career</p>
        </div>
        <button className="btn btn-primary" onClick={() => showToast?.('Event creation coming soon!', 'info')}>
          + Create Event
        </button>
      </div>

      {/* Filter */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
        {types.map((t) => (
          <button key={t} className={`chip ${filter === t ? 'active' : ''}`} onClick={() => setFilter(t)}>{t}</button>
        ))}
      </div>

      {myEvents.length > 0 && (
        <div style={{ marginBottom: 28 }}>
          <h2 className="section-title" style={{ marginBottom: 14, fontSize: 'var(--text-lg)' }}>Your Events</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {myEvents.map((e) => (
              <EventCard key={e.id} event={e} onRegister={handleRegister} registered={registered[e.id]} />
            ))}
          </div>
        </div>
      )}

      <h2 className="section-title" style={{ marginBottom: 14, fontSize: 'var(--text-lg)' }}>Upcoming Events</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {upcoming.map((e) => (
          <EventCard key={e.id} event={e} onRegister={handleRegister} registered={registered[e.id]} />
        ))}
      </div>
    </div>
  );
}
