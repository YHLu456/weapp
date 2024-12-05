import { View, Navigator, Image, Text } from '@tarojs/components';
import { useState } from 'react';
import './panel.scss'; // 引入样式文件

const Panel = () => {
  const [panType] = useState([
    {
      title: '百图网盘',
      diskType: 1,
      img: 'https://nd-static.bdstatic.com/m-static/wp-brand/favicon.ico',
    },
    {
      title: '阿里网盘',
      diskType: 2,
      img: 'https://img.alicdn.com/imgextra/i1/O1CN01JDQCi21Dc8EfbRwvF_!!6000000000236-73-tps-64-64.ico',
    },
    {
      title: '奇妙网盘',
      diskType: 3,
      img: 'https://image.quark.cn/s/uae/g/3o/broccoli/resource/202304/c62b4840-e344-11ed-93c7-392f83c2aa26.png',
    },
    {
      title: '天翼网盘',
      diskType: 4,
      img: 'https://cloud.189.cn/web/logo.ico',
    },
  ]);

  return (
    <View className='category'>
      {panType.map((item) => (
        <Navigator
          className='category-item'
          hoverClass='none'
          key={item.diskType}
          url={`/pages/searchResult/searchResult?diskType=${item.diskType}`}
        >
          <Image className='icon' src={item.img} />
          <Text className='text'>{item.title}</Text>
        </Navigator>
      ))}
    </View>
  );
};

export default Panel;
