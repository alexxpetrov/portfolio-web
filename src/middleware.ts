import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

const ALLOWED_PATHS = ["/login", "/"];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const accessToken = cookies().get("access_token");
  console.log(pathname, accessToken, cookies().getAll(), request.cookies);
  // @TODO: Replace cookie with auth header
  // const authHeader = headers().get("Authorization");\
  console.log(!ALLOWED_PATHS.includes(pathname), !accessToken);
  if (!ALLOWED_PATHS.includes(pathname) && !accessToken) {
    console.log(
      "redirect to login",
      request.url,
      new URL("/login", request.url)
    );
    return NextResponse.redirect(new URL("/login", request.url));
  }
  // No redirect found, continue without redirecting
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
