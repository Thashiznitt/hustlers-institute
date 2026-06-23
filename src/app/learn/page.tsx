"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  ArrowUpRight, 
  BookOpen, 
  Target, 
  CheckCircle2, 
  ShieldAlert, 
  Lock, 
  Unlock, 
  Printer, 
  Award, 
  Sliders, 
  Database, 
  TrendingUp, 
  Coins, 
  Briefcase, 
  FileText, 
  Check, 
  AlertTriangle, 
  RefreshCw, 
  User, 
  Copy,
  ChevronRight,
  Sparkles,
  Download,
  X
} from "lucide-react";

import { cardsList, CardData } from "@/components/DesignCardsExplorer";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";



// Lesson Interface
interface Lesson {
  id: string;
  title: string;
  points: string[];
  summary: string;
}

// Phase Interface
interface Phase {
  id: string;
  num: number;
  title: string;
  subtitle: string;
  objective: string;
  lessons: Lesson[];
  caseStudy: {
    title: string;
    scenario: string;
    questions: string[];
    coachTip: string;
  };
}

// 5-Phase Curriculum Data
const phasesData: Phase[] = [
  {
    id: "phase-1",
    num: 1,
    title: "Phase 1: Finding Your Niche & Launching Your Brand",
    subtitle: "Choose the right local market to serve and build your business image",
    objective: "Find a clear business idea in a local market, map out how your product serves different customer needs, and build a trusted brand presence.",
    lessons: [
      {
        id: "1.1",
        title: "Lesson 1.1: Finding Local Customer Niches",
        points: [
          "Spotting daily needs: Find gaps in everyday services like gym bookings, food delivery, or rides (use Card 03: Daily Diaries to have users write down their feelings and habits exactly when they use services).",
          "Targeting your first users: Focus on a small group of passionate customers who need your service today (use Card 01: Customer Chats to run friendly, open talks and map early adopters' goals).",
          "Keep it simple: Avoid complex ideas that confuse users; focus on doing one thing really well (use Card 10: Using Customer Words to write clear copy, and Card 13: Step-by-Step Experience to remove extra signup steps)."
        ],
        summary: "To build a successful business, start by looking at what people around you do every day. Are they struggling to book gym classes? Is local food delivery too slow? These daily frustrations are your biggest opportunities. Focus on a single group of users first, solve their specific problem, and build from there."
      },
      {
        id: "1.2",
        title: "Lesson 1.2: Mapping Lifestyle Connections",
        points: [
          "Connecting services: Design how your app links booking, eating, and transport under one roof.",
          "Easy signups: Design a quick signup process that gets customers active in under 3 minutes.",
          "Data compliance: Learn how to check that the details you store (names, locations) are safe and legal."
        ],
        summary: "A lifestyle app succeeds by making daily tasks connect smoothly. For example, a user bookings a gym session might also want to order a post-workout meal or hail a ride. When connecting these services, ensure the signup flow is incredibly quick (under 3 minutes) and check that you follow local privacy guidelines."
      },
      {
        id: "1.3",
        title: "Lesson 1.3: Building Trust and Authority",
        points: [
          "Professional presence: Set up simple web pages and social profiles that look highly professional.",
          "Customer reviews: Show honest ratings and feedback to prove to new users that you are reliable.",
          "Clear promises: State your safety rules and delivery guarantees clearly so users trust you."
        ],
        summary: "People buy from brands they trust. Even if you are operating from your bedroom, your public website and social channels must look clean, professional, and clear. Proactively display customer guarantees (such as 'Verified Partners Only' or 'Safe Payments') to remove any friction."
      }
    ],
    caseStudy: {
      title: "Launch Plan Check",
      scenario: "You are preparing to launch a local app connecting Muay Thai gym bookings, health meal prep deliveries, and local taxi rides. You need to outline your startup plan in simple terms.",
      questions: [
        "How do you choose your first 3 partner businesses (gyms/restaurants) to list on the app?",
        "Write a simple, friendly 2-sentence slogan for your brand that regular people will understand.",
        "What 2 privacy promises will you display during signup to make users feel safe?"
      ],
      coachTip: "Ensure your slogans avoid technical jargon like 'relational database cross-verticals'. Focus on the actual benefit to the user: 'Get fit, eat fresh, and travel safe - all in one app.'"
    }
  },
  {
    id: "phase-2",
    num: 2,
    title: "Phase 2: Customer Needs & Habits",
    subtitle: "Design simple, low-stress experiences that keep customers happy",
    objective: "Understand customer behaviors, map their daily routines, and design features that fit naturally into their lives.",
    lessons: [
      {
        id: "2.1",
        title: "Lesson 2.1: Listening to Your Customers",
        points: [
          "Friendly chats: Walk up and speak to customers directly instead of using long email surveys.",
          "Customer diaries: Ask users to keep a simple diary of when they get frustrated during their day.",
          "Spotting habits: Focus on what customers actually spend money on, not just what they say they like."
        ],
        summary: "You cannot design a great app sitting alone in an office. Get out and talk to regular people. Ask them about their last purchase: What went wrong? Why did they choose that shop? By understanding their daily habits and frustrations, you can design features that they will naturally use every day."
      },
      {
        id: "2.2",
        title: "Lesson 2.2: Building Daily Habits",
        points: [
          "Smart triggers: Send friendly, well-timed notifications (e.g. meal options just before lunch).",
          "Low-stress purchases: Make re-ordering a past service require just two simple taps.",
          "Natural recommendations: Suggest helpful add-ons (like transport to a gym session) right when they book."
        ],
        summary: "To get users to return, create natural habits. Habits are formed through loops: a prompt (like a lunch reminder), an action (ordering food in 2 taps), and a reward (tasty food delivered fast). Keep triggers friendly and never spam the user."
      },
      {
        id: "2.3",
        title: "Lesson 2.3: Simple Design Feedback",
        points: [
          "Local coffee shop testing: Show your app drafts to 5 people at a local shop for quick feedback.",
          "Finding layout blocks: Watch where users hesitate or click the wrong button.",
          "Feedback lists: Keep a simple notebook of design issues and tackle the biggest ones first."
        ],
        summary: "You do not need an expensive research lab to test your designs. Take your prototype on a phone to a local cafe, buy someone a coffee, and watch them try to book a class. If they hesitate or get confused on a button, your design needs to be simplified."
      }
    ],
    caseStudy: {
      title: "Fixing a Stagnant App",
      scenario: "Your lifestyle app has 5,000 signups, but users order once and never return. You need to research the issue and design a simple habit trigger.",
      questions: [
        "How will you spend a morning at a partner cafe to watch customers use your app?",
        "What specific trigger or notification can you add to encourage a second purchase within 7 days?",
        "Write 3 simple questions you will ask a user to find out why they stopped ordering."
      ],
      coachTip: "Avoid asking leading questions like 'Don't you love our design?' Ask open questions: 'What was the hardest part about completing your checkout?'"
    }
  },
  {
    id: "phase-3",
    num: 3,
    title: "Phase 3: Simple App and Tech Setup",
    subtitle: "Set up your website, app, and tasks without getting lost in code",
    objective: "Understand how websites and databases talk to each other, choose hosting, and write clear checklists for developers.",
    lessons: [
      {
        id: "3.1",
        title: "Lesson 3.1: Tech Terms Made Simple",
        points: [
          "Web logic: Learn how the screens users see connect to servers and databases.",
          "Database tables: Understand how user details, orders, and gym bookings are stored neatly.",
          "Data flow: Learn how data travels when a user clicks 'Book' to update partner systems."
        ],
        summary: "You do not need to write code to manage tech products, but you must understand how data flows. The front-end (what users click) sends requests to the back-end (the engine), which writes details into tables in the database. Keeping this database simple prevents speed issues."
      },
      {
        id: "3.2",
        title: "Lesson 3.2: Easy App Hosting",
        points: [
          "Choosing web hosts: Select simple cloud hosting providers that are cheap and reliable.",
          "Domain & security: Set up your website address and ensure it displays the lock icon (SSL) for trust.",
          "Performance checks: Track if your site is slow using free web diagnostics."
        ],
        summary: "Web hosting does not have to be expensive or complex. Use modern, simple hosting services to launch your app. Ensure you connect a custom domain and configure standard security to protect user passwords."
      },
      {
        id: "3.3",
        title: "Lesson 3.3: Planning Tasks in Sprints",
        points: [
          "Task checklist boards: Use visual boards (like Kanban) to track tasks in columns (To Do, Doing, Done).",
          "Clear descriptions: Write features in simple 'User Story' formats so developers understand.",
          "Acceptance steps: Define simple tests to verify a task is fully finished."
        ],
        summary: "To work well with developers, write features as simple steps. For example: 'A user can click a gym session, enter their name, and receive a confirm SMS'. Breaking work into 1-day tasks keeps progress clear and prevents delays."
      }
    ],
    caseStudy: {
      title: "Speed Recovery Sprint",
      scenario: "During a weekend sports sale, your booking site slows down. The tech team blames the design layout, and the designer blames the server database. You need to coordinate a fix.",
      questions: [
        "How will you find out which specific page or database lookup is slowing down the user?",
        "What simple hosting upgrade or database cleanup can you suggest to the tech team?",
        "Write a 3-step checklist task for the developer to fix the slow checkout page."
      ],
      coachTip: "Focus on user-centered checks. A step-by-step checklist task looks like: 1. Reduce image file sizes on the booking page. 2. Remove extra database lookups. 3. Test that checkout takes under 2 seconds."
    }
  },
  {
    id: "phase-4",
    num: 4,
    title: "Phase 4: Making Money & Contracts",
    subtitle: "Setup recurring fees, write proposals, and structure your business",
    objective: "Package your skills into premium consulting retainers, draft clear business terms, and set up safe legal companies.",
    lessons: [
      {
        id: "4.1",
        title: "Lesson 4.1: Retainers and Consulting",
        points: [
          "Retainer income: Charge clients a fixed monthly fee to keep their digital systems running.",
          "Scope boundaries: Put clear limits on what you will do each month to avoid unpaid work.",
          "Value pitching: Show clients how your design support saves them money and increases sales."
        ],
        summary: "As a product creator, you can sell your skills to other companies. Tying yourself to monthly retainer agreements (e.g. $1,000/month for ongoing app maintenance) gives your business reliable cash flow while you build your own products."
      },
      {
        id: "4.2",
        title: "Lesson 4.2: Writing Simple Proposals",
        points: [
          "Clear agreements: Keep client proposals under 3 pages; outline the cost, tasks, and deadlines.",
          "Signups & payments: Use simple digital signatures and direct invoice links to get paid fast.",
          "Change terms: Specify how extra requests will be charged so client requests stay fair."
        ],
        summary: "A great proposal is simple and avoids complex legalese. List exactly what you will build, what the client needs to provide, when you will deliver, and how much it costs. Standardize this template to start projects in 24 hours."
      },
      {
        id: "4.3",
        title: "Lesson 4.3: Safe Business Structures",
        points: [
          "Business registration: Register a limited liability company to protect your personal savings.",
          "Expense records: Track hosting costs and software fees neatly to save on taxes.",
          "Asset protection: Secure your brand name, domain, and custom logos legally."
        ],
        summary: "Protect your work by setting up a basic business structure. Registering a company separates your business assets from your personal savings. Keep business records clean from day one, and always secure your trademarks early."
      }
    ],
    caseStudy: {
      title: "Proposal and Structure setup",
      scenario: "A fitness brand wants to hire you to build their delivery platform. They ask for a monthly retainer proposal and expect you to manage global team invoices.",
      questions: [
        "Draft a simple 3-sentence retainer scope stating cost, hours, and core deliverables.",
        "What clauses will you add to make sure extra feature requests are billed separately?",
        "How will you register your business to separate your personal funds from client projects?"
      ],
      coachTip: "A clean scope states: 'We will provide 15 hours of design and tech support per month for $800. Any additional requests will be charged at $60 per hour.'"
    }
  },
  {
    id: "phase-5",
    num: 5,
    title: "Phase 5: Launching & Growing",
    subtitle: "Promote your app, build partnerships, and measure your growth",
    objective: "Set up customer referral programs, build store partnerships, and monitor key numbers to expand your customer base.",
    lessons: [
      {
        id: "5.1",
        title: "Lesson 5.1: The Growth Loop",
        points: [
          "Referral bonuses: Give customers a discount when their friends sign up and make a purchase.",
          "Easy sharing: Add a 1-tap WhatsApp button to let users share booking confirmations.",
          "Welcome gifts: Give new signups a free gift or credit to remove purchase hesitation."
        ],
        summary: "The cheapest way to grow is to get your customers to invite their friends. Design simple viral loops, like a 1-tap booking share that includes a guest discount. Make sure the referral reward is easy to understand and claim."
      },
      {
        id: "5.2",
        title: "Lesson 5.2: Strategic Partnerships",
        points: [
          "Local tie-ins: Partner with gyms to offer a meal package, or restaurants to offer ride discounts.",
          "Partner flyers: Put simple posters with QR codes at partner counters to get offline users.",
          "Micro-influencers: Partner with local fitness or food bloggers who love your neighborhood."
        ],
        summary: "Do not waste money on expensive online ads. Go directly to local businesses that share your customers. Put custom QR code posters on their counters and offer their staff a small incentive for every customer registration they generate."
      },
      {
        id: "5.3",
        title: "Lesson 5.3: Growth Metrics Made Easy",
        points: [
          "Active users: Track how many customers log in or make a purchase every week.",
          "Signup cost: Know exactly how much marketing spend you need to gain one customer.",
          "Customer value: Estimate how much a customer spends on the app over 6 months."
        ],
        summary: "Avoid tracking vanity metrics like social media likes. Focus on the numbers that drive your business: How many users are active? What does it cost to get a user? How much do they spend over time? Keeping these numbers healthy ensures long-term profit."
      }
    ],
    caseStudy: {
      title: "The Launch Campaign",
      scenario: "You are launching your lifestyle app in a neighboring city next month. You have a $300 total budget and need to design a referral plan and track success.",
      questions: [
        "Design a simple referral reward that gets users to share booking slips with friends.",
        "How will you pitch a gym owner to let you place a QR poster on their reception desk?",
        "What are the 3 simple numbers you will track daily to see if your launch is working?"
      ],
      coachTip: "Focus on the big three: Active Users, Signup Cost, and Total Sales. If your signup cost is low and sales are growing, your business is healthy!"
    }
  }
];

const industryDefaults: Record<string, string> = {
  "Sports & Recreation": "gym bookings, Muay Thai classes, and personal trainer slots",
  "Food & Drink": "healthy meal prep delivery and local restaurant reservations",
  "Transit & Delivery": "local taxi rides and motorcycle delivery couriers",
  "Arts & Culture": "gallery opening tickets and local museum passes",
  "Music & Nightlife": "lounge table bookings and VIP event guestlists",
  "Beauty & Wellness": "mobile spa appointments and home hair salon bookings",
  "Home & Professional": "mobile laundry requests and home deep cleaning",
  "Creatives & Design": "photoshoots, logo design, and video editing sessions",
  "Marketing & Content": "social media posts, UGC videos, and brand promotion",
  "Retail & Streetwear": "thrift clothing sales and custom sneaker customizations",
  "E-commerce & Digital": "online sticker packs and digital beat downloads",
  "Gen Z Gig Work": "micro-tasks, mystery shopping, and crowd-deliveries",
  "Furniture & Woodwork": "custom furniture orders and antique woodwork repairs",
  "Real Estate & Apartments": "house tour bookings and rental agent matching",
  "Car Hire & Rental": "local car rentals and peer-to-peer vehicle sharing",
  "Legal & Consulting": "contract drafting reviews and legal consulting hours",
  "Tech & Development": "custom website builds and mobile app hosting checks",
  "Data Analytics": "business dashboards and spreadsheet database cleanups",
  "Printing & Branding": "custom apparel prints, banners, and business flyers",
  "Accounting & Bookkeeping": "tax filing preparations and monthly sales calculations",
  "Travel & Touring": "itinerary planning and local safari tour bookings",
  "Airbnb & Property Hosting": "guest check-in coordination and property cleaning tasks"
};

const suggestedCardsMap: Record<string, string[]> = {
  "1.1": ["interviews", "culture-probe", "semantic-analysis", "journey-map"],
  "1.2": ["journey-map", "experience-journey", "desk-research"],
  "1.3": ["collage", "mood-board", "pitch-deck"],
  "2.1": ["interviews", "people-shadowing", "culture-probe"],
  "2.2": ["behavior-engine", "conversation-starters", "diaries"],
  "2.3": ["primary-research", "feedback-grid", "my-top-5"],
  "3.1": ["system-map", "org-charts"],
  "3.2": ["desk-research", "future-scenarios"],
  "3.3": ["team-journey", "2-by-2-axis"],
  "4.1": ["elevator-pitch", "pitch-deck"],
  "4.2": ["desk-research", "conversation-starters"],
  "4.3": ["desk-research", "future-scenarios"],
  "5.1": ["behavior-engine", "my-top-5"],
  "5.2": ["interviews", "stakeholder-maps"],
  "5.3": ["2-by-2-axis", "themes"]
};

function getCaseStudyScenario(phaseId: string, name: string, industry: string, type: string): string {
  if (phaseId === "phase-1") {
    return `You are preparing to launch a local app for "${name}" in the "${industry}" industry, focusing on "${type}". Outline your startup plan in simple terms.`;
  }
  if (phaseId === "phase-2") {
    return `Your lifestyle app, "${name}" (in the "${industry}" industry), has 5,000 signups, but users order once and never return. You need to research the issue in the context of "${type}" and design a simple habit trigger.`;
  }
  if (phaseId === "phase-3") {
    return `During a weekend sale of "${name}", your website slows down. The tech team blames the design layout, and the designer blames the server database. You need to coordinate a speed fix for booking "${type}".`;
  }
  if (phaseId === "phase-4") {
    return `A business client in the "${industry}" sector wants to hire you to build their delivery platform. They ask for a monthly retainer proposal for your work on "${name}".`;
  }
  if (phaseId === "phase-5") {
    return `You are launching your lifestyle app, "${name}", in a neighboring city next month. You have a $300 total budget and need to design a referral plan and track success for your "${type}" services.`;
  }
  return "";
}

interface IndustryTerms {
  actionVerb: string;
  itemSingular: string;
  providerTerm: string;
  userGoal: string;
  painPoint: string;
}

function getIndustryTerms(industry: string): IndustryTerms {
  switch (industry) {
    case "Sports & Recreation":
      return { actionVerb: "book", itemSingular: "gym class", providerTerm: "gym instructors", userGoal: "getting fit", painPoint: "overbooked classes" };
    case "Food & Drink":
      return { actionVerb: "order", itemSingular: "meal delivery", providerTerm: "local kitchens", userGoal: "getting fresh food", painPoint: "late or cold deliveries" };
    case "Transit & Delivery":
      return { actionVerb: "hail", itemSingular: "ride", providerTerm: "local drivers", userGoal: "traveling safely", painPoint: "long pickup wait times" };
    case "Arts & Culture":
      return { actionVerb: "buy", itemSingular: "exhibition ticket", providerTerm: "galleries & museums", userGoal: "visiting art shows", painPoint: "sold out ticket passes" };
    case "Music & Nightlife":
      return { actionVerb: "reserve", itemSingular: "lounge table", providerTerm: "event organizers", userGoal: "attending events", painPoint: "denied entry at doors" };
    case "Beauty & Wellness":
      return { actionVerb: "schedule", itemSingular: "massage appointment", providerTerm: "beauty specialists", userGoal: "getting pampered", painPoint: "last-minute cancellations" };
    case "Home & Professional":
      return { actionVerb: "request", itemSingular: "cleaning service", providerTerm: "house cleaners", userGoal: "getting chores done", painPoint: "poor service quality" };
    case "Creatives & Design":
      return { actionVerb: "hire", itemSingular: "photoshoot project", providerTerm: "creative freelancers", userGoal: "getting assets created", painPoint: "delayed project drafts" };
    case "Marketing & Content":
      return { actionVerb: "order", itemSingular: "UGC video promo", providerTerm: "content creators", userGoal: "growing online presence", painPoint: "low video engagement" };
    case "Retail & Streetwear":
      return { actionVerb: "buy", itemSingular: "streetwear item", providerTerm: "thrift clothing sellers", userGoal: "buying unique outfits", painPoint: "damaged items received" };
    case "E-commerce & Digital":
      return { actionVerb: "download", itemSingular: "digital asset", providerTerm: "digital creators", userGoal: "getting digital files", painPoint: "expired download links" };
    case "Gen Z Gig Work":
      return { actionVerb: "claim", itemSingular: "micro-task", providerTerm: "gig companies", userGoal: "making side money", painPoint: "delayed gig payments" };
    case "Furniture & Woodwork":
      return { actionVerb: "order", itemSingular: "custom woodwork item", providerTerm: "carpenters", userGoal: "getting custom furniture", painPoint: "wrong size dimensions" };
    case "Real Estate & Apartments":
      return { actionVerb: "book", itemSingular: "flat viewing", providerTerm: "property agents", userGoal: "finding a rental apartment", painPoint: "fake listing photos" };
    case "Car Hire & Rental":
      return { actionVerb: "rent", itemSingular: "vehicle", providerTerm: "car owners", userGoal: "hiring a car", painPoint: "unmaintained engine issues" };
    case "Legal & Consulting":
      return { actionVerb: "request", itemSingular: "contract review", providerTerm: "freelance lawyers", userGoal: "verifying agreements", painPoint: "hidden legal clauses" };
    case "Tech & Development":
      return { actionVerb: "request", itemSingular: "website build", providerTerm: "web developers", userGoal: "getting a site launched", painPoint: "buggy mobile screen errors" };
    case "Data Analytics":
      return { actionVerb: "request", itemSingular: "analytics dashboard", providerTerm: "data analysts", userGoal: "understanding sales reports", painPoint: "inaccurate spreadsheet calculations" };
    case "Printing & Branding":
      return { actionVerb: "order", itemSingular: "custom apparel print", providerTerm: "print shops", userGoal: "getting items printed", painPoint: "blurry logo prints" };
    case "Accounting & Bookkeeping":
      return { actionVerb: "request", itemSingular: "tax filing prep", providerTerm: "accountants", userGoal: "filing sales taxes", painPoint: "missing expense receipts" };
    case "Travel & Touring":
      return { actionVerb: "book", itemSingular: "safari tour itinerary", providerTerm: "local travel guides", userGoal: "booking custom tours", painPoint: "cancelled tour schedules" };
    case "Airbnb & Property Hosting":
      return { actionVerb: "book", itemSingular: "property cleaning", providerTerm: "cleaning managers", userGoal: "preparing rooms for guests", painPoint: "unclean rooms on check-in" };
    default:
      return { actionVerb: "book", itemSingular: "service", providerTerm: "service providers", userGoal: "scheduling appointments", painPoint: "unreliable service quality" };
  }
}

function getVentureApplication(cardId: string, name: string, industry: string, type: string): string {
  const terms = getIndustryTerms(industry);
  const lowercaseType = type.toLowerCase();
  
  switch (cardId) {
    case "interviews":
      return `Find 5 potential clients who frequently ${terms.actionVerb} ${terms.itemSingular}s. Run direct interviews, asking: "Walk me through the last time you attempted to ${terms.actionVerb} a ${terms.itemSingular}. What was the biggest hassle?"\n\n👉 **Example:** Ask a friend who uses similar services: 'Tell me about the last time you tried to ${terms.actionVerb} a ${terms.itemSingular}. What went wrong?' Listen closely for complaints about ${terms.painPoint}.`;
    
    case "people-shadowing":
      return `Watch a customer in real-time as they look for and try to ${terms.actionVerb} a ${terms.itemSingular} online. Write down exactly where they hesitate, look confused, or get stuck before finishing their checkout.\n\n👉 **Example:** Sit next to a user and watch them try to ${terms.actionVerb} a ${terms.itemSingular} on their phone. Note if they spend too long looking for pricing or get stuck on the confirmation screen.`;
    
    case "culture-probe":
      return `Have 3 active users text you a feedback log (e.g. an emoji and a 1-sentence description) every single time they use ${name} to ${terms.actionVerb} ${terms.itemSingular}s this week.\n\n👉 **Example:** Ask 3 testers to text you a quick emoji (like 😡 for 'frustrated by ${terms.painPoint}' or 😊 for 'service completed') every time they try ${terms.userGoal} this week.`;
    
    case "primary-research":
      return `Gather 3 target gig workers or clients from the ${industry} market. Pitch them the core "${name}" model and check if they would trust the platform enough to execute bookings.\n\n👉 **Example:** Call 3 local ${terms.providerTerm} and pitch them: 'If we build ${name} to help you get customers for your ${lowercaseType} services, would you list with us for a 10% booking fee?'`;
    
    case "desk-research":
      return `Research 2 major local competitors offering ${lowercaseType} services. Analyze their pricing, booking convenience levels, and map what local regulations protect user safety in the ${industry} sector.\n\n👉 **Example:** Download a competitor's app. Try to ${terms.actionVerb} a ${terms.itemSingular} ourselves, verify how much they charge, and read Google reviews to see if customers complain about ${terms.painPoint}.`;
    
    case "diaries":
      return `Have 2 clients keep a simple journal for 10 days, tracking every time they encounter a ${terms.painPoint} while trying to handle their ${lowercaseType} needs.\n\n👉 **Example:** Have a regular client write down a quick note in their notes app every time they fail to get a reliable ${terms.itemSingular} or have to deal with ${terms.painPoint}.`;
    
    case "stakeholder-maps":
      return `Draw a map connecting all key players for ${name}: the core users, the ${terms.providerTerm} who deliver the actual service, and the payment and logistics suppliers.\n\n👉 **Example:** Sketch a simple flowchart: User -> ${name} App -> Partner ${terms.providerTerm} -> Payment Gateway. Draw lines representing how money, bookings, and notifications flow between them.`;
    
    case "semantic-analysis":
      return `Audit your website copy for ${name}. Remove any complex technical jargon and replace it with direct client-friendly terms (e.g., use "Book ${terms.itemSingular}" instead of "Initialize Transaction Schema Pipeline").\n\n👉 **Example:** Instead of 'Deploying automated localized provider lookup interfaces', write a simple, friendly slogan: 'Find and ${terms.actionVerb} ${terms.itemSingular}s near you instantly in 3 taps.'`;
    
    case "system-map":
      return `Draft a flowchart showing how data flows when a user clicks "${terms.actionVerb.toUpperCase()}" on ${name}. Ensure that notifying ${terms.providerTerm} does not bottleneck the database speed.\n\n👉 **Example:** Draw a technical sequence diagram: User taps '${terms.actionVerb.toUpperCase()}' -> Database creates booking -> Webhook triggers push notification to partner ${terms.providerTerm} -> Partner accepts booking.`;
    
    case "journey-map":
      return `Map every step a customer goes through to complete a ${terms.itemSingular} checkout on ${name}. Identify and remove extra form fields to reduce total checkout time to under 3 minutes.\n\n👉 **Example:** List the 5 steps: 1. User wants to ${terms.actionVerb} a ${terms.itemSingular}, 2. Opens ${name}, 3. Selects ${terms.itemSingular}, 4. Inputs details, 5. Completes booking. Focus on reducing step 4 friction.`;
    
    case "org-charts":
      return `Map the roles for partner ${terms.providerTerm} on ${name}. Define who handles booking confirmations vs who updates the active service catalog lists.\n\n👉 **Example:** Assign responsibilities: Who is in charge of onboarding the partner ${terms.providerTerm}? Who handles billing issues? Who reviews customer complaints about ${terms.painPoint}?`;
    
    case "themes":
      return `Cluster customer feedback from your early ${name} trials into thematic categories: group complaints related to ${terms.painPoint} separate from pricing or usability bugs.\n\n👉 **Example:** Take 10 feedback texts and group them into 3 piles: 'Booking Latency' (e.g. late confirmation), 'Service Quality' (e.g. issues with ${terms.painPoint}), and 'Price Value'.`;
    
    case "2-by-2-axis":
      return `Plot proposed features for ${name} on a grid. Prioritize high-value core utilities (like instant booking confirmations) over complex additions that take weeks to code.\n\n👉 **Example:** Grid layout: place 'Instant checkout of ${terms.itemSingular}s' in the High-Impact/Low-Effort quadrant (build first), and 'Custom VR avatar interface' in the Low-Impact/High-Effort quadrant (discard).`;
    
    case "collage":
      return `Have 5 target users pick visual images representing their emotions when experiencing a ${terms.painPoint}. Use these findings to choose the colors and style of your brand logo.\n\n👉 **Example:** Ask users to pick images representing their feelings about ${terms.painPoint}. If they pick images of cluttered mazes, choose simple, clean typography and minimal layouts to show ease of use.`;
    
    case "mood-board":
      return `Assemble fonts, color schemes, and clean layouts from premium brands in the ${industry} space. Make sure ${name}'s style sheet feels premium and clean.\n\n👉 **Example:** Take screenshots of 3 leading apps in the ${industry} space. Identify their typography, tan/gold colors, and layouts, and adapt these to ${name}'s luxury dashboard aesthetic.`;
    
    case "team-journey":
      return `Draw a visual launch roadmap for ${name}. Set key weekly targets for onboarding the first 5 partner ${terms.providerTerm}, testing payments, and launching the beta.\n\n👉 **Example:** Month 1 Checklist: Week 1: Mockup the ${terms.itemSingular} booking screens. Week 2: Sign up 3 partner ${terms.providerTerm}. Week 3: Run end-to-end booking tests. Week 4: Public launch.`;
    
    case "pitch-deck":
      return `Draft a 5-slide proposal deck explaining how ${name} makes it stress-free to ${terms.actionVerb} ${terms.itemSingular}s. Present this to local merchant partners to convince them to join your network.\n\n👉 **Example:** Slide 1: Brand intro (${name}). Slide 2: The ${terms.painPoint} problem. Slide 3: Our app booking solution. Slide 4: 10% commission model. Slide 5: Launch timeline.`;
    
    case "feedback-grid":
      return `Present a simple clickable prototype of your ${terms.actionVerb} screen to 4 users. Categorize their comments into: Positive features, direct criticisms, user questions, and new feature suggestions.\n\n👉 **Example:** Show a demo of ${name} and group feedback: (+) Liked the 1-click booking, (-) Hated the gold font size on white backdrop, (?) Asked if we support card payments, (!) Suggested adding a rating system for ${terms.providerTerm}.`;
    
    case "future-scenarios":
      return `Map out how ${name} would adjust its fees if transaction processing costs rise, or if local rules limit how ${terms.providerTerm} list their services.\n\n👉 **Example:** What if card processing fees increase by 3% next year? Calculate if we should absorb the cost, increase the commission to partner ${terms.providerTerm}, or charge a small user convenience fee.`;
    
    case "experience-journey":
      return `Trace the customer's path from scanning an offline QR code flyer at a physical location to downloading the app, and finally completing their first ${terms.itemSingular} booking.\n\n👉 **Example:** Put a flyer with a QR code at a local hub. The customer scans it -> opens a web booking link -> selects a ${terms.itemSingular} -> checks out -> gets a calendar invite. Map each conversion rate.`;
    
    case "conversation-starters":
      return `Use prompt cards to ask target customers: "What is your single biggest complaint when trying to get a reliable ${terms.itemSingular} in your area?" Listen to their stories.\n\n👉 **Example:** Ask a target customer: 'What's the most annoying part of trying to get a reliable ${terms.itemSingular} in this neighborhood?' Listen for stories about overbooking or lack of customer service.`;
    
    case "behavior-engine":
      return `Create a helpful automatic trigger on ${name}: send a follow-up discount code or a friendly thank-you prompt exactly when a user finishes their ${terms.itemSingular} service.\n\n👉 **Example:** Set up a rule: When a user's ${terms.itemSingular} service status changes to 'COMPLETED', automatically send a WhatsApp alert: 'Thanks for booking! Use code RETRY5 for $5 off your next booking.'`;
    
    case "my-top-5":
      return `Present a list of 8 proposed features to 5 potential clients of ${name}. Have them rank their top 5 must-haves so you don't build features that nobody wants.\n\n👉 **Example:** Ask 5 target users to rank: 1. Instant SMS confirmations, 2. Chat with ${terms.providerTerm}, 3. Apple Pay, 4. Multi-booking, 5. Custom reminders, 6. Interactive maps, 7. Referral bonuses, 8. Review ratings. Build the top 5 first.`;
    
    default:
      return `Apply this toolkit card to map out customer behavior and simplify the checkout flow for ${name} in the ${industry} space.`;
  }
}

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
  const stage = card.stage;
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
  stream += `0 -22 Td\n(Actionable Opportunities & HCD Insights:) Tj\n`;
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

export default function LearnPage() {

  // Navigation & Lesson State
  const [activePhaseIndex, setActivePhaseIndex] = useState<number>(0);
  const [activeLessonIndex, setActiveLessonIndex] = useState<number>(0);
  
  // Proposed Venture Profile state
  const [ventureName, setVentureName] = useState<string>("OneApp Lifestyle");
  const [ventureIndustry, setVentureIndustry] = useState<string>("Sports & Recreation");
  const [ventureType, setVentureType] = useState<string>("Muay Thai bookings, meal delivery, and local rides");
  
  // 5 Ws + H inputs
  const [whatProblem, setWhatProblem] = useState<string>("");
  const [whoAffected, setWhoAffected] = useState<string>("");
  const [whereHappening, setWhereHappening] = useState<string>("");
  const [whenHappening, setWhenHappening] = useState<string>("");
  const [howHappening, setHowHappening] = useState<string>("");

  const [loadingAI, setLoadingAI] = useState<boolean>(false);
  const [aiNicheSummary, setAiNicheSummary] = useState<string>("");
  const [aiCustomApplications, setAiCustomApplications] = useState<Record<string, string>>({});
  const [leoReport, setLeoReport] = useState<string>("");
  const [isBrainstormModalOpen, setIsBrainstormModalOpen] = useState<boolean>(false);

  // Card Selector State for active lesson
  const [selectedLessonCardId, setSelectedLessonCardId] = useState<string | null>(null);
  const [cardNotes, setCardNotes] = useState<Record<string, string>>({});
  const [activeSavingCardNoteId, setActiveSavingCardNoteId] = useState<string | null>(null);

  // Progress State (stored in localStorage)
  const [completedLessons, setCompletedLessons] = useState<Record<string, boolean>>({});
  const [completedAssessments, setCompletedAssessments] = useState<Record<string, boolean>>({});
  
  // Case Study Form States
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [submittingAssessment, setSubmittingAssessment] = useState<boolean>(false);
  const [coachFeedback, setCoachFeedback] = useState<string>("");

  // Sandbox States
  // Sandbox 1: Privacy Compliance Builder
  const [s1DataCollected, setS1DataCollected] = useState({
    location: false,
    phone: false,
    bookings: false,
    payments: false,
  });
  const [s1Storage, setS1Storage] = useState("shared"); // local, cloud, shared
  const [s1Consents, setS1Consents] = useState({
    askConsent: false,
    deleteData: false,
    encryptInfo: false,
  });

  // Sandbox 2: Persona Viewer & Research Probes
  const [s2ActiveTab, setS2ActiveTab] = useState("personas"); // personas, cards, synthesis
  const [s2ActivePersona, setS2ActivePersona] = useState(0);
  const [s2CardTool, setS2CardTool] = useState("interview");
  const [s2CardPrompt, setS2CardPrompt] = useState("Ask them about their gym travel routine...");

  // HCD Synthesis Canvas States
  const [synthesisPOVNeed, setSynthesisPOVNeed] = useState("");
  const [synthesisPOVInsight, setSynthesisPOVInsight] = useState("");
  const [synthesisHMW, setSynthesisHMW] = useState("");
  const [synthesisCardThemes, setSynthesisCardThemes] = useState<Record<string, string>>({});
  const [synthesisGridPlacements, setSynthesisGridPlacements] = useState<Record<string, string>>({
    "1-click-booking": "quad-1",
    "partner-badge": "quad-1",
    "custom-avatars": "quad-4",
    "sms-updates": "quad-1",
    "multi-currency": "quad-2",
  });
  const [isSynthesisSaved, setIsSynthesisSaved] = useState(false);

  // Sandbox 3: SQL Schema & Sprint Backlog
  const [s3Schema, setS3Schema] = useState({
    users: { id: true, name: true, phone: true },
    bookings: { id: true, user_id: true, gym_name: true, price: true },
    partners: { id: true, name: true, location: true },
  });
  const [s3Tasks, setS3Tasks] = useState([
    { id: 1, text: "Reduce booking image sizes for speed", status: "todo" },
    { id: 2, text: "Check database index on user_id", status: "doing" },
    { id: 3, text: "Write simple signup privacy text", status: "done" }
  ]);
  const [s3NewTaskText, setS3NewTaskText] = useState("");

  // Sandbox 4: Retainer Agreement & P&L Calculator
  const [s4ClientName, setS4ClientName] = useState("Local Fitness Hub");
  const [s4MonthlyRate, setS4MonthlyRate] = useState(800);
  const [s4HoursPerWeek, setS4HoursPerWeek] = useState(15);
  const [s4SupportType, setS4SupportType] = useState("Design & Tech Maintenance");
  const [s4Expenses, setS4Expenses] = useState(150);

  // Sandbox 5: GTM Metrics Simulator
  const [s5ReferralReward, setS5ReferralReward] = useState(5); // $0 - $10
  const [s5PartnerPosts, setS5PartnerPosts] = useState(3); // 0 - 10 per week
  const [s5TechMaintenance, setS5TechMaintenance] = useState(50); // $10 - $200 per month

  // User Certificate Custom Name
  const [studentName, setStudentName] = useState("");
  const [certificateDate, setCertificateDate] = useState("");

  const [readinessScore, setReadinessScore] = useState<number | null>(null);
  const [readinessGrade, setReadinessGrade] = useState<string | null>(null);

  // Load from localStorage on client-side mount
  useEffect(() => {
    const checkReadiness = () => {
      const m1 = parseInt(localStorage.getItem("hi_readiness_m1") || "18");
      const m2 = parseInt(localStorage.getItem("hi_readiness_m2") || "17");
      const m3 = parseInt(localStorage.getItem("hi_readiness_m3") || "16");
      const m4 = parseInt(localStorage.getItem("hi_readiness_m4") || "19");
      const m5 = parseInt(localStorage.getItem("hi_readiness_m5") || "18");
      const total = m1 + m2 + m3 + m4 + m5;
      setReadinessScore(total);
      
      let level = "ALMOST THERE";
      if (total >= 90) level = "READY TO LAUNCH (DISTINCTION)";
      else if (total >= 80) level = "READY FOR BUSINESS";
      setReadinessGrade(level);
    };

    checkReadiness();
    window.addEventListener("storage", checkReadiness);
    window.addEventListener("hi_readiness_update", checkReadiness);

    const savedLessons = localStorage.getItem("hi_completed_lessons");
    const savedAssessments = localStorage.getItem("hi_completed_assessments");
    const savedStudentName = localStorage.getItem("hi_student_name");
    const savedVentureName = localStorage.getItem("hi_venture_name");
    const savedVentureIndustry = localStorage.getItem("hi_venture_industry");
    const savedVentureType = localStorage.getItem("hi_venture_type");

    const savedNicheFields = localStorage.getItem("hi_niche_builder_fields");
    const savedAiData = localStorage.getItem("hi_niche_ai_data");
    
    if (savedLessons) setCompletedLessons(JSON.parse(savedLessons));
    if (savedAssessments) setCompletedAssessments(JSON.parse(savedAssessments));
    if (savedStudentName) setStudentName(savedStudentName);
    if (savedVentureName) setVentureName(savedVentureName);
    if (savedVentureIndustry) setVentureIndustry(savedVentureIndustry);
    if (savedVentureType) setVentureType(savedVentureType);

    if (savedNicheFields) {
      const parsed = JSON.parse(savedNicheFields);
      setWhatProblem(parsed.what || "");
      setWhoAffected(parsed.who || "");
      setWhereHappening(parsed.where || "");
      setWhenHappening(parsed.when || "");
      setHowHappening(parsed.how || "");
    }
    if (savedAiData) {
      const parsed = JSON.parse(savedAiData);
      setAiNicheSummary(parsed.nicheSummary || "");
      setAiCustomApplications(parsed.customApplications || {});
      setLeoReport(parsed.boardroomReport || "");
    }
    const savedCardNotes = localStorage.getItem("hi_card_notes");
    if (savedCardNotes) setCardNotes(JSON.parse(savedCardNotes));

    const savedSynthesis = localStorage.getItem("hi_synthesis_canvas");
    if (savedSynthesis) {
      try {
        const parsed = JSON.parse(savedSynthesis);
        if (parsed.POVNeed) setSynthesisPOVNeed(parsed.POVNeed);
        if (parsed.POVInsight) setSynthesisPOVInsight(parsed.POVInsight);
        if (parsed.HMW) setSynthesisHMW(parsed.HMW);
        if (parsed.cardThemes) setSynthesisCardThemes(parsed.cardThemes);
        if (parsed.gridPlacements) setSynthesisGridPlacements(parsed.gridPlacements);
      } catch (e) {
        console.error("Error parsing hi_synthesis_canvas", e);
      }
    }

    // Format current date nicely
    const today = new Date();
    setCertificateDate(today.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' }));

    return () => {
      window.removeEventListener("storage", checkReadiness);
      window.removeEventListener("hi_readiness_update", checkReadiness);
    };
  }, []);

  const handleSaveSynthesis = () => {
    const data = {
      POVNeed: synthesisPOVNeed,
      POVInsight: synthesisPOVInsight,
      HMW: synthesisHMW,
      cardThemes: synthesisCardThemes,
      gridPlacements: synthesisGridPlacements
    };
    localStorage.setItem("hi_synthesis_canvas", JSON.stringify(data));
    setIsSynthesisSaved(true);
    setTimeout(() => setIsSynthesisSaved(false), 2000);
  };

  const handleVentureNameChange = (name: string) => {
    setVentureName(name);
    localStorage.setItem("hi_venture_name", name);
  };

  const handleVentureIndustryChange = (industry: string) => {
    setVentureIndustry(industry);
    localStorage.setItem("hi_venture_industry", industry);
    
    const defaultType = industryDefaults[industry] || "";
    setVentureType(defaultType);
    localStorage.setItem("hi_venture_type", defaultType);
  };

  const handleVentureTypeChange = (type: string) => {
    setVentureType(type);
    localStorage.setItem("hi_venture_type", type);
  };

  const handleNicheFieldChange = (field: string, val: string) => {
    const fields = {
      what: field === "what" ? val : whatProblem,
      who: field === "who" ? val : whoAffected,
      where: field === "where" ? val : whereHappening,
      when: field === "when" ? val : whenHappening,
      how: field === "how" ? val : howHappening
    };
    if (field === "what") setWhatProblem(val);
    if (field === "who") setWhoAffected(val);
    if (field === "where") setWhereHappening(val);
    if (field === "when") setWhenHappening(val);
    if (field === "how") setHowHappening(val);
    localStorage.setItem("hi_niche_builder_fields", JSON.stringify(fields));
  };

  const handleBrainstormNiche = async () => {
    setLoadingAI(true);
    setLeoReport("");
    setIsBrainstormModalOpen(true);
    try {
      const response = await fetch("/api/niche-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: ventureName,
          industry: ventureIndustry,
          whatProblem,
          whoAffected,
          whereHappening,
          whenHappening,
          howHappening,
          cardNotes
        })
      });
      const data = await response.json();
      if (data.success) {
        setAiNicheSummary(data.nicheSummary || "");
        if (data.customType) {
          setVentureType(data.customType);
          localStorage.setItem("hi_venture_type", data.customType);
        }
        setAiCustomApplications(data.customApplications || {});
        setLeoReport(data.boardroomReport || "");
        localStorage.setItem("hi_niche_ai_data", JSON.stringify({
          nicheSummary: data.nicheSummary,
          customType: data.customType,
          customApplications: data.customApplications,
          boardroomReport: data.boardroomReport
        }));
      } else {
        setLeoReport(`### ❌ Error analyzing niche: ${data.error}\nPlease verify your API configuration.`);
      }
    } catch (err: any) {
      console.error(err);
      setLeoReport(`### ❌ Network error talking to AI builder: ${err.message}\nPlease check your connectivity.`);
    } finally {
      setLoadingAI(false);
    }
  };

  // Auto-select first recommended card when phase or lesson changes
  const activePhase = phasesData[activePhaseIndex];
  const activeLesson = activePhase.lessons[activeLessonIndex];

  useEffect(() => {
    const suggested = suggestedCardsMap[activeLesson.id];
    if (suggested && suggested.length > 0) {
      setSelectedLessonCardId(suggested[0]);
    } else {
      setSelectedLessonCardId(null);
    }
  }, [activePhaseIndex, activeLessonIndex]);


  // Compute Progress Percent
  const totalLessons = 15;
  const lessonsDoneCount = Object.values(completedLessons).filter(Boolean).length;
  const totalAssessments = 5;
  const assessmentsDoneCount = Object.values(completedAssessments).filter(Boolean).length;
  
  // Total progress is weighted: 50% lessons completed, 50% assessments submitted
  const lessonProgressPercent = Math.round((lessonsDoneCount / totalLessons) * 50);
  const assessmentProgressPercent = Math.round((assessmentsDoneCount / totalAssessments) * 50);
  const totalProgressPercent = lessonProgressPercent + assessmentProgressPercent;
  const isGraduated = assessmentsDoneCount === totalAssessments;
  const isPhase1Complete = !!completedAssessments["phase-1"];

  // Toggle Lesson Completion
  const toggleLessonComplete = (lessonId: string) => {
    const updated = {
      ...completedLessons,
      [lessonId]: !completedLessons[lessonId]
    };
    setCompletedLessons(updated);
    localStorage.setItem("hi_completed_lessons", JSON.stringify(updated));
  };

  // Submit Case Study Assessment
  const handleAssessmentSubmit = (phaseId: string) => {
    setSubmittingAssessment(true);
    setCoachFeedback("");

    setTimeout(() => {
      // Create friendly, simple feedback based on the current phase
      let feedback = "";
      if (phaseId === "phase-1") {
        feedback = "Fantastic startup launch draft! Your partner selection logic is smart, and your slogan is friendly and avoids confusing tech words. Stating how user data is protected right on the signup form is a great touch to build safety. Phase 1 is complete! ✅";
      } else if (phaseId === "phase-2") {
        feedback = "Great work fixing the app! Going to a partner shop and watching people use the app directly is the best way to spot issues. Your habit trigger will encourage users to return, and the questions are very direct. Phase 2 is complete! ✅";
      } else if (phaseId === "phase-3") {
        feedback = "Excellent tech planning! Tracing customer actions step-by-step is exactly how product managers solve speed issues. Your hosting cleanup ideas are simple and cheap, and the task checklist is easy for a developer to follow. Phase 3 is complete! ✅";
      } else if (phaseId === "phase-4") {
        feedback = "Perfect consulting retainer scope! Your billing terms protect your hours, and setting up a limited company separates your personal accounts from business expenses. Phase 4 is complete! ✅";
      } else if (phaseId === "phase-5") {
        feedback = "Brilliant GTM launch strategy! Your referral reward is easy to share, partner counter posters are a high-value way to get local users, and tracking Active Users, Signup Cost, and Sales keeps you focused on profit. Phase 5 is complete! ✅";
      }

      const updated = {
        ...completedAssessments,
        [phaseId]: true
      };
      setCompletedAssessments(updated);
      localStorage.setItem("hi_completed_assessments", JSON.stringify(updated));
      setCoachFeedback(feedback);
      setSubmittingAssessment(false);

      // Auto-complete all lessons in the current phase as a helper UX
      const phaseData = phasesData.find(p => p.id === phaseId);
      if (phaseData) {
        const tempLessons = { ...completedLessons };
        phaseData.lessons.forEach(l => {
          tempLessons[l.id] = true;
        });
        setCompletedLessons(tempLessons);
        localStorage.setItem("hi_completed_lessons", JSON.stringify(tempLessons));
      }
    }, 1200);
  };

  const handleStudentNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudentName(e.target.value);
    localStorage.setItem("hi_student_name", e.target.value);
  };

  // Reset Progress Helper
  const handleResetProgress = () => {
    if (confirm("Are you sure you want to reset your learning progress?")) {
      setCompletedLessons({});
      setCompletedAssessments({});
      localStorage.removeItem("hi_completed_lessons");
      localStorage.removeItem("hi_completed_assessments");
      setCoachFeedback("");
    }
  };

  const handleSaveCardNote = (cardId: string, note: string) => {
    setActiveSavingCardNoteId(cardId);
    const updated = {
      ...cardNotes,
      [cardId]: note
    };
    setCardNotes(updated);
    localStorage.setItem("hi_card_notes", JSON.stringify(updated));
    setTimeout(() => setActiveSavingCardNoteId(null), 1000);
  };

  // Sandbox 1 Calculations: Privacy Compliance
  const getComplianceScore = () => {
    let score = 50; // Base score
    // Penalize if storing sensitive info without protection
    const sensitiveInfoCount = (s1DataCollected.payments ? 1 : 0) + (s1DataCollected.location ? 1 : 0);
    
    if (s1Storage === "shared") {
      score -= 30; // High risk to store shared
    } else if (s1Storage === "cloud") {
      score += 10;
    } else if (s1Storage === "local") {
      score += 20; // Safe
    }

    if (s1Consents.askConsent) score += 15;
    if (s1Consents.deleteData) score += 10;
    if (s1Consents.encryptInfo) score += 15;

    // Cap score 0 - 100
    return Math.max(0, Math.min(100, score));
  };

  const complianceScore = getComplianceScore();

  // Sandbox 3 Tasks operations
  const moveTask = (taskId: number, newStatus: string) => {
    setS3Tasks(s3Tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
  };

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!s3NewTaskText.trim()) return;
    const newTask = {
      id: Date.now(),
      text: s3NewTaskText,
      status: "todo"
    };
    setS3Tasks([...s3Tasks, newTask]);
    setS3NewTaskText("");
  };

  // Sandbox 5 Calculations: GTM Metrics
  // Referral Reward ($0-$10): Higher reward boosts Referral Rate (VIR), but slightly reduces Customer Lifetime Value (LTV) because of discounts.
  // Partner Posts (0-10): Higher posts increases Monthly Active Users (MAU), but takes slightly more time.
  // Tech Maintenance ($10-$200): Higher maintenance cost improves site speed/latency (lower ms). If too low, latency spikes and users leave (reducing MAU).
  const getSimulatedMetrics = () => {
    // Latency (site speed)
    let latency = Math.round(3000 - (s5TechMaintenance * 14));
    latency = Math.max(120, latency); // Cap at 120ms fastest

    // Viral rate
    let vir = s5ReferralReward * 0.15;
    if (s5ReferralReward === 0) vir = 0.05;
    vir = parseFloat(vir.toFixed(2));

    // Base active users
    let baseUsers = 500 + (s5PartnerPosts * 450);
    // If latency is very high (above 1500ms), penalize users by 50%
    if (latency > 1500) {
      baseUsers = baseUsers * 0.4;
    } else if (latency > 800) {
      baseUsers = baseUsers * 0.7;
    }
    // Multiply by viral factor
    const mau = Math.round(baseUsers * (1 + vir));

    // Lifetime Value
    const baseLtv = 45;
    const ltv = Math.max(10, baseLtv - (s5ReferralReward * 1.5));

    return { latency, vir, mau, ltv };
  };

  const metrics = getSimulatedMetrics();
  // Active Data for Content Rendering already defined above

  return (
    <div className="min-h-screen bg-[#faf9f6] text-slate-800 flex flex-col justify-between">
      
      {/* TOP HEADER */}
      <Header onResetProgress={handleResetProgress} />

      {/* LEARNING TRACKER COMPONENT (sticky under header) */}
      <section className="bg-white border-b border-slate-200 py-4 px-6 md:px-16 lg:px-24 print:hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-none bg-[#eae3d7] flex items-center justify-center text-[#5c5346]">
              {isGraduated ? (
                <Award className="w-7 h-7 text-[#000000] animate-bounce" />
              ) : (
                <BookOpen className="w-6 h-6" />
              )}
            </div>
            <div>
              <h2 className="text-sm font-heading text-slate-900 tracking-wider mb-1 font-bold">
                {isGraduated ? "Ready to Graduate!" : "Course Progress"}
              </h2>
              <div className="text-xs text-slate-500 font-sans font-medium flex items-center gap-4">
                <span>Lessons Read: <strong>{lessonsDoneCount} / {totalLessons}</strong></span>
                <span>•</span>
                <span>Case Studies: <strong>{assessmentsDoneCount} / {totalAssessments}</strong></span>
              </div>
            </div>
          </div>

          <div className="flex-1 max-w-sm flex items-center gap-4">
            <Progress value={totalProgressPercent} className="flex-1" />
            <span className="font-mono text-xs font-bold text-slate-600 shrink-0 w-8">{totalProgressPercent}%</span>
          </div>

          <a href="/#calculator" className="flex items-center gap-3 bg-[#faf9f6] border border-slate-200 p-2.5 px-4 rounded-none font-sans text-xs hover:border-slate-400 transition-all shrink-0">
            <div className="flex flex-col text-left">
              <span className="text-xs uppercase font-bold text-slate-500 font-mono tracking-widest block">
                Business Readiness Grade
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="font-mono text-sm font-black text-slate-900">
                  {readinessScore ?? 88} <span className="text-xs text-slate-400 font-normal">/ 100</span>
                </span>
                <span className={`text-xs font-bold px-2 py-0.5 uppercase border ${
                  (readinessScore ?? 88) >= 90
                    ? "border-slate-900 text-white bg-slate-900"
                    : (readinessScore ?? 88) >= 80
                      ? "border-slate-350 text-slate-700 bg-slate-100"
                      : "border-red-200 text-red-700 bg-red-50"
                }`}>
                  {readinessGrade ?? "READY FOR BUSINESS"}
                </span>
              </div>
            </div>
          </a>

          {isGraduated && (
            <a 
              href="#certificate" 
              className="bg-[#000000] hover:bg-[#1a1a1a] text-white text-xs font-heading uppercase tracking-widest font-bold py-2.5 px-6 rounded-none text-center animate-pulse"
            >
              Get Certificate
            </a>
          )}
        </div>
      </section>

      {/* PORTAL BODY - SIDEBAR + MAIN CONTENT SPLIT */}
      <main className="max-w-7xl w-full mx-auto px-4 md:px-8 py-8 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT SIDEBAR: Modules & Lessons Navigation */}
        <aside className="lg:col-span-4 space-y-6 print:hidden">
          
          {/* VENTURE PROFILE & NICHE BUILDER (5 Ws + H) */}
          <div className="bg-white border border-slate-200 rounded-none p-5 shadow-sm space-y-4">
            <h3 className="font-heading text-slate-900 text-xs uppercase tracking-widest border-b border-slate-100 pb-3 font-bold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#000000]" /> Niche Builder (5 Ws + H)
            </h3>
            
            <div className="space-y-3 font-sans text-xs">
              <div>
                <Label className="block text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">
                  Proposed Brand Name
                </Label>
                <Input
                  type="text"
                  value={ventureName}
                  onChange={(e) => handleVentureNameChange(e.target.value)}
                  placeholder="e.g. Streetwear Vault, UGC Plug"
                  className="w-full border border-slate-200 bg-[#faf9f6] p-2 text-slate-900 focus:bg-white focus:outline-none placeholder-slate-400 font-medium h-8 rounded-none"
                />
              </div>

              <div>
                <Label className="block text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">
                  Industry Vertical
                </Label>
                <Select
                  value={ventureIndustry}
                  onValueChange={(val) => handleVentureIndustryChange(val || "")}
                >
                  <SelectTrigger className="w-full bg-[#faf9f6] text-slate-900 border border-slate-200 rounded-none h-8 font-medium">
                    <SelectValue placeholder="Select Industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(industryDefaults).map((ind) => (
                      <SelectItem key={ind} value={ind}>
                        {ind}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {!isPhase1Complete ? (
                <div className="bg-amber-50/80 border border-amber-200/50 p-4 text-sm text-amber-800 font-sans font-medium rounded-none space-y-2 mt-2">
                  <p className="font-bold flex items-center gap-1.5 text-amber-950 uppercase tracking-wide">
                    <Lock className="w-4 h-4 text-amber-750" /> 5 Ws + H & AI Brainstorming Locked
                  </p>
                  <p className="leading-relaxed text-xs">
                    Submit your **Launch Plan Check** Case Study (Phase 1) at the bottom of the checklist to unlock AI niche brainstorming & customized analysis.
                  </p>
                  <p className="text-[#000000] font-semibold italic text-xs">
                    Mark Phase 1 complete to enable the full LEO Boardroom analyzer and custom card logging!
                  </p>
                </div>
              ) : (
                <div className="border-t border-slate-100 pt-3 space-y-3">
                  <span className="text-xs uppercase font-mono font-bold text-[#000000] block">niche identification guide:</span>
                  
                  <div>
                    <Label className="block text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">
                      What is the problem?
                    </Label>
                    <Input
                      type="text"
                      value={whatProblem}
                      onChange={(e) => handleNicheFieldChange("what", e.target.value)}
                      placeholder="e.g. Cannot find affordable vintage clothes."
                      className="w-full border border-slate-200 bg-[#faf9f6] p-2 text-slate-900 focus:bg-white focus:outline-none placeholder-slate-400 font-medium h-8 rounded-none"
                    />
                  </div>

                  <div>
                    <Label className="block text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">
                      Who is affected?
                    </Label>
                    <Input
                      type="text"
                      value={whoAffected}
                      onChange={(e) => handleNicheFieldChange("who", e.target.value)}
                      placeholder="e.g. Gen Z gig workers & students."
                      className="w-full border border-slate-200 bg-[#faf9f6] p-2 text-slate-900 focus:bg-white focus:outline-none placeholder-slate-400 font-medium h-8 rounded-none"
                    />
                  </div>

                  <div>
                    <Label className="block text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">
                      Where is it happening?
                    </Label>
                    <Input
                      type="text"
                      value={whereHappening}
                      onChange={(e) => handleNicheFieldChange("where", e.target.value)}
                      placeholder="e.g. In downtown hubs & expensive shops."
                      className="w-full border border-slate-200 bg-[#faf9f6] p-2 text-slate-900 focus:bg-white focus:outline-none placeholder-slate-400 font-medium h-8 rounded-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="block text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">
                        When is it?
                      </Label>
                      <Input
                        type="text"
                        value={whenHappening}
                        onChange={(e) => handleNicheFieldChange("when", e.target.value)}
                        placeholder="e.g. Weekend drops."
                        className="w-full border border-slate-200 bg-[#faf9f6] p-2 text-slate-900 focus:bg-white focus:outline-none placeholder-slate-400 font-medium h-8 rounded-none"
                      />
                    </div>
                    <div>
                      <Label className="block text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">
                        How is it broken?
                      </Label>
                      <Input
                        type="text"
                        value={howHappening}
                        onChange={(e) => handleNicheFieldChange("how", e.target.value)}
                        placeholder="e.g. Scalpers buy them out."
                        className="w-full border border-slate-200 bg-[#faf9f6] p-2 text-slate-900 focus:bg-white focus:outline-none placeholder-slate-400 font-medium h-8 rounded-none"
                      />
                    </div>
                  </div>

                  <Button
                    onClick={handleBrainstormNiche}
                    disabled={loadingAI}
                    className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-700 text-white font-heading text-xs uppercase tracking-widest font-bold py-2.5 px-4 rounded-none transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {loadingAI ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Brainstorming...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5" /> Brainstorm Niche (AI)
                      </>
                    )}
                  </Button>

                  {aiNicheSummary && (
                    <div className="bg-[#faf9f6] border-l-2 border-[#000000] p-2.5 mt-2 flex flex-col items-start gap-2 border border-slate-200">
                      <span className="font-mono text-xs uppercase tracking-wider font-extrabold text-[#000000] block mb-0.5">💡 AI Niche Summary:</span>
                      <p className="text-slate-800 font-sans font-bold leading-normal italic text-sm">
                        "{aiNicheSummary}"
                      </p>
                      <Button
                        variant="outline"
                        size="xs"
                        onClick={() => setIsBrainstormModalOpen(true)}
                        className="text-xs font-heading font-bold tracking-wider uppercase rounded-none border-[#000000] text-[#000000] hover:bg-[#000000] hover:text-white mt-1 h-7"
                      >
                        View Executive Report
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-none p-5 shadow-sm">
            <h3 className="font-heading text-slate-900 text-xs uppercase tracking-widest mb-4 border-b border-slate-100 pb-3 font-bold">
              Course Checklist
            </h3>

            <div className="space-y-4">
              {phasesData.map((phase, pIdx) => {
                const isSelected = activePhaseIndex === pIdx;
                const isPhaseAssessed = completedAssessments[phase.id];
                const isLocked = pIdx > 0 && !isPhase1Complete;
                
                return (
                  <div key={phase.id} className="border-b border-slate-100 last:border-b-0 pb-3 last:pb-0">
                    <button
                      disabled={isLocked}
                      onClick={() => {
                        if (isLocked) return;
                        setActivePhaseIndex(pIdx);
                        setActiveLessonIndex(0);
                        setCoachFeedback("");
                      }}
                      className={`w-full text-left font-heading text-xs uppercase tracking-wider font-bold py-2 flex items-center justify-between transition-colors ${
                        isLocked 
                          ? "opacity-40 cursor-not-allowed text-slate-400 font-medium" 
                          : isSelected 
                            ? "text-[#000000]" 
                            : "text-slate-800 hover:text-[#000000]"
                      }`}
                    >
                      <span className="flex items-center gap-2 max-w-[85%] truncate font-bold">
                        {isLocked ? (
                          <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        ) : isPhaseAssessed ? (
                          <CheckCircle2 className="w-4 h-4 text-[#000000] shrink-0" />
                        ) : (
                          <span className="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center text-xs font-mono shrink-0">
                            {phase.num}
                          </span>
                        )}
                        <span className={`truncate ${isLocked ? "italic" : ""}`}>
                          {phase.title} {isLocked && "(Locked)"}
                        </span>
                      </span>
                      {!isLocked && <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? "rotate-90" : ""}`} />}
                    </button>

                    {isSelected && (
                      <div className="mt-2 pl-6 space-y-1.5 border-l border-[#eae3d7]">
                        {phase.lessons.map((lesson, lIdx) => {
                          const isCurrent = activeLessonIndex === lIdx;
                          const isDone = completedLessons[lesson.id];
                          
                          return (
                            <div key={lesson.id} className="flex items-center justify-between gap-2 py-1">
                              <button
                                onClick={() => {
                                  setActiveLessonIndex(lIdx);
                                  setCoachFeedback("");
                                }}
                                className={`text-left text-xs font-sans font-medium transition-colors hover:text-[#000000] truncate flex-1 ${
                                  isCurrent ? "text-slate-900 font-extrabold underline decoration-[#000000] underline-offset-4" : "text-slate-500"
                                }`}
                              >
                                {lesson.title}
                              </button>
                              <button
                                onClick={() => toggleLessonComplete(lesson.id)}
                                className={`w-4 h-4 rounded-none border flex items-center justify-center transition-all ${
                                  isDone 
                                    ? "bg-[#000000] border-[#000000] text-white" 
                                    : "border-slate-300 hover:border-slate-500 bg-white"
                                }`}
                              >
                                {isDone && <Check className="w-3 h-3" />}
                              </button>
                            </div>
                          );
                        })}

                        {/* Link to Case Study */}
                        <div className="pt-2 border-t border-slate-100 mt-2">
                          <span className={`text-xs uppercase font-bold tracking-wider font-mono flex items-center gap-1.5 ${
                            isPhaseAssessed ? "text-[#000000]" : "text-red-500"
                          }`}>
                            <ShieldAlert className="w-3.5 h-3.5" />
                            {isPhaseAssessed ? "Case Study Submitted" : "Case Study Pending"}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-[#eae3d7] text-[#5c5346] border border-[#d5c7b3] p-5">
            <h4 className="font-heading text-xs tracking-widest uppercase font-bold mb-2">Need Support?</h4>
            <p className="text-xs font-sans leading-relaxed font-medium">
              Stuck on a case study question or sandbox tool? Ask other creators in our community forum or view the help documentation.
            </p>
          </div>
        </aside>

        {/* RIGHT MAIN CONTENT AREA: Lessons, Interactive Sandboxes, Case Studies */}
        <section className="lg:col-span-8 space-y-8">
          
          {/* LESSON PANEL */}
          <div className="bg-white border border-slate-200 rounded-none p-6 md:p-8 shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold text-[#000000] uppercase tracking-widest font-mono">
                  {activePhase.title}
                </span>
                <h2 className="text-xl md:text-2xl font-heading text-slate-900 uppercase tracking-widest mt-1">
                  {activeLesson.title}
                </h2>
              </div>

              <button
                onClick={() => toggleLessonComplete(activeLesson.id)}
                className={`py-1.5 px-4 font-heading text-xs uppercase tracking-widest font-bold transition-all rounded-none flex items-center gap-2 shrink-0 ${
                  completedLessons[activeLesson.id]
                    ? "bg-[#eae3d7] text-[#5c5346] border border-[#d5c7b3]"
                    : "bg-[#000000] hover:bg-[#1a1a1a] text-white"
                }`}
              >
                {completedLessons[activeLesson.id] ? (
                  <>
                    <Check className="w-3.5 h-3.5" /> Finished Lesson
                  </>
                ) : (
                  "Mark as Finished"
                )}
              </button>
            </div>

            <div className="space-y-6">
              <div className="bg-[#faf9f6] border-l-4 border-[#000000] p-5 text-sm md:text-base leading-relaxed text-slate-700 font-sans font-medium italic">
                &ldquo;{activeLesson.summary}&rdquo;
              </div>

              <div>
                <h4 className="font-heading text-slate-900 text-xs tracking-widest uppercase mb-4 font-bold">
                  Key Takeaways
                </h4>
                <ul className="space-y-3.5">
                  {activeLesson.points.map((point, index) => (
                    <li key={index} className="text-sm text-slate-650 flex items-start gap-2.5 font-sans leading-relaxed">
                      <span className="text-slate-950 font-bold select-none shrink-0 mt-1 font-mono">{index + 1}.</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CARD SELECTOR & PREVIEWER WIDGET */}
              {suggestedCardsMap[activeLesson.id] && (
                <div className="border-t border-slate-100 pt-6 mt-6">
                  <h4 className="font-heading text-slate-900 text-xs tracking-widest uppercase mb-3 font-bold flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#000000]" /> Recommended Design Cards
                  </h4>
                  <p className="text-xs text-slate-500 font-sans mb-4">
                    These design cards from the toolkit will help you complete the tasks in this lesson:
                  </p>

                  {/* Tabs of cards */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {suggestedCardsMap[activeLesson.id]?.map((cardId) => {
                      const card = cardsList.find(c => c.id === cardId);
                      if (!card) return null;
                      const isSelected = selectedLessonCardId === cardId;
                      return (
                        <button
                          key={cardId}
                          onClick={() => setSelectedLessonCardId(cardId)}
                          className={`py-1.5 px-3 border text-xs font-mono font-bold transition-all rounded-none ${
                            isSelected 
                              ? "bg-[#000000] border-[#000000] text-white" 
                              : "bg-[#faf9f6] border-slate-200 text-slate-600 hover:border-slate-350 hover:bg-slate-50"
                          }`}
                        >
                          Card {card.num}: {card.title}
                        </button>
                      );
                    })}
                  </div>

                  {/* Card Preview Details */}
                  {(() => {
                    const card = cardsList.find(c => c.id === selectedLessonCardId);
                    if (!card) return null;
                    return (
                      <div className="bg-[#faf9f6] border border-slate-200 p-5 rounded-none shadow-sm relative overflow-hidden transition-all duration-300">
                        {/* Decorative stage banner */}
                        <div className="absolute top-0 right-0 bg-slate-900 text-white text-xs uppercase tracking-widest py-1 px-3 font-bold font-mono">
                          {card.stage}
                        </div>

                        <div className="mb-3 flex justify-between items-start">
                          <div>
                            <span className="text-xs uppercase font-bold tracking-widest font-mono text-[#000000]">
                              Card {card.num} • {card.category}
                            </span>
                            <h5 className="font-heading text-[#0f172a] text-sm uppercase tracking-wide font-extrabold mt-0.5">
                              {card.title}
                            </h5>
                          </div>
                          <button
                            onClick={() => handleDownloadPDF(card)}
                            className="bg-transparent border border-[#000000]/30 hover:bg-[#000000] hover:text-white text-[#000000] px-2.5 py-1 text-xs font-mono font-bold uppercase tracking-widest transition-all rounded-none cursor-pointer flex items-center gap-1.5 h-7 mr-16 z-10 shrink-0"
                          >
                            <Download className="w-3 h-3" /> PDF Template
                          </button>
                        </div>

                        <div className="space-y-4 text-xs">
                          <div>
                            <span className="font-mono text-xs text-slate-400 uppercase font-bold block mb-1">Objective:</span>
                            <p className="text-slate-700 font-sans font-semibold leading-relaxed">{card.objective}</p>
                          </div>

                          <div>
                            <span className="font-mono text-xs text-slate-400 uppercase font-bold block mb-1">How to deploy:</span>
                            <ul className="space-y-1.5 pl-3 list-decimal text-slate-650 font-sans leading-relaxed font-semibold">
                              {card.deployment.map((step, sIdx) => (
                                <li key={sIdx}>{step}</li>
                              ))}
                            </ul>
                          </div>

                          {/* Venture application block */}
                          <div className="bg-white border-l-4 border-[#000000] p-3.5 mt-3 shadow-sm border border-slate-150">
                            <span className="font-mono text-xs text-[#000000] uppercase font-black block mb-1 flex items-center gap-1">
                              <Sparkles className="w-3 h-3" /> How to apply to "{ventureName}":
                            </span>
                            <p className="text-slate-800 font-sans font-bold leading-relaxed italic text-sm whitespace-pre-line">
                              {aiCustomApplications[card.id] || getVentureApplication(card.id, ventureName, ventureIndustry, ventureType)}
                            </p>
                          </div>

                          {/* Student Field Findings notes section */}
                          {isPhase1Complete && (
                            <div className="bg-[#faf9f6] border border-slate-200 p-3.5 mt-3 shadow-sm space-y-2">
                              <Label className="block text-xs font-heading text-slate-850 uppercase tracking-widest font-bold flex items-center gap-1.5">
                                📝 Your Field Findings & Observations for Card {card.num}:
                              </Label>
                              <Textarea
                                rows={3}
                                value={cardNotes[card.id] || ""}
                                onChange={(e) => {
                                  setCardNotes({
                                    ...cardNotes,
                                    [card.id]: e.target.value
                                  });
                                }}
                                placeholder="Type what customers said during chats, notes from shadowing, diary logs, or other research inputs. The LEO engine will read this data when brainstorming!"
                                className="w-full bg-white border border-slate-200 text-xs p-2 focus:outline-none focus:border-[#000000] placeholder-slate-400 font-sans rounded-none h-20"
                              />
                              <div className="flex items-center justify-between mt-2">
                                <span className="text-xs text-slate-400 font-sans">
                                  Saved data is ingested by LEO boardroom brainstorm.
                                </span>
                                <Button
                                  variant="outline"
                                  size="xs"
                                  onClick={() => handleSaveCardNote(card.id, cardNotes[card.id] || "")}
                                  className="text-xs font-heading font-bold tracking-wider uppercase rounded-none border-[#000000] text-[#000000] hover:bg-[#000000] hover:text-white h-7 cursor-pointer"
                                >
                                  {activeSavingCardNoteId === card.id ? "Saved! ✓" : "Save Field Notes"}
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
          </div>

          {/* DYNAMIC SANDBOX WIDGET PANEL */}
          <div className="bg-slate-900 text-white rounded-none p-6 md:p-8 shadow-md border border-slate-850">
            <div className="flex items-center gap-2 mb-6 border-b border-slate-800 pb-4">
              <Sliders className="w-5 h-5 text-[#000000]" />
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">
                  Module Practice Playground
                </span>
                <h3 className="text-sm font-heading text-white tracking-widest uppercase font-bold">
                  {activePhase.num === 1 && "Phase 1: Local App Data Compliance Checker"}
                  {activePhase.num === 2 && "Phase 2: Habit Planner & Customer Persona Cards"}
                  {activePhase.num === 3 && "Phase 3: Database Links & Sprint Task Board"}
                  {activePhase.num === 4 && "Phase 4: Retainer Contract & Profit Calculator"}
                  {activePhase.num === 5 && "Phase 5: Launch Growth Loops Metric Simulator"}
                </h3>
              </div>
            </div>

            {/* SANDBOX 1: Compliance Checker */}
            {activePhase.num === 1 && (
              <div className="space-y-6">
                <p className="text-xs text-slate-300 font-sans max-w-2xl leading-relaxed">
                  Before launching your brand, verify that the customer data you store is safe, legal, and complies with local privacy guidelines. Select options below to check your Compliance Score:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
                  {/* Step 1: Collect */}
                  <div className="bg-slate-850 p-4 border border-slate-800">
                    <h5 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 font-mono">1. What data do you save?</h5>
                    <div className="space-y-2 text-xs">
                      <label className="flex items-center gap-2 cursor-pointer hover:text-[#000000]">
                        <Checkbox 
                          checked={s1DataCollected.phone} 
                          onCheckedChange={(checked) => setS1DataCollected({...s1DataCollected, phone: !!checked})}
                        />
                        <span>Phone Number (Signups)</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer hover:text-[#000000]">
                        <Checkbox 
                          checked={s1DataCollected.location} 
                          onCheckedChange={(checked) => setS1DataCollected({...s1DataCollected, location: !!checked})}
                        />
                        <span>Live Location Tracking</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer hover:text-[#000000]">
                        <Checkbox 
                          checked={s1DataCollected.bookings} 
                          onCheckedChange={(checked) => setS1DataCollected({...s1DataCollected, bookings: !!checked})}
                        />
                        <span>{ventureName} Customer Logs ({ventureIndustry})</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer hover:text-[#000000]">
                        <Checkbox 
                          checked={s1DataCollected.payments} 
                          onCheckedChange={(checked) => setS1DataCollected({...s1DataCollected, payments: !!checked})}
                        />
                        <span>Debit Card details</span>
                      </label>
                    </div>
                  </div>

                  {/* Step 2: Storage */}
                  <div className="bg-slate-850 p-4 border border-slate-800">
                    <h5 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 font-mono">2. Where is data stored?</h5>
                    <div className="space-y-2 text-xs">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="radio" 
                          name="s1Storage"
                          value="local"
                          checked={s1Storage === "local"} 
                          onChange={() => setS1Storage("local")}
                          className="text-[#000000]"
                        />
                        <span>User device only (Safest)</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="radio" 
                          name="s1Storage"
                          value="cloud"
                          checked={s1Storage === "cloud"} 
                          onChange={() => setS1Storage("cloud")}
                          className="text-[#000000]"
                        />
                        <span>Secure Private Cloud</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="radio" 
                          name="s1Storage"
                          value="shared"
                          checked={s1Storage === "shared"} 
                          onChange={() => setS1Storage("shared")}
                          className="text-[#000000]"
                        />
                        <span>Shared Public Database (Risk)</span>
                      </label>
                    </div>
                  </div>

                  {/* Step 3: Protections */}
                  <div className="bg-slate-850 p-4 border border-slate-800">
                    <h5 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 font-mono">3. What privacy safety is on?</h5>
                    <div className="space-y-2 text-xs">
                      <label className="flex items-center gap-2 cursor-pointer hover:text-[#000000]">
                        <Checkbox 
                          checked={s1Consents.askConsent} 
                          onCheckedChange={(checked) => setS1Consents({...s1Consents, askConsent: !!checked})}
                        />
                        <span>Ask explicit customer consent</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer hover:text-[#000000]">
                        <Checkbox 
                          checked={s1Consents.deleteData} 
                          onCheckedChange={(checked) => setS1Consents({...s1Consents, deleteData: !!checked})}
                        />
                        <span>Delete files after 30 days</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer hover:text-[#000000]">
                        <Checkbox 
                          checked={s1Consents.encryptInfo} 
                          onCheckedChange={(checked) => setS1Consents({...s1Consents, encryptInfo: !!checked})}
                        />
                        <span>Encrypt personal details</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Score panel */}
                <div className="bg-slate-850 p-5 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full border-4 border-slate-750 flex items-center justify-center font-mono text-lg font-bold text-[#000000]">
                      {complianceScore}%
                    </div>
                    <div>
                      <h6 className="text-xs uppercase font-heading text-white font-bold">Privacy Compliance Score</h6>
                      <p className="text-sm text-slate-400 mt-0.5">Affected by collected details, cloud hosting options, and client consents.</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className={`inline-block py-1 px-3 text-xs uppercase tracking-wider font-mono font-semibold ${
                      complianceScore >= 80 ? "bg-green-950/40 text-green-400 border border-green-800" :
                      complianceScore >= 50 ? "bg-yellow-950/40 text-yellow-400 border border-yellow-800" :
                      "bg-red-950/40 text-red-400 border border-red-800"
                    }`}>
                      {complianceScore >= 80 ? "Safe & Compliant ✅" :
                       complianceScore >= 50 ? "High Security Risk! ⚠️" :
                       "Illegal / Non-compliant 🚨"}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* SANDBOX 2: Customer Personas */}
            {activePhase.num === 2 && (
              <div className="space-y-6">
                <div className="flex border-b border-slate-800 text-xs font-heading flex-wrap">
                  <button 
                    onClick={() => setS2ActiveTab("personas")}
                    className={`py-2 px-4 border-b-2 font-bold transition-all cursor-pointer ${s2ActiveTab === "personas" ? "border-[#000000] text-[#000000]" : "border-transparent text-slate-400 hover:text-white"}`}
                  >
                    1. Customer Profiles (Habits)
                  </button>
                  <button 
                    onClick={() => setS2ActiveTab("cards")}
                    className={`py-2 px-4 border-b-2 font-bold transition-all cursor-pointer ${s2ActiveTab === "cards" ? "border-[#000000] text-[#000000]" : "border-transparent text-slate-400 hover:text-white"}`}
                  >
                    2. Research Probes (Cards)
                  </button>
                  <button 
                    onClick={() => setS2ActiveTab("synthesis")}
                    className={`py-2 px-4 border-b-2 font-bold transition-all cursor-pointer ${s2ActiveTab === "synthesis" ? "border-[#000000] text-[#000000]" : "border-transparent text-slate-400 hover:text-white"}`}
                  >
                    3. HCD Synthesis Canvas
                  </button>
                </div>

                {s2ActiveTab === "personas" && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
                    {/* List */}
                    <div className="md:col-span-1 space-y-2">
                      {[
                        { name: "Jane (Busy Founder)", role: `Works 60hrs/wk, values ${ventureIndustry} time` },
                        { name: "Alex (Gig Worker)", role: `Struggles to balance tasks with ${ventureIndustry} needs` },
                        { name: "David (Premium Client)", role: "Enjoys premium lifestyle convenience & safe bookings" }
                      ].map((p, idx) => (
                        <button
                          key={idx}
                          onClick={() => setS2ActivePersona(idx)}
                          className={`w-full text-left p-3 border text-xs block transition-all ${
                            s2ActivePersona === idx 
                              ? "bg-[#000000] text-white border-[#000000]" 
                              : "bg-slate-850 hover:bg-slate-800 border-slate-800 text-slate-300"
                          }`}
                        >
                          <span className="font-bold block">{p.name}</span>
                          <span className="text-xs opacity-80 block mt-0.5">{p.role}</span>
                        </button>
                      ))}
                    </div>

                    {/* Details */}
                    <div className="md:col-span-2 bg-slate-850 p-4 border border-slate-800 text-xs space-y-4">
                      {s2ActivePersona === 0 && (
                        <>
                          <h4 className="font-heading text-white text-xs tracking-wider font-bold">Jane's Habits & Frustrations</h4>
                          <p className="text-slate-300">Jane owns a local startup. She wants to use {ventureName} daily to release stress, but corporate calls run over time.</p>
                          <div className="space-y-1 bg-slate-900 p-2.5 border border-slate-800">
                            <span className="text-xs text-slate-400 font-mono block">JANES DAILY HABIT LOOP:</span>
                            <span className="text-[#000000] block font-bold">• Cue: Stress spike after morning calls</span>
                            <span className="text-white block font-bold">• Action: 1-tap request or book {ventureType.split(",")[0] || "services"} near office</span>
                            <span className="text-green-400 block font-bold">• Reward: Feeling active, stress release</span>
                          </div>
                        </>
                      )}
                      {s2ActivePersona === 1 && (
                        <>
                          <h4 className="font-heading text-white text-xs tracking-wider font-bold">Alex's Habits & Frustrations</h4>
                          <p className="text-slate-300">Alex is a busy gig worker. He struggles to manage {ventureType} because of unpredictable work hours.</p>
                          <div className="space-y-1 bg-slate-900 p-2.5 border border-slate-800">
                            <span className="text-xs text-slate-400 font-mono block">ALEXS HABIT LOOP:</span>
                            <span className="text-[#000000] block font-bold">• Cue: Ending a gig shift at 6:00 PM</span>
                            <span className="text-white block font-bold">• Action: Schedules {ventureType.split(",")[0] || "services"} directly through the app</span>
                            <span className="text-green-400 block font-bold">• Reward: Service delivered smoothly right when needed</span>
                          </div>
                        </>
                      )}
                      {s2ActivePersona === 2 && (
                        <>
                          <h4 className="font-heading text-white text-xs tracking-wider font-bold">David's Habits & Frustrations</h4>
                          <p className="text-slate-300">David loves high quality services in the {ventureIndustry} sector but hates slow or unreliable providers.</p>
                          <div className="space-y-1 bg-slate-900 p-2.5 border border-slate-800">
                            <span className="text-xs text-slate-400 font-mono block">DAVIDS HABIT LOOP:</span>
                            <span className="text-[#000000] block font-bold">• Cue: Needs assistance for {ventureType.split(",")[0] || "services"}</span>
                            <span className="text-white block font-bold">• Action: App auto-suggests safe partner ride or service with discount</span>
                            <span className="text-green-400 block font-bold">• Reward: Getting premium service without any phone call hassles</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}

                {s2ActiveTab === "cards" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs text-slate-400 uppercase font-mono mb-2">1. Research Method Type</label>
                        <select 
                          value={s2CardTool}
                          onChange={(e) => setS2CardTool(e.target.value)}
                          className="w-full bg-slate-800 border border-slate-700 text-xs p-2 text-white"
                        >
                          <option value="interview">Coffee Shop Interview Card</option>
                          <option value="diary">Customer Diary Activity Card</option>
                          <option value="workshop">Co-design Group Poster Card</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs text-slate-400 uppercase font-mono mb-2">2. Research Prompt to User</label>
                        <textarea
                          rows={2}
                          value={s2CardPrompt}
                          onChange={(e) => setS2CardPrompt(e.target.value)}
                          className="w-full bg-slate-800 border border-slate-700 text-xs p-2 text-white"
                          placeholder="Type what you want to ask the customer..."
                        />
                      </div>
                    </div>

                    {/* Preview Card */}
                    <div className="bg-[#faf9f6] text-slate-900 p-5 border-l-4 border-[#000000] shadow-md flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-xs uppercase font-bold tracking-widest font-mono text-[#000000]">
                            Sovereign Research Toolkit
                          </span>
                          <span className="text-xs bg-slate-900 text-white px-2 py-0.5 font-bold uppercase font-mono">
                            {s2CardTool}
                          </span>
                        </div>
                        <h5 className="font-heading text-xs uppercase tracking-wider mb-2 font-bold">Research Probe Card</h5>
                        <p className="text-xs text-slate-700 italic font-sans font-medium">
                          &ldquo;{s2CardPrompt}&rdquo;
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-200 text-xs text-slate-400 flex justify-between font-mono">
                        <span>Sovereign Millionaires Kenya</span>
                        <span>Printable template card</span>
                      </div>
                    </div>
                  </div>
                )}

                {s2ActiveTab === "synthesis" && (
                  <div className="space-y-6">
                    <div className="bg-slate-850 p-4 border border-slate-800 text-xs">
                      <h4 className="font-heading text-white font-bold uppercase tracking-wider mb-2">HCD Synthesis & Sensemaking Canvas</h4>
                      <p className="text-slate-300 leading-relaxed font-sans mb-4">
                        Gather your Phase 1 observations, group your card logs, and plot your business assumptions on the X-Y Validation Matrix to define your MVP direction.
                      </p>

                      {/* Grid: 2 Columns (Controls vs Visual Grid) */}
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                        
                        {/* Left Side: Matrix Controls & POV */}
                        <div className="lg:col-span-6 space-y-4">
                          
                          {/* Step 1: Affinity Mapping */}
                          <div className="bg-slate-900 p-3.5 border border-slate-800 space-y-3">
                            <span className="text-xs text-[#000000] uppercase font-bold tracking-widest font-mono block">Step 1: Research Affinity Themes</span>
                            <span className="text-slate-400 text-xs block leading-normal">
                              Map your logged card notes to core business themes to make sense of what you heard in the field.
                            </span>
                            {Object.keys(cardNotes).filter(id => !!cardNotes[id]).length === 0 ? (
                              <p className="text-slate-500 italic text-sm font-sans py-2 text-center bg-slate-950 border border-slate-850">
                                No observations logged yet. Go to active cards below to save findings!
                              </p>
                            ) : (
                              <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1">
                                {Object.entries(cardNotes)
                                  .filter(([_, note]) => !!note)
                                  .map(([cardId, note]) => {
                                    const card = cardsList.find(c => c.id === cardId);
                                    return (
                                      <div key={cardId} className="bg-slate-950 border border-slate-850 p-2 rounded-none flex items-center justify-between gap-3">
                                        <div className="flex-1 min-w-0">
                                          <span className="text-xs font-mono text-slate-400 block font-bold truncate">Card: {card ? card.title : cardId}</span>
                                          <span className="text-slate-300 text-sm block font-sans truncate">"{note}"</span>
                                        </div>
                                        <select
                                          value={synthesisCardThemes[cardId] || "general"}
                                          onChange={(e) => setSynthesisCardThemes({ ...synthesisCardThemes, [cardId]: e.target.value })}
                                          className="bg-slate-900 border border-slate-850 text-xs text-white p-1 rounded-none font-mono focus:outline-none shrink-0"
                                        >
                                          <option value="general">Select Theme</option>
                                          <option value="visual">🎨 Visual Identity</option>
                                          <option value="friction">⚡ Checkout Friction</option>
                                          <option value="safety">🛡️ Trust & Safety</option>
                                          <option value="ops">⚙️ Operations</option>
                                        </select>
                                      </div>
                                    );
                                  })}
                              </div>
                            )}
                          </div>

                          {/* Step 2: Assumption Validation Inputs */}
                          <div className="bg-slate-900 p-3.5 border border-slate-800 space-y-4">
                            <span className="text-xs text-[#000000] uppercase font-bold tracking-widest font-mono block">Step 2: Plot Assumptions</span>
                            <span className="text-slate-400 text-xs block leading-normal">
                              Rate your key assumptions to plot them on the Criticality vs. Evidence X-Y Axis.
                            </span>

                            {/* List of 4 Assumptions */}
                            <div className="space-y-4 font-sans text-sm">
                              {[
                                { id: "a1", label: "A1: Customers will pay a premium to save time" },
                                { id: "a2", label: "A2: Partner providers can be easily onboarded" },
                                { id: "a3", label: "A3: Users trust us to store their location/phone data" },
                                { id: "a4", label: "A4: Local regulations permit this marketplace model" }
                              ].map((ass) => {
                                const crit = Number(synthesisGridPlacements[`${ass.id}-y`] ?? 5);
                                const evid = Number(synthesisGridPlacements[`${ass.id}-x`] ?? 5);
                                return (
                                  <div key={ass.id} className="bg-slate-950 p-2.5 border border-slate-850 space-y-2">
                                    <span className="text-white font-bold block">{ass.label}</span>
                                    <div className="grid grid-cols-2 gap-4">
                                      {/* Criticality slider */}
                                      <div>
                                        <div className="flex justify-between text-xs uppercase tracking-wider text-slate-400 font-mono mb-1">
                                          <span>Criticality</span>
                                          <span className="text-[#000000] font-bold">{crit}/10</span>
                                        </div>
                                        <input
                                          type="range"
                                          min="1"
                                          max="10"
                                          value={crit}
                                          onChange={(e) => setSynthesisGridPlacements({
                                            ...synthesisGridPlacements,
                                            [`${ass.id}-y`]: e.target.value
                                          })}
                                          className="w-full h-1.5 bg-slate-800 rounded-none accent-[#000000]"
                                        />
                                      </div>
                                      {/* Evidence slider */}
                                      <div>
                                        <div className="flex justify-between text-xs uppercase tracking-wider text-slate-400 font-mono mb-1">
                                          <span>Evidence</span>
                                          <span className="text-[#000000] font-bold">{evid}/10</span>
                                        </div>
                                        <input
                                          type="range"
                                          min="1"
                                          max="10"
                                          value={evid}
                                          onChange={(e) => setSynthesisGridPlacements({
                                            ...synthesisGridPlacements,
                                            [`${ass.id}-x`]: e.target.value
                                          })}
                                          className="w-full h-1.5 bg-slate-800 rounded-none accent-[#000000]"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                        </div>

                        {/* Right Side: Interactive X-Y Coordinate Chart & POV Formulator */}
                        <div className="lg:col-span-6 space-y-4 flex flex-col">
                          
                          {/* Visual Grid Container */}
                          <div className="bg-slate-950 border border-slate-800 p-4 rounded-none flex-1 flex flex-col justify-between">
                            <span className="text-xs text-[#000000] uppercase font-bold tracking-widest font-mono block mb-2 text-center">
                              Assumption Validation Matrix (X-Y Axis)
                            </span>
                            
                            {/* The 2x2 Coordinate Graph */}
                            <div className="w-full aspect-[4/3] bg-slate-900 border border-slate-800 relative mt-2 rounded-none overflow-hidden select-none">
                              
                              {/* Axes Lines */}
                              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="w-full h-px border-t border-dashed border-slate-700" />
                              </div>
                              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="h-full w-px border-l border-dashed border-slate-700" />
                              </div>

                              {/* Quadrant Labels */}
                              <div className="absolute top-2 left-2 text-xs font-mono text-red-405/85 bg-red-950/20 border border-red-900/30 px-1.5 py-0.5">
                                🚨 HIGH RISK (TEST FIRST)
                              </div>
                              <div className="absolute top-2 right-2 text-xs font-mono text-green-405/85 bg-green-950/20 border border-green-900/30 px-1.5 py-0.5">
                                🛡️ VALIDATED CORE
                              </div>
                              <div className="absolute bottom-2 left-2 text-xs font-mono text-slate-405/85 bg-slate-950/40 border border-slate-850 px-1.5 py-0.5">
                                💤 LOW PRIORITY
                              </div>
                              <div className="absolute bottom-2 right-2 text-xs font-mono text-[#000000]/85 bg-[#000000]/10 border border-[#000000]/20 px-1.5 py-0.5">
                                ✨ NICE TO HAVES
                              </div>

                              {/* Axis Headings */}
                              <div className="absolute top-1 left-1/2 -translate-x-1/2 text-[7px] font-mono uppercase text-slate-500 font-black">
                                CRITICALITY (HIGH)
                              </div>
                              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[7px] font-mono uppercase text-slate-500 font-black">
                                CRITICALITY (LOW)
                              </div>
                              <div className="absolute top-1/2 left-1.5 -translate-y-1/2 text-[7px] font-mono uppercase text-slate-500 font-black rotate-90 origin-left">
                                NO EVIDENCE
                              </div>
                              <div className="absolute top-1/2 right-1.5 -translate-y-1/2 text-[7px] font-mono uppercase text-slate-500 font-black -rotate-90 origin-right">
                                VALIDATED
                              </div>

                              {/* Plotted Assumption Markers */}
                              {[
                                { id: "a1", num: "A1", color: "bg-red-500", name: "Time Premium" },
                                { id: "a2", num: "A2", color: "bg-blue-500", name: "Partner Onboarding" },
                                { id: "a3", num: "A3", color: "bg-yellow-500", name: "Data Trust" },
                                { id: "a4", num: "A4", color: "bg-purple-500", name: "Regulations" }
                              ].map((ass) => {
                                const crit = Number(synthesisGridPlacements[`${ass.id}-y`] ?? 5);
                                const evid = Number(synthesisGridPlacements[`${ass.id}-x`] ?? 5);
                                // Position calculations (scale 1-10 to % with safe padding)
                                const leftPos = `calc(${(evid - 1) / 9 * 82}% + 15px)`;
                                const bottomPos = `calc(${(crit - 1) / 9 * 78}% + 15px)`;
                                return (
                                  <div 
                                    key={ass.id} 
                                    className="absolute -translate-x-1/2 translate-y-1/2 group transition-all duration-300 z-10"
                                    style={{ left: leftPos, bottom: bottomPos }}
                                  >
                                    <span className={`w-5 h-5 ${ass.color} text-white font-heading font-black text-xs flex items-center justify-center shadow-lg rounded-none border border-white cursor-pointer`}>
                                      {ass.num}
                                    </span>
                                    <span className="absolute left-6 top-1/2 -translate-y-1/2 whitespace-nowrap bg-slate-950 border border-slate-800 text-xs font-mono text-white px-1.5 py-0.5 rounded-none opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none">
                                      {ass.name} (C: {crit}, E: {evid})
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* Step 3: POV & HMW Statements Formulator */}
                          <div className="bg-slate-900 p-3.5 border border-slate-800 space-y-3">
                            <span className="text-xs text-[#000000] uppercase font-bold tracking-widest font-mono block">Step 3: POV & HMW Formulator</span>
                            
                            <div className="space-y-3 font-sans text-xs">
                              <div>
                                <Label className="block text-xs text-slate-400 uppercase font-mono mb-1">
                                  Point of View (POV) Need & Insight
                                </Label>
                                <div className="flex gap-2">
                                  <div className="w-1/2 space-y-1">
                                    <span className="text-xs text-slate-500 font-mono block">THE NEED:</span>
                                    <Input
                                      type="text"
                                      value={synthesisPOVNeed}
                                      onChange={(e) => setSynthesisPOVNeed(e.target.value)}
                                      placeholder="e.g. quick 2-tap service validation"
                                      className="w-full border border-slate-700 bg-slate-950 p-2 text-white placeholder-slate-600 rounded-none h-7 text-xs font-medium"
                                    />
                                  </div>
                                  <div className="w-1/2 space-y-1">
                                    <span className="text-xs text-slate-500 font-mono block">THE INSIGHT / BECAUSE:</span>
                                    <Input
                                      type="text"
                                      value={synthesisPOVInsight}
                                      onChange={(e) => setSynthesisPOVInsight(e.target.value)}
                                      placeholder="e.g. trust partner ratings most"
                                      className="w-full border border-slate-700 bg-slate-950 p-2 text-white placeholder-slate-600 rounded-none h-7 text-xs font-medium"
                                    />
                                  </div>
                                </div>
                                <p className="text-xs text-slate-400 italic mt-1.5 font-medium font-sans">
                                  "Our target customers need a way to <strong className="text-[#000000]">{synthesisPOVNeed || "[need]"}</strong> because they <strong className="text-[#000000]">{synthesisPOVInsight || "[insight]"}</strong>."
                                </p>
                              </div>

                              <div>
                                <Label className="block text-xs text-slate-400 uppercase font-mono mb-1">
                                  How Might We (HMW) Question
                                </Label>
                                <Input
                                  type="text"
                                  value={synthesisHMW}
                                  onChange={(e) => setSynthesisHMW(e.target.value)}
                                  placeholder="e.g. How might we verify partner trust instantly to lower client anxiety?"
                                  className="w-full border border-slate-700 bg-slate-950 p-2 text-white placeholder-slate-600 rounded-none h-7 text-xs font-medium"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Action Trigger */}
                          <Button
                            onClick={handleSaveSynthesis}
                            className="w-full bg-[#000000] hover:bg-[#1a1a1a] text-white font-heading text-xs uppercase tracking-widest font-bold py-2.5 rounded-none transition-all flex items-center justify-center gap-1.5 cursor-pointer h-9 shrink-0"
                          >
                            {isSynthesisSaved ? (
                              <>
                                <Check className="w-3.5 h-3.5" /> Synthesis Canvas Saved!
                              </>
                            ) : (
                              <>
                                <Sparkles className="w-3.5 h-3.5" /> Save Synthesis Canvas & Sync
                              </>
                            )}
                          </Button>

                        </div>

                      </div>

                    </div>
                  </div>
                )}
              </div>
            )}

            {/* SANDBOX 3: SQL & Tasks */}
            {activePhase.num === 3 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sans">
                  {/* Database Check */}
                  <div className="bg-slate-850 p-4 border border-slate-800">
                    <div className="flex justify-between items-center mb-3">
                      <h5 className="text-xs font-bold uppercase tracking-widest text-slate-400 font-mono">Database Link Check</h5>
                      <span className="text-xs text-green-400 flex items-center gap-1">
                        <Database className="w-3 h-3" /> Relational SQL Schema
                      </span>
                    </div>

                    <div className="space-y-3 text-xs">
                      {/* Users Table */}
                      <div className="border border-slate-750 p-2.5 bg-slate-900">
                        <span className="font-mono text-[#000000] font-bold block mb-1">TABLE: Users</span>
                        <div className="flex flex-wrap gap-2 text-xs text-slate-400 font-mono">
                          <span className="bg-slate-800 px-1.5 py-0.5 border border-slate-700 text-white">id (Primary Key)</span>
                          <span className="bg-slate-800 px-1.5 py-0.5">name</span>
                          <span className="bg-slate-800 px-1.5 py-0.5">phone</span>
                        </div>
                      </div>

                      {/* Bookings Table */}
                      <div className="border border-slate-750 p-2.5 bg-slate-900">
                        <div className="flex justify-between">
                          <span className="font-mono text-[#000000] font-bold block mb-1">TABLE: Bookings</span>
                          <button 
                            onClick={() => setS3Schema({...s3Schema, bookings: {...s3Schema.bookings, user_id: !s3Schema.bookings.user_id}})}
                            className={`text-xs uppercase font-bold tracking-widest font-mono px-2 py-0.5 border transition-all ${
                              s3Schema.bookings.user_id ? "bg-green-950 text-green-400 border-green-800" : "bg-red-950 text-red-400 border-red-800"
                            }`}
                          >
                            {s3Schema.bookings.user_id ? "Link user_id ✅" : "No user_id link 🚨"}
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2 text-xs text-slate-400 font-mono mt-1.5">
                          <span className="bg-slate-800 px-1.5 py-0.5">id</span>
                          {s3Schema.bookings.user_id && <span className="bg-slate-800 px-1.5 py-0.5 text-green-400 border border-green-900">user_id (Foreign Link)</span>}
                          <span className="bg-slate-800 px-1.5 py-0.5">service_name</span>
                          <span className="bg-slate-800 px-1.5 py-0.5">price</span>
                        </div>
                      </div>
                    </div>

                    {/* Logic Error Warnings */}
                    <div className="mt-4 p-3 bg-slate-900 border border-slate-800 text-xs">
                      {!s3Schema.bookings.user_id ? (
                        <div className="text-red-400 flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
                          <div>
                            <span className="font-bold block">Database Error!</span>
                            <span className="text-sm block mt-0.5 text-slate-400">The Bookings table has no way to link records back to the Users table. If users request {ventureType.split(",")[0] || "services"} on {ventureName}, the server will crash trying to find who paid. Link user_id!</span>
                          </div>
                        </div>
                      ) : (
                        <div className="text-green-400 flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-green-400" />
                          <div>
                            <span className="font-bold block">Database Link OK</span>
                            <span className="text-sm block mt-0.5 text-slate-400">All bookings for {ventureName} correctly reference user_id records. Your database matches relational schema guidelines.</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Task Backlog */}
                  <div className="bg-slate-850 p-4 border border-slate-800 flex flex-col justify-between">
                    <div>
                      <h5 className="text-xs font-bold uppercase tracking-widest text-slate-400 font-mono mb-3">Developer Sprint Board</h5>
                      
                      <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                        {s3Tasks.map((t) => (
                          <div key={t.id} className="bg-slate-900 border border-slate-850 p-2 text-xs flex items-center justify-between">
                            <span className="text-slate-200 select-none max-w-[70%] truncate font-sans font-medium">{t.text}</span>
                            <div className="flex gap-1 text-xs font-mono font-bold">
                              <button 
                                onClick={() => moveTask(t.id, "todo")} 
                                className={`px-1.5 py-0.5 border ${t.status === "todo" ? "bg-[#000000] text-white border-[#000000]" : "bg-slate-800 text-slate-400 border-slate-700"}`}
                              >
                                TO DO
                              </button>
                              <button 
                                onClick={() => moveTask(t.id, "doing")} 
                                className={`px-1.5 py-0.5 border ${t.status === "doing" ? "bg-yellow-600 text-white border-yellow-600" : "bg-slate-800 text-slate-400 border-slate-700"}`}
                              >
                                WORK
                              </button>
                              <button 
                                onClick={() => moveTask(t.id, "done")} 
                                className={`px-1.5 py-0.5 border ${t.status === "done" ? "bg-green-600 text-white border-green-600" : "bg-slate-800 text-slate-400 border-slate-700"}`}
                              >
                                DONE
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <form onSubmit={addTask} className="mt-4 flex gap-2 pt-3 border-t border-slate-800">
                      <input 
                        type="text" 
                        value={s3NewTaskText}
                        onChange={(e) => setS3NewTaskText(e.target.value)}
                        placeholder="Add new developer task checklist..."
                        className="bg-slate-900 border border-slate-700 text-xs p-2 text-white flex-1 rounded-none placeholder-slate-500"
                      />
                      <button 
                        type="submit" 
                        className="bg-[#000000] hover:bg-[#1a1a1a] text-white font-heading text-xs uppercase tracking-widest font-bold py-2 px-4 rounded-none"
                      >
                        Add Task
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {/* SANDBOX 4: Proposals & Calculator */}
            {activePhase.num === 4 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sans">
                  {/* Proposal Builder */}
                  <div className="bg-slate-850 p-4 border border-slate-800 flex flex-col justify-between">
                    <div>
                      <h5 className="text-xs font-bold uppercase tracking-widest text-slate-400 font-mono mb-3">Proposal Form</h5>
                      
                      <div className="space-y-3 text-xs text-white">
                        <div>
                          <label className="block text-xs text-slate-400 uppercase font-mono mb-1">Client Business Name</label>
                          <input 
                            type="text" 
                            value={s4ClientName} 
                            onChange={(e) => setS4ClientName(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 p-1.5 text-white" 
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs text-slate-400 uppercase font-mono mb-1">Monthly Rate ($)</label>
                            <input 
                              type="number" 
                              value={s4MonthlyRate} 
                              onChange={(e) => setS4MonthlyRate(Number(e.target.value))}
                              className="w-full bg-slate-900 border border-slate-700 p-1.5 text-white" 
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-slate-400 uppercase font-mono mb-1">Hours / Week</label>
                            <input 
                              type="number" 
                              value={s4HoursPerWeek} 
                              onChange={(e) => setS4HoursPerWeek(Number(e.target.value))}
                              className="w-full bg-slate-900 border border-slate-700 p-1.5 text-white" 
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs text-slate-400 uppercase font-mono mb-1">Deliverable Scope</label>
                          <input 
                            type="text" 
                            value={s4SupportType} 
                            onChange={(e) => setS4SupportType(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 p-1.5 text-white" 
                          />
                        </div>
                      </div>
                    </div>

                    {/* Copy proposal output */}
                    <div className="mt-4 bg-[#faf9f6] text-slate-900 p-4 border-l-4 border-[#000000]">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs uppercase tracking-wider font-mono text-slate-400">Proposal Summary Preview</span>
                        <button 
                          onClick={() => {
                            navigator.clipboard.writeText(`RETAINER AGREEMENT\nClient: ${s4ClientName}\nScope: We provide up to ${s4HoursPerWeek} hours per week of ${s4SupportType} for ${s4ClientName} in support of the "${ventureName}" brand.\nRate: $${s4MonthlyRate} USD per month paid in advance.`);
                            alert("Copied to clipboard!");
                          }}
                          className="text-xs text-[#000000] hover:text-[#1a1a1a] font-bold uppercase flex items-center gap-1 font-mono"
                        >
                          <Copy className="w-3 h-3" /> Copy Text
                        </button>
                      </div>
                      <p className="text-sm font-sans font-bold leading-normal text-slate-800">
                        <strong>Agreement Scope:</strong> We will provide up to {s4HoursPerWeek} hours per week of {s4SupportType} for {s4ClientName} in support of the "{ventureName}" brand.<br/>
                        <strong>Consulting Fee:</strong> Client agrees to pay a fixed fee of ${s4MonthlyRate} USD per month, billed in advance on the 1st of each month.
                      </p>
                    </div>
                  </div>

                  {/* Business Profit Calculator */}
                  <div className="bg-slate-850 p-4 border border-slate-800 flex flex-col justify-between">
                    <div>
                      <h5 className="text-xs font-bold uppercase tracking-widest text-slate-400 font-mono mb-3">Profit & Loss Calculator</h5>
                      
                      <div className="space-y-3 text-xs text-white">
                        <div>
                          <label className="block text-xs text-slate-400 uppercase font-mono mb-1">Monthly Expenses ($) (Hosting + Software)</label>
                          <input 
                            type="number" 
                            value={s4Expenses} 
                            onChange={(e) => setS4Expenses(Number(e.target.value))}
                            className="w-full bg-slate-900 border border-slate-700 p-1.5 text-white" 
                          />
                        </div>

                        {/* calculations */}
                        <div className="space-y-2 bg-slate-900 p-4 border border-slate-800 mt-4">
                          <div className="flex justify-between">
                            <span className="text-slate-400">Monthly Revenue:</span>
                            <span className="font-bold text-green-400">${s4MonthlyRate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Monthly Costs:</span>
                            <span className="font-bold text-red-400">${s4Expenses}</span>
                          </div>
                          <div className="border-t border-slate-800 my-2 pt-2 flex justify-between">
                            <span className="text-white font-bold">Total Net Profit:</span>
                            <span className="font-bold text-white">${s4MonthlyRate - s4Expenses}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Net Margin %:</span>
                            <span className="font-mono text-[#000000] font-bold">
                              {s4MonthlyRate > 0 ? Math.round(((s4MonthlyRate - s4Expenses) / s4MonthlyRate) * 100) : 0}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-slate-900 border border-slate-800 text-xs">
                      {s4MonthlyRate - s4Expenses > 0 ? (
                        <div className="text-green-400 flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-green-400" />
                          <div>
                            <span className="font-bold block">Healthy Cashflow ✅</span>
                            <span className="text-sm block mt-0.5 text-slate-400">Your monthly revenue covers your tech expenses safely. Your business profit margin is positive.</span>
                          </div>
                        </div>
                      ) : (
                        <div className="text-red-400 flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
                          <div>
                            <span className="font-bold block">Cashflow Danger! 🚨</span>
                            <span className="text-sm block mt-0.5 text-slate-400">Your expenses exceed your retainer income. Increase your monthly consulting rate or reduce hosting services to avoid losses.</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SANDBOX 5: Growth loop metrics */}
            {activePhase.num === 5 && (
              <div className="space-y-6">
                <p className="text-xs text-slate-300 font-sans max-w-2xl leading-relaxed">
                  Use sliders below to adjust your launch metrics for "{ventureName}". Test how customer referral bonuses, partner promotional posts, and site speed/latency investments affect monthly active users for your "{ventureType}" services:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 font-sans">
                  {/* Sliders Panel */}
                  <div className="md:col-span-1 bg-slate-850 p-4 border border-slate-800 space-y-4">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-400 uppercase font-mono text-xs">Referral Reward:</span>
                        <span className="text-white font-bold">${s5ReferralReward}</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="10" 
                        value={s5ReferralReward} 
                        onChange={(e) => setS5ReferralReward(Number(e.target.value))}
                        className="w-full accent-[#000000]" 
                      />
                      <span className="text-xs text-slate-500 block">Higher reward boosts invites but costs you discounts.</span>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-400 uppercase font-mono text-xs">Partner Posts/Wk:</span>
                        <span className="text-white font-bold">{s5PartnerPosts}</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="10" 
                        value={s5PartnerPosts} 
                        onChange={(e) => setS5PartnerPosts(Number(e.target.value))}
                        className="w-full accent-[#000000]" 
                      />
                      <span className="text-xs text-slate-500 block">More partner flyers bring higher new customer views.</span>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-400 uppercase font-mono text-xs">Tech Maintenance Cost:</span>
                        <span className="text-white font-bold">${s5TechMaintenance}/mo</span>
                      </div>
                      <input 
                        type="range" 
                        min="10" 
                        max="200" 
                        value={s5TechMaintenance} 
                        onChange={(e) => setS5TechMaintenance(Number(e.target.value))}
                        className="w-full accent-[#000000]" 
                      />
                      <span className="text-xs text-slate-500 block">More tech investment makes the site load faster.</span>
                    </div>
                  </div>

                  {/* Metrics Dashboard */}
                  <div className="md:col-span-2 bg-slate-850 p-4 border border-slate-800 grid grid-cols-2 gap-4">
                    <div className="bg-slate-900 border border-slate-800 p-3 flex flex-col justify-between">
                      <span className="text-xs uppercase font-mono text-slate-400 tracking-wider">Site Speed (Latency)</span>
                      <div className="my-2 flex items-baseline gap-1">
                        <span className={`text-2xl font-bold ${metrics.latency > 1500 ? "text-red-400" : metrics.latency > 800 ? "text-yellow-400" : "text-green-400"}`}>
                          {metrics.latency}
                        </span>
                        <span className="text-slate-500 text-xs">ms</span>
                      </div>
                      <span className="text-xs text-slate-400">
                        {metrics.latency > 1500 ? "Too slow! Users quit checkout. 🚨" :
                         metrics.latency > 800 ? "Sluggish speed. ⚠️" :
                         "Very fast speed! ✅"}
                      </span>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 p-3 flex flex-col justify-between">
                      <span className="text-xs uppercase font-mono text-slate-400 tracking-wider">Viral Referral Rate (VIR)</span>
                      <div className="my-2 flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-white">
                          {metrics.vir}
                        </span>
                        <span className="text-slate-500 text-xs">friends/user</span>
                      </div>
                      <span className="text-xs text-slate-400">How many friend signups each active user generates.</span>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 p-3 flex flex-col justify-between">
                      <span className="text-xs uppercase font-mono text-slate-400 tracking-wider">Simulated Active Users (MAU)</span>
                      <div className="my-2">
                        <span className="text-2xl font-bold text-[#000000]">
                          {metrics.mau}
                        </span>
                      </div>
                      <span className="text-xs text-slate-400">Total active users on the app monthly.</span>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 p-3 flex flex-col justify-between">
                      <span className="text-xs uppercase font-mono text-slate-400 tracking-wider">Customer Lifetime Value (LTV)</span>
                      <div className="my-2">
                        <span className="text-2xl font-bold text-green-400">
                          ${metrics.ltv}
                        </span>
                      </div>
                      <span className="text-xs text-slate-400">Expected sales revenue generated per customer.</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* CASE STUDY ASSESSMENT PANEL */}
          <div className="bg-[#eae3d7] border border-[#d5c7b3] rounded-none p-6 md:p-8 shadow-sm">
            <div className="flex gap-3">
              <ShieldAlert className="w-5 h-5 text-slate-900 shrink-0 mt-0.5" />
              <div className="w-full">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <h4 className="font-heading text-slate-900 text-xs uppercase tracking-widest font-bold">
                    Practical Case Study Assessment
                  </h4>
                  <span className="text-xs bg-slate-900 text-white px-2.5 py-0.5 rounded-none uppercase tracking-widest font-bold font-mono self-start sm:self-auto">
                    {activePhase.caseStudy.title}
                  </span>
                </div>

                <p className="text-slate-800 text-sm mb-6 leading-relaxed font-sans font-medium">
                  {getCaseStudyScenario(activePhase.id, ventureName, ventureIndustry, ventureType)}
                </p>

                {/* Form to fill assessment questions */}
                <div className="space-y-4 border-t border-[#d5c7b3] pt-6">
                  {activePhase.caseStudy.questions.map((q, qIdx) => {
                    const phaseAnswers = answers[activePhase.id] || ["", "", ""];
                    return (
                      <div key={qIdx} className="space-y-1.5">
                        <Label className="block text-xs font-bold text-slate-900 font-sans">
                          {qIdx + 1}. {q}
                        </Label>
                        <Textarea
                          rows={2}
                          value={phaseAnswers[qIdx] || ""}
                          onChange={(e) => {
                            const newAnswers = [...phaseAnswers];
                            newAnswers[qIdx] = e.target.value;
                            setAnswers({
                              ...answers,
                              [activePhase.id]: newAnswers
                            });
                          }}
                          className="w-full border border-[#d5c7b3] bg-white/70 p-2 text-xs text-slate-900 focus:bg-white focus:outline-none placeholder-slate-400 font-sans rounded-none h-16"
                          placeholder="Type your response in simple, non-technical language..."
                        />
                      </div>
                    );
                  })}
                </div>

                {/* Coach suggestion note */}
                <div className="bg-[#faf9f6]/60 border border-[#d5c7b3] p-4 text-xs text-slate-700 mt-5 font-sans font-medium">
                  <span className="font-bold text-slate-900 block mb-1">💡 AI Coach Tip:</span>
                  {activePhase.caseStudy.coachTip}
                </div>

                <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-xs uppercase font-bold tracking-widest text-slate-500 font-mono">
                    {completedAssessments[activePhase.id] ? "✓ Submited & Checked" : "Pending Submission"}
                  </span>

                  <Button
                    onClick={() => handleAssessmentSubmit(activePhase.id)}
                    disabled={submittingAssessment}
                    className="bg-slate-900 hover:bg-slate-800 disabled:bg-slate-700 text-white font-heading text-xs uppercase tracking-widest font-bold py-3 px-8 rounded-none transition-all flex items-center gap-2 h-10 cursor-pointer"
                  >
                    {submittingAssessment ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Evaluating Answers...
                      </>
                    ) : (
                      "Submit Answers to Coach"
                    )}
                  </Button>
                </div>

                {/* Coach feedback box */}
                {coachFeedback && (
                  <div className="mt-6 bg-[#faf9f6] border border-[#000000] p-4 text-xs font-sans text-slate-800">
                    <span className="font-bold text-[#000000] block mb-1">📢 Coach Review:</span>
                    {coachFeedback}
                  </div>
                )}

              </div>
            </div>
          </div>
        </section>
      </main>

        {/* GRADUATION CERTIFICATE COMPONENT */}
        {isGraduated && (
          <section className="max-w-4xl w-full mx-auto px-4 md:px-8 py-12 border-t border-slate-200" id="certificate">
            <div className="bg-white border-8 border-double border-[#000000] p-8 md:p-14 text-center space-y-6 relative overflow-hidden shadow-xl max-w-3xl mx-auto">
              
              {/* Luxury Watermark Ribbon */}
              <div className="absolute top-0 right-0 bg-[#000000] text-white font-heading text-xs uppercase tracking-widest py-1.5 px-8 rotate-45 translate-x-6 translate-y-3">
                SOVEREIGN
              </div>

              <div className="flex justify-center mb-4">
                <Award className="w-16 h-16 text-[#000000]" />
              </div>

              <span className="font-heading text-[#000000] text-xs tracking-widest uppercase block font-bold">
                Sovereign Millionaires Graduation Certificate
              </span>

              <h1 className="text-xl md:text-3xl font-heading text-slate-950 uppercase tracking-widest leading-snug">
                Sovereign Lifestyle Product Builder
              </h1>

              <p className="text-xs text-slate-500 italic font-serif max-w-lg mx-auto">
                This certifies that the candidate has successfully completed all 5 Modules, run the engineering sandboxes, and passed the practical case-study reviews under the Sovereign Millionaires curriculum.
              </p>

              {/* Student name input box */}
              <div className="max-w-sm mx-auto border-b-2 border-slate-950 py-1.5 print:border-none">
                <input 
                  type="text" 
                  value={studentName}
                  onChange={handleStudentNameChange}
                  placeholder="[Type Your Name Here]"
                  className="w-full text-center bg-transparent border-none text-lg md:text-2xl font-serif text-slate-900 focus:outline-none placeholder-slate-300 font-bold"
                />
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center pt-8 max-w-md mx-auto text-xs text-slate-400 font-mono">
                <div>
                  <span className="block border-t border-slate-200 pt-1 text-slate-600 font-sans font-bold">ISSUED DATE</span>
                  <span className="block mt-1 font-bold">{certificateDate}</span>
                </div>
                <div className="mt-4 sm:mt-0">
                  <span className="block border-t border-slate-200 pt-1 text-slate-600 font-sans font-bold">SOVEREIGN REGISTRY ID</span>
                  <span className="block mt-1 font-bold">SM-ONEAPP-{new Date().getFullYear()}-{(lessonsDoneCount * 123).toString(16).toUpperCase()}</span>
                </div>
              </div>

              {/* Print and Export Buttons */}
              <div className="pt-8 print:hidden">
                <button
                  onClick={() => window.print()}
                  className="bg-[#000000] hover:bg-[#1a1a1a] text-white font-heading text-xs uppercase tracking-widest font-bold py-2.5 px-6 rounded-none flex items-center gap-2 mx-auto transition-all"
                >
                  <Printer className="w-4 h-4" /> Print Certificate
                </button>
              </div>

            </div>
          </section>
        )}

      {/* FOOTER */}
      <Footer />

      {/* LEO Brainstorm Modal */}
      <Dialog open={isBrainstormModalOpen} onOpenChange={setIsBrainstormModalOpen}>
        <DialogContent className="max-w-4xl sm:max-w-4xl bg-white border border-slate-300 p-6 rounded-none shadow-xl max-h-[90vh] overflow-y-auto z-50">
          <DialogHeader>
            <DialogTitle className="text-lg font-heading text-slate-900 uppercase tracking-widest font-black flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#000000]" /> LEO Executive Boardroom Report
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-400 font-sans">
              Virtual Executive Boardroom analysis generated through 6 critical lenses.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 text-xs text-slate-800 font-sans text-left mt-4">
            
            {/* Input Summary Section */}
            <div className="bg-[#faf9f6] border border-slate-200 p-4 rounded-none space-y-3">
              <h4 className="font-heading text-xs text-slate-900 uppercase tracking-widest font-bold border-b border-slate-200 pb-2">
                Venture Profile & Inputs
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-655 font-medium">
                <div>
                  <span className="block text-xs text-slate-400 uppercase font-mono">Proposed Brand Name</span>
                  <span className="text-slate-900 font-bold">{ventureName}</span>
                </div>
                <div>
                  <span className="block text-xs text-slate-400 uppercase font-mono">Industry Vertical</span>
                  <span className="text-slate-900 font-bold">{ventureIndustry}</span>
                </div>
                <div className="sm:col-span-2">
                  <span className="block text-xs text-slate-400 uppercase font-mono">What is the problem?</span>
                  <span className="text-slate-900">{whatProblem || <span className="italic text-slate-400">Not specified</span>}</span>
                </div>
                <div>
                  <span className="block text-xs text-slate-400 uppercase font-mono">Who is affected?</span>
                  <span className="text-slate-900">{whoAffected || <span className="italic text-slate-400">Not specified</span>}</span>
                </div>
                <div>
                  <span className="block text-xs text-slate-400 uppercase font-mono">Where is it happening?</span>
                  <span className="text-slate-900">{whereHappening || <span className="italic text-slate-400">Not specified</span>}</span>
                </div>
                <div>
                  <span className="block text-xs text-slate-400 uppercase font-mono">When is it happening?</span>
                  <span className="text-slate-900">{whenHappening || <span className="italic text-slate-400">Not specified</span>}</span>
                </div>
                <div>
                  <span className="block text-xs text-slate-400 uppercase font-mono">How is it broken?</span>
                  <span className="text-slate-900">{howHappening || <span className="italic text-slate-400">Not specified</span>}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 flex items-center gap-1.5 text-slate-500 text-xs">
                <Briefcase className="w-3.5 h-3.5 text-[#000000] shrink-0" />
                <span>Platform Context: **Sovereign Millionaires / OneApp** (Independent founder transitions)</span>
              </div>
            </div>

            {/* LEO Analysis Report */}
            <div className="border-t border-slate-200 pt-4 space-y-4">
              {loadingAI ? (
                <div className="space-y-4 py-6">
                  <div className="flex items-center gap-4">
                    <Skeleton className="w-12 h-12 rounded-full shrink-0" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-1/3" />
                      <Skeleton className="h-3 w-1/4" />
                    </div>
                  </div>
                  <div className="space-y-2.5 pt-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-[95%]" />
                    <Skeleton className="h-4 w-[90%]" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-[85%]" />
                  </div>
                  <p className="text-xs text-slate-400 text-center animate-pulse pt-2 font-mono">
                    LEO is evaluating database structures, behavioral SBC drivers, compliance guidelines, GTM loops, and corporate sprint velocities...
                  </p>
                </div>
              ) : leoReport ? (
                <div className="space-y-4 prose prose-sm max-w-none text-slate-800 font-sans text-xs leading-relaxed">
                  <div className="whitespace-pre-wrap leading-normal font-sans text-xs bg-slate-50 p-4 border border-slate-200 rounded-none max-h-[300px] overflow-y-auto">
                    {leoReport}
                  </div>
                </div>
              ) : (
                <div className="py-8 text-center text-slate-400 italic">
                  No boardroom report generated yet.
                </div>
              )}
            </div>

            {/* Footer / Action */}
            <div className="border-t border-slate-150 pt-4 flex justify-end gap-2">
              <Button 
                variant="outline" 
                onClick={() => setIsBrainstormModalOpen(false)}
                className="rounded-none font-heading text-xs uppercase tracking-widest font-bold cursor-pointer"
              >
                Dismiss Boardroom
              </Button>
            </div>

          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
}
