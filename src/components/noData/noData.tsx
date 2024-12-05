import Taro from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';
import './noData.scss'

const NoData = () => {
  return (
    <View className='noData'>
      <View className='img'>
        <Image src='https://wimg.588ku.com/gif/21/09/29/afaa8f7b2e74e5f585699763ccbac55d.gif' mode='aspectFit' />
      </View>
      <Text className='text'>暂无数据</Text>
    </View>
  );
};

export default NoData;
