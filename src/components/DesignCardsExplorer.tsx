"use client";

import React, { useState, useMemo } from "react";
import { 
  Search, 
  Lock, 
  Unlock, 
  Plus, 
  Trash2, 
  Clipboard, 
  Check, 
  RotateCw, 
  Sparkles, 
  CheckCircle,
  Clock,
  Briefcase,
  Layers,
  ArrowRight,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Activity,
  Download,
  Terminal as TerminalIcon
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

export interface CardData {
  id: string;
  num: string;
  title: string;
  stage: "Research" | "Synthesis" | "Ideation" | "Prototyping";
  category: string;
  frontDesc: string;
  objective: string;
  deployment: string[];
  isLocked: boolean;
}

export const cardsList: CardData[] = [
  // 1. RESEARCH SECTION (8 cards)
  {
    id: "interviews",
    num: "01",
    title: "Customer Chats",
    stage: "Research",
    category: "Talking to Customers",
    frontDesc: "Talk directly with customers to understand their daily life and what they really need.",
    objective: "Find out what customers need so you do not waste time building the wrong product.",
    deployment: [
      "Find a group of people who would buy your product.",
      "Ask friendly, open questions that let them tell their stories (like 'Tell me about the last time you bought this...').",
      "Take notes, listen closely, and write down what makes them happy or frustrated."
    ],
    isLocked: true
  },
  {
    id: "people-shadowing",
    num: "02",
    title: "Watching Customers",
    stage: "Research",
    category: "Observing Habits",
    frontDesc: "Watch how customers do things in real life without getting in their way.",
    objective: "See how people actually behave, because they often forget details when just talking to you.",
    deployment: [
      "Ask a customer if you can tag along during their normal daily tasks.",
      "Stay quiet and write down how they complete tasks, what tools they use, and when they get stuck.",
      "Ask friendly questions afterward to understand why they did those things."
    ],
    isLocked: true
  },
  {
    id: "culture-probe",
    num: "03",
    title: "Daily Diaries",
    stage: "Research",
    category: "Real-time Feedback",
    frontDesc: "Have customers log their feelings and habits during their daily lives.",
    objective: "Gather real-life feedback from customers exactly when they are using a service.",
    deployment: [
      "Give a simple diary or mobile form to a small group of customers.",
      "Ask them to select an emoji or write a short note when they do a key task (like paying a bill).",
      "Review their notes to find out which parts of the experience feel good or stressful."
    ],
    isLocked: false // PREVIEW CARD
  },
  {
    id: "primary-research",
    num: "04",
    title: "Direct User Feedback",
    stage: "Research",
    category: "Talking to People",
    frontDesc: "Gather feedback directly from your target users to test if your ideas work.",
    objective: "Get real data from the people who will actually buy or use your product.",
    deployment: [
      "Decide what questions or ideas you want to test with customers.",
      "Set up meetings, interviews, or focus groups to talk with them.",
      "Write down their answers to help you choose what to build first."
    ],
    isLocked: true
  },
  {
    id: "desk-research",
    num: "05",
    title: "Reading & Learning",
    stage: "Research",
    category: "Market Research",
    frontDesc: "Look at existing studies, reports, and competitor info to learn about your market.",
    objective: "Understand what rules you must follow and what your competitors are already doing.",
    deployment: [
      "Look up business laws, local regulations, and competitor websites.",
      "Write down important rules, safety standards, and pricing strategies.",
      "Summarize your findings so your team knows what boundaries to follow."
    ],
    isLocked: true
  },
  {
    id: "trend-research",
    num: "06",
    title: "Spotting Trends",
    stage: "Research",
    category: "Looking Ahead",
    frontDesc: "Identify new technology and lifestyle changes that are shaping what customers want.",
    objective: "Make sure your business is ready for the future and doesn't become outdated.",
    deployment: [
      "Watch new tech trends and changes in local regulations.",
      "Observe how your target customers are changing their daily habits.",
      "Find new opportunities to launch products or features."
    ],
    isLocked: true
  },
  {
    id: "photo-studies",
    num: "07",
    title: "Photo Diaries",
    stage: "Research",
    category: "Visual Feedback",
    frontDesc: "Ask users to take photos of the problems they face in their daily environments.",
    objective: "See the physical spaces and tools your customers use every day.",
    deployment: [
      "Give users clear instructions on what they should photograph.",
      "Ask them to take photos of their workspaces, payment devices, or bills.",
      "Look at the photos to design a product that fits their physical environment."
    ],
    isLocked: true
  },
  {
    id: "diaries",
    num: "08",
    title: "Long-term Journals",
    stage: "Research",
    category: "Tracking Habits",
    frontDesc: "Ask users to keep a simple journal of their habits and feelings over a few weeks.",
    objective: "Understand how your customers' habits change over time.",
    deployment: [
      "Invite a small group of users to keep a daily or weekly journal.",
      "Send them a quick prompt or text asking about their daily activities.",
      "Review their journals to find where they get frustrated over time."
    ],
    isLocked: true
  },

  // 2. SYNTHESIS SECTION (10 cards)
  {
    id: "stakeholder-maps",
    num: "09",
    title: "Partner Maps",
    stage: "Synthesis",
    category: "Who is Involved",
    frontDesc: "Draw a map of everyone who has an interest in or influences your product.",
    objective: "Find out who your key partners, suppliers, and regulators are before starting.",
    deployment: [
      "List all the people, companies, and offices that affect your business.",
      "Group them by how close they are to your daily work (core, direct, external).",
      "Draw lines to show how money, data, or help flows between them."
    ],
    isLocked: true
  },
  {
    id: "semantic-analysis",
    num: "10",
    title: "Using Customer Words",
    stage: "Synthesis",
    category: "Speaking Clearly",
    frontDesc: "Learn the exact words and terms your customers use so you can speak their language.",
    objective: "Make sure your website copy uses terms that make sense to normal users.",
    deployment: [
      "Listen to how customers speak during interviews and write down key terms.",
      "Find terms that confuse users (like 'debit balance' instead of 'money owed').",
      "Change the copy on your website to use simple, customer-friendly words."
    ],
    isLocked: true
  },
  {
    id: "system-map",
    num: "11",
    title: "How Things Work Map",
    stage: "Synthesis",
    category: "Business Structure",
    frontDesc: "Draw a simple diagram showing how your website, database, and team work together.",
    objective: "Make sure your design fits the technical limits of your servers and databases.",
    deployment: [
      "List every step a user takes and trace where that data goes.",
      "Draw the connections between databases, website screens, and third-party tools.",
      "Review the map with your developer to ensure the system is fast and cheap to run."
    ],
    isLocked: true
  },
  {
    id: "empathy-map",
    num: "12",
    title: "Customer Feelings Map",
    stage: "Synthesis",
    category: "Understanding Feelings",
    frontDesc: "Organize customer feedback into what they say, think, do, and feel.",
    objective: "Create a simple guide that helps your team understand customer emotions.",
    deployment: [
      "Gather customer quotes and research findings on a shared board.",
      "Sort them into quadrants: Say, Think, Do, and Feel.",
      "Find the difference between what customers say they want vs what they actually do."
    ],
    isLocked: true
  },
  {
    id: "journey-map",
    num: "13",
    title: "Step-by-Step Experience",
    stage: "Synthesis",
    category: "User Experience Map",
    frontDesc: "Trace every step a customer takes when buying or using your product.",
    objective: "Find out where customers get confused, get stuck, or leave.",
    deployment: [
      "Define the starting point and end goal of a customer action.",
      "Write down every single click or step they have to take.",
      "Mark the points where they get frustrated and write down ideas to fix them."
    ],
    isLocked: true
  },
  {
    id: "experience-map",
    num: "14",
    title: "Daily Task Map",
    stage: "Synthesis",
    category: "Life Maps",
    frontDesc: "Model how people achieve a goal in their life without using your product.",
    objective: "Find gaps in people's daily routines where a new product could help them.",
    deployment: [
      "Choose a customer goal, like 'saving money to pay school fees'.",
      "Write down all the ways they currently try to achieve this goal.",
      "Find where the current process is too slow, expensive, or hard."
    ],
    isLocked: true
  },
  {
    id: "end-user-maps",
    num: "15",
    title: "Customer Profiles",
    stage: "Synthesis",
    category: "Knowing Your Audience",
    frontDesc: "Group your customers by their tech skills and phone/internet conditions.",
    objective: "Make sure your website works well on older phones and slow internet.",
    deployment: [
      "Find out what phones and internet speeds your target customers use.",
      "Group users from tech-savvy pros to beginners who struggle with apps.",
      "Write down guidelines to keep your screens simple and fast to load."
    ],
    isLocked: true
  },
  {
    id: "org-charts",
    num: "16",
    title: "Team Hierarchy Map",
    stage: "Synthesis",
    category: "Business Structure",
    frontDesc: "Draw a map of how a business client is organized internally.",
    objective: "Set up the right dashboard permissions (like manager vs staff) for business clients.",
    deployment: [
      "Ask business clients who makes decisions and who does daily work.",
      "Map the roles (such as owner, manager, employee) for your system.",
      "Design account types that let business clients control who sees what."
    ],
    isLocked: true
  },
  {
    id: "themes",
    num: "17",
    title: "Finding Patterns",
    stage: "Synthesis",
    category: "Grouping Ideas",
    frontDesc: "Cluster raw research observations into structured theme categories to identify trends.",
    objective: "Extract clear product backlog requirements from messy qualitative focus sessions.",
    deployment: [
      "Write individual research observations on notes and place them on a shared canvas.",
      "Group similar notes without thinking about taxonomy first.",
      "Name each cluster to frame structural insights for product roadmap alignment."
    ],
    isLocked: true
  },
  {
    id: "2-by-2-axis",
    num: "18",
    title: "Prioritization Matrix",
    stage: "Synthesis",
    category: "Deciding What to Build",
    frontDesc: "Plot features or ideas on a map to compare their impact vs complexity.",
    objective: "Find the easiest, most important features to build first.",
    deployment: [
      "Draw two crossing lines: 'Customer Value' (High/Low) and 'Difficulty' (Easy/Hard).",
      "Place your product ideas on the map.",
      "Pick the high-value, easy-to-build ideas to launch first."
    ],
    isLocked: true
  },

  // 3. IDEATION & STRATEGY SECTION (9 cards)
  {
    id: "point-of-view",
    num: "19",
    title: "Problem Statement",
    stage: "Ideation",
    category: "Focusing on the Problem",
    frontDesc: "Write a simple sentence defining your customer, their need, and why it matters.",
    objective: "Avoid building useless features by focusing on a single, clear customer problem.",
    deployment: [
      "Pick a target customer group and their main struggle.",
      "Write a sentence: '[User group] needs a way to [do something] because [reason].'",
      "Review this statement before designing anything new."
    ],
    isLocked: true
  },
  {
    id: "hmw-questions",
    num: "20",
    title: "Brainstorming Prompts",
    stage: "Ideation",
    category: "Asking Questions",
    frontDesc: "Turn customer problems into questions starting with 'How might we...'",
    objective: "Help your team brainstorm many creative solutions to a customer struggle.",
    deployment: [
      "Select a customer problem from your research.",
      "Write down questions like 'How might we make paying bills feel rewarding?'",
      "Use these questions to spark creative ideas in group sessions."
    ],
    isLocked: true
  },
  {
    id: "golden-circle",
    num: "21",
    title: "Start with Why",
    stage: "Ideation",
    category: "Business Purpose",
    frontDesc: "Write down your business's Why, How, and What.",
    objective: "Make sure your team understands the heart of your business before building.",
    deployment: [
      "Write the 'Why': Why does your business exist beyond making money?",
      "Write the 'How': How do you do things differently than competitors?",
      "Write the 'What': What specific product or service do you deliver?"
    ],
    isLocked: true
  },
  {
    id: "heaven-and-hell",
    num: "22",
    title: "Best & Worst Case Scenarios",
    stage: "Ideation",
    category: "Risk Management",
    frontDesc: "Imagine the absolute best and absolute worst launch scenarios.",
    objective: "Find and fix potential errors or customer complaints before you launch.",
    deployment: [
      "Get your team together to discuss the product launch.",
      "Describe 'Hell': server crashes, payment errors, customers leaving in anger.",
      "Describe 'Heaven': customers signing up, smooth payments, positive reviews.",
      "Create plans to prevent the worst cases from happening."
    ],
    isLocked: true
  },
  {
    id: "idea-fridge",
    num: "23",
    title: "Idea Saver",
    stage: "Ideation",
    category: "Managing Features",
    frontDesc: "Save good but out-of-scope ideas for future review.",
    objective: "Keep your current work simple by putting extra ideas in a safe place.",
    deployment: [
      "Identify cool features that are not needed for your first version.",
      "Save these ideas in a list called the 'Idea Saver'.",
      "Review the list every few months to see if it's time to build them."
    ],
    isLocked: true
  },
  {
    id: "idea-napkin",
    num: "24",
    title: "One-Page Concept",
    stage: "Ideation",
    category: "Sketching Ideas",
    frontDesc: "Draw a simple product idea on a single page, explaining its value.",
    objective: "Explain your ideas clearly and simply to partners or customers.",
    deployment: [
      "Explain the idea name, who it's for, and why they will love it in 3 sentences.",
      "Draw a quick, simple sketch showing how the product works.",
      "Show the page to others to get their immediate feedback."
    ],
    isLocked: true
  },
  {
    id: "idea-shopping",
    num: "25",
    title: "Feature Store",
    stage: "Ideation",
    category: "Feature Testing",
    frontDesc: "Give customers a fake budget and let them buy the features they want.",
    objective: "Find out what features customers actually value most under a limit.",
    deployment: [
      "Give customers a set amount of play money.",
      "Put a price tag on each proposed feature based on how hard it is to build.",
      "Ask customers to buy their favorite features and see what they choose."
    ],
    isLocked: true
  },
  {
    id: "elevator-pitch",
    num: "26",
    title: "30-Second Pitch",
    stage: "Ideation",
    category: "Explaining Your Business",
    frontDesc: "Write a short summary that explains your product and value in under 30 seconds.",
    objective: "Clearly explain what you do to anyone you meet.",
    deployment: [
      "Draft a simple pitch: 'For [customers] who [have a need], our [product] is a [category] that [gives a benefit].'",
      "Practice saying it in a single, relaxed breath.",
      "Use it when speaking to customers, partners, or investors."
    ],
    isLocked: true
  },
  {
    id: "brainstorming",
    num: "27",
    title: "Idea Sprints",
    stage: "Ideation",
    category: "Generating Ideas",
    frontDesc: "Run quick team sessions to brainstorm as many ideas as possible.",
    objective: "Get lots of ideas quickly without judging them first.",
    deployment: [
      "Set a clear question (like 'How do we make sign-ups take under 2 minutes?').",
      "Write down every idea, encourage wild thoughts, and don't say 'no'.",
      "Have the team vote on their favorite ideas at the end."
    ],
    isLocked: true
  },

  // 4. PROTOTYPING & CO-DESIGN SECTION (17 cards)
  {
    id: "card-sorting",
    num: "28",
    title: "Group Sorting",
    stage: "Prototyping",
    category: "Organizing Menus",
    frontDesc: "Have customers sort menu items into groups that make sense to them.",
    objective: "Create a simple website menu structure that customers can navigate easily.",
    deployment: [
      "Write website pages or tools on cards.",
      "Ask customers to group cards together and name each group.",
      "Use their groups to build your website's main menu."
    ],
    isLocked: true
  },
  {
    id: "world-cafe",
    num: "29",
    title: "Idea Cafe",
    stage: "Prototyping",
    category: "Group Discussions",
    frontDesc: "Host conversations across rotating tables to solve problems.",
    objective: "Get advice and ideas from different people in a friendly, relaxed setting.",
    deployment: [
      "Set up tables, each with a different question or topic.",
      "Have participants discuss at a table for 20 minutes, then rotate to another.",
      "Gather all notes at the end to make a list of suggestions."
    ],
    isLocked: true
  },
  {
    id: "workshops",
    num: "30",
    title: "Team Sprints",
    stage: "Prototyping",
    category: "Co-creation Sprints",
    frontDesc: "Bring users, builders, and designers together to create solutions.",
    objective: "Make sure everyone agrees on the product plan before coding starts.",
    deployment: [
      "Plan a meeting with clear goals and tasks.",
      "Draw screens and plan features together in real-time.",
      "List the agreed-upon tasks to start building."
    ],
    isLocked: true
  },
  {
    id: "role-playing",
    num: "31",
    title: "Role Play",
    stage: "Prototyping",
    category: "Testing Scenarios",
    frontDesc: "Act out customer scenarios and support interactions physically.",
    objective: "See how your service will run in real life before building the tech.",
    deployment: [
      "Assign roles: the customer, the clerk, the support agent.",
      "Act out common situations, like a card failing or a customer losing their password.",
      "Write down any issues and fix your website screens to prevent them."
    ],
    isLocked: true
  },
  {
    id: "graphic-recording",
    num: "32",
    title: "Visual Notes",
    stage: "Prototyping",
    category: "Meeting Sketching",
    frontDesc: "Draw simple charts and diagrams live during a meeting or workshop.",
    objective: "Help visual learners understand complex systems easily.",
    deployment: [
      "Draw key ideas, timelines, and connections on a board during a meeting.",
      "Use symbols, arrows, and simple sketches instead of long sentences.",
      "Share a photo of the drawing with the team for reference."
    ],
    isLocked: true
  },
  {
    id: "props",
    num: "33",
    title: "Mock Tools",
    stage: "Prototyping",
    category: "Physical Practice",
    frontDesc: "Create simple physical items (like cardboard screens) to test product use.",
    objective: "See how users handle physical devices in their daily environments.",
    deployment: [
      "Make simple models representing terminals or screens.",
      "Ask users to practice using them in their shops or stores.",
      "Observe any physical struggles and adjust your designs."
    ],
    isLocked: true
  },
  {
    id: "legos",
    num: "34",
    title: "Lego Modeling",
    stage: "Prototyping",
    category: "Physical Modeling",
    frontDesc: "Use blocks to build models of systems and workflows.",
    objective: "Help teams visualize system setups and connections physically.",
    deployment: [
      "Introduce a focus system challenge (like 'Build the path from signup to pay').",
      "Have team members build structures with Lego bricks.",
      "Discuss physical models to spot any logical gaps or dependencies."
    ],
    isLocked: true
  },
  {
    id: "collage",
    num: "35",
    title: "Image Moods",
    stage: "Prototyping",
    category: "Visual Styles",
    frontDesc: "Have users select images that match their feelings about security or money.",
    objective: "Find the colors and styles your customers connect with emotionally.",
    deployment: [
      "Give users magazines or web images.",
      "Ask them to pick images that match their feelings about business or trust.",
      "Use these colors and styles to design your website logo and theme."
    ],
    isLocked: true
  },
  {
    id: "mood-board",
    num: "36",
    title: "Style Boards",
    stage: "Prototyping",
    category: "Visual Vibe",
    frontDesc: "Gather colors, fonts, and layout ideas onto a single style board.",
    objective: "Agree on the visual look of your brand before building pages.",
    deployment: [
      "Find websites, logos, and fonts that look premium and friendly.",
      "Arrange them on a screen or board.",
      "Show the board to partners to confirm the brand look."
    ],
    isLocked: true
  },
  {
    id: "team-journey",
    num: "37",
    title: "Team Roadmap",
    stage: "Prototyping",
    category: "Project Timeline",
    frontDesc: "Map out your team's milestones and tasks on a timeline.",
    objective: "Make sure developers, designers, and business leads are aligned on deadlines.",
    deployment: [
      "Write down key launch dates and test phases.",
      "Assign tasks to the right team members.",
      "Review the timeline weekly to stay on track."
    ],
    isLocked: true
  },
  {
    id: "pitch-deck",
    num: "38",
    title: "Business Slide Deck",
    stage: "Prototyping",
    category: "Talking to Partners",
    frontDesc: "Create a simple slide deck explaining your business and strategy.",
    objective: "Get funding, bank approvals, or support from partners.",
    deployment: [
      "Create slides covering: Problem, Solution, Demo, Market, Costs, and Team.",
      "Keep slides visual and simple with customer comments.",
      "Present the deck to potential partners or lenders."
    ],
    isLocked: true
  },
  {
    id: "feedback-grid",
    num: "39",
    title: "Feedback Quadrant",
    stage: "Prototyping",
    category: "Sorting Reviews",
    frontDesc: "Sort user feedback into positive, negative, questions, and ideas.",
    objective: "Structure customer comments so you can improve the product quickly.",
    deployment: [
      "Draw a grid with 4 boxes: Good Stuff, Criticisms, Questions, and New Ideas.",
      "Sort user test comments into these boxes.",
      "Use this list to plan your next round of product updates."
    ],
    isLocked: true
  },
  {
    id: "future-scenarios",
    num: "40",
    title: "Planning for Change",
    stage: "Prototyping",
    category: "Future Plans",
    frontDesc: "Discuss how market changes or new laws could affect your business.",
    objective: "Prepare your business so it can survive regulatory updates or fee changes.",
    deployment: [
      "List potential rules or fee changes that could happen.",
      "Brainstorm how your product would adapt to stay compliant.",
      "Build a flexible system that can change values easily."
    ],
    isLocked: true
  },
  {
    id: "experience-journey",
    num: "41",
    title: "Customer Channels Map",
    stage: "Prototyping",
    category: "Multi-channel Flow",
    frontDesc: "Map how users move between your website, phone calls, and physical locations.",
    objective: "Make sure customers get help even if they go offline or lose internet.",
    deployment: [
      "Draw customer pathways from digital to physical touchpoints.",
      "Create offline safety options (like a customer phone line).",
      "Test transitions to ensure they work smoothly."
    ],
    isLocked: true
  },
  {
    id: "conversation-starters",
    num: "42",
    title: "Conversation Cards",
    stage: "Prototyping",
    category: "Starting Chats",
    frontDesc: "Use friendly conversation prompts to get deep stories from customers.",
    objective: "Get past simple yes/no answers to understand real customer motivations.",
    deployment: [
      "Draw a prompt card at the start of a user discussion.",
      "Ask questions about real experiences (e.g., 'Tell me about the worst purchase you made').",
      "Use the stories to guide feature prioritization."
    ],
    isLocked: false // PREVIEW CARD
  },
  {
    id: "behavior-engine",
    num: "43",
    title: "Smart Actions Engine",
    stage: "Prototyping",
    category: "Helpful Triggers",
    frontDesc: "Use simple website logic to offer customers help at the right moment.",
    objective: "Help customers find helpful financial tools when they need them.",
    deployment: [
      "Set up automatic rules on the backend database (like checking balances).",
      "Trigger a helpful tip when a user's balance drops below a threshold.",
      "Offer a clear micro-loan or sweep choice directly on their screen."
    ],
    isLocked: false // PREVIEW CARD
  },
  {
    id: "my-top-5",
    num: "44",
    title: "Pick Top 5",
    stage: "Prototyping",
    category: "Feature Priority",
    frontDesc: "Ask users to select and rank their top 5 favorite features from a list.",
    objective: "Keep your product simple and focus resources on what matters most.",
    deployment: [
      "Show a customer card deck of all proposed features.",
      "Ask them to pick their top 5 must-haves.",
      "Use the counts to choose which features to build first."
    ],
    isLocked: true
  }
];

const MOCK_CITY_DB: Record<string, string> = {
  "197.248.9.15": "Nairobi, Kenya",
  "91.74.22.180": "Dubai, UAE",
  "104.244.42.1": "San Francisco, USA"
};

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

export default function DesignCardsExplorer() {
  const displayCardsList = useMemo(() => cardsList.slice(0, 3), []);
  const [activeTab, setActiveTab] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [flippedCard, setFlippedCard] = useState<string | null>(null);
  
  // Paywall & Access states
  const [simulateUnlock, setSimulateUnlock] = useState<boolean>(false);
  const [showPaywallModal, setShowPaywallModal] = useState<boolean>(false);
  const [lockedCardAttempted, setLockedCardAttempted] = useState<string | null>(null);

  // Workshop Builder states
  const [workshopCards, setWorkshopCards] = useState<Array<{ card: CardData; duration: number }>>([]);
  const [copied, setCopied] = useState<boolean>(false);

  // Geolocation Shield states
  const [currentIp, setCurrentIp] = useState<string>("197.248.9.15");
  const [targetIp, setTargetIp] = useState<string>("91.74.22.180");
  const [timeGap, setTimeGap] = useState<number>(0.2); // 12 minutes default
  const [isSuspended, setIsSuspended] = useState<boolean>(false);
  const [securityCheckResult, setSecurityCheckResult] = useState<any>(null);
  const [otpCode, setOtpCode] = useState<string>("");
  const [otpError, setOtpError] = useState<string>("");
  const [otpSuccess, setOtpSuccess] = useState<boolean>(false);
  const [geoLogs, setGeoLogs] = useState<Array<{ event: string; details: string; time: string; status: "secure" | "failed" }>>([
    { event: "Sentinel Init", details: "Trusted IP initialized: 197.248.9.15 (Nairobi, Kenya).", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), status: "secure" }
  ]);

  // Interactive Sandbox states
  // Card 3: Culture Probe
  const [probeEmoji, setProbeEmoji] = useState<string>("😐");
  const [probeNote, setProbeNote] = useState<string>("");
  const [probeLogged, setProbeLogged] = useState<boolean>(false);
  const [probeHistory, setProbeHistory] = useState<Array<{ emoji: string; note: string; time: string }>>([]);

  // Card 42: Conversation Starters
  const starterPrompts = [
    "Tell me about the last app that made you feel smart, and walk me through what happened right before you closed it.",
    "If this financial app were an employee at a branch, how would they speak to you when you request a loan?",
    "Describe the absolute worst transaction anxiety you experienced this month. What did you wish the UI told you?",
    "What is the one daily transaction you do that you hide from friends or family, and why?"
  ];
  const [currentPrompt, setCurrentPrompt] = useState<string>(starterPrompts[0]);
  const [promptFade, setPromptFade] = useState<boolean>(false);

  // Card 43: Behavior Change Engine
  const [engineBalance, setEngineBalance] = useState<number>(12);
  const [engineBills, setEngineBills] = useState<boolean>(true);
  const [engineDayOfMonth, setEngineDayOfMonth] = useState<number>(28);
  const [engineOutput, setEngineOutput] = useState<{ trigger: string; lift: string; desc: string }>({
    trigger: "MONITOR",
    lift: "--",
    desc: "Maintaining standard lifestyle ecosystem tracking. User balance is healthy."
  });

  const imageMap: Record<string, string> = {
    "Research": "/phase_research.png",
    "Synthesis": "/phase_synthesis.png",
    "Ideation": "/phase_ideation.png",
    "Prototyping": "/phase_prototyping.png",
  };

  // Filter logic
  const filteredCards = useMemo(() => {
    return displayCardsList.filter((card) => {
      const matchesTab = activeTab === "All" || card.stage === activeTab;
      const matchesSearch = card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            card.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            card.frontDesc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery]);

  const handleCardClick = (card: CardData) => {
    // Check if account suspended
    if (isSuspended) return;

    // Check if card is locked
    const isActuallyLocked = card.isLocked && !simulateUnlock;
    if (isActuallyLocked) {
      setLockedCardAttempted(card.title);
      setShowPaywallModal(true);
      return;
    }

    if (flippedCard === card.id) {
      setFlippedCard(null);
    } else {
      setFlippedCard(card.id);
    }
  };

  const handleLogProbe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!probeNote.trim()) return;
    const newLog = {
      emoji: probeEmoji,
      note: probeNote,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };
    setProbeHistory([newLog, ...probeHistory].slice(0, 3));
    setProbeNote("");
    setProbeLogged(true);
    setTimeout(() => setProbeLogged(false), 2000);
  };

  const handleDrawPrompt = () => {
    setPromptFade(true);
    setTimeout(() => {
      let nextPrompt = currentPrompt;
      while (nextPrompt === currentPrompt) {
        const randomIdx = Math.floor(Math.random() * starterPrompts.length);
        nextPrompt = starterPrompts[randomIdx];
      }
      setCurrentPrompt(nextPrompt);
      setPromptFade(false);
    }, 150);
  };

  const calculateEngine = (balance: number, bills: boolean, day: number) => {
    if (balance <= 25 && bills && day >= 25) {
      setEngineOutput({
        trigger: "SHORT-TERM LENDING ENGINE",
        lift: "25% Lift",
        desc: "Predictive trigger matches cash-dip. Surfacing automated micro-loan offer with 3-click approval."
      });
    } else if (balance > 100 && day < 10) {
      setEngineOutput({
        trigger: "MONEY MARKET FUND (MMF)",
        lift: "15% Lift",
        desc: "User holds high idle balance in checking. Surfacing target MMF savings sweep option."
      });
    } else {
      setEngineOutput({
        trigger: "MONITOR & RETAIN",
        lift: "Standard",
        desc: "Standard tracking. Behavior pattern does not match cross-sell risk thresholds."
      });
    }
  };

  // Workshop logic
  const handleAddToWorkshop = (card: CardData, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSuspended) return;

    // Verify paywall
    if (card.isLocked && !simulateUnlock) {
      setLockedCardAttempted(card.title);
      setShowPaywallModal(true);
      return;
    }

    // Add with default duration 15 minutes
    if (!workshopCards.some(w => w.card.id === card.id)) {
      setWorkshopCards([...workshopCards, { card, duration: 15 }]);
    }
  };

  const handleRemoveFromWorkshop = (id: string) => {
    setWorkshopCards(workshopCards.filter(w => w.card.id !== id));
  };

  const handleUpdateDuration = (id: string, duration: number) => {
    setWorkshopCards(workshopCards.map(w => w.card.id === id ? { ...w, duration: Math.max(1, duration) } : w));
  };

  const totalWorkshopDuration = useMemo(() => {
    return workshopCards.reduce((acc, curr) => acc + curr.duration, 0);
  }, [workshopCards]);

  const handleExportPlaybook = () => {
    if (workshopCards.length === 0) return;
    const playbookText = `SOVEREIGN PRODUCT BUILDER - WORKSHOP SESSION PLAYBOOK
----------------------------------------------------
Total Duration: ${totalWorkshopDuration} Minutes
Number of Strategic Tools: ${workshopCards.length}

AGENDA STEPS:
${workshopCards.map((w, idx) => `
Step ${idx + 1}: ${w.card.title} (${w.duration} Mins)
Category: ${w.card.category}
Objective: ${w.card.objective}
Field Steps:
${w.card.deployment.map((step, sIdx) => `  ${sIdx + 1}. ${step}`).join("\n")}
`).join("\n")}
----------------------------------------------------
Generated via Sovereign Millionaires Design Card Builder.
`;
    navigator.clipboard.writeText(playbookText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Geolocation Shield Logic
  const handleSimulateLogin = async () => {
    try {
      const response = await fetch("/api/security/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentIp,
          targetIp,
          timeDifferenceHours: timeGap
        })
      });
      const data = await response.json();
      setSecurityCheckResult(data);
      
      const newLog = {
        event: data.status === "SUSPENDED" ? "Velocity Threat Detected" : "Login Approved",
        details: `${data.to.city} (${targetIp}) | Dist: ${data.distanceKm}km | Velocity: ${data.speedKmh}km/h`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        status: data.status === "SUSPENDED" ? ("failed" as const) : ("secure" as const)
      };
      
      setGeoLogs([newLog, ...geoLogs].slice(0, 5));

      if (data.status === "SUSPENDED") {
        setIsSuspended(true);
        setOtpError("");
      } else {
        setCurrentIp(targetIp);
        setOtpSuccess(true);
        setTimeout(() => setOtpSuccess(false), 3000);
      }
    } catch (err) {
      console.error("Sentinel endpoint connection error", err);
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode === "742218" || otpCode === "123456") {
      setOtpError("");
      setIsSuspended(false);
      setOtpCode("");
      setCurrentIp(targetIp);
      
      const newLog = {
        event: "Security Unlocked",
        details: `Code verified successfully. Trusted login location updated to ${targetIp} (${MOCK_CITY_DB[targetIp]}).`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: "secure" as const
      };
      setGeoLogs([newLog, ...geoLogs].slice(0, 5));
    } else {
      setOtpError("Invalid code. Use 742218 to unlock.");
    }
  };

  return (
    <section className="w-full px-6 md:px-16 lg:px-24 py-20 bg-white border-b border-slate-200" id="toolkit">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div className="flex flex-col items-start text-left max-w-3xl">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono mb-2 font-bold">
            Business Design Registry
          </span>
          <h2 className="text-3xl md:text-5xl font-heading text-slate-900 uppercase tracking-widest mb-4">
            Business Design Toolkit
          </h2>
          <p className="text-slate-500 text-sm md:text-base font-sans font-medium">
            Explore 3 helpful design tools from our masterclass. Click to flip them, try the interactive previews, and start building your business ideas.
          </p>
        </div>

      </div>

      {/* RENDER SUSPENSION LOCKOUT OVERLAY IF ACTIVE */}
      {isSuspended ? (
        <div className="max-w-7xl mx-auto bg-white border-2 border-red-650 p-8 md:p-12 mb-20 text-left relative rounded-none flex flex-col justify-center">
          <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 border border-red-200 px-3 py-1 text-xs uppercase font-mono tracking-widest font-bold">
                <ShieldAlert className="w-4 h-4 text-red-600 animate-pulse" />
                Security Block - Login Suspended
              </div>
              <h3 className="text-2xl md:text-3xl font-heading text-slate-905 uppercase tracking-widest font-bold">
                Account Suspended
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed font-sans font-medium">
                To keep your account safe, access has been blocked. We noticed a login from two distant locations at the same time, which is not physically possible.
              </p>

              {/* Suspicion metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-[#faf9f6] border border-slate-200 p-4 rounded-none text-xs font-sans">
                <div>
                  <span className="text-xs uppercase font-bold text-slate-400 font-mono block">First Login</span>
                  <span className="font-mono text-slate-900 font-bold block">{securityCheckResult?.from?.ip}</span>
                  <span className="text-slate-500 text-xs">{securityCheckResult?.from?.city}, {securityCheckResult?.from?.country}</span>
                </div>
                <div>
                  <span className="text-xs uppercase font-bold text-slate-400 font-mono block">Second Login</span>
                  <span className="font-mono text-slate-900 font-bold block">{securityCheckResult?.to?.ip}</span>
                  <span className="text-slate-500 text-xs">{securityCheckResult?.to?.city}, {securityCheckResult?.to?.country}</span>
                </div>
                <div>
                  <span className="text-xs uppercase font-bold text-slate-400 font-mono block">Distance</span>
                  <span className="font-mono text-red-600 font-bold block">{securityCheckResult?.distanceKm} km</span>
                  <span className="text-slate-500 text-xs">Direct distance</span>
                </div>
                <div>
                  <span className="text-xs uppercase font-bold text-slate-400 font-mono block">Time Difference</span>
                  <span className="font-mono text-red-600 font-bold block">{securityCheckResult?.speedKmh} km/h</span>
                  <span className="text-slate-500 text-xs">Time Gap: {Math.round(timeGap * 60)} minutes</span>
                </div>
              </div>

              <p className="text-xs text-slate-400 font-sans">
                A verification code has been sent to your email <strong className="text-slate-800">remyngatia@gmail.com</strong>. Enter the code below to verify your login and unlock your account.
              </p>
            </div>

            {/* OTP form */}
            <div className="bg-[#faf9f6] border border-slate-200 p-6 rounded-none w-full md:w-80 shrink-0">
              <h4 className="font-heading text-xs text-slate-900 uppercase tracking-widest font-bold mb-4 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#000000]" /> Enter Verification Code
              </h4>
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <input 
                  type="text"
                  placeholder="Enter 6-Digit Code"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  maxLength={6}
                  className="w-full text-center tracking-[0.4em] font-mono text-lg py-2 bg-white border border-slate-200 focus:outline-none focus:border-[#000000] focus:ring-1 focus:ring-[#000000] rounded-none text-slate-900"
                />
                
                {otpError && (
                  <p className="text-xs text-red-700 leading-snug font-sans text-center bg-red-50 border border-red-100 p-2 font-semibold">
                    {otpError}
                  </p>
                )}

                <button 
                  type="submit"
                  className="w-full py-2.5 bg-slate-900 text-white font-heading text-xs uppercase tracking-widest font-bold hover:bg-slate-800 transition-colors rounded-none"
                >
                  Verify and Unlock
                </button>
              </form>
              <div className="text-xs text-slate-400 text-center font-mono mt-3">
                Emergency Bypass Code: <span className="font-bold text-slate-800 bg-slate-100 px-1 border">742218</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* FILTER & SEARCH ROW */}
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 justify-between items-center mb-10 pb-6 border-b border-slate-200">
            
            {/* Phase selection tabs */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              {["All", "Research", "Synthesis", "Ideation", "Prototyping"].map((tab) => {
                const isActive = activeTab === tab;
                const count = tab === "All" 
                  ? displayCardsList.length 
                  : displayCardsList.filter(c => c.stage === tab).length;
                
                return (
                  <button
                    key={tab}
                    onClick={() => {
                      setActiveTab(tab);
                      setFlippedCard(null);
                    }}
                    className={`px-4 py-2 text-xs font-heading uppercase tracking-widest transition-all rounded-none border ${
                      isActive 
                        ? "border-[#000000] bg-[#faf9f6] text-[#000000] font-bold" 
                        : "border-slate-200 hover:border-slate-400 text-slate-500 bg-transparent"
                    }`}
                  >
                    {tab === "All" ? "All Phases" : tab} ({count})
                  </button>
                );
              })}
            </div>

          </div>

          {/* CARDS GRID */}
          {activeTab !== "All" && activeTab !== "Research" ? (
            <div className="max-w-4xl mx-auto bg-white border border-[#000000] p-8 md:p-12 mb-20 text-center relative rounded-none flex flex-col justify-center">
              <div className="w-12 h-12 bg-[#faf9f6] border border-[#000000]/30 text-[#000000] flex items-center justify-center mx-auto mb-6 rounded-none">
                <Lock className="w-6 h-6" />
              </div>

              <span className="text-xs uppercase font-bold tracking-widest text-[#000000] font-mono block mb-1">
                {activeTab} Phase Lock
              </span>
              <h3 className="text-xl md:text-2xl font-heading text-slate-905 uppercase tracking-widest mb-4 font-bold">
                Unlock the Sovereign Product Builder Suite
              </h3>
              
              <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-8 font-sans max-w-2xl mx-auto">
                Get instant access to all 44 HCD method cards, workshop builders, GTM simulators, and boardroom executive sensemaking panels. Learn how to launch your startup without coding bottlenecks.
              </p>

              <div className="flex justify-center">
                <a
                  href="#pricing"
                  className="bg-[#000000] hover:bg-[#1a1a1a] text-white py-3.5 px-8 rounded-none text-xs uppercase font-heading tracking-widest font-bold transition-all inline-flex items-center gap-1.5 hover:scale-[1.02] transform duration-200"
                >
                  Enroll Now to Learn <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ) : (
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
              {filteredCards.map((card) => {
              const isFlipped = flippedCard === card.id;
              const isLocked = card.isLocked && !simulateUnlock;

              return (
                <div
                  key={card.id}
                  className="h-[480px] w-full [perspective:1000px] cursor-pointer group"
                  onClick={() => handleCardClick(card)}
                >
                  <div
                    className={`relative w-full h-full rounded-none transition-transform duration-700 [transform-style:preserve-3d] shadow-none ${
                      isFlipped ? "[transform:rotateY(180deg)]" : ""
                    }`}
                  >
                    {/* Front Side */}
                    <div className="absolute inset-0 w-full h-full rounded-none bg-[#faf9f6]/40 border border-slate-200 p-6 flex flex-col [backface-visibility:hidden] overflow-hidden hover:border-[#000000] hover:bg-white transition-all duration-300">
                      
                      {/* Top bar */}
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-xs text-[#000000] uppercase tracking-widest font-mono font-bold block mb-0.5">
                            {card.stage} PHASE
                          </span>
                          <span className="text-xs text-slate-400 font-mono uppercase tracking-wider block">
                            {card.category}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {isLocked && (
                            <Tooltip>
                              <TooltipTrigger render={<span className="cursor-help p-0.5" />}>
                                <Lock className="w-3.5 h-3.5 text-[#000000]/65" />
                              </TooltipTrigger>
                              <TooltipContent>
                                This card requires the premium Sovereign Pass to edit details.
                              </TooltipContent>
                            </Tooltip>
                          )}
                          <span className="text-3xl font-heading text-slate-250 select-none font-bold">
                            {card.num}
                          </span>
                        </div>
                      </div>

                      {/* Card Image */}
                      <div className="aspect-[16/10] w-full overflow-hidden border border-slate-200/60 rounded-none my-4 bg-slate-50 shrink-0 relative">
                        <img 
                          src={imageMap[card.stage]} 
                          alt={card.title} 
                          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                        />
                        {isLocked && (
                          <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-[2px] flex items-center justify-center">
                            <div className="bg-white border border-[#000000]/40 text-[#000000] px-3 py-1.5 text-xs uppercase tracking-widest font-mono font-bold flex items-center gap-1">
                              <Lock className="w-2.5 h-2.5" /> Locked
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 flex flex-col justify-center text-left">
                        <h3 className="text-base font-heading text-slate-900 uppercase mb-1 leading-tight tracking-widest font-bold">
                          {card.title}
                        </h3>
                        <p className="text-slate-655 text-sm leading-relaxed font-sans font-medium">
                          {card.frontDesc}
                        </p>
                      </div>

                      {/* Bottom bar */}
                      <div className="flex items-center justify-between text-sm text-slate-400 pt-4 border-t border-slate-100 font-sans mt-auto">
                        <span className="flex items-center gap-1 text-slate-500 hover:text-slate-900 font-medium">
                          <EyeIcon className="w-3.5 h-3.5 text-[#000000]" /> Click to flip & explore
                        </span>
                        <button
                          onClick={(e) => handleAddToWorkshop(card, e)}
                          className="bg-transparent border border-[#000000]/30 text-[#000000] hover:bg-[#000000] hover:text-white px-2.5 py-1 text-xs font-mono font-bold uppercase tracking-widest transition-all rounded-none"
                        >
                          + Agenda
                        </button>
                      </div>
                    </div>

                    {/* Back Side */}
                    <div className="absolute inset-0 w-full h-full rounded-none bg-white border-2 border-[#000000] p-5 flex flex-col justify-between [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-y-auto"
                         onClick={(e) => {
                           e.stopPropagation();
                         }}
                    >
                      <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                        <h4 className="font-heading text-slate-900 text-xs uppercase tracking-widest font-bold">
                          {card.title} Operational Sandbox
                        </h4>
                        <button 
                          onClick={() => setFlippedCard(null)}
                          className="text-slate-400 hover:text-slate-950 transition-colors"
                          title="Flip Back"
                        >
                          <RotateCw className="w-4 h-4 text-[#000000]" />
                        </button>
                      </div>

                      {/* Details */}
                      <div className="text-xs text-slate-655 space-y-2.5 my-3 font-sans font-medium text-left">
                        <p className="leading-relaxed">
                          <strong className="text-slate-900 uppercase font-heading text-xs tracking-widest block font-bold mb-1">Objective:</strong>
                          {card.objective}
                        </p>
                        <div>
                          <strong className="text-slate-900 uppercase font-heading text-xs tracking-widest block font-bold mb-1">Field Deployment:</strong>
                          <ol className="list-decimal pl-4 space-y-1 text-slate-500 leading-snug mb-3">
                            {card.deployment.map((step, idx) => (
                              <li key={idx}>{step}</li>
                            ))}
                          </ol>
                        </div>

                        {/* PDF Download Button */}
                        <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-xs uppercase font-bold tracking-wider text-slate-400 font-mono">Workbook PDF</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDownloadPDF(card);
                            }}
                            className="inline-flex items-center gap-1.5 bg-[#000000] hover:bg-[#1a1a1a] text-white px-2.5 py-1 text-xs font-mono font-bold uppercase tracking-widest transition-all rounded-none cursor-pointer h-7"
                          >
                            <Download className="w-3 h-3" /> Download Template
                          </button>
                        </div>
                      </div>

                      {/* Dynamic Sandbox Section */}
                      <div className="bg-[#faf9f6]/70 border border-slate-200 rounded-none p-3 text-xs mt-auto">
                        
                        {/* Sandbox 1: Culture Probe */}
                        {card.id === "culture-probe" && (
                          <div className="space-y-2">
                            <span className="text-xs font-heading text-slate-500 uppercase tracking-widest block font-bold text-left">
                              Interactive Logger:
                            </span>
                            <form onSubmit={handleLogProbe} className="flex gap-2">
                              <select 
                                value={probeEmoji}
                                onChange={(e) => setProbeEmoji(e.target.value)}
                                className="bg-white border border-slate-200 text-base rounded-none px-1.5 focus:outline-none focus:border-[#000000] focus:ring-1 focus:ring-[#000000] font-sans"
                              >
                                <option>😐</option>
                                <option>😀</option>
                                <option>😡</option>
                                <option>💸</option>
                                <option>😰</option>
                              </select>
                              <input 
                                type="text" 
                                placeholder="How do you feel about this payment?"
                                value={probeNote}
                                onChange={(e) => setProbeNote(e.target.value)}
                                className="bg-white border border-slate-200 rounded-none px-2 py-1 text-slate-800 placeholder-slate-400 w-full focus:outline-none focus:border-[#000000] focus:ring-1 focus:ring-[#000000] font-sans"
                              />
                              <button 
                                type="submit"
                                className="bg-[#000000] hover:bg-[#1a1a1a] text-white px-2.5 py-1 text-xs uppercase font-heading tracking-wider font-bold transition-colors rounded-none shrink-0"
                              >
                                Log
                              </button>
                            </form>

                            {probeLogged && (
                              <div className="text-xs text-[#000000] flex items-center gap-1 font-bold animate-pulse font-sans">
                                <CheckCircle className="w-3 h-3 text-[#000000]" /> Micro-diary entry stored!
                              </div>
                            )}

                            <div className="border-t border-slate-200 pt-2 space-y-1.5 text-left">
                              <span className="text-xs uppercase font-bold text-slate-400 font-mono tracking-widest block">
                                Logged Touchpoint Logs:
                              </span>
                              {probeHistory.length === 0 ? (
                                <span className="text-slate-400 italic block text-xs font-sans">No entries logged yet.</span>
                              ) : (
                                probeHistory.map((h, idx) => (
                                  <div key={idx} className="flex justify-between items-center text-xs bg-white py-0.5 px-2 rounded-none border border-slate-200 font-sans">
                                    <span className="text-slate-700 truncate max-w-[180px]">
                                      {h.emoji} {h.note}
                                    </span>
                                    <span className="text-xs text-slate-400 font-mono">{h.time}</span>
                                  </div>
                                ))
                              )}
                            </div>
                          </div>
                        )}

                        {/* Sandbox 2: Conversation Starters */}
                        {card.id === "conversation-starters" && (
                          <div className="space-y-2">
                            <span className="text-xs font-heading text-slate-500 uppercase tracking-widest block font-bold text-left">
                              Draw Dynamic IDI Prompt:
                            </span>
                            <div className="bg-white border border-slate-200 rounded-none p-2.5 min-h-[50px] flex items-center justify-center text-center font-sans">
                              <p className={`text-slate-800 leading-relaxed italic transition-opacity duration-150 ${promptFade ? "opacity-0" : "opacity-100"}`}>
                                &ldquo;{currentPrompt}&rdquo;
                              </p>
                            </div>
                            <button
                              onClick={handleDrawPrompt}
                              className="w-full flex items-center justify-center gap-1.5 py-2 rounded-none bg-[#000000] hover:bg-[#1a1a1a] text-white font-bold transition-all font-heading text-xs uppercase tracking-widest"
                            >
                              <Sparkles className="w-3.5 h-3.5" /> Draw Another Prompt Card
                            </button>
                          </div>
                        )}

                        {/* Sandbox 3: Behavior Change Engine */}
                        {card.id === "behavior-engine" && (
                          <div className="space-y-2 font-sans">
                            <span className="text-xs font-heading text-slate-500 uppercase tracking-widest block font-bold text-left">
                              Set Simulated Behavioral Data:
                            </span>
                            <div className="space-y-1.5">
                              <div className="flex justify-between items-center text-slate-655 text-xs">
                                <span>Checking Balance:</span>
                                <span className="font-mono text-[#000000] font-bold">${engineBalance}</span>
                              </div>
                              <input 
                                type="range" 
                                min="5" 
                                max="200" 
                                value={engineBalance}
                                onChange={(e) => {
                                  const val = parseInt(e.target.value);
                                  setEngineBalance(val);
                                  calculateEngine(val, engineBills, engineDayOfMonth);
                                }}
                                className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#000000]"
                              />

                              <div className="flex items-center justify-between text-slate-655 text-xs">
                                <span>Frequent Bill Pay?</span>
                                <input 
                                  type="checkbox" 
                                  checked={engineBills}
                                  onChange={(e) => {
                                    const val = e.target.checked;
                                    setEngineBills(val);
                                    calculateEngine(engineBalance, val, engineDayOfMonth);
                                  }}
                                  className="w-3.5 h-3.5 border-slate-350 text-[#000000] focus:ring-0 focus:ring-offset-0 accent-[#000000] cursor-pointer"
                                />
                              </div>

                              <div className="flex justify-between items-center text-slate-655 text-xs">
                                <span>Day of the Month:</span>
                                <span className="font-mono text-[#000000] font-bold">Day {engineDayOfMonth}</span>
                              </div>
                              <input 
                                type="range" 
                                min="1" 
                                max="30" 
                                value={engineDayOfMonth}
                                onChange={(e) => {
                                  const val = parseInt(e.target.value);
                                  setEngineDayOfMonth(val);
                                  calculateEngine(engineBalance, engineBills, val);
                                }}
                                className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#000000]"
                              />
                            </div>

                            <div className="border-t border-slate-200 pt-2 space-y-1 text-left">
                              <div className="flex justify-between items-center text-xs uppercase font-bold tracking-widest font-mono">
                                <span className="text-slate-400">Engine Action:</span>
                                <span className="text-[#000000]">{engineOutput.trigger}</span>
                              </div>
                              <p className="text-slate-600 text-xs leading-relaxed">
                                {engineOutput.desc}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Generic Sandbox Info for other cards */}
                        {card.id !== "culture-probe" && card.id !== "conversation-starters" && card.id !== "behavior-engine" && (
                          <div className="flex items-center justify-center p-2 text-slate-450 italic text-xs font-sans text-center">
                            Methodology validation active. Drag or add card to agenda sequence below to schedule this tool in your design cycle.
                          </div>
                        )}

                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
            </div>
          )}
        </>
      )}

      {/* SECTIONS PANEL: AGENDAS BUILDER & SECURITY SENTINEL */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-12 gap-8 items-stretch mt-12 text-left">
        
        {/* Left 7 Columns: Workshop Builder */}
        <div className="xl:col-span-7 bg-[#faf9f6] border border-slate-200 rounded-none p-6 md:p-8 flex flex-col justify-between">
          <div>
            <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-6 pb-6 border-b border-slate-200 mb-6">
              <div>
                <div className="flex items-center gap-2 text-[#000000] font-mono text-xs uppercase tracking-widest font-bold mb-1">
                  <Briefcase className="w-4 h-4" />
                  Sovereign Session Orchestrator
                </div>
                <h3 className="text-lg md:text-xl font-heading text-slate-900 uppercase tracking-widest font-bold">
                  Workshop Agenda Builder
                </h3>
              </div>

              <div className="flex items-center gap-4 bg-white border border-slate-200 px-4 py-2.5 rounded-none shrink-0">
                <div className="text-center border-r border-slate-200 pr-4">
                  <span className="block text-xl font-heading text-[#000000] font-bold">
                    {workshopCards.length}
                  </span>
                  <span className="text-xs uppercase font-bold text-slate-400 font-mono tracking-widest block">
                    Steps
                  </span>
                </div>
                <div className="text-center">
                  <span className="block text-xl font-heading text-[#000000] font-bold flex items-center gap-1">
                    <Clock className="w-4 h-4 text-[#000000]/70 shrink-0" />
                    {totalWorkshopDuration} <span className="text-xs font-sans font-medium text-slate-500 uppercase tracking-widest">Min</span>
                  </span>
                  <span className="text-xs uppercase font-bold text-slate-400 font-mono tracking-widest block">
                    Length
                  </span>
                </div>
              </div>
            </div>

            {/* WORKSHOP STEPS SEQUENCE */}
            {workshopCards.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 border border-dashed border-slate-300 bg-white/50 text-slate-400 font-sans italic text-xs text-center min-h-[220px]">
                <Layers className="w-8 h-8 text-slate-300 mb-2" />
                No tools added to the agenda sequence yet.<br/>Click &ldquo;+ Agenda&rdquo; on any card above to start structuring your session.
              </div>
            ) : (
              <div className="space-y-4 min-h-[220px]">
                <div className="hidden md:grid grid-cols-12 text-xs uppercase font-bold tracking-widest text-slate-400 font-mono pb-1 px-4">
                  <div className="col-span-1">Seq</div>
                  <div className="col-span-4">Strategic Tool</div>
                  <div className="col-span-3">Category</div>
                  <div className="col-span-3">Duration</div>
                  <div className="col-span-1 text-right">Delete</div>
                </div>

                <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1">
                  {workshopCards.map((item, idx) => (
                    <div 
                      key={item.card.id}
                      className="grid grid-cols-1 md:grid-cols-12 items-center bg-white border border-slate-200 p-3 rounded-none hover:border-[#000000]/60 transition-all gap-2"
                    >
                      {/* Sequence label */}
                      <div className="col-span-1 flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-none bg-slate-900 text-white font-mono text-xs font-bold flex items-center justify-center">
                          {(idx + 1).toString().padStart(2, "0")}
                        </span>
                      </div>

                      {/* Tool title */}
                      <div className="col-span-1 md:col-span-4 text-left">
                        <span className="font-heading text-xs text-slate-950 uppercase tracking-wide font-bold block truncate">
                          {item.card.title}
                        </span>
                        <span className="text-xs text-[#000000] uppercase font-mono tracking-widest font-bold">
                          Card {item.card.num}
                        </span>
                      </div>

                      {/* Category */}
                      <div className="col-span-1 md:col-span-3 text-left">
                        <span className="text-xs text-slate-500 font-sans font-semibold uppercase tracking-wider bg-[#faf9f6] border border-slate-100 px-1.5 py-0.5 block truncate max-w-fit">
                          {item.card.stage}
                        </span>
                      </div>

                      {/* Duration input */}
                      <div className="col-span-1 md:col-span-3 flex items-center gap-1.5">
                        <input 
                          type="range"
                          min="5"
                          max="120"
                          step="5"
                          value={item.duration}
                          onChange={(e) => handleUpdateDuration(item.card.id, parseInt(e.target.value))}
                          className="h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#000000] w-16 shrink-0"
                        />
                        <span className="font-mono text-xs text-slate-900 font-bold bg-[#faf9f6] border border-slate-200 py-0.5 px-1.5 rounded-none shrink-0 w-12 text-center">
                          {item.duration}m
                        </span>
                      </div>

                      {/* Remove Button */}
                      <div className="col-span-1 text-right flex justify-end">
                        <button 
                          onClick={() => handleRemoveFromWorkshop(item.card.id)}
                          className="text-slate-400 hover:text-red-700 transition-colors p-1"
                          title="Remove Step"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ACTION ROW */}
          {workshopCards.length > 0 && (
            <div className="flex flex-col sm:flex-row justify-between items-center pt-4 gap-4 border-t border-slate-200 mt-4">
              <button
                onClick={() => setWorkshopCards([])}
                className="text-slate-400 hover:text-slate-900 font-heading text-xs uppercase tracking-widest font-bold transition-all p-1"
              >
                Clear Agenda Sequence
              </button>

              <button
                onClick={handleExportPlaybook}
                className="bg-[#000000] hover:bg-[#1a1a1a] text-white font-heading text-xs uppercase tracking-widest font-bold py-2.5 px-6 rounded-none transition-all flex items-center justify-center gap-1.5"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Clipboard className="w-3.5 h-3.5" />}
                {copied ? "Copied Playbook!" : "Export Playbook"}
              </button>
            </div>
          )}
        </div>

        {/* Right 5 Columns: Security Sentinel */}
        <div className="xl:col-span-5 bg-[#faf9f6] border border-slate-200 rounded-none p-6 md:p-8 flex flex-col justify-between">
          <div className="space-y-4">
            
            {/* Header */}
            <div className="pb-4 border-b border-slate-200 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-[#000000] font-mono text-xs uppercase tracking-widest font-bold">
                  <Shield className="w-4 h-4 animate-pulse text-[#000000]" />
                  IP Geolocation Shield
                </div>
                <h3 className="text-lg md:text-xl font-heading text-slate-900 uppercase tracking-widest font-bold mt-1">
                  Session Sentinel
                </h3>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs bg-slate-950 text-white font-mono px-2 py-0.5 rounded-none font-bold tracking-widest">
                <span className="w-1.5 h-1.5 bg-green-550 rounded-full animate-ping" />
                ACTIVE
              </span>
            </div>

            {/* Inputs */}
            <div className="space-y-3 font-sans text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">Trusted Location:</span>
                <span className="font-mono text-slate-950 font-bold bg-white border px-2 py-0.5">
                  {MOCK_CITY_DB[currentIp]} ({currentIp})
                </span>
              </div>

              {/* Target Location Select */}
              <div className="flex flex-col gap-1 text-left">
                <label className="text-slate-500 font-medium">Simulated Remote Login Location:</label>
                <select
                  value={targetIp}
                  onChange={(e) => setTargetIp(e.target.value)}
                  className="bg-white border border-slate-200 text-xs rounded-none p-2 focus:outline-none focus:border-[#000000]"
                >
                  <option value="91.74.22.180">Dubai, UAE (IP: 91.74.22.180) - 5,450 km jump</option>
                  <option value="104.244.42.1">San Francisco, USA (IP: 104.244.42.1) - 15,200 km jump</option>
                  <option value="197.248.9.15">Nairobi, Kenya (IP: 197.248.9.15) - 0 km shift</option>
                </select>
              </div>

              {/* Time Gap Slider */}
              <div className="flex flex-col gap-1.5 text-left">
                <div className="flex justify-between">
                  <label className="text-slate-500 font-medium">Time Elapsed Since Last Session:</label>
                  <span className="font-mono text-[#000000] font-bold">
                    {timeGap < 1 
                      ? `${Math.round(timeGap * 60)} Mins` 
                      : `${timeGap.toFixed(1)} Hours`
                    }
                  </span>
                </div>
                <input 
                  type="range"
                  min="0.05"
                  max="12"
                  step="0.05"
                  value={timeGap}
                  onChange={(e) => setTimeGap(parseFloat(e.target.value))}
                  className="h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#000000] w-full"
                />
              </div>

              {/* Action Button */}
              <button
                onClick={handleSimulateLogin}
                className="w-full flex items-center justify-center gap-1.5 py-3 rounded-none border-2 border-slate-900 bg-transparent text-slate-900 font-bold hover:bg-slate-900 hover:text-white transition-all font-heading text-xs uppercase tracking-widest"
              >
                <Activity className="w-4 h-4 shrink-0" />
                Simulate Shift Location Login
              </button>

              {otpSuccess && (
                <div className="text-xs text-green-700 flex items-center justify-center gap-1 font-bold animate-pulse py-1 font-sans">
                  <ShieldCheck className="w-3.5 h-3.5" /> Login approved. Updated trusted location base!
                </div>
              )}
            </div>

            {/* Monospace Logs Screen */}
            <div className="pt-4 border-t border-slate-200">
              <span className="text-xs uppercase font-bold text-slate-400 font-mono tracking-widest block mb-2 text-left">
                Sentinel Security Logs
              </span>
              <div className="bg-slate-950 text-slate-300 font-mono text-xs p-3 rounded-none max-h-[110px] overflow-y-auto space-y-1.5 border border-slate-800 text-left">
                {geoLogs.map((log, idx) => (
                  <div key={idx} className="flex items-start gap-1.5 leading-normal">
                    <span className="text-slate-500">[{log.time}]</span>
                    <span className={log.status === "failed" ? "text-red-400 font-bold" : "text-green-400"}>
                      {log.status === "failed" ? "CRIT" : "INFO"}:
                    </span>
                    <span>
                      <strong>{log.event}</strong> - {log.details}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* PREMIUM PAYWALL MODAL */}
      {showPaywallModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-md">
          <div className="bg-white border-2 border-[#000000] p-8 max-w-lg w-full text-center relative rounded-none flex flex-col justify-center shadow-2xl">
            <div className="w-12 h-12 bg-[#faf9f6] border border-[#000000]/30 text-[#000000] flex items-center justify-center mx-auto mb-6 rounded-none">
              <Lock className="w-6 h-6" />
            </div>

            <span className="text-xs uppercase font-bold tracking-widest text-[#000000] font-mono block mb-1">
              Curriculum Premium Lock
            </span>
            <h3 className="text-xl md:text-2xl font-heading text-slate-905 uppercase tracking-widest mb-4 font-bold">
              Locked Behind Sovereign Builder Pass
            </h3>
            
            <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-6 font-sans">
              The card <strong className="text-slate-950 font-bold">&ldquo;{lockedCardAttempted}&rdquo;</strong> and other 41 strategic design tools are premium course downloads. Unlock full access to the complete 44-card interactive deck, custom agendas builder, and B2B playbook templates by upgrading.
            </p>

            <div className="bg-[#faf9f6] border border-slate-200 rounded-none p-4 text-xs font-sans text-left space-y-2 mb-8">
              <div className="flex gap-2">
                <span className="text-[#000000] font-bold select-none">•</span>
                <span className="text-slate-655 font-medium">Access full high-res catalog profiles for 44 cards.</span>
              </div>
              <div className="flex gap-2">
                <span className="text-[#000000] font-bold select-none">•</span>
                <span className="text-slate-655 font-medium">Export unlimited structured agendas as developer briefs.</span>
              </div>
              <div className="flex gap-2">
                <span className="text-[#000000] font-bold select-none">•</span>
                <span className="text-slate-655 font-medium">Unlock the MMF interest sweep and micro-lending code sandbox engine.</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center">
              <button
                onClick={() => setShowPaywallModal(false)}
                className="bg-transparent border border-slate-300 text-slate-600 hover:border-slate-800 py-3.5 px-6 rounded-none text-xs uppercase font-heading tracking-widest font-bold transition-all"
              >
                Close Dialog
              </button>

              <a
                href="#pricing"
                onClick={() => setShowPaywallModal(false)}
                className="bg-[#000000] hover:bg-[#1a1a1a] text-white py-3.5 px-6 rounded-none text-xs uppercase font-heading tracking-widest font-bold transition-all flex items-center justify-center gap-1"
              >
                Upgrade to Sovereign Pass <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}

// Simple internal Eye component matching name check
function EyeIcon({ className }: { className?: string }) {
  return (
    <svg 
      className={className}
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
