"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Check, Search, Download, Layers, ShieldCheck, HelpCircle, FileText } from "lucide-react";

interface Alternative {
  name: string;
  url: string;
}

interface Platform {
  name: string;
  url: string;
  bestFor: string;
  learningCurve: string;
  alternatives: Alternative[];
}

const brandingCategories: Record<string, Platform[]> = {
  "Logos Branding and Graphic Design": [
    {
      name: "Canva AI 2.0",
      url: "https://www.canva.com",
      bestFor: "All in one campaign asset production and brand kits",
      learningCurve: "Very Easy",
      alternatives: [
        { name: "Adobe Express", url: "https://www.adobe.com/express" },
        { name: "Designs.ai", url: "https://designs.ai" }
      ]
    },
    {
      name: "Recraft AI",
      url: "https://www.recraft.ai",
      bestFor: "Scalable vector logos and brand illustrations",
      learningCurve: "Moderate",
      alternatives: [
        { name: "Midjourney v7", url: "https://www.midjourney.com" },
        { name: "Illustrator", url: "https://www.adobe.com/products/illustrator" }
      ]
    },
    {
      name: "Figma",
      url: "https://www.figma.com",
      bestFor: "Professional UI vector design and branding libraries",
      learningCurve: "Advanced",
      alternatives: [
        { name: "Sketch", url: "https://www.sketch.com" },
        { name: "Penpot", url: "https://penpot.app" }
      ]
    }
  ],
  "Websites and Landing Pages": [
    {
      name: "Webflow",
      url: "https://www.webflow.com",
      bestFor: "Custom content databases and production grade websites",
      learningCurve: "Advanced",
      alternatives: [
        { name: "Framer", url: "https://www.framer.com" },
        { name: "Carrd", url: "https://carrd.co" }
      ]
    },
    {
      name: "Framer",
      url: "https://www.framer.com",
      bestFor: "Figma to web landing pages and animated sites",
      learningCurve: "Moderate",
      alternatives: [
        { name: "Elementor", url: "https://elementor.com" },
        { name: "WordPress", url: "https://wordpress.org" }
      ]
    }
  ],
  "Ecommerce and Payments": [
    {
      name: "Shopify",
      url: "https://www.shopify.com",
      bestFor: "Store checkouts and inventory logistics",
      learningCurve: "Easy",
      alternatives: [
        { name: "WooCommerce", url: "https://woocommerce.com" },
        { name: "Wix Studio", url: "https://www.wix.com/studio" }
      ]
    },
    {
      name: "Lemon Squeezy",
      url: "https://www.lemonsqueezy.com",
      bestFor: "SaaS app checkouts digital files and tax compliance",
      learningCurve: "Easy",
      alternatives: [
        { name: "Gumroad", url: "https://gumroad.com" },
        { name: "Stripe", url: "https://stripe.com" }
      ]
    },
    {
      name: "Paystack",
      url: "https://paystack.com",
      bestFor: "African checkouts local cards bank transfers and Mpesa mobile money integrations",
      learningCurve: "Easy",
      alternatives: [
        { name: "Pesapal", url: "https://www.pesapal.com" },
        { name: "Intasend", url: "https://intasend.com" }
      ]
    }
  ],
  "Copywriting and SEO": [
    {
      name: "Jasper AI",
      url: "https://www.jasper.ai",
      bestFor: "Brand voice marketing copy and blog campaigns",
      learningCurve: "Easy",
      alternatives: [
        { name: "Copy.ai", url: "https://www.copy.ai" },
        { name: "Writesonic", url: "https://writesonic.com" }
      ]
    }
  ],
  "Automation and Backends": [
    {
      name: "Make.com",
      url: "https://www.make.com",
      bestFor: "Visual automation flows and database integrations",
      learningCurve: "Moderate",
      alternatives: [
        { name: "Zapier", url: "https://zapier.com" },
        { name: "n8n.io", url: "https://n8n.io" }
      ]
    }
  ],
  "Email & Campaigns": [
    {
      name: "Mailchimp",
      url: "https://mailchimp.com",
      bestFor: "Send newsletters & promos; AI writes subject lines and email text for you",
      learningCurve: "Very Easy",
      alternatives: [
        { name: "Beehiiv", url: "https://www.beehiiv.com" },
        { name: "ConvertKit", url: "https://convertkit.com" }
      ]
    },
    {
      name: "Brevo",
      url: "https://www.brevo.com",
      bestFor: "Email + SMS + WhatsApp campaigns, generous free plan",
      learningCurve: "Easy",
      alternatives: [
        { name: "Omnisend", url: "https://www.omnisend.com" }
      ]
    },
    {
      name: "MailerLite",
      url: "https://www.mailerlite.com",
      bestFor: "Drag-and-drop emails with AI writing help",
      learningCurve: "Very Easy",
      alternatives: [
        { name: "Beehiiv", url: "https://www.beehiiv.com" },
        { name: "ConvertKit", url: "https://convertkit.com" }
      ]
    }
  ]
};

interface StackItemSelection {
  toolName: string;
  status: string;
  notes: string;
  url: string;
}

export default function BrandingBlueprintWorkbench() {
  const [activeCategory, setActiveCategory] = useState<string>("Logos Branding and Graphic Design");
  const [selectedTools, setSelectedTools] = useState<Record<string, StackItemSelection>>({});
  const [customToolInput, setCustomToolInput] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [ventureName, setVentureName] = useState<string>("");
  const [brandNotes, setBrandNotes] = useState<string>("");

  // Load selection from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("hi_brand_stack_inputs");
      if (saved) {
        setSelectedTools(JSON.parse(saved));
      }
      const savedVN = localStorage.getItem("hi_venture_name") || "";
      setVentureName(savedVN);
      const savedNotes = localStorage.getItem("hi_brand_blueprint_doc_notes") || "";
      setBrandNotes(savedNotes);
    } catch (e) {
      console.error("Failed to load brand stack input cache", e);
    }
  }, []);

  const handleBrandNotesChange = (val: string) => {
    setBrandNotes(val);
    localStorage.setItem("hi_brand_blueprint_doc_notes", val);
  };

  // Update selection
  const updateStackSelection = (category: string, field: keyof StackItemSelection, value: string) => {
    const updated = {
      ...selectedTools,
      [category]: {
        toolName: selectedTools[category]?.toolName || "",
        status: selectedTools[category]?.status || "Not Started",
        notes: selectedTools[category]?.notes || "",
        url: selectedTools[category]?.url || "",
        ...{ [field]: value }
      }
    };
    setSelectedTools(updated);
    localStorage.setItem("hi_brand_stack_inputs", JSON.stringify(updated));
  };

  const handleSelectTool = (category: string, tool: Platform | Alternative) => {
    const isAlt = !('bestFor' in tool);
    const updated = {
      ...selectedTools,
      [category]: {
        toolName: tool.name,
        status: selectedTools[category]?.status || "Account Created",
        notes: selectedTools[category]?.notes || "",
        url: tool.url,
      }
    };
    setSelectedTools(updated);
    localStorage.setItem("hi_brand_stack_inputs", JSON.stringify(updated));
    setCustomToolInput("");
  };

  const handleCustomToolSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customToolInput.trim()) return;
    updateStackSelection(activeCategory, "toolName", customToolInput.trim());
    updateStackSelection(activeCategory, "url", "");
    setCustomToolInput("");
  };

  // Check if categories are complete
  const categoriesList = Object.keys(brandingCategories);
  const completedCount = categoriesList.filter(cat => !!selectedTools[cat]?.toolName).length;
  const isStackComplete = completedCount === categoriesList.length;

  // Filter tools based on query
  const rawTools = brandingCategories[activeCategory] || [];
  const filteredTools = rawTools.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.bestFor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.alternatives.some(a => a.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const triggerPDFExport = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const brandName = ventureName || "Sovereign Venture";

    let notesHTML = "";
    if (brandNotes && brandNotes.trim()) {
      notesHTML = `
        <h3>Branding Blueprint HCD Documentation Notes</h3>
        <div class="section" style="background: #fffbeb; border: 2px solid black; font-style: italic; white-space: pre-wrap; font-size: 11px;">
          ${brandNotes}
        </div>
      `;
    }

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Branding & Tech Stack Blueprint - ${brandName}</title>
        <style>
          body {
            font-family: monospace;
            padding: 40px;
            color: #1a1a1a;
            line-height: 1.4;
          }
          h2 {
            text-transform: uppercase;
            border-bottom: 4px solid black;
            padding-bottom: 10px;
            margin-bottom: 5px;
            font-size: 20px;
          }
          .subtitle {
            font-size: 11px;
            color: #666;
            margin-bottom: 30px;
            text-transform: uppercase;
          }
          .card {
            border: 2px solid black;
            padding: 15px;
            margin-bottom: 20px;
            background: #fafafa;
          }
          .card-title {
            font-weight: bold;
            font-size: 13px;
            text-transform: uppercase;
            border-bottom: 1px dashed black;
            padding-bottom: 5px;
            margin-bottom: 10px;
            display: flex;
            justify-content: space-between;
          }
          .label {
            font-size: 9px;
            color: #666;
            text-transform: uppercase;
            font-weight: bold;
            margin-top: 10px;
            margin-bottom: 2px;
          }
          .value {
            font-size: 12px;
            font-weight: bold;
          }
          .notes {
            font-size: 11px;
            font-style: italic;
            background: #fff;
            padding: 8px;
            border: 1px solid #ccc;
            margin-top: 5px;
          }
          .footer {
            margin-top: 50px;
            font-size: 10px;
            border-top: 1px solid black;
            padding-top: 10px;
            text-align: center;
          }
          @media print {
            body { padding: 20px; }
          }
        </style>
      </head>
      <body>
        <h2>Sovereign Brand Tech Stack Manifest</h2>
        <div class="subtitle">Venture: ${brandName} | Generated: ${new Date().toLocaleDateString()}</div>
        
        ${categoriesList.map(cat => {
          const sel = selectedTools[cat];
          return `
            <div class="card">
              <div class="card-title">
                <span>${cat}</span>
                <span>[${sel?.status || "NOT CONFIGURED"}]</span>
              </div>
              <div>
                <span class="label">Primary Platform:</span>
                <span class="value">${sel?.toolName ? `${sel.toolName} ${sel.url ? `(${sel.url})` : ""}` : "None Selected"}</span>
              </div>
              ${sel?.notes ? `
                <div>
                  <span class="label">Integration Details & Plan:</span>
                  <div class="notes">${sel.notes}</div>
                </div>
              ` : ""}
            </div>
          `;
        }).join("")}
        
        ${notesHTML}
        
        <div class="footer">
          Sovereign Millionaires Product Builder &copy; 2026 - Branding Stack Blueprint
        </div>
        <script>
          window.onload = function() {
            window.print();
          };
        </script>
      </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
  };

  return (
    <div className="space-y-6">
      {/* Overview stats panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#f8fafc] border-2 border-black p-4">
        <div>
          <span className="text-[9px] font-mono font-bold uppercase text-slate-500">Configuration Venture</span>
          <h4 className="text-sm font-black font-mono uppercase text-slate-900 mt-0.5">{ventureName || "Default Venture"}</h4>
        </div>
        <div>
          <span className="text-[9px] font-mono font-bold uppercase text-slate-500">Stack Setup Progress</span>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex-1 bg-slate-200 h-2 border border-black rounded-none">
              <div 
                className="bg-black h-full transition-all duration-300"
                style={{ width: `${(completedCount / categoriesList.length) * 100}%` }}
              />
            </div>
            <span className="text-xs font-mono font-black">{completedCount}/{categoriesList.length}</span>
          </div>
        </div>
        <div className="flex justify-end items-center">
          <Button 
            onClick={triggerPDFExport}
            disabled={completedCount === 0}
            className="w-full md:w-auto bg-black hover:bg-slate-800 text-white font-mono text-[11px] rounded-none border border-black font-black uppercase tracking-wider py-1.5 h-9 flex items-center gap-1 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" /> Export Stack PDF
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left category list sidebar */}
        <div className="lg:col-span-4 space-y-2">
          <span className="text-[10px] font-mono font-black text-slate-500 uppercase block mb-1">Select Workflow Layer</span>
          {categoriesList.map(cat => {
            const selectedTool = selectedTools[cat]?.toolName;
            const status = selectedTools[cat]?.status;
            const isCurrent = activeCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setSearchQuery("");
                }}
                className={`w-full text-left p-3 border-2 transition-all font-mono flex items-center justify-between rounded-none cursor-pointer group ${
                  isCurrent 
                    ? "bg-slate-900 border-slate-950 text-white" 
                    : "bg-white border-black text-slate-800 hover:bg-slate-50"
                }`}
              >
                <div className="min-w-0 pr-2">
                  <div className={`text-[11px] font-black uppercase leading-tight truncate`}>
                    {cat.split(" ").slice(0, 3).join(" ")}
                  </div>
                  <div className={`text-[9px] mt-1 font-semibold truncate ${isCurrent ? "text-slate-300" : "text-slate-500"}`}>
                    {selectedTool ? `${selectedTool} (${status || "Not Started"})` : "No tool selected"}
                  </div>
                </div>
                {selectedTool && (
                  <span className={`w-5 h-5 shrink-0 rounded-none border flex items-center justify-center text-[10px] ${
                    isCurrent ? "bg-white text-black border-white" : "bg-black text-white border-black"
                  }`}>
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Right workspace workbench */}
        <div className="lg:col-span-8 space-y-6">
          <Card className="border-2 border-black rounded-none shadow-none bg-white">
            <CardContent className="p-5 space-y-5 text-left">
              <div>
                <span className="text-[9px] font-mono font-black text-slate-400 block uppercase">Active Workflow Segment</span>
                <h3 className="font-heading text-slate-900 text-sm uppercase tracking-widest font-black font-mono border-b border-dashed border-slate-200 pb-2 mt-1">
                  🌐 {activeCategory}
                </h3>
              </div>

              {/* Tool Selection Area */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <span className="text-[10px] font-mono font-black text-slate-700 uppercase">Recommended Sovereign Platforms</span>
                  {/* Small search widget */}
                  <div className="relative max-w-xs w-full">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <Input 
                      placeholder="Search platforms..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="pl-8 text-[11px] h-8 rounded-none border-black focus-visible:ring-0"
                    />
                  </div>
                </div>

                {filteredTools.length === 0 ? (
                  <p className="text-xs text-slate-400 italic font-mono">No matching tools found for "{searchQuery}"</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {filteredTools.map(tool => {
                      const isSelected = selectedTools[activeCategory]?.toolName === tool.name;

                      return (
                        <div 
                          key={tool.name}
                          onClick={() => handleSelectTool(activeCategory, tool)}
                          className={`border-2 p-3 rounded-none cursor-pointer transition-all flex flex-col justify-between h-[120px] ${
                            isSelected 
                              ? "bg-slate-50 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]" 
                              : "bg-white border-slate-200 hover:border-black"
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between">
                              <a 
                                href={tool.url} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-xs font-mono font-black uppercase text-slate-900 hover:underline flex items-center gap-0.5"
                                onClick={e => e.stopPropagation()} // don't select tool when clicking external link
                              >
                                {tool.name} ↗
                              </a>
                              <Badge className={`text-[9px] font-mono font-bold rounded-none uppercase px-1.5 py-0.5 ${
                                tool.learningCurve === "Very Easy" ? "bg-emerald-100 text-emerald-800" :
                                tool.learningCurve === "Easy" ? "bg-cyan-100 text-cyan-800" :
                                tool.learningCurve === "Moderate" ? "bg-amber-100 text-amber-800" :
                                "bg-purple-100 text-purple-800"
                              }`}>
                                {tool.learningCurve}
                              </Badge>
                            </div>
                            <p className="text-[10px] text-slate-500 mt-1 leading-normal">{tool.bestFor}</p>
                          </div>

                          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                            <span className="text-[9px] font-mono text-slate-400">Click to Select</span>
                            {isSelected && (
                              <span className="text-[10px] font-mono font-black text-emerald-600 flex items-center gap-0.5">
                                <Check className="w-3.5 h-3.5 stroke-[3]" /> SELECTED
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Alternatives List */}
              {filteredTools.length > 0 && (
                <div className="border border-slate-200 p-3 bg-slate-50/50">
                  <span className="text-[9px] font-mono font-bold text-slate-500 uppercase block mb-2">Key Alternatives</span>
                  <div className="flex flex-wrap gap-2">
                    {filteredTools.flatMap(t => t.alternatives).map(alt => {
                      const isSelected = selectedTools[activeCategory]?.toolName === alt.name;
                      return (
                        <button
                          key={alt.name}
                          onClick={() => handleSelectTool(activeCategory, alt)}
                          className={`text-[10px] px-2.5 py-1 font-mono transition-all border cursor-pointer ${
                            isSelected 
                              ? "bg-black text-white border-black" 
                              : "bg-white hover:bg-slate-100 text-slate-700 border-slate-300"
                          }`}
                        >
                          {alt.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Custom Input */}
              <form onSubmit={handleCustomToolSubmit} className="flex gap-2">
                <div className="flex-1">
                  <Label className="text-[9px] font-mono font-black text-slate-600 uppercase">Or Enter Custom Platform Choice</Label>
                  <Input 
                    placeholder="Enter custom tool name (e.g. Photoshop)..."
                    value={customToolInput}
                    onChange={e => setCustomToolInput(e.target.value)}
                    className="text-[11px] h-8 rounded-none border-black mt-1 bg-white focus-visible:ring-0"
                  />
                </div>
                <Button 
                  type="submit"
                  disabled={!customToolInput.trim()}
                  className="bg-black hover:bg-slate-800 text-white rounded-none border border-black text-xs font-black uppercase tracking-wider px-4 mt-5 h-8 flex items-center justify-center cursor-pointer shrink-0"
                >
                  Apply Tool
                </Button>
              </form>

              {/* Selected Tool Details Config */}
              {selectedTools[activeCategory]?.toolName && (
                <div className="border-2 border-black p-4 bg-slate-50 space-y-4">
                  <div className="flex items-center justify-between border-b border-dashed border-slate-350 pb-2">
                    <span className="text-[10px] font-mono font-black text-slate-900 uppercase">
                      🔧 STACK SETTINGS: {selectedTools[activeCategory].toolName}
                    </span>
                    <button 
                      onClick={() => {
                        const updated = { ...selectedTools };
                        delete updated[activeCategory];
                        setSelectedTools(updated);
                        localStorage.setItem("hi_brand_stack_inputs", JSON.stringify(updated));
                      }}
                      className="text-[10px] font-mono text-rose-600 font-bold hover:underline cursor-pointer"
                    >
                      Clear Selection
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-[9px] font-mono font-black text-slate-700 uppercase">Venture Setup Status</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {["Not Started", "Account Created", "Active Project Integration"].map(s => {
                          const isCurrent = selectedTools[activeCategory].status === s;
                          return (
                            <button
                              key={s}
                              type="button"
                              onClick={() => updateStackSelection(activeCategory, "status", s)}
                              className={`text-[9px] px-2 py-1 font-mono font-bold transition-all border cursor-pointer ${
                                isCurrent 
                                  ? "bg-slate-900 text-white border-slate-950" 
                                  : "bg-white hover:bg-slate-100 text-slate-650 border-slate-300"
                              }`}
                            >
                              {s}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <Label className="text-[9px] font-mono font-black text-slate-700 uppercase">Integration Notes</Label>
                      <Textarea 
                        placeholder="Write down how you will use this platform in your workflow..."
                        value={selectedTools[activeCategory].notes}
                        onChange={e => updateStackSelection(activeCategory, "notes", e.target.value)}
                        className="text-[11px] min-h-[60px] rounded-none border-black mt-1 bg-white focus-visible:ring-0"
                      />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Live Brand Stack Manifest summary card */}
      <Card className="border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-slate-900 text-white text-left">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-amber-400" />
              <h4 className="font-heading text-sm uppercase tracking-wider font-extrabold font-mono">
                Sovereign Tech Stack Manifest
              </h4>
            </div>
            {isStackComplete ? (
              <Badge className="bg-amber-400 text-black border border-amber-500 rounded-none font-mono font-bold flex items-center gap-1 uppercase tracking-widest text-[9px]">
                <ShieldCheck className="w-3.5 h-3.5" /> STACK READY
              </Badge>
            ) : (
              <Badge className="bg-slate-800 text-slate-400 border border-slate-700 rounded-none font-mono font-medium flex items-center gap-1 uppercase tracking-widest text-[9px]">
                INCOMPLETE ({completedCount}/{categoriesList.length})
              </Badge>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {categoriesList.map(cat => {
              const sel = selectedTools[cat];
              return (
                <div key={cat} className="border border-slate-800 bg-slate-950 p-3 flex flex-col justify-between min-h-[90px]">
                  <div>
                    <span className="text-[8px] font-mono uppercase text-slate-500 block truncate">
                      {cat.split(" ")[0]}
                    </span>
                    <span className="text-xs font-mono font-black uppercase text-slate-100 block mt-1 truncate">
                      {sel?.toolName || "None"}
                    </span>
                  </div>
                  <div className="mt-2">
                    <span className={`inline-block text-[8px] font-mono px-1 py-0.2 uppercase font-bold ${
                      sel?.status === "Active Project Integration" ? "bg-emerald-950/60 text-emerald-400" :
                      sel?.status === "Account Created" ? "bg-cyan-950/60 text-cyan-400" :
                      "bg-slate-900 text-slate-500"
                    }`}>
                      {sel?.status || "NOT STARTED"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {isStackComplete && (
            <div className="bg-amber-950/40 border border-amber-900/60 p-3 text-xs font-mono text-amber-250 flex items-center gap-3">
              <span className="text-lg">🎯</span>
              <p>
                <strong>Venture Brand stack complete!</strong> You have designated a platform choice for all your layers. Download your PDF Stack Manifest above to present to your syndicate or save for setup.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Unified Documentation Notes Block */}
      <div className="border-2 border-black p-4 bg-[#fffbeb] space-y-2.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex items-center gap-1.5 border-b border-black pb-1.5 text-black">
          <FileText className="w-4 h-4 text-black shrink-0" />
          <Label className="text-[10px] font-mono font-black uppercase text-black tracking-wider">
            Branding Blueprint Summary Notes & HCD Documentation
          </Label>
        </div>
        <Textarea 
          value={brandNotes} 
          onChange={e => handleBrandNotesChange(e.target.value)} 
          placeholder="Record key brand strategy takeaways, domain ideas, visual asset links, and copywriting style decisions here to document your brand identity choices..." 
          rows={3}
          className="border-2 border-black rounded-none text-xs bg-white text-black focus-visible:ring-0 focus-visible:border-black resize-none"
        />
        <div className="text-[9px] font-mono text-slate-500 italic">
          * This documentation ledger is saved automatically and will be compiled at the bottom of your stack manifest PDF.
        </div>
      </div>
    </div>
  );
}
