import { Trophy, Target, Handshake, Gamepad2, Star, Medal, CircleDot, Zap, MessageSquare, Shield, Edit2, Share2, MoreHorizontal, Plus, Check, Link2 } from 'lucide-react';
// ============================================================
// NEXORA — Profile Page (Complete)
// ============================================================
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import Avatar from '@/components/common/Avatar';
import { VerifiedBadge, RankBadge } from '@/components/common/Badge';
import Tabs from '@/components/common/Tabs';
import Modal from '@/components/common/Modal';
import { CURRENT_USER } from '@/data/users';
import { ACHIEVEMENTS } from '@/data/index';
import { formatCount, getRankColor, getRarityColor } from '@/utils';
import { useModal } from '@/hooks';

// ---- Profile Header ----
function ProfileHeader({ user, onShowToast }) {
  const [connected, setConnected] = useState(false);
  const [followed, setFollowed] = useState(false);

  return (
    <div className="nexora-card" style={{ overflow: 'hidden' }}>
      {/* Cover Banner */}
      <div style={{ height: 180, background: user.coverGradient, position: 'relative' }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%234f8ef7\' fill-opacity=\'0.03\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }} />
        <button
          className="btn btn-ghost btn-sm"
          style={{ position: 'absolute', top: 12, right: 12, fontSize: 11 }}
        >
          <Edit2 size={13} /> Edit Cover
        </button>
      </div>

      <div style={{ padding: '0 24px 24px' }}>
        {/* Avatar + Actions Row */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: -48 }}>
          {/* Avatar with animated ring */}
          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute', inset: -4, borderRadius: '50%',
              background: `conic-gradient(${user.avatarColor}, #00d4ff, #8b5cf6, ${user.avatarColor})`,
              animation: 'rotateRing 4s linear infinite',
              zIndex: 0,
            }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <Avatar user={user} size="3xl" ring online={user.isOnline} />
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: 8, paddingBottom: 8, flexWrap: 'wrap' }}>
            <button
              className={`btn ${connected ? 'btn-ghost' : 'btn-primary'}`}
              onClick={() => { setConnected((v) => !v); onShowToast?.(connected ? 'Connection removed' : 'Connection sent!', 'success'); }}
            >
              {connected ? <Check size={15} /> : <Handshake size={18} />}
              {connected ? 'Connected' : 'Connect'}
            </button>
            <button
              className={`btn ${followed ? 'btn-ghost' : 'btn-secondary'}`}
              onClick={() => { setFollowed((v) => !v); onShowToast?.(followed ? 'Unfollowed' : 'Following!', 'info'); }}
            >
              {followed ? 'Following' : 'Follow'}
            </button>
            <button className="btn btn-ghost">💬 Message</button>
            <button className="btn btn-icon btn-ghost"><MoreHorizontal size={16} /></button>
          </div>
        </div>

        {/* Name + Title */}
        <div style={{ marginTop: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 900 }}>
              {user.displayName}
            </h1>
            {user.isVerified && <VerifiedBadge type="verified" size="md" />}
          </div>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-base)', marginTop: 4 }}>{user.title}</p>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)', marginTop: 6 }}>
            📍 {user.location} • Gaming since {user.gamingSince}
          </p>

          {/* Looking for Team */}
          {user.lookingForTeam && (
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 10,
              padding: '6px 16px', borderRadius: 'var(--radius-full)',
              background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)',
            }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', animation: 'dotPulse 2s infinite', display: 'block' }} />
              <span style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: '#10b981' }}>
                🎯 LOOKING FOR TEAM — {user.lookingForTeamDetails?.game} {user.lookingForTeamDetails?.role}
              </span>
            </div>
          )}
        </div>

        {/* Stats Row */}
        <div style={{
          display: 'flex', gap: 24, flexWrap: 'wrap', marginTop: 18,
          padding: '14px 0', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)',
        }}>
          {[
            { label: 'Connections', value: formatCount(user.connections) },
            { label: 'Followers', value: formatCount(user.followers) },
            { label: 'Games', value: user.games.length },
            { label: 'Achievements', value: user.achievements.length },
            { label: 'Teams', value: user.teams.length },
          ].map(({ label, value }) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <p style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'var(--text-xl)', color: 'var(--color-primary)' }}>
                {value}
              </p>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---- Gaming Experience ----
function GamingExperience({ experience }) {
  const [expanded, setExpanded] = useState(null);
  return (
    <div className="nexora-card" style={{ padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
        <h2 className="section-title">🎮 Gaming Experience</h2>
        <button className="btn btn-ghost btn-sm"><Plus size={14} /> Add</button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {experience.map((exp, i) => (
          <div
            key={exp.game}
            style={{
              padding: 16, borderRadius: 'var(--radius-md)',
              background: `linear-gradient(135deg, ${exp.color}08, transparent)`,
              border: `1px solid ${exp.color}20`,
              cursor: 'pointer', transition: 'all var(--transition-base)',
            }}
            onClick={() => setExpanded(expanded === i ? null : i)}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = `${exp.color}40`}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = `${exp.color}20`}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                background: `${exp.color}18`, border: `1px solid ${exp.color}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
              }}>{exp.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-md)', color: exp.color }}>
                    {exp.game}
                  </h3>
                  {exp.isCompetitive && <span className="badge" style={{ background: `${exp.color}15`, color: exp.color, border: `1px solid ${exp.color}25`, fontSize: 10 }}>Competitive</span>}
                </div>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: 2 }}>
                  {exp.startYear} – {exp.endYear || 'Present'} • {exp.roles.join(', ')} • {exp.playtime}+ hours
                </p>
              </div>
              {exp.currentRank && (
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 'var(--text-xs)', color: getRankColor(exp.currentRank) }}>
                    {exp.currentRank}
                  </p>
                  <p style={{ fontSize: 10, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Current</p>
                </div>
              )}
            </div>

            {expanded === i && (
              <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                {[
                  { label: 'Peak Rank', value: exp.peakRank || '—', color: getRankColor(exp.peakRank) },
                  { label: 'Win Rate', value: exp.winRate ? `${exp.winRate}%` : '—', color: 'var(--color-green)' },
                  { label: 'Playtime', value: `${exp.playtime}h`, color: 'var(--color-primary)' },
                ].map(({ label, value, color }) => (
                  <div key={label} style={{ padding: 10, borderRadius: 8, background: 'var(--color-bg-elevated)', textAlign: 'center' }}>
                    <p style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 'var(--text-sm)', color }}>{value}</p>
                    <p style={{ fontSize: 10, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginTop: 2 }}>{label}</p>
                  </div>
                ))}
                {exp.achievements.length > 0 && (
                  <div style={{ gridColumn: '1 / -1' }}>
                    {exp.achievements.map((a) => (
                      <span key={a} style={{
                        display: 'inline-flex', alignItems: 'center', gap: 4,
                        padding: '3px 10px', borderRadius: 'var(--radius-full)', margin: '4px 4px 0 0',
                        background: `${exp.color}12`, border: `1px solid ${exp.color}25`,
                        fontSize: 'var(--text-xs)', color: exp.color, fontWeight: 600,
                      }}>🏆 {a}</span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ---- Gaming Journey Timeline ----
function GamingJourney({ journey }) {
  const icons = { start: <Gamepad2 size={18} />, milestone: <Star size={18} />, rank: <Trophy size={18} />, trophy: <Medal size={18} />, team: <Shield size={18} />, current: <CircleDot size={18} /> };
  return (
    <div className="nexora-card" style={{ padding: 20 }}>
      <h2 className="section-title" style={{ marginBottom: 20 }}>📅 Gaming Journey</h2>
      <div style={{ position: 'relative', paddingLeft: 32 }}>
        {/* Line */}
        <div style={{
          position: 'absolute', left: 12, top: 8, bottom: 8, width: 1,
          background: 'linear-gradient(to bottom, var(--color-primary), var(--color-cyan))',
        }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {journey.map((j, i) => (
            <div key={i} style={{ position: 'relative', animation: `fadeIn 0.4s ease ${i * 0.08}s both` }}>
              {/* Node */}
              <div style={{
                position: 'absolute', left: -27, top: 4, width: 14, height: 14, borderRadius: '50%',
                background: 'var(--color-bg-secondary)', border: '2px solid var(--color-primary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8,
                boxShadow: '0 0 8px rgba(79,142,247,0.3)',
              }}>●</div>
              <div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--color-primary)' }}>
                  {j.year}
                </span>
                <p style={{ color: 'var(--color-text-primary)', fontSize: 'var(--text-sm)', marginTop: 2, fontWeight: 500 }}>
                  {icons[j.type] || '●'} {j.event}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---- Skills & Endorsements ----
function GamingSkills({ skills, onShowToast }) {
  const [endorsed, setEndorsed] = useState({});
  return (
    <div className="nexora-card" style={{ padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h2 className="section-title">⚡ Gaming Skills</h2>
        <button className="btn btn-ghost btn-sm"><Plus size={14} /> Add Skill</button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {skills.map((skill) => (
          <div
            key={skill.name}
            style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '10px 14px', borderRadius: 'var(--radius-md)',
              background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)',
            }}
          >
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 600, color: 'var(--color-text-primary)', fontSize: 'var(--text-sm)' }}>{skill.name}</p>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                Endorsed by {skill.endorsements + (endorsed[skill.name] ? 1 : 0)} players
              </p>
            </div>
            {/* Endorsement bar */}
            <div style={{ width: 80 }}>
              <div style={{ height: 4, borderRadius: 4, background: 'var(--color-bg-card)', overflow: 'hidden' }}>
                <div style={{
                  height: '100%', width: `${Math.min(100, (skill.endorsements / 40) * 100)}%`,
                  background: 'linear-gradient(90deg, var(--color-primary), var(--color-cyan))',
                  borderRadius: 4, transition: 'width 0.5s ease',
                }} />
              </div>
            </div>
            <button
              className="btn btn-sm"
              style={{
                padding: '4px 12px', fontSize: 11,
                background: endorsed[skill.name] ? 'var(--color-green-dim)' : 'var(--color-primary-dim)',
                color: endorsed[skill.name] ? 'var(--color-green)' : 'var(--color-primary)',
                border: `1px solid ${endorsed[skill.name] ? 'rgba(16,185,129,0.2)' : 'var(--color-border-accent)'}`,
                flexShrink: 0,
              }}
              onClick={() => {
                setEndorsed((p) => ({ ...p, [skill.name]: !p[skill.name] }));
                onShowToast?.(endorsed[skill.name] ? 'Endorsement removed' : `${skill.name} endorsed!`, 'success');
              }}
            >
              {endorsed[skill.name] ? '✓ Endorsed' : '+ Endorse'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---- Achievements ----
function AchievementsSection({ achievementIds, onShowToast }) {
  const achievements = ACHIEVEMENTS.filter((a) => achievementIds.includes(a.id));
  const [selected, setSelected] = useState(null);
  return (
    <div className="nexora-card" style={{ padding: 20 }}>
      <h2 className="section-title" style={{ marginBottom: 16 }}>🏆 Achievements</h2>
      <div className="grid-2" style={{ gap: 12 }}>
        {achievements.map((a) => (
          <div
            key={a.id}
            onClick={() => { setSelected(a); onShowToast?.(`${a.name} — ${a.verifiedBy}`, 'info'); }}
            style={{
              padding: 14, borderRadius: 'var(--radius-md)', cursor: 'pointer',
              background: `${a.color}08`, border: `1px solid ${a.color}20`,
              transition: 'all var(--transition-base)', display: 'flex', alignItems: 'center', gap: 12,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${a.color}40`; e.currentTarget.style.boxShadow = `0 0 16px ${a.color}15`; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = `${a.color}20`; e.currentTarget.style.boxShadow = 'none'; }}
          >
            <div style={{
              width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
              background: `${a.color}20`, border: `2px solid ${a.color}40`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
              boxShadow: `0 0 12px ${a.color}30`,
            }}>{a.icon}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontWeight: 700, fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)' }}>{a.name}</p>
              <p style={{ fontSize: 10, color: getRarityColor(a.rarity), fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{a.rarity}</p>
              <p style={{ fontSize: 10, color: 'var(--color-text-muted)' }}>{a.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---- Recommendations ----
function Recommendations({ recommendations }) {
  return (
    <div className="nexora-card" style={{ padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h2 className="section-title">💬 Recommendations</h2>
        <button className="btn btn-ghost btn-sm">Request</button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {recommendations.map((rec) => (
          <div key={rec.id} style={{
            padding: 16, borderRadius: 'var(--radius-md)',
            background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)',
          }}>
            <p style={{ color: 'var(--color-text-primary)', fontSize: 'var(--text-sm)', lineHeight: 1.7, marginBottom: 14, fontStyle: 'italic' }}>
              "{rec.text}"
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: `linear-gradient(135deg, ${rec.fromAvatarColor}cc, ${rec.fromAvatarColor}66)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, color: 'white',
              }}>{rec.fromName[0]}</div>
              <div>
                <p style={{ fontWeight: 700, fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}>
                  {rec.fromName}
                </p>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                  {rec.fromTitle} • {rec.game} • {rec.duration} together
                </p>
              </div>
              <div style={{ marginLeft: 'auto', display: 'flex', gap: 4 }}>
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} size={12} fill="#f59e0b" style={{ color: '#f59e0b' }} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---- Connected Accounts ----
function ConnectedAccounts({ accounts }) {
  const platforms = [
    { key: 'riot', label: 'Riot Games', icon: <Target size={18} />, color: '#ff4655' },
    { key: 'steam', label: 'Steam', icon: <Gamepad2 size={18} />, color: '#4f8ef7' },
    { key: 'playstation', label: 'PlayStation', icon: <Gamepad2 size={18} />, color: '#003087' },
    { key: 'xbox', label: 'Xbox', icon: <CircleDot size={18} />, color: '#107c10' },
    { key: 'epic', label: 'Epic Games', icon: <Zap size={18} />, color: '#2d2d2d' },
    { key: 'discord', label: 'Discord', icon: <MessageSquare size={18} />, color: '#5865f2' },
  ];
  return (
    <div className="nexora-card" style={{ padding: 20 }}>
      <h2 className="section-title" style={{ marginBottom: 16 }}>🔗 Gaming Accounts</h2>
      <div className="grid-2" style={{ gap: 10 }}>
        {platforms.map(({ key, label, icon, color }) => {
          const acct = accounts[key];
          return (
            <div key={key} style={{
              padding: 12, borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: 10,
              background: acct?.connected ? `${color}08` : 'var(--color-bg-elevated)',
              border: `1px solid ${acct?.connected ? `${color}25` : 'var(--color-border)'}`,
            }}>
              <span style={{ fontSize: 18, flexShrink: 0 }}>{icon}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-text-primary)' }}>{label}</p>
                {acct?.connected
                  ? <p style={{ fontSize: 10, color: 'var(--color-green)', fontWeight: 600 }}>✓ {acct.username || 'Connected'}</p>
                  : <p style={{ fontSize: 10, color: 'var(--color-text-muted)' }}>Not connected</p>
                }
              </div>
              <button className={`btn btn-sm ${acct?.connected ? 'btn-ghost' : 'btn-secondary'}`}
                style={{ fontSize: 10, padding: '3px 8px', flexShrink: 0 }}>
                {acct?.connected ? 'View' : 'Connect'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ---- Main Profile Page ----
const PROFILE_TABS = [
  { key: 'overview', label: 'Overview' },
  { key: 'experience', label: 'Experience' },
  { key: 'journey', label: 'Journey' },
  { key: 'achievements', label: 'Achievements' },
  { key: 'skills', label: 'Skills' },
  { key: 'recommendations', label: 'Reviews' },
  { key: 'accounts', label: 'Accounts' },
];

export default function ProfilePage() {
  const { showToast } = useOutletContext() || {};
  const [tab, setTab] = useState('overview');
  const u = CURRENT_USER;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%', margin: '0 auto' }}>
      <ProfileHeader user={u} onShowToast={showToast} />

      {/* Share Portfolio */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
        <button className="btn btn-ghost btn-sm" onClick={() => showToast?.('Portfolio link copied!', 'success')}>
          <Share2 size={14} /> Share Gaming Portfolio
        </button>
        <button className="btn btn-ghost btn-sm"><Edit2 size={14} /> Edit Profile</button>
      </div>

      <Tabs tabs={PROFILE_TABS} activeTab={tab} onChange={setTab} />

      {tab === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="nexora-card" style={{ padding: 20 }}>
            <h2 className="section-title" style={{ marginBottom: 10 }}>📌 About</h2>
            <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>{u.bio}</p>
          </div>
          <GamingExperience experience={u.gamingExperience} />
          <AchievementsSection achievementIds={u.achievements} onShowToast={showToast} />
          <GamingSkills skills={u.skills.slice(0, 6)} onShowToast={showToast} />
        </div>
      )}
      {tab === 'experience' && <GamingExperience experience={u.gamingExperience} />}
      {tab === 'journey' && <GamingJourney journey={u.journey} />}
      {tab === 'achievements' && <AchievementsSection achievementIds={u.achievements} onShowToast={showToast} />}
      {tab === 'skills' && <GamingSkills skills={u.skills} onShowToast={showToast} />}
      {tab === 'recommendations' && <Recommendations recommendations={u.recommendations} />}
      {tab === 'accounts' && <ConnectedAccounts accounts={u.connectedAccounts} />}
    </div>
  );
}
