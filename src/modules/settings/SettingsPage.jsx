// ============================================================
// NEXORA — Settings Page
// ============================================================
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import Tabs from '@/components/common/Tabs';
import Avatar from '@/components/common/Avatar';
import { CURRENT_USER } from '@/data/users';

const SETTINGS_TABS = [
  { key: 'profile', label: '👤 Profile' },
  { key: 'privacy', label: '🔒 Privacy' },
  { key: 'gaming', label: '🎮 Gaming Accounts' },
  { key: 'notifications', label: '🔔 Notifications' },
  { key: 'appearance', label: '🎨 Appearance' },
  { key: 'security', label: '🛡️ Security' },
];

function SettingRow({ label, description, children }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid var(--color-border)', gap: 20 }}>
      <div>
        <p style={{ fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)' }}>{label}</p>
        {description && <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: 2 }}>{description}</p>}
      </div>
      <div style={{ flexShrink: 0 }}>{children}</div>
    </div>
  );
}

function Toggle({ checked, onChange }) {
  return (
    <div
      onClick={() => onChange(!checked)}
      style={{
        width: 44, height: 24, borderRadius: 12, cursor: 'pointer', position: 'relative',
        background: checked ? 'var(--color-primary)' : 'var(--color-bg-elevated)',
        border: `1px solid ${checked ? 'var(--color-primary)' : 'var(--color-border-strong)'}`,
        transition: 'all var(--transition-fast)',
        boxShadow: checked ? 'var(--shadow-glow-blue)' : 'none',
      }}
    >
      <div style={{
        position: 'absolute', top: 2, left: checked ? 20 : 2, width: 18, height: 18,
        borderRadius: '50%', background: 'white', transition: 'left var(--transition-fast)',
        boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
      }} />
    </div>
  );
}

export default function SettingsPage() {
  const { showToast } = useOutletContext() || {};
  const [tab, setTab] = useState('profile');
  const [form, setForm] = useState({ displayName: CURRENT_USER.displayName, bio: CURRENT_USER.bio, location: CURRENT_USER.location });
  const [notifs, setNotifs] = useState({ endorsements: true, connections: true, teamActivity: true, eventReminders: true, profileViews: false, messages: true });
  const [privacy, setPrivacy] = useState({ publicProfile: true, showRank: true, showConnections: true, lookingForTeam: true });

  function saveProfile() { showToast?.('Profile updated successfully!', 'success'); }

  const platforms = [
    { key: 'riot', label: 'Riot Games', icon: '🎯', color: '#ff4655' },
    { key: 'steam', label: 'Steam', icon: '🎮', color: '#4f8ef7' },
    { key: 'playstation', label: 'PlayStation', icon: '🎮', color: '#003087' },
    { key: 'xbox', label: 'Xbox', icon: '🟢', color: '#107c10' },
    { key: 'epic', label: 'Epic Games', icon: '⚡', color: '#2d2d2d' },
    { key: 'discord', label: 'Discord', icon: '💬', color: '#5865f2' },
  ];

  return (
    <div style={{ width: '100%', margin: '0 auto' }}>
      <div style={{ marginBottom: 20 }}>
        <h1 className="section-title" style={{ fontSize: 'var(--text-2xl)' }}>Settings</h1>
        <p className="section-subtitle">Manage your account, privacy, and preferences</p>
      </div>

      <Tabs tabs={SETTINGS_TABS} activeTab={tab} onChange={setTab} className="w-full" />

      <div className="nexora-card" style={{ padding: 24, marginTop: 20 }}>
        {tab === 'profile' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {/* Avatar section */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 0', borderBottom: '1px solid var(--color-border)' }}>
              <Avatar user={CURRENT_USER} size="xl" ring />
              <div>
                <p style={{ fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)', marginBottom: 4 }}>Profile Photo</p>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="btn btn-secondary btn-sm">Upload Photo</button>
                  <button className="btn btn-ghost btn-sm">Remove</button>
                </div>
              </div>
            </div>

            <SettingRow label="Display Name" description="Your public name on NEXORA">
              <input className="input" value={form.displayName} onChange={(e) => setForm((p) => ({ ...p, displayName: e.target.value }))} style={{ width: 200, height: 34 }} />
            </SettingRow>
            <SettingRow label="Location" description="City, Country">
              <input className="input" value={form.location} onChange={(e) => setForm((p) => ({ ...p, location: e.target.value }))} style={{ width: 200, height: 34 }} />
            </SettingRow>

            <div style={{ padding: '14px 0' }}>
              <label style={{ fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)', display: 'block', marginBottom: 6 }}>Bio</label>
              <textarea className="input" rows={3} value={form.bio} onChange={(e) => setForm((p) => ({ ...p, bio: e.target.value }))} />
            </div>

            <div style={{ paddingTop: 8, display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={saveProfile}>Save Changes</button>
            </div>
          </div>
        )}

        {tab === 'privacy' && (
          <div>
            {[
              { key: 'publicProfile', label: 'Public Profile', desc: 'Allow non-connected users to view your profile' },
              { key: 'showRank', label: 'Show Rank', desc: 'Display your rank publicly on your profile' },
              { key: 'showConnections', label: 'Show Connections Count', desc: 'Display your connection count on your profile' },
              { key: 'lookingForTeam', label: 'Looking for Team Status', desc: 'Allow teams to see you are looking for a team' },
            ].map(({ key, label, desc }) => (
              <SettingRow key={key} label={label} description={desc}>
                <Toggle checked={privacy[key]} onChange={(v) => { setPrivacy((p) => ({ ...p, [key]: v })); showToast?.(`${label} ${v ? 'enabled' : 'disabled'}`, 'info'); }} />
              </SettingRow>
            ))}
          </div>
        )}

        {tab === 'gaming' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', marginBottom: 8 }}>
              Connect your gaming accounts to verify your achievements and rank.
            </p>
            {platforms.map(({ key, label, icon, color }) => {
              const acct = CURRENT_USER.connectedAccounts[key];
              return (
                <div key={key} style={{
                  display: 'flex', alignItems: 'center', gap: 14, padding: 14, borderRadius: 'var(--radius-md)',
                  background: acct?.connected ? `${color}08` : 'var(--color-bg-elevated)',
                  border: `1px solid ${acct?.connected ? `${color}25` : 'var(--color-border)'}`,
                }}>
                  <span style={{ fontSize: 24, flexShrink: 0 }}>{icon}</span>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 700, fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)' }}>{label}</p>
                    {acct?.connected
                      ? <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-green)', fontWeight: 600 }}>✓ Connected as {acct.username}</p>
                      : <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>Not connected</p>
                    }
                  </div>
                  <button
                    className={`btn btn-sm ${acct?.connected ? 'btn-danger' : 'btn-primary'}`}
                    onClick={() => showToast?.(acct?.connected ? `${label} disconnected` : `Connecting to ${label}…`, acct?.connected ? 'info' : 'success')}
                    style={{ fontSize: 12 }}
                  >
                    {acct?.connected ? 'Disconnect' : 'Connect'}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {tab === 'notifications' && (
          <div>
            {[
              { key: 'endorsements', label: 'Skill Endorsements', desc: 'When someone endorses one of your skills' },
              { key: 'connections', label: 'New Connections', desc: 'When someone accepts your connection request' },
              { key: 'teamActivity', label: 'Team Activity', desc: 'Updates from your teams and team openings' },
              { key: 'eventReminders', label: 'Event Reminders', desc: 'Reminders for upcoming events you\'re registered for' },
              { key: 'profileViews', label: 'Profile Views', desc: 'When someone views your profile' },
              { key: 'messages', label: 'New Messages', desc: 'When you receive a new message' },
            ].map(({ key, label, desc }) => (
              <SettingRow key={key} label={label} description={desc}>
                <Toggle checked={notifs[key]} onChange={(v) => { setNotifs((p) => ({ ...p, [key]: v })); showToast?.(`${label} notifications ${v ? 'enabled' : 'disabled'}`, 'info'); }} />
              </SettingRow>
            ))}
          </div>
        )}

        {tab === 'appearance' && (
          <div>
            <SettingRow label="Theme" description="Dark mode is recommended for the best experience">
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn btn-primary btn-sm" style={{ fontSize: 12 }}>🌙 Dark</button>
                <button className="btn btn-ghost btn-sm" style={{ fontSize: 12 }}>☀️ Light</button>
              </div>
            </SettingRow>
            <SettingRow label="Accent Color" description="Choose your accent color">
              <div style={{ display: 'flex', gap: 8 }}>
                {['#4f8ef7', '#8b5cf6', '#10b981', '#f59e0b', '#d946ef'].map((c) => (
                  <div key={c} onClick={() => showToast?.('Accent color updated!', 'success')} style={{ width: 24, height: 24, borderRadius: '50%', background: c, cursor: 'pointer', border: c === '#4f8ef7' ? '2px solid white' : '2px solid transparent' }} />
                ))}
              </div>
            </SettingRow>
            <SettingRow label="Reduce Motion" description="Disable animations for accessibility">
              <Toggle checked={false} onChange={(v) => showToast?.(`Motion ${v ? 'reduced' : 'restored'}`, 'info')} />
            </SettingRow>
          </div>
        )}

        {tab === 'security' && (
          <div>
            <SettingRow label="Change Password" description="Last changed: Never">
              <button className="btn btn-secondary btn-sm" onClick={() => showToast?.('Password change email sent!', 'success')}>Change Password</button>
            </SettingRow>
            <SettingRow label="Two-Factor Authentication" description="Add an extra layer of security to your account">
              <button className="btn btn-primary btn-sm" onClick={() => showToast?.('2FA setup coming soon!', 'info')}>Enable 2FA</button>
            </SettingRow>
            <SettingRow label="Active Sessions" description="Manage devices where you're signed in">
              <button className="btn btn-ghost btn-sm">View Sessions</button>
            </SettingRow>
            <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid var(--color-border)' }}>
              <button className="btn btn-danger" onClick={() => showToast?.('Signed out successfully', 'info')}>Sign Out</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
