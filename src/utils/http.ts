import Taro from '@tarojs/taro'

const baseURL = process.env.TARO_APP_API_BASE_URL

type Data<T> = {
  code: number
  msg: string
  data: T
}

export const http = <T>(options: {
  url: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  data?: any
  header?: any
}) => {
  // 1. 返回 Promise 对象
  return new Promise<Data<T>>((resolve, reject) => {
    Taro.request({
      ...options,
      // 响应成功
      success(res) {
        // 状态码 2xx，参考 axios 的设计
        if (res.statusCode >= 200 && res.statusCode < 300) {
          if (res.data.code === 401) {
            Taro.showToast({
              icon: 'error',
              title: res.data.msg || '请求错误',
            })
            Taro.navigateTo({ url: '/pages/login/login' })
            reject(res)
          } else if (res.data.code === 0) {
            // 提取核心数据 res.data
            resolve(res.data as Data<T>)
          } else {
            // 根据后端错误信息轻提示
            Taro.showToast({
              icon: 'error',
              title: res.data.msg || '请求错误',
            })
          }
        }
        else {
          // 其他错误 -> 根据后端错误信息轻提示
          Taro.showToast({
            icon: 'none',
            title: res.data.msg || '请求错误',
          })
          reject(res)
        }
      },
      // 响应失败
      fail(err) {
        Taro.showToast({
          icon: 'none',
          title: '网络错误，换个网络试试',
        })
        reject(err)
      },
    })
  })
}

const httpInterceptor = function (chain) {
  const requestParams = chain.requestParams
  const { url } = requestParams

  if (!url.startsWith('http')) {
    requestParams.url = baseURL + url
  }

  requestParams.header = {
    ...requestParams.header,
  }

  const token = Taro.getStorageSync('token') || 'no-token'
  if (token) {
    requestParams.header.Authorization = token
  }
  return chain.proceed(requestParams).then(res => {
    console.log(`http <-- ${url} result:`, res)
    return res
  })
}

// 拦截 request 请求
Taro.addInterceptor(httpInterceptor)
