type Tag = {
  pkId: number
  title: string
  isHot: number
  inverted?: boolean
 }
 type ContributeForm = {
  title: string
  diskType: number | null
  resType: number[]
  tags: number[]
  downloadUrl: string
  detail: string
  price: number
  isTop: number
 }
 type CategoryType = {
  pkId: number
  title: string
  type?: number
  description?: string
  inverted?: boolean
 }
