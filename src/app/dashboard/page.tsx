"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Check,
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
  Download,
  Layers
} from "lucide-react";
import { cardsList, CardData } from "@/components/DesignCardsExplorer";
import BrandName from "@/components/BrandName";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";

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
    name: "App or Software Business",
    acqLabel: "Weekly New Signups",
    acqUnit: "users",
    adpLabel: "Weekly Active Users Rate",
    adpUnit: "%",
    salesLabel: "Weekly Sales",
    salesUnit: "$",
    latLabel: "Website Loading Speed",
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
    name: "Physical Shop or Restaurant",
    acqLabel: "Weekly Shop Visitors",
    acqUnit: "visitors",
    adpLabel: "Repeat Customer Rate",
    adpUnit: "%",
    salesLabel: "Weekly Shop Sales",
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
    name: "Service or Consulting Business",
    acqLabel: "Weekly Inbound Leads",
    acqUnit: "leads",
    adpLabel: "Project Completion Rate",
    adpUnit: "%",
    salesLabel: "Weekly Client Bookings",
    salesUnit: "$",
    latLabel: "Client Project Waiting Time",
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
    name: "Online Store",
    acqLabel: "Weekly Website Visitors",
    acqUnit: "sessions",
    adpLabel: "Checkout Conversion Rate",
    adpUnit: "%",
    salesLabel: "Weekly Store Sales",
    salesUnit: "$",
    latLabel: "Average Page Load Speed",
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
    name: "Content Creator or Social Media",
    acqLabel: "Weekly Subscriber Growth",
    acqUnit: "subs",
    adpLabel: "Average Post Engagement Rate",
    adpUnit: "%",
    salesLabel: "Weekly Sponsor/Ad Sales",
    salesUnit: "$",
    latLabel: "Content Release Delay Time",
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

const wrapText = (text: string, maxChars: number): string[] => {
  const words = text.split(" ");
  const lines: string[] = [];
  let currentLine = "";

  words.forEach((word) => {
    if ((currentLine + " " + word).length > maxChars) {
      lines.push(currentLine.trim());
      currentLine = word;
    } else {
      currentLine += (currentLine ? " " : "") + word;
    }
  });
  if (currentLine) {
    lines.push(currentLine.trim());
  }
  return lines;
};

const handleDownloadPDF = (card: CardData) => {
  const title = card.title;
  const num = card.num;
  const stage = card.stage;
  const objective = card.objective;
  const deployment = card.deployment;

  const objectiveLines = wrapText(objective, 75);

  const escapePdfText = (t: string) => {
    return t.replace(/\\/g, "\\\\").replace(/[()]/g, "\\$&");
  };

  let stream = `BT\n`;
  stream += `/F1 20 Tf\n50 780 Td\n(SOVEREIGN MILLIONAIRES - DESIGN WORKBOOK) Tj\n`;
  stream += `/F2 10 Tf\n0 -22 Td\n(Phase: ${stage} | Tool #${num}: ${title}) Tj\n`;
  
  stream += `/F1 11 Tf\n0 -35 Td\n(OBJECTIVE:) Tj\n`;
  stream += `/F2 10 Tf\n`;
  objectiveLines.forEach((line) => {
    stream += `0 -15 Td\n(${escapePdfText(line)}) Tj\n`;
  });

  stream += `/F1 11 Tf\n0 -30 Td\n(FIELD DEPLOYMENT CHECKLIST:) Tj\n`;
  stream += `/F2 10 Tf\n`;
  deployment.forEach((step, idx) => {
    const wrappedStepLines = wrapText(step, 70);
    wrappedStepLines.forEach((line, lineIdx) => {
      const prefix = lineIdx === 0 ? `[ ] ${idx + 1}. ` : "       ";
      stream += `0 -16 Td\n(${escapePdfText(prefix + line)}) Tj\n`;
    });
  });

  stream += `/F1 11 Tf\n0 -35 Td\n(FIELD WORKSPACE LOG & SENSEMAKING:) Tj\n`;
  stream += `/F2 9 Tf\n`;
  stream += `0 -22 Td\n(Date: ________________________   Venture Name: ________________________) Tj\n`;
  stream += `0 -22 Td\n(Participant / Context Profile:) Tj\n`;
  stream += `0 -16 Td\n(____________________________________________________________________________________) Tj\n`;
  stream += `0 -22 Td\n(Key Observations & Notes:) Tj\n`;
  stream += `0 -16 Td\n(1. __________________________________________________________________________________) Tj\n`;
  stream += `0 -18 Td\n(2. __________________________________________________________________________________) Tj\n`;
  stream += `0 -18 Td\n(3. __________________________________________________________________________________) Tj\n`;
  stream += `0 -22 Td\n(Friction Points & Pains Observed:) Tj\n`;
  stream += `0 -16 Td\n(- __________________________________________________________________________________) Tj\n`;
  stream += `0 -16 Td\n(- __________________________________________________________________________________) Tj\n`;
  stream += `0 -22 Td\n(Actionable Opportunities & Venture Insights:) Tj\n`;
  stream += `0 -16 Td\n(- __________________________________________________________________________________) Tj\n`;
  stream += `0 -16 Td\n(- __________________________________________________________________________________) Tj\n`;
  stream += `ET\n`;

  stream += `
  2 w
  0 0 0 RG
  50 795 m 545 795 l S
  `;

  const streamBytes = new TextEncoder().encode(stream);
  const streamLen = streamBytes.length;

  const header = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>
endobj
4 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>
endobj
5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
6 0 obj
<< /Length ${streamLen} >>
stream
`;

  const footer = `\nendstream\nendobj\nxref\n0 7\n0000000000 65535 f \n0000000009 00000 n \n0000000058 00000 n \n0000000120 00000 n \n0000000257 00000 n \n0000000329 00000 n \n0000000396 00000 n \ntrailer\n<< /Size 7 /Root 1 0 R >>\nstartxref\n${400 + streamLen}\n%%EOF\n`;

  const encoder = new TextEncoder();
  const headerBytes = encoder.encode(header);
  const footerBytes = encoder.encode(footer);

  const pdfBytes = new Uint8Array(headerBytes.length + streamBytes.length + footerBytes.length);
  pdfBytes.set(headerBytes, 0);
  pdfBytes.set(streamBytes, headerBytes.length);
  pdfBytes.set(footerBytes, headerBytes.length + streamBytes.length);

  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${title.toLowerCase().replace(/\\s+/g, "_")}_template.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export default function Dashboard() {
  const [onboarded, setOnboarded] = useState<boolean>(false);
  const [isRefining, setIsRefining] = useState<boolean>(false);
  const [compilerLogs, setCompilerLogs] = useState<string[]>([]);
  
  // Learning Venture Sync States
  const [learningVentureName, setLearningVentureName] = useState<string>("");
  const [learningVentureIndustry, setLearningVentureIndustry] = useState<string>("");
  const [learningNicheSummary, setLearningNicheSummary] = useState<string>("");
  const [learningBoardroomReport, setLearningBoardroomReport] = useState<string>("");
  const [learningCardNotes, setLearningCardNotes] = useState<Record<string, string>>({});
  const [learningNicheFields, setLearningNicheFields] = useState<any>(null);
  const [synthesisPOVNeed, setSynthesisPOVNeed] = useState<string>("");
  const [synthesisPOVInsight, setSynthesisPOVInsight] = useState<string>("");
  const [synthesisHMW, setSynthesisHMW] = useState<string>("");
  const [synthesisCardThemes, setSynthesisCardThemes] = useState<Record<string, string>>({});
  const [synthesisGridPlacements, setSynthesisGridPlacements] = useState<Record<string, string>>({});

  // Workspace states
  const [workspaces, setWorkspaces] = useState<Array<{ id: string; name: string; category: string }>>([]);
  const [activeWorkspaceId, setActiveWorkspaceId] = useState<string>("");
  const [loggingInterval, setLoggingInterval] = useState<"daily" | "weekly">("weekly");

  // Onboarding Setup State
  const [businessName, setBusinessName] = useState<string>("");
  const [industry, setIndustry] = useState<string>("Lifestyle Services");
  const [category, setCategory] = useState<string>("tech");
  const [description, setDescription] = useState<string>(
    "A simple local app connecting gym bookings, healthy meal prep deliveries, and taxi rides under one brand name."
  );
  const [mission, setMission] = useState<string>(
    "Helping busy local people live active, healthy, and stress-free lives through simple daily apps."
  );
  const [goals, setGoals] = useState<string>(
    "1. Onboard 500 active fitness and food users this month.\n2. Keep customer service checkout wait times under 2 minutes.\n3. Achieve 80% customer return rates."
  );

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
  const [chatMessages, setChatMessages] = useState<Array<{ sender: "user" | "leo"; text: string; timestamp: string }>>([]);
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

  const [readinessScore, setReadinessScore] = useState<number | null>(null);
  const [readinessGrade, setReadinessGrade] = useState<string | null>(null);
  const [completedAssessments, setCompletedAssessments] = useState<Record<string, boolean>>({});
  
  const assessmentsDoneCount = useMemo(() => {
    return Object.keys(completedAssessments).filter(k => completedAssessments[k]).length;
  }, [completedAssessments]);

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
    const checkReadiness = () => {
      const m1 = parseInt(localStorage.getItem("hi_readiness_m1") || "18");
      const m2 = parseInt(localStorage.getItem("hi_readiness_m2") || "17");
      const m3 = parseInt(localStorage.getItem("hi_readiness_m3") || "16");
      const m4 = parseInt(localStorage.getItem("hi_readiness_m4") || "19");
      const m5 = parseInt(localStorage.getItem("hi_readiness_m5") || "18");
      const total = m1 + m2 + m3 + m4 + m5;
      setReadinessScore(total);
      
      let level = "ALMOST THERE";
      if (total >= 90) level = "READY TO LAUNCH (DISTINCTION)";
      else if (total >= 80) level = "READY FOR BUSINESS";
      setReadinessGrade(level);
    };

    const checkAssessments = () => {
      const saved = localStorage.getItem("hi_completed_assessments");
      if (saved) {
        try {
          setCompletedAssessments(JSON.parse(saved));
        } catch (e) {
          console.error("Error parsing completed assessments", e);
        }
      } else {
        setCompletedAssessments({});
      }
    };

    checkReadiness();
    checkAssessments();
    setChatMessages([
      {
        sender: "leo",
        text: "### LEO Coach\nWelcome to the LEO Coach chat! I have loaded your business goals, daily updates, and our simple guides.\n\nAsk me about your current **business health**, **goals**, **improvements**, or a specific **Guide Card** number!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    window.addEventListener("storage", checkReadiness);
    window.addEventListener("storage", checkAssessments);
    window.addEventListener("hi_readiness_update", checkReadiness);

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
    async function checkAuth() {
      try {
        const res = await fetch(`/api/auth/session?t=${Date.now()}`, { cache: "no-store" });
        const data = await res.json();
        if (!data.authenticated) {
          window.location.href = "/login";
          return;
        }
        if (!data.user.isOnboarded) {
          window.location.href = "/onboarding";
          return;
        }
        await loadSentinelData();
      } catch (e) {
        console.error("Auth verify failed", e);
        window.location.href = "/login";
      }
    }
    checkAuth();

    // Load Learning Niche Profile from localStorage
    const savedName = localStorage.getItem("hi_venture_name");
    const savedIndustry = localStorage.getItem("hi_venture_industry");
    const savedNicheDataStr = localStorage.getItem("hi_niche_ai_data");
    const savedCardNotesStr = localStorage.getItem("hi_card_notes");
    const savedNicheFieldsStr = localStorage.getItem("hi_niche_builder_fields");
    const savedSynthesisStr = localStorage.getItem("hi_synthesis_canvas");

    if (savedName) {
      setLearningVentureName(savedName);
      setLearningVentureIndustry(savedIndustry || "General lifestyle");
      if (savedNicheDataStr) {
        try {
          const parsed = JSON.parse(savedNicheDataStr);
          setLearningNicheSummary(parsed.nicheSummary || "");
          setLearningBoardroomReport(parsed.boardroomReport || "");
        } catch (e) {
          console.error("Error parsing hi_niche_ai_data", e);
        }
      }
      if (savedCardNotesStr) {
        try {
          setLearningCardNotes(JSON.parse(savedCardNotesStr));
        } catch (e) {
          console.error("Error parsing hi_card_notes", e);
        }
      }
      if (savedNicheFieldsStr) {
        try {
          setLearningNicheFields(JSON.parse(savedNicheFieldsStr));
        } catch (e) {
          console.error("Error parsing hi_niche_builder_fields", e);
        }
      }
      if (savedSynthesisStr) {
        try {
          const parsed = JSON.parse(savedSynthesisStr);
          setSynthesisPOVNeed(parsed.POVNeed || "");
          setSynthesisPOVInsight(parsed.POVInsight || "");
          setSynthesisHMW(parsed.HMW || "");
          setSynthesisCardThemes(parsed.cardThemes || {});
          setSynthesisGridPlacements(parsed.gridPlacements || {});
        } catch (e) {
          console.error("Error parsing hi_synthesis_canvas", e);
        }
      }
    }

    return () => {
      window.removeEventListener("storage", checkReadiness);
      window.removeEventListener("storage", checkAssessments);
      window.removeEventListener("hi_readiness_update", checkReadiness);
    };
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
      { text: "[INIT] Connecting to LEO Coach...", delay: 300 },
      { text: `[ANALYSIS] Classifying business area: Industry = '${industry}', Type = '${currentMode.name}'`, delay: 700 },
      { text: "[LEO-COACH] Reading business profile and description...", delay: 1100 },
      { text: "[LEO-COACH] Setting quarterly goals and targets...", delay: 1500 },
      { text: "[COMPILING] Generating target checklist:", delay: 1900 },
      { text: ` - New Customers Goal: ${currentMode.defaultTargets.acquisition} ${currentMode.acqUnit}`, delay: 2100 },
      { text: ` - Active Usage Goal: ${currentMode.defaultTargets.adoption}${currentMode.adpUnit}`, delay: 2300 },
      { text: ` - Sales Goal: $${currentMode.defaultTargets.sales}`, delay: 2505 },
      { text: ` - Waiting Time Limit: ${currentMode.defaultTargets.latency} ${currentMode.latUnit}`, delay: 2700 },
      { text: " - Complaints limit: Keep complaints low and resolve them fast", delay: 2900 },
      { text: "[REFINING] Setting up your updates dashboard...", delay: 3200 },
      { text: "[SUCCESS] All set! Your LEO Coach dashboard is online.", delay: 3600 }
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

  const handleSyncVentureProfile = () => {
    if (!learningVentureName) return;
    
    setBusinessName(learningVentureName);
    setIndustry(learningVentureIndustry);
    
    const matchedCat = (() => {
      const lInd = learningVentureIndustry.toLowerCase();
      if (lInd.includes("tech") || lInd.includes("software") || lInd.includes("app") || lInd.includes("analyst") || lInd.includes("data")) return "tech";
      if (lInd.includes("shop") || lInd.includes("restaurant") || lInd.includes("food") || lInd.includes("retail") || lInd.includes("streetwear") || lInd.includes("wood") || lInd.includes("furniture") || lInd.includes("printing") || lInd.includes("brand") || lInd.includes("promote") || lInd.includes("creative") || lInd.includes("design")) return "retail";
      if (lInd.includes("law") || lInd.includes("legal") || lInd.includes("account") || lInd.includes("consult") || lInd.includes("freelance") || lInd.includes("accounting") || lInd.includes("lawyer")) return "b2b";
      if (lInd.includes("online") || lInd.includes("store") || lInd.includes("e-commerce") || lInd.includes("digital") || lInd.includes("buying") || lInd.includes("commerce")) return "ecommerce";
      if (lInd.includes("creator") || lInd.includes("social") || lInd.includes("content") || lInd.includes("marketing") || lInd.includes("video") || lInd.includes("youtube") || lInd.includes("media")) return "creator";
      return "tech";
    })();
    setCategory(matchedCat);
    
    let finalDesc = learningNicheSummary;
    if (learningNicheFields) {
      finalDesc = `A venture addressing how ${learningNicheFields.whoAffected || "customers"} struggle with ${learningNicheFields.whatProblem || "daily services"} at ${learningNicheFields.whereHappening || "our neighborhood"} during ${learningNicheFields.whenHappening || "busy hours"}, caused by ${learningNicheFields.howHappening || "inefficient solutions"}.`;
    }
    setDescription(finalDesc);
    
    const finalMission = `Transitioning Gen Z gig workers and creators into proud lifestyle entrepreneurs via localized ${learningVentureIndustry.toLowerCase()} services under the ${learningVentureName} brand.`;
    setMission(finalMission);
    
    const activeCards = Object.keys(learningCardNotes);
    const finalGoals = `1. Complete real-world validation checklists.\n2. Address the 6 executive perspectives from the LEO Boardroom report.\n3. Leverage design insights from: ${activeCards.length > 0 ? activeCards.map(c => c.toUpperCase()).join(", ") : "Customer Chats & Daily Diaries"}.`;
    setGoals(finalGoals);
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

    // Module 1 Check: Customer growth (Acquisition below target OR low sentiment)
    if (latestLog.acquisition < aiTargets.acquisition || latestLog.sentiment < 80) {
      let problem = "";
      let useCase = "";
      if (category === "tech") {
        problem = `You're getting fewer sign-ups than targeted (${latestLog.acquisition}/${aiTargets.acquisition}). Customers might find the registration or payment steps too confusing.`;
        useCase = "Check where customers stop signing up. Make the form fields shorter and verify if checkout steps are working properly.";
      } else if (category === "retail") {
        problem = `You have fewer visitors than expected (${latestLog.acquisition}/${aiTargets.acquisition}). The entrance or front desk might feel too crowded.`;
        useCase = "Check the waiting lines at the door. Put up clear welcome signs or a self-check-in tablet to make booking faster.";
      } else {
        problem = `Your customer sign-ups (${latestLog.acquisition}/${aiTargets.acquisition}) are lower than needed to grow.`;
        useCase = "Look at how clients sign up. Remove any complicated paperwork that makes them leave.";
      }

      issues.push({
        moduleNum: 1,
        moduleTitle: "Module 1: Finding Customers & Sign-ups",
        status: "critical",
        diagnostic: problem,
        cards: ["interviews", "empathy-map"],
        useCase: useCase
      });
    } else {
      issues.push({
        moduleNum: 1,
        moduleTitle: "Module 1: Finding Customers & Sign-ups",
        status: "secure",
        diagnostic: "Customer sign-ups are on track. Registration is running smoothly.",
        cards: ["interviews", "empathy-map"],
        useCase: "Keep checking customer feelings during promotions to ensure signing up remains quick."
      });
    }

    // Module 2 Check: Retention (Adoption below target)
    if (latestLog.adoption < aiTargets.adoption) {
      let problem = "";
      let useCase = "";
      const periodAdj = loggingInterval === "daily" ? "Daily" : "Weekly";
      if (category === "tech") {
        problem = `${periodAdj} customer activity is at ${latestLog.adoption}% (goal is ${aiTargets.adoption}%). Customers are not returning as often as hoped.`;
        useCase = "Send helpful tips or guides to users who haven't used the service again within 5 days.";
      } else if (category === "retail") {
        problem = `Repeat customer rate is at ${latestLog.adoption}% (goal is ${aiTargets.adoption}%). Customers are leaving after their first visit.`;
        useCase = "Send a quick follow-up message offering a discount or incentive for their next booking.";
      } else {
        problem = `Customer return rate is at ${latestLog.adoption}%, which is lower than target.`;
        useCase = "Ask a few regular clients to keep a simple diary of their experience to see where they get frustrated.";
      }

      issues.push({
        moduleNum: 2,
        moduleTitle: "Module 2: Keeping Customers Happy & Active",
        status: "warning",
        diagnostic: problem,
        cards: ["culture-probe", "themes"],
        useCase: useCase
      });
    } else {
      issues.push({
        moduleNum: 2,
        moduleTitle: "Module 2: Keeping Customers Happy & Active",
        status: "secure",
        diagnostic: "Customer retention is high. Your service is very sticky.",
        cards: ["culture-probe", "themes"],
        useCase: "Keep using daily diaries or questionnaires to check shifting habits before competitors adapt."
      });
    }

    // Module 3 Check: Operations (Latency exceeds target ceiling)
    if (latestLog.latency > aiTargets.latency) {
      let problem = "";
      let useCase = "";
      if (category === "tech") {
        problem = `Your website loads slowly at ${latestLog.latency}ms, which is slower than the ${aiTargets.latency}ms limit.`;
        useCase = "Ask your developer to optimize database queries and set up caching to load pages faster.";
      } else if (category === "retail") {
        problem = `Customers are waiting for ${latestLog.latency} minutes, which is longer than the ${aiTargets.latency}-minute target.`;
        useCase = "Talk with your kitchen and front-desk staff. See where order handovers get delayed.";
      } else {
        problem = `Delivery time is ${latestLog.latency}, which is slower than the target limit of ${aiTargets.latency}.`;
        useCase = "Map out how work passes from one team member to another. Remove double checks that slow things down.";
      }

      issues.push({
        moduleNum: 3,
        moduleTitle: "Module 3: Speeding Up Your Service & Operations",
        status: "critical",
        diagnostic: problem,
        cards: ["system-map", "workshops"],
        useCase: useCase
      });
    } else {
      issues.push({
        moduleNum: 3,
        moduleTitle: "Module 3: Speeding Up Your Service & Operations",
        status: "secure",
        diagnostic: "Service speed is excellent and meets your target limits.",
        cards: ["system-map", "workshops"],
        useCase: "Sync with your kitchen or tech lead to optimize workflow speeds and reduce delays further."
      });
    }

    // Module 4 Check: Monetization (Sales below target)
    if (latestLog.sales < aiTargets.sales) {
      let problem = "";
      let useCase = "";
      const periodAdjective = loggingInterval === "daily" ? "Daily" : "Weekly";
      if (category === "tech") {
        problem = `${periodAdjective} sales are at $${latestLog.sales} (goal is $${aiTargets.sales}). Sales are lower than needed to keep the business healthy.`;
        useCase = "Try offering different pricing options (like Bronze, Silver, Gold tiers) to see what price your customers are happy to pay.";
      } else if (category === "retail") {
        problem = `${periodAdjective} store sales are at $${latestLog.sales} (goal is $${aiTargets.sales}). Customers are buying low-value items.`;
        useCase = "Teach your staff to suggest friendly add-ons (like special coffee blends) when customers pay.";
      } else {
        problem = `${periodAdjective} sales are at $${latestLog.sales} (goal is $${aiTargets.sales}).`;
        useCase = "Combine extra services into a simple package and offer it to current clients.";
      }

      issues.push({
        moduleNum: 4,
        moduleTitle: "Module 4: Making Money & Setting the Right Price",
        status: "warning",
        diagnostic: problem,
        cards: ["idea-shopping", "elevator-pitch"],
        useCase: useCase
      });
    } else {
      issues.push({
        moduleNum: 4,
        moduleTitle: "Module 4: Making Money & Setting the Right Price",
        status: "secure",
        diagnostic: "Sales are strong and exceed your target goals.",
        cards: ["idea-shopping", "elevator-pitch"],
        useCase: "Keep testing new add-on services using the Feature Store method to offer more value to customers."
      });
    }

    // Module 5 Check: Launching & Growing
    if (latestLog.sentiment < 85 || latestLog.acquisition < aiTargets.acquisition * 0.9) {
      let problem = "";
      let useCase = "";
      if (category === "tech") {
        problem = `Your launch referral loop is underperforming. New customer intake is low and customer happiness is at ${latestLog.sentiment}%.`;
        useCase = "Promote a referral bonus program. Add a 1-tap sharing button to booking confirmations and offer a signup credit.";
      } else if (category === "retail") {
        problem = `Offline partner outreach is slow. Foot traffic (${latestLog.acquisition}) is under target.`;
        useCase = "Partner with nearby shops to set up partnership flyers with custom QR codes on their reception counters.";
      } else {
        problem = `Growth loops are not firing yet. Customer retention or referral rates are low.`;
        useCase = "Track your Active Users and customer signup costs weekly. Set up micro-influencer discount codes.";
      }

      issues.push({
        moduleNum: 5,
        moduleTitle: "Module 5: Launching & Growing",
        status: "warning",
        diagnostic: problem,
        cards: ["behavior-engine", "stakeholder-maps"],
        useCase: useCase
      });
    } else {
      issues.push({
        moduleNum: 5,
        moduleTitle: "Module 5: Launching & Growing",
        status: "secure",
        diagnostic: "Growth and local partnerships are stable. Launch campaigns are performing well.",
        cards: ["behavior-engine", "stakeholder-maps"],
        useCase: "Expand your QR flyer coverage to secondary local business partners and launch a staff rewards program."
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
    
    let playbookText = `=== SOVEREIGN MILLIONAIRES BUSINESS PLAYBOOK ===\n`;
    playbookText += `Business: ${businessName}\n`;
    playbookText += `Date Generated: ${new Date().toLocaleDateString()}\n`;
    playbookText += `Total Duration: ${workshopDuration} minutes\n`;
    playbookText += `----------------------------------------\n\n`;
    
    workshopPlaylist.forEach((item, idx) => {
      playbookText += `${idx + 1}. Card ${item.card.num}: ${item.card.title} [${item.duration} mins]\n`;
      playbookText += `   Phase: ${item.card.stage} | Focus: ${item.card.category}\n`;
      playbookText += `   Goal: ${item.card.objective}\n`;
      playbookText += `   Steps to Take:\n`;
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
          responseText = `Hello! I am LEO, your business coach. I've checked the files, but no updates have been recorded yet for "${businessName || "My Business"}". Please go to the "Log Your Progress" tab, enter your current numbers, and I'll compile a helpful review right away!`;
        } else {
          const latest = logHistory[logHistory.length - 1];
          const targetAcq = aiTargets?.acquisition || 500;
          const targetSales = aiTargets?.sales || 10000;
          const targetLatency = aiTargets?.latency || 200;
          const health = latest.computedHealth;
          
          let statusComment = "";
          if (health >= 85) {
            statusComment = "Your business health is **EXCELLENT**. You have great customer numbers, healthy sales, and smooth operations.";
          } else if (health >= 70) {
            statusComment = "Your business health is **STABLE** but has room to grow. We found a few areas that could use simple improvements.";
          } else {
            statusComment = "Your business health is **CRITICAL**. High waiting times or low customer numbers are threatening your growth.";
          }

          responseText = `### LEO COACH REPORT: BUSINESS HEALTH REVIEW
I have compiled the latest updates for **${businessName || "My Business"}** (${currentMode.name}):

*   **Period**: ${periodLabel} ${latest.period ?? latest.week}
*   **Business Health Score**: **${health}/100**: *${statusComment}*
*   **New Customers**: ${latest.acquisition} vs Goal ${targetAcq} (${Math.round((latest.acquisition / targetAcq) * 100)}%)
*   **Active Customer Rate**: ${latest.adoption}% vs Goal ${aiTargets?.adoption || 80}%
*   **Sales**: $${latest.sales} vs Goal $${targetSales}
*   **Waiting Time / Speed**: ${latest.latency}${currentMode.latUnit} vs Goal Limit ${targetLatency}${currentMode.latUnit}

**LEO Coach Suggestion:**
${health < 80 ? "Your current bottleneck lies in service speed and finding customers. I recommend checking out **Card 03 (Daily Diaries)** to understand customer frustrations, or using a **How Things Work Map (Card 11)** to trace operational delays." : "All goals are on track! Focus on raising your prices or launching new add-on services by checking out **Feature Store (Card 25)**."} Let me know if you would like me to explain any card!`;
        }
      } else if (promptLower.includes("target") || promptLower.includes("goal") || promptLower.includes("mission") || promptLower.includes("quarterly") || promptLower.includes("calibrated")) {
        responseText = `### LEO COACH REPORT: BUSINESS GOALS ALIGNMENT
Here is a list of targets for **${businessName}** based on your business mission:
*"${mission || "No mission statement defined."}"*

**Your Main Goals:**
${goals ? goals.split("\n").map(line => `*   ${line}`).join("\n") : "*No quarterly goals logged.*"}

**LEO-Calibrated Targets:**
*   **New Customers Target**: ${aiTargets?.acquisition || 500} ${currentMode.acqUnit} per ${periodLabel.toLowerCase()}
*   **Active Customer Target**: ${aiTargets?.adoption || 80}% active usage
*   **Sales Target**: $${aiTargets?.sales || 10000} per period
*   **Service Speed Target**: <= ${aiTargets?.latency || 200} ${currentMode.latUnit} average waiting time

These targets help us calculate your Business Health Score and guide you with tips.`;
      } else if (promptLower.includes("card") || promptLower.includes("toolkit") || promptLower.includes("method") || promptLower.includes("tool") || promptLower.includes("design thinking")) {
        const match = promptLower.match(/(?:card\s*|#)(\d+)/);
        if (match) {
          const numStr = match[1].padStart(2, "0");
          const found = cardsList.find(c => c.num === numStr);
          if (found) {
            responseText = `### GUIDE FOCUS: CARD ${found.num}: ${found.title.toUpperCase()}
Here is the blueprint for **Card ${found.num}: ${found.title}** (${found.stage} Phase):

*   **Focus Area**: *${found.category}*
*   **Objective**: ${found.objective}
*   **Description**: ${found.frontDesc}

**Steps to Take:**
${found.deployment.map((step, i) => `${i + 1}. **${step}**`).join("\n")}

You can try this card visually inside the **Business Guide Card Toolkit** tab.`;
          } else {
            responseText = `I searched the database, but card number **${match[1]}** does not exist. We support cards from 01 to 44. Try asking *"Explain Card 03"* or *"Explain Card 12"*.`;
          }
        } else {
          responseText = `### LEO COACH REPORT: GUIDE CARDS TOOLKIT
The Sovereign Millionaires curriculum has **44 Business Guide Cards** divided into four simple stages:
1.  **Research** (Cards 01 to 08): Gathering facts, talking to customers, and keeping diaries.
2.  **Synthesis** (Cards 09 to 18): Finding patterns, prioritizing ideas, and mapping structures.
3.  **Ideation** (Cards 19 to 27): Brainstorming features, practicing pitches, and setting budgets.
4.  **Prototyping** (Cards 28 to 44): Running workshops, role-playing, and testing smart action engines.

Ask me about a card number (like *"Explain Card 03"*) or topic and I'll show you how to use it!`;
        }
      } else if (promptLower.includes("module 1") || promptLower.includes("module one") || promptLower.includes("friction")) {
        responseText = `### MODULE 1 RECAP: FINDING CUSTOMERS & SIGN-UPS
Module 1 helps you find customers and get them to sign up without getting stuck. If your signup numbers are low, it means your sign-up or payment pages are too confusing.

*   **Key Metric to Watch**: Customer Sign-ups
*   **Top Guide Cards**: **Card 01: Customer Chats** & **Card 12: Customer Feelings Map**
*   **Goal**: Simplify payment options and remove extra questions from your forms.`;
      } else if (promptLower.includes("module 2") || promptLower.includes("module two") || promptLower.includes("stickiness") || promptLower.includes("retention")) {
        responseText = `### MODULE 2 RECAP: KEEPING CUSTOMERS HAPPY & ACTIVE
Module 2 is all about keeping customers active. Getting sign-ups is only the first step, and we want users to return to our product regularly.

*   **Key Metric to Watch**: Active Customer Rate
*   **Top Guide Cards**: **Card 03: Daily Diaries** & **Card 17: Finding Patterns**
*   **Goal**: Use logs and diaries to see where returning customers get frustrated.`;
      } else if (promptLower.includes("module 3") || promptLower.includes("module three") || promptLower.includes("latency") || promptLower.includes("operations")) {
        responseText = `### MODULE 3 RECAP: SPEEDING UP YOUR SERVICE & OPERATIONS
Module 3 is about service speed. When pages load slowly or customers wait in line too long, you lose their interest.

*   **Key Metric to Watch**: Average Service Time
*   **Top Guide Cards**: **Card 11: How Things Work Map** & **Card 30: Team Sprints**
*   **Goal**: Speed up technical systems and make team handovers faster.`;
      } else if (promptLower.includes("module 4") || promptLower.includes("module four") || promptLower.includes("sales") || promptLower.includes("monetization")) {
        responseText = `### MODULE 4 RECAP: MAKING MONEY & PRICING
Module 4 focuses on making your business profitable. If your weekly sales are low, it's time to test different prices and tiers.

*   **Key Metric to Watch**: Period Sales
*   **Top Guide Cards**: **Card 25: Feature Store** & **Card 26: 30-Second Pitch**
*   **Goal**: Try packaging your services in different options (Bronze/Silver/Gold) to find what works.`;
      } else if (promptLower.includes("module 5") || promptLower.includes("module five") || promptLower.includes("growth") || promptLower.includes("referral") || promptLower.includes("partnership")) {
        responseText = `### MODULE 5 RECAP: LAUNCHING & GROWING
Module 5 guides you to promote your business and partner with local businesses to grow your customer base.

*   **Key Metric to Watch**: Customer Acquisition Cost & Active Users
*   **Top Guide Cards**: **Card 43: Behavior Change Engine** & **Card 07: Stakeholder Maps**
*   **Goal**: Use flyers with QR codes and launch WhatsApp referral share buttons.`;
      } else {
        responseText = `### LEO COACH ADVISORY
Hello! I am LEO, your business coach. I look at your business numbers, check for gaps, and suggest simple guide cards to help you grow.

How can I help you grow **${businessName || "your business"}** today? 
*   Ask me *"How is my business doing?"* to get a health review.
*   Ask *"Explain Card 12"* to read a card guide.
*   Ask *"Summarize Module 5"* to learn about launching and growth.`;
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
    health: { label: "Business Health", color: "#000000", strokeWidth: "3.5" },
    acquisition: { label: "New Customers", color: "#3b82f6", strokeWidth: "1.5" },
    adoption: { label: "Customer Return Rate", color: "#10b981", strokeWidth: "1.5" },
    sales: { label: "Sales", color: "#059669", strokeWidth: "1.5" },
    latency: { label: "Waiting Time", color: "#ef4444", strokeWidth: "1.5" },
    sentiment: { label: "Customer Happiness", color: "#8b5cf6", strokeWidth: "1.5" },
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
          <RotateCw className="w-6 h-6 text-[#000000] animate-spin" />
          <span>LOADING YOUR BUSINESS DASHBOARD...</span>
        </div>
      </div>
    );
  }

  if (assessmentsDoneCount < 5) {
    return (
      <div className="min-h-screen bg-[#faf9f6] text-slate-800 font-sans antialiased flex flex-col justify-between">
        {/* STATUS BAR PROMO */}
        <div className="w-full bg-[#eae3d7] text-[#5c5346] py-2.5 px-6 text-center text-xs tracking-widest uppercase font-mono font-bold flex items-center justify-center gap-6 border-b border-slate-200">
          <span>LEO BUSINESS COACH & DASHBOARD</span>
          <span className="text-[#c7baa4] select-none">•</span>
          <span>STATUS: LOCKED</span>
          <span className="text-[#c7baa4] select-none">•</span>
          <span>VERSION 2.5 (MULTI-MODULE INTERACTION)</span>
        </div>

        {/* HEADER / NAVIGATION */}
        <Header />

        {/* MAIN BODY LOCK SCREEN */}
        <main className="flex-1 flex items-center justify-center py-16 px-4">
          <div className="bg-white border border-slate-200 p-8 md:p-12 max-w-lg w-full shadow-sm rounded-none text-center space-y-6">
            <div className="w-16 h-16 bg-[#faf9f6] border border-[#000000]/25 text-[#000000] flex items-center justify-center mx-auto rounded-none">
              <Lock className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <span className="text-xs uppercase font-bold tracking-widest text-slate-500 font-mono block">
                PLATFORM ACCESS RESTRICTED
              </span>
              <h2 className="text-xl md:text-2xl font-heading text-slate-950 uppercase tracking-widest font-bold">
                Complete Your Course
              </h2>
              <p className="text-slate-500 text-xs leading-relaxed font-sans max-w-sm mx-auto">
                The business tracking dashboard, LEO targets calibration, and log database are available only after graduating the <BrandName /> 5-phase course.
              </p>
            </div>

            {/* Progress Checklist */}
            <div className="border-t border-b border-slate-100 py-6 text-left space-y-3 font-sans">
              <span className="text-xs font-mono text-slate-400 uppercase font-black tracking-widest block mb-2">
                Course Progress ({assessmentsDoneCount} / 5 Phases Completed)
              </span>
              {[
                { id: "phase-1", name: "Phase 1: Finding Your Niche & Launching Your Brand" },
                { id: "phase-2", name: "Phase 2: Customer Needs & Habits" },
                { id: "phase-3", name: "Phase 3: Simple App & Tech Setup" },
                { id: "phase-4", name: "Phase 4: Making Money & Contracts" },
                { id: "phase-5", name: "Phase 5: Launching & Growing" }
              ].map((phase) => {
                const isCompleted = completedAssessments[phase.id];
                return (
                  <div key={phase.id} className="flex justify-between items-center text-xs border-b border-slate-50 pb-1.5 last:border-0 last:pb-0">
                    <span className={`font-semibold leading-relaxed ${isCompleted ? "text-slate-800" : "text-slate-400"}`}>
                      {phase.name}
                    </span>
                    <span className="font-mono text-xs uppercase font-bold shrink-0 pl-4">
                      {isCompleted ? (
                        <span className="text-slate-900 flex items-center gap-1">Done <Check className="w-3.5 h-3.5 text-slate-900" /></span>
                      ) : (
                        <span className="text-slate-350 flex items-center gap-1">Locked <Lock className="w-3 h-3 text-slate-300" /></span>
                      )}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="pt-2">
              <Link
                href="/learn"
                className="w-full inline-block bg-[#000000] hover:bg-[#1a1a1a] text-white font-heading text-xs uppercase tracking-widest font-bold py-4 text-center rounded-none shadow-sm transition-all h-12"
              >
                Go to Learning Portal & Complete Phase {assessmentsDoneCount + 1}
              </Link>
            </div>
          </div>
        </main>

        {/* FOOTER */}
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9f6] text-slate-800 font-sans antialiased flex flex-col justify-between">
      
      {/* STATUS BAR PROMO */}
      <div className="w-full bg-[#eae3d7] text-[#5c5346] py-2.5 px-6 text-center text-xs tracking-widest uppercase font-mono font-bold flex items-center justify-center gap-6 border-b border-slate-200">
        <span>LEO BUSINESS COACH & DASHBOARD</span>
        <span className="text-[#c7baa4] select-none">•</span>
        <span>STATUS: ACTIVE</span>
        <span className="text-[#c7baa4] select-none">•</span>
        <span>VERSION 2.5 (MULTI-MODULE INTERACTION)</span>
      </div>

      {/* HEADER / NAVIGATION */}
      <Header />

      {/* MAIN LAYOUT */}
      <main className="flex-1 w-full max-w-[1600px] mx-auto flex flex-col md:flex-row gap-8 py-8 px-4 md:px-16 lg:px-24">
        
        {/* SETUP WIZARD (ONBOARDING SCREEN - Renders full-width if not onboarded) */}
        {!onboarded && (
          <div className="w-full max-w-3xl mx-auto bg-white border border-slate-200 p-8 md:p-12 shadow-sm rounded-none">
            <div className="mb-8 border-b border-slate-100 pb-4">
              <h2 className="text-lg font-heading text-[#000000] tracking-widest font-bold flex items-center gap-2">
                <Sparkles className="w-5 h-5" /> Business Setup & LEO Alignment
              </h2>
              <p className="text-xs text-slate-400 font-mono uppercase mt-1">
                Enter details about your business to help LEO set goals
              </p>
            </div>

            {learningVentureName && (
              <div className="bg-[#faf9f6] border border-[#000000] p-4 mb-6 rounded-none flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-left">
                <div className="space-y-1">
                  <span className="text-xs uppercase font-bold tracking-widest text-[#000000] font-mono block">
                    🎓 Found Active Venture Profile from Learning Portal
                  </span>
                  <h4 className="font-heading text-xs uppercase font-extrabold text-slate-950 tracking-wide">
                    {learningVentureName} ({learningVentureIndustry})
                  </h4>
                  <p className="text-sm text-slate-500 font-sans leading-normal">
                    {learningNicheSummary || "Venture profile is ready to sync and connect to this dashboard."}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="xs"
                  onClick={handleSyncVentureProfile}
                  className="text-xs font-sans font-black uppercase tracking-widest border-[#000000] text-[#000000] hover:bg-[#000000] hover:text-white rounded-none cursor-pointer h-8 shrink-0 self-stretch sm:self-auto text-center"
                >
                  Sync Profile Fields
                </Button>
              </div>
            )}

            <div className="space-y-6">
              
              {/* Grid 1: Business Profile */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="block text-xs font-bold text-slate-400 uppercase tracking-widest font-mono mb-2">
                    Business Name
                  </Label>
                  <Input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. Your business name"
                    className="w-full bg-[#faf9f6] border border-slate-200 py-3 px-4 text-xs font-mono rounded-none focus:outline-none focus:border-[#000000] placeholder:text-slate-400"
                  />
                </div>
                <div>
                  <Label className="block text-xs font-bold text-slate-400 uppercase tracking-widest font-mono mb-2">
                    Industry
                  </Label>
                  <Input
                    type="text"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    placeholder="e.g. Lifestyle Services, Fitness, Cafe"
                    className="w-full bg-[#faf9f6] border border-slate-200 py-3 px-4 text-xs font-mono rounded-none focus:outline-none focus:border-[#000000]"
                  />
                </div>
              </div>

              {/* Business Category Selection */}
              <div>
                <Label className="block text-xs font-bold text-slate-400 uppercase tracking-widest font-mono mb-3">
                  Select Business Category
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                  {Object.values(BUSINESS_MODES).map((mode) => (
                    <Button
                      key={mode.id}
                      variant={category === mode.id ? "default" : "outline"}
                      onClick={() => setCategory(mode.id)}
                      className={`p-4 border text-left rounded-none transition-all flex flex-col justify-between h-32 items-start text-wrap uppercase w-full font-sans cursor-pointer ${
                        category === mode.id
                          ? "border-[#000000] bg-[#eae3d7]/20 text-[#000000] hover:bg-[#eae3d7]/30"
                          : "border-slate-200 bg-[#faf9f6] text-slate-650 hover:border-slate-350 hover:bg-slate-50"
                      }`}
                    >
                      <span className="text-xs font-sans font-black tracking-widest block uppercase leading-snug">
                        {mode.name.split(" (")[0]}
                      </span>
                      <span className="text-xs font-mono text-slate-400 block mt-2 leading-tight lowercase">
                        Unit: {mode.acqLabel.split(" ").slice(-1)[0]}
                      </span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Logging Interval Selection */}
              <div>
                <Label className="block text-xs font-bold text-slate-400 uppercase tracking-widest font-mono mb-2">
                  How often will you enter data?
                </Label>
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant={loggingInterval === "daily" ? "default" : "outline"}
                    onClick={() => setLoggingInterval("daily")}
                    className={`flex-1 py-3 border text-center font-sans text-xs uppercase tracking-widest font-bold rounded-none transition-all cursor-pointer h-10 ${
                      loggingInterval === "daily"
                        ? "border-[#000000] bg-[#eae3d7]/20 text-[#000000] hover:bg-[#eae3d7]/30"
                        : "border-slate-200 bg-[#faf9f6] text-slate-500 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    Daily Progress
                  </Button>
                  <Button
                    type="button"
                    variant={loggingInterval === "weekly" ? "default" : "outline"}
                    onClick={() => setLoggingInterval("weekly")}
                    className={`flex-1 py-3 border text-center font-sans text-xs uppercase tracking-widest font-bold rounded-none transition-all cursor-pointer h-10 ${
                      loggingInterval === "weekly"
                        ? "border-[#000000] bg-[#eae3d7]/20 text-[#000000] hover:bg-[#eae3d7]/30"
                        : "border-slate-200 bg-[#faf9f6] text-slate-500 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    Weekly Progress
                  </Button>
                </div>
                <p className="text-xs text-slate-400 font-sans mt-1.5 leading-normal">
                  Choose whether you want to track your progress day by day (e.g., Day 1, Day 2) or week by week (e.g., Week 1, Week 2).
                </p>
              </div>

              {/* Description */}
              <div>
                <Label className="block text-xs font-bold text-slate-400 uppercase tracking-widest font-mono mb-2">
                  Business Description
                </Label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full bg-[#faf9f6] border border-slate-200 py-3 px-4 text-xs font-mono rounded-none focus:outline-none focus:border-[#000000]"
                  placeholder="Explain what your business does and what you sell..."
                />
              </div>

              {/* Mission Statement */}
              <div>
                <Label className="block text-xs font-bold text-slate-400 uppercase tracking-widest font-mono mb-2">
                  Business Mission Statement
                </Label>
                <Textarea
                  value={mission}
                  onChange={(e) => setMission(e.target.value)}
                  rows={2}
                  className="w-full bg-[#faf9f6] border border-slate-200 py-3 px-4 text-xs font-mono rounded-none focus:outline-none focus:border-[#000000]"
                  placeholder="What is your main goal and what drives you..."
                />
              </div>

              {/* Quarterly Goals */}
              <div>
                <Label className="block text-xs font-bold text-slate-400 uppercase tracking-widest font-mono mb-2">
                  Quarterly Goals
                </Label>
                <Textarea
                  value={goals}
                  onChange={(e) => setGoals(e.target.value)}
                  rows={3}
                  className="w-full bg-[#faf9f6] border border-slate-200 py-3 px-4 text-xs font-mono rounded-none focus:outline-none focus:border-[#000000]"
                  placeholder="List the main things you want to achieve this quarter..."
                />
              </div>

              {/* COMPILER WIDGET OR SUBMIT */}
              {isRefining ? (
                <div className="bg-slate-900 border border-slate-800 text-green-400 p-5 rounded-none font-mono text-xs space-y-1 select-none text-left">
                  {compilerLogs.map((log, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-slate-500">{`>`}</span>
                      <span>{log}</span>
                    </div>
                  ))}
                  <div className="w-2.5 h-4 bg-green-400 animate-pulse inline-block mt-2"></div>
                </div>
              ) : (
                <Button
                  onClick={runCompilerSimulation}
                  disabled={!businessName || !industry || !description || !mission}
                  className="w-full bg-[#000000] hover:bg-[#1a1a1a] disabled:bg-slate-200 disabled:text-slate-400 text-white font-sans text-xs uppercase tracking-widest py-4 text-center rounded-none font-bold shadow-sm transition-all h-12 cursor-pointer"
                >
                  Align with LEO & Set Goals
                </Button>
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
                    Millionaires Hub
                  </h3>
                  <p className="text-xs font-mono text-slate-400 uppercase mt-0.5">
                    <BrandName className="text-xs font-mono" /> Dashboard
                  </p>
                </div>
 
                {/* Sidebar Navigation anchors */}
                <nav className="flex flex-col gap-1 text-left">
                  {[
                    { id: "operations", label: "Business Activity", icon: Activity },
                    { id: "venture", label: "Learning Niche Log", icon: Sparkles },
                    { id: "toolkit", label: "Design Toolkit Explorer", icon: Layers },
                    { id: "workshop", label: "Workshop Builder", icon: Briefcase },
                    { id: "recaps", label: "Module Recaps & Tips", icon: FileText },
                    { id: "chat", label: "Ask LEO", icon: MessageSquare }
                  ].map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeSubTab === tab.id;
                    
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveSubTab(tab.id)}
                        className={`flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-wider font-sans font-bold transition-all border-l-2 ${
                          isActive 
                            ? "border-[#000000] bg-[#eae3d7]/20 text-[#000000]" 
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
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Active Space
                  </span>
                  <span className="text-xs font-bold text-slate-800 block truncate">
                    {businessName}
                  </span>
                  <span className="px-1.5 py-0.5 bg-[#eae3d7] text-[#5c5346] text-xs font-bold rounded-none uppercase tracking-wider mt-1.5 inline-block">
                    {currentMode.name.split(" (")[0]}
                  </span>
                  <span className="text-xs text-slate-400 uppercase block font-semibold mt-1">
                    {periodLabel}ly Logs
                  </span>
                </div>

                {/* Synced Readiness Score/Grade Badge */}
                <div className="bg-[#faf9f6] p-4 border border-slate-150 text-left font-sans">
                  <span className="text-xs uppercase font-bold text-slate-500 font-mono tracking-widest block mb-1">
                    Business Readiness Grade
                  </span>
                  <div className="flex flex-col gap-1.5 mt-0.5">
                    <span className="font-mono text-sm font-black text-slate-900">
                      {readinessScore ?? 88} <span className="text-xs text-slate-400 font-normal">/ 100</span>
                    </span>
                    <span className={`text-xs font-bold px-2 py-0.5 uppercase border inline-block text-center w-full ${
                      (readinessScore ?? 88) >= 90
                        ? "border-slate-900 text-white bg-slate-900"
                        : (readinessScore ?? 88) >= 80
                          ? "border-slate-350 text-slate-700 bg-slate-100"
                          : "border-red-200 text-red-700 bg-red-50"
                    }`}>
                      {readinessGrade ?? "READY FOR BUSINESS"}
                    </span>
                  </div>
                </div>
                
                {/* Workspace switcher */}
                <div className="flex flex-col text-left">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono mb-1">
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
                    className="w-full bg-white border border-slate-200 text-xs px-2 py-1.5 font-mono text-slate-800 focus:outline-none focus:border-[#000000] rounded-none cursor-pointer"
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
                    className="bg-[#000000] hover:bg-[#1a1a1a] text-white font-sans text-xs uppercase tracking-wider py-2 rounded-none font-bold shadow-sm transition-all text-center"
                  >
                    + New
                  </button>
                  <button
                    type="button"
                    onClick={handleResetProfile}
                    className="bg-transparent border border-slate-350 hover:border-red-500 hover:text-red-500 text-slate-655 font-sans text-xs uppercase tracking-wider py-2 rounded-none font-bold transition-all text-center"
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
                <span className="px-2.5 py-1 bg-[#eae3d7] text-[#5c5346] text-xs tracking-widest uppercase font-mono font-bold rounded-none mb-3 inline-block">
                  {activeSubTab === "operations" ? "Business Activity & Growth" :
                   activeSubTab === "venture" ? "Linked Learning Niche Log" :
                   activeSubTab === "toolkit" ? "Business Guide Card Toolkit" :
                   activeSubTab === "workshop" ? "Workshop Agenda Builder" :
                   activeSubTab === "recaps" ? "Business Lessons & Summaries" : "Ask LEO"}
                </span>
                <h1 className="text-2xl md:text-3xl font-heading text-slate-900 tracking-wider font-bold uppercase">
                  {activeSubTab === "operations" ? "Business Activity Log" :
                   activeSubTab === "venture" ? "Learning Venture Niche & LEO Report" :
                   activeSubTab === "toolkit" ? "Guide Cards Toolkit Explorer" :
                   activeSubTab === "workshop" ? "Workshop Plan Builder" :
                   activeSubTab === "recaps" ? "Module Recaps & Tips" : "Ask LEO"}
                </h1>
                <p className="text-slate-500 text-xs font-sans mt-1">
                  {activeSubTab === "operations" ? "Enter your numbers, see your business health score over time, and read simple guides on how to improve." :
                   activeSubTab === "venture" ? "Reference and sync the venture profile you brainstormed with LEO in your learning portal." :
                   activeSubTab === "toolkit" ? "Browse, search, and check out step-by-step business action cards." :
                   activeSubTab === "workshop" ? "Create custom schedules for team workshops and export a simple agenda checklist." :
                   activeSubTab === "recaps" ? "Review what you learned in each module and open guide cards to improve your business." :
                   "Ask LEO for business tips, goal reviews, or guide card explanations."}
                </p>
              </div>
 
              {/* TAB 1.5: LINKED LEARNING VENTURE LOG */}
              {activeSubTab === "venture" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
                  {!learningVentureName ? (
                    <div className="lg:col-span-12 bg-white border border-slate-200 p-12 text-center rounded-none shadow-sm space-y-4">
                      <div className="w-16 h-16 bg-[#faf9f6] border border-[#000000]/30 text-[#000000] flex items-center justify-center mx-auto rounded-none">
                        <Lock className="w-8 h-8" />
                      </div>
                      <span className="text-xs uppercase font-bold tracking-widest text-[#000000] font-mono block">
                        No Active Venture Profile Found
                      </span>
                      <h3 className="text-xl font-heading text-slate-900 uppercase tracking-widest font-bold">
                        Learning Portal Profile Empty
                      </h3>
                      <p className="text-slate-500 text-xs max-w-md mx-auto leading-relaxed font-sans">
                        You haven't completed the Phase 1 Niche Builder Case Study yet. Head over to the Learning Portal checklist, complete the lessons, and submit your Launch Plan check to unlock LEO's boardroom analyzer and recommended card observations!
                      </p>
                      <div className="pt-2">
                        <a
                          href="/learn"
                          className="inline-block bg-[#000000] hover:bg-[#1a1a1a] text-white font-sans text-xs uppercase tracking-widest font-bold py-3 px-8 rounded-none transition-all"
                        >
                          Go to Learning Portal
                        </a>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Left Column: Venture Summary & Fields */}
                      <div className="lg:col-span-5 space-y-6">
                        
                        {/* Venture Details Card */}
                        <div className="bg-white border border-slate-200 p-6 rounded-none shadow-sm">
                          <div className="border-b border-slate-100 pb-3 mb-4 flex items-center justify-between">
                            <span className="text-xs uppercase font-sans text-slate-850 font-bold tracking-wider flex items-center gap-1.5">
                              <Sparkles className="w-4 h-4 text-[#000000]" /> Learning Venture Profile
                            </span>
                            <span className="px-2 py-0.5 bg-[#eae3d7] text-[#5c5346] text-xs tracking-wider uppercase font-mono font-bold rounded-none">
                              {learningVentureIndustry}
                            </span>
                          </div>

                          <div className="space-y-4 text-xs font-mono">
                            <div>
                              <span className="text-slate-400 uppercase text-xs block">Venture Brand Name:</span>
                              <span className="text-slate-950 font-bold text-sm normal-case">{learningVentureName}</span>
                            </div>

                            <div>
                              <span className="text-slate-400 uppercase text-xs block">LEO Niche Summary:</span>
                              <p className="text-slate-700 leading-relaxed font-semibold italic">
                                "{learningNicheSummary || "Venture analysis generated by LEO Boardroom."}"
                              </p>
                            </div>

                            {/* 5 Ws + H fields breakdown */}
                            {learningNicheFields && (
                              <div className="border-t border-slate-100 pt-4 mt-4 space-y-3">
                                <span className="text-xs text-slate-400 uppercase tracking-widest font-black block mb-2">
                                  Niche Builder Breakdown (5 Ws + H)
                                </span>
                                <div className="grid grid-cols-12 gap-y-2 text-sm leading-relaxed">
                                  <div className="col-span-3 text-slate-400 uppercase text-xs">What:</div>
                                  <div className="col-span-9 text-slate-800 font-sans font-medium">{learningNicheFields.whatProblem}</div>
                                  
                                  <div className="col-span-3 text-slate-400 uppercase text-xs">Who:</div>
                                  <div className="col-span-9 text-slate-800 font-sans font-medium">{learningNicheFields.whoAffected}</div>
                                  
                                  <div className="col-span-3 text-slate-400 uppercase text-xs">Where:</div>
                                  <div className="col-span-9 text-slate-800 font-sans font-medium">{learningNicheFields.whereHappening}</div>
                                  
                                  <div className="col-span-3 text-slate-400 uppercase text-xs">When:</div>
                                  <div className="col-span-9 text-slate-800 font-sans font-medium">{learningNicheFields.whenHappening}</div>
                                  
                                  <div className="col-span-3 text-slate-400 uppercase text-xs">How:</div>
                                  <div className="col-span-9 text-slate-800 font-sans font-medium">{learningNicheFields.howHappening}</div>
                                </div>
                              </div>
                            )}

                            {/* Sync to workspace action */}
                            <div className="pt-4 border-t border-slate-100">
                              <Button
                                onClick={handleSyncVentureProfile}
                                className="w-full bg-[#000000] hover:bg-[#1a1a1a] text-white font-sans text-xs uppercase tracking-widest py-3 text-center font-bold rounded-none shadow-sm transition-all"
                              >
                                ⚡ Sync Niche to Active Workspace
                              </Button>
                              <span className="text-xs text-slate-400 font-sans block text-center mt-1.5 leading-normal">
                                This will pre-seed the workspace settings with your brand name, industry, category, description, and active goals.
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Student Field Findings Card */}
                        <div className="bg-white border border-slate-200 p-6 rounded-none shadow-sm">
                          <span className="text-xs uppercase font-sans text-slate-850 font-bold tracking-wider block mb-4 border-b border-slate-100 pb-3">
                            📝 Student Field Notes & Findings
                          </span>
                          {Object.keys(learningCardNotes).filter(id => !!learningCardNotes[id]).length === 0 ? (
                            <p className="text-slate-400 italic text-xs font-sans text-center py-4">
                              No card findings recorded in your learning portal yet. Open recommended cards under active lessons to save observations!
                            </p>
                          ) : (
                            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
                              {Object.entries(learningCardNotes)
                                .filter(([_, note]) => !!note)
                                .map(([cardId, note]) => {
                                  const card = cardsList.find(c => c.id === cardId);
                                  return (
                                    <div key={cardId} className="bg-[#faf9f6] border border-slate-200 p-3 rounded-none">
                                      <span className="text-xs uppercase font-bold tracking-wider font-mono text-[#000000] block mb-1">
                                        Card: {card ? card.title : cardId}
                                      </span>
                                      <p className="text-xs text-slate-700 font-sans leading-relaxed italic">
                                        "{note}"
                                      </p>
                                    </div>
                                  );
                                })}
                            </div>
                          )}
                        </div>

                        {/* Venture Synthesis & Validation Matrix Card */}
                        <div className="bg-white border border-slate-200 p-6 rounded-none shadow-sm space-y-4">
                          <span className="text-xs uppercase font-sans text-slate-850 font-bold tracking-wider block border-b border-slate-100 pb-3 flex items-center gap-1.5">
                            🎯 Venture Synthesis & Validation Matrix
                          </span>
                          
                          {/* POV / HMW block */}
                          {synthesisPOVNeed || synthesisPOVInsight || synthesisHMW ? (
                            <div className="space-y-3 font-sans text-xs bg-[#faf9f6] p-3.5 border border-slate-200">
                              {synthesisPOVNeed && (
                                <div>
                                  <span className="text-xs font-mono text-slate-400 uppercase block font-bold">Point of View (POV):</span>
                                  <p className="text-slate-800 text-sm font-medium mt-0.5">
                                    "Our target users need a way to <strong className="text-[#000000]">{synthesisPOVNeed}</strong> because they <strong className="text-[#000000]">{synthesisPOVInsight || "want convenience"}</strong>."
                                  </p>
                                </div>
                              )}
                              {synthesisHMW && (
                                <div>
                                  <span className="text-xs font-mono text-slate-400 uppercase block font-bold">How Might We (HMW):</span>
                                  <p className="text-slate-800 text-sm font-semibold italic mt-0.5">
                                    "{synthesisHMW}"
                                  </p>
                                </div>
                              )}
                            </div>
                          ) : (
                            <p className="text-slate-400 italic text-xs font-sans text-center py-2">
                              No POV or HMW statements formulated in synthesis yet.
                            </p>
                          )}

                          {/* Plotted Matrix Display */}
                          <div className="space-y-2">
                            <span className="text-xs font-mono text-slate-400 uppercase font-black block">Plotted Assumptions Grid:</span>
                            
                            {/* X-Y coordinate display */}
                            <div className="w-full aspect-[4/3] bg-slate-900 border border-slate-850 relative rounded-none overflow-hidden select-none">
                              {/* Axis lines */}
                              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="w-full h-px border-t border-dashed border-slate-800" />
                              </div>
                              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="h-full w-px border-l border-dashed border-slate-800" />
                              </div>

                              {/* Corner labels */}
                              <div className="absolute top-1.5 left-1.5 text-[7px] font-mono text-red-400 bg-red-950/40 border border-red-900/20 px-1 py-0.2">
                                RISK 🚨
                              </div>
                              <div className="absolute top-1.5 right-1.5 text-[7px] font-mono text-green-400 bg-green-950/40 border border-green-900/20 px-1 py-0.2">
                                CORE 🛡️
                              </div>
                              <div className="absolute bottom-1.5 left-1.5 text-[7px] font-mono text-slate-400 bg-slate-950/60 border border-slate-850 px-1 py-0.2">
                                LOW 💤
                              </div>
                              <div className="absolute bottom-1.5 right-1.5 text-[7px] font-mono text-[#000000] bg-[#000000]/10 border border-[#000000]/20 px-1 py-0.2">
                                NICE ✨
                              </div>

                              {/* Plotted markers */}
                              {[
                                { id: "a1", num: "A1", color: "bg-red-500", name: "Time Premium" },
                                { id: "a2", num: "A2", color: "bg-blue-500", name: "Partner Onboarding" },
                                { id: "a3", num: "A3", color: "bg-yellow-500", name: "Data Trust" },
                                { id: "a4", num: "A4", color: "bg-purple-500", name: "Regulations" }
                              ].map((ass) => {
                                const crit = Number(synthesisGridPlacements[`${ass.id}-y`] ?? 5);
                                const evid = Number(synthesisGridPlacements[`${ass.id}-x`] ?? 5);
                                const leftPos = `calc(${(evid - 1) / 9 * 82}% + 15px)`;
                                const bottomPos = `calc(${(crit - 1) / 9 * 78}% + 15px)`;
                                return (
                                  <div 
                                    key={ass.id} 
                                    className="absolute -translate-x-1/2 translate-y-1/2 group transition-all"
                                    style={{ left: leftPos, bottom: bottomPos }}
                                  >
                                    <span className={`w-4 h-4 ${ass.color} text-white font-mono font-black text-xs flex items-center justify-center shadow-lg rounded-none border border-white cursor-pointer`}>
                                      {ass.num}
                                    </span>
                                    <span className="absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap bg-slate-950 border border-slate-800 text-xs font-mono text-white px-1.5 py-0.5 rounded-none opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none">
                                      {ass.name} (C: {crit}, E: {evid})
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                            
                            {/* Legend */}
                            <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs font-mono text-slate-500 pt-1.5">
                              <div><span className="inline-block w-2.5 h-2.5 bg-red-500 mr-1 align-middle" /> A1: Premium for Time</div>
                              <div><span className="inline-block w-2.5 h-2.5 bg-blue-500 mr-1 align-middle" /> A2: Partner Onboard</div>
                              <div><span className="inline-block w-2.5 h-2.5 bg-yellow-500 mr-1 align-middle" /> A3: Storing Data</div>
                              <div><span className="inline-block w-2.5 h-2.5 bg-purple-500 mr-1 align-middle" /> A4: Regulations</div>
                            </div>
                          </div>
                        </div>

                      </div>

                      {/* Right Column: LEO Executive Boardroom Report */}
                      <div className="lg:col-span-7 space-y-6">
                        <div className="bg-slate-900 border border-slate-850 p-6 rounded-none shadow-md text-slate-350">
                          <div className="flex items-center justify-between border-b border-slate-850 pb-4 mb-4">
                            <div className="flex items-center gap-2">
                              <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-ping shrink-0" />
                              <span className="text-xs uppercase font-sans font-black text-white tracking-widest">
                                Boardroom LEO Analyst Console
                              </span>
                            </div>
                            <span className="text-xs bg-slate-950 border border-slate-800 text-[#000000] font-mono px-2 py-0.5 rounded-none font-bold uppercase tracking-widest">
                              6 perspectives active
                            </span>
                          </div>

                          <div className="text-slate-300 font-sans text-xs leading-relaxed max-h-[580px] overflow-y-auto pr-1 space-y-4">
                            {learningBoardroomReport ? (
                              <div className="whitespace-pre-wrap leading-relaxed font-sans text-xs bg-slate-950/40 p-4 border border-slate-800 rounded-none text-left">
                                {learningBoardroomReport}
                              </div>
                            ) : (
                              <div className="py-12 text-center text-slate-500 italic font-sans">
                                Boardroom report not loaded. Run a Niche Brainstorm session inside the Learning Portal to generate boardroom analysis.
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* TAB 1: OPERATIONS & SENTINEL */}
              {activeSubTab === "operations" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* LEFT COLUMN: SETUP PROFILE SUMMARY & LOGGER */}
                  <div className="lg:col-span-5 space-y-8">
                    
                    {/* Setup Target Profile Summary */}
                    <div className="bg-white border border-slate-200 p-6 rounded-none shadow-sm">
                      <div className="border-b border-slate-100 pb-3 mb-4 flex items-center justify-between">
                        <span className="text-xs uppercase font-sans text-slate-850 font-bold tracking-widest flex items-center gap-1.5">
                          <Shield className="w-4 h-4 text-[#000000]" /> LEO Business Profile & Goals
                        </span>
                        <span className="px-2 py-0.5 bg-[#eae3d7] text-[#5c5346] text-xs tracking-wider uppercase font-mono font-bold rounded-none">
                          {currentMode.name.split(" (")[0]}
                        </span>
                      </div>
                      
                      <div className="space-y-4 text-xs font-mono text-left">
                        <div>
                          <span className="text-slate-400 uppercase text-xs block">Business Name:</span>
                          <span className="text-slate-900 font-bold">{businessName}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 uppercase text-xs block">LEO Business Summary:</span>
                          <p className="text-slate-655 text-sm leading-relaxed italic">{refinedDescription}</p>
                        </div>
                        <div>
                          <span className="text-slate-400 uppercase text-xs block">LEO Mission Statement:</span>
                          <p className="text-slate-655 text-sm leading-relaxed">{refinedMission}</p>
                        </div>
                        <div className="bg-[#faf9f6] p-3 border border-slate-150 text-xs">
                          <span className="text-slate-400 uppercase text-xs block mb-1">Your Goals:</span>
                          <ul className="space-y-1">
                            <li className="flex justify-between">
                              <span>• Customer Goal:</span>
                              <span className="font-bold">{aiTargets?.acquisition} {currentMode.acqUnit}</span>
                            </li>
                            <li className="flex justify-between">
                              <span>• Return Rate Goal:</span>
                              <span className="font-bold">{aiTargets?.adoption}{currentMode.adpUnit}</span>
                            </li>
                            <li className="flex justify-between">
                              <span>• {loggingInterval === "daily" ? "Daily" : "Weekly"} Sales Goal:</span>
                              <span className="font-bold">${aiTargets?.sales}</span>
                            </li>
                            <li className="flex justify-between">
                              <span>• Max Waiting Time Goal:</span>
                              <span className="font-bold">{aiTargets?.latency} {currentMode.latUnit}</span>
                            </li>
                            <li className="flex justify-between">
                              <span>• {loggingInterval === "daily" ? "Daily" : "Weekly"} Happiness Goal:</span>
                              <span className="font-bold">&gt;= {aiTargets?.sentiment}%</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
 
                    {/* Weekly Telemetry Logger Form */}
                    <div className="bg-white border border-slate-200 p-6 rounded-none shadow-sm">
                      <div className="border-b border-slate-100 pb-3 mb-4 text-left">
                        <h3 className="text-xs uppercase font-sans text-slate-800 font-bold tracking-widest flex items-center gap-1.5">
                          <Activity className="w-4 h-4 text-[#000000]" /> Log {loggingInterval === "daily" ? "Daily" : "Weekly"} Business Activity
                        </h3>
                        <p className="text-xs text-slate-400 font-mono uppercase mt-0.5">
                          Enter numbers for {periodLabel} {logHistory.length + 1}
                        </p>
                      </div>
 
                      <form onSubmit={handleAddWeekLog} className="space-y-4">
                        
                        {/* Grid fields */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="block text-xs font-bold text-slate-400 uppercase tracking-widest font-mono mb-1 text-left">
                              {formatModeLabel(currentMode.acqLabel)} ({currentMode.acqUnit})
                            </Label>
                            <Input
                              type="number"
                              value={newAcq}
                              onChange={(e) => setNewAcq(e.target.value)}
                              className="w-full bg-[#faf9f6] border border-slate-200 py-2 px-3 text-xs font-mono rounded-none focus:outline-none focus:border-[#000000]"
                              required
                            />
                          </div>
                          <div>
                            <Label className="block text-xs font-bold text-slate-400 uppercase tracking-widest font-mono mb-1 text-left">
                              {formatModeLabel(currentMode.adpLabel)} ({currentMode.adpUnit})
                            </Label>
                            <Input
                              type="number"
                              step="0.1"
                              value={newAdp}
                              onChange={(e) => setNewAdp(e.target.value)}
                              className="w-full bg-[#faf9f6] border border-slate-200 py-2 px-3 text-xs font-mono rounded-none focus:outline-none focus:border-[#000000]"
                              required
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="block text-xs font-bold text-slate-400 uppercase tracking-widest font-mono mb-1 text-left">
                              {formatModeLabel(currentMode.salesLabel)} ({currentMode.salesUnit})
                            </Label>
                            <Input
                              type="number"
                              value={newSales}
                              onChange={(e) => setNewSales(e.target.value)}
                              className="w-full bg-[#faf9f6] border border-slate-200 py-2 px-3 text-xs font-mono rounded-none focus:outline-none focus:border-[#000000]"
                              required
                            />
                          </div>
                          <div>
                            <Label className="block text-xs font-bold text-slate-400 uppercase tracking-widest font-mono mb-1 text-left">
                              {formatModeLabel(currentMode.latLabel)} ({currentMode.latUnit})
                            </Label>
                            <Input
                              type="number"
                              step="0.1"
                              value={newLat}
                              onChange={(e) => setNewLat(e.target.value)}
                              className="w-full bg-[#faf9f6] border border-slate-200 py-2 px-3 text-xs font-mono rounded-none focus:outline-none focus:border-[#000000]"
                              required
                            />
                          </div>
                        </div>

                        {/* Customer Service Integrations */}
                        <div className="border-t border-slate-100 pt-3 space-y-3">
                          <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest font-mono text-left">
                            Customer Service complaints & Resolutions
                          </span>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="block text-xs font-bold text-slate-400 uppercase tracking-widest font-mono mb-1 text-left">
                                Complaints Logged
                              </Label>
                              <Input
                                type="number"
                                value={newComplaints}
                                onChange={(e) => setNewComplaints(Math.max(0, parseInt(e.target.value) || 0))}
                                className="w-full bg-[#faf9f6] border border-slate-200 py-2 px-3 text-xs font-mono rounded-none focus:outline-none animate-none"
                              />
                            </div>
                            <div>
                              <Label className="block text-xs font-bold text-slate-400 uppercase tracking-widest font-mono mb-1 text-left">
                                Resolutions Formulated
                              </Label>
                              <Input
                                type="number"
                                value={newResolutions}
                                onChange={(e) => setNewResolutions(Math.max(0, parseInt(e.target.value) || 0))}
                                className="w-full bg-[#faf9f6] border border-slate-200 py-2 px-3 text-xs font-mono rounded-none focus:outline-none animate-none"
                              />
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between items-center mb-1 text-left">
                              <Label className="block text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">
                                Customer Sentiment Index
                              </Label>
                              <span className="text-xs font-mono font-bold text-[#000000]">{newSentiment}%</span>
                            </div>
                            <Slider
                              min={0}
                              max={100}
                              value={[newSentiment]}
                              onValueChange={(val) => setNewSentiment(Array.isArray(val) ? val[0] : val)}
                              className="py-2 cursor-pointer"
                            />
                            <div className="flex justify-between text-xs text-slate-400 font-mono mt-1.5">
                              <span>FRUSTRATED</span>
                              <span>NEUTRAL</span>
                              <span>HAPPY</span>
                            </div>
                          </div>
                        </div>

                        <Button
                          type="submit"
                          className="w-full bg-slate-900 hover:bg-slate-800 text-white font-sans text-xs uppercase tracking-widest py-3 text-center rounded-none font-bold transition-all mt-2 cursor-pointer h-10"
                        >
                          Log {periodLabel} {logHistory.length + 1} Activity
                        </Button>

                      </form>
                    </div>

                    {/* Monospace History Logs Console */}
                    <div className="bg-slate-900 border border-slate-850 p-5 rounded-none text-slate-300 font-mono text-xs shadow-sm select-none">
                      <div className="border-b border-slate-800 pb-2 mb-3 flex items-center justify-between">
                        <span className="text-green-400 uppercase tracking-wider font-bold">BUSINESS ACTIVITY LEDGER</span>
                        <span className="text-slate-500 font-mono">COUNT: {logHistory.length} {periodLabelUpper}S</span>
                      </div>
                      
                      <div className="space-y-1.5 max-h-48 overflow-y-auto text-left">
                        {logHistory.slice().reverse().map((log) => (
                          <div key={log.period ?? log.week} className="flex flex-col border-b border-slate-800 pb-1.5 last:border-0">
                            <div className="flex justify-between font-bold text-slate-200">
                              <span>{periodLabelUpper} {log.period ?? log.week} ACTIVITY LOG:</span>
                              <span className={log.computedHealth >= 80 ? "text-green-400" : log.computedHealth >= 70 ? "text-yellow-400" : "text-red-400"}>
                                INDEX: {log.computedHealth}/100
                              </span>
                            </div>
                            <div className="text-slate-400 pl-2 leading-relaxed">
                              • Customers: {log.acquisition} | Return Rate: {log.adoption}{currentMode.adpUnit} | Sales: ${log.sales} | Waiting Time: {log.latency}{currentMode.latUnit}<br/>
                              • CUSTOMER CARE: Complaints: {log.complaints} | Resolved: {log.resolutions} | Happiness: {log.sentiment}%
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
                        <h3 className="text-xs uppercase font-sans text-slate-800 font-bold tracking-widest flex items-center gap-1.5">
                          <TrendingUp className="w-4 h-4 text-[#000000]" /> Business Health Index Trend
                        </h3>
                        <span className="text-xs font-mono text-slate-400">HEALTH INDEX / % OF TARGET (0-100)</span>
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
                                <stop offset="0%" stopColor="#000000" stopOpacity="0.15" />
                                <stop offset="100%" stopColor="#000000" stopOpacity="0.0" />
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
                                    className="text-xs font-mono"
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
                                            className="text-xs font-mono font-bold"
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
                                  className="text-xs font-mono"
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
                                  <Checkbox
                                    checked={isVisible}
                                    onCheckedChange={() => setVisibleSeries(prev => ({ ...prev, [key]: !prev[key] }))}
                                  />
                                  <span className="w-2.5 h-2.5 rounded-none" style={{ backgroundColor: config.color }}></span>
                                  <span className="text-xs font-mono uppercase font-bold text-slate-655 hover:text-slate-900 transition-colors">
                                    {config.label}
                                  </span>
                                </label>
                              );
                            })}
                          </div>

                          {/* Math Formulation Details Overlay */}
                          <div className="mt-4 bg-[#faf9f6] p-3 border border-slate-150 text-xs font-mono text-slate-500 leading-normal text-left">
                            <span className="font-bold text-slate-700 block uppercase mb-1">How your Business Health Score is calculated:</span>
                            Health = (Customer_Growth_Score * 0.2) + (Return_Rate_Score * 0.2) + (Sales_Score * 0.2) + (Wait_Time_Score * 0.1) + (Customer_Care_Score * 0.3)<br/>
                            <span className="text-xs text-slate-400 block mt-1">
                              Where Waiting Time Score checks how fast you serve customers, and Customer Care weighs customer feelings (60%) and how quickly you resolve issues (40%). Individual paths reflect percentage performance against target goals.
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Real-time Synthesis & Curriculum Advisory Panel */}
                    <div className="bg-white border border-slate-200 p-6 rounded-none shadow-sm">
                      <div className="border-b border-slate-100 pb-3 mb-5 flex items-center justify-between">
                        <h3 className="text-xs uppercase font-sans text-slate-800 font-bold tracking-widest flex items-center gap-1.5">
                          <FileText className="w-4 h-4 text-[#000000]" /> LEO Coach Action Plans & Tips
                        </h3>
                        <span className="px-2 py-0.5 bg-green-50 text-green-700 text-xs font-mono font-semibold uppercase border border-green-200">
                          LIVE RECOMMENDATIONS
                        </span>
                      </div>

                      {logHistory.length === 0 ? (
                        <div className="text-center py-10 bg-[#faf9f6] border border-dashed border-slate-200 text-xs font-mono text-slate-400">
                          Onboard and log some business progress to get tailored action plans.
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
                                <span className="text-xs font-sans font-black tracking-widest block uppercase text-slate-800">
                                  {moduleReport.moduleTitle}
                                </span>
                                <span className="flex items-center gap-1">
                                  {moduleReport.status === "critical" ? (
                                    <span className="px-2 py-0.5 bg-red-100 text-red-700 text-[7px] font-mono font-bold tracking-wider uppercase flex items-center gap-0.5">
                                      <AlertTriangle className="w-2.5 h-2.5" /> NEED ATTENTION
                                    </span>
                                  ) : moduleReport.status === "warning" ? (
                                    <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-[7px] font-mono font-bold tracking-wider uppercase flex items-center gap-0.5">
                                      <AlertTriangle className="w-2.5 h-2.5" /> NEEDS IMPROVEMENT
                                    </span>
                                  ) : (
                                    <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[7px] font-mono font-bold tracking-wider uppercase flex items-center gap-0.5">
                                      <CheckCircle2 className="w-2.5 h-2.5" /> ON TRACK
                                    </span>
                                  )}
                                </span>
                              </div>

                              {/* Diagnostics content */}
                              <div className="space-y-3 font-sans text-xs text-left">
                                <div>
                                  <span className="text-xs font-mono text-slate-400 block uppercase">Activity Report:</span>
                                  <p className="font-semibold text-slate-800 leading-normal">{moduleReport.diagnostic}</p>
                                </div>
                                
                                {/* Use case deployment steps */}
                                <div className="bg-white/80 p-3 border border-slate-100 leading-normal">
                                  <span className="text-xs font-mono text-[#000000] block uppercase font-bold">Recommended Action Plan & Guide Cards:</span>
                                  <p className="text-slate-655 font-medium mt-1">{moduleReport.useCase}</p>
                                </div>

                                {/* Clickable toolkit badge links */}
                                <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2">
                                  <span className="text-xs font-mono text-slate-400 uppercase">Open Guide Cards:</span>
                                  {moduleReport.cards.map((cardId: string) => {
                                    const cardObj = cardsList.find((c) => c.id === cardId);
                                    return (
                                      <button
                                        key={cardId}
                                        type="button"
                                        onClick={() => handleOpenCardModal(cardId)}
                                        className="px-2.5 py-1 bg-white hover:bg-[#eae3d7]/30 border border-[#000000] text-[#000000] font-mono text-xs uppercase tracking-wider rounded-none cursor-pointer transition-all flex items-center gap-1 font-bold"
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
                        placeholder="Search business guide cards..."
                        value={toolkitSearch}
                        onChange={(e) => setToolkitSearch(e.target.value)}
                        className="w-full bg-[#faf9f6] border border-slate-200 pl-10 pr-4 py-2.5 text-xs font-mono rounded-none focus:outline-none focus:border-[#000000]"
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
                          className={`px-4 py-2 text-xs uppercase font-sans tracking-wider font-bold rounded-none transition-all ${
                            toolkitStage === phase
                              ? "bg-[#000000] text-white"
                              : "bg-[#faf9f6] border border-slate-200 text-slate-655 hover:border-slate-350"
                          }`}
                        >
                          {phase}
                        </button>
                      ))}
                    </div>

                    {/* Premium Simulator Toggle */}
                    <label className="inline-flex items-center gap-2 cursor-pointer select-none shrink-0">
                      <Checkbox
                        checked={simulateUnlock}
                        onCheckedChange={(checked) => setSimulateUnlock(!!checked)}
                      />
                      <span className="text-xs font-mono uppercase font-bold text-slate-500">
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
                          className={`bg-white border transition-all cursor-pointer flex flex-col justify-between h-[280px] overflow-hidden shadow-sm hover:shadow-md hover:border-[#000000] group ${
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
                            <span className="absolute top-2 left-2 px-2 py-0.5 bg-slate-900/80 text-white font-mono text-xs uppercase tracking-wider">
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
                                <span className="text-xs font-mono text-[#000000] font-bold">
                                  CARD {card.num}
                                </span>
                                <span className="text-xs font-mono text-slate-400 uppercase font-semibold">
                                  {card.category}
                                </span>
                              </div>
                              <h4 className="text-xs uppercase font-sans font-black tracking-wider text-slate-900 mt-1">
                                {card.title}
                              </h4>
                              <p className="text-xs text-slate-500 font-sans mt-1.5 leading-snug line-clamp-3">
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
                          <span className="font-sans font-bold uppercase tracking-wider text-xs text-slate-900">
                            Workshop Plan
                          </span>
                          <span className="font-mono text-xs bg-[#eae3d7] py-0.5 px-2 font-bold text-[#5c5346]">
                            Total Duration: {workshopDuration} min
                          </span>
                        </div>

                        {workshopPlaylist.length === 0 ? (
                          <div className="h-[200px] flex items-center justify-center bg-[#faf9f6] border border-dashed border-slate-200 text-slate-400 text-xs font-mono">
                            Workshop plan is empty. Choose a guide card on the right to start building your agenda.
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {workshopPlaylist.map((item, idx) => (
                              <div key={idx} className="border border-slate-150 p-4 bg-[#faf9f6] flex items-start justify-between gap-4 transition-all hover:border-[#000000]">
                                <div className="flex items-start gap-3">
                                  <div className="w-6 h-6 border border-[#000000] text-[#000000] flex items-center justify-center font-mono text-xs font-bold mt-0.5">
                                    {idx + 1}
                                  </div>
                                  <div className="text-left font-sans text-xs">
                                    <div className="flex items-center gap-2">
                                      <span className="font-sans font-black uppercase text-slate-900">
                                        {item.card.title}
                                      </span>
                                      <span className="text-xs font-mono bg-slate-200 px-1 text-slate-500 uppercase">
                                        {item.card.stage}
                                      </span>
                                    </div>
                                    <p className="text-slate-500 text-xs mt-1 leading-snug">{item.card.frontDesc}</p>
                                    
                                    {/* Duration Slider */}
                                    <div className="mt-3 flex items-center gap-3">
                                      <span className="text-xs font-mono text-slate-400 uppercase font-semibold">Session Duration:</span>
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
                                        className="accent-[#000000] w-32"
                                      />
                                      <span className="text-xs font-mono font-bold text-[#000000]">{item.duration} mins</span>
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
                                className="bg-slate-900 hover:bg-slate-800 text-white font-sans text-xs uppercase tracking-widest py-3 px-6 font-bold rounded-none transition-all flex items-center gap-1.5"
                              >
                                <Clipboard className="w-3.5 h-3.5" />
                                {copiedStatus ? "Playbook Agenda Copied!" : "Export Playbook Agenda"}
                              </button>
                            </div>

                          </div>
                        )}
                      </div>
                    </div>

                    {/* Sidebar selector */}
                    <div className="lg:col-span-4 space-y-6">
                      <div className="border border-slate-200 bg-white p-6 rounded-none shadow-sm text-left">
                        <h4 className="font-sans font-bold uppercase tracking-wider text-xs text-slate-900 border-b pb-3 mb-4">
                          Add Cards to Workshop Plan
                        </h4>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest font-mono mb-2">
                              Select Guide Card
                            </label>
                            <select
                              id="workshopCardSelect"
                              className="w-full bg-[#faf9f6] border border-slate-200 py-2.5 px-3 text-xs font-mono rounded-none focus:outline-none focus:border-[#000000]"
                            >
                              {cardsList.map((card) => (
                                <option key={card.id} value={card.id}>
                                  Card {card.num}: {card.title} ({card.stage})
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest font-mono mb-2">
                              Session Duration (minutes)
                            </label>
                            <input
                              type="number"
                              id="workshopCardDuration"
                              defaultValue="15"
                              min="5"
                              max="120"
                              step="5"
                              className="w-full bg-[#faf9f6] border border-slate-200 py-2.5 px-3 text-xs font-mono rounded-none focus:outline-none focus:border-[#000000]"
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
                            className="w-full bg-[#000000] hover:bg-[#1a1a1a] text-white font-sans text-xs uppercase tracking-widest py-3 text-center rounded-none font-bold transition-all"
                          >
                            + Add to Plan
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
                        <span className="text-xs font-sans font-black tracking-widest text-[#000000] uppercase">
                          Module 1: Finding Customers & Sign-ups
                        </span>
                        <span className="px-2 py-0.5 bg-[#eae3d7] text-[#5c5346] text-xs font-mono font-bold rounded-none uppercase">
                          Sign-up / Customer Flow
                        </span>
                      </div>
                      <p className="text-slate-500 font-sans text-xs leading-relaxed">
                        Find where customers get confused or leave when signing up or paying. Make these forms as simple as possible.
                      </p>
                      <div className="mt-4 bg-[#faf9f6] p-3 border border-slate-150 text-sm font-sans text-slate-655 leading-normal italic">
                        "Make it easier for customers to sign up and pay by removing extra form questions."
                      </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono text-slate-400 uppercase font-semibold">Open Guide Cards:</span>
                      <button
                        type="button"
                        onClick={() => handleOpenCardModal("interviews")}
                        className="px-2 py-1 bg-white hover:bg-[#eae3d7]/30 border border-[#000000] text-[#000000] font-mono text-xs uppercase tracking-wider rounded-none transition-all flex items-center gap-0.5 font-bold"
                      >
                        Card 01: Interviews <ArrowUpRight className="w-2 h-2" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleOpenCardModal("empathy-map")}
                        className="px-2 py-1 bg-white hover:bg-[#eae3d7]/30 border border-[#000000] text-[#000000] font-mono text-xs uppercase tracking-wider rounded-none transition-all flex items-center gap-0.5 font-bold"
                      >
                        Card 12: Empathy Map <ArrowUpRight className="w-2 h-2" />
                      </button>
                    </div>
                  </div>

                  {/* Module 2 */}
                  <div className="border border-slate-200 bg-white p-6 rounded-none shadow-sm flex flex-col justify-between min-h-[340px]">
                    <div>
                      <div className="border-b pb-2 mb-3 flex justify-between items-center">
                        <span className="text-xs font-sans font-black tracking-widest text-[#000000] uppercase">
                          Module 2: Keeping Customers Happy & Active
                        </span>
                        <span className="px-2 py-0.5 bg-[#eae3d7] text-[#5c5346] text-xs font-mono font-bold rounded-none uppercase">
                          Keeping Customers
                        </span>
                      </div>
                      <p className="text-slate-500 font-sans text-xs leading-relaxed">
                        Learn why customers stop using your service after they join. Use customer diaries to help you build features they love returning to.
                      </p>
                      <div className="mt-4 bg-[#faf9f6] p-3 border border-slate-150 text-sm font-sans text-slate-655 leading-normal italic">
                        "Learn how your customer's habits change day-by-day by letting them keep a simple diary."
                      </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono text-slate-400 uppercase font-semibold">Open Guide Cards:</span>
                      <button
                        type="button"
                        onClick={() => handleOpenCardModal("culture-probe")}
                        className="px-2 py-1 bg-white hover:bg-[#eae3d7]/30 border border-[#000000] text-[#000000] font-mono text-xs uppercase tracking-wider rounded-none transition-all flex items-center gap-0.5 font-bold"
                      >
                        Card 03: Culture Probe <ArrowUpRight className="w-2 h-2" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleOpenCardModal("themes")}
                        className="px-2 py-1 bg-white hover:bg-[#eae3d7]/30 border border-[#000000] text-[#000000] font-mono text-xs uppercase tracking-wider rounded-none transition-all flex items-center gap-0.5 font-bold"
                      >
                        Card 17: Themes <ArrowUpRight className="w-2 h-2" />
                      </button>
                    </div>
                  </div>

                  {/* Module 3 */}
                  <div className="border border-slate-200 bg-white p-6 rounded-none shadow-sm flex flex-col justify-between min-h-[340px]">
                    <div>
                      <div className="border-b pb-2 mb-3 flex justify-between items-center">
                        <span className="text-xs font-sans font-black tracking-widest text-[#000000] uppercase">
                          Module 3: Speeding Up Your Service & Operations
                        </span>
                        <span className="px-2 py-0.5 bg-[#eae3d7] text-[#5c5346] text-xs font-mono font-bold rounded-none uppercase">
                          Speed & Support
                        </span>
                      </div>
                      <p className="text-slate-500 font-sans text-xs leading-relaxed">
                        Solve long waiting times or slow delivery. Make team handovers faster and optimize technical operations so customers don't wait.
                      </p>
                      <div className="mt-4 bg-[#faf9f6] p-3 border border-slate-150 text-sm font-sans text-slate-655 leading-normal italic">
                        "Speed up your website pages and team handovers to keep customers from waiting too long."
                      </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono text-slate-400 uppercase font-semibold">Open Guide Cards:</span>
                      <button
                        type="button"
                        onClick={() => handleOpenCardModal("system-map")}
                        className="px-2 py-1 bg-white hover:bg-[#eae3d7]/30 border border-[#000000] text-[#000000] font-mono text-xs uppercase tracking-wider rounded-none transition-all flex items-center gap-0.5 font-bold"
                      >
                        Card 11: System Map <ArrowUpRight className="w-2 h-2" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleOpenCardModal("workshops")}
                        className="px-2 py-1 bg-white hover:bg-[#eae3d7]/30 border border-[#000000] text-[#000000] font-mono text-xs uppercase tracking-wider rounded-none transition-all flex items-center gap-0.5 font-bold"
                      >
                        Card 30: Workshops <ArrowUpRight className="w-2 h-2" />
                      </button>
                    </div>
                  </div>

                  {/* Module 4 */}
                  <div className="border border-slate-200 bg-white p-6 rounded-none shadow-sm flex flex-col justify-between min-h-[340px]">
                    <div>
                      <div className="border-b pb-2 mb-3 flex justify-between items-center">
                        <span className="text-xs font-sans font-black tracking-widest text-[#000000] uppercase">
                          Module 4: Making Money & Setting the Right Price
                        </span>
                        <span className="px-2 py-0.5 bg-[#eae3d7] text-[#5c5346] text-xs font-mono font-bold rounded-none uppercase">
                          Pricing & Profit
                        </span>
                      </div>
                      <p className="text-slate-500 font-sans text-xs leading-relaxed">
                        Make your business profitable. Test different pricing options (like Bronze/Silver/Gold) to find out what customers are happy to pay.
                      </p>
                      <div className="mt-4 bg-[#faf9f6] p-3 border border-slate-150 text-sm font-sans text-slate-655 leading-normal italic">
                        "Test pricing options with customer groups before changing your prices on the website."
                      </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono text-slate-400 uppercase font-semibold">Open Guide Cards:</span>
                      <button
                        type="button"
                        onClick={() => handleOpenCardModal("idea-shopping")}
                        className="px-2 py-1 bg-white hover:bg-[#eae3d7]/30 border border-[#000000] text-[#000000] font-mono text-xs uppercase tracking-wider rounded-none transition-all flex items-center gap-0.5 font-bold"
                      >
                        Card 25: Idea Shopping <ArrowUpRight className="w-2 h-2" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleOpenCardModal("elevator-pitch")}
                        className="px-2 py-1 bg-white hover:bg-[#eae3d7]/30 border border-[#000000] text-[#000000] font-mono text-xs uppercase tracking-wider rounded-none transition-all flex items-center gap-0.5 font-bold"
                      >
                        Card 26: Elevator Pitch <ArrowUpRight className="w-2 h-2" />
                      </button>
                    </div>
                  </div>

                  {/* Module 5 */}
                  <div className="border border-slate-200 bg-white p-6 rounded-none shadow-sm flex flex-col justify-between min-h-[340px]">
                    <div>
                      <div className="border-b pb-2 mb-3 flex justify-between items-center">
                        <span className="text-xs font-sans font-black tracking-widest text-[#000000] uppercase">
                          Module 5: Launching & Growing
                        </span>
                        <span className="px-2 py-0.5 bg-[#eae3d7] text-[#5c5346] text-xs font-mono font-bold rounded-none uppercase">
                          Partnerships & Growth
                        </span>
                      </div>
                      <p className="text-slate-500 font-sans text-xs leading-relaxed">
                        Design simple, low-cost marketing loops. Put partner flyers with custom QR codes at counters, and set up customer referral bonuses.
                      </p>
                      <div className="mt-4 bg-[#faf9f6] p-3 border border-slate-150 text-sm font-sans text-slate-655 leading-normal italic">
                        "Get your customers to invite their friends by offering simple discount codes on completed orders."
                      </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono text-slate-400 uppercase font-semibold">Open Guide Cards:</span>
                      <button
                        type="button"
                        onClick={() => handleOpenCardModal("behavior-engine")}
                        className="px-2 py-1 bg-white hover:bg-[#eae3d7]/30 border border-[#000000] text-[#000000] font-mono text-xs uppercase tracking-wider rounded-none transition-all flex items-center gap-0.5 font-bold"
                      >
                        Card 43: Behavior Engine <ArrowUpRight className="w-2 h-2" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleOpenCardModal("stakeholder-maps")}
                        className="px-2 py-1 bg-white hover:bg-[#eae3d7]/30 border border-[#000000] text-[#000000] font-mono text-xs uppercase tracking-wider rounded-none transition-all flex items-center gap-0.5 font-bold"
                      >
                        Card 07: Stakeholder Maps <ArrowUpRight className="w-2 h-2" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: ASK LEO CHAT */}
              {activeSubTab === "chat" && (
                <div className="border border-slate-200 bg-white shadow-sm flex flex-col justify-between h-[600px] max-w-4xl mx-auto">
                  {/* Header */}
                  <div className="border-b border-slate-100 bg-[#faf9f6] py-3.5 px-6 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                      <span className="font-sans font-bold text-xs uppercase tracking-wider text-slate-900">
                        LEO Business Coach
                      </span>
                    </div>
                    <span className="text-xs font-mono text-slate-400 uppercase font-semibold">
                      Offline LEO Coach
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
                          <div className="flex justify-between items-center border-b pb-1 mb-1 opacity-70 text-xs font-mono uppercase">
                            <span>{msg.sender === "user" ? "YOU" : "LEO coach"}</span>
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
                          LEO IS THINKING... <RotateCw className="w-3 h-3 inline-block animate-spin" />
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
                      className="flex-1 bg-[#faf9f6] border border-slate-200 py-3 px-4 text-xs font-mono rounded-none focus:outline-none focus:border-[#000000] text-slate-900"
                      disabled={chatIsTyping}
                      required
                    />
                    <button
                      type="submit"
                      disabled={chatIsTyping}
                      className="bg-slate-900 hover:bg-slate-800 disabled:bg-slate-200 text-white font-sans text-xs uppercase tracking-widest px-6 font-bold rounded-none transition-all flex items-center justify-center"
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
      <Dialog open={!!selectedCard} onOpenChange={(open) => { if (!open) setSelectedCard(null); }}>
        <DialogContent className="max-w-2xl sm:max-w-2xl bg-white border border-slate-300 p-6 rounded-none shadow-xl max-h-[90vh] overflow-y-auto z-50">
          {selectedCard && (
            <>
              <DialogHeader className="text-left border-b border-slate-100 pb-3 mb-4 flex flex-row justify-between items-start">
                <div className="flex-1">
                  <span className="text-xs font-mono text-slate-400 uppercase font-bold tracking-widest block">
                    PHASE: {selectedCard.stage.toUpperCase()} | CARD {selectedCard.num}
                  </span>
                  <DialogTitle className="text-xl font-sans text-slate-900 uppercase tracking-widest font-black mt-1">
                    {selectedCard.title}
                  </DialogTitle>
                  <span className="text-xs font-mono bg-[#eae3d7]/50 text-[#5c5346] py-0.5 px-2 rounded-none inline-block mt-2 self-start w-fit">
                    {selectedCard.category}
                  </span>
                </div>
                <button
                  onClick={() => handleDownloadPDF(selectedCard)}
                  className="bg-transparent border border-[#000000]/30 hover:bg-[#000000] hover:text-white text-[#000000] px-2.5 py-1 text-xs font-mono font-bold uppercase tracking-widest transition-all rounded-none cursor-pointer flex items-center gap-1.5 h-7 z-10 shrink-0 mt-3 mr-4"
                >
                  <Download className="w-3 h-3" /> PDF Template
                </button>
              </DialogHeader>

              <div className="space-y-4 text-xs font-sans text-left">
                <div>
                  <span className="text-xs font-mono text-slate-400 uppercase block mb-1">Card Focus Overview:</span>
                  <p className="text-slate-700 leading-relaxed font-medium">{selectedCard.frontDesc}</p>
                </div>

                <div>
                  <span className="text-xs font-mono text-slate-400 uppercase block mb-1">Strategic Objective:</span>
                  <p className="text-slate-800 leading-relaxed font-semibold italic">{selectedCard.objective}</p>
                </div>

                <div>
                  <span className="text-xs font-mono text-slate-400 uppercase block mb-2">Field Deployment Action Checklist:</span>
                  <ul className="space-y-2.5">
                    {selectedCard.deployment.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-slate-655 leading-normal">
                        <span className="w-4 h-4 border border-[#000000] text-[#000000] flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">
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
                    <span className="text-xs font-mono text-[#000000] uppercase font-bold block">
                      Interactive Design Toolkit Sandbox: Daily Diaries Logger
                    </span>
                    <p className="text-sm text-slate-500 font-sans leading-relaxed">
                      Simulate a customer logging their feelings and feedback in a diary at the moment they pay.
                    </p>
                    <div className="bg-[#faf9f6] border border-slate-200 p-4 rounded-none space-y-3">
                      <div className="flex gap-2">
                        {["😐", "😊", "😢", "😠", "😮"].map((emo) => (
                          <Button
                            key={emo}
                            type="button"
                            variant="outline"
                            onClick={() => setModalProbeEmoji(emo)}
                            className={`w-8 h-8 rounded-none border text-sm flex items-center justify-center transition-all cursor-pointer ${
                              modalProbeEmoji === emo 
                                ? "border-[#000000] bg-[#eae3d7]/30 scale-105" 
                                : "border-slate-200 bg-white hover:border-slate-350"
                            }`}
                          >
                            {emo}
                          </Button>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Input
                          type="text"
                          placeholder="e.g. Paid morning coffee, queue was too slow..."
                          value={modalProbeNote}
                          onChange={(e) => setModalProbeNote(e.target.value)}
                          className="flex-1 bg-white border border-slate-200 px-3 py-1.5 text-xs font-mono rounded-none focus:outline-none focus:border-[#000000] text-slate-900 h-8"
                        />
                        <Button
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
                          className="bg-[#000000] hover:bg-[#1a1a1a] text-white font-sans text-xs uppercase tracking-widest px-4 font-bold rounded-none h-8 cursor-pointer"
                        >
                          Log Diary
                        </Button>
                      </div>

                      {modalProbeHistory.length > 0 && (
                        <div className="space-y-1 bg-white border border-slate-150 p-2.5 max-h-24 overflow-y-auto">
                          <span className="text-xs font-mono text-slate-400 block uppercase">Moments History Log:</span>
                          {modalProbeHistory.map((item, idx) => (
                            <div key={idx} className="text-xs font-mono text-slate-655 flex justify-between">
                              <span>{item.emoji} {item.note}</span>
                              <span className="text-slate-400 text-xs">{item.time}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {selectedCard.id === "conversation-starters" && (
                  <div className="mt-6 border-t border-slate-100 pt-4 space-y-4">
                    <span className="text-xs font-mono text-[#000000] uppercase font-bold block">
                      Interactive Design Toolkit Sandbox: Customer Interview Prompts
                    </span>
                    <p className="text-sm text-slate-500 font-sans leading-relaxed">
                      Shuffle standard questions designed to get customers telling stories rather than just giving one-word answers.
                    </p>
                    <div className="bg-[#faf9f6] border border-slate-200 p-4 rounded-none text-center space-y-4">
                      <div className="bg-white border border-slate-150 p-4 rounded-none min-h-[70px] flex items-center justify-center text-xs font-sans italic text-slate-700 leading-relaxed">
                        &ldquo;{modalCurrentPrompt}&rdquo;
                      </div>
                      <Button
                        type="button"
                        onClick={() => {
                          let nextPrompt = modalCurrentPrompt;
                          while (nextPrompt === modalCurrentPrompt) {
                            const randomIdx = Math.floor(Math.random() * modalStarterPrompts.length);
                            nextPrompt = modalStarterPrompts[randomIdx];
                          }
                          setModalCurrentPrompt(nextPrompt);
                        }}
                        className="bg-[#000000] hover:bg-[#1a1a1a] text-white font-sans text-xs uppercase tracking-widest py-2 px-6 font-bold rounded-none transition-all flex items-center gap-1 mx-auto cursor-pointer"
                      >
                        Shuffle Prompt Card <RotateCw className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                )}

                {selectedCard.id === "behavior-engine" && (
                  <div className="mt-6 border-t border-slate-100 pt-4 space-y-4">
                    <span className="text-xs font-mono text-[#000000] uppercase font-bold block">
                      Interactive Design Toolkit Sandbox: Smart Actions Engine
                    </span>
                    <p className="text-sm text-slate-500 font-sans leading-relaxed">
                      Simulate a smart system checking account balances and suggesting ways to save or get help.
                    </p>
                    <div className="bg-[#faf9f6] border border-slate-200 p-4 rounded-none space-y-3 text-left">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <Label className="text-xs font-mono text-slate-500 uppercase">Account Balance:</Label>
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
                                trigger: "QUICK MICRO-LOAN HELP",
                                lift: "Helpful Option",
                                desc: "Calculated that customer needs cash soon. Showing a quick micro-loan offer with simple 3-click approval."
                              });
                            } else if (val > 100 && modalEngineDayOfMonth < 10) {
                              setModalEngineOutput({
                                trigger: "AUTOMATED SAVINGS OFFER",
                                lift: "Save Automatically",
                                desc: "Customer has extra money sitting in checking. Suggesting an automated savings option to earn interest."
                              });
                            } else {
                              setModalEngineOutput({
                                trigger: "STANDARD TRACKING",
                                lift: "No Offer Needed",
                                desc: "Everything is normal. No special suggestions needed right now."
                              });
                            }
                          }}
                          className="w-full accent-[#000000]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <Label className="text-xs font-mono text-slate-500 uppercase">Day of Month:</Label>
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
                                  trigger: "QUICK MICRO-LOAN HELP",
                                  lift: "Offer Micro-Loan",
                                  desc: "Calculated that customer needs cash soon. Showing a quick micro-loan offer with simple 3-click approval."
                                });
                              } else if (modalEngineBalance > 100 && val < 10) {
                                setModalEngineOutput({
                                  trigger: "AUTOMATED SAVINGS OFFER",
                                  lift: "Save Automatically",
                                  desc: "Customer has extra money sitting in checking. Suggesting an automated savings option to earn interest."
                                });
                              } else {
                                setModalEngineOutput({
                                  trigger: "STANDARD TRACKING",
                                  lift: "No Offer Needed",
                                  desc: "Everything is normal. No special suggestions needed right now."
                                });
                              }
                            }}
                            className="w-full accent-[#000000]"
                          />
                        </div>

                        <div className="flex flex-col justify-center">
                          <Label className="text-xs font-mono text-slate-500 block mb-1">Unpaid Utility Bills:</Label>
                          <label className="inline-flex items-center gap-1.5 cursor-pointer">
                            <Checkbox
                              checked={modalEngineBills}
                              onCheckedChange={(checked) => {
                                const val = !!checked;
                                setModalEngineBills(val);
                                // recalculate
                                if (modalEngineBalance <= 25 && val && modalEngineDayOfMonth >= 25) {
                                  setModalEngineOutput({
                                    trigger: "QUICK MICRO-LOAN HELP",
                                    lift: "Helpful Option",
                                    desc: "Calculated that customer needs cash soon. Showing a quick micro-loan offer with simple 3-click approval."
                                  });
                                } else if (modalEngineBalance > 100 && modalEngineDayOfMonth < 10) {
                                  setModalEngineOutput({
                                    trigger: "AUTOMATED SAVINGS OFFER",
                                    lift: "Save Automatically",
                                    desc: "Customer has extra money sitting in checking. Suggesting an automated savings option to earn interest."
                                  });
                                } else {
                                  setModalEngineOutput({
                                    trigger: "STANDARD TRACKING",
                                    lift: "No Offer Needed",
                                    desc: "Everything is normal. No special suggestions needed right now."
                                  });
                                }
                              }}
                              className="rounded-none border-slate-200 text-[#000000] focus:ring-0"
                            />
                            <span className="text-xs text-slate-655 font-mono uppercase font-bold">Unpaid Bills Exist</span>
                          </label>
                        </div>
                      </div>

                      <div className="bg-white border border-slate-150 p-2.5 text-xs font-mono leading-normal">
                        <div className="flex justify-between font-bold text-slate-800 border-b pb-1 mb-1">
                          <span>ENGINE ACTION:</span>
                          <span className="text-[#000000]">{modalEngineOutput.lift}</span>
                        </div>
                        <span className="text-[#000000] font-bold block">{modalEngineOutput.trigger}</span>
                        <p className="text-slate-500 mt-1">{modalEngineOutput.desc}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t border-slate-100 pt-4 mt-6 flex justify-end">
                <Button
                  onClick={() => setSelectedCard(null)}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-sans text-xs uppercase tracking-widest py-2 px-5 rounded-none font-bold cursor-pointer h-8"
                >
                  Close Card Detail
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* FOOTER */}
      <Footer />

    </div>
  );
}
