// ============================================================
// NEXORA — Opportunities Page
// ============================================================
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import Modal from '@/components/common/Modal';
import { OPPORTUNITIES } from '@/data/index';
import { useModal } from '@/hooks';

function OpportunityCard({ opp, onApply, applied }) {
  const isApplied = applied || opp.applied;
  return (
    <div className="nexora-card" style={{ padding: 18 }}>
      {/* Header */}
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 12 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 10, flexShrink: 0,
          background: `linear-gradient(135deg, ${opp.teamColor}cc, ${opp.teamColor}55)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 15, color: 'white',
          border: `1px solid ${opp.teamColor}30`,
        }}>
          {opp.teamName.split(' ').map((w) => w[0]).join('').slice(0, 2)}
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-base)', color: 'var(--color-text-white)', marginBottom: 2 }}>
            {opp.title}
          </h3>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
            {opp.teamName} • {opp.teamVerified ? '✓ Verified' : 'Unverified'} • {opp.postedAt}
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
          {opp.isPaid && (
            <span style={{ fontSize: 9, fontWeight: 700, color: 'var(--color-gold)', background: 'var(--color-gold-dim)', border: '1px solid rgba(245,158,11,0.2)', padding: '2px 6px', borderRadius: 4 }}>
              PAID ROLE
            </span>
          )}
          <span style={{ fontSize: 9, fontWeight: 700, color: 'var(--color-primary)', background: 'var(--color-primary-dim)', border: '1px solid var(--color-border-accent)', padding: '2px 6px', borderRadius: 4 }}>
            {opp.type.toUpperCase()}
          </span>
        </div>
      </div>

      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: 14 }}>
        {opp.description}
      </p>

      {/* Details grid */}
      <div className="grid-2" style={{ gap: 8, marginBottom: 14 }}>
        {[
          { label: 'Game', value: opp.game },
          { label: 'Role', value: opp.role },
          { label: 'Min Rank', value: opp.minRank },
          { label: 'Region', value: opp.region },
          { label: 'Availability', value: opp.availability },
          { label: 'Applicants', value: opp.applicants },
        ].map(({ label, value }) => (
          <div key={label} style={{ padding: '6px 10px', borderRadius: 6, background: 'var(--color-bg-elevated' }}>
            <p style={{ fontSize: 9, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 2 }}>{label}</p>
            <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-text-primary)' }}>{value}</p>
          </div>
        ))}
      </div>

      {/* Requirements */}
      <div style={{ marginBottom: 14 }}>
        <p style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--color-text-secondary)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Requirements</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {opp.requirements.map((r) => (
            <span key={r} style={{ fontSize: 10, padding: '3px 10px', borderRadius: 'var(--radius-full)', background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)' }}>
              ✓ {r}
            </span>
          ))}
        </div>
      </div>

      <button
        className={`btn ${isApplied ? 'btn-ghost' : 'btn-primary'} w-full`}
        onClick={() => !isApplied && onApply(opp.id)}
        disabled={isApplied}
      >
        {isApplied ? '✓ Application Sent' : '🎯 Apply to Join'}
      </button>
    </div>
  );
}

export default function OpportunitiesPage() {
  const { showToast } = useOutletContext() || {};
  const [applied, setApplied] = useState({});
  const [filter, setFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');

  function handleApply(id) {
    setApplied((p) => ({ ...p, [id]: true }));
    showToast?.('Application submitted! The team will review your profile. ✓', 'success');
  }

  const filtered = OPPORTUNITIES.filter((o) => {
    const matchGame = !filter || o.game === filter;
    const matchType = typeFilter === 'All' || o.type.toLowerCase().includes(typeFilter.toLowerCase());
    return matchGame && matchType;
  });

  return (
    <div style={{ width: '100%', margin: '0 auto' }}>
      <div style={{ marginBottom: 20 }}>
        <h1 className="section-title" style={{ fontSize: 'var(--text-2xl)' }}>Team Openings</h1>
        <p className="section-subtitle">Find your next team or clan — competitive, casual, and everything in between</p>
      </div>

      {/* Filter Row */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
        {['All Games', 'Valorant', 'BGMI', 'CS2', 'Apex Legends'].map((g) => (
          <button key={g} className={`chip ${(filter || 'All Games') === g ? 'active' : ''}`} onClick={() => setFilter(g === 'All Games' ? '' : g)}>{g}</button>
        ))}
        <div style={{ width: 1, height: 24, background: 'var(--color-border)', alignSelf: 'center' }} />
        {['All', 'Competitive', 'Casual', 'Paid'].map((t) => (
          <button key={t} className={`chip ${typeFilter === t ? 'active' : ''}`} onClick={() => setTypeFilter(t)}>{t}</button>
        ))}
      </div>

      {/* LFT Banner for current user */}
      <div className="nexora-card" style={{ padding: 18, marginBottom: 20, background: 'linear-gradient(135deg, rgba(16,185,129,0.08), rgba(16,185,129,0.02))', borderColor: 'rgba(16,185,129,0.2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', animation: 'dotPulse 2s ease-in-out infinite', display: 'block' }} />
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: '#10b981' }}>You are Looking for Team</h3>
            </div>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
              Valorant • Controller • Ascendant+ • India • 8 PM – 11 PM IST
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-ghost btn-sm">Edit Status</button>
            <button className="btn btn-sm" style={{ background: 'rgba(239,68,68,0.1)', color: 'var(--color-red)', border: '1px solid rgba(239,68,68,0.2)', fontSize: 12 }}
              onClick={() => showToast?.('LFT status removed', 'info')}>
              Remove
            </button>
          </div>
        </div>
      </div>

      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', marginBottom: 16 }}>{filtered.length} openings found</p>

      <div className="grid-2" style={{ gap: 16 }}>
        {filtered.map((o) => (
          <OpportunityCard key={o.id} opp={o} onApply={handleApply} applied={applied[o.id]} />
        ))}
      </div>
    </div>
  );
}
