import { NextRequest, NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session && pathname === "/logout") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (session && pathname === "/login") {
    return NextResponse.redirect(new URL("/logout", req.url));
  }

  if (session && pathname === "/signup") {
    return NextResponse.redirect(new URL("/logout", req.url));
  }

  if (!session && pathname === "/profile") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (!session && pathname === "/favorite") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (!session && pathname.startsWith("/image")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (!session && pathname === "/votes") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (!session && pathname === "/upload") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return res;
}
