export type Flower = {
  id: number // Supabase 행 번호
  tab: string // 메인꽃 필러꽃 등 꽃탭 이름
  name: string
  img: string
  color: string
  meaning: string
  stock: number // 0일 때 품절로 뜨도록 함
}

export type StockByTab = Record<string, Flower[]>