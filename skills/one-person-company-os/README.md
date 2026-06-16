# One Person Company OS

> 一人公司操作系统 - AI 驱动的完整软件开发工作流（内置 OpenSpec 集成）

## ✨ 特性

### 核心能力
- 🚀 **一条命令启动**：在 Claude Code 中输入 `/opc 做一个博客系统` 即可
- 🧠 **七阶段规范化流程**：创意 → 产品 → 架构 → 实现 → 测试 → 安全 → 发布
- 👤 **角色隔离机制**：每个角色有独立的视角和上下文
- 📝 **独立记忆系统**：每个角色积累经验、教训、模式库，越来越聪明
- ✅ **交付物管控**：阶段之间通过交付物传递，必须签收才能进入下一阶段
- 🎯 **质量门禁**：每个阶段有出口质量标准，低于 80 分卡壳
- 📋 **审计追踪**：所有决策、变更、签收都有完整记录

### OpenSpec 深度集成
- 📐 **规格驱动开发**：自动将 PRD + 架构转化为 OpenSpec 规格
- ✅ **可执行任务清单**：`tasks.md` 逐项实现，不会遗漏
- 📂 **结构化规格工件**：proposal → specs → design → tasks，一目了然
- 📦 **变更归档**：完成的变更自动归档，历史可追溯

## 🚀 快速开始

### 前置准备（可选但推荐）

```bash
npm install -g @fission-ai/openspec@latest
```

### 开始项目

在 Claude Code 对话中：

```
/opc 做一个个人博客系统
```

就这么简单！系统会自动：
1. ✅ 问你 3 个关键问题（用户、价值、时间）
2. ✅ 生成商业简报
3. ✅ 生成 PRD
4. ✅ 生成架构设计
5. ✅ **自动转化为 OpenSpec 规格**（proposal + specs + design + tasks）
6. ✅ 保存所有文档到 `.opc/` 和 `openspec/` 目录
7. ✅ 然后你可以输入 `/opsx:apply` 开始按任务清单写代码！

## 📋 所有命令

### OPC OS 命令

| 命令 | 说明 |
|------|------|
| `/opc <项目描述>` | 开始一个新项目 |
| `/opc 状态` / `/opc status` | 查看当前项目状态 |
| `/opc 继续` / `/opc continue` | 继续未完成的项目 |
| `/opc 交付物` | 列出所有交付物 |

### OpenSpec 集成命令

| 命令 | 说明 |
|------|------|
| `/opsx:propose <名称>` | 创建变更提案 |
| `/opsx:apply` | 按任务清单逐项实施 |
| `/opsx:verify` | 验证已完成的变更 |
| `/opsx:archive` | 归档已完成的变更 |

## 📂 项目结构

所有文件自动保存在项目根目录的 `.opc/` 下：

```
.opc/
├── current-project.json          # 当前项目状态
└── memory/
    ├── founder-ceo/.memory-meta.json      # CEO 私有记忆
    ├── product-pm/.memory-meta.json       # PM 私有记忆
    ├── architect-tl/.memory-meta.json     # 架构师私有记忆
    ├── web-fe/.memory-meta.json           # 前端私有记忆
    ├── api-be/.memory-meta.json           # 后端私有记忆
    ├── quality-qa/.memory-meta.json       # QA 私有记忆
    ├── security-sec/.memory-meta.json     # 安全工程师私有记忆
    ├── release-rm/.memory-meta.json       # 发布经理私有记忆
    └── shared/                             # 共享交付物
        ├── milestones/v0-ceo-brief.md
        ├── prd/v1-prd.md
        ├── architecture/v1-arch.md
        ├── implementation-notes/
        ├── test-reports/
        ├── security-reports/
        └── release-records/
```

## 🎯 七阶段工作流

| 阶段 | 角色 | 产出 |
|------|------|------|
| 0. 创意发起 | CEO | 商业简报、里程碑设定 |
| 1. 产品定义 | PM | PRD、用户故事、验收标准 |
| 2. 架构设计 | Architect | 技术选型、模块边界、API 契约 |
| 3. 代码实现 | Engineers | 实现代码、技术文档 |
| 4. 质量验证 | QA | 测试报告、Bug 列表 |
| 5. 安全审计 | Security | 安全报告、风险评估 |
| 6. 发布上线 | Release Manager | 发布记录、回滚预案 |
| 7. 复盘优化 | 全员 | 经验沉淀、记忆更新 |

## 🧠 设计哲学

> 好的流程管控应该像空气——无处不在，但你完全感觉不到它的存在。

**因为信任所以简单**：
- 系统在后台默默地帮你把控质量、积累经验、维护流程
- 你只需要专注于写代码和做决策
- 所有复杂的机制都是隐形的，没有使用负担

## 📦 高级用法（需要时才用）

99% 的情况你都不需要这些。需要精细控制时可以用：

```bash
# 手动检查角色依赖
node agents/role-activator.js check founder-ceo

# 手动列出交付物
node agents/deliverable-manager.js list

# 手动创建交付物
node agents/deliverable-manager.js create --type prd ...
```

## 📄 文档

- [完整工作流梳理](docs/WORKFLOW.md) - RACI 矩阵、泳道图、质量门禁
- [极简设计理念](docs/SIMPLIFICATION.md) - 为什么这么设计、核心原则

## 🎉 为什么用 One Person Company OS？

| 没有 OPC OS | 有了 OPC OS |
|-------------|-------------|
| 想到哪做到哪，没有章法 | 七阶段规范化流程，每一步都有章法 |
| 做完就忘，经验不积累 | 每个角色有独立记忆，越来越聪明 |
| 没有质量门禁，Bug 留到发布才发现 | 每个阶段有出口质量标准，早发现早解决 |
| 没有交接记录，回头看不知道当时怎么想的 | 所有决策都有记录，交付物完整可追溯 |
| 一个人要扮演所有角色，容易混乱 | 角色隔离，每个阶段专注当前角色视角 |

---

**一个人，也要像一支队伍一样正规作战！** 🚀
