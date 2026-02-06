import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, COOKIE_NAME } from '@/lib/auth';

const PUBLIC_API_PATTERNS = [
  /^\/api\/leads$/,
  /^\/api\/qr\/[^/]+\/scan$/,
];

function isPublicApiRoute(pathname: string): boolean {
  return PUBLIC_API_PATTERNS.some(pattern => pattern.test(pathname));
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Login page: redirect to dashboard if already authenticated
  if (pathname === '/admin/login') {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    if (token) {
      const payload = await verifyToken(token);
      if (payload) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    }
    return NextResponse.next();
  }

  // Skip auth for public API routes (lead submissions + QR scan tracking)
  if (isPublicApiRoute(pathname)) {
    return NextResponse.next();
  }

  // All other matched routes require auth
  const token = request.cookies.get(COOKIE_NAME)?.value;

  if (!token) {
    return handleUnauthorized(request, pathname);
  }

  const payload = await verifyToken(token);
  if (!payload) {
    return handleUnauthorized(request, pathname);
  }

  return NextResponse.next();
}

function handleUnauthorized(request: NextRequest, pathname: string) {
  if (pathname.startsWith('/api/')) {
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    );
  }

  const loginUrl = new URL('/admin/login', request.url);
  loginUrl.searchParams.set('from', pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    '/',
    '/dashboard/:path*',
    '/admin/login',
    '/api/campaigns/:path*',
    '/api/qr/:path*',
    '/api/landing-pages/:path*',
  ],
};
