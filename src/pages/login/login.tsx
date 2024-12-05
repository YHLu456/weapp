import { useState, useEffect } from 'react'
import { View, Text, Input, Button } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { isCodeAvailable, isPhoneAvailable } from '@/utils/validate';
import { phoneLogin, sendCode, myWxLogin, getUserInfo } from '@/service/user';
import { useAppDispatch } from '@/store';
import { setUserInfo } from '@/store/modules/user';
import './login.scss';

const Login = () => {
  const dispatch = useAppDispatch();

  //倒计时
  const [count, setCount] = useState(60);
  const [timer, setTimer] = useState(false);

  //登录表单数据
  const [form, setForm] = useState({
    phone: '',
    code: ''
  });

  useEffect(() => {
    let interval;
    if (timer) {
      interval = setInterval(() => {
        setCount((prevCount) => {
          if (prevCount === 1) {
            clearInterval(interval);
            setTimer(false);
            return 60;
          }
          return prevCount - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  /**
   * 获取登陆后用户信息
   */
  const getLoginUserInfo = async () => {
    const res = await getUserInfo();
    if (res.code === 0) {
      dispatch(setUserInfo(res.data));
    } else {
      Taro.showToast({
        title: res.msg,
        icon: 'none',
      });
    }
  };

  /**
   * 发送手机验证码
   */
  const sendPhoneCode = async () => {
    if (form.phone && isPhoneAvailable(form.phone)) {
      const res = await sendCode(form.phone);
      if (res.code === 0) {
        Taro.showToast({
          title: '验证码发送成功',
          icon: 'none',
        });
      } else {
        Taro.showToast({
          title: '验证码发送失败',
          icon: 'none',
        });
      }
    } else {
      Taro.showToast({
        title: '请输入正确的手机号码',
        icon: 'none',
      });
    }

    setTimer(true);
  };

  // 返回来源页面时返回首页
  const navigateToUrl = () => {
    const pages = Taro.getCurrentPages(); // 获取当前页面栈
    if (pages.length > 1) {
      Taro.navigateBack(); // 返回上一页面
    } else {
      Taro.switchTab({
        url: '/pages/index/index', // 跳转到首页
      });
    }
  };

  /**
   * 手机号验证码登录
   *
   */
  const handleLoginClick = async () => {
    //1、手机号校验
    if (!form.phone || !isPhoneAvailable(form.phone)) {
      Taro.showToast({
        title: '请输入正确的手机号码',
        icon: 'none',
      });
      return;
    }

    //2、验证码校验
    if (!form.code || !isCodeAvailable(form.code)) {
      Taro.showToast({
        title: '请输入正确的验证码',
        icon: 'none',
      });
      return;
    }

    //3、手机号登录，保存token并获取用户信息
    const res = await phoneLogin(form.phone, form.code);
    if (res.code === 0) {
      Taro.setStorageSync('token', res.data.accessToken)
      //增加这一行
      getLoginUserInfo()
      Taro.showToast({
        title: '登录成功',
        icon: 'success',
      });
      //跳转到首页
      navigateToUrl();
    } else {
      Taro.showToast({
        title: res.msg,
        icon: 'none',
      });
      return;
    }
  };
  /**
   * 微信登录
   */
  const wxLogin = async () => {
    //在这里实现微信登录的逻辑
    try {
      //1、获取用户信息
      const res = await Taro.getUserProfile({
        desc: '获取你的昵称、头像、地区及性别',
      });

      //2、微信登录
      const loginRes = await Taro.login();
      if (loginRes.code) {
        //3、调用后台接口登录
        const wxLoginRes = await myWxLogin(loginRes.code, res.encryptedData, res.iv);

        if (wxLoginRes.code === 0) {
          Taro.showToast({
            title: '登录成功',
            icon: 'success',
          });

          //4、保存token以及回退页面
          Taro.setStorageSync('token', wxLoginRes.data.accessToken);
          //增加这一行
          getLoginUserInfo()

          navigateToUrl();
        } else {
          Taro.showToast({
            title: wxLoginRes.msg,
            icon: 'none',
          });
        }
      }
    } catch (err) {
      Taro.showToast({
        title: '获取用户信息失败',
        icon: 'none',
      });
    }
  };


  const handleInputCode = (e) => {
    setForm({ ...form, code: e.detail.value });
  };

  const handleInputPhone = (e) => {
    setForm({ ...form, phone: e.detail.value });
  };

  return (
    <View className='loginPage'>
      <View className='top'>
        <View className='title'>验证码登录</View>
        <View className='info'>未注册的手机号验证后自动完成注册</View>
      </View>
      <View className='form'>
        <Input
          className='input'
          type='text'
          placeholder='请输入手机号码'
          value={form.phone}
          onInput={(e) => handleInputPhone(e)}
        />
        <View className='code'>
          <Input
            className='password'
            type='text'
            password
            placeholder='请输入验证码'
            value={form.code}
            onInput={(e) => handleInputCode(e)}
          />
          {
            !timer ? (
              <Text className='btn' onClick={sendPhoneCode} hidden={timer}>
                获取验证码
              </Text>
            ) : (
              <Text className='btn' hidden={!timer}>
                {count}秒后重新获取
              </Text>
            )
          }
        </View>
        <Button className='button' onClick={handleLoginClick}>
          登录
        </Button>
        <View className='extra'>
          <View className='caption'>
            <Text>其他登录方式</Text>
          </View>
          <View className='options'>
            <Text className='icon icon-weixin' onClick={wxLogin}>微信一键登录</Text>
          </View>
        </View>
        <View className='tips'>
          登录/注册即视为你同意《服务条款》和《隐私协议》
        </View>
      </View>
    </View>
  );
};


export default Login;


