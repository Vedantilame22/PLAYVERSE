// ============================================================
// NEXORA — Messaging Page
// ============================================================
import { useState, useRef, useEffect } from 'react';
import { Send, Search } from 'lucide-react';
import Avatar from '@/components/common/Avatar';
import { MESSAGES } from '@/data/index';
import { PLAYERS, CURRENT_USER } from '@/data/users';
import { useMediaQuery } from '@/hooks';

function ConversationItem({ msg, selected, onClick }) {
  const contact = PLAYERS.find((p) => p.id === msg.contactId) || { displayName: msg.contactName, avatarColor: msg.contactColor, isOnline: msg.contactOnline };
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '12px 16px', cursor: 'pointer',
        background: selected ? 'var(--color-primary-dim)' : 'transparent',
        borderLeft: selected ? '2px solid var(--color-primary)' : '2px solid transparent',
        transition: 'all var(--transition-fast)',
      }}
      onMouseEnter={(e) => { if (!selected) e.currentTarget.style.background = 'var(--color-bg-elevated)'; }}
      onMouseLeave={(e) => { if (!selected) e.currentTarget.style.background = 'transparent'; }}
    >
      <Avatar user={{ displayName: msg.contactName, avatarColor: msg.contactColor }} size="md" online={msg.contactOnline} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontWeight: 700, fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }} className="truncate">
            {msg.contactName}
          </p>
          <span style={{ fontSize: 10, color: 'var(--color-text-muted)', flexShrink: 0 }}>{msg.lastTimestamp}</span>
        </div>
        <p style={{ fontSize: 10, color: 'var(--color-text-muted)', marginBottom: 2 }}>{msg.context}</p>
        <p className="truncate" style={{ fontSize: 'var(--text-xs)', color: msg.unread > 0 ? 'var(--color-text-primary)' : 'var(--color-text-muted)', fontWeight: msg.unread > 0 ? 600 : 400 }}>
          {msg.lastMessage}
        </p>
      </div>
      {msg.unread > 0 && (
        <span style={{
          background: 'var(--color-primary)', color: 'white', borderRadius: '50%',
          width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 10, fontWeight: 700, flexShrink: 0,
        }}>{msg.unread}</span>
      )}
    </div>
  );
}

export default function MessagingPage() {
  const [selectedId, setSelectedId] = useState(MESSAGES[0].id);
  const [newMsg, setNewMsg] = useState('');
  const [conversations, setConversations] = useState(MESSAGES);
  const bottomRef = useRef(null);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [mobileShowChat, setMobileShowChat] = useState(false);

  const selected = conversations.find((c) => c.id === selectedId);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [selected]);

  function sendMessage() {
    if (!newMsg.trim()) return;
    setConversations((prev) => prev.map((c) =>
      c.id === selectedId
        ? { ...c, conversation: [...c.conversation, { id: `new-${Date.now()}`, senderId: 'u1', text: newMsg, time: 'Now', mine: true }], lastMessage: newMsg, lastTimestamp: 'Just now', unread: 0 }
        : c
    ));
    setNewMsg('');
  }

  const selectConv = (id) => { setSelectedId(id); setMobileShowChat(true); };

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - var(--topbar-height) - 48px)', background: 'var(--color-bg-card)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)', overflow: 'hidden' }}>
      {/* Sidebar */}
      {(!isMobile || !mobileShowChat) && (
        <div style={{ width: isMobile ? '100%' : 300, borderRight: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
          <div style={{ padding: 16, borderBottom: '1px solid var(--color-border)' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-lg)', marginBottom: 10 }}>Messages</h2>
            <div style={{ position: 'relative' }}>
              <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
              <input className="input" placeholder="Search conversations…" style={{ paddingLeft: 30, height: 34, fontSize: 'var(--text-xs)' }} />
            </div>
          </div>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {conversations.map((msg) => (
              <ConversationItem key={msg.id} msg={msg} selected={selectedId === msg.id} onClick={() => selectConv(msg.id)} />
            ))}
          </div>
        </div>
      )}

      {/* Chat Area */}
      {(!isMobile || mobileShowChat) && selected && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Header */}
          <div style={{ padding: '12px 20px', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: 12 }}>
            {isMobile && (
              <button className="btn btn-ghost btn-sm btn-icon" onClick={() => setMobileShowChat(false)}>←</button>
            )}
            <Avatar user={{ displayName: selected.contactName, avatarColor: selected.contactColor }} size="sm" online={selected.contactOnline} />
            <div>
              <p style={{ fontWeight: 700, fontFamily: 'var(--font-display)', fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)' }}>
                {selected.contactName}
              </p>
              <p style={{ fontSize: 10, color: selected.contactOnline ? 'var(--color-green)' : 'var(--color-text-muted)' }}>
                {selected.contactOnline ? '● Online' : 'Offline'} • {selected.context}
              </p>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {selected.conversation.map((msg) => {
              const isMine = msg.mine;
              return (
                <div key={msg.id} style={{ display: 'flex', justifyContent: isMine ? 'flex-end' : 'flex-start', gap: 8 }}>
                  {!isMine && <Avatar user={{ displayName: selected.contactName, avatarColor: selected.contactColor }} size="xs" />}
                  <div style={{
                    maxWidth: '70%',
                    padding: '10px 14px',
                    borderRadius: isMine ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                    background: isMine ? 'var(--color-primary)' : 'var(--color-bg-elevated)',
                    border: `1px solid ${isMine ? 'rgba(79,142,247,0.3)' : 'var(--color-border)'}`,
                  }}>
                    <p style={{ fontSize: 'var(--text-sm)', color: isMine ? 'white' : 'var(--color-text-primary)', lineHeight: 1.5 }}>
                      {msg.text}
                    </p>
                    <p style={{ fontSize: 10, color: isMine ? 'rgba(255,255,255,0.6)' : 'var(--color-text-muted)', marginTop: 4 }}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{ padding: 16, borderTop: '1px solid var(--color-border)', display: 'flex', gap: 10 }}>
            <input
              className="input"
              placeholder="Type a message…"
              value={newMsg}
              onChange={(e) => setNewMsg(e.target.value)}
              style={{ flex: 1, height: 40, fontSize: 'var(--text-sm)' }}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
            />
            <button className="btn btn-primary btn-icon" onClick={sendMessage} disabled={!newMsg.trim()}>
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
