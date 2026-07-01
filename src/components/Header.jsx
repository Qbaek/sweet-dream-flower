function Header({ theme, onThemeClick }) {
  return (
    <header className="fixed top-0 left-0 right-0 max-w-[390px] mx-auto h-14 flex items-center justify-center z-50 border-b border-[#F1EFE8]"
      style={{ backgroundColor: theme?.bg || '#F9F6F2' }}
    >
      <span className="font-normal text-[13px] tracking-[0.04em]"
        style={{ color: theme?.primary || '#2C2C2A' }}
      >
        Sweet Dream Flower
      </span>
      <button
        onClick={onThemeClick}
        className="absolute right-4 text-[11px] px-3 py-1 rounded-md tracking-[0.04em] border border-[#D4D0CB]"
        style={{ color: theme?.primary || '#2C2C2A', backgroundColor: theme?.bg || '#F9F6F2' }}
      >
        Theme
      </button>
    </header>
  )
}

export default Header