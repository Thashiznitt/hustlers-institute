import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const cookieStore = await cookies();
  cookieStore.delete("hi_session");
  return NextResponse.redirect(new URL("/", request.url));
}

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete("hi_session");
  return NextResponse.json({ success: true });
}
