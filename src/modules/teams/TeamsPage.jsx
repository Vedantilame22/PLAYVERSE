// ============================================================
// NEXORA — Teams & Clans Page
// ============================================================
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Users, Plus, Shield, ChevronRight } from 'lucide-react';
import Tabs from '@/components/common/Tabs';
import Modal from '@/components/common/Modal';
import Avatar from '@/components/common/Avatar';
import { VerifiedBadge } from '@/components/common/Badge';
import { TEAMS } from '@/data/teams';
import { PLAYERS, CURRENT_USER } from '@/data/users';
import { formatCount } from '@/utils';
import { useModal } from '@/hooks';

// Apply to Join Modal
function ApplyModal({ opening, isOpen, onClose, onSubmit }) {
  const [form, setForm] = useState({ reason: '', availability: '', experience: '' });
  if (!opening) return null;
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Apply — ${opening.title}`} maxWidth={520}
      footer={
        <>
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={() => onSubmit(form)} disabled={!form.reason.trim()}>
            Submit Application
          </button>
        </>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div>
          <label style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-text-primary)', display: 'block', marginBottom: 6 }}>
            Why do you want to join? *
          </label>
          <textarea className="input" rows={3} placeholder="Tell the team why you're a great fit…"
            value={form.reason} onChange={(e) => setForm((p) => ({ ...p, reason: e.target.value }))} />
        </div>
        <div>
          <label style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-text-primary)', display: 'block', marginBottom: 6 }}>
            Availability
          </label>
          <input className="input" placeholder="e.g. 8 PM – 11 PM IST, Weekdays"
            value={form.availability} onChange={(e) => setForm((p) => ({ ...p, availability: e.target.value }))} />
        </div>
        <div>
          <label style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-text-primary)', display: 'block', marginBottom: 6 }}>
            Previous Team Experience
          </label>
          <textarea className="input" rows={2} placeholder="Teams you've played for previously…"
            value={form.experience} onChange={(e) => setForm((p) => ({ ...p, experience: e.target.value }))} />
        </div>
      </div>
    </Modal>
  );
}

// Team Card
function TeamCard({ team, onView }) {
  const [followed, setFollowed] = useState(false);
  return (
    <div className="nexora-card" style={{ overflow: 'hidden' }}>
      <div style={{ height: 64, background: `linear-gradient(135deg, ${team.logoColor}22, ${team.logoColor}08)`, position: 'relative' }}>
        <div style={{ position: 'absolute', top: 12, right: 12, display: 'flex', gap: 6 }}>
          {team.isVerified && <VerifiedBadge type="team" />}
          <span style={{ fontSize: 10, color: 'var(--color-text-muted)', background: 'rgba(0,0,0,0.4)', padding: '2px 6px', borderRadius: 4 }}>
            {team.type}
          </span>
        </div>
      </div>
      <div style={{ padding: '0 16px 16px' }}>
        <div style={{
          width: 52, height: 52, borderRadius: 12, marginTop: -26,
          background: `linear-gradient(135deg, ${team.logoColor}cc, ${team.logoColor}66)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 22, color: 'white',
          border: '2px solid var(--color-bg-primary)',
          boxShadow: `0 0 16px ${team.logoColor}40`, marginBottom: 10,
        }}>{team.tag}</div>

        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-md)', color: 'var(--color-text-white)', marginBottom: 2 }}>
          {team.name}
        </h3>
        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: 6 }}>
          {team.game} • {team.region} • Founded {team.founded}
        </p>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: 12 }} className="truncate">
          {team.description}
        </p>

        <div style={{ display: 'flex', gap: 16, marginBottom: 12 }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-sm)', color: 'var(--color-primary)' }}>{team.memberCount}</p>
            <p style={{ fontSize: 9, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Members</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-sm)', color: 'var(--color-primary)' }}>{formatCount(team.followerCount)}</p>
            <p style={{ fontSize: 9, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Followers</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-sm)', color: team.openings.length > 0 ? 'var(--color-green)' : 'var(--color-text-muted)' }}>
              {team.openings.length}
            </p>
            <p style={{ fontSize: 9, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Openings</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-primary btn-sm" style={{ flex: 1, fontSize: 12 }} onClick={() => onView(team)}>
            View Team
          </button>
          <button
            className={`btn btn-sm ${followed ? 'btn-ghost' : 'btn-secondary'}`}
            onClick={() => setFollowed((v) => !v)}
            style={{ fontSize: 12 }}
          >
            {followed ? 'Following' : 'Follow'}
          </button>
        </div>
      </div>
    </div>
  );
}

// Team Detail Modal
function TeamDetailModal({ team, isOpen, onClose, onApply }) {
  const [detailTab, setDetailTab] = useState('about');
  const [applyOpening, setApplyOpening] = useState(null);
  const applyModal = useModal();

  if (!team) return null;
  const tabs = ['About', 'Members', 'Openings', 'Achievements'];

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title={null} maxWidth={680}>
        {/* Team Header */}
        <div style={{
          height: 80, background: `linear-gradient(135deg, ${team.logoColor}22, ${team.logoColor}06)`,
          borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0', margin: '-24px -24px 0',
        }} />
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 14, marginTop: -30, marginBottom: 16 }}>
          <div style={{
            width: 60, height: 60, borderRadius: 14,
            background: `linear-gradient(135deg, ${team.logoColor}cc, ${team.logoColor}66)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 24, color: 'white',
            border: '2px solid var(--color-bg-primary)',
            boxShadow: `0 0 20px ${team.logoColor}50`,
          }}>{team.tag}</div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'var(--text-xl)', color: 'white' }}>{team.name}</h2>
              {team.isVerified && <VerifiedBadge type="team" />}
            </div>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>{team.game} • {team.region}</p>
          </div>
        </div>

        {/* Tab nav */}
        <div style={{ display: 'flex', gap: 4, borderBottom: '1px solid var(--color-border)', marginBottom: 18 }}>
          {tabs.map((t) => (
            <button key={t} onClick={() => setDetailTab(t.toLowerCase())}
              style={{
                padding: '8px 14px', background: 'none', border: 'none', cursor: 'pointer',
                fontSize: 'var(--text-sm)', fontWeight: 600, fontFamily: 'var(--font-display)',
                color: detailTab === t.toLowerCase() ? 'var(--color-primary)' : 'var(--color-text-muted)',
                borderBottom: detailTab === t.toLowerCase() ? '2px solid var(--color-primary)' : '2px solid transparent',
                marginBottom: -1,
              }}>{t}</button>
          ))}
        </div>

        {detailTab === 'about' && (
          <div>
            <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>{team.description}</p>
            <div className="grid-3" style={{ gap: 10 }}>
              {[
                { label: 'Members', value: team.memberCount },
                { label: 'Followers', value: formatCount(team.followerCount) },
                { label: 'Founded', value: team.founded },
              ].map(({ label, value }) => (
                <div key={label} style={{ padding: 12, borderRadius: 8, background: 'var(--color-bg-elevated)', textAlign: 'center' }}>
                  <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--color-primary)', fontSize: 'var(--text-lg)' }}>{value}</p>
                  <p style={{ fontSize: 10, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>{label}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {detailTab === 'members' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {team.roster.map((m) => {
              const player = PLAYERS.find((p) => p.id === m.userId) || CURRENT_USER;
              return (
                <div key={m.userId} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, borderRadius: 8, background: 'var(--color-bg-elevated' }}>
                  <Avatar user={player} size="md" online={player.isOnline} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontWeight: 700, fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}>{player.displayName}</span>
                      {m.isLead && <span style={{ fontSize: 9, background: 'var(--color-gold-dim)', color: 'var(--color-gold)', border: '1px solid rgba(245,158,11,0.2)', padding: '1px 6px', borderRadius: 4, fontWeight: 700 }}>CAPTAIN</span>}
                    </div>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>{m.position} • {m.role}</p>
                  </div>
                  {player.currentRank && (
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-primary)' }}>{player.currentRank}</span>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {detailTab === 'openings' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {team.openings.length === 0
              ? <p style={{ color: 'var(--color-text-muted)', textAlign: 'center', padding: 24 }}>No open positions currently</p>
              : team.openings.map((id) => (
                  <div key={id} style={{ padding: 14, borderRadius: 8, background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div>
                        <p style={{ fontWeight: 700, color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}>Position Available</p>
                        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>{team.game} • {team.region}</p>
                      </div>
                      <button className="btn btn-primary btn-sm" onClick={() => { setApplyOpening({ id, title: `${team.name} Opening`, teamId: team.id }); applyModal.open(); }}>
                        Apply
                      </button>
                    </div>
                  </div>
                ))
            }
          </div>
        )}

        {detailTab === 'achievements' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {team.achievements.map((a) => (
              <div key={a} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, borderRadius: 8, background: 'var(--color-bg-elevated)' }}>
                <span style={{ fontSize: 20 }}>🏆</span>
                <p style={{ color: 'var(--color-text-primary)', fontWeight: 600, fontSize: 'var(--text-sm)' }}>{a}</p>
              </div>
            ))}
          </div>
        )}
      </Modal>

      <ApplyModal
        opening={applyOpening}
        isOpen={applyModal.isOpen}
        onClose={applyModal.close}
        onSubmit={(form) => { applyModal.close(); onApply?.(); }}
      />
    </>
  );
}

const TEAM_TABS = [
  { key: 'all', label: 'All Teams' },
  { key: 'my', label: 'My Teams' },
  { key: 'openings', label: 'Open Positions' },
];

export default function TeamsPage() {
  const { showToast } = useOutletContext() || {};
  const [tab, setTab] = useState('all');
  const [selectedTeam, setSelectedTeam] = useState(null);
  const detailModal = useModal();
  const [filter, setFilter] = useState('');

  function handleView(team) { setSelectedTeam(team); detailModal.open(); }

  const filtered = TEAMS.filter((t) =>
    !filter || t.game.toLowerCase().includes(filter.toLowerCase()) || t.type.toLowerCase().includes(filter.toLowerCase())
  );

  const myTeams = TEAMS.filter((t) => t.id === 't1');

  return (
    <div style={{ width: '100%', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 className="section-title" style={{ fontSize: 'var(--text-2xl)' }}>Teams & Clans</h1>
          <p className="section-subtitle">Find your squad or build your own</p>
        </div>
        <button className="btn btn-primary" onClick={() => showToast?.('Team creation coming soon!', 'info')}>
          <Plus size={16} /> Create Team
        </button>
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        <Tabs tabs={TEAM_TABS} activeTab={tab} onChange={setTab} />
        <div style={{ flex: 1, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {['Valorant', 'BGMI', 'CS2', 'Apex Legends'].map((g) => (
            <button key={g} className={`chip ${filter === g ? 'active' : ''}`} onClick={() => setFilter(filter === g ? '' : g)}>
              {g}
            </button>
          ))}
        </div>
      </div>

      {tab === 'all' && (
        <div className="grid-3" style={{ gap: 18 }}>
          {filtered.map((t) => <TeamCard key={t.id} team={t} onView={handleView} />)}
        </div>
      )}

      {tab === 'my' && (
        <div className="grid-3" style={{ gap: 18 }}>
          {myTeams.map((t) => <TeamCard key={t.id} team={t} onView={handleView} />)}
          {/* Team dashboard preview */}
          <div className="nexora-card" style={{ padding: 20, gridColumn: '1 / -1', marginTop: 8 }}>
            <h3 className="section-title" style={{ marginBottom: 14 }}>🛡️ Team Nova — Dashboard</h3>
            <div className="grid-4" style={{ gap: 10, marginBottom: 16 }}>
              {[
                { label: 'Members', value: 5, icon: '👥' },
                { label: 'Applications', value: 12, icon: '📋' },
                { label: 'Open Positions', value: 1, icon: '🎯' },
                { label: 'Upcoming Events', value: 2, icon: '📅' },
              ].map(({ label, value, icon }) => (
                <div key={label} style={{ padding: 14, borderRadius: 8, background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)', textAlign: 'center' }}>
                  <p style={{ fontSize: 20, marginBottom: 4 }}>{icon}</p>
                  <p style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'var(--text-xl)', color: 'var(--color-primary)' }}>{value}</p>
                  <p style={{ fontSize: 10, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>{label}</p>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-primary btn-sm">Manage Roster</button>
              <button className="btn btn-secondary btn-sm" onClick={() => showToast?.('Showing 12 applications', 'info')}>Review Applications (12)</button>
              <button className="btn btn-ghost btn-sm" onClick={() => showToast?.('Opening posted!', 'success')}>+ Post Opening</button>
            </div>
          </div>
        </div>
      )}

      {tab === 'openings' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {TEAMS.filter((t) => t.openings.length > 0).map((t) => (
            <div key={t.id} className="nexora-card" style={{ padding: 16, display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
              <div style={{
                width: 44, height: 44, borderRadius: 10, flexShrink: 0,
                background: `linear-gradient(135deg, ${t.logoColor}cc, ${t.logoColor}66)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 16, color: 'white',
              }}>{t.tag}</div>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 700, color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}>{t.name}</p>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>{t.game} • {t.region} • {t.openings.length} open position(s)</p>
              </div>
              <button className="btn btn-primary btn-sm" onClick={() => { setSelectedTeam(t); detailModal.open(); }}>
                View Openings
              </button>
            </div>
          ))}
        </div>
      )}

      <TeamDetailModal
        team={selectedTeam}
        isOpen={detailModal.isOpen}
        onClose={detailModal.close}
        onApply={() => { detailModal.close(); showToast?.('Application submitted! ✓', 'success'); }}
      />
    </div>
  );
}
