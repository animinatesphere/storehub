import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const VENDOR_PATHS = ["/dashboard"];
const CUSTOMER_PATHS = ["/account"];
const AUTH_PATHS = ["/login", "/signup"];

export async function proxy(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = request.nextUrl;
  const isLoggedIn = !!token;
  const role = token?.role as string | undefined;

  const isVendorPath = VENDOR_PATHS.some((p) => pathname.startsWith(p));
  const isCustomerPath = CUSTOMER_PATHS.some((p) => pathname.startsWith(p));
  const isAuthPath = AUTH_PATHS.some((p) => pathname.startsWith(p));

  if (isLoggedIn && isAuthPath) {
    const dest = role === "VENDOR" ? "/dashboard" : "/marketplace";
    return NextResponse.redirect(new URL(dest, request.url));
  }

  if (isVendorPath && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login?next=/dashboard", request.url));
  }
  if (isVendorPath && role !== "VENDOR" && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/marketplace", request.url));
  }

  if (isCustomerPath && !isLoggedIn) {
    return NextResponse.redirect(new URL(`/login?next=${pathname}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public).*)"],
};
