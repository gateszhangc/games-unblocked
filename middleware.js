import { NextResponse } from 'next/server';

export function middleware(request) {
  // 如果访问根路径，重定向到 /index.html
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/index.html', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/',
};
