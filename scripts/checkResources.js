const fs = require('fs');
const path = require('path');

// 读取HTML文件
const htmlContent = fs.readFileSync('index.html', 'utf8');

// 提取所有资源URL
function extractAssetUrls(htmlContent) {
    const urls = new Set();
    
    // 提取CSS文件
    const cssRegex = /<link[^>]+href=["']([^"']+)["'][^>]*>/gi;
    let match;
    while ((match = cssRegex.exec(htmlContent)) !== null) {
        urls.add(match[1]);
    }
    
    // 提取JS文件
    const jsRegex = /<script[^>]+src=["']([^"']+)["'][^>]*>/gi;
    while ((match = jsRegex.exec(htmlContent)) !== null) {
        urls.add(match[1]);
    }
    
    // 提取图片文件
    const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
    while ((match = imgRegex.exec(htmlContent)) !== null) {
        urls.add(match[1]);
    }
    
    // 提取其他资源文件（如favicon等）
    const otherRegex = /<(link|script)[^>]+(href|src)=["']([^"']+)["'][^>]*>/gi;
    while ((match = otherRegex.exec(htmlContent)) !== null) {
        urls.add(match[2]);
    }
    
    return Array.from(urls);
}

// 检查资源是否存在
function checkResourceExists(url) {
    // 确定本地文件路径
    let localPath;
    if (url.startsWith('./assets/')) {
        localPath = url.substring(2); // 移除 './'
    } else if (url.startsWith('/assets/')) {
        localPath = url.substring(1); // 移除 '/'
    } else if (url.startsWith('./media/')) {
        localPath = url.substring(2); // 移除 './'
    } else if (url.startsWith('/media/')) {
        localPath = url.substring(1); // 移除 '/'
    } else {
        localPath = url;
    }
    
    // 检查文件是否存在
    const exists = fs.existsSync(localPath);
    if (!exists) {
        console.log(`缺失资源: ${localPath}`);
        return false;
    }
    
    return true;
}

// 主函数
function main() {
    console.log('检查资源文件...');
    
    // 提取所有资源URL
    const assetUrls = extractAssetUrls(htmlContent);
    console.log(`找到 ${assetUrls.length} 个资源文件`);
    
    let missingCount = 0;
    let existingCount = 0;
    
    // 检查每个资源
    for (const url of assetUrls) {
        // 跳过外部URL和data: URL
        if (url.startsWith('http') || url.startsWith('data:')) {
            continue;
        }
        
        if (checkResourceExists(url)) {
            existingCount++;
        } else {
            missingCount++;
        }
    }
    
    console.log(`存在的资源: ${existingCount}`);
    console.log(`缺失的资源: ${missingCount}`);
    
    if (missingCount === 0) {
        console.log('所有资源文件都已正确下载！');
    } else {
        console.log('还有一些资源文件缺失，请检查下载脚本。');
    }
}

// 运行主函数
main();