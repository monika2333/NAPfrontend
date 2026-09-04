<h1>vue-pure-admin精简版（非国际化版本）</h1>

## 注意
先 pnpm build 之后再push

## 官方文档

- [查看文档](https://yiming_chang.gitee.io/pure-admin-doc)

## 文件位置

配置本地连哪个后端 vite.config.ts
添加向后端发送的请求 src\api\user.ts
添加新的页面路由 src\router\modules 里新建
添加新的页面 src\views 里新建

## 增加功能
### 首页

### 搜索
增加搜索条件：关键词、时间（后端加选项、改页面、js）
分页显示全部
### 媒体源
修改（增加时用的组件重复调用、默认有已有的信息）
### 新页面
加后端，改采集数据的py
