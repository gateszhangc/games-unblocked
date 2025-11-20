import { Html, Head, Main, NextScript } from 'next/document';
import fs from 'fs';
import path from 'path';

export default function Document() {
  // 读取根目录下的 index.html 文件
  const htmlPath = path.join(process.cwd(), 'index.html');
  const htmlContent = fs.readFileSync(htmlPath, 'utf8');
  
  // 提取 body 标签及其属性
  const bodyMatch = htmlContent.match(/<body([^>]*)>([\s\S]*?)<\/body>/);
  const bodyAttributes = bodyMatch ? bodyMatch[1] : '';
  const bodyContent = bodyMatch ? bodyMatch[2] : '';
  
  // 解析 body 的 style 属性
  const styleMatch = bodyAttributes.match(/style="([^"]*)"/);
  const bodyStyle = styleMatch ? styleMatch[1] : '';
  
  // 提取 head 内容
  const headMatch = htmlContent.match(/<head[^>]*>([\s\S]*?)<\/head>/);
  const headContent = headMatch ? headMatch[1] : '';

  return (
    <Html lang="en">
      <Head>
        {/* 直接注入原 HTML 的 head 内容 */}
        <div dangerouslySetInnerHTML={{ __html: headContent }} />
      </Head>
      <body style={{ backgroundImage: "url('/assets/img/bg_og.webp')", backgroundColor: 'black' }}>
        {/* 直接注入原 HTML 的 body 内容 */}
        <div dangerouslySetInnerHTML={{ __html: bodyContent }} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}