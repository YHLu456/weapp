import { View, Text, Swiper, SwiperItem, Navigator } from '@tarojs/components';
import './notice.scss';
// 引入样式文件
interface NoticeProps {
  noticeList: SwiperItem[];
}  
const Notice = ({ noticeList }: NoticeProps) => {
  return (
    <View className='notice' style={{ display: noticeList.length ? 'flex' : 'none' }}>
      <View className='left'>
        <Text className='at-icon at-icon-bell' style={{ fontSize: '16px', color: '#1296db' }} />
        <Text className='text'>公告</Text>  
      </View>  
      <View className='center'>  
        <Swiper vertical autoplay interval={3000} duration={1500} circular>  
          {noticeList.map((item) => (  
            <SwiperItem key={item.pkId}>  
              <Navigator className='noticeItem' url={`/pages/noticeDetail/noticeDetail?id=${item.pkId}`}>
                {item.title}
              </Navigator>
            </SwiperItem>
          ))}
        </Swiper>
      </View>
      <Navigator url='/pages/notice/notice' className='right'>
        <Text className='icon-right at-icon chevron-right' style={{ fontSize: '16px', color: '#333' }}></Text>
      </Navigator>
    </View>  
  );  
};  

export default Notice;