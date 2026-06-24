import { NextResponse } from "next/server";

// Dynamic rules-based local grading fallback in case Gemini API is not configured or fails
function getFallbackGrading(
  brandName: string,
  industry: string,
  targetPersona: string,
  pricingTier: string,
  revenueModel: string,
  pitchStatement: string,
  evaluatorRole: string
) {
  const pitchLower = (pitchStatement || "").toLowerCase();
  const nameLower = (brandName || "").toLowerCase();
  const industryLower = (industry || "").toLowerCase();
  const personaLower = (targetPersona || "").toLowerCase();
  const modelLower = (revenueModel || "").toLowerCase();

  let score = 70; // baseline score
  const matches: string[] = [];

  // 1. Check Brand Name Inclusion
  if (nameLower && pitchLower.includes(nameLower)) {
    score += 8;
    matches.push("Brand Mention");
  }

  // 2. Check Target Persona / Audience Connection
  if (personaLower) {
    const firstWord = personaLower.trim().split(/\s+/)[0];
    if (firstWord && firstWord.length > 2 && pitchLower.includes(firstWord)) {
      score += 8;
      matches.push("Audience Alignment");
    }
  }

  // 3. Check Revenue Model & Pricing Mentions
  if (modelLower && (pitchLower.includes(modelLower) || pitchLower.includes("subscription") || pitchLower.includes("retainer") || pitchLower.includes("pricing") || pitchLower.includes("charge"))) {
    score += 6;
    matches.push("Revenue Logic");
  }
  if (pricingTier && pitchLower.match(/\d+/) !== null) {
    score += 6;
    matches.push("Price Point Clarity");
  }

  // 4. Check Pitch Structure Keywords (Hook, Problem, Solution)
  if (pitchLower.includes("we improve") || pitchLower.includes("we help") || pitchLower.includes("solve") || pitchLower.includes("struggle") || pitchLower.includes("pain")) {
    score += 6;
    matches.push("Problem Fit");
  }
  if (pitchLower.length > 80) {
    score += 4; // sufficient length for a 30s pitch
  }

  // Cap score at 98
  score = Math.min(score, 98);

  // Grade mapping
  let grade: "A" | "B" | "C" | "D" = "C";
  if (score >= 90) grade = "A";
  else if (score >= 80) grade = "B";
  else if (score >= 70) grade = "C";
  else grade = "D";

  // Generate role-specific follow-up questions
  let boardQuestions: string[] = [];
  let feedback = "";
  let clarityDesc = "";
  let viabilityDesc = "";
  let mathDesc = "";

  if (evaluatorRole === "investor") {
    feedback = `LEO BOARDROOM GRADING: Your pitch outlines a clear niche for "${brandName}" in the ${industry} space. However, as an investor, I need to see more focus on client acquisition defensibility and scalability beyond flat retainer rates. Your math has been calibrated, but margin erosion remains a moderate risk during scale.`;
    clarityDesc = pitchLower.length > 50 ? "Clear and focused value proposition." : "Value proposition is too short and needs elaboration.";
    viabilityDesc = matches.includes("Audience Alignment") ? "Target customer segment is properly identified." : "Needs clearer focus on who pays for the service.";
    mathDesc = matches.includes("Price Point Clarity") ? "Pricing is state, but break-even bounds should be stress-tested." : "Math is vague. Specify price point and client retention ratios.";
    
    boardQuestions = [
      `How do you plan to acquire your first 5 customers in the "${industry}" space without massive marketing spend?`,
      `Your proposed revenue model is "${revenueModel || "Subscription"}" at a price of "${pricingTier || "custom rate"}". What is your estimated Customer Acquisition Cost (CAC) payback period?`,
      `How is this service defensible? What stops a customer from hiring a competitor or setting up an in-house tool to bypass "${brandName}"?`
    ];
  } else {
    // Consumer
    feedback = `LEO CONSUMER AUDIT: As a potential customer matching the profile of "${targetPersona || "your user"}", I understand the problem you are trying to solve. The benefit of "${brandName}" is clear, but I am hesitant about the pricing commitment. I need to trust that this saves me actual hours of labor.`;
    clarityDesc = matches.includes("Brand Mention") ? "Good brand recall and introduction." : "Explain what the service is faster before I lose interest.";
    viabilityDesc = pitchLower.includes("because") || pitchLower.includes("why") ? "Excellent connection to real-world pain points." : "Explain the direct benefit of your service to my workflow.";
    mathDesc = matches.includes("Price Point Clarity") ? "Pricing is transparent, which builds initial trust." : "Tell me exactly how much I am paying and how often (per month/project).";

    boardQuestions = [
      `I've been burned by similar automated tools before. How do you guarantee accuracy and onboarding support for my business?`,
      `You charge "${pricingTier || "custom rate"}". Can I test this service with a smaller trial or pilot project before signing up for a full "${revenueModel || "Subscription"}"?`,
      `What is the exact list of requirements or assets I need to give you before your product can deliver value to my business?`
    ];
  }

  return {
    success: true,
    isAI: false,
    grade,
    score,
    feedback,
    breakdown: {
      clarity: clarityDesc,
      viability: viabilityDesc,
      math: mathDesc
    },
    boardQuestions
  };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      brandName,
      industry,
      targetPersona,
      whatProblem,
      pricingTier,
      revenueModel,
      pitchStatement,
      evaluatorRole
    } = body;

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.warn("No GEMINI_API_KEY set. Using local rules-based pitch grading fallback.");
      const fallback = getFallbackGrading(
        brandName || "My Venture",
        industry || "Lifestyle",
        targetPersona || "target audience",
        pricingTier || "custom price",
        revenueModel || "retainer",
        pitchStatement || "",
        evaluatorRole || "investor"
      );
      return NextResponse.json(fallback);
    }

    const systemPrompt = `You are LEO, the Sovereign Pitch Evaluator Agent.
Role: You evaluate user business pitches from the perspective of an elite evaluator. 

The evaluator profile is: ${evaluatorRole === "investor" ? "A high stakes venture capitalist or angel investor looking for financial return, business defensibility, CAC to LTV ratio, and clear target growth metrics." : "An ideal target consumer/client looking for workflow savings, product trust, immediate utility, pricing fairness, and ease of onboarding."}

Venture Profile Details:
* Brand Name: ${brandName || "Unnamed brand"}
* Industry: ${industry || "General lifestyle"}
* Target Persona: ${targetPersona || "Ideal Customer"}
* Product Deliverables: ${whatProblem || "value proposition"}
* Target Pricing: ${pricingTier || "custom rate"}
* Revenue Model: ${revenueModel || "retainer"}

Evaluate the user's pitch statement:
"${pitchStatement || ""}"

You must return a response in strict JSON format containing these fields:
1. "grade": A single character grade: "A" (excellent, meets all criteria), "B" (good, minor gaps), "C" (average, needs work), or "D" (poor, missing core values).
2. "score": A numeric score from 50 to 98.
3. "feedback": A 3 to 4 sentence boardroom report grading the pitch, noting strengths, weaknesses, and what they need to fix to make it highly persuasive.
4. "breakdown": A JSON object containing:
   * "clarity": Qualitative review of how clear, simple, and punchy the hook is.
   * "viability": Qualitative review of how well the pitch fits the target persona's real-world pain.
   * "math": Qualitative review of how defensible and clear the pricing structure is.
5. "boardQuestions": An array of exactly 3 highly customized, challenging questions that this specific evaluator (investor or consumer) would ask the founder in a follow-up conversation. Keep these questions practical, targeted, and demanding.

CRITICAL INSTRUCTION: You MUST NOT use any punctuation hyphens, em-dashes, en-dashes, or double-hyphens in any text fields of the response (such as feedback, clarity, viability, math, or boardQuestions). Use commas, colons, semicolons, or separate sentences instead. Hyphens inside code or standard words are not allowed in output copy. Ensure all copy is humanized.

Ensure the output is valid JSON matching this schema:
{
  "grade": "A" | "B" | "C" | "D",
  "score": number,
  "feedback": string,
  "breakdown": {
    "clarity": string,
    "viability": string,
    "math": string
  },
  "boardQuestions": [string, string, string]
}
Return only the raw JSON. No markdown backticks, no wrap.`;

    const apiURL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(apiURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: systemPrompt }]
        }],
        generationConfig: {
          responseMimeType: "application/json"
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API pitch-grading failed:", errorText);
      throw new Error(`Gemini API returned status ${response.status}`);
    }

    const data = await response.json();
    const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!candidateText) {
      throw new Error("Empty response from Gemini candidate parts");
    }

    const parsedData = JSON.parse(candidateText.trim());
    return NextResponse.json({ success: true, isAI: true, ...parsedData });

  } catch (error: any) {
    console.error("Error in Pitch AI router:", error);
    try {
      const fallback = getFallbackGrading(
        "My Venture",
        "Lifestyle",
        "Target customer",
        "custom rate",
        "retainer",
        "",
        "investor"
      );
      return NextResponse.json({ ...fallback, error: error.message });
    } catch {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
  }
}
