import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decryptSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("hi_session");

    if (!sessionCookie || !sessionCookie.value) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const sessionData = decryptSession(sessionCookie.value);
    if (!sessionData) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { fullName, phoneNumber, country, city, profession, industry, needsAnalysis } = await request.json();

    if (!fullName || !phoneNumber || !country || !city || !profession || !industry || !needsAnalysis || !Array.isArray(needsAnalysis)) {
      return NextResponse.json({ error: "All profile and needs analysis options are required" }, { status: 400 });
    }

    // Update the database record
    await prisma.user.update({
      where: { email: sessionData.email },
      data: {
        fullName: fullName.trim(),
        phoneNumber: phoneNumber.trim(),
        country: country.trim(),
        city: city.trim(),
        profession: profession.trim(),
        industry: industry.trim(),
        needsAnalysis,
        isOnboarded: true,
      },
    });

    return NextResponse.json({ success: true });
  } catch (e: any) {
    console.error("Onboarding endpoint error:", e);
    return NextResponse.json({ error: e.message || "Failed to complete onboarding" }, { status: 500 });
  }
}
