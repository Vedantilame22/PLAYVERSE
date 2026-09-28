// ============================================================
// NEXORA — Create Post Modal
// ============================================================
import { useState } from 'react';
import Modal from '@/components/common/Modal';
import Avatar from '@/components/common/Avatar';
import { CURRENT_USER } from '@/data/users';

const POST_TYPES = [
  { icon: '🎮', label: 'Share Achievement', value: 'achievement' },
  { icon: '📹', label: 'Share Clip', value: 'clip' },
  { icon: '🏆', label: 'Tournament Result', value: 'tournament' },
  { icon: '📢', label: 'Team Opening', value: 'opening' },
  { icon: '📝', label: 'Create Post', value: 'post' },
  { icon: '🎯', label: 'Looking for Team', value: 'lft' },
];

export default function CreatePostModal({ isOpen, onClose, type = 'post', onSubmit }) {
  const [content, setContent] = useState('');
  const [selectedType, setSelectedType] = useState(type);
  const [game, setGame] = useState('Valorant');

  const placeholders = {
    achievement: 'Share your latest achievement…',
    clip: 'Describe your clip…',
    tournament: 'Share your tournament result…',
    opening: 'Describe what you\'re looking for in a teammate…',
    post: 'What are you gaming today?',
    lft: 'Describe your playstyle, availability, and the team you\'re looking for…',
  };

  function handleSubmit() {
    if (!content.trim()) return;
    onSubmit?.({ content, type: selectedType, game });
    setContent('');
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Post"
      maxWidth={600}
      footer={
        <div style={{ display: 'flex', gap: 10, width: '100%', justifyContent: 'flex-end' }}>
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmit} disabled={!content.trim()}>
            Publish
          </button>
        </div>
      }
    >
      {/* Author */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <Avatar user={CURRENT_USER} size="md" online ring />
        <div>
          <p style={{ fontWeight: 700, color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}>
            {CURRENT_USER.displayName}
          </p>
          <select
            value={game}
            onChange={(e) => setGame(e.target.value)}
            className="input"
            style={{ width: 'auto', padding: '2px 8px', height: 'auto', fontSize: 'var(--text-xs)', marginTop: 4 }}
          >
            {CURRENT_USER.games.map((g) => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
      </div>

      {/* Type Selector */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
        {POST_TYPES.map(({ icon, label, value }) => (
          <button
            key={value}
            onClick={() => setSelectedType(value)}
            className="chip"
            style={selectedType === value ? {
              background: 'var(--color-primary-dim)',
              borderColor: 'var(--color-border-accent)',
              color: 'var(--color-primary)',
            } : {}}
          >
            {icon} {label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <textarea
        className="input"
        placeholder={placeholders[selectedType] || placeholders.post}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={5}
        style={{ resize: 'vertical', fontSize: 'var(--text-base)' }}
        autoFocus
      />

      {/* Char count */}
      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', textAlign: 'right', marginTop: 8 }}>
        {content.length} characters
      </p>
    </Modal>
  );
}
