import { NextResponse } from "next/server";

interface FiveWs {
  what?: string;
  who?: string;
  where?: string;
  when?: string;
  how?: string;
}

interface FieldSpec {
  key: string;
  label: string;
  fallback?: string;
}

// Rule-based fallback so niche adaptation still works with no GEMINI_API_KEY.
function getFallback(
  cardTitle: string,
  objective: string,
  name: string,
  industry: string,
  ws: FiveWs,
  fields: FieldSpec[]
) {
  const who = ws.who || "your customers";
  const what = ws.what || "their core frustration";
  const brand = name || "your venture";
  const vertical = industry || "your vertical";

  const intro = `Using "${cardTitle}" for ${brand} (${vertical}): ${objective || "apply this tool"} — focused on ${who} and ${what}.`;

  const out: Record<string, { placeholder: string; example: string }> = {};
  for (const f of fields) {
    // Lightweight, label-aware niche hints — keeps the generic fallback as the
    // base and weaves in the picked vertical/users so it never reads generic.
    out[f.key] = {
      placeholder: f.fallback ? `${f.fallback} (for ${vertical})` : `${f.label} — for ${brand}`,
      example: `${who} / ${what} in ${vertical}`,
    };
  }
  return { intro, fields: out };
}

export async function POST(req: Request) {
  let body: any = {};
  try {
    body = await req.json();
    const { card, venture, fields } = body;
    const cardTitle: string = card?.title || "this card";
    const objective: string = card?.objective || "";
    const deployment: string[] = Array.isArray(card?.deployment) ? card.deployment : [];
    const fieldSpecs: FieldSpec[] = Array.isArray(fields) ? fields : [];
    const name: string = venture?.name || "";
    const industry: string = venture?.industry || "";
    const ws: FiveWs = venture?.fiveWs || {};

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || fieldSpecs.length === 0) {
      return NextResponse.json({ success: true, isAI: false, ...getFallback(cardTitle, objective, name, industry, ws, fieldSpecs) });
    }

    const systemPrompt = `You are Leo, a hands-on startup coach inside the "Sovereign Millionaires" learning platform.

A student is using an interactive worksheet for the design card "${cardTitle}". Re-ground this worksheet into THEIR specific business vertical so the input hints never feel generic. The vertical and venture were chosen earlier in the Niche Builder.

Card objective: ${objective || "(general)"}
Card method steps:
${deployment.map((d, i) => `${i + 1}. ${d}`).join("\n") || "(none)"}

The student's venture:
- Brand: ${name || "(not named yet)"}
- Vertical / Industry: ${industry || "(not chosen yet)"}
- What is the problem: ${ws.what || "(unspecified)"}
- Who is affected: ${ws.who || "(unspecified)"}
- Where: ${ws.where || "(unspecified)"}
- When: ${ws.when || "(unspecified)"}
- How it breaks: ${ws.how || "(unspecified)"}

The worksheet has these input fields (use the exact keys):
${fieldSpecs.map(f => `- ${f.key}: "${f.label}"`).join("\n")}

For EACH field, write:
1. "placeholder": a short greyed-hint (max ~12 words) phrased for THIS venture's vertical and users. It must read like an example a founder in this exact vertical would recognize. Do not pre-fill an answer — keep it a hint ("e.g. ...").
2. "example": one concrete filled-in answer for this venture (a model answer the student could adapt).

To keep copy human and natural, do not use hyphens or dashes as punctuation breaks.

Write for someone new to business who hasn't studied formally. Use short sentences and everyday words. No jargon. Explain any necessary term in plain language.

Return ONLY valid JSON, no markdown fences, matching:
{
  "intro": string,
  "fields": { "<fieldKey>": { "placeholder": string, "example": string } }
}`;

    const apiURL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(apiURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: systemPrompt }] }],
        generationConfig: { responseMimeType: "application/json" },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini card-context call failed:", errorText);
      throw new Error(`Gemini API returned status ${response.status}`);
    }

    const data = await response.json();
    const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!candidateText) throw new Error("Empty response from Gemini candidate parts");

    const parsed = JSON.parse(candidateText.trim());
    return NextResponse.json({ success: true, isAI: true, ...parsed });
  } catch (error: any) {
    console.error("Error in card-context router:", error);
    const card = body?.card || {};
    const venture = body?.venture || {};
    const fields = Array.isArray(body?.fields) ? body.fields : [];
    return NextResponse.json({
      success: true,
      isAI: false,
      error: error.message,
      ...getFallback(card.title || "this card", card.objective || "", venture.name || "", venture.industry || "", venture.fiveWs || {}, fields),
    });
  }
}
