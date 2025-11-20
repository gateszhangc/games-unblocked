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
const homePages = [];
const gamePages = [];
const categoryPages = [];
const otherPages = [];

// 检查本地文件系统中已存在的页面
const checkLocalFileExists = (url) => {
    // 从URL中提取文件路径
    const urlObj = new URL(url);
    let filePath = urlObj.pathname;
    
    // 如果是根路径或以/结尾，添加index.html
    if (filePath === '/' || filePath.endsWith('/')) {
        filePath += 'index.html';
    }
    
    // 移除开头的斜杠
    if (filePath.startsWith('/')) {
        filePath = filePath.substring(1);
    }
    
    // 检查public/static-pages目录
    const staticPagePath = path.join('public', 'static-pages', filePath);
    if (fs.existsSync(staticPagePath)) {
        return { exists: true, path: staticPagePath };
    }
    
    // 检查public目录
    const publicPath = path.join('public', filePath);
    if (fs.existsSync(publicPath)) {
        return { exists: true, path: publicPath };
    }
    
    // 检查pages目录
    const pagesPath = path.join('pages', filePath);
    if (fs.existsSync(pagesPath)) {
        return { exists: true, path: pagesPath };
    }
    
    return { exists: false, path: null };
};

internalLinks.forEach(link => {
    try {
        const linkObj = new URL(link);
        const path = linkObj.pathname;
        const fileName = path.split('/').pop() || 'index.html';
        const pageName = fileName.replace('.html', '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        
        // 检查本地文件是否存在
        const localFile = checkLocalFileExists(link);
        
        const pageInfo = {
            url: link,
            name: pageName,
            fileName: fileName,
            isReplicated: localFile.exists,
            localPath: localFile.path
        };
        
        // 按文件类型或目录分类
        if (path.endsWith('.html')) {
            if (path.endsWith('index.html')) {
                if (path === '/' || path.endsWith('/index.html')) {
                    if (path === '/' || path === '/index.html') {
                        homePages.push({ ...pageInfo, name: 'Home' });
                    } else {
                        const categoryName = path.split('/')[1] || '';
                        pageInfo.name = categoryName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) + ' Games';
                        categoryPages.push(pageInfo);
                    }
                } else {
                    const categoryName = path.split('/')[1] || '';
                    pageInfo.name = categoryName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) + ' Games';
                    categoryPages.push(pageInfo);
                }
            } else {
                gamePages.push(pageInfo);
            }
        } else {
            otherPages.push(pageInfo);
        }
    } catch (e) {
        console.log('无法处理链接:', link);
    }
});

// 创建详细的markdown报告
const totalPages = homePages.length + gamePages.length + categoryPages.length + otherPages.length;
const replicatedCount = [...homePages, ...gamePages, ...categoryPages, ...otherPages].filter(p => p.isReplicated).length;

let report = `# 网站详细页面列表及复刻状态

## 摘要
- 总页面数: ${totalPages}
- 已复刻页面: ${replicatedCount}
- 未复刻页面: ${totalPages - replicatedCount}
- 复刻进度: ${((replicatedCount / totalPages) * 100).toFixed(1)}%

## 首页和分类页面 (${homePages.length + categoryPages.length})

### 主页
| 页面名称 | 文件名 | 复刻状态 | 本地路径 |
|---------|--------|---------|---------|
${homePages.map(page => 
    `| ${page.name} | ${page.fileName} | ${page.isReplicated ? '✅ 已复刻' : '❌ 未复刻'} | ${page.localPath || 'N/A'} |`
).join('\n')}

### 分类页面
| 页面名称 | 文件名 | 复刻状态 | 本地路径 |
|---------|--------|---------|---------|
${categoryPages.map(page => 
    `| ${page.name} | ${page.fileName} | ${page.isReplicated ? '✅ 已复刻' : '❌ 未复刻'} | ${page.localPath || 'N/A'} |`
).join('\n')}

## 游戏页面 (${gamePages.length})

| 页面名称 | 文件名 | 复刻状态 | 本地路径 |
|---------|--------|---------|---------|
${gamePages.map(page => 
    `| ${page.name} | ${page.fileName} | ${page.isReplicated ? '✅ 已复刻' : '❌ 未复刻'} | ${page.localPath || 'N/A'} |`
).join('\n')}

## 其他页面 (${otherPages.length})

| 页面名称 | 文件名 | 复刻状态 | 本地路径 |
|---------|--------|---------|---------|
${otherPages.map(page => 
    `| ${page.name} | ${page.fileName} | ${page.isReplicated ? '✅ 已复刻' : '❌ 未复刻'} | ${page.localPath || 'N/A'} |`
).join('\n')}

## 外部链接 (${externalLinks.size})
${Array.from(externalLinks).sort().map(link => `- ${link}`).join('\n')}

## 复刻进度总结
- 总页面数: ${totalPages}
- 已复刻: ${replicatedCount} (${((replicatedCount / totalPages) * 100).toFixed(1)}%)
- 未复刻: ${totalPages - replicatedCount} (${(((totalPages - replicatedCount) / totalPages) * 100).toFixed(1)}%)
`;

// 将报告保存到markdown文件
fs.writeFileSync('detailed_page_list.md', report, 'utf8');

console.log('详细分析完成。报告已保存到 detailed_page_list.md');
console.log(`总页面数: ${totalPages}, 已复刻: ${replicatedCount}, 未复刻: ${totalPages - replicatedCount}`);