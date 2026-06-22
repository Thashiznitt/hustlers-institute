import { NextResponse } from "next/server";
import { readDb, writeDb } from "@/lib/dbHelper";

export async function POST(request: Request) {
  try {
    const db = readDb();
    const activeId = db.activeWorkspaceId;

    if (activeId) {
      db.workspaces = db.workspaces.filter((w) => w.id !== activeId);
      if (db.workspaces.length > 0) {
        db.activeWorkspaceId = db.workspaces[0].id;
      } else {
        db.activeWorkspaceId = null;
      }
      writeDb(db);
    }

    const currentWorkspace = db.workspaces.find((w) => w.id === db.activeWorkspaceId) || null;

    return NextResponse.json({
      activeWorkspaceId: db.activeWorkspaceId,
      workspaces: db.workspaces.map((w) => ({ id: w.id, name: w.name, category: w.category })),
      currentWorkspace
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete business workspace slot" }, { status: 500 });
  }
}
