# One Person Company OS

> 🚀 一人公司操作系统 - AI 驱动的完整软件开发工作流（内置 OpenSpec 深度集成）

[![GitHub](https://img.shields.io/badge/GitHub-One--Person--Company--Agent-blue)](https://github.com/Socks3389/One-Person-Company-Agent)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Claude Code Skill](https://img.shields.io/badge/Claude%20Code-Skill-purple)](https://claude.ai/code)

---

## ✨ 核心特性

### 流程管控
- 🧠 **7阶段规范化流程**：创意 → 产品 → 架构 → 实现 → 测试 → 安全 → 发布
- 👤 **9个角色隔离机制**：每个角色有独立视角和专业依赖
- ✅ **交付物管控体系**：签收机制，保证每个阶段质量
- 🎯 **80分质量门禁**：低于标准自动卡壳，防止带病上线
- 📋 **完整审计追踪**：所有决策、变更、归档都有记录

### 记忆系统
- 📝 **独立记忆**：每个角色积累经验、教训、模式库，项目越做越聪明
- 📦 **共享交付物**：milestones, prd, architecture, tasks, reports 标准化管理
- 📂 **OpenSpec 归档**：每个变更完整生命周期可追溯

### OpenSpec 深度集成
- 🔄 **自动转换**：OPC OS 输出 → OpenSpec 规格，无缝衔接
- ✅ **可执行任务**：`tasks.md` 逐项打勾实现，不会遗漏
- 📐 **标准化工件**：proposal → specs → design → tasks，四件套标配
- ⏩ **命令透传**：`/opc` 和 `/opsx` 无缝切换

---

## 🚀 快速开始（3 步）

### 第 1 步：安装到 Claude Code

在 Claude Code 对话框输入：
```
/skills install https://github.com/Socks3389/One-Person-Company-Agent/tree/main/skills/one-person-company-os
```

或者本地安装：
```
/skills install C:/Users/Administrator/Desktop/One Person Company/skills/one-person-company-os
```

### 第 2 步：安装 OpenSpec CLI（推荐）

```bash
npm install -g @fission-ai/openspec@latest
```

验证安装：
```bash
openspec --version
```

### 第 3 步：开始你的第一个项目！

在 Claude Code 对话框输入：
```
/opc 做一个个人博客系统
```

就这么简单！剩下的自动化完成。

---

## 📖 完整使用教程

### 🎯 基础命令

| 命令 | 说明 | 示例 |
|------|------|------|
| `/opc <项目描述>` | 开始一个新项目 | `/opc 做一个Todo应用` |
| `/opc 状态` / `/opc status` | 查看当前项目状态 | `/opc status` |
| `/opc 继续` / `/opc continue` | 继续未完成的项目 | `/opc continue` |
| `/opc 交付物` | 列出所有交付物 | `/opc 交付物` |

### 🔧 OpenSpec 集成命令

| 命令 | 说明 | 何时用 |
|------|------|--------|
| `/opsx:propose <名称>` | 创建变更提案 | 需要新功能/修复时 |
| `/opsx:apply` | 按任务清单逐项实施 | 规格确认后开始编码 |
| `/opsx:verify` | 验证已完成的变更 | 代码写完后验证 |
| `/opsx:archive` | 归档已完成的变更 | 功能上线后归档 |

### 📝 完整工作流示例

```
┌─────────────────────────────────────────────────────────────┐
│  用户: /opc 做一个个人博客系统                                │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│  Claude: 🚀 One Person Company OS 启动                        │
│                                                                  │
│  让我先问你 3 个关键问题：                                      │
│  1. 目标用户是谁？（例如：程序员、博主、小企业）                 │
│  2. 核心价值是什么？（例如：写博客更快、管理客户更方便）         │
│  3. 期望多久上线？（例如：1周、2周、1个月）                      │
└─────────────────────────────────────────────────────────────┘
                          ↓
           用户回答：程序员，发布技术文章，1周上线
                          ↓
┌─────────────────────────────────────────────────────────────┐
│  ✅ CEO 商业决策完成                                          │
│  ✅ PRD 已自动生成 → .opc/memory/shared/prd/v1-prd.md       │
│  ✅ 架构设计已生成 → .opc/memory/shared/architecture/v1-arch.md│
│                                                                  │
│  💡 正在生成 OpenSpec 规格...                                    │
│  ✅ openspec init                                               │
│  ✅ /opsx:propose blog-v1                                       │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│  📦 OpenSpec 规格已生成！                                      │
│                                                                  │
│  openspec/changes/blog-v1/                                      │
│    ├── proposal.md    ← 动机和目标                              │
│    ├── specs/         ← 需求和场景                              │
│    ├── design.md      ← 技术方案                                │
│    └── tasks.md       ← 实施任务清单                            │
│                                                                  │
│  🎯 下一步：输入 /opsx:apply 开始按任务清单实现！                │
└─────────────────────────────────────────────────────────────┘
                          ↓
              用户: /opsx:apply
                          ↓
         按 tasks.md 逐项实现，直到完成
                          ↓
              完成后自动归档
                          ↓
         更新各角色私有记忆（经验沉淀）
                          ↓
                    🎉 项目完成！
```

---

## 📦 依赖说明

### 系统依赖

| 依赖 | 必须/可选 | 说明 |
|------|-----------|------|
| **Claude Code** | ✅ 必须 | Skill 运行环境 |
| **Git** | ✅ 必须 | 版本管理和变更追踪 |
| **Node.js 20+** | ⚠️ 推荐 | OpenSpec CLI 需要 |

### Node.js 依赖

| 依赖 | 必须/可选 | 版本 | 说明 |
|------|-----------|------|------|
| **@fission-ai/openspec** | ⚠️ 推荐 | latest | 规格驱动开发 CLI |
| **js-yaml** | ✅ 内置 | ^4.1.0 | YAML 解析（已内置到项目） |

> **js-yaml 已内置**在项目的 `node_modules/` 中，不需要额外安装。

### OpenSpec 深度依赖

```bash
# 安装（推荐）
npm install -g @fission-ai/openspec@latest

# 验证
openspec --version
openspec config profile  # 选择配置文件
```

> **没有安装 OpenSpec 也能用**：OPC OS 会自动生成兼容 OpenSpec 的目录结构，你可以后续再安装 CLI。

### Skill 内部角色依赖（自动加载）

每个角色激活时自动检查以下依赖：

| 角色 | 必须 Skill 依赖 | 必须 MCP 依赖 |
|------|----------------|---------------|
| **Founder-CEO** | superpowers/brainstorming, writing-plans | filesystem, git |
| **Product-PM** | superpowers/writing-plans, brainstorming, ui-ux-pro-max | filesystem |
| **Architect-TL** | superpowers/writing-plans, karpathy-guidelines | filesystem, git |
| **Web-FE** | ui-ux-pro-max, karpathy-guidelines, superpowers/tdd | filesystem, git, browser |
| **API-BE** | superpowers/tdd, karpathy-guidelines | filesystem, git |
| **Data-DBA** | karpathy-guidelines | filesystem, database |
| **Quality-QA** | superpowers/verification, tdd, ui-ux-pro-max | filesystem, browser |
| **Security-Sec** | karpathy-guidelines | filesystem, git, secrets |
| **Release-RM** | superpowers/finishing-branch, verification | filesystem, git |

> **所有依赖都是本地离线的**，在 `offline-dependencies/repos/` 目录下。不需要联网下载。

---

## 🏗️ 架构说明

### 7阶段工作流

```
阶段 0: 创意发起     → CEO 角色     → 商业简报、里程碑设定
阶段 1: 产品定义     → PM 角色      → PRD、用户故事、验收标准
阶段 2: 架构设计     → Architect    → 技术选型、模块边界、API 契约
阶段 3: 代码实现     → 工程师       → 代码、技术文档
阶段 4: 质量验证     → QA          → 测试报告、Bug 追踪
阶段 5: 安全审计     → Security    → 安全报告、风险评估
阶段 6: 发布上线     → Release-RM  → 发布记录、回滚预案
阶段 7: 复盘优化     → 全员        → 记忆更新、经验沉淀
```

### 记忆系统结构

```
.opc/memory/
├── founder-ceo/.memory-meta.json      # CEO 私有记忆（商业决策经验）
├── product-pm/.memory-meta.json       # PM 私有记忆（需求拆解经验）
├── architect-tl/.memory-meta.json     # 架构师私有记忆（技术选型经验）
├── web-fe/.memory-meta.json           # 前端私有记忆（组件库偏好、Bug 模式）
├── api-be/.memory-meta.json           # 后端私有记忆（API 设计、性能优化）
├── data-dba/.memory-meta.json         # DBA 私有记忆（Schema 设计、迁移经验）
├── quality-qa/.memory-meta.json       # QA 私有记忆（测试策略、Bug 模式库）
├── security-sec/.memory-meta.json     # 安全私有记忆（漏洞模式、审计经验）
├── release-rm/.memory-meta.json       # 发布经理私有记忆（发布流程、回滚经验）
└── shared/                             # 共享交付物
    ├── milestones/
    ├── prd/
    ├── architecture/
    ├── implementation-notes/
    ├── test-reports/
    ├── security-reports/
    └── release-records/
```

### OpenSpec 集成架构

```
OPC OS 阶段 0-2 (流程管控)
    ↓ CEO 简报 + PRD + 架构设计
    ↓ 自动转换
OpenSpec 规格层
    ├── proposal.md    ← 来自 CEO 简报
    ├── specs/         ← 来自 PRD
    ├── design.md      ← 来自架构设计
    └── tasks.md       ← 自动拆解的可执行任务
    ↓ /opsx:apply
按任务清单逐项实现
    ↓ 完成
/opsx:verify → /opsx:archive
    ↓
归档 + 更新 OPC OS 角色记忆
```

---

## 🔧 开发与调试

### 本地开发安装

```bash
# 克隆仓库
git clone https://github.com/Socks3389/One-Person-Company-Agent.git
cd One-Person-Company-Agent

# 安装依赖（如果需要修改 JS 脚本）
npm install

# 在 Claude Code 中本地安装 Skill
# /skills install /path/to/skills/one-person-company-os
```

### 目录结构

```
skills/one-person-company-os/
├── skill.json              # Skill 元数据 (Claude Code 识别)
├── SKILL.md               # 核心 Skill 逻辑（对话时加载）
├── README.md              # 本文件
├── INSTALL.md             # 安装指南
├── CLAUDE.md              # Claude Code 集成说明
│
├── agents/                 # 底层引擎
│   ├── deps/              # 9个角色的依赖清单 YAML
│   ├── role-activator.js  # 角色激活脚本
│   └── deliverable-manager.js # 交付物管理脚本
│
├── docs/                   # 文档
│   ├── WORKFLOW.md        # 完整工作流说明
│   ├── SIMPLIFICATION.md  # 极简设计理念
│   └── OPENSPEC-INTEGRATION.md # OpenSpec 集成方案
│
└── references/             # 参考文档
    ├── roles.md
    ├── organization.md
    ├── workflow.md
    ├── quality-score.md
    └── tech-stacks.md
```

### 调试技巧

1. **查看生成的文件**：检查 `.opc/memory/shared/` 目录
2. **查看交付物索引**：检查 `.opc/memory/shared/deliverables/index.yml`
3. **手动执行 JS 脚本**：
   ```bash
   node agents/role-activator.js check founder-ceo
   node agents/deliverable-manager.js list
   ```

---

## ❓ 常见问题

### Q: 必须安装 OpenSpec 吗？
A: 不必须。OPC OS 会自动生成兼容 OpenSpec 的目录结构。安装 CLI 后可以获得 `/opsx:*` 命令的完整能力。

### Q: 每个项目都会创建 `.opc/` 目录吗？
A: 是的。这是 OPC OS 的工作目录，包含所有角色记忆和交付物。建议加入 `.gitignore`（已内置到 Skill）。

### Q: 如何重置/清理项目状态？
A: 删除 `.opc/` 和 `openspec/` 目录即可。所有记忆和状态都存在这里。

### Q: 可以在已有项目中使用吗？
A: 可以！直接在项目根目录执行 `/opc` 命令即可，会自动适配已有项目。

### Q: 角色记忆会跨项目保留吗？
A: 目前是项目级别的。跨项目记忆同步是 roadmap 功能，敬请期待。

---

## 🗺️ Roadmap

- [ ] **跨项目记忆同步** - 经验在多个项目间复用
- [ ] **角色记忆可视化** - 查看每个角色的成长轨迹
- [ ] **质量报告仪表盘** - 可视化每个阶段的质量得分
- [ ] **CI/CD 集成** - 自动运行测试、安全扫描、部署
- [ ] **多项目管理** - 同时管理多个项目的进度

---

## 🤝 贡献

欢迎提交 Issue 和 PR！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/awesome-feature`)
3. 提交更改 (`git commit -m 'feat: add awesome feature'`)
4. 推送到分支 (`git push origin feature/awesome-feature`)
5. 开启 Pull Request

---

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件。

---

## 💡 设计哲学

> **好的流程管控应该像空气——无处不在，但你完全感觉不到它的存在。**

**因为信任所以简单**：
- 系统在后台默默地帮你把控质量、积累经验、维护流程
- 你只需要专注于写代码和做决策
- 所有复杂的机制都是隐形的，没有使用负担

---

**如果这个 Skill 对你有帮助，欢迎给个 ⭐ Star！**
