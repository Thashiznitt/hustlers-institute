import os

page_path = "/Users/rn/Github/hustlers-institute/src/app/learn/page.tsx"

with open(page_path, "r", encoding="utf-8") as f:
    content = f.read()

# Verify the file is clean and contains the expected placeholders
start_str = '    <div className="min-h-screen bg-[#faf9f6] text-slate-800 flex flex-col justify-between">'
end_str = '      </main>'

if start_str not in content:
    print("Error: start_str not found in page.tsx")
    exit(1)

if end_str not in content:
    print("Error: end_str not found in page.tsx")
    exit(1)

# Split and perform the swap
before_start = content.split(start_str, 1)[0]
after_end = content.split(end_str, 1)[1]

# Construct the new body markup
new_body = """    <div className="min-h-screen bg-[#faf9f6] text-slate-800 flex">
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
                action: () => window.location.href = "/dashboard"
              },
              { 
                name: "Courses", 
                icon: BookOpen, 
                action: () => setActiveSubTab("checklist")
              },
              { 
                name: "Playground", 
                icon: Sliders, 
                action: handleScrollToPlayground
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
              const isActive = item.name === "Courses"; // Under active learn portal courses tab is primary
              return (
                <button
                  key={item.name}
                  onClick={item.action}
                  title={item.name}
                  className={`w-full flex items-center gap-3 p-3 rounded-none text-xs uppercase tracking-wider font-bold transition-all border border-transparent cursor-pointer ${
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

      {/* RIGHT VIEWPORT CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        
        {/* TOP HEADER */}
        <Header onResetProgress={handleResetProgress} />

        {/* LEARNING TRACKER COMPONENT (sticky under header) */}
        <section className="bg-white border-b border-slate-200 py-4 px-6 md:px-16 lg:px-24 print:hidden w-full">
          <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6">
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

        {/* PORTAL BODY - SECONDARY SIDEBAR + WORKSPACE SPLIT */}
        <div className="flex flex-1 w-full relative print:block">
          
          {/* SECONDARY SIDEBAR (COURSES SUB-NAV) */}
          <aside className="w-56 bg-[#faf9f6] border-r border-slate-200 h-[calc(100vh-74px)] sticky top-[74px] flex flex-col justify-between shrink-0 print:hidden z-10">
            <div className="p-4 space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase select-none">
                  Course Navigation
                </span>
              </div>
              <nav className="space-y-1 flex flex-col">
                {[
                  { id: "checklist", name: "Course Checklist", icon: BookOpen },
                  { id: "niche", name: "Niche Builder", icon: Sparkles },
                  { id: "leo", name: "Ask Leo", icon: MessageSquare },
                  { id: "templates", name: "Templates", icon: Download },
                  { id: "cards", name: "Design Toolkit Cards", icon: Sliders }
                ].map((subTab) => {
                  const Icon = subTab.icon;
                  const isActive = activeSubTab === subTab.id;
                  return (
                    <button
                      key={subTab.id}
                      onClick={() => setActiveSubTab(subTab.id)}
                      className={`w-full flex items-center gap-3 p-2.5 rounded-none text-xs uppercase tracking-wider font-bold transition-all border border-transparent cursor-pointer ${
                        isActive
                          ? "bg-white text-slate-950 border-slate-200 shadow-sm font-black"
                          : "text-slate-500 hover:bg-white/50 hover:text-slate-900"
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{subTab.name}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
            
            <div className="p-4 border-t border-slate-100 bg-white/40">
              <span className="text-[10px] text-slate-400 font-mono block">SUPPORT ACTIVE</span>
              <span className="text-[9px] text-slate-500 font-sans mt-0.5 block">Nairobi Hub / Dubai Hub</span>
            </div>
          </aside>

          {/* WORKSPACE COLUMN */}
          <main className="flex-1 px-4 md:px-8 py-8 w-full max-w-[1600px] mx-auto print:px-0 print:py-0">
            
            {/* COURSE CHECKLIST TAB VIEW */}
            {activeSubTab === "checklist" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* LEFT COLUMN: Course Checklist (Navigation) */}
                <aside className="lg:col-span-3 space-y-6 print:hidden">
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
                              className={`w-full text-left font-sans text-xs uppercase tracking-wider font-bold py-2 flex items-center justify-between transition-colors ${
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

                {/* RIGHT COLUMN */}
                <section className="lg:col-span-9 space-y-6">
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
                          onValueChange={(val) => handleVentureIndustryChange(val)}
                        >
                          <SelectTrigger className="w-full border border-slate-200 bg-[#faf9f6] text-slate-900 font-semibold h-10 rounded-none text-sm">
                            <SelectValue placeholder="Select vertical..." />
                          </SelectTrigger>
                          <SelectContent className="bg-white border border-slate-200 rounded-none text-xs">
                            {Object.keys(VENTURE_TEMPLATES).map((indKey) => (
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
                    <Download className="w-4 h-4 text-[#000000]" /> Document Blueprints & Workbook Templates
                  </h3>
                  <p className="text-xs text-slate-500 font-sans mb-6">
                    Get PDF templates for all 44 design workbook cards and business blueprints to launch your independent venture:
                  </p>

                  {/* Blueprint grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    {[
                      { title: "Venture Services Proposal", file: "services_proposal_template.pdf", size: "142 KB", desc: "Retainer client contract proposal with standard terms." },
                      { title: "LLC Setup Cheat Sheet", file: "llc_setup_guide.pdf", size: "88 KB", desc: "Simple checklist for local business registration." },
                      { title: "Sprint Log Ledger", file: "sprint_log_template.pdf", size: "115 KB", desc: "Task tracking sheet for developers and designers." }
                    ].map((doc, idx) => (
                      <div key={idx} className="border border-slate-200 bg-[#faf9f6] p-4 flex flex-col justify-between rounded-none shadow-sm hover:border-slate-350 transition-colors">
                        <div className="mb-4">
                          <span className="text-[9px] uppercase font-mono font-bold tracking-widest text-slate-400">PDF Document</span>
                          <h6 className="font-sans font-bold text-slate-900 text-xs mt-0.5">{doc.title}</h6>
                          <p className="text-[11px] text-slate-500 font-sans mt-1">{doc.desc}</p>
                        </div>
                        <div className="flex justify-between items-center pt-2.5 border-t border-slate-100 text-xs font-mono">
                          <span className="text-slate-450">{doc.size}</span>
                          <button
                            onClick={() => {
                              alert(`Downloading template ${doc.file}...`);
                            }}
                            className="text-[#000000] hover:underline font-bold uppercase tracking-widest cursor-pointer text-[10px]"
                          >
                            Download
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* 44 Cards PDF download list */}
                  <span className="font-mono text-xs uppercase tracking-widest font-black text-slate-400 block mb-4 border-b pb-2">
                    All 44 Design Cards Workbook Templates
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                    {cardsList.map((card) => (
                      <div 
                        key={card.id} 
                        className="border border-slate-200 bg-white p-3 flex justify-between items-center text-xs rounded-none shadow-sm hover:border-slate-400 transition-colors"
                      >
                        <div className="truncate pr-4">
                          <span className="text-[9px] font-mono font-bold text-slate-450 block">CARD {card.num}</span>
                          <span className="font-sans font-bold text-slate-800 text-[11px] block truncate">{card.title}</span>
                        </div>
                        <button
                          onClick={() => handleDownloadPDF(card)}
                          className="bg-[#faf9f6] border border-slate-200 hover:bg-[#000000] hover:text-white hover:border-[#000000] text-slate-800 p-1 px-2.5 text-[9px] font-mono font-bold uppercase transition-all rounded-none cursor-pointer shrink-0"
                        >
                          PDF
                        </button>
                      </div>
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
                          <button
                            onClick={() => handleDownloadPDF(card)}
                            className="bg-transparent border border-[#000000]/30 hover:bg-[#000000] hover:text-white text-[#000000] px-3 py-1.5 text-xs font-mono font-bold uppercase tracking-widest transition-all rounded-none cursor-pointer flex items-center gap-1.5 h-8 shrink-0 animate-fade-in"
                          >
                            <Download className="w-3 h-3" /> PDF Template
                          </button>
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
        </div>"""

# Replace the text
new_content = before_start + new_body + after_end

# Also update the final closing tags right before the end
# The original has:
#     </div>
#   );
# }
# and we need:
#     </div>
#     </div>
#   );
# }
# to close the right viewport container.
if "    </div>\\n  );\\n}" in new_content:
    new_content = new_content.replace("    </div>\\n  );\\n}", "    </div>\\n    </div>\\n  );\\n}")
elif "    </div>\\r\\n  );\\r\\n}" in new_content:
    new_content = new_content.replace("    </div>\\r\\n  );\\r\\n}", "    </div>\\r\\n    </div>\\r\\n  );\\r\\n}")
else:
    # Do a manual string check
    last_div_idx = new_content.rfind("    </div>")
    if last_div_idx != -1:
        new_content = new_content[:last_div_idx] + "    </div>\\n    </div>" + new_content[last_div_idx + 6:]

with open(page_path, "w", encoding="utf-8") as f:
    f.write(new_content)

print("Successfully applied updates to page.tsx")
