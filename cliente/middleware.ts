import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const authToken = request.cookies.get('auth_token');
    const userCookie = request.cookies.get('user');

    const { pathname } = request.nextUrl;

    // Public routes
    if (pathname === '/login') {
        // If authenticated, redirect to appropriate dashboard
        if (authToken && userCookie) {
            try {
                const user = JSON.parse(userCookie.value);
                if (user.role.slug === 'admin') {
                    return NextResponse.redirect(new URL('/admin', request.url));
                } else {
                    return NextResponse.redirect(new URL('/dashboard', request.url));
                }
            } catch (error) {
                // Invalid cookie, continue to login
                return NextResponse.next();
            }
        }
        return NextResponse.next();
    }

    // Protected routes
    if (pathname.startsWith('/admin') || pathname.startsWith('/dashboard')) {
        if (!authToken || !userCookie) {
            return NextResponse.redirect(new URL('/login', request.url));
        }

        try {
            const user = JSON.parse(userCookie.value);

            // Admin routes - only for admins
            if (pathname.startsWith('/admin')) {
                if (user.role.slug !== 'admin') {
                    return NextResponse.redirect(new URL('/dashboard', request.url));
                }
            }

            return NextResponse.next();
        } catch (error) {
            // Invalid user cookie
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    // Root path - allow access to everyone
    if (pathname === '/') {
        return NextResponse.next();
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/admin/:path*', '/dashboard/:path*', '/login'],
};
