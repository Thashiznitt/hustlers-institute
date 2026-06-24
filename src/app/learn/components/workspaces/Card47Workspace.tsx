"use client";

import React, { useState, useEffect } from "react";
import { Plus, Trash2, Check, Calendar, Share2, Layers } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SovereignInput as Input } from "@/components/ui/SovereignInput";
import { Label } from "@/components/ui/label";
import { SovereignTextarea as Textarea } from "@/components/ui/SovereignTextarea";
import { SovereignSelect } from "@/components/ui/SovereignSelect";

interface Post {
  id: number;
  day: string;
  channel: string;
  pillar: string;
  copy: string;
  status: string;
}

export default function Card47Workspace() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [day, setDay] = useState("Monday");
  const [channel, setChannel] = useState("Twitter/X");
  const [pillar, setPillar] = useState("Educational/Value");
  const [copy, setCopy] = useState("");
  const [status, setStatus] = useState("Draft");

  const defaultPosts: Post[] = [
    {
      id: 1,
      day: "Monday",
      channel: "Twitter/X",
      pillar: "Educational/Value",
      copy: "Struggling to keep track of daily cash sales? Paper ledgers get lost. Excel is too complex. Real millionaires automate early.",
      status: "Scheduled"
    },
    {
      id: 2,
      day: "Wednesday",
      channel: "WhatsApp",
      pillar: "Product/Feature",
      copy: "Introducing Sovereign Ledger! Generate instant sales calculations and send WhatsApp invoice receipts directly from your phone.",
      status: "Draft"
    },
    {
      id: 3,
      day: "Friday",
      channel: "LinkedIn",
      pillar: "Customer Story",
      copy: "How Maria (a freelance designer) went from chasing late invoice payments to getting paid in under 10 minutes. Read her case study.",
      status: "Scheduled"
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem("hi_card_inputs_content-calendar");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.posts) {
          setPosts(parsed.posts);
          return;
        }
      } catch (e) {}
    }
    setPosts(defaultPosts);
  }, []);

  useEffect(() => {
    localStorage.setItem("hi_card_inputs_content-calendar", JSON.stringify({ posts }));
    window.dispatchEvent(new Event("storage"));
  }, [posts]);

  useEffect(() => {
    const handleClear = () => {
      setPosts(defaultPosts);
    };
    window.addEventListener("hi_clear_card_content-calendar", handleClear);
    return () => {
      window.removeEventListener("hi_clear_card_content-calendar", handleClear);
    };
  }, []);

  const addPost = () => {
    if (copy.trim()) {
      setPosts([
        ...posts,
        {
          id: Date.now(),
          day,
          channel,
          pillar,
          copy: copy.trim(),
          status
        }
      ]);
      setCopy("");
    }
  };

  const deletePost = (id: number) => {
    setPosts(posts.filter(p => p.id !== id));
  };

  return (
    <div className="space-y-6 text-left">
      <h5 className="font-mono text-xs uppercase font-extrabold text-slate-700 tracking-wider border-b border-dashed border-slate-200 pb-2">
        🛠_ CONTENT CALENDAR WORKBENCH
      </h5>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Form panel */}
        <div className="lg:col-span-5 border-2 border-black p-4 bg-slate-50 space-y-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <span className="text-[10px] font-mono font-black text-slate-700 uppercase block border-b border-black pb-1.5 mb-2">Schedule New Post</span>
          
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-[9px] font-mono font-black uppercase text-slate-500">Post Day</Label>
              <SovereignSelect 
                value={day} 
                onChange={e => setDay(e.target.value)} 
                className="w-full rounded-none text-xs mt-1 h-9 px-2 focus:outline-none"
              >
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </SovereignSelect>
            </div>
            <div>
              <Label className="text-[9px] font-mono font-black uppercase text-slate-500">Channel</Label>
              <SovereignSelect 
                value={channel} 
                onChange={e => setChannel(e.target.value)} 
                className="w-full rounded-none text-xs mt-1 h-9 px-2 focus:outline-none"
              >
                {["Twitter/X", "LinkedIn", "WhatsApp", "Instagram", "YouTube", "Newsletter", "TikTok", "Facebook", "Snapchat"].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </SovereignSelect>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-[9px] font-mono font-black uppercase text-slate-500">Content Pillar</Label>
              <SovereignSelect 
                value={pillar} 
                onChange={e => setPillar(e.target.value)} 
                className="w-full rounded-none text-xs mt-1 h-9 px-2 focus:outline-none"
              >
                {["Product/Feature", "Educational/Value", "Customer Story", "Direct Offer", "Behind the Scenes"].map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </SovereignSelect>
            </div>
            <div>
              <Label className="text-[9px] font-mono font-black uppercase text-slate-500">Status</Label>
              <SovereignSelect 
                value={status} 
                onChange={e => setStatus(e.target.value)} 
                className="w-full rounded-none text-xs mt-1 h-9 px-2 focus:outline-none"
              >
                {["Draft", "Scheduled", "Published"].map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </SovereignSelect>
            </div>
          </div>

          <div>
            <Label className="text-[9px] font-mono font-black uppercase text-slate-500">Post Draft Copy</Label>
            <Textarea 
              value={copy} 
              onChange={e => setCopy(e.target.value)} 
              placeholder="Write your social post copy draft here..." 
              rows={4} 
              className="rounded-none text-xs mt-1 resize-none" 
            />
          </div>

          <Button onClick={addPost} className="w-full bg-black hover:bg-slate-900 border-2 border-black rounded-none text-white font-black uppercase text-[10px] h-9 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] cursor-pointer">
            <Plus className="w-4 h-4 mr-1 text-white" /> Schedule Post
          </Button>
        </div>

        {/* Calendar / List panel */}
        <div className="lg:col-span-7 space-y-4">
          <div className="border-2 border-black bg-white p-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] space-y-4">
            <div className="flex items-center justify-between border-b border-black pb-2">
              <span className="text-[9px] font-mono font-black text-slate-400 uppercase">Weekly Calendar View ({posts.length} posts)</span>
              <Calendar className="w-4 h-4 text-slate-500" />
            </div>

            {posts.length === 0 ? (
              <p className="text-xs text-slate-400 italic py-6 text-center">No posts scheduled. Add one using the scheduler form.</p>
            ) : (
              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
                {posts.map(p => (
                  <div key={p.id} className="border-2 border-black p-3 bg-slate-50 space-y-2 relative text-xs">
                    <div className="flex items-center justify-between border-b border-dashed border-slate-300 pb-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <Badge className="bg-amber-400 text-black border border-black rounded-none font-mono text-[9px] px-1.5 py-0">
                          {p.day}
                        </Badge>
                        <Badge className="bg-slate-900 text-white border border-black rounded-none font-mono text-[9px] px-1.5 py-0 flex items-center gap-0.5">
                          <Share2 className="w-2.5 h-2.5 text-white" /> {p.channel}
                        </Badge>
                        <Badge className="bg-slate-200 text-slate-800 border border-slate-300 rounded-none font-mono text-[9px] px-1.5 py-0 flex items-center gap-0.5">
                          <Layers className="w-2.5 h-2.5 text-slate-655" /> {p.pillar}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[9px] font-mono px-1 py-0.2 uppercase font-bold border ${
                          p.status === "Published" ? "bg-emerald-100 text-emerald-800 border-emerald-300" :
                          p.status === "Scheduled" ? "bg-cyan-100 text-cyan-800 border-cyan-300" :
                          "bg-slate-200 text-slate-700 border-slate-350"
                        }`}>
                          {p.status}
                        </span>
                        <button onClick={() => deletePost(p.id)} className="text-slate-400 hover:text-red-500 cursor-pointer shrink-0">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <p className="font-sans text-slate-855 font-medium leading-relaxed italic bg-white p-2.5 border border-slate-200">
                      &ldquo;{p.copy}&rdquo;
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}