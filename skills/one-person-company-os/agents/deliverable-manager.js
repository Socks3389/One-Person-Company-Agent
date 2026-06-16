#!/usr/bin/env node
// ============================================================
// ONE PERSON COMPANY OS - Deliverable Manager
// ============================================================
// 交付物管理器：角色之间通过交付物通信
//
// 用法：
//   node deliverable-manager.js list                    # 列出所有交付物
//   node deliverable-manager.js create <options>         # 创建交付物
//   node deliverable-manager.js submit <id>              # 提交审核
//   node deliverable-manager.js approve <id> --role <r>  # 批准交付物
//   node deliverable-manager.js reject <id> --role <r>   # 拒绝交付物
//   node deliverable-manager.js show <id>                # 查看详情
// ============================================================

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const crypto = require('crypto');

const MEMORY_ROOT = path.join(__dirname, '../../../.opc/memory');
const DELIVERABLES_INDEX = path.join(MEMORY_ROOT, 'shared', 'deliverables', 'index.yml');
const DELIVERABLES_DIR = path.join(MEMORY_ROOT, 'shared', 'deliverables');

// 确保目录存在
function ensureDirs() {
  if (!fs.existsSync(DELIVERABLES_DIR)) {
    fs.mkdirSync(DELIVERABLES_DIR, { recursive: true });
  }
  if (!fs.existsSync(DELIVERABLES_INDEX)) {
    fs.writeFileSync(DELIVERABLES_INDEX, yaml.dump({ deliverables: [] }));
  }
}

// 加载交付物索引
function loadIndex() {
  ensureDirs();
  try {
    return yaml.load(fs.readFileSync(DELIVERABLES_INDEX, 'utf-8')) || { deliverables: [] };
  } catch (e) {
    return { deliverables: [] };
  }
}

// 保存交付物索引
function saveIndex(index) {
  fs.writeFileSync(DELIVERABLES_INDEX, yaml.dump(index));
}

// 生成唯一 ID
function generateId() {
  return 'deliv-' + crypto.randomBytes(8).toString('hex');
}

// 计算文件哈希
function computeFileHash(filePath) {
  const content = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(content).digest('hex');
}

// 获取当前时间
function now() {
  return new Date().toISOString();
}

// ============================================================
// 交付物操作
// ============================================================

/**
 * 创建交付物
 */
function createDeliverable(options) {
  const {
    type,
    from_role,
    to_roles,
    path: contentPath,
    title,
    description = ''
  } = options;

  // 验证内容文件存在
  if (!fs.existsSync(contentPath)) {
    throw new Error(`内容文件不存在: ${contentPath}`);
  }

  const id = generateId();
  const contentHash = computeFileHash(contentPath);

  const deliverable = {
    id,
    type,
    version: '1.0.0',
    status: 'draft',
    created_at: now(),
    updated_at: now(),
    from_role,
    to_roles: to_roles.split(',').map(r => r.trim()),
    signed_by: [],
    content_path: contentPath,
    content_hash: contentHash,
    changelog: [
      {
        version: '1.0.0',
        changed_by: from_role,
        changed_at: now(),
        description: '创建交付物'
      }
    ],
    metadata: {
      title,
      description
    }
  };

  // 保存交付物文件
  const deliverableFile = path.join(DELIVERABLES_DIR, `${id}.yml`);
  fs.writeFileSync(deliverableFile, yaml.dump(deliverable));

  // 更新索引
  const index = loadIndex();
  index.deliverables.push({
    id,
    type,
    status: 'draft',
    from_role,
    title,
    created_at: deliverable.created_at
  });
  saveIndex(index);

  console.log(`✅ 交付物已创建：${id}`);
  console.log(`   类型：${type}`);
  console.log(`   标题：${title}`);
  console.log(`   状态：draft`);
  console.log(`   文件：${deliverableFile}`);
  console.log(``);
  console.log(`💡 提示：编辑完成后，使用以下命令提交审核：`);
  console.log(`   node deliverable-manager.js submit ${id}`);

  return deliverable;
}

/**
 * 提交交付物审核
 */
function submitDeliverable(id) {
  const deliverableFile = path.join(DELIVERABLES_DIR, `${id}.yml`);
  if (!fs.existsSync(deliverableFile)) {
    throw new Error(`交付物不存在: ${id}`);
  }

  const deliverable = yaml.load(fs.readFileSync(deliverableFile, 'utf-8'));

  if (deliverable.status !== 'draft') {
    throw new Error(`只有 draft 状态的交付物才能提交，当前状态: ${deliverable.status}`);
  }

  // 更新状态
  deliverable.status = 'ready';
  deliverable.updated_at = now();
  deliverable.changelog.push({
    version: deliverable.version,
    changed_by: deliverable.from_role,
    changed_at: now(),
    description: '提交审核'
  });

  fs.writeFileSync(deliverableFile, yaml.dump(deliverable));

  // 更新索引
  const index = loadIndex();
  const idx = index.deliverables.findIndex(d => d.id === id);
  if (idx >= 0) {
    index.deliverables[idx].status = 'ready';
    saveIndex(index);
  }

  console.log(`✅ 交付物已提交审核：${id}`);
  console.log(`   等待以下角色审批：${deliverable.to_roles.join(', ')}`);

  return deliverable;
}

/**
 * 批准交付物
 */
function approveDeliverable(id, role) {
  const deliverableFile = path.join(DELIVERABLES_DIR, `${id}.yml`);
  if (!fs.existsSync(deliverableFile)) {
    throw new Error(`交付物不存在: ${id}`);
  }

  const deliverable = yaml.load(fs.readFileSync(deliverableFile, 'utf-8'));

  if (deliverable.status !== 'ready') {
    throw new Error(`只有 ready 状态的交付物才能批准，当前状态: ${deliverable.status}`);
  }

  if (!deliverable.to_roles.includes(role)) {
    throw new Error(`角色 ${role} 不是该交付物的接收者，无法审批`);
  }

  if (deliverable.signed_by.includes(role)) {
    console.log(`⚠️  角色 ${role} 已经签收过此交付物`);
    return deliverable;
  }

  // 签收
  deliverable.signed_by.push(role);
  deliverable.updated_at = now();
  deliverable.changelog.push({
    version: deliverable.version,
    changed_by: role,
    changed_at: now(),
    description: `批准交付物`
  });

  // 如果所有接收者都签收了，状态变为 approved
  if (deliverable.signed_by.length === deliverable.to_roles.length) {
    deliverable.status = 'approved';
    console.log(`✅ 所有接收者已签收，交付物状态变为 approved`);
  }

  fs.writeFileSync(deliverableFile, yaml.dump(deliverable));

  // 更新索引
  const index = loadIndex();
  const idx = index.deliverables.findIndex(d => d.id === id);
  if (idx >= 0) {
    index.deliverables[idx].status = deliverable.status;
    saveIndex(index);
  }

  console.log(`✅ 角色 ${role} 已批准交付物：${id}`);
  console.log(`   当前签收进度：${deliverable.signed_by.length}/${deliverable.to_roles.length}`);

  return deliverable;
}

/**
 * 拒绝交付物
 */
function rejectDeliverable(id, role, reason) {
  const deliverableFile = path.join(DELIVERABLES_DIR, `${id}.yml`);
  if (!fs.existsSync(deliverableFile)) {
    throw new Error(`交付物不存在: ${id}`);
  }

  const deliverable = yaml.load(fs.readFileSync(deliverableFile, 'utf-8'));

  if (deliverable.status !== 'ready') {
    throw new Error(`只有 ready 状态的交付物才能拒绝，当前状态: ${deliverable.status}`);
  }

  if (!deliverable.to_roles.includes(role)) {
    throw new Error(`角色 ${role} 不是该交付物的接收者，无法审批`);
  }

  // 拒绝
  deliverable.status = 'rejected';
  deliverable.updated_at = now();
  deliverable.changelog.push({
    version: deliverable.version,
    changed_by: role,
    changed_at: now(),
    description: `拒绝交付物：${reason}`
  });

  fs.writeFileSync(deliverableFile, yaml.dump(deliverable));

  // 更新索引
  const index = loadIndex();
  const idx = index.deliverables.findIndex(d => d.id === id);
  if (idx >= 0) {
    index.deliverables[idx].status = 'rejected';
    saveIndex(index);
  }

  console.log(`❌ 角色 ${role} 已拒绝交付物：${id}`);
  console.log(`   原因：${reason}`);
  console.log(``);
  console.log(`💡 提示：修改后可以重新提交审核`);

  return deliverable;
}

/**
 * 列出所有交付物
 */
function listDeliverables(options = {}) {
  const { type, status, from, to } = options;
  const index = loadIndex();

  let deliverables = index.deliverables || [];

  if (type) {
    deliverables = deliverables.filter(d => d.type === type);
  }
  if (status) {
    deliverables = deliverables.filter(d => d.status === status);
  }
  if (from) {
    deliverables = deliverables.filter(d => d.from_role === from);
  }

  console.log(`\n📋 交付物列表（共 ${deliverables.length} 个）：\n`);

  for (const d of deliverables) {
    const statusIcon = {
      'draft': '📝',
      'ready': '⏳',
      'approved': '✅',
      'rejected': '❌',
      'deprecated': '📜'
    }[d.status] || '❓';

    console.log(`  ${statusIcon} ${d.id}`);
    console.log(`     类型：${d.type}`);
    console.log(`     标题：${d.title}`);
    console.log(`     创建者：${d.from_role}`);
    console.log(`     创建时间：${d.created_at}`);
    console.log();
  }

  return deliverables;
}

/**
 * 查看交付物详情
 */
function showDeliverable(id) {
  const deliverableFile = path.join(DELIVERABLES_DIR, `${id}.yml`);
  if (!fs.existsSync(deliverableFile)) {
    throw new Error(`交付物不存在: ${id}`);
  }

  const deliverable = yaml.load(fs.readFileSync(deliverableFile, 'utf-8'));

  const statusIcon = {
    'draft': '📝',
    'ready': '⏳',
    'approved': '✅',
    'rejected': '❌',
    'deprecated': '📜'
  }[deliverable.status] || '❓';

  console.log(`\n${statusIcon} ${deliverable.id}`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`  类型：${deliverable.type}`);
  console.log(`  标题：${deliverable.metadata?.title || '无标题'}`);
  console.log(`  版本：${deliverable.version}`);
  console.log(`  状态：${deliverable.status}`);
  console.log(`  创建者：${deliverable.from_role}`);
  console.log(`  接收者：${deliverable.to_roles.join(', ')}`);
  console.log(`  签收进度：${deliverable.signed_by.length}/${deliverable.to_roles.length}`);
  console.log(`  内容文件：${deliverable.content_path}`);
  console.log(`  内容哈希：${deliverable.content_hash}`);
  console.log(`  创建时间：${deliverable.created_at}`);
  console.log(`  更新时间：${deliverable.updated_at}`);
  console.log();
  console.log(`  变更历史：`);
  for (const entry of deliverable.changelog) {
    console.log(`    - ${entry.changed_at.split('T')[0]} ${entry.changed_by}: ${entry.description}`);
  }
  console.log();

  return deliverable;
}

// ============================================================
// 命令行入口
// ============================================================

const [,, command, ...args] = process.argv;

function parseArgs(args) {
  const options = {};
  for (let i = 0; i < args.length; i += 2) {
    const key = args[i].replace(/^--/, '');
    const value = args[i + 1];
    options[key] = value;
  }
  return options;
}

if (command === 'list') {
  const options = parseArgs(args);
  listDeliverables(options);
} else if (command === 'create') {
  const options = parseArgs(args);
  createDeliverable(options);
} else if (command === 'submit') {
  const id = args[0];
  submitDeliverable(id);
} else if (command === 'approve') {
  const id = args[0];
  const roleIdx = args.indexOf('--role');
  const role = roleIdx >= 0 ? args[roleIdx + 1] : null;
  if (!role) {
    console.error('请指定 --role 参数');
    process.exit(1);
  }
  approveDeliverable(id, role);
} else if (command === 'reject') {
  const id = args[0];
  const roleIdx = args.indexOf('--role');
  const reasonIdx = args.indexOf('--reason');
  const role = roleIdx >= 0 ? args[roleIdx + 1] : null;
  const reason = reasonIdx >= 0 ? args[reasonIdx + 1] : '未说明原因';
  if (!role) {
    console.error('请指定 --role 参数');
    process.exit(1);
  }
  rejectDeliverable(id, role, reason);
} else if (command === 'show') {
  const id = args[0];
  showDeliverable(id);
} else {
  console.log(`
用法：
  node deliverable-manager.js list [选项]           # 列出交付物
    选项：
      --type <type>       按类型过滤
      --status <status>   按状态过滤
      --from <role>       按创建者过滤

  node deliverable-manager.js create [选项]           # 创建交付物
    选项：
      --type <type>       交付物类型 (prd, architecture, test-report, ...)
      --from_role <role>  创建者角色
      --to_roles <roles>  接收者角色，逗号分隔
      --path <path>       内容文件路径
      --title <title>     标题
      --description <d>   描述（可选）

  node deliverable-manager.js submit <id>              # 提交交付物审核
  node deliverable-manager.js approve <id> --role <r>  # 批准交付物
  node deliverable-manager.js reject <id> --role <r> --reason <msg>  # 拒绝交付物
  node deliverable-manager.js show <id>                # 查看交付物详情

示例：
  node deliverable-manager.js create --type prd --from_role product-pm --to_roles founder-ceo,architect-tl --path .opc/memory/shared/prd/v1-prd.md --title "用户系统 PRD"
`);
}

module.exports = {
  createDeliverable,
  submitDeliverable,
  approveDeliverable,
  rejectDeliverable,
  listDeliverables,
  showDeliverable
};
