"use client";

import React, { useState } from "react";
import { Sparkles, Eye, RotateCw, Play, CheckCircle } from "lucide-react";

interface CardData {
  id: string;
  num: string;
  title: string;
  category: string;
  frontDesc: string;
  objective: string;
  deployment: string[];
}

const cardsList: CardData[] = [
  {
    id: "culture-probe",
    num: "01",
    title: "Culture Probe",
    category: "Qualitative Context Extraction",
    frontDesc: "Extract authentic, un-biased daily user behaviors through non-invasive self-reporting loops.",
    objective: "Gather rich, qualitative user context directly at the moment of experience, bypassing standard interview bias or corporate filters.",
    deployment: [
      "Distribute digital or physical micro-diaries to a representative cohort.",
      "Instruct users to log a simple emotional trigger (via emoji) at the exact moment they perform a key action (e.g., paying a utility bill).",
      "Synthesize logs into touchpoint emotional heatmaps for product feature mapping."
    ]
  },
  {
    id: "conversation-starters",
    num: "02",
    title: "Conversation Starters",
    category: "Stakeholder Alignment & IDI Prompts",
    frontDesc: "Bypass shallow feedback and tap into deep user memory structures during focus groups.",
    objective: "Shift workshop dialogues away from generic feature wish-lists into deep, emotional, and context-rich stories.",
    deployment: [
      "Shuffle the prompt deck before beginning stakeholder workshops or IDIs.",
      "Instead of asking, 'What features do you want?', draw a strategic prompt card.",
      "Use response narratives to map hidden user workflow dependencies and emotional expectations."
    ]
  },
  {
    id: "behavior-engine",
    num: "03",
    title: "Behavior Change Engine",
    category: "Fintech Cross-Sell Strategy",
    frontDesc: "Synthesize behavioral analysis with backend analytics to drive predictive product adoption.",
    objective: "Bridge qualitative user maps with database triggers, launching value-added products at the exact moment of highest user receptivity.",
    deployment: [
      "Define standard user behavior segments using Tableau or Power BI databases.",
      "Set micro-triggers for specific transaction combinations (e.g., utility pay + cash dip).",
      "Deploy custom in-app notifications offering secondary services, securing higher conversions."
    ]
  }
];

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
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono mb-2">
          Methodology Modules
        </span>
        <h2 className="text-3xl md:text-5xl font-heading text-slate-900 uppercase tracking-widest mb-4">
          Tactical Design Toolkit
        </h2>
        <p className="text-slate-500 max-w-3xl text-left text-lg font-sans">
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
                <div className="absolute inset-0 w-full h-full rounded-none bg-[#faf9f6]/40 border border-slate-200 p-6 flex flex-col [backface-visibility:hidden] overflow-hidden hover:border-[#b59a7c] hover:bg-white transition-all duration-300">
                  
                  {/* Top bar */}
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[9px] text-[#b59a7c] uppercase tracking-widest font-mono font-bold block mb-0.5">
                        REMY TOOLKIT
                      </span>
                      <span className="text-[9px] text-slate-400 font-mono uppercase tracking-wider block">
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
                    <p className="text-slate-650 text-[11px] leading-relaxed font-sans font-medium">
                      {card.frontDesc}
                    </p>
                  </div>

                  {/* Bottom bar */}
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-4 border-t border-slate-100 font-sans mt-auto">
                    <span className="flex items-center gap-1 text-slate-500 hover:text-slate-900 font-medium">
                      <Eye className="w-3.5 h-3.5 text-[#b59a7c]" /> Click to flip & explore
                    </span>
                    <span className="text-[#b59a7c] font-bold text-[8px] uppercase tracking-widest font-mono bg-[#faf9f6] px-2 py-0.5 border border-[#b59a7c]/30">
                      Active Tool
                    </span>
                  </div>
                </div>

                {/* Back Side */}
                <div className="absolute inset-0 w-full h-full rounded-none bg-white border-2 border-[#b59a7c] p-5 flex flex-col justify-between [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-y-auto"
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
                      <RotateCw className="w-4 h-4 text-[#b59a7c]" />
                    </button>
                  </div>

                  {/* Details */}
                  <div className="text-xs text-slate-655 space-y-2.5 my-3 font-sans font-medium">
                    <p className="leading-relaxed">
                      <strong className="text-slate-900 uppercase font-heading text-[10px] tracking-widest block font-bold mb-1">Objective:</strong>
                      {card.objective}
                    </p>
                    <div>
                      <strong className="text-slate-900 uppercase font-heading text-[10px] tracking-widest block font-bold mb-1">Field Deployment:</strong>
                      <ol className="list-decimal pl-4 space-y-1 text-slate-500 leading-snug">
                        {card.deployment.map((step, idx) => (
                          <li key={idx}>{step}</li>
                        ))}
                      </ol>
                    </div>
                  </div>

                  {/* Dynamic Sandbox Section */}
                  <div className="bg-[#faf9f6]/70 border border-slate-200 rounded-none p-3 text-xs mt-auto">
                    
                    {/* Sandbox 1: Culture Probe */}
                    {card.id === "culture-probe" && (
                      <div className="space-y-2">
                        <span className="text-[10px] font-heading text-slate-500 uppercase tracking-widest block font-bold">
                          Interactive Logger:
                        </span>
                        <form onSubmit={handleLogProbe} className="flex gap-2">
                          <select 
                            value={probeEmoji}
                            onChange={(e) => setProbeEmoji(e.target.value)}
                            className="bg-white border border-slate-200 text-base rounded-none px-1.5 focus:outline-none focus:border-[#b59a7c] focus:ring-1 focus:ring-[#b59a7c] font-sans"
                          >
                            <option>😐</option>
                            <option>😀</option>
                            <option>😡</option>
                            <option>💸</option>
                            <option>😰</option>
                          </select>
                          <input 
                            type="text" 
                            placeholder="How do you feel about this payment?"
                            value={probeNote}
                            onChange={(e) => setProbeNote(e.target.value)}
                            className="bg-white border border-slate-200 rounded-none px-2 py-1 text-slate-800 placeholder-slate-400 w-full focus:outline-none focus:border-[#b59a7c] focus:ring-1 focus:ring-[#b59a7c] font-sans"
                          />
                          <button 
                            type="submit"
                            className="bg-[#b59a7c] hover:bg-[#a3886b] text-white px-2.5 py-1 text-[10px] uppercase font-heading tracking-wider font-bold transition-colors rounded-none shrink-0"
                          >
                            Log
                          </button>
                        </form>

                        {probeLogged && (
                          <div className="text-[10px] text-[#b59a7c] flex items-center gap-1 font-bold animate-pulse font-sans">
                            <CheckCircle className="w-3 h-3 text-[#b59a7c]" /> Micro-diary entry stored!
                          </div>
                        )}

                        <div className="border-t border-slate-200 pt-2 space-y-1.5">
                          <span className="text-[9px] uppercase font-bold text-slate-400 font-mono tracking-widest block">
                            Logged Touchpoint Logs:
                          </span>
                          {probeHistory.length === 0 ? (
                            <span className="text-slate-400 italic block text-[10px] font-sans">No entries logged yet.</span>
                          ) : (
                            probeHistory.map((h, idx) => (
                              <div key={idx} className="flex justify-between items-center text-[10px] bg-white py-0.5 px-2 rounded-none border border-slate-200 font-sans">
                                <span className="text-slate-700 truncate max-w-[180px]">
                                  {h.emoji} {h.note}
                                </span>
                                <span className="text-[8px] text-slate-400 font-mono">{h.time}</span>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    )}

                    {/* Sandbox 2: Conversation Starters */}
                    {card.id === "conversation-starters" && (
                      <div className="space-y-2">
                        <span className="text-[10px] font-heading text-slate-500 uppercase tracking-widest block font-bold">
                          Draw Dynamic IDI Prompt:
                        </span>
                        <div className="bg-white border border-slate-200 rounded-none p-2.5 min-h-[50px] flex items-center justify-center text-center font-sans">
                          <p className={`text-slate-800 leading-relaxed italic transition-opacity duration-150 ${promptFade ? "opacity-0" : "opacity-100"}`}>
                            &ldquo;{currentPrompt}&rdquo;
                          </p>
                        </div>
                        <button
                          onClick={handleDrawPrompt}
                          className="w-full flex items-center justify-center gap-1.5 py-2 rounded-none bg-[#b59a7c] hover:bg-[#a3886b] text-white font-bold transition-all font-heading text-[10px] uppercase tracking-widest"
                        >
                          <Sparkles className="w-3.5 h-3.5" /> Draw Another Prompt Card
                        </button>
                      </div>
                    )}

                    {/* Sandbox 3: Behavior Change Engine */}
                    {card.id === "behavior-engine" && (
                      <div className="space-y-2 font-sans">
                        <span className="text-[10px] font-heading text-slate-500 uppercase tracking-widest block font-bold">
                          Set Simulated Behavioral Data:
                        </span>
                        <div className="space-y-1.5">
                          <div className="flex justify-between items-center text-slate-655 text-xs">
                            <span>Checking Balance:</span>
                            <span className="font-mono text-[#b59a7c] font-bold">${engineBalance}</span>
                          </div>
                          <input 
                            type="range" 
                            min="5" 
                            max="200" 
                            value={engineBalance}
                            onChange={(e) => {
                              const val = parseInt(e.target.value);
                              setEngineBalance(val);
                              calculateEngine(val, engineBills, engineDayOfMonth);
                            }}
                            className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#b59a7c]"
                          />

                          <div className="flex items-center justify-between text-slate-655 text-xs">
                            <span>Frequent Bill Pay?</span>
                            <input 
                              type="checkbox" 
                              checked={engineBills}
                              onChange={(e) => {
                                const val = e.target.checked;
                                setEngineBills(val);
                                calculateEngine(engineBalance, val, engineDayOfMonth);
                              }}
                              className="w-3.5 h-3.5 border-slate-350 text-[#b59a7c] focus:ring-0 focus:ring-offset-0 accent-[#b59a7c] cursor-pointer"
                            />
                          </div>

                          <div className="flex justify-between items-center text-slate-655 text-xs">
                            <span>Day of the Month:</span>
                            <span className="font-mono text-[#b59a7c] font-bold">Day {engineDayOfMonth}</span>
                          </div>
                          <input 
                            type="range" 
                            min="1" 
                            max="30" 
                            value={engineDayOfMonth}
                            onChange={(e) => {
                              const val = parseInt(e.target.value);
                              setEngineDayOfMonth(val);
                              calculateEngine(engineBalance, engineBills, val);
                            }}
                            className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#b59a7c]"
                          />
                        </div>

                        <div className="border-t border-slate-200 pt-2 space-y-1">
                          <div className="flex justify-between items-center text-[9px] uppercase font-bold tracking-widest font-mono">
                            <span className="text-slate-400">Engine Action:</span>
                            <span className="text-[#b59a7c]">{engineOutput.trigger}</span>
                          </div>
                          <p className="text-slate-600 text-[10px] leading-relaxed">
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
