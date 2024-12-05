import { http } from '@/utils/http';  

/**  
 * 获取资源标签列表  
 * @returns  
 */  
export const getTagsList = () => {  
  return http<Tag[]>({  
    method: 'GET',  
    url: '/tag/list',  
  });  
};  

/**  
 * 获取资源分类  
 * @returns  
 */  
export const getCategoryList = () => {  
  return http<CategoryType[]>({  
    method: 'GET',  
    url: '/category/list',  
  });  
};  

/**  
 * 投稿  
 * @param data 投稿表单数据  
 * @returns  
 */  
export const contributeResource = (data: ContributeForm) => {  
  return http<null>({  
    method: 'POST',  
    url: '/resource/publish',  
    data,  
  });  
};