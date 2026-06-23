import { NextResponse } from "next/server";
import { readDb, writeDb, DbSchema, Workspace } from "@/lib/dbHelper";

const DEFAULT_TARGETS: Record<string, any> = {
  tech: { acquisition: 500, adoption: 80, sales: 10000, latency: 200, complaints: 5, resolutions: 5, sentiment: 85 },
  retail: { acquisition: 800, adoption: 60, sales: 15000, latency: 5, complaints: 10, resolutions: 10, sentiment: 90 },
  b2b: { acquisition: 20, adoption: 85, sales: 25000, latency: 48, complaints: 2, resolutions: 2, sentiment: 90 },
  ecommerce: { acquisition: 5000, adoption: 3.5, sales: 20000, latency: 2.5, complaints: 15, resolutions: 15, sentiment: 85 },
  creator: { acquisition: 1500, adoption: 18, sales: 5000, latency: 4, complaints: 4, resolutions: 4, sentiment: 92 }
};

const MODE_NAMES: Record<string, string> = {
  tech: "App or Software Business",
  retail: "Physical Shop or Restaurant",
  b2b: "Service or Consulting Business",
  ecommerce: "Online Store",
  creator: "Content Creator or Social Media"
};

function getInitialLogs(mode: string) {
  switch (mode) {
    case "retail":
      return [
        { period: 1, acquisition: 620, adoption: 48, sales: 11200, latency: 7.5, complaints: 12, resolutions: 8, sentiment: 75, computedHealth: 63 },
        { period: 2, acquisition: 700, adoption: 52, sales: 12800, latency: 6.2, complaints: 9, resolutions: 7, sentiment: 82, computedHealth: 71 },
        { period: 3, acquisition: 680, adoption: 54, sales: 12500, latency: 6.5, complaints: 10, resolutions: 9, sentiment: 80, computedHealth: 72 },
        { period: 4, acquisition: 790, adoption: 58, sales: 14600, latency: 5.2, complaints: 4, resolutions: 4, sentiment: 91, computedHealth: 84 }
      ];
    case "b2b":
      return [
        { period: 1, acquisition: 12, adoption: 70, sales: 18000, latency: 60, complaints: 3, resolutions: 1, sentiment: 80, computedHealth: 64 },
        { period: 2, acquisition: 16, adoption: 75, sales: 21000, latency: 55, complaints: 2, resolutions: 1, sentiment: 84, computedHealth: 72 },
        { period: 3, acquisition: 15, adoption: 78, sales: 23000, latency: 52, complaints: 2, resolutions: 2, sentiment: 86, computedHealth: 78 },
        { period: 4, acquisition: 21, adoption: 83, sales: 26500, latency: 46, complaints: 1, resolutions: 1, sentiment: 92, computedHealth: 88 }
      ];
    case "ecommerce":
      return [
        { period: 1, acquisition: 3800, adoption: 2.5, sales: 13500, latency: 3.9, complaints: 18, resolutions: 12, sentiment: 76, computedHealth: 62 },
        { period: 2, acquisition: 4200, adoption: 2.8, sales: 16200, latency: 3.2, complaints: 14, resolutions: 11, sentiment: 81, computedHealth: 72 },
        { period: 3, acquisition: 4100, adoption: 2.9, sales: 15800, latency: 3.5, complaints: 15, resolutions: 13, sentiment: 79, computedHealth: 73 },
        { period: 4, acquisition: 4900, adoption: 3.3, sales: 19500, latency: 2.7, complaints: 7, resolutions: 7, sentiment: 88, computedHealth: 85 }
      ];
    case "creator":
      return [
        { period: 1, acquisition: 1100, adoption: 12, sales: 3500, latency: 6.8, complaints: 6, resolutions: 3, sentiment: 80, computedHealth: 61 },
        { period: 2, acquisition: 1300, adoption: 14, sales: 4200, latency: 5.5, complaints: 4, resolutions: 3, sentiment: 86, computedHealth: 73 },
        { period: 3, acquisition: 1250, adoption: 15, sales: 4100, latency: 5.8, complaints: 4, resolutions: 4, sentiment: 85, computedHealth: 76 },
        { period: 4, acquisition: 1480, adoption: 17.5, sales: 4900, latency: 4.2, complaints: 2, resolutions: 2, sentiment: 93, computedHealth: 86 }
      ];
    case "tech":
    default:
      return [
        { period: 1, acquisition: 380, adoption: 68, sales: 7500, latency: 260, complaints: 8, resolutions: 5, sentiment: 74, computedHealth: 64 },
        { period: 2, acquisition: 440, adoption: 72, sales: 8400, latency: 230, complaints: 6, resolutions: 5, sentiment: 78, computedHealth: 73 },
        { period: 3, acquisition: 420, adoption: 71, sales: 8100, latency: 240, complaints: 7, resolutions: 6, sentiment: 76, computedHealth: 74 },
        { period: 4, acquisition: 490, adoption: 79, sales: 9800, latency: 205, complaints: 3, resolutions: 3, sentiment: 87, computedHealth: 86 }
      ];
  }
}

export async function POST(request: Request) {
  try {
    const { name, industry, category, loggingInterval, description, mission, goals } = await request.json();

    if (!name || !industry || !category || !loggingInterval || !description || !mission) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
    }

    const targets = DEFAULT_TARGETS[category] || DEFAULT_TARGETS.tech;
    const modeName = MODE_NAMES[category] || MODE_NAMES.tech;

    // Simulate AI synthesis on the backend
    const refinedDescription = `A focused ${industry} business built as a ${modeName}. Designed to make it extremely easy for new customers to join, keep waiting times under ${targets.latency}, and help you build a loyal customer base.`;
    const refinedMission = `To build a simple, friendly service in the ${industry} market, matching your goal of "${mission.replace(/\.$/, "")}" while making sure your customers are happy and satisfied.`;
    const refinedGoals = `YOUR BUSINESS GOALS:\n\n• CUSTOMER GROWTH: Get more than ${targets.acquisition} new customers this period.\n• ACTIVE CUSTOMERS: Keep active customer usage above ${targets.adoption}%.\n• SALES TARGET: Reach sales of $${targets.sales} this period.\n• CUSTOMER CARE: Resolve customer issues quickly and keep happiness scores above ${targets.sentiment}%.`;

    const workspaceId = Math.random().toString(36).substring(2) + Date.now().toString(36);

    const newWorkspace: Workspace = {
      id: workspaceId,
      name,
      industry,
      category,
      loggingInterval: loggingInterval === "daily" ? "daily" : "weekly",
      rawDescription: description,
      rawMission: mission,
      rawGoals: goals || "",
      refinedDescription,
      refinedMission,
      refinedGoals,
      targets,
      logs: getInitialLogs(category)
    };

    const db = readDb();
    
    // Check if name is duplicate inside workspaces, append or overwrite
    db.workspaces.push(newWorkspace);
    db.activeWorkspaceId = workspaceId;

    writeDb(db);

    return NextResponse.json({
      activeWorkspaceId: db.activeWorkspaceId,
      workspaces: db.workspaces.map((w) => ({ id: w.id, name: w.name, category: w.category })),
      currentWorkspace: newWorkspace
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to configure business profile workspace" }, { status: 500 });
  }
}
