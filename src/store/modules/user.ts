import { createSlice } from '@reduxjs/toolkit';

//定义的用户类型
type UserInfo = {
  avatar: string;
  birthday: string;
  bonus: number;
  gender: number;
  nickname: string;
  pkId: number;
  phone: string;
  isDailyCheck: boolean;
  wxOpenId?: string;
};

//初始化用户值
const userInfo: UserInfo = {
  avatar: '',
  birthday: ',',
  bonus: 0,
  gender: 0,
  nickname: '',
  pkId: 0,
  phone: '',
  isDailyCheck: false,
  wxOpenId: ''
};

export const userSlice = createSlice({
  //name相当于命名空间
  name: 'user',
  //初始值
  initialState: {
    userInfo
  },
  reducers: {
    //保存登录用户信息
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    //清除登录用户信息
    clearUserInfo: (state, _) => {
      state.userInfo = {
        avatar: '',
        birthday: '',
        bonus: 0,
        gender: 0,
        nickname: '',
        pkId: 0,
        phone: '',
        isDailyCheck: false
      };
    }
  }
});
//每个 case reducer 函数会生成对应的 Action creators
export const { setUserInfo, clearUserInfo } = userSlice.actions;

export default userSlice.reducer;
