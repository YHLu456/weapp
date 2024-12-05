import { useAppDispatch, useAppSelector } from "@/store";
import { Button, Input, View, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { isCodeAvailable, isPhoneAvailable } from "@/utils/validate";
import { useState } from "react";
import { AtIcon, AtModal } from "taro-ui";
import { clearUserInfo } from "@/store/modules/user";
import { useSendCode } from "@/composables/useSendCode";
import { logout, updateUserPhone } from "@/service/user";
import "./setting.scss";

export default function Setting() {
  const { phoneForm, count, timer, sendPhoneCode, setPhoneForm } = useSendCode()
  const userInfo = useAppSelector((state) => state.user.userInfo)
  const dispatch = useAppDispatch()
  const [isOpenPhone, setIsOpenPhone] = useState(false)

  const handleOpen = () => {
    setIsOpenPhone(true)
  }

  const handleClose = () => {
    setIsOpenPhone(false)
  }

  const handleClick = async () => {
    // 手机号验证规则
    if (!phoneForm.phone || !isPhoneAvailable(phoneForm.phone)) {
      Taro.showToast({
        title: "请输入正确的手机号",
        icon: 'none',
      })
      return
    }

    // 验证码验证规则
    if (!phoneForm.code || !isCodeAvailable(phoneForm.code)) {
      Taro.showToast({
        title: "请输入正确的验证码",
        icon: 'none',
      })
      return
    }

    // 处理事件
    const res = await updateUserPhone(phoneForm.phone, phoneForm.code)
    if (res.code === 0) {
      Taro.showToast({
        title: '操作成功',
        icon: 'success',
      })
      handleClose()
      // 清除用户信息
      dispatch(clearUserInfo({}))

      // 重新跳转到登录页面
      Taro.reLaunch({
        url: '/pages/login/login',
      })
    } else {
      Taro.showToast({
        title: res.msg,
        icon: 'none',
      })
      return
    }
  }

  const handleQuitClick = () => {
    Taro.showModal({
      title: '你确定要退出吗？',
      success: async (res) => {
        if (res.confirm) {
          const resData = await logout()
          if (resData.code === 0) {
            // 清除用户信息
            dispatch(clearUserInfo({}))
            // 清除token
            Taro.removeStorageSync('token')
            Taro.showToast({
              title: '退出登录成功',
            })
            Taro.reLaunch({
              url: '/pages/login/login',
            })
          }
        }
      },
    })
  }

  return (
    <>
      <View className='setting'>
        {userInfo && (
          <View className='list'>
            <Button
              className='item arrow'
              onClick={() => Taro.navigateTo({ url: '/pageUser/userInfo/user' })}
            >
              个人资料
            </Button>
            <Button className='item arrow' onClick={handleOpen}>
              绑定手机号
            </Button>
          </View>
        )}

        <View className='list'>
          <Button className='item arrow' openType='openSetting'>
            隐私管理
          </Button>
          <Button className='item arrow' openType='contact'>
            联系我们
          </Button>
          <Button className='item arrow' openType='feedback'>
            问题反馈
          </Button>
        </View>

        {/* 关于我们 */}
        <View className='list'>
          <Button className='item arrow'>关于我们</Button>
        </View>

        {/* 退出登录 */}
        {userInfo.pkId >= 0 && (
          <View className='action'>
            <Button className='button' onClick={handleQuitClick}>
              退出登录
            </Button>
          </View>
        )}
      </View>
      <AtModal className='nikeNamePopup' isOpened={isOpenPhone}>
        <View className='phonePopup'>
          <View className='container'>
            <View className='popHeader'>
              <View></View>
              <View className='title'>绑定手机</View>
              <View className='close' onClick={handleClose}>
                <AtIcon value='close' size='18' color='#999' />
              </View>
            </View>

            <View className='content'>
              <Input
                className='input'
                type='text'
                placeholder='请输入手机号码'
                value={phoneForm.phone}
                onInput={(e: any) => setPhoneForm(pre => ({ ...pre, phone: e.detail.value }))}
              />

              <View className='yanz'>
                <Input
                  className='password'
                  type='text'
                  placeholder='请输入验证码'
                  value={phoneForm.code}
                  onInput={(e: any) => setPhoneForm(pre => ({ ...pre, code: e.detail.value }))}
                />
                {!timer ? (
                  <Text className='btn' onClick={sendPhoneCode} hidden={timer}>
                    获取验证码
                  </Text>
                ) : (
                  <Text className='btn' hidden={!timer}>
                    {count}秒后重新获取
                  </Text>
                )}
              </View>
            </View>
            <View className='footer'>
              <Button className='button' onClick={handleClick}>确认绑定</Button>
            </View>
          </View>
        </View>
      </AtModal>
    </>
  )
}
