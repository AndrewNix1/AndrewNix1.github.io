# 个人网站 + 博客

基于 Astro 的一体化个人网站。个人主页、项目、关于和博客都在同一个项目中，
使用 Markdown 发布文章，并通过 GitHub Pages 自动部署。

## 已包含的视觉效果

- 春、夏、秋、冬四套配色和季节粒子；
- 页面顶部可直接切换季节，选择会保存在当前浏览器；
- 首次访问时会根据当前月份自动选择季节；
- 桌面端卡片支持轻微 3D 倾斜、跟随鼠标的光泽和悬浮效果；
- 触屏设备与开启“减少动态效果”的用户会自动使用静态版本。

季节主题的配色位于 `src/styles/global.css`，粒子数量与运动参数位于
`src/scripts/enhancements.ts`。

## 第一次修改

### 1. 修改个人信息

打开 `src/config.ts`，替换：

- 网站名称
- 你的名字和头像缩写
- 一句话介绍
- 邮箱
- GitHub 地址
- 所在地区
- 当前状态

然后替换 `astro.config.mjs` 中的：

```js
site: "https://YOUR_GITHUB_USERNAME.github.io"
```

### 2. 修改页面内容

- 首页：`src/pages/index.astro`
- 关于页：`src/pages/about.astro`
- 项目页：`src/pages/projects.astro`
- 博客列表：会自动读取文章

### 3. 写一篇文章

在 `src/content/blog/` 新建 `.md` 文件：

```md
---
title: "文章标题"
description: "文章简介"
pubDate: 2026-11-11
tags: ["随笔"]
featured: false
draft: false
---

从这里开始写正文。
```

### 4. 本地预览

```bash
npm install
npm run dev
```

浏览器打开终端显示的本地网址，通常是：

```text
http://localhost:4321
```

构建检查：

```bash
npm run build
```

## 发布到 GitHub Pages

当前 GitHub 用户名是 `AndrewNix1`，对应仓库名称是：

```text
AndrewNix1.github.io
```

这样网站地址就是：

```text
https://andrewnix1.github.io/
```

发布步骤：

1. 把本项目推送到仓库的 `main` 分支。
2. 打开仓库的 **Settings → Pages**。
3. 把 **Build and deployment** 的来源设为 **GitHub Actions**。
4. 打开 **Actions** 页面，等待 `Deploy to GitHub Pages` 完成。
5. 访问 `https://你的用户名.github.io/`。

本项目已经包含 `.github/workflows/deploy.yml`，以后每次推送到 `main`
都会自动重新发布。

## 以后绑定独立域名

在 GitHub 仓库的 **Settings → Pages → Custom domain** 中填写域名，
然后根据 GitHub 页面提示到域名服务商配置 DNS。

当前第一版不需要先购买域名，可以先用免费的 `github.io` 地址上线。
