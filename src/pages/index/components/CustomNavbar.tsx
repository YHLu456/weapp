import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import './nav.scss';//引入样式文件

const Navbar = () => {
  //获取屏幕边界到安全区域的距离
  const safeAreaInsets = Taro.getSystemInfoSync().safeArea;

  //点击搜索框跳转搜索页面
  const handleSearchClick = () => {
    Taro.navigateTo({
      url: '/pages/search/search',
    });
  };

  return (
    <View className='navbar' style={{ paddingTop: safeAreaInsets!.top + 10 + 'px' }}>
      <View className='logo'>
        <Text className='logo-text'>资源分享应用</Text>
      </View>
      <View className='search' onClick={handleSearchClick}>
        <Text className='icon-search'>请输入你想要搜索的资源</Text>
        <Text className='icon-scan'></Text>
      </View>
    </View>
  );
};

export default Navbar;
