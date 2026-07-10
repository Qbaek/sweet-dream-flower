import { useState } from 'react'
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

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div
      className="max-w-[390px] mx-auto min-h-screen relative"
      style={{ backgroundColor: currentTheme.bg }}
    >
      <Header
        theme={currentTheme}
        onThemeClick={() => setShowThemeModal(true)}
      />

      <main className="pt-14">
        <div id="hero"><Hero theme={currentTheme} /></div>
        <div id="stock"><Stock theme={currentTheme} /></div>
        <div id="reservation"><Reservation theme={currentTheme} /></div>
        <div id="member"><Member theme={currentTheme} /></div>
        <Footer theme={currentTheme} />
      </main>

      {/* 플로팅 버튼 */}
      <div className="fixed bottom-6 right-4 flex flex-col gap-3 z-40">
        <button
          onClick={() => scrollTo('reservation')}
          className="w-12 h-12 rounded-full flex items-center justify-center shadow-md"
          style={{ backgroundColor: currentTheme.primary }}
        >
          <span className="text-white text-lg">📅</span>
        </button>
        <button
          onClick={() => scrollTo('stock')}
          className="w-12 h-12 rounded-full bg-white border border-[#D4D0CB] flex items-center justify-center shadow-md"
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
            className="w-[260px] bg-[#F9F6F2] rounded-2xl p-4 border border-[#D4D0CB]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-[14px] font-medium text-[#2C2C2A]">테마 선택</span>
              <button onClick={() => setShowThemeModal(false)} className="text-[#888780] text-xl">✕</button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {themes.map((t) => (
                <div
                  key={t.id}
                  onClick={() => { setCurrentTheme(t); setShowThemeModal(false) }}
                  className={`border rounded-xl overflow-hidden cursor-pointer ${currentTheme.id === t.id ? 'border-[1.5px] border-[#2C2C2A]' : 'border-[#D4D0CB]'}`}
                >
                  <div className="h-[52px] relative" style={{ backgroundColor: t.swatch }}>
                    {currentTheme.id === t.id && (
                      <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-black/35 flex items-center justify-center">
                        <span className="text-white text-[10px]">✓</span>
                      </div>
                    )}
                  </div>
                  <div className="p-2 bg-white border-t border-[#D4D0CB]">
                    <p className="text-[9px] text-[#888780] tracking-[1px]">{t.eng}</p>
                    <p className="text-[11px] font-medium text-[#2C2C2A]">{t.name}</p>
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