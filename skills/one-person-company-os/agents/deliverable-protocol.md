# ============================================================
# ONE PERSON COMPANY OS - 角色间交付物通信协议
# ============================================================

## 设计原则

1. **显式通信原则**：角色之间不能直接读对方的私有记忆，只能通过交付物传递信息
2. **签收确认原则**：每个交付物必须被接收方显式签收，才能进入下一阶段
3. **版本控制原则**：每个交付物有明确的版本号，支持回滚和变更追踪
4. **审计追踪原则**：所有交付物的创建、修改、签收、拒绝都有完整的日志

## 交付物类型定义

| 类型 | 创建角色 | 接收角色 | 说明 |
|------|----------|----------|------|
| `prd` | Product-PM | Architect-TL, Design-UX, Founder-CEO | 产品需求文档 |
| `architecture` | Architect-TL | Web-FE, API-BE, Data-DBA, Founder-CEO | 架构设计文档 |
| `design-system` | Design-UX | Web-FE, Product-PM | 设计系统规范 |
| `task-plan` | Architect-TL + Product-PM | 所有工程师 | 任务分解计划 |
| `implementation-note` | Web-FE / API-BE | QA, Security-Sec | 实现说明文档 |
| `test-report` | Quality-QA | Release-RM, Founder-CEO | 测试报告 |
| `security-report` | Security-Sec | Release-RM, Founder-CEO | 安全审计报告 |
| `release-record` | Release-RM | 所有角色 | 发布记录 |
| `api-docs` | API-BE | Web-FE, QA | API 文档 |
| `migration-plan` | Data-DBA | Architect-TL, Security-Sec | 数据库迁移计划 |
| `schema-docs` | Data-DBA | API-BE, QA | 数据库 Schema 文档 |
| `bug-report` | Quality-QA | Web-FE / API-BE | Bug 报告 |
| `risk-assessment` | Security-Sec | Founder-CEO | 风险评估报告 |
| `milestone` | Founder-CEO | 所有角色 | 里程碑设定 |

## 交付物数据结构

```typescript
interface Deliverable {
  // 基础元数据
  id: string;                    // 交付物唯一标识
  type: DeliverableType;          // 交付物类型
  version: string;                // 语义化版本号 (1.0.0)
  status: "draft" | "ready" | "approved" | "rejected" | "deprecated";
  created_at: ISO8601;
  updated_at: ISO8601;

  // 角色信息
  from_role: string;              // 创建者角色
  to_roles: string[];             // 接收者角色列表
  signed_by: string[];            // 已签收的角色列表

  // 内容引用
  content_path: string;           // 内容文件路径（在共享记忆中）
  content_hash: string;           // 内容哈希，用于防篡改

  // 变更追踪
  changelog: ChangelogEntry[];
  previous_version?: string;      // 上一个版本的交付物 ID

  // 元数据
  metadata: Record<string, any>;  // 各类型特有的元数据
}

interface ChangelogEntry {
  version: string;
  changed_by: string;
  changed_at: ISO8601;
  description: string;
  diff?: string;                  // 可选的 diff 信息
}
```

## 交付物生命周期

```
     创建者角色
         │
         ▼
     [DRAFT]    ←── 编辑、修改
         │
         ▼ 提交审核
     [READY]    ──→ 通知接收角色
         │              │
         │              ▼
         │          接收者审核
         │           │       │
         │  同意     │       │  拒绝
         ▼           │       ▼
    [APPROVED] ◄─────┘   [REJECTED]
         │                      │
         ▼  发布               ▼  修改后重新提交
  下一阶段工作              [DRAFT]
```

## 交付物操作接口

### 1. 创建交付物

```bash
opc deliverable create \
  --type prd \
  --from product-pm \
  --to architect-tl,design-ux,founder-ceo \
  --path .opc/memory/shared/prd/v1.0-prd.md \
  --title "用户系统 PRD" \
  --description "用户注册、登录、个人中心功能需求"
```

### 2. 提交交付物审核

```bash
opc deliverable submit <deliverable-id>
```

### 3. 签收/批准交付物

```bash
opc deliverable approve <deliverable-id> --role architect-tl
```

### 4. 拒绝交付物

```bash
opc deliverable reject <deliverable-id> \
  --role architect-tl \
  --reason "技术方案不可行，建议使用 REST API 替代 GraphQL"
```

### 5. 废弃交付物

```bash
opc deliverable deprecate <deliverable-id> \
  --replaced-by <new-deliverable-id>
```

## 交付物查询接口

```bash
# 列出所有交付物
opc deliverable list

# 按类型过滤
opc deliverable list --type prd

# 按状态过滤
opc deliverable list --status approved

# 按角色过滤（我发出的）
opc deliverable list --from product-pm

# 按角色过滤（我收到的）
opc deliverable list --to architect-tl

# 查看交付物详情
opc deliverable show <deliverable-id>

# 查看交付物变更历史
opc deliverable history <deliverable-id>

# 查看待我审核的交付物
opc deliverable pending --role architect-tl
```

## 通知机制

每个交付物状态变更时，会在相关角色的收件箱中创建通知：

```typescript
interface Notification {
  id: string;
  type: "deliverable_submitted" | "deliverable_approved" | "deliverable_rejected";
  deliverable_id: string;
  deliverable_type: DeliverableType;
  deliverable_title: string;
  from_role: string;
  to_roles: string[];
  created_at: ISO8601;
  read: boolean;
}
```

## 访问控制

交付物的访问控制遵循记忆系统的 ACL：
- 创建者可以编辑自己的交付物（DRAFT 状态）
- 接收者可以查看和签收/拒绝
- 其他角色只能查看已 APPROVED 的交付物
- 任何人不能修改已签收的交付物（只能创建新版本）

## 审计日志

所有交付物操作都会记录审计日志：

```typescript
interface AuditLogEntry {
  id: string;
  deliverable_id: string;
  action: "create" | "submit" | "approve" | "reject" | "deprecate";
  role: string;
  timestamp: ISO8601;
  details: Record<string, any>;
}
```

---

## 工作流示例：完整的产品发布流程

### 阶段 1：产品 → 架构

```bash
# PM 创建 PRD
opc deliverable create --type prd --from product-pm --to founder-ceo,architect-tl --path .opc/memory/shared/prd/v1-prd.md

# PM 提交审核
opc deliverable submit <prd-id>

# CEO 审批
opc deliverable approve <prd-id> --role founder-ceo

# 架构师审批
opc deliverable approve <prd-id> --role architect-tl
```

### 阶段 2：架构 → 开发

```bash
# 架构师创建架构设计
opc deliverable create --type architecture --from architect-tl --to founder-ceo,web-fe,api-be,data-dba --path .opc/memory/shared/architecture/v1-arch.md

# 架构师提交审核
opc deliverable submit <arch-id>

# CEO 审批
opc deliverable approve <arch-id> --role founder-ceo

# 前端、后端、DBA 签收
opc deliverable approve <arch-id> --role web-fe
opc deliverable approve <arch-id> --role api-be
opc deliverable approve <arch-id> --role data-dba
```

### 阶段 3：开发 → 测试

```bash
# 前端创建实现说明
opc deliverable create --type implementation-note --from web-fe --to quality-qa,security-sec --path .opc/memory/shared/implementation-notes/v1-fe.md

# 后端创建实现说明
opc deliverable create --type implementation-note --from api-be --to quality-qa,security-sec --path .opc/memory/shared/implementation-notes/v1-be.md

# 提交测试
opc deliverable submit <fe-note-id>
opc deliverable submit <be-note-id>
```

### 阶段 4：测试 → 发布

```bash
# QA 创建测试报告
opc deliverable create --type test-report --from quality-qa --to founder-ceo,release-rm --path .opc/memory/shared/test-reports/v1-test-report.md

# 安全工程师创建安全报告
opc deliverable create --type security-report --from security-sec --to founder-ceo,release-rm --path .opc/memory/shared/security-reports/v1-security-report.md

# 提交发布审批
opc deliverable submit <test-report-id>
opc deliverable approve <security-report-id> --role founder-ceo
```

### 阶段 5：发布经理发布

```bash
# 发布经理创建发布记录
opc deliverable create --type release-record --from release-rm --to all --path .opc/memory/shared/release-records/v1.0.0.md

# 所有人签收（全员通知）
opc deliverable submit <release-record-id>
```

---

## 总结

这个交付物协议确保了：

1. **角色隔离**：每个角色只能看到和操作自己权限范围内的交付物
2. **流程可控**：每个阶段都有明确的输入输出和审批节点
3. **可追溯**：所有变更都有完整的审计日志
4. **可回滚**：支持版本管理，可以回滚到任意历史版本
5. **防篡改**：内容哈希确保交付物不被篡改
6. **自动化**：可以与 CI/CD 集成，自动触发后续流程
