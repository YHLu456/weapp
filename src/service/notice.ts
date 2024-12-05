import { http } from '@/utils/http';

/**
 * 获取首页面轮播图
 * @returns
 */

export const getNoticeSwiper = () => {
  return http<SwiperItem[]>({
    method: 'GET',
    url: '/notice/swiper'
  });
};

/**
 *获取首页公告
 * @returns
 */

export const getIndexNotice = () => {
  return http<SwiperItem[]>({
    method: 'GET',
    url: '/notice/index',
  });
};

/**
*消息列表分页
*@param data 分页参数
*@returns
*/
export const getNoticePage = (data: PageParams) => {
  return http<IndexNotice>({
    method: 'POST',
    url: '/notice/page',
    data,
  });
};

/**
 * 根据id获取公告详情
 * @param id 公告id
 * @returns
 */

export const getNoticeById = (id: number) => {
  return http<NoticeItem>({
    method: 'GET',
    url: '/notice/detail/' + id,
  });
};