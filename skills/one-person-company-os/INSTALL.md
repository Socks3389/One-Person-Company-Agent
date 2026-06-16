# 安装指南

## 目录

- [快速安装](#快速安装)
- [详细安装步骤](#详细安装步骤)
- [OpenSpec CLI 安装](#openspec-cli-安装推荐)
- [本地开发安装](#本地开发安装)
- [验证安装](#验证安装)
- [常见问题](#常见问题)

---

## 快速安装（30 秒）

### 第 1 步：在 Claude Code 中安装 Skill

在 Claude Code 对话框直接输入：
```
/skills install https://github.com/Socks3389/One-Person-Company-Agent/tree/main/skills/one-person-company-os
```

### 第 2 步：验证安装

```
/opc 状态
```

如果能看到状态输出，说明安装成功！

---

## 详细安装步骤

### 方式一：通过 GitHub 远程安装（推荐）

1. 打开 Claude Code
2. 在对话框输入：
   ```
   /skills install https://github.com/Socks3389/One-Person-Company-Agent/tree/main/skills/one-person-company-os
   ```
3. 等待安装完成
4. 运行 `/opc 状态` 验证

### 方式二：本地安装（开发用）

1. 克隆仓库：
   ```bash
   git clone https://github.com/Socks3389/One-Person-Company-Agent.git
   cd One-Person-Company-Agent
   ```

2. 在 Claude Code 对话框输入：
   ```
   /skills install /path/to/your/One-Person-Company-Agent/skills/one-person-company-os
   ```

   Windows 示例：
   ```
   /skills install C:/Users/Administrator/Desktop/One Person Company/skills/one-person-company-os
   ```

3. 运行 `/opc 状态` 验证

### 方式三：符号链接（高级用户）

创建符号链接到 Claude Code 的 skills 目录，方便开发时实时更新：

**Windows（管理员权限）：**
```cmd
mklink /D "%USERPROFILE%\.claude\skills\one-person-company-os" "C:\path\to\skills\one-person-company-os"
```

**Linux/Mac：**
```bash
ln -s /path/to/skills/one-person-company-os ~/.claude/skills/
```

---

## OpenSpec CLI 安装（推荐）

OpenSpec CLI 提供完整的规格驱动开发能力，推荐安装：

### 前置要求
- Node.js 20.0.0 或更高版本

### 安装

```bash
npm install -g @fission-ai/openspec@latest
```

### 验证安装

```bash
openspec --version
```

### 初始化配置

```bash
# 查看可用配置
openspec config profile

# 选择配置（选择默认即可）
openspec update
```

### 验证 OpenSpec 功能

在任意目录测试：
```bash
openspec init
```

如果成功创建了 `openspec/` 目录，说明安装成功。

---

## 本地开发安装

如果你想开发或修改 Skill：

### 1. 克隆仓库

```bash
git clone https://github.com/Socks3389/One-Person-Company-Agent.git
cd One-Person-Company-Agent
```

### 2. 安装 Node.js 依赖（可选）

只有在需要修改 JS 脚本时才需要安装：
```bash
npm install
```

### 3. 本地安装到 Claude Code

在 Claude Code 对话框：
```
/skills install /absolute/path/to/skills/one-person-company-os
```

### 4. 修改代码后重新加载

修改 `SKILL.md` 或其他文件后，重新加载 Skill：
```
/skills reload one-person-company-os
```

---

## 验证安装

### 1. 验证 Skill 安装

在 Claude Code 对话框：
```
/skills list
```

应该能看到 `one-person-company-os` 在列表中。

### 2. 验证 OPC OS 功能

```
/opc 状态
```

应该能看到状态输出（第一次运行会显示没有活跃项目）。

### 3. 验证 OpenSpec 集成

```bash
openspec --version
```

应该能看到版本号输出。

### 4. 完整功能测试

```
/opc 做一个测试项目
```

回答 3 个问题后，应该能看到：
- ✅ CEO 商业决策完成
- ✅ PRD 自动生成
- ✅ 架构设计自动生成
- ✅ OpenSpec 规格自动生成

然后查看生成的文件：
```bash
ls .opc/memory/shared/
ls openspec/changes/
```

---

## 目录结构说明

安装后，你的项目中会自动创建以下目录：

```
你的项目/
├── .opc/                           # OPC OS 工作目录（自动创建）
│   ├── current-project.json       # 当前项目状态
│   └── memory/
│       ├── founder-ceo/.memory-meta.json
│       ├── product-pm/.memory-meta.json
│       ├── architect-tl/.memory-meta.json
│       ├── ...                    # 其他角色
│       └── shared/
│           ├── prd/v1-prd.md
│           ├── architecture/v1-arch.md
│           └── deliverables/
│
└── openspec/                       # OpenSpec 规格目录（自动创建）
    ├── changes/
    │   └── project-v1/
    │       ├── proposal.md
    │       ├── specs/
    │       ├── design.md
    │       └── tasks.md
    └── archive/
```

> 💡 **建议**：把 `.opc/` 和 `openspec/` 加入你的 `.gitignore`，这些是项目级别的工作目录。

---

## 常见问题

### Q: 安装时提示 "Skill not found"？

A: 检查路径是否正确，确保路径指向的是包含 `skill.json` 的目录。

### Q: 必须安装 OpenSpec CLI 吗？

A: 不必须。即使不安装，OPC OS 也会：
- 自动生成兼容 OpenSpec 的目录结构
- 生成所有规格文件（proposal, specs, design, tasks）
- 支持基本的流程推进

安装 CLI 后可以获得：
- `/opsx:*` 系列命令的完整能力
- 更强大的规格管理
- 变更归档功能
- 多项目切换

### Q: 如何卸载 Skill？

```
/skills uninstall one-person-company-os
```

### Q: 如何更新到最新版本？

```
/skills uninstall one-person-company-os
/skills install <GitHub URL 或本地路径>
```

或者如果是 Git 仓库：
```bash
git pull
# 然后在 Claude Code 中 reload
/skills reload one-person-company-os
```

### Q: 为什么克隆的仓库中 offline-dependencies/ 下的目录是空的？

A: 这些是 Git 子模块。运行：
```bash
git submodule update --init --recursive
```

或者直接使用发布包，发布包中已经包含所有依赖文件。

### Q: 如何清理项目状态重新开始？

```bash
# 删除工作目录即可
rm -rf .opc/ openspec/
```

### Q: 可以在已有项目中使用吗？

A: 完全可以！直接在已有项目根目录运行 `/opc` 命令即可，系统会自动适配已有项目。

---

## 安装检查清单

安装完成后，确认以下各项：

- [ ] `/skills list` 能看到 `one-person-company-os`
- [ ] `/opc 状态` 能正常输出
- [ ] （可选）`openspec --version` 能输出版本号
- [ ] （可选）测试 `/opc 做一个测试项目` 能正常推进流程

---

## 获得帮助

- 📖 查看 [README.md](README.md) - 完整使用教程
- 🐛 提交 [GitHub Issue](https://github.com/Socks3389/One-Person-Company-Agent/issues)
- 💡 查看 [docs/](docs/) 目录下的详细文档

---

## ✅ 安装完成！

现在你可以开始你的第一个项目了：
```
/opc 做一个博客系统
```

**祝你编码愉快！ 🚀**
