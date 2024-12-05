import { View } from '@tarojs/components';
import { useEffect, useState } from 'react';
import { AtIcon, AtSearchBar } from 'taro-ui';
import { getTagsList } from '@/service/contribute';
import Taro from '@tarojs/taro';
import './search.scss';

export default function Search() {
  // 添加历史记录
  const addHistory = (value: string) => {
    setHistorySearch([...new Set([...historySearch, value])].slice(0, 10));
    Taro.setStorageSync('historySearch', historySearch);
    console.log(queryParams, 'queryParams');
    // 跳转到搜索结果页面
    Taro.navigateTo({
      url: `/pages/searchResult/searchResult?keyword=${queryParams.keyword}&tagId=${queryParams.tagId}`,
    });
    handleClear();
  };

  // 定义状态
  const [queryParams, setQueryParams] = useState({
    keyword: '',
    tagId: 0,
  });

  // 清除搜索内容
  const handleClear = () => {
    console.log('Clearing...');
    setQueryParams({
      keyword: '',
      tagId: 0,
    });
  };

  // 搜索按钮事件
  const handleConfirm = () => {
    if (queryParams.keyword) {
      addHistory(queryParams.keyword);
    }
  };

  // 标签列表
  const [tagList, setTagList] = useState<Tag[]>([]);

  // 获取标签列表 只获取热门的标签
  const getTagListFun = async () => {
    const res = await getTagsList();
    const arr = res.data.filter((item) => {
      return item.isHot === 1;
    });
    setTagList(arr);
  };

  useEffect(() => {
    getTagListFun();
  }, []);

  // 点击标签
  const clickTag = (item: Tag) => {
    console.log(item, 'item点击标签');
    setQueryParams(prev => ({
      ...prev,
      keyword: item.title,
      tagId: item.pkId,
    }));
  };

  // 历史记录
  const [historySearch, setHistorySearch] = useState<string[]>(Taro.getStorageSync('historySearch') || ['aaa', 'bbb']);


  // 点击清空历史记录
  const removeHistory = () => {
    Taro.showModal({
      title: '是否清空历史记录？',
      success: (res) => {
        if (res.confirm) {
          Taro.removeStorageSync('historySearch');
          setHistorySearch([]);
        }
      },
    });
  };

  // 点击历史记录
  const clickHistoryTab = (tab: string) => {
    console.log(tab, 'tab');
    setQueryParams({
      ...queryParams,
      keyword: tab
    });
    console.log(queryParams, 'queryParams');
  };

  useEffect(() => {
    console.log(queryParams, 'queryParams');
    if (queryParams.keyword) {
      addHistory(queryParams.keyword);
    }
  }, [queryParams]);

  const [searchValue, setSearchValue] = useState<string>('');
  const handleChange = (value: string) => {
    console.log(value, 'value');
    setSearchValue(value);
  };

  const handleBlur = () => {
    const val = searchValue;
    if (val) {
      setQueryParams({
        ...queryParams,
        keyword: val
      });
    }
    setSearchValue('');
  };

  return (
    <View className='searchLayout'>
      <View className='search'>
        <AtSearchBar
          fixed
          actionName='搜一下'
          placeholder='请输入你想要搜索的资源'
          value={searchValue}
          onConfirm={handleConfirm}
          onActionClick={handleConfirm}
          onClear={handleClear}
          onChange={(e) => handleChange(e)}
        />
      </View>
      <View className='history'>
        {tagList.length > 0 && (
          <>
            <View className='topTitle'>
              <View className='text'>热门标签</View>
            </View>
            <View className='tabs'>
              {tagList.map((tag) => (
                <View
                  key={tag.pkId}
                  className='tab'
                  onClick={() => clickTag(tag)}
                >
                  {tag.title}
                </View>
              ))}
            </View>
          </>
        )}
      </View>
      <View className='history'>
        {historySearch.length > 0 && (
          <>
            <View className='topTitle'>
              <View className='text'>最近搜索</View>
              <View className='icon' onClick={removeHistory}>
                <AtIcon value='trash' size='25'></AtIcon>
              </View>
            </View>
            <View className='tabs'>
              {historySearch.map((tab) => (
                <View
                  key={tab}
                  className='tab'
                  onClick={() => clickHistoryTab(tab)} // 使用 onClick 处理点击事件
                >
                  {tab}
                </View>
              ))}
            </View>
          </>
        )}
      </View>
    </View>
  );
}
