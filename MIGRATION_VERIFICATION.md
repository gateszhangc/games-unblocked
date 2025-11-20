# Next.js 迁移效果一致性验证方案

## 验证清单

### ✅ 1. 视觉效果验证
- [ ] 页面布局完全相同（使用浏览器开发工具对比）
- [ ] 所有颜色、字体、间距一致
- [ ] 响应式布局在各尺寸下表现相同
- [ ] 动画和过渡效果相同

### ✅ 2. 功能验证
- [ ] 侧边栏展开/收起功能正常
- [ ] 搜索功能工作正常
- [ ] 游戏卡片过滤功能正常
- [ ] 无限滚动加载正常
- [ ] 所有链接跳转正确

### ✅ 3. 技术验证
- [ ] 所有 CSS 文件加载成功
- [ ] 所有 JS 库加载成功
- [ ] 图片资源加载正常
- [ ] Google Analytics 正常工作
- [ ] 控制台无错误

## 对比测试方法

### 方法 1：DOM 结构对比
```bash
# 在浏览器控制台运行
# 原 HTML 页面
document.querySelector('header').outerHTML

# Next.js 页面
document.querySelector('header').outerHTML

# 对比两者是否完全相同
```

### 方法 2：计算样式对比
```javascript
// 对比关键元素的计算样式
const element = document.querySelector('.c-card');
const styles = window.getComputedStyle(element);
console.log({
  width: styles.width,
  height: styles.height,
  backgroundColor: styles.backgroundColor,
  // ... 其他样式
});
```

### 方法 3：截图对比
1. 打开原 index.html，截图
2. 打开 Next.js 版本，截图
3. 使用图像对比工具（如 Pixelmatch）对比差异

### 方法 4：自动化测试
```javascript
// 使用 Playwright 或 Cypress
test('页面渲染一致', async ({ page }) => {
  // 访问原页面
  await page.goto('原URL');
  const originalScreenshot = await page.screenshot();
  
  // 访问 Next.js 页面
  await page.goto('Next.js URL');
  const nextScreenshot = await page.screenshot();
  
  // 对比截图
  expect(nextScreenshot).toMatchSnapshot(originalScreenshot);
});
```

## 确保一致性的关键点

### 1. HTML 结构映射表
| 原 HTML 元素 | Next.js 组件 | 验证点 |
|-------------|-------------|--------|
| `<header class="header">` | `<Header />` | class 名称、id、子元素顺序 |
| `<article class="c-card">` | `<GameCard />` | 卡片布局、图片、链接 |
| `<footer class="footer">` | `<Footer />` | 链接、文本内容 |

### 2. CSS 加载顺序
```
1. /media/plugins/staticSearch/static.search.min.css
2. /assets/css/style.css
3. /assets/styles/main.css
```
**必须按此顺序加载，否则样式优先级会改变**

### 3. JavaScript 依赖关系
```
加载顺序：
1. isotope.pkgd.min.js
2. infinite-scroll.pkgd.min.js
3. scripts.min.js
4. 自定义脚本（初始化 Isotope）
```

### 4. 关键脚本迁移对照

#### 原 HTML 脚本
```html
<script>
window.addEventListener("DOMContentLoaded", function () {
  var iso = new Isotope('.l-isotope', {
    itemSelector: '.c-card',
    layoutMode: 'fitRows',
  });
});
</script>
```

#### Next.js 等效代码
```javascript
useEffect(() => {
  if (typeof window !== 'undefined' && window.Isotope) {
    const iso = new window.Isotope('.l-isotope', {
      itemSelector: '.c-card',
      layoutMode: 'fitRows',
    });
  }
}, []);
```

## 常见问题和解决方案

### 问题 1：样式不一致
**原因：** CSS 加载顺序错误或路径错误
**解决：** 检查 Network 面板，确保所有 CSS 文件加载成功

### 问题 2：JavaScript 报错
**原因：** 脚本在 DOM 就绪前执行
**解决：** 使用 `useEffect` 或 `Script` 组件的 `onLoad` 回调

### 问题 3：图片不显示
**原因：** 路径从相对路径改为绝对路径
**解决：** 确保 `public/` 目录结构正确

### 问题 4：第三方库冲突
**原因：** SSR 时访问 `window` 对象
**解决：** 使用 `dynamic` 导入或条件判断
```javascript
import dynamic from 'next/dynamic';
const ClientOnlyComponent = dynamic(() => import('./Component'), {
  ssr: false
});
```

## 迁移后的优势

虽然效果完全相同，但 Next.js 版本有以下优势：

1. **性能提升**
   - 自动代码分割
   - 图片优化（使用 next/image）
   - 预加载关键资源

2. **开发体验**
   - 组件化，易于维护
   - 热重载
   - TypeScript 支持

3. **SEO 优化**
   - 服务端渲染
   - 自动生成 sitemap
   - 更好的元标签管理

4. **扩展性**
   - 易于添加新页面
   - 支持 API 路由
   - 可集成 CMS

## 最终验证步骤

1. **并排对比**
   - 同时打开原 HTML 和 Next.js 版本
   - 逐个检查每个区域

2. **交互测试**
   - 点击所有按钮
   - 测试所有表单
   - 滚动页面测试无限加载

3. **跨浏览器测试**
   - Chrome
   - Firefox
   - Safari
   - Edge

4. **响应式测试**
   - 桌面（1920x1080）
   - 平板（768x1024）
   - 手机（375x667）

5. **性能测试**
   - Lighthouse 评分
   - 加载时间对比
   - 资源大小对比
