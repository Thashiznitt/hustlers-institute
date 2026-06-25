import { NextResponse } from "next/server";

interface CardBlueprint {
  id: string;
  mandatory: boolean;
  tip: string;
}

const fallbackBlueprints: Record<string, Record<string, CardBlueprint[]>> = {
  "Wellness & Fitness": {
    "phase-1": [
      { id: "interviews", mandatory: true, tip: "Interview 5 gym members about their post-workout recovery routines. Find out what frustrates them about booking trainers." },
      { id: "people-shadowing", mandatory: true, tip: "Watch how clients navigate a fitness center check-in. Note where people queue up or get confused by timetables." },
      { id: "culture-probe", mandatory: true, tip: "Ask 3 active gym-goers to text you their workout energy levels and schedule struggles daily for a week." },
      { id: "photo-studies", mandatory: false, tip: "Have clients take photos of their home workout spaces or equipment clutter to understand their routine context." }
    ],
    "phase-2": [
      { id: "diaries", mandatory: true, tip: "Have 2 regular runners log their daily hydration and scheduling triggers for 10 days to identify habits." },
      { id: "empathy-map", mandatory: true, tip: "Map Busy Belinda's feelings when she misses a workout due to last-minute session cancellations." },
      { id: "behavior-engine", mandatory: true, tip: "Design a WhatsApp trigger: send a booking reminder exactly 30 minutes after they finish their morning run." },
      { id: "conversation-starters", mandatory: false, tip: "Use prompt cards to ask clients about their barriers to fitness: 'What stops you from booking your classes on Sunday night?'" }
    ],
    "phase-3": [
      { id: "system-map", mandatory: true, tip: "Draw a database flow showing how gym class availability updates instantly when a user claims a slot." },
      { id: "journey-map", mandatory: true, tip: "Trace every step from a user opening the app to scanning their QR code at the gym reception desk." },
      { id: "end-user-maps", mandatory: true, tip: "Establish clear customer profiles separating casual class-bookers from high-intent personal training clients." },
      { id: "mood-board", mandatory: false, tip: "Build a premium style board reflecting calming tones, organic typography, and luxury health spaces." }
    ],
    "phase-4": [
      { id: "desk-research", mandatory: true, tip: "Audit local boutique gyms and studios to see how they structure monthly packages versus class bundles." },
      { id: "trend-research", mandatory: true, tip: "Research the growth of mobile gym scheduling and personalized digital wellness routines." },
      { id: "competitive-analysis", mandatory: true, tip: "List the features, pricing tiers, and direct checkout weaknesses of three leading local fitness networks." },
      { id: "feedback-grid", mandatory: false, tip: "Show a client your personal training package sheet. Log questions on pricing terms and bundle expiration rules." }
    ],
    "phase-5": [
      { id: "stakeholder-maps", mandatory: true, tip: "Map out gym owners, freelance trainers, and clients to align scheduling and fee sharing agreements." },
      { id: "primary-research", mandatory: true, tip: "Run a trial cohort of 5 gym-goers. Validate if they would use the referral bonus to book classes." },
      { id: "conversation-starters", mandatory: false, tip: "Use structured questions to help early adopters share their workout milestones organically on social channels." }
    ]
  },
  "FinTech & Payments": {
    "phase-1": [
      { id: "interviews", mandatory: true, tip: "Interview 5 small business owners about how they currently collect client invoice payments. Focus on payment delays." },
      { id: "people-shadowing", mandatory: true, tip: "Watch a retail merchant process a card transaction. Note where payment gateways lag or fail." },
      { id: "culture-probe", mandatory: true, tip: "Ask 3 mobile wallet users to log their transaction speed frustrations over 5 busy working days." },
      { id: "desk-research", mandatory: false, tip: "Audit the local payment licensing requirements and Central Bank guidelines for digital money services." }
    ],
    "phase-2": [
      { id: "diaries", mandatory: true, tip: "Have 2 cash-only merchants keep a transaction journal for 10 days, logging every lost sale due to payment friction." },
      { id: "empathy-map", mandatory: true, tip: "Map a client's stress level when a critical transfer hangs in 'pending' status for hours." },
      { id: "behavior-engine", mandatory: true, tip: "Design an automated trigger: when an invoice is created, immediately SMS a secure payment link." },
      { id: "end-user-maps", mandatory: false, tip: "Profile your target user: group micro-merchants who need instant cashouts separate from larger invoicing agencies." }
    ],
    "phase-3": [
      { id: "system-map", mandatory: true, tip: "Diagram data flow: client clicks pay -> gateway processes payment -> database logs transactions -> merchant is notified." },
      { id: "journey-map", mandatory: true, tip: "Trace step-by-step invoice creation and mobile checkout, targeting a payment completion flow of under 60 seconds." },
      { id: "end-user-maps", mandatory: true, tip: "Create customer profiles for cash flow conscious users who prioritize payout velocity over interface details." },
      { id: "semantic-analysis", mandatory: false, tip: "Audit copy: replace complex banker terms like 'Initiate clearing protocol' with simple text like 'Get Paid Now'." }
    ],
    "phase-4": [
      { id: "desk-research", mandatory: true, tip: "Map transaction fees charged by local commercial banks, mobile wallet providers, and payment processors." },
      { id: "trend-research", mandatory: true, tip: "Identify trends in micro-payments, QR code billing, and zero-trust transaction security." },
      { id: "competitive-analysis", mandatory: true, tip: "Compare the merchant transaction rates and payout speeds of major fintech services." },
      { id: "pitch-deck", mandatory: false, tip: "Draft a 5-slide pitch proving how your lower transaction rates save merchant networks $300+ monthly." }
    ],
    "phase-5": [
      { id: "stakeholder-maps", mandatory: true, tip: "Map the relationships between merchants, users, acquiring banks, and payment gateways." },
      { id: "primary-research", mandatory: true, tip: "Pitch your processing service to 3 merchants. Check if they would shift bookings to your system for a 1% fee reduction." },
      { id: "experience-journey", mandatory: false, tip: "Trace the customer path from invoice receipt to final verification and digital receipt generation." }
    ]
  },
  "Retail & E-Commerce": {
    "phase-1": [
      { id: "interviews", mandatory: true, tip: "Interview 5 active online shoppers about their return delivery headaches and size tracking issues." },
      { id: "people-shadowing", mandatory: true, tip: "Watch a user search and buy clothing online. Note when they scroll past filters or hesitate at sizing charts." },
      { id: "culture-probe", mandatory: true, tip: "Ask 3 frequent shoppers to record their mood logs during checkout delays and checkout successes this week." },
      { id: "trend-research", mandatory: false, tip: "Identify fast-growing shifts in mobile checkout habits, curated thrift items, and packaging preferences." }
    ],
    "phase-2": [
      { id: "diaries", mandatory: true, tip: "Have 2 online shoppers journal their order delivery wait times and returns friction for two weeks." },
      { id: "empathy-map", mandatory: true, tip: "Map the feelings of a buyer who receives a damaged item after waiting 7 days for shipping." },
      { id: "behavior-engine", mandatory: true, tip: "Design an auto-response: send a WhatsApp delivery tracking notification right when the courier departs." },
      { id: "mood-board", mandatory: false, tip: "Assemble a board of high-conversion product layouts, minimalist shop styles, and clear pricing displays." }
    ],
    "phase-3": [
      { id: "system-map", mandatory: true, tip: "Map data from user cart selection to inventory databases to avoid showing out-of-stock items." },
      { id: "journey-map", mandatory: true, tip: "Trace the shopper's flow from product detail pages to cart verification and payment receipt." },
      { id: "end-user-maps", mandatory: true, tip: "Detail profiles mapping impulse shoppers separate from comparison buyers who look for discounts." },
      { id: "collage", mandatory: false, tip: "Create a mood collage mapping the luxury or streetwear vibes that resonate with your core fashion audience." }
    ],
    "phase-4": [
      { id: "desk-research", mandatory: true, tip: "Analyze standard pricing, markup margins, and shipping courier costs in the online fashion space." },
      { id: "trend-research", mandatory: true, tip: "Study transaction margins for marketplace platforms versus setting up an independent Shopify portal." },
      { id: "competitive-analysis", mandatory: true, tip: "Identify three successful retail platforms and detail their shipping costs and conversion triggers." },
      { id: "marketing-funnel", mandatory: false, tip: "Map out conversion stages: social ads -> product clicks -> add to cart -> checkout success." }
    ],
    "phase-5": [
      { id: "stakeholder-maps", mandatory: true, tip: "Map checkout connections between merchants, suppliers, courier delivery networks, and payment channels." },
      { id: "primary-research", mandatory: true, tip: "Run a soft launch using local streetwear groups to validate item interest before buying inventory." },
      { id: "content-calendar", mandatory: false, tip: "Plan 10 posts highlighting customer reviews, styling tips, and new arrival countdown timers." }
    ]
  },
  "Logistics & Delivery": {
    "phase-1": [
      { id: "interviews", mandatory: true, tip: "Interview 5 customers about their courier delivery hassles: focus on delays, wrong addresses, and tracking." },
      { id: "people-shadowing", mandatory: true, tip: "Shadow a delivery courier on 3 drop-offs. Document mapping delays and signature verification hassles." },
      { id: "culture-probe", mandatory: true, tip: "Have 3 clients text you the exact arrival times and courier delivery delays over a week." },
      { id: "stakeholder-maps", mandatory: false, tip: "Draw a map of drivers, clients, dispatchers, and dispatch managers to spot communication drops." }
    ],
    "phase-2": [
      { id: "diaries", mandatory: true, tip: "Have 2 dispatch managers keep a ledger of daily driver delays and vehicle maintenance issues for 10 days." },
      { id: "empathy-map", mandatory: true, tip: "Map Clara's stress level when a delivery courier misses a tight delivery slot for a vital client order." },
      { id: "behavior-engine", mandatory: true, tip: "Design an auto-trigger: send a WhatsApp notification with the courier's phone link when they are 2 km away." },
      { id: "journey-map", mandatory: false, tip: "Map the courier assignment journey: order request -> driver dispatch -> pickup -> delivery verification." }
    ],
    "phase-3": [
      { id: "system-map", mandatory: true, tip: "Map real-time location database updates: driver device logs GPS -> server calculates ETA -> client maps updates." },
      { id: "journey-map", mandatory: true, tip: "Trace the sender's flow from selecting address locations to confirming pickup times and payments." },
      { id: "end-user-maps", mandatory: true, tip: "Profile client types, separating corporate repeat shippers from one-off local peer-to-peer senders." },
      { id: "role-playing", mandatory: false, tip: "Simulate a delivery driver arriving at a locked gate. Note what actions they take and how to design the app fallback flow." }
    ],
    "phase-4": [
      { id: "desk-research", mandatory: true, tip: "Audit delivery driver fuel budgets, pricing zones, and insurance coverage costs in local courier hubs." },
      { id: "trend-research", mandatory: true, tip: "Analyze trends in smart routing algorithms, electric motorcycle delivery, and green packaging options." },
      { id: "competitive-analysis", mandatory: true, tip: "Contrast the pricing structures, delivery times, and service zones of top delivery courier apps." },
      { id: "future-scenarios", mandatory: false, tip: "Map service cost changes if fuel prices increase 15% or traffic rules restrict motorcycle transit zones." }
    ],
    "phase-5": [
      { id: "stakeholder-maps", mandatory: true, tip: "Map relationships between senders, delivery drivers, transit supervisors, and local logistics managers." },
      { id: "primary-research", mandatory: true, tip: "Pitch delivery services to 3 local online shops. Check if they would link booking channels for a flat fee." },
      { id: "team-journey", mandatory: false, tip: "Plan a roadmap for recruiting, onboarding, and training the first 5 dispatch drivers." }
    ]
  },
  "Professional Services & Agency": {
    "phase-1": [
      { id: "interviews", mandatory: true, tip: "Interview 5 small business owners about their accounting, design, or marketing needs. Focus on billing transparency." },
      { id: "people-shadowing", mandatory: true, tip: "Watch how a client hires freelance support, detailing the scoping, pricing checks, and initial briefings." },
      { id: "culture-probe", mandatory: true, tip: "Ask 3 active clients to log their project status communication frustrations over 10 working days." },
      { id: "primary-research", mandatory: false, tip: "Pitch your design, tech, or accounting services to local companies to check scope requirements." }
    ],
    "phase-2": [
      { id: "diaries", mandatory: true, tip: "Have 2 clients keep project journals, logging every time a freelancer delays updates or changes scope." },
      { id: "empathy-map", mandatory: true, tip: "Map a business manager's anxiety when a crucial client deliverable is delayed right before launch." },
      { id: "behavior-engine", mandatory: true, tip: "Design an auto-update trigger: send a project summary email every Friday morning without manual drafting." },
      { id: "org-charts", mandatory: false, tip: "Map key decision makers in your client's firm to verify who signs off budgets versus who details specs." }
    ],
    "phase-3": [
      { id: "system-map", mandatory: true, tip: "Diagram the workflow from project briefs submission -> client files storage -> milestones check -> client review." },
      { id: "journey-map", mandatory: true, tip: "Trace the client onboarding steps, aiming to go from initial scoping call to contract signature in under 48 hours." },
      { id: "end-user-maps", mandatory: true, tip: "Establish clear profiles separating high-value monthly retainer clients from small one-off task seekers." },
      { id: "idea-napkin", mandatory: false, tip: "Write a clear concept overview: what service bundles you offer, monthly deliverables, and direct business results." }
    ],
    "phase-4": [
      { id: "desk-research", mandatory: true, tip: "Audit market rates for designers, consultants, and accounting firms to structure premium pricing tiers." },
      { id: "trend-research", mandatory: true, tip: "Research trends in fractional services, automation workflows, and value-based service packages." },
      { id: "competitive-analysis", mandatory: true, tip: "Analyze the pricing packages, proposal details, and customer reviews of three similar boutique firms." },
      { id: "workshops", mandatory: false, tip: "Pitch your pricing tiers in a scoping workshop with a target client. Map their budget and scope reactions." }
    ],
    "phase-5": [
      { id: "stakeholder-maps", mandatory: true, tip: "Map project stakeholders, matching client sponsors, project reviewers, and freelance subcontractors." },
      { id: "primary-research", mandatory: true, tip: "Pitch a monthly retainer to a prospect. Verify if they would commit to a 3-month contract upfront." },
      { id: "feedback-grid", mandatory: false, tip: "Collect reviews from early retainer trials, mapping liked items, scoping questions, and adjustments." }
    ]
  }
};

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { vertical } = body;

    const selectedVertical = vertical || "Wellness & Fitness";

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.warn("No GEMINI_API_KEY set. Using high-quality rule-based local fallback.");
      const fallback = fallbackBlueprints[selectedVertical] || fallbackBlueprints["Wellness & Fitness"];
      return NextResponse.json({ success: true, isAI: false, blueprints: fallback });
    }

    const systemPrompt = `You are LEO, the Sovereign Design Thinking Blueprint Compiler.
Your goal is to output a set of custom interactive design cards recommended for a venture in the "${selectedVertical}" business vertical.

You must recommend exactly 3 to 4 cards for each of the 5 phases of the design thinking journey.
For each phase, you MUST include the following mandatory cards:
- Phase 1 (Discover): "interviews", "people-shadowing", "culture-probe"
- Phase 2 (Habits & Understand): "diaries", "empathy-map", "behavior-engine"
- Phase 3 (Build): "system-map", "journey-map", "end-user-maps"
- Phase 4 (Money): "desk-research", "trend-research", "competitive-analysis"
- Phase 5 (Launch): "stakeholder-maps", "primary-research"

In addition to the mandatory cards, select 1 additional highly relevant card from the 47 cards in the toolkit for that vertical.
Write a custom execution tip (1-2 clear, actionable sentences) for EACH card tailored to the selected vertical: "${selectedVertical}".

CRITICAL INSTRUCTION: You MUST NOT use any punctuation hyphens, em-dashes, en-dashes, or double-hyphens in the tips. Use commas, colons, semicolons, or separate sentences instead. Hyphens inside code or standard words are not allowed either. Keep copy clean and simple.

Your output must be strict JSON in the following schema:
{
  "blueprints": {
    "phase-1": [
      { "id": string, "mandatory": boolean, "tip": string },
      ...
    ],
    "phase-2": [...],
    "phase-3": [...],
    "phase-4": [...],
    "phase-5": [...]
  }
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
    return NextResponse.json({ success: true, isAI: true, blueprints: parsedData.blueprints });

  } catch (error: any) {
    console.error("Error in playground-ai route:", error);
    // Safe fallback
    const selectedVertical = "Wellness & Fitness";
    const fallback = fallbackBlueprints[selectedVertical];
    return NextResponse.json({ success: true, isAI: false, blueprints: fallback, error: error.message });
  }
}
