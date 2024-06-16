import { NextRequest, NextResponse } from "next/server";
import { supabase } from "./lib/supabase";

export async function middleware(request: NextRequest) {}

async function getSession(request: NextRequest) {
  const token = request.cookies.get("supabase-auth-token");
  if (!token) return null;

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  if (error) {
    console.error("Error fetching session:", error);
    return null;
  }
  return session;
}
