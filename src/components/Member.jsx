const members = [
  {
    initial: 'J',
    name: 'Ji-Eun',
    role: 'FLORIST',
    desc: '무게감 있고 책임감있는 플로리스트.\n든든하게 종로 3가를 지킵니다.',
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
    <section className="pt-8 pb-10 px-4" style={{ backgroundColor: 'var(--color-bg)' }}>
      {/* 섹션 헤더 */}
      <p className="text-[10px] tracking-[2px] mb-1" style={{ color: 'var(--color-accent)' }}>OUR TEAM JongNo 3Ga</p>
      <h2 className="text-[16px] font-normal mb-1" style={{ color: 'var(--color-primary)' }}>저희가 함께합니다</h2>
      <p className="text-[12px] leading-relaxed mb-6" style={{ color: 'var(--color-accent)' }}>
        종로 3가점을 빛내는 세 사람,<br />언제든 편하게 찾아주세요.
      </p>

      {/* 멤버 카드 */}
      <div className="flex flex-col gap-3 mb-6">
        {members.map((m) => (
          <div
            key={m.initial}
            className="flex items-center gap-4 p-4 rounded-2xl border"
            style={{
              backgroundColor: m.highlight ? 'var(--color-surface)' : 'white',
              borderColor: m.highlight ? 'var(--color-accent)' : 'var(--color-surface)',
            }}
          >
            <div
              className="w-16 h-16 rounded-full flex-shrink-0 flex items-center justify-center border"
              style={{
                backgroundColor: m.highlight ? 'white' : 'var(--color-surface)',
                borderColor: 'var(--color-surface)',
              }}
            >
              <span className="text-[20px] font-light" style={{ color: 'var(--color-primary)' }}>{m.initial}</span>
            </div>
            <div className="flex-1">
              <p className="text-[10px] tracking-[2px] mb-0.5" style={{ color: 'var(--color-accent)' }}>{m.role}</p>
              <p className={`font-medium mb-1 ${m.highlight ? 'text-[15px]' : 'text-[13px]'}`} style={{ color: 'var(--color-primary)' }}>{m.name}</p>
              <p className="text-[11px] leading-relaxed whitespace-pre-line" style={{ color: 'var(--color-accent)' }}>{m.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 마무리 문구 */}
      <div className="rounded-2xl p-4 text-center mb-6 border" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-surface)' }}>
        <p className="text-[13px] font-medium mb-1" style={{ color: 'var(--color-primary)' }}>언제든 찾아주셔도 좋습니다 🌸</p>
        <p className="text-[11px] leading-relaxed" style={{ color: 'var(--color-accent)' }}>저희 세 사람이 정성껏 맞이하겠습니다.</p>
        <p className="text-[11px]" style={{ color: 'var(--color-accent)' }}>Sweet Dream Flower · 종로 3가</p>
      </div>
    </section>
  )
}

export default Member