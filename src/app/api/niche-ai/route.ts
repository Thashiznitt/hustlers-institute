import { NextResponse } from "next/server";

// Fallback dynamic compiler in case Gemini API is not configured or fails
function getFallbackResponse(
  name: string,
  industry: string,
  what: string,
  who: string,
  where: string,
  when: string,
  how: string,
  cardNotes?: Record<string, string>
) {
  const nicheSummary = `A service named "${name}" solving the problem where "${who}" struggle with "${what}" at "${where}" during "${when}", caused by "${how}".`;
  const customType = `A localized solution targeting ${who} for ${industry.toLowerCase()} tasks`;

  // Standard fallback map using simple templates
  const cardIds = [
    "interviews", "people-shadowing", "culture-probe", "primary-research", "desk-research",
    "diaries", "stakeholder-maps", "semantic-analysis", "system-map", "journey-map",
    "org-charts", "themes", "2-by-2-axis", "collage", "mood-board", "team-journey",
    "pitch-deck", "feedback-grid", "future-scenarios", "experience-journey",
    "conversation-starters", "behavior-engine", "my-top-5"
  ];

  const customApplications: Record<string, string> = {};
  
  cardIds.forEach((id) => {
    switch (id) {
      case "interviews":
        customApplications[id] = `Chat with 5 people matching the profile of "${who}". Ask: "What happens when you try to solve the issue of ${what} at ${where}?"`;
        break;
      case "people-shadowing":
        customApplications[id] = `Observe how "${who}" handle this struggle at "${where}" during "${when}". Look for manual workarounds.`;
        break;
      case "culture-probe":
        customApplications[id] = `Ask 3 affected people to record a short text note or emoji logs whenever they face the issue of ${what} during "${when}".`;
        break;
      case "journey-map":
        customApplications[id] = `Trace every step from when a user notices the issue of ${what} at ${where} to how they get it resolved.`;
        break;
      case "system-map":
        customApplications[id] = `Map how your database links service providers to "${who}" so that "${name}" can process their requests instantly.`;
        break;
      default:
        customApplications[id] = `Use this card to research habits, refine copy, or coordinate launch tasks for ${name} to help "${who}" solve their struggle with "${what}".`;
    }
  });

  let fieldNotesSummary = "";
  if (cardNotes && typeof cardNotes === "object") {
    const activeNotes = Object.entries(cardNotes).filter(([_, val]) => !!val);
    if (activeNotes.length > 0) {
      fieldNotesSummary = "\n\n#### 📝 INCORPORATED STUDENT FIELD FINDINGS:\n" +
        activeNotes.map(([id, note]) => `- **${id.toUpperCase()}**: "${note}"`).join("\n");
    }
  }

  const boardroomReport = `### 💼 LEO Executive Boardroom Report for ${name} (${industry})

#### 1. SYSTEMS ANALYST & DEVELOPMENT
- **Epic**: Setup database schemas to capture user entries for "${who}" who suffer from "${what}" at "${where}".
- **Logic**: Map front-end React interactions to a SQL DB table, keeping Cloudflare edge functions fast and database connections pooled efficiently.

#### 2. HUMAN-CENTERED DESIGN (HCD)
- **Insight**: Focus directly on "${who}". Watch them at "${where}" to record touchpoints.
- **SBC Trigger**: Run micro-diaries and interactive triggers to capture user sentiment right when the pain of "${what}" occurs during "${when}".

#### 3. REVENUE & BUSINESS STRATEGY
- **Pricing**: Offer subscription packages instead of one-off billing.
- **Ecosystem**: Cross-sell related items at checkout (e.g. logistics + booking) to move away from flat service models.

#### 4. LEGAL & REGULATORY COMPLIANCE
- **Compliance**: Align user profile registration with strict regional Data Protection Acts.
- **Risk**: Keep clear transaction logs and user authorization tokens securely encrypted.

#### 5. GROWTH & GO-TO-MARKET
- **GTM**: Leverage local partner anchors to onboard early users at "${where}" during "${when}".
- **Positioning**: Target solution-aware users directly with clear, high-ticket value propositions.

#### 6. VENTURE TEAM LEADERSHIP
- **Velocity**: Break down the core launch features into 2-week agile sprints.
- **Structure**: Isolate Intellectual Property assets to scale globally.${fieldNotesSummary}`;

  return { nicheSummary, customType, customApplications, boardroomReport };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, industry, whatProblem, whoAffected, whereHappening, whenHappening, howHappening, cardNotes } = body;

    const apiKey = process.env.GEMINI_API_KEY;

    let notesContext = "";
    if (cardNotes && typeof cardNotes === "object") {
      const activeNotes = Object.entries(cardNotes).filter(([_, val]) => !!val);
      if (activeNotes.length > 0) {
        notesContext = "\nReal-world Student Field Findings for Design Cards:\n" +
          activeNotes.map(([id, note]) => `- Card ID "${id}": "${note}"`).join("\n") +
          "\nIncorporate these real-world findings directly into your lenses (especially HCD and Product Dev) and card recommendations.";
      }
    }

    if (!apiKey) {
      console.warn("No GEMINI_API_KEY set. Using high-quality rule-based local fallback.");
      const fallback = getFallbackResponse(
        name || "My Venture",
        industry || "Lifestyle",
        whatProblem || "daily struggles",
        whoAffected || "customers",
        whereHappening || "our neighborhood",
        whenHappening || "busy hours",
        howHappening || "inefficient services",
        cardNotes
      );
      return NextResponse.json({ success: true, isAI: false, ...fallback });
    }

    const systemPrompt = `You are the Sovereign Executive Boardroom Agent (LEO).
Role: You are an all-rounded, elite Virtual Executive Boardroom inspired by a seasoned Product Lead & AI Operations Director with 12 years of high-stakes cross-functional experience. You look at every product scenario, raw dataset, lifestyle user log, and business strategy through 6 highly critical, interconnected lenses simultaneously.

Your mission is to process inputs and provide comprehensive, multi-dimensional execution matrices. You reject shallow, generic academic theory and optimize for rapid execution, technical viability, financial performance, and compliance.

THE 6 EXECUTIVE LENSES YOU OPERATE:

1. THE PRINCIPAL PRODUCT DEVELOPER / SYSTEMS ANALYST
- Core Mandate: Code awareness, delivery governance, and infrastructure health.
- Framework: Structure engineering backlogs inside Jira. Break design wireframes down into structured Epics, technical User Stories, and strict Acceptance Criteria.
- Logic: Map front-end user actions (across React, Java, HTML/CSS) directly to relational database schemas (SQL) and cloud infrastructure blueprints (Cloudflare edge routing, R2 secure backups, bare-metal scaling). Optimize for API token efficiency, rate limiting, and 99.9% system uptime.

2. THE HUMAN-CENTERED DESIGN (HCD) DIRECTOR
- Core Mandate: Behavioral synthesis, empathy-driven innovation, and contextual research.
- Framework: Utilize advanced synthesis tools (System Maps, Stakeholder Mapping, Persona Matrices, and How Might We [HMW] statements).
- Logic: Evaluate how field research tools (Culture Probes, Conversation Starters) capture authentic user behaviors at the point of action. Focus heavily on Social and Behavior Change (SBC) principles to drive organic cross-vertical habit formation.

3. THE CHIEF BUSINESS STRATEGIST & REVENUE OFFICER
- Core Mandate: Net Revenue Management (NRM), value-based pricing, and P&L accountability.
- Framework: Connect product features directly to the balance sheet. Manage multi-million shilling/dollar product budgets and optimize metrics like Customer Acquisition Cost (CAC), Customer Lifetime Value (LTV), and Average Transaction Value (ATV).
- Logic: Design predictive customer lifecycle engines that mine user trends to cross-sell secondary services organically, shifting businesses away from flat consulting models into highly scalable ecosystem revenue engines.

4. THE LEGAL & COMPLIANCE COUNSEL
- Core Mandate: Risk mitigation, data governance, and regional compliance.
- Framework: Maintain strict alignment with Central Bank of Kenya (CBK) guidelines, strict Data Protection legal frameworks, and Anti-Money Laundering (AML/KYC) tracking.
- Logic: Treat legal constraints as design parameters. Ensure identity automation, user profiles, and transaction logging systems are bulletproof before code production begins.

5. THE GROWTH MARKETER & SALES ENGINEER
- Core Mandate: Go-To-Market (GTM) execution, Consumer Awareness modeling, and partnership loops.
- Framework: Map user communication against the Consumer Awareness Spectrum (Unaware to Solution-Aware).
- Logic: Structure hyper-local distribution strategies using the "Vertical Anchor Framework." Craft compelling, high-ticket value propositions that turn B2B ecosystem merchants into integrated platform partners.

6. THE EXECUTIVE TEAM LEADER (THE INTRA/ENTREPRENEUR)
- Core Mandate: High-velocity squad delivery, talent cultivation, and stakeholder orchestration.
- Framework: Eliminate the "Urgency Illusion" and corporate middle-management friction. Replace disruptive, reactive "panic meetings" with outcome-driven sprint planning and asynchronous documentation (Miro, Slack).
- Logic: Foster true team autonomy and creative experimentation while maintaining rigorous accountability. Guide cross-border corporate structuring (e.g., Cyprus, Dubai, Qatar) to isolate intellectual property and scale technology internationally.

Platform Context:
You are operating within the "Sovereign Millionaires" ecosystem. Sovereign Millionaires is an education and execution platform built by the founders of OneApp Lifestyle (which grew active users by 40% using behavioral triggers). It guides creators, gig-workers, and corporate employees to transition to proud business owners.

The user has proposed a venture to address a local niche using the 5 Ws + H framework:
- Brand Name: ${name || "Unnamed brand"}
- Industry: ${industry || "General lifestyle"}
- What is the problem: ${whatProblem || "unspecified issue"}
- Who is affected: ${whoAffected || "local users"}
- Where is it happening: ${whereHappening || "local community"}
- When is it happening: ${whenHappening || "during daily routines"}
- How is it happening: ${howHappening || "current services are inadequate"}
${notesContext}

You must return a response in strict JSON format containing these fields:
1. "nicheSummary": A simple, non-technical sentence explaining the business niche. Keep it clear, concise, and friendly. Avoid technical jargon.
2. "customType": A short 3-6 word summary of what the service/product is.
3. "customApplications": A JSON object mapping card IDs to highly accurate context-aware instructions for this specific venture. The card IDs to populate are:
   "interviews", "people-shadowing", "culture-probe", "primary-research", "desk-research", "diaries", "stakeholder-maps", "semantic-analysis", "system-map", "journey-map", "org-charts", "themes", "2-by-2-axis", "collage", "mood-board", "team-journey", "pitch-deck", "feedback-grid", "future-scenarios", "experience-journey", "conversation-starters", "behavior-engine", "my-top-5".
   For each card ID, write 1-2 practical, custom sentences of advice on how the founder should use that specific design card for their venture. Integrate the details they provided (their brand, problem, target audience, location, timings, and how things break) to make it highly relatable.
4. "boardroomReport": A detailed markdown analysis of this proposed venture. Analyze the venture through the 6 Executive Lenses simultaneously. Address the specific details the user gave, including any real-world student field findings, and provide highly practical, developer-ready, strategist-level executive guidance for their venture in the required format. Ensure the tone is authoritative, grounded, technical, and intensely practical. Include concrete technical stack ideas (e.g. database schema details, API endpoints, CBK compliant data flows, specific pricing strategies, etc.).

Ensure the output is valid JSON matching this schema:
{
  "nicheSummary": string,
  "customType": string,
  "customApplications": Record<string, string>,
  "boardroomReport": string
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
      console.error("Gemini API call failed:", errorText);
      throw new Error(`Gemini API returned status ${response.status}`);
    }

    const data = await response.json();
    const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!candidateText) {
      throw new Error("Empty response from Gemini candidate parts");
    }

    // Parse the JSON output from the model
    const parsedData = JSON.parse(candidateText.trim());
    return NextResponse.json({ success: true, isAI: true, ...parsedData });

  } catch (error: any) {
    console.error("Error in Niche AI router:", error);
    // Secure fallback in case of rate limits, timeouts or errors
    try {
      const body = await req.json().catch(() => ({}));
      const { name, industry, whatProblem, whoAffected, whereHappening, whenHappening, howHappening, cardNotes } = body;
      const fallback = getFallbackResponse(
        name || "My Venture",
        industry || "Lifestyle",
        whatProblem || "daily struggles",
        whoAffected || "customers",
        whereHappening || "our neighborhood",
        whenHappening || "busy hours",
        howHappening || "inefficient services",
        cardNotes
      );
      return NextResponse.json({ success: true, isAI: false, ...fallback, error: error.message });
    } catch {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
  }
}
