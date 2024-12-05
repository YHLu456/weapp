import { useEffect, useState } from 'react'  
import { View, Text } from '@tarojs/components'  
import { useLoad } from '@tarojs/taro'  
import { getNoticeById } from '@/service/notice'  
import './noticeDetail.scss'  

export default function NoticeDetail() {
  const [notice, setNotice] = useState<NoticeItem>({
    pkId: 0,
    title: '',
    content: '',
    adminId: 0,
    isTop: 0,
    createTime: '',
    adminName: '',
  })

  let id = 0

  useLoad(options => {
    id = +options.id
  })

  // 请求获取公告详情数据的函数  
  const getNoticeInfo = async () => {
    const res = await getNoticeById(id)
    if (res.code == 0) {
      setNotice(res.data)
    }
  }

  useEffect(() => {
    getNoticeInfo()
  }, [])

  return (
    <View className='noticeLayout' style={{ display: notice ? 'block' : 'none' }}>
      <View className='title'>
        <View className='tag'>
          {notice.isTop === 1 && <Text className='isTop'>置顶</Text>}
        </View>
        <Text className='font'>{notice.title}</Text>
      </View>
      <View className='info'>
        <Text className='item'>{notice.adminName}</Text>
        <Text className='item'>{notice.createTime}</Text>
      </View>
      <View className='content'>
        {/* 使用 Taro 的 dangerouslySetInnerHTML 来渲染富文本 */}
        <View dangerouslySetInnerHTML={{ __html: notice.content }} />
      </View>
    </View>
  )
}