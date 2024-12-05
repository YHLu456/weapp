import Taro from '@tarojs/taro'
import { View, Text, Icon } from '@tarojs/components'
import { AtIcon } from 'taro-ui';
import './resourceActionInfo.scss'

interface InfoProps {
  info: {
    title: string;
    createTime: string;
    price: number;
  };
}

const ResourceItem = ({ info }: InfoProps) => {
  return (
    <View className='list'>
      <View className='left'>
        <AtIcon className='icons' value='medal' size='30' color='#f67f67' />
        <View className='info'>
          <Text className='title'>{info.title}</Text>
          <Text className='tips'>{info.createTime}</Text>
        </View>
      </View>
      <View className='right'>
        <View className='bonus'>{info.price}积分</View>
        <View className='txt'>兑换成功</View>
      </View>
    </View>
  )
}

export default ResourceItem
