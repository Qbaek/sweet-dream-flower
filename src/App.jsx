import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Stock from './components/Stock'
import Reservation from './components/Reservation'
import Member from './components/Member'
import Footer from './components/Footer'
import { themes } from './data/themeData'
import { useScrollLock } from './hooks/useScrollLock'

function App() {
  const [currentTheme, setCurrentTheme] = useState(themes[0])
  const [showThemeModal, setShowThemeModal] = useState(false)

  useScrollLock(showThemeModal)

  useEffect(() => {
    document.documentElement.style.setProperty('--color-primary', currentTheme.primary)
    document.documentElement.style.setProperty('--color-bg', currentTheme.bg)
    document.documentElement.style.setProperty('--color-surface', currentTheme.surface)
    document.documentElement.style.setProperty('--color-accent', currentTheme.accent)
  }, [currentTheme])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div
      className="max-w-[390px] mx-auto min-h-screen relative"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <Header
        theme={currentTheme}
        onThemeClick={() => setShowThemeModal(true)}
      />

      <main className="pt-14">
        <div id="hero"><Hero /></div>
        <div id="stock"><Stock /></div>
        <div id="reservation"><Reservation /></div>
        <div id="member"><Member /></div>
        <Footer />
      </main>

      {/* 플로팅 버튼 */}
      <div className="fixed bottom-6 right-4 flex flex-col gap-3 z-40">
        <button
          onClick={() => scrollTo('reservation')}
          className="w-12 h-12 rounded-full flex items-center justify-center shadow-md"
          style={{ backgroundColor: 'var(--color-primary)' }}
        >
          <span className="text-white text-lg">📅</span>
        </button>
        <button
          onClick={() => scrollTo('stock')}
          className="w-12 h-12 rounded-full border flex items-center justify-center shadow-md"
          style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-surface)' }}
        >
          <span className="text-lg">🌸</span>
        </button>
      </div>

      {/* 테마 모달 */}
      {showThemeModal && (
        <div
          className="fixed inset-0 bg-black/45 z-50 flex items-center justify-center"
          onClick={() => setShowThemeModal(false)}
        >
          <div
            className="w-[260px] rounded-2xl p-4 border"
            style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-surface)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-[14px] font-medium" style={{ color: 'var(--color-primary)' }}>테마 선택</span>
              <button onClick={() => setShowThemeModal(false)} className="text-xl" style={{ color: 'var(--color-accent)' }}>✕</button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {themes.map((t) => (
                <div
                  key={t.id}
                  onClick={() => { setCurrentTheme(t); setShowThemeModal(false) }}
                  className="rounded-xl overflow-hidden cursor-pointer border"
                  style={{
                    borderColor: currentTheme.id === t.id ? 'var(--color-primary)' : 'var(--color-surface)',
                    borderWidth: currentTheme.id === t.id ? '1.5px' : '1px'
                  }}
                >
                  <div className="h-[52px] relative" style={{ backgroundColor: t.swatch }}>
                    {currentTheme.id === t.id && (
                      <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-black/35 flex items-center justify-center">
                        <span className="text-white text-[10px]">✓</span>
                      </div>
                    )}
                  </div>
                  <div className="p-2 border-t" style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-surface)' }}>
                    <p className="text-[9px] tracking-[1px]" style={{ color: 'var(--color-accent)' }}>{t.eng}</p>
                    <p className="text-[11px] font-medium" style={{ color: 'var(--color-primary)' }}>{t.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App