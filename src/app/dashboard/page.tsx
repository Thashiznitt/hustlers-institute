"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { 
  ChevronRight, 
  Info, 
  Settings, 
  Activity, 
  FileText, 
  Sparkles, 
  Plus, 
  RotateCw, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp, 
  X, 
  ArrowLeft,
  ArrowUpRight,
  Shield,
  HelpCircle,
  MessageSquare,
  Lock,
  Unlock,
  Briefcase,
  Trash2,
  Clipboard,
  Send,
  Layers
} from "lucide-react";
import { cardsList, CardData } from "@/components/DesignCardsExplorer";

interface TelemetryLog {
  week: number;
  period?: number;
  acquisition: number;
  adoption: number;
  sales: number;
  latency: number;
  complaints: number;
  resolutions: number;
  sentiment: number;
  computedHealth: number;
}

interface BusinessMode {
  id: string;
  name: string;
  acqLabel: string;
  acqUnit: string;
  adpLabel: string;
  adpUnit: string;
  salesLabel: string;
  salesUnit: string;
  latLabel: string;
  latUnit: string;
  defaultTargets: {
    acquisition: number;
    adoption: number;
    sales: number;
    latency: number;
    complaints: number;
    resolutions: number;
    sentiment: number;
  };
}

const BUSINESS_MODES: Record<string, BusinessMode> = {
  "tech": {
    id: "tech",
    name: "Digital Tech (SaaS/Fintech)",
    acqLabel: "Weekly Signups",
    acqUnit: "users",
    adpLabel: "Weekly Active Usage Rate",
    adpUnit: "%",
    salesLabel: "Weekly MRR Revenue",
    salesUnit: "$",
    latLabel: "Database Query Latency",
    latUnit: "ms",
    defaultTargets: {
      acquisition: 500,
      adoption: 80,
      sales: 10000,
      latency: 200,
      complaints: 5,
      resolutions: 5,
      sentiment: 85
    }
  },
  "retail": {
    id: "retail",
    name: "Walk-In Retail (Salons, Cafes, Restaurants)",
    acqLabel: "Weekly Foot Traffic",
    acqUnit: "visitors",
    adpLabel: "Loyalty Repeat Customer Rate",
    adpUnit: "%",
    salesLabel: "Weekly Store Net Sales",
    salesUnit: "$",
    latLabel: "Average Checkout Wait Time",
    latUnit: "min",
    defaultTargets: {
      acquisition: 800,
      adoption: 60,
      sales: 15000,
      latency: 5,
      complaints: 10,
      resolutions: 10,
      sentiment: 90
    }
  },
  "b2b": {
    id: "b2b",
    name: "B2B Services & Consulting",
    acqLabel: "Weekly Inbound Leads",
    acqUnit: "leads",
    adpLabel: "Active Project Progress Rate",
    adpUnit: "%",
    salesLabel: "Weekly Contract Booking Value",
    salesUnit: "$",
    latLabel: "Client Project Turnaround Latency",
    latUnit: "hrs",
    defaultTargets: {
      acquisition: 20,
      adoption: 85,
      sales: 25000,
      latency: 48,
      complaints: 2,
      resolutions: 2,
      sentiment: 90
    }
  },
  "ecommerce": {
    id: "ecommerce",
    name: "E-Commerce & Digital Stores",
    acqLabel: "Weekly Site Traffic",
    acqUnit: "sessions",
    adpLabel: "Shopping Cart Conversion Rate",
    adpUnit: "%",
    salesLabel: "Weekly Gross Merchandise Value",
    salesUnit: "$",
    latLabel: "Average Page Load Latency",
    latUnit: "sec",
    defaultTargets: {
      acquisition: 5000,
      adoption: 3.5,
      sales: 20000,
      latency: 2.5,
      complaints: 15,
      resolutions: 15,
      sentiment: 85
    }
  },
  "creator": {
    id: "creator",
    name: "Content Creator / Media Entity",
    acqLabel: "Weekly Subscriber Growth",
    acqUnit: "subs",
    adpLabel: "Average Video/Post Engagement Rate",
    adpUnit: "%",
    salesLabel: "Weekly Sponsor/Ad Sales",
    salesUnit: "$",
    latLabel: "Content Release Schedule Deviation",
    latUnit: "hrs",
    defaultTargets: {
      acquisition: 1500,
      adoption: 18,
      sales: 5000,
      latency: 4,
      complaints: 4,
      resolutions: 4,
      sentiment: 92
    }
  }
};

export default function Dashboard() {
  const [onboarded, setOnboarded] = useState<boolean>(false);
  const [isRefining, setIsRefining] = useState<boolean>(false);
  const [compilerLogs, setCompilerLogs] = useState<string[]>([]);
  
  // Workspace states
  const [workspaces, setWorkspaces] = useState<Array<{ id: string; name: string; category: string }>>([]);
  const [activeWorkspaceId, setActiveWorkspaceId] = useState<string>("");
  const [loggingInterval, setLoggingInterval] = useState<"daily" | "weekly">("weekly");

  // Onboarding Setup State
  const [businessName, setBusinessName] = useState<string>("Sovereign Enterprise");
  const [industry, setIndustry] = useState<string>("Fintech");
  const [category, setCategory] = useState<string>("tech");
  const [description, setDescription] = useState<string>(
    "A digital platform offering micro-loans and working capital to street vendors and micro-businesses, bridging cash flow gaps."
  );
  const [mission, setMission] = useState<string>(
    "Empowering unbanked sole proprietors through instant, transparent, and empathy-driven capital allocation."
  );
  const [goals, setGoals] = useState<string>(
    "1. Onboard 2,000 active street merchants this quarter.\n2. Keep customer service resolution speed under 12 hours.\n3. Achieve 85% weekly platform retention rates."
  );

  // Calibrated AI Targets
  const [aiTargets, setAiTargets] = useState<any>(null);
  const [refinedDescription, setRefinedDescription] = useState<string>("");
  const [refinedMission, setRefinedMission] = useState<string>("");
  const [refinedGoals, setRefinedGoals] = useState<string>("");

  // Dashboard Operations State
  const [logHistory, setLogHistory] = useState<TelemetryLog[]>([]);
  
  // Navigation tabs: "operations" | "toolkit" | "workshop" | "recaps" | "chat"
  const [activeSubTab, setActiveSubTab] = useState<string>("operations");

  // Multi-series SVG Chart active line switches
  const [visibleSeries, setVisibleSeries] = useState<Record<string, boolean>>({
    health: true,
    acquisition: false,
    adoption: false,
    sales: false,
    latency: false,
    sentiment: false,
  });

  // Toolkit Explorer filters
  const [toolkitSearch, setToolkitSearch] = useState<string>("");
  const [toolkitStage, setToolkitStage] = useState<string>("All");
  const [simulateUnlock, setSimulateUnlock] = useState<boolean>(false);

  // Workshop Builder state
  const [workshopPlaylist, setWorkshopPlaylist] = useState<Array<{ card: CardData; duration: number }>>([]);
  const [copiedStatus, setCopiedStatus] = useState<boolean>(false);

  // Ask Leo Chat assistant state
  const [chatMessages, setChatMessages] = useState<Array<{ sender: "user" | "leo"; text: string; timestamp: string }>>([
    {
      sender: "leo",
      text: "### LEO AI Sentinels Coach\nWelcome to the AI Sentinel Chat console! I have active synchronization with your workspace targets, operational telemetry, and the 44 methodology playbooks.\n\nAsk me about your current **health status**, **target alignment**, **synthesis diagnostics**, or a specific **Strategic Design Card** index!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [chatInput, setChatInput] = useState<string>("");
  const [chatIsTyping, setChatIsTyping] = useState<boolean>(false);

  // Weekly Input form
  const [newAcq, setNewAcq] = useState<string>("");
  const [newAdp, setNewAdp] = useState<string>("");
  const [newSales, setNewSales] = useState<string>("");
  const [newLat, setNewLat] = useState<string>("");
  const [newComplaints, setNewComplaints] = useState<number>(0);
  const [newResolutions, setNewResolutions] = useState<number>(0);
  const [newSentiment, setNewSentiment] = useState<number>(85);

  // Active Card Modal Lookup
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);

  // Interactive Sandbox states for Modal
  // Card 3: Culture Probes (ID: "culture-probe")
  const [modalProbeEmoji, setModalProbeEmoji] = useState<string>("😐");
  const [modalProbeNote, setModalProbeNote] = useState<string>("");
  const [modalProbeHistory, setModalProbeHistory] = useState<Array<{ emoji: string; note: string; time: string }>>([]);

  // Card 42: Conversation Starters (ID: "conversation-starters")
  const modalStarterPrompts = [
    "Tell me about the last app that made you feel smart, and walk me through what happened right before you closed it.",
    "If this financial app were an employee at a branch, how would they speak to you when you request a loan?",
    "Describe the absolute worst transaction anxiety you experienced this month. What did you wish the UI told you?",
    "What is the one daily transaction you do that you hide from friends or family, and why?"
  ];
  const [modalCurrentPrompt, setModalCurrentPrompt] = useState<string>(modalStarterPrompts[0]);

  // Card 43: Behavior Change Engine (ID: "behavior-engine")
  const [modalEngineBalance, setModalEngineBalance] = useState<number>(12);
  const [modalEngineBills, setModalEngineBills] = useState<boolean>(true);
  const [modalEngineDayOfMonth, setModalEngineDayOfMonth] = useState<number>(28);
  const [modalEngineOutput, setModalEngineOutput] = useState<{ trigger: string; lift: string; desc: string }>({
    trigger: "MONITOR & RETAIN",
    lift: "Standard",
    desc: "Standard tracking. Behavior pattern does not match cross-sell risk thresholds."
  });

  // Load Sentinel DB records on mount
  const [loading, setLoading] = useState<boolean>(true);

  // Ref for chat auto-scrolling
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Helper to sync server data to client states
  const updateWorkspaceState = (data: any) => {
    setWorkspaces(data.workspaces || []);
    setActiveWorkspaceId(data.activeWorkspaceId || "");
    
    if (data.currentWorkspace) {
      const cw = data.currentWorkspace;
      setBusinessName(cw.name);
      setIndustry(cw.industry);
      setCategory(cw.category);
      setLoggingInterval(cw.loggingInterval || "weekly");
      setRefinedDescription(cw.refinedDescription);
      setRefinedMission(cw.refinedMission);
      setRefinedGoals(cw.refinedGoals);
      setAiTargets(cw.targets);
      setLogHistory(cw.logs || []);
      setOnboarded(true);

      // Pre-seed inputs
      const latest = cw.logs && cw.logs.length > 0 ? cw.logs[cw.logs.length - 1] : null;
      const targets = cw.targets;
      setNewAcq(latest ? latest.acquisition.toString() : Math.round(targets.acquisition * 0.95).toString());
      setNewAdp(latest ? latest.adoption.toString() : Math.round(targets.adoption * 0.96).toString());
      setNewSales(latest ? latest.sales.toString() : Math.round(targets.sales * 0.93).toString());
      setNewLat(latest ? latest.latency.toString() : Math.round(targets.latency * 1.05).toString());
      setNewComplaints(0);
      setNewResolutions(0);
      setNewSentiment(latest ? latest.sentiment : 86);
    } else {
      setOnboarded(false);
      // Reset details to defaults for fresh onboarding
      setBusinessName("");
      setIndustry("");
      setCategory("tech");
      setLoggingInterval("weekly");
      setDescription("");
      setMission("");
      setGoals("");
      setAiTargets(null);
      setLogHistory([]);
    }
  };

  useEffect(() => {
    async function loadSentinelData() {
      try {
        const response = await fetch("/api/health/sentinel");
        if (response.ok) {
          const data = await response.json();
          updateWorkspaceState(data);
        }
      } catch (err) {
        console.error("Failed to load sentinel telemetry", err);
      } finally {
        setLoading(false);
      }
    }
    loadSentinelData();
  }, []);

  // Scroll to bottom of chat whenever messages list expands
  useEffect(() => {
    if (activeSubTab === "chat" && chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, chatIsTyping, activeSubTab]);

  // Initialize targets and records on category changes (during wizard)
  const currentMode = useMemo(() => BUSINESS_MODES[category] || BUSINESS_MODES.tech, [category]);

  // Dynamic Label Helpers based on Logging Interval (Daily vs Weekly)
  const periodLabel = loggingInterval === "daily" ? "Day" : "Week";
  const periodLabelUpper = loggingInterval === "daily" ? "DAY" : "WEEK";
  const periodLabelShort = loggingInterval === "daily" ? "D" : "W";
  const formatModeLabel = (label: string) => {
    return label.replace(/weekly/i, loggingInterval === "daily" ? "Daily" : "Weekly");
  };

  const runCompilerSimulation = () => {
    setIsRefining(true);
    setCompilerLogs([]);
    
    const steps = [
      { text: "[INIT] Connecting to Sovereign Sentinel Reasoning Engine...", delay: 300 },
      { text: `[ANALYSIS] Classifying business vectors: Industry = '${industry}', Model = '${currentMode.name}'`, delay: 700 },
      { text: "[SENTINEL-AI] Reviewing raw Mission Statement and Business Description...", delay: 1100 },
      { text: "[SENTINEL-AI] Synthesizing quarterly objectives and mapping system constraints...", delay: 1500 },
      { text: "[COMPILING] Generating metric target profiles & weights:", delay: 1900 },
      { text: ` - Acquisition target: ${currentMode.defaultTargets.acquisition} ${currentMode.acqUnit}`, delay: 2100 },
      { text: ` - Adoption target: ${currentMode.defaultTargets.adoption}${currentMode.adpUnit}`, delay: 2300 },
      { text: ` - Sales target: $${currentMode.defaultTargets.sales}`, delay: 2505 },
      { text: ` - Latency ceiling: ${currentMode.defaultTargets.latency} ${currentMode.latUnit}`, delay: 2700 },
      { text: " - Service SLA weights: Complaints <= 5/wk, Resolution Rate >= 90%", delay: 2900 },
      { text: "[REFINING] Formatting executive profiles for live alignment...", delay: 3200 },
      { text: "[SUCCESS] Calibration complete. Sovereign Sentinel is online.", delay: 3600 }
    ];

    steps.forEach((step) => {
      setTimeout(() => {
        setCompilerLogs((prev) => [...prev, step.text]);
      }, step.delay);
    });

    setTimeout(async () => {
      try {
        const response = await fetch("/api/health/profile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: businessName,
            industry,
            category,
            loggingInterval,
            description,
            mission,
            goals
          })
        });

        if (response.ok) {
          const data = await response.json();
          updateWorkspaceState(data);
          setIsRefining(false);
          setActiveSubTab("operations");
        }
      } catch (err) {
        console.error("Error setting business profile", err);
        setIsRefining(false);
      }
    }, 4000);
  };

  // Math Sentinel Health Index Compiler
  const computeHealthScore = (
    acq: number, 
    adp: number, 
    sales: number, 
    lat: number, 
    compl: number, 
    resol: number, 
    sent: number
  ) => {
    if (!aiTargets) return 50;

    // Normalizing each vector against targets (capped at 100)
    const acqScore = Math.min(100, (acq / aiTargets.acquisition) * 100);
    const adpScore = Math.min(100, (adp / aiTargets.adoption) * 100);
    const salesScore = Math.min(100, (sales / aiTargets.sales) * 100);
    
    // Latency is reverse (less is better)
    let latScore = 100;
    if (lat > aiTargets.latency) {
      latScore = Math.max(0, 100 - ((lat - aiTargets.latency) / aiTargets.latency) * 100);
    }

    // Customer Service (Complaints & Resolutions & Sentiment)
    const resRate = compl === 0 ? 100 : Math.min(100, (resol / compl) * 100);
    const csScore = (sent * 0.6) + (resRate * 0.4);

    // Weighted index allocation
    // 20% Acquisition, 20% Adoption, 20% Sales, 10% Latency, 30% Customer Care
    const health = (acqScore * 0.2) + (adpScore * 0.2) + (salesScore * 0.2) + (latScore * 0.1) + (csScore * 0.3);
    return Math.round(health);
  };

  const handleAddWeekLog = async (e: React.FormEvent) => {
    e.preventDefault();
    const acqVal = parseFloat(newAcq) || 0;
    const adpVal = parseFloat(newAdp) || 0;
    const salesVal = parseFloat(newSales) || 0;
    const latVal = parseFloat(newLat) || 0;

    try {
      const response = await fetch("/api/health/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          acquisition: acqVal,
          adoption: adpVal,
          sales: salesVal,
          latency: latVal,
          complaints: newComplaints,
          resolutions: newResolutions,
          sentiment: newSentiment
        })
      });

      if (response.ok) {
        const data = await response.json();
        setLogHistory(data.logs || []);

        // reset some minor stats for the next log
        setNewComplaints(0);
        setNewResolutions(0);

        // seed inputs with the logged values for convenient editing
        setNewAcq(acqVal.toString());
        setNewAdp(adpVal.toString());
        setNewSales(salesVal.toString());
        setNewLat(latVal.toString());
      }
    } catch (err) {
      console.error("Error logging weekly telemetry", err);
    }
  };

  const handleResetProfile = async () => {
    if (!confirm("Are you sure you want to delete the active business space? All history logs will be erased.")) {
      return;
    }
    try {
      const response = await fetch("/api/health/reset", { method: "POST" });
      if (response.ok) {
        const data = await response.json();
        updateWorkspaceState(data);
      }
    } catch (err) {
      console.error("Failed to reset sentinel database profile", err);
    }
  };

  const latestLog = useMemo(() => {
    if (logHistory.length === 0) return null;
    return logHistory[logHistory.length - 1];
  }, [logHistory]);

  // Dynamic Synthesis Engine Reports
  const synthesisReport = useMemo(() => {
    if (!latestLog || !aiTargets) return [];

    const issues = [];

    // Module 1 Check: KYC friction (Acquisition below target OR low sentiment)
    if (latestLog.acquisition < aiTargets.acquisition || latestLog.sentiment < 80) {
      let problem = "";
      let useCase = "";
      if (category === "tech") {
        problem = `User acquisition is at ${latestLog.acquisition}/${aiTargets.acquisition} signups, indicating critical friction in your onboarding funnel.`;
        useCase = "Evaluate client checkout steps. Integrate in-line validation logic and verify if OTP SMS gateways are delaying registration confirmations.";
      } else if (category === "retail") {
        problem = `Foot traffic registered at ${latestLog.acquisition}/${aiTargets.acquisition} clients. High entry friction detected.`;
        useCase = "Audit check-in wait queues in the foyer. Position clear welcome indicators or physical self-check stations for fast booking confirmations.";
      } else {
        problem = `Acquisition metrics of ${latestLog.acquisition}/${aiTargets.acquisition} fall short of the required growth runway.`;
        useCase = "Structure a formal client onboarding review. Focus on identifying documentation requests that cause prospects to drop off.";
      }

      issues.push({
        moduleNum: 1,
        moduleTitle: "Module 1: KyC & Funnel Friction",
        status: "critical",
        diagnostic: problem,
        cards: ["interviews", "empathy-map"],
        useCase: useCase
      });
    } else {
      issues.push({
        moduleNum: 1,
        moduleTitle: "Module 1: KyC & Funnel Friction",
        status: "secure",
        diagnostic: "Funnel metrics exceed targets. Onboarding flow is stable.",
        cards: ["interviews", "empathy-map"],
        useCase: "Continuously run Empathy Maps during seasonal promotions to ensure registration latency remains low."
      });
    }

    // Module 2 Check: Retention (Adoption below target)
    if (latestLog.adoption < aiTargets.adoption) {
      let problem = "";
      let useCase = "";
      const periodAdj = loggingInterval === "daily" ? "Daily" : "Weekly";
      if (category === "tech") {
        problem = `${periodAdj} active usage is at ${latestLog.adoption}% vs targeted ${aiTargets.adoption}%. Engagement drop-offs indicate low feature stickiness.`;
        useCase = "Trigger micro-targeted tips offering assistance to users who haven't completed their second transaction within 5 days of sign-up.";
      } else if (category === "retail") {
        problem = `Loyalty return rate is at ${latestLog.adoption}% vs targeted ${aiTargets.adoption}%. Clients are dropping out after a single service session.`;
        useCase = "Design a post-visit follow-up culture probe. Send a direct micro-survey offering a curated booking incentive for their next slot.";
      } else {
        problem = `User retention/conversion rate of ${latestLog.adoption}% falls short of target.`;
        useCase = "Implement longitudinal diary logs with key client contacts to map post-onboarding satisfaction thresholds.";
      }

      issues.push({
        moduleNum: 2,
        moduleTitle: "Module 2: Retention & Usage Stickiness",
        status: "warning",
        diagnostic: problem,
        cards: ["culture-probe", "themes"],
        useCase: useCase
      });
    } else {
      issues.push({
        moduleNum: 2,
        moduleTitle: "Module 2: Retention & Usage Stickiness",
        status: "secure",
        diagnostic: "User retention levels are optimal. Value loops are verified.",
        cards: ["culture-probe", "themes"],
        useCase: "Run culture probes periodically to capture shifting habits before competitors adapt."
      });
    }

    // Module 3 Check: Operations (Latency exceeds target ceiling)
    if (latestLog.latency > aiTargets.latency) {
      let problem = "";
      let useCase = "";
      if (category === "tech") {
        problem = `Average database/API response latency is at ${latestLog.latency}ms, breaching the ${aiTargets.latency}ms system SLA ceiling.`;
        useCase = "Analyze transaction logs. Execute indexing strategies on key relational columns and establish redis caching for static metadata.";
      } else if (category === "retail") {
        problem = `Average waiting time is at ${latestLog.latency} minutes, exceeding the ${aiTargets.latency}-minute operational threshold.`;
        useCase = "Run a system mapping workshop with kitchen and front-of-house staff. Identify bottlenecks in ticket handover and ingredient prep workflows.";
      } else {
        problem = `Operational delivery latency is at ${latestLog.latency} vs targeted ceiling of ${aiTargets.latency}.`;
        useCase = "Map internal team handovers using System Maps. Restructure roles to remove redundant validation loops.";
      }

      issues.push({
        moduleNum: 3,
        moduleTitle: "Module 3: Operations & Transaction Latency",
        status: "critical",
        diagnostic: problem,
        cards: ["system-map", "workshops"],
        useCase: useCase
      });
    } else {
      issues.push({
        moduleNum: 3,
        moduleTitle: "Module 3: Operations & Transaction Latency",
        status: "secure",
        diagnostic: "Operational response times meet structural SLAs.",
        cards: ["system-map", "workshops"],
        useCase: "Conduct workshops with core engineering/kitchen leads to optimize query limits and reduce buffer spaces further."
      });
    }

    // Module 4 Check: Monetization (Sales below target)
    if (latestLog.sales < aiTargets.sales) {
      let problem = "";
      let useCase = "";
      const periodAdjective = loggingInterval === "daily" ? "Daily" : "Weekly";
      if (category === "tech") {
        problem = `${periodAdjective} revenue registered at $${latestLog.sales} vs target of $${aiTargets.sales}. Monetization runway is constrained.`;
        useCase = "Use the Idea Shopping toolkit. Frame proposed pricing changes as value tiers and validate willingness to pay with premium cohorts.";
      } else if (category === "retail") {
        problem = `${periodAdjective} store sales registered at $${latestLog.sales} vs target of $${aiTargets.sales}. Basket values are low.`;
        useCase = "Train staff on micro upsell elevator pitches (e.g. premium hair treatment packages, custom table coffee blends) at transaction points.";
      } else {
        problem = `${periodAdjective} monetized value of $${latestLog.sales} falls short of the $${aiTargets.sales} baseline target.`;
        useCase = "Review client billing schedules. Bundle secondary advisory items into high-contrast pitch decks to upsell current clients.";
      }

      issues.push({
        moduleNum: 4,
        moduleTitle: "Module 4: Monetization & Value Extraction",
        status: "warning",
        diagnostic: problem,
        cards: ["idea-shopping", "elevator-pitch"],
        useCase: useCase
      });
    } else {
      issues.push({
        moduleNum: 4,
        moduleTitle: "Module 4: Monetization & Value Extraction",
        status: "secure",
        diagnostic: "Revenue generation exceeds target metrics.",
        cards: ["idea-shopping", "elevator-pitch"],
        useCase: "Keep validating potential new premium add-ons using the Idea Shopping methodology to maximize user value extraction."
      });
    }

    return issues;
  }, [latestLog, aiTargets, category, loggingInterval]);

  // SVG Chart path compiler
  const svgPathInfo = useMemo(() => {
    if (logHistory.length < 2 || !aiTargets) {
      return { series: {} as Record<string, { points: Array<{ x: number; y: number; val: number; score: number; periodIndex: number }>; linePath: string; areaPath: string }> };
    }
    
    const width = 600;
    const height = 220;
    const paddingX = 50;
    const paddingY = 30;

    const chartWidth = width - (paddingX * 2);
    const chartHeight = height - (paddingY * 2);

    const keys = ["health", "acquisition", "adoption", "sales", "latency", "sentiment"];
    const seriesData: Record<string, { points: Array<{ x: number; y: number; val: number; score: number; periodIndex: number }>; linePath: string; areaPath: string }> = {};

    keys.forEach((key) => {
      const points = logHistory.map((log, index) => {
        const x = paddingX + index * (chartWidth / (logHistory.length - 1));
        
        let score = 50;
        let rawVal = 0;
        if (key === "health") {
          score = log.computedHealth;
          rawVal = log.computedHealth;
        } else if (key === "acquisition") {
          score = Math.min(100, (log.acquisition / aiTargets.acquisition) * 100);
          rawVal = log.acquisition;
        } else if (key === "adoption") {
          score = Math.min(100, (log.adoption / aiTargets.adoption) * 100);
          rawVal = log.adoption;
        } else if (key === "sales") {
          score = Math.min(100, (log.sales / aiTargets.sales) * 100);
          rawVal = log.sales;
        } else if (key === "latency") {
          let latScore = 100;
          if (log.latency > aiTargets.latency) {
            latScore = Math.max(0, 100 - ((log.latency - aiTargets.latency) / aiTargets.latency) * 100);
          }
          score = latScore;
          rawVal = log.latency;
        } else if (key === "sentiment") {
          score = log.sentiment;
          rawVal = log.sentiment;
        }

        const y = paddingY + (chartHeight - (score / 100) * chartHeight);
        return { x, y, val: rawVal, score, periodIndex: log.period ?? log.week ?? 0 };
      });

      const linePath = points.reduce((path, p, i) => {
        return i === 0 ? `M ${p.x} ${p.y}` : `${path} L ${p.x} ${p.y}`;
      }, "");

      const areaPath = points.length > 0 
        ? `${linePath} L ${points[points.length - 1].x} ${height - paddingY} L ${points[0].x} ${height - paddingY} Z`
        : "";

      seriesData[key] = { points, linePath, areaPath };
    });

    return { series: seriesData };
  }, [logHistory, aiTargets]);

  const handleOpenCardModal = (cardId: string) => {
    const card = cardsList.find((c) => c.id === cardId);
    if (card) {
      setSelectedCard(card);
    }
  };

  // Workshop Playbook playlist total duration calculation
  const workshopDuration = useMemo(() => {
    return workshopPlaylist.reduce((total, item) => total + item.duration, 0);
  }, [workshopPlaylist]);

  // Workshop copy agenda functionality
  const handleExportPlaybook = () => {
    if (workshopPlaylist.length === 0) return;
    
    let playbookText = `=== HUSTLERS INSTITUTE WORKSHOP PLAYBOOK ===\n`;
    playbookText += `Workspace: ${businessName}\n`;
    playbookText += `Date Generated: ${new Date().toLocaleDateString()}\n`;
    playbookText += `Total Duration: ${workshopDuration} minutes\n`;
    playbookText += `----------------------------------------\n\n`;
    
    workshopPlaylist.forEach((item, idx) => {
      playbookText += `${idx + 1}. Card ${item.card.num}: ${item.card.title} [${item.duration} mins]\n`;
      playbookText += `   Phase: ${item.card.stage} | Category: ${item.card.category}\n`;
      playbookText += `   Objective: ${item.card.objective}\n`;
      playbookText += `   Field Action Steps:\n`;
      item.card.deployment.forEach((step, i) => {
        playbookText += `     - [ ] ${step}\n`;
      });
      playbookText += `\n`;
    });
    
    navigator.clipboard.writeText(playbookText).then(() => {
      setCopiedStatus(true);
      setTimeout(() => setCopiedStatus(false), 2000);
    });
  };

  // Filters for Toolkit tab
  const filteredToolkitCards = useMemo(() => {
    return cardsList.filter((card) => {
      const matchesStage = toolkitStage === "All" || card.stage === toolkitStage;
      const matchesSearch = card.title.toLowerCase().includes(toolkitSearch.toLowerCase()) ||
                            card.category.toLowerCase().includes(toolkitSearch.toLowerCase()) ||
                            card.frontDesc.toLowerCase().includes(toolkitSearch.toLowerCase());
      return matchesStage && matchesSearch;
    });
  }, [toolkitStage, toolkitSearch]);

  // Ask Leo Chat Response logic
  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || chatIsTyping) return;

    const userText = chatInput;
    const timestampStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // 1. Add user message
    setChatMessages(prev => [...prev, { sender: "user", text: userText, timestamp: timestampStr }]);
    setChatInput("");
    setChatIsTyping(true);

    // 2. Generate simulated AI coach response
    setTimeout(() => {
      const promptLower = userText.toLowerCase();
      let responseText = "";

      if (promptLower.includes("status") || promptLower.includes("health") || promptLower.includes("how is my business") || promptLower.includes("operations") || promptLower.includes("telemetry") || promptLower.includes("logs")) {
        if (logHistory.length === 0) {
          responseText = `Hello! I am Leo, your AI Sentinel. I've audited the database, but no telemetry logs have been recorded yet for the space "${businessName || "Sovereign Enterprise"}". Please navigate to the "Operations & Telemetry" tab, log your current parameters, and I'll compile a diagnostic review immediately!`;
        } else {
          const latest = logHistory[logHistory.length - 1];
          const targetAcq = aiTargets?.acquisition || 500;
          const targetSales = aiTargets?.sales || 10000;
          const targetLatency = aiTargets?.latency || 200;
          const health = latest.computedHealth;
          
          let statusComment = "";
          if (health >= 85) {
            statusComment = "Your business health index is **OPTIMAL**, indicating solid traction, alignment, and operational efficiency across all vectors.";
          } else if (health >= 70) {
            statusComment = "Your business health index is **STABLE** but displays minor warning thresholds. We have detected telemetry gaps that require design intervention.";
          } else {
            statusComment = "Your business health index is **CRITICAL**. System bottlenecks and friction peaks are directly threatening your retention and runway limits.";
          }

          responseText = `### LEO SENTINEL REPORT: SYSTEM DIAGNOSTIC
I have compiled the live telemetry for **${businessName || "Sovereign Enterprise"}** (${category.toUpperCase()} category):

*   **Active Period Index**: ${periodLabel} ${latest.period ?? latest.week}
*   **Business Health Index**: **${health}/100** — *${statusComment}*
*   **Acquisition**: ${latest.acquisition} vs Target ${targetAcq} (${Math.round((latest.acquisition / targetAcq) * 100)}%)
*   **Adoption Rate**: ${latest.adoption}% vs Target ${aiTargets?.adoption || 80}%
*   **Period Sales**: $${latest.sales} vs Target $${targetSales}
*   **System Latency**: ${latest.latency}${currentMode.latUnit} vs Ceiling ${targetLatency}${currentMode.latUnit}

**Strategic Advisory Directive:**
${health < 80 ? "Your current bottleneck lies in operational delivery and onboarding friction. I recommend applying **Card 03 (Culture Probes)** to capture customer transaction anxiety, or running a **System Map (Card 11)** to trace data bottlenecks." : "All systems exceed critical targets. Focus on scaling your monetization runway by running **Idea Shopping (Card 25)** or pitching premium upsell options."} Let me know if you would like me to unpack a specific design card!`;
        }
      } else if (promptLower.includes("target") || promptLower.includes("goal") || promptLower.includes("mission") || promptLower.includes("quarterly") || promptLower.includes("calibrated")) {
        responseText = `### LEO SENTINEL REPORT: TARGET CALIBRATION ALIGNMENT
The Sovereign Sentinel Reasoning Engine has compiled target baselines for **${businessName}** based on your mission statement:
*"${mission || "No mission statement defined."}"*

**Quarterly Objectives:**
${goals ? goals.split("\n").map(line => `*   ${line}`).join("\n") : "*No quarterly goals logged.*"}

**AI-Calibrated Telemetry Safeguards:**
*   **Acquisition Floor**: ${aiTargets?.acquisition || 500} ${currentMode.acqUnit} per ${periodLabel.toLowerCase()}
*   **Active Adoption Target**: ${aiTargets?.adoption || 80}% engagement stickiness
*   **Sales Runrate**: $${aiTargets?.sales || 10000} contract value per period
*   **Operational Latency SLA**: <= ${aiTargets?.latency || 200} ${currentMode.latUnit} average response

These limits serve as the baseline boundaries for your Health Index compilation. Gaps in telemetry are dynamically synthesized into module playbooks.`;
      } else if (promptLower.includes("card") || promptLower.includes("toolkit") || promptLower.includes("method") || promptLower.includes("tool") || promptLower.includes("design thinking")) {
        const match = promptLower.match(/(?:card\s*|#)(\d+)/);
        if (match) {
          const numStr = match[1].padStart(2, "0");
          const found = cardsList.find(c => c.num === numStr);
          if (found) {
            responseText = `### METHOD FOCUS: CARD ${found.num} — ${found.title.toUpperCase()}
Here is the blueprint for **Card ${found.num}: ${found.title}** (${found.stage} Phase):

*   **Focus Area**: *${found.category}*
*   **Objective**: ${found.objective}
*   **Core Method**: ${found.frontDesc}

**Field Action Checklist:**
${found.deployment.map((step, i) => `${i + 1}. **${step}**`).join("\n")}

You can access the interactive visual canvas for this card directly in the **Design Toolkit** tab.`;
          } else {
            responseText = `I searched the Strategic Design database, but card number **${match[1]}** does not exist. We support indexes from 01 to 44. Try asking for *"Explain Card 03"* or *"Explain Card 12"*.`;
          }
        } else {
          responseText = `### LEO SENTINEL REPORT: TOOLKIT蓝图
The Hustlers Institute design curriculum contains **44 Strategic Design Cards** divided into four sprint phases:
1.  **Research** (Cards 01–08): Focuses on contextual inquiries, shadowing, and user diary logs.
2.  **Synthesis** (Cards 09–18): Affinity grouping, 2x2 prioritization, and stakeholder systems mapping.
3.  **Ideation** (Cards 19–27): Challenge framing (HMW), Golden Circles, and feature budgets.
4.  **Prototyping** (Cards 28–44): Co-creation cafe workshops, role-playing, and predictive behavior Change Engines.

Ask me about a specific card number (e.g. *"Explain Card 03"*) or topic, and I will print its operational checklist!`;
        }
      } else if (promptLower.includes("module 1") || promptLower.includes("module one") || promptLower.includes("friction")) {
        responseText = `### MODULE 1 RECAP: FUNNEL & ONBOARDING FRICTION
Module 1 deals directly with the **onboarding checkout logic** and funnel drop-offs. If your acquisition volumes fall below calibrated Sentinel baselines, it means users are meeting excessive qualitative friction when registering.

*   **Priority Metric**: Onboarding Acquisition
*   **Primary Toolkits**: **Card 01: Interviews** & **Card 12: Empathy Maps**
*   **Operational Goal**: Isolate and prune optional form inputs or verify if SMS OTP loops are failing.`;
      } else if (promptLower.includes("module 2") || promptLower.includes("module two") || promptLower.includes("stickiness") || promptLower.includes("retention")) {
        responseText = `### MODULE 2 RECAP: RETENTION & STICKINESS
Module 2 focuses on long-term user retention. Getting users to sign up is only half the battle; we must design sticky habit triggers to keep adoption high.

*   **Priority Metric**: Platform Adoption Rate
*   **Primary Toolkits**: **Card 03: Culture Probes** & **Card 17: Themes**
*   **Operational Goal**: Map client diaries at critical transaction points to uncover cognitive barriers.`;
      } else if (promptLower.includes("module 3") || promptLower.includes("module three") || promptLower.includes("latency") || promptLower.includes("operations")) {
        responseText = `### MODULE 3 RECAP: OPERATIONS & SLA LATENCY
Module 3 centers on internal operations. When latency metrics (such as checkout queues or db query times) breach target ceilings, it indicates a structural bottleneck in delivery.

*   **Priority Metric**: Average Transaction Latency
*   **Primary Toolkits**: **Card 11: System Map** & **Card 30: Workshops**
*   **Operational Goal**: Run table rotation sync workshops and trace API query loads.`;
      } else if (promptLower.includes("module 4") || promptLower.includes("module four") || promptLower.includes("sales") || promptLower.includes("monetization")) {
        responseText = `### MODULE 4 RECAP: MONETIZATION & VALUE EXTRACTION
Module 4 targets pricing limits and sales runs. If period revenue lags behind runway targets, you need to structure willingness-to-pay tests.

*   **Priority Metric**: Period Contract/Sales Revenue
*   **Primary Toolkits**: **Card 25: Idea Shopping** & **Card 26: Elevator Pitch**
*   **Operational Goal**: Train forward teams on value-tier upselling directly at check-out hubs.`;
      } else {
        responseText = `### LEO SENTINEL ADVISORY
Hello! I am Leo, your AI Sentinel Coach. I analyze operational telemetry gaps and link them directly to strategic design playbooks from the Hustlers curriculum.

How can I help you scale **${businessName || "your sovereign enterprise"}** today? 
*   Ask me *"How is my business doing?"* to compile a telemetry status review.
*   Ask *"Explain Card 12"* to unpack a toolkit playbook methodology.
*   Ask *"Summarize Module 2"* to review retention stickiness strategies.`;
      }

      setChatMessages(prev => [...prev, {
        sender: "leo",
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setChatIsTyping(false);
    }, 1200);
  };

  const SERIES_CONFIG = {
    health: { label: "Health Index", color: "#b59a7c", strokeWidth: "3.5" },
    acquisition: { label: "Acquisition", color: "#3b82f6", strokeWidth: "1.5" },
    adoption: { label: "Adoption", color: "#10b981", strokeWidth: "1.5" },
    sales: { label: "Sales Revenue", color: "#059669", strokeWidth: "1.5" },
    latency: { label: "SLA Latency", color: "#ef4444", strokeWidth: "1.5" },
    sentiment: { label: "Sentiment Index", color: "#8b5cf6", strokeWidth: "1.5" },
  };

  const imageMap: Record<string, string> = {
    "Research": "/phase_research.png",
    "Synthesis": "/phase_synthesis.png",
    "Ideation": "/phase_ideation.png",
    "Prototyping": "/phase_prototyping.png",
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf9f6] flex items-center justify-center font-mono text-xs text-slate-500">
        <div className="flex flex-col items-center gap-3">
          <RotateCw className="w-6 h-6 text-[#b59a7c] animate-spin" />
          <span>INITIALIZING HEALTH SENTINEL CONSOLE...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9f6] text-slate-800 font-sans antialiased flex flex-col justify-between">
      
      {/* STATUS BAR PROMO */}
      <div className="w-full bg-[#eae3d7] text-[#5c5346] py-2.5 px-6 text-center text-[10px] tracking-widest uppercase font-mono font-bold flex items-center justify-center gap-6 border-b border-slate-200">
        <span>SOVEREIGN BUSINESS SENTINEL LOGIC ENGINE</span>
        <span className="text-[#c7baa4] select-none">•</span>
        <span>STATUS: ACTIVE COMPILER</span>
        <span className="text-[#c7baa4] select-none">•</span>
        <span>VERSION 2.5 (MULTI-MODULE INTERACTION)</span>
      </div>

      {/* HEADER / NAVIGATION */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-40">
        <div className="w-full px-6 md:px-16 lg:px-24 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-none bg-slate-900 flex items-center justify-center text-white font-heading font-black text-lg">
              HI
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-slate-950 tracking-widest text-sm uppercase font-bold">
                Hustlers Institute
              </span>
              <span className="text-[9px] uppercase font-mono text-slate-400 font-semibold tracking-wider -mt-1">
                Business Health Sentinel
              </span>
            </div>
          </div>
          <nav className="flex items-center gap-6 text-xs uppercase font-heading tracking-widest font-bold">
            <a href="/" className="hover:text-[#b59a7c] transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Return Home
            </a>
          </nav>
        </div>
      </header>

      {/* MAIN LAYOUT */}
      <main className="flex-1 w-full max-w-[1600px] mx-auto flex flex-col md:flex-row gap-8 py-8 px-4 md:px-16 lg:px-24">
        
        {/* SETUP WIZARD (ONBOARDING SCREEN - Renders full-width if not onboarded) */}
        {!onboarded && (
          <div className="w-full max-w-3xl mx-auto bg-white border border-slate-200 p-8 md:p-12 shadow-sm rounded-none">
            <div className="mb-8 border-b border-slate-100 pb-4">
              <h2 className="text-lg font-heading text-[#b59a7c] tracking-widest font-bold flex items-center gap-2">
                <Sparkles className="w-5 h-5" /> AI Setup & Calibration Wizard
              </h2>
              <p className="text-xs text-slate-400 font-mono uppercase mt-1">
                Enter your business parameters to program target bounds
              </p>
            </div>

            <div className="space-y-6">
              
              {/* Grid 1: Business Profile */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono mb-2">
                    Business Name
                  </label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full bg-[#faf9f6] border border-slate-200 py-3 px-4 text-xs font-mono rounded-none focus:outline-none focus:border-[#b59a7c]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono mb-2">
                    Industry Verticals
                  </label>
                  <input
                    type="text"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    placeholder="e.g. Fintech, Wellness, Hospitality"
                    className="w-full bg-[#faf9f6] border border-slate-200 py-3 px-4 text-xs font-mono rounded-none focus:outline-none focus:border-[#b59a7c]"
                  />
                </div>
              </div>

              {/* Business Category Selection */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono mb-3">
                  Select Business Category (Dual-Mode Metrics Switch)
                </label>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                  {Object.values(BUSINESS_MODES).map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => setCategory(mode.id)}
                      className={`p-4 border text-left rounded-none transition-all flex flex-col justify-between h-32 ${
                        category === mode.id
                          ? "border-[#b59a7c] bg-[#eae3d7]/20 text-[#b59a7c]"
                          : "border-slate-200 bg-[#faf9f6] text-slate-650 hover:border-slate-350"
                      }`}
                    >
                      <span className="text-[10px] font-heading font-black tracking-widest block uppercase leading-snug">
                        {mode.name.split(" (")[0]}
                      </span>
                      <span className="text-[9px] font-mono text-slate-400 block mt-2 leading-tight">
                        Unit: {mode.acqLabel.split(" ").slice(-1)[0]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Logging Interval Selection */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono mb-2">
                  Select Logging Frequency
                </label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setLoggingInterval("daily")}
                    className={`flex-1 py-3 border text-center font-heading text-[10px] uppercase tracking-widest font-bold rounded-none transition-all ${
                      loggingInterval === "daily"
                        ? "border-[#b59a7c] bg-[#eae3d7]/20 text-[#b59a7c]"
                        : "border-slate-200 bg-[#faf9f6] text-slate-500 hover:border-slate-300"
                    }`}
                  >
                    Daily Logging
                  </button>
                  <button
                    type="button"
                    onClick={() => setLoggingInterval("weekly")}
                    className={`flex-1 py-3 border text-center font-heading text-[10px] uppercase tracking-widest font-bold rounded-none transition-all ${
                      loggingInterval === "weekly"
                        ? "border-[#b59a7c] bg-[#eae3d7]/20 text-[#b59a7c]"
                        : "border-slate-200 bg-[#faf9f6] text-slate-500 hover:border-slate-300"
                    }`}
                  >
                    Weekly Logging
                  </button>
                </div>
                <p className="text-[10px] text-slate-400 font-sans mt-1.5 leading-normal">
                  Configure whether telemetry metrics are recorded as daily snapshots (e.g., Day 1, Day 2) or consolidated weekly aggregates (e.g., Week 1, Week 2).
                </p>
              </div>

              {/* Description */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono mb-2">
                  Business Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full bg-[#faf9f6] border border-slate-200 py-3 px-4 text-xs font-mono rounded-none focus:outline-none focus:border-[#b59a7c]"
                  placeholder="Explain what products/services you deliver..."
                />
              </div>

              {/* Mission Statement */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono mb-2">
                  Business Mission Statement
                </label>
                <textarea
                  value={mission}
                  onChange={(e) => setMission(e.target.value)}
                  rows={2}
                  className="w-full bg-[#faf9f6] border border-slate-200 py-3 px-4 text-xs font-mono rounded-none focus:outline-none focus:border-[#b59a7c]"
                  placeholder="The primary vision and driving force..."
                />
              </div>

              {/* Quarterly Goals */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono mb-2">
                  Quarterly Goals
                </label>
                <textarea
                  value={goals}
                  onChange={(e) => setGoals(e.target.value)}
                  rows={3}
                  className="w-full bg-[#faf9f6] border border-slate-200 py-3 px-4 text-xs font-mono rounded-none focus:outline-none focus:border-[#b59a7c]"
                  placeholder="Bullet points detailing target outcomes..."
                />
              </div>

              {/* COMPILER WIDGET OR SUBMIT */}
              {isRefining ? (
                <div className="bg-slate-900 border border-slate-800 text-green-400 p-5 rounded-none font-mono text-[10px] space-y-1 select-none text-left">
                  {compilerLogs.map((log, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-slate-500">{`>`}</span>
                      <span>{log}</span>
                    </div>
                  ))}
                  <div className="w-2.5 h-4 bg-green-400 animate-pulse inline-block mt-2"></div>
                </div>
              ) : (
                <button
                  onClick={runCompilerSimulation}
                  disabled={!businessName || !industry || !description || !mission}
                  className="w-full bg-[#b59a7c] hover:bg-[#a3886b] disabled:bg-slate-200 disabled:text-slate-400 text-white font-heading text-xs uppercase tracking-widest py-4 text-center rounded-none font-bold shadow-sm transition-all"
                >
                  AI Refine & Target Set
                </button>
              )}

            </div>
          </div>
        )}

        {/* SIDEBAR NAVIGATION SHELL (Renders when onboarded) */}
        {onboarded && (
          <div className="w-full flex flex-col md:flex-row gap-8 items-start">
            
            {/* LEFT SIDEBAR PANEL */}
            <aside className="w-full md:w-64 border border-slate-200 bg-white p-6 rounded-none shadow-sm shrink-0 flex flex-col justify-between h-[calc(100vh-140px)] sticky top-24 z-10">
              <div className="space-y-6">
                
                <div className="border-b pb-4 text-left">
                  <h3 className="font-heading font-black uppercase tracking-widest text-slate-900 text-sm">
                    Master Hub
                  </h3>
                  <p className="text-[8px] font-mono text-slate-400 uppercase mt-0.5">
                    Hustlers Institute Sentinel
                  </p>
                </div>

                {/* Sidebar Navigation anchors */}
                <nav className="flex flex-col gap-1 text-left">
                  {[
                    { id: "operations", label: "Operations & Sentinel", icon: Activity },
                    { id: "toolkit", label: "Design Toolkit Explorer", icon: Layers },
                    { id: "workshop", label: "Workshop Builder", icon: Briefcase },
                    { id: "recaps", label: "Module Recaps & Advisory", icon: FileText },
                    { id: "chat", label: "Ask Leo (AI Chat)", icon: MessageSquare }
                  ].map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeSubTab === tab.id;
                    
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveSubTab(tab.id)}
                        className={`flex items-center gap-3 px-4 py-3 text-[10px] uppercase tracking-wider font-heading font-bold transition-all border-l-2 ${
                          isActive 
                            ? "border-[#b59a7c] bg-[#eae3d7]/20 text-[#b59a7c]" 
                            : "border-transparent text-slate-655 hover:bg-[#faf9f6] hover:text-slate-900"
                        }`}
                      >
                        <Icon className="w-4 h-4 shrink-0" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Sidebar footer: active workspace and switcher */}
              <div className="border-t border-slate-200 pt-6 space-y-4">
                <div className="bg-[#faf9f6] p-4 border border-slate-150 text-left font-mono">
                  <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Active Space
                  </span>
                  <span className="text-xs font-bold text-slate-800 block truncate">
                    {businessName}
                  </span>
                  <span className="px-1.5 py-0.5 bg-[#eae3d7] text-[#5c5346] text-[8px] font-bold rounded-none uppercase tracking-wider mt-1.5 inline-block">
                    {currentMode.name.split(" (")[0]}
                  </span>
                  <span className="text-[8px] text-slate-400 uppercase block font-semibold mt-1">
                    {periodLabel}ly Logs
                  </span>
                </div>
                
                {/* Workspace switcher */}
                <div className="flex flex-col text-left">
                  <label className="text-[8px] font-bold text-slate-400 uppercase tracking-widest font-mono mb-1">
                    Switch Space
                  </label>
                  <select
                    value={activeWorkspaceId}
                    onChange={(e) => {
                      const switchId = e.target.value;
                      fetch(`/api/health/sentinel?switchId=${switchId}`)
                        .then(r => r.ok && r.json())
                        .then(data => data && updateWorkspaceState(data));
                    }}
                    className="w-full bg-white border border-slate-200 text-[10px] px-2 py-1.5 font-mono text-slate-800 focus:outline-none focus:border-[#b59a7c] rounded-none cursor-pointer"
                  >
                    {workspaces.map((w) => (
                      <option key={w.id} value={w.id}>
                        {w.name} ({w.category.toUpperCase()})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Add and Reset buttons */}
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setOnboarded(false);
                      setBusinessName("");
                      setIndustry("");
                      setCategory("tech");
                      setLoggingInterval("weekly");
                      setDescription("");
                      setMission("");
                      setGoals("");
                      setAiTargets(null);
                      setLogHistory([]);
                    }}
                    className="bg-[#b59a7c] hover:bg-[#a3886b] text-white font-heading text-[9px] uppercase tracking-wider py-2 rounded-none font-bold shadow-sm transition-all text-center"
                  >
                    + New
                  </button>
                  <button
                    type="button"
                    onClick={handleResetProfile}
                    className="bg-transparent border border-slate-350 hover:border-red-500 hover:text-red-500 text-slate-650 font-heading text-[9px] uppercase tracking-wider py-2 rounded-none font-bold transition-all text-center"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </aside>

            {/* MAIN CONTENT AREA */}
            <div className="flex-1 min-w-0">
              
              {/* Tab Header Banner */}
              <div className="mb-8 border-b border-slate-200 pb-4 text-left">
                <span className="px-2.5 py-1 bg-[#eae3d7] text-[#5c5346] text-[9px] tracking-widest uppercase font-mono font-bold rounded-none mb-3 inline-block">
                  {activeSubTab === "operations" ? "Operational Telemetry & Sentinel" :
                   activeSubTab === "toolkit" ? "Methodology Design Toolkit" :
                   activeSubTab === "workshop" ? "Sprint Agenda Architect" :
                   activeSubTab === "recaps" ? "Institute Curriculum Recap" : "Ask Leo AI Companion"}
                </span>
                <h1 className="text-2xl md:text-3xl font-heading text-slate-900 tracking-wider font-bold uppercase">
                  {activeSubTab === "operations" ? "Operations & Telemetry Log" :
                   activeSubTab === "toolkit" ? "Strategic Toolkit Explorer" :
                   activeSubTab === "workshop" ? "Workshop Sequence Builder" :
                   activeSubTab === "recaps" ? "Module Recaps & Strategic Advisory" : "Ask Leo (AI Sentinel)"}
                </h1>
                <p className="text-slate-500 text-xs font-sans mt-1">
                  {activeSubTab === "operations" ? "Record metrics periodically, chart health indexes, and review playbook synthesis diagnostics." :
                   activeSubTab === "toolkit" ? "Browse, search, and simulate strategic UX design card checklists." :
                   activeSubTab === "workshop" ? "Compile custom workshop sequences, adjust session timings, and export structured playbook agendas." :
                   activeSubTab === "recaps" ? "Review module objectives and launch design cards directly to bridge analytics with deployment." :
                   "Ask our Sentinel Coach about targets validation, curriculum synthesis reports, or design blueprints."}
                </p>
              </div>

              {/* TAB 1: OPERATIONS & SENTINEL */}
              {activeSubTab === "operations" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* LEFT COLUMN: SETUP PROFILE SUMMARY & LOGGER */}
                  <div className="lg:col-span-5 space-y-8">
                    
                    {/* Setup Target Profile Summary */}
                    <div className="bg-white border border-slate-200 p-6 rounded-none shadow-sm">
                      <div className="border-b border-slate-100 pb-3 mb-4 flex items-center justify-between">
                        <span className="text-xs uppercase font-heading text-slate-800 font-bold tracking-widest flex items-center gap-1.5">
                          <Shield className="w-4 h-4 text-[#b59a7c]" /> Sentinel Target Profile
                        </span>
                        <span className="px-2 py-0.5 bg-[#eae3d7] text-[#5c5346] text-[8px] tracking-wider uppercase font-mono font-bold rounded-none">
                          {currentMode.name.split(" (")[0]}
                        </span>
                      </div>
                      
                      <div className="space-y-4 text-xs font-mono text-left">
                        <div>
                          <span className="text-slate-400 uppercase text-[9px] block">Business Name:</span>
                          <span className="text-slate-900 font-bold">{businessName}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 uppercase text-[9px] block">Refined AI Scope:</span>
                          <p className="text-slate-655 text-[11px] leading-relaxed italic">{refinedDescription}</p>
                        </div>
                        <div>
                          <span className="text-slate-400 uppercase text-[9px] block">Refined Mission:</span>
                          <p className="text-slate-655 text-[11px] leading-relaxed">{refinedMission}</p>
                        </div>
                        <div className="bg-[#faf9f6] p-3 border border-slate-150 text-[10px]">
                          <span className="text-slate-400 uppercase text-[8px] block mb-1">Calibrated Targets:</span>
                          <ul className="space-y-1">
                            <li className="flex justify-between">
                              <span>• Acquisition Threshold:</span>
                              <span className="font-bold">{aiTargets?.acquisition} {currentMode.acqUnit}</span>
                            </li>
                            <li className="flex justify-between">
                              <span>• Adoption Base:</span>
                              <span className="font-bold">{aiTargets?.adoption}{currentMode.adpUnit}</span>
                            </li>
                            <li className="flex justify-between">
                              <span>• {loggingInterval === "daily" ? "Daily" : "Weekly"} Sales:</span>
                              <span className="font-bold">${aiTargets?.sales}</span>
                            </li>
                            <li className="flex justify-between">
                              <span>• Max Response Latency:</span>
                              <span className="font-bold">{aiTargets?.latency} {currentMode.latUnit}</span>
                            </li>
                            <li className="flex justify-between">
                              <span>• {loggingInterval === "daily" ? "Daily" : "Weekly"} Sentiment:</span>
                              <span className="font-bold">&gt;= {aiTargets?.sentiment}%</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Weekly Telemetry Logger Form */}
                    <div className="bg-white border border-slate-200 p-6 rounded-none shadow-sm">
                      <div className="border-b border-slate-100 pb-3 mb-4 text-left">
                        <h3 className="text-xs uppercase font-heading text-slate-800 font-bold tracking-widest flex items-center gap-1.5">
                          <Activity className="w-4 h-4 text-[#b59a7c]" /> Log {loggingInterval === "daily" ? "Daily" : "Weekly"} Operations Telemetry
                        </h3>
                        <p className="text-[9px] text-slate-400 font-mono uppercase mt-0.5">
                          Record {periodLabel} {logHistory.length + 1} parameters
                        </p>
                      </div>

                      <form onSubmit={handleAddWeekLog} className="space-y-4">
                        
                        {/* Grid fields */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[8px] font-bold text-slate-400 uppercase tracking-widest font-mono mb-1 text-left">
                              {formatModeLabel(currentMode.acqLabel)} ({currentMode.acqUnit})
                            </label>
                            <input
                              type="number"
                              value={newAcq}
                              onChange={(e) => setNewAcq(e.target.value)}
                              className="w-full bg-[#faf9f6] border border-slate-200 py-2 px-3 text-xs font-mono rounded-none focus:outline-none focus:border-[#b59a7c]"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-[8px] font-bold text-slate-400 uppercase tracking-widest font-mono mb-1 text-left">
                              {formatModeLabel(currentMode.adpLabel)} ({currentMode.adpUnit})
                            </label>
                            <input
                              type="number"
                              step="0.1"
                              value={newAdp}
                              onChange={(e) => setNewAdp(e.target.value)}
                              className="w-full bg-[#faf9f6] border border-slate-200 py-2 px-3 text-xs font-mono rounded-none focus:outline-none focus:border-[#b59a7c]"
                              required
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[8px] font-bold text-slate-400 uppercase tracking-widest font-mono mb-1 text-left">
                              {formatModeLabel(currentMode.salesLabel)} ({currentMode.salesUnit})
                            </label>
                            <input
                              type="number"
                              value={newSales}
                              onChange={(e) => setNewSales(e.target.value)}
                              className="w-full bg-[#faf9f6] border border-slate-200 py-2 px-3 text-xs font-mono rounded-none focus:outline-none focus:border-[#b59a7c]"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-[8px] font-bold text-slate-400 uppercase tracking-widest font-mono mb-1 text-left">
                              {formatModeLabel(currentMode.latLabel)} ({currentMode.latUnit})
                            </label>
                            <input
                              type="number"
                              step="0.1"
                              value={newLat}
                              onChange={(e) => setNewLat(e.target.value)}
                              className="w-full bg-[#faf9f6] border border-slate-200 py-2 px-3 text-xs font-mono rounded-none focus:outline-none focus:border-[#b59a7c]"
                              required
                            />
                          </div>
                        </div>

                        {/* Customer Service Integrations */}
                        <div className="border-t border-slate-100 pt-3 space-y-3">
                          <span className="block text-[8px] font-bold text-slate-400 uppercase tracking-widest font-mono text-left">
                            Customer Service complaints & Resolutions
                          </span>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-[8px] font-bold text-slate-400 uppercase tracking-widest font-mono mb-1 text-left">
                                Complaints Logged
                              </label>
                              <input
                                type="number"
                                value={newComplaints}
                                onChange={(e) => setNewComplaints(Math.max(0, parseInt(e.target.value) || 0))}
                                className="w-full bg-[#faf9f6] border border-slate-200 py-2 px-3 text-xs font-mono rounded-none focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-[8px] font-bold text-slate-400 uppercase tracking-widest font-mono mb-1 text-left">
                                Resolutions Formulated
                              </label>
                              <input
                                type="number"
                                value={newResolutions}
                                onChange={(e) => setNewResolutions(Math.max(0, parseInt(e.target.value) || 0))}
                                className="w-full bg-[#faf9f6] border border-slate-200 py-2 px-3 text-xs font-mono rounded-none focus:outline-none"
                              />
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <label className="block text-[8px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                                Customer Sentiment Index
                              </label>
                              <span className="text-[10px] font-mono font-bold text-[#b59a7c]">{newSentiment}%</span>
                            </div>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={newSentiment}
                              onChange={(e) => setNewSentiment(parseInt(e.target.value) || 0)}
                              className="w-full accent-[#b59a7c]"
                            />
                            <div className="flex justify-between text-[8px] text-slate-400 font-mono">
                              <span>FRUSTRATED</span>
                              <span>NEUTRAL</span>
                              <span>HAPPY</span>
                            </div>
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="w-full bg-slate-900 hover:bg-slate-800 text-white font-heading text-[10px] uppercase tracking-widest py-3 text-center rounded-none font-bold transition-all mt-2"
                        >
                          Log {periodLabel} {logHistory.length + 1} Telemetry
                        </button>

                      </form>
                    </div>

                    {/* Monospace History Logs Console */}
                    <div className="bg-slate-900 border border-slate-850 p-5 rounded-none text-slate-300 font-mono text-[9px] shadow-sm select-none">
                      <div className="border-b border-slate-800 pb-2 mb-3 flex items-center justify-between">
                        <span className="text-green-400 uppercase tracking-wider font-bold">SYSTEM TELEMETRY LEDGER</span>
                        <span className="text-slate-500 font-mono">COUNT: {logHistory.length} {periodLabelUpper}S</span>
                      </div>
                      
                      <div className="space-y-1.5 max-h-48 overflow-y-auto text-left">
                        {logHistory.slice().reverse().map((log) => (
                          <div key={log.period ?? log.week} className="flex flex-col border-b border-slate-800 pb-1.5 last:border-0">
                            <div className="flex justify-between font-bold text-slate-200">
                              <span>{periodLabelUpper} {log.period ?? log.week} LEDGER LOG:</span>
                              <span className={log.computedHealth >= 80 ? "text-green-400" : log.computedHealth >= 70 ? "text-yellow-400" : "text-red-400"}>
                                INDEX: {log.computedHealth}/100
                              </span>
                            </div>
                            <div className="text-slate-400 pl-2 leading-relaxed">
                              • ACQ: {log.acquisition} | ADP: {log.adoption}{currentMode.adpUnit} | SLS: ${log.sales} | LAT: {log.latency}{currentMode.latUnit}<br/>
                              • SERVICE: Complaints {log.complaints} | Resol: {log.resolutions} | Sentiment: {log.sentiment}%
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* RIGHT COLUMN: DYNAMIC PLOTS & SYNTHESIS RECOMMENDATIONS */}
                  <div className="lg:col-span-7 space-y-8">
                    
                    {/* Dynamic SVG Health Index Chart Card */}
                    <div className="bg-white border border-slate-200 p-6 rounded-none shadow-sm">
                      <div className="border-b border-slate-100 pb-3 mb-4 flex items-center justify-between">
                        <h3 className="text-xs uppercase font-heading text-slate-800 font-bold tracking-widest flex items-center gap-1.5">
                          <TrendingUp className="w-4 h-4 text-[#b59a7c]" /> Business Health Index Trend
                        </h3>
                        <span className="text-[9px] font-mono text-slate-400">HEALTH INDEX / % OF TARGET (0-100)</span>
                      </div>

                      {logHistory.length < 2 ? (
                        <div className="h-[220px] flex items-center justify-center bg-[#faf9f6] border border-dashed border-slate-200 text-slate-400 text-xs font-mono">
                          Log at least 2 {periodLabel.toLowerCase()}s of data to compute trend vector.
                        </div>
                      ) : (
                        <div>
                          <svg viewBox="0 0 600 220" className="w-full overflow-visible">
                            <defs>
                              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#b59a7c" stopOpacity="0.15" />
                                <stop offset="100%" stopColor="#b59a7c" stopOpacity="0.0" />
                              </linearGradient>
                            </defs>

                            {/* Y-Axis Grid Lines */}
                            {[0, 25, 50, 75, 100].map((grid) => {
                              const y = 30 + (160 - (grid / 100) * 160);
                              return (
                                <g key={grid}>
                                  <line
                                    x1="50"
                                    y1={y}
                                    x2="550"
                                    y2={y}
                                    stroke="#e2e8f0"
                                    strokeWidth="1"
                                    strokeDasharray="4 4"
                                  />
                                  <text
                                    x="40"
                                    y={y + 3}
                                    fill="#94a3b8"
                                    className="text-[9px] font-mono"
                                    textAnchor="end"
                                  >
                                    {grid}
                                  </text>
                                </g>
                              );
                            })}

                            {/* Area Under Health Path */}
                            {visibleSeries.health && svgPathInfo.series.health && (
                              <path
                                d={svgPathInfo.series.health.areaPath}
                                fill="url(#chartGradient)"
                              />
                            )}

                            {/* Rendering toggled series paths */}
                            {Object.entries(visibleSeries).map(([key, isVisible]) => {
                              if (!isVisible) return null;
                              const data = svgPathInfo.series[key];
                              if (!data) return null;
                              const config = SERIES_CONFIG[key as keyof typeof SERIES_CONFIG];

                              return (
                                <g key={key}>
                                  {/* Line path */}
                                  <path
                                    d={data.linePath}
                                    fill="none"
                                    stroke={config.color}
                                    strokeWidth={config.strokeWidth}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  
                                  {/* Points and Hover Labels */}
                                  {data.points.map((pt, idx) => {
                                    const activeCount = Object.values(visibleSeries).filter(Boolean).length;
                                    const showLabel = key === "health" || activeCount === 1;
                                    const unitLabel = key === "health" ? "" : 
                                                      (key === "sales" ? "$" : 
                                                       key === "adoption" ? "%" : 
                                                       key === "latency" ? ` ${currentMode.latUnit}` : 
                                                       key === "sentiment" ? "%" : "");

                                    return (
                                      <g key={idx}>
                                        <circle
                                          cx={pt.x}
                                          cy={pt.y}
                                          r={key === "health" ? "5.5" : "4"}
                                          fill="#ffffff"
                                          stroke={config.color}
                                          strokeWidth={key === "health" ? "2.5" : "2"}
                                          className="cursor-pointer transition-all hover:scale-125"
                                        />
                                        {showLabel && (
                                          <text
                                            x={pt.x}
                                            y={pt.y - 12}
                                            fill="#1e293b"
                                            className="text-[9px] font-mono font-bold"
                                            textAnchor="middle"
                                          >
                                            {key === "sales" ? `${unitLabel}${pt.val}` : `${pt.val}${unitLabel}`}
                                          </text>
                                        )}
                                      </g>
                                    );
                                  })}
                                </g>
                              );
                            })}

                            {/* X-Axis Labels */}
                            {logHistory.map((log, index) => {
                              const chartWidth = 500; // width 600 - padding 50*2
                              const paddingX = 50;
                              const x = paddingX + index * (chartWidth / (logHistory.length - 1));
                              const periodIdx = log.period ?? log.week ?? 0;
                              return (
                                <text
                                  key={index}
                                  x={x}
                                  y="205"
                                  fill="#64748b"
                                  className="text-[9px] font-mono"
                                  textAnchor="middle"
                                >
                                  {periodLabel} {periodIdx}
                                </text>
                              );
                            })}
                          </svg>

                          {/* Legend checkable toggles */}
                          <div className="mt-6 flex flex-wrap gap-4 items-center justify-center border-t border-slate-100 pt-4">
                            {Object.entries(SERIES_CONFIG).map(([key, config]) => {
                              const isVisible = visibleSeries[key];
                              return (
                                <label key={key} className="inline-flex items-center gap-2 cursor-pointer select-none">
                                  <input
                                    type="checkbox"
                                    checked={isVisible}
                                    onChange={() => setVisibleSeries(prev => ({ ...prev, [key]: !prev[key] }))}
                                    className="rounded-none border-slate-300 text-[#b59a7c] focus:ring-0 focus:ring-offset-0 w-3.5 h-3.5"
                                  />
                                  <span className="w-2.5 h-2.5 rounded-none" style={{ backgroundColor: config.color }}></span>
                                  <span className="text-[10px] font-mono uppercase font-bold text-slate-655 hover:text-slate-900 transition-colors">
                                    {config.label}
                                  </span>
                                </label>
                              );
                            })}
                          </div>

                          {/* Math Formulation Details Overlay */}
                          <div className="mt-4 bg-[#faf9f6] p-3 border border-slate-150 text-[9px] font-mono text-slate-500 leading-normal text-left">
                            <span className="font-bold text-slate-700 block uppercase mb-1">Health Index Formulation Algorithm:</span>
                            Health = (Acquisition_Score * 0.2) + (Adoption_Score * 0.2) + (Sales_Score * 0.2) + (Latency_Score * 0.1) + (Service_SLA_Score * 0.3)<br/>
                            <span className="text-[8px] text-slate-400 block mt-1">
                              Where Latency Performance Score penalizes response times exceeding calibrated target ceilings, and Service SLA Performance weighs customer sentiment (60%) and resolution speed rates (40%). Individual metric paths reflect percentage performance against target benchmarks.
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Real-time Synthesis & Curriculum Advisory Panel */}
                    <div className="bg-white border border-slate-200 p-6 rounded-none shadow-sm">
                      <div className="border-b border-slate-100 pb-3 mb-5 flex items-center justify-between">
                        <h3 className="text-xs uppercase font-heading text-slate-800 font-bold tracking-widest flex items-center gap-1.5">
                          <FileText className="w-4 h-4 text-[#b59a7c]" /> Real-time Synthesis & Advisory Console
                        </h3>
                        <span className="px-2 py-0.5 bg-green-50 text-green-700 text-[8px] font-mono font-semibold uppercase border border-green-200">
                          REALTIME ENGINE
                        </span>
                      </div>

                      {logHistory.length === 0 ? (
                        <div className="text-center py-10 bg-[#faf9f6] border border-dashed border-slate-200 text-xs font-mono text-slate-400">
                          Onboard and submit log history to trigger synthesis.
                        </div>
                      ) : (
                        <div className="space-y-6">
                          {synthesisReport.map((moduleReport) => (
                            <div 
                              key={moduleReport.moduleNum}
                              className={`p-4 border rounded-none flex flex-col justify-between transition-all ${
                                moduleReport.status === "critical"
                                  ? "bg-red-50/40 border-red-200 text-red-950"
                                  : moduleReport.status === "warning"
                                  ? "bg-amber-50/40 border-amber-200 text-amber-950"
                                  : "bg-[#faf9f6] border-slate-200 text-slate-800"
                              }`}
                            >
                              {/* Header banner */}
                              <div className="flex items-center justify-between border-b border-slate-200/50 pb-2 mb-3">
                                <span className="text-[10px] font-heading font-black tracking-widest block uppercase text-slate-800">
                                  {moduleReport.moduleTitle}
                                </span>
                                <span className="flex items-center gap-1">
                                  {moduleReport.status === "critical" ? (
                                    <span className="px-2 py-0.5 bg-red-100 text-red-700 text-[7px] font-mono font-bold tracking-wider uppercase flex items-center gap-0.5">
                                      <AlertTriangle className="w-2.5 h-2.5" /> CRITICAL GAP
                                    </span>
                                  ) : moduleReport.status === "warning" ? (
                                    <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-[7px] font-mono font-bold tracking-wider uppercase flex items-center gap-0.5">
                                      <AlertTriangle className="w-2.5 h-2.5" /> WARNING
                                    </span>
                                  ) : (
                                    <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[7px] font-mono font-bold tracking-wider uppercase flex items-center gap-0.5">
                                      <CheckCircle2 className="w-2.5 h-2.5" /> SECURE
                                    </span>
                                  )}
                                </span>
                              </div>

                              {/* Diagnostics content */}
                              <div className="space-y-3 font-sans text-xs text-left">
                                <div>
                                  <span className="text-[9px] font-mono text-slate-400 block uppercase">Telemetry Diagnostic:</span>
                                  <p className="font-semibold text-slate-800 leading-normal">{moduleReport.diagnostic}</p>
                                </div>
                                
                                {/* Use case deployment steps */}
                                <div className="bg-white/80 p-3 border border-slate-100 leading-normal">
                                  <span className="text-[9px] font-mono text-[#b59a7c] block uppercase font-bold">Actionable Toolkit Use-Case Playbook:</span>
                                  <p className="text-slate-655 font-medium mt-1">{moduleReport.useCase}</p>
                                </div>

                                {/* Clickable toolkit badge links */}
                                <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2">
                                  <span className="text-[8px] font-mono text-slate-400 uppercase">Apply Design Toolkits:</span>
                                  {moduleReport.cards.map((cardId: string) => {
                                    const cardObj = cardsList.find((c) => c.id === cardId);
                                    return (
                                      <button
                                        key={cardId}
                                        type="button"
                                        onClick={() => handleOpenCardModal(cardId)}
                                        className="px-2.5 py-1 bg-white hover:bg-[#eae3d7]/30 border border-[#b59a7c] text-[#b59a7c] font-mono text-[9px] uppercase tracking-wider rounded-none cursor-pointer transition-all flex items-center gap-1 font-bold"
                                      >
                                        Card {cardObj?.num || "XX"}: {cardObj?.title || cardId} <ArrowUpRight className="w-2.5 h-2.5 shrink-0" />
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>

                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                  </div>

                </div>
              )}

              {/* TAB 2: DESIGN TOOLKIT EXPLORER */}
              {activeSubTab === "toolkit" && (
                <div className="space-y-8">
                  {/* Filter bar */}
                  <div className="bg-white border border-slate-200 p-6 rounded-none shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
                    
                    {/* Search Input */}
                    <div className="w-full md:w-80 relative">
                      <input
                        type="text"
                        placeholder="Search methodology blueprints..."
                        value={toolkitSearch}
                        onChange={(e) => setToolkitSearch(e.target.value)}
                        className="w-full bg-[#faf9f6] border border-slate-200 pl-10 pr-4 py-2.5 text-xs font-mono rounded-none focus:outline-none focus:border-[#b59a7c]"
                      />
                      <Layers className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    </div>

                    {/* Phase Filters */}
                    <div className="flex flex-wrap gap-2">
                      {["All", "Research", "Synthesis", "Ideation", "Prototyping"].map((phase) => (
                        <button
                          key={phase}
                          type="button"
                          onClick={() => setToolkitStage(phase)}
                          className={`px-4 py-2 text-[10px] uppercase font-heading tracking-wider font-bold rounded-none transition-all ${
                            toolkitStage === phase
                              ? "bg-[#b59a7c] text-white"
                              : "bg-[#faf9f6] border border-slate-200 text-slate-655 hover:border-slate-350"
                          }`}
                        >
                          {phase}
                        </button>
                      ))}
                    </div>

                    {/* Premium Simulator Toggle */}
                    <label className="inline-flex items-center gap-2 cursor-pointer select-none shrink-0">
                      <input
                        type="checkbox"
                        checked={simulateUnlock}
                        onChange={(e) => setSimulateUnlock(e.target.checked)}
                        className="rounded-none border-slate-300 text-[#b59a7c] focus:ring-0 w-3.5 h-3.5"
                      />
                      <span className="text-[10px] font-mono uppercase font-bold text-slate-500">
                        Simulate Premium Unlock
                      </span>
                    </label>

                  </div>

                  {/* Card grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredToolkitCards.map((card) => {
                      const coverImg = imageMap[card.stage] || "/phase_research.png";
                      const isActuallyLocked = card.isLocked && !simulateUnlock;
                      
                      return (
                        <div
                          key={card.id}
                          onClick={() => {
                            if (isActuallyLocked) {
                              alert("This is a Premium card. Please toggle 'Simulate Premium Unlock' in the toolbar to unlock it for testing!");
                              return;
                            }
                            handleOpenCardModal(card.id);
                          }}
                          className={`bg-white border transition-all cursor-pointer flex flex-col justify-between h-[280px] overflow-hidden shadow-sm hover:shadow-md hover:border-[#b59a7c] group ${
                            isActuallyLocked ? "opacity-75 border-slate-200" : "border-slate-200"
                          }`}
                        >
                          {/* Cover image */}
                          <div className="h-32 w-full overflow-hidden relative border-b border-slate-100">
                            <img
                              src={coverImg}
                              alt={card.stage}
                              className="w-full h-full object-cover transition-transform group-hover:scale-105"
                            />
                            {/* Phase label */}
                            <span className="absolute top-2 left-2 px-2 py-0.5 bg-slate-900/80 text-white font-mono text-[8px] uppercase tracking-wider">
                              {card.stage}
                            </span>
                            {/* Lock indicator */}
                            {isActuallyLocked && (
                              <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center backdrop-blur-[1px]">
                                <Lock className="w-5 h-5 text-white" />
                              </div>
                            )}
                          </div>
                          
                          {/* Content */}
                          <div className="p-4 flex-1 flex flex-col justify-between text-left">
                            <div>
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-[9px] font-mono text-[#b59a7c] font-bold">
                                  CARD {card.num}
                                </span>
                                <span className="text-[9px] font-mono text-slate-400 uppercase font-semibold">
                                  {card.category}
                                </span>
                              </div>
                              <h4 className="text-xs uppercase font-heading font-black tracking-wider text-slate-900 mt-1">
                                {card.title}
                              </h4>
                              <p className="text-[10px] text-slate-500 font-sans mt-1.5 leading-snug line-clamp-3">
                                {card.frontDesc}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 3: WORKSHOP SESSIONS BUILDER */}
              {activeSubTab === "workshop" && (
                <div className="space-y-8">
                  {/* Workshop Sequence agenda planner */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Playlist agenda */}
                    <div className="lg:col-span-8 space-y-4">
                      <div className="border border-slate-200 bg-white p-6 rounded-none shadow-sm text-left">
                        <div className="flex justify-between items-center border-b pb-3 mb-4">
                          <span className="font-heading font-bold uppercase tracking-wider text-xs text-slate-900">
                            Workshop Playlist Sequence
                          </span>
                          <span className="font-mono text-[10px] bg-[#eae3d7] py-0.5 px-2 font-bold text-[#5c5346]">
                            Total Duration: {workshopDuration} min
                          </span>
                        </div>

                        {workshopPlaylist.length === 0 ? (
                          <div className="h-[200px] flex items-center justify-center bg-[#faf9f6] border border-dashed border-slate-200 text-slate-400 text-xs font-mono">
                            Agenda sequence is empty. Add a design card from the right side panel to begin building.
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {workshopPlaylist.map((item, idx) => (
                              <div key={idx} className="border border-slate-150 p-4 bg-[#faf9f6] flex items-start justify-between gap-4 transition-all hover:border-[#b59a7c]">
                                <div className="flex items-start gap-3">
                                  <div className="w-6 h-6 border border-[#b59a7c] text-[#b59a7c] flex items-center justify-center font-mono text-[10px] font-bold mt-0.5">
                                    {idx + 1}
                                  </div>
                                  <div className="text-left font-sans text-xs">
                                    <div className="flex items-center gap-2">
                                      <span className="font-heading font-black uppercase text-slate-900">
                                        {item.card.title}
                                      </span>
                                      <span className="text-[8px] font-mono bg-slate-200 px-1 text-slate-500 uppercase">
                                        {item.card.stage}
                                      </span>
                                    </div>
                                    <p className="text-slate-500 text-[10px] mt-1 leading-snug">{item.card.frontDesc}</p>
                                    
                                    {/* Duration Slider */}
                                    <div className="mt-3 flex items-center gap-3">
                                      <span className="text-[9px] font-mono text-slate-400 uppercase font-semibold">Session Duration:</span>
                                      <input
                                        type="range"
                                        min="5"
                                        max="120"
                                        step="5"
                                        value={item.duration}
                                        onChange={(e) => {
                                          const val = parseInt(e.target.value) || 5;
                                          setWorkshopPlaylist(prev => {
                                            const next = [...prev];
                                            next[idx].duration = val;
                                            return next;
                                          });
                                        }}
                                        className="accent-[#b59a7c] w-32"
                                      />
                                      <span className="text-[10px] font-mono font-bold text-[#b59a7c]">{item.duration} mins</span>
                                    </div>
                                  </div>
                                </div>
                                
                                <button
                                  type="button"
                                  onClick={() => {
                                    setWorkshopPlaylist(prev => prev.filter((_, i) => i !== idx));
                                  }}
                                  className="text-slate-400 hover:text-red-500 transition-colors p-1"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            ))}

                            <div className="pt-4 border-t flex justify-end">
                              <button
                                type="button"
                                onClick={handleExportPlaybook}
                                className="bg-slate-900 hover:bg-slate-800 text-white font-heading text-[10px] uppercase tracking-widest py-3 px-6 font-bold rounded-none transition-all flex items-center gap-1.5"
                              >
                                <Clipboard className="w-3.5 h-3.5" />
                                {copiedStatus ? "Playbook Copied!" : "Export Playbook Agenda"}
                              </button>
                            </div>

                          </div>
                        )}
                      </div>
                    </div>

                    {/* Sidebar selector */}
                    <div className="lg:col-span-4 space-y-6">
                      <div className="border border-slate-200 bg-white p-6 rounded-none shadow-sm text-left">
                        <h4 className="font-heading font-bold uppercase tracking-wider text-xs text-slate-900 border-b pb-3 mb-4">
                          Add Cards to Agenda
                        </h4>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono mb-2">
                              Select Card Method
                            </label>
                            <select
                              id="workshopCardSelect"
                              className="w-full bg-[#faf9f6] border border-slate-200 py-2.5 px-3 text-xs font-mono rounded-none focus:outline-none focus:border-[#b59a7c]"
                            >
                              {cardsList.map((card) => (
                                <option key={card.id} value={card.id}>
                                  Card {card.num}: {card.title} ({card.stage})
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono mb-2">
                              Session Duration (minutes)
                            </label>
                            <input
                              type="number"
                              id="workshopCardDuration"
                              defaultValue="15"
                              min="5"
                              max="120"
                              step="5"
                              className="w-full bg-[#faf9f6] border border-slate-200 py-2.5 px-3 text-xs font-mono rounded-none focus:outline-none focus:border-[#b59a7c]"
                            />
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              const selectEl = document.getElementById("workshopCardSelect") as HTMLSelectElement;
                              const durationEl = document.getElementById("workshopCardDuration") as HTMLInputElement;
                              if (!selectEl || !durationEl) return;
                              const cardId = selectEl.value;
                              const durationVal = parseInt(durationEl.value) || 15;
                              
                              const card = cardsList.find(c => c.id === cardId);
                              if (card) {
                                setWorkshopPlaylist(prev => [...prev, { card, duration: durationVal }]);
                              }
                            }}
                            className="w-full bg-[#b59a7c] hover:bg-[#a3886b] text-white font-heading text-[10px] uppercase tracking-widest py-3 text-center rounded-none font-bold transition-all"
                          >
                            + Add to Sequence
                          </button>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* TAB 4: MODULE RECAPS */}
              {activeSubTab === "recaps" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                  {/* Module 1 */}
                  <div className="border border-slate-200 bg-white p-6 rounded-none shadow-sm flex flex-col justify-between min-h-[340px]">
                    <div>
                      <div className="border-b pb-2 mb-3 flex justify-between items-center">
                        <span className="text-[10px] font-heading font-black tracking-widest text-[#b59a7c] uppercase">
                          Module 1: Funnel & Onboarding Friction
                        </span>
                        <span className="px-2 py-0.5 bg-[#eae3d7] text-[#5c5346] text-[8px] font-mono font-bold rounded-none uppercase">
                          KyC / Funnel
                        </span>
                      </div>
                      <p className="text-slate-500 font-sans text-xs leading-relaxed">
                        Identifies drop-offs and customer hesitation during the registration funnel. Maps documentation requirements and credentials friction.
                      </p>
                      <div className="mt-4 bg-[#faf9f6] p-3 border border-slate-150 text-[11px] font-sans text-slate-655 leading-normal italic">
                        "Reduce friction peaks by evaluating the onboarding check-out logic and simplifying relational forms."
                      </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2">
                      <span className="text-[8px] font-mono text-slate-400 uppercase font-semibold">Apply Toolkits:</span>
                      <button
                        type="button"
                        onClick={() => handleOpenCardModal("interviews")}
                        className="px-2 py-1 bg-white hover:bg-[#eae3d7]/30 border border-[#b59a7c] text-[#b59a7c] font-mono text-[8px] uppercase tracking-wider rounded-none transition-all flex items-center gap-0.5 font-bold"
                      >
                        Card 01: Interviews <ArrowUpRight className="w-2 h-2" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleOpenCardModal("empathy-map")}
                        className="px-2 py-1 bg-white hover:bg-[#eae3d7]/30 border border-[#b59a7c] text-[#b59a7c] font-mono text-[8px] uppercase tracking-wider rounded-none transition-all flex items-center gap-0.5 font-bold"
                      >
                        Card 12: Empathy Map <ArrowUpRight className="w-2 h-2" />
                      </button>
                    </div>
                  </div>

                  {/* Module 2 */}
                  <div className="border border-slate-200 bg-white p-6 rounded-none shadow-sm flex flex-col justify-between min-h-[340px]">
                    <div>
                      <div className="border-b pb-2 mb-3 flex justify-between items-center">
                        <span className="text-[10px] font-heading font-black tracking-widest text-[#b59a7c] uppercase">
                          Module 2: Retention & Usage Stickiness
                        </span>
                        <span className="px-2 py-0.5 bg-[#eae3d7] text-[#5c5346] text-[8px] font-mono font-bold rounded-none uppercase">
                          Retention / Engagement
                        </span>
                      </div>
                      <p className="text-slate-500 font-sans text-xs leading-relaxed">
                        Tracks active usage drop-offs. Implements post-registration emotional probe checks and longitudinal diary logs to design habit change features.
                      </p>
                      <div className="mt-4 bg-[#faf9f6] p-3 border border-slate-150 text-[11px] font-sans text-slate-655 leading-normal italic">
                        "Capture shifting habits before user drop-offs occur by deploying longitudinal diary journals."
                      </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2">
                      <span className="text-[8px] font-mono text-slate-400 uppercase font-semibold">Apply Toolkits:</span>
                      <button
                        type="button"
                        onClick={() => handleOpenCardModal("culture-probe")}
                        className="px-2 py-1 bg-white hover:bg-[#eae3d7]/30 border border-[#b59a7c] text-[#b59a7c] font-mono text-[8px] uppercase tracking-wider rounded-none transition-all flex items-center gap-0.5 font-bold"
                      >
                        Card 03: Culture Probe <ArrowUpRight className="w-2 h-2" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleOpenCardModal("themes")}
                        className="px-2 py-1 bg-white hover:bg-[#eae3d7]/30 border border-[#b59a7c] text-[#b59a7c] font-mono text-[8px] uppercase tracking-wider rounded-none transition-all flex items-center gap-0.5 font-bold"
                      >
                        Card 17: Themes <ArrowUpRight className="w-2 h-2" />
                      </button>
                    </div>
                  </div>

                  {/* Module 3 */}
                  <div className="border border-slate-200 bg-white p-6 rounded-none shadow-sm flex flex-col justify-between min-h-[340px]">
                    <div>
                      <div className="border-b pb-2 mb-3 flex justify-between items-center">
                        <span className="text-[10px] font-heading font-black tracking-widest text-[#b59a7c] uppercase">
                          Module 3: Operations & Sync Latency
                        </span>
                        <span className="px-2 py-0.5 bg-[#eae3d7] text-[#5c5346] text-[8px] font-mono font-bold rounded-none uppercase">
                          Operations / SLAs
                        </span>
                      </div>
                      <p className="text-slate-500 font-sans text-xs leading-relaxed">
                        Addresses database queries or operational delivery waiting times. Restructures team handovers and synchronizes front-back server speeds.
                      </p>
                      <div className="mt-4 bg-[#faf9f6] p-3 border border-slate-150 text-[11px] font-sans text-slate-655 leading-normal italic">
                        "Optimize query index speeds and coordinate staff handovers to ensure operations fit under target ceilings."
                      </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2">
                      <span className="text-[8px] font-mono text-slate-400 uppercase font-semibold">Apply Toolkits:</span>
                      <button
                        type="button"
                        onClick={() => handleOpenCardModal("system-map")}
                        className="px-2 py-1 bg-white hover:bg-[#eae3d7]/30 border border-[#b59a7c] text-[#b59a7c] font-mono text-[8px] uppercase tracking-wider rounded-none transition-all flex items-center gap-0.5 font-bold"
                      >
                        Card 11: System Map <ArrowUpRight className="w-2 h-2" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleOpenCardModal("workshops")}
                        className="px-2 py-1 bg-white hover:bg-[#eae3d7]/30 border border-[#b59a7c] text-[#b59a7c] font-mono text-[8px] uppercase tracking-wider rounded-none transition-all flex items-center gap-0.5 font-bold"
                      >
                        Card 30: Workshops <ArrowUpRight className="w-2 h-2" />
                      </button>
                    </div>
                  </div>

                  {/* Module 4 */}
                  <div className="border border-slate-200 bg-white p-6 rounded-none shadow-sm flex flex-col justify-between min-h-[340px]">
                    <div>
                      <div className="border-b pb-2 mb-3 flex justify-between items-center">
                        <span className="text-[10px] font-heading font-black tracking-widest text-[#b59a7c] uppercase">
                          Module 4: Monetization & Value Extraction
                        </span>
                        <span className="px-2 py-0.5 bg-[#eae3d7] text-[#5c5346] text-[8px] font-mono font-bold rounded-none uppercase">
                          Monetization / Sales
                        </span>
                      </div>
                      <p className="text-slate-500 font-sans text-xs leading-relaxed">
                        Drives revenue runways. Frames value-tier options, willingness to pay experiments, and trains staff on transactional premium pitch cards.
                      </p>
                      <div className="mt-4 bg-[#faf9f6] p-3 border border-slate-150 text-[11px] font-sans text-slate-655 leading-normal italic">
                        "Validate user pricing limits using simulated budget economies before modifying live plan structures."
                      </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2">
                      <span className="text-[8px] font-mono text-slate-400 uppercase font-semibold">Apply Toolkits:</span>
                      <button
                        type="button"
                        onClick={() => handleOpenCardModal("idea-shopping")}
                        className="px-2 py-1 bg-white hover:bg-[#eae3d7]/30 border border-[#b59a7c] text-[#b59a7c] font-mono text-[8px] uppercase tracking-wider rounded-none transition-all flex items-center gap-0.5 font-bold"
                      >
                        Card 25: Idea Shopping <ArrowUpRight className="w-2 h-2" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleOpenCardModal("elevator-pitch")}
                        className="px-2 py-1 bg-white hover:bg-[#eae3d7]/30 border border-[#b59a7c] text-[#b59a7c] font-mono text-[8px] uppercase tracking-wider rounded-none transition-all flex items-center gap-0.5 font-bold"
                      >
                        Card 26: Elevator Pitch <ArrowUpRight className="w-2 h-2" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: ASK LEO AI CHAT */}
              {activeSubTab === "chat" && (
                <div className="border border-slate-200 bg-white shadow-sm flex flex-col justify-between h-[600px] max-w-4xl mx-auto">
                  {/* Header */}
                  <div className="border-b border-slate-100 bg-[#faf9f6] py-3.5 px-6 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                      <span className="font-heading font-bold text-xs uppercase tracking-wider text-slate-900">
                        LEO AI Sentinel Coach
                      </span>
                    </div>
                    <span className="text-[9px] font-mono text-slate-400 uppercase font-semibold">
                      State-Aware reasoning offline
                    </span>
                  </div>

                  {/* Messages list */}
                  <div className="flex-1 p-6 overflow-y-auto space-y-4 text-left" id="chatMessageListContainer">
                    {chatMessages.map((msg, idx) => (
                      <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[80%] p-4 text-xs font-sans leading-relaxed ${
                          msg.sender === "user"
                            ? "bg-slate-900 text-white rounded-none border border-slate-950"
                            : "bg-[#faf9f6] border border-slate-200 text-slate-800 rounded-none"
                        }`}>
                          {/* Sender Badge */}
                          <div className="flex justify-between items-center border-b pb-1 mb-1 opacity-70 text-[8px] font-mono uppercase">
                            <span>{msg.sender === "user" ? "YOU" : "LEO sentinel"}</span>
                            <span>{msg.timestamp}</span>
                          </div>
                          {/* Text formatted with markdown */}
                          <div className="prose prose-xs max-w-none text-xs font-sans whitespace-pre-line leading-relaxed">
                            {msg.text}
                          </div>
                        </div>
                      </div>
                    ))}
                    {chatIsTyping && (
                      <div className="flex justify-start">
                        <div className="bg-[#faf9f6] border border-slate-200 p-4 text-xs text-slate-400 font-mono rounded-none">
                          LEO IS COMPILING RESPONSE... <RotateCw className="w-3 h-3 inline-block animate-spin" />
                        </div>
                      </div>
                    )}
                    <div ref={chatBottomRef} />
                  </div>

                  {/* Input Form */}
                  <form onSubmit={handleSendChatMessage} className="border-t border-slate-100 p-4 flex gap-3">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Ask Leo about your business metrics, targets, or strategic cards (e.g., 'How is my business doing?')"
                      className="flex-1 bg-[#faf9f6] border border-slate-200 py-3 px-4 text-xs font-mono rounded-none focus:outline-none focus:border-[#b59a7c] text-slate-900"
                      disabled={chatIsTyping}
                      required
                    />
                    <button
                      type="submit"
                      disabled={chatIsTyping}
                      className="bg-slate-900 hover:bg-slate-800 disabled:bg-slate-200 text-white font-heading text-[10px] uppercase tracking-widest px-6 font-bold rounded-none transition-all flex items-center justify-center"
                    >
                      Send
                    </button>
                  </form>
                </div>
              )}

            </div>

          </div>
        )}

      </main>

      {/* CARD VIEW DETAILED MODAL */}
      {selectedCard && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-300 w-full max-w-lg p-6 rounded-none shadow-xl relative animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedCard(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header info */}
            <div className="border-b border-slate-100 pb-3 mb-4 text-left">
              <span className="text-[9px] font-mono text-slate-400 uppercase font-bold tracking-widest block">
                PHASE: {selectedCard.stage.toUpperCase()} | CARD {selectedCard.num}
              </span>
              <h2 className="text-xl font-heading text-slate-900 uppercase tracking-widest font-black mt-1">
                {selectedCard.title}
              </h2>
              <span className="text-[9px] font-mono bg-[#eae3d7]/50 text-[#5c5346] py-0.5 px-2 rounded-none inline-block mt-2">
                {selectedCard.category}
              </span>
            </div>

            {/* Content Details */}
            <div className="space-y-4 text-xs font-sans text-left">
              <div>
                <span className="text-[8px] font-mono text-slate-400 uppercase block mb-1">Card Focus Overview:</span>
                <p className="text-slate-700 leading-relaxed font-medium">{selectedCard.frontDesc}</p>
              </div>

              <div>
                <span className="text-[8px] font-mono text-slate-400 uppercase block mb-1">Strategic Objective:</span>
                <p className="text-slate-800 leading-relaxed font-semibold italic">{selectedCard.objective}</p>
              </div>

              <div>
                <span className="text-[8px] font-mono text-slate-400 uppercase block mb-2">Field Deployment Action Checklist:</span>
                <ul className="space-y-2.5">
                  {selectedCard.deployment.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-655 leading-normal">
                      <span className="w-4 h-4 border border-[#b59a7c] text-[#b59a7c] flex items-center justify-center font-mono text-[9px] font-bold shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Interactive Design Toolkit Sandbox */}
              {selectedCard.id === "culture-probe" && (
                <div className="mt-6 border-t border-slate-100 pt-4 space-y-4">
                  <span className="text-[9px] font-mono text-[#b59a7c] uppercase font-bold block">
                    Interactive Design Toolkit Sandbox: Culture Probe Logger
                  </span>
                  <p className="text-[11px] text-slate-500 font-sans leading-relaxed">
                    Simulate a live customer diary logging their moment-of-transaction emotional feedback.
                  </p>
                  <div className="bg-[#faf9f6] border border-slate-200 p-4 rounded-none space-y-3">
                    <div className="flex gap-2">
                      {["😐", "😊", "😢", "😠", "😮"].map((emo) => (
                        <button
                          key={emo}
                          type="button"
                          onClick={() => setModalProbeEmoji(emo)}
                          className={`w-8 h-8 rounded-none border text-sm flex items-center justify-center transition-all ${
                            modalProbeEmoji === emo 
                              ? "border-[#b59a7c] bg-[#eae3d7]/30 scale-105" 
                              : "border-slate-200 bg-white hover:border-slate-350"
                          }`}
                        >
                          {emo}
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="e.g. Paid morning coffee, queue was too slow..."
                        value={modalProbeNote}
                        onChange={(e) => setModalProbeNote(e.target.value)}
                        className="flex-1 bg-white border border-slate-200 px-3 py-1.5 text-xs font-mono rounded-none focus:outline-none focus:border-[#b59a7c] text-slate-900"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (!modalProbeNote.trim()) return;
                          const newLog = {
                            emoji: modalProbeEmoji,
                            note: modalProbeNote,
                            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })
                          };
                          setModalProbeHistory([newLog, ...modalProbeHistory].slice(0, 3));
                          setModalProbeNote("");
                        }}
                        className="bg-[#b59a7c] hover:bg-[#a3886b] text-white font-heading text-[9px] uppercase tracking-widest px-4 font-bold rounded-none"
                      >
                        Log Diary
                      </button>
                    </div>

                    {modalProbeHistory.length > 0 && (
                      <div className="space-y-1 bg-white border border-slate-150 p-2.5 max-h-24 overflow-y-auto">
                        <span className="text-[8px] font-mono text-slate-400 block uppercase">Moments History Log:</span>
                        {modalProbeHistory.map((item, idx) => (
                          <div key={idx} className="text-[10px] font-mono text-slate-655 flex justify-between">
                            <span>{item.emoji} {item.note}</span>
                            <span className="text-slate-400 text-[8px]">{item.time}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {selectedCard.id === "conversation-starters" && (
                <div className="mt-6 border-t border-slate-100 pt-4 space-y-4">
                  <span className="text-[9px] font-mono text-[#b59a7c] uppercase font-bold block">
                    Interactive Design Toolkit Sandbox: IDI Prompt Deck
                  </span>
                  <p className="text-[11px] text-slate-500 font-sans leading-relaxed">
                    Draw structural qualitative questions designed to unlock user storytelling rather than surface answers.
                  </p>
                  <div className="bg-[#faf9f6] border border-slate-200 p-4 rounded-none text-center space-y-4">
                    <div className="bg-white border border-slate-150 p-4 rounded-none min-h-[70px] flex items-center justify-center text-xs font-sans italic text-slate-700 leading-relaxed">
                      &ldquo;{modalCurrentPrompt}&rdquo;
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        let nextPrompt = modalCurrentPrompt;
                        while (nextPrompt === modalCurrentPrompt) {
                          const randomIdx = Math.floor(Math.random() * modalStarterPrompts.length);
                          nextPrompt = modalStarterPrompts[randomIdx];
                        }
                        setModalCurrentPrompt(nextPrompt);
                      }}
                      className="bg-[#b59a7c] hover:bg-[#a3886b] text-white font-heading text-[9px] uppercase tracking-widest py-2 px-6 font-bold rounded-none transition-all flex items-center gap-1 mx-auto"
                    >
                      Shuffle Prompt Card <RotateCw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {selectedCard.id === "behavior-engine" && (
                <div className="mt-6 border-t border-slate-100 pt-4 space-y-4">
                  <span className="text-[9px] font-mono text-[#b59a7c] uppercase font-bold block">
                    Interactive Design Toolkit Sandbox: Behavior Change Engine
                  </span>
                  <p className="text-[11px] text-slate-500 font-sans leading-relaxed">
                    Simulate core banking backend logic evaluating balances and triggering swept placements.
                  </p>
                  <div className="bg-[#faf9f6] border border-slate-200 p-4 rounded-none space-y-3 text-left">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[9px] font-mono text-slate-500 uppercase">Account Balance:</span>
                        <span className="text-xs font-mono font-bold text-slate-900">${modalEngineBalance} USD</span>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="200"
                        value={modalEngineBalance}
                        onChange={(e) => {
                          const val = parseInt(e.target.value) || 0;
                          setModalEngineBalance(val);
                          // recalculate
                          if (val <= 25 && modalEngineBills && modalEngineDayOfMonth >= 25) {
                            setModalEngineOutput({
                              trigger: "SHORT-TERM LENDING ENGINE",
                              lift: "25% Lift",
                              desc: "Predictive trigger matches cash-dip. Surfacing automated micro-loan offer with 3-click approval."
                            });
                          } else if (val > 100 && modalEngineDayOfMonth < 10) {
                            setModalEngineOutput({
                              trigger: "MONEY MARKET FUND (MMF)",
                              lift: "15% Lift",
                              desc: "User holds high idle balance in checking. Surfacing target MMF savings sweep option."
                            });
                          } else {
                            setModalEngineOutput({
                              trigger: "MONITOR & RETAIN",
                              lift: "Standard",
                              desc: "Standard tracking. Behavior pattern does not match cross-sell risk thresholds."
                            });
                          }
                        }}
                        className="w-full accent-[#b59a7c]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[9px] font-mono text-slate-500 uppercase">Day of Month:</span>
                          <span className="text-xs font-mono font-bold text-slate-900">{modalEngineDayOfMonth}th</span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="31"
                          value={modalEngineDayOfMonth}
                          onChange={(e) => {
                            const val = parseInt(e.target.value) || 0;
                            setModalEngineDayOfMonth(val);
                            // recalculate
                            if (modalEngineBalance <= 25 && modalEngineBills && val >= 25) {
                              setModalEngineOutput({
                                trigger: "SHORT-TERM LENDING ENGINE",
                                lift: "25% Lift",
                                desc: "Predictive trigger matches cash-dip. Surfacing automated micro-loan offer with 3-click approval."
                              });
                            } else if (modalEngineBalance > 100 && val < 10) {
                              setModalEngineOutput({
                                trigger: "MONEY MARKET FUND (MMF)",
                                lift: "15% Lift",
                                desc: "User holds high idle balance in checking. Surfacing target MMF savings sweep option."
                              });
                            } else {
                              setModalEngineOutput({
                                trigger: "MONITOR & RETAIN",
                                lift: "Standard",
                                desc: "Standard tracking. Behavior pattern does not match cross-sell risk thresholds."
                              });
                            }
                          }}
                          className="w-full accent-[#b59a7c]"
                        />
                      </div>

                      <div className="flex flex-col justify-center">
                        <span className="text-[9px] font-mono text-slate-500 block mb-1">Unpaid Utility Bills:</span>
                        <label className="inline-flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={modalEngineBills}
                            onChange={(e) => {
                              const val = e.target.checked;
                              setModalEngineBills(val);
                              // recalculate
                              if (modalEngineBalance <= 25 && val && modalEngineDayOfMonth >= 25) {
                                setModalEngineOutput({
                                  trigger: "SHORT-TERM LENDING ENGINE",
                                  lift: "25% Lift",
                                  desc: "Predictive trigger matches cash-dip. Surfacing automated micro-loan offer with 3-click approval."
                                });
                              } else if (modalEngineBalance > 100 && modalEngineDayOfMonth < 10) {
                                setModalEngineOutput({
                                  trigger: "MONEY MARKET FUND (MMF)",
                                  lift: "15% Lift",
                                  desc: "User holds high idle balance in checking. Surfacing target MMF savings sweep option."
                                });
                              } else {
                                setModalEngineOutput({
                                  trigger: "MONITOR & RETAIN",
                                  lift: "Standard",
                                  desc: "Standard tracking. Behavior pattern does not match cross-sell risk thresholds."
                                });
                              }
                            }}
                            className="rounded-none border-slate-200 text-[#b59a7c] focus:ring-0"
                          />
                          <span className="text-[10px] text-slate-655 font-mono uppercase font-bold">Unpaid Bills Exist</span>
                        </label>
                      </div>
                    </div>

                    <div className="bg-white border border-slate-150 p-2.5 text-[10px] font-mono leading-normal">
                      <div className="flex justify-between font-bold text-slate-800 border-b pb-1 mb-1">
                        <span>ENGINE ACTION:</span>
                        <span className="text-[#b59a7c]">{modalEngineOutput.lift}</span>
                      </div>
                      <span className="text-[#b59a7c] font-bold block">{modalEngineOutput.trigger}</span>
                      <p className="text-slate-500 mt-1">{modalEngineOutput.desc}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-slate-100 pt-4 mt-6 flex justify-end">
              <button
                onClick={() => setSelectedCard(null)}
                className="bg-slate-900 hover:bg-slate-800 text-white font-heading text-[10px] uppercase tracking-widest py-2 px-5 rounded-none font-bold"
              >
                Close Card Detail
              </button>
            </div>

          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white py-8 mt-16">
        <div className="w-full px-6 md:px-16 lg:px-24 flex flex-col md:flex-row items-center justify-between text-slate-400 text-[10px] font-mono tracking-widest uppercase font-bold gap-4">
          <span>Hustlers Institute © 2026</span>
          <span className="text-[#b59a7c]">Sovereign Business Health Sentinel</span>
          <span>Security Verified</span>
        </div>
      </footer>

    </div>
  );
}
