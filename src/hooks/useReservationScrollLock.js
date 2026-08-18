import { useEffect } from 'react'

export function useReservationScrollLock(isLocked) {
  useEffect(() => {
    if (isLocked) {
      const scrollY = window.scrollY
      document.body.dataset.reservationScrollY = scrollY
      document.body.style.overflow = 'hidden'
    } else {
      const scrollY = parseInt(document.body.dataset.reservationScrollY || '0')
      document.body.style.overflow = ''
      window.scrollTo(0, scrollY)
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isLocked])
}