import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decryptSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("hi_session");

    if (!sessionCookie || !sessionCookie.value) {
      return NextResponse.json({ authenticated: false });
    }

    const sessionData = decryptSession(sessionCookie.value);
    if (!sessionData) {
      return NextResponse.json({ authenticated: false });
    }

    const user = await prisma.user.findUnique({
      where: { email: sessionData.email },
    });

    if (!user) {
      return NextResponse.json({ authenticated: false });
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        phoneNumber: user.phoneNumber,
        country: user.country,
        city: user.city,
        profession: user.profession,
        industry: user.industry,
        needsAnalysis: user.needsAnalysis,
        isOnboarded: user.isOnboarded,
      },
    });
  } catch (e) {
    console.error("Session check error:", e);
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }
}
