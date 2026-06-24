"use client";

import React, { useState } from "react";
import { BookOpen, Target, CheckCircle2, ShieldAlert } from "lucide-react";
import { phasesData } from "@/app/learn/data/phases";

interface Lesson {
  title: string;
  points: string[];
}

interface Assessment {
  title: string;
  scenario: string;
  challenges: string[];
  questions: string[];
}

interface Module {
  id: string;
  num: number;
  title: string;
  subtitle: string;
  objective: string;
  lessons: Lesson[];
  assessment: Assessment;
}

const assessmentsMap: Record<string, Assessment> = {
  "phase-1": {
    title: "Brand & Niche Check",
    scenario: "You are planning a local app that connects fitness center bookings, meal prep deliveries, and taxi rides. You need to outline your launch plan and brand messaging.",
    challenges: [
      "Getting gym and restaurant owners to partner with you",
      "Tying these services together under one clear brand name",
      "Getting local users to trust your brand with their contact info"
    ],
    questions: [
      "How do you choose your first 3 local partner businesses to list on the app?",
      "Write down a simple, friendly 2-sentence slogan for your brand.",
      "What 2 guarantees will you show on your signup page to build instant trust?"
    ]
  },
  "phase-2": {
    title: "Fixing a Stagnant App",
    scenario: "A food delivery app has 5,000 signups, but users order once and never return. You have a small budget to figure out why they are leaving and how to keep them ordering.",
    challenges: [
      "Lots of signups, but active usage drops to zero quickly",
      "Users ignore secondary features like dessert options or group orders",
      "Budget is tight and you need immediate user feedback"
    ],
    questions: [
      "How would you use simple customer diaries to understand where their app experience fails?",
      "Design one friendly trigger or notification to bring users back within 7 days.",
      "Write down 3 simple questions to ask users in a feedback coffee session."
    ]
  },
  "phase-3": {
    title: "Speed Recovery",
    scenario: "Your booking website slows down significantly during a weekend sports promotion because too many users try to book gym classes at once.",
    challenges: [
      "Website slows down and frustrates booking customers",
      "Developers and designers blame each other for the speed drop",
      "Need to track the fix on your task board while keeping the business running"
    ],
    questions: [
      "How do you trace the customer steps to find out which page is slow?",
      "What changes to your hosting or database setup can quickly boost site speed?",
      "Write a simple developer task description with clear steps to fix this."
    ]
  },
  "phase-4": {
    title: "Scaling the Business",
    scenario: "A client wants to hire your agency to design and launch their online service portal. You need to structure a retainer proposal and set up your business safely.",
    challenges: [
      "Estimating monthly tasks without committing to unpaid overtime",
      "Protecting your custom design templates from being copied",
      "Structuring the business legally so you can collect global payments"
    ],
    questions: [
      "Write a 1-paragraph retainer summary showing scope, price, and payment terms.",
      "How do you legally ensure the custom files belong to the client only after full payment?",
      "Name 2 steps you will take to register your brand and protect your name."
    ]
  },
  "phase-5": {
    title: "The Launch Campaign",
    scenario: "You are ready to launch your lifestyle app in a neighboring city next month. You have a small budget and need to set up a growth referral loop and track results.",
    challenges: [
      "Launching with a small advertising budget",
      "Motivating users to share the app with their friends",
      "Selecting the 3 most important numbers to track daily growth"
    ],
    questions: [
      "Design a simple referral reward that gets users to share the app with friends.",
      "How do you approach your first 5 retail partners for a joint promotion?",
      "Name the 3 simple numbers you will track on your dashboard to check launch success."
    ]
  }
};

const modulesData: Module[] = phasesData.map(phase => {
  const assessment = assessmentsMap[phase.id] || {
    title: "Phase Check",
    scenario: "Complete the exercises to validate your venture design.",
    challenges: [],
    questions: []
  };

  return {
    id: phase.id,
    num: phase.num,
    title: phase.title,
    subtitle: phase.subtitle,
    objective: phase.objective,
    lessons: phase.lessons.map(lesson => ({
      title: `Lesson ${lesson.id}: ${lesson.title}`,
      points: lesson.points
    })),
    assessment
  };
});

export default function CurriculumExplorer({ isAuthenticated }: { isAuthenticated?: boolean }) {
  const [activeModuleId, setActiveModuleId] = useState<string>("phase-1");
  const [selectedVertical, setSelectedVertical] = useState<string>("Local Services & Delivery");

  // Helper function to rewrite module data based on vertical
  const getDynamicModule = (mod: Module, vertical: string): Module => {
    if (vertical === "Local Services & Delivery") {
      return mod;
    }

    let replacements: Record<string, string> = {};
    if (vertical === "Tech & SaaS") {
      replacements = {
        // Assessment replacements (still in assessmentsMap)
        "everyday services like gym bookings, food delivery, or rides": "digital software services like subscriber task trackers, server hosts, or data pipelines",
        "gym and restaurant owners": "software team leads and developer partners",
        "gym class bookings": "developer API logs",
        "fitness center bookings, meal prep deliveries, and taxi rides": "subscriber task managers, server monitors, and analytics dashboards",
        "gym owner": "tech lead",
        "gym pass plus a free meal prep bowl": "task planner plus a free automated server test credits package",
        "food delivery app": "SaaS project manager tool",
        "weekend sports promotion": "large scale API marketing event",
        "book gym classes": "access dashboard pipelines",
        "lifestyle app": "tech platform",
        "retail partners": "integrations partners",
        
        // New unified phasesData replacements
        "local businesses": "SaaS startups",
        "existing businesses": "existing software platforms",
        "businesses that already have": "software platforms that already have",
        "paying customers": "paying subscribers",
        "Customer Chats": "User Interviews",
        "Watching Customers": "Monitoring User Logs",
        "Daily Diaries": "System Usage Slices",
        "customer journey": "user journey",
        "customer steps": "user event logs",
        "customer experiences": "user experiences",
        "customer experience": "user experience",
        "customer feedback": "user feedback",
        "first key hire or freelancer": "first software developer or devops freelancer",
        "survey after delivery": "feedback prompt after deployment",
        "user journey, a database system, or a business process": "user flow, a database schema, or a software service"
      };
    } else if (vertical === "Ecommerce & Retail") {
      replacements = {
        // Assessment replacements
        "everyday services like gym bookings, food delivery, or rides": "everyday retail services like streetwear customizers, accessory catalogs, or sneaker custom orders",
        "gym and restaurant owners": "apparel customizers and storefront curators",
        "gym class bookings": "catalog custom drop bookings",
        "fitness center bookings, meal prep deliveries, and taxi rides": "custom clothing collections, vintage accessory orders, and shoewear customizations",
        "gym owner": "clothing store curator",
        "gym pass plus a free meal prep bowl": "streetwear jacket plus a free customized accessory clip",
        "food delivery app": "streetwear store",
        "weekend sports promotion": "limited streetwear customization drop",
        "book gym classes": "order custom accessories",
        "lifestyle app": "ecommerce store",
        "retail partners": "brand influencers",
        
        // New unified phasesData replacements
        "local businesses": "online boutiques",
        "existing businesses": "existing ecommerce stores",
        "businesses that already have": "stores that already have",
        "paying customers": "paying shoppers",
        "Customer Chats": "Buyer Dialogues",
        "Watching Customers": "Watching Store Visitors",
        "Daily Diaries": "Shopping Logs",
        "customer journey": "shopping cart funnel",
        "customer steps": "buyer checkout steps",
        "customer experiences": "shopper experiences",
        "customer experience": "shopper experience",
        "customer feedback": "buyer reviews",
        "first key hire or freelancer": "first inventory manager or photographer",
        "survey after delivery": "survey after package delivery",
        "user journey, a database system, or a business process": "shopping cart, a product inventory catalog, or a checkout process"
      };
    } else if (vertical === "Creatives & Agency") {
      replacements = {
        // Assessment replacements
        "everyday services like gym bookings, food delivery, or rides": "creative services like photoshoots, logo designs, or copywriting campaign retainer bookings",
        "gym and restaurant owners": "brand directors and local marketing agencies",
        "gym class bookings": "freelance video editing slots",
        "fitness center bookings, meal prep deliveries, and taxi rides": "photoshoot packages, logo customization contracts, and content retainer bookings",
        "gym owner": "creative lead",
        "gym pass plus a free meal prep bowl": "photoshoot retainer plus a free custom brand logo design",
        "food delivery app": "freelance agency portal",
        "weekend sports promotion": "content marketing push event",
        "book gym classes": "schedule photoshoot times",
        "lifestyle app": "creative agency",
        "retail partners": "marketing directors",
        
        // New unified phasesData replacements
        "local businesses": "creative studios",
        "existing businesses": "existing creative agencies",
        "businesses that already have": "agencies that already have",
        "paying customers": "paying clients",
        "Customer Chats": "Client Interviews",
        "Watching Customers": "Watching Creative Clients",
        "Daily Diaries": "Creative Brief Logs",
        "customer journey": "agency project pipeline",
        "customer steps": "client onboarding steps",
        "customer experiences": "client experiences",
        "customer experience": "client experience",
        "customer feedback": "client feedback",
        "first key hire or freelancer": "first junior designer or video editing freelancer",
        "survey after delivery": "survey after project handoff",
        "user journey, a database system, or a business process": "project brief, a creative asset library, or a design review process"
      };
    }

    const newMod = JSON.parse(JSON.stringify(mod)) as Module;
    
    const replaceText = (text: string): string => {
      let result = text;
      for (const [key, val] of Object.entries(replacements)) {
        result = result.replaceAll(key, val);
      }
      return result;
    };

    newMod.objective = replaceText(newMod.objective);
    newMod.subtitle = replaceText(newMod.subtitle);
    
    newMod.lessons = newMod.lessons.map(lesson => ({
      title: replaceText(lesson.title),
      points: lesson.points.map(pt => replaceText(pt))
    }));

    newMod.assessment = {
      title: replaceText(newMod.assessment.title),
      scenario: replaceText(newMod.assessment.scenario),
      challenges: newMod.assessment.challenges.map(c => replaceText(c)),
      questions: newMod.assessment.questions.map(q => replaceText(q))
    };

    return newMod;
  };

  const dynamicModulesData = React.useMemo(() => {
    return modulesData.map(m => getDynamicModule(m, selectedVertical));
  }, [selectedVertical]);

  const activeModule = dynamicModulesData.find((m) => m.id === activeModuleId) || dynamicModulesData[0];

  const imageMap: Record<string, string> = {
    "phase-1": "/m1_corporate.png",
    "phase-2": "/phase_research.png",
    "phase-3": "/m3_architecture.png",
    "phase-4": "/m4_monetization.png",
    "phase-5": "/phase_synthesis.png",
  };

  const titleMap: Record<string, string> = {
    "phase-1": "Discover",
    "phase-2": "Habits & Understand",
    "phase-3": "Build",
    "phase-4": "Money",
    "phase-5": "Launch",
  };

  return (
    <div className="w-full px-6 md:px-16 lg:px-24 py-20 bg-white border-y border-slate-200" id="curriculum">
      <div className="max-w-7xl mx-auto flex flex-col items-start mb-16">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono mb-2">
          Course Guide
        </span>
        <h2 className="text-3xl md:text-5xl font-heading text-slate-900 uppercase tracking-widest mb-4">
          Step by Step Business Guide
        </h2>
        <p className="text-slate-500 max-w-3xl text-left text-sm md:text-base font-sans font-medium mb-8">
          Learn the exact steps used to launch successful apps, handle technical setup, and build independent businesses.
        </p>
        
        <div className="w-full">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono mb-3 block">
            Select Your Business Vertical
          </span>
          <div className="flex flex-wrap gap-3">
            {["Local Services & Delivery", "Tech & SaaS", "Ecommerce & Retail", "Creatives & Agency"].map((vert) => {
              const isSelected = selectedVertical === vert;
              return (
                <button
                  key={vert}
                  onClick={() => setSelectedVertical(vert)}
                  className={`text-xs font-heading uppercase tracking-widest px-5 py-2.5 rounded-none transition-all cursor-pointer font-bold ${
                    isSelected 
                      ? "bg-black text-white border border-black" 
                      : "bg-transparent text-slate-700 border border-slate-200 hover:border-slate-400"
                  }`}
                >
                  {vert}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 5-COLUMN BONTEMPI-STYLE IMAGE GRID SELECTOR */}
      <div className="max-w-7xl mx-auto flex overflow-x-auto md:grid md:grid-cols-5 gap-6 mb-16 pb-4 md:pb-0 snap-x snap-mandatory scrollbar-thin">
        {dynamicModulesData.map((mod) => {
          const isActive = activeModuleId === mod.id;
          
          return (
            <div
              key={mod.id}
              onClick={() => setActiveModuleId(mod.id)}
              className="group cursor-pointer flex flex-col w-[200px] md:w-auto shrink-0 snap-start"
            >
              {/* Image Container with Elegant Line Outline */}
              <div className={`aspect-[4/3] w-full overflow-hidden border transition-all duration-300 rounded-none ${
                isActive 
                  ? "border-[#000000] ring-1 ring-[#000000]" 
                  : "border-slate-200 group-hover:border-slate-400"
              }`}>
                <img
                  src={imageMap[mod.id]}
                  alt={mod.title}
                  className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-102 ${
                    isActive ? "opacity-100" : "opacity-75 group-hover:opacity-100"
                  }`}
                />
              </div>
              
              {/* Labels with Active Tan/Bronze Color Highlight */}
              <div className="pt-4 flex flex-col">
                <span className={`text-sm uppercase font-bold tracking-widest font-mono transition-colors duration-200 ${
                  isActive ? "text-[#000000]" : "text-slate-400 group-hover:text-slate-650"
                }`}>
                  Module {mod.num}
                </span>
                <span className={`font-heading text-base uppercase tracking-wider block mt-1 transition-colors duration-200 ${
                  isActive ? "text-[#000000]" : "text-slate-900 group-hover:text-slate-700 font-bold"
                }`}>
                  {titleMap[mod.id]}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* DETAILED CONTENT PANEL FOR THE ACTIVE MODULE */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-white border border-slate-200 rounded-none p-6 md:p-12">
          
          {/* Module Metadata - Left Column */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 text-slate-500 text-xs font-semibold uppercase tracking-widest font-mono">
                <BookOpen className="w-4 h-4 text-slate-450" />
                Module {activeModule.num} / 5 Overview
              </span>
              <h3 className="text-2xl md:text-3xl font-heading text-slate-900 leading-tight uppercase tracking-widest">
                {activeModule.title}
              </h3>
              <p className="text-slate-500 italic text-sm font-sans font-medium">
                &ldquo;{activeModule.subtitle}&rdquo;
              </p>
            </div>

            {/* Left Accent Border in Tan Color */}
            <div className="bg-[#faf9f6] border-l-4 border-[#000000] border-y border-r border-slate-200 rounded-none p-6 mt-8 lg:mt-0">
              <div className="flex gap-3">
                <Target className="w-5 h-5 text-slate-900 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-heading text-slate-900 text-xs uppercase tracking-widest mb-1.5 font-bold">
                    Learning Goal
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed font-sans">
                    {activeModule.objective}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Lessons & Assessments - Right Column */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div>
              <h4 className="font-heading text-slate-900 text-xs uppercase tracking-widest mb-6 flex items-center gap-2 font-bold">
                <CheckCircle2 className="w-4 h-4 text-slate-900" />
                Lessons & Real Examples
              </h4>
              <div className="space-y-4">
                {activeModule.lessons.map((lesson, idx) => {
                  const isLocked = activeModule.id !== "phase-1" || idx >= 3;
                  return (
                    <details
                      key={idx}
                      className="group bg-white border border-slate-200 rounded-none p-4 hover:border-slate-800 transition-all duration-300 open:border-slate-800"
                    >
                      <summary className="font-heading text-slate-900 text-xs md:text-sm uppercase tracking-widest font-black cursor-pointer list-none flex items-center justify-between select-none font-mono [&::-webkit-details-marker]:hidden">
                        <span className="flex items-center gap-2">
                          {isLocked && <span className="text-slate-400 select-none">🔒</span>}
                          <span>{lesson.title}</span>
                        </span>
                        <span className="text-xs transition-transform duration-200 group-open:rotate-90">➔</span>
                      </summary>
                      <div className="mt-4 pt-3 border-t border-slate-100">
                        {isLocked ? (
                          <div className="flex flex-col items-center justify-center p-6 border border-[#eae3d7] bg-[#faf9f6] text-center rounded-none my-2">
                            <span className="text-xl mb-1 select-none">🔒</span>
                            <p className="text-xs text-slate-600 font-semibold mb-2">This lesson is locked</p>
                            <p className="text-xs text-slate-500 max-w-sm mb-4">Complete your registration to access the full curriculum, interactive worksheets, and design toolkits.</p>
                            <a 
                              href={isAuthenticated ? "/learn" : "/login"} 
                              className="bg-[#000000] hover:bg-[#1a1a1a] text-white font-heading text-xs uppercase tracking-widest font-bold py-2.5 px-6 rounded-none shadow-sm transition-all"
                            >
                              {isAuthenticated ? "Enter Workspace" : "Lock In Access"}
                            </a>
                          </div>
                        ) : (
                          <ul className="space-y-2">
                            {lesson.points.map((pt, pIdx) => (
                              <li
                                key={pIdx}
                                className="text-slate-600 text-xs md:text-sm leading-relaxed flex items-start gap-2 font-sans"
                              >
                                <span className="text-slate-850 select-none shrink-0 mt-2 w-1.5 h-1.5 bg-black" />
                                <span>{pt}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </details>
                  );
                })}
              </div>
            </div>

            {/* Assessment Box */}
            <div className="border border-slate-200 bg-[#faf9f6] rounded-none p-6 relative overflow-hidden">
              {activeModule.id !== "phase-1" && (
                <div className="absolute inset-0 bg-[#faf9f6]/95 backdrop-blur-[1px] flex flex-col items-center justify-center p-6 text-center z-10">
                  <span className="text-xl mb-2 select-none">🔒</span>
                  <h5 className="font-heading text-slate-905 text-xs uppercase tracking-widest font-black mb-1.5">
                    Practical Case Study Locked
                  </h5>
                  <p className="text-slate-500 text-xs max-w-md mb-4 font-sans leading-relaxed">
                    Case studies, interactive templates, and workspace assessments are restricted to active syndicate members.
                  </p>
                  <a 
                    href={isAuthenticated ? "/learn" : "/login"} 
                    className="bg-black hover:bg-neutral-800 text-white font-heading text-xs uppercase tracking-widest font-bold py-2.5 px-6 rounded-none transition-all"
                  >
                    {isAuthenticated ? "Enter Workspace" : "Lock in Access"}
                  </a>
                </div>
              )}
              <div className="flex gap-3">
                <ShieldAlert className="w-5 h-5 text-slate-900 shrink-0 mt-0.5" />
                <div className="w-full">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="font-heading text-slate-900 text-xs uppercase tracking-widest font-bold">
                      Practical Case Study
                    </h5>
                    <span className="text-xs bg-slate-900 text-white px-2.5 py-0.5 rounded-none uppercase tracking-widest font-semibold font-mono">
                      {activeModule.assessment.title}
                    </span>
                  </div>
                  <p className="text-slate-700 text-sm mb-6 leading-relaxed font-sans">
                    {activeModule.assessment.scenario}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-200">
                    <div>
                      <h6 className="text-xs uppercase font-bold tracking-widest text-slate-500 mb-2 font-mono">
                        Key Challenges
                      </h6>
                      <ul className="space-y-1">
                        {activeModule.assessment.challenges.map((c, cIdx) => (
                          <li key={cIdx} className="text-xs text-slate-600 flex items-center gap-1.5 font-sans">
                            <span className="w-1.5 h-1.5 bg-red-650 shrink-0" />
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h6 className="text-xs uppercase font-bold tracking-widest text-slate-500 mb-2 font-mono">
                        Project Deliverables
                      </h6>
                      <ul className="space-y-1.5">
                        {activeModule.assessment.questions.map((q, qIdx) => (
                          <li key={qIdx} className="text-xs text-slate-700 flex items-start gap-1 font-sans">
                            <span className="text-slate-950 font-bold select-none shrink-0 font-mono">{qIdx+1}.</span>
                            <span className="leading-snug">{q}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
