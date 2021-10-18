# gelei-guard-bms
> ##### 格雷守护后台管理系统


## Build Setup

```bash
# Install dependencies
npm install

# Serve with hot reload at localhost:9528
npm run dev

### 打包
# Build for production with minification
npm run build

# 发布包在nodeserver文件夹下面
# 直接拷贝nodeserver布曙到对应的环境即可
cd nodeserver
npm run dev
# 
```

## 目录结构

```

├── build                      // 构建相关    
├── config                     // 配置相关
├── src                        // 源代码
│     ├── api                    // 所有请求
│     ├── assets                 // 主题 字体等静态资源
│     ├── components             // 全局公用组件
│     ├── directive              // 全局指令
│     ├── filtres                // 全局 filter
│     ├── icons                  // 项目所有 svg icons
│     ├── lang                   // 国际化 language
│     ├── mock                   // 项目mock 模拟数据
│     ├── router                 // 路由
│     ├── store                  // 全局 store管理
│     ├── styles                 // 全局样式
│     ├── utils                  // 全局公用方法
│     ├── vendor                 // 公用vendor
│     ├── views                   // view
│     ├── App.vue                // 入口页面
│     ├── main.js                // 入口 加载组件 初始化等
│   └── permission.js          // 权限管理
├── static                     // 第三方不打包资源
│     └── Tinymce                // 富文本
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

#### 权限分离接口
> 权限分离针对用户接口级和按钮级进行权限控制；
> 需要在nodeserver/src/storages下做配置；
> 权限值共5位，1打头的为后端服务接口，2打头的为页面或按钮权限，4xxxx打头的是未定义的权限值，在后台时会做过滤.
```js
interfaces.js // 定义所有接口权限值  
permissions.js // 定义的页面和按钮权限值
page_map.js // 定义了页面权限与按钮权限之间的映射，其中public关键字代码代表着公共权限
```  
> nodeserver/src/cube/secret.js 文件是对接口参数加解密算法使用的，采用的AES加密方法
> 注：4xxxx权限仅做接口标记，方便后期对单个接口做权限控制和维护
