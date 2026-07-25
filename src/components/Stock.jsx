import { useState, useEffect } from 'react'
import { stockData } from '../data/flowerData'
import { useScrollLock } from '../hooks/useScrollLock'

const tabs = ['메인꽃', '필러꽃', '꽃다발', '화분']

// localStorage 키 이름
const STORAGE_KEY = 'sdf_stock'
// 24시간 후 재고 리셋 (밀리초 단위)
const RESET_INTERVAL = 24 * 60 * 60 * 1000
// 30분마다 재고 1개 감소 (밀리초 단위)
const DECREASE_INTERVAL = 30 * 60 * 1000

// 재고 초기화 함수
function initStock() {
  // localStorage에 저장된 데이터 불러오기
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) {
    const { data, timestamp } = JSON.parse(saved)
    // 마지막 저장 시간이 24시간 이내면 저장된 데이터 사용
    if (Date.now() - timestamp < RESET_INTERVAL) {
      return data
    }
  }
  // 저장된 데이터 없거나 24시간 지났으면 원래 데이터로 리셋
  const initial = {}
  Object.entries(stockData).forEach(([tab, flowers]) => {
    initial[tab] = flowers.map(f => ({ ...f }))
  })
  // 초기화된 데이터와 현재 시간 저장
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ data: initial, timestamp: Date.now() }))
  return initial
}

function Stock() {
  const [activeTab, setActiveTab] = useState('메인꽃')
  const [selected, setSelected] = useState(null)
  // localStorage에서 불러온 재고 데이터로 초기화
  const [stock, setStock] = useState(initStock)
  useScrollLock(!!selected)

  useEffect(() => {
    // 30분마다 재고 1개씩 감소하는 인터벌 설정
    const interval = setInterval(() => {
      setStock(prev => {
        const updated = { ...prev }
        // 모든 탭의 모든 꽃 재고 1개씩 감소 (최소 0)
        Object.keys(updated).forEach(tab => {
          updated[tab] = updated[tab].map(f => ({
            ...f,
            stock: Math.max(0, f.stock - 1)
          }))
        })
        // 변경된 재고 localStorage에 저장 (타임스탬프는 유지)
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          data: updated,
          timestamp: JSON.parse(localStorage.getItem(STORAGE_KEY)).timestamp
        }))
        return updated
      })
    }, DECREASE_INTERVAL)
    // 컴포넌트 언마운트 시 인터벌 정리
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="pt-8 pb-6" style={{ backgroundColor: 'var(--color-bg)' }}>
      {/* 섹션 헤더 */}
      <div className="px-4 mb-3">
        <p className="text-[10px] tracking-[2px] mb-1" style={{ color: 'var(--color-accent)' }}>TODAY'S STOCK</p>
        <h2 className="text-[16px] font-normal" style={{ color: 'var(--color-primary)' }}>오늘의 꽃 현황</h2>
      </div>

      {/* 탭 버튼 — 클릭하면 해당 탭으로 전환 */}
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

      {/* 꽃 카드 가로 스크롤 */}
      <div className="flex gap-3 overflow-x-auto px-4 scrollbar-hide pb-2">
        {stock[activeTab].map((flower) => (
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
                {/* 재고 0이면 품절 표시, 아니면 재고 수량 표시 */}
                {flower.stock === 0 ? (
                  <p className="text-[11px] font-medium text-red-400">품절</p>
                ) : (
                  <>
                    {/* 재고 3개 이하 빨강, 7개 이하 노랑, 그 이상 초록 */}
                    <div className={`w-1.5 h-1.5 rounded-full ${flower.stock <= 3 ? 'bg-red-400' : flower.stock <= 7 ? 'bg-yellow-400' : 'bg-green-400'}`} />
                    <p className="text-[11px]" style={{ color: 'var(--color-accent)' }}>재고 {flower.stock}개</p>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 꽃 상세 모달 — 바깥 클릭 시 닫힘 */}
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
                {/* 품절이면 빨간색으로 표시 */}
                <span className="font-medium" style={{ color: selected.stock === 0 ? '#f87171' : 'var(--color-primary)' }}>
                  {selected.stock === 0 ? '품절' : `${selected.stock}개 남음`}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Stock