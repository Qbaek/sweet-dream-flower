import { useState } from 'react'
import { useScrollLock } from '../hooks/useScrollLock'

// 비디오 파일 생성.
const videos = [
  { id: 1, src: 'https://res.cloudinary.com/smn0s6kv/video/upload/q_auto,vc_auto/v1782958037/sweet_dream_flower_01_qpl2vm.mp4', thumbnail: 'https://res.cloudinary.com/smn0s6kv/video/upload/so_0/q_auto,vc_auto/v1782958037/sweet_dream_flower_01_qpl2vm.jpg', date: '2026. 06. 01', desc: '오늘의 꽃다발 🌸', flowers: '라넌큘러스, 작약, 유칼립투스' },
  { id: 2, src: 'https://res.cloudinary.com/smn0s6kv/video/upload/q_auto,vc_auto/v1782958045/sweet_dream_flower_02_i0w3dz.mp4', thumbnail: 'https://res.cloudinary.com/smn0s6kv/video/upload/so_0/q_auto,vc_auto/v1782958045/sweet_dream_flower_02_i0w3dz.jpg', date: '2026. 05. 28', desc: '라넌큘러스 특가 입고 🌼', flowers: '라넌큘러스, 안개꽃' },
  { id: 3, src: 'https://res.cloudinary.com/smn0s6kv/video/upload/q_auto,vc_auto/v1782958053/Sweet_Dream_Flower_03_ipgnhw.mp4', thumbnail: 'https://res.cloudinary.com/smn0s6kv/video/upload/so_0/q_auto,vc_auto/v1782958053/Sweet_Dream_Flower_03_ipgnhw.jpg', date: '2026. 05. 20', desc: '작약 시즌 시작 🌷', flowers: '작약, 스타티스' },
  { id: 4, src: 'https://res.cloudinary.com/smn0s6kv/video/upload/q_auto,vc_auto/v1782958060/Sweet_Dream_Flower_04_qhmvrl.mp4', thumbnail: 'https://res.cloudinary.com/smn0s6kv/video/upload/so_0/q_auto,vc_auto/v1782958060/Sweet_Dream_Flower_04_qhmvrl.jpg', date: '2026. 05. 15', desc: '어버이날 꽃다발 💐', flowers: '카네이션, 장미' },
  { id: 5, src: 'https://res.cloudinary.com/smn0s6kv/video/upload/q_auto,vc_auto/v1782958067/Sweet_Dream_Flower_05_vjyjem.mp4', thumbnail: 'https://res.cloudinary.com/smn0s6kv/video/upload/so_0/q_auto,vc_auto/v1782958067/Sweet_Dream_Flower_05_vjyjem.jpg', date: '2026. 05. 10', desc: '스위트 드림의 봄 🌿', flowers: '튤립, 유칼립투스' },
  { id: 6, src: 'https://res.cloudinary.com/smn0s6kv/video/upload/q_auto,vc_auto/v1782958075/Sweet_Dream_Flower_06_men4qv.mp4', thumbnail: 'https://res.cloudinary.com/smn0s6kv/video/upload/so_0/q_auto,vc_auto/v1782958075/Sweet_Dream_Flower_06_men4qv.jpg', date: '2026. 04. 30', desc: '오늘 입고된 튤립 🌺', flowers: '튤립, 안개꽃' },
  { id: 7, src: 'https://res.cloudinary.com/smn0s6kv/video/upload/q_auto,vc_auto/v1782958085/Sweet_Dream_Flower_07_zm1ycs.mp4', thumbnail: 'https://res.cloudinary.com/smn0s6kv/video/upload/so_0/q_auto,vc_auto/v1782958085/Sweet_Dream_Flower_07_zm1ycs.jpg', date: '2026. 04. 22', desc: '단골 손님의 특별 주문 💕', flowers: '장미, 리시안셔스' },
  { id: 9, src: 'https://res.cloudinary.com/smn0s6kv/video/upload/q_auto,vc_auto/v1782958101/Sweet_Dream_Flower_09_v6uo9a.mp4', thumbnail: 'https://res.cloudinary.com/smn0s6kv/video/upload/so_0/q_auto,vc_auto/v1782958101/Sweet_Dream_Flower_09_v6uo9a.jpg', date: '2026. 04. 08', desc: '종로 3가의 봄날 🍀', flowers: '거베라, 해바라기' },
  { id: 8, src: 'https://res.cloudinary.com/smn0s6kv/video/upload/q_auto,vc_auto/v1782958091/Sweet_Dream_Flower_08_pd6uqn.mp4', thumbnail: 'https://res.cloudinary.com/smn0s6kv/video/upload/so_0/q_auto,vc_auto/v1782958091/Sweet_Dream_Flower_08_pd6uqn.jpg', date: '2026. 04. 15', desc: '봄맞이 새 꽃 입고 🌸', flowers: '라넌큘러스, 작약' },
]

function Hero() {
  const [selected, setSelected] = useState(null)
  //
  useScrollLock(!!selected)

  return (
    <section>
      {/* Hero 다크 영역 */}
      <div className="bg-[#1C1C1A] w-full h-[320px] flex flex-col items-center justify-center">
        <h1 className="text-white text-[48px] font-light leading-[1.1] tracking-[-1px] text-center m-0">
          SWEET<br />DREAM<br />FLOWER
        </h1>
        <p className="text-white text-[16px] font-light mt-3">& Vamos</p>
      </div>

      {/* our moment 그리드 */}
      <div className="bg-[#F9F6F2] pt-3 pb-6">
        <p className="text-[11px] text-[#888780] tracking-[2px] mb-3 pl-4">our moment</p>
        <div className="grid grid-cols-3 gap-[3px]">
          {videos.map((v) => (
            <div
              key={v.id}
              className="aspect-square relative cursor-pointer overflow-hidden"
              onClick={() => setSelected(v)}
            >
              <video
                src={v.src}
                poster={v.thumbnail}
                className="w-full h-full object-cover"
                muted
                playsInline
                preload="none"
              />
              <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center">
                  <span className="text-[#2C2C2A] text-sm">▶</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 영상 모달 */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center"
          onClick={() => setSelected(null)}
        >
          <div
            className="w-[280px] bg-[#F9F6F2] rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src={selected.src}
              className="w-full h-[320px] object-cover"
              controls
              muted
              playsInline
            />
            <div className="p-4">
              <p className="text-[11px] text-[#888780] mb-1">{selected.date}</p>
              <p className="text-[13px] text-[#2C2C2A] mb-1">{selected.desc}</p>
              <p className="text-[11px] text-[#888780]">{selected.flowers}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Hero