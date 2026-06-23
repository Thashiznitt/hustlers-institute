"use client";

import React, { useState, useEffect, useRef } from "react";
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
  ChevronLeft,
  Sparkles,
  X,
  LayoutDashboard,
  Map,
  HelpCircle,
  MessageSquare,
  Menu
} from "lucide-react";

import { cardsList, CardData } from "@/components/DesignCardsExplorer";
import DesignCard from "@/components/DesignCard";

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
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";



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



const lessonHeroImages: Record<string, string> = {
  "1.1": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
  "1.2": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
  "1.3": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
  "2.1": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
  "2.2": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80",
  "2.3": "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80",
  "3.1": "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1200&q=80",
  "3.2": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
  "3.3": "https://images.unsplash.com/photo-1507207611509-ec012433ff52?auto=format&fit=crop&w=1200&q=80",
  "4.1": "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80",
  "4.2": "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80",
  "4.3": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80",
  "5.1": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
  "5.2": "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80",
  "5.3": "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=1200&q=80"
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
    id: true,
    name: true,
    bookings: true,
    payments: false,
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

  // Layout sub-tabs & sidebar states
  const [activeSubTab, setActiveSubTab] = useState<string>("dashboard");
  const [isNavExpanded, setIsNavExpanded] = useState<boolean>(false);
  const [isRoadMapOpen, setIsRoadMapOpen] = useState<boolean>(false);
  const [isHelpOpen, setIsHelpOpen] = useState<boolean>(false);
  const [isSecondaryCollapsed, setIsSecondaryCollapsed] = useState<boolean>(true);

  // Modal Dialog locks & references
  const [showCardReferenceModal, setShowCardReferenceModal] = useState<boolean>(false);
  const [selectedReferenceCard, setSelectedReferenceCard] = useState<CardData | null>(null);

  // Navigation scroll refs
  const checklistRef = useRef<HTMLDivElement>(null);
  const playgroundRef = useRef<HTMLDivElement>(null);

  const handleScrollToChecklist = () => {
    setActiveSubTab("checklist");
    setTimeout(() => {
      checklistRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handleScrollToPlayground = () => {
    setActiveSubTab("checklist");
    setTimeout(() => {
      playgroundRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  // Helper to parse key takeaways and embed clickable card references
  const renderTakeawayText = (text: string) => {
    const regex = /(use\s+)?(Card\s+(\d+):\s+([^)]+))/gi;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;
    const localRegex = new RegExp(regex);
    
    while ((match = localRegex.exec(text)) !== null) {
      const matchIndex = match.index;
      const fullMatch = match[0];
      const prefix = match[1] || "";
      const cardRef = match[2];
      const cardNum = parseInt(match[3]);
      
      if (matchIndex > lastIndex) {
        parts.push(text.substring(lastIndex, matchIndex));
      }
      
      const card = cardsList.find(c => parseInt(c.num) === cardNum);
      
      if (card) {
        if (prefix) {
          parts.push(prefix);
        }
        parts.push(
          <button
            key={matchIndex}
            onClick={() => {
              setSelectedReferenceCard(card);
              setShowCardReferenceModal(true);
            }}
            className="inline-flex items-center gap-1 text-slate-900 font-bold underline hover:text-black transition-colors cursor-pointer bg-slate-100 hover:bg-slate-200 px-1.5 py-0.5 font-mono text-[11px] rounded-none border border-slate-200/50"
            title={`View details for ${card.title}`}
          >
            <Sparkles className="w-3 h-3 text-slate-800" />
            {cardRef}
          </button>
        );
      } else {
        parts.push(fullMatch);
      }
      
      lastIndex = localRegex.lastIndex;
    }
    
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }
    
    return parts.length > 0 ? parts : text;
  };

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

  // Find next incomplete lesson
  let nextPhaseIdx = 0;
  let nextLessonIdx = 0;
  let foundNext = false;
  for (let p = 0; p < phasesData.length; p++) {
    const phase = phasesData[p];
    for (let l = 0; l < phase.lessons.length; l++) {
      const lesson = phase.lessons[l];
      if (!completedLessons[lesson.id]) {
        nextPhaseIdx = p;
        nextLessonIdx = l;
        foundNext = true;
        break;
      }
    }
    if (foundNext) break;
  }
  const nextPhase = phasesData[nextPhaseIdx];
  const nextLesson = nextPhase.lessons[nextLessonIdx];
  const isAllCompleted = !foundNext;

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
    <div className="min-h-screen bg-[#faf9f6] text-slate-800 flex">
      {/* PRIMARY COLLAPSIBLE LEFT NAVIGATION SIDEBAR */}
      <aside className={`h-screen sticky top-0 bg-white border-r border-slate-200 flex flex-col justify-between transition-all duration-300 print:hidden z-30 ${isNavExpanded ? "w-64" : "w-16"}`}>
        <div className="flex flex-col">
          {/* Collapse toggle header */}
          <div className="p-4 flex items-center justify-between border-b border-slate-150 h-[74px]">
            {isNavExpanded && (
              <span className="font-heading text-[#000000] tracking-widest text-xs uppercase font-extrabold flex items-center gap-1.5 animate-fade-in">
                Sovereign Foundries
              </span>
            )}
            <button
              onClick={() => setIsNavExpanded(!isNavExpanded)}
              className="p-1.5 hover:bg-slate-100 text-slate-600 hover:text-slate-900 rounded-none transition-all cursor-pointer mx-auto"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-2 space-y-1.5 flex flex-col">
            {[
              { 
                name: "Dashboard", 
                icon: LayoutDashboard, 
                action: () => {
                  setActiveSubTab("dashboard");
                  setIsSecondaryCollapsed(true);
                }
              },
              { 
                name: "Courses", 
                icon: BookOpen, 
                action: () => {
                  setActiveSubTab("checklist");
                  setIsSecondaryCollapsed(false);
                }
              },
              { 
                name: "Playground", 
                icon: Sliders, 
                action: () => {
                  setActiveSubTab("checklist");
                  setIsSecondaryCollapsed(false);
                  setTimeout(() => {
                    playgroundRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }, 100);
                }
              },
              { 
                name: "RoadMap", 
                icon: Map, 
                action: () => setIsRoadMapOpen(true)
              },
              { 
                name: "Help", 
                icon: HelpCircle, 
                action: () => setIsHelpOpen(true)
              }
            ].map((item) => {
              const Icon = item.icon;
              const isActive = (item.name === "Dashboard" && activeSubTab === "dashboard") ||
                               (item.name === "Courses" && activeSubTab !== "dashboard");
              return (
                <button
                  key={item.name}
                  onClick={item.action}
                  title={item.name}
                  className={`w-full flex items-center gap-3 p-3 rounded-none text-xs uppercase tracking-widest font-heading font-bold transition-all border border-transparent cursor-pointer ${
                    isActive 
                      ? "bg-slate-900 text-white" 
                      : "text-slate-500 hover:bg-[#faf9f6] hover:text-slate-900"
                  } ${!isNavExpanded ? "justify-center" : "text-left"}`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {isNavExpanded && <span className="animate-fade-in">{item.name}</span>}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Small branding token at the bottom */}
        {isNavExpanded && (
          <div className="p-4 border-t border-slate-100 text-center font-mono text-[9px] text-slate-400 select-none animate-fade-in uppercase">
            © REMY TOOLS
          </div>
        )}
      </aside>

      {/* SECONDARY SIDEBAR (COURSES SUB-NAV) */}
      <aside className={`bg-[#faf9f6] border-r border-slate-200 h-screen sticky top-0 flex flex-col justify-between shrink-0 print:hidden z-20 transition-all duration-300 ${
        isSecondaryCollapsed ? "w-16" : "w-56"
      }`}>
        {/* Header top placeholder matching others */}
        <div className={`p-4 border-b border-slate-150 h-[74px] flex items-center shrink-0 transition-all duration-300 ${
          isSecondaryCollapsed ? "justify-center" : "justify-between"
        }`}>
          {!isSecondaryCollapsed && (
            <span className="font-heading text-slate-900 tracking-widest text-xs uppercase font-extrabold animate-fade-in">
              Learning Portal
            </span>
          )}
          <button
            onClick={() => setIsSecondaryCollapsed(!isSecondaryCollapsed)}
            className="p-1 hover:bg-slate-200/65 text-slate-500 hover:text-slate-900 rounded-none transition-all cursor-pointer flex items-center justify-center border border-transparent"
            title={isSecondaryCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isSecondaryCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>

        <div className={`p-4 space-y-5 overflow-y-auto flex-1 ${isSecondaryCollapsed ? "px-2" : ""}`}>
          
          {/* SECTION 1: COURSE CHECK LIST TITLE */}
          <div className="space-y-3">
            <div className={`border-b border-slate-200 pb-2 select-none flex ${isSecondaryCollapsed ? "justify-center" : ""}`}>
              <span className="text-[11px] font-heading font-black tracking-widest text-slate-400 uppercase block">
                {isSecondaryCollapsed ? "Phases" : "Course Check List"}
              </span>
            </div>
            
            {/* phases/lessons list accordion */}
            <div className={`pl-1 pr-1 py-1 space-y-2 select-none max-h-[calc(100vh-420px)] overflow-y-auto ${
              isSecondaryCollapsed ? "flex flex-col items-center gap-1.5" : ""
            }`}>
              {isSecondaryCollapsed ? (
                phasesData.map((phase, pIdx) => {
                  const isSelected = activePhaseIndex === pIdx && activeSubTab === "checklist";
                  const isPhaseAssessed = completedAssessments[phase.id];
                  const isLocked = pIdx > 0 && !isPhase1Complete;

                  return (
                    <button
                      key={phase.id}
                      disabled={isLocked}
                      onClick={() => {
                        if (isLocked) return;
                        setActiveSubTab("checklist");
                        setActivePhaseIndex(pIdx);
                        setActiveLessonIndex(0);
                        setCoachFeedback("");
                        setIsSecondaryCollapsed(false);
                      }}
                      className={`w-9 h-9 rounded-none flex items-center justify-center transition-all border border-transparent cursor-pointer ${
                        isLocked
                          ? "opacity-40 cursor-not-allowed text-slate-400"
                          : isSelected
                            ? "bg-slate-900 text-white"
                            : "text-slate-650 hover:bg-slate-200/50 hover:text-black"
                      }`}
                      title={phase.title}
                    >
                      {isLocked ? (
                        <Lock className="w-3.5 h-3.5 shrink-0" />
                      ) : isPhaseAssessed ? (
                        <CheckCircle2 className="w-4 h-4 text-inherit shrink-0" />
                      ) : (
                        <span className="text-[11px] font-mono font-bold">{phase.num}</span>
                      )}
                    </button>
                  );
                })
              ) : (
                <Accordion
                  value={activeSubTab === "checklist" ? [activePhaseIndex] : []}
                  onValueChange={(val) => {
                    if (val && val.length > 0) {
                      const pIdx = val[0];
                      setActiveSubTab("checklist");
                      setActivePhaseIndex(pIdx);
                      setActiveLessonIndex(0);
                      setCoachFeedback("");
                    }
                  }}
                  className="w-full space-y-1"
                >
                  {phasesData.map((phase, pIdx) => {
                    const isSelected = activePhaseIndex === pIdx && activeSubTab === "checklist";
                    const isPhaseAssessed = completedAssessments[phase.id];
                    const isLocked = pIdx > 0 && !isPhase1Complete;

                    return (
                      <AccordionItem
                        key={phase.id}
                        value={pIdx}
                        disabled={isLocked}
                        className="border-none"
                      >
                        <AccordionTrigger className={`w-full text-left text-xs font-heading font-bold uppercase tracking-wider py-1.5 px-1 flex items-center justify-between transition-colors hover:no-underline hover:text-black focus:outline-none ${
                          isLocked
                            ? "opacity-40 cursor-not-allowed text-slate-400 font-medium"
                            : isSelected
                              ? "text-black"
                              : "text-slate-600 hover:text-black"
                        }`}>
                          <span className="flex items-center gap-1.5 whitespace-normal break-words flex-1 text-left">
                            {isLocked ? (
                              <Lock className="w-3 h-3 text-slate-400 shrink-0" />
                            ) : isPhaseAssessed ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-black shrink-0" />
                            ) : (
                              <span className="w-3.5 h-3.5 rounded-full border border-slate-400 flex items-center justify-center text-[9px] font-mono shrink-0">
                                {phase.num}
                              </span>
                            )}
                            <span className="whitespace-normal break-words flex-1 leading-tight">
                              {phase.title.split(":")[0]}
                            </span>
                          </span>
                        </AccordionTrigger>

                        <AccordionContent className="pl-3 mt-1 overflow-hidden">
                          <div className="space-y-1.5 border-l border-slate-200 pl-3 pb-1">
                            {phase.lessons.map((lesson, lIdx) => {
                              const isCurrent = activeLessonIndex === lIdx && isSelected;
                              const isDone = completedLessons[lesson.id];

                              return (
                                <div key={lesson.id} className="flex items-start justify-between gap-1.5 py-0.5">
                                  <button
                                    onClick={() => {
                                      setActiveSubTab("checklist");
                                      setActivePhaseIndex(pIdx);
                                      setActiveLessonIndex(lIdx);
                                      setCoachFeedback("");
                                    }}
                                    className={`text-left text-xs font-sans transition-colors hover:text-black whitespace-normal break-words flex-1 leading-snug cursor-pointer ${
                                      isCurrent ? "text-black font-bold" : "text-slate-500 hover:text-slate-800 font-medium"
                                    }`}
                                  >
                                    {(lesson.title.split(":")[1] || lesson.title).trim()}
                                  </button>
                                  <button
                                    onClick={() => toggleLessonComplete(lesson.id)}
                                    className={`w-3.5 h-3.5 rounded-none border flex items-center justify-center transition-all shrink-0 cursor-pointer ${
                                      isDone
                                        ? "bg-black border-black text-white"
                                        : "border-slate-300 hover:border-slate-500 bg-white"
                                    }`}
                                  >
                                    {isDone && <Check className="w-2.5 h-2.5" />}
                                  </button>
                                </div>
                              );
                            })}
                            
                            <div className="pt-1.5 border-t border-slate-100 mt-1">
                              <span className={`text-[10px] uppercase font-bold tracking-wider font-mono flex items-center gap-1 shrink-0 ${
                                isPhaseAssessed ? "text-black" : "text-red-500"
                              }`}>
                                <ShieldAlert className="w-3 h-3 shrink-0" />
                                {isPhaseAssessed ? "Submitted" : "Pending"}
                              </span>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              )}
            </div>
          </div>

          {/* NAV SECTION FOR OTHER LINKS */}
          <div className={`border-t border-slate-200/60 pt-4 space-y-1.5 ${isSecondaryCollapsed ? "flex flex-col items-center px-1" : ""}`}>
            {[
              { id: "niche", name: "Niche Builder", icon: Sparkles },
              { id: "leo", name: "Ask LEO", icon: MessageSquare },
              { id: "templates", name: "Templates", icon: FileText },
              { id: "cards", name: "Design Toolkits", icon: Sliders },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeSubTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSubTab(item.id)}
                  title={item.name}
                  className={`flex items-center gap-3 p-2.5 rounded-none text-xs uppercase tracking-widest font-heading font-bold transition-all border border-transparent cursor-pointer ${
                    isSecondaryCollapsed 
                      ? `w-9 h-9 justify-center ${
                          isActive ? "bg-slate-900 text-white" : "text-slate-500 hover:bg-slate-200/50 hover:text-slate-900"
                        }`
                      : `w-full ${
                          isActive
                            ? "bg-white text-slate-950 border-slate-200 shadow-sm font-black"
                            : "text-slate-400 hover:bg-white/40 hover:text-slate-900"
                        }`
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {!isSecondaryCollapsed && <span>{item.name}</span>}
                </button>
              );
            })}
          </div>

        </div>

        {/* SECTION 6: SUPPORT LINK */}
        <div className={`p-4 border-t border-slate-100 bg-white/40 ${isSecondaryCollapsed ? "flex justify-center px-2" : ""}`}>
          <button
            onClick={() => setIsHelpOpen(true)}
            title="Support"
            className={`flex items-center gap-3 p-2.5 rounded-none text-xs uppercase tracking-widest font-heading font-bold transition-all border border-transparent cursor-pointer text-slate-400 hover:bg-white/40 hover:text-slate-900 ${
              isSecondaryCollapsed ? "w-9 h-9 justify-center" : "w-full"
            }`}
          >
            <HelpCircle className="w-4 h-4 shrink-0" />
            {!isSecondaryCollapsed && <span>Support</span>}
          </button>
        </div>
      </aside>

      {/* RIGHT VIEWPORT CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        
        {/* TOP HEADER */}
        <Header onResetProgress={handleResetProgress} />

        {/* LEARNING TRACKER COMPONENT (sticky under header) */}
        <section className="bg-[#faf9f6]/80 backdrop-blur-md border-b border-slate-200/80 py-3.5 px-6 md:px-16 lg:px-24 print:hidden w-full select-none">
          <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6">
            
            {/* Left Section: Course Progress stats */}
            <div className="flex items-center gap-3">
              {isGraduated ? (
                <Award className="w-5 h-5 text-slate-900 shrink-0" />
              ) : (
                <BookOpen className="w-5 h-5 text-slate-650 shrink-0" />
              )}
              <div className="flex flex-col">
                <span className="text-xs uppercase font-heading font-bold tracking-wider text-slate-800 leading-tight">
                  {isGraduated ? "Ready to Graduate!" : "Course Progress"}
                </span>
                <span className="text-[11px] text-slate-500 font-sans mt-0.5">
                  Lessons Done: <strong>{lessonsDoneCount} / {totalLessons}</strong> &nbsp;•&nbsp; Case Studies: <strong>{assessmentsDoneCount} / {totalAssessments}</strong>
                </span>
              </div>
            </div>

            {/* Middle Section: Progress Bar */}
            <div className="flex-grow max-w-xs flex items-center gap-3">
              <Progress value={totalProgressPercent} className="h-1 bg-slate-100 flex-1" />
              <span className="font-mono text-[11px] font-bold text-slate-500 shrink-0 w-8">{totalProgressPercent}%</span>
            </div>

            {/* Right Section: Business Readiness */}
            <a 
              href="/#calculator" 
              className="flex items-center gap-2 font-sans text-xs text-slate-600 hover:text-slate-950 transition-colors shrink-0"
              title="View Grade Calculator"
            >
              <span className="uppercase font-mono text-[10px] tracking-widest text-slate-400">Readiness:</span>
              <span className="font-mono font-bold text-slate-900 text-sm">
                {readinessScore ?? 88}/100
              </span>
              <span className={`text-[10px] font-bold tracking-wider px-2 py-0.5 border uppercase ${
                (readinessScore ?? 88) >= 90
                  ? "border-slate-900 bg-slate-900 text-white"
                  : (readinessScore ?? 88) >= 80
                    ? "border-slate-300 text-slate-700 bg-slate-100"
                    : "border-red-200 text-red-700 bg-red-50/50"
              }`}>
                {readinessGrade ?? "READY FOR BUSINESS"}
              </span>
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

        {/* WORKSPACE COLUMN */}
        <main className="flex-1 px-4 md:px-8 py-8 w-full max-w-[1600px] mx-auto print:px-0 print:py-0">
            
            {activeSubTab === "dashboard" && (
              <div className="w-full space-y-8 animate-fade-in">
                {/* Dashboard top header banner */}
                <div className="bg-slate-900 text-white rounded-none p-6 md:p-8 border border-slate-850 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-md">
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">
                      Candidate Workspace
                    </span>
                    <h2 className="text-xl md:text-3xl font-heading text-white tracking-widest uppercase font-bold mt-1">
                      Learning Progress Hub
                    </h2>
                    <p className="text-xs text-slate-300 font-sans max-w-2xl leading-relaxed mt-2">
                      Track your progress through the 5 phases of client acquisition, value packaging, and syndicate growth. Complete lessons and check your business readiness metrics.
                    </p>
                  </div>
                  <div className="flex items-center gap-4 shrink-0 bg-slate-850 p-4 border border-slate-800">
                    <div className="w-12 h-12 rounded-full border-4 border-slate-700 flex items-center justify-center font-mono text-sm font-bold text-white bg-slate-900">
                      {totalProgressPercent}%
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-mono text-slate-400 block font-bold tracking-wider">Overall Progress</span>
                      <span className="text-xs text-slate-200 mt-0.5 block font-sans">
                        {lessonsDoneCount} of {totalLessons} Lessons
                      </span>
                    </div>
                  </div>
                </div>

                {/* Dashboard grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Column 1 & 2: Resume Learning & Phase Milestones */}
                  <div className="lg:col-span-2 space-y-8">
                    {/* Resume Learning Callout Card */}
                    <div className="bg-white border border-slate-200 rounded-none p-6 md:p-8 shadow-sm">
                      <div className="border-b border-slate-100 pb-4 mb-4">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">
                          {isAllCompleted ? "CURRICULUM COMPLETE" : "RESUME FROM LAST POINT"}
                        </span>
                        <h3 className="text-lg font-heading text-slate-900 uppercase tracking-widest font-bold mt-1">
                          {isAllCompleted ? "You Have Finished All Lessons!" : `Phase ${nextPhase.num}: ${nextPhase.title}`}
                        </h3>
                      </div>
                      
                      {isAllCompleted ? (
                        <div className="space-y-4">
                          <p className="text-sm text-slate-650 font-sans leading-relaxed">
                            Congratulations! You have completed all curriculum modules in the Sovereign Foundries. You are ready to generate your certificate and check in with the Sovereign Syndicate.
                          </p>
                          <div className="flex gap-4">
                            <button
                              onClick={() => {
                                setActiveSubTab("checklist");
                                setIsSecondaryCollapsed(false);
                              }}
                              className="bg-black hover:bg-slate-900 text-white font-heading text-xs uppercase tracking-widest font-bold py-2.5 px-6 rounded-none transition-colors"
                            >
                              Review Lessons
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="bg-[#faf9f6] border-l-4 border-black p-4 text-sm leading-relaxed text-slate-700 font-serif font-bold italic">
                            &ldquo;{nextLesson.summary}&rdquo;
                          </div>
                          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                              <span className="text-[10px] uppercase font-mono text-slate-400 block font-bold tracking-wider">Next Lesson</span>
                              <span className="text-sm text-slate-900 font-sans font-bold mt-0.5">
                                Lesson {nextLesson.id}: {nextLesson.title}
                              </span>
                            </div>
                            <button
                              onClick={() => {
                                setActivePhaseIndex(nextPhaseIdx);
                                setActiveLessonIndex(nextLessonIdx);
                                setActiveSubTab("checklist");
                                setIsSecondaryCollapsed(false);
                              }}
                              className="bg-black hover:bg-slate-900 text-white font-heading text-xs uppercase tracking-widest font-bold py-2.5 px-6 rounded-none transition-colors shrink-0"
                            >
                              Resume: Lesson {nextLesson.id}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Phase Milestones Grid */}
                    <div className="space-y-4">
                      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono border-b border-slate-200 pb-2">
                        Milestone Curriculum Phases
                      </h3>
                      <div className="space-y-4">
                        {phasesData.map((phase, pIdx) => {
                          const phaseLessons = phase.lessons;
                          const completedInPhase = phaseLessons.filter(l => completedLessons[l.id]).length;
                          const isPhaseComplete = completedInPhase === phaseLessons.length && !!completedAssessments[phase.id];
                          const isPhaseInProgress = !isPhaseComplete && pIdx === nextPhaseIdx;
                          const isPhaseLocked = pIdx > nextPhaseIdx;

                          return (
                            <div 
                              key={phase.id} 
                              className={`bg-white border rounded-none p-5 shadow-sm transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-6 ${
                                isPhaseLocked ? "border-slate-150 opacity-60" : "border-slate-200"
                              }`}
                            >
                              <div className="space-y-2 flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] font-bold tracking-wider px-2 py-0.5 border uppercase font-mono bg-[#faf9f6] text-slate-700">
                                    Phase {phase.num}
                                  </span>
                                  <span className={`text-[10px] font-bold tracking-wider px-2 py-0.5 border uppercase font-mono ${
                                    isPhaseComplete 
                                      ? "border-emerald-250 bg-emerald-50 text-emerald-700"
                                      : isPhaseInProgress
                                        ? "border-amber-250 bg-amber-50 text-amber-700 animate-pulse"
                                        : "border-slate-200 bg-slate-50 text-slate-500"
                                  }`}>
                                    {isPhaseComplete ? "Completed" : isPhaseInProgress ? "In Progress" : "Locked"}
                                  </span>
                                </div>
                                <h4 className="text-sm font-heading text-slate-900 uppercase tracking-widest font-bold">
                                  {phase.title.replace(`Phase ${phase.num}: `, "")}
                                </h4>
                                <p className="text-xs text-slate-500 font-sans leading-relaxed">
                                  {phase.objective}
                                </p>
                                <div className="flex items-center gap-4 text-[11px] text-slate-400 font-mono mt-1">
                                  <span>Lessons: <strong>{completedInPhase} / {phaseLessons.length}</strong></span>
                                  <span>&bull;</span>
                                  <span>Case Study: <strong>{completedAssessments[phase.id] ? "Submitted" : "Pending"}</strong></span>
                                </div>
                              </div>
                              <button
                                onClick={() => {
                                  setActivePhaseIndex(pIdx);
                                  setActiveLessonIndex(0);
                                  setActiveSubTab("checklist");
                                  setIsSecondaryCollapsed(false);
                                }}
                                disabled={isPhaseLocked}
                                className={`text-[10px] uppercase font-heading font-bold tracking-widest py-2 px-4 transition-all rounded-none border shrink-0 ${
                                  isPhaseLocked
                                    ? "border-slate-100 text-slate-300 cursor-not-allowed"
                                    : "border-slate-800 text-slate-900 hover:bg-slate-900 hover:text-white"
                                }`}
                              >
                                {isPhaseComplete ? "Review Phase" : isPhaseInProgress ? "Resume Phase" : "Locked"}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Column 3: Venture Profile & Readiness metrics */}
                  <div className="space-y-8">
                    {/* Active Venture Profile Card */}
                    <div className="bg-white border border-slate-200 rounded-none p-6 shadow-sm flex flex-col justify-between min-h-[300px]">
                      <div className="space-y-4">
                        <div className="border-b border-slate-100 pb-2 flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">
                            Active Venture Profile
                          </span>
                          <Sparkles className="w-3.5 h-3.5 text-slate-400" />
                        </div>

                        {ventureName ? (
                          <div className="space-y-3">
                            <div>
                              <span className="text-[9px] uppercase font-mono text-slate-400 block tracking-wider font-bold">Venture Name</span>
                              <span className="text-base font-heading font-bold uppercase tracking-widest text-slate-900 block mt-0.5">
                                {ventureName}
                              </span>
                            </div>
                            {ventureIndustry && (
                              <div>
                                <span className="text-[9px] uppercase font-mono text-slate-400 block tracking-wider font-bold">Industry Sector</span>
                                <span className="text-xs text-slate-700 font-sans block mt-0.5">
                                  {ventureIndustry}
                                </span>
                              </div>
                            )}
                            {aiNicheSummary ? (
                              <div>
                                <span className="text-[9px] uppercase font-mono text-slate-400 block tracking-wider font-bold">Niche Concept Statement</span>
                                <p className="text-xs text-slate-650 font-sans leading-relaxed mt-1 line-clamp-4">
                                  {aiNicheSummary}
                                </p>
                              </div>
                            ) : (
                              <div className="p-3 bg-amber-50/50 border border-amber-200 rounded-none text-xs text-amber-800 leading-relaxed font-sans">
                                Complete Niche Builder tasks to generate your full venture profile report.
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="text-center py-6 text-slate-400 font-sans text-xs">
                            No active venture loaded. Start completing Phase 1 lessons and use Niche Builder to launch your candidate venture.
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => {
                          setActiveSubTab("niche");
                          setIsSecondaryCollapsed(false);
                        }}
                        className="w-full mt-4 border border-black hover:bg-black hover:text-white text-black font-heading text-[10px] uppercase tracking-widest font-bold py-2 px-4 rounded-none transition-colors text-center"
                      >
                        Launch Niche Builder
                      </button>
                    </div>

                    {/* Readiness grade card */}
                    <div className="bg-white border border-slate-200 rounded-none p-6 shadow-sm space-y-4">
                      <div className="border-b border-slate-100 pb-2">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">
                          Leverage Grade
                        </span>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-baseline gap-2">
                          <span className="font-mono text-3xl font-bold text-slate-900">
                            {readinessScore ?? 88}
                          </span>
                          <span className="text-xs text-slate-400 font-mono">/ 100</span>
                        </div>
                        <div className="space-y-2">
                          <span className={`inline-block text-[10px] font-bold tracking-wider px-2 py-0.5 border uppercase font-mono ${
                            (readinessScore ?? 88) >= 90
                              ? "border-slate-900 bg-slate-900 text-white"
                              : (readinessScore ?? 88) >= 80
                                ? "border-slate-300 text-slate-700 bg-slate-100"
                                : "border-red-200 text-red-700 bg-red-50/50"
                          }`}>
                            {readinessGrade ?? "READY FOR BUSINESS"}
                          </span>
                          <p className="text-xs text-slate-500 font-sans leading-relaxed">
                            Computed by assessing your sandbox validation configurations and design card workbook entries. Higher score indicates cleaner alignment with standard leverage principles.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSubTab === "checklist" && (
              <div className="w-full">
                
                {/* MAIN CONTENT AREA */}
                <section className="w-full space-y-6">
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
                        className={`py-1.5 px-4 font-sans text-xs uppercase tracking-widest font-bold transition-all rounded-none flex items-center gap-2 shrink-0 ${
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

                    {/* LESSON HERO IMAGE */}
                    {lessonHeroImages[activeLesson.id] && (
                      <div className="w-full h-48 md:h-64 overflow-hidden mb-6 border border-slate-200 relative group shadow-sm">
                        <img 
                          src={lessonHeroImages[activeLesson.id]} 
                          alt={activeLesson.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="eager"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
                      </div>
                    )}

                    <div className="space-y-6">
                      <div className="bg-[#faf9f6] border-l-4 border-[#000000] p-5 text-sm md:text-base leading-relaxed text-slate-700 font-serif font-bold italic">
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
                              <span>{renderTakeawayText(point)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* DYNAMIC SANDBOX WIDGET PANEL */}
                  <div ref={playgroundRef} className="bg-slate-900 text-white rounded-none p-6 md:p-8 shadow-md border border-slate-850">
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
                            <span className="text-[10px] font-mono font-bold tracking-widest text-slate-500 uppercase block mb-3">1. Select Data Collected</span>
                            <div className="space-y-3">
                              {[
                                { key: "location", label: "User GPS Real-Time Location" },
                                { key: "phone", label: "Mobile Phone & SMS Numbers" },
                                { key: "bookings", label: "Gym Booking Calendars" },
                                { key: "payments", label: "Credit Card / Wallet Data" }
                              ].map((item) => (
                                <div key={item.key} className="flex items-center space-x-2">
                                  <Checkbox 
                                    id={`check-${item.key}`}
                                    checked={s1DataCollected[item.key as keyof typeof s1DataCollected]}
                                    onCheckedChange={(val) => setS1DataCollected({
                                      ...s1DataCollected,
                                      [item.key]: !!val
                                    })}
                                    className="border-slate-700 data-[state=checked]:bg-white data-[state=checked]:text-black animate-fade-in"
                                  />
                                  <Label htmlFor={`check-${item.key}`} className="text-xs font-medium text-slate-300 cursor-pointer">{item.label}</Label>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Step 2: Storage */}
                          <div className="bg-slate-850 p-4 border border-slate-800">
                            <span className="text-[10px] font-mono font-bold tracking-widest text-slate-500 uppercase block mb-3">2. Database Storage Location</span>
                            <div className="space-y-3">
                              {[
                                { value: "local", label: "Local Device Storage Only" },
                                { value: "cloud", label: "Secure Isolated Cloud Server" },
                                { value: "shared", label: "Shared Third-Party Database" }
                              ].map((item) => (
                                <div key={item.value} className="flex items-center space-x-2">
                                  <input 
                                    type="radio" 
                                    id={`radio-${item.value}`}
                                    name="s1Storage"
                                    value={item.value}
                                    checked={s1Storage === item.value}
                                    onChange={(e) => setS1Storage(e.target.value)}
                                    className="w-3.5 h-3.5 border-slate-750 accent-white"
                                  />
                                  <Label htmlFor={`radio-${item.value}`} className="text-xs font-medium text-slate-300 cursor-pointer">{item.label}</Label>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Step 3: Protections */}
                          <div className="bg-slate-850 p-4 border border-slate-800">
                            <span className="text-[10px] font-mono font-bold tracking-widest text-slate-500 uppercase block mb-3">3. Security Protections</span>
                            <div className="space-y-3">
                              {[
                                { key: "askConsent", label: "Explicit User Consent Checkbox" },
                                { key: "deleteData", label: "Provide 'Delete My Profile' Option" },
                                { key: "encryptInfo", label: "Encrypt Database Tables (SSL)" }
                              ].map((item) => (
                                <div key={item.key} className="flex items-center space-x-2">
                                  <Checkbox 
                                    id={`check-${item.key}`}
                                    checked={s1Consents[item.key as keyof typeof s1Consents]}
                                    onCheckedChange={(val) => setS1Consents({
                                      ...s1Consents,
                                      [item.key]: !!val
                                    })}
                                    className="border-slate-700 data-[state=checked]:bg-white data-[state=checked]:text-black animate-fade-in"
                                  />
                                  <Label htmlFor={`check-${item.key}`} className="text-xs font-medium text-slate-300 cursor-pointer">{item.label}</Label>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Score panel */}
                        <div className="bg-slate-950 p-5 border border-slate-855 flex flex-col sm:flex-row items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full border-4 border-slate-750 flex items-center justify-center font-mono text-lg font-bold text-white bg-slate-900 animate-fade-in">
                              {complianceScore}%
                            </div>
                            <div>
                              <h6 className="text-xs uppercase font-sans text-white font-bold tracking-wider">Privacy Compliance Score</h6>
                              <p className="text-xs text-slate-400 mt-0.5 font-medium leading-relaxed font-sans">Affected by collected details, cloud hosting options, and client consents.</p>
                            </div>
                          </div>

                          <div className="text-right">
                            <span className={`inline-block py-1 px-3 text-xs uppercase tracking-wider font-mono font-bold ${
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

                    {/* SANDBOX 2: Habit Planner */}
                    {activePhase.num === 2 && (
                      <div className="space-y-6 font-sans">
                        <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                          Design low-stress habit loops for your users. Select the user type, choose a timely trigger prompt, and see how to keep re-ordering easy for them:
                        </p>

                        <div className="flex border-b border-slate-800">
                          {["personas", "loop-designer"].map((tab) => (
                            <button
                              key={tab}
                              onClick={() => setS2ActiveTab(tab)}
                              className={`py-2 px-4 font-mono text-[10px] font-bold uppercase tracking-wider transition-colors border-b-2 cursor-pointer ${
                                s2ActiveTab === tab 
                                  ? "border-white text-white font-extrabold" 
                                  : "border-transparent text-slate-500 hover:text-slate-350"
                              }`}
                            >
                              {tab === "personas" ? "1. Customer Profile" : "2. Trigger Loop"}
                            </button>
                          ))}
                        </div>

                        {s2ActiveTab === "personas" ? (
                          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                            {/* Persona selectors */}
                            <div className="md:col-span-4 space-y-2">
                              {[
                                { name: "Busy Belinda (Gymgoer)", role: "Belinda goes to gym classes but forgets to order healthy post-workout meals on time." },
                                { name: "Alex the Runner", role: "Alex books fields but has a hard time scheduling transport or taxi rides to the location." },
                                { name: "Convenient Clara", role: "Clara likes to order boutique delivery, but leaves checkout if fields take more than 3 minutes." }
                              ].map((p, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => setS2ActivePersona(idx)}
                                  className={`w-full text-left p-3 border font-sans text-xs transition-all cursor-pointer ${
                                    s2ActivePersona === idx 
                                      ? "bg-white text-black border-white font-bold" 
                                      : "bg-slate-950 border-slate-850 text-slate-450 hover:border-slate-700"
                                  }`}
                                >
                                  {p.name}
                                </button>
                              ))}
                            </div>

                            {/* Display active persona detail */}
                            {(() => {
                              const activeP = [
                                { name: "Busy Belinda (Gymgoer)", trigger: "After-class muscle ache alerts", routine: "Auto-adds post-workout shake box directly to cart", reward: "Free protein shaker + 15% discount for first 5 orders" },
                                { name: "Alex the Runner", trigger: "Post-field calendar triggers", routine: "Pre-populates taxi rides based on departure time", reward: "Earn points toward field rentals" },
                                { name: "Convenient Clara", trigger: "Quick drop notifications", routine: "1-Click Apple Pay checks out order instantly", reward: "Free priority delivery within 15 minutes" }
                              ][s2ActivePersona];

                              return (
                                <div className="md:col-span-8 bg-slate-950 p-4 border border-slate-850 space-y-3 text-xs leading-relaxed animate-fade-in">
                                  <h6 className="font-bold text-white font-mono uppercase tracking-wider">Behavior Loop Profile: {activeP.name}</h6>
                                  <div>
                                    <span className="text-slate-500 uppercase font-mono block">1. Cue (Trigger):</span>
                                    <span className="text-slate-200 font-bold">{activeP.trigger}</span>
                                  </div>
                                  <div>
                                    <span className="text-slate-500 uppercase font-mono block">2. Routine (Action):</span>
                                    <span className="text-slate-200 font-bold">{activeP.routine}</span>
                                  </div>
                                  <div>
                                    <span className="text-slate-500 uppercase font-mono block">3. Reward:</span>
                                    <span className="text-slate-200 font-bold">{activeP.reward}</span>
                                  </div>
                                </div>
                              );
                            })()}
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 leading-relaxed">
                            {/* Loop calibration panel */}
                            <div className="bg-slate-950 p-4 border border-slate-850 space-y-4">
                              <div>
                                <Label className="block text-xs text-slate-500 uppercase font-bold tracking-wider mb-2">Select Design Method</Label>
                                <select 
                                  value={s2CardTool}
                                  onChange={(e) => setS2CardTool(e.target.value)}
                                  className="w-full bg-slate-900 border border-slate-800 text-xs p-2 text-white focus:outline-none rounded-none cursor-pointer"
                                >
                                  <option value="interview">Card 01: Customer Friendly Interviews</option>
                                  <option value="diaries">Card 03: Log Diaries & Shadowing</option>
                                  <option value="copywriting">Card 10: Leverage Customer Vocabulary</option>
                                  <option value="ux">Card 13: Frictionless Experience Mapping</option>
                                </select>
                              </div>

                              <div>
                                <Label className="block text-xs text-slate-500 uppercase font-bold tracking-wider mb-2">Configure Action Prompt</Label>
                                <textarea
                                  rows={3}
                                  value={s2CardPrompt}
                                  onChange={(e) => setS2CardPrompt(e.target.value)}
                                  className="w-full bg-slate-900 border border-slate-800 text-xs p-2 text-white focus:outline-none rounded-none placeholder-slate-600 font-mono"
                                />
                              </div>
                            </div>

                            {/* Habit loop validation simulation preview */}
                            <div className="bg-[#faf9f6] text-black p-4 border border-slate-200 flex flex-col justify-between rounded-none animate-fade-in">
                              <div className="space-y-3">
                                <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase">Habit loop prototype</span>
                                <h6 className="font-heading text-xs uppercase font-extrabold tracking-wide">{ventureName} ({ventureIndustry})</h6>
                                <p className="text-xs text-slate-700 italic font-medium font-serif leading-relaxed">
                                  &ldquo;Triggering routine when users experience cue... Mapping out how to apply Card {s2CardTool === "interview" ? "01" : s2CardTool === "diaries" ? "03" : s2CardTool === "copywriting" ? "10" : "13"} for research insights.&rdquo;
                                </p>
                              </div>

                              <div className="border-t border-slate-200 pt-3 mt-4 text-xs font-mono">
                                <span className="text-slate-500 uppercase block">Behavior Prompt:</span>
                                <span className="text-slate-900 font-bold block truncate">{s2CardPrompt}</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* SANDBOX 3: Tech Setup & Database Links */}
                    {activePhase.num === 3 && (
                      <div className="space-y-6">
                        <p className="text-xs text-slate-300 font-sans max-w-2xl leading-relaxed">
                          Link your venture's database tables to structure signups and logistics correctly. Select column schema and view active sprint log items:
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 font-sans">
                          {/* DB schema builder */}
                          <div className="md:col-span-6 bg-slate-950 p-4 border border-slate-850 space-y-4 text-xs">
                            <span className="text-[10px] font-mono font-bold tracking-widest text-slate-500 uppercase block border-b border-slate-900 pb-2">Active Database Schema</span>
                            
                            <div className="space-y-3">
                              {[
                                { key: "id", label: "Unique Customer Identifier (Primary Key)" },
                                { key: "name", label: "Full Customer Legal Name" },
                                { key: "bookings", label: "Dynamic Service Booking Timestamp" },
                                { key: "payments", label: "Stripe Transaction Log ID" }
                              ].map((col) => (
                                <div key={col.key} className="flex items-center space-x-2">
                                  <Checkbox 
                                    id={`schema-${col.key}`}
                                    checked={s3Schema[col.key as keyof typeof s3Schema]}
                                    onCheckedChange={(val) => setS3Schema({
                                      ...s3Schema,
                                      [col.key]: !!val
                                    })}
                                    className="border-slate-700 data-[state=checked]:bg-white data-[state=checked]:text-black animate-fade-in"
                                  />
                                  <Label htmlFor={`schema-${col.key}`} className="text-xs font-medium text-slate-355 cursor-pointer">{col.label}</Label>
                                </div>
                              ))}
                            </div>

                            <div className="pt-2 border-t border-slate-900 font-mono text-[10px] text-slate-500 leading-relaxed">
                              <span>Generated SQL Syntax:</span>
                              <pre className="mt-2 bg-slate-900 p-2.5 text-white/90 overflow-x-auto text-[9px] leading-normal font-bold">
                                {`CREATE TABLE ${ventureName.replace(/\s+/g, "_").toLowerCase()}_customers (
  ${s3Schema.id ? "id SERIAL PRIMARY KEY," : ""}
  ${s3Schema.name ? "name VARCHAR(100) NOT NULL," : ""}
  ${s3Schema.bookings ? "booking_date TIMESTAMP," : ""}
  ${s3Schema.payments ? "stripe_charge_id VARCHAR(50)" : ""}
);`}
                              </pre>
                            </div>
                          </div>

                          {/* Task board manager */}
                          <div className="md:col-span-6 bg-slate-950 p-4 border border-slate-850 space-y-4">
                            <span className="text-[10px] font-mono font-bold tracking-widest text-slate-500 uppercase block border-b border-slate-900 pb-2">Sprint Task Board</span>
                            
                            <form onSubmit={addTask} className="flex gap-2">
                              <Input 
                                type="text"
                                value={s3NewTaskText}
                                onChange={(e) => setS3NewTaskText(e.target.value)}
                                placeholder="Add database index or setup action..."
                                className="bg-slate-900 border border-slate-800 text-xs p-2 text-white placeholder-slate-600 font-medium h-8 rounded-none flex-1 focus:outline-none focus:border-slate-400"
                              />
                              <Button type="submit" size="xs" className="bg-white hover:bg-slate-200 text-black font-sans font-bold uppercase tracking-widest rounded-none h-8 cursor-pointer px-3">
                                Add
                              </Button>
                            </form>

                            <div className="space-y-2 max-h-[160px] overflow-y-auto">
                              {s3Tasks.map((t) => (
                                <div key={t.id} className="bg-slate-900 border border-slate-855 p-2.5 flex items-center justify-between text-xs font-mono animate-fade-in">
                                  <span className={`truncate text-xs ${t.status === "done" ? "line-through text-slate-500" : "text-slate-200 font-bold"}`}>
                                    {t.text}
                                  </span>
                                  <div className="flex gap-1.5 shrink-0 pl-3">
                                    {t.status === "todo" ? (
                                      <button 
                                        onClick={() => moveTask(t.id, "done")}
                                        className="text-[10px] text-green-400 hover:text-green-300 font-bold uppercase tracking-wider cursor-pointer bg-slate-950 px-2 py-0.5 border border-slate-800"
                                      >
                                        Complete
                                      </button>
                                    ) : (
                                      <button 
                                        onClick={() => moveTask(t.id, "todo")}
                                        className="text-[10px] text-slate-500 hover:text-slate-400 font-bold uppercase tracking-wider cursor-pointer bg-slate-950 px-2 py-0.5 border border-slate-800"
                                      >
                                        Reopen
                                      </button>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* SANDBOX 4: Retainer Contract & Profit Calculator */}
                    {activePhase.num === 4 && (
                      <div className="space-y-6">
                        <p className="text-xs text-slate-300 font-sans max-w-2xl leading-relaxed">
                          Formulate the pricing structure and monthly retainer contract terms for your client venture. Calculate your target profit margins:
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
                          {/* Inputs */}
                          <div className="bg-slate-950 p-4 border border-slate-850 space-y-4">
                            <span className="text-[10px] font-mono font-bold tracking-widest text-slate-500 uppercase block border-b border-slate-900 pb-2">Retainer Settings</span>
                            
                            <div>
                              <Label className="block text-[10px] text-slate-500 uppercase font-mono mb-1.5">Client Brand Name</Label>
                              <Input 
                                type="text"
                                value={s4ClientName}
                                onChange={(e) => setS4ClientName(e.target.value)}
                                className="w-full bg-slate-900 border border-slate-800 text-xs p-2 text-white font-medium h-8 rounded-none focus:outline-none"
                              />
                            </div>

                            <div>
                              <Label className="block text-[10px] text-slate-500 uppercase font-mono mb-1.5">Monthly Retainer Fee ($)</Label>
                              <Input 
                                type="number"
                                value={s4MonthlyRate}
                                onChange={(e) => setS4MonthlyRate(Number(e.target.value))}
                                className="w-full bg-slate-900 border border-slate-800 text-xs p-2 text-white font-mono h-8 rounded-none focus:outline-none"
                              />
                            </div>

                            <div>
                              <Label className="block text-[10px] text-slate-500 uppercase font-mono mb-1.5">Weekly Commitment Hours</Label>
                              <Input 
                                type="number"
                                value={s4HoursPerWeek}
                                onChange={(e) => setS4HoursPerWeek(Number(e.target.value))}
                                className="w-full bg-slate-900 border border-slate-800 text-xs p-2 text-white font-mono h-8 rounded-none focus:outline-none"
                              />
                            </div>
                          </div>

                          {/* Calculation */}
                          <div className="bg-slate-950 p-4 border border-slate-850 space-y-4 text-xs font-sans text-slate-300">
                            <span className="text-[10px] font-mono font-bold tracking-widest text-slate-500 uppercase block border-b border-slate-900 pb-2">Profit Breakdown</span>
                            
                            {(() => {
                              const hourlyRevenue = s4MonthlyRate / (s4HoursPerWeek * 4);
                              const netProfit = s4MonthlyRate - s4Expenses;
                              const profitMargin = s4MonthlyRate > 0 ? (netProfit / s4MonthlyRate) * 100 : 0;
                              return (
                                <div className="space-y-3">
                                  <div className="flex justify-between items-center text-xs">
                                    <span>Hourly Revenue Rate:</span>
                                    <span className="font-mono text-white font-bold">${hourlyRevenue.toFixed(2)}/hr</span>
                                  </div>
                                  <div className="flex justify-between items-center text-xs">
                                    <span>Software Expenses (Monthly):</span>
                                    <span className="font-mono text-red-400 font-bold">-${s4Expenses}</span>
                                  </div>
                                  <div className="border-t border-slate-905 pt-2.5 flex justify-between items-center text-xs">
                                    <span className="text-white uppercase font-mono text-[10px]">Net Monthly Profit:</span>
                                    <span className="font-mono text-green-400 font-bold text-sm">${netProfit.toFixed(0)}</span>
                                  </div>
                                  <div className="flex justify-between items-center text-xs">
                                    <span className="text-white uppercase font-mono text-[10px]">Net Profit Margin:</span>
                                    <span className="font-mono text-green-400 font-bold text-sm">{profitMargin.toFixed(1)}%</span>
                                  </div>
                                </div>
                              );
                            })()}
                          </div>

                          {/* Retainer output preview */}
                          <div className="bg-[#faf9f6] text-black p-4 border border-slate-200 flex flex-col justify-between rounded-none animate-fade-in">
                            <div className="space-y-3">
                              <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase">Contract preview sheet</span>
                              <h6 className="font-heading text-xs uppercase font-extrabold tracking-wide">{ventureName} retainer</h6>
                              <p className="text-xs text-slate-700 italic font-serif leading-normal font-medium">
                                &ldquo;We hereby agree to provide {s4SupportType} support services for {s4ClientName} in exchange for a monthly fee of ${s4MonthlyRate}, committing {s4HoursPerWeek} hours weekly.&rdquo;
                              </p>
                            </div>

                            <button 
                              onClick={() => {
                                alert(`Contract Agreement generated successfully for ${s4ClientName}!`);
                              }}
                              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-sans text-[10px] uppercase tracking-widest font-bold py-2 rounded-none transition-all cursor-pointer block text-center"
                            >
                              Export Retainer Agreement
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* SANDBOX 5: Launch Growth Loop Simulator */}
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
                                step="10"
                                value={s5TechMaintenance} 
                                onChange={(e) => setS5TechMaintenance(Number(e.target.value))}
                                className="w-full accent-[#000000]" 
                              />
                              <span className="text-xs text-slate-500 block">More server budget reduces site loading delays.</span>
                            </div>
                          </div>

                          {/* Acquired metrics details */}
                          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans">
                            <div className="bg-slate-900 border border-slate-800 p-3 flex flex-col justify-between">
                              <span className="text-xs uppercase font-mono text-slate-400 tracking-wider">Simulated Server Latency</span>
                              <div className="my-2">
                                <span className="text-2xl font-bold text-white font-mono">
                                  {metrics.latency}ms
                                </span>
                              </div>
                              <span className="text-xs text-slate-400">Target response time of your custom dashboard web service.</span>
                            </div>

                            <div className="bg-slate-900 border border-slate-800 p-3 flex flex-col justify-between">
                              <span className="text-xs uppercase font-mono text-slate-400 tracking-wider">Simulated Viral Coeff (K)</span>
                              <div className="my-2">
                                <span className="text-2xl font-bold text-white font-mono">
                                  {metrics.vir}
                                </span>
                              </div>
                              <span className="text-xs text-slate-400">Referral signups rate generated from active users.</span>
                            </div>

                            <div className="bg-slate-900 border border-slate-800 p-3 flex flex-col justify-between">
                              <span className="text-xs uppercase font-mono text-slate-400 tracking-wider">Simulated Active Users (MAU)</span>
                              <div className="my-2">
                                <span className="text-2xl font-bold text-white font-mono">
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
                </section>
              </div>
            )}

            {/* NICHE BUILDER TAB VIEW */}
            {activeSubTab === "niche" && (
              <div className="max-w-4xl mx-auto space-y-6">
                <div className="bg-white border border-slate-200 rounded-none p-6 md:p-8 shadow-sm">
                  <h3 className="font-heading text-slate-900 text-xs uppercase tracking-widest border-b border-slate-100 pb-3 font-bold flex items-center gap-1.5 mb-6">
                    <Sparkles className="w-5 h-5 text-[#000000]" /> Niche Builder & AI Brainstorming
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
                    <div className="space-y-4">
                      <div>
                        <Label className="block text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">
                          Proposed Brand Name
                        </Label>
                        <Input
                          type="text"
                          value={ventureName}
                          onChange={(e) => handleVentureNameChange(e.target.value)}
                          placeholder="e.g. Streetwear Vault, UGC Plug"
                          className="w-full border border-slate-200 bg-[#faf9f6] p-2.5 text-slate-900 focus:bg-white focus:outline-none placeholder-slate-400 font-semibold h-10 rounded-none text-sm"
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
                          <SelectTrigger className="w-full border border-slate-200 bg-[#faf9f6] text-slate-900 font-semibold h-10 rounded-none text-sm">
                            <SelectValue placeholder="Select vertical..." />
                          </SelectTrigger>
                          <SelectContent className="bg-white border border-slate-200 rounded-none text-xs">
                            {Object.keys(industryDefaults).map((indKey) => (
                              <SelectItem key={indKey} value={indKey} className="hover:bg-slate-100 cursor-pointer">
                                {indKey}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="block text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">
                          Service / Product Type description:
                        </Label>
                        <Textarea
                          rows={2}
                          value={ventureType}
                          onChange={(e) => setVentureType(e.target.value)}
                          className="w-full border border-slate-200 bg-[#faf9f6] p-2 text-slate-900 focus:bg-white focus:outline-none placeholder-slate-400 font-semibold rounded-none h-16 text-xs"
                        />
                      </div>
                    </div>

                    <div className="space-y-3 font-sans text-xs">
                      <div>
                        <Label className="block text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">
                          What is the problem?
                        </Label>
                        <Input
                          type="text"
                          value={whatProblem}
                          onChange={(e) => handleNicheFieldChange("what", e.target.value)}
                          placeholder="e.g. Hard to find trainers."
                          className="w-full border border-slate-200 bg-[#faf9f6] p-2 text-slate-900 focus:bg-white focus:outline-none placeholder-slate-400 font-medium h-8 rounded-none"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label className="block text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">
                            Who is affected?
                          </Label>
                          <Input
                            type="text"
                            value={whoAffected}
                            onChange={(e) => handleNicheFieldChange("who", e.target.value)}
                            placeholder="e.g. Beginners."
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
                            placeholder="e.g. Locally."
                            className="w-full border border-slate-200 bg-[#faf9f6] p-2 text-slate-900 focus:bg-white focus:outline-none placeholder-slate-400 font-medium h-8 rounded-none"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label className="block text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">
                            When is it happening?
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
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col md:flex-row gap-4 justify-between items-center border-t border-slate-100 pt-6">
                    <span className="text-[10px] text-slate-400 font-sans uppercase font-bold">
                      Venture settings will synchronize to active workspace.
                    </span>
                    
                    <Button
                      onClick={handleBrainstormNiche}
                      disabled={loadingAI}
                      className="w-full md:w-auto bg-slate-900 hover:bg-slate-800 disabled:bg-slate-700 text-white font-heading text-xs uppercase tracking-widest font-bold py-2.5 px-6 rounded-none transition-all flex items-center justify-center gap-1.5 cursor-pointer"
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
                  </div>

                  {aiNicheSummary && (
                    <div className="bg-[#faf9f6] border-l-2 border-[#000000] p-4 mt-6 flex flex-col items-start gap-3 border border-slate-200">
                      <span className="font-mono text-xs uppercase tracking-wider font-extrabold text-[#000000] block">💡 AI Niche Summary:</span>
                      <p className="text-slate-800 font-sans font-bold leading-normal italic text-sm">
                        "{aiNicheSummary}"
                      </p>
                      <Button
                        variant="outline"
                        size="xs"
                        onClick={() => setIsBrainstormModalOpen(true)}
                        className="text-xs font-heading font-bold tracking-wider uppercase rounded-none border-[#000000] text-[#000000] hover:bg-[#000000] hover:text-white h-8"
                      >
                        Open Executive Boardroom Report
                      </Button>
                    </div>
                  )}
                </div>

                {/* LEO BOARDROOM IN-LINE REPORT PANEL */}
                {leoReport && (
                  <div className="bg-white border border-slate-200 rounded-none p-6 md:p-8 shadow-sm space-y-4">
                    <div className="border-b pb-3 flex justify-between items-center">
                      <h4 className="text-xs font-heading font-black tracking-widest text-[#000000] uppercase flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4" /> Boardroom Analysis Report
                      </h4>
                      <span className="px-2 py-0.5 bg-[#eae3d7] text-[#5c5346] text-[10px] font-mono font-bold rounded-none uppercase">
                        Ingested by LEO
                      </span>
                    </div>
                    <div className="whitespace-pre-wrap leading-relaxed font-sans text-xs bg-slate-50 p-5 border border-slate-200 rounded-none max-h-[400px] overflow-y-auto">
                      {leoReport}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ASK LEO TAB VIEW */}
            {activeSubTab === "leo" && (
              <div className="max-w-4xl mx-auto space-y-6">
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

                      <p className="text-slate-800 text-sm mb-6 leading-relaxed font-sans font-medium bg-white/40 p-4 border border-slate-200/50">
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
                                rows={3}
                                value={phaseAnswers[qIdx] || ""}
                                onChange={(e) => {
                                  const newAnswers = [...phaseAnswers];
                                  newAnswers[qIdx] = e.target.value;
                                  setAnswers({
                                    ...answers,
                                    [activePhase.id]: newAnswers
                                  });
                                }}
                                className="w-full border border-[#d5c7b3] bg-white/70 p-3 text-xs text-slate-900 focus:bg-white focus:outline-none placeholder-slate-400 font-sans rounded-none h-20 font-medium"
                                placeholder="Type your response in simple, non-technical language..."
                              />
                            </div>
                          );
                        })}
                      </div>

                      {/* Coach suggestion note */}
                      <div className="bg-[#faf9f6]/60 border border-[#d5c7b3] p-4 text-xs text-slate-700 mt-5 font-sans font-semibold">
                        <span className="font-bold text-slate-900 block mb-1">💡 AI Coach Tip:</span>
                        {activePhase.caseStudy.coachTip}
                      </div>

                      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <span className="text-xs uppercase font-bold tracking-widest text-slate-500 font-mono">
                          {completedAssessments[activePhase.id] ? "✓ Submitted & Checked" : "Pending Submission"}
                        </span>

                        <Button
                          onClick={() => handleAssessmentSubmit(activePhase.id)}
                          disabled={submittingAssessment}
                          className="bg-slate-900 hover:bg-slate-800 disabled:bg-slate-750 text-white font-heading text-xs uppercase tracking-widest font-bold py-3 px-8 rounded-none transition-all flex items-center gap-2 h-10 cursor-pointer"
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
                        <div className="mt-6 bg-[#faf9f6] border border-[#000000] p-4 text-xs font-sans text-slate-800 font-semibold animate-fade-in">
                          <span className="font-bold text-[#000000] block mb-1">📢 Coach Review:</span>
                          {coachFeedback}
                        </div>
                      )}

                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TEMPLATES TAB VIEW */}
            {activeSubTab === "templates" && (
              <div className="max-w-4xl mx-auto space-y-6">
                <div className="bg-white border border-slate-200 rounded-none p-6 md:p-8 shadow-sm">
                  <h3 className="font-heading text-slate-900 text-xs uppercase tracking-widest border-b border-slate-100 pb-3 font-bold flex items-center gap-2 mb-4">
                    <Sparkles className="w-4 h-4 text-[#000000]" /> Document Blueprints & Workbook Templates
                  </h3>
                  <p className="text-xs text-slate-500 font-sans mb-6">
                    Explore design workbook cards and business blueprints to structure and launch your independent venture:
                  </p>

                  {/* Blueprint wide cards list */}
                  <div className="space-y-4 mb-8">
                    {[
                      { title: "Venture Services Proposal", file: "services_proposal_template.pdf", size: "142 KB", desc: "Retainer client contract proposal with standard terms." },
                      { title: "LLC Setup Cheat Sheet", file: "llc_setup_guide.pdf", size: "88 KB", desc: "Simple checklist for local business registration." },
                      { title: "Sprint Log Ledger", file: "sprint_log_template.pdf", size: "115 KB", desc: "Task tracking sheet for developers and designers." }
                    ].map((doc, idx) => (
                      <div key={idx} className="border border-slate-200 bg-[#faf9f6] p-4 flex flex-col sm:flex-row justify-between sm:items-center rounded-none shadow-sm hover:border-slate-350 transition-colors gap-4">
                        <div className="flex-grow text-left">
                          <span className="text-[9px] uppercase font-mono font-bold tracking-widest text-slate-450 font-semibold">Reference Document</span>
                          <h6 className="font-sans font-bold text-slate-900 text-xs mt-0.5">{doc.title}</h6>
                          <p className="text-[11px] text-slate-500 font-sans mt-1">{doc.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* 44 Cards PDF download list */}
                  <span className="font-mono text-xs uppercase tracking-widest font-black text-slate-400 block mb-4 border-b pb-2">
                    All 44 Design Cards Workbook Curriculum
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cardsList.map((card) => (
                      <DesignCard
                        key={card.id}
                        card={card}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* DESIGN TOOLKIT CARDS TAB VIEW */}
            {activeSubTab === "cards" && (
              <div className="max-w-4xl mx-auto space-y-6">
                <div className="bg-white border border-slate-200 rounded-none p-6 md:p-8 shadow-sm">
                  <h3 className="font-heading text-slate-900 text-xs uppercase tracking-widest mb-4 border-b border-slate-100 pb-3 font-bold flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#000000]" /> Recommended Design Cards
                  </h3>
                  <p className="text-xs text-slate-500 font-sans mb-6">
                    These design cards from our masterclass will help you deploy research and sensemaking in your local venture:
                  </p>

                  {/* Tabs of cards */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {suggestedCardsMap[activeLesson.id]?.map((cardId) => {
                      const card = cardsList.find(c => c.id === cardId);
                      if (!card) return null;
                      const isSelected = selectedLessonCardId === cardId;
                      return (
                        <button
                          key={cardId}
                          onClick={() => setSelectedLessonCardId(cardId)}
                          className={`py-2 px-4 border text-xs font-mono font-bold transition-all rounded-none cursor-pointer ${
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
                    if (!card) {
                      return (
                        <div className="py-12 text-center text-slate-400 italic text-xs font-sans">
                          Select a recommended design card above to view details, templates, and record observations.
                        </div>
                      );
                    }
                    return (
                      <div className="bg-[#faf9f6] border border-slate-200 p-5 rounded-none shadow-sm relative overflow-hidden transition-all duration-300">
                        {/* Decorative stage banner */}
                        <div className="absolute top-0 right-0 bg-slate-900 text-white text-xs uppercase tracking-widest py-1.5 px-4 font-bold font-mono">
                          {card.stage}
                        </div>

                        <div className="mb-4 flex justify-between items-start pr-24">
                          <div>
                            <span className="text-[10px] uppercase font-bold tracking-widest font-mono text-slate-400">
                              Card {card.num} • {card.category}
                            </span>
                            <h5 className="font-heading text-[#0f172a] text-sm uppercase tracking-wide font-extrabold mt-0.5">
                              {card.title}
                            </h5>
                          </div>
                        </div>

                        <div className="space-y-4 text-xs text-slate-700 font-sans font-semibold leading-relaxed">
                          <div>
                            <span className="font-mono text-[10px] text-slate-400 uppercase font-bold block mb-1">Objective:</span>
                            <p className="text-slate-800 font-sans font-semibold leading-relaxed">{card.objective}</p>
                          </div>

                          <div>
                            <span className="font-mono text-[10px] text-slate-400 uppercase font-bold block mb-1">How to deploy:</span>
                            <ul className="space-y-1.5 pl-3 list-decimal text-slate-650 font-sans leading-relaxed font-semibold">
                              {card.deployment.map((step, sIdx) => (
                                <li key={sIdx}>{step}</li>
                              ))}
                            </ul>
                          </div>

                          {/* Venture application block */}
                          <div className="bg-white border-l-4 border-[#000000] p-4 mt-4 shadow-sm border border-slate-150">
                            <span className="font-mono text-[10px] text-[#000000] uppercase font-black block mb-1 flex items-center gap-1">
                              <Sparkles className="w-3 h-3" /> How to apply to "{ventureName}":
                            </span>
                            <p className="text-slate-800 font-sans font-bold leading-relaxed italic text-xs whitespace-pre-line">
                              {aiCustomApplications[card.id] || getVentureApplication(card.id, ventureName, ventureIndustry, ventureType)}
                            </p>
                          </div>

                          {/* Student Field Findings notes section */}
                          {isPhase1Complete && (
                            <div className="bg-white border border-slate-200 p-4 mt-4 shadow-sm space-y-2">
                              <Label className="block text-xs font-sans text-slate-900 uppercase tracking-widest font-bold flex items-center gap-1.5">
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
                                className="w-full bg-[#faf9f6] border border-slate-200 text-xs p-3 focus:outline-none focus:bg-white focus:border-[#000000] placeholder-slate-400 font-sans rounded-none h-20 font-medium"
                              />
                              <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100">
                                <span className="text-[10px] text-slate-400 font-sans">
                                  Saved data is ingested by LEO boardroom brainstorm.
                                </span>
                                <Button
                                  variant="outline"
                                  size="xs"
                                  onClick={() => handleSaveCardNote(card.id, cardNotes[card.id] || "")}
                                  className="text-xs font-sans font-bold tracking-wider uppercase rounded-none border-[#000000] text-[#000000] hover:bg-[#000000] hover:text-white h-7 cursor-pointer"
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
              </div>
            )}

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

      {/* Clickable Card Reference Popup */}
      <Dialog open={showCardReferenceModal} onOpenChange={setShowCardReferenceModal}>
        <DialogContent className="max-w-md bg-[#faf9f6] border border-slate-300 p-6 rounded-none shadow-xl z-50 overflow-visible">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-xs font-heading text-slate-900 uppercase tracking-widest font-black flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-slate-800" /> Referencing Card {selectedReferenceCard?.num}
            </DialogTitle>
            <DialogDescription className="text-[10px] text-slate-400 font-sans">
              Interactive Design Cards Workbook Preview
            </DialogDescription>
          </DialogHeader>

          <div className="flex justify-center items-center py-2">
            {selectedReferenceCard ? (
              <div className="w-full max-w-[320px]">
                <DesignCard
                  card={selectedReferenceCard}
                />
              </div>
            ) : (
              <p className="text-xs text-slate-450 italic">No card selected</p>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200 flex justify-end">
            <button
              onClick={() => setShowCardReferenceModal(false)}
              className="bg-black hover:bg-slate-900 text-white font-heading font-bold uppercase tracking-widest px-4 py-2 text-[10px] rounded-none cursor-pointer"
            >
              Close Preview
            </button>
          </div>
        </DialogContent>
      </Dialog>

    </div>
    </div>
  );
}
