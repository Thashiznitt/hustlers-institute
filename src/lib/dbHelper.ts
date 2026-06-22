import fs from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "src", "lib", "db.json");

export interface Workspace {
  id: string;
  name: string;
  industry: string;
  category: string;
  loggingInterval: "daily" | "weekly";
  rawDescription: string;
  rawMission: string;
  rawGoals: string;
  refinedDescription: string;
  refinedMission: string;
  refinedGoals: string;
  targets: {
    acquisition: number;
    adoption: number;
    sales: number;
    latency: number;
    complaints: number;
    resolutions: number;
    sentiment: number;
  };
  logs: Array<{
    period: number; // Day or Week index
    acquisition: number;
    adoption: number;
    sales: number;
    latency: number;
    complaints: number;
    resolutions: number;
    sentiment: number;
    computedHealth: number;
  }>;
}

export interface DbSchema {
  activeWorkspaceId: string | null;
  workspaces: Workspace[];
}

export function readDb(): DbSchema {
  try {
    if (!fs.existsSync(dbPath)) {
      const defaultDb: DbSchema = { activeWorkspaceId: null, workspaces: [] };
      fs.writeFileSync(dbPath, JSON.stringify(defaultDb, null, 2));
      return defaultDb;
    }
    const data = fs.readFileSync(dbPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading db.json, returning empty structure", error);
    return { activeWorkspaceId: null, workspaces: [] };
  }
}

export function writeDb(data: DbSchema): void {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error writing to db.json", error);
  }
}
