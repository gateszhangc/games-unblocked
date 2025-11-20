const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { URL } = require('url');

// 创建必要的目录
function createDirectory(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        console.log(`创建目录: ${dirPath}`);
    }
}

// 下载文件
function downloadFile(url, filePath) {
    return new Promise((resolve, reject) => {
        const protocol = url.startsWith('https') ? https : http;
        const file = fs.createWriteStream(filePath);
        
        protocol.get(url, (response) => {
            if (response.statusCode === 200) {
                response.pipe(file);
                file.on('finish', () => {
                    file.close();
                    console.log(`下载完成: ${filePath}`);
                    resolve();
                });
            } else {
                file.close();
                fs.unlink(filePath, () => {}); // 删除不完整的文件
                reject(new Error(`无法下载 ${url}. 状态码: ${response.statusCode}`));
            }
        }).on('error', (err) => {
            file.close();
            fs.unlink(filePath, () => {}); // 删除不完整的文件
            reject(err);
        });
    });
}

// 从HTML中提取所有资源URL
function extractAssetUrls(htmlContent) {
    const urls = new Set();
    
    // 提取CSS文件
    const cssRegex = /<link[^>]+href=["']([^"']+?)["'][^>]*>/gi;
    let match;
    while ((match = cssRegex.exec(htmlContent)) !== null) {
        if (match[1].endsWith('.css')) {
            urls.add(match[1]);
        }
    }
    
    // 提取JS文件
    const jsRegex = /<script[^>]+src=["']([^"']+?)["'][^>]*>/gi;
    while ((match = jsRegex.exec(htmlContent)) !== null) {
        if (match[1].endsWith('.js')) {
            urls.add(match[1]);
        }
    }
    
    // 提取图片文件
    const imgRegex = /<img[^>]+src=["']([^"']+?)["'][^>]*>/gi;
    while ((match = imgRegex.exec(htmlContent)) !== null) {
        urls.add(match[1]);
    }
    
    // 提取其他资源文件（如favicon等）
    const otherRegex = /<(link|script)[^>]+(href|src)=["']([^"']+?)["'][^>]*>/gi;
    while ((match = otherRegex.exec(htmlContent)) !== null) {
        urls.add(match[2]);
    }
    
    return Array.from(urls);
}

// 主函数
async function main() {
    try {
        console.log('开始下载静态资源...');
        
        // 读取HTML文件
        const htmlContent = fs.readFileSync('original_site.html', 'utf8');
        
        // 创建必要的目录
        createDirectory('assets');
        createDirectory('assets/css');
        createDirectory('assets/js');
        createDirectory('assets/img');
        createDirectory('assets/svg');
        createDirectory('assets/images');
        createDirectory('assets/scripts');
        createDirectory('media');
        createDirectory('media/website');
        createDirectory('media/posts');
        createDirectory('media/files');
        createDirectory('media/tags');
        createDirectory('media/plugins');
        
        // 提取所有资源URL
        const assetUrls = extractAssetUrls(htmlContent);
        console.log(`找到 ${assetUrls.length} 个资源文件`);
        
        // 下载每个资源
        const baseUrl = 'https://unblocked-games.s3.amazonaws.com';
        
        for (const url of assetUrls) {
            try {
                // 跳过外部URL和data: URL
                if (url.startsWith('http') && !url.includes('unblocked-games.s3.amazonaws.com')) {
                    console.log(`跳过外部资源: ${url}`);
                    continue;
                }
                
                if (url.startsWith('data:')) {
                    console.log(`跳过data URL: ${url.substring(0, 30)}...`);
                    continue;
                }
                
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
                
                // 构建完整的URL
                let fullUrl;
                if (url.startsWith('http')) {
                    fullUrl = url;
                } else if (url.startsWith('//')) {
                    fullUrl = 'https:' + url;
                } else {
                    fullUrl = baseUrl + (url.startsWith('/') ? url : '/' + url);
                }
                
                // 确保目录存在
                const dir = path.dirname(localPath);
                if (dir && dir !== '.') {
                    createDirectory(dir);
                }
                
                // 下载文件
                await downloadFile(fullUrl, localPath);
            } catch (error) {
                console.error(`下载失败 ${url}: ${error.message}`);
            }
        }
        
        console.log('资源下载完成!');
    } catch (error) {
        console.error('发生错误:', error);
    }
}

// 运行主函数
main();