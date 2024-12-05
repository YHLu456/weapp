import { http } from "@/utils/http"

/**
 * 用户积分信息
 * @param data
 * @returns
 */
export const userBonusInfo = (data: PageParams) => {
  return http<UserScoreReturn>({
    method: 'POST',
    url: `/user/bonus/page`,
    data,
  })
}

/**
 * 用户资源列表
 * @param data
 * @returns
 */
export const userResourceList = (data: PageParams) => {
  return http<UserResourceReturn>({
    method: 'POST',
    url: `/user/resource`,
    data,
  })
}
