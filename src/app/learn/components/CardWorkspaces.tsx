"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { 
  Sparkles, 
  Plus, 
  Trash2, 
  Copy, 
  Check, 
  Coffee,
  AlertTriangle,
  Search,
  Download,
  BookOpen,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  Smartphone,
  Palette,
  Layout,
  MapPin,
  ListTodo,
  Users,
  Compass,
  Database,
  Activity,
  FileText
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cardsList, CardData } from "@/components/DesignCardsExplorer";

// Modular Workspace Imports
import Card01Workspace from "./workspaces/Card01Workspace";
import Card03Workspace from "./workspaces/Card03Workspace";
import Card08Workspace from "./workspaces/Card08Workspace";
import Card09Workspace from "./workspaces/Card09Workspace";
import Card10Workspace from "./workspaces/Card10Workspace";
import Card11Workspace from "./workspaces/Card11Workspace";
import Card12Workspace from "./workspaces/Card12Workspace";
import Card13Workspace from "./workspaces/Card13Workspace";
import Card14Workspace from "./workspaces/Card14Workspace";
import Card15Workspace from "./workspaces/Card15Workspace";
import Card16Workspace from "./workspaces/Card16Workspace";
import Card17Workspace from "./workspaces/Card17Workspace";
import Card18Workspace from "./workspaces/Card18Workspace";
import Card26Workspace from "./workspaces/Card26Workspace";
import Card33Workspace from "./workspaces/Card33Workspace";
import Card35Workspace from "./workspaces/Card35Workspace";
import Card36Workspace from "./workspaces/Card36Workspace";
import Card37Workspace from "./workspaces/Card37Workspace";
import Card38Workspace from "./workspaces/Card38Workspace";
import Card39Workspace from "./workspaces/Card39Workspace";
import Card41Workspace from "./workspaces/Card41Workspace";
import Card42Workspace from "./workspaces/Card42Workspace";
import Card44Workspace from "./workspaces/Card44Workspace";
import Card45Workspace from "./workspaces/Card45Workspace";
import Card46Workspace from "./workspaces/Card46Workspace";
import Card47Workspace from "./workspaces/Card47Workspace";

export default function CardWorkspaces() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStage, setSelectedStage] = useState<string>("All");
  const [selectedCardId, setSelectedCardId] = useState<string>("interviews");

  const searchParams = useSearchParams();
  const cardParam = searchParams ? searchParams.get("card") : null;

  // Deep-linking: check query parameter reactively
  useEffect(() => {
    if (cardParam) {
      const found = cardsList.find(c => c.id === cardParam || c.num === cardParam);
      if (found) {
        setSelectedCardId(found.id);
        setSelectedStage("All");
      }
    }
  }, [cardParam]);

  // Filter cards based on search and stage selection
  const filteredCards = cardsList.filter(card => {
    const matchesSearch = 
      card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.num.includes(searchQuery) ||
      card.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStage = selectedStage === "All" || card.stage === selectedStage;
    
    return matchesSearch && matchesStage;
  });

  const activeCard = cardsList.find(c => c.id === selectedCardId) || cardsList[0];

  return (
    <div className="space-y-6 text-left">
      {/* Search and Stage Filters */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 border-b-2 border-black pb-5">
        <div className="md:col-span-4 relative">
          <Label className="text-[10px] font-mono font-black uppercase text-slate-700 block mb-1">Search Card Workbook</Label>
          <div className="relative">
            <Input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by name, number, or category..."
              className="border-2 border-black rounded-none pl-9 h-10 text-xs focus-visible:ring-0 focus-visible:border-black bg-white"
            />
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          </div>
        </div>
        <div className="md:col-span-8">
          <Label className="text-[10px] font-mono font-black uppercase text-slate-700 block mb-1.5">Filter by Stage</Label>
          <div className="flex flex-wrap gap-1.5">
            {["All", "Research", "Synthesis", "Ideation", "Prototyping", "Growth"].map(stage => (
              <button
                key={stage}
                onClick={() => setSelectedStage(stage)}
                className={`px-3 py-1.5 text-xs font-black uppercase tracking-wider border-2 border-black transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] ${
                  selectedStage === stage ? "bg-black text-white" : "bg-white text-slate-800 hover:bg-slate-50"
                }`}
              >
                {stage}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Cards Scrollable List */}
        <div className="lg:col-span-4 space-y-2 max-h-[600px] overflow-y-auto border-2 border-black p-3 bg-slate-50">
          <h5 className="font-mono text-[10px] font-black uppercase tracking-widest text-slate-500 border-b border-slate-200 pb-1.5 mb-2.5">
            Design Workbook Cards ({filteredCards.length})
          </h5>
          {filteredCards.length === 0 ? (
            <p className="text-xs text-slate-400 italic py-4 text-center">No cards match your search.</p>
          ) : (
            filteredCards.map(card => {
              const isCustom = [
                "interviews", 
                "culture-probe", 
                "journey-map", 
                "marketing-funnel",
                "props",
                "collage",
                "mood-board",
                "team-journey",
                "feedback-grid",
                "experience-journey",
                "conversation-starters",
                "my-top-5",
                "diaries",
                "stakeholder-maps",
                "semantic-analysis",
                "system-map",
                "empathy-map",
                "experience-map",
                "end-user-maps",
                "org-charts",
                "themes",
                "2-by-2-axis",
                "pitch-deck",
                "competitive-analysis",
                "elevator-pitch"
              ].includes(card.id);
              const isActive = card.id === selectedCardId;
              return (
                <button
                  key={card.id}
                  onClick={() => setSelectedCardId(card.id)}
                  className={`w-full text-left p-2.5 border-2 border-black transition-all flex items-start gap-2.5 ${
                    isActive 
                      ? "bg-amber-400 text-black shadow-none translate-x-[2px] translate-y-[2px]" 
                      : "bg-white text-slate-850 hover:bg-slate-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  }`}
                >
                  <span className="font-mono text-xs font-black text-slate-400 shrink-0 mt-0.5">{card.num}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-xs uppercase truncate block">{card.title}</span>
                      {isCustom && (
                        <span className="text-[7px] font-extrabold uppercase font-mono px-1 bg-black text-white rounded-none leading-none shrink-0" title="Custom Interactive Template">
                          Interactive
                        </span>
                      )}
                    </div>
                    <span className="text-[9px] font-mono text-slate-500 truncate block mt-0.5">{card.category}</span>
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Right Side: Active Workspace */}
        <div className="lg:col-span-8">
          <ActiveWorkspaceContainer card={activeCard} />
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   ACTIVE WORKSPACE CONTAINER
   ============================================================================ */
function ActiveWorkspaceContainer({ card }: { card: CardData }) {
  const [genericSteps, setGenericSteps] = useState<{ checked: boolean; notes: string }[]>([]);
  const [completionStatus, setCompletionStatus] = useState("In Progress");
  const [docNotes, setDocNotes] = useState("");

  // Load inputs and documentation notes from localStorage on change
  useEffect(() => {
    const key = `hi_card_inputs_${card.id}`;
    const saved = localStorage.getItem(key);
    const defaultSteps = card.deployment.map(() => ({ checked: false, notes: "" }));

    if (saved) {
      try {
        const p = JSON.parse(saved);
        setCompletionStatus(p.status || "In Progress");
        
        const loadedSteps = p.steps || [];
        const merged = card.deployment.map((_, idx) => ({
          checked: loadedSteps[idx]?.checked || false,
          notes: loadedSteps[idx]?.notes || ""
        }));
        setGenericSteps(merged);
      } catch (e) {
        console.error("Failed to parse generic card inputs", e);
        setGenericSteps(defaultSteps);
      }
    } else {
      setGenericSteps(defaultSteps);
      setCompletionStatus("In Progress");
    }

    // Load documentation notes
    const savedNotes = localStorage.getItem(`hi_card_doc_notes_${card.id}`);
    setDocNotes(savedNotes || "");
  }, [card.id, card.deployment]);

  const persistGenericStep = (idx: number, field: "checked" | "notes", val: any) => {
    const newSteps = [...genericSteps];
    newSteps[idx] = {
      ...newSteps[idx],
      [field]: val
    };
    setGenericSteps(newSteps);

    const key = `hi_card_inputs_${card.id}`;
    const data = {
      status: completionStatus,
      steps: newSteps
    };
    localStorage.setItem(key, JSON.stringify(data));
  };

  const persistGenericStatus = (status: string) => {
    setCompletionStatus(status);
    const key = `hi_card_inputs_${card.id}`;
    const data = {
      status,
      steps: genericSteps
    };
    localStorage.setItem(key, JSON.stringify(data));
  };

  const handleClearInputs = () => {
    const key = `hi_card_inputs_${card.id}`;
    localStorage.removeItem(key);

    const defaultSteps = card.deployment.map(() => ({ checked: false, notes: "" }));
    setGenericSteps(defaultSteps);
    setCompletionStatus("In Progress");

    // Clear documentation notes
    setDocNotes("");
    localStorage.removeItem(`hi_card_doc_notes_${card.id}`);

    // Dispatch clear event so custom children clear themselves too
    window.dispatchEvent(new CustomEvent(`hi_clear_card_${card.id}`));
    window.dispatchEvent(new Event("storage"));
  };

  const handleDocNotesChange = (val: string) => {
    setDocNotes(val);
    localStorage.setItem(`hi_card_doc_notes_${card.id}`, val);
    window.dispatchEvent(new Event("storage"));
  };

  const triggerPDFExport = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    let contentHTML = "";

    if (card.id === "interviews") {
      const saved = localStorage.getItem("hi_card_inputs_interviews");
      const data = saved ? JSON.parse(saved) : {};
      const target = data.chatTarget || "Local gym owners and freelance trainers";
      const problem = data.chatProblem || "Managing scheduling calendars across multiple platforms";
      const questions = data.chatQuestions || [
        "Tell me about the last time you tried to sync trainer schedules with client bookings.",
        "How do you handle schedule conflicts when they happen in the middle of a busy week?",
        "What is the hardest part about using multiple chat programs to handle customer requests?",
      ];

      contentHTML = `
        <div class="section">
          <div class="label">Target Customer Profile</div>
          <div class="value">${target}</div>
          <div class="label" style="margin-top: 15px;">Validated Pain Point</div>
          <div class="value">${problem}</div>
        </div>
        <h3>Interview Questionnaire Script</h3>
        <div class="section">
          <ul style="padding-left: 20px; margin: 0;">
            ${questions.map((q: string) => `<li class="value" style="margin-bottom: 8px;">${q}</li>`).join("")}
          </ul>
        </div>
      `;
    } else if (card.id === "culture-probe") {
      const saved = localStorage.getItem("hi_card_inputs_culture-probe");
      const data = saved ? JSON.parse(saved) : {};
      const logs = data.diaryLogs || [
        { id: 1, time: "09:45 AM", trigger: "Paying Supplier via mobile agent", mood: "Frustrated", emoji: "😡", notes: "SMS code timed out twice, merchant had to check ledger manually" },
        { id: 2, time: "01:15 PM", trigger: "Client Invoice created on Whatsapp", mood: "Worried", emoji: "😟", notes: "No clear proof of invoice delivered, customer hasn't read receipt yet" },
        { id: 3, time: "04:30 PM", trigger: "Confirming client transaction cash-out", mood: "Pleased", emoji: "😊", notes: "Instant transfer worked well after third attempt" },
      ];

      contentHTML = `
        <h3>Real-time Sentiment & Trigger Logs</h3>
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
          <thead>
            <tr style="background: #f1f5f9; border-bottom: 2px solid black; text-align: left; font-size: 11px;">
              <th style="padding: 8px;">Time</th>
              <th style="padding: 8px;">Trigger</th>
              <th style="padding: 8px;">Mood</th>
              <th style="padding: 8px;">Notes</th>
            </tr>
          </thead>
          <tbody>
            ${logs.map((log: any) => `
              <tr style="border-bottom: 1px solid #ccc; font-size: 12px;">
                <td style="padding: 8px; font-weight: bold;">${log.time}</td>
                <td style="padding: 8px;">${log.trigger}</td>
                <td style="padding: 8px;">${log.emoji} ${log.mood}</td>
                <td style="padding: 8px; font-style: italic;">"${log.notes}"</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      `;
    } else if (card.id === "journey-map") {
      const saved = localStorage.getItem("hi_card_inputs_journey-map");
      const data = saved ? JSON.parse(saved) : {};
      const blueprint = data.blueprintData || {
        order: {
          frontstage: "Customer enters shop, orders double espresso, taps credit card",
          backstage: "Cashier greets customer, inputs drink size in POS, hands ticket",
          systems: "Terminal authorizes bank API; transaction logged in local SQL DB",
          policy: "Must support dual offline checkout if bank gateway times out"
        },
        prepare: {
          frontstage: "Customer waits near pickup bar smelling coffee aroma",
          backstage: "Barista grinds espresso beans, tamps, extracts shot into cup",
          systems: "Machine extracts shot tracking water pressure and temperature",
          policy: "Sanitary code requires washing barista station every 2 hours"
        },
        delivery: {
          frontstage: "Customer receives cup, adds sugar, takes a hot sip",
          backstage: "Barista announces customer name, cleans counter area",
          systems: "Loyalty database awards points to card profile",
          policy: "Order handover SLA must complete within 120 seconds"
        }
      };

      contentHTML = `
        <h3>Service Design Blueprint Map</h3>
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 11px;">
          <thead>
            <tr style="background: #000; color: #fff; text-transform: uppercase;">
              <th style="padding: 8px; border: 1px solid black;">Layer</th>
              <th style="padding: 8px; border: 1px solid black;">Stage 1: Order & Pay (Entry)</th>
              <th style="padding: 8px; border: 1px solid black;">Stage 2: Brew & Prepare (Delivery)</th>
              <th style="padding: 8px; border: 1px solid black;">Stage 3: Handover (Exit)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 8px; border: 1px solid black; font-weight: bold; background: #fff1f2;">User Frontstage</td>
              <td style="padding: 8px; border: 1px solid black;">${blueprint.order.frontstage}</td>
              <td style="padding: 8px; border: 1px solid black;">${blueprint.prepare.frontstage}</td>
              <td style="padding: 8px; border: 1px solid black;">${blueprint.delivery.frontstage}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid black; font-weight: bold; background: #fffbeb;">Backstage Ops</td>
              <td style="padding: 8px; border: 1px solid black;">${blueprint.order.backstage}</td>
              <td style="padding: 8px; border: 1px solid black;">${blueprint.prepare.backstage}</td>
              <td style="padding: 8px; border: 1px solid black;">${blueprint.delivery.backstage}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid black; font-weight: bold; background: #ecfeff;">Systems & Tech</td>
              <td style="padding: 8px; border: 1px solid black;">${blueprint.order.systems}</td>
              <td style="padding: 8px; border: 1px solid black;">${blueprint.prepare.systems}</td>
              <td style="padding: 8px; border: 1px solid black;">${blueprint.delivery.systems}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid black; font-weight: bold; background: #ecfdf5;">Policy & SLA</td>
              <td style="padding: 8px; border: 1px solid black;">${blueprint.order.policy}</td>
              <td style="padding: 8px; border: 1px solid black;">${blueprint.prepare.policy}</td>
              <td style="padding: 8px; border: 1px solid black;">${blueprint.delivery.policy}</td>
            </tr>
          </tbody>
        </table>
      `;
    } else if (card.id === "marketing-funnel") {
      const saved = localStorage.getItem("hi_card_inputs_marketing-funnel");
      const data = saved ? JSON.parse(saved) : {};
      const budget = data.funnelBudget !== undefined ? data.funnelBudget : 250;
      const impressions = data.funnelImpressions !== undefined ? data.funnelImpressions : 15000;
      const ctr = data.funnelCtr !== undefined ? data.funnelCtr : 2.2;
      const leadConv = data.funnelLeadConv !== undefined ? data.funnelLeadConv : 12.5;
      const saleConv = data.funnelSaleConv !== undefined ? data.funnelSaleConv : 3.5;
      const ltv = data.funnelLtv !== undefined ? data.funnelLtv : 120;

      const clicks = Math.round(impressions * (ctr / 100));
      const leads = Math.round(clicks * (leadConv / 100));
      const paid = Math.round(leads * (saleConv / 100));
      const cac = paid > 0 ? (budget / paid).toFixed(2) : 0;
      const net = paid * ltv - budget;

      contentHTML = `
        <h3>Funnel Metrics & ROI Projection</h3>
        <div class="section">
          <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Ad Budget:</td>
              <td>$${budget}</td>
              <td style="padding: 6px 0; font-weight: bold;">Acquisition Cost (CAC):</td>
              <td>$${cac}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Impressions:</td>
              <td>${impressions.toLocaleString()}</td>
              <td style="padding: 6px 0; font-weight: bold;">Total Clicks:</td>
              <td>${clicks.toLocaleString()} (${ctr}%)</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Leads Generated:</td>
              <td>${leads.toLocaleString()} (${leadConv}%)</td>
              <td style="padding: 6px 0; font-weight: bold;">Paid Customers:</td>
              <td>${paid.toLocaleString()} (${saleConv}%)</td>
            </tr>
            <tr style="border-top: 2px solid black; font-weight: bold;">
              <td style="padding: 10px 0;">Customer LTV:</td>
              <td>$${ltv}</td>
              <td style="padding: 10px 0;">Projected Net Profit:</td>
              <td>$${net}</td>
            </tr>
          </table>
        </div>
      `;
    } else if (card.id === "props") {
      const saved = localStorage.getItem("hi_card_inputs_props");
      const data = saved ? JSON.parse(saved) : {};
      const screens = data.screens || [];
      contentHTML = `
        <h3>Smartphone Screen Prototypes</h3>
        ${screens.map((s: any) => `
          <div class="section" style="border: 2px solid black; background: #fff;">
            <div class="label" style="font-size: 10px; font-weight: bold; border-bottom: 1px solid black; padding-bottom: 4px; margin-bottom: 8px;">Screen: ${s.name}</div>
            <div class="value" style="font-size: 11px; margin-bottom: 8px; font-weight: normal; font-style: italic;">"${s.elements}"</div>
            ${s.buttons && s.buttons.length > 0 ? `
              <div style="margin-top: 8px;">
                <div class="label" style="font-size: 8px; color: #555;">Mock Buttons:</div>
                <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 4px;">
                  ${s.buttons.map((b: any) => `
                    <span style="display: inline-block; border: 1px solid black; padding: 4px 8px; font-size: 9px; font-weight: bold; text-transform: uppercase; font-family: monospace; background: ${
                      b.style === "green" ? "#a7f3d0" :
                      b.style === "yellow" ? "#fef08a" :
                      b.style === "red" ? "#fca5a5" :
                      "#e2e8f0"
                    };">${b.text}</span>
                  `).join("")}
                </div>
              </div>
            ` : ""}
          </div>
        `).join("")}
      `;
    } else if (card.id === "collage") {
      const saved = localStorage.getItem("hi_card_inputs_collage");
      const data = saved ? JSON.parse(saved) : {};
      const logs = data.logs || [];
      contentHTML = `
        <h3>Tester Brand Color & Emotion Log</h3>
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
          <thead>
            <tr style="background: #f1f5f9; border-bottom: 2px solid black; text-align: left; font-size: 11px;">
              <th style="padding: 8px;">Tester</th>
              <th style="padding: 8px;">Brand Color</th>
              <th style="padding: 8px;">Emotion</th>
              <th style="padding: 8px;">Notes</th>
            </tr>
          </thead>
          <tbody>
            ${logs.map((l: any) => `
              <tr style="border-bottom: 1px solid #ccc; font-size: 12px;">
                <td style="padding: 8px; font-weight: bold;">${l.testerName}</td>
                <td style="padding: 8px;"><span style="display:inline-block; width:12px; height:12px; border:1px solid black; background:${l.color}; vertical-align:middle; margin-right:4px;"></span> ${l.color}</td>
                <td style="padding: 8px; font-weight: bold;">${l.emotion}</td>
                <td style="padding: 8px; font-style: italic;">"${l.notes}"</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      `;
    } else if (card.id === "mood-board") {
      const saved = localStorage.getItem("hi_card_inputs_mood-board");
      const data = saved ? JSON.parse(saved) : {};
      const cardsData = data.cards || [];
      contentHTML = `
        <h3>Typography & Visual Style Board</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 10px;">
          ${cardsData.map((c: any) => `
            <div class="section" style="margin-bottom: 0;">
              <div class="label">Font family: ${c.font}</div>
              <div class="value" style="font-size: 13px; text-transform: uppercase;">${c.title}</div>
              <p style="font-size: 10px; margin-top: 4px; font-style: italic;">${c.desc}</p>
              ${c.imgUrl ? `<div style="margin-top: 8px; border: 1px solid #ccc;"><img src="${c.imgUrl}" style="width: 100%; max-height: 120px; object-fit: cover;" /></div>` : ""}
            </div>
          `).join("")}
        </div>
      `;
    } else if (card.id === "team-journey") {
      const saved = localStorage.getItem("hi_card_inputs_team-journey");
      const data = saved ? JSON.parse(saved) : {};
      const milestones = data.milestones || [];
      contentHTML = `
        <h3>Roadmap Milestone Sequence Manifest</h3>
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
          <thead>
            <tr style="background: #f1f5f9; border-bottom: 2px solid black; text-align: left; font-size: 11px;">
              <th style="padding: 8px; width: 40px;">Node</th>
              <th style="padding: 8px;">Milestone Title</th>
              <th style="padding: 8px; width: 120px;">Role Responsible</th>
              <th style="padding: 8px;">Execution Details / Tasks</th>
            </tr>
          </thead>
          <tbody>
            ${milestones.map((m: any) => `
              <tr style="border-bottom: 1px solid #ccc; font-size: 12px;">
                <td style="padding: 8px; font-weight: bold; text-align: center;">${m.letter}</td>
                <td style="padding: 8px; font-weight: bold;">${m.title}</td>
                <td style="padding: 8px;">${m.responsible}</td>
                <td style="padding: 8px; font-style: italic;">"${m.tasks}"</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      `;
    } else if (card.id === "feedback-grid") {
      const saved = localStorage.getItem("hi_card_inputs_feedback-grid");
      const data = saved ? JSON.parse(saved) : {};
      const feedback = data.feedback || { good: [], criticism: [], questions: [], ideas: [] };
      contentHTML = `
        <h3>Empathy Synthesis Quadrant</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 10px;">
          <div class="section" style="background: #ecfdf5; border-color: #a7f3d0; margin-bottom: 0;">
            <div class="label" style="color: #065f46;">👍 Good Stuff (Liked)</div>
            <ul style="padding-left: 15px; margin-top: 5px; font-size: 11px;">
              ${feedback.good.map((item: string) => `<li>${item}</li>`).join("")}
            </ul>
          </div>
          <div class="section" style="background: #fef2f2; border-color: #fca5a5; margin-bottom: 0;">
            <div class="label" style="color: #991b1b;">👎 Criticisms (Pains)</div>
            <ul style="padding-left: 15px; margin-top: 5px; font-size: 11px;">
              ${feedback.criticism.map((item: string) => `<li>${item}</li>`).join("")}
            </ul>
          </div>
          <div class="section" style="background: #ecfeff; border-color: #a5f3fc; margin-bottom: 0;">
            <div class="label" style="color: #075985;">❓ Questions (Queries)</div>
            <ul style="padding-left: 15px; margin-top: 5px; font-size: 11px;">
              ${feedback.questions.map((item: string) => `<li>${item}</li>`).join("")}
            </ul>
          </div>
          <div class="section" style="background: #fffbeb; border-color: #fde68a; margin-bottom: 0;">
            <div class="label" style="color: #92400e;">💡 New Ideas (Suggestions)</div>
            <ul style="padding-left: 15px; margin-top: 5px; font-size: 11px;">
              ${feedback.ideas.map((item: string) => `<li>${item}</li>`).join("")}
            </ul>
          </div>
        </div>
      `;
    } else if (card.id === "experience-journey") {
      const saved = localStorage.getItem("hi_card_inputs_experience-journey");
      const data = saved ? JSON.parse(saved) : {};
      const touchpoints = data.touchpoints || [];
      contentHTML = `
        <h3>Customer Channels Pathway Map</h3>
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
          <thead>
            <tr style="background: #f1f5f9; border-bottom: 2px solid black; text-align: left; font-size: 11px;">
              <th style="padding: 8px; width: 50px;">Step</th>
              <th style="padding: 8px;">Touchpoint Title</th>
              <th style="padding: 8px; width: 100px;">Channel Type</th>
              <th style="padding: 8px;">Action / Details</th>
            </tr>
          </thead>
          <tbody>
            ${touchpoints.map((t: any, idx: number) => `
              <tr style="border-bottom: 1px solid #ccc; font-size: 12px;">
                <td style="padding: 8px; font-weight: bold; font-family: monospace;">Step ${idx + 1}</td>
                <td style="padding: 8px; font-weight: bold;">${t.title}</td>
                <td style="padding: 8px;">${t.channel}</td>
                <td style="padding: 8px; font-style: italic;">"${t.details}"</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      `;
    } else if (card.id === "conversation-starters") {
      const saved = localStorage.getItem("hi_card_inputs_conversation-starters");
      const data = saved ? JSON.parse(saved) : {};
      const prompts = data.prompts || [];
      contentHTML = `
        <h3>Empathy Conversation Starter Prompts</h3>
        <div class="section">
          <ul style="padding-left: 20px; margin: 0;">
            ${prompts.map((q: string) => `<li class="value" style="margin-bottom: 8px; font-size: 12px; font-weight: bold;">${q}</li>`).join("")}
          </ul>
        </div>
      `;
    } else if (card.id === "my-top-5") {
      const saved = localStorage.getItem("hi_card_inputs_my-top-5");
      const data = saved ? JSON.parse(saved) : {};
      const selections = data.selections || [];
      const tally = data.tally || {};
      const features = data.features || [];
      
      const sorted = [...features].sort((a, b) => (tally[b] || 0) - (tally[a] || 0));

      contentHTML = `
        <h3>Voter Pick Top 5 Selections</h3>
        <div class="section">
          <div class="label">Current Active Top 5 Selected (in rank order):</div>
          ${selections.length === 0 ? `<div class="value">No active selections logged.</div>` : `
            <ol style="padding-left: 20px; margin: 5px 0 0 0; font-size: 12px;">
              ${selections.map((s: string) => `<li class="value">${s}</li>`).join("")}
            </ol>
          `}
        </div>
        
        <h3>Cumulative Prioritization Tally Manifest</h3>
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
          <thead>
            <tr style="background: #f1f5f9; border-bottom: 2px solid black; text-align: left; font-size: 11px;">
              <th style="padding: 8px;">Feature Description</th>
              <th style="padding: 8px; width: 100px; text-align: right;">Vote Counts</th>
            </tr>
          </thead>
          <tbody>
            ${sorted.map((f: string) => `
              <tr style="border-bottom: 1px solid #ccc; font-size: 12px;">
                <td style="padding: 8px;">${f}</td>
                <td style="padding: 8px; text-align: right; font-weight: bold; font-family: monospace;">${tally[f] || 0}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      `;
    } else if (card.id === "diaries") {
      const saved = localStorage.getItem("hi_card_inputs_diaries");
      const data = saved ? JSON.parse(saved) : {};
      const entries = data.entries || [];
      contentHTML = `
        <h3>Customer Long-term Journal Manifest</h3>
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
          <thead>
            <tr style="background: #f1f5f9; border-bottom: 2px solid black; text-align: left; font-size: 11px;">
              <th style="padding: 8px; width: 60px;">Day</th>
              <th style="padding: 8px;">Daily Activity</th>
              <th style="padding: 8px; width: 80px; text-align: center;">Mood Score</th>
              <th style="padding: 8px;">Frustrations / Friction Points</th>
            </tr>
          </thead>
          <tbody>
            ${entries.map((e: any) => `
              <tr style="border-bottom: 1px solid #ccc; font-size: 12px;">
                <td style="padding: 8px; font-weight: bold; font-family: monospace;">Day ${e.day}</td>
                <td style="padding: 8px;">${e.activity}</td>
                <td style="padding: 8px; text-align: center; font-weight: bold; font-family: monospace;">${e.score}/5</td>
                <td style="padding: 8px; font-style: italic;">"${e.frustration}"</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      `;
    } else if (card.id === "stakeholder-maps") {
      const saved = localStorage.getItem("hi_card_inputs_stakeholder-maps");
      const data = saved ? JSON.parse(saved) : {};
      const nodes = data.nodes || [];
      contentHTML = `
        <h3>Venture Stakeholder Partner Map</h3>
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
          <thead>
            <tr style="background: #f1f5f9; border-bottom: 2px solid black; text-align: left; font-size: 11px;">
              <th style="padding: 8px;">Stakeholder Name</th>
              <th style="padding: 8px; width: 100px;">Ring category</th>
              <th style="padding: 8px;">Flow details (Provide/Receive)</th>
            </tr>
          </thead>
          <tbody>
            ${nodes.map((n: any) => `
              <tr style="border-bottom: 1px solid #ccc; font-size: 12px;">
                <td style="padding: 8px; font-weight: bold;">${n.name}</td>
                <td style="padding: 8px; text-transform: uppercase;">${n.ring}</td>
                <td style="padding: 8px; font-style: italic;">"${n.details}"</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      `;
    } else if (card.id === "semantic-analysis") {
      const saved = localStorage.getItem("hi_card_inputs_semantic-analysis");
      const data = saved ? JSON.parse(saved) : {};
      const items = data.items || [];
      contentHTML = `
        <h3>Customer Words Translation Glossary</h3>
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
          <thead>
            <tr style="background: #f1f5f9; border-bottom: 2px solid black; text-align: left; font-size: 11px;">
              <th style="padding: 8px;">Confusing Customer Term</th>
              <th style="padding: 8px;">Technical Backend Term</th>
              <th style="padding: 8px;">Clear Branding Alternative Copy</th>
            </tr>
          </thead>
          <tbody>
            ${items.map((i: any) => `
              <tr style="border-bottom: 1px solid #ccc; font-size: 12px;">
                <td style="padding: 8px; font-weight: bold;">"${i.customer}"</td>
                <td style="padding: 8px;">${i.technical}</td>
                <td style="padding: 8px; font-weight: bold; color: #10b981;">"${i.brand}"</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      `;
    } else if (card.id === "system-map") {
      const saved = localStorage.getItem("hi_card_inputs_system-map");
      const data = saved ? JSON.parse(saved) : {};
      const nodes = data.nodes || [];
      contentHTML = `
        <h3>Data Architecture Flow Nodes</h3>
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
          <thead>
            <tr style="background: #f1f5f9; border-bottom: 2px solid black; text-align: left; font-size: 11px;">
              <th style="padding: 8px;">Component Name</th>
              <th style="padding: 8px; width: 100px;">Node Type</th>
              <th style="padding: 8px;">Description / Flow details</th>
            </tr>
          </thead>
          <tbody>
            ${nodes.map((n: any) => `
              <tr style="border-bottom: 1px solid #ccc; font-size: 12px;">
                <td style="padding: 8px; font-weight: bold;">${n.name}</td>
                <td style="padding: 8px;">${n.type}</td>
                <td style="padding: 8px; font-style: italic;">"${n.description}"</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      `;
    } else if (card.id === "empathy-map") {
      const saved = localStorage.getItem("hi_card_inputs_empathy-map");
      const data = saved ? JSON.parse(saved) : {};
      const empathy = data.empathy || { say: [], think: [], doActions: [], feel: [] };
      contentHTML = `
        <h3>Customer Empathy Feelings Map</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 10px;">
          <div class="section" style="margin-bottom: 0;">
            <div class="label">💬 What they Say</div>
            <ul style="padding-left: 15px; margin-top: 5px; font-size: 11px;">
              ${empathy.say.map((item: string) => `<li>"${item}"</li>`).join("")}
            </ul>
          </div>
          <div class="section" style="margin-bottom: 0;">
            <div class="label">💭 What they Think</div>
            <ul style="padding-left: 15px; margin-top: 5px; font-size: 11px;">
              ${empathy.think.map((item: string) => `<li>${item}</li>`).join("")}
            </ul>
          </div>
          <div class="section" style="margin-bottom: 0;">
            <div class="label">🏃‍♂️ What they Do</div>
            <ul style="padding-left: 15px; margin-top: 5px; font-size: 11px;">
              ${empathy.doActions.map((item: string) => `<li>${item}</li>`).join("")}
            </ul>
          </div>
          <div class="section" style="margin-bottom: 0;">
            <div class="label">💖 What they Feel</div>
            <ul style="padding-left: 15px; margin-top: 5px; font-size: 11px;">
              ${empathy.feel.map((item: string) => `<li>${item}</li>`).join("")}
            </ul>
          </div>
        </div>
      `;
    } else if (card.id === "experience-map") {
      const saved = localStorage.getItem("hi_card_inputs_experience-map");
      const data = saved ? JSON.parse(saved) : {};
      const steps = data.steps || [];
      contentHTML = `
        <h3>Daily User Goal Task Pathway</h3>
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
          <thead>
            <tr style="background: #f1f5f9; border-bottom: 2px solid black; text-align: left; font-size: 11px;">
              <th style="padding: 8px; width: 50px;">Step</th>
              <th style="padding: 8px;">Action / What they do</th>
              <th style="padding: 8px;">Frictions & Pains Faced</th>
            </tr>
          </thead>
          <tbody>
            ${steps.map((s: any, idx: number) => `
              <tr style="border-bottom: 1px solid #ccc; font-size: 12px;">
                <td style="padding: 8px; font-weight: bold; font-family: monospace;">Step ${idx + 1}</td>
                <td style="padding: 8px; font-weight: bold;">${s.action}</td>
                <td style="padding: 8px; font-style: italic; color: #b91c1c;">"${s.pain}"</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      `;
    } else if (card.id === "end-user-maps") {
      const saved = localStorage.getItem("hi_card_inputs_end-user-maps");
      const data = saved ? JSON.parse(saved) : {};
      const personas = data.personas || [];
      contentHTML = `
        <h3>Customer Tech Skill & Device Profiles</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 10px;">
          ${personas.map((p: any) => `
            <div class="section" style="margin-bottom: 0; border: 2px solid black; padding: 12px; background: #fff;">
              <div class="label" style="background: #f1f5f9; padding: 2px 6px; border: 1px solid black; display: inline-block; font-size: 9px; font-weight: bold; margin-bottom: 8px;">Tech Level: ${p.techLevel}</div>
              <div class="value" style="font-size: 14px; text-transform: uppercase; border-bottom: 1px solid black; padding-bottom: 4px; margin-bottom: 8px;">${p.name} ${p.age ? `(Age: ${p.age})` : ""}</div>
              <div style="font-size: 10px; margin-bottom: 4px;"><strong>Location:</strong> ${p.location || "N/A"}</div>
              <div style="font-size: 10px; margin-bottom: 4px;"><strong>Device:</strong> ${p.device} | <strong>Connection:</strong> ${p.connection}</div>
              <div style="font-size: 10px; margin-bottom: 4px;"><strong>Needs:</strong> ${p.needs || "N/A"}</div>
              <div style="font-size: 10px; margin-bottom: 4px;"><strong>Motivations:</strong> ${p.motivations || "N/A"}</div>
              <div style="font-size: 10px; margin-bottom: 8px;"><strong>Products Used:</strong> ${p.similarApps || "N/A"}</div>
              <div style="font-size: 11px; font-style: italic; color: #b91c1c; border-top: 1px dashed #ccc; padding-top: 6px; margin-top: 4px;"><strong>Primary Pain:</strong> "${p.pain}"</div>
            </div>
          `).join("")}
        </div>
      `;
    } else if (card.id === "org-charts") {
      const saved = localStorage.getItem("hi_card_inputs_org-charts");
      const data = saved ? JSON.parse(saved) : {};
      const rolesData = data.roles || [];
      contentHTML = `
        <h3>Team Org Roles & Dashboard Access Hierarchy</h3>
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
          <thead>
            <tr style="background: #f1f5f9; border-bottom: 2px solid black; text-align: left; font-size: 11px;">
              <th style="padding: 8px; width: 60px;">Tier</th>
              <th style="padding: 8px; width: 150px;">Role Title</th>
              <th style="padding: 8px; width: 120px;">System Permission</th>
              <th style="padding: 8px;">Scope of Work & Access</th>
            </tr>
          </thead>
          <tbody>
            ${rolesData.map((r: any) => `
              <tr style="border-bottom: 1px solid #ccc; font-size: 12px;">
                <td style="padding: 8px; font-weight: bold; font-family: monospace;">Tier ${r.rank}</td>
                <td style="padding: 8px; font-weight: bold;">${r.title}</td>
                <td style="padding: 8px;">${r.permission}</td>
                <td style="padding: 8px; font-style: italic;">"${r.scope}"</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      `;
    } else if (card.id === "themes") {
      const saved = localStorage.getItem("hi_card_inputs_themes");
      const data = saved ? JSON.parse(saved) : {};
      const insights = data.insights || [];
      contentHTML = `
        <h3>Customer Research Observations</h3>
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
          <thead>
            <tr style="background: #f1f5f9; border-bottom: 2px solid black; text-align: left; font-size: 11px;">
              <th style="padding: 8px;">Theme cluster</th>
              <th style="padding: 8px;">Observation Note / Insight</th>
            </tr>
          </thead>
          <tbody>
            ${insights.map((i: any) => `
              <tr style="border-bottom: 1px solid #ccc; font-size: 12px;">
                <td style="padding: 8px; font-weight: bold; text-transform: uppercase;">${i.category}</td>
                <td style="padding: 8px; font-style: italic;">"${i.note}"</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      `;
    } else if (card.id === "2-by-2-axis") {
      const saved = localStorage.getItem("hi_card_inputs_2-by-2-axis");
      const data = saved ? JSON.parse(saved) : {};
      const matrix = data.matrix || { quickWins: [], strategicBets: [], lowPriority: [], moneyPits: [] };
      contentHTML = `
        <h3>Prioritization 2x2 Matrix</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 10px;">
          <div class="section" style="background: #ecfdf5; border-color: #a7f3d0; margin-bottom: 0;">
            <div class="label" style="color: #065f46;">⭐ Quick Wins (High Value, Easy)</div>
            <ul style="padding-left: 15px; margin-top: 5px; font-size: 11px;">
              ${matrix.quickWins.map((item: string) => `<li>${item}</li>`).join("")}
            </ul>
          </div>
          <div class="section" style="background: #eff6ff; border-color: #bfdbfe; margin-bottom: 0;">
            <div class="label" style="color: #1e40af;">🎯 Strategic Bets (High Value, Hard)</div>
            <ul style="padding-left: 15px; margin-top: 5px; font-size: 11px;">
              ${matrix.strategicBets.map((item: string) => `<li>${item}</li>`).join("")}
            </ul>
          </div>
          <div class="section" style="background: #fffbeb; border-color: #fde68a; margin-bottom: 0;">
            <div class="label" style="color: #92400e;">⚙️ Low Priority (Low Value, Easy)</div>
            <ul style="padding-left: 15px; margin-top: 5px; font-size: 11px;">
              ${matrix.lowPriority.map((item: string) => `<li>${item}</li>`).join("")}
            </ul>
          </div>
          <div class="section" style="background: #fef2f2; border-color: #fca5a5; margin-bottom: 0;">
            <div class="label" style="color: #991b1b;">❌ Money Pits (Low Value, Hard)</div>
            <ul style="padding-left: 15px; margin-top: 5px; font-size: 11px;">
              ${matrix.moneyPits.map((item: string) => `<li>${item}</li>`).join("")}
            </ul>
          </div>
        </div>
      `;
    } else if (card.id === "pitch-deck") {
      const saved = localStorage.getItem("hi_card_inputs_pitch-deck");
      const data = saved ? JSON.parse(saved) : {};
      const slides = data.slides || [];
      contentHTML = `
        <h3>Business Slide Deck Outline</h3>
        <div style="display: flex; flex-direction: column; gap: 20px; margin-top: 15px;">
          ${slides.map((s: any, idx: number) => `
            <div class="section" style="margin-bottom: 0;">
              <div class="label">Slide ${idx + 1}: ${s.category || "General"}</div>
              <div class="value" style="font-size: 14px; text-transform: uppercase;">${s.title}</div>
              <div style="font-size: 11px; font-weight: normal; margin-top: 5px;">${s.bullets}</div>
              <div style="font-size: 10px; font-style: italic; color: #555; margin-top: 8px; border-top: 1px dashed #ccc; padding-top: 4px;">
                <strong>Presenter Notes:</strong> ${s.notes}
              </div>
            </div>
          `).join("")}
        </div>
      `;
    } else if (card.id === "competitive-analysis") {
      const saved = localStorage.getItem("hi_card_inputs_competitive-analysis");
      const data = saved ? JSON.parse(saved) : {};
      const competitors = data.competitors || [];
      contentHTML = `
        <h3>Competitive Analysis Matrix</h3>
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px; border: 2px solid black; font-size: 11px;">
          <thead>
            <tr style="background: #000; color: #fff; text-transform: uppercase; font-family: monospace;">
              <th style="padding: 8px; border: 1px solid black; text-align: left;">Competitor</th>
              <th style="padding: 8px; border: 1px solid black; text-align: left;">Offering</th>
              <th style="padding: 8px; border: 1px solid black; text-align: left;">Pricing</th>
              <th style="padding: 8px; border: 1px solid black; text-align: left;">Strengths</th>
              <th style="padding: 8px; border: 1px solid black; text-align: left;">Weaknesses</th>
              <th style="padding: 8px; border: 1px solid black; text-align: left;">Winning Advantage</th>
            </tr>
          </thead>
          <tbody>
            ${competitors.map((c: any) => `
              <tr style="background: #fff; border-bottom: 1px solid black;">
                <td style="padding: 8px; border: 1px solid black; font-weight: bold; text-transform: uppercase;">${c.name}</td>
                <td style="padding: 8px; border: 1px solid black;">${c.offering}</td>
                <td style="padding: 8px; border: 1px solid black; font-weight: bold;">${c.pricing}</td>
                <td style="padding: 8px; border: 1px solid black; color: #047857;">${c.strengths}</td>
                <td style="padding: 8px; border: 1px solid black; color: #b91c1c;">${c.weaknesses}</td>
                <td style="padding: 8px; border: 1px solid black; background: #fffbeb; font-weight: bold; font-style: italic;">"${c.advantage}"</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      `;
    } else if (card.id === "elevator-pitch") {
      const saved = localStorage.getItem("hi_card_inputs_elevator-pitch");
      const data = saved ? JSON.parse(saved) : {};
      const targetCustomer = data.targetCustomer || "";
      const need = data.need || "";
      const productName = data.productName || "";
      const category = data.category || "";
      const benefit = data.benefit || "";
      const duration = data.timerDuration || 30;
      const pitchText = `For ${targetCustomer} who ${need}, our ${productName} is a ${category} that ${benefit}.`;
      contentHTML = `
        <div class="section">
          <div class="label">Pitch Practice Session Time Limit</div>
          <div class="value">${duration} seconds</div>
        </div>
        <h3>Generated Elevator Pitch Script</h3>
        <div class="section" style="border-left: 4px solid black; padding-left: 15px; font-style: italic; font-size: 14px; background: #fffbeb;">
          "${pitchText}"
        </div>
      `;
    } else if (card.id === "content-calendar") {
      const saved = localStorage.getItem("hi_card_inputs_content-calendar");
      const data = saved ? JSON.parse(saved) : {};
      const posts = data.posts || [];
      contentHTML = `
        <h3>Scheduled Content Posts Calendar</h3>
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px; border: 2px solid black; font-size: 11px;">
          <thead>
            <tr style="background: #000; color: #fff; text-transform: uppercase; font-family: monospace;">
              <th style="padding: 8px; border: 1px solid black; text-align: left; width: 80px;">Day</th>
              <th style="padding: 8px; border: 1px solid black; text-align: left; width: 80px;">Channel</th>
              <th style="padding: 8px; border: 1px solid black; text-align: left; width: 100px;">Pillar</th>
              <th style="padding: 8px; border: 1px solid black; text-align: left; width: 70px;">Status</th>
              <th style="padding: 8px; border: 1px solid black; text-align: left;">Draft Copy</th>
            </tr>
          </thead>
          <tbody>
            ${posts.map((p: any) => `
              <tr style="background: #fff; border-bottom: 1px solid black;">
                <td style="padding: 8px; border: 1px solid black; font-weight: bold;">${p.day}</td>
                <td style="padding: 8px; border: 1px solid black; font-weight: bold;">${p.channel}</td>
                <td style="padding: 8px; border: 1px solid black;">${p.pillar}</td>
                <td style="padding: 8px; border: 1px solid black; font-weight: bold;">${p.status}</td>
                <td style="padding: 8px; border: 1px solid black; font-style: italic;">"${p.copy}"</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      `;
    } else {
      const saved = localStorage.getItem(`hi_card_inputs_${card.id}`);
      let stepsHTML = "";
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          const steps = parsed.steps || [];
          stepsHTML = card.deployment.map((step, idx) => {
            const stepData = steps[idx] || { checked: false, notes: "" };
            return `
              <div class="section" style="margin-bottom: 15px;">
                <div style="display: flex; align-items: flex-start; gap: 8px;">
                  <span style="font-size: 14px; font-weight: bold; font-family: monospace;">${stepData.checked ? "[x]" : "[ ]"}</span>
                  <div>
                    <div class="value" style="font-size: 11px; text-transform: uppercase;">Step ${idx + 1}: ${step}</div>
                    <div class="notes" style="margin-top: 5px; font-style: italic; color: #444;">${stepData.notes || "No notes recorded for this step."}</div>
                  </div>
                </div>
              </div>
            `;
          }).join("");
        } catch (e) {
          console.error("Failed to parse PDF steps", e);
        }
      }

      if (!stepsHTML) {
        stepsHTML = card.deployment.map((step, idx) => `
          <div class="section" style="margin-bottom: 15px;">
            <div class="value" style="font-size: 11px; text-transform: uppercase;">Step ${idx + 1}: ${step}</div>
            <div class="notes" style="margin-top: 5px; color: #999;">No notes recorded.</div>
          </div>
        `).join("");
      }

      contentHTML = `
        <div class="section">
          <div class="label">Workbook Completion Status</div>
          <div class="value" style="font-weight: bold;">${completionStatus}</div>
        </div>
        <h3>Interactive Action Plan Execution</h3>
        ${stepsHTML}
      `;
    }

    // Load documentation notes for PDF printout
    let notesHTML = "";
    const savedNotes = localStorage.getItem(`hi_card_doc_notes_${card.id}`);
    if (savedNotes && savedNotes.trim()) {
      notesHTML = `
        <h3>Workspace HCD Documentation Notes</h3>
        <div class="section" style="background: #fffbeb; border: 2px solid black; font-style: italic; white-space: pre-wrap; font-size: 11px;">
          ${savedNotes}
        </div>
      `;
    }

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${card.title} - Workbook Export</title>
          <link href="https://fonts.googleapis.com/css2?family=Cormorant+SC:wght@400;700&display=swap" rel="stylesheet">
          <style>
            body { font-family: monospace; padding: 40px; color: #1a1a1a; line-height: 1.4; }
            .brand-header {
              display: flex;
              align-items: center;
              gap: 12px;
              border-bottom: 3px solid black;
              padding-bottom: 12px;
              margin-bottom: 25px;
            }
            .brand-logo {
              height: 38px;
              width: auto;
              display: block;
            }
            .brand-title {
              font-family: 'Cormorant SC', serif;
              font-size: 24px;
              font-weight: bold;
              text-transform: uppercase;
              letter-spacing: 1.5px;
              color: black;
            }
            h2 { text-transform: uppercase; border-bottom: 2px solid black; padding-bottom: 8px; margin-bottom: 5px; font-size: 18px; margin-top: 10px; }
            .subtitle { font-size: 10px; color: #555; margin-bottom: 25px; text-transform: uppercase; font-weight: bold; }
            h3 { font-size: 13px; text-transform: uppercase; border-bottom: 2px solid black; padding-bottom: 4px; margin-top: 25px; margin-bottom: 10px; }
            .section { border: 1px solid #ccc; padding: 15px; margin-bottom: 20px; background: #fafafa; }
            .label { font-size: 8px; color: #666; text-transform: uppercase; font-weight: bold; margin-bottom: 2px; }
            .value { font-size: 12px; font-weight: bold; }
            @media print {
              body { padding: 20px; }
            }
          </style>
        </head>
        <body>
          <div class="brand-header">
            <img src="${window.location.origin}/smlogo.png" class="brand-logo" alt="Sovereign Millionaires" />
            <div class="brand-title">Sovereign Millionaires</div>
          </div>
          <h2>${card.num} · ${card.title} Workspace</h2>
          <div class="subtitle">Category: ${card.category} | Stage: ${card.stage}</div>
          
          <h3>Explainer Objective</h3>
          <div class="section">
            <div class="label">Objective / Why use it</div>
            <div class="value">${card.objective}</div>
          </div>

          ${contentHTML}
          ${notesHTML}

          <footer style="margin-top: 60px; border-top: 1px solid black; padding-top: 12px; font-size: 10px; text-align: center; color: #666;">
            Sovereign Millionaires Product Builder &copy; 2026 - Sprint Workbook Ledger
          </footer>
          <script>
            window.onload = function() {
              window.print();
              setTimeout(function() { window.close(); }, 500);
            };
          </script>
        </body>
      </html>
    `;
    printWindow.document.write(html);
    printWindow.document.close();
  };

  return (
    <div className="border-2 border-black p-6 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-left space-y-6">
      {/* Header Container */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-black pb-4 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-black text-slate-455">{card.num}</span>
            <Badge className="bg-[#eae3d7] text-[#5c5346] border border-black rounded-none uppercase font-mono font-bold tracking-widest text-[9px]">
              {card.stage}
            </Badge>
          </div>
          <h4 className="font-heading text-lg font-black text-black mt-1 uppercase tracking-wider">
            {card.title}
          </h4>
        </div>
        <div className="flex flex-wrap gap-2 self-start sm:self-center shrink-0">
          <Button 
            onClick={handleClearInputs} 
            variant="outline"
            className="border-2 border-red-600 hover:bg-red-50 text-red-600 rounded-none font-black uppercase text-xs h-10 gap-1.5 shadow-[2px_2px_0px_0px_rgba(220,38,38,1)] cursor-pointer"
          >
            <Trash2 className="w-4 h-4 text-red-650" />
            Clear Ledger
          </Button>
          <Button 
            onClick={triggerPDFExport} 
            className="bg-black hover:bg-slate-900 text-white rounded-none border-2 border-black font-black uppercase text-xs h-10 gap-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
          >
            <Download className="w-4 h-4 text-white" />
            Download as PDF
          </Button>
        </div>
      </div>

      {/* Explainer & Purpose Panel */}
      <div className="bg-[#f8fafc] border-2 border-black p-4 space-y-3 relative">
        <h5 className="font-mono text-xs uppercase font-black text-black tracking-wider flex items-center gap-1.5 border-b border-black pb-1.5">
          <BookOpen className="w-4 h-4 text-black" />
          Explainer and Purpose
        </h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-black text-slate-400 block uppercase">Objective / Why use it</span>
            <p className="font-bold text-slate-800 leading-relaxed">{card.objective}</p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-black text-slate-400 block uppercase">Description</span>
            <p className="font-medium text-slate-600 leading-relaxed">{card.frontDesc}</p>
          </div>
        </div>
        <div className="border-t border-slate-200 pt-3">
          <span className="text-[10px] font-mono font-black text-slate-400 block uppercase mb-1">Suggested Deployment Blueprint</span>
          <ul className="space-y-1.5">
            {card.deployment.map((step, sIdx) => (
              <li key={sIdx} className="flex gap-2 items-start text-xs font-medium text-slate-700">
                <ArrowRight className="w-3.5 h-3.5 text-black shrink-0 mt-0.5" />
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Interactive Workspace Forms */}
      <div className="pt-2">
        {card.id === "interviews" && <Card01Workspace />}
        {card.id === "culture-probe" && <Card03Workspace />}
        {card.id === "journey-map" && <Card13Workspace />}
        {card.id === "marketing-funnel" && <Card45Workspace />}
        {card.id === "props" && <Card33Workspace />}
        {card.id === "collage" && <Card35Workspace />}
        {card.id === "mood-board" && <Card36Workspace />}
        {card.id === "team-journey" && <Card37Workspace />}
        {card.id === "feedback-grid" && <Card39Workspace />}
        {card.id === "experience-journey" && <Card41Workspace />}
        {card.id === "conversation-starters" && <Card42Workspace />}
        {card.id === "my-top-5" && <Card44Workspace />}
        {card.id === "diaries" && <Card08Workspace />}
        {card.id === "stakeholder-maps" && <Card09Workspace />}
        {card.id === "semantic-analysis" && <Card10Workspace />}
        {card.id === "system-map" && <Card11Workspace />}
        {card.id === "empathy-map" && <Card12Workspace />}
        {card.id === "experience-map" && <Card14Workspace />}
        {card.id === "end-user-maps" && <Card15Workspace />}
        {card.id === "org-charts" && <Card16Workspace />}
        {card.id === "themes" && <Card17Workspace />}
        {card.id === "2-by-2-axis" && <Card18Workspace />}
        {card.id === "pitch-deck" && <Card38Workspace />}
        {card.id === "competitive-analysis" && <Card46Workspace />}
        {card.id === "elevator-pitch" && <Card26Workspace />}
        {card.id === "content-calendar" && <Card47Workspace />}

        {/* Render Generic Workbook for all other cards */}
        {!["interviews", "culture-probe", "journey-map", "marketing-funnel", "props", "collage", "mood-board", "team-journey", "feedback-grid", "experience-journey", "conversation-starters", "my-top-5", "diaries", "stakeholder-maps", "semantic-analysis", "system-map", "empathy-map", "experience-map", "end-user-maps", "org-charts", "themes", "2-by-2-axis", "pitch-deck", "competitive-analysis", "elevator-pitch", "content-calendar"].includes(card.id) && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-black pb-3 gap-2">
              <h5 className="font-mono text-xs uppercase font-extrabold text-slate-700 tracking-wider">
                🛠️ INTERACTIVE SPRINT PLANNER
              </h5>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-black uppercase text-slate-500">Status:</span>
                <div className="flex gap-1">
                  {["Not Started", "In Progress", "Completed"].map(status => (
                    <button
                      key={status}
                      onClick={() => persistGenericStatus(status)}
                      className={`px-2 py-1 border border-black text-[9px] font-black uppercase transition-all cursor-pointer ${
                        completionStatus === status ? "bg-black text-white" : "bg-white text-black hover:bg-slate-100"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <span className="text-[10px] font-mono font-black text-slate-400 block uppercase">
                Execute card checklist steps to log your progress:
              </span>
              
              <div className="space-y-4">
                {card.deployment.map((step, idx) => {
                  const stepData = genericSteps[idx] || { checked: false, notes: "" };
                  return (
                    <div key={idx} className="border-2 border-black p-4 bg-slate-50 hover:bg-slate-50/70 transition-all space-y-3 text-left">
                      <div className="flex items-start gap-3">
                        <button
                          type="button"
                          onClick={() => persistGenericStep(idx, "checked", !stepData.checked)}
                          className={`w-5 h-5 shrink-0 border-2 border-black rounded-none flex items-center justify-center transition-all cursor-pointer ${
                            stepData.checked ? "bg-emerald-400 text-black" : "bg-white text-slate-450"
                          }`}
                        >
                          {stepData.checked && <Check className="w-3.5 h-3.5 stroke-[3] text-black" />}
                        </button>
                        <div className="flex-1">
                          <span className="text-[9px] font-mono font-black text-slate-400 block uppercase">Step {idx + 1}</span>
                          <span className="text-xs font-bold text-slate-900 leading-tight block mt-0.5">{step}</span>
                        </div>
                      </div>
                      
                      <div className="pl-8">
                        <Label className="text-[9px] font-mono font-black uppercase text-slate-500">Execution Notes / Output Results</Label>
                        <Textarea
                          value={stepData.notes}
                          onChange={e => persistGenericStep(idx, "notes", e.target.value)}
                          placeholder={`Enter notes for Step ${idx + 1}...`}
                          rows={2}
                          className="border border-black rounded-none focus-visible:ring-0 focus-visible:border-black bg-white text-xs mt-1"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Unified Documentation Notes Block */}
      <div className="border-2 border-black p-4 bg-[#fffbeb] space-y-2.5 mt-6 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex items-center gap-1.5 border-b border-black pb-1.5">
          <FileText className="w-4 h-4 text-black shrink-0" />
          <Label className="text-[10px] font-mono font-black uppercase text-black tracking-wider">
            Workspace Summary Notes & HCD Documentation
          </Label>
        </div>
        <Textarea 
          value={docNotes} 
          onChange={e => handleDocNotesChange(e.target.value)} 
          placeholder="Record key observations, research findings, next actions, and design takeaways here to document your HCD decisions..." 
          rows={3}
          className="border-2 border-black rounded-none text-xs bg-white focus-visible:ring-0 focus-visible:border-black resize-none"
        />
        <div className="text-[9px] font-mono text-slate-500 italic">
          * This documentation ledger is saved automatically and will be compiled at the bottom of your PDF export logs.
        </div>
      </div>
    </div>
  );
}
