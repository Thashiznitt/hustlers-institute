"use client";

import React, { useState } from "react";
import { BookOpen, Target, CheckCircle2, ShieldAlert } from "lucide-react";

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

const modulesData: Module[] = [
  {
    id: "module-1",
    num: 1,
    title: "Corporate Intrapreneurship & The Politics of Innovation",
    subtitle: "How to Design Inside the System (and When to Build Your Own)",
    objective: "Teach students how to diagnose structural failures, navigate complex corporate stakeholders, and build a 'stealth validation engine' when internal politics stall a product.",
    lessons: [
      {
        title: "Lesson 1.1: Diagnosing the Enterprise Product Trap",
        points: [
          "The Anatomy of Bureaucratic Failure: Why massive corporate ecosystems fail at lifestyle apps.",
          "The 'Panic Meeting' Syndrome: Maintaining product integrity during chaotic stakeholder alignments.",
          "The Knowledge Gap: Working with and managing up to non-technical or design-illiterate leaders."
        ]
      },
      {
        title: "Lesson 1.2: Regulatory Guardrails & Compliance-Driven Design",
        points: [
          "Fintech Governance: Working under Central Bank guidelines and Data Protection frameworks.",
          "The Friction Balancing Act: Seamless onboarding vs. compliance (KYC, AML rules).",
          "Case Study: Engineering the I&M Bank digital onboarding system to lift transactions by 40%."
        ]
      },
      {
        title: "Lesson 1.3: The Stealth Build: From Corporate Friction to Independent Startup",
        points: [
          "The 'Shut Down & Spin Out' Framework: Decoupling from corporate frustration operationally.",
          "The Genesis of OneApp Lifestyle: Turning corporate friction into proprietary product vision.",
          "IP Protection and Ethics: Managing startup development safely alongside enterprise employment."
        ]
      }
    ],
    assessment: {
      title: "Project Neo-Bank",
      scenario: "You are the newly hired UX Lead at a legacy tier-1 commercial bank. The board wants a Gen-Z digital lending and lifestyle app. However, compliance insists on branch visits for KYC, leadership calls 3 panic meetings a week, and they demand static PPTs instead of reviewing live interactive prototypes.",
      challenges: [
        "Friction-heavy compliant onboarding flow",
        "Disruptive un-roadmapped panic meetings",
        "Leadership competency gap in modern HCD"
      ],
      questions: [
        "How do you design a compliant onboarding experience that remains under 3 minutes?",
        "What communication framework shifts steering committees away from panic meetings?",
        "If politics stall the launch, what UX proof-of-concept indicators do you track for a startup spin-out?"
      ]
    }
  },
  {
    id: "module-2",
    num: 2,
    title: "Advanced HCD & Strategic Research Methodologies",
    subtitle: "Going Beyond Simple Personas to Behavioral Predictability",
    objective: "Equip students with advanced behavioral synthesis tools that move beyond generic user personas into predictive, data-driven product strategy.",
    lessons: [
      {
        title: "Lesson 2.1: The Behavioral Synthesis Toolkit",
        points: [
          "Advanced Synthesis: Building System Maps and Stakeholder Maps tracking money and emotion.",
          "The 'How Might We' (HMW) Matrix: High-impact framing for multi-faceted retail pain points.",
          "Deploying Contextual Tools: Integrating Culture Probes and Conversation Starters in research sprints."
        ]
      },
      {
        title: "Lesson 2.2: Social and Behavior Change (SBC) in Product Design",
        points: [
          "Designing for Habit Formation: Lowering friction to construct sticky daily digital behaviors.",
          "The Cross-Sell Engine: Using quantitative usage triggers to cross-sell secondary products.",
          "Case Study: Minding social data to lift secondary product adoption by 25% at I&M Bank."
        ]
      },
      {
        title: "Lesson 2.3: Managing High-Velocity Enterprise Research",
        points: [
          "Orchestrating Big Research: Directing multi-million-shilling research budgets without bloat.",
          "Agency Co-Design: Partnering with research firms (Kantar/Ipsos) without losing speed.",
          "Usability Testing Under Pressure: Repeatable rapid interview guides for immediate backlog inputs."
        ]
      }
    ],
    assessment: {
      title: "The Stagnant Super-App",
      scenario: "A client has a lifestyle shopping app with 50,000 registrations, but active usage drops to zero after claiming the initial discount. Users ignore secondary digital wallets or merchant features. You have 30 days to outline a quantitative/qualitative UX strategy.",
      challenges: [
        "High registration, immediate active churn",
        "Low discovery of secondary lifestyle/wallet value",
        "Tight budget requiring rapid research iterations"
      ],
      questions: [
        "How do you deploy Culture Probes and Conversation Starters to isolate post-onboarding friction?",
        "Write a target HMW statement and map the workshop synthesis steps.",
        "Propose a SBC product mechanism triggering secondary transactions based on user behaviors."
      ]
    }
  },
  {
    id: "module-3",
    num: 3,
    title: "Full-Stack Technical Architecture for Designers & PMs",
    subtitle: "Bridging the Chasm Between Beautiful Interfaces and Bare-Metal Code",
    objective: "Bridge the gap between UI design and engineering. Teach students how to design systems optimized for bare-metal performance, data tracking, and agile delivery.",
    lessons: [
      {
        title: "Lesson 3.1: The Code-Aware Designer",
        points: [
          "Engineering Translation: Tech stacks (HTML, CSS, React, Java, SQL) and rendering limits.",
          "Designing for the Database: Schema relational logic and state constraints from a UI action.",
          "API Contracts: Writing clear requests and responses matching backend architectures."
        ]
      },
      {
        title: "Lesson 3.2: Scaling to Millions & Infrastructure Architecture",
        points: [
          "Bare-Metal Hosting: Deploying high-throughput workloads (like OneApp's 15k+ records) with low latency.",
          "Edge Routing & Security: Cloudflare routing, live DNS, and Cloudflare R2 backup configs.",
          "Analytics Instrumentation: Embedding Tableau/Power BI tracking without performance hits."
        ]
      },
      {
        title: "Lesson 3.3: Agile Production & Delivery Systems",
        points: [
          "Product Delivery Engine: Aligning designers, PMs, and developers natively in Jira.",
          "Jira Epic Architecture: Setting up sprint hierarchies and writing detailed developer stories.",
          "Collaborative Stack: Miro workshop alignment, Figma design tokens, and Slack workspace flow."
        ]
      }
    ],
    assessment: {
      title: "The Black Friday Crash",
      scenario: "You launched a peer-to-peer rewards feature on OneApp Lifestyle (15,000+ users). During a high-traffic campaign, infrastructure experiences high API latency. Engineering blames the design team, claiming the UI requires too many real-time relational lookups.",
      challenges: [
        "High load bottleneck and database query latency",
        "Finger-pointing between design and engineering",
        "Need to track the fix in Jira alongside ongoing feature sprints"
      ],
      questions: [
        "How do you trace the UI flow to isolate unnecessary database queries?",
        "What changes to edge routing and server setup resolve the scaling bottleneck?",
        "Write a Jira developer story with clear user benefits and technical acceptance criteria."
      ]
    }
  },
  {
    id: "module-4",
    num: 4,
    title: "Monetization, Service Design, & Global Tech Scaling",
    subtitle: "Building a Profitable Business Around Service Design",
    objective: "Teach students how to package design thinking and tech architecture into high-ticket B2B consulting products, standalone startups, or cross-border tech businesses.",
    lessons: [
      {
        title: "Lesson 4.1: Monetizing the Design Thinker",
        points: [
          "Advisory Retainers: Packaging design and lifecycle management into premium B2B offers.",
          "The IDAR Blueprint: Designing discovery, UX audits, and transformation projects.",
          "UX P&L Alignment: Tying experience metrics (churn, conversion) to direct business returns."
        ]
      },
      {
        title: "Lesson 4.2: Designing Modern Fintech Ecosystems",
        points: [
          "Digital Lending Engine: Architecting micro-lending products (MSK Awards 2023 winning model).",
          "Multi-Tenancy Lifestyle Services: Building Money Market Funds (MMFs) and youth savings platforms.",
          "VAS Expansion: Scaling transactions via integrated third-party value-added services."
        ]
      },
      {
        title: "Lesson 4.3: Cross-Border Corporate Structuring",
        points: [
          "International Tech Hubs: Leveraging Cyprus, Dubai, or Qatar for IP holding and tax structures.",
          "The Sovereign Founder: Setting up holding entities while keeping design teams in local hubs.",
          "IP Registry: Securing and valuation of your product designs and methodologies."
        ]
      }
    ],
    assessment: {
      title: "The Cross-Border Expansion",
      scenario: "Your boutique Nairobi agency gets a contract to launch an MMF savings platform across three African markets. You must scale consulting operations, protect your IP, and restructure the corporate entity for international VC funding.",
      challenges: [
        "Cross-border fintech integration and regulation",
        "Intellectual property vulnerability in multiple markets",
        "Connecting service fees to client's bottom-line P&L"
      ],
      questions: [
        "How do you structure a B2B service proposal that links UX phase delivery to transaction volumes?",
        "Design the core user flow for the MMF product emphasizing transparency and trust.",
        "What corporate structures in Cyprus or Dubai provide maximum IP protection and tax efficiency?"
      ]
    }
  }
];

export default function CurriculumExplorer() {
  const [activeModuleId, setActiveModuleId] = useState<string>("module-1");
  const activeModule = modulesData.find((m) => m.id === activeModuleId) || modulesData[0];

  const imageMap: Record<string, string> = {
    "module-1": "/m1_corporate.png",
    "module-2": "/m2_synthesis.png",
    "module-3": "/m3_architecture.png",
    "module-4": "/m4_monetization.png",
  };

  const titleMap: Record<string, string> = {
    "module-1": "Corporate Sandbox",
    "module-2": "Behavioral Synthesis",
    "module-3": "Technical Architecture",
    "module-4": "Monetization & GTM",
  };

  return (
    <div className="w-full px-6 md:px-16 lg:px-24 py-20 bg-white border-y border-slate-200" id="curriculum">
      <div className="max-w-7xl mx-auto flex flex-col items-start mb-16">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono mb-2">
          Syllabus Blueprint
        </span>
        <h2 className="text-3xl md:text-5xl font-heading text-slate-900 uppercase tracking-widest mb-4">
          Deep Curriculum Engineering
        </h2>
        <p className="text-slate-500 max-w-3xl text-left text-lg font-sans">
          Master the exact systems used to launch multi-million user fintech engines, navigate corporate politics, and spin out independent platforms.
        </p>
      </div>

      {/* 4-COLUMN BONTEMPI-STYLE IMAGE GRID SELECTOR */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        {modulesData.map((mod) => {
          const isActive = activeModuleId === mod.id;
          
          return (
            <div
              key={mod.id}
              onClick={() => setActiveModuleId(mod.id)}
              className="group cursor-pointer flex flex-col"
            >
              {/* Image Container with Elegant Line Outline */}
              <div className={`aspect-[4/3] w-full overflow-hidden border transition-all duration-300 rounded-none ${
                isActive 
                  ? "border-[#b59a7c] ring-1 ring-[#b59a7c]" 
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
                <span className={`text-[9px] uppercase font-bold tracking-widest font-mono transition-colors duration-200 ${
                  isActive ? "text-[#b59a7c]" : "text-slate-400 group-hover:text-slate-650"
                }`}>
                  Module {mod.num}
                </span>
                <span className={`font-heading text-sm uppercase tracking-wider block mt-1 transition-colors duration-200 ${
                  isActive ? "text-[#b59a7c]" : "text-slate-900 group-hover:text-slate-700 font-bold"
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
                Module {activeModule.num} / 04 Overview
              </span>
              <h3 className="text-2xl md:text-3xl font-heading text-slate-900 leading-tight uppercase tracking-widest">
                {activeModule.title}
              </h3>
              <p className="text-slate-500 italic text-sm md:text-base font-sans">
                &ldquo;{activeModule.subtitle}&rdquo;
              </p>
            </div>

            {/* Left Accent Border in Tan Color */}
            <div className="bg-[#faf9f6] border-l-4 border-[#b59a7c] border-y border-r border-slate-200 rounded-none p-6 mt-8 lg:mt-0">
              <div className="flex gap-3">
                <Target className="w-5 h-5 text-slate-900 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-heading text-slate-900 text-xs uppercase tracking-widest mb-1.5 font-bold">
                    Operational Objective
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
                Core Lectures & Case Studies
              </h4>
              <div className="space-y-4">
                {activeModule.lessons.map((lesson, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-slate-200 rounded-none p-5 hover:border-slate-800 transition-all duration-300"
                  >
                    <h5 className="font-heading text-slate-900 text-sm md:text-base mb-3 uppercase tracking-wider font-bold">
                      {lesson.title}
                    </h5>
                    <ul className="space-y-2">
                      {lesson.points.map((pt, pIdx) => (
                        <li
                          key={pIdx}
                          className="text-slate-600 text-sm leading-relaxed flex items-start gap-2 font-sans"
                        >
                          <span className="text-slate-800 select-none shrink-0 mt-2 w-1.5 h-1.5 bg-[#b59a7c]" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Assessment Box */}
            <div className="border border-slate-200 bg-[#faf9f6] rounded-none p-6">
              <div className="flex gap-3">
                <ShieldAlert className="w-5 h-5 text-slate-900 shrink-0 mt-0.5" />
                <div className="w-full">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="font-heading text-slate-900 text-xs uppercase tracking-widest font-bold">
                      Competence Assessment Case Study
                    </h5>
                    <span className="text-[10px] bg-slate-900 text-white px-2.5 py-0.5 rounded-none uppercase tracking-widest font-semibold font-mono">
                      {activeModule.assessment.title}
                    </span>
                  </div>
                  <p className="text-slate-700 text-sm mb-6 leading-relaxed font-sans">
                    {activeModule.assessment.scenario}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-200">
                    <div>
                      <h6 className="text-[10px] uppercase font-bold tracking-widest text-slate-500 mb-2 font-mono">
                        Structural Friction Points
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
                      <h6 className="text-[10px] uppercase font-bold tracking-widest text-slate-500 mb-2 font-mono">
                        Assessment Deliverables
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
