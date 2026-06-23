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
    title: "Phase 1: Finding Your Niche & Launching Your Brand",
    subtitle: "Choose the right local market to serve and build your business image",
    objective: "Find a clear business idea in a local market, map out how your product serves different customer needs, and build a trusted brand presence.",
    lessons: [
      {
        title: "Lesson 1.1: Finding Local Customer Niches",
        points: [
          "Spotting daily needs: Find gaps in everyday services like gym bookings, food delivery, or rides (use Card 03: Daily Diaries to have users write down their feelings and habits exactly when they use services).",
          "Targeting your first users: Focus on a small group of passionate customers who need your service today (use Card 01: Customer Chats to run friendly, open talks and map early adopters' goals).",
          "Keep it simple: Avoid complex ideas that confuse users; focus on doing one thing really well (use Card 10: Using Customer Words to write clear copy, and Card 13: Step-by-Step Experience to remove extra signup steps)."
        ]
      },
      {
        title: "Lesson 1.2: Mapping Lifestyle Connections",
        points: [
          "Multi-service layouts: Designing how your app connects booking, dining, and traveling.",
          "Data privacy: Keeping customer records safe while keeping registration simple.",
          "Speedy signups: Designing a checkout flow that gets users set up in under 3 minutes."
        ]
      },
      {
        title: "Lesson 1.3: Building Trust and Authority",
        points: [
          "Creating your presence: Making a clean website and social pages that look professional.",
          "Trust factors: Using customer reviews and simple assurances to build safety.",
          "Sharing your mission: Writing simple messages about why your business exists."
        ]
      }
    ],
    assessment: {
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
    }
  },
  {
    id: "module-2",
    num: 2,
    title: "Phase 2: Customer Needs & Habits",
    subtitle: "Design simple, low-stress experiences that keep customers happy",
    objective: "Understand customer behaviors, map their daily routines, and design features that fit naturally into their lives.",
    lessons: [
      {
        title: "Lesson 2.1: Listening to Your Customers",
        points: [
          "Simple interviews: Asking regular people about their daily frustrations without boring surveys.",
          "Day-in-the-life diaries: Getting users to record when and why they use specific apps.",
          "Spotting actual goals: Separating what customers say they want from what they actually do."
        ]
      },
      {
        title: "Lesson 2.2: Building Daily Habits",
        points: [
          "Friendly prompts: Designing simple notifications that remind users at the right time.",
          "Low-stress triggers: Helping customers make repeat orders with just two taps.",
          "Increasing value: Showing relevant second options (like dessert with food) naturally."
        ]
      },
      {
        title: "Lesson 2.3: Simple Design Feedback",
        points: [
          "Budget testing: Showing drafts of your app to 5 people in a local coffee shop.",
          "User-guided updates: Fixing layout mistakes based on where users get stuck.",
          "Feedback logs: Keeping a simple sheet of requested improvements to guide your next changes."
        ]
      }
    ],
    assessment: {
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
    }
  },
  {
    id: "module-3",
    num: 3,
    title: "Phase 3: Simple App and Tech Setup",
    subtitle: "Set up your website, app, and tasks without getting lost in code",
    objective: "Understand how websites and databases talk to each other, choose hosting, and write clear checklists for developers.",
    lessons: [
      {
        title: "Lesson 3.1: Tech Terms Made Simple",
        points: [
          "Web logic: Understanding how the screens users see connect to servers and databases.",
          "Database tables: How customer details, bookings, and payments are stored neatly.",
          "API connections: How apps send data back and forth to process orders."
        ]
      },
      {
        title: "Lesson 3.2: Easy App Hosting",
        points: [
          "Hosting platforms: Choosing cheap, reliable hosts that scale as your traffic grows.",
          "Domain settings: Setting up web addresses and simple security certificates.",
          "Site monitoring: Keeping track of whether your site is fast or down using simple tools."
        ]
      },
      {
        title: "Lesson 3.3: Planning Tasks in Sprints",
        points: [
          "Task checklists: Breaking down large features into small 1-day tasks for developers.",
          "Writing clear requirements: Describing exactly how a button should work so there are no errors.",
          "Feedback loops: Testing developer updates quickly before showing them to customers."
        ]
      }
    ],
    assessment: {
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
    }
  },
  {
    id: "module-4",
    num: 4,
    title: "Phase 4: Making Money & Contracts",
    subtitle: "Setup recurring fees, write proposals, and structure your business",
    objective: "Package your skills into premium consulting retainers, draft clear business terms, and set up safe legal companies.",
    lessons: [
      {
        title: "Lesson 4.1: Retainers and Consulting",
        points: [
          "Recurring fees: Charging clients monthly retainer fees for keeping their systems running.",
          "Defining deliverables: Laying out exactly how many hours or updates you provide each month.",
          "Pricing models: Tying your fees to customer success metrics or general support."
        ]
      },
      {
        title: "Lesson 4.2: Writing Simple Proposals",
        points: [
          "Drafting proposals: Creating clean 2-page proposals that list scope and fees clearly.",
          "Setting expectations: Putting boundaries on extra requests to avoid unpaid work.",
          "Getting approvals: Using simple online signature tools to start projects quickly."
        ]
      },
      {
        title: "Lesson 4.3: Safe Business Structures",
        points: [
          "Setting up your company: Registering your business legally to separate personal risks.",
          "Tax planning: Keeping records of invoices and expenses simply to avoid tax issues.",
          "Protecting your ideas: Securing your business name, logos, and website domains."
        ]
      }
    ],
    assessment: {
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
    }
  },
  {
    id: "module-5",
    num: 5,
    title: "Phase 5: Launching & Growing",
    subtitle: "Promote your app, build partnerships, and measure your growth",
    objective: "Set up customer referral programs, build store partnerships, and monitor key numbers to expand your customer base.",
    lessons: [
      {
        title: "Lesson 5.1: The Growth Loop",
        points: [
          "Referral programs: Giving customers easy rewards or discounts for inviting friends.",
          "Word-of-mouth loops: Designing sharing buttons that look attractive on social media.",
          "Signup incentives: Giving new users a small welcome gift to encourage their first booking."
        ]
      },
      {
        title: "Lesson 5.2: Strategic Partnerships",
        points: [
          "Partner promotions: Bundling services (like a gym pass plus a free meal prep bowl).",
          "Local influencers: Working with local creators to review your app simply.",
          "Store partnerships: Placing signs or posters inside partner stores to attract users."
        ]
      },
      {
        title: "Lesson 5.3: Growth Metrics Made Easy",
        points: [
          "Active users: Checking how many people actually open the app weekly.",
          "Customer costs: Calculating how much advertising money it takes to get one new user.",
          "Lifetime value: Estimating how much a customer spends over several months."
        ]
      }
    ],
    assessment: {
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
  }
];

export default function CurriculumExplorer() {
  const [activeModuleId, setActiveModuleId] = useState<string>("module-1");
  const [selectedVertical, setSelectedVertical] = useState<string>("Local Services & Delivery");

  // Helper function to rewrite module data based on vertical
  const getDynamicModule = (mod: Module, vertical: string): Module => {
    if (vertical === "Local Services & Delivery") {
      return mod;
    }

    let replacements: Record<string, string> = {};
    if (vertical === "Tech & SaaS") {
      replacements = {
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
        "retail partners": "integrations partners"
      };
    } else if (vertical === "E-commerce & Retail") {
      replacements = {
        "everyday services like gym bookings, food delivery, or rides": "everyday retail services like streetwear customizers, accessory catalogs, or sneaker custom orders",
        "gym and restaurant owners": "apparel customizers and storefront curators",
        "gym class bookings": "catalog custom drop bookings",
        "fitness center bookings, meal prep deliveries, and taxi rides": "custom clothing collections, vintage accessory orders, and shoewear customizations",
        "gym owner": "clothing store curator",
        "gym pass plus a free meal prep bowl": "streetwear jacket plus a free customized accessory clip",
        "food delivery app": "streetwear store",
        "weekend sports promotion": "limited streetwear customization drop",
        "book gym classes": "order custom accessories",
        "lifestyle app": "e-commerce store",
        "retail partners": "brand influencers"
      };
    } else if (vertical === "Creatives & Agency") {
      replacements = {
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
        "retail partners": "marketing directors"
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
    "module-1": "/m1_corporate.png",
    "module-2": "/phase_research.png",
    "module-3": "/m3_architecture.png",
    "module-4": "/m4_monetization.png",
    "module-5": "/phase_synthesis.png",
  };

  const titleMap: Record<string, string> = {
    "module-1": "Niche & Brand",
    "module-2": "Customer Habits",
    "module-3": "Tech Setup",
    "module-4": "Money & Proposals",
    "module-5": "Launch & Growth",
  };

  return (
    <div className="w-full px-6 md:px-16 lg:px-24 py-20 bg-white border-y border-slate-200" id="curriculum">
      <div className="max-w-7xl mx-auto flex flex-col items-start mb-16">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono mb-2">
          Course Guide
        </span>
        <h2 className="text-3xl md:text-5xl font-heading text-slate-900 uppercase tracking-widest mb-4">
          Step-by-Step Business Guide
        </h2>
        <p className="text-slate-500 max-w-3xl text-left text-sm md:text-base font-sans font-medium mb-8">
          Learn the exact steps used to launch successful apps, handle technical setup, and build independent businesses.
        </p>
        
        <div className="w-full">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono mb-3 block">
            Select Your Business Vertical
          </span>
          <div className="flex flex-wrap gap-3">
            {["Local Services & Delivery", "Tech & SaaS", "E-commerce & Retail", "Creatives & Agency"].map((vert) => {
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
                          <span className="text-slate-800 select-none shrink-0 mt-2 w-1.5 h-1.5 bg-[#000000]" />
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
