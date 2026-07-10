import { useEffect } from 'react'

// 예약완료 및 모달창의 스크롤을 방지하기 위한 공통함수
export function useScrollLock(isLocked) {
  useEffect(() => {
    if (isLocked) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isLocked])
}