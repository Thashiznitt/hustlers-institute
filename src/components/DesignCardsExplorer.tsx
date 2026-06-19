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
  ArrowRight
} from "lucide-react";

interface CardData {
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

const cardsList: CardData[] = [
  // 1. RESEARCH SECTION (8 cards)
  {
    id: "interviews",
    num: "01",
    title: "Interviews",
    stage: "Research",
    category: "Qualitative Context Extraction",
    frontDesc: "Conduct structural, open-ended dialogues to capture lived experiences and underlying motivations.",
    objective: "Uncover deep user needs, pain points, and systemic frictions by guiding conversations past surface-level answers.",
    deployment: [
      "Define standard focus themes and recruit target demographic profiles.",
      "Draft open-ended prompts avoiding leading questions (e.g. 'Tell me about the last time...').",
      "Record audio/notes, extract verbatim quotes, and map emotional triggers."
    ],
    isLocked: true
  },
  {
    id: "people-shadowing",
    num: "02",
    title: "People Shadowing",
    stage: "Research",
    category: "Observational Research",
    frontDesc: "Observe users in their native context without interference to capture actual behavioral workflows.",
    objective: "Extract non-verbal behaviors, workarounds, and implicit friction points that users fail to self-report in standard interviews.",
    deployment: [
      "Secure consent to tag along during the user's natural daily workflow.",
      "Maintain a passive distance and log step-by-step actions, tools used, and pauses.",
      "Debrief immediately after to clarify observed workarounds or visible frustrations."
    ],
    isLocked: true
  },
  {
    id: "culture-probe",
    num: "03",
    title: "Culture Probes",
    stage: "Research",
    category: "Qualitative Self-Reporting",
    frontDesc: "Extract authentic daily user behaviors through non-invasive self-reporting loops.",
    objective: "Gather rich, qualitative user context directly at the moment of experience, bypassing standard interview bias.",
    deployment: [
      "Distribute digital or physical micro-diaries to a representative cohort.",
      "Instruct users to log a simple emotional trigger (via emoji) at the exact moment they perform a key action.",
      "Synthesize logs into touchpoint emotional heatmaps for product feature mapping."
    ],
    isLocked: false // PREVIEW CARD
  },
  {
    id: "primary-research",
    num: "04",
    title: "Primary Research",
    stage: "Research",
    category: "Empirical Studies",
    frontDesc: "Gather direct, first-hand data from target users to validate specific behavioral hypotheses.",
    objective: "Obtain clean, proprietary data points directly aligned with the core product validation metrics.",
    deployment: [
      "Draft structural study protocols matching validation hypotheses.",
      "Select appropriate methods (focus groups, contextual inquiries, direct observation).",
      "Synthesize raw qualitative data into immediate backlog prioritization inputs."
    ],
    isLocked: true
  },
  {
    id: "desk-research",
    num: "05",
    title: "Desk Research",
    stage: "Research",
    category: "Secondary Studies",
    frontDesc: "Analyze existing studies, market indices, and secondary datasets to establish baseline context.",
    objective: "Build a comprehensive baseline understanding of industry standards, regulatory guardrails, and competitor benchmarks.",
    deployment: [
      "Audit published research reports, central bank guidelines, and case studies.",
      "Extract relevant statistics, compliance frameworks, and historical product failure indicators.",
      "Publish a synthesized review mapping constraints and macro opportunities."
    ],
    isLocked: true
  },
  {
    id: "trend-research",
    num: "06",
    title: "Trend Research",
    stage: "Research",
    category: "Strategic Forecasting",
    frontDesc: "Identify emerging tech, social shift vectors, and macro-economic trends shaping user expectations.",
    objective: "Future-proof product roadmap cycles by designing systems optimized for long-term behavioral adaptation.",
    deployment: [
      "Track leading tech changes and regulatory expansions (e.g. open banking mandates).",
      "Evaluate usage pattern trajectories among early adopters and demographic shifts.",
      "Define strategic entry opportunities for the core product monetization runway."
    ],
    isLocked: true
  },
  {
    id: "photo-studies",
    num: "07",
    title: "Photo Studies",
    stage: "Research",
    category: "Visual Ethnography",
    frontDesc: "Instruct users to document physical friction points and environmental contexts via photography.",
    objective: "Extract spatial contexts, environmental constraints, and hidden desktop/mobile usage habits.",
    deployment: [
      "Provide clear photo logging criteria to research participants.",
      "Instruct users to snap photos of specific workspaces, payment terminals, or bills.",
      "Analyze visual contexts to isolate accessibility barriers and design interface sizes accordingly."
    ],
    isLocked: true
  },
  {
    id: "diaries",
    num: "08",
    title: "Diaries",
    stage: "Research",
    category: "Longitudinal Context Tracking",
    frontDesc: "Collect ongoing user reflections, transactions, and habits over an extended timeline.",
    objective: "Understand habit formation trajectories and tracking long-term friction drops or retention trends.",
    deployment: [
      "Onboard users to a lightweight daily tracking channel (digital form or text ledger).",
      "Send daily micro-prompts requesting inputs on product usability or transactional events.",
      "Audit completion levels weekly and synthesize reports at sprint boundaries."
    ],
    isLocked: true
  },

  // 2. SYNTHESIS SECTION (10 cards)
  {
    id: "stakeholder-maps",
    num: "09",
    title: "Stakeholder Maps",
    stage: "Synthesis",
    category: "Systems Mapping",
    frontDesc: "Identify and map the relationships between key actors, compliance bodies, and users.",
    objective: "Expose hidden operational dependencies and political dynamics before product architecture begins.",
    deployment: [
      "Brainstorm all individuals, organizations, and compliance bodies touching the product lifecycle.",
      "Cluster stakeholders into concentric zones of influence (core, direct, external).",
      "Draw lines of value exchange (money, data, expectations) to isolate potential system bottlenecks."
    ],
    isLocked: true
  },
  {
    id: "semantic-analysis",
    num: "10",
    title: "Semantic Analysis",
    stage: "Synthesis",
    category: "Cognitive Alignment",
    frontDesc: "Deconstruct the language, terminologies, and definitions used by domain experts and users.",
    objective: "Bridge the semantic gap between legacy systems terminology and real-world user mental models.",
    deployment: [
      "Audit target vocabulary across focus interviews and user manuals.",
      "Isolate terminology mismatch patterns (e.g. 'checking account' vs 'mobile wallet').",
      "Standardize taxonomy definitions inside the code-level dictionary files."
    ],
    isLocked: true
  },
  {
    id: "system-map",
    num: "11",
    title: "System Map",
    stage: "Synthesis",
    category: "Ecosystem Architecture",
    frontDesc: "Draft a high-level operational map detailing data layers, servers, integrations, and user endpoints.",
    objective: "Align design logic directly with bare-metal database limits, APIs, and network latency guardrails.",
    deployment: [
      "Detail primary user interaction touchpoints and trace data requests.",
      "Map cloud storage networks, edge-routers, and relational schema connections.",
      "Review maps with lead engineers to optimize database queries for major campaigns."
    ],
    isLocked: true
  },
  {
    id: "empathy-map",
    num: "12",
    title: "Empathy Map",
    stage: "Synthesis",
    category: "User Empathy Syntheses",
    frontDesc: "Structure qualitative research into quadrants mapping user saying, thinking, doing, and feeling.",
    objective: "Synthesize scattered research narratives into a clear, unified focus resource for engineering sprints.",
    deployment: [
      "Gather interview and shadowing data on a shared canvas.",
      "Sort findings into Say, Think, Do, and Feel quadrants.",
      "Extract deep contradictions between what users say vs what they actually do."
    ],
    isLocked: true
  },
  {
    id: "journey-map",
    num: "13",
    title: "Journey Map",
    stage: "Synthesis",
    category: "Workflow Mapping",
    frontDesc: "Outline step-by-step user interactions across a product timeline, mapping pain points and opportunities.",
    objective: "Identify operational drop-offs, visual friction peaks, and areas requiring immediate habit change prompts.",
    deployment: [
      "Define standard user scenario starting and ending boundaries.",
      "List sequential steps, active touchpoints, and corresponding user actions.",
      "Plot emotional status charts to isolate friction peaks and document design recommendations."
    ],
    isLocked: true
  },
  {
    id: "experience-map",
    num: "14",
    title: "Experience Map",
    stage: "Synthesis",
    category: "Contextual Journeys",
    frontDesc: "Model the generalized human experience of achieving a goal, independent of any specific product.",
    objective: "Analyze human behavior variables in their raw state to identify baseline product spaces.",
    deployment: [
      "Select a macro goal (e.g. 'saving money for school fees').",
      "Document standard user actions, choices, and friction areas across channels.",
      "Isolate high-friction sectors where digital integrations can automate manual steps."
    ],
    isLocked: true
  },
  {
    id: "end-user-maps",
    num: "15",
    title: "End User Maps",
    stage: "Synthesis",
    category: "Demographic Cluster Mapping",
    frontDesc: "Segment user cohorts based on digital competency levels and infrastructural realities.",
    objective: "Ensure product UX remains highly accessible across varied devices, screen sizes, and data constraints.",
    deployment: [
      "Audit target device types, internet speeds, and average data costs in deployment zones.",
      "Define user groups spanning tech-literate adapters to friction-sensitive novices.",
      "Draft interface design guardrails optimized for low-spec environments."
    ],
    isLocked: true
  },
  {
    id: "org-charts",
    num: "16",
    title: "Org Charts",
    stage: "Synthesis",
    category: "Operational Governance",
    frontDesc: "Map the internal organization structure of B2B enterprise clients.",
    objective: "Streamline the product onboarding flow by aligning administrative permission hierarchies natively.",
    deployment: [
      "Review client organization charts to identify core decision makers.",
      "Map user access levels (super admin, supervisor, staff) matching client compliance rules.",
      "Design dashboard configurations that match operational realities."
    ],
    isLocked: true
  },
  {
    id: "themes",
    num: "17",
    title: "Themes",
    stage: "Synthesis",
    category: "Affinity Mapping",
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
    title: "2 by 2 Axis",
    stage: "Synthesis",
    category: "Strategic Prioritization",
    frontDesc: "Map product features, research findings, or ideas along two contrasting vectors.",
    objective: "Expose high-value gaps and establish immediate feature prioritization structures.",
    deployment: [
      "Select contrasting axes (e.g. 'Impact' vs 'Implementation Complexity').",
      "Plot backlog features on the quadrant map.",
      "Prioritize high-impact, low-complexity options for immediate sprint releases."
    ],
    isLocked: true
  },

  // 3. IDEATION & STRATEGY SECTION (9 cards)
  {
    id: "point-of-view",
    num: "19",
    title: "Point of View",
    stage: "Ideation",
    category: "Problem Definition",
    frontDesc: "Synthesize user, need, and insight insights into a structured problem definition statement.",
    objective: "Avoid generic product feature bloat by locking down a precise, validated design challenge focus.",
    deployment: [
      "Select a target user group, their specific need, and a key research insight.",
      "Draft the statement: '[User group] needs a way to [need] because [insight].'",
      "Share statement with steering committees to confirm focus before design sprints."
    ],
    isLocked: true
  },
  {
    id: "hmw-questions",
    num: "20",
    title: "HMW Questions",
    stage: "Ideation",
    category: "Challenge Framing",
    frontDesc: "Translate insights and problem definitions into actionable, open-ended design prompts.",
    objective: "Open up multiple design spaces by reframing systemic barriers into proactive solution invitations.",
    deployment: [
      "Select a key friction point from the Stakeholder Map or Point of View card.",
      "Brainstorm multiple: 'How might we...' questions addressing different aspects of the issue.",
      "Select top questions to guide rapid sketching and wireframe sprints."
    ],
    isLocked: true
  },
  {
    id: "golden-circle",
    num: "21",
    title: "Golden Circle",
    stage: "Ideation",
    category: "Vision Alignment",
    frontDesc: "Establish core product objectives using Simon Sinek's Why, How, and What structure.",
    objective: "Align product teams and stakeholder boards on the underlying purpose before engineering logic.",
    deployment: [
      "Define the 'Why': The fundamental belief or core purpose driving the product.",
      "Outline the 'How': The unique operational methodology or compliance-driven UX setup.",
      "Detail the 'What': The concrete digital interface, feature stack, and transaction engine."
    ],
    isLocked: true
  },
  {
    id: "heaven-and-hell",
    num: "22",
    title: "Heaven & Hell",
    stage: "Ideation",
    category: "Risk Mitigation",
    frontDesc: "Simulate the absolute best and worst launch scenarios to map structural safety loops.",
    objective: "Expose infrastructural failure points and compliance risks before writing code.",
    deployment: [
      "Assemble the core design, engineering, and compliance stakeholders.",
      "Map 'Hell': Detail the worst errors, user churn events, server crashes, or compliance breaches.",
      "Map 'Heaven': Detail seamless onboarding flows, transaction records, and viral growth.",
      "Design target fallback protocols to prevent the mapped failure scenarios."
    ],
    isLocked: true
  },
  {
    id: "idea-fridge",
    num: "23",
    title: "Idea Fridge",
    stage: "Ideation",
    category: "Backlog Management",
    frontDesc: "Store interesting but out-of-scope ideas for future review iterations.",
    objective: "Maintain sprint focus by housing cool features safely away from immediate release backlogs.",
    deployment: [
      "Identify high-energy ideas that fall outside the current MVP boundaries.",
      "Write them down on cards and store them inside the 'Idea Fridge' database.",
      "Review the fridge contents during quarterly roadmap updates."
    ],
    isLocked: true
  },
  {
    id: "idea-napkin",
    num: "24",
    title: "Idea Napkin",
    stage: "Ideation",
    category: "Concept Framing",
    frontDesc: "Draft raw product concepts on a single page, detailing the core benefit and visual shape.",
    objective: "Force absolute simplicity when pitching concepts to non-technical partners.",
    deployment: [
      "Explain the concept name, target audience, and primary benefit in under 3 sentences.",
      "Sketch a quick visual wireframe showing the core user interaction flow.",
      "Distribute napkins to stakeholders for immediate vote evaluations."
    ],
    isLocked: true
  },
  {
    id: "idea-shopping",
    num: "25",
    title: "Idea Shopping",
    stage: "Ideation",
    category: "Workshop Valuation",
    frontDesc: "Run a simulated market economy where users buy their preferred product features.",
    objective: "Obtain reliable feature value metrics by forcing users to work within budget limits.",
    deployment: [
      "Assign virtual cash points to workshop participants.",
      "List prioritize features with realistic price tags based on engineering hours.",
      "Instruct users to purchase features, analyzing spending habits to prioritize roadmap items."
    ],
    isLocked: true
  },
  {
    id: "elevator-pitch",
    num: "26",
    title: "Elevator Pitch",
    stage: "Ideation",
    category: "Value Proposition",
    frontDesc: "Synthesize product value, audience, and differentiator into a 30-second summary statement.",
    objective: "Unify the target marketing message and align development focus.",
    deployment: [
      "Draft the pitch: 'For [audience] who [need], [product] is a [category] that [benefit].'",
      "Refine the statement to fit within a single, natural breath.",
      "Train front-facing teams to repeat this pitch when engaging prospective users."
    ],
    isLocked: true
  },
  {
    id: "brainstorming",
    num: "27",
    title: "Brainstorming",
    stage: "Ideation",
    category: "Concept Generation",
    frontDesc: "Run structured high-velocity ideation sprints to generate multiple solution concepts.",
    objective: "Unblock creative paths by prioritizing concept quantity over quality in early stages.",
    deployment: [
      "Set a clear focus challenge prompt (e.g. 'How do we design a 3-click loan?').",
      "Enforce rules: defer judgment, encourage wild ideas, and build on other concepts.",
      "Synthesize ideas immediately after using dot-voting grids."
    ],
    isLocked: true
  },

  // 4. PROTOTYPING & CO-DESIGN SECTION (17 cards)
  {
    id: "card-sorting",
    num: "28",
    title: "Card Sorting",
    stage: "Prototyping",
    category: "Information Architecture",
    frontDesc: "Instruct users to group interface items and menu lists into category clusters.",
    objective: "Design menu hierarchies and navigation trees matching user logic structures.",
    deployment: [
      "List product screens, tools, or settings on physical or digital cards.",
      "Ask users to organize cards into groups and assign descriptive category names.",
      "Analyze card cluster overlaps to code the primary sitemap navigation structure."
    ],
    isLocked: true
  },
  {
    id: "world-cafe",
    num: "29",
    title: "World Cafe",
    stage: "Prototyping",
    category: "Collaborative Co-Design",
    frontDesc: "Host structured group dialogues across rotating tables to solve complex design challenges.",
    objective: "Harvest collective intelligence and align stakeholder requirements in high-friction ecosystems.",
    deployment: [
      "Set up tables with specific problem focus points and assign a table host.",
      "Rotate participants across tables every 20 minutes to cross-pollinate ideas.",
      "Synthesize table host logs into clear systemic product recommendations."
    ],
    isLocked: true
  },
  {
    id: "workshops",
    num: "30",
    title: "Workshops",
    stage: "Prototyping",
    category: "Design Co-Creation",
    frontDesc: "Facilitate structured co-creation sprints bringing users, designers, and devs together.",
    objective: "De-risk development sprint cycles by mapping operational realities early in the process.",
    deployment: [
      "Define clean workshop agendas, constraints, and target outcomes.",
      "Run interactive design sessions, prototyping directly alongside developers.",
      "Map consensus features to the sprint planning backlog."
    ],
    isLocked: true
  },
  {
    id: "role-playing",
    num: "31",
    title: "Role Playing",
    stage: "Prototyping",
    category: "Scenario Validation",
    frontDesc: "Act out target user scenarios and customer service interactions physically.",
    objective: "Simulate operational workflows and service delivery models prior to engineering.",
    deployment: [
      "Assign roles: the customer, in-store merchant, customer agent, and database backend.",
      "Enact onboarding, transaction errors, and offline fallback scenarios.",
      "Log friction states and implement corrective visual interface warnings."
    ],
    isLocked: true
  },
  {
    id: "graphic-recording",
    num: "32",
    title: "Graphic Recording",
    stage: "Prototyping",
    category: "Visual Synthesis",
    frontDesc: "Translate complex system discussions into visual diagrams live during meetings.",
    objective: "Align multi-disciplinary corporate boards who struggle with long text documents.",
    deployment: [
      "Capture key ideas and data flows visually on large boards during workshops.",
      "Translate discussions into clean flow diagrams, symbols, and connections.",
      "Digitize the graphic canvas and export to project documentation spaces."
    ],
    isLocked: true
  },
  {
    id: "props",
    num: "33",
    title: "Props",
    stage: "Prototyping",
    category: "Physical Simulation",
    frontDesc: "Build simple physical models of the product context (e.g. mock terminal boxes).",
    objective: "Observe how physical environments shape transactional usage habits.",
    deployment: [
      "Construct simple physical models representing terminals or payment spaces.",
      "Instruct users to interact with mock tools under environmental stress.",
      "Isolate hardware-software alignment issues and modify interfaces accordingly."
    ],
    isLocked: true
  },
  {
    id: "legos",
    num: "34",
    title: "LEGOs",
    stage: "Prototyping",
    category: "Metaphorical Prototyping",
    frontDesc: "Use physical bricks to build structural models representing workflows or systems.",
    objective: "Allow teams to visualize abstract concepts and system relationships physically.",
    deployment: [
      "Introduce a focus system challenge (e.g. 'Build the path from registration to pay').",
      "Instruct participants to build metaphorical structures using LEGO bricks.",
      "Discuss physical models to uncover systemic dependencies and data limits."
    ],
    isLocked: true
  },
  {
    id: "collage",
    num: "35",
    title: "Collage",
    stage: "Prototyping",
    category: "Emotional Expression",
    frontDesc: "Instruct users to assemble visual cuts reflecting their emotional aspirations.",
    objective: "Capture deep user aesthetic desires and underlying emotional expectations.",
    deployment: [
      "Provide users with image magazines, textures, and keywords.",
      "Ask them to build a collage reflecting how they feel about financial security.",
      "Deconstruct chosen colors and shapes to guide design theme palettes."
    ],
    isLocked: true
  },
  {
    id: "mood-board",
    num: "36",
    title: "Mood Board",
    stage: "Prototyping",
    category: "Visual Direction",
    frontDesc: "Compile colors, layouts, typography, and interface inspirations onto a direction board.",
    objective: "Align stakeholders on the visual tone before wireframing UI libraries.",
    deployment: [
      "Research high-end visual styles and architectural layouts.",
      "Arrange layout, typographic, color, and icon system directions.",
      "Present mood boards to steer visual design alignments before interface sprints."
    ],
    isLocked: true
  },
  {
    id: "team-journey",
    num: "37",
    title: "Team Journey",
    stage: "Prototyping",
    category: "Operational Roadmapping",
    frontDesc: "Map the internal delivery journey, team milestones, and communication nodes.",
    objective: "Prevent operational delays by aligning cross-functional teams on sprint timelines.",
    deployment: [
      "Map development phases, test cycles, compliance gates, and launches.",
      "Assign responsibilities across design, engineering, and product teams.",
      "Review maps during weekly syncs to coordinate resource allocation."
    ],
    isLocked: true
  },
  {
    id: "pitch-deck",
    num: "38",
    title: "Pitch Deck",
    stage: "Prototyping",
    category: "Investor Communication",
    frontDesc: "Create a structured visual deck pitching product viability, strategy, and GTM plans.",
    objective: "Secure venture funding or internal corporate resources for pilot launches.",
    deployment: [
      "Structure the deck: Problem, Solution, Demo, Market Size, Monetization, and Team.",
      "Embed clean metrics proof-points from initial user research pilots.",
      "Present decks to steering committees or angel investment syndicates."
    ],
    isLocked: true
  },
  {
    id: "feedback-grid",
    num: "39",
    title: "Feedback Grid",
    stage: "Prototyping",
    category: "Validation Review",
    frontDesc: "Record feedback on prototypes using a grid mapping positive, criticism, questions, and ideas.",
    objective: "Structure user feedback to guide quick adjustments between sprint cycles.",
    deployment: [
      "Divide a board into four quadrants: Likes, Criticisms, Questions, and New Ideas.",
      "Record user feedback post-usability test sessions onto the grid.",
      "Synthesize grid items to update the development backlog."
    ],
    isLocked: true
  },
  {
    id: "future-scenarios",
    num: "40",
    title: "Future Scenarios",
    stage: "Prototyping",
    category: "Strategic Planning",
    frontDesc: "Map potential market changes and regulatory shifts to design product adapters.",
    objective: "Protect product viability against sudden market shifts or compliance additions.",
    deployment: [
      "Brainstorm potential macro shifts (e.g. cash bans, transaction fee mandates).",
      "Model how the product stack will adjust to remain operational.",
      "Design flexible system architectures that accommodate changing data requirements."
    ],
    isLocked: true
  },
  {
    id: "experience-journey",
    num: "41",
    title: "Experience Journey",
    stage: "Prototyping",
    category: "Ecosystem Verification",
    frontDesc: "Map step-by-step user interactions across multiple channels, including offline transitions.",
    objective: "Ensure seamless transaction routing and context mapping outside the device screen.",
    deployment: [
      "Define standard user scenario starting and ending boundaries.",
      "List sequential steps, active touchpoints, and corresponding user actions.",
      "Design fallback channels for offline transitions or merchant locations."
    ],
    isLocked: true
  },
  {
    id: "conversation-starters",
    num: "42",
    title: "Conversation Starters",
    stage: "Prototyping",
    category: "Stakeholder Alignment",
    frontDesc: "Bypass shallow feedback and tap into deep user memory structures during focus groups.",
    objective: "Shift workshop dialogues away from generic feature wish-lists into deep, emotional stories.",
    deployment: [
      "Shuffle the prompt deck before beginning stakeholder workshops or IDIs.",
      "Instead of asking, 'What features do you want?', draw a strategic prompt card.",
      "Use response narratives to map hidden user workflow dependencies."
    ],
    isLocked: false // PREVIEW CARD
  },
  {
    id: "behavior-engine",
    num: "43",
    title: "Behavior Change Engine",
    stage: "Prototyping",
    category: "Fintech Cross-Sell Strategy",
    frontDesc: "Synthesize behavioral analysis with backend analytics to drive predictive product adoption.",
    objective: "Bridge qualitative user maps with database triggers, launching services at the moment of highest receptivity.",
    deployment: [
      "Define standard user behavior segments using Tableau databases.",
      "Set micro-triggers for specific transaction combinations (e.g. utility pay + cash dip).",
      "Deploy custom in-app notifications offering secondary services, securing higher conversions."
    ],
    isLocked: false // PREVIEW CARD
  },
  {
    id: "my-top-5",
    num: "44",
    title: "My Top 5",
    stage: "Prototyping",
    category: "Feature Prioritization",
    frontDesc: "Instruct users to select and rank their top 5 core features from a larger pool.",
    objective: "Isolate high-value product vectors and prevent scope bloat in MVP configurations.",
    deployment: [
      "Present participants with a card array of all proposed features.",
      "Instruct users to select their top 5 absolute must-have cards.",
      "Ask users to rank selected cards 1-5, documenting their prioritization logic."
    ],
    isLocked: true
  }
];

export default function DesignCardsExplorer() {
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
    return cardsList.filter((card) => {
      const matchesTab = activeTab === "All" || card.stage === activeTab;
      const matchesSearch = card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            card.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            card.frontDesc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery]);

  const handleCardClick = (card: CardData) => {
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
    const playbookText = `SOVEREIGN PRODUCT ARCHITECT - WORKSHOP SESSION PLAYBOOK
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
Generated via Hustlers Institute Design Card Builder.
`;
    navigator.clipboard.writeText(playbookText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="w-full px-6 md:px-16 lg:px-24 py-20 bg-white border-b border-slate-200" id="toolkit">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div className="flex flex-col items-start text-left max-w-3xl">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono mb-2">
            Design Stack Registry
          </span>
          <h2 className="text-3xl md:text-5xl font-heading text-slate-900 uppercase tracking-widest mb-4">
            Strategic Design Toolkit
          </h2>
          <p className="text-slate-500 text-lg font-sans">
            Explore 44 daily operational toolcards from the masterclass portfolio. Filter, click to flip, sandbox previews, and build custom workshop structures.
          </p>
        </div>

        {/* DEMO BYPASS SWITCH */}
        <div className="flex items-center gap-3 bg-[#faf9f6] border border-slate-200 p-3 shrink-0 rounded-none">
          <div className="flex flex-col text-left">
            <span className="text-[9px] uppercase font-bold text-slate-500 font-mono tracking-widest">
              Audit Mode
            </span>
            <span className="text-[10px] text-slate-400 font-sans">
              Simulate Paywall Unlock
            </span>
          </div>
          <button
            onClick={() => setSimulateUnlock(!simulateUnlock)}
            className={`w-12 h-6 flex items-center p-0.5 transition-all duration-300 rounded-none ${
              simulateUnlock ? "bg-[#b59a7c]" : "bg-slate-300"
            }`}
          >
            <div className={`w-5 h-5 bg-white shadow-sm transition-transform duration-300 rounded-none flex items-center justify-center ${
              simulateUnlock ? "translate-x-6" : "translate-x-0"
            }`}>
              {simulateUnlock ? <Unlock className="w-3 h-3 text-[#b59a7c]" /> : <Lock className="w-3 h-3 text-slate-400" />}
            </div>
          </button>
        </div>
      </div>

      {/* FILTER & SEARCH ROW */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 justify-between items-center mb-10 pb-6 border-b border-slate-200">
        
        {/* Phase selection tabs */}
        <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
          {["All", "Research", "Synthesis", "Ideation", "Prototyping"].map((tab) => {
            const isActive = activeTab === tab;
            const count = tab === "All" 
              ? cardsList.length 
              : cardsList.filter(c => c.stage === tab).length;
            
            return (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setFlippedCard(null);
                }}
                className={`px-4 py-2 text-xs font-heading uppercase tracking-widest transition-all rounded-none border ${
                  isActive 
                    ? "border-[#b59a7c] bg-[#faf9f6] text-[#b59a7c] font-bold" 
                    : "border-slate-200 hover:border-slate-400 text-slate-500 bg-transparent"
                }`}
              >
                {tab === "All" ? "All Phases" : tab} ({count})
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full lg:w-80">
          <input
            type="text"
            placeholder="Search 44 card methods..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-200 text-xs px-10 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#b59a7c] focus:ring-1 focus:ring-[#b59a7c] rounded-none font-sans"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
        </div>
      </div>

      {/* CARDS GRID */}
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
                <div className="absolute inset-0 w-full h-full rounded-none bg-[#faf9f6]/40 border border-slate-200 p-6 flex flex-col [backface-visibility:hidden] overflow-hidden hover:border-[#b59a7c] hover:bg-white transition-all duration-300">
                  
                  {/* Top bar */}
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[9px] text-[#b59a7c] uppercase tracking-widest font-mono font-bold block mb-0.5">
                        {card.stage} PHASE
                      </span>
                      <span className="text-[9px] text-slate-400 font-mono uppercase tracking-wider block">
                        {card.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {isLocked && <Lock className="w-3.5 h-3.5 text-[#b59a7c]/60" />}
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
                        <div className="bg-white border border-[#b59a7c]/40 text-[#b59a7c] px-3 py-1.5 text-[8px] uppercase tracking-widest font-mono font-bold flex items-center gap-1">
                          <Lock className="w-2.5 h-2.5" /> Locked
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-center text-left">
                    <h3 className="text-base font-heading text-slate-900 uppercase mb-1 leading-tight tracking-widest font-bold flex items-center gap-2">
                      {card.title}
                    </h3>
                    <p className="text-slate-650 text-[11px] leading-relaxed font-sans font-medium">
                      {card.frontDesc}
                    </p>
                  </div>

                  {/* Bottom bar */}
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-4 border-t border-slate-100 font-sans mt-auto">
                    <span className="flex items-center gap-1 text-slate-500 hover:text-slate-900 font-medium">
                      <EyeIcon className="w-3.5 h-3.5 text-[#b59a7c]" /> Click to flip & explore
                    </span>
                    <button
                      onClick={(e) => handleAddToWorkshop(card, e)}
                      className="bg-transparent border border-[#b59a7c]/30 text-[#b59a7c] hover:bg-[#b59a7c] hover:text-white px-2.5 py-1 text-[8px] font-mono font-bold uppercase tracking-widest transition-all rounded-none"
                    >
                      + Agenda
                    </button>
                  </div>
                </div>

                {/* Back Side */}
                <div className="absolute inset-0 w-full h-full rounded-none bg-white border-2 border-[#b59a7c] p-5 flex flex-col justify-between [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-y-auto"
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
                      <RotateCw className="w-4 h-4 text-[#b59a7c]" />
                    </button>
                  </div>

                  {/* Details */}
                  <div className="text-xs text-slate-655 space-y-2.5 my-3 font-sans font-medium text-left">
                    <p className="leading-relaxed">
                      <strong className="text-slate-900 uppercase font-heading text-[10px] tracking-widest block font-bold mb-1">Objective:</strong>
                      {card.objective}
                    </p>
                    <div>
                      <strong className="text-slate-900 uppercase font-heading text-[10px] tracking-widest block font-bold mb-1">Field Deployment:</strong>
                      <ol className="list-decimal pl-4 space-y-1 text-slate-500 leading-snug">
                        {card.deployment.map((step, idx) => (
                          <li key={idx}>{step}</li>
                        ))}
                      </ol>
                    </div>
                  </div>

                  {/* Dynamic Sandbox Section */}
                  <div className="bg-[#faf9f6]/70 border border-slate-200 rounded-none p-3 text-xs mt-auto">
                    
                    {/* Sandbox 1: Culture Probe */}
                    {card.id === "culture-probe" && (
                      <div className="space-y-2">
                        <span className="text-[10px] font-heading text-slate-500 uppercase tracking-widest block font-bold text-left">
                          Interactive Logger:
                        </span>
                        <form onSubmit={handleLogProbe} className="flex gap-2">
                          <select 
                            value={probeEmoji}
                            onChange={(e) => setProbeEmoji(e.target.value)}
                            className="bg-white border border-slate-200 text-base rounded-none px-1.5 focus:outline-none focus:border-[#b59a7c] focus:ring-1 focus:ring-[#b59a7c] font-sans"
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
                            className="bg-white border border-slate-200 rounded-none px-2 py-1 text-slate-800 placeholder-slate-400 w-full focus:outline-none focus:border-[#b59a7c] focus:ring-1 focus:ring-[#b59a7c] font-sans"
                          />
                          <button 
                            type="submit"
                            className="bg-[#b59a7c] hover:bg-[#a3886b] text-white px-2.5 py-1 text-[10px] uppercase font-heading tracking-wider font-bold transition-colors rounded-none shrink-0"
                          >
                            Log
                          </button>
                        </form>

                        {probeLogged && (
                          <div className="text-[10px] text-[#b59a7c] flex items-center gap-1 font-bold animate-pulse font-sans">
                            <CheckCircle className="w-3 h-3 text-[#b59a7c]" /> Micro-diary entry stored!
                          </div>
                        )}

                        <div className="border-t border-slate-200 pt-2 space-y-1.5 text-left">
                          <span className="text-[9px] uppercase font-bold text-slate-400 font-mono tracking-widest block">
                            Logged Touchpoint Logs:
                          </span>
                          {probeHistory.length === 0 ? (
                            <span className="text-slate-400 italic block text-[10px] font-sans">No entries logged yet.</span>
                          ) : (
                            probeHistory.map((h, idx) => (
                              <div key={idx} className="flex justify-between items-center text-[10px] bg-white py-0.5 px-2 rounded-none border border-slate-200 font-sans">
                                <span className="text-slate-700 truncate max-w-[180px]">
                                  {h.emoji} {h.note}
                                </span>
                                <span className="text-[8px] text-slate-400 font-mono">{h.time}</span>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    )}

                    {/* Sandbox 2: Conversation Starters */}
                    {card.id === "conversation-starters" && (
                      <div className="space-y-2">
                        <span className="text-[10px] font-heading text-slate-500 uppercase tracking-widest block font-bold text-left">
                          Draw Dynamic IDI Prompt:
                        </span>
                        <div className="bg-white border border-slate-200 rounded-none p-2.5 min-h-[50px] flex items-center justify-center text-center font-sans">
                          <p className={`text-slate-800 leading-relaxed italic transition-opacity duration-150 ${promptFade ? "opacity-0" : "opacity-100"}`}>
                            &ldquo;{currentPrompt}&rdquo;
                          </p>
                        </div>
                        <button
                          onClick={handleDrawPrompt}
                          className="w-full flex items-center justify-center gap-1.5 py-2 rounded-none bg-[#b59a7c] hover:bg-[#a3886b] text-white font-bold transition-all font-heading text-[10px] uppercase tracking-widest"
                        >
                          <Sparkles className="w-3.5 h-3.5" /> Draw Another Prompt Card
                        </button>
                      </div>
                    )}

                    {/* Sandbox 3: Behavior Change Engine */}
                    {card.id === "behavior-engine" && (
                      <div className="space-y-2 font-sans">
                        <span className="text-[10px] font-heading text-slate-500 uppercase tracking-widest block font-bold text-left">
                          Set Simulated Behavioral Data:
                        </span>
                        <div className="space-y-1.5">
                          <div className="flex justify-between items-center text-slate-655 text-xs">
                            <span>Checking Balance:</span>
                            <span className="font-mono text-[#b59a7c] font-bold">${engineBalance}</span>
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
                            className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#b59a7c]"
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
                              className="w-3.5 h-3.5 border-slate-350 text-[#b59a7c] focus:ring-0 focus:ring-offset-0 accent-[#b59a7c] cursor-pointer"
                            />
                          </div>

                          <div className="flex justify-between items-center text-slate-655 text-xs">
                            <span>Day of the Month:</span>
                            <span className="font-mono text-[#b59a7c] font-bold">Day {engineDayOfMonth}</span>
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
                            className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#b59a7c]"
                          />
                        </div>

                        <div className="border-t border-slate-200 pt-2 space-y-1 text-left">
                          <div className="flex justify-between items-center text-[9px] uppercase font-bold tracking-widest font-mono">
                            <span className="text-slate-400">Engine Action:</span>
                            <span className="text-[#b59a7c]">{engineOutput.trigger}</span>
                          </div>
                          <p className="text-slate-600 text-[10px] leading-relaxed">
                            {engineOutput.desc}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Generic Sandbox Info for other cards */}
                    {card.id !== "culture-probe" && card.id !== "conversation-starters" && card.id !== "behavior-engine" && (
                      <div className="flex items-center justify-center p-2 text-slate-450 italic text-[10px] font-sans text-center">
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

      {/* WORKSHOP BUILDER COMPONENT */}
      <div className="max-w-7xl mx-auto bg-[#faf9f6] border border-slate-200 rounded-none p-6 md:p-10 text-left">
        <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-6 pb-6 border-b border-slate-200 mb-8">
          <div>
            <div className="flex items-center gap-2 text-[#b59a7c] font-mono text-xs uppercase tracking-widest font-bold mb-1.5">
              <Briefcase className="w-4 h-4" />
              Sovereign Session Orchestrator
            </div>
            <h3 className="text-xl md:text-2xl font-heading text-slate-900 uppercase tracking-widest font-bold">
              Interactive Workshop Agenda Builder
            </h3>
            <p className="text-slate-500 text-xs md:text-sm font-sans mt-1">
              Select strategic tools from the registry above to build a sequenced workshop plan. Export a structured B2B advisory agenda in one click.
            </p>
          </div>

          <div className="flex items-center gap-6 bg-white border border-slate-200 px-6 py-4 rounded-none shrink-0">
            <div className="text-center border-r border-slate-200 pr-6">
              <span className="block text-2xl font-heading text-[#b59a7c] font-bold">
                {workshopCards.length}
              </span>
              <span className="text-[9px] uppercase font-bold text-slate-400 font-mono tracking-widest block">
                Total Steps
              </span>
            </div>
            <div className="text-center">
              <span className="block text-2xl font-heading text-[#b59a7c] font-bold flex items-center gap-1.5">
                <Clock className="w-5 h-5 text-[#b59a7c]/70 shrink-0" />
                {totalWorkshopDuration} <span className="text-xs font-sans font-medium text-slate-500 uppercase tracking-widest ml-0.5">Min</span>
              </span>
              <span className="text-[9px] uppercase font-bold text-slate-400 font-mono tracking-widest block">
                Session Length
              </span>
            </div>
          </div>
        </div>

        {/* WORKSHOP STEPS SEQUENCE */}
        {workshopCards.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 border border-dashed border-slate-300 bg-white/50 text-slate-400 font-sans italic text-sm text-center">
            <Layers className="w-8 h-8 text-slate-300 mb-2" />
            No tools added to the agenda sequence yet.<br/>Click &ldquo;+ Agenda&rdquo; on any card above to start structuring your session.
          </div>
        ) : (
          <div className="space-y-4">
            <div className="hidden md:grid grid-cols-12 text-[10px] uppercase font-bold tracking-widest text-slate-400 font-mono pb-2 px-4">
              <div className="col-span-1">Sequence</div>
              <div className="col-span-4">Strategic Tool</div>
              <div className="col-span-3">Core Category</div>
              <div className="col-span-3">Duration (Minutes)</div>
              <div className="col-span-1 text-right">Action</div>
            </div>

            <div className="space-y-2.5">
              {workshopCards.map((item, idx) => (
                <div 
                  key={item.card.id}
                  className="grid grid-cols-1 md:grid-cols-12 items-center bg-white border border-slate-200 p-4 rounded-none hover:border-[#b59a7c]/60 transition-all gap-4"
                >
                  {/* Sequence label */}
                  <div className="col-span-1 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-none bg-slate-900 text-white font-mono text-xs font-bold flex items-center justify-center">
                      {(idx + 1).toString().padStart(2, "0")}
                    </span>
                    <span className="md:hidden text-[10px] uppercase font-mono font-bold text-slate-400">Step Sequence</span>
                  </div>

                  {/* Tool title */}
                  <div className="col-span-1 md:col-span-4 flex items-center gap-3">
                    <div className="flex flex-col text-left">
                      <span className="font-heading text-sm text-slate-950 uppercase tracking-wide font-bold">
                        {item.card.title}
                      </span>
                      <span className="text-[9px] text-[#b59a7c] uppercase font-mono tracking-widest font-bold">
                        Phase {item.card.num}
                      </span>
                    </div>
                  </div>

                  {/* Category */}
                  <div className="col-span-1 md:col-span-3 text-left">
                    <span className="text-xs text-slate-500 font-sans font-semibold uppercase tracking-wider bg-[#faf9f6] border border-slate-100 px-2 py-0.5">
                      {item.card.category}
                    </span>
                  </div>

                  {/* Duration input */}
                  <div className="col-span-1 md:col-span-3 flex items-center gap-2">
                    <input 
                      type="range"
                      min="5"
                      max="120"
                      step="5"
                      value={item.duration}
                      onChange={(e) => handleUpdateDuration(item.card.id, parseInt(e.target.value))}
                      className="h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#b59a7c] w-24 shrink-0"
                    />
                    <span className="font-mono text-xs text-slate-900 font-bold bg-[#faf9f6] border border-slate-200 py-1 px-2.5 rounded-none shrink-0 w-16 text-center">
                      {item.duration} Min
                    </span>
                  </div>

                  {/* Remove Button */}
                  <div className="col-span-1 text-right flex justify-end">
                    <button 
                      onClick={() => handleRemoveFromWorkshop(item.card.id)}
                      className="text-slate-400 hover:text-red-700 transition-colors p-1"
                      title="Remove Step"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* ACTION ROW */}
            <div className="flex flex-col sm:flex-row justify-between items-center pt-6 gap-4 border-t border-slate-200 mt-6">
              <button
                onClick={() => setWorkshopCards([])}
                className="text-slate-400 hover:text-slate-900 font-heading text-[10px] uppercase tracking-widest font-bold transition-all p-2"
              >
                Clear Agenda Sequence
              </button>

              <button
                onClick={handleExportPlaybook}
                className="bg-[#b59a7c] hover:bg-[#a3886b] text-white font-heading text-xs uppercase tracking-widest font-bold py-3.5 px-8 rounded-none transition-all flex items-center justify-center gap-2"
              >
                {copied ? <Check className="w-4 h-4" /> : <Clipboard className="w-4 h-4" />}
                {copied ? "Playbook Copied!" : "Export Session Playbook"}
              </button>
            </div>
          </div>
        )}

      </div>

      {/* PREMIUM PAYWALL MODAL */}
      {showPaywallModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-md">
          <div className="bg-white border-2 border-[#b59a7c] p-8 max-w-lg w-full text-center relative rounded-none flex flex-col justify-center shadow-2xl">
            <div className="w-12 h-12 bg-[#faf9f6] border border-[#b59a7c]/30 text-[#b59a7c] flex items-center justify-center mx-auto mb-6 rounded-none">
              <Lock className="w-6 h-6" />
            </div>

            <span className="text-[9px] uppercase font-bold tracking-widest text-[#b59a7c] font-mono block mb-1">
              Curriculum Premium Lock
            </span>
            <h3 className="text-xl md:text-2xl font-heading text-slate-905 uppercase tracking-widest mb-4 font-bold">
              Locked Behind Sovereign Architect Pass
            </h3>
            
            <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-6 font-sans">
              The card <strong className="text-slate-950 font-bold">&ldquo;{lockedCardAttempted}&rdquo;</strong> and other 41 strategic design tools are premium course downloads. Unlock full access to the complete 44-card interactive deck, custom agendas builder, and B2B playbook templates by upgrading.
            </p>

            <div className="bg-[#faf9f6] border border-slate-200 rounded-none p-4 text-xs font-sans text-left space-y-2 mb-8">
              <div className="flex gap-2">
                <span className="text-[#b59a7c] font-bold select-none">•</span>
                <span className="text-slate-655 font-medium">Access full high-res catalog profiles for 44 cards.</span>
              </div>
              <div className="flex gap-2">
                <span className="text-[#b59a7c] font-bold select-none">•</span>
                <span className="text-slate-655 font-medium">Export unlimited structured agendas as developer briefs.</span>
              </div>
              <div className="flex gap-2">
                <span className="text-[#b59a7c] font-bold select-none">•</span>
                <span className="text-slate-655 font-medium">Unlock the MMF interest sweep and micro-lending code sandbox engine.</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center">
              <button
                onClick={() => setShowPaywallModal(false)}
                className="bg-transparent border border-slate-300 text-slate-600 hover:border-slate-800 py-3.5 px-6 rounded-none text-[10px] uppercase font-heading tracking-widest font-bold transition-all"
              >
                Close Dialog
              </button>

              <a
                href="#pricing"
                onClick={() => setShowPaywallModal(false)}
                className="bg-[#b59a7c] hover:bg-[#a3886b] text-white py-3.5 px-6 rounded-none text-[10px] uppercase font-heading tracking-widest font-bold transition-all flex items-center justify-center gap-1"
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
