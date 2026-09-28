// ============================================================
// NEXORA — Avatar Component
// ============================================================
import { getInitials, avatarGradient } from '@/utils';

export default function Avatar({ user, size = 'md', className = '', style = {}, ring = false, online = false }) {
  const sizes = { xs: 'avatar-xs', sm: 'avatar-sm', md: 'avatar-md', lg: 'avatar-lg', xl: 'avatar-xl', '2xl': 'avatar-2xl', '3xl': 'avatar-3xl' };
  const dotSizes = { xs: 6, sm: 8, md: 10, lg: 12, xl: 14, '2xl': 16, '3xl': 20 };
  const cls = `avatar ${sizes[size] || sizes.md} ${className}`;
  const grad = avatarGradient(user?.avatarColor || '#4f8ef7');
  const initials = getInitials(user?.displayName || user?.name || '?');

  return (
    <div style={{ position: 'relative', display: 'inline-flex', flexShrink: 0 }}>
      <div
        className={cls}
        style={{
          background: grad,
          boxShadow: ring ? `0 0 0 2px var(--color-bg-primary), 0 0 0 3px ${user?.avatarColor || '#4f8ef7'}55` : undefined,
          ...style,
        }}
      >
        {initials}
      </div>
      {online && (
        <span
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: dotSizes[size] || 10,
            height: dotSizes[size] || 10,
            background: 'var(--color-green)',
            borderRadius: '50%',
            border: '2px solid var(--color-bg-primary)',
            boxShadow: '0 0 6px var(--color-green)',
          }}
        />
      )}
    </div>
  );
}
