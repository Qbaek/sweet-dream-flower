const members = [
  {
    initial: 'J',
    name: 'Ji-Eun',
    role: 'FLORIST',
    desc: '무게감 있고 책임감있는 플로리스트.\n든든하게 이 지점을 지킵니다.',
    highlight: false,
  },
  {
    initial: 'E',
    name: 'Neuk-Dae',
    role: 'FLORIST',
    desc: '섬세하고 다정한 손길로\n꽃다발에 마음을 담습니다.',
    highlight: false,
  },
  {
    initial: 'H',
    name: 'Seong-Uk',
    role: 'OWNER',
    desc: '어리지만 예리한 감각의 소유자.\n꽃을 고르는 눈이 남다릅니다.',
    highlight: true,
  },
]

function Member() {
  return (
    <section className="bg-[#F9F6F2] pt-8 pb-10 px-4">
      {/* 섹션 헤더 */}
      <p className="text-[10px] text-[#888780] tracking-[2px] mb-1">OUR TEAM</p>
      <h2 className="text-[16px] font-normal text-[#2C2C2A] mb-1">저희가 함께합니다</h2>
      <p className="text-[12px] text-[#888780] leading-relaxed mb-6">
        종로 3가점을 빛내는 세 사람,<br />언제든 편하게 찾아주세요.
      </p>

      {/* 멤버 카드 */}
      <div className="flex flex-col gap-3 mb-6">
        {members.map((m) => (
          <div
            key={m.initial}
            className={`flex items-center gap-4 p-4 rounded-2xl border ${
              m.highlight
                ? 'bg-[#F1EFE8] border-[#C4C0BB]'
                : 'bg-white border-[#D4D0CB]'
            }`}
          >
            <div className={`w-16 h-16 rounded-full flex-shrink-0 flex items-center justify-center border ${
              m.highlight ? 'bg-white border-[#D4D0CB]' : 'bg-[#F1EFE8] border-[#D4D0CB]'
            }`}>
              <span className="text-[20px] font-light text-[#2C2C2A]">{m.initial}</span>
            </div>
            <div className="flex-1">
              <p className={`text-[10px] text-[#888780] tracking-[2px] mb-0.5`}>{m.role}</p>
              <p className={`font-medium text-[#2C2C2A] mb-1 ${m.highlight ? 'text-[15px]' : 'text-[13px]'}`}>{m.name}</p>
              <p className="text-[11px] text-[#888780] leading-relaxed whitespace-pre-line">{m.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 마무리 문구 */}
      <div className="bg-[#F1EFE8] border border-[#D4D0CB] rounded-2xl p-4 text-center mb-6">
        <p className="text-[13px] font-medium text-[#2C2C2A] mb-1">언제든 찾아주셔도 좋습니다 🌸</p>
        <p className="text-[11px] text-[#888780] leading-relaxed">저희 세 사람이 정성껏 맞이하겠습니다.</p>
        <p className="text-[11px] text-[#888780]">Sweet Dream Flower · 종로 3가</p>
      </div>
    </section>
  )
}

export default Member