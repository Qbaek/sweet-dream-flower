import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useScrollLock } from '../hooks/useScrollLock'

const tabs = ['메인꽃', '필러꽃', '꽃다발', '화분']

// 30분마다 재고 1개 감소 (밀리초 단위)
const DECREASE_INTERVAL = 30 * 60 * 1000

function Stock() {
  const [activeTab, setActiveTab] = useState('메인꽃')
  const [selected, setSelected] = useState(null)
  // Supabase에서 불러온 재고 데이터 — 탭별로 분류된 객체
  const [stock, setStock] = useState({})
  // 데이터 로딩 상태
  const [loading, setLoading] = useState(true)
  useScrollLock(!!selected)

  // Supabase flowers 테이블에서 전체 데이터 불러오는 함수
  async function fetchStock() {
    const { data, error } = await supabase
      .from('flowers')
      .select('*')
      .order('id')

    if (error) {
      console.error('재고 불러오기 실패:', error)
      return
    }

    // 불러온 데이터를 탭별로 분류
    const grouped = {}
    tabs.forEach(tab => { grouped[tab] = [] })
    data.forEach(item => {
      if (grouped[item.tab]) {
        grouped[item.tab].push(item)
      }
    })
    setStock(grouped)
    setLoading(false)
  }

  // Supabase Realtime 구독 — flowers 테이블 변경 시 자동으로 데이터 갱신
useEffect(() => {
  const channel = supabase
    .channel('flowers-changes')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'flowers' },
      () => {
        // 변경 감지 시 데이터 다시 불러오기
        fetchStock()
      }
    )
    .subscribe()

  // 컴포넌트 언마운트 시 구독 해제
  return () => {
    supabase.removeChannel(channel)
  }
}, [])

  // 컴포넌트 마운트 시 최초 1회 데이터 불러오기
  useEffect(() => {
    fetchStock()
  }, [])

  // 30분마다 재고 1개씩 감소 후 DB 업데이트
  useEffect(() => {
    const interval = setInterval(async () => {
      // 모든 탭의 꽃 데이터 순회
      for (const tab of tabs) {
        const flowers = stock[tab] || []
        for (const flower of flowers) {
          // 재고가 0보다 클 때만 감소
          if (flower.stock > 0) {
            await supabase
              .from('flowers')
              .update({ stock: flower.stock - 1 })
              .eq('id', flower.id)
          }
        }
      }
      // 업데이트 후 최신 데이터 다시 불러오기
      fetchStock()
    }, DECREASE_INTERVAL)

    // 컴포넌트 언마운트 시 인터벌 정리
    return () => clearInterval(interval)
  }, [stock])

  // 데이터 로딩 중 표시
  if (loading) {
    return (
      <section className="pt-8 pb-6 px-4" style={{ backgroundColor: 'var(--color-bg)' }}>
        <p className="text-[13px]" style={{ color: 'var(--color-accent)' }}>재고 불러오는 중...</p>
      </section>
    )
  }

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
        {(stock[activeTab] || []).map((flower) => (
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
                {/* 재고 0이면 품절, 3개 이하 빨강, 7개 이하 노랑, 그 이상 초록 */}
                {flower.stock === 0 ? (
                  <p className="text-[11px] font-medium text-red-400">품절</p>
                ) : (
                  <>
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