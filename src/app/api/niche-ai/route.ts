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
  cardNotes?: Record<string, string>,
  exercise11?: any,
  exercise12?: any,
  exercise13?: any,
  exercise21?: any,
  exercise22?: any,
  exercise23?: any,
  exercise31?: any,
  exercise32?: any,
  exercise33?: any,
  exercise41?: any,
  exercise42?: any,
  exercise43?: any,
  exercise51?: any,
  exercise52?: any,
  exercise53?: any
) {
  const nicheSummary = `A service named "${name}" solving the problem where "${who}" struggle with "${what}" at "${where}" during "${when}", caused by "${how}".`;
  const customType = `A localized solution targeting ${who} for ${industry.toLowerCase()} tasks`;

  // Heuristic calculation for Feasibility, Desirability, Viability
  let feasibilityScore = 78;
  let desirabilityScore = 80;
  let viabilityScore = 75;

  if (name && name !== "My Venture") {
    feasibilityScore += 5;
  }
  if (what && what.length > 15) {
    desirabilityScore += 8;
  }
  if (who && who.length > 12) {
    desirabilityScore += 6;
  }
  if (how && how.length > 15) {
    viabilityScore += 10;
  }
  if (where && where.length > 10) {
    feasibilityScore += 7;
  }

  // Bound scores between 50 and 98
  feasibilityScore = Math.min(Math.max(feasibilityScore, 50), 98);
  desirabilityScore = Math.min(Math.max(desirabilityScore, 50), 98);
  viabilityScore = Math.min(Math.max(viabilityScore, 50), 98);

  const improvementTips: string[] = [];
  if (desirabilityScore < 85) {
    improvementTips.push(`Desirability: Talk to 5 more people matching "${who || "your customers"}" to prove that they are actively trying to solve "${what || "the problem"}" right now.`);
  }
  if (feasibilityScore < 85) {
    improvementTips.push(`Feasibility: Simplify the tech stack and MVP flow at "${where || "the location"}" to launch without complex features.`);
  }
  if (viabilityScore < 85) {
    improvementTips.push(`Viability: Establish higher pricing tiers and reduce initial transaction costs to reach your break-even goal faster.`);
  }

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
        activeNotes.map(([id, note]) => `* **${id.toUpperCase()}**: "${note}"`).join("\n");
    }
  }

  let boardroomReport = "";
  if (exercise51 || exercise52 || exercise53) {
    boardroomReport = `### 💼 LEO Executive Boardroom Report for ${name} (${industry})

#### 1. SYSTEMS ANALYST & DEVELOPMENT
* **Epic**: Build launch iteration features using comments from your soft launch observations.
* **Logic**: Setup feedback routing loops using webhooks to store responses in PostgreSQL. Maintain high uptime for your launch channels.

#### 2. HUMAN CENTERED DESIGN (HCD)
* **Insight**: Map user triggers from your soft launch observations. Use these details to optimize the launch kit template.
* **SBC Trigger**: Trigger custom referral messages when early users reach their first milestone.

#### 3. REVENUE & BUSINESS STRATEGY
* **Pricing**: Focus on the 90 day growth plan to hit monthly recurring revenue targets.
* **Ecosystem**: Track organic referrals and client retention rates as your core growth metrics.

#### 4. LEGAL & REGULATORY COMPLIANCE
* **Compliance**: Verify partner agreements and team roles distribution are legally structured.
* **Risk**: Enforce strict data sharing agreements with any external launch partners.

#### 5. GROWTH & GO TO MARKET
* **GTM**: Activate your warm contacts list for early organic reach on launch day.
* **Positioning**: Structure launch day checklists to target problem aware users with direct messages.

#### 6. VENTURE TEAM LEADERSHIP
* **Velocity**: Delegate tasks outlined in the talent brief to your key launch collaborators.
* **Structure**: Setup clear equity or profit sharing rules before expanding the launch team.${fieldNotesSummary}`;
  } else if (exercise41 || exercise42 || exercise43) {
    boardroomReport = `### 💼 LEO Executive Boardroom Report for ${name} (${industry})

#### 1. SYSTEMS ANALYST & DEVELOPMENT
* **Epic**: Setup secure payment collection systems and invoice creation automation.
* **Logic**: Implement subscription management systems (e.g. Stripe) mapping metadata fields to client accounts. Keep API credentials secured.

#### 2. HUMAN CENTERED DESIGN (HCD)
* **Insight**: Study prospect objections from showing your proposal sheet to refine user experience.
* **SBC Trigger**: Design checkouts to highlight your premium positioning and lower barriers to pay.

#### 3. REVENUE & BUSINESS STRATEGY
* **Pricing**: Define low end, mid range, and premium tiers based on your pricing research canvas.
* **Ecosystem**: Focus on hitting the break even monthly revenue target to cover basic operating costs.

#### 4. LEGAL & REGULATORY COMPLIANCE
* **Compliance**: Draft client requirement templates and proposals with clear terms of service.
* **Risk**: Require retainer payments upfront to secure client commitment.

#### 5. GROWTH & GO TO MARKET
* **GTM**: Position your proposal deliverables as a high value alternative to agencies.
* **Positioning**: Match your pricing model directly to client expectations mapped in Phase 4.

#### 6. VENTURE TEAM LEADERSHIP
* **Velocity**: Set clear pricing milestones in your proposal before kickoff.
* **Structure**: Maintain solid defensibility reasons to protect your service margin.${fieldNotesSummary}`;
  } else {
    boardroomReport = `### 💼 LEO Executive Boardroom Report for ${name} (${industry})

#### 1. SYSTEMS ANALYST & DEVELOPMENT
* **Epic**: Setup database schemas to capture user entries for "${who}" who suffer from "${what}" at "${where}".
* **Logic**: Map frontend React interactions to a SQL DB table, keeping Cloudflare edge functions fast and database connections pooled efficiently.

#### 2. HUMAN CENTERED DESIGN (HCD)
* **Insight**: Focus directly on "${who}". Watch them at "${where}" to record touchpoints.
* **SBC Trigger**: Run micro diaries and interactive triggers to capture user sentiment right when the pain of "${what}" occurs during "${when}".

#### 3. REVENUE & BUSINESS STRATEGY
* **Pricing**: Offer subscription packages instead of one off billing.
* **Ecosystem**: Cross sell related items at checkout (e.g. logistics + booking) to move away from flat service models.

#### 4. LEGAL & REGULATORY COMPLIANCE
* **Compliance**: Align user profile registration with strict regional Data Protection Acts.
* **Risk**: Keep clear transaction logs and user authorization tokens securely encrypted.

#### 5. GROWTH & GO TO MARKET
* **GTM**: Leverage local partner anchors to onboard early users at "${where}" during "${when}".
* **Positioning**: Target solution aware users directly with clear, high ticket value propositions.

#### 6. VENTURE TEAM LEADERSHIP
* **Velocity**: Break down the core launch features into two week agile sprints.
* **Structure**: Isolate Intellectual Property assets to scale globally.${fieldNotesSummary}`;
  }

  const checkMatch = (val1: string, val2: string) => {
    if (!val1 || !val2) return false;
    const firstWord = val2.trim().toLowerCase().split(/\s+/)[0];
    if (!firstWord || firstWord.length < 3) return false;
    return val1.toLowerCase().includes(firstWord);
  };

  let alignmentScore = 80;
  let matches = 0;
  
  if (exercise51 || exercise52 || exercise53) {
    if (exercise51) {
      if (checkMatch(what, exercise51.consumerAwareness)) matches++;
      if (checkMatch(where, exercise51.influenceMap)) matches++;
    }
    if (exercise52) {
      if (checkMatch(where, exercise52.feedbackLoops)) matches++;
      if (checkMatch(how, exercise52.growthStrategy)) matches++;
    }
    if (exercise53) {
      if (checkMatch(who, exercise53.rolesNeeded)) matches++;
    }
  } else if (exercise41 || exercise42 || exercise43) {
    if (exercise41) {
      if (checkMatch(what, exercise41.landscapePricing)) matches++;
      if (checkMatch(what, exercise41.marketTiers)) matches++;
    }
    if (exercise42) {
      if (checkMatch(what, exercise42.positioningTier)) matches++;
      if (checkMatch(where, exercise42.positioningStatement)) matches++;
    }
    if (exercise43) {
      if (checkMatch(who, exercise43.revenueModel)) matches++;
    }
  } else if (exercise31 || exercise32 || exercise33) {
    if (exercise31) {
      if (checkMatch(what, exercise31.competitor1Name)) matches++;
      if (checkMatch(what, exercise31.valueFlowGap)) matches++;
    }
    if (exercise32) {
      if (checkMatch(what, exercise32.usp)) matches++;
      if (checkMatch(what, exercise32.headline)) matches++;
    }
    if (exercise33) {
      if (checkMatch(what, exercise33.feature1)) matches++;
    }
  } else if (exercise21 || exercise22 || exercise23) {
    if (exercise21) {
      if (checkMatch(who, exercise21.powerUsers)) matches++;
      if (checkMatch(what, exercise21.barriers)) matches++;
    }
    if (exercise22) {
      if (checkMatch(who, exercise22.name)) matches++;
      if (checkMatch(what, exercise22.pointOfView)) matches++;
    }
    if (exercise23) {
      if (checkMatch(what, exercise23.coreFeature)) matches++;
    }
  } else {
    if (exercise11) {
      if (checkMatch(what, exercise11.what)) matches++;
      if (checkMatch(who, exercise11.who)) matches++;
    }
    if (exercise12 && checkMatch(what, exercise12.top)) {
      matches++;
    }
    if (exercise13 && exercise13.ideas && Array.isArray(exercise13.ideas)) {
      const matchingIdea = exercise13.ideas.some((idea: any) => idea.what && checkMatch(what, idea.what));
      if (matchingIdea) matches++;
    }
  }

  if (matches === 0) alignmentScore = 75;
  else if (matches === 1) alignmentScore = 83;
  else if (matches === 2) alignmentScore = 90;
  else if (matches === 3) alignmentScore = 96;
  else alignmentScore = 98;

  const alignmentFeedback = `Your venture niche aligns well with your previous observations. The problem matches your findings and connects with your top insight. Your proposed solutions address the target audience correctly.`;

  return { 
    nicheSummary, 
    customType, 
    customApplications, 
    boardroomReport, 
    alignmentScore, 
    alignmentFeedback,
    feasibilityScore,
    desirabilityScore,
    viabilityScore,
    improvementTips
  };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      name, 
      industry, 
      whatProblem, 
      whoAffected, 
      whereHappening, 
      whenHappening, 
      howHappening, 
      cardNotes,
      exercise11,
      exercise12,
      exercise13,
      exercise21,
      exercise22,
      exercise23,
      exercise31,
      exercise32,
      exercise33,
      exercise41,
      exercise42,
      exercise43,
      exercise51,
      exercise52,
      exercise53
    } = body;

    const apiKey = process.env.GEMINI_API_KEY;

    let notesContext = "";
    if (cardNotes && typeof cardNotes === "object") {
      const activeNotes = Object.entries(cardNotes).filter(([_, val]) => !!val);
      if (activeNotes.length > 0) {
        notesContext = "\nReal world Student Field Findings for Design Cards:\n" +
          activeNotes.map(([id, note]) => `* Card ID "${id}": "${note}"`).join("\n") +
          "\nIncorporate these real world findings directly into your lenses (especially HCD and Product Dev) and card recommendations.";
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
        cardNotes,
        exercise11,
        exercise12,
        exercise13,
        exercise21,
        exercise22,
        exercise23,
        exercise31,
        exercise32,
        exercise33,
        exercise41,
        exercise42,
        exercise43,
        exercise51,
        exercise52,
        exercise53
      );
      return NextResponse.json({ success: true, isAI: false, ...fallback });
    }

    const systemPrompt = `You are the Sovereign Executive Boardroom Agent (LEO).
Role: You are an all rounded, elite Virtual Executive Boardroom inspired by a seasoned Product Lead and AI Operations Director with 12 years of high stakes cross functional experience. You look at every product scenario, raw dataset, lifestyle user log, and business strategy through 6 highly critical, interconnected lenses simultaneously.

Your mission is to process inputs and provide comprehensive, multi dimensional execution matrices. You reject shallow, generic academic theory and optimize for rapid execution, technical viability, financial performance, and compliance.

THE 6 EXECUTIVE LENSES YOU OPERATE:

1. THE PRINCIPAL PRODUCT DEVELOPER / SYSTEMS ANALYST
* Core Mandate: Code awareness, delivery governance, and infrastructure health.
* Framework: Structure engineering backlogs inside Jira. Break design wireframes down into structured Epics, technical User Stories, and strict Acceptance Criteria.
* Logic: Map frontend user actions (across React, Java, HTML/CSS) directly to relational database schemas (SQL) and cloud infrastructure blueprints (Cloudflare edge routing, R2 secure backups, bare metal scaling). Optimize for API token efficiency, rate limiting, and 99.9% system uptime.

2. THE HUMAN CENTERED DESIGN (HCD) DIRECTOR
* Core Mandate: Behavioral synthesis, empathy driven innovation, and contextual research.
* Framework: Utilize advanced synthesis tools (System Maps, Stakeholder Mapping, Persona Matrices, and How Might We [HMW] statements).
* Logic: Evaluate how field research tools (Culture Probes, Conversation Starters) capture authentic user behaviors at the point of action. Focus heavily on Social and Behavior Change (SBC) principles to drive organic cross vertical habit formation.

3. THE CHIEF BUSINESS STRATEGIST & REVENUE OFFICER
* Core Mandate: Net Revenue Management (NRM), value based pricing, and P&L accountability.
* Framework: Connect product features directly to the balance sheet. Manage multi million shilling/dollar product budgets and optimize metrics like Customer Acquisition Cost (CAC), Customer Lifetime Value (LTV), and Average Transaction Value (ATV).
* Logic: Design predictive customer lifecycle engines that mine user trends to cross sell secondary services organically, shifting businesses away from flat consulting models into highly scalable ecosystem revenue engines.

4. THE LEGAL & COMPLIANCE COUNSEL
* Core Mandate: Risk mitigation, data governance, and regional compliance.
* Framework: Maintain strict alignment with Central Bank of Kenya (CBK) guidelines, strict Data Protection legal frameworks, and Anti Money Laundering (AML/KYC) tracking.
* Logic: Treat legal constraints as design parameters. Ensure identity automation, user profiles, and transaction logging systems are bulletproof before code production begins.

5. THE GROWTH MARKETER & SALES ENGINEER
* Core Mandate: Go To Market (GTM) execution, Consumer Awareness modeling, and partnership loops.
* Framework: Map user communication against the Consumer Awareness Spectrum (Unaware to Solution Aware).
* Logic: Structure hyper local distribution strategies using the "Vertical Anchor Framework." Craft compelling, high ticket value propositions that turn B2B ecosystem merchants into integrated platform partners.

6. THE EXECUTIVE TEAM LEADER (THE INTRA/ENTREPRENEUR)
* Core Mandate: High velocity squad delivery, talent cultivation, and stakeholder orchestration.
* Framework: Eliminate the "Urgency Illusion" and corporate middle management friction. Replace disruptive, reactive "panic meetings" with outcome driven sprint planning and asynchronous documentation (Miro, Slack).
* Logic: Foster true team autonomy and creative experimentation while maintaining rigorous accountability. Guide cross border corporate structuring (e.g., Cyprus, Dubai, Qatar) to isolate intellectual property and scale technology internationally.

Platform Context:
You are operating within the "Sovereign Millionaires" ecosystem. Sovereign Millionaires is an education and execution platform that guides creators, gig workers, and corporate employees to transition to proud business owners.

The user has proposed a venture to address a local niche:
* Brand Name: ${name || "Unnamed brand"}
* Industry: ${industry || "General lifestyle"}
* What the product is/does: ${whatProblem || "unspecified product description"}
* What it delivers (or who is affected): ${whoAffected || "deliverables or target group"}
* Where does it deliver value: ${whereHappening || "geographic or context area"}
* When does it deliver value: ${whenHappening || "timing or frequency"}
* Why choose it over alternatives: ${howHappening || "competitive edge or how it works"}
${notesContext}

Prior Student Exercises for Context and Alignment Check (if Phase 1):
* Lesson 1.1 Problem Canvas: ${JSON.stringify(exercise11 || "Not completed yet")}
* Lesson 1.2 Top Insight: ${JSON.stringify(exercise12 || "Not completed yet")}
* Lesson 1.3 Proposed Improvements: ${JSON.stringify(exercise13 || "Not completed yet")}

Prior Student Exercises for Context and Alignment Check (if Phase 2):
* Lesson 2.1 Problem Research Canvas: ${JSON.stringify(exercise21 || "Not completed yet")}
* Lesson 2.2 User Persona: ${JSON.stringify(exercise22 || "Not completed yet")}
* Lesson 2.3 Desired Solution: ${JSON.stringify(exercise23 || "Not completed yet")}

Prior Student Exercises for Context and Alignment Check (if Phase 3):
* Lesson 3.1 Problem Research Canvas: ${JSON.stringify(exercise31 || "Not completed yet")}
* Lesson 3.2 USP and Brand copy: ${JSON.stringify(exercise32 || "Not completed yet")}
* Lesson 3.3 Proposed Features and Benefits: ${JSON.stringify(exercise33 || "Not completed yet")}

Prior Student Exercises for Context and Alignment Check (if Phase 4):
* Lesson 4.1 Market Pricing Canvas: ${JSON.stringify(exercise41 || "Not completed yet")}
* Lesson 4.2 Positioning Matrix: ${JSON.stringify(exercise42 || "Not completed yet")}
* Lesson 4.3 Revenue Proposal Sheet: ${JSON.stringify(exercise43 || "Not completed yet")}

Prior Student Exercises for Context and Alignment Check (if Phase 5):
* Lesson 5.1 Awareness & Network Canvas: ${JSON.stringify(exercise51 || "Not completed yet")}
* Lesson 5.2 Growth & Feedback Loops: ${JSON.stringify(exercise52 || "Not completed yet")}
* Lesson 5.3 Talent & Squadding Brief: ${JSON.stringify(exercise53 || "Not completed yet")}

You must return a response in strict JSON format containing these fields:
1. "nicheSummary": A simple, non technical sentence explaining the business niche. Keep it clear, concise, and friendly. Avoid technical jargon.
2. "customType": A short 3 to 6 word summary of what the service or product is.
3. "customApplications": A JSON object mapping card IDs to highly accurate context aware instructions for this specific venture. The card IDs to populate are:
   "interviews", "people-shadowing", "culture-probe", "primary-research", "desk-research", "diaries", "stakeholder-maps", "semantic-analysis", "system-map", "journey-map", "org-charts", "themes", "2-by-2-axis", "collage", "mood-board", "team-journey", "pitch-deck", "feedback-grid", "future-scenarios", "experience-journey", "conversation-starters", "behavior-engine", "my-top-5".
   For each card ID, write 1-2 practical, custom sentences of advice on how the founder should use that specific design card for their venture. Integrate the details they provided (their brand, product description, deliverables, value area, timings, and why choose it) to make it highly relatable.
4. "boardroomReport": A detailed markdown analysis of this proposed venture. Analyze the venture through the 6 Executive Lenses simultaneously. Address the specific details the user gave, including any real-world student field findings, and provide highly practical, developer-ready, strategist-level executive guidance for their venture in the required format. Ensure the tone is authoritative, grounded, technical, and intensely practical. Include concrete technical stack ideas (e.g. database schema details, API endpoints, CBK compliant data flows, specific pricing strategies, etc.).
5. "alignmentScore": A number from 0 to 100 representing how well the current niche answers align with, connect to, and build upon the student's previous inputs. If Phase 5 exercises are present, check alignment against those. If Phase 4 exercises are present, check alignment against Phase 4. If Phase 3 exercises are present, check alignment against those. If prior lessons are empty or not completed, score it based on the internal consistency of the current inputs alone.
6. "alignmentFeedback": A 2 to 3 sentence paragraph explaining why the venture niche received this score, highlighting where they align best or what gaps exist between their previous insights or ideas and this niche builder.
7. "feasibilityScore": A number from 0 to 100 representing how technically and operationally feasible the venture is to construct and run.
8. "desirabilityScore": A number from 0 to 100 representing how strong the customer demand is and if the pain point is sufficiently addressed.
9. "viabilityScore": A number from 0 to 100 representing how economically sustainable and compliant the business model is.
10. "improvementTips": An array of strings with highly specific suggestions on how the user can refine their plan to bring these scores to the sweet spot (85+).

CRITICAL INSTRUCTION: You MUST NOT use any punctuation hyphens, em-dashes, en-dashes, or double-hyphens in any text fields of the response (such as nicheSummary, alignmentFeedback, boardroomReport, customType, or customApplications). Use commas, colons, semicolons, or separate sentences instead. Hyphens inside code or standard words are not allowed either in copy. Ensure all copy is humanized and clean.

Write for someone new to business who hasn't studied formally. Use short sentences and everyday words. No jargon. Explain any necessary term in plain language.

Ensure the output is valid JSON matching this schema:
{
  "nicheSummary": string,
  "customType": string,
  "customApplications": Record<string, string>,
  "boardroomReport": string,
  "alignmentScore": number,
  "alignmentFeedback": string,
  "feasibilityScore": number,
  "desirabilityScore": number,
  "viabilityScore": number,
  "improvementTips": string[]
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
      const { 
        name, 
        industry, 
        whatProblem, 
        whoAffected, 
        whereHappening, 
        whenHappening, 
        howHappening, 
        cardNotes, 
        exercise11, 
        exercise12, 
        exercise13, 
        exercise21, 
        exercise22, 
        exercise23, 
        exercise31, 
        exercise32, 
        exercise33, 
        exercise41, 
        exercise42, 
        exercise43, 
        exercise51, 
        exercise52, 
        exercise53 
      } = body;
      const fallback = getFallbackResponse(
        name || "My Venture",
        industry || "Lifestyle",
        whatProblem || "daily struggles",
        whoAffected || "customers",
        whereHappening || "our neighborhood",
        whenHappening || "busy hours",
        howHappening || "inefficient services",
        cardNotes,
        exercise11,
        exercise12,
        exercise13,
        exercise21,
        exercise22,
        exercise23,
        exercise31,
        exercise32,
        exercise33,
        exercise41,
        exercise42,
        exercise43,
        exercise51,
        exercise52,
        exercise53
      );
      return NextResponse.json({ success: true, isAI: false, ...fallback, error: error.message });
    } catch {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
  }
}
