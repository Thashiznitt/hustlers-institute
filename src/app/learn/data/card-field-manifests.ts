// Field manifests for interactive Card Workspaces.
//
// Each entry declares the free-text inputs a workspace exposes so that Leo
// (/api/card-context) knows exactly which fields to write niche-aware
// placeholders + examples for. Keyed by card *id* (matching cardsList).
//
// Only fields that benefit from niche adaptation are listed — functional
// dropdowns/enums (status, day, font, etc.) are intentionally omitted.
//
// To make a new workspace niche-aware: add its id + fields here, then read
// `useNicheCardContent(cardId)` in the workspace and apply the returned
// placeholders. No manifest → the hook no-ops and generic placeholders show.

export interface CardField {
  key: string;
  label: string;
  /** Generic, niche-agnostic fallback shown before/without AI adaptation. */
  fallback: string;
}

export const cardFieldManifests: Record<string, CardField[]> = {
  // Card 01 — Customer Chats (interviews)
  "interviews": [
    { key: "chatTarget", label: "Target Customer Profile", fallback: "Who are you researching? (your target customers)" },
    { key: "chatProblem", label: "Core Struggle / Problem Area", fallback: "What problem are they facing?" },
  ],
  // Card 15 — Customer Profiles (end-user-maps)
  "end-user-maps": [
    { key: "name", label: "Persona name / role", fallback: "e.g. a typical customer name and role" },
    { key: "location", label: "Where they are", fallback: "e.g. where your customers are" },
    { key: "device", label: "Primary device", fallback: "e.g. the phones your customers use" },
    { key: "connection", label: "Internet connection", fallback: "e.g. their typical connection speed" },
    { key: "needs", label: "Top need", fallback: "What do they need most?" },
    { key: "motivations", label: "Motivation", fallback: "Why do they want this?" },
    { key: "similarApps", label: "Current workaround / tools", fallback: "e.g. tools they use today" },
    { key: "pain", label: "Hardest friction", fallback: "What is the hardest friction they face?" },
  ],
  // Card 26 — 30-Second Pitch (elevator-pitch)
  "elevator-pitch": [
    { key: "targetCustomer", label: "Target Customer", fallback: "e.g. the customers you serve" },
    { key: "need", label: "Core Need / Struggle", fallback: "e.g. the problem they keep hitting" },
    { key: "productName", label: "Product Name", fallback: "e.g. your product name" },
    { key: "category", label: "Product Category", fallback: "e.g. what kind of product it is" },
    { key: "benefit", label: "Core Value / Benefit", fallback: "e.g. saves time, removes a manual step, and locks in payment" },
  ],
};

export function getCardFields(cardId: string): CardField[] | null {
  return cardFieldManifests[cardId] || null;
}
