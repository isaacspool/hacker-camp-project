import { NextRequest, NextResponse } from "next/server";

export function middleware(request) {
    const secret = request.cookies.get("secret");
    const hasSecret = request.cookies.has("secret");
    const isAuthenticated =
        hasSecret && secret?.value == process.env.LOGIN_SECRET;

    if (!isAuthenticated) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: "/((?!api|_next/static|.*\\..*|_next/image|favicon.ico|login).*)",
};
