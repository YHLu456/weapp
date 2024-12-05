import { http } from '@/utils/http';

// 发送短信验证码
// @param phone 手机号
// @returns


export const sendCode = (phone: string)=>{
return http<null>({
method:'POST',
url:'/common/sendSms?phone='+ phone,
});
};

/**
 * 手机号登录
 * @param phone 手机号
 * @param code 验证码
 * @returns
 */

export const phoneLogin = (phone: string, code: string) => {
  return http<LoginResult>({
    method: 'POST',
    url: `/auth/login?phone=${phone}&code=${code}`,
  });
};

/**
 * 微信登录
 * @param code 微信登录code
 * @param encryptedData 加密数据
 * @param iv  加密算法的初始向量
 * @returns
 */
export const myWxLogin = (code: string, encryptedData: string, iv: string) => {
  return http<LoginResult>({
    method: 'POST',
    url: '/auth/weChatLogin',
    data: {
      code,
      encryptedData,
      iv,
    },
  });
};

/**
 * 退出登录
 * @returns
 */

export const logout = () => {
  return http<null>({
    method: 'POST',
    url: '/auth/logout',
  });
};

/**
 *
 * @returns 获取用户信息
 */
export const getUserInfo = () => {
  return http<UserInfo>({
    method: 'GET',
    url: '/user/info',
  });
};

/**
 * 更新用户信息
 * @param data
 * @returns
 */
export const updateUserInfo = (data: Partial<UserInfo>) => {
  return http({
    method: 'POST',
    url: '/user/update',
    data,
  })
}

/**
 * 用户每日签到
 * @returns
 */
export const userDailyCheck = () => {
  return http({
    method: 'POST',
    url: `/user/dailyCheck`,
  })
}

/**
 * 用户资源列表
 * @param data
 * @returns
 */
export const userResourceList = (data: { page: number; limit: number; type: number }) => {
  return http<{
    list: IndexResourceType[]
    total: number
  }>({
    method: 'POST',
    url: '/user/resource',
    data,
  })
}

/**
 * 更换用户手机
 * @param phone  手机号
 * @param code   验证码
 * @returns
 */
export const updateUserPhone = (phone: string, code: string) => {
  return http({
    method: 'POST',
    url: `/auth/bindPhone?phone=${phone}&code=${code}`,
  })
}

