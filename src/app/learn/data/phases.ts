export type DTStage = "empathize" | "define" | "ideate" | "validate" | "prototype" | "test" | "learn";
export type ExerciseType = "research-canvas" | "insight-ranking" | "idea-statement" | "niche-builder" | "sketch-log" | "observation-log" | "metrics-log";

export interface Lesson {
  id: string;
  title: string;
  dtStage: DTStage;
  exerciseType: ExerciseType;
  points: string[];
  summary: string;
}

export interface Phase {
  id: string;
  num: number;
  title: string;
  subtitle: string;
  objective: string;
  lessons: Lesson[];
}

export const phasesData: Phase[] = [
  {
    id: "phase-1",
    num: 1,
    title: "Phase 1: Discover",
    subtitle: "Don't build from scratch, instead find a business to improve",
    objective: "Use Design Thinking to find an existing business with real user frustrations and validate your improvement idea.",
    lessons: [
      {
        id: "1.1",
        title: "Find a Business to Improve",
        dtStage: "empathize",
        exerciseType: "research-canvas",
        points: [
          "Don't build from scratch, look for existing businesses that already have paying customers but are frustrating them (use Card 01: Customer Chats to run friendly, open conversations with real users).",
          "Observe and listen: go to 3 local businesses and watch how customers interact, noting where they hesitate, sigh, or give up (use Card 02: Watching Customers to note what you see in real time).",
          "Ask the 5Ws: What is the problem? Who is affected? Where does it happen? When? How? (use Card 03: Daily Diaries to have users write down their daily frustrations and give you raw, honest data)."
        ],
        summary: "The best businesses aren't always invented, they're improved. Look at what already exists and ask: 'What would make this 10x better for the customer?' Go out, observe real people, and listen carefully before you design anything."
      },
      {
        id: "1.2",
        title: "What Does the Data Mean?",
        dtStage: "define",
        exerciseType: "insight-ranking",
        points: [
          "Group your notes into themes to see what complaints or frustrations keep appearing (use Card 13: Step by Step Experience to map the customer journey and spot where friction is highest).",
          "Find the pattern: which insight is most painful and most common? That's your signal (use Card 17: Finding Patterns to cluster feedback from users into actionable groups).",
          "Rank your insights by impact using a grid, where high pain and high frequency is your top priority (use Card 18: Prioritization Matrix to decide which insight to solve first)."
        ],
        summary: "Data only becomes useful when you find the story inside it. The goal of this lesson is to move from a pile of raw notes to one clear, ranked insight that points to the biggest opportunity."
      },
      {
        id: "1.3",
        title: "Connect to Opportunity",
        dtStage: "ideate",
        exerciseType: "idea-statement",
        points: [
          "Start with a 'How Might We' question based on your top insight, which opens up creative possibilities without locking you into one solution (use Card 20: Brainstorming Prompts to generate many angles quickly).",
          "Brainstorm 5 possible improvements, then pick the single best one: don't fall in love with your first idea (use Card 19: Problem Statement to write a crisp definition of what you're solving and for whom).",
          "Define the WHY behind your improvement: why does this matter to your user, and why are you the right person to solve it? (use Card 21: Start with Why to ground your idea in a purpose that others can believe in)."
        ],
        summary: "Ideas are cheap, but direction is valuable. This lesson turns your top insight into a clear, purposeful improvement concept. By the end, you should be able to say exactly what you improve, for whom, and why it matters."
      },
      {
        id: "1.4",
        title: "Niche Builder Session",
        dtStage: "validate",
        exerciseType: "niche-builder",
        points: [
          "Take the improvement idea from lesson 1.3 and enter it into the Niche Builder below, adding your target user, the problem, and the improvement you're proposing (use Card 26: 30 second Pitch to pressure test your concept in plain English).",
          "Run the AI brainstorm: let Leo challenge your assumptions. Does the idea hold up under scrutiny? (use Card 22: Best & Worst Case Scenarios to stress test both the best and worst outcomes before committing).",
          "Refine until tight: a strong niche answers who, what, and why in under 2 sentences. If you can't explain it simply, it needs more work (use Card 09: Partner Maps to check if the right people would support this idea)."
        ],
        summary: "Validation isn't about proving you're right, it is about finding out early where you're wrong. Use the Niche Builder to stress test your improvement concept before you invest more time building it."
      },
      {
        id: "1.5",
        title: "Sketch Your First Prototype",
        dtStage: "prototype",
        exerciseType: "sketch-log",
        points: [
          "Draw your improvement idea as a simple flow of three steps. This flow can be screens, a user journey, a database system, or a business process: how does a customer find it, what is the core action they take, and what result do they get? No code needed (use Card 35: Image Moods to capture the visual feeling you want to create).",
          "Keep it rough because a sketch on paper or a basic slide works better than a polished mockup at this stage. The goal is to make the idea tangible so others can react to it (use Card 36: Style Boards to define the look and feel without designing everything from scratch).",
          "Focus on the flow, not the design details, checking if the path from problem to solution makes sense visually (use Card 32: Visual Notes to annotate your sketch with what each element does and why it's there)."
        ],

        summary: "A prototype is just an idea made tangible. It doesn't need to look good, but it does need to be testable. Your first sketch should take 30 minutes max, and it's meant to be critiqued, not celebrated."
      },
      {
        id: "1.6",
        title: "Show It to 2 Real People",
        dtStage: "test",
        exerciseType: "observation-log",
        points: [
          "Walk 2 real users through your sketch, and do not explain it, just show it and ask them to narrate their thoughts out loud (use Card 39: Feedback Quadrant to capture what they liked, what confused them, what they asked, and what they'd change).",
          "Watch more than you listen: where do they hesitate, point, squint, or laugh? Their body language tells you as much as their words (use Card 01: Customer Chats to guide the follow up conversation after the initial walkthrough).",
          "Record 3 raw observations, not your interpretations, but exactly what you saw and heard (use Card 04: Direct User Feedback to structure your notes into clear, actionable findings)."
        ],
        summary: "Testing isn't about proving your prototype works, it is about discovering where it doesn't. Two real users giving honest reactions is worth more than 20 assumptions you made alone at a desk."
      },
      {
        id: "1.7",
        title: "What Did You Learn?",
        dtStage: "learn",
        exerciseType: "metrics-log",
        points: [
          "Compare your original idea from lesson 1.3 with what you heard from real users in lesson 1.6 to see what changed. What surprised you? (use Card 18: Prioritization Matrix to rank the changes you need to make based on impact).",
          "Identify what worked well and what needs improvement. This distinction helps you build on your strengths rather than abandoning everything when something fails (use Card 23: Idea Saver to preserve good ideas that aren't right for this phase yet).",
          "Update your Niche Builder with your new learning. Your idea should be sharper now, not the same as when you started Phase 1 (use Card 44: Pick Top 5 to decide which refinements matter most going into Phase 2)."
        ],
        summary: "Learning is the product of Phase 1. If your idea is identical to what it was at lesson 1.1, you weren't really testing, you were just confirming. Update your thinking and prepare to go deeper in Phase 2."
      }
    ]
  },
  {
    id: "phase-2",
    num: 2,
    title: "Phase 2: Habits & Understand",
    subtitle: "Segment users, build personas, design for real behavior",
    objective: "Go deeper into who your user actually is, map their daily habits and triggers, and design a solution shaped around their real life.",
    lessons: [
      {
        id: "2.1",
        title: "Segment Your Users",
        dtStage: "empathize",
        exerciseType: "research-canvas",
        points: [
          "Not all users are the same, so identify at least 3 distinct user types: power users who engage daily, casual users who come and go, and churned users who left and why (use Card 03: Daily Diaries to have real users log their habits for a week so you see actual behavior).",
          "Shadow one user through their actual day, observing their real routine instead of a demo. What triggers their behavior? What gets in the way? (use Card 07: Photo Diaries to have them document their experience visually throughout the day).",
          "Map daily habits, not stated preferences, since what people say they do and what they actually do are often completely different (use Card 08: Long term Journals to capture behavioral patterns over time, not just in one moment)."
        ],
        summary: "Before you can design for a user, you need to understand who they actually are and how they actually live. Segmentation turns a vague 'target market' into specific people with specific routines, triggers, and frustrations."
      },
      {
        id: "2.2",
        title: "Build Your Persona",
        dtStage: "define",
        exerciseType: "insight-ranking",
        points: [
          "A persona is a vivid, specific portrait of your primary user, giving them a name, a job, a daily routine, a goal, and a fear (use Card 15: Customer Profiles to structure your persona card with all the essential details).",
          "Define the problem from their point of view, not yours: 'I struggle to find time to chase invoices' is more useful than 'the app isn't efficient enough' (use Card 12: Customer Feelings Map to capture their emotional experience around the problem).",
          "Pin down exactly who you're selling to, where a precise persona like 'Maria, 32, freelance designer, bills late, hates admin' is far more useful than 'small business owners' (use Card 14: Daily Task Map to connect their goals and pains to their actual daily flow)."
        ],
        summary: "A persona isn't a demographic, it is an empathy tool. When your whole team can picture the same specific person, every design decision becomes clearer and faster. Build one persona and know them deeply before expanding."
      },
      {
        id: "2.3",
        title: "Desired Solution",
        dtStage: "ideate",
        exerciseType: "idea-statement",
        points: [
          "What does your persona actually want to feel or achieve? Look for the outcome instead of the feature, because users buy feelings, not functions (use Card 22: Best & Worst Case Scenarios to map both the outcome they dream of and the failure they fear most).",
          "Design the ideal experience for them, not for you, and challenge every assumption about what the solution should look like by asking 'would Maria actually do this?' (use Card 25: Feature Store to list possible features and filter each one by whether it serves the persona's desired outcome).",
          "Pick exactly 1 core feature or improvement to build first, selecting the one that delivers the most of the desired outcome with the least complexity to understand (use Card 20: Brainstorming Prompts to generate and then aggressively narrow your options)."
        ],
        summary: "The desired solution isn't what you want to build, it is what your persona needs to feel. Every feature decision in Phase 2 should pass through one filter: does this help your persona get to their desired outcome faster and more easily?"
      },
      {
        id: "2.4",
        title: "Update Your Niche",
        dtStage: "validate",
        exerciseType: "niche-builder",
        points: [
          "Go back to your Niche Builder from Phase 1, and ask if your original niche description still matches what you now know about your persona (use Card 26: 30 second Pitch to see if you can still explain the idea clearly with all this new knowledge).",
          "If the persona revealed a different or more specific problem, update your niche, since pivoting with evidence from real research is smart strategy, not weakness (use Card 09: Partner Maps to check if the right people still fit your updated niche direction).",
          "Your niche should now include: who the persona is, the specific problem they face, and the improvement you're offering, all updated with what you discovered in lessons 2.1 through 2.3."
        ],
        summary: "Updating your niche isn't a failure, it is a sign that your research is working. A niche refined by real persona data is sharper and more defensible than one built purely on assumptions."
      },
      {
        id: "2.5",
        title: "Prototype for Your Persona",
        dtStage: "prototype",
        exerciseType: "sketch-log",
        points: [
          "Revisit the sketch from Phase 1, and redesign it with your persona in mind. Does the language feel right for them? Is the flow simple enough for their context? (use Card 10: Using Customer Words to rewrite any copy in the prototype using your persona's actual language).",
          "Apply UX principles: reduce steps, make the primary action obvious, and remove anything that distracts from the desired outcome (use Card 42: Conversation Cards to stress test your redesigned flow with a partner playing the persona role).",
          "Match their tolerance for complexity: if your persona isn't tech savvy, every screen should be immediately understandable without any explanation (use Card 36: Style Boards to align the visual tone with their expectations and comfort level)."
        ],
        summary: "Prototyping for a persona means making design decisions grounded in someone else's reality, not your own preferences. Every change to the sketch should be justified by something you learned about your user in lessons 2.1 through 2.3."
      },
      {
        id: "2.6",
        title: "Test With Your Persona Type",
        dtStage: "test",
        exerciseType: "observation-log",
        points: [
          "Find someone who matches your persona and walk them through your updated prototype, observing what triggers their interest and what makes them stop or hesitate (use Card 39: Feedback Quadrant to organize your observations into four clear, actionable categories).",
          "Track habit signals: did they say they'd come back? Did they ask how to share it? Did they try to take a next step without being prompted? These spontaneous behaviors are your most important data (use Card 43: Smart Actions Engine to map the habit triggers that naturally emerged during the test).",
          "Collect raw data: how long did they spend on each screen? What did they ignore? What did they try to click that wasn't clickable? Physical behavior beats stated opinions every single time."
        ],
        summary: "Testing with a persona type means you're testing assumptions, not just visuals. By the end of this test you should know: does this person's behavior match the habit loop you designed for in lesson 2.3?"
      },
      {
        id: "2.7",
        title: "Measure Habit Signals",
        dtStage: "learn",
        exerciseType: "metrics-log",
        points: [
          "Did users return, share, or try to take a next step without prompting? These are your habit signals, which are far more valuable than whether they said they 'liked it' (use Card 40: Planning for Change to map what shifts in behavior you need to design for in Phase 3).",
          "Update your persona card with real behavioral data from the test, replacing assumptions with actual observations. A persona that evolves with evidence is more useful than one that stays perfect on paper.",
          "Identify the single most important habit to build or remove. Think about what one change in the experience would have the biggest impact on whether your persona naturally returns? (use Card 44: Pick Top 5 to filter your learning into the actions that matter most going into Phase 3)."
        ],
        summary: "Measuring habits means looking past what users say into what they actually do. If a user says they love it but wouldn't use it without being reminded, that's the critical finding. Carry that insight into Phase 3."
      }
    ]
  },
  {
    id: "phase-3",
    num: 3,
    title: "Phase 3: Build",
    subtitle: "Branding, AI tools, UX writing, features, and product deliverables",
    objective: "Define your unique position in the market, build a credible brand, and prototype a product with clear features, benefits, and deliverables.",
    lessons: [
      {
        id: "3.1",
        title: "Find the Gap to Bridge",
        dtStage: "empathize",
        exerciseType: "research-canvas",
        points: [
          "What exists in the market today, and what does your persona consistently say is missing? The gap between those two is your real opportunity (use Card 05: Reading & Learning to audit 3 competitor offerings and identify their structural weaknesses).",
          "Research how competitors brand themselves, examining what visual language, tone, and promises they use, and where their customers publicly complain (use Card 06: Spotting Trends to identify market shifts that are creating new gaps right now).",
          "Branding research: what do the brands your persona already trusts look and sound like? Your brand needs to fit their world before it can win them over (use Card 11: How Things Work Map to diagram how value currently flows between players in your market)."
        ],
        summary: "Before you brand or build anything, understand the exact gap you're filling. A gap analysis tells you not just what's missing, but why it's missing, and that 'why' often reveals the real opportunity."
      },
      {
        id: "3.2",
        title: "USP, Reason to Believe & UX Writing",
        dtStage: "define",
        exerciseType: "insight-ranking",
        points: [
          "USP: write the one sentence that explains why your product is different from every other option. If you can't say it clearly in one sentence, the USP isn't defined yet (use Card 10: Using Customer Words to write the USP in language your persona would actually use and believe).",
          "Reason to Believe: name the specific, concrete proof that your USP is true, such as a number, a case study, a guarantee, or a credential. Without RTB, a USP is just marketing noise (use Card 13: Step by Step Experience to map where in the customer journey your proof points land hardest).",
          "UX writing: every button, headline, and error message is a piece of writing. Make each one direct, human, and specific: 'Send my invoice' beats 'Submit' every time (use Card 15: Customer Profiles to check that the tone fits your persona's expectations and reading level)."
        ],
        summary: "Your USP, Reason to Believe, and UX copy form the foundation of your brand's credibility. Customers make decisions based on how you communicate before they even use your product, and this lesson is where that communication gets sharp."
      },
      {
        id: "3.3",
        title: "Features, Benefits & Product Deliverables",
        dtStage: "ideate",
        exerciseType: "idea-statement",
        points: [
          "Features describe what your product does, while benefits describe what your customer gains. Users buy benefits, not features. Map each feature to a specific benefit that your persona actually cares about (use Card 25: Feature Store to list all possible features and pair each with a clear, tangible customer benefit).",
          "Define your 3 core product deliverables: the specific, tangible things a customer receives when they work with you or use your product. Make them concrete and time bound (use Card 24: One Page Concept to write a clear summary of what you deliver, when, and how).",
          "AI tools and social media: identify which AI tools would accelerate your build, and which 2 social channels your persona actually uses regularly (use Card 27: Idea Sprints to brainstorm channel strategies and AI integrations in a fast, focused session)."
        ],
        summary: "A product without clear deliverables is just an idea. By the end of this lesson, you should be able to tell any customer exactly what they get, when they get it, and what difference it will make, all in plain language."
      },
      {
        id: "3.4",
        title: "Brand + Niche Alignment",
        dtStage: "validate",
        exerciseType: "niche-builder",
        points: [
          "Test whether your brand identity matches your persona's expectations, by showing your USP, colour palette, and tone to 2 real users who match your persona and asking: 'Does this feel like it's made for you?' (use Card 39: Feedback Quadrant to organize what they say into useful, actionable categories).",
          "Show your Reason to Believe to someone who doesn't know you, and see if they buy it instantly or hesitate. The hesitation is the specific problem you need to solve (use Card 29: Idea Cafe to run a quick group conversation that surfaces unexpected doubts early).",
          "Update your Niche Builder with your product section: what the product is, what it delivers, and why your persona would choose it over every alternative they currently have."
        ],
        summary: "Brand validation isn't about getting approval, it is about discovering where your brand message fails to land. Carry that feedback directly into the prototype phase and let it shape what you build next."
      },
      {
        id: "3.5",
        title: "Build a Clickable Prototype",
        dtStage: "prototype",
        exerciseType: "sketch-log",
        points: [
          "Turn your sketch into a clickable mockup using Canva, Figma, or even linked PowerPoint slides. Apply your brand by using the colours, fonts, and tone you defined in lesson 3.2 consistently (use Card 38: Business Slide Deck to build a deck that explains your product visually to new users).",
          "Every screen should reflect your USP: if a screen doesn't connect to the core benefit, cut it. Simplicity wins over completeness every time (use Card 36: Style Boards to stay visually consistent across all screens of the prototype).",
          "Include your real UX copy, using actual button text, actual headlines, and actual error messages. This is what users will read and judge your product by (use Card 35: Image Moods to check that the visual direction aligns with the emotional tone you want to create)."
        ],
        summary: "A clickable prototype is the first version of your product that feels real. It's not the finished product, it is the testable version. Every choice in this prototype should trace back to something you learned about your persona in Phase 2."
      },
      {
        id: "3.6",
        title: "Usability Test",
        dtStage: "test",
        exerciseType: "observation-log",
        points: [
          "Run a click through test with 5 users: give them one task to complete and observe how they navigate. Don't help them, just watch where they get stuck and note everything (use Card 39: Feedback Quadrant to classify every observation into clear, actionable categories).",
          "Measure task completion rate: what percentage of users completed the task without help? A rate below 70% means the design needs significant work before you show it to a paying customer (use Card 31: Role Play to simulate the user experience yourself with a fresh perspective before running the full test).",
          "Document the top 3 points of friction, which are the places where every user paused, went back, or expressed frustration. These are your highest priority design fixes before launch."
        ],
        summary: "Usability testing reveals what your assumptions hid. By the end of this test you should know your completion rate, your top 3 friction points, and exactly what needs to change before you show the product to anyone who pays."
      },
      {
        id: "3.7",
        title: "Measure & Improve",
        dtStage: "learn",
        exerciseType: "metrics-log",
        points: [
          "Compare your completion rate against your target. If you aimed for 80% and got 50%, that is clear signal, not failure. Diagnose exactly which screens caused the drop off and why (use Card 40: Planning for Change to map the changes needed and the order in which to tackle them).",
          "Name your top 2 fixes, which are the changes that would have the highest impact on user success. Build those before you show the product to any paying customer, not after (use Card 44: Pick Top 5 to rank every possible fix by impact and effort so you focus on what moves the needle).",
          "Update your clickable prototype with the 2 fixes and update your Niche Builder: your product section should now reflect the tested, refined version, not the original concept you started Phase 3 with."
        ],
        summary: "Measuring and improving is what separates products that launch successfully from products that launch quietly and disappear. Two targeted fixes based on real usability data are worth more than a complete redesign based on anyone's opinion."
      }
    ]
  },
  {
    id: "phase-4",
    num: 4,
    title: "Phase 4: Money",
    subtitle: "Market positioning, revenue models, and client proposals",
    objective: "Research your market, define your pricing position, build your revenue model, and validate it with a real potential client.",
    lessons: [
      {
        id: "4.1",
        title: "Research the Market",
        dtStage: "empathize",
        exerciseType: "research-canvas",
        points: [
          "Map the pricing landscape in your market: what do competitors charge, who pays it, and why? Look for the segment that is underserved, which is too expensive at the top and too unreliable at the bottom (use Card 05: Reading & Learning to audit 3 competitors in real detail).",
          "Talk to your persona about money: what do they currently pay for solutions to this problem? What would feel 'worth every penny' vs 'that's too much for what it is'? (use Card 06: Spotting Trends to see whether pricing expectations in your market are shifting).",
          "Identify the 3 market tiers: low end (cheap, acceptable quality), mid range (balanced value), and premium (expensive, high trust). Map where the biggest unmet need lives and why (use Card 05: Reading & Learning to compare how each tier positions and communicates itself)."
        ],
        summary: "Pricing research isn't just about what the market charges, it is about understanding what value means to your persona at each price point. By the end of this lesson you should know exactly where the gap exists between what's being charged and what's being delivered."
      },
      {
        id: "4.2",
        title: "Market Positioning",
        dtStage: "define",
        exerciseType: "insight-ranking",
        points: [
          "Position your product in one of the 3 tiers from lesson 4.1. This is a strategic choice, not just a price tag. Your position determines who you attract, how you communicate, and what clients expect from you (use Card 18: Prioritization Matrix to evaluate which position is most defensible given your strengths).",
          "Write your positioning statement: 'For [WHO], [PRODUCT] is the [WHAT] that [CORE BENEFIT], unlike [ALTERNATIVES].' Make it specific enough that it naturally rejects customers who aren't the right fit (use Card 21: Start with Why to ground the positioning in a deeper purpose your persona genuinely cares about).",
          "Test your position for defensibility: can you name 2 reasons a well funded competitor couldn't easily copy your position within 6 months? If not, the position needs to be sharper or more specialized."
        ],
        summary: "Positioning is the strategic decision that everything else flows from. A clear position tells the right customers 'this is made for you' and tells the wrong customers 'this isn't for you', and both outcomes are valuable for your business."
      },
      {
        id: "4.3",
        title: "Revenue Model & Proposal",
        dtStage: "ideate",
        exerciseType: "idea-statement",
        points: [
          "Choose your primary revenue model based on your positioning and persona: retainer (steady monthly income for ongoing support), per project (single scoped engagements), or subscription (recurring access to a product or service) (use Card 38: Business Slide Deck to visualize the model and make it pitch ready for any conversation).",
          "Write a simple client proposal: state what you deliver, when you deliver it, what you need from the client, and how much it costs, all on one page in plain, direct English (use Card 26: 30 second Pitch to practice explaining the proposal out loud in 30 seconds or less).",
          "LLC basics: separating your business from your personal accounts protects your savings and makes invoicing professional. Know the key steps before you sign any client agreement."
        ],
        summary: "Revenue comes from a clear offer, not from a great idea. This lesson is about translating your positioning into something a real client could read, understand, and say yes to, without needing a follow up call to clarify what you actually do."
      },
      {
        id: "4.4",
        title: "Pitch Simulation",
        dtStage: "validate",
        exerciseType: "niche-builder",
        points: [
          "Practice your 30 second pitch out loud to someone who doesn't know your product, asking if they can immediately understand what you do and who it is for without any follow up questions (use Card 26: 30 second Pitch to refine the language based on their real-time reaction).",
          "Run a break even calculation: how many clients or sales do you need per month to cover your costs and pay yourself a livable amount? This number becomes your minimum viable revenue target (use Card 29: Idea Cafe to workshop the calculation with a small group and stress test every assumption).",
          "Update your Niche Builder money section: add your revenue model, your price point, and your positioning statement. The Niche Builder should now include your full financial logic alongside your product and persona."
        ],
        summary: "A pitch simulation puts your revenue model in front of a real person and measures their reaction. By the end of this lesson, your pricing should be clear, your math should be sound, and your pitch should be explainable in under 30 seconds."
      },
      {
        id: "4.5",
        title: "Prototype Your Offer",
        dtStage: "prototype",
        exerciseType: "sketch-log",
        points: [
          "Build a 1-page offer sheet: list what's included, what it costs, and what the client needs to provide. Make pricing tiers clear and scannable, because most clients make their initial decision in under 30 seconds of reading (use Card 38: Business Slide Deck to structure the offer sheet visually and professionally).",
          "Write the 'why us' paragraph that directly addresses your target client's biggest fear or hesitation, focusing on their specific concerns about hiring someone like you instead of your own strengths (use Card 24: One Page Concept to keep the offer sheet focused on one clear, compelling message per section).",
          "Include your terms: what additional work costs extra, how long revisions take, and what happens if scope changes. Clear terms prevent most client disputes before they even start."
        ],
        summary: "Your offer sheet is the first real artifact of your business. It takes everything from this phase, including positioning, pricing, model, and terms, and puts it into something a client can hold, read, and decide on. Prototype it first, and polish it after you have tested it."
      },
      {
        id: "4.6",
        title: "Test With a Real Prospect",
        dtStage: "test",
        exerciseType: "observation-log",
        points: [
          "Share your offer sheet with 1 real potential client, someone who fits your persona and actually needs what you are selling. Watch how they read it: what do they skip, what do they re-read? (use Card 01: Customer Chats to structure the follow up conversation after they have had a chance to review).",
          "What objections came up first? Objections aren't rejection, they are information. The most common objection tells you what is unclear or missing in your positioning or offer (use Card 39: Feedback Quadrant to categorize every reaction into something you can act on specifically).",
          "Would they pay? At what price point? Even a 'not right now' contains useful information about timing, budget, or trust. Document it carefully because it tells you exactly what needs to change."
        ],
        summary: "Testing with a real prospect is the most honest data you'll collect in this entire phase. No amount of internal refinement replaces the moment a real person reads your offer and tells you exactly what they think."
      },
      {
        id: "4.7",
        title: "Measure Revenue Readiness",
        dtStage: "learn",
        exerciseType: "metrics-log",
        points: [
          "Revenue readiness isn't about closing a deal, it is about knowing your offer is clear, your price is defensible, and your value is understood by the people you are targeting. Did the prospect express genuine interest or give you a clear reason not to proceed?",
          "Adjust your price or offer based on what you heard in lesson 4.6. If every prospect balked at price, either the price is wrong or the value is not communicated clearly enough. Learn to distinguish between the two (use Card 44: Pick Top 5 to identify the highest impact adjustments to make first).",
          "Run a final break even check with your updated numbers. Compare it to the revenue you now realistically expect from your first 3 clients: is the business viable at this price? (use Card 40: Planning for Change to map the path from first client to sustainable monthly revenue)."
        ],
        summary: "Revenue readiness means you can answer three questions without hesitation: What does it cost? What do they get? Why is it worth it? If any of those answers require more than two clear sentences, Phase 4 isn't finished yet."
      }
    ]
  },
  {
    id: "phase-5",
    num: 5,
    title: "Phase 5: Launch",
    subtitle: "Network, consumer awareness, find talent, and learn to lead",
    objective: "Take your validated product and offer to market: build your network, collect real feedback, find the right collaborators, and launch with measurable goals.",
    lessons: [
      {
        id: "5.1",
        title: "Network & Consumer Awareness",
        dtStage: "empathize",
        exerciseType: "research-canvas",
        points: [
          "Consumer awareness: how do people in your target market discover businesses like yours? Map every touchpoint, including word of mouth, social media, search, and events, to find where your persona is most likely to first hear about you (use Card 09: Partner Maps to map who actually influences your persona's purchasing decisions).",
          "How to network: identify the 10 people in your existing circle who are either potential clients or who know potential clients. Warm introductions outperform cold outreach by a factor of 10 (use Card 16: Team Hierarchy Map to understand the decision making structure of your target clients and who holds the real buying power).",
          "Write down 10 names, their connection to you, and what value you can offer them before asking for anything: networking starts with giving, not with selling."
        ],
        summary: "Launch success starts long before launch day. This lesson is about mapping the human network that will carry your product to its first customers, and understanding that the most powerful channel is often a trusted person, not an algorithm."
      },
      {
        id: "5.2",
        title: "Feedback Loops & Growth Strategy",
        dtStage: "define",
        exerciseType: "insight-ranking",
        points: [
          "Feedback loops: define exactly how you'll collect feedback consistently after launch, such as a weekly call, a feedback form, a survey after delivery, or a simple WhatsApp message. The method doesn't matter; the consistency does (use Card 40: Planning for Change to map a concrete 30-day feedback rhythm).",
          "Choose 3 growth metrics that tell you the business is actually growing. Focus on real business metrics like active clients, inbound referrals, or monthly revenue instead of vanity metrics like followers (use Card 41: Customer Channels Map to connect each metric to the specific channel it measures and tracks).",
          "Growth strategy: referrals, strategic partnerships, and word of mouth are the cheapest and highest trust channels you have. For each, define one specific action you will take in the first 30 days after launch: not a plan, but a date and a name."
        ],
        summary: "A growth strategy without metrics is just intention. By the end of this lesson you should have 3 specific metrics, a system for collecting feedback, and one concrete growth action per channel, with dates attached to each one."
      },
      {
        id: "5.3",
        title: "Find the Right Talent",
        dtStage: "ideate",
        exerciseType: "idea-statement",
        points: [
          "Identify what roles you genuinely need now compared to what you can handle yourself for the first 90 days. Premature hiring is one of the leading causes of early business failure: don't build a team before you have consistent, predictable revenue (use Card 16: Team Hierarchy Map to sketch the team you eventually want vs what you actually need right now).",
          "Where to find collaborators: the best first hires are often already in your network, including designers, developers, or marketers who know you, trust your direction, and share your standards (use Card 30: Team Sprints to run a quick collaborative session with potential collaborators before committing to anything formal or expensive).",
          "Write a simple brief for your first key hire or freelancer: what's the role, what's the deliverable, what's the timeline, and what skills are absolutely non-negotiable? A clear brief attracts the right people and naturally repels the wrong ones."
        ],
        summary: "Finding talent isn't about hiring, it is about attracting the right people at the right time. A clear brief, an honest role description, and a genuine existing relationship are worth more than any job posting and formal interview process."
      },
      {
        id: "5.4",
        title: "Lead, Don't Manage",
        dtStage: "validate",
        exerciseType: "niche-builder",
        points: [
          "The difference between leading and managing: managers control tasks, leaders set direction. When you set a clear enough vision, your collaborators can make good decisions without being supervised every step of the way (use Card 37: Team Roadmap to map a clear 90 day direction that anyone who works with you can follow).",
          "Practical leadership: define what 'done well' looks like for each role, give people the autonomy to get there in their own way, and create a rhythm of short, focused check ins, avoiding constant oversight (use Card 37: Team Roadmap to align everyone on weekly milestones without micromanaging the specific path they take).",
          "Complete your full venture profile in the Niche Builder: persona, product, pricing, positioning, and now your team structure and launch approach. This completed profile is your graduation document."
        ],
        summary: "Leading instead of managing is harder in the short term and dramatically better in the long term. This lesson is about setting the conditions for your team to succeed without you being in the room, and completing your venture profile as your final deliverable."
      },
      {
        id: "5.5",
        title: "Build Your Launch Kit",
        dtStage: "prototype",
        exerciseType: "sketch-log",
        points: [
          "Write 1 social post per channel you plan to use at launch: each post should speak directly to your persona's most pressing pain point, not to a generic or vague audience (use Card 41: Customer Channels Map to plan the content and timing for each channel specifically).",
          "Build your launch day checklist: what exactly needs to happen on day one? Who sends what, to whom, and when? A launch without a checklist is a launch full of things you forgot at the worst possible moment (use Card 42: Conversation Cards to script the key conversations you will have on launch day, including pitches, follow ups, and thank yous).",
          "Draft your referral message template: a short, specific message your early clients can forward to their network that explains what you do and who it's for. Make it easy for others to spread the word without having to think too hard about how."
        ],
        summary: "A launch kit turns your launch plan into tangible, ready-to-use assets: posts written, checklist built, referral template ready to send. By the end of this lesson, you should be able to launch tomorrow if you had to, since everything is in place."
      },
      {
        id: "5.6",
        title: "Soft Launch & Test",
        dtStage: "test",
        exerciseType: "observation-log",
        points: [
          "Launch to your 10 warm contacts from lesson 5.1 first, before going public. These people know you, trust you, and will give you the most honest, actionable early feedback you will ever get (use Card 39: Feedback Quadrant to capture every reaction into the four categories that actually matter).",
          "Track what happens: how many opened your message? How many clicked your link? How many booked a call or made a purchase? Each number tells you something specific about exactly where your conversion is breaking down (use Card 04: Direct User Feedback to follow up with everyone who didn't convert and find out the real reason why).",
          "Collect 5 pieces of specific, useful feedback in the first 48 hours: not 'it looks great' but 'I didn't understand what you were selling until the third paragraph' or 'the price felt surprisingly low for what you are offering.'"
        ],
        summary: "A soft launch is a controlled experiment, not a quiet failure. Starting with warm contacts lets you test your launch kit, your offer clarity, and your conversion flow before exposing it to a cold audience that has no particular reason to give you a second chance."
      },
      {
        id: "5.7",
        title: "Measure & Graduate",
        dtStage: "learn",
        exerciseType: "metrics-log",
        points: [
          "Check your 3 growth metrics from lesson 5.2. Did you hit your targets in the soft launch? If not, diagnose the specific gap: was it awareness (not enough people heard about it), interest (they heard but didn't engage), or conversion (they engaged but didn't commit)? (use Card 40: Planning for Change to map the next 90 days based on exactly what the soft launch taught you).",
          "Write your 90 day plan: 3 specific actions, 3 metrics to measure, and one milestone you'll celebrate when you hit it. This plan is what separates people who launched from people who actually built a sustainable business (use Card 44: Pick Top 5 to decide which 5 actions in your 90 day plan will create the highest impact).",
          "Complete your full venture profile in the Niche Builder: every section should now be filled in based on what you built, tested, and learned across all 5 phases. This is your graduation document, which is the evidence that you did the work (use Card 37: Team Roadmap to map where the business goes from here and who will help you get there)."
        ],
        summary: "Graduation isn't a destination, it is a checkpoint. You've completed 5 phases of Design Thinking, built and tested a real product concept, and have a validated niche with a working offer. What you do next with this foundation is entirely up to you."
      }
    ]
  }
];

export const lessonHeroImages: Record<string, string> = {
  "1.1": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
  "1.2": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
  "1.3": "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
  "1.4": "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1200&q=80",
  "1.5": "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80",
  "1.6": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
  "1.7": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
  "2.1": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
  "2.2": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
  "2.3": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80",
  "2.4": "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1200&q=80",
  "2.5": "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80",
  "2.6": "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80",
  "2.7": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
  "3.1": "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1200&q=80",
  "3.2": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
  "3.3": "https://images.unsplash.com/photo-1507207611509-ec012433ff52?auto=format&fit=crop&w=1200&q=80",
  "3.4": "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1200&q=80",
  "3.5": "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80",
  "3.6": "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80",
  "3.7": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
  "4.1": "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80",
  "4.2": "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80",
  "4.3": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80",
  "4.4": "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1200&q=80",
  "4.5": "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80",
  "4.6": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
  "4.7": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
  "5.1": "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80",
  "5.2": "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=1200&q=80",
  "5.3": "https://images.unsplash.com/photo-1507207611509-ec012433ff52?auto=format&fit=crop&w=1200&q=80",
  "5.4": "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1200&q=80",
  "5.5": "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80",
  "5.6": "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80",
  "5.7": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
};
