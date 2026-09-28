// ============================================================
// NEXORA — App Shell Layout
// ============================================================
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar, { MobileNavigation } from './Topbar';
import ToastContainer from '@/components/common/Toast';
import { useToast, useMediaQuery, useModal } from '@/hooks';
import Modal from '@/components/common/Modal';
import CreatePostModal from '@/modules/home/components/CreatePostModal';

export default function AppShell() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');
  const { toasts, show: showToast, dismiss } = useToast();
  const createModal = useModal();
  const [createType, setCreateType] = useState('post');

  function handleQuickCreate(type) {
    setCreateType(type);
    createModal.open();
  }

  const collapsed = isMobile ? true : (isTablet ? true : sidebarCollapsed);

  return (
    <div className="app-root">
      {/* Sidebar — hidden on mobile */}
      {!isMobile && (
        <Sidebar
          collapsed={collapsed}
          onToggle={() => setSidebarCollapsed((v) => !v)}
        />
      )}

      {/* Top Bar */}
      <Topbar
        sidebarCollapsed={collapsed}
        onQuickCreate={handleQuickCreate}
      />

      {/* Main Content Area */}
      <main
        className={`page-content ${collapsed ? 'sidebar-collapsed' : ''}`}
        style={isMobile ? { marginLeft: 0 } : undefined}
      >
        <div className="page-inner">
          <Outlet context={{ showToast }} />
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      {isMobile && <MobileNavigation />}

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismiss} />

      {/* Quick Create Modal */}
      <CreatePostModal
        isOpen={createModal.isOpen}
        onClose={createModal.close}
        type={createType}
        onSubmit={() => {
          createModal.close();
          showToast('Post created successfully!', 'success');
        }}
      />
    </div>
  );
}
