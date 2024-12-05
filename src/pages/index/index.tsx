import { ScrollView, View } from '@tarojs/components'
import { useEffect, useRef, useState } from 'react'
import { getIndexNotice, getNoticeSwiper } from '@/service/notice'
import Navbar from './components/CustomNavbar'
import './index.scss'
import Notice from './components/Notice'
import Swiper from './components/Swiper'
import Panel from './components/Panel'
import ResourceList, { ResourceListRef } from './components/ResourceList';



export default function Index() {
  const [noticeList, setNoticeList] = useState<SwiperItem[]>([])
  const [swiper, setSwiper] = useState<SwiperItem[]>([])

  const getIndexNoticeFunction = async () => {
    const res = await getIndexNotice()
    if (res.code === 0) {
      setNoticeList(res.data)
    }
  }

  const getSwiperFunction = async () => {
    const res = await getNoticeSwiper()
    if (res.code === 0) {
      setSwiper(res.data)
    }
  }

  useEffect(() => {
    getIndexNoticeFunction()
    getSwiperFunction()
  }, [])

  const resourceListRef = useRef<ResourceListRef | null>(null); // 指定 ref 类型

  const [isTriggered, setIsTriggered] = useState(false);

  const onRefresherRefresh = async () => {
    setIsTriggered(true);
    if (resourceListRef.current) {
      resourceListRef.current.resetData(); // 调用 resetData 方法
    }

    await Promise.all([getSwiperFunction(), getIndexNoticeFunction()]);

    if (resourceListRef.current) {
      resourceListRef.current.getIndexResourceListData(); // 调用获取数据的方法
    }
    setIsTriggered(false);
  };

  const onScrollToLower = () => {
    if (resourceListRef.current) {
      resourceListRef.current.getIndexResourceListData();
    }
  };

  return (
    <View className='index'>
      <Navbar />
      <ScrollView
        enableBackToTop
        refresherEnabled
        refresherTriggered={isTriggered}
        onRefresherRefresh={onRefresherRefresh}
        onScrollToLower={onScrollToLower}
        className='scrollView'
        scrollY
      >
        <Notice noticeList={noticeList} />
        <Swiper swiperList={swiper} />
        <Panel />
        <ResourceList ref={resourceListRef} />
      </ScrollView>
    </View>
  )
}
