# 安装指南

## 在 Claude Code 中安装

### 方法 1：本地安装（推荐）

在 Claude Code 对话中：

```
/skills install C:/Users/Administrator/Desktop/One Person Company/skills/one-person-company-os
```

### 方法 2：创建符号链接

Windows (管理员):
```cmd
mklink /D "%USERPROFILE%\.claude\skills\one-person-company-os" "C:\Users\Administrator\Desktop\One Person Company\skills\one-person-company-os"
```

Linux/Mac:
```bash
ln -s "/path/to/skills/one-person-company-os" ~/.claude/skills/
```

## 使用方法

安装完成后，在 Claude Code 对话中：

### 开始新项目

```
/opc 做一个个人博客系统
```

回答 3 个问题后，系统自动：
- ✅ 生成商业简报
- ✅ 生成 PRD
- ✅ 生成架构设计
- ✅ 保存所有文档到 `.opc/` 目录

### 查看状态

```
/opc 状态
```

### 继续项目

```
/opc 继续
```

## 验证安装

输入：
```
/skills list
```

应该能看到 `one-person-company-os` 在列表中。

## 卸载

```
/skills uninstall one-person-company-os
```

---

## 项目结构预览

运行后自动创建：

```
你的项目根目录/
└── .opc/
    ├── current-project.json    # 项目状态
    └── memory/
        ├── founder-ceo/        # CEO 私有记忆
        ├── product-pm/         # PM 私有记忆
        ├── architect-tl/       # 架构师私有记忆
        ├── ...                 # 其他角色
        └── shared/             # 共享交付物
            ├── prd/v1-prd.md
            ├── architecture/v1-arch.md
            └── ...
```
