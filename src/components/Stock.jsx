import { useState } from 'react'
import { stockData } from '../data/flowerData'
import { useScrollLock } from '../hooks/useScrollLock'

// 추후 그린꽃 추가 예정
const tabs = ['메인꽃', '필러꽃', '꽃다발', '화분']

function Stock() {
  const [activeTab, setActiveTab] = useState('메인꽃')
  const [selected, setSelected] = useState(null)
  useScrollLock(!!selected)

  return (
    <section className="pt-8 pb-6" style={{ backgroundColor: 'var(--color-bg)' }}>
      {/* 섹션 헤더 */}
      <div className="px-4 mb-3">
        <p className="text-[10px] tracking-[2px] mb-1" style={{ color: 'var(--color-accent)' }}>TODAY'S STOCK</p>
        <h2 className="text-[16px] font-normal" style={{ color: 'var(--color-primary)' }}>오늘의 꽃 현황</h2>
      </div>

      {/* 탭 */}
      <div className="px-4 flex gap-2 mb-4 pb-3 border-b" style={{ borderColor: 'var(--color-surface)' }}>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="text-[12px] px-3 py-1.5 rounded-full border transition-all"
            style={activeTab === tab
              ? { backgroundColor: 'var(--color-primary)', color: 'var(--color-bg)', borderColor: 'var(--color-primary)' }
              : { backgroundColor: 'var(--color-bg)', color: 'var(--color-accent)', borderColor: 'var(--color-surface)' }
            }
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 카드 가로 스크롤 */}
      <div className="flex gap-3 overflow-x-auto px-4 scrollbar-hide pb-2">
        {stockData[activeTab].map((flower) => (
          <div
            key={flower.id}
            className="flex-shrink-0 w-[120px] rounded-xl overflow-hidden cursor-pointer border"
            style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-surface)' }}
            onClick={() => setSelected(flower)}
          >
            <img src={flower.img} alt={flower.name} className="w-full h-[100px] object-cover" loading="lazy" />
            <div className="p-2">
              <p className="text-[12px] font-medium mb-1" style={{ color: 'var(--color-primary)' }}>{flower.name}</p>
              <div className="flex items-center gap-1">
                <div className={`w-1.5 h-1.5 rounded-full ${flower.stock <= 3 ? 'bg-red-400' : flower.stock <= 7 ? 'bg-yellow-400' : 'bg-green-400'}`} />
                <p className="text-[11px]" style={{ color: 'var(--color-accent)' }}>재고 {flower.stock}개</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 꽃 상세 모달 */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/45 z-50 flex items-center justify-center"
          onClick={() => setSelected(null)}
        >
          <div
            className="w-[260px] rounded-2xl overflow-hidden border"
            style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-surface)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <img src={selected.img} alt={selected.name} className="w-full h-[180px] object-cover" loading="lazy" />
            <div className="p-4">
              <p className="text-[15px] font-medium mb-3" style={{ color: 'var(--color-primary)' }}>{selected.name}</p>
              <div className="flex justify-between py-2 border-b text-[12px]" style={{ borderColor: 'var(--color-surface)' }}>
                <span style={{ color: 'var(--color-accent)' }}>색상</span>
                <span className="font-medium" style={{ color: 'var(--color-primary)' }}>{selected.color}</span>
              </div>
              <div className="flex justify-between py-2 border-b text-[12px]" style={{ borderColor: 'var(--color-surface)' }}>
                <span style={{ color: 'var(--color-accent)' }}>꽃말</span>
                <span className="font-medium" style={{ color: 'var(--color-primary)' }}>{selected.meaning}</span>
              </div>
              <div className="flex justify-between py-2 text-[12px]">
                <span style={{ color: 'var(--color-accent)' }}>재고</span>
                <span className="font-medium" style={{ color: 'var(--color-primary)' }}>{selected.stock}개 남음</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Stock