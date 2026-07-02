import { useState } from 'react'
import { stockData } from '../data/flowerData'

const tabs = ['메인꽃', '필러꽃', '꽃다발', '화분']

function Stock() {
  const [activeTab, setActiveTab] = useState('메인꽃')
  const [selected, setSelected] = useState(null)

  return (
    <section className="bg-[#F9F6F2] pt-8 pb-6">
      {/* 섹션 헤더 */}
      <div className="px-4 mb-3">
        <p className="text-[10px] text-[#888780] tracking-[2px] mb-1">TODAY'S STOCK</p>
        <h2 className="text-[16px] font-normal text-[#2C2C2A]">오늘의 꽃 현황</h2>
      </div>

      {/* 탭 */}
      <div className="px-4 flex gap-2 mb-4 border-b border-[#F1EFE8] pb-3">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-[12px] px-3 py-1.5 rounded-full border transition-all ${
              activeTab === tab
                ? 'bg-[#2C2C2A] text-[#F9F6F2] border-[#2C2C2A]'
                : 'bg-[#F9F6F2] text-[#888780] border-[#D4D0CB]'
            }`}
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
            className="flex-shrink-0 w-[120px] border border-[#D4D0CB] rounded-xl overflow-hidden bg-white cursor-pointer"
            onClick={() => setSelected(flower)}
          >
            <img src={flower.img} alt={flower.name} className="w-full h-[100px] object-cover" loading="lazy" />
            <div className="p-2">
              <p className="text-[12px] font-medium text-[#2C2C2A] mb-1">{flower.name}</p>
              <div className="flex items-center gap-1">
                <div className={`w-1.5 h-1.5 rounded-full ${flower.stock <= 3 ? 'bg-red-400' : flower.stock <= 7 ? 'bg-yellow-400' : 'bg-green-400'}`} />
                <p className="text-[11px] text-[#888780]">재고 {flower.stock}개</p>
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
            className="w-[260px] bg-[#F9F6F2] rounded-2xl overflow-hidden border border-[#D4D0CB]" loading="lazy"
            onClick={(e) => e.stopPropagation()}
          >
              <img src={selected.img} alt={selected.name} className="w-full h-[180px] object-cover" />            <div className="p-4">
              <p className="text-[15px] font-medium text-[#2C2C2A] mb-3">{selected.name}</p>
              <div className="flex justify-between py-2 border-b border-[#D4D0CB] text-[12px]">
                <span className="text-[#888780]">색상</span>
                <span className="text-[#2C2C2A] font-medium">{selected.color}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#D4D0CB] text-[12px]">
                <span className="text-[#888780]">꽃말</span>
                <span className="text-[#2C2C2A] font-medium">{selected.meaning}</span>
              </div>
              <div className="flex justify-between py-2 text-[12px]">
                <span className="text-[#888780]">재고</span>
                <span className="text-[#2C2C2A] font-medium">{selected.stock}개 남음</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Stock