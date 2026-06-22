import { NextResponse } from "next/server";
import { readDb, writeDb } from "@/lib/dbHelper";

export async function POST(request: Request) {
  try {
    const { acquisition, adoption, sales, latency, complaints, resolutions, sentiment } = await request.json();

    const db = readDb();
    const workspace = db.workspaces.find((w) => w.id === db.activeWorkspaceId);

    if (!workspace) {
      return NextResponse.json({ error: "No active business workspace found. Please run onboarding setup first." }, { status: 400 });
    }

    const targets = workspace.targets;

    // Normalizing each vector against targets (capped at 100)
    const acqScore = Math.min(100, (acquisition / targets.acquisition) * 100);
    const adpScore = Math.min(100, (adoption / targets.adoption) * 100);
    const salesScore = Math.min(100, (sales / targets.sales) * 100);
    
    // Latency is reverse (less is better)
    let latScore = 100;
    if (latency > targets.latency) {
      latScore = Math.max(0, 100 - ((latency - targets.latency) / targets.latency) * 100);
    }

    // Customer Service (Complaints & Resolutions & Sentiment)
    const resRate = complaints === 0 ? 100 : Math.min(100, (resolutions / complaints) * 100);
    const csScore = (sentiment * 0.6) + (resRate * 0.4);

    // Weighted index allocation:
    // 20% Acquisition, 20% Adoption, 20% Sales, 10% Latency, 30% Customer Care
    const health = (acqScore * 0.2) + (adpScore * 0.2) + (salesScore * 0.2) + (latScore * 0.1) + (csScore * 0.3);
    const computedHealth = Math.round(health);

    const nextPeriod = workspace.logs.length + 1;
    const newLog = {
      period: nextPeriod,
      acquisition,
      adoption,
      sales,
      latency,
      complaints,
      resolutions,
      sentiment,
      computedHealth
    };

    workspace.logs.push(newLog);
    writeDb(db);

    return NextResponse.json({ log: newLog, logs: workspace.logs });
  } catch (error) {
    return NextResponse.json({ error: "Failed to record operations log entry" }, { status: 500 });
  }
}
