# Hexa CMS

Hexa CMS 是一个用于练习企业级 Git、GitHub 协作流程和前端组件化开发的示例项目。

## 练习目标

- 初始化本地 Git 仓库
- 创建基础项目文件
- 连接 GitHub 远程仓库
- 使用分支开发功能
- 模拟 Pull Request 流程
- 练习冲突解决
- 使用 React 创建后台管理页面
- 使用 React State、Props 和条件渲染实现动态页面

## 当前内容

- `README.md`：项目说明
- `tech-stack.txt`：技术栈说明
- `login.html`：登录页面练习
- `members.md`：成员信息练习
- `hexa-cms-admin/`：React 后台管理页面练习

## Class3 React 练习

`hexa-cms-admin` 使用 Create React App 创建，主要完成了以下内容：

- 创建 `Header` 顶部组件
- 创建 `Sidebar` 侧边栏组件
- 创建 `ArticleList` 文章列表组件
- 在 `App.js` 中组合成左右分栏后台布局

## Class4 React 练习

在 Class3 静态后台基础上，继续完成了 React 状态管理与动态渲染：

- 在 `App.js` 中使用 `useState` 保存当前菜单
- 通过 Props 将菜单数据、文章数据和切换函数传给子组件
- 在 `Sidebar` 中点击菜单切换右侧内容
- 在 `ArticleList` 中使用 `map` 动态渲染文章表格
- 在 `ArticleList` 中使用 State 实现文章标题搜索
- 新增 `Dashboard`、`CategoryPanel`、`CommentPanel`、`SystemSettings` 页面组件

本地运行方式：

```bash
cd hexa-cms-admin
npm start
```
