import { NextResponse } from "next/server";

interface BoardroomRequest {
  vertical: string;
  complianceScore: number;
  habitLoop: {
    trigger: string;
    routine: string;
    reward: string;
  };
  schemaCount: number;
  retainerMargin: number;
  growthMetrics: {
    latency: number;
    vir: number;
    mau: number;
    ltv: number;
  };
}

function getFallbackReport(reqData: BoardroomRequest) {
  const { vertical, complianceScore, habitLoop, schemaCount, retainerMargin, growthMetrics } = reqData;

  let feasibilityScore = 70;
  let desirabilityScore = 72;
  let viabilityScore = 68;

  // Feasibility calculations
  if (complianceScore >= 80) feasibilityScore += 10;
  else if (complianceScore < 50) feasibilityScore -= 10;
  if (schemaCount >= 3) feasibilityScore += 10;
  if (growthMetrics.latency < 1000) feasibilityScore += 8;

  // Desirability calculations
  if (habitLoop && habitLoop.trigger && habitLoop.routine && habitLoop.reward) {
    desirabilityScore += 15;
  }
  if (growthMetrics.mau > 1500) desirabilityScore += 10;

  // Viability calculations
  if (retainerMargin >= 70) viabilityScore += 15;
  else if (retainerMargin < 40) viabilityScore -= 10;
  if (growthMetrics.ltv > 30) viabilityScore += 10;
  if (complianceScore < 50) viabilityScore -= 15; // legal non-compliance penalty

  feasibilityScore = Math.max(50, Math.min(98, feasibilityScore));
  desirabilityScore = Math.max(50, Math.min(98, desirabilityScore));
  viabilityScore = Math.max(50, Math.min(98, viabilityScore));

  const improvementTips: string[] = [];
  const recommendations: string[] = [];

  if (complianceScore < 80) {
    improvementTips.push("Enforce secure database storage and add a 'Delete My Profile' consent option to raise privacy compliance to 80+.");
    recommendations.push("Draft a transparent client data governance outline before commencing database integration.");
  }
  if (schemaCount < 3) {
    improvementTips.push("Structure at least three core transaction columns in your database schema to trace user IDs, service timestamps, and payment statuses.");
    recommendations.push("Run a sprint task prioritizing index optimizations on client matching fields.");
  }
  if (retainerMargin < 70) {
    improvementTips.push("Reduce monthly operating expenses or adjust retainer packages to target at least a 70% service profit margin.");
    recommendations.push("Shift non-core maintenance work into flat onboarding fees to protect monthly service margins.");
  }
  if (growthMetrics.latency > 1500) {
    improvementTips.push("Increase monthly tech maintenance investment to lower database latency below 1000ms, which will raise your active users.");
    recommendations.push("Deploy localized edge hosting hooks to cache client schedules and lower transaction load.");
  }
  if (growthMetrics.vir < 0.5) {
    improvementTips.push("Raise your client referral reward slider to incentivize viral signups and lower acquisition costs.");
    recommendations.push("Build a template launch kit that prompts users to share booking milestones immediately upon service checkout.");
  }

  if (improvementTips.length === 0) {
    improvementTips.push("Maintain current settings and begin onboarding B2B merchant partners to scale your active user count.");
  }
  if (recommendations.length === 0) {
    recommendations.push("Establish regular cohort check-ins to monitor long-term active user retention rates.");
  }

  const analysis = `### 💼 LEO Executive Boardroom Report: ${vertical}

This executive evaluation assesses your operational alignment, customer value proposition, and economic model.

#### 1. SYSTEMS ANALYST & DEVELOPMENT
* **System Health**: Your simulated database latency is **${growthMetrics.latency}ms**. Response latency above 1500ms degrades user checkout completion rates, whereas sub-1000ms speeds sustain higher user engagement.
* **Database Architecture**: Your schema contains **${schemaCount}** active tracking columns. Ensure that transaction IDs are indexed and mapped cleanly to user records to avoid write bottlenecks.

#### 2. HUMAN CENTERED DESIGN (HCD)
* **Habit Trigger Loops**: Your configured trigger cue is **"${habitLoop.trigger || "unspecified"}"** which triggers the routine **"${habitLoop.routine || "unspecified"}"** rewarding the client with **"${habitLoop.reward || "unspecified"}"**.
* **Design Validation**: The selected loop must leverage customer-friendly copy to reduce friction and encourage natural organic usage.

#### 3. REVENUE & BUSINESS STRATEGY
* **Financial Performance**: Your Monthly Retainer operates at a **${retainerMargin.toFixed(1)}%** profit margin. Protect this margin by capping weekly hours and keeping expenses minimal.
* **Customer Value**: A simulated Lifetime Value (LTV) of **$${growthMetrics.ltv}** provides a strong foundation to cover marketing costs.

#### 4. LEGAL & REGULATORY COMPLIANCE
* **Compliance Standing**: Your Privacy Score is **${complianceScore}%**. Scores below 80% indicate legal risks regarding customer location or wallet storage. Shift database setups to secure hosting parameters.

#### 5. GROWTH & GO TO MARKET
* **Viral Coefficient**: Your simulated viral coefficient is **K = ${growthMetrics.vir}**. A viral coefficient above 0.5 triggers rapid network growth, reducing your dependency on paid ads.
* **Active User Growth**: Your monthly active users (MAU) simulate at **${growthMetrics.mau.toLocaleString()}** based on current partner posts and referral loops.`;

  return {
    feasibilityScore,
    desirabilityScore,
    viabilityScore,
    analysis,
    improvementTips,
    recommendations
  };
}

export async function POST(req: Request) {
  let reqData: BoardroomRequest = {
    vertical: "Wellness & Fitness",
    complianceScore: 50,
    habitLoop: { trigger: "", routine: "", reward: "" },
    schemaCount: 2,
    retainerMargin: 50,
    growthMetrics: { latency: 1500, vir: 0.2, mau: 500, ltv: 25 }
  };

  try {
    const body = await req.json().catch(() => ({}));
    const {
      vertical,
      complianceScore,
      habitLoop,
      schemaCount,
      retainerMargin,
      growthMetrics
    } = body;

    reqData = {
      vertical: vertical || "Wellness & Fitness",
      complianceScore: typeof complianceScore === "number" ? complianceScore : 50,
      habitLoop: habitLoop || { trigger: "", routine: "", reward: "" },
      schemaCount: typeof schemaCount === "number" ? schemaCount : 2,
      retainerMargin: typeof retainerMargin === "number" ? retainerMargin : 50,
      growthMetrics: growthMetrics || { latency: 1500, vir: 0.2, mau: 500, ltv: 25 }
    };

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.warn("No GEMINI_API_KEY set. Using high-quality rule-based local fallback.");
      const fallback = getFallbackReport(reqData);
      return NextResponse.json({ success: true, isAI: false, ...fallback });
    }

    const systemPrompt = `You are LEO, the Virtual Executive Boardroom Advisor.
Assess this business venture profile and produce an executive boardroom report.

Venture details:
- Business Vertical: ${reqData.vertical}
- Privacy Compliance Score: ${reqData.complianceScore}%
- Habit Loop Cue: ${reqData.habitLoop.trigger}
- Habit Loop Routine: ${reqData.habitLoop.routine}
- Habit Loop Reward: ${reqData.habitLoop.reward}
- SQL Schema Columns Selected: ${reqData.schemaCount}
- Monthly Retainer Margin: ${reqData.retainerMargin}%
- simulated Latency: ${reqData.growthMetrics.latency}ms
- simulated Viral Coefficient (K): ${reqData.growthMetrics.vir}
- simulated Monthly Active Users (MAU): ${reqData.growthMetrics.mau}
- simulated Customer Lifetime Value (LTV): $${reqData.growthMetrics.ltv}

You must return a response in strict JSON format containing these fields:
1. "feasibilityScore": A number from 0 to 100 representing how technically and operationally feasible the venture is to construct and run.
2. "desirabilityScore": A number from 0 to 100 representing how strong the customer demand is and if the pain point is sufficiently addressed.
3. "viabilityScore": A number from 0 to 100 representing how economically sustainable and compliant the business model is.
4. "analysis": A detailed, professional markdown report analyzing the business's current state. Review the parameters through developer-level, design, strategy, legal compliance, and GTM lenses. Break it down using these exact subheadings: "#### 1. SYSTEMS ANALYST & DEVELOPMENT", "#### 2. HUMAN CENTERED DESIGN (HCD)", "#### 3. REVENUE & BUSINESS STRATEGY", "#### 4. LEGAL & REGULATORY COMPLIANCE", "#### 5. GROWTH & GO TO MARKET".
5. "improvementTips": An array of strings with highly specific suggestions on how the user can refine their plan to bring these scores to the sweet spot (85+).
6. "recommendations": An array of operational recommendations.

CRITICAL INSTRUCTION: You MUST NOT use any punctuation hyphens, em-dashes, en-dashes, or double-hyphens in the analysis, tips, or recommendations fields. Use commas, colons, semicolons, or separate sentences instead. Hyphens inside code or standard words are not allowed either. Keep copy clean and simple.

Your output must match this exact JSON schema:
{
  "feasibilityScore": number,
  "desirabilityScore": number,
  "viabilityScore": number,
  "analysis": string,
  "improvementTips": string[],
  "recommendations": string[]
}
Return ONLY the raw JSON. No markdown backticks, no wrap.`;

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
      throw new Error(`Gemini API returned status ${response.status}`);
    }

    const data = await response.json();
    const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!candidateText) {
      throw new Error("Empty response from Gemini candidates");
    }

    const parsedData = JSON.parse(candidateText.trim());
    return NextResponse.json({ success: true, isAI: true, ...parsedData });

  } catch (error: any) {
    console.error("Error in boardroom-ai route:", error);
    const selectedVertical = reqData.vertical || "Wellness & Fitness";
    const fallback = getFallbackReport(reqData);
    return NextResponse.json({ success: true, isAI: false, ...fallback, error: error.message });
  }
}
