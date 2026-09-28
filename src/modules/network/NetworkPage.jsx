import { Users } from 'lucide-react';
// ============================================================
// NEXORA — Network Page
// ============================================================
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import Tabs from '@/components/common/Tabs';
import PlayerCard from '@/components/gaming/PlayerCard';
import { PLAYERS } from '@/data/users';
import { useToggleSet } from '@/hooks';
import EmptyState from '@/components/common/EmptyState';

const TABS = [
  { key: 'suggestions', label: 'People You May Know' },
  { key: 'connections', label: 'Connections' },
  { key: 'following', label: 'Following' },
  { key: 'followers', label: 'Followers' },
];

export default function NetworkPage() {
  const { showToast } = useOutletContext() || {};
  const [tab, setTab] = useState('suggestions');
  const connected = useToggleSet([]);
  const followed = useToggleSet([]);

  function handleConnect(id) {
    connected.toggle(id);
    showToast?.(connected.has(id) ? 'Connection removed' : 'Connection request sent!', 'success');
  }

  function handleFollow(id) {
    followed.toggle(id);
    showToast?.(followed.has(id) ? 'Unfollowed' : 'Following!', 'info');
  }

  const connectedList = PLAYERS.filter((p) => connected.has(p.id));
  const followedList = PLAYERS.filter((p) => followed.has(p.id));

  return (
    <div style={{ width: '100%', margin: '0 auto' }}>
      <div style={{ marginBottom: 20 }}>
        <h1 className="section-title" style={{ fontSize: 'var(--text-2xl)' }}>My Network</h1>
        <p className="section-subtitle">Grow your gaming connections</p>
      </div>

      <Tabs tabs={TABS} activeTab={tab} onChange={setTab} />

      <div style={{ marginTop: 20 }}>
        {tab === 'suggestions' && (
          <>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', marginBottom: 16 }}>
              Recommended based on your games, teams, and communities
            </p>
            <div className="grid-3" style={{ gap: 16 }}>
              {PLAYERS.map((p) => (
                <PlayerCard
                  key={p.id}
                  player={p}
                  connected={connected.has(p.id)}
                  followed={followed.has(p.id)}
                  onConnect={handleConnect}
                  onFollow={handleFollow}
                />
              ))}
            </div>
          </>
        )}

        {tab === 'connections' && (
          connectedList.length === 0
            ? <EmptyState
                icon={<Users size={28} />}
                title="No connections yet"
                description="Connect with players from the suggestions tab to start building your network"
                action={<button className="btn btn-primary" onClick={() => setTab('suggestions')}>Find Players</button>}
              />
            : <div className="grid-3" style={{ gap: 16 }}>
                {connectedList.map((p) => (
                  <PlayerCard key={p.id} player={p} connected={true} followed={followed.has(p.id)} onConnect={handleConnect} onFollow={handleFollow} />
                ))}
              </div>
        )}

        {tab === 'following' && (
          followedList.length === 0
            ? <EmptyState
                icon={<Users size={28} />}
                title="Not following anyone yet"
                description="Follow players to keep up with their gaming activity"
                action={<button className="btn btn-primary" onClick={() => setTab('suggestions')}>Discover Players</button>}
              />
            : <div className="grid-3" style={{ gap: 16 }}>
                {followedList.map((p) => (
                  <PlayerCard key={p.id} player={p} connected={connected.has(p.id)} followed={true} onConnect={handleConnect} onFollow={handleFollow} />
                ))}
              </div>
        )}

        {tab === 'followers' && (
          <div className="grid-3" style={{ gap: 16 }}>
            {PLAYERS.slice(0, 4).map((p) => (
              <PlayerCard key={p.id} player={p} connected={connected.has(p.id)} followed={followed.has(p.id)} onConnect={handleConnect} onFollow={handleFollow} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
