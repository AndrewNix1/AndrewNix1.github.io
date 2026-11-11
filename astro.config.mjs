import { defineConfig } from "astro/config";

// 部署到 https://andrewnix1.github.io/ 时，不需要设置 base。
// 如果以后使用 https://andrewnix1.github.io/my-site/，
// 请把 site 改为完整网址，并添加 base: "/my-site"。
export default defineConfig({
  site: "https://andrewnix1.github.io",
});
