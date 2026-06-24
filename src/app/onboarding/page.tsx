"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Zap, Loader2, Award, CheckSquare, Square } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SovereignInput } from "@/components/ui/SovereignInput";
import { SovereignSelect } from "@/components/ui/SovereignSelect";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sessionLoading, setSessionLoading] = useState(true);
  const [email, setEmail] = useState("");

  // Form Fields
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+254");
  const [localPhone, setLocalPhone] = useState("");
  
  const [country, setCountry] = useState("Kenya");
  const [countryOption, setCountryOption] = useState("Kenya");
  const [customCountry, setCustomCountry] = useState("");

  const [city, setCity] = useState("Nairobi");
  const [cityOption, setCityOption] = useState("Nairobi");
  const [customCity, setCustomCity] = useState("");

  const [profession, setProfession] = useState("Corporate Employee");
  const [professionOption, setProfessionOption] = useState("Corporate Employee");
  const [customProfession, setCustomProfession] = useState("");

  const [industry, setIndustry] = useState("Creator Economy / Digital Media");
  const [industryOption, setIndustryOption] = useState("Creator Economy / Digital Media");
  const [customIndustry, setCustomIndustry] = useState("");

  const [needsAnalysis, setNeedsAnalysis] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Sync countryCode and localPhone to phoneNumber
  useEffect(() => {
    const cleanLocal = localPhone.trim().replace(/^\+/, "").replace(/^0+/, "");
    setPhoneNumber(countryCode + cleanLocal);
  }, [countryCode, localPhone]);

  // Sync country option/custom to country
  useEffect(() => {
    setCountry(countryOption === "Other" ? customCountry.trim() : countryOption);
  }, [countryOption, customCountry]);

  // Sync city option/custom to city
  useEffect(() => {
    setCity(cityOption === "Other" ? customCity.trim() : cityOption);
  }, [cityOption, customCity]);

  // Sync profession option/custom to profession
  useEffect(() => {
    setProfession(professionOption === "Other" ? customProfession.trim() : professionOption);
  }, [professionOption, customProfession]);

  // Sync industry option/custom to industry
  useEffect(() => {
    setIndustry(industryOption === "Other" ? customIndustry.trim() : industryOption);
  }, [industryOption, customIndustry]);

  const needsOptions = [
    "Validate and launch a highly profitable service vertical",
    "Design high-fidelity interactive user screens and phone wireframes",
    "Create a structured, calendarized marketing content strategy",
    "Calculate monetization models, pricing tiers, and cash flows",
    "Learn how to conduct user interviews and synthesis matrices",
    "Master business activity logs and leverage structures"
  ];

  // Auth verification on mount
  useEffect(() => {
    async function checkSession() {
      try {
        const res = await fetch(`/api/auth/session?t=${Date.now()}`, { cache: "no-store" });
        const data = await res.json();
        if (!data.authenticated) {
          router.replace("/login");
          return;
        }
        if (data.user.isOnboarded) {
          router.replace("/learn");
          return;
        }
        setEmail(data.user.email);
      } catch (e) {
        console.error("Session fetch failed", e);
        router.replace("/login");
      } finally {
        setSessionLoading(false);
      }
    }
    checkSession();
  }, [router]);

  const toggleNeed = (need: string) => {
    if (needsAnalysis.includes(need)) {
      setNeedsAnalysis(needsAnalysis.filter((n) => n !== need));
    } else {
      setNeedsAnalysis([...needsAnalysis, need]);
    }
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phoneNumber || !country || !city || !profession || !industry) {
      setError("Please fill in all profile fields before continuing.");
      return;
    }
    setError(null);
    setStep(2);
  };

  const handleSubmit = async () => {
    if (needsAnalysis.length === 0) {
      setError("Please select at least one goal to help LEO AI align your targets.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/onboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          phoneNumber,
          country,
          city,
          profession,
          industry,
          needsAnalysis,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit onboarding profile.");
      }

      router.push("/learn");
    } catch (err: any) {
      setError(err.message || "Failed to onboard profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (sessionLoading) {
    return (
      <div className="min-h-screen bg-[#faf9f6] flex items-center justify-center font-mono text-xs text-slate-500">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-6 h-6 text-black animate-spin" />
          <span>ESTABLISHING SECURE SESSION CONTEXT...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-850 relative overflow-hidden flex flex-col justify-between">
      
      {/* STATUS BAR PROMO */}
      <div className="w-full bg-[#eae3d7] text-[#5c5346] py-2.5 px-6 text-center text-xs tracking-widest uppercase font-mono font-bold flex items-center justify-center gap-6 border-b border-slate-200">
        <span>THE SOVEREIGN SYNDICATE</span>
        <span className="text-[#c7baa4] select-none">•</span>
        <span>ONBOARDING RECORD</span>
        <span className="text-[#c7baa4] select-none">•</span>
        <span>LOGGED AS: {email}</span>
      </div>

      <Header />

      <main className="flex-1 flex items-center justify-center py-16 px-4 bg-[#faf9f6]">
        <div className="bg-white border border-slate-200 p-8 md:p-12 max-w-xl w-full shadow-sm rounded-none text-left space-y-6">
          
          {/* Step indicator header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 font-mono block">
              Step {step} of 2
            </span>
            <div className="flex items-center gap-1.5 font-mono text-[9px] font-bold">
              <span className={`px-2 py-0.5 border ${step === 1 ? "bg-black text-white border-black" : "bg-[#faf9f6] text-slate-400 border-slate-200"}`}>1. Profile</span>
              <span className={`px-2 py-0.5 border ${step === 2 ? "bg-black text-white border-black" : "bg-[#faf9f6] text-slate-400 border-slate-200"}`}>2. Objectives</span>
            </div>
          </div>

          {step === 1 ? (
            <form onSubmit={handleNextStep} className="space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 font-mono block">
                  IDENTITY REGISTRY
                </span>
                <h2 className="text-xl md:text-2xl font-heading text-slate-950 uppercase tracking-widest font-bold">
                  Onboard Your Profile
                </h2>
                <p className="text-slate-500 text-xs leading-relaxed font-sans font-medium">
                  Please register your personal profile details to seed your learning portfolio.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono block">Full Name</label>
                  <SovereignInput
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. John Doe"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono block">Phone Number</label>
                  <div className="flex gap-2">
                    <SovereignSelect
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      wrapperClassName="w-28 shrink-0"
                    >
                      <option value="+254">KE (+254)</option>
                      <option value="+256">UG (+256)</option>
                      <option value="+255">TZ (+255)</option>
                      <option value="+250">RW (+250)</option>
                      <option value="+234">NG (+234)</option>
                      <option value="+27">ZA (+27)</option>
                      <option value="+233">GH (+233)</option>
                      <option value="+1">US (+1)</option>
                      <option value="+44">UK (+44)</option>
                      <option value="+971">AE (+971)</option>
                    </SovereignSelect>
                    <SovereignInput
                      type="tel"
                      value={localPhone}
                      onChange={(e) => setLocalPhone(e.target.value)}
                      placeholder="e.g. 712345678"
                      className="flex-1 min-w-0"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono block">Country</label>
                  <SovereignSelect
                    value={countryOption}
                    onChange={(e) => setCountryOption(e.target.value)}
                  >
                    <option value="Kenya">Kenya</option>
                    <option value="Uganda">Uganda</option>
                    <option value="Tanzania">Tanzania</option>
                    <option value="Rwanda">Rwanda</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="South Africa">South Africa</option>
                    <option value="Ghana">Ghana</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="Other">Other (Type custom country)</option>
                  </SovereignSelect>
                  {countryOption === "Other" && (
                    <SovereignInput
                      type="text"
                      value={customCountry}
                      onChange={(e) => setCustomCountry(e.target.value)}
                      placeholder="Type your country..."
                      className="mt-1"
                      required
                    />
                  )}
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono block">City</label>
                  <SovereignSelect
                    value={cityOption}
                    onChange={(e) => setCityOption(e.target.value)}
                  >
                    <option value="Nairobi">Nairobi</option>
                    <option value="Mombasa">Mombasa</option>
                    <option value="Kisumu">Kisumu</option>
                    <option value="Kampala">Kampala</option>
                    <option value="Dar es Salaam">Dar es Salaam</option>
                    <option value="Kigali">Kigali</option>
                    <option value="Lagos">Lagos</option>
                    <option value="Johannesburg">Johannesburg</option>
                    <option value="London">London</option>
                    <option value="New York">New York</option>
                    <option value="Dubai">Dubai</option>
                    <option value="Other">Other (Type custom city)</option>
                  </SovereignSelect>
                  {cityOption === "Other" && (
                    <SovereignInput
                      type="text"
                      value={customCity}
                      onChange={(e) => setCustomCity(e.target.value)}
                      placeholder="Type your city..."
                      className="mt-1"
                      required
                    />
                  )}
                </div>
                <div className="space-y-1 col-span-1 md:col-span-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono block">Profession</label>
                      <SovereignSelect
                        value={professionOption}
                        onChange={(e) => setProfessionOption(e.target.value)}
                      >
                        <option value="Corporate Employee">Corporate Employee</option>
                        <option value="Software Engineer / Developer">Software Engineer / Developer</option>
                        <option value="Designer / Creative">Designer / Creative</option>
                        <option value="Student / Academic">Student / Academic</option>
                        <option value="Consultant / Coach">Consultant / Coach</option>
                        <option value="Business Owner / Retailer">Business Owner / Retailer</option>
                        <option value="Marketer / Sales Specialist">Marketer / Sales Specialist</option>
                        <option value="Gig Worker / Freelancer">Gig Worker / Freelancer</option>
                        <option value="Farmer / Agribusiness">Farmer / Agribusiness</option>
                        <option value="Hospitality / Service Industry">Hospitality / Service Industry</option>
                        <option value="Other">Other (Type custom profession)</option>
                      </SovereignSelect>
                      {professionOption === "Other" && (
                        <SovereignInput
                          type="text"
                          value={customProfession}
                          onChange={(e) => setCustomProfession(e.target.value)}
                          placeholder="Type your profession..."
                          className="mt-1"
                          required
                        />
                      )}
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono block">Business Industry</label>
                      <SovereignSelect
                        value={industryOption}
                        onChange={(e) => setIndustryOption(e.target.value)}
                      >
                        <option value="Creator Economy / Digital Media">Creator Economy / Digital Media</option>
                        <option value="Technology / SaaS / AI">Technology / SaaS / AI</option>
                        <option value="E-commerce / Retail">E-commerce / Retail</option>
                        <option value="Agribusiness / Agrotech">Agribusiness / Agrotech</option>
                        <option value="Consulting / Coaching / Agency">Consulting / Coaching / Agency</option>
                        <option value="Logistics / Transportation">Logistics / Transportation</option>
                        <option value="Healthcare / Biotech">Healthcare / Biotech</option>
                        <option value="Real Estate / Property">Real Estate / Property</option>
                        <option value="Hospitality / Travel">Hospitality / Travel</option>
                        <option value="Other">Other (Type custom industry)</option>
                      </SovereignSelect>
                      {industryOption === "Other" && (
                        <SovereignInput
                          type="text"
                          value={customIndustry}
                          onChange={(e) => setCustomIndustry(e.target.value)}
                          placeholder="Type your business industry..."
                          className="mt-1"
                          required
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {error && (
                <p className="text-red-500 text-xs font-semibold leading-relaxed mt-2">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-[#000000] hover:bg-[#1a1a1a] text-white font-heading text-xs uppercase tracking-widest py-4 text-center rounded-none font-bold shadow-sm transition-all h-12 mt-4 cursor-pointer"
              >
                Continue to Objectives &rarr;
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 font-mono block">
                  NEEDS ANALYSIS
                </span>
                <h2 className="text-xl md:text-2xl font-heading text-slate-950 uppercase tracking-widest font-bold">
                  Define Your Objectives
                </h2>
                <p className="text-slate-500 text-xs leading-relaxed font-sans font-medium">
                  What do you want to achieve from this course with your business? Select all that apply.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                {needsOptions.map((option) => {
                  const isSelected = needsAnalysis.includes(option);
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => toggleNeed(option)}
                      className={`w-full flex items-start gap-3 p-4 border text-left rounded-none transition-all cursor-pointer ${
                        isSelected
                          ? "border-[#000000] bg-[#eae3d7]/10 text-slate-950"
                          : "border-slate-200 bg-[#faf9f6] text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      <span className="shrink-0 mt-0.5">
                        {isSelected ? (
                          <CheckSquare className="w-4 h-4 text-black fill-none stroke-[2.5]" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-350 fill-none" />
                        )}
                      </span>
                      <span className="text-xs font-sans font-semibold leading-normal">
                        {option}
                      </span>
                    </button>
                  );
                })}
              </div>

              {error && (
                <p className="text-red-500 text-xs font-semibold leading-relaxed mt-2">
                  {error}
                </p>
              )}

              <div className="grid grid-cols-3 gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  disabled={loading}
                  className="bg-transparent border border-[#000000] text-[#000000] hover:bg-[#faf9f6] font-heading text-xs uppercase tracking-widest font-bold py-3 px-4 text-center rounded-none transition-all cursor-pointer h-12"
                >
                  &larr; Back
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="col-span-2 bg-[#000000] hover:bg-[#1a1a1a] disabled:bg-slate-200 disabled:text-slate-400 text-white font-heading text-xs uppercase tracking-widest py-3 px-4 text-center rounded-none font-bold shadow-sm transition-all h-12 cursor-pointer flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-slate-500" /> Completing Onboarding...
                    </>
                  ) : (
                    "Initialize Workspace \u2192"
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
