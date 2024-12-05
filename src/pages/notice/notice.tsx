import { View, Navigator, RichText, ScrollView } from '@tarojs/components';
import { useEffect, useState } from 'react';
import Taro from '@tarojs/taro';
import { getNoticePage } from '@/service/notice';
import './notice.scss'; // 引入样式文件

const Notice = () => {
  const [noticeList, setNoticeList] = useState<IndexNotice>({
    list: [],
    total: 0,
  });

  const [finish, setFinish] = useState(false);

  // 分页参数，当前页和每页条数
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // 获取公告列表的函数  
  const getAllNotice = async () => {
    // 提示加载，弹出 toast
    if (!finish) {
      try {
        // 使用参数调用接口
        const res = await getNoticePage({
          page,
          limit,
        });

        // 先更新当前的 noticeList 状态
        setNoticeList(prev => {
          const newList = [...prev.list, ...res.data.list];
          const newTotal = res.data.total;

          console.log('查询条件:', page, limit);

          // 更新 finish 状态
          const isFinished = newList.length >= newTotal;
          if (isFinished) {
            setFinish(true);
          }

          //更新分页参数
          if (newList.length <= newTotal) {
            setPage(pre => pre + 1);
          }
          
          // 返回新的状态
          return {
            list: newList,
            total: newTotal,
          };
        });
          
      } catch (error) {
        console.error('获取公告列表失败：', error);
        Taro.showToast({ title: '加载失败，请重试', icon: 'none' });
      }
    } else {
      Taro.showToast({ title: '没有更多数据~', icon: 'none' });
    }
        };
          
        // 组件挂载时加载数据  
        useEffect(() => {
          getAllNotice();
        }, []);
          
        // 页面触底加载数据  
        const handleReachBottom = () => {
          console.log('触底了');
          getAllNotice();
        };
        return (
          <ScrollView scrollY
            onScrollToLower={handleReachBottom}
            style={{ height: '100vh' }} className='noticePage'
          >
            {noticeList.list.map((item) => (
              <View className='item-card' key={item.pkId}>
                <View className='time'>{item.createTime}</View>
                <View className='content-card'>
                  <View className='top'>
                    <View className='tips'>{item.title}</View>
                    <RichText className='content' nodes={item.content} />
                  </View>
                  <View className='bottom'>
                    <Navigator
                      url={`/pages/noticeDetail/noticeDetail?id=${item.pkId}`}
                      className='more'
                    >
                      查看详情 &gt;
                    </Navigator>
                  </View>
                </View>
              </View>
            ))}
            <View className='loading-text'>
              {finish ? '没有更多数据了！' : '加载中...'}
            </View>
          </ScrollView>
        );
      };

      export default Notice;
