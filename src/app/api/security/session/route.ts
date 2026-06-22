import { NextRequest, NextResponse } from "next/server";
import { isTravelImpossible } from "@/lib/security";

// Mock Geolocation Coordinate DB based on IPs
const IP_GEO_DB: Record<string, { lat: number; lon: number; city: string; country: string }> = {
  "197.248.9.15": { lat: -1.2921, lon: 36.8219, city: "Nairobi", country: "Kenya" }, // Nairobi
  "91.74.22.180": { lat: 25.2048, lon: 55.2708, city: "Dubai", country: "UAE" },    // Dubai
  "104.244.42.1": { lat: 37.7749, lon: -122.4194, city: "San Francisco", country: "USA" } // SF
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { currentIp, targetIp, timeDifferenceHours } = body;

    if (!currentIp || !targetIp) {
      return NextResponse.json({ error: "Missing required IP vectors" }, { status: 400 });
    }

    const geo1 = IP_GEO_DB[currentIp] || IP_GEO_DB["197.248.9.15"];
    const geo2 = IP_GEO_DB[targetIp] || IP_GEO_DB["91.74.22.180"];

    const velocityCheck = isTravelImpossible(
      geo1.lat,
      geo1.lon,
      geo2.lat,
      geo2.lon,
      timeDifferenceHours
    );

    const isSuspended = velocityCheck.impossible;

    return NextResponse.json({
      status: isSuspended ? "SUSPENDED" : "ALLOWED",
      distanceKm: Math.round(velocityCheck.distanceKm),
      speedKmh: Math.round(velocityCheck.speedKmh),
      impossible: velocityCheck.impossible,
      from: {
        ip: currentIp,
        city: geo1.city,
        country: geo1.country
      },
      to: {
        ip: targetIp,
        city: geo2.city,
        country: geo2.country
      }
    });
  } catch (err: any) {
    return NextResponse.json({ error: "Internal security failure", details: err.message }, { status: 500 });
  }
}
