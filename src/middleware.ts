import { NextResponse } from 'next/server';

import { withAuth } from 'next-auth/middleware';

const middleware = withAuth(
  async function middleware(request) {
    const { pathname } = request.nextUrl;
    const headers = new Headers(request.headers);
    headers.set('x-pathname', pathname);
    return NextResponse.next({ request: { headers } });
  },
  {
    pages: {
      signIn: '/',
    },
  },
);

export { middleware };
