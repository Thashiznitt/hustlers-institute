"use client";

import React, { useState } from "react";
import { Sparkles, Eye, RotateCw, Play, CheckCircle, Download } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";

interface CardData {
  id: string;
  num: string;
  title: string;
  stage?: string;
  category: string;
  frontDesc: string;
  objective: string;
  deployment: string[];
}

const cardsList: CardData[] = [
  {
    id: "culture-probe",
    num: "01",
    title: "Daily Diaries",
    stage: "Research",
    category: "Real-time Feedback",
    frontDesc: "Have customers log their feelings and habits during their daily lives.",
    objective: "Gather real-life feedback from customers exactly when they are using a service.",
    deployment: [
      "Give a simple diary or mobile form to a small group of customers.",
      "Ask them to select an emoji or write a short note when they do a key task (like paying a bill).",
      "Review their notes to find out which parts of the experience feel good or stressful."
    ]
  },
  {
    id: "conversation-starters",
    num: "02",
    title: "Customer Chats",
    stage: "Research",
    category: "Talking to Customers",
    frontDesc: "Talk directly with customers to understand their daily life and what they really need.",
    objective: "Find out what customers need so you do not waste time building the wrong product.",
    deployment: [
      "Find a group of people who would buy your product.",
      "Ask friendly, open questions that let them tell their stories (like 'Tell me about the last time you bought this...').",
      "Take notes, listen closely, and write down what makes them happy or frustrated."
    ]
  },
  {
    id: "behavior-engine",
    num: "03",
    title: "App Promotion Strategy",
    stage: "Prototyping",
    category: "App Promotions",
    frontDesc: "Connect customer habits with simple notifications to offer secondary services at the right time.",
    objective: "Send friendly prompts to users when they are most likely to need other helpful services.",
    deployment: [
      "Group your app users into simple segments based on what services they use.",
      "Set up simple triggers for common purchases (e.g. food delivery + cab rides).",
      "Send helpful, friendly notifications suggesting relevant partners at the right time."
    ]
  }
];

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
  const stage = card.stage || "Research";
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

export default function ToolkitSimulator() {
  const [flippedCard, setFlippedCard] = useState<string | null>(null);
  
  const imageMap: Record<string, string> = {
    "culture-probe": "/toolkit_culture_probe.png",
    "conversation-starters": "/toolkit_conversation_starters.png",
    "behavior-engine": "/toolkit_behavior_engine.png",
  };
  
  // Simulation states
  // Card 1: Culture Probe
  const [probeEmoji, setProbeEmoji] = useState<string>("😐");
  const [probeNote, setProbeNote] = useState<string>("");
  const [probeLogged, setProbeLogged] = useState<boolean>(false);
  const [probeHistory, setProbeHistory] = useState<Array<{ emoji: string; note: string; time: string }>>([]);

  // Card 2: Conversation Starters
  const starterPrompts = [
    "Tell me about the last app that made you feel smart, and walk me through what happened right before you closed it.",
    "If this financial app were an employee at a branch, how would they speak to you when you request a loan?",
    "Describe the absolute worst transaction anxiety you experienced this month. What did you wish the UI told you?",
    "What is the one daily transaction you do that you hide from friends or family, and why?"
  ];
  const [currentPrompt, setCurrentPrompt] = useState<string>(starterPrompts[0]);
  const [promptFade, setPromptFade] = useState<boolean>(false);

  // Card 3: Behavior Change Engine
  const [engineBalance, setEngineBalance] = useState<number>(12);
  const [engineBills, setEngineBills] = useState<boolean>(true);
  const [engineDayOfMonth, setEngineDayOfMonth] = useState<number>(28);
  const [engineOutput, setEngineOutput] = useState<{ trigger: string; lift: string; desc: string }>({
    trigger: "MONITOR",
    lift: "--",
    desc: "Maintaining standard lifestyle ecosystem tracking. User balance is healthy."
  });

  const handleCardClick = (id: string) => {
    if (flippedCard === id) {
      setFlippedCard(null);
    } else {
      setFlippedCard(id);
    }
  };

  const handleLogProbe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!probeNote.trim()) return;
    const newLog = {
      emoji: probeEmoji,
      note: probeNote,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };
    setProbeHistory([newLog, ...probeHistory].slice(0, 3));
    setProbeNote("");
    setProbeLogged(true);
    setTimeout(() => setProbeLogged(false), 2000);
  };

  const handleDrawPrompt = () => {
    setPromptFade(true);
    setTimeout(() => {
      let nextPrompt = currentPrompt;
      while (nextPrompt === currentPrompt) {
        const randomIdx = Math.floor(Math.random() * starterPrompts.length);
        nextPrompt = starterPrompts[randomIdx];
      }
      setCurrentPrompt(nextPrompt);
      setPromptFade(false);
    }, 150);
  };

  const calculateEngine = (balance: number, bills: boolean, day: number) => {
    if (balance <= 25 && bills && day >= 25) {
      setEngineOutput({
        trigger: "SHORT-TERM LENDING ENGINE",
        lift: "25% Lift",
        desc: "Predictive trigger matches cash-dip. Surfacing automated micro-loan offer with 3-click approval."
      });
    } else if (balance > 100 && day < 10) {
      setEngineOutput({
        trigger: "MONEY MARKET FUND (MMF)",
        lift: "15% Lift",
        desc: "User holds high idle balance in checking. Surfacing target MMF savings sweep option."
      });
    } else {
      setEngineOutput({
        trigger: "MONITOR & RETAIN",
        lift: "Standard",
        desc: "Standard tracking. Behavior pattern does not match cross-sell risk thresholds."
      });
    }
  };

  return (
    <section className="w-full px-6 md:px-16 lg:px-24 py-20 bg-white border-b border-slate-200" id="toolkit">
      <div className="max-w-7xl mx-auto flex flex-col items-start mb-16">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono mb-2">
          Methodology Modules
        </span>
        <h2 className="text-3xl md:text-5xl font-heading text-slate-900 uppercase tracking-widest mb-4">
          Tactical Design Toolkit
        </h2>
        <p className="text-slate-500 max-w-3xl text-left text-sm md:text-base font-sans font-medium">
          Flip the cards below to see our proprietary methodology. Test out the interactive sandbox on the back of each card to simulate live user behaviors.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {cardsList.map((card) => {
          const isFlipped = flippedCard === card.id;

          return (
            <div
              key={card.id}
              className="h-[480px] w-full [perspective:1000px] cursor-pointer group"
              onClick={() => handleCardClick(card.id)}
            >
              <div
                className={`relative w-full h-full rounded-none transition-transform duration-700 [transform-style:preserve-3d] shadow-none ${
                  isFlipped ? "[transform:rotateY(180deg)]" : ""
                }`}
              >
                {/* Front Side */}
                <div className="absolute inset-0 w-full h-full rounded-none bg-[#faf9f6]/40 border border-slate-200 p-6 flex flex-col [backface-visibility:hidden] overflow-hidden hover:border-[#000000] hover:bg-white transition-all duration-300">
                  
                  {/* Top bar */}
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xs text-[#000000] uppercase tracking-widest font-mono font-bold block mb-0.5">
                        REMY TOOLKIT
                      </span>
                      <span className="text-xs text-slate-400 font-mono uppercase tracking-wider block">
                        {card.category}
                      </span>
                    </div>
                    <span className="text-3xl font-heading text-slate-250 select-none font-bold">
                      {card.num}
                    </span>
                  </div>

                  {/* Card Image */}
                  <div className="aspect-[16/10] w-full overflow-hidden border border-slate-200/60 rounded-none my-4 bg-slate-50 shrink-0">
                    <img 
                      src={imageMap[card.id]} 
                      alt={card.title} 
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-center">
                    <h3 className="text-base font-heading text-slate-900 uppercase mb-1 leading-tight tracking-widest font-bold">
                      {card.title}
                    </h3>
                    <p className="text-slate-650 text-sm leading-relaxed font-sans font-medium">
                      {card.frontDesc}
                    </p>
                  </div>

                  {/* Bottom bar */}
                  <div className="flex items-center justify-between text-sm text-slate-400 pt-4 border-t border-slate-100 font-sans mt-auto">
                    <span className="flex items-center gap-1 text-slate-500 hover:text-slate-900 font-medium">
                      <Eye className="w-3.5 h-3.5 text-[#000000]" /> Click to flip & explore
                    </span>
                    <span className="text-[#000000] font-bold text-xs uppercase tracking-widest font-mono bg-[#faf9f6] px-2 py-0.5 border border-[#000000]/30">
                      Active Tool
                    </span>
                  </div>
                </div>

                {/* Back Side */}
                <div className="absolute inset-0 w-full h-full rounded-none bg-white border-2 border-[#000000] p-5 flex flex-col justify-between [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-y-auto"
                     onClick={(e) => {
                       e.stopPropagation();
                     }}
                >
                  <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                    <h4 className="font-heading text-slate-900 text-xs uppercase tracking-widest font-bold">
                      {card.title} Sandbox
                    </h4>
                    <button 
                      onClick={() => handleCardClick(card.id)}
                      className="text-slate-400 hover:text-slate-950 transition-colors"
                      title="Flip Back"
                    >
                      <RotateCw className="w-4 h-4 text-[#000000]" />
                    </button>
                  </div>

                  {/* Details */}
                  <div className="text-xs text-slate-655 space-y-2.5 my-3 font-sans font-medium">
                    <p className="leading-relaxed">
                      <strong className="text-slate-900 uppercase font-heading text-xs tracking-widest block font-bold mb-1">Objective:</strong>
                      {card.objective}
                    </p>
                    <div>
                      <strong className="text-slate-900 uppercase font-heading text-xs tracking-widest block font-bold mb-1">Field Deployment:</strong>
                      <ol className="list-decimal pl-4 space-y-1 text-slate-500 leading-snug mb-3">
                        {card.deployment.map((step, idx) => (
                          <li key={idx}>{step}</li>
                        ))}
                      </ol>
                    </div>

                    {/* PDF Download Button */}
                    <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs uppercase font-bold tracking-wider text-slate-400 font-mono">Workbook PDF</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownloadPDF(card);
                        }}
                        className="inline-flex items-center gap-1.5 bg-[#000000] hover:bg-[#1a1a1a] text-white px-2.5 py-1 text-xs font-mono font-bold uppercase tracking-widest transition-all rounded-none cursor-pointer h-7"
                      >
                        <Download className="w-3 h-3" /> Download Template
                      </button>
                    </div>
                  </div>

                  {/* Dynamic Sandbox Section */}
                  <div className="bg-[#faf9f6]/70 border border-slate-200 rounded-none p-3 text-xs mt-auto">
                    
                    {/* Sandbox 1: Culture Probe */}
                    {card.id === "culture-probe" && (
                      <div className="space-y-2">
                        <span className="text-xs font-heading text-slate-500 uppercase tracking-widest block font-bold">
                          Interactive Logger:
                        </span>
                        <form onSubmit={handleLogProbe} className="flex gap-2">
                          <select 
                            value={probeEmoji}
                            onChange={(e) => setProbeEmoji(e.target.value)}
                            className="bg-white border border-slate-200 text-base rounded-none px-1.5 focus:outline-none focus:border-[#000000] focus:ring-1 focus:ring-[#000000] font-sans"
                          >
                            <option>😐</option>
                            <option>😀</option>
                            <option>😡</option>
                            <option>💸</option>
                            <option>😰</option>
                          </select>
                          <Input 
                            type="text" 
                            placeholder="How do you feel about this payment?"
                            value={probeNote}
                            onChange={(e) => setProbeNote(e.target.value)}
                            className="bg-white border border-slate-200 rounded-none px-2 py-1 text-slate-800 placeholder-slate-400 w-full focus:outline-none focus:border-[#000000] font-sans"
                          />
                          <Button 
                            type="submit"
                            className="bg-[#000000] hover:bg-[#1a1a1a] text-white px-2.5 py-1 text-xs uppercase font-heading tracking-wider font-bold transition-colors rounded-none shrink-0 cursor-pointer h-8"
                          >
                            Log
                          </Button>
                        </form>

                        {probeLogged && (
                          <div className="text-xs text-[#000000] flex items-center gap-1 font-bold animate-pulse font-sans">
                            <CheckCircle className="w-3 h-3 text-[#000000]" /> Micro-diary entry stored!
                          </div>
                        )}

                        <div className="border-t border-slate-200 pt-2 space-y-1.5">
                          <span className="text-xs uppercase font-bold text-slate-400 font-mono tracking-widest block">
                            Logged Touchpoint Logs:
                          </span>
                          {probeHistory.length === 0 ? (
                            <span className="text-slate-400 italic block text-xs font-sans">No entries logged yet.</span>
                          ) : (
                            probeHistory.map((h, idx) => (
                              <div key={idx} className="flex justify-between items-center text-xs bg-white py-0.5 px-2 rounded-none border border-slate-200 font-sans">
                                <span className="text-slate-700 truncate max-w-[180px]">
                                  {h.emoji} {h.note}
                                </span>
                                <span className="text-xs text-slate-400 font-mono">{h.time}</span>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    )}

                    {/* Sandbox 2: Conversation Starters */}
                    {card.id === "conversation-starters" && (
                      <div className="space-y-2">
                        <span className="text-xs font-heading text-slate-500 uppercase tracking-widest block font-bold">
                          Draw Dynamic IDI Prompt:
                        </span>
                        <div className="bg-white border border-slate-200 rounded-none p-2.5 min-h-[50px] flex items-center justify-center text-center font-sans">
                          <p className={`text-slate-800 leading-relaxed italic transition-opacity duration-150 ${promptFade ? "opacity-0" : "opacity-100"}`}>
                            &ldquo;{currentPrompt}&rdquo;
                          </p>
                        </div>
                        <Button
                          onClick={handleDrawPrompt}
                          className="w-full flex items-center justify-center gap-1.5 py-2 rounded-none bg-[#000000] hover:bg-[#1a1a1a] text-white font-bold transition-all font-heading text-xs uppercase tracking-widest cursor-pointer h-10"
                        >
                          <Sparkles className="w-3.5 h-3.5" /> Draw Another Prompt Card
                        </Button>
                      </div>
                    )}

                    {/* Sandbox 3: Behavior Change Engine */}
                    {card.id === "behavior-engine" && (
                      <div className="space-y-2 font-sans">
                        <span className="text-xs font-heading text-slate-500 uppercase tracking-widest block font-bold">
                          Set Simulated Behavioral Data:
                        </span>
                        <div className="space-y-1.5">
                          <div className="flex justify-between items-center text-slate-655 text-xs">
                            <span>Checking Balance:</span>
                            <span className="font-mono text-[#000000] font-bold">${engineBalance}</span>
                          </div>
                          <Slider 
                            min={5} 
                            max={200} 
                            value={[engineBalance]}
                            onValueChange={(val) => {
                              const numericVal = Array.isArray(val) ? val[0] : val;
                              setEngineBalance(numericVal);
                              calculateEngine(numericVal, engineBills, engineDayOfMonth);
                            }}
                            className="py-1 cursor-pointer"
                          />

                          <div className="flex items-center justify-between text-slate-655 text-xs">
                            <Label className="cursor-pointer">Frequent Bill Pay?</Label>
                            <Checkbox 
                              checked={engineBills}
                              onCheckedChange={(checked) => {
                                const val = !!checked;
                                setEngineBills(val);
                                calculateEngine(engineBalance, val, engineDayOfMonth);
                              }}
                            />
                          </div>

                          <div className="flex justify-between items-center text-slate-655 text-xs">
                            <span>Day of the Month:</span>
                            <span className="font-mono text-[#000000] font-bold">Day {engineDayOfMonth}</span>
                          </div>
                          <Slider 
                            min={1} 
                            max={30} 
                            value={[engineDayOfMonth]}
                            onValueChange={(val) => {
                              const numericVal = Array.isArray(val) ? val[0] : val;
                              setEngineDayOfMonth(numericVal);
                              calculateEngine(engineBalance, engineBills, numericVal);
                            }}
                            className="py-1 cursor-pointer"
                          />
                        </div>

                        <div className="border-t border-slate-200 pt-2 space-y-1">
                          <div className="flex justify-between items-center text-xs uppercase font-bold tracking-widest font-mono">
                            <span className="text-slate-400">Engine Action:</span>
                            <span className="text-[#000000]">{engineOutput.trigger}</span>
                          </div>
                          <p className="text-slate-600 text-xs leading-relaxed">
                            {engineOutput.desc}
                          </p>
                        </div>
                      </div>
                    )}

                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
