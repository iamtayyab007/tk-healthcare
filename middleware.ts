// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const otp = request.cookies.get("adminOtp")?.value;

  // Redirect if trying to access /admin without valid cookie
  if (!otp && request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/?admin=true", request.url));
  }

  return NextResponse.next();
}
