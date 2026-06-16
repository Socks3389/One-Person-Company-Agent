# ✅ 安装验证指南（已验证）

## 验证状态：✅ 安装成功

> 2026-06-16 - One Person Company OS Skill 已成功安装到 Claude Code 并验证可用

---

## 🚀 快速安装（30秒完成）

### 方法一：本地路径安装（最可靠）

在 Claude Code 对话框输入：
```
/skills install C:/Users/Administrator/Desktop/One Person Company/skills/one-person-company-os
```

### 方法二：Git 克隆 + 本地安装

```bash
# 1. 克隆仓库
git clone https://github.com/Socks3389/One-Person-Company-Agent.git
cd One-Person-Company-Agent

# 2. 在 Claude Code 中安装
/skills install /absolute/path/to/skills/one-person-company-os
```

### 方法三：手动复制到 Claude Skills 目录

Windows:
```bash
# 复制到 Claude Code Skills 目录
xcopy "skills\one-person-company-os" "%USERPROFILE%\.claude\skills\one-person-company-os\" /E /I
```

Linux/Mac:
```bash
cp -r skills/one-person-company-os ~/.claude/skills/
```

---

## ✅ 验证安装

### 1. 查看已安装的 Skills

在 Claude Code 对话框：
```
/skills list
```

预期输出：
```
✅ one-person-company-os - 一人公司操作系统 - AI驱动的完整软件开发工作流
```

### 2. 验证 OPC OS 命令

```
/opc 状态
```

或者直接开始项目：
```
/opc 做一个博客系统
```

### 3. 验证 OpenSpec CLI（可选）

```bash
openspec --version
```

---

## 📦 完整安装检查清单

安装后确认以下各项：

| 检查项 | 状态 |
|--------|------|
| Skill 目录存在于 `~/.claude/skills/one-person-company-os` | ✅ |
| `skill.json` 文件存在且格式正确 | ✅ |
| `SKILL.md` 文件存在 | ✅ |
| `/skills list` 能看到 one-person-company-os | ✅ |
| `/opc 状态` 命令能正常响应 | ✅ |
| （可选）`openspec --version` 能输出版本号 | ✅ |

---

## 🔧 目录结构验证

```
~/.claude/skills/one-person-company-os/
├── skill.json              # ✅ Skill 元数据
├── SKILL.md               # ✅ 核心逻辑（Claude 加载）
├── README.md              # ✅ 使用文档
├── INSTALL.md             # ✅ 安装指南
├── CLAUDE.md             # Claude Code 集成说明
│
├── agents/                # ✅ 底层引擎
│   ├── deps/             # 9 个角色依赖清单
│   ├── role-activator.js
│   └── deliverable-manager.js
│
├── docs/                  # ✅ 文档
│   ├── WORKFLOW.md
│   ├── SIMPLIFICATION.md
│   └── OPENSPEC-INTEGRATION.md
│
└── references/            # ✅ 角色参考文档
```

---

## ❓ 安装排错指南

### 问题 1：/skills install 没反应

**原因**：路径解析问题
**解决**：用本地绝对路径重新安装
```
/skills install C:/Users/YourName/path/to/skills/one-person-company-os
```

### 问题 2：提示 "Skill not found"

**原因**：目录不对
**解决**：确认路径指向包含 `skill.json` 的目录

### 问题 3：安装了但命令没反应

**原因**：需要 reload Skill
**解决**：
```
/skills reload one-person-company-os
```

或者重启 Claude Code

### 问题 4：OpenSpec 命令不可用

**原因**：没安装 OpenSpec CLI
**解决**：
```bash
npm install -g @fission-ai/openspec@latest
openspec --version
```

---

## 🎯 安装后立即开始

安装成功后，直接在 Claude Code 中：

```
/opc 做一个 Todo 待办应用
```

然后：
1. 回答 3 个问题（目标用户、核心价值、上线时间）
2. 系统自动生成 CEO 简报 → PRD → 架构设计
3. 自动生成 OpenSpec 规格（proposal + specs + design + tasks）
4. 输入 `/opsx:apply` 开始逐项实现

---

## 📚 相关文档

- [完整使用教程](../skills/one-person-company-os/README.md)
- [详细安装指南](../skills/one-person-company-os/INSTALL.md)
- [7阶段工作流](../skills/one-person-company-os/docs/WORKFLOW.md)
- [OpenSpec 集成方案](../skills/one-person-company-os/docs/OPENSPEC-INTEGRATION.md)

---

## 🆘 获得帮助

- 📖 查看 README.md
- 🐛 提交 GitHub Issue
- 💡 查看 docs/ 目录下的详细文档

---

## ✨ 安装成功！

现在你拥有了：
- 🚀 7阶段规范化开发流程
- 👤 9个专业角色的虚拟团队
- 🧠 项目经验自动积累的记忆系统
- ✅ 质量门禁和交付物管控
- 📦 OpenSpec 规格驱动开发能力

**一个人，也要像一支队伍一样正规作战！** 🎉
