"use client";

import React, { useState, useEffect } from "react";
import { 
  Plus, 
  Trash2, 
  MapPin, 
  Smartphone, 
  Wifi, 
  Sparkles, 
  Heart, 
  Compass, 
  SmartphoneNfc 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SovereignInput as Input } from "@/components/ui/SovereignInput";
import { Label } from "@/components/ui/label";
import { SovereignTextarea as Textarea } from "@/components/ui/SovereignTextarea";
import { useNicheCardContent } from "../../hooks/useNicheCardContent";
import NicheTailorBadge from "../NicheTailorBadge";
import { SovereignSelect } from "@/components/ui/SovereignSelect";

export default function Card15Workspace() {
  const niche = useNicheCardContent("end-user-maps");
  const [personas, setPersonas] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");
  const [techLevel, setTechLevel] = useState("Intermediate");
  const [device, setDevice] = useState("");
  const [connection, setConnection] = useState("");
  const [needs, setNeeds] = useState("");
  const [motivations, setMotivations] = useState("");
  const [similarApps, setSimilarApps] = useState("");
  const [pain, setPain] = useState("");

  const defaultPersonas = [
    { 
      id: 1, 
      name: "Mercy, Fruit Stall Merchant", 
      age: "34",
      location: "Nairobi Market",
      techLevel: "Intermediate", 
      device: "Tecno Spark Smartphone", 
      connection: "3G Mobile Data", 
      needs: "Fast offline transaction recording without internet latency",
      motivations: "Scale operations to a second stall, keep accurate sales records",
      similarApps: "WhatsApp, Paper Ledger Books",
      pain: "Internet costs cut into daily profits; needs lightweight offline app capability" 
    },
    { 
      id: 2, 
      name: "David, Boda Boda Operator", 
      age: "26",
      location: "Boda Boda Stage, Kampala",
      techLevel: "Low/Basic", 
      device: "Infinix Hot Play phone", 
      connection: "2G/3G SMS connection", 
      needs: "Tap/scan quick QR codes instead of typing phone numbers",
      motivations: "Increase daily rides, reduce checkout time during peak hours",
      similarApps: "SafeBoda, SMS cash transactions",
      pain: "Struggles with typing long numbers; needs quick QR code scanning options" 
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem("hi_card_inputs_end-user-maps");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.personas) {
          setPersonas(parsed.personas);
          return;
        }
      } catch(e) {}
    }
    setPersonas(defaultPersonas);
  }, []);

  useEffect(() => {
    localStorage.setItem("hi_card_inputs_end-user-maps", JSON.stringify({ personas }));
    // Dispatch storage event to trigger parent update if needed
    window.dispatchEvent(new Event("storage"));
  }, [personas]);

  // Clean listener for card clear events
  useEffect(() => {
    const handleClear = () => {
      setPersonas(defaultPersonas);
    };
    window.addEventListener("hi_clear_card_end-user-maps", handleClear);
    return () => {
      window.removeEventListener("hi_clear_card_end-user-maps", handleClear);
    };
  }, []);

  const addPersona = () => {
    if (name.trim()) {
      setPersonas([
        ...personas, 
        { 
          id: Date.now(), 
          name, 
          age: age || "N/A",
          location: location || "N/A",
          techLevel, 
          device, 
          connection, 
          needs: needs || "N/A",
          motivations: motivations || "N/A",
          similarApps: similarApps || "N/A",
          pain: pain || "N/A" 
        }
      ]);
      // Clear form inputs
      setName("");
      setAge("");
      setLocation("");
      setNeeds("");
      setMotivations("");
      setSimilarApps("");
      setPain("");
    }
  };

  return (
    <div className="space-y-6 text-left">
      <NicheTailorBadge status={niche.status} isTailored={niche.isTailored} ventureName={niche.ventureName} onRefresh={niche.refresh} />
      <h5 className="font-mono text-xs uppercase font-extrabold text-slate-700 tracking-wider border-b border-dashed border-slate-200 pb-2">
        🛠_ CUSTOMER PROFILE WORKSPACE BUILDER
      </h5>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Input Form Column */}
        <div className="lg:col-span-5 border-2 border-black p-4 bg-slate-50 space-y-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <span className="text-[10px] font-mono font-black text-slate-700 uppercase block border-b border-black pb-1.5 mb-2">Create User Profile Card</span>
          
          <div>
            <Label className="text-[9px] font-mono font-black uppercase text-slate-500">Profile Name</Label>
            <Input value={name} onChange={e => setName(e.target.value)} placeholder={niche.placeholder("name")} className="rounded-none text-xs mt-1 h-9 placeholder:text-slate-400" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-[9px] font-mono font-black uppercase text-slate-500">Age</Label>
              <Input value={age} onChange={e => setAge(e.target.value)} placeholder="e.g. 34" className="rounded-none text-xs mt-1 h-9" />
            </div>
            <div>
              <Label className="text-[9px] font-mono font-black uppercase text-slate-500">Location</Label>
              <Input value={location} onChange={e => setLocation(e.target.value)} placeholder={niche.placeholder("location")} className="rounded-none text-xs mt-1 h-9 placeholder:text-slate-400" />
            </div>
          </div>

          <div>
            <Label className="text-[9px] font-mono font-black uppercase text-slate-500 block mb-1">Tech Skill Level</Label>
            <SovereignSelect value={techLevel} onChange={e => setTechLevel(e.target.value)} className="w-full rounded-none p-1.5 text-xs focus-visible:outline-none">
              <option>Low/Basic</option>
              <option>Intermediate</option>
              <option>Tech Savvy</option>
            </SovereignSelect>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-[9px] font-mono font-black uppercase text-slate-500">Primary Device</Label>
              <Input value={device} onChange={e => setDevice(e.target.value)} placeholder={niche.placeholder("device")} className="rounded-none text-xs mt-1 h-9 placeholder:text-slate-400" />
            </div>
            <div>
              <Label className="text-[9px] font-mono font-black uppercase text-slate-500">Internet connection</Label>
              <Input value={connection} onChange={e => setConnection(e.target.value)} placeholder={niche.placeholder("connection")} className="rounded-none text-xs mt-1 h-9 placeholder:text-slate-400" />
            </div>
          </div>

          <div>
            <Label className="text-[9px] font-mono font-black uppercase text-slate-500">What do they need?</Label>
            <Input value={needs} onChange={e => setNeeds(e.target.value)} placeholder={niche.placeholder("needs")} className="rounded-none text-xs mt-1 h-9 placeholder:text-slate-400" />
          </div>

          <div>
            <Label className="text-[9px] font-mono font-black uppercase text-slate-500">What motivates them?</Label>
            <Input value={motivations} onChange={e => setMotivations(e.target.value)} placeholder={niche.placeholder("motivations")} className="rounded-none text-xs mt-1 h-9 placeholder:text-slate-400" />
          </div>

          <div>
            <Label className="text-[9px] font-mono font-black uppercase text-slate-500">What apps or services do they use?</Label>
            <Input value={similarApps} onChange={e => setSimilarApps(e.target.value)} placeholder={niche.placeholder("similarApps")} className="rounded-none text-xs mt-1 h-9 placeholder:text-slate-400" />
          </div>

          <div>
            <Label className="text-[9px] font-mono font-black uppercase text-slate-500">What problem do they have?</Label>
            <Textarea value={pain} onChange={e => setPain(e.target.value)} placeholder={niche.placeholder("pain")} rows={2} className="rounded-none text-xs mt-1 resize-none placeholder:text-slate-400" />
          </div>

          <Button onClick={addPersona} className="w-full bg-black hover:bg-slate-900 border-2 border-black rounded-none text-white font-black uppercase text-[10px] h-9 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] cursor-pointer">
            <Plus className="w-4 h-4 mr-1 text-white" /> Add Persona Profile
          </Button>
        </div>

        {/* Display Cards Column */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {personas.map(p => (
            <div key={p.id} className="border-2 border-black p-4 bg-white relative flex flex-col justify-between shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <div>
                <div className="flex justify-between items-start border-b-2 border-black pb-1.5 mb-2.5">
                  <Badge className="bg-[#eae3d7] text-[#5c5346] border border-black rounded-none font-mono text-[8px] py-0">{p.techLevel}</Badge>
                  <button onClick={() => setPersonas(personas.filter(item => item.id !== p.id))} className="text-slate-400 hover:text-red-500 cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
                
                <h6 className="font-black text-slate-900 text-sm uppercase tracking-wide leading-tight mb-1">
                  {p.name} {p.age ? `(Age: ${p.age})` : ""}
                </h6>

                {p.location && (
                  <div className="flex items-center gap-1 text-[9px] font-mono text-slate-450 mb-3.5">
                    <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                    <span>{p.location}</span>
                  </div>
                )}

                <div className="space-y-2.5 text-[10px] text-slate-655 font-mono">
                  <div className="flex items-start gap-1.5">
                    <Smartphone className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <div><strong>Device:</strong> {p.device}</div>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <Wifi className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <div><strong>Connection:</strong> {p.connection}</div>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                    <div><strong>Needs:</strong> {p.needs}</div>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                    <div><strong>Motivations:</strong> {p.motivations}</div>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <SmartphoneNfc className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <div><strong>Products Used:</strong> {p.similarApps}</div>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-dashed border-slate-200 pt-2.5 mt-2.5 text-[11px] text-slate-700 bg-rose-50/40 p-2 border-2 border-black rounded-none">
                <div className="text-[8px] font-mono font-black uppercase text-rose-500 tracking-wider mb-0.5">Primary Friction</div>
                &ldquo;{p.pain}&rdquo;
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}