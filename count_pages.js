const fs = require('fs');
const path = require('path');

// 读取dublix.html文件
const htmlContent = fs.readFileSync('dublix.html', 'utf8');

// 提取所有链接的正则表达式
const linkPattern = /href=["']([^"']+)["']/g;
const links = [];
let match;

while ((match = linkPattern.exec(htmlContent)) !== null) {
    links.push(match[1]);
}

// 过滤和规范化链接
const internalLinks = new Set();
const externalLinks = new Set();
const baseUrl = "https://unblocked-games.s3.amazonaws.com/";

links.forEach(link => {
    // 跳过javascript、mailto和其他非http链接
    if (link.startsWith('javascript:') || link.startsWith('mailto:') || link.startsWith('#')) {
        return;
    }
    
    // 将相对链接转换为绝对链接
    let absoluteLink;
    if (link.startsWith('./') || link.startsWith('/')) {
        absoluteLink = new URL(link, baseUrl).href;
    } else {
        absoluteLink = link;
    }
    
    // 检查是否是内部链接（相同域名）
    try {
        const baseUrlObj = new URL(baseUrl);
        const linkObj = new URL(absoluteLink);
        
        if (baseUrlObj.hostname === linkObj.hostname) {
            // 清理URL - 移除片段
            linkObj.hash = '';
            internalLinks.add(linkObj.href);
        } else {
            externalLinks.add(absoluteLink);
        }
    } catch (e) {
        // 如果URL解析失败，跳过
        console.log('无法解析URL:', absoluteLink);
    }
});

// 分类内部链接
const pageTypes = {
    'Home Pages': [],
    'Game Pages': [],
    'Category Index Pages': [],
    'Other Pages': []
};
const otherFiles = new Set();

internalLinks.forEach(link => {
    try {
        const linkObj = new URL(link);
        const path = linkObj.pathname;
        
        // 按文件类型或目录分类
        if (path.endsWith('.html')) {
            if (path.endsWith('index.html')) {
                if (path === '/' || path.endsWith('/index.html')) {
                    pageTypes['Home Pages'].push(link);
                } else {
                    pageTypes['Category Index Pages'].push(link);
                }
            } else {
                pageTypes['Game Pages'].push(link);
            }
        } else if (path.endsWith('.css')) {
            otherFiles.add('CSS Files');
        } else if (path.endsWith('.js')) {
            otherFiles.add('JavaScript Files');
        } else if (path.match(/\.(webp|jpg|png|ico|svg)$/)) {
            otherFiles.add('Image Files');
        } else if (path.endsWith('.json')) {
            otherFiles.add('JSON Files');
        } else {
            pageTypes['Other Pages'].push(link);
        }
    } catch (e) {
        console.log('无法处理链接:', link);
    }
});

// 创建markdown报告
const totalPages = Object.values(pageTypes).reduce((sum, pages) => sum + pages.length, 0);
const report = `# 网站页面数量分析

## 摘要
- 内部链接总数: ${internalLinks.size}
- 外部链接总数: ${externalLinks.size}
- 唯一页面总数: ${totalPages}

## 页面分类

### 首页 (${pageTypes['Home Pages'].length})
${pageTypes['Home Pages'].sort().map(link => `- ${link}`).join('\n')}

### 游戏页面 (${pageTypes['Game Pages'].length})
${pageTypes['Game Pages'].sort().map(link => `- ${link}`).join('\n')}

### 分类索引页面 (${pageTypes['Category Index Pages'].length})
${pageTypes['Category Index Pages'].sort().map(link => `- ${link}`).join('\n')}

### 其他页面 (${pageTypes['Other Pages'].length})
${pageTypes['Other Pages'].sort().map(link => `- ${link}`).join('\n')}

## 其他文件类型
${Array.from(otherFiles).sort().map(fileType => `- ${fileType}`).join('\n')}

## 外部链接 (${externalLinks.size})
${Array.from(externalLinks).sort().slice(0, 20).map(link => `- ${link}`).join('\n')}
${externalLinks.size > 20 ? '...' : ''}

## 网页总数
该网站大约包含 **${totalPages} 个网页**。
`;

// 将报告保存到markdown文件
fs.writeFileSync('website_page_count.md', report, 'utf8');

console.log('分析完成。报告已保存到 website_page_count.md');
console.log(`找到的网页总数: ${totalPages}`);