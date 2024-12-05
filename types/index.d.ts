type PageParams = {
  page?: number
  limit?: number
  resType?: number
  type?: number
  tagId?: number
  keyword?: string
  diskType?: number
 }
 // Required含义是将PageParams的所有属性变为必选
 type PageParamsType = Required<PageParams> & { type: number }
 type IndexResourceType = {
  author: string
  authorAvatar: string
  collectNum: number
  createTime: string
  diskType: string
  downloadNum: number
  isTop: number
  likeNum: number
  pkId: number
  price: number
  resType: string[]
  tags: string[]
  title: string
  detail: string
  isDownload?: boolean
  downloadUrl?: string
  isLike?: boolean
  isCollect?: boolean
  isExchange?: boolean
 }
 type IndexResource = {
  list: IndexResourceType[]
  total: number
 }
 type IndexNotice = {
  list: NoticeItem[]
  total: number
 }
 type SwiperItem = {
   pkId: number
   title: string
 cover: string
 content: string
 adminId: number
 isTop: number
 createTime: string
}
type NoticeItem = {
 pkId: number
 title: string
 content: string
 adminId: number
 isTop: number
 createTime: string
 adminName?: string
}
