type LoginResult = {
  pkId: number
  phone: string
  accessToken: string
}
type UserInfo = {
  avatar: string
  birthday: string
  bonus: number
  gender: number
  nickname: string
  pkId: number
  phone: string
  isDailyCheck: boolean
  wxOpenId?: string
}
type UpdateUserInfo = {
  pkId: number
  nickname: string
  avatar: string
  gender: number
  birthday: string
}

type UserScoreDetail = {
  pkId: number
  content: string
  bonus: number
  createTime: string
}

type UserResourceDetail = {
  pkId: number
  createTime: string
  title: string
  price: number
  authorAvatar: string
  author: string
  isTop: number
  detail: string
  downloadNum: number
  likeNum: number
  collectNum: number
}

type UserScoreReturn = {
  list: UserScoreDetail[]
  total: number
}

type UserResourceReturn = {
  list: UserResourceDetail[]
  total: number
}
