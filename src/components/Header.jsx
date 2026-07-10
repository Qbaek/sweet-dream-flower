function Header({ theme, onThemeClick }) {
  return (
    <header 
      className="fixed top-0 left-0 right-0 max-w-[390px] mx-auto h-14 flex items-center justify-center z-50 border-b"
      style={{ backgroundColor: theme?.bg || 'var(--color-bg)', borderColor: theme?.surface || 'var(--color-surface)' }}
    >
      <span 
        className="font-normal text-[13px] tracking-[0.04em]"
        style={{ color: theme?.primary || 'var(--color-primary)' }}
      >
        Sweet Dream Flower
      </span>
      <button
        onClick={onThemeClick}
        className="absolute right-4 text-[11px] px-3 py-1 rounded-md tracking-[0.04em] border"
        style={{ color: theme?.primary || 'var(--color-primary)', backgroundColor: theme?.bg || 'var(--color-bg)', borderColor: 'var(--color-surface)' }}
      >
        Theme
      </button>
    </header>
  )
}

export default Header