import React from "react";
import CurriculumExplorer from "@/components/CurriculumExplorer";
import DesignCardsExplorer from "@/components/DesignCardsExplorer";
import GradeCalculator from "@/components/GradeCalculator";
import { 
  ArrowUpRight, 
  Layers, 
  Terminal, 
  Briefcase, 
  Coins, 
  Check, 
  TrendingUp, 
  Users, 
  Award,
  Zap
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-850 relative overflow-hidden flex flex-col justify-between">
      
      {/* STATUS BAR PROMO */}
      <div className="w-full bg-[#eae3d7] text-[#5c5346] py-2.5 px-6 text-center text-[10px] tracking-widest uppercase font-mono font-bold flex items-center justify-center gap-6 border-b border-slate-200">
        <span>MSK AWARDS 2023 - BEST FINTECH PRODUCT</span>
        <span className="text-[#c7baa4] select-none">•</span>
        <span>ONEAPP LIFESTYLE STACK - 15K RECORDS</span>
        <span className="text-[#c7baa4] select-none">•</span>
        <span>I&M BANK DIGITAL ACCOUNT ONBOARDING</span>
      </div>

      {/* HEADER / NAVIGATION */}
      <header className="border-b border-slate-200 bg-white/95 backdrop-blur-md sticky top-0 z-50">
        <div className="w-full px-6 md:px-16 lg:px-24 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-none bg-slate-900 flex items-center justify-center text-white font-heading font-black text-lg">
              HI
            </div>
            <span className="font-heading text-slate-950 tracking-widest text-sm md:text-base uppercase font-bold">
              Hustlers Institute
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-xs uppercase font-heading tracking-widest text-slate-400 font-bold">
            <a href="#narrative" className="hover:text-[#b59a7c] transition-colors">Playbook</a>
            <a href="#curriculum" className="hover:text-[#b59a7c] transition-colors">Syllabus</a>
            <a href="#toolkit" className="hover:text-[#b59a7c] transition-colors">Toolkit</a>
            <a href="#calculator" className="hover:text-[#b59a7c] transition-colors">Grading</a>
            <a href="#pricing" className="hover:text-[#b59a7c] transition-colors">Tiers</a>
          </nav>
          <div>
            <a 
              href="#pricing" 
              className="bg-transparent border border-[#b59a7c] hover:bg-[#b59a7c] hover:text-white text-[#b59a7c] font-heading text-[10px] uppercase tracking-widest py-2 px-5 rounded-none flex items-center gap-1 transition-all font-bold"
            >
              Get Sandbox <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </header>

      {/* SPLIT HERO SECTION */}
      <section className="relative z-10 w-full bg-white grid grid-cols-1 lg:grid-cols-2 items-stretch border-b border-slate-200">
        
        {/* Left Column - Content */}
        <div className="flex flex-col justify-center items-start p-8 md:p-16 lg:p-24 xl:p-32 bg-white">
          <span className="px-3 py-1 bg-[#eae3d7] text-[#5c5346] text-[10px] tracking-widest uppercase font-mono font-bold rounded-full mb-8 inline-block">
            UX & Architecture
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading text-slate-905 leading-[1.1] uppercase tracking-wider mb-8 text-left font-bold">
            The Sovereign<br/>Product Architect
          </h1>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-12 font-sans font-medium text-left max-w-lg">
            Master Human-Centered Design, Agile Architecture, and Intrapreneurial Strategy. 
            Learn from battle-tested fintech launches that drove a <strong>40% increase in transactions</strong> and <strong>25% cross-sell lifts</strong> in live markets.
          </p>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full">
            <a 
              href="#pricing" 
              className="bg-[#b59a7c] hover:bg-[#a3886b] text-white font-heading text-xs uppercase tracking-widest font-bold py-4 px-8 text-center rounded-none shadow-sm"
            >
              Claim Course Access
            </a>
            <a 
              href="#curriculum" 
              className="bg-transparent border border-[#b59a7c] text-[#b59a7c] hover:bg-[#faf9f6] font-heading text-xs uppercase tracking-widest font-bold py-4 px-8 text-center rounded-none transition-all"
            >
              Explore Syllabus
            </a>
          </div>
          
          <a 
            href="#narrative" 
            className="mt-12 text-slate-900 font-heading text-xs uppercase tracking-widest font-bold underline underline-offset-8 decoration-1 hover:text-[#b59a7c] transition-colors"
          >
            Read Narrative Playbook
          </a>
        </div>

        {/* Right Column - Luxury Workspace Asset */}
        <div className="relative min-h-[400px] lg:min-h-[500px] bg-slate-50 overflow-hidden">
          <img 
            src="/sovereign_workspace.png" 
            alt="Sovereign Architect Luxury Workspace" 
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </section>

      {/* HIGHLIGHT STATS GRID */}
      <div className="w-full grid grid-cols-2 md:grid-cols-4 border-b border-slate-200 bg-[#faf9f6] text-slate-800">
        <div className="text-center py-10 px-4 border-r border-slate-200 last:border-r-0">
          <span className="block text-3xl font-heading text-[#b59a7c] tracking-widest font-bold">+40%</span>
          <span className="text-[9px] uppercase font-bold tracking-widest text-slate-400 font-mono block mt-2">Transaction Gain</span>
        </div>
        <div className="text-center py-10 px-4 border-r border-slate-200 last:border-r-0 md:border-r">
          <span className="block text-3xl font-heading text-[#b59a7c] tracking-widest font-bold">+25%</span>
          <span className="text-[9px] uppercase font-bold tracking-widest text-slate-400 font-mono block mt-2">Cross-Sell Lift</span>
        </div>
        <div className="text-center py-10 px-4 border-r border-slate-200 last:border-r-0">
          <span className="block text-3xl font-heading text-[#b59a7c] tracking-widest font-bold">15K+</span>
          <span className="text-[9px] uppercase font-bold tracking-widest text-slate-400 font-mono block mt-2">Bare-Metal Records</span>
        </div>
        <div className="text-center py-10 px-4 last:border-r-0">
          <span className="block text-3xl font-heading text-[#b59a7c] tracking-widest font-bold">MSK '23</span>
          <span className="text-[9px] uppercase font-bold tracking-widest text-slate-400 font-mono block mt-2">Best Fintech Product</span>
        </div>
      </div>

      {/* EXECUTIVE NARRATIVE SECTION */}
      <section className="w-full px-6 md:px-16 lg:px-24 py-16 bg-white border-b border-slate-200" id="narrative">
        <div className="max-w-7xl mx-auto bg-white border border-slate-200 rounded-none p-8 md:p-14 shadow-none">
          
          <h3 className="text-lg md:text-xl font-heading text-slate-900 uppercase tracking-widest mb-8 flex items-center gap-2 font-bold">
            <Briefcase className="w-5 h-5 text-slate-905" />
            From Safaricom Bureaucracy to Independent Architecture
          </h3>
          
          <div className="space-y-6 text-slate-700 text-sm md:text-base leading-relaxed font-sans font-medium">
            <p>
              It takes an immense amount of conviction to walk away from a massive corporate ecosystem like Safaricom to protect your vision. Corporate bureaucracy, &ldquo;panic meetings,&rdquo; and political friction can easily stifle innovation—especially when you are brought in as a leader to build something forward-thinking (like a lifestyle application) and find that the organization prefers status-quo safety over true Human-Centered Design (HCD).
            </p>
            <p>
              Channeling that frustration into building <strong className="text-slate-950 font-bold">OneApp Lifestyle</strong>—and drawing from massive, quantifiable successes at I&M Bank—is the ultimate proof of concept. You aren&rsquo;t just teaching theory; you are teaching battle-tested survival and execution.
            </p>
            <p className="italic text-slate-500 border-l-2 border-slate-950 pl-6 py-1 mt-8">
              This masterclass is a structured, end-to-end framework translating corporate UX design leadership, fintech compliance navigation, and independent startup deployment into actionable, high-throughput systems.
            </p>
          </div>
        </div>
      </section>

      {/* CURRICULUM COMPONENT */}
      <CurriculumExplorer />

      {/* TOOLKIT COMPONENT */}
      <DesignCardsExplorer />

      {/* CALCULATOR COMPONENT */}
      <GradeCalculator />

      {/* PRICING AND TIERS */}
      <section className="w-full px-6 md:px-16 lg:px-24 py-20 bg-white" id="pricing">
        <div className="max-w-7xl mx-auto flex flex-col items-start mb-16">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono mb-2">
            Tuition Models
          </span>
          <h2 className="text-3xl md:text-5xl font-heading text-slate-900 uppercase tracking-widest mb-4">
            Total Monetization Runway
          </h2>
          <p className="text-slate-500 max-w-3xl text-left text-lg font-sans">
            Choose your tier and launch. Whether you need immediate framework blueprints or live cohort training.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
           {/* Tier 1 */}
          <div className="bg-white border border-slate-200 rounded-none p-8 flex flex-col justify-between hover:border-[#b59a7c] transition-all duration-300 relative overflow-hidden group">
            <div>
              <span className="text-[10px] font-heading text-slate-400 uppercase tracking-widest block mb-1">
                TIER 01
              </span>
              <h3 className="text-xl font-heading text-slate-900 uppercase mb-3 tracking-widest font-bold">
                Strategic Toolkit
              </h3>
              <p className="text-slate-550 text-xs leading-relaxed mb-6 font-sans font-medium">
                Self-paced digital blueprints and design frameworks to optimize your daily UX research loops.
              </p>
              
              <div className="mb-6">
                <span className="text-4xl font-heading text-slate-905 font-bold">$99</span>
                <span className="text-slate-400 text-xs font-mono ml-1">USD / Async</span>
              </div>

              <ul className="space-y-3 pt-6 border-t border-slate-100 text-xs text-slate-600 font-sans">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#b59a7c] shrink-0" />
                  <span>REMY Methodology ToolBox PDF</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#b59a7c] shrink-0" />
                  <span>Strategic Design prompt card designs</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#b59a7c] shrink-0" />
                  <span>Figma component onboarding layouts</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#b59a7c] shrink-0" />
                  <span>Pre-configured Jira Sprint templates</span>
                </li>
              </ul>
            </div>

            <button className="w-full mt-8 py-3 rounded-none border border-[#b59a7c] bg-transparent text-[#b59a7c] hover:bg-[#b59a7c] hover:text-white font-heading text-[10px] uppercase tracking-widest font-bold transition-all">
              Download Toolkit
            </button>
          </div>            {/* Tier 2 - Recommended */}
          <div className="bg-white border-2 border-[#b59a7c] rounded-none p-8 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 bg-[#b59a7c] text-white font-heading font-black text-[9px] uppercase tracking-widest py-1.5 px-5 rounded-none">
              Recommended
            </div>
            
            <div>
              <span className="text-[10px] font-heading text-slate-505 tracking-widest uppercase block mb-1">
                TIER 02
              </span>
              <h3 className="text-xl font-heading text-slate-900 uppercase mb-3 tracking-widest font-bold">
                Sovereign Architect
              </h3>
              <p className="text-slate-550 text-xs leading-relaxed mb-6 font-sans font-medium">
                The complete masterclass. 12+ hours of detailed video modules, sandbox coding assignments, and graduation exam.
              </p>
              
              <div className="mb-6">
                <span className="text-4xl font-heading text-slate-905 font-bold">$499</span>
                <span className="text-slate-500 text-xs font-mono ml-1">USD / Lifetime</span>
              </div>

              <ul className="space-y-3 pt-6 border-t border-slate-100 text-xs text-slate-700 font-sans font-medium">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#b59a7c] shrink-0" />
                  <span>12+ hours of screen-share heavy lectures</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#b59a7c] shrink-0" />
                  <span>Includes all Tier 1 Digital Toolkits</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#b59a7c] shrink-0" />
                  <span>Capstone graduation audit & certificate</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#b59a7c] shrink-0" />
                  <span>Async peer reviews & community board</span>
                </li>
              </ul>
            </div>

            <button className="w-full mt-8 py-3 rounded-none bg-[#b59a7c] hover:bg-[#a3886b] text-white font-heading text-[10px] uppercase tracking-widest font-bold transition-all">
              Claim Masterclass Pass
            </button>
          </div>

          {/* Tier 3 */}
          <div className="bg-white border border-slate-200 rounded-none p-8 flex flex-col justify-between hover:border-[#b59a7c] transition-all duration-300 relative overflow-hidden group">
            <div>
              <span className="text-[10px] font-heading text-[#b59a7c] uppercase tracking-widest block mb-1">
                TIER 03
              </span>
              <h3 className="text-xl font-heading text-slate-900 uppercase mb-3 tracking-widest font-bold">
                Executive Strategy
              </h3>
              <p className="text-slate-555 text-xs leading-relaxed mb-6 font-sans font-medium">
                1:1 dedicated advisory retainers for early-stage fintechs or commercial banking labs looking to scale custom lending sweep engines.
              </p>
              
              <div className="mb-6">
                <span className="text-2xl font-heading text-slate-905 font-bold">Premium Retainer</span>
                <span className="text-[#b59a7c] text-xs font-mono block mt-1">Custom Terms</span>
              </div>

              <ul className="space-y-3 pt-6 border-t border-slate-100 text-xs text-slate-655 font-sans">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#b59a7c] shrink-0" />
                  <span>Weekly 1:1 advisory architecture calls</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#b59a7c] shrink-0" />
                  <span>Direct UI/UX audit on your active product</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#b59a7c] shrink-0" />
                  <span>Cyprus/Dubai corporate routing advisory</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#b59a7c] shrink-0" />
                  <span>Direct engineering & database query audits</span>
                </li>
              </ul>
            </div>

            <button className="w-full mt-8 py-3 rounded-none border border-[#b59a7c] bg-transparent text-[#b59a7c] hover:bg-[#b59a7c] hover:text-white font-heading text-[10px] uppercase tracking-widest font-bold transition-all">
              Book Consultation
            </button>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="w-full px-6 md:px-16 lg:px-24 py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-4xl font-heading text-slate-900 uppercase tracking-widest mb-2 font-bold">
              Frequently Solved Inquiries
            </h2>
            <p className="text-slate-500 text-sm font-sans">
              Answers to common roadblocks regarding tech capabilities, background requirements, and graduation.
            </p>
          </div>

          <div className="space-y-4 max-w-4xl mx-auto font-sans">
            <div className="bg-white border border-slate-200 rounded-none p-6 hover:border-slate-400 transition-all duration-300">
              <h4 className="font-heading text-slate-900 text-sm uppercase tracking-wider mb-2 font-bold">
                Do I need a strong coding background to take this course?
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">
                No. Module 3 is specifically engineered to teach the *language* of databases and servers to designers and PMs. You will learn to map UI elements to backend SQL tables and understand Cloudflare routing so you can align engineering and protect your product roadmap.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-none p-6 hover:border-slate-400 transition-all duration-300">
              <h4 className="font-heading text-slate-900 text-sm uppercase tracking-wider mb-2 font-bold">
                What compliance frameworks are addressed?
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">
                We focus heavily on Central Bank guidelines (using the Central Bank of Kenya model) and data protection acts. You will learn the UX friction-balancing act of satisfying AML and KYC rules while keeping the onboarding flow under 3 minutes.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-none p-6 hover:border-slate-400 transition-all duration-300">
              <h4 className="font-heading text-slate-900 text-sm uppercase tracking-wider mb-2 font-bold">
                How does the Capstone Grading works?
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">
                Upon finishing all module tests, you submit a product architecture blueprint. It is graded across four operational vectors. Scoring above 80 points grants graduation; scoring above 90 grants direct corporate introductions to early-stage venture hubs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-[#faf9f6] py-16 w-full px-6 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 font-sans text-slate-500">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-none bg-slate-900 flex items-center justify-center text-white font-heading font-black text-sm">
                HI
              </div>
              <span className="font-heading text-slate-900 tracking-widest text-xs uppercase font-bold">
                Hustlers Institute
              </span>
            </div>
            <p className="text-xs leading-relaxed max-w-xs font-medium">
              Empowering senior designers, PMs, and independent founders to break away from enterprise traps and architect sovereign fintech products.
            </p>
          </div>

          <div className="text-xs leading-relaxed font-medium">
            <h5 className="font-heading text-slate-900 uppercase tracking-widest mb-4 font-bold">Compliance & Governance</h5>
            <p className="mb-2">Subject to strict local banking and fintech guidelines.</p>
            <p>IDAR Framework and REMY Strategic tools are registered trademarks of Hustlers Institute.</p>
          </div>

          <div className="text-xs font-medium">
            <h5 className="font-heading text-slate-900 uppercase tracking-widest mb-4 text-left md:text-right font-bold">Contact Hub</h5>
            <p className="text-left md:text-right">Nairobi, Kenya / Dubai, UAE</p>
            <p className="text-left md:text-right mt-1">support@hustlers-institute.com</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center text-[10px] text-slate-400 font-sans font-medium">
          <span>&copy; {new Date().getFullYear()} Hustlers Institute. All Rights Reserved.</span>
          <div className="flex gap-4 mt-4 md:mt-0 font-mono">
            <a href="#" className="hover:text-slate-650">CBK Guidelines</a>
            <a href="#" className="hover:text-slate-650">Data Protection Act</a>
            <a href="#" className="hover:text-slate-650">Terms of Registry</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
