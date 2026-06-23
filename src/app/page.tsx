import React from "react";
import CurriculumExplorer from "@/components/CurriculumExplorer";
import DesignCardsExplorer from "@/components/DesignCardsExplorer";
import GradeCalculator from "@/components/GradeCalculator";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PricingCards from "@/components/PricingCards";
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
      <div className="w-full bg-[#eae3d7] text-[#5c5346] py-2.5 px-6 text-center text-xs tracking-widest uppercase font-mono font-bold flex items-center justify-center gap-6 border-b border-slate-200">
        <span>THE SOVEREIGN SYNDICATE</span>
        <span className="text-[#c7baa4] select-none">•</span>
        <span>ACCUMULATE LEVERAGE</span>
        <span className="text-[#c7baa4] select-none">•</span>
        <span>DISTRIBUTED BLUEPRINTS</span>
      </div>

      {/* HEADER / NAVIGATION */}
      <Header />

      {/* SPLIT HERO SECTION */}
      <section className="relative z-10 w-full bg-white grid grid-cols-1 lg:grid-cols-2 items-stretch border-b border-slate-200">
        
        {/* Left Column - Content */}
        <div className="flex flex-col justify-center items-start p-8 md:p-16 lg:p-24 xl:p-32 bg-white">
          <span className="px-3 py-1 bg-[#eae3d7] text-[#5c5346] text-xs tracking-widest uppercase font-mono font-bold rounded-full mb-8 inline-block">
            Forge the Stack
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading text-slate-905 leading-[1.1] uppercase tracking-wider mb-8 text-left font-bold">
            Stop Renting Your Time.<br/>Build Your Identity and System.
          </h1>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-12 font-sans font-medium text-left max-w-lg">
            The corporate matrix trades your highest-leverage years for a linear salary. Learn how to break the cycle, lock in, and build scalable, distributed systems that yield true autonomy.
          </p>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full">
            <a 
              href="#pricing" 
              className="bg-[#000000] hover:bg-[#1a1a1a] text-white font-heading text-xs uppercase tracking-widest font-bold py-4 px-8 text-center rounded-none shadow-sm"
            >
              Lock in Access
            </a>
            <a 
              href="#curriculum" 
              className="bg-transparent border border-[#000000] text-[#000000] hover:bg-[#faf9f6] font-heading text-xs uppercase tracking-widest font-bold py-4 px-8 text-center rounded-none transition-all"
            >
              Explore Blueprints
            </a>
          </div>
          
          <a 
            href="#narrative" 
            className="mt-12 text-slate-900 font-heading text-xs uppercase tracking-widest font-bold underline underline-offset-8 decoration-1 hover:text-[#000000] transition-colors"
          >
            Read Sovereign Narrative
          </a>
        </div>

        {/* Right Column - Luxury Workspace Asset */}
        <div className="relative min-h-[400px] lg:min-h-[500px] bg-slate-50 overflow-hidden">
          <img 
            src="/sovereign_workspace.png" 
            alt="Sovereign Builder Workspace" 
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </section>

      {/* HIGHLIGHT STATS GRID */}
      <div className="w-full grid grid-cols-2 md:grid-cols-4 border-b border-slate-200 bg-[#faf9f6] text-slate-800">
        <div className="text-center py-10 px-4 border-r border-slate-200 last:border-r-0">
          <span className="block text-3xl font-heading text-[#000000] tracking-widest font-bold">+40%</span>
          <span className="text-xs uppercase font-bold tracking-widest text-slate-400 font-mono block mt-2">User Leverage</span>
        </div>
        <div className="text-center py-10 px-4 border-r border-slate-200 last:border-r-0 md:border-r">
          <span className="block text-3xl font-heading text-[#000000] tracking-widest font-bold">100%</span>
          <span className="text-xs uppercase font-bold tracking-widest text-slate-400 font-mono block mt-2">Asset Ownership</span>
        </div>
        <div className="text-center py-10 px-4 border-r border-slate-200 last:border-r-0">
          <span className="block text-3xl font-heading text-[#000000] tracking-widest font-bold">Zero</span>
          <span className="text-xs uppercase font-bold tracking-widest text-slate-400 font-mono block mt-2">Corporate Ceiling</span>
        </div>
        <div className="text-center py-10 px-4 last:border-r-0">
          <span className="block text-3xl font-heading text-[#000000] tracking-widest font-bold">24/7</span>
          <span className="text-xs uppercase font-bold tracking-widest text-slate-400 font-mono block mt-2">System Run Time</span>
        </div>
      </div>

      {/* EXECUTIVE NARRATIVE SECTION */}
      <section className="w-full px-6 md:px-16 lg:px-24 py-16 bg-white border-b border-slate-200" id="narrative">
        <div className="max-w-7xl mx-auto bg-white border border-slate-200 rounded-none p-8 md:p-14 shadow-none">
          
          <h3 className="text-lg md:text-xl font-heading text-slate-900 uppercase tracking-widest mb-8 flex items-center gap-2 font-bold">
            <Briefcase className="w-5 h-5 text-slate-905" />
            The Trap: Operating Under a Ceiling
          </h3>
          
          <div className="space-y-6 text-slate-700 text-sm md:text-base leading-relaxed font-sans font-medium">
            <p>
              You are either building someone else’s infrastructure under a corporate ceiling, or looking at a blank canvas without a clear blueprint. Tracing a linear path or delaying your build trades your highest-leverage years for zero equity.
            </p>
            <p>
              We don't teach theory. We map out the exact mechanics of building systems, creating identities, and scaling ecosystems with leverage. Whether you are escaping a 9-to-5 or launching your first codebase from scratch, it’s time to bypass the corporate ceiling entirely and become a system builder.
            </p>
            <p className="italic text-slate-500 border-l-2 border-slate-950 pl-6 py-1 mt-8">
              This is a practical foundry for builders ready to forge their own stack, isolate the noise, and accumulate sovereign assets.
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
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono mb-2">
            Capital Commitments
          </span>
          <h2 className="text-3xl md:text-5xl font-heading text-slate-900 uppercase tracking-widest mb-4">
            The Foundry Blueprints
          </h2>
          <p className="text-slate-500 max-w-3xl text-left text-sm md:text-base font-sans font-medium">
            Choose your entry point. Get lifetime access to the full blueprint suite, purchase individual phases as you go, or enter the active syndicate dashboard.
          </p>
        </div>

        <PricingCards />
      </section>

      {/* FAQ SECTION */}
      <section className="w-full px-6 md:px-16 lg:px-24 py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-4xl font-heading text-slate-900 uppercase tracking-widest mb-2 font-bold">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-500 text-sm md:text-base font-sans font-medium">
              Clear blueprints on structural questions, technical specifications, and system integration.
            </p>
          </div>

          <div className="space-y-4 max-w-4xl mx-auto font-sans">
            <div className="bg-white border border-slate-200 rounded-none p-6 hover:border-slate-400 transition-all duration-300">
              <h4 className="font-heading text-slate-900 text-sm uppercase tracking-wider mb-2 font-bold">
                Do I need to be a developer to engineer leverage?
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">
                No. We teach you how distributed systems, database schemas, and edge APIs scale in plain English. You will learn how to build systems that integrate smoothly with clean codebases.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-none p-6 hover:border-slate-400 transition-all duration-300">
              <h4 className="font-heading text-slate-900 text-sm uppercase tracking-wider mb-2 font-bold">
                What regulatory frameworks are covered?
              </h4>
              <p className="text-slate-655 text-sm leading-relaxed font-medium">
                We analyze regional data privacy compliance, secure user registration logging, and payment processor interfaces. You will understand how to establish clean operational parameters.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-none p-6 hover:border-slate-400 transition-all duration-300">
              <h4 className="font-heading text-slate-900 text-sm uppercase tracking-wider mb-2 font-bold">
                How do I verify my systems and graduate?
              </h4>
              <p className="text-slate-655 text-sm leading-relaxed font-medium">
                Upon executing all 5 curriculum stages, you will submit a practical verification checklist to clear the registry and unlock your digital builder credentials.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />

    </div>
  );
}
