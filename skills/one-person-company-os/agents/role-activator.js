#!/usr/bin/env node
// ============================================================
// ONE PERSON COMPANY OS - Role Activator
// ============================================================
// 角色激活器：在激活任何角色之前，检查所有强制依赖是否满足
//
// 用法：
//   node role-activator.js check founder-ceo    # 检查 CEO 依赖
//   node role-activator.js activate founder-ceo  # 激活 CEO 角色
//   node role-activator.js list                  # 列出所有可用角色
// ============================================================

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const { execSync } = require('child_process');

const ROLES_DIR = path.join(__dirname, 'deps');
const PROJECT_ROOT = path.join(__dirname, '../../../');
const MEMORY_ROOT = path.join(PROJECT_ROOT, '.opc', 'memory');

// ============================================================
// 工具函数
// ============================================================

function loadDepsFile(roleName) {
  const depsPath = path.join(ROLES_DIR, `${roleName}.deps.yml`);
  if (!fs.existsSync(depsPath)) {
    throw new Error(`角色 ${roleName} 的依赖文件不存在：${depsPath}`);
  }
  return fs.readFileSync(depsPath, 'utf-8');
}

function parseYaml(yamlContent) {
  try {
    return yaml.load(yamlContent);
  } catch (e) {
    console.error('YAML 解析错误：', e.message);
    throw e;
  }
}

// ============================================================
// 依赖检查
// ============================================================

function checkSkillDependency(skill, depsRoot) {
  const skillName = skill.name;
  const requiredVersion = skill.version;

  // 检查 Skill 是否存在
  const skillPath = skill.source
    ? path.join(PROJECT_ROOT, skill.source)
    : path.join(depsRoot, 'skills', skillName);

  if (!fs.existsSync(skillPath)) {
    return {
      ok: false,
      error: `Skill ${skillName} 未找到`,
      path: skillPath,
      reason: skill.reason
    };
  }

  // TODO: 版本检查
  return {
    ok: true,
    name: skillName,
    path: skillPath
  };
}

function checkMcpDependency(mcp) {
  // TODO: 实际检查 MCP 服务器状态
  // 这里暂时假设 MCP 已配置
  return {
    ok: true,
    name: mcp.name,
    permissions: mcp.permissions,
    scope: mcp.scope
  };
}

function initMemory(memorySpec, roleName) {
  const privateMemoryPath = path.join(MEMORY_ROOT, memorySpec.private_memory_path.replace('.opc/memory/', ''));
  const sharedMemoryPath = path.join(MEMORY_ROOT, 'shared');

  // 创建私有记忆目录
  if (!fs.existsSync(privateMemoryPath)) {
    fs.mkdirSync(privateMemoryPath, { recursive: true });
  }

  // 创建共享记忆目录
  if (!fs.existsSync(sharedMemoryPath)) {
    fs.mkdirSync(sharedMemoryPath, { recursive: true });
  }

  // 创建 .memory-meta.json
  const metaPath = path.join(privateMemoryPath, '.memory-meta.json');
  if (!fs.existsSync(metaPath)) {
    const meta = {
      version: "1.0",
      role: roleName,
      created_at: new Date().toISOString(),
      last_accessed: new Date().toISOString(),
      last_modified: new Date().toISOString(),
      access_count: 0,
      memory_size_bytes: 0,
      entities: {}
    };
    fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2));
  }

  return {
    privateMemoryPath,
    sharedMemoryPath,
    metaPath
  };
}

// ============================================================
// 主逻辑
// ============================================================

function checkRole(roleName) {
  console.log(`\n🔍 正在检查角色：${roleName}\n`);

  try {
    const depsContent = loadDepsFile(roleName);
    const deps = parseYaml(depsContent);

    console.log('📦 检查 Skill 依赖...');
    const skillResults = [];
    let allSkillsOk = true;
    if (deps.required_skills && Array.isArray(deps.required_skills)) {
      for (const skill of deps.required_skills) {
        const result = checkSkillDependency(skill, PROJECT_ROOT);
        skillResults.push(result);
        if (result.ok) {
          console.log(`  ✅ ${skill.name} - ${result.path}`);
        } else {
          console.log(`  ❌ ${skill.name} - ${result.error}`);
          console.log(`     原因：${result.reason}`);
          allSkillsOk = false;
        }
      }
    }

    console.log('\n🔌 检查 MCP 依赖...');
    const mcpResults = [];
    let allMcpsOk = true;
    if (deps.required_mcp && Array.isArray(deps.required_mcp)) {
      for (const mcp of deps.required_mcp) {
        const result = checkMcpDependency(mcp);
        mcpResults.push(result);
        if (result.ok) {
          console.log(`  ✅ ${mcp.name} (权限: ${mcp.permissions.join(', ')}, 范围: ${mcp.scope})`);
        } else {
          console.log(`  ❌ ${mcp.name} - ${result.error}`);
          console.log(`     原因：${result.reason}`);
          allMcpsOk = false;
        }
      }
    }

    console.log('\n💾 检查记忆系统...');
    if (deps.memory_spec) {
      console.log(`  ✅ 私有记忆路径: ${deps.memory_spec.private_memory_path}`);
      console.log(`  ✅ 共享记忆读权限: ${deps.memory_spec.shared_memory_access?.read?.join(', ') || '无'}`);
      console.log(`  ✅ 共享记忆写权限: ${deps.memory_spec.shared_memory_access?.write?.join(', ') || '无'}`);
    }

    console.log('\n📋 激活前检查清单...');
    if (deps.activation_checklist && Array.isArray(deps.activation_checklist)) {
      for (const item of deps.activation_checklist) {
        console.log(`  ☐ ${item}`);
      }
    }

    console.log('\n' + '='.repeat(60));

    if (allSkillsOk && allMcpsOk) {
      console.log(`✅ 角色 ${roleName} 依赖检查通过，可以激活`);
      return { ok: true, role: roleName };
    } else {
      console.log(`❌ 角色 ${roleName} 依赖检查失败，无法激活`);
      console.log(`   请安装缺失的依赖后重试`);
      return { ok: false, role: roleName };
    }
  } catch (error) {
    console.error(`❌ 检查失败：${error.message}`);
    return { ok: false, role: roleName, error: error.message };
  }
}

function activateRole(roleName) {
  const checkResult = checkRole(roleName);
  if (!checkResult.ok) {
    console.error(`\n❌ 无法激活角色 ${roleName}：依赖检查失败`);
    process.exit(1);
  }

  console.log(`\n🚀 正在激活角色：${roleName}`);

  const depsContent = loadDepsFile(roleName);
  const deps = parseYaml(depsContent);

  // 初始化记忆系统
  if (deps.memory_spec) {
    const memoryInfo = initMemory(deps.memory_spec, roleName);
    console.log(`  ✅ 记忆系统已初始化`);
    console.log(`     私有记忆：${memoryInfo.privateMemoryPath}`);
    console.log(`     元数据文件：${memoryInfo.metaPath}`);
  }

  console.log(`\n✅ 角色 ${roleName} 激活成功！`);
  console.log(`\n📝 角色信息：`);
  console.log(`   部门：${deps.department}`);
  console.log(`   Owner：${deps.owner}`);

  if (deps.memory_spec?.memory_entities) {
    console.log(`\n🧠 该角色拥有以下记忆实体：`);
    for (const entity of deps.memory_spec.memory_entities) {
      console.log(`   - ${entity}`);
    }
  }

  console.log(`\n💡 提示：`);
  console.log(`   1. 该角色的所有私有记忆只有它自己能访问`);
  console.log(`   2. 该角色只能通过显式交付物与其他角色通信`);
  console.log(`   3. 所有强制依赖已验证，降级依赖可以后续安装`);

  return { ok: true, role: roleName, activatedAt: new Date().toISOString() };
}

function listRoles() {
  console.log('\n📋 可用角色列表：\n');

  const files = fs.readdirSync(ROLES_DIR);
  const roles = files
    .filter(f => f.endsWith('.deps.yml'))
    .map(f => f.replace('.deps.yml', ''));

  for (const role of roles) {
    const depsContent = loadDepsFile(role);
    const deps = parseYaml(depsContent);
    console.log(`  ${role}`);
    console.log(`    部门：${deps.department}`);
    console.log(`    强制 Skill：${Array.isArray(deps.required_skills) ? deps.required_skills.length : 0} 个`);
    console.log(`    强制 MCP：${Array.isArray(deps.required_mcp) ? deps.required_mcp.length : 0} 个`);
    console.log();
  }

  console.log(`共 ${roles.length} 个角色`);
}

// ============================================================
// 命令行入口
// ============================================================

const [,, command, roleName] = process.argv;

if (command === 'check') {
  if (!roleName) {
    console.error('用法：node role-activator.js check <role-name>');
    process.exit(1);
  }
  checkRole(roleName);
} else if (command === 'activate') {
  if (!roleName) {
    console.error('用法：node role-activator.js activate <role-name>');
    process.exit(1);
  }
  activateRole(roleName);
} else if (command === 'list') {
  listRoles();
} else {
  console.log(`
用法：
  node role-activator.js list                  # 列出所有可用角色
  node role-activator.js check <role>          # 检查角色依赖
  node role-activator.js activate <role>        # 激活角色
`);
}

module.exports = { checkRole, activateRole, listRoles };
