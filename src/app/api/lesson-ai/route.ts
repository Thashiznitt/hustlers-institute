import { NextResponse } from "next/server";

interface FiveWs {
  what?: string;
  who?: string;
  where?: string;
  when?: string;
  how?: string;
}

const STAGE_FOCUS: Record<string, string> = {
  empathize: "observing real users and capturing raw, honest frustrations",
  define: "finding the single sharpest, most painful insight in the research",
  ideate: "turning that insight into one clear, purposeful improvement",
  validate: "stress-testing the idea before investing more time building",
  prototype: "making the smallest rough version a user can react to",
  test: "putting the prototype in front of real users and watching",
  learn: "reading the signal, deciding what to keep, and what to change next",
};

// Rule-based fallback so the feature works with no GEMINI_API_KEY configured.
function getFallback(
  lessonTitle: string,
  dtStage: string,
  name: string,
  industry: string,
  ws: FiveWs
) {
  const who = ws.who || "your customers";
  const what = ws.what || "their core frustration";
  const where = ws.where || "where they currently struggle";
  const brand = name || "your venture";

  const intro = `For ${brand} in ${industry || "your vertical"}, "${lessonTitle}" is about ${STAGE_FOCUS[dtStage] || "moving your idea forward"}, which is applied directly to ${who} dealing with ${what}.`;

  const steps = [
    `Go to ${where} and focus on ${who}. Note exactly where ${what} shows up, and do not generalize, but instead capture the specific moment.`,
    `Frame everything around ${brand}'s niche: how does ${what} look different in ${industry || "your industry"} compared to a generic version of this problem?`,
    `Write down one concrete output you can carry into the next lesson, which could be a quote, a sketch, or a ranked insight tied to ${who}.`,
  ];

  const example = `Example for ${brand}: if ${who} hit ${what} ${ws.when ? `during ${ws.when}` : "at the worst possible moment"}, your "${lessonTitle}" deliverable might be a short note like: "${who} gave up because ${ws.how || "the current option was too slow"}." That single line is gold for the next step.`;

  return { intro, steps, example };
}

export async function POST(req: Request) {
  let body: any = {};
  try {
    body = await req.json();
    const { lesson, venture } = body;
    const lessonTitle: string = lesson?.title || "this lesson";
    const dtStage: string = lesson?.dtStage || "empathize";
    const points: string[] = Array.isArray(lesson?.points) ? lesson.points : [];
    const name: string = venture?.name || "";
    const industry: string = venture?.industry || "";
    const ws: FiveWs = venture?.fiveWs || {};

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.warn("No GEMINI_API_KEY set. Using rule-based lesson adaptation fallback.");
      return NextResponse.json({ success: true, isAI: false, ...getFallback(lessonTitle, dtStage, name, industry, ws) });
    }

    const systemPrompt = `You are Leo, a hands-on startup coach inside the "Sovereign Millionaires" learning platform.

A student is working through a Design Thinking curriculum. Every lesson must be re-grounded into THEIR specific business vertical so it never feels generic. The vertical and venture details were chosen earlier in the Niche Builder.

The student's venture:
- Brand: ${name || "(not named yet)"}
- Vertical / Industry: ${industry || "(not chosen yet)"}
- What is the problem: ${ws.what || "(unspecified)"}
- Who is affected: ${ws.who || "(unspecified)"}
- Where: ${ws.where || "(unspecified)"}
- When: ${ws.when || "(unspecified)"}
- How it breaks: ${ws.how || "(unspecified)"}

Current lesson: "${lessonTitle}" (Design Thinking stage: ${dtStage}).
Generic lesson takeaways the student already sees:
${points.map((p, i) => `${i + 1}. ${p}`).join("\n")}

Rewrite this lesson's guidance so it is specific to the student's vertical and venture, while staying faithful to the Design Thinking stage. Be concrete, practical, and encouraging. Use their brand name, their users, and their problem. No generic filler. To keep the copy extremely human and natural, do not use hyphens or dashes as punctuation breaks anywhere in your text. When referencing guide cards, make sure to mention them using the exact format: (use Card XX: Card Title) so they can be clicked.

Write for someone new to business who hasn't studied formally. Use short sentences and everyday words. No jargon. Explain any necessary term in plain language.

Return ONLY valid JSON, no markdown fences, matching:
{
  "intro": string,        // 1-2 sentences: what this lesson means for THEIR specific venture
  "steps": string[],      // exactly 3 short, actionable steps tailored to their vertical
  "example": string       // 1 concrete worked example using their brand, users, and problem
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
      console.error("Gemini lesson-ai call failed:", errorText);
      throw new Error(`Gemini API returned status ${response.status}`);
    }

    const data = await response.json();
    const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!candidateText) throw new Error("Empty response from Gemini candidate parts");

    const parsed = JSON.parse(candidateText.trim());
    return NextResponse.json({ success: true, isAI: true, ...parsed });
  } catch (error: any) {
    console.error("Error in lesson-ai router:", error);
    const lesson = body?.lesson || {};
    const venture = body?.venture || {};
    return NextResponse.json({
      success: true,
      isAI: false,
      error: error.message,
      ...getFallback(lesson.title || "this lesson", lesson.dtStage || "empathize", venture.name || "", venture.industry || "", venture.fiveWs || {}),
    });
  }
}
