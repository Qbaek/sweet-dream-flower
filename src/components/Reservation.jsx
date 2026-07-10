import { useState } from 'react'
import { bouquetList } from '../data/flowerData'
import { useScrollLock } from '../hooks/useScrollLock'

function Reservation() {
  const [form, setForm] = useState({
    name: '', contact: '', pickup: '픽업', date: '', time: '', bouquet: null, request: ''
  })
  const [showBouquetModal, setShowBouquetModal] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [confirmed, setConfirmed] = useState(false)

  const handleSubmit = () => setShowAlert(true)
  const handleConfirm = () => { setShowAlert(false); setConfirmed(true) }

  useScrollLock(showBouquetModal || showAlert || confirmed)

  if (confirmed) {
    return (
      <section className="pt-8 pb-10 px-4" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="flex flex-col items-center mb-6">
          <div className="w-14 h-14 rounded-full border flex items-center justify-center mb-4" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-surface)' }}>
            <span className="text-2xl" style={{ color: 'var(--color-primary)' }}>✓</span>
          </div>
          <h2 className="text-[17px] font-medium mb-2" style={{ color: 'var(--color-primary)' }}>예약이 완료되었습니다</h2>
          <p className="text-[12px] text-center leading-relaxed" style={{ color: 'var(--color-accent)' }}>입금 확인 후 최종 확정됩니다.<br />감사합니다 🌸</p>
        </div>

        <div className="rounded-xl overflow-hidden mb-4 border" style={{ borderColor: 'var(--color-surface)' }}>
          <div className="px-4 py-2.5 text-[11px]" style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-accent)' }}>예약 번호 · #SDF-20260705-001</div>
          {[
            ['성함', form.name || '김민지'],
            ['연락처', form.contact || '010-1234-5678'],
            ['수령 방법', form.pickup],
            ['날짜·시간', `${form.date || '2026.07.05'} · ${form.time || '14:00'}`],
            ['구성', form.bouquet?.name || '라넌큘러스 부케'],
          ].map(([key, val], i, arr) => (
            <div key={key} className={`flex justify-between px-4 py-2.5 text-[12px] ${i < arr.length - 1 ? 'border-b' : ''}`} style={{ borderColor: 'var(--color-surface)' }}>
              <span style={{ color: 'var(--color-accent)' }}>{key}</span>
              <span className="font-medium" style={{ color: 'var(--color-primary)' }}>{val}</span>
            </div>
          ))}
        </div>

        <div className="rounded-xl px-4 py-3 text-[11px] leading-relaxed mb-4 border" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-surface)', color: 'var(--color-accent)' }}>
          입금 계좌: 카카오뱅크 000-0000-0000 (스위트드림)<br />
          예약금 10,000원 입금 후 확정 문자가 발송됩니다.
        </div>

        <button
          onClick={() => setConfirmed(false)}
          className="w-full py-3.5 text-[14px] font-medium rounded-lg"
          style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-bg)' }}
        >
          처음으로 돌아가기
        </button>
      </section>
    )
  }

  return (
    <section className="pt-8 pb-10 px-4" style={{ backgroundColor: 'var(--color-bg)' }}>
      <p className="text-[10px] tracking-[2px] mb-1" style={{ color: 'var(--color-accent)' }}>RESERVATION</p>
      <h2 className="text-[16px] font-normal mb-6" style={{ color: 'var(--color-primary)' }}>예약하기</h2>

      {/* 성함 */}
      <div className="mb-4">
        <p className="text-[11px] mb-1.5" style={{ color: 'var(--color-accent)' }}>성함</p>
        <input
          type="text"
          placeholder="이름을 입력해주세요"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full h-11 px-3.5 border rounded-lg text-[13px] bg-white placeholder-[#C4C0BB] outline-none"
          style={{ borderColor: 'var(--color-surface)', color: 'var(--color-primary)' }}
        />
      </div>

      {/* 연락처 */}
      <div className="mb-4">
        <p className="text-[11px] mb-1.5" style={{ color: 'var(--color-accent)' }}>연락처</p>
        <input
          type="text"
          placeholder="휴대폰 번호 또는 이메일"
          value={form.contact}
          onChange={(e) => setForm({ ...form, contact: e.target.value })}
          className="w-full h-11 px-3.5 border rounded-lg text-[13px] bg-white placeholder-[#C4C0BB] outline-none"
          style={{ borderColor: 'var(--color-surface)', color: 'var(--color-primary)' }}
        />
      </div>

      {/* 수령 방법 */}
      <div className="mb-4">
        <p className="text-[11px] mb-1.5" style={{ color: 'var(--color-accent)' }}>수령 방법</p>
        <div className="flex gap-2">
          {['픽업', '배송'].map((opt) => (
            <button
              key={opt}
              onClick={() => setForm({ ...form, pickup: opt })}
              className="flex-1 h-11 rounded-lg text-[13px] border transition-all"
              style={form.pickup === opt
                ? { backgroundColor: 'var(--color-primary)', color: 'var(--color-bg)', borderColor: 'var(--color-primary)' }
                : { backgroundColor: 'var(--color-bg)', color: 'var(--color-accent)', borderColor: 'var(--color-surface)' }
              }
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* 날짜 및 시간 */}
      <div className="mb-4">
        <p className="text-[11px] mb-1.5" style={{ color: 'var(--color-accent)' }}>받을 날짜 및 시간</p>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="날짜"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="flex-1 h-11 px-3.5 border rounded-lg text-[13px] bg-white placeholder-[#C4C0BB] outline-none"
            style={{ borderColor: 'var(--color-surface)', color: 'var(--color-primary)' }}
          />
          <input
            type="text"
            placeholder="시간"
            value={form.time}
            onChange={(e) => setForm({ ...form, time: e.target.value })}
            className="flex-1 h-11 px-3.5 border rounded-lg text-[13px] bg-white placeholder-[#C4C0BB] outline-none"
            style={{ borderColor: 'var(--color-surface)', color: 'var(--color-primary)' }}
          />
        </div>
      </div>

      {/* 원하는 구성 */}
      <div className="mb-4">
        <p className="text-[11px] mb-1.5" style={{ color: 'var(--color-accent)' }}>원하는 구성</p>
        {form.bouquet ? (
          <div className="w-full h-11 px-3.5 border rounded-lg text-[13px] bg-white flex items-center justify-between" style={{ borderColor: 'var(--color-surface)', color: 'var(--color-primary)' }}>
            <span>{form.bouquet.name} · {form.bouquet.price}</span>
            <button onClick={() => setForm({ ...form, bouquet: null })} style={{ color: 'var(--color-accent)' }} className="text-lg">✕</button>
          </div>
        ) : (
          <button
            onClick={() => setShowBouquetModal(true)}
            className="w-full h-11 border border-dashed rounded-lg text-[12px]"
            style={{ borderColor: 'var(--color-surface)', color: 'var(--color-accent)', backgroundColor: 'var(--color-surface)' }}
          >
            + 꽃다발 선택하기
          </button>
        )}
      </div>

      {/* 원하는 사항 */}
      <div className="mb-6">
        <p className="text-[11px] mb-1.5" style={{ color: 'var(--color-accent)' }}>원하는 사항</p>
        <textarea
          placeholder="색상, 분위기, 용도 등 자유롭게 적어주세요"
          value={form.request}
          onChange={(e) => setForm({ ...form, request: e.target.value })}
          className="w-full h-24 px-3.5 py-3 border rounded-lg text-[13px] bg-white placeholder-[#C4C0BB] outline-none resize-none"
          style={{ borderColor: 'var(--color-surface)', color: 'var(--color-primary)' }}
        />
      </div>

      {/* 예약 신청 버튼 */}
      <button
        onClick={handleSubmit}
        className="w-full py-3.5 text-[14px] font-medium rounded-lg"
        style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-bg)' }}
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
            className="w-full max-w-[390px] rounded-t-3xl pb-6"
            style={{ backgroundColor: 'var(--color-bg)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center px-4 py-4 border-b" style={{ borderColor: 'var(--color-surface)' }}>
              <span className="text-[14px] font-medium" style={{ color: 'var(--color-primary)' }}>꽃다발 선택</span>
              <button onClick={() => setShowBouquetModal(false)} style={{ color: 'var(--color-accent)' }} className="text-xl">✕</button>
            </div>
            <div className="overflow-y-auto max-h-[400px] grid grid-cols-2 gap-3 px-4 pt-4">
              {bouquetList.map((b) => (
                <div
                  key={b.id}
                  onClick={() => { setForm({ ...form, bouquet: b }); setShowBouquetModal(false) }}
                  className="rounded-xl overflow-hidden cursor-pointer border"
                  style={{ borderColor: form.bouquet?.id === b.id ? 'var(--color-primary)' : 'var(--color-surface)', borderWidth: form.bouquet?.id === b.id ? '1.5px' : '1px' }}
                >
                  {b.img ? (
                    <img src={b.img} alt={b.name} className="w-full h-[120px] object-cover" />
                  ) : (
                    <div className="w-full h-[120px] flex items-center justify-center" style={{ backgroundColor: 'var(--color-surface)' }}>
                      <span className="text-[12px]" style={{ color: 'var(--color-accent)' }}>선택 안함</span>
                    </div>
                  )}
                  <div className="p-2" style={{ backgroundColor: 'var(--color-bg)' }}>
                    <p className="text-[11px] font-medium" style={{ color: 'var(--color-primary)' }}>{b.name}</p>
                    {b.price && <p className="text-[11px]" style={{ color: 'var(--color-accent)' }}>{b.price}</p>}
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
          <div className="w-[260px] rounded-2xl overflow-hidden border" style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-surface)' }}>
            <div className="px-4 pt-5 pb-4 text-center">
              <p className="text-[14px] font-medium mb-2" style={{ color: 'var(--color-primary)' }}>선입금 안내</p>
              <p className="text-[12px] leading-relaxed" style={{ color: 'var(--color-accent)' }}>노쇼 방지를 위해<br />예약금 10,000원이 필요합니다.<br />입금 확인 후 예약이 확정됩니다.</p>
            </div>
            <div className="flex border-t" style={{ borderColor: 'var(--color-surface)' }}>
              <button onClick={() => setShowAlert(false)} className="flex-1 py-3 text-[13px] border-r" style={{ color: 'var(--color-accent)', borderColor: 'var(--color-surface)' }}>취소</button>
              <button onClick={handleConfirm} className="flex-1 py-3 text-[13px] font-medium" style={{ color: 'var(--color-primary)' }}>확인</button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Reservation