import "taro-ui/dist/style/components/button.scss" // 按需引入
import { View, ScrollView } from '@tarojs/components'
import { useEffect, useState } from 'react'
import { userResourceList } from "@/service/user"
import ResourceItem from "@/components/resourceItem/resourceItem"
import NoData from "@/components/noData/noData"
import Taro, { useLoad } from '@tarojs/taro'
import './myResource.scss'

const MyResource = () => {

  const [pageParams, setPageParams] = useState({
    page: 1,
    limit: 6,
    type: 0,
  })

  const [resourceData, setResourceData] = useState<{
    list: IndexResourceType[],
    total: number
  }>({
    list: [],
    total: 0,
  })

  const [finish, setFinish] = useState(false)
  const [isNoData, setIsNoData] = useState(false)

  const [loading, setLoading] = useState(false) // 加载状态

  let type

  // useLoad中的options类型
  useLoad((options) => {
    type = +options.type
  })

  useEffect(() => {
    getResourceInfoList()
  }, [])

  const getResourceInfoList = async () => {
    setLoading(true) // 设置为加载中
    Taro.showLoading({ title: '加载中...' })
    try {
      const query = { ...pageParams, type }
      const res = await userResourceList(query)
      if (res.code === 0) {
        setResourceData((prev) => {
          const updatedList = [...prev.list, ...res.data.list]
          const updatedTotal = res.data.total
          setIsNoData(updatedTotal === 0)
          if (updatedList.length >= updatedTotal) {
            setFinish(true) // 数据加载完毕
          }
          return {
            list: updatedList,
            total: updatedTotal,
          }
        })

        // 请求结束后更新 pageParams，这样就避免了在请求时进行更新 page，避免再次请求
        setPageParams((prev) => ({ ...prev, page: prev.page + 1 }))
      }
    } catch (error) {
      console.error(error)
    } finally {
      Taro.hideLoading()
      setLoading(false) // 请求完成，恢复为未加载状态
    }
  }

  return (
    <ScrollView scrollY
      scrollWithAnimation
      onScrollToLower={getResourceInfoList}
      className='item'
    >
      {!isNoData ? (
        <View className='info'>
          {resourceData.list.map((item) => (
            <ResourceItem key={item.pkId} resource={item} />
          ))}
          <View className='loading-text'>
            {finish ? '没有更多数据~' : '正在加载...'}
          </View>
        </View>
      ) : (
        <View className='no-data'>
          <NoData />
        </View>
      )}
    </ScrollView>
  )
}

export default MyResource
