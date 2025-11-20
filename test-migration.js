// 测试迁移是否成功的脚本
const fs = require('fs');
const path = require('path');

console.log('🔍 检查 Next.js 迁移状态...\n');

// 检查关键文件
const checks = [
  {
    name: '原始 HTML 文件',
    path: 'index.html',
    required: true
  },
  {
    name: 'Next.js Document',
    path: 'pages/_document.js',
    required: true
  },
  {
    name: 'Next.js Index 页面',
    path: 'pages/index.js',
    required: true
  },
  {
    name: 'Assets 目录',
    path: 'public/assets',
    required: true,
    isDir: true
  },
  {
    name: 'Media 目录',
    path: 'public/media',
    required: true,
    isDir: true
  },
  {
    name: 'CSS 样式文件',
    path: 'public/assets/css/style.css',
    required: true
  },
  {
    name: 'Isotope 库',
    path: 'public/assets/js/isotope.pkgd.min.js',
    required: true
  },
  {
    name: 'Infinite Scroll 库',
    path: 'public/assets/js/infinite-scroll.pkgd.min.js',
    required: true
  }
];

let allPassed = true;

checks.forEach(check => {
  const fullPath = path.join(process.cwd(), check.path);
  let exists = false;
  
  try {
    const stats = fs.statSync(fullPath);
    if (check.isDir) {
      exists = stats.isDirectory();
    } else {
      exists = stats.isFile();
    }
  } catch (e) {
    exists = false;
  }
  
  if (exists) {
    console.log(`✅ ${check.name}: 存在`);
  } else {
    console.log(`❌ ${check.name}: 不存在 (${check.path})`);
    if (check.required) {
      allPassed = false;
    }
  }
});

console.log('\n' + '='.repeat(50));

// 检查 index.html 中的路径
console.log('\n🔍 检查 index.html 路径...\n');

const htmlContent = fs.readFileSync('index.html', 'utf8');

const pathChecks = [
  { pattern: /\.\/assets\//g, name: '相对路径 ./assets/', shouldBe: 0 },
  { pattern: /\.\/media\//g, name: '相对路径 ./media/', shouldBe: 0 },
  { pattern: /\/assets\//g, name: '绝对路径 /assets/', shouldBe: 'many' },
  { pattern: /\/media\//g, name: '绝对路径 /media/', shouldBe: 'many' }
];

pathChecks.forEach(check => {
  const matches = htmlContent.match(check.pattern);
  const count = matches ? matches.length : 0;
  
  if (check.shouldBe === 0) {
    if (count === 0) {
      console.log(`✅ ${check.name}: ${count} 个（正确）`);
    } else {
      console.log(`⚠️  ${check.name}: ${count} 个（应该为 0）`);
      allPassed = false;
    }
  } else {
    if (count > 0) {
      console.log(`✅ ${check.name}: ${count} 个（正确）`);
    } else {
      console.log(`❌ ${check.name}: ${count} 个（应该 > 0）`);
      allPassed = false;
    }
  }
});

console.log('\n' + '='.repeat(50));

if (allPassed) {
  console.log('\n✅ 所有检查通过！可以运行 npm run dev 测试');
  console.log('\n📝 下一步：');
  console.log('   1. 运行: npm run dev');
  console.log('   2. 访问: http://localhost:3000');
  console.log('   3. 对比原 index.html 和 Next.js 版本的效果');
} else {
  console.log('\n❌ 有些检查未通过，请按照提示修复');
  console.log('\n📝 可能需要：');
  console.log('   1. 将 assets 和 media 文件夹移动到 public/ 目录');
  console.log('   2. 修改 index.html 中的相对路径为绝对路径');
  console.log('   3. 确保所有必需文件存在');
}

console.log('\n');
