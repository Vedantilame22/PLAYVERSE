// ============================================================
// NEXORA — Tabs Component
// ============================================================

export default function Tabs({ tabs, activeTab, onChange, className = '' }) {
  return (
    <div className={`tabs-nav ${className}`} role="tablist">
      {tabs.map((tab) => (
        <button
          key={tab.key || tab}
          role="tab"
          aria-selected={activeTab === (tab.key || tab)}
          className={`tab-btn ${activeTab === (tab.key || tab) ? 'active' : ''}`}
          onClick={() => onChange(tab.key || tab)}
        >
          {tab.icon && <span>{tab.icon}</span>}
          {tab.label || tab}
        </button>
      ))}
    </div>
  );
}
