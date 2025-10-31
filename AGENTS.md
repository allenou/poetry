# Repository Guidelines

## 项目结构与模块组织
该仓库基于 Vite + Vue 3 构建单页应用。`src/` 保存核心源代码：`src/views` 存放路由页面，`src/components` 放共享组件，`src/hooks` 汇总组合式函数，`src/utils` 承载工具方法。静态数据置于 `src/data`，全局样式集中在 `src/style.css`，组件级样式建议使用 scoped Sass 并在需要时引入局部变量。公共资产与入口 HTML 位于 `public/`，构建产物输出到 `docs/` 以供 GitHub Pages 部署；生成后会同步 `docs/assets` 与 `docs/index.html`。构建流程、自动导入、UnoCSS 预设及手动 chunk 拆分统一维护在 `vite.config.ts`，新增模块时请同步评估该文件。如需新增文档或素材，请在 `docs/assets` 内维护说明文件，便于发布后追溯来源。

## 构建与开发命令
- `npm install` 安装依赖，保持与 `package-lock.json` 一致。
- `npm run dev` 启动 Vite 开发服务器（默认 `http://localhost:5173`）并自动打开浏览器。
- `npm run build` 生成优化后的静态文件到 `docs/`，包含手动拆分的 vendor chunk。
- `npm run preview` 本地预览生产构建，提交前用于冒烟测试。
- `npm run lint` 执行 `vue-tsc --noEmit` 进行类型校验，提交前需处理所有告警。

## 代码风格与命名约定
优先采用 `<script setup lang="ts">`，结合自动导入的 Vue API。组件、路由和组合式函数使用 PascalCase，例如 `ArticleRenderer.vue`、`useArticle.ts`；工具模块保持 camelCase，并为纯类型文件使用 `.d.ts`。统一使用两个空格缩进，多行字面量保留尾随逗号，TypeScript 接口字段尽量显式声明可选与必需。响应式状态优先 `const` 加 `ref` / `computed`，避免滥用 `any`。样式可以使用 scoped `lang="scss"`，并鼓励用 UnoCSS 快捷类如 `flex-center`、`text-primary-500`，必要时在 `uno.config.ts`（若新增）维护自定义规则。路由定义位于 `src/router`，通过 `@/` 别名引用资源，避免相对路径回溯。

## 测试指引
当前未集成自动化测试。提交前请运行 `npm run dev` 手动巡检主要路由、筛选器与滚动加载场景，再执行 `npm run build && npm run preview` 验证生产流程，并记录关键行为在 PR 描述中。若引入单测，推荐使用 Vitest 并将用例放在 `src/__tests__/`，命名遵循 `*.spec.ts`，同时在此文档补充运行方式与覆盖要求。

## 提交与合并规范
遵循 Conventional Commits，例如 `feat:`, `refactor:`, `style:`，必要时附带简短 scope。每次提交聚焦单一变更点，避免把配置和功能混合提交。提交 PR 时撰写清晰变更摘要，关联相关 issue，并为 UI 改动提供截图或录屏；若涉及交互流程，附上复现步骤。说明手动测试范围以及对配置、依赖的影响，帮助 Reviewer 快速评估风险。

## 配置提示
新增依赖前请检查 `vite.config.ts`，保持模块拆分与 UnoCSS 预设的可控性，并同步考虑懒加载路由是否受影响。新增环境变量时在 `README.md` 或 `docs/` 中登记说明，可提供 `.env.example` 以便协作者对齐。确保不向仓库提交 API 密钥、访问令牌或任何生产环境配置，必要时使用本地 `.env.local` 覆盖。
