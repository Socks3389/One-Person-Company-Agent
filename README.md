# One Person Company Agent

> 🚀 一人公司操作系统 - AI 驱动的完整软件开发工作流

## 项目总览

这是一个为 **单人开发者** 设计的 **AI Agent 操作系统**。让你一个人就能像一个正规团队一样专业地做软件开发：

- ✅ 像 CEO 一样做商业决策
- ✅ 像 PM 一样写产品需求
- ✅ 像架构师一样做技术设计
- ✅ 像 QA 一样做质量保证
- ✅ 像安全工程师一样做风险评估
- ✅ 像运维专家一样做发布管理

**所有角色，一个人搞定！**

---

## 🌟 核心特性

| 特性 | 说明 |
|------|------|
| **7 阶段规范化流程** | 创意→产品→架构→实现→测试→安全→发布 |
| **9 个专业角色** | CEO/PM/Architect/FE/BE/DBA/QA/Security/Release |
| **独立记忆系统** | 每个角色积累经验，越用越聪明 |
| **OpenSpec 深度集成** | 规格驱动开发，任务逐项打勾完成 |
| **80 分质量门禁** | 低于标准自动卡壳，防止带病上线 |
| **零外部依赖** | 所有 Skill 依赖本地离线，不需要联网 |

---

## 🚀 快速开始

### 前置要求

- ✅ Claude Code (最新版)
- ✅ Git
- ✅ Node.js 20+ (推荐，用于 OpenSpec CLI)

### 1 分钟安装

在 Claude Code 对话框输入：
```
/skills install https://github.com/Socks3389/One-Person-Company-Agent/tree/main/skills/one-person-company-os
```

或者本地安装：
```
/skills install /path/to/your/skills/one-person-company-os
```

### 安装 OpenSpec CLI（推荐）

```bash
npm install -g @fission-ai/openspec@latest
```

### 开始你的第一个项目

```
/opc 做一个个人博客系统
```

就这么简单！

---

## 📂 项目结构

```
One-Person-Company-Agent/
├── skills/
│   └── one-person-company-os/          # 🌟 主 Skill 目录
│       ├── skill.json                   # Skill 元数据
│       ├── SKILL.md                    # Skill 核心逻辑
│       ├── README.md                   # 使用文档（你正在看的）
│       ├── INSTALL.md                  # 安装指南
│       ├── CLAUDE.md                   # Claude Code 集成说明
│       │
│       ├── agents/                      # 底层引擎
│       │   ├── deps/                   # 9 个角色的依赖清单
│       │   ├── role-activator.js       # 角色激活器
│       │   └── deliverable-manager.js  # 交付物管理器
│       │
│       ├── docs/                        # 文档
│       │   ├── WORKFLOW.md             # 完整工作流说明
│       │   ├── SIMPLIFICATION.md       # 极简设计理念
│       │   └── OPENSPEC-INTEGRATION.md # OpenSpec 集成方案
│       │
│       └── references/                  # 角色参考文档
│
├── offline-dependencies/                # 📦 所有依赖本地离线
│   ├── repos/skills/                    # Superpowers, UI-UX-Pro-Max, Karpathy
│   └── repos/mcp/                       # MCP 服务器
│
└── package.json                         # Node.js 依赖配置
```

---

## 📖 完整文档

| 文档 | 内容 |
|------|------|
| [Skill README](skills/one-person-company-os/README.md) | 完整使用教程、命令参考、依赖说明 |
| [INSTALL.md](skills/one-person-company-os/INSTALL.md) | 详细安装指南 |
| [WORKFLOW.md](skills/one-person-company-os/docs/WORKFLOW.md) | 7 阶段工作流详解 |
| [OPENSPEC-INTEGRATION.md](skills/one-person-company-os/docs/OPENSPEC-INTEGRATION.md) | OpenSpec 集成方案 |
| [SIMPLIFICATION.md](skills/one-person-company-os/docs/SIMPLIFICATION.md) | 极简设计理念 |

---

## 🎯 命令速查

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

---

## 📦 依赖说明

### 系统依赖

| 依赖 | 必须/可选 | 说明 |
|------|-----------|------|
| Claude Code | ✅ 必须 | Skill 运行环境 |
| Git | ✅ 必须 | 版本管理 |
| Node.js 20+ | ⚠️ 推荐 | OpenSpec CLI 需要 |

### 内置离线依赖（不需要联网下载）

| 依赖 | 用途 | 位置 |
|------|------|------|
| **Superpowers** | Brainstorming, TDD, 调试, 代码审查 | `offline-dependencies/repos/skills/superpowers` |
| **UI-UX-Pro-Max** | UI/UX 设计智能, 设计系统, 无障碍 | `offline-dependencies/repos/skills/ui-ux-pro-max-skill` |
| **Karpathy Guidelines** | 简单化, 最小增量, 可验证目标 | `offline-dependencies/repos/skills/andrej-karpathy-skills` |
| **MCP Servers** | Filesystem, Git, Browser, Database, Redis | `offline-dependencies/repos/mcp/` |

### Node.js 依赖

| 依赖 | 版本 | 说明 |
|------|------|------|
| js-yaml | ^4.1.0 | YAML 解析（已内置） |

---

## 🤔 为什么做这个？

单人开发者的痛点：
- 😫 一个人要考虑所有事情，容易遗漏
- 😫 没有流程约束，容易野路子开发
- 😫 经验没法沉淀，下次还是踩同样的坑
- 😫 没有 Code Review，Bug 到线上才发现
- 😫 没有安全审计，上线了才发现漏洞

**One Person Company OS 就是你的虚拟团队：**
- 每个角色帮你把好对应关卡
- 每个决策都有记录，下次不踩同样的坑
- 流程是隐形的，不会增加你的负担
- 所有经验都在记忆里，越用越聪明

---

## 🏗️ 架构设计理念

### 顶层设计
- **OPC OS 负责流程管控** - 7 阶段推进，质量门禁
- **OpenSpec 负责规格驱动** - 需求→设计→任务，可执行可追踪
- **角色隔离保证专业性** - 每个角色有自己的视角和知识体系

### 底层逻辑
- **记忆系统实现经验积累** - 不会在同一个地方摔倒两次
- **交付物签收保证质量** - 每个阶段输出都有确认
- **自动化减少认知负担** - 复杂机制后台跑，用户只做决策

### 抓手
- 一条命令 `/opc` 启动，零学习成本
- 每个阶段最多问 3 个问题，不啰嗦
- 所有产物落地到文件系统，透明可见

### 闭环
- 创意 → 规格 → 实现 → 验证 → 归档 → 经验沉淀 → 下一个项目
- 完整闭环，每个项目都让你的虚拟团队更强

---

## 🗺️ Roadmap

- [ ] **v1.1** - 跨项目记忆同步
- [ ] **v1.2** - 质量报告可视化
- [ ] **v1.3** - CI/CD 自动集成
- [ ] **v2.0** - 多项目并行管理
- [ ] **v2.1** - 团队协作模式（多人使用同步状态）

---

## 🤝 贡献

欢迎各种形式的贡献！
- 🐛 提交 Bug Issue
- 💡 提出新功能建议
- 📖 改进文档
- 🔧 提交 PR

---

## 📄 许可证

MIT License

---

## ⭐ 支持

如果这个项目对你有帮助，欢迎给个 Star！

有问题？欢迎提 Issue。

---

**一个人，也要像一支队伍一样正规作战！ 🚀**
