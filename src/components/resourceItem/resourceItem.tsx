import { View, Text, Image, Navigator } from '@tarojs/components';
import { AtIcon } from 'taro-ui'; // 引入图标组件，可以替换为自己使用的图标库
import './resourceItem.scss'; // 确保样式文件路径正确

interface ResourceItemProps {
  resource: IndexResourceType;
}

const ResourceItem = ({ resource }: ResourceItemProps) => {
  return (
    <View className='scroll'>
      <Navigator
        url={`/pages/content/content?id=${resource.pkId}`}
        className='scroll-item'
        key={resource.pkId}
      >
        <View className='top'>
          <View className='img'>
            <Image src={resource.authorAvatar} mode='aspectFill' />
          </View>
          <Text className='username'>{resource.author}</Text>
        </View>
        <View className='title'>
          {resource.isTop === 1 && <View className='isTop'>置顶</View>}
          <View className='content-title'>{resource.title}</View>
        </View>
        <View className='content'>{resource.detail}</View>
        <View className='bottom'>
          <View className='tags'>
            {resource.tags.map((tag, index) => (
              <View className='tag' key={index}>
                {tag}
              </View>
            ))}
          </View>
          <View className='right'>
            <View className='row'>
              <AtIcon value='download' size='20' />
              <Text>{resource.downloadNum}</Text>
            </View>
            <View className='row'>
              <AtIcon value='heart' size='20' />
              <Text>{resource.likeNum}</Text>
            </View>
            <View className='row'>
              <AtIcon value='star' size='20' />
              <Text>{resource.collectNum}</Text>
            </View>
          </View>
        </View>
      </Navigator>
    </View>
  );
};

export default ResourceItem;
