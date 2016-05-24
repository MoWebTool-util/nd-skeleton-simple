# nd-skeleton-simple

> 一个简单的nd web前端工程骨架。基于jQuery，nd-base。包含message组件、rest请求组件。兼容ie8+

## 1 目录说明

不要用中文做目录名

```
js
├─.bin ------ 存放命令脚本的文件
├─config ---- 基础配置
├─server ---- 本地开发服务配置
├─src ------- 源文件目录
├─tests ----- 测试脚本
└─webpack --- Webpack 基础配置
```

```
src
├─app ------- 业务文件
├─model ----- RESTful 的数据模型
├─static ---- 静态文件
├─template -- 存放首页模板
├─theme ----- 主题样式
└─utils ----- 存放各种小工具
```

## 2 关键词

- 模块化：commonjs、ES6
- 组件化：npm、[ndfront](https://github.com/ndfront)
- 模板化：handlebars
- 热重载：[HMR](http://webpack.github.io/docs/hot-module-replacement.html)

## 3 使用到的前端技术

- [node](https://nodejs.org/)
- [npm](https://npmjs.com/)
- [webpack](http://webpack.github.io/)
- [postcss](http://postcss.org/)
- [karma](https://karma-runner.github.io/)
- [koa](http://koajs.com/)
- [eslint](http://eslint.org/)
- [babel](https://babeljs.io/)

## 4 环境搭建

### 4.1 必需

- [node](https://nodejs.org/)
- [editorconfig](http://editorconfig.org/)

### 4.2 可选

- [cmder](http://cmder.net/)
- [git](https://git-scm.com/)

  安装中选择

  - Use Git and optional Unix tools from the Windows Command Prompt
  - Checkout as-is, commit as-is

  安装后执行

  ```bash
  $ git config --global core.autocrlf false   # 禁止自动转换换行符
  ```

## 5 安装依赖

**请确保 npm -v >= 3.6.0**

```bash
$ cd path/to/js
$ npm install -r https://registry.npm.taobao.org  # 使用淘宝源，加快安装速度
```

P.S. **当 `package.json` 的 `dependencies` 有更新时，需要重新执行上述脚本**

移除不再被依赖的模块

```bash
$ npm prune
```

处理重复的模块

```bash
$ npm dedupe
```

## 6 开发调试

### 6.1 方案一

启动本地服务，使用本地虚拟环境的数据

```bash
$ npm start
```

或启动本地服务，同时使用线上环境的数据

```bash
$ npm run dev:DEVELOPMENT     # 开发
$ npm run dev:DEBUG           # 测试
$ npm run dev:PRESSURE        # 压测
$ npm run dev:PREPRODUCTION   # 预生产
```

浏览器访问

```bash
$ open http://127.0.0.1:3000
```

### 6.2 方案二（推荐）

启动本地服务

```bash
$ npm start
```

然后使用 [fiddler](http://www.telerik.com/fiddler) 等，将线上代码映射到本地进行开发调试，以下是 `fiddler.fax` 的相关配置：

```xml
<ResponseRule Match="regex:http://admin\..+\.web\.nd/$" Action="http://localhost:3000/" Enabled="true" />
<ResponseRule Match="regex:http://admin\..+\.web\.nd/((?!v0\.).*)" Action="http://localhost:3000/$1" Enabled="true" />
```

浏览器访问

```bash
$ open http://admin.dev.web.nd   # 或其它线上地址
```

## 7 代码静态检查

### 7.1 手动检查

使用 eslint 检查代码规范

```bash
$ npm run lint
```

使用 eslint 检查代码规范并自动修复

```bash
$ npm run lint:fix
```

### 7.2 自动检查

编辑器安装 eslint 相关插件，实时检查代码规范

## 8 打包构建

buid 文件生成在 js 同级的 webapp 目录下

```bash
$ npm run deploy
```

P.S. 执行 `npm run deploy` 将自动执行静态检查，检查未通过则退出

## 9 自动化测试

*持续完善中*

```bash
$ npm test
# $ npm run test:dev
```
