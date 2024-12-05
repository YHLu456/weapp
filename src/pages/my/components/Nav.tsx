import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useAppSelector } from '@/store'
import './nav.scss' // 引入样式文件

const Navbar = () => {
  const userInfo = useAppSelector((state) => state.user.userInfo)
  // 获取用户当前安全区域的距离
  const safeAreaInsets = Taro.getSystemInfoSync().safeArea

  const handleClick = () => {
    if (userInfo.pkId > 0) {
      Taro.navigateTo({
        url: '/pageUser/userInfo/userInfo',
      })
    }
  }
  return (
    <View className='navbar' style={{ paddingTop: safeAreaInsets!.top + 10 + 'px' }}>
      <View className='text' onClick={handleClick}>
        <Text className='logo-text'>个人中心</Text>
      </View>
    </View>
  )
}

export default Navbar
