# CLAUDE.md - One Person Company OS

这是一个 Claude Code Skill，用户在对话中输入 `/opc` 即可使用。

## Skill 加载方式

当用户输入 `/opc` 时，Claude Code 自动加载 `SKILL.md` 并按照其中的流程执行。

## 工作原理

1. **对话式交互**：所有操作都在对话中完成，用户不需要敲命令行
2. **文件系统持久化**：所有交付物、记忆、状态都保存在 `.opc/` 目录
3. **自动推进**：每个阶段完成后自动进入下一阶段，不需要用户手动推进

## 目录结构

```
skills/one-person-company-os/
├── skill.json           # Skill 元数据（name, displayName, command）
├── SKILL.md            # 核心 Skill 逻辑，用户输入 /opc 时加载
├── CLAUDE.md           # 本文件，告诉 Claude Code 如何处理这个 Skill
│
├── agents/
│   ├── deps/           # 每个角色的依赖清单
│   │   ├── founder-ceo.deps.yml
│   │   ├── product-pm.deps.yml
│   │   ├── architect-tl.deps.yml
│   │   ├── web-fe.deps.yml
│   │   ├── api-be.deps.yml
│   │   ├── data-dba.deps.yml
│   │   ├── quality-qa.deps.yml
│   │   ├── security-sec.deps.yml
│   │   └── release-rm.deps.yml
│   ├── memory-system-spec.md    # 记忆系统规范
│   ├── deliverable-protocol.md  # 交付物协议规范
│   ├── deliverable-manager.js   # 交付物管理脚本（供 Skill 调用）
│   └── role-activator.js        # 角色激活脚本（供 Skill 调用）
│
├── docs/                # 文档目录
│   ├── WORKFLOW.md      # 完整工作流梳理
│   └── SIMPLIFICATION.md # 极简设计理念
│
└── README.md            # 用户使用说明
```

## Claude Code 中的使用方式

用户在 Claude Code 对话中：

```
用户: /opc 做一个博客系统

Claude: 🚀 启动 One Person Company OS - 博客系统项目
        让我先问你 3 个关键问题：
        1. 目标用户是谁？（例如：程序员、博主、小企业）
        2. 核心价值是什么？（例如：写博客更快、管理客户更方便）
        3. 期望多久上线？（例如：1周、2周、1个月）

用户: 程序员，写技术博客，1周上线

Claude: ✅ CEO 商业决策完成！
        正在生成 PRD...
        ✅ PRD 已自动生成并保存到 .opc/memory/shared/prd/v1-prd.md
        ...
```

## 关键集成点

### 1. 调用交付物管理器

当需要创建交付物时，执行：

```javascript
// 可以通过系统调用执行
node agents/deliverable-manager.js create --type prd --from_role product-pm ...
```

或者直接写文件到：`.opc/memory/shared/deliverables/`

### 2. 激活角色

当需要切换角色视角时：

```javascript
node agents/role-activator.js activate founder-ceo
```

或者直接读取该角色的依赖清单和私有记忆，切换到该角色的视角回答。

### 3. 状态持久化

项目状态保存在：`.opc/current-project.json`

结构：
```json
{
  "id": "proj-xxx",
  "idea": "博客系统",
  "current_stage": 2,
  "target_user": "程序员",
  "core_value": "写技术博客",
  "deadline": "1周",
  "stages": [
    { "stage": 0, "name": "CEO 商业决策", "status": "done" },
    { "stage": 1, "name": "PM 产品定义", "status": "done" }
  ],
  "deliverables": {
    "milestone": "deliv-xxx",
    "prd": "deliv-xxx",
    "architecture": "deliv-xxx"
  }
}
```

## 开发调试

在 Claude Code 中测试：
1. 安装 Skill：`/skills install skills/one-person-company-os`
2. 运行：`/opc 测试项目`
3. 查看生成的 `.opc/` 目录

## 设计理念

> **用户只需要说一句话，剩下的全自动化。**

- 不要让用户记命令
- 不要让用户感知流程的繁琐
- 不要让用户手动管理交付物
- 只在需要决策时才问用户

**因为信任所以简单！**
