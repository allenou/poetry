# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

这是一个中文古诗词展示网站，使用 Vue 3 + TypeScript + Vite 构建。项目展示中国古典文学内容，包括诗经、论语、元曲、曹操诗集、四书五经、幽梦影等。

## Development Commands

```bash
# 安装依赖
npm install

# 开发服务器
npm run dev

# 构建项目（输出到 docs/ 目录，用于 GitHub Pages）
npm run build

# 预览构建结果
npm run preview

# 类型检查
npm run lint
```

## Architecture

### 技术栈
- **Vue 3** + **TypeScript** - 主要框架
- **Vue Router 4** - 路由（使用哈希路由）
- **Vite** - 构建工具
- **UnoCSS** - 原子化 CSS 框架
- **Axios** - HTTP 请求
- **Sass** - CSS 预处理器

### 项目结构
```
src/
├── components/     # Vue 组件 (Article, Aside, Header)
├── views/         # 页面视图 (每个文学分类的页面)
├── router/        # 路由配置
├── hooks/         # 自定义 Hooks (useArticle - 获取文章数据)
├── config/        # 配置文件 (API 路径)
├── typings/       # TypeScript 类型定义
├── utils/         # 工具函数 (request - 封装 axios)
└── store/         # 状态管理
```

### 数据获取
- 使用 `useArticle` Hook 自动获取当前路由对应的数据
- 数据源：GitHub 上的 `chinese-poetry` 仓库，通过 CDN 获取 JSON 数据
- API 基础地址：`https://cdn.statically.io/gh/chinese-poetry/chinese-poetry/master`

### 路由结构
所有路由使用中文标题，哈希路由模式：
- `/shijing` - 诗经
- `/lunyu` - 论语
- `/yuanqu` - 元曲
- `/caocao` - 曹操诗集
- `/sishuwujing` - 四书五经
- `/youmengying` - 幽梦影

### 组件架构
- **App.vue**: 主布局，包含 Aside 侧边栏和 RouterView
- **Article.vue**: 文章展示组件，处理加载状态
- **Aside.vue**: 侧边导航栏
- **各视图组件**: 使用 useArticle Hook 获取数据，按章节结构展示内容

### 构建配置
- 构建输出目录：`docs/` (用于 GitHub Pages 部署)
- 已配置自动导入 Vue、Vue Router 组合式 API
- 组件自动注册
- UnoCSS 配置包含图标预设