import { NextRequest, NextResponse } from 'next/server';

import { withAuth } from 'next-auth/middleware';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const headers = new Headers(request.headers);
  headers.set('x-pathname', pathname);
  if (pathname !== '/') return withAuth(request);
  return NextResponse.next({ request: { headers } });
}
