"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BrandName from "@/components/BrandName";

export default function Footer() {
  const pathname = usePathname();
  const isLearn = pathname === "/learn";
  const isDashboard = pathname === "/dashboard";

  // Render a simpler footer for dashboard or learn pages to keep dashboard layout compact,
  // or render the full premium footer. Let's render the full premium footer for home,
  // and a cleaner/compact version for learn and dashboard to prevent content overload there.
  const isCompact = isLearn || isDashboard;

  if (isCompact) {
    return (
      <footer className="border-t border-neutral-900 bg-black py-12 w-full px-6 md:px-16 lg:px-24 print:hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 font-sans font-medium gap-4">
          <span>&copy; {new Date().getFullYear()} <BrandName />. All Rights Reserved.</span>
          <div className="flex gap-4 font-mono">
            <Link href="/" className="text-slate-400 hover:text-white transition-colors">Home Guide</Link>
            <Link href="/dashboard" className="text-slate-400 hover:text-white transition-colors">Sentinel Dashboard</Link>
            <Link href="/terms-privacy" className="text-slate-400 hover:text-white transition-colors">Terms & Privacy Registry</Link>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="border-t border-neutral-900 bg-[#000000] py-16 w-full px-6 md:px-16 lg:px-24 print:hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 font-sans text-slate-400">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <BrandName className="tracking-widest text-xs uppercase font-bold text-white" iconClassName="w-5 h-5" />
          </div>
          <p className="text-xs leading-relaxed max-w-xs font-medium text-slate-400">
            Helping independent creators and aspiring founders break free from corporate constraints and build successful, independent products.
          </p>
        </div>

        <div className="text-xs font-medium text-slate-400 md:text-right">
          <h5 className="font-heading text-white uppercase tracking-widest mb-4 font-bold">Contact Hub</h5>
          <p className="text-xs text-slate-400">Dubai, UAE</p>
          <p className="text-xs text-slate-400 mt-1">support@sovereignmillionaires.com</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 font-sans font-medium">
        <span>&copy; {new Date().getFullYear()} <BrandName />. All Rights Reserved.</span>
        <div className="flex gap-4 mt-4 md:mt-0 font-mono">
          <Link href="/terms-privacy" className="hover:text-white transition-colors">Terms & Privacy Registry</Link>
        </div>
      </div>
    </footer>
  );
}
