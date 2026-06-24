import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BrandName from "@/components/BrandName";

export const metadata = {
  title: "Terms of Service & Privacy Registry | Sovereign Millionaires",
  description: "Official legal frameworks, terms of registry, and data privacy protocols of the Sovereign Millionaires Platform.",
};

export default function TermsPrivacyPage() {
  return (
    <div className="min-h-screen bg-white text-slate-850 flex flex-col justify-between">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto px-6 py-16 md:py-24 font-sans leading-relaxed">
        <div className="border border-slate-200 p-8 md:p-16 bg-[#faf9f6] rounded-none shadow-none">
          <div className="border-b border-slate-200 pb-8 mb-10">
            <span className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase block mb-2">
              Legal Framework / Registry
            </span>
            <h1 className="text-3xl md:text-5xl font-heading text-slate-900 uppercase tracking-widest font-black">
              Terms & Privacy Policy
            </h1>
            <p className="text-xs text-slate-500 font-mono mt-4">
              LAST UPDATE: 2026-06-25 • VERSION 2.1 • GLOBAL & EU COMPLIANT
            </p>
          </div>

          <div className="space-y-10 text-slate-700 text-sm">
            {/* Introduction */}
            <section className="space-y-4">
              <h2 className="text-base font-heading text-slate-900 uppercase tracking-wider font-bold">
                1. General Overview
              </h2>
              <p>
                Welcome to the <BrandName className="font-bold" /> Platform (the &quot;Platform&quot;). This registry details the terms, rules, and privacy protocols governing your access to the curriculum, tools, interactive workspaces, and syndicate memberships provided by us.
              </p>
              <p>
                By creating an account, unlocking premium blueprints, or interacting with our services, you agree to comply with this legal framework. If you do not accept these terms, you must cease all access to the Platform immediately.
              </p>
            </section>

            {/* Terms of Service */}
            <section className="space-y-4">
              <h2 className="text-base font-heading text-slate-900 uppercase tracking-wider font-bold">
                2. Terms of Service & Syndicate Membership
              </h2>
              <p>
                <strong>Account Registration:</strong> To access the workspaces, you must complete the onboarding procedure. All registered information must be accurate. You are solely responsible for securing your access credentials and session logs.
              </p>
              <p>
                <strong>License to Blueprints:</strong> When you purchase or unlock a curriculum stage (such as the Phase Foundry Pass or Full Bundle), you are granted a non-exclusive, non-transferable, revocable license to access the materials, worksheets, and interactive systems for personal or internal business development.
              </p>
              <p>
                <strong>Prohibited Conduct:</strong> You may not copy, reverse-engineer, resell, or distribute the design cards, source code templates, or custom components of the Platform without express written permission. Any violation leads to immediate suspension of your syndicate access.
              </p>
            </section>

            {/* Privacy Policy (GDPR / CCPA) */}
            <section className="space-y-4">
              <h2 className="text-base font-heading text-slate-900 uppercase tracking-wider font-bold">
                3. Privacy Protocol & GDPR/CCPA Compliance
              </h2>
              <p>
                We take your data privacy seriously and adhere strictly to the European Union General Data Protection Regulation (GDPR), the California Consumer Privacy Act (CCPA), and global data protection guidelines.
              </p>
              <p>
                <strong>Data Controller:</strong> The data controller for your personal information is the <BrandName className="font-bold" /> Data Registry, operating out of Dubai, UAE.
              </p>
              <p>
                <strong>Information We Collect:</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1.5 font-mono text-xs">
                <li>Personal identifiers (Name, Email, Profile Details during Onboarding).</li>
                <li>Financial details (Processed securely through Paystack/Stripe; we do not store raw card credentials).</li>
                <li>Technical logs (IP address, browser parameters, and canvas workspace state saves).</li>
                <li>Cookies and usage patterns (Subject to your consent).</li>
              </ul>
              <p>
                <strong>How We Use Your Data:</strong> Your data is used exclusively to maintain your progress tracking across modules, process authorized payments, and dispatch necessary alerts (such as payment confirmations, program updates, and welcome emails containing course blueprints).
              </p>
            </section>

            {/* User Rights */}
            <section className="space-y-4">
              <h2 className="text-base font-heading text-slate-900 uppercase tracking-wider font-bold">
                4. Your Rights & Choice Controls
              </h2>
              <p>
                Regardless of your residency, the Platform extends global controls to all syndicate members:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong>Right to Access & Portability:</strong> You can request a digital file containing your saved profile data and workspace logs.</li>
                <li><strong>Right to Rectification:</strong> You can update your registry details via the Onboarding page or the Sentinel Dashboard.</li>
                <li><strong>Right to Erasure (&quot;Right to be Forgotten&quot;):</strong> You can request complete termination and deletion of your account registry at <a href="mailto:support@sovereignmillionaires.com" className="underline text-black font-semibold">support@sovereignmillionaires.com</a>.</li>
                <li><strong>Right to Opt-Out:</strong> You can withdraw consent for analytical cookies or promotional emails at any time.</li>
              </ul>
            </section>

            {/* Cookies & Trackers */}
            <section className="space-y-4">
              <h2 className="text-base font-heading text-slate-905 uppercase tracking-wider font-bold">
                5. Cookie Policy & Tracker Disclosures
              </h2>
              <p>
                The Platform uses first-party cookies to maintain active login sessions and save interactive workspace states. We use performance and analytical cookies to understand how members interact with the design cards and learning goals.
              </p>
              <p>
                You can manage, restrict, or reject tracking via the interactive Cookie Consent Banner prompted on your first landing or by adjusting your browser permissions.
              </p>
            </section>

            {/* Contacts */}
            <section className="space-y-4 border-t border-slate-200 pt-6">
              <h2 className="text-base font-heading text-slate-900 uppercase tracking-wider font-bold">
                6. Contact Legal Registry
              </h2>
              <p>
                For questions regarding this framework, cookie consent preferences, or to exercise your privacy rights, contact:
              </p>
              <div className="bg-white p-4 border border-slate-200 font-mono text-xs text-slate-650 space-y-1">
                <p className="font-bold text-slate-900">Sovereign Millionaires Legal & Compliance Hub</p>
                <p>Location: Dubai, UAE</p>
                <p>Email: support@sovereignmillionaires.com</p>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
