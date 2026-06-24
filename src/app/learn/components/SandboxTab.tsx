"use client";

import React, { useState } from "react";
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

export default function SandboxTab() {
  const progress = useLearnProgress();
  const { profile } = useVentureProfile();

  const ventureName = profile.name || "your venture";
  const ventureIndustry = profile.industry || "your industry";

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

  const activePhase = phasesData[progress.activePhaseIndex] || phasesData[0];

  return (
    <div className="w-full pb-12 font-sans">
      {/* Phase selector */}
      <div className="flex flex-wrap gap-2 mb-8">
        {phasesData.map((phase, idx) => (
          <button
            key={phase.id}
            type="button"
            onClick={() => { progress.navigateTo(idx, 0); }}
            className={`px-4 py-2 rounded-none text-xs font-bold font-mono border transition-all cursor-pointer ${
              progress.activePhaseIndex === idx
                ? "bg-[#eae3d7] text-[#5c5346] border-[#5c5346]"
                : "bg-white text-slate-650 border-slate-200 hover:border-slate-350"
            }`}
          >
            Phase {phase.num}
          </button>
        ))}
      </div>

      <div className="bg-white text-slate-900 rounded-none p-6 md:p-8 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="mb-6">
          <Badge className="bg-black text-white border border-black text-[9px] font-bold uppercase tracking-wider mb-2 rounded-none font-mono">
            Module Practice Playground
          </Badge>
          <h3 className="font-heading text-lg font-extrabold text-slate-900 uppercase tracking-wide font-mono">
            {activePhase.num === 1 && "Phase 1: Local App Data Compliance Checker"}
            {activePhase.num === 2 && "Phase 2: Habit Planner & Customer Persona Cards"}
            {activePhase.num === 3 && "Phase 3: Database Links & Sprint Task Board"}
            {activePhase.num === 4 && "Phase 4: Retainer Contract & Profit Calculator"}
            {activePhase.num === 5 && "Phase 5: Launch Growth Loops Metric Simulator"}
          </h3>
        </div>

        {/* SANDBOX 1 */}
        {activePhase.num === 1 && (
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
        {activePhase.num === 2 && (
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
                  {[{ name: "Busy Belinda (Gymgoer)", role: "Forgets to order post-workout meals." }, { name: "Alex the Runner", role: "Struggles to schedule transport to fields." }, { name: "Convenient Clara", role: "Leaves checkout if it takes over 3 min." }].map((p, idx) => (
                    <button key={idx} type="button" onClick={() => setS2ActivePersona(idx)} className={`w-full text-left p-3 rounded-none border-2 text-xs cursor-pointer transition-all ${s2ActivePersona === idx ? "bg-black text-white border-black font-bold" : "bg-white border-black text-slate-700 hover:bg-slate-50"}`}>{p.name}</button>
                  ))}
                </div>
                {(() => {
                  const activeP = [{ name: "Busy Belinda", trigger: "After-class muscle ache alerts", routine: "Auto-adds post-workout shake to cart", reward: "Free protein shaker + 15% discount" }, { name: "Alex the Runner", trigger: "Post-field calendar triggers", routine: "Pre-populates taxi rides", reward: "Earn points toward field rentals" }, { name: "Convenient Clara", trigger: "Quick drop notifications", routine: "1-Click Apple Pay checkout", reward: "Free priority delivery in 15 min" }][s2ActivePersona] || { name: "", trigger: "", routine: "", reward: "" };
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
                  <Textarea value={s2CardPrompt} onChange={(e) => setS2CardPrompt(e.target.value)} className="text-black text-xs rounded-none resize-none h-20" />
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
        {activePhase.num === 3 && (
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
        {activePhase.num === 4 && (
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
        {activePhase.num === 5 && (
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
      </div>
    </div>
  );
}