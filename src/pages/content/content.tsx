import Taro, { useLoad } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtIcon } from 'taro-ui';
import { useEffect, useState } from 'react';
import {
  getResourceById, userExchangeResource,
  userLikeResource,
  userCollectResource,
} from '@/service/resource';
import { useAppDispatch } from '@/store';
import { clearUserInfo } from '@/store/modules/user';
import './content.scss';

const Content = () => {
  const dispatch = useAppDispatch();
  const [resource, setResource] = useState<IndexResourceType>();
  useLoad((options) => {
    const { id } = options;
    if (id) {
      getResourceInfo(id);
    }
  });

  // 获取资源详情
  const getResourceInfo = async (id: number) => {
    const res = await getResourceById(id);
    if (res.code === 0) {
      setResource(res.data);
    } else {
      Taro.showToast({
        title: res.msg,
        icon: 'none',
      });
    }
  };


  const handleResourceAction = async (action: () => Promise<any>, id: number) => {
    const res = await action();
    // tips: 如果获取资源详情返回3001
    if (res.code === 0) {
      Taro.showToast({ title: '操作成功', icon: 'success' });
      getResourceInfo(id);
    } else if (res.code === 3001 || res.code === 401) {
      Taro.showToast({ title: res.msg, icon: 'none' });
      dispatch(clearUserInfo({}));
      Taro.navigateTo({ url: '/pages/login/login' });
    } else {
      Taro.showToast({ title: res.msg, icon: 'none' });
    }
  };

  // 兑换资源
  const handleExchangeResourceClick = async () => {
    handleResourceAction(() => userExchangeResource(+resource!.pkId), +resource!.pkId);
  };

  // 点赞资源
  const handleLikeResourceClick = () => {
    handleResourceAction(() => userLikeResource(+resource!.pkId), +resource!.pkId);
  };

  // 收藏资源
  const handleCollectResourceClick = () => {
    handleResourceAction(() => userCollectResource(+resource!.pkId), +resource!.pkId);
  };


  return (
    <View className='contentLayout'>
      {resource && (
        <>
          <View className='contentTopBox'>
            <View className='top'>资源分享</View>
            <View className='content'>
              喜欢本站麻烦收藏，分享一下。
              资源太多可以试试搜索，我们励志搜集全网最全资源，争取成为百年老站。希望大家积极共享自己的资源。资源失效请反馈，我
              们会及时更新资源链接等!
            </View>
          </View>
          <View className='contentBox'>
            <View className='title'>{resource.title}</View>
            <View className='info'>
              <View className='dateAndCount'>
                <View className='txt left'>更新时间：{resource.createTime}</View>
                <View className='txt right'>
                  <AtIcon value='heart' color={resource.isLike ? '#1296db' : '#ccc'} size='16'></AtIcon>
                  <Text>{resource.likeNum}</Text>
                </View>
                <View className='txt'>
                  <AtIcon value='download' color={resource.isDownload ? '#1296db' : '#ccc'} size='16'></AtIcon>
                  <Text>{resource.downloadNum}</Text>
                </View>
                <View className='txt'>
                  <AtIcon value='star' color={resource.isCollect ? '#1296db' : '#ccc'} size='16'></AtIcon>
                  <Text>{resource.collectNum}</Text>
                </View>
              </View>
              <View className='row'>
                <View className='txt'>网盘分类：</View>
                <View className='txt'>{resource.diskType}</View>
              </View>
              <View className='row'>
                <View className='txt'>资源类型:</View>
                <View className='tag'>
                  {resource.resType.map((item, index) => (
                    <View key={index} className='tag-item'>
                      {item}
                    </View>
                  ))}
                </View>
              </View>
              <View className='row'>
                <View className='txt'>资源标签:</View>
                <View className='tag'>
                  {resource.tags.map((item, index) => (
                    <View key={index} className='tag-item'>
                      {item}
                    </View>
                  ))}
                </View>
              </View>
              <View className='row'>
                <View className='txt'>资源链接:</View>
                <View className='txt'>
                  {resource.isDownload ? resource.downloadUrl : '没有兑换请先兑换'}
                </View>
              </View>
              <View className='infoContentBox'>
                <View className='txt'>资源详情:</View>
                <View className='infoContent'>{resource.detail}</View>
              </View>
            </View>
          </View>
          {resource.isDownload ? (
            <View className='actionBar'>
              <View className='action'>
                <View className='action-btn' onClick={handleLikeResourceClick}>
                  <AtIcon value='heart' color={resource.isLike ? '#1296db' : '#ccc'} size='20'></AtIcon>
                  <Text>{resource.isLike ? '取消点赞' : '点赞'}</Text>
                </View>
                <View className='action-btn' onClick={handleCollectResourceClick}>
                  <AtIcon value='star' color={resource.isCollect ? '#1296db' : '#ccc'} size='20'></AtIcon>
                  <Text>{resource.isCollect ? '取消收藏' : '收藏'}</Text>
                </View>
              </View>
            </View>
          ) : (
            <View className='toolbar'>
              <View className='price symbol'>
                <Text className='number'>需要积分{resource.price}</Text>
              </View>
              <View className='button' onClick={handleExchangeResourceClick}>兑换资源</View>
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default Content;




