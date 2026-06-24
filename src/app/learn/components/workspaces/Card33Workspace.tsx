"use client";

import React, { useState, useEffect } from "react";
import { 
  Plus, 
  Trash2, 
  Smartphone, 
  Check, 
  Layers 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SovereignInput as Input } from "@/components/ui/SovereignInput";
import { Label } from "@/components/ui/label";
import { SovereignTextarea as Textarea } from "@/components/ui/SovereignTextarea";
import { SovereignSelect } from "@/components/ui/SovereignSelect";

interface PhoneButton {
  id: string;
  text: string;
  style: "black" | "green" | "yellow" | "red";
}

interface PhoneScreen {
  id: string;
  name: string;
  elements: string;
  buttons: PhoneButton[];
}

export default function Card33Workspace() {
  const [screens, setScreens] = useState<PhoneScreen[]>([]);
  const [activeScreenId, setActiveScreenId] = useState<string>("");
  const [newScreenName, setNewScreenName] = useState("");

  // Button inputs
  const [btnText, setBtnText] = useState("");
  const [btnStyle, setBtnStyle] = useState<"black" | "green" | "yellow" | "red">("black");

  // Interaction simulation feedback
  const [simulatedActionLog, setSimulatedActionLog] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("hi_card_inputs_props");
    if (saved) {
      try {
        const p = JSON.parse(saved);
        if (p.screens && p.screens.length > 0) {
          setScreens(p.screens);
          setActiveScreenId(p.activeScreenId || p.screens[0].id);
          return;
        }
      } catch (e) {
        console.error("Failed to load props workspace", e);
      }
    }
    const defaults: PhoneScreen[] = [
      { 
        id: "1", 
        name: "Welcome Screen", 
        elements: "Logo, Enter Passphrase input field, and security credentials disclaimer",
        buttons: [
          { id: "b1", text: "Enter Checkout Dashboard", style: "black" }
        ]
      },
      { 
        id: "2", 
        name: "Mpesa Payment Screen", 
        elements: "Phone Number input, merchant ledger reference, and secure checkout trust badges",
        buttons: [
          { id: "b2", text: "Initiate Secure Transaction", style: "green" },
          { id: "b3", text: "Cancel Request", style: "red" }
        ]
      }
    ];
    setScreens(defaults);
    setActiveScreenId("1");
  }, []);

  useEffect(() => {
    if (screens.length > 0) {
      localStorage.setItem("hi_card_inputs_props", JSON.stringify({ screens, activeScreenId }));
      window.dispatchEvent(new Event("storage"));
    }
  }, [screens, activeScreenId]);

  useEffect(() => {
    const handleClear = () => {
      const defaults: PhoneScreen[] = [
        { 
          id: "1", 
          name: "Welcome Screen", 
          elements: "Logo, Enter Passphrase input field, and security credentials disclaimer",
          buttons: [
            { id: "b1", text: "Enter Checkout Dashboard", style: "black" }
          ]
        },
        { 
          id: "2", 
          name: "Mpesa Payment Screen", 
          elements: "Phone Number input, merchant ledger reference, and secure checkout trust badges",
          buttons: [
            { id: "b2", text: "Initiate Secure Transaction", style: "green" },
            { id: "b3", text: "Cancel Request", style: "red" }
          ]
        }
      ];
      setScreens(defaults);
      setActiveScreenId("1");
      setSimulatedActionLog(null);
    };
    window.addEventListener("hi_clear_card_props", handleClear);
    return () => {
      window.removeEventListener("hi_clear_card_props", handleClear);
    };
  }, []);

  const addScreen = () => {
    if (newScreenName.trim()) {
      const newId = Date.now().toString();
      const updated: PhoneScreen[] = [
        ...screens,
        { id: newId, name: newScreenName.trim(), elements: "Describe what this screen contains...", buttons: [] }
      ];
      setScreens(updated);
      setActiveScreenId(newId);
      setNewScreenName("");
    }
  };

  const deleteScreen = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = screens.filter(s => s.id !== id);
    setScreens(updated);
    if (activeScreenId === id && updated.length > 0) {
      setActiveScreenId(updated[0].id);
    }
  };

  const updateActiveElements = (val: string) => {
    setScreens(screens.map(s => s.id === activeScreenId ? { ...s, elements: val } : s));
  };

  const updateActiveName = (val: string) => {
    setScreens(screens.map(s => s.id === activeScreenId ? { ...s, name: val } : s));
  };

  const addButton = () => {
    if (btnText.trim()) {
      const newBtn: PhoneButton = {
        id: Date.now().toString(),
        text: btnText.trim(),
        style: btnStyle
      };
      setScreens(screens.map(s => {
        if (s.id === activeScreenId) {
          return {
            ...s,
            buttons: [...(s.buttons || []), newBtn]
          };
        }
        return s;
      }));
      setBtnText("");
    }
  };

  const deleteButton = (btnId: string) => {
    setScreens(screens.map(s => {
      if (s.id === activeScreenId) {
        return {
          ...s,
          buttons: (s.buttons || []).filter(b => b.id !== btnId)
        };
      }
      return s;
    }));
  };

  const activeScreen = screens.find(s => s.id === activeScreenId);

  const simulateButtonClick = (btn: PhoneButton) => {
    setSimulatedActionLog(`Tapped button: "${btn.text}"`);
    setTimeout(() => setSimulatedActionLog(null), 3000);
  };

  return (
    <div className="space-y-6 text-left">
      <h5 className="font-mono text-xs uppercase font-extrabold text-slate-700 tracking-wider border-b border-dashed border-slate-200 pb-2">
        🛠_ INTERACTIVE PHONE SCREEN PROTOTYPER
      </h5>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left column editor */}
        <div className="lg:col-span-5 space-y-4">
          {/* Screens List */}
          <div className="border-2 border-black p-4 bg-slate-50 space-y-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <span className="text-[10px] font-mono font-black text-slate-700 uppercase block">Screen List</span>
            <div className="space-y-1">
              {screens.map(s => (
                <button
                  key={s.id}
                  onClick={() => setActiveScreenId(s.id)}
                  className={`w-full text-left px-3 py-2 border-2 border-black font-mono text-xs flex items-center justify-between transition-all cursor-pointer ${
                    activeScreenId === s.id ? "bg-black text-white" : "bg-white text-black hover:bg-slate-100"
                  }`}
                >
                  <span className="font-bold truncate">{s.name}</span>
                  {screens.length > 1 && (
                    <span 
                      onClick={(e) => deleteScreen(s.id, e)} 
                      className={`hover:text-red-500 cursor-pointer p-0.5 ${
                        activeScreenId === s.id ? "text-slate-400" : "text-slate-500"
                      }`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </span>
                  )}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="New screen name..."
                value={newScreenName}
                onChange={e => setNewScreenName(e.target.value)}
                className="rounded-none h-9 text-xs"
              />
              <Button onClick={addScreen} className="bg-black hover:bg-slate-900 border-2 border-black rounded-none h-9 text-xs px-3 cursor-pointer">
                <Plus className="w-4 h-4 text-white" />
              </Button>
            </div>
          </div>

          {activeScreen && (
            <div className="border-2 border-black p-4 bg-white space-y-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <div>
                <Label className="text-[10px] font-mono font-black uppercase text-slate-500">Active Screen Name</Label>
                <Input
                  value={activeScreen.name}
                  onChange={e => updateActiveName(e.target.value)}
                  className="rounded-none h-9 text-xs mt-1"
                />
              </div>
              <div>
                <Label className="text-[10px] font-mono font-black uppercase text-slate-500">Screen Layout Description</Label>
                <Textarea
                  value={activeScreen.elements}
                  onChange={e => updateActiveElements(e.target.value)}
                  rows={3}
                  placeholder="Describe standard input fields, payment integrations, or text content..."
                  className="rounded-none text-xs mt-1 resize-none"
                />
              </div>

              {/* Simulated Button Manager */}
              <div className="border-t border-slate-200 pt-3.5 space-y-3">
                <span className="text-[10px] font-mono font-black text-slate-700 uppercase block">Manage Screen Buttons</span>
                
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-[9px] font-mono font-black uppercase text-slate-550">Button Label</Label>
                    <Input
                      value={btnText}
                      onChange={e => setBtnText(e.target.value)}
                      placeholder="e.g. Pay Now"
                      className="rounded-none h-8 text-xs mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-[9px] font-mono font-black uppercase text-slate-550 block mb-1">Theme / Style</Label>
                    <SovereignSelect
                      value={btnStyle}
                      onChange={e => setBtnStyle(e.target.value as any)}
                      className="w-full h-8 rounded-none text-xs px-1.5 focus:outline-none"
                    >
                      <option value="black">Brutalist Black</option>
                      <option value="green">Success Green</option>
                      <option value="yellow">Alert Yellow</option>
                      <option value="red">Danger Red</option>
                    </SovereignSelect>
                  </div>
                </div>

                <Button onClick={addButton} className="w-full bg-black hover:bg-slate-900 border-2 border-black rounded-none text-white font-black uppercase text-[10px] h-8 cursor-pointer">
                  <Plus className="w-3.5 h-3.5 mr-1" /> Add Button to View
                </Button>

                {/* Display list of active buttons */}
                {activeScreen.buttons && activeScreen.buttons.length > 0 && (
                  <div className="space-y-1.5 pt-2">
                    <span className="text-[8px] font-mono font-black text-slate-400 uppercase block">Active Buttons on this Screen</span>
                    <div className="flex flex-wrap gap-2">
                      {activeScreen.buttons.map(b => (
                        <div key={b.id} className="border border-black p-1 bg-slate-50 text-[10px] font-mono flex items-center gap-2">
                          <span className="font-bold">{b.text}</span>
                          <span className="text-[7.5px] uppercase bg-black text-white px-1 leading-none">{b.style}</span>
                          <button onClick={() => deleteButton(b.id)} className="text-slate-400 hover:text-red-500 cursor-pointer shrink-0">
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right column device preview */}
        <div className="lg:col-span-7 flex justify-center">
          <div className="relative w-[280px] h-[520px] bg-slate-900 border-[8px] border-black rounded-[36px] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col overflow-hidden select-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-b-xl z-20" />
            <div className="flex-1 bg-white m-1.5 rounded-[24px] overflow-hidden flex flex-col border border-black relative">
              <div className="h-7 px-4 pt-1.5 flex justify-between items-center text-[10px] font-bold font-mono text-black border-b border-slate-100 bg-slate-50">
                <span>09:41</span>
                <div className="flex items-center gap-1">
                  <span>📶</span>
                  <span>🔋</span>
                </div>
              </div>

              <div className="flex-1 p-4 flex flex-col justify-between overflow-y-auto font-mono text-left relative">
                {activeScreen ? (
                  <div className="space-y-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="border-b-2 border-black pb-1.5 mb-3 flex items-center gap-1">
                        <span className="text-xs font-black">📱 {activeScreen.name}</span>
                      </div>
                      
                      <div className="space-y-3.5">
                        {activeScreen.elements.toLowerCase().includes("logo") && (
                          <div className="border-2 border-black p-2 bg-yellow-100 text-center font-black text-xs shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                            ⭐ SOVEREIGN BRAND
                          </div>
                        )}
                        
                        <p className="text-[10px] text-slate-650 leading-relaxed font-sans border border-dashed border-slate-350 p-2 bg-slate-50 italic">
                          &ldquo;{activeScreen.elements}&rdquo;
                        </p>
                        
                        {activeScreen.elements.toLowerCase().includes("input") && (
                          <div className="space-y-1.5">
                            <span className="text-[8px] font-black uppercase text-slate-500">Simulated Input</span>
                            <div className="border-2 border-black px-2 py-1.5 text-[9px] text-slate-400 bg-slate-50">
                              [ Tap to enter values ]
                            </div>
                          </div>
                        )}

                        {/* Custom Buttons Rendering */}
                        {activeScreen.buttons && activeScreen.buttons.length > 0 && (
                          <div className="space-y-2 pt-2 border-t border-slate-100">
                            <span className="text-[8px] font-black uppercase text-slate-400 block mb-1">Simulated Action triggers</span>
                            {activeScreen.buttons.map(b => {
                              const styleClass = 
                                b.style === "green" ? "bg-emerald-400 text-black hover:bg-emerald-500" :
                                b.style === "yellow" ? "bg-[#facc15] text-black hover:bg-yellow-500" :
                                b.style === "red" ? "bg-rose-500 text-white hover:bg-rose-600" :
                                "bg-black text-white hover:bg-slate-900";

                              return (
                                <button
                                  key={b.id}
                                  onClick={() => simulateButtonClick(b)}
                                  className={`w-full border-2 border-black py-2 text-[9px] font-black uppercase text-center shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-transform active:translate-x-[0.5px] active:translate-y-[0.5px] active:shadow-none cursor-pointer ${styleClass}`}
                                >
                                  {b.text}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bottom simulation toast feedback */}
                    {simulatedActionLog && (
                      <div className="absolute bottom-6 left-3 right-3 bg-slate-900 border-2 border-black text-white p-2 text-[9px] font-bold text-center animate-bounce z-10">
                        {simulatedActionLog}
                      </div>
                    )}

                    <div className="pt-4 mt-auto border-t border-slate-100 flex justify-center gap-3">
                      <div className="w-8 h-1 bg-slate-350 rounded-full" />
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 italic text-center my-auto">Select or add a screen to preview.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}