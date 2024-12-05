/* eslint-disable react/display-name */
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { View, ScrollView } from '@tarojs/components'
import { getCategoryList } from '@/service/contribute'
import ResourceItem from '@/components/resourceItem/resourceItem'
import { getIndexResourceList } from '@/service/resource'
import Taro from '@tarojs/taro'
import './resourceList.scss' // 引入样式文件

interface ResourceListProps {
  // 组件的 props
}

export interface ResourceListRef {
  resetData: () => void
  getIndexResourceListData: () => void
}


const ResourceList = forwardRef<ResourceListRef, ResourceListProps>((_props, ref) => {

  // 外部参数
  const [pageParams, setPageParams] = useState({
    resType: 0,
    page: 1,
    limit: 10,
  })

  const [selectList, setSelectList] = useState<CategoryType[]>([])


  // 获取分类列表数据
  const getIndexCategoryListData = async () => {
    const res = await getCategoryList()
    if (res.code === 0) {
      // 筛选出type为1且最多取前8个
      const filteredList = res.data.filter(item => item.type === 1).slice(0, 8)
      // 头部增加一条 默认推荐的选项
      setSelectList([{ title: '推荐', pkId: 0, type: 0 }, ...filteredList])
    }
  }

  // 组件挂载时获取数据
  useEffect(() => {
    getIndexCategoryListData();
  }, []);


  // 选择变化
  const handleSelectChange = (pkId: number) => {
    resetData()
    setPageParams(prevParams => {
      const newParams = { ...prevParams, resType: pkId, page: 1 };
      getIndexResourceListData(newParams); // 使用新的参数直接调用 API
      return newParams;
    });
  }


  // 获取资源列表
  const [resourceList, setResourceList] = useState<IndexResource>({
    list: [],
    total: 0,
  })

  // 状态标记
  const finish = useRef(false)

  const getIndexResourceListData = async (params?: {
    resType: number
    page: number
    limit: number
  }) => {
    if (finish.current) {
      Taro.showToast({ icon: 'none', title: '没有更多数据~' })
      return
    }

    const res = await getIndexResourceList(params || pageParams)
    setResourceList(prev => ({
      total: res.data.total,
      list: [...prev.list, ...res.data.list],
    }))

    if (resourceList.list.length >= res.data.total) {
      finish.current = true
    }
    setPageParams(prev => ({ ...prev, page: prev.page + 1 }))
  }

  const resetData = () => {
    setPageParams({
      resType: 0,
      page: 1,
      limit: 10,
    })
    setResourceList({
      list: [],
      total: 0,
    })
    finish.current = false
  }

  useEffect(() => {
    getIndexResourceListData();
  }, [])




  // 展示方法给外部
  useImperativeHandle(ref, () => ({
    resetData,
    getIndexResourceListData,
  }))



  return (
    <View className='resourceList'>
      <ScrollView scrollX className='scroll-view' scrollWithAnimation>
        {selectList.map(item => (
          <View
            key={item.pkId}
            className={`scroll-view-item  ${pageParams.resType === item.pkId ? 'active' : ''}`}
            onClick={() => handleSelectChange(item.pkId)}
          >
            {item.title}
          </View>
        ))}
      </ScrollView>
      {/* 数据展示 */}
      {resourceList.list.map((item, index) => (
        <ResourceItem key={index} resource={item} />
      ))}
      <View className='loading-text'>{finish.current ? '没有更多数据~' : '正在加载...'}</View>
    </View>
  )
})

export default ResourceList;
