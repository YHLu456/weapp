import Taro, { useLoad } from '@tarojs/taro';
import { ScrollView, View } from '@tarojs/components';
import { useEffect, useState } from 'react';
import { getIndexResourceList } from '@/service/resource';
import NoData from '@/components/noData/noData';
import ResourceItem from '@/components/resourceItem/resourceItem';
import { AtLoadMore } from 'taro-ui';
import './searchResult.scss'; // 导入样式

type IndexResourceReturnType = {
  list: IndexResourceType[]
  total: number
}

const SearchResult = () => {
  const [queryParams, setQueryParams] = useState({
    keyword: '',
    tagId: 0,
    diskType: 0,
    page: 1,
    limit: 10,
  });

  useLoad((options) => {
    for (const key in options) {
      queryParams[key] = options[key];
    }
    setQueryParams({ ...queryParams });
  });

  /**
   * 数据列表
   */
  const [dataList, setDataList] = useState<IndexResourceReturnType>(
    {
      list: [],
      total: 0,
    }
  );

  const [finish, setFinish] = useState(false);
  const [isNoData, setIsNoData] = useState(false);

  // 获取数据的函数
  const getData = async () => {
    Taro.showLoading({
      title: '加载中...',
    });

    if (finish) {
      Taro.showToast({
        title: '没有更多数据了',
        icon: 'none',
      });
      return;
    }

    try {
      const res = await getIndexResourceList(queryParams);
      if (res.data.list.length === 0) {
        setIsNoData(true);
      } else {
        setDataList(prevDataList => ({
          ...prevDataList,
          list: prevDataList.list.concat(res.data.list),
          total: res.data.total,
        }));
      }

      if (dataList.list.length < dataList.total) {
        setQueryParams(prev => ({ ...prev, page: prev.page + 1 }));
      } else {
        setFinish(true);
      }
    } catch (error) {
      console.error('获取数据失败:', error);
    } finally {
      Taro.hideLoading();
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const [isTriggered, setIsTriggered] = useState(false);

  // 下拉刷新
  const onRefresherRefresh = () => {
    setIsTriggered(true);
    setQueryParams(prev => ({ ...prev, page: 1 }));
    setDataList({
      list: [],
      total: 0
    });
    setFinish(false);
    getData();
    setTimeout(() => {
      setIsTriggered(false);
    }, 1000);
  }

  return (
    <View className='searchResult'>
      {
        isNoData ? <NoData /> : (
          <>
            <ScrollView
              className='scroll scroll-view'
              scrollY
              refresherEnabled
              onRefresherRefresh={onRefresherRefresh}
              refresherTriggered={isTriggered}
              onScrollToLower={getData}
            >
              {dataList.list.map(item => (
                <ResourceItem key={item.pkId} resource={item} />
              ))}
            </ScrollView>
            <AtLoadMore
              status={finish ? 'noMore' : 'more'}
            />
          </>
        )
      }
    </View>
  );
};

export default SearchResult;
