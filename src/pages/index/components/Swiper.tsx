import { View, Swiper, SwiperItem, Navigator, Image, Text } from '@tarojs/components';  
import { useState } from 'react';  
import './swiper.scss'; // 引入样式文件  

interface SwiperProps {  
  swiperList: SwiperItem[];  
}  

const Carousel = ({ swiperList }: SwiperProps) => {
  // 当前激活的索引  
  const [activeIndex, setActiveIndex] = useState(0);

  // 滑块图切换
  const onChange = (ev) => {
    setActiveIndex(ev.detail.current);
  };

  return (
    <View className='carousel' style={{ display: swiperList.length !== 0 ? 'flex' : 'none' }}>
      <Swiper autoplay circular interval={3000} onChange={onChange}className='swiper'>
        {swiperList.map((item) => (
          <SwiperItem key={item.pkId}>  
            <Navigator url={`/pages/noticeDetail/noticeDetail?id=${item.pkId}`} className='navigator'>  
              <Image mode='aspectFill' className='image' src={item.cover} />
            </Navigator>
          </SwiperItem>
        ))}
      </Swiper>
      <View className='indicator'>
        {swiperList.map((item, index) => (
          <Text key={item.pkId} className={`dot ${index === activeIndex ? 'active' : ''}`}></Text>  
        ))}
      </View>
    </View>
  );
};

export default Carousel;