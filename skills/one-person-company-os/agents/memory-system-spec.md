# ============================================================
# ONE PERSON COMPANY OS - 独立记忆系统规范 V2.0
# ============================================================

## 设计原则

1. **角色隔离原则：每个角色的私有记忆只有该角色可以读写
2. **最小知道原则：每个角色只能访问完成其工作所必需的记忆
3. **交付物通信原则：角色之间只能通过显式交付物通信，不能直接读对方的私有记忆
4. **记忆分层原则：记忆分为私有记忆、共享记忆、交付物记忆三层

## 目录结构

```
.opc/memory/
├── README.md                          # 本文件
├── .access-control.yml              # 访问控制列表（ACL）
│
├── shared/                              # 共享记忆 - 所有角色可读
│   ├── prd/                            # 产品需求文档（PM 写，所有人读）
│   ├── architecture/                 # 架构决策记录（架构师写，所有人读）
│   ├── task-plan/                      # 任务计划（PM/架构师写，所有人读）
│   ├── test-reports/                   # 测试报告（QA 写，所有人读）
│   ├── security-reports/              # 安全报告（安全写，所有人读）
│   ├── release-records/             # 发布记录（发布经理写，所有人读）
│   ├── design-system/               # 设计系统（设计师写，所有人读）
│   ├── implementation-notes/        # 实现笔记（工程师写，所有人读）
│   ├── api-docs/                     # API 文档（后端写，所有人读）
│   ├── migration-plans/              # 迁移计划（DBA 写，所有人读）
│   ├── schema-docs/                 # Schema 文档（DBA 写，所有人读）
│   ├── bug-reports/                   # Bug 报告（QA 写，所有人读）
│   ├── risk-assessments/             # 风险评估（安全写，所有人读）
│   └── milestones/                    # 里程碑（CEO 写，所有人读）
│
├── founder-ceo/                    # CEO 私有记忆 - 仅 CEO 可读写
│   ├── business-decisions.json      # 业务决策记录
│   ├── tradeoffs.md               # 取舍权衡记录
│   ├── user-needs.md              # 用户需求洞察
│   ├── release-history.json       # 发布历史
│   ├── risk-register.md          # 风险登记册
│   └── .memory-meta.json        # 记忆元数据
│
├── product-pm/                     # PM 私有记忆 - 仅 PM 可读写
│   ├── user-personas.json        # 用户画像库
│   ├── rejected-ideas.md          # 被否决的想法及原因
│   ├── scope-creep-log.md       # 范围蔓延记录
│   ├── acceptance-patterns.json  # 验收条件模式库
│   ├── user-research.md         # 用户调研笔记
│   └── .memory-meta.json        # 记忆元数据
│
├── architect-tl/                   # 架构师私有记忆 - 仅架构师可读写
│   ├── tech-stack-history.json # 技术选型历史
│   ├── rejected-architectures.md   # 被否决的架构方案
│   ├── risk-register.md          # 技术风险登记册
│   ├── performance-notes.md    # 性能优化经验
│   ├── tech-debt-log.md         # 技术债务记录
│   └── .memory-meta.json        # 记忆元数据
│
├── design-ux/                      # 设计师私有记忆 - 仅设计师可读写
│   ├── design-patterns.json    # 设计模式库
│   ├── rejected-designs.md       # 被否决的设计方案
│   ├── accessibility-notes.md   # 无障碍实现经验
│   ├── color-palettes.json    # 配色方案库
│   └── .memory-meta.json        # 记忆元数据
│
├── web-fe/                         # 前端工程师私有记忆 - 仅前端可读写
│   ├── component-library.json   # 组件库偏好和使用经验
│   ├── ui-patterns.md          # UI 模式库
│   ├── bug-patterns.md          # 常见 Bug 模式库
│   ├── performance-notes.md    # 前端性能优化经验
│   ├── accessibility-notes.md   # 无障碍实现经验
│   └── .memory-meta.json        # 记忆元数据
│
├── api-be/                         # 后端工程师私有记忆 - 仅后端可读写
│   ├── api-patterns.json        # API 设计模式库
│   ├── bug-patterns.md          # 常见 Bug 模式库
│   ├── performance-notes.md    # 后端性能优化经验
│   ├── auth-patterns.md        # 认证授权实现经验
│   ├── migration-notes.md     # 数据库迁移经验
│   └── .memory-meta.json        # 记忆元数据
│
├── data-dba/                       # DBA 私有记忆 - 仅 DBA 可读写
│   ├── schema-history.json     # Schema 变更历史
│   ├── migration-failures.md  # 迁移失败记录和解决方案
│   ├── index-patterns.md      # 索引设计模式库
│   ├── performance-notes.md    # 数据库性能优化经验
│   ├── backup-notes.md       # 备份恢复经验
│   └── .memory-meta.json        # 记忆元数据
│
├── platform-sre/                   # SRE 私有记忆 - 仅 SRE 可读写
│   ├── environment-configs.json # 环境配置记录
│   ├── incident-history.md    # 事件响应历史
│   ├── monitoring-patterns.md  # 监控模式库
│   ├── alert-rules.md         # 告警规则库
│   └── .memory-meta.json        # 记忆元数据
│
├── release-rm/                     # 发布经理私有记忆 - 仅发布经理可读写
│   ├── release-history.json    # 发布历史
│   ├── rollback-cases.md     # 回滚案例和原因
│   ├── release-checklist.md  # 发布检查清单
│   ├── deployment-patterns.md # 部署模式库
│   ├── incident-notes.md    # 发布事故记录
│   └── .memory-meta.json        # 记忆元数据
│
├── quality-qa/                     # QA 私有记忆 - 仅 QA 可读写
│   ├── test-strategies.json     # 测试策略库
│   ├── bug-patterns.md          # Bug 模式库和复现步骤
│   ├── edge-cases.md          # 边界用例库
│   ├── regression-checklist.md # 回归测试检查清单
│   ├── browser-compat.md      # 浏览器兼容性测试经验
│   └── .memory-meta.json        # 记忆元数据
│
├── review-cr/                      # Code Reviewer 私有记忆 - 仅 CR 可读写
│   ├── review-patterns.json    # 代码审查模式库
│   ├── code-smells.md         # 代码坏味道识别经验
│   ├── review-checklist.md   # 审查检查清单
│   └── .memory-meta.json        # 记忆元数据
│
├── security-sec/                   # 安全工程师私有记忆 - 仅安全可读写
│   ├── vulnerability-patterns.json # 漏洞模式库和修复方案
│   ├── audit-history.md       # 安全审计历史
│   ├── security-decisions.md    # 安全决策记录
│   ├── incident-playbook.md  # 安全事件响应手册
│   ├── dependency-scan-history.md # 依赖扫描历史
│   └── .memory-meta.json        # 记忆元数据
│
├── docs-ops/                       # 文档运营私有记忆 - 仅文档运营可读写
│   ├── doc-templates.json     # 文档模板库
│   ├── doc-quality.md        # 文档质量标准
│   └── .memory-meta.json        # 记忆元数据
│
└── client-xp/                      # 客户端工程师私有记忆 - 仅客户端可读写
    ├── platform-patterns.json  # 平台特定模式库
    ├── native-ux-notes.md     # 原生 UX 经验
    ├── packaging-notes.md    # 打包发布经验
    └── .memory-meta.json        # 记忆元数据
```

## 访问控制列表（ACL）

```yaml
# .opc/memory/.access-control.yml
version: "2.0"

roles:
  founder-ceo:
    private_read: ["founder-ceo"]
    private_write: ["founder-ceo"]
    shared_read: ["*"]
    shared_write: ["release-records", "milestones", "risk-assessments"]
  
  product-pm:
    private_read: ["product-pm"]
    private_write: ["product-pm"]
    shared_read: ["*"]
    shared_write: ["prd", "task-plan", "user-stories"]
  
  architect-tl:
    private_read: ["architect-tl"]
    private_write: ["architect-tl"]
    shared_read: ["*"]
    shared_write: ["architecture", "task-plan"]
  
  design-ux:
    private_read: ["design-ux"]
    private_write: ["design-ux"]
    shared_read: ["*"]
    shared_write: ["design-system"]
  
  web-fe:
    private_read: ["web-fe"]
    private_write: ["web-fe"]
    shared_read: ["prd", "architecture", "task-plan", "design-system"]
    shared_write: ["implementation-notes"]
  
  api-be:
    private_read: ["api-be"]
    private_write: ["api-be"]
    shared_read: ["prd", "architecture", "task-plan"]
    shared_write: ["implementation-notes", "api-docs"]
  
  data-dba:
    private_read: ["data-dba"]
    private_write: ["data-dba"]
    shared_read: ["architecture", "migration-plans", "schema-docs"]
    shared_write: ["migration-plans", "schema-docs"]
  
  platform-sre:
    private_read: ["platform-sre"]
    private_write: ["platform-sre"]
    shared_read: ["release-records", "test-reports"]
    shared_write: ["implementation-notes"]
  
  release-rm:
    private_read: ["release-rm"]
    private_write: ["release-rm"]
    shared_read: ["test-reports", "security-reports", "release-records"]
    shared_write: ["release-records"]
  
  quality-qa:
    private_read: ["quality-qa"]
    private_write: ["quality-qa"]
    shared_read: ["prd", "architecture", "task-plan", "test-reports"]
    shared_write: ["test-reports", "bug-reports"]
  
  review-cr:
    private_read: ["review-cr"]
    private_write: ["review-cr"]
    shared_read: ["architecture", "implementation-notes"]
    shared_write: []
  
  security-sec:
    private_read: ["security-sec"]
    private_write: ["security-sec"]
    shared_read: ["architecture", "release-records", "security-reports"]
    shared_write: ["security-reports", "risk-assessments"]
  
  docs-ops:
    private_read: ["docs-ops"]
    private_write: ["docs-ops"]
    shared_read: ["*"]
    shared_write: ["implementation-notes", "api-docs", "schema-docs"]
  
  client-xp:
    private_read: ["client-xp"]
    private_write: ["client-xp"]
    shared_read: ["prd", "architecture", "task-plan", "design-system"]
    shared_write: ["implementation-notes"]
```

## 记忆元数据规范

每个角色的私有记忆目录下都有 `.memory-meta.json`：

```json
{
  "version": "1.0",
  "role": "founder-ceo",
  "created_at": "2026-06-16T10:00:00Z",
  "last_accessed": "2026-06-16T18:30:00Z",
  "last_modified": "2026-06-16T18:30:00Z",
  "access_count": 42,
  "memory_size_bytes": 16384,
  "entities": {
    "business-decisions": {
      "count": 12,
      "last_updated": "2026-06-16T18:30:00Z"
    }
  }
}
```

## 记忆读写接口规范

### 读取记忆

```typescript
function readMemory(
  role: string,
  memoryType: "private" | "shared",
  path: string
): MemoryResult {
  // 1. 检查访问权限
  if (!hasAccess(role, memoryType, path, "read")) {
    throw new AccessDeniedError(
      `角色 ${role} 没有读取 ${memoryType}:${path} 的权限`
    );
  }
  
  // 2. 读取记忆内容
  const content = readFileSafely(path);
  
  // 3. 更新访问统计
  updateAccessStats(role, memoryType, path);
  
  return { content, metadata: getMetadata(path) };
}
```

### 写入记忆

```typescript
function writeMemory(
  role: string,
  memoryType: "private" | "shared",
  path: string,
  content: string
): WriteResult {
  // 1. 检查访问权限
  if (!hasAccess(role, memoryType, path, "write")) {
    throw new AccessDeniedError(
      `角色 ${role} 没有写入 ${memoryType}:${path} 的权限`
    );
  }
  
  // 2. 写入前备份
  backupIfExists(path);
  
  // 3. 写入记忆内容
  writeFileSafely(path, content);
  
  // 4. 更新修改统计
  updateModifyStats(role, memoryType, path);
  
  return { success: true, backupPath: getBackupPath(path) };
}
```

## 记忆 TTL 和清理策略

1. **私有记忆：365 天自动归档，可手动恢复
2. **共享记忆：永久保存，除非显式删除
3. **归档记忆：移至 `.opc/memory/.archive/` 目录
4. **备份保留：每次写入自动保留最近 5 个版本

## 记忆导入导出

支持在同角色不同项目间导入导出记忆：

```bash
# 导出 PM 的私有记忆
opc memory export product-pm --output pm-memory.zip

# 导入到新项目
opc memory import product-pm --input pm-memory.zip
```

---

**这不是 "功能"，这是架构的基石。有了独立记忆，每个角色才是真正的 "独立员工"，而不是同一个人在扮演不同角色。
