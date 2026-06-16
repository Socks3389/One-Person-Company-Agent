#!/usr/bin/env node
// ============================================================
// ONE PERSON COMPANY OS - 极简入口
// ============================================================
// 用法：
//   node opc start "做一个博客系统"    # 从零开始一个项目
//   node opc status                   # 查看当前状态
//   node opc continue                 # 继续暂停的项目
// ============================================================

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

const ROOT = path.join(__dirname);
const MEMORY_ROOT = path.join(__dirname, '../../../.opc/memory');
const PROJECT_FILE = path.join(__dirname, '../../../.opc', 'current-project.json');

// ============================================================
// 交互式确认
// ============================================================
function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  return new Promise(resolve => rl.question(query, ans => {
    rl.close();
    resolve(ans);
  }));
}

// ============================================================
// 日志工具
// ============================================================
function logStep(step, title) {
  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(` 步骤 ${step}: ${title}`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
}

function logInfo(msg) {
  console.log(`  ℹ️  ${msg}`);
}

function logSuccess(msg) {
  console.log(`  ✅ ${msg}`);
}

function logWarning(msg) {
  console.log(`  ⚠️  ${msg}`);
}

// ============================================================
// 项目状态管理
// ============================================================
function loadProject() {
  if (!fs.existsSync(PROJECT_FILE)) {
    return null;
  }
  return JSON.parse(fs.readFileSync(PROJECT_FILE, 'utf-8'));
}

function saveProject(project) {
  const dir = path.dirname(PROJECT_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(PROJECT_FILE, JSON.stringify(project, null, 2));
}

// ============================================================
// 自动激活角色（后台自动完成，用户无感知）
// ============================================================
function autoActivateRole(role) {
  try {
    const result = execSync(
      `node "${ROOT}/agents/role-activator.js" activate ${role}`,
      { encoding: 'utf-8', stdio: 'pipe' }
    );
    return true;
  } catch (e) {
    // 如果角色已经激活过，也返回 true
    return e.stdout.includes('激活成功') || e.stdout.includes('已存在');
  }
}

// ============================================================
// 自动创建交付物（后台自动完成，用户无感知）
// ============================================================
function autoCreateDeliverable(options) {
  try {
    const args = Object.entries(options)
      .map(([k, v]) => `--${k} "${v}"`)
      .join(' ');

    const result = execSync(
      `node "${ROOT}/agents/deliverable-manager.js" create ${args}`,
      { encoding: 'utf-8', stdio: 'pipe' }
    );

    // 提取交付物 ID
    const match = result.match(/deliv-[a-f0-9]+/);
    return match ? match[0] : null;
  } catch (e) {
    console.error(e.stdout || e.message);
    return null;
  }
}

function autoApproveDeliverable(id, role) {
  try {
    execSync(
      `node "${ROOT}/agents/deliverable-manager.js" approve ${id} --role ${role}`,
      { encoding: 'utf-8', stdio: 'pipe' }
    );
    return true;
  } catch (e) {
    return false;
  }
}

// ============================================================
// 主流程：start - 从零开始一个项目
// ============================================================
async function startProject(idea) {
  console.log(`\n🚀 One Person Company OS 启动`);
  console.log(`   项目：${idea}`);
  console.log(`   模式：全自动（仅在需要决策时询问你）\n`);

  // 初始化项目状态
  const project = {
    id: 'proj-' + Date.now().toString(36),
    idea,
    started_at: new Date().toISOString(),
    current_stage: 0,
    stages: [],
    deliverables: {}
  };

  // ==========================================================
  // 阶段 0：CEO 商业决策
  // ==========================================================
  logStep(0, 'CEO 商业决策分析');

  logInfo('正在激活 Founder-CEO 角色...');
  autoActivateRole('founder-ceo');
  logSuccess('Founder-CEO 角色已激活');

  logInfo('正在分析商业目标、优先级、边界...');

  // 问用户 3 个关键问题（而不是 10 个！）
  console.log();
  const targetUser = await askQuestion('  👤 目标用户是谁？（例如：程序员、博主、小企业）：');
  const coreValue = await askQuestion('  💎 核心价值是什么？（例如：写博客更快、管理客户更方便）：');
  const deadline = await askQuestion('  ⏰ 期望多久上线？（例如：1周、2周、1个月）：');

  project.target_user = targetUser;
  project.core_value = coreValue;
  project.deadline = deadline;

  // 自动生成商业决策交付物
  const ceoDocPath = path.join(MEMORY_ROOT, 'shared', 'milestones', `v0-ceo-brief.md`);
  const ceoDir = path.dirname(ceoDocPath);
  if (!fs.existsSync(ceoDir)) fs.mkdirSync(ceoDir, { recursive: true });

  fs.writeFileSync(ceoDocPath, `# 项目商业简报\n\n- 项目：${idea}\n- 目标用户：${targetUser}\n- 核心价值：${coreValue}\n- 期望上线时间：${deadline}\n`);

  logSuccess('商业决策完成！');
  project.stages.push({ stage: 0, name: 'CEO 商业决策', status: 'done' });

  // ==========================================================
  // 阶段 1：PM 产品定义
  // ==========================================================
  logStep(1, 'PM 产品需求分析');

  logInfo('正在激活 Product-PM 角色...');
  autoActivateRole('product-pm');
  logSuccess('Product-PM 角色已激活');

  logInfo('正在自动生成 PRD...');

  // 自动生成简单 PRD
  const prdPath = path.join(MEMORY_ROOT, 'shared', 'prd', `v1-prd.md`);
  const prdDir = path.dirname(prdPath);
  if (!fs.existsSync(prdDir)) fs.mkdirSync(prdDir, { recursive: true });

  const prdContent = `# PRD: ${idea}

## 目标用户
${targetUser}

## 核心价值
${coreValue}

## MVP 功能列表
1. 用户注册登录
2. 核心功能（待细化）
3. 基础 UI

## 验收标准
- 用户可以完成核心流程
- 没有阻断性 Bug
- 在 ${deadline} 前可上线

## 非目标（这个版本不做）
- 复杂的权限系统
- 多语言支持
- 高级数据分析
`;
  fs.writeFileSync(prdPath, prdContent);

  // 自动创建交付物
  const prdId = autoCreateDeliverable({
    type: 'prd',
    from_role: 'product-pm',
    to_roles: 'founder-ceo,architect-tl',
    path: prdPath,
    title: `${idea} - PRD v1`,
    description: '自动生成的初始 PRD'
  });

  if (prdId) {
    autoApproveDeliverable(prdId, 'founder-ceo');
    project.deliverables.prd = prdId;
    logSuccess('PRD 已生成并自动签收！');
  }

  logInfo('PRD 已保存到：.opc/memory/shared/prd/v1-prd.md');

  project.stages.push({ stage: 1, name: 'PM 产品定义', status: 'done' });

  // ==========================================================
  // 阶段 2：Architect 架构设计
  // ==========================================================
  logStep(2, '架构师技术选型');

  logInfo('正在激活 Architect-TL 角色...');
  autoActivateRole('architect-tl');
  logSuccess('Architect-TL 角色已激活');

  logInfo('正在自动生成架构设计...');

  // 自动生成架构设计
  const archPath = path.join(MEMORY_ROOT, 'shared', 'architecture', `v1-arch.md`);
  const archDir = path.dirname(archPath);
  if (!fs.existsSync(archDir)) fs.mkdirSync(archDir, { recursive: true });

  // 根据项目类型推荐技术栈
  let techStack = '';
  if (idea.includes('博客') || idea.includes('网站') || idea.includes('管理')) {
    techStack = `
推荐技术栈：
- 前端：React + Tailwind CSS
- 后端：Node.js + Express
- 数据库：SQLite（MVP）→ PostgreSQL（生产）
- 部署：Vercel 或 Docker
`;
  } else {
    techStack = `
推荐技术栈：
- 前端：根据具体需求确定
- 后端：根据具体需求确定
- 数据库：根据数据规模确定
`;
  }

  const archContent = `# 架构设计: ${idea}

## 技术选型
${techStack}

## 模块划分
1. 用户认证模块
2. 核心业务模块
3. 数据持久化模块
4. UI 展示层

## API 契约（待细化）
- GET /api/items - 获取列表
- POST /api/items - 创建
- PUT /api/items/:id - 更新
- DELETE /api/items/:id - 删除

## 风险考虑
- 技术风险：低（成熟技术栈）
- 进度风险：中（按 ${deadline} 倒排）
- 质量风险：需要关注测试覆盖
`;
  fs.writeFileSync(archPath, archContent);

  // 自动创建交付物
  const archId = autoCreateDeliverable({
    type: 'architecture',
    from_role: 'architect-tl',
    to_roles: 'founder-ceo,web-fe,api-be',
    path: archPath,
    title: `${idea} - 架构设计 v1`,
    description: '自动生成的初始架构设计'
  });

  if (archId) {
    autoApproveDeliverable(archId, 'founder-ceo');
    project.deliverables.architecture = archId;
    logSuccess('架构设计已生成并自动签收！');
  }

  logInfo('架构设计已保存到：.opc/memory/shared/architecture/v1-arch.md');

  project.stages.push({ stage: 2, name: '架构设计', status: 'done' });

  // ==========================================================
  // 阶段 3：总结和下一步
  // ==========================================================
  logStep(3, '项目初始化完成！');

  console.log(`
  📋 当前进展：
  ✅ CEO 商业决策 - 已完成
  ✅ PM 产品定义 - 已完成
  ✅ 架构设计 - 已完成

  📦 已生成的交付物：
  - .opc/memory/shared/milestones/v0-ceo-brief.md
  - .opc/memory/shared/prd/v1-prd.md
  - .opc/memory/shared/architecture/v1-arch.md

  🎯 下一步：
  你现在可以：
  1. 查看生成的文档，根据需要修改
  2. 运行 node opc status 查看状态
  3. 运行 node opc continue 继续下一阶段（代码实现）

  💡 提示：所有繁琐的角色激活、交付物创建、签收流程都已经在后台自动完成了！
  你只需要关注内容本身，不需要关心流程管控。
  `);

  project.current_stage = 3;
  saveProject(project);
}

// ============================================================
// 命令：status - 查看当前状态
// ============================================================
function showStatus() {
  const project = loadProject();

  if (!project) {
    console.log('\n  📭 当前没有进行中的项目');
    console.log('  运行 node opc start "<项目名称>" 开始一个新项目\n');
    return;
  }

  console.log(`\n📋 项目状态：${project.idea}`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
  console.log(`  项目 ID：${project.id}`);
  console.log(`  开始时间：${project.started_at.split('T')[0]}`);
  console.log(`  当前阶段：${project.current_stage}`);
  console.log();
  console.log(`  已完成阶段：`);
  for (const stage of project.stages) {
    console.log(`    ✅ 阶段 ${stage.stage}: ${stage.name}`);
  }
  console.log();
  console.log(`  交付物：`);
  for (const [type, id] of Object.entries(project.deliverables)) {
    console.log(`    - ${type}: ${id}`);
  }
  console.log();

  // 列出现有交付物
  try {
    const result = execSync(
      `node "${ROOT}/agents/deliverable-manager.js" list`,
      { encoding: 'utf-8', stdio: 'pipe' }
    );
    console.log(result);
  } catch (e) {
    // 忽略
  }
}

// ============================================================
// 命令行入口
// ============================================================
const [,, command, ...args] = process.argv;

if (command === 'start') {
  const idea = args.join(' ');
  if (!idea) {
    console.error('  ❌ 请指定项目名称，例如：node opc start "做一个博客系统"');
    process.exit(1);
  }
  startProject(idea);
} else if (command === 'status') {
  showStatus();
} else if (command === 'continue') {
  console.log('\n  🚧 继续功能开发中... 下一版本支持\n');
  console.log('  目前可以：');
  console.log('  1. 手动修改 .opc/memory/shared/ 下的文档');
  console.log('  2. 然后直接开始写代码\n');
} else {
  console.log(`
🚀 One Person Company OS - 极简入口

用法：
  node opc start "<项目描述>"    # 从零开始一个新项目
  node opc status                 # 查看当前项目状态
  node opc continue               # 继续项目（开发中）

示例：
  node opc start "做一个个人博客系统"
  node opc start "开发一个客户管理工具"

💡 设计理念：
  - 用户只说一句话，剩下的全自动化
  - 必要确认点不超过 3 个
  - 所有复杂机制后台自动运行
  - 只在需要决策时才问用户
`);
}
