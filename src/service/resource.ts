import { http } from '@/utils/http'

export type IndexResourceReturnType = {
  list: IndexResourceType[]
  total: number
}

/**
 * 获取首页资源列表
 * @param data 请求参数
 * @returns
 */
export const getIndexResourceList = (data: PageParams) =>
  {return http<IndexResourceReturnType>({
    method: 'POST',
    url: '/resource/page',
    data,
  })
}
/**
 * 获取资源详情
 * @param id
 * @returns
 */
export const getResourceById = (id) => {
  return http<IndexResourceType>({
      method: 'GET',
      url: '/resource/detail/' + id,
  })
}

/**
* 用户交换资源
* @param id
* @returns
*/
export const userExchangeResource = (id: number) => {
  return http({
      method: 'POST',
      url: '/user/resource/exchange?resourceId=' + id,
  })
}

/**
* 用户点赞资源
* @param id
* @returns
*/
export const userLikeResource = (id: number) => {
  return http({
      method: 'POST',
      url: '/user/resource/like?resourceId=' + id,
  })
}

/**
* 用户收藏资源
* @param id
* @returns
*/
export const userCollectResource = (id: number) => {
  return http({
      method: 'POST',
      url: '/user/resource/collect?resourceId=' + id,
  })
}
