import { NextResponse } from "next/server";
import { readDb, writeDb } from "@/lib/dbHelper";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const switchId = searchParams.get("switchId");

    const db = readDb();

    if (switchId) {
      const exists = db.workspaces.some((w) => w.id === switchId);
      if (exists) {
        db.activeWorkspaceId = switchId;
        writeDb(db);
      }
    } else if (!db.activeWorkspaceId && db.workspaces.length > 0) {
      db.activeWorkspaceId = db.workspaces[0].id;
      writeDb(db);
    }

    const currentWorkspace = db.workspaces.find((w) => w.id === db.activeWorkspaceId) || null;

    return NextResponse.json({
      activeWorkspaceId: db.activeWorkspaceId,
      workspaces: db.workspaces.map((w) => ({ id: w.id, name: w.name, category: w.category })),
      currentWorkspace
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch sentinel workspaces" }, { status: 500 });
  }
}
