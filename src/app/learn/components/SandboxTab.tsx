"use client";

import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { SovereignInput as Input } from "@/components/ui/SovereignInput";
import { SovereignTextarea as Textarea } from "@/components/ui/SovereignTextarea";
import { Button } from "@/components/ui/button";
import { useLearnProgress } from "../hooks/useLearnProgress";
import { useVentureProfile } from "../hooks/useVentureProfile";
import { phasesData } from "../data/phases";
import { RefreshCw, Sparkles } from "lucide-react";
import { SovereignSelect } from "@/components/ui/SovereignSelect";
import { cardsList } from "@/components/DesignCardsExplorer";
import VennDiagram from "./VennDiagram";

interface SandboxTabProps {
  onNavigateToCard?: (cardId: string) => void;
}

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
      { id: "primary-research", mandatory: true, tip: "Pitch delivery services to 3 online shops. Check if they would link booking channels for a flat fee." },
      { id: "team-journey", mandatory: false, tip: "Plan a roadmap for recruiting, onboarding, and training the first 5 dispatch drivers." }
    ]
  },
  "Professional Services & Agency": {
    "phase-1": [
      { id: "interviews", mandatory: true, tip: "Interview 5 small business owners about their accounting, design, or marketing needs. Focus on billing transparency." },
      { id: "people-shadowing", mandatory: true, tip: "Watch how a client hires freelance support, detailing scoping, pricing checks, and initial briefings." },
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
      { id: "system-map", mandatory: true, tip: "Diagram workflow: project brief submission -> client files storage -> milestones check -> client review." },
      { id: "journey-map", mandatory: true, tip: "Trace client onboarding steps, aiming to go from initial scoping call to contract signature in under 48 hours." },
      { id: "end-user-maps", mandatory: true, tip: "Establish clear profiles separating high-value monthly retainer clients from small one-off task seekers." },
      { id: "idea-napkin", mandatory: false, tip: "Write a clear concept overview: what service bundles you offer, monthly deliverables, and direct business results." }
    ],
    "phase-4": [
      { id: "desk-research", mandatory: true, tip: "Audit market rates for designers, consultants, and accounting firms to structure premium pricing tiers." },
      { id: "trend-research", mandatory: true, tip: "Research trends in fractional services, automation workflows, and value-based service packages." },
      { id: "competitive-analysis", mandatory: true, tip: "Analyze pricing packages, proposal details, and customer reviews of three similar boutique firms." },
      { id: "workshops", mandatory: false, tip: "Pitch your pricing tiers in a scoping workshop with a target client. Map their budget and scope reactions." }
    ],
    "phase-5": [
      { id: "stakeholder-maps", mandatory: true, tip: "Map project stakeholders, matching client sponsors, project reviewers, and freelance subcontractors." },
      { id: "primary-research", mandatory: true, tip: "Pitch a monthly retainer to a prospect. Verify if they would commit to a 3-month contract upfront." },
      { id: "feedback-grid", mandatory: false, tip: "Collect reviews from early retainer trials, mapping liked items, scoping questions, and adjustments." }
    ]
  }
};

function getLocalBoardroomReport(
  vertical: string,
  complianceScore: number,
  habitLoop: { trigger: string; routine: string; reward: string },
  schemaCount: number,
  retainerMargin: number,
  growthMetrics: { latency: number; vir: number; mau: number; ltv: number }
) {
  let feasibilityScore = 70;
  let desirabilityScore = 72;
  let viabilityScore = 68;

  if (complianceScore >= 80) feasibilityScore += 10;
  else if (complianceScore < 50) feasibilityScore -= 10;
  if (schemaCount >= 3) feasibilityScore += 10;
  if (growthMetrics.latency < 1000) feasibilityScore += 8;

  if (habitLoop && habitLoop.trigger && habitLoop.routine && habitLoop.reward) {
    desirabilityScore += 15;
  }
  if (growthMetrics.mau > 1500) desirabilityScore += 10;

  if (retainerMargin >= 70) viabilityScore += 15;
  else if (retainerMargin < 40) viabilityScore -= 10;
  if (growthMetrics.ltv > 30) viabilityScore += 10;
  if (complianceScore < 50) viabilityScore -= 15;

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

export default function SandboxTab({ onNavigateToCard }: SandboxTabProps) {
  const progress = useLearnProgress();
  const { profile } = useVentureProfile();

  const ventureName = profile.name || "your venture";
  const ventureIndustry = profile.industry || "your industry";

  // Tab State
  const [activePlaygroundTab, setActivePlaygroundTab] = useState<number | "assessment">(1);

  // Sync tab with active progress phase on mount
  useEffect(() => {
    if (progress.activePhaseIndex !== undefined) {
      setActivePlaygroundTab(progress.activePhaseIndex + 1);
    }
  }, [progress.activePhaseIndex]);

  // Selected Vertical
  const [selectedVertical, setSelectedVertical] = useState<string>("Wellness & Fitness");
  const [blueprintLoading, setBlueprintLoading] = useState<boolean>(false);
  const [blueprints, setBlueprints] = useState<Record<string, CardBlueprint[]>>({});

  // Fetch blueprints on vertical change
  useEffect(() => {
    async function loadBlueprint() {
      setBlueprintLoading(true);
      try {
        const res = await fetch("/api/playground-ai", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ vertical: selectedVertical })
        });
        const data = await res.json();
        if (data.success && data.blueprints) {
          setBlueprints(data.blueprints);
        }
      } catch (err) {
        console.error("Failed to load blueprint", err);
      } finally {
        setBlueprintLoading(false);
      }
    }
    loadBlueprint();
  }, [selectedVertical]);

  // Sandbox 1: Privacy
  const [s1DataCollected, setS1DataCollected] = useState({ location: false, phone: false, bookings: false, payments: false });
  const [s1Storage, setS1Storage] = useState("shared");
  const [s1Consents, setS1Consents] = useState({ askConsent: false, deleteData: false, encryptInfo: false });

  // Sandbox 2: Habits
  const [s2ActiveTab, setS2ActiveTab] = useState("personas");
  const [s2ActivePersona, setS2ActivePersona] = useState(0);
  const [s2CardTool, setS2CardTool] = useState("interview");
  const [s2CardPrompt, setS2CardPrompt] = useState("Ask them about their gym travel routine...");

  // Sandbox 3: SQL
  const [s3Schema, setS3Schema] = useState({ id: true, name: true, bookings: true, payments: false });
  const [s3Tasks, setS3Tasks] = useState([
    { id: 1, text: "Reduce booking image sizes for speed", status: "todo" },
    { id: 2, text: "Check database index on user_id", status: "doing" },
    { id: 3, text: "Write simple signup privacy text", status: "done" }
  ]);
  const [s3NewTaskText, setS3NewTaskText] = useState("");

  // Sandbox 4: Retainer
  const [s4ClientName, setS4ClientName] = useState("Local Fitness Hub");
  const [s4MonthlyRate, setS4MonthlyRate] = useState(800);
  const [s4HoursPerWeek, setS4HoursPerWeek] = useState(15);
  const [s4SupportType] = useState("Design & Tech Maintenance");
  const [s4Expenses, setS4Expenses] = useState(150);

  // Sandbox 5: GTM
  const [s5ReferralReward, setS5ReferralReward] = useState(5);
  const [s5PartnerPosts, setS5PartnerPosts] = useState(3);
  const [s5TechMaintenance, setS5TechMaintenance] = useState(50);

  // Boardroom Assessment state
  const [boardroomLoading, setBoardroomLoading] = useState<boolean>(false);
  const [boardroomReport, setBoardroomReport] = useState<{
    feasibilityScore: number;
    desirabilityScore: number;
    viabilityScore: number;
    analysis: string;
    improvementTips: string[];
    recommendations: string[];
  } | null>(null);

  // Sandbox helpers
  const getComplianceScore = () => {
    let score = 50;
    if (s1Storage === "shared") score -= 30;
    else if (s1Storage === "cloud") score += 10;
    else if (s1Storage === "local") score += 20;
    if (s1Consents.askConsent) score += 15;
    if (s1Consents.deleteData) score += 10;
    if (s1Consents.encryptInfo) score += 15;
    return Math.max(0, Math.min(100, score));
  };
  const complianceScore = getComplianceScore();

  const moveTask = (taskId: number, newStatus: string) => {
    setS3Tasks(s3Tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
  };

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!s3NewTaskText.trim()) return;
    setS3Tasks([...s3Tasks, { id: Date.now(), text: s3NewTaskText, status: "todo" }]);
    setS3NewTaskText("");
  };

  const getSimulatedMetrics = () => {
    let latency = Math.round(3000 - (s5TechMaintenance * 14));
    latency = Math.max(120, latency);
    let vir = s5ReferralReward * 0.15;
    if (s5ReferralReward === 0) vir = 0.05;
    vir = parseFloat(vir.toFixed(2));
    let baseUsers = 500 + (s5PartnerPosts * 450);
    if (latency > 1500) baseUsers *= 0.4;
    else if (latency > 800) baseUsers *= 0.7;
    const mau = Math.round(baseUsers * (1 + vir));
    const ltv = Math.max(10, 45 - (s5ReferralReward * 1.5));
    return { latency, vir, mau, ltv };
  };
  const metrics = getSimulatedMetrics();

  // Run Boardroom Assessment
  const handleRunAssessment = async () => {
    setBoardroomLoading(true);
    const activeP = [
      { name: "Busy Belinda", trigger: "After-class muscle ache alerts", routine: "Auto-adds post-workout shake to cart", reward: "Free protein shaker + 15% discount" },
      { name: "Alex the Runner", trigger: "Post-field calendar triggers", routine: "Pre-populates taxi rides", reward: "Earn points toward field rentals" },
      { name: "Clara the Customer", trigger: "Quick drop notifications", routine: "1-Click Apple Pay checkout", reward: "Free priority delivery in 15 min" }
    ][s2ActivePersona] || { trigger: "General alert", routine: "Booking", reward: "Discount" };

    const habitLoop = {
      trigger: activeP.trigger,
      routine: s2CardTool === "interview" ? "Customer Chats interviews" : s2CardTool === "diaries" ? "Log Diaries tracking" : s2CardTool === "copywriting" ? "Semantic Vocabulary copy" : "Frictionless Experience Map",
      reward: activeP.reward
    };

    const schemaCount = Object.values(s3Schema).filter(Boolean).length;
    const net = s4MonthlyRate - s4Expenses;
    const retainerMargin = s4MonthlyRate > 0 ? (net / s4MonthlyRate) * 100 : 0;

    const payload = {
      vertical: selectedVertical,
      complianceScore,
      habitLoop,
      schemaCount,
      retainerMargin,
      growthMetrics: metrics
    };

    try {
      const res = await fetch("/api/boardroom-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        setBoardroomReport({
          feasibilityScore: data.feasibilityScore,
          desirabilityScore: data.desirabilityScore,
          viabilityScore: data.viabilityScore,
          analysis: data.analysis,
          improvementTips: data.improvementTips,
          recommendations: data.recommendations
        });
      } else {
        throw new Error(data.error || "Failed API response");
      }
    } catch (err) {
      console.error("Boardroom API failed, triggering local compilation:", err);
      const fallback = getLocalBoardroomReport(
        selectedVertical,
        complianceScore,
        habitLoop,
        schemaCount,
        retainerMargin,
        metrics
      );
      setBoardroomReport(fallback);
    } finally {
      setBoardroomLoading(false);
    }
  };

  const renderMarkdown = (md: string) => {
    return md.split("\n").map((line, idx) => {
      if (line.startsWith("### ")) {
        return <h4 key={idx} className="font-mono text-sm md:text-base font-black uppercase text-black mt-6 border-b-2 border-black pb-1 mb-3">{line.replace("### ", "")}</h4>;
      }
      if (line.startsWith("#### ")) {
        return <h5 key={idx} className="font-mono text-xs font-black uppercase text-slate-800 mt-5 mb-2.5">{line.replace("#### ", "")}</h5>;
      }
      if (line.startsWith("* **")) {
        const parts = line.replace("* **", "").split("**: ");
        return (
          <li key={idx} className="text-xs text-slate-700 leading-relaxed list-none pl-4 relative before:content-['■'] before:absolute before:left-0 before:text-black before:text-[8px] before:top-1.5 mb-2 font-mono">
            <strong className="text-black uppercase">{parts[0]}</strong>: {parts[1]}
          </li>
        );
      }
      if (line.startsWith("* ")) {
        return (
          <li key={idx} className="text-xs text-slate-700 leading-relaxed list-none pl-4 relative before:content-['■'] before:absolute before:left-0 before:text-black before:text-[8px] before:top-1.5 mb-2 font-mono">
            {line.replace("* ", "")}
          </li>
        );
      }
      if (line.trim() === "") return <div key={idx} className="h-1.5" />;
      return <p key={idx} className="text-xs text-slate-650 leading-relaxed mb-2.5 font-sans">{line}</p>;
    });
  };

  const phaseKey = `phase-${activePlaygroundTab}`;
  const activeBlueprints = blueprints[phaseKey] || fallbackBlueprints[selectedVertical]?.[phaseKey] || [];

  return (
    <div className="w-full pb-12 font-sans">
      {/* Phase selector */}
      <div className="flex flex-wrap gap-2 mb-8">
        {phasesData.map((phase, idx) => (
          <button
            key={phase.id}
            type="button"
            onClick={() => {
              progress.navigateTo(idx, 0);
              setActivePlaygroundTab(idx + 1);
            }}
            className={`px-4 py-2 rounded-none text-xs font-bold font-mono border transition-all cursor-pointer ${
              activePlaygroundTab === idx + 1
                ? "bg-[#eae3d7] text-[#5c5346] border-[#5c5346]"
                : "bg-white text-slate-600 border-slate-200 hover:border-slate-350"
            }`}
          >
            Phase {phase.num}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setActivePlaygroundTab("assessment")}
          className={`px-4 py-2 rounded-none text-xs font-bold font-mono border transition-all cursor-pointer ${
            activePlaygroundTab === "assessment"
              ? "bg-[#eae3d7] text-[#5c5346] border-[#5c5346]"
              : "bg-white text-slate-600 border-slate-200 hover:border-slate-350"
          }`}
        >
          🏆 Boardroom Assessment
        </button>
      </div>

      {/* Vertical Selector */}
      <div className="bg-[#eae3d7] border-2 border-black p-4 mb-6 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-left flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h5 className="font-mono text-xs font-black uppercase text-black tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-slate-900 fill-slate-900 animate-pulse" />
            Target Business Vertical
          </h5>
          <p className="text-xs text-slate-700">
            LEO AI will dynamically load recommended cards and tailor boardroom reports to this sector.
          </p>
        </div>
        <div className="w-full md:w-64 shrink-0">
          <SovereignSelect 
            value={selectedVertical} 
            onChange={(e) => setSelectedVertical(e.target.value)} 
            className="w-full text-xs font-mono font-bold uppercase tracking-wide border-2 border-black bg-white rounded-none cursor-pointer focus:outline-none h-10 px-2"
          >
            <option value="Wellness & Fitness">Wellness & Fitness</option>
            <option value="FinTech & Payments">FinTech & Payments</option>
            <option value="Retail & E-Commerce">Retail & E-Commerce</option>
            <option value="Logistics & Delivery">Logistics & Delivery</option>
            <option value="Professional Services & Agency">Professional Services & Agency</option>
          </SovereignSelect>
        </div>
      </div>

      <div className="bg-white text-slate-900 rounded-none p-6 md:p-8 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="mb-6">
          <Badge className="bg-black text-white border border-black text-[9px] font-bold uppercase tracking-wider mb-2 rounded-none font-mono">
            Module Practice Playground
          </Badge>
          <h3 className="font-heading text-lg font-extrabold text-slate-900 uppercase tracking-wide font-mono">
            {activePlaygroundTab === 1 && "Phase 1: Local App Data Compliance Checker"}
            {activePlaygroundTab === 2 && "Phase 2: Habit Planner & Customer Persona Cards"}
            {activePlaygroundTab === 3 && "Phase 3: Database Links & Sprint Task Board"}
            {activePlaygroundTab === 4 && "Phase 4: Retainer Contract & Profit Calculator"}
            {activePlaygroundTab === 5 && "Phase 5: Launch Growth Loops Metric Simulator"}
            {activePlaygroundTab === "assessment" && "🏆 Final Executive Boardroom Assessment"}
          </h3>
        </div>

        {/* SANDBOX 1 */}
        {activePlaygroundTab === 1 && (
          <div className="space-y-6">
            <p className="text-xs text-slate-600 max-w-2xl leading-relaxed text-left">
              Before launching your brand, verify that the customer data you store is safe, legal, and complies with local privacy guidelines. Select options below to check your Compliance Score:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-4 rounded-none border-2 border-black">
                <span className="text-[10px] font-mono font-bold tracking-widest text-slate-500 uppercase block mb-3">1. Select Data Collected</span>
                <div className="space-y-3 text-left">
                  {[{ key: "location", label: "User GPS Real-Time Location" }, { key: "phone", label: "Mobile Phone & SMS Numbers" }, { key: "bookings", label: "Gym Booking Calendars" }, { key: "payments", label: "Credit Card / Wallet Data" }].map((item) => (
                    <div key={item.key} className="flex items-center gap-2">
                      <Checkbox id={`check-${item.key}`} checked={s1DataCollected[item.key as keyof typeof s1DataCollected]} onCheckedChange={(val) => setS1DataCollected({ ...s1DataCollected, [item.key]: !!val })} className="border-black rounded-none data-[state=checked]:bg-black data-[state=checked]:text-white" />
                      <Label htmlFor={`check-${item.key}`} className="text-xs text-slate-800 cursor-pointer font-mono">{item.label}</Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white p-4 rounded-none border-2 border-black">
                <span className="text-[10px] font-mono font-bold tracking-widest text-slate-500 uppercase block mb-3">2. Database Storage</span>
                <div className="space-y-3 text-left">
                  {[{ value: "local", label: "Local Device Storage" }, { value: "cloud", label: "Secure Cloud Server" }, { value: "shared", label: "Shared Third-Party DB" }].map((item) => (
                    <div key={item.value} className="flex items-center gap-2">
                      <input type="radio" id={`radio-${item.value}`} name="s1Storage" value={item.value} checked={s1Storage === item.value} onChange={(e) => setS1Storage(e.target.value)} className="accent-black cursor-pointer" />
                      <Label htmlFor={`radio-${item.value}`} className="text-xs text-slate-800 cursor-pointer font-mono">{item.label}</Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white p-4 rounded-none border-2 border-black">
                <span className="text-[10px] font-mono font-bold tracking-widest text-slate-500 uppercase block mb-3">3. Security Protections</span>
                <div className="space-y-3 text-left">
                  {[{ key: "askConsent", label: "Explicit User Consent" }, { key: "deleteData", label: "Delete My Profile Option" }, { key: "encryptInfo", label: "Encrypt Database (SSL)" }].map((item) => (
                    <div key={item.key} className="flex items-center gap-2">
                      <Checkbox id={`check-${item.key}`} checked={s1Consents[item.key as keyof typeof s1Consents]} onCheckedChange={(val) => setS1Consents({ ...s1Consents, [item.key]: !!val })} className="border-black rounded-none data-[state=checked]:bg-black data-[state=checked]:text-white" />
                      <Label htmlFor={`check-${item.key}`} className="text-xs text-slate-800 cursor-pointer font-mono">{item.label}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-slate-50 p-5 rounded-none border-2 border-black flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-none border-2 border-black flex items-center justify-center font-mono text-base font-bold text-slate-900 shrink-0 bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">{complianceScore}%</div>
                <div className="text-left">
                  <h6 className="text-xs text-slate-900 font-bold uppercase tracking-wider font-mono">Privacy Score</h6>
                  <p className="text-xs text-slate-600 mt-0.5 font-mono">Affected by data collected and protections.</p>
                </div>
              </div>
              <span className={`py-1 px-3.5 text-[10px] uppercase tracking-widest font-mono font-bold rounded-none border-2 ${
                complianceScore >= 80 
                  ? "bg-emerald-100 text-emerald-800 border-emerald-650" 
                  : complianceScore >= 50 
                    ? "bg-yellow-100 text-yellow-800 border-yellow-650" 
                    : "bg-red-100 text-red-800 border-red-650"
              }`}>
                {complianceScore >= 80 ? "Safe & Compliant" : complianceScore >= 50 ? "High Risk" : "Non-compliant"}
              </span>
            </div>
          </div>
        )}

        {/* SANDBOX 2 */}
        {activePlaygroundTab === 2 && (
          <div className="space-y-6">
            <p className="text-xs text-slate-655 max-w-2xl leading-relaxed text-left">Design low-stress habit loops for your users.</p>
            <div className="flex flex-wrap border-b border-black">
              {["personas", "loop-designer"].map((tab) => (
                <button key={tab} type="button" onClick={() => setS2ActiveTab(tab)} className={`py-2 px-4 font-mono text-[10px] font-bold uppercase tracking-wider border-b-2 cursor-pointer transition-colors ${s2ActiveTab === tab ? "border-black text-black" : "border-transparent text-slate-500 hover:text-slate-800"}`}>
                  {tab === "personas" ? "1. Customer Profile" : "2. Trigger Loop"}
                </button>
              ))}
            </div>
            {s2ActiveTab === "personas" ? (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-4 space-y-2 text-left">
                  {[{ name: "Busy Belinda (Gymgoer)", role: "Forgets to order post-workout meals." }, { name: "Alex the Runner", role: "Struggles to schedule transport to fields." }, { name: "Clara the Customer", role: "Leaves checkout if it takes over 3 min." }].map((p, idx) => (
                    <button key={idx} type="button" onClick={() => setS2ActivePersona(idx)} className={`w-full text-left p-3 rounded-none border-2 text-xs cursor-pointer transition-all ${s2ActivePersona === idx ? "bg-black text-white border-black font-bold" : "bg-white border-black text-slate-700 hover:bg-slate-50"}`}>{p.name}</button>
                  ))}
                </div>
                {(() => {
                  const activeP = [{ name: "Busy Belinda", trigger: "After-class muscle ache alerts", routine: "Auto-adds post-workout shake to cart", reward: "Free protein shaker + 15% discount" }, { name: "Alex the Runner", trigger: "Post-field calendar triggers", routine: "Pre-populates taxi rides", reward: "Earn points toward field rentals" }, { name: "Clara the Customer", trigger: "Quick drop notifications", routine: "1-Click Apple Pay checkout", reward: "Free priority delivery in 15 min" }][s2ActivePersona] || { name: "", trigger: "", routine: "", reward: "" };
                  return (
                    <div className="md:col-span-8 bg-white p-4 rounded-none border-2 border-black space-y-3 text-xs text-left shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      <h6 className="font-bold text-slate-900 font-mono uppercase tracking-wider">Loop: {activeP.name}</h6>
                      <div><span className="text-slate-500 uppercase font-mono block text-[9px] tracking-widest">Cue:</span><span className="text-slate-900 font-bold font-mono">{activeP.trigger}</span></div>
                      <div><span className="text-slate-500 uppercase font-mono block text-[9px] tracking-widest">Routine:</span><span className="text-slate-900 font-bold font-mono">{activeP.routine}</span></div>
                      <div><span className="text-slate-500 uppercase font-mono block text-[9px] tracking-widest">Reward:</span><span className="text-slate-900 font-bold font-mono">{activeP.reward}</span></div>
                    </div>
                  );
                })()}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-none border-2 border-black space-y-4 text-left">
                  <Label className="block text-xs text-slate-600 uppercase font-bold tracking-widest font-mono mb-2">Select Design Method</Label>
                  <SovereignSelect value={s2CardTool} onChange={(e) => setS2CardTool(e.target.value)} className="w-full text-xs p-2 text-black rounded-none cursor-pointer font-mono uppercase tracking-wide focus:outline-none">
                    <option value="interview">Card 01: Customer Friendly Interviews</option>
                    <option value="diaries">Card 03: Log Diaries & Shadowing</option>
                    <option value="copywriting">Card 10: Leverage Customer Vocabulary</option>
                    <option value="ux">Card 13: Frictionless Experience Mapping</option>
                  </SovereignSelect>
                  <Textarea value={s2CardPrompt} onChange={(e) => setS2CardPrompt(e.target.value)} className="text-black text-xs rounded-none h-20 resize-none" />
                </div>
                <div className="bg-white text-black p-4 rounded-none border-2 border-black text-left shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-slate-450 uppercase">Habit loop prototype</span>
                  <h6 className="font-heading text-xs font-extrabold tracking-wide mt-1 uppercase font-mono">{ventureName} ({ventureIndustry})</h6>
                  <p className="text-xs text-slate-700 italic font-serif leading-relaxed mt-2">&ldquo;Triggering routine using Card {s2CardTool === "interview" ? "01" : s2CardTool === "diaries" ? "03" : s2CardTool === "copywriting" ? "10" : "13"}.&rdquo;</p>
                  <div className="border-t border-slate-250 pt-2 mt-3 text-xs font-mono">
                    <span className="text-slate-500 uppercase block text-[9px] tracking-wider">Prompt:</span>
                    <span className="text-slate-900 font-bold block truncate">{s2CardPrompt}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* SANDBOX 3 */}
        {activePlaygroundTab === 3 && (
          <div className="space-y-6">
            <p className="text-xs text-slate-655 max-w-2xl leading-relaxed text-left">Link your venture's database tables to structure signups and logistics correctly.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-none border-2 border-black space-y-4 text-xs text-left">
                <span className="text-[10px] font-mono font-bold tracking-widest text-slate-500 uppercase block border-b border-slate-200 pb-2">Database Schema</span>
                <div className="space-y-3">
                  {[{ key: "id", label: "Customer ID (Primary Key)" }, { key: "name", label: "Full Customer Legal Name" }, { key: "bookings", label: "Service Booking Timestamp" }, { key: "payments", label: "Stripe Transaction ID" }].map((col) => (
                    <div key={col.key} className="flex items-center gap-2">
                      <Checkbox id={`schema-${col.key}`} checked={s3Schema[col.key as keyof typeof s3Schema]} onCheckedChange={(val) => setS3Schema({ ...s3Schema, [col.key]: !!val })} className="border-black rounded-none data-[state=checked]:bg-black data-[state=checked]:text-white" />
                      <Label htmlFor={`schema-${col.key}`} className="text-xs text-slate-800 cursor-pointer font-mono">{col.label}</Label>
                    </div>
                  ))}
                </div>
                <pre className="mt-2 bg-slate-950 p-2.5 text-slate-100 text-[9px] leading-normal font-mono rounded-none border-2 border-black overflow-x-auto">{`CREATE TABLE ${ventureName.replace(/\s+/g, "_").toLowerCase()}_customers (\n${s3Schema.id ? "  id SERIAL PRIMARY KEY,\n" : ""}${s3Schema.name ? "  name VARCHAR(100),\n" : ""}${s3Schema.bookings ? "  booking_date TIMESTAMP,\n" : ""}${s3Schema.payments ? "  stripe_id VARCHAR(50)" : ""}\n);`}</pre>
              </div>
              <div className="bg-white p-4 rounded-none border-2 border-black space-y-4 text-left">
                <span className="text-[10px] font-mono font-bold tracking-widest text-slate-500 uppercase block border-b border-slate-200 pb-2">Sprint Task Board</span>
                <form onSubmit={addTask} className="flex gap-2">
                  <Input type="text" value={s3NewTaskText} onChange={(e) => setS3NewTaskText(e.target.value)} placeholder="Add a task..." className="text-black text-xs rounded-none h-8 flex-1" />
                  <Button type="submit" size="sm" className="bg-black hover:bg-slate-800 text-white font-bold text-xs rounded-none h-8 px-3 border border-black shrink-0 cursor-pointer">Add</Button>
                </form>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {s3Tasks.map((t) => (
                    <div key={t.id} className="bg-slate-50 border border-slate-200 rounded-none p-2 flex items-center justify-between text-xs font-mono">
                      <span className={`truncate ${t.status === "done" ? "line-through text-slate-400 font-bold" : "text-slate-850 font-bold"}`}>{t.text}</span>
                      <button type="button" onClick={() => moveTask(t.id, t.status === "done" ? "todo" : "done")} className={`text-[10px] font-bold ml-2 shrink-0 cursor-pointer ${t.status === "done" ? "text-slate-500 hover:text-slate-800" : "text-emerald-700 hover:text-emerald-950"}`}>{t.status === "done" ? "Reopen" : "Done ✓"}</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SANDBOX 4 */}
        {activePlaygroundTab === 4 && (
          <div className="space-y-6">
            <p className="text-xs text-slate-655 max-w-2xl leading-relaxed text-left">Formulate the pricing structure and retainer contract terms for your client venture.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-4 rounded-none border-2 border-black space-y-4 text-left">
                <span className="text-[10px] font-mono font-bold tracking-widest text-slate-500 uppercase border-b border-slate-200 pb-2 block">Retainer Settings</span>
                <div><Label className="text-[10px] text-slate-600 uppercase font-mono mb-1 block">Client Name</Label><Input type="text" value={s4ClientName} onChange={(e) => setS4ClientName(e.target.value)} className="text-black text-xs rounded-none h-8" /></div>
                <div><Label className="text-[10px] text-slate-600 uppercase font-mono mb-1 block">Monthly Fee ($)</Label><Input type="number" value={s4MonthlyRate} onChange={(e) => setS4MonthlyRate(Number(e.target.value))} className="text-black text-xs rounded-none h-8" /></div>
                <div><Label className="text-[10px] text-slate-600 uppercase font-mono mb-1 block">Hours/Week</Label><Input type="number" value={s4HoursPerWeek} onChange={(e) => setS4HoursPerWeek(Number(e.target.value))} className="text-black text-xs rounded-none h-8" /></div>
                <div><Label className="text-[10px] text-slate-600 uppercase font-mono mb-1 block">Monthly Expenses ($)</Label><Input type="number" value={s4Expenses} onChange={(e) => setS4Expenses(Number(e.target.value))} className="text-black text-xs rounded-none h-8" /></div>
              </div>
              <div className="bg-white p-4 rounded-none border-2 border-black space-y-4 text-xs text-slate-800 text-left">
                <span className="text-[10px] font-mono font-bold tracking-widest text-slate-500 uppercase border-b border-slate-200 pb-2 block">Profit Breakdown</span>
                {(() => {
                  const hourly = s4MonthlyRate / (s4HoursPerWeek * 4);
                  const net = s4MonthlyRate - s4Expenses;
                  const margin = s4MonthlyRate > 0 ? (net / s4MonthlyRate) * 100 : 0;
                  return (
                    <div className="space-y-3 font-mono">
                      <div className="flex justify-between"><span>Hourly Rate:</span><span className="text-slate-900 font-bold">${hourly.toFixed(2)}/hr</span></div>
                      <div className="flex justify-between"><span>Monthly Expenses:</span><span className="text-red-650 font-bold">-${s4Expenses}</span></div>
                      <div className="flex justify-between border-t border-slate-200 pt-2"><span className="text-slate-900 uppercase text-[10px] tracking-wider">Net Profit:</span><span className="text-emerald-700 font-bold text-sm">${net.toFixed(0)}</span></div>
                      <div className="flex justify-between"><span className="text-slate-900 uppercase text-[10px] tracking-wider">Profit Margin:</span><span className="text-emerald-700 font-bold text-sm">{margin.toFixed(1)}%</span></div>
                    </div>
                  );
                })()}
              </div>
              <div className="bg-white text-black p-4 rounded-none border-2 border-black flex flex-col justify-between text-left shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <div className="space-y-3">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase">Contract Preview</span>
                  <h6 className="font-heading text-xs font-extrabold tracking-wide uppercase font-mono">{ventureName} Retainer</h6>
                  <p className="text-xs text-slate-700 italic font-serif leading-relaxed">&ldquo;We provide {s4SupportType} for {s4ClientName}, at ${s4MonthlyRate}/mo committing {s4HoursPerWeek} hrs/wk.&rdquo;</p>
                </div>
                <button type="button" onClick={() => alert(`Contract generated for ${s4ClientName}!`)} className="w-full mt-3 bg-black hover:bg-slate-800 text-white font-bold text-[10px] uppercase tracking-widest py-2.5 rounded-none border-2 border-black transition-all cursor-pointer">Export Agreement</button>
              </div>
            </div>
          </div>
        )}

        {/* SANDBOX 5 */}
        {activePlaygroundTab === 5 && (
          <div className="space-y-6">
            <p className="text-xs text-slate-655 max-w-2xl leading-relaxed text-left">Test how referral bonuses, partner posts, and tech investment affect your monthly active users for "{ventureName}".</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-4 rounded-none border-2 border-black space-y-5 text-left font-mono">
                <div>
                  <div className="flex justify-between text-xs mb-1"><span className="text-slate-500 uppercase text-[9px] tracking-wider font-bold">Referral Reward:</span><span className="text-slate-900 font-bold">${s5ReferralReward}</span></div>
                  <input type="range" min="0" max="10" value={s5ReferralReward} onChange={(e) => setS5ReferralReward(Number(e.target.value))} className="w-full accent-black cursor-pointer" />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1"><span className="text-slate-500 uppercase text-[9px] tracking-wider font-bold">Partner Posts/Wk:</span><span className="text-slate-900 font-bold">{s5PartnerPosts}</span></div>
                  <input type="range" min="0" max="10" value={s5PartnerPosts} onChange={(e) => setS5PartnerPosts(Number(e.target.value))} className="w-full accent-black cursor-pointer" />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1"><span className="text-slate-500 uppercase text-[9px] tracking-wider font-bold">Tech Maintenance:</span><span className="text-slate-900 font-bold">${s5TechMaintenance}/mo</span></div>
                  <input type="range" min="10" max="200" step="10" value={s5TechMaintenance} onChange={(e) => setS5TechMaintenance(Number(e.target.value))} className="w-full accent-black cursor-pointer" />
                </div>
              </div>
              <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                {[{ label: "Server Latency", value: `${metrics.latency}ms`, sub: "Target response time" }, { label: "Viral Coeff (K)", value: metrics.vir.toString(), sub: "Referral signup rate" }, { label: "Active Users (MAU)", value: metrics.mau.toLocaleString(), sub: "Monthly active users" }, { label: "Customer LTV", value: `$${metrics.ltv}`, sub: "Revenue per customer", green: true }].map((m) => (
                  <div key={m.label} className="bg-white border-2 border-black p-4 rounded-none flex flex-col justify-between shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <span className="text-[9px] uppercase font-mono text-slate-500 tracking-widest">{m.label}</span>
                    <span className={`text-2xl font-bold font-mono my-2 ${m.green ? "text-emerald-705" : "text-slate-900"}`}>{m.value}</span>
                    <span className="text-xs text-slate-400 font-mono">{m.sub}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* BOARDROOM ASSESSMENT */}
        {activePlaygroundTab === "assessment" && (
          <div className="space-y-8">
            <p className="text-xs text-slate-600 max-w-2xl leading-relaxed text-left">
              The boardroom compiles all operational metrics, compliance configurations, and habit triggers to evaluate your venture's viability and return strategic feedback.
            </p>

            {boardroomLoading ? (
              <div className="bg-slate-50 border-2 border-black p-8 text-center flex flex-col items-center justify-center gap-4 min-h-[300px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <RefreshCw className="w-8 h-8 text-black animate-spin" />
                <h5 className="font-mono text-xs font-black uppercase text-black">
                  LEO AI compiling boardroom parameters...
                </h5>
                <p className="text-[11px] text-slate-500 max-w-md">
                  Analyzing data privacy vectors, habit loop triggers, database schemas, retainer margins, and latency indicators.
                </p>
              </div>
            ) : boardroomReport ? (
              <div className="space-y-8 text-left">
                {/* Venn Diagram */}
                <VennDiagram
                  feasibilityScore={boardroomReport.feasibilityScore}
                  desirabilityScore={boardroomReport.desirabilityScore}
                  viabilityScore={boardroomReport.viabilityScore}
                  improvementTips={boardroomReport.improvementTips}
                />

                {/* Analysis Report */}
                <div className="bg-white border-2 border-black p-6 md:p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-4">
                  <h4 className="font-heading text-xs font-black uppercase tracking-widest text-slate-500 border-b border-slate-200 pb-2">
                    📊 LEO Virtual Executive Lenses Analysis
                  </h4>
                  <div className="prose max-w-none">
                    {renderMarkdown(boardroomReport.analysis)}
                  </div>
                </div>

                {/* Operational Recommendations */}
                <div className="bg-slate-900 text-white border-2 border-black p-6 md:p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-4">
                  <h4 className="font-heading text-xs font-black uppercase tracking-widest text-slate-400 border-b border-slate-700 pb-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400 fill-amber-400" />
                    🎯 LEO Growth Opportunities & Operational Recommendations
                  </h4>
                  <div className="space-y-3">
                    {boardroomReport.recommendations.map((rec, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200 font-mono">
                        <span className="text-amber-400 text-base leading-none shrink-0">❖</span>
                        <p className="leading-relaxed">{rec}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reset Trigger */}
                <div className="flex justify-end pt-4">
                  <Button
                    onClick={handleRunAssessment}
                    className="bg-black hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-widest py-3 px-6 rounded-none border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] cursor-pointer hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all"
                  >
                    🔄 Re-Run Boardroom Assessment
                  </Button>
                </div>
              </div>
            ) : (
              <div className="bg-[#eae3d7] border-2 border-black p-6 text-center space-y-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] max-w-2xl mx-auto">
                <h4 className="font-heading text-sm font-black uppercase text-black font-mono">
                  Boardroom Report Ready
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed max-w-md mx-auto">
                  Click the button below to fetch a customized executive evaluation of your venture's operational logic, compliance, and growth loops from LEO AI.
                </p>
                <Button
                  onClick={handleRunAssessment}
                  className="bg-black hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-widest py-3 px-6 rounded-none border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] cursor-pointer hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all"
                >
                  🏆 RUN EXECUTIVE BOARDROOM ASSESSMENT
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Dynamic Methodology Card Deck */}
        {activePlaygroundTab !== "assessment" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 pt-8 border-t-2 border-black">
            <div className="md:col-span-2 text-left">
              <h4 className="font-mono text-xs font-black uppercase text-slate-900 tracking-wider mb-2">
                📋 Phase {activePlaygroundTab} LEO Methodology Blueprint ({selectedVertical})
              </h4>
              <p className="text-xs text-slate-600 mb-4">
                Design thinking cards designated by LEO for your business vertical. Click a card to open its interactive workbook workspace:
              </p>
            </div>
            {blueprintLoading ? (
              <div className="md:col-span-2 bg-slate-50 border border-slate-200 py-8 text-center text-xs text-slate-400 font-mono">
                <RefreshCw className="w-4 h-4 text-slate-400 animate-spin inline mr-2" />
                Tailoring methodology blueprint...
              </div>
            ) : activeBlueprints.length === 0 ? (
              <div className="md:col-span-2 bg-slate-50 border border-slate-200 py-8 text-center text-xs text-slate-400 italic">
                No recommended cards loaded for this phase.
              </div>
            ) : (
              activeBlueprints.map((bp) => {
                const cardDetail = cardsList.find((c) => c.id === bp.id);
                if (!cardDetail) return null;
                return (
                  <button
                    key={bp.id}
                    type="button"
                    onClick={() => onNavigateToCard && onNavigateToCard(bp.id)}
                    className="w-full text-left bg-white border-2 border-black p-4 rounded-none transition-all flex flex-col justify-between shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] cursor-pointer min-h-[160px]"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-xs font-extrabold text-slate-400">{cardDetail.num}</span>
                          <span className="font-bold text-xs uppercase text-slate-900 tracking-wide font-mono">{cardDetail.title}</span>
                        </div>
                        <span className={`text-[8px] font-black font-mono px-1.5 py-0.5 border leading-none rounded-none uppercase shrink-0 ${
                          bp.mandatory 
                            ? "bg-red-100 text-red-800 border-red-400" 
                            : "bg-amber-100 text-amber-800 border-amber-400"
                        }`}>
                          {bp.mandatory ? "Mandatory" : "Recommended"}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed mb-3">{cardDetail.frontDesc}</p>
                    </div>
                    <div className="border-t border-slate-100 pt-2.5 text-left">
                      <p className="text-[11px] text-slate-700 leading-normal">
                        <span className="font-bold font-mono text-amber-600">LEO Tip: </span>
                        {bp.tip}
                      </p>
                      <span className="text-[9px] font-mono font-bold text-slate-400 hover:text-slate-900 block mt-2 text-right">
                        👉 Open Worksheet Workspace
                      </span>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}