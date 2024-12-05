export default defineAppConfig({
  // 增加这⼀⾏配置
  lazyCodeLoading: 'requiredComponents',
  pages: [
    'pages/index/index',
    'pages/login/login',
    'pages/contribute/contribute',
    'pages/my/my',
    'pages/content/content',
    'pages/notice/notice',
    'pages/noticeDetail/noticeDetail',
    'pages/search/search',
    'pages/searchResult/searchResult',
    'pages/myResource/myResource',
    'pages/bonus/bonus',
  ],
  // 配置分包
  subpackages: [
    {
      "root": "pageUser",
      "pages": [
        "userInfo/userInfo",
        "setting/setting",
      ]
    }
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
  // 设置 TabBar
  tabBar: {
    color: '#333',
    selectedColor: '#1296db',
    backgroundColor: '#fff',
    borderStyle: 'white',
    list: [
      {
        text: '首页',
        pagePath: 'pages/index/index',
        iconPath: 'static/tabs/home_default.png',
        selectedIconPath: 'static/tabs/home_selected.png',
      },
      {
        text: '投稿',
        pagePath: 'pages/contribute/contribute',
        iconPath: 'static/tabs/contribute_default.png',
        selectedIconPath: 'static/tabs/contribute_selected.png',
      },
      {
        text: '我的',
        pagePath: 'pages/my/my',
        iconPath: 'static/tabs/my_default.png',
        selectedIconPath: 'static/tabs/my_selected.png',
      },
    ],
  },
})
  // // 全局配置
  // window: {
  //   // 导航栏文字风格
  //   backgroundTextStyle: 'light',
  //   // 导航栏背景颜色
  //   navigationBarBackgroundColor: '#fff',
  //   //导航栏文
  //   navigationBarTitleText: 'WeChat',
  //   //导航栏文字颜色
  //   navigationBarTextStyle: 'black',
  // },
  // // 设置 TabBar
  // tabBar: {
  //   // 默认颜色
  //   color: '#333',
  //   //选中后的文字颜色
  //   selectedColor: '#1296db',
  //   // tabbar背最颜色
  //   backgroundColor: '#fff',
  //   //边框颜色
  //   borderStyle: "white",

  //   list: [
  //     {
  //       // 默认文字
  //       text: '首页',
  //       // 页面路径
  //       pagePath: 'pages/index/index',
  //       //图标地址
  //       iconPath: 'static/tabs/home_default.png',
  //       //选中后的图标地址
  //       selectedIconPath: 'static/tabs/home_selected.png',
  //     },
  //     {
  //       text: '投稿',
  //       pagePath: 'pages/contribute/contribute',
  //       iconPath: 'static/tabs/contribute_default.png',
  //       selectedIconPath: 'static/tabs/contribute_selected.png',
  //     },
  //     {
  //       text: '我的',
  //       pagePath: 'pages/my/my',
  //       iconPath: 'static/tabs/my_default.png',
  //       selectedIconPath: 'static/tabs/my_selected.png',
  //     },
  //   ],
  // },
// });
