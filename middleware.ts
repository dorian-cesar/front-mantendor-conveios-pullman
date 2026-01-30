import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function validateTokenInMiddleware(token: string): boolean {
    if (!token) return false;

    try {
        const payloadBase64 = token.split('.')[1];
        const payload = JSON.parse(atob(payloadBase64));
        
        if (!payload.exp) {
            return true;
        }

        const expiresAt = payload.exp * 1000;
        const now = Date.now();
        return now < expiresAt;
    } catch {
        return false;
    }
}

export function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith("/dashboard")) {
        const token = request.cookies.get("token")?.value;
        
        if (!token) {
            console.log("Redirigiendo a login - sin cookie token");
            return NextResponse.redirect(new URL("/", request.url));
        }

        const isValid = validateTokenInMiddleware(token);
        
        if (!isValid) {
            console.log("Token inválido o expirado");
            const response = NextResponse.redirect(new URL("/?session=expired", request.url));
            response.cookies.delete("token");
            return response;
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*"],
};