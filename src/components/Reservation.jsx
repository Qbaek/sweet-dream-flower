import { useState } from 'react'
import { bouquetList } from '../data/flowerData'
const bouquets = [
  { id: 1, name: '봄 웨딩 부케', price: '80,000원' },
  { id: 2, name: '미니 꽃다발', price: '35,000원' },
  { id: 3, name: '라넌큘러스 부케', price: '55,000원' },
  { id: 4, name: '작약 꽃다발', price: '65,000원' },
  { id: 5, name: '장미 부케', price: '70,000원' },
  { id: 6, name: '심플 부케', price: '45,000원' },
]

function Reservation() {
  const [form, setForm] = useState({
    name: '', contact: '', pickup: '픽업', date: '', time: '', bouquet: null, request: ''
  })
  const [showBouquetModal, setShowBouquetModal] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [confirmed, setConfirmed] = useState(false)

  const handleSubmit = () => setShowAlert(true)
  const handleConfirm = () => { setShowAlert(false); setConfirmed(true) }

  if (confirmed) {
    return (
      <section className="bg-[#F9F6F2] pt-8 pb-10 px-4">
        <div className="flex flex-col items-center mb-6">
          <div className="w-14 h-14 rounded-full bg-[#F1EFE8] border border-[#D4D0CB] flex items-center justify-center mb-4">
            <span className="text-[#2C2C2A] text-2xl">✓</span>
          </div>
          <h2 className="text-[17px] font-medium text-[#2C2C2A] mb-2">예약이 완료되었습니다</h2>
          <p className="text-[12px] text-[#888780] text-center leading-relaxed">입금 확인 후 최종 확정됩니다.<br />감사합니다 🌸</p>
        </div>

        <div className="border border-[#D4D0CB] rounded-xl overflow-hidden mb-4">
          <div className="bg-[#F1EFE8] px-4 py-2.5 text-[11px] text-[#888780]">예약 번호 · #SDF-20260705-001</div>
          {[
            ['성함', form.name || '김민지'],
            ['연락처', form.contact || '010-1234-5678'],
            ['수령 방법', form.pickup],
            ['날짜·시간', `${form.date || '2026.07.05'} · ${form.time || '14:00'}`],
            ['구성', form.bouquet?.name || '라넌큘러스 부케'],
          ].map(([key, val], i, arr) => (
            <div key={key} className={`flex justify-between px-4 py-2.5 text-[12px] ${i < arr.length - 1 ? 'border-b border-[#D4D0CB]' : ''}`}>
              <span className="text-[#888780]">{key}</span>
              <span className="text-[#2C2C2A] font-medium">{val}</span>
            </div>
          ))}
        </div>

        <div className="bg-[#F1EFE8] border border-[#D4D0CB] rounded-xl px-4 py-3 text-[11px] text-[#888780] leading-relaxed mb-4">
          입금 계좌: 카카오뱅크 000-0000-0000 (스위트드림)<br />
          예약금 10,000원 입금 후 확정 문자가 발송됩니다.
        </div>

        <button
          onClick={() => setConfirmed(false)}
          className="w-full py-3.5 bg-[#2C2C2A] text-[#F9F6F2] text-[14px] font-medium rounded-lg"
        >
          처음으로 돌아가기
        </button>
      </section>
    )
  }

  return (
    <section className="bg-[#F9F6F2] pt-8 pb-10 px-4">
      <p className="text-[10px] text-[#888780] tracking-[2px] mb-1">RESERVATION</p>
      <h2 className="text-[16px] font-normal text-[#2C2C2A] mb-6">예약하기</h2>

      {/* 성함 */}
      <div className="mb-4">
        <p className="text-[11px] text-[#888780] mb-1.5">성함</p>
        <input
          type="text"
          placeholder="이름을 입력해주세요"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full h-11 px-3.5 border border-[#D4D0CB] rounded-lg text-[13px] text-[#2C2C2A] bg-white placeholder-[#C4C0BB] outline-none"
        />
      </div>

      {/* 연락처 */}
      <div className="mb-4">
        <p className="text-[11px] text-[#888780] mb-1.5">연락처</p>
        <input
          type="text"
          placeholder="휴대폰 번호 또는 이메일"
          value={form.contact}
          onChange={(e) => setForm({ ...form, contact: e.target.value })}
          className="w-full h-11 px-3.5 border border-[#D4D0CB] rounded-lg text-[13px] text-[#2C2C2A] bg-white placeholder-[#C4C0BB] outline-none"
        />
      </div>

      {/* 수령 방법 */}
      <div className="mb-4">
        <p className="text-[11px] text-[#888780] mb-1.5">수령 방법</p>
        <div className="flex gap-2">
          {['픽업', '배송'].map((opt) => (
            <button
              key={opt}
              onClick={() => setForm({ ...form, pickup: opt })}
              className={`flex-1 h-11 rounded-lg text-[13px] border transition-all ${
                form.pickup === opt
                  ? 'bg-[#2C2C2A] text-[#F9F6F2] border-[#2C2C2A]'
                  : 'bg-[#F9F6F2] text-[#888780] border-[#D4D0CB]'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* 날짜 및 시간 */}
      <div className="mb-4">
        <p className="text-[11px] text-[#888780] mb-1.5">받을 날짜 및 시간</p>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="날짜"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="flex-1 h-11 px-3.5 border border-[#D4D0CB] rounded-lg text-[13px] text-[#2C2C2A] bg-white placeholder-[#C4C0BB] outline-none"
          />
          <input
            type="text"
            placeholder="시간"
            value={form.time}
            onChange={(e) => setForm({ ...form, time: e.target.value })}
            className="flex-1 h-11 px-3.5 border border-[#D4D0CB] rounded-lg text-[13px] text-[#2C2C2A] bg-white placeholder-[#C4C0BB] outline-none"
          />
        </div>
      </div>

      {/* 원하는 구성 */}
      <div className="mb-4">
        <p className="text-[11px] text-[#888780] mb-1.5">원하는 구성</p>
        {form.bouquet ? (
          <div className="w-full h-11 px-3.5 border border-[#D4D0CB] rounded-lg text-[13px] text-[#2C2C2A] bg-white flex items-center justify-between">
            <span>{form.bouquet.name} · {form.bouquet.price}</span>
            <button onClick={() => setForm({ ...form, bouquet: null })} className="text-[#888780] text-lg">✕</button>
          </div>
        ) : (
          <button
            onClick={() => setShowBouquetModal(true)}
            className="w-full h-11 border border-dashed border-[#D4D0CB] rounded-lg text-[12px] text-[#888780] bg-[#F1EFE8]"
          >
            + 꽃다발 선택하기
          </button>
        )}
      </div>

      {/* 원하는 사항 */}
      <div className="mb-6">
        <p className="text-[11px] text-[#888780] mb-1.5">원하는 사항</p>
        <textarea
          placeholder="색상, 분위기, 용도 등 자유롭게 적어주세요"
          value={form.request}
          onChange={(e) => setForm({ ...form, request: e.target.value })}
          className="w-full h-24 px-3.5 py-3 border border-[#D4D0CB] rounded-lg text-[13px] text-[#2C2C2A] bg-white placeholder-[#C4C0BB] outline-none resize-none"
        />
      </div>

      {/* 예약 신청 버튼 */}
      <button
        onClick={handleSubmit}
        className="w-full py-3.5 bg-[#2C2C2A] text-[#F9F6F2] text-[14px] font-medium rounded-lg"
      >
        예약 신청하기
      </button>

      {/* 꽃다발 선택 모달 */}
      {showBouquetModal && (
        <div
          className="fixed inset-0 bg-black/45 z-50 flex items-end justify-center"
          onClick={() => setShowBouquetModal(false)}
        >
          <div
            className="w-full max-w-[390px] bg-[#F9F6F2] rounded-t-3xl pb-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center px-4 py-4 border-b border-[#D4D0CB]">
              <span className="text-[14px] font-medium text-[#2C2C2A]">꽃다발 선택</span>
              <button onClick={() => setShowBouquetModal(false)} className="text-[#888780] text-xl">✕</button>
            </div>

            <div className="overflow-y-auto max-h-[400px] grid grid-cols-2 gap-3 px-4 pt-4">
  {bouquetList.map((b) => (
    <div
      key={b.id}
      onClick={() => { setForm({ ...form, bouquet: b }); setShowBouquetModal(false) }}
      className={`border rounded-xl overflow-hidden cursor-pointer ${form.bouquet?.id === b.id ? 'border-[#2C2C2A] border-[1.5px]' : 'border-[#D4D0CB]'}`}
    >
      {b.img ? (
        <img src={b.img} alt={b.name} className="w-full h-[120px] object-cover" />
      ) : (
        <div className="w-full h-[120px] bg-[#F1EFE8] flex items-center justify-center">
          <span className="text-[#888780] text-[12px]">선택 안함</span>
        </div>
      )}
      <div className="p-2">
        <p className="text-[11px] font-medium text-[#2C2C2A]">{b.name}</p>
        {b.price && <p className="text-[11px] text-[#888780]">{b.price}</p>}
      </div>
    </div>
  ))}
</div>
          </div>
        </div>
      )}

      {/* 선입금 안내 alert */}
      {showAlert && (
        <div className="fixed inset-0 bg-black/45 z-50 flex items-center justify-center">
          <div className="w-[260px] bg-[#F9F6F2] rounded-2xl overflow-hidden border border-[#D4D0CB]">
            <div className="px-4 pt-5 pb-4 text-center">
              <p className="text-[14px] font-medium text-[#2C2C2A] mb-2">선입금 안내</p>
              <p className="text-[12px] text-[#888780] leading-relaxed">노쇼 방지를 위해<br />예약금 10,000원이 필요합니다.<br />입금 확인 후 예약이 확정됩니다.</p>
            </div>
            <div className="flex border-t border-[#D4D0CB]">
              <button onClick={() => setShowAlert(false)} className="flex-1 py-3 text-[13px] text-[#888780] border-r border-[#D4D0CB]">취소</button>
              <button onClick={handleConfirm} className="flex-1 py-3 text-[13px] font-medium text-[#2C2C2A]">확인</button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Reservation