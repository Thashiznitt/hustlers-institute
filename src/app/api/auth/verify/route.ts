import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { encryptSession } from "@/lib/session";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");
    const redirect = searchParams.get("redirect");

    if (!token) {
      return NextResponse.redirect(new URL("/login?error=missing_token", request.url));
    }

    // Find and consume the token (delete immediately to enforce one-time use)
    const tokenRecord = await prisma.authToken.findUnique({
      where: { token },
    });

    if (!tokenRecord) {
      return NextResponse.redirect(new URL("/login?error=invalid_token", request.url));
    }

    // Delete token
    await prisma.authToken.delete({
      where: { token },
    });

    // Check expiration
    if (tokenRecord.expiresAt < new Date()) {
      return NextResponse.redirect(new URL("/login?error=expired_token", request.url));
    }

    // Get or create user
    let user = await prisma.user.findUnique({
      where: { email: tokenRecord.email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: tokenRecord.email,
          isOnboarded: false,
        },
      });
    }

    // Encrypt session payload
    const sessionToken = encryptSession({
      email: user.email,
      userId: user.id,
    });

    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set("hi_session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      sameSite: "lax",
    });

    // Redirect based on onboarding status
    if (user.isOnboarded) {
      if (redirect) {
        return NextResponse.redirect(new URL(redirect, request.url));
      }
      return NextResponse.redirect(new URL("/learn", request.url));
    } else {
      return NextResponse.redirect(new URL("/onboarding", request.url));
    }
  } catch (e: any) {
    console.error("Verification error:", e);
    return NextResponse.redirect(new URL("/login?error=server_error", request.url));
  }
}
