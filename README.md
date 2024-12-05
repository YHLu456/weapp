## 项目简介
当前仓库为【资源分享应用】的 Taro 项目模板。

## 技术栈
- 前端框架：taro
- 状态管理：redux
- 组件库：taro-ui

## 运行程序
1. 安装依赖
- npm 方式
```bash
npm i --registry=https://registry.npmmirror.com
```
- pnpm 方式
```
pnpm i --registry=https://registry.npmmirror.com
```

2. 运行程序(微信小程序)
```
npm run dev:weapp
```
3. 微信开发者工具导入 /dist 目录

## 工程结构解析
├── .vscode # VS Code 插件 + 设置 + 配置文件
├── dist # 打包文件夹（可删除重新打包）
├── src # 源代码
│ ├── api # 所有请求
│ ├── components # 全局组件
│ ├── composables # 组合式函数
│ ├── pages # 主包页面
│ ├── index # 首页
│ ├── contribute # 投稿页
│ ├── my # 我的
│ └── login # 登录页
│ ├── service # 封装网络请求
│ ├── static # 存放应用引用的本地静态资源的目录
│ ├── images # 普通图片
│ └── tabs # tabBar 图片
│ ├── stores # 全局 pinia store
│ ├── modules # 模块
│ └── index.ts # store 入口
│ ├── styles # 全局样式
├── global.scss # 样式
│ └── fonts.scss # 字体图标
│ ├── utils # 全局方法
│ ├── App.vue # 入口页面
│ ├── app.ts # taro 初始化入口文件
│ ├── app.config.ts # 配置页面路由等页面类信息
│ └── app.scss # 全局常用样式变量
├── .editorconfig # editorconfig 配置
├── .eslintrc.js # eslint 配置
├── .prettierrc.js # prettier 配置
├── .gitignore # git 忽略文件
├── package.json # package.json 依赖
└── babel.config.js # 代码编译插件
└── tsconfig.json # typescript配置文件
└── project.config.json # 全局配置文件