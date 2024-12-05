import Taro from '@tarojs/taro'
import { View, Text, Icon } from '@tarojs/components'
import { AtIcon } from 'taro-ui';
import './resourceBonusInfo.scss'

interface InfoProps {
  info: {
    content: string;
    createTime: string;
    bonus: number;
  };
}

const ResourceItem = ({ info }: InfoProps) => {
  return (
    <View className='list'>
      <View className='left'>
        <AtIcon className='icons' value='calendar' size='30' color='#3d94fe' />
        <View className='info'>
          <Text className='title'>{info.content}</Text>
          <Text className='tips'>{info.createTime}</Text>
        </View>
      </View>
      <View className='right'>
        <Text
          style={{
            color: info.bonus > 0 ? 'green' : 'red',
          }}
        >
          {info.bonus > 0 ? `+ ${info.bonus}` : info.bonus}
        </Text>
      </View>
    </View>
  )
}

export default ResourceItem
