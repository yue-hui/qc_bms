# gelei-guard-bms
> ##### 格雷守护后台管理系统


## Build Setup

```bash
# Clone project
git clone git@172.168.50.230:lwtx/bms.git

# 增加cross-env工具
npm install -g cross-env

# Install dependencies
npm install

# Serve with hot reload at localhost:9528
npm run dev

### 依赖环境打包
#  开发环境 
# Build for development with minification
npm run build:dev

# 测试环境
# Build for test with minification
npm run build:test

# 生产环境
# Build for production with minification
npm run build:prod

# 发布包在nodeserver文件夹下面
# 直接拷贝nodeserver布曙到对应的环境即可
cd nodeserver
npm run dev

# Build for production and view the bundle analyzer report
npm run build --report

# 
```

## 目录结构

```

├── build                      // 构建相关  
├── config                     // 配置相关
├── src                        // 源代码
│   ├── api                    // 所有请求
│   ├── assets                 // 主题 字体等静态资源
│   ├── components             // 全局公用组件
│   ├── directive              // 全局指令
│   ├── filtres                // 全局 filter
│   ├── icons                  // 项目所有 svg icons
│   ├── lang                   // 国际化 language
│   ├── mock                   // 项目mock 模拟数据
│   ├── router                 // 路由
│   ├── store                  // 全局 store管理
│   ├── styles                 // 全局样式
│   ├── utils                  // 全局公用方法
│   ├── vendor                 // 公用vendor
│   ├── views                   // view
│   ├── App.vue                // 入口页面
│   ├── main.js                // 入口 加载组件 初始化等
│   └── permission.js          // 权限管理
├── static                     // 第三方不打包资源
│   └── Tinymce                // 富文本
├── .babelrc                   // babel-loader 配置
├── eslintrc.js                // eslint 配置项
├── .gitignore                 // git 忽略项
├── favicon.ico                // favicon图标
├── index.html                 // html模板
└── package.json               // package.json
```

```angular2
开发环境
http://172.168.50.173:4003/#/login
测试环境
http://172.168.50.62:4004/#/login

Jenkins 打包流程
在【打包】dist-greenguard-bms 内点击【立即构建】
构建完成后将包同步到173开发环境、62测试环境
Jenkins 发布流程
在【部署-开发】deploy-greenguard-bms 【立即构建】发布开发环境
在【部署-测试】deploy-greenguard-bms-test 【立即构建】发布测试环境
```


