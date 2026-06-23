"use client";

import React, { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { ShieldCheck, Award, AlertTriangle, HelpCircle } from "lucide-react";
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from "recharts";

export default function GradeCalculator() {
  // Vectors
  const [m1Score, setM1Score] = useState<number>(18); // max 20
  const [m2Score, setM2Score] = useState<number>(17); // max 20
  const [m3Score, setM3Score] = useState<number>(16); // max 20
  const [m4Score, setM4Score] = useState<number>(19); // max 20
  const [m5Score, setM5Score] = useState<number>(18); // max 20

  const [totalScore, setTotalScore] = useState<number>(88);

  useEffect(() => {
    const savedM1 = localStorage.getItem("hi_readiness_m1");
    const savedM2 = localStorage.getItem("hi_readiness_m2");
    const savedM3 = localStorage.getItem("hi_readiness_m3");
    const savedM4 = localStorage.getItem("hi_readiness_m4");
    const savedM5 = localStorage.getItem("hi_readiness_m5");
    
    if (savedM1) setM1Score(parseInt(savedM1));
    if (savedM2) setM2Score(parseInt(savedM2));
    if (savedM3) setM3Score(parseInt(savedM3));
    if (savedM4) setM4Score(parseInt(savedM4));
    if (savedM5) setM5Score(parseInt(savedM5));
  }, []);

  useEffect(() => {
    setTotalScore(m1Score + m2Score + m3Score + m4Score + m5Score);
  }, [m1Score, m2Score, m3Score, m4Score, m5Score]);

  // Helper for handling slider values safely regardless of single number or array types
  const handleScoreChange = (setter: React.Dispatch<React.SetStateAction<number>>, key: string) => (val: number | number[] | readonly number[]) => {
    let scoreVal = 0;
    if (Array.isArray(val)) {
      scoreVal = val[0];
    } else if (typeof val === "number") {
      scoreVal = val;
    }
    setter(scoreVal);
    localStorage.setItem(key, scoreVal.toString());
    window.dispatchEvent(new Event("hi_readiness_update"));
  };

  // Determine Certificate Level
  let certLevel = "ALMOST THERE";
  let badgeColor = "text-red-400 border-red-950/80 bg-red-950/20";
  let cardBorder = "border-neutral-900 shadow-none rounded-none";
  let pathColor = "#f87171";
  let adviceText = "Your business project plan needs a few more updates to pass the 80-point mark. Focus on making the website easier to use and double check your pricing plan.";
  let badgeIcon = <AlertTriangle className="w-4 h-4 text-red-400 animate-pulse" />;

  if (totalScore >= 90) {
    certLevel = "READY TO LAUNCH (DISTINCTION)";
    badgeColor = "text-black border-[#d4af37] bg-[#d4af37]";
    cardBorder = "border-[#d4af37] shadow-none rounded-none";
    pathColor = "#d4af37";
    adviceText = "Excellent work! Your business plan is ready to launch, with a clear understanding of your customers, a solid website setup, and a healthy pricing plan.";
    badgeIcon = <Award className="w-4 h-4 text-black" />;
  } else if (totalScore >= 80) {
    certLevel = "READY FOR BUSINESS";
    badgeColor = "text-[#d4af37] border-[#d4af37]/35 bg-neutral-900";
    cardBorder = "border-[#d4af37] shadow-none rounded-none";
    pathColor = "#d4af37";
    adviceText = "Great job! You have built a solid foundation for your new business that is ready for the real world.";
    badgeIcon = <ShieldCheck className="w-4 h-4 text-[#d4af37]" />;
  }

  const chartData = [
    {
      name: "Readiness",
      value: totalScore,
      fill: pathColor,
    },
  ];

  return (
    <section className="w-full px-6 md:px-16 lg:px-24 py-20 bg-black border-y border-neutral-900" id="calculator">
      <div className="max-w-7xl mx-auto flex flex-col items-start mb-12">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono mb-2">
          Check Your Progress
        </span>
        <h2 className="text-3xl md:text-5xl font-heading text-white uppercase tracking-widest mb-4">
          Business Readiness Calculator
        </h2>
        <p className="text-slate-400 max-w-3xl text-left text-sm md:text-base font-sans font-medium">
          See how well-prepared you are across 5 key business areas. Move the sliders below to calculate your readiness score.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Sliders Area - Left Column */}
        <div className="lg:col-span-7 bg-neutral-950 border border-neutral-900 rounded-none p-6 md:p-8 flex flex-col justify-between shadow-none">
          <div className="space-y-8">
            
            {/* Module 1 */}
            <div className="space-y-2 font-sans">
              <div className="flex justify-between items-center text-sm">
                <span className="font-heading text-white uppercase tracking-widest text-xs font-bold">
                  <span className="text-slate-500 font-mono">01.</span> Niche & Brand
                </span>
                <span className="font-mono text-white font-bold bg-neutral-900 border border-neutral-800 py-0.5 px-2 rounded-none">
                  {m1Score} / 20 pts
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-snug">
                Finding a specific customer niche and setting up a professional, trusted brand image.
              </p>
              <Slider
                value={[m1Score]}
                max={20}
                step={1}
                onValueChange={handleScoreChange(setM1Score, "hi_readiness_m1")}
                className="pt-2 hover:cursor-grab active:cursor-grabbing text-[#d4af37]"
              />
            </div>

            {/* Module 2 */}
            <div className="space-y-2 font-sans">
              <div className="flex justify-between items-center text-sm">
                <span className="font-heading text-white uppercase tracking-widest text-xs font-bold">
                  <span className="text-slate-500 font-mono">02.</span> Customer Habits
                </span>
                <span className="font-mono text-white font-bold bg-neutral-900 border border-neutral-800 py-0.5 px-2 rounded-none">
                  {m2Score} / 20 pts
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-snug">
                Direct interviews, observing daily habits, and creating helpful habit-building loops.
              </p>
              <Slider
                value={[m2Score]}
                max={20}
                step={1}
                onValueChange={handleScoreChange(setM2Score, "hi_readiness_m2")}
                className="pt-2 hover:cursor-grab active:cursor-grabbing text-[#d4af37]"
              />
            </div>

            {/* Module 3 */}
            <div className="space-y-2 font-sans">
              <div className="flex justify-between items-center text-sm">
                <span className="font-heading text-white uppercase tracking-widest text-xs font-bold">
                  <span className="text-slate-500 font-mono">03.</span> Tech Setup
                </span>
                <span className="font-mono text-white font-bold bg-neutral-900 border border-neutral-800 py-0.5 px-2 rounded-none">
                  {m3Score} / 20 pts
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-snug">
                Setting up simple hosting, custom domains, security (SSL), and developer task lists.
              </p>
              <Slider
                value={[m3Score]}
                max={20}
                step={1}
                onValueChange={handleScoreChange(setM3Score, "hi_readiness_m3")}
                className="pt-2 hover:cursor-grab active:cursor-grabbing text-[#d4af37]"
              />
            </div>

            {/* Module 4 */}
            <div className="space-y-2 font-sans">
              <div className="flex justify-between items-center text-sm">
                <span className="font-heading text-white uppercase tracking-widest text-xs font-bold">
                  <span className="text-slate-500 font-mono">04.</span> Money & Proposals
                </span>
                <span className="font-mono text-white font-bold bg-neutral-900 border border-neutral-800 py-0.5 px-2 rounded-none">
                  {m4Score} / 20 pts
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-snug">
                Structuring consulting retainers, drafting simple business terms, and setting up legal structures.
              </p>
              <Slider
                value={[m4Score]}
                max={20}
                step={1}
                onValueChange={handleScoreChange(setM4Score, "hi_readiness_m4")}
                className="pt-2 hover:cursor-grab active:cursor-grabbing text-[#d4af37]"
              />
            </div>

            {/* Module 5 */}
            <div className="space-y-2 font-sans">
              <div className="flex justify-between items-center text-sm">
                <span className="font-heading text-white uppercase tracking-widest text-xs font-bold">
                  <span className="text-slate-500 font-mono">05.</span> Launch & Growth
                </span>
                <span className="font-mono text-white font-bold bg-neutral-900 border border-neutral-800 py-0.5 px-2 rounded-none">
                  {m5Score} / 20 pts
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-snug">
                Customer referral programs, local partnership QR code setups, and measuring key business numbers.
              </p>
              <Slider
                value={[m5Score]}
                max={20}
                step={1}
                onValueChange={handleScoreChange(setM5Score, "hi_readiness_m5")}
                className="pt-2 hover:cursor-grab active:cursor-grabbing text-[#d4af37]"
              />
            </div>

          </div>

          <div className="mt-8 pt-6 border-t border-neutral-900 grid grid-cols-1 md:grid-cols-2 gap-4 font-sans">
            <div className="text-slate-400 text-xs flex gap-2">
              <HelpCircle className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
              <span>
                Grading is modeled after real-world standards. A passing score requires a total of <strong>80 / 100</strong>.
              </span>
            </div>
            <div className="text-slate-400 text-xs flex gap-2">
              <HelpCircle className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
              <span>
                Scores above <strong>90</strong> grant a graduation with <strong>Distinction</strong> along with introductions to local business hubs.
              </span>
            </div>
          </div>

        </div>

        {/* Dynamic Calculator Output - Right Column */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-6">
          
          {/* Radial score gauge */}
          <div className={`bg-neutral-950 border p-6 flex flex-col items-center justify-center text-center relative overflow-hidden transition-all duration-500 ${cardBorder}`}>
            
            {/* SVG Ring replaced with Recharts RadialBarChart */}
            <div className="relative w-36 h-36 flex items-center justify-center mb-4">
              <RadialBarChart
                width={144}
                height={144}
                cx="50%"
                cy="50%"
                innerRadius="80%"
                outerRadius="100%"
                barSize={12}
                data={chartData}
                startAngle={90}
                endAngle={-270}
              >
                <PolarAngleAxis
                  type="number"
                  domain={[0, 100]}
                  angleAxisId={0}
                  tick={false}
                />
                <RadialBar
                  background={{ fill: "rgba(255, 255, 255, 0.05)" }}
                  dataKey="value"
                  cornerRadius={5}
                />
              </RadialBarChart>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-4xl font-heading text-white tracking-tight font-black">
                  {totalScore}
                </span>
                <span className="text-xs uppercase font-bold text-slate-500 font-mono">
                  Total Score
                </span>
              </div>
            </div>

            {/* Badge */}
            <div className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-none border text-xs font-heading tracking-widest uppercase mb-3 ${badgeColor} font-bold`}>
              {badgeIcon}
              <span>{certLevel}</span>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm px-2 font-sans">
              {adviceText}
            </p>
          </div>

          {/* Diagnostics checklist */}
          <div className="bg-neutral-950 border border-neutral-900 rounded-none p-6 flex-1 flex flex-col justify-between shadow-none">
            <div>
              <h4 className="font-heading text-white text-xs uppercase tracking-widest mb-4 font-bold">
                Project Health Checks
              </h4>
              <div className="space-y-3.5 font-sans">
                <div className="flex gap-2.5 items-start text-xs">
                  <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${m1Score < 16 ? "bg-red-500 animate-pulse" : "bg-[#d4af37]"}`} />
                  <div>
                    <span className="font-bold text-white block uppercase tracking-wider text-xs font-mono">Niche & Brand Segment</span>
                    <span className="text-slate-400 leading-snug">
                      {m1Score < 16 ? "Warning: Needs a clearer brand slogan and welcome signups plan." : "All good! Customer niche and brand trust are established."}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2.5 items-start text-xs">
                  <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${m2Score < 16 ? "bg-red-500 animate-pulse" : "bg-[#d4af37]"}`} />
                  <div>
                    <span className="font-bold text-white block uppercase tracking-wider text-xs font-mono">Customer Habits Segment</span>
                    <span className="text-slate-400 leading-snug">
                      {m2Score < 16 ? "Warning: Habits loop setup needs more direct observer inputs." : "All good! Customer needs and habit loops are on track."}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2.5 items-start text-xs">
                  <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${m3Score < 16 ? "bg-red-500 animate-pulse" : "bg-[#d4af37]"}`} />
                  <div>
                    <span className="font-bold text-white block uppercase tracking-wider text-xs font-mono">Tech Setup Segment</span>
                    <span className="text-slate-400 leading-snug">
                      {m3Score < 16 ? "Warning: Tech setup latency remains high. Streamline your database maps." : "All good! Simple app and hosting setups are verified."}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2.5 items-start text-xs">
                  <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${m4Score < 16 ? "bg-red-500 animate-pulse" : "bg-[#d4af37]"}`} />
                  <div>
                    <span className="font-bold text-white block uppercase tracking-wider text-xs font-mono">Money & Proposals Segment</span>
                    <span className="text-slate-400 leading-snug">
                      {m4Score < 16 ? "Warning: Retainer billing scopes require clearer boundary caps." : "All good! Monthly billing terms and proposals are ready."}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2.5 items-start text-xs">
                  <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${m5Score < 16 ? "bg-red-500 animate-pulse" : "bg-[#d4af37]"}`} />
                  <div>
                    <span className="font-bold text-white block uppercase tracking-wider text-xs font-mono">Launch & Growth Segment</span>
                    <span className="text-slate-400 leading-snug">
                      {m5Score < 16 ? "Warning: Referral reward loops and local flyering need expansion." : "All good! Growth loops and partner QR promotions are defined."}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
