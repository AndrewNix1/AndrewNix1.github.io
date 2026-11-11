---
title: "如何发布一篇新文章"
description: "这份示例文章说明 Markdown 文章的字段和发布流程。"
pubDate: 2026-11-10
tags: ["指南", "写作"]
featured: false
draft: false
---

发布新文章时，在 `src/content/blog/` 文件夹中新建一个 Markdown 文件即可。

## 文件命名

建议使用英文小写单词，并用连字符分隔，例如：

```text
my-first-project.md
learning-astro.md
reading-notes-2026.md
```

文件名会成为文章的网址。

## 文章开头

每篇文章都需要一段这样的配置：

```yaml
---
title: "文章标题"
description: "用于列表页和搜索引擎的简短介绍"
pubDate: 2026-11-11
tags: ["标签一", "标签二"]
featured: false
draft: false
---
```

把 `draft` 设置为 `true` 时，文章不会出现在网站中。

## 正文

标题使用 `##`，引用使用 `>`，列表使用 `-`，代码放进三个反引号中。

写完后提交到 GitHub，网站会自动重新构建并发布。
