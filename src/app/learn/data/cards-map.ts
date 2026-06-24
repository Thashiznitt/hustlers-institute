// Maps each lesson (phase.lesson) to the design cards most relevant to its
// Design Thinking stage. All 46 cards are covered at least once across the 35
// lessons, with card *stage* aligned to lesson *dtStage*:
//   X.1 Empathize → Research   | X.2 Define → Synthesis | X.3 Ideate → Ideation
//   X.4 Validate → Ideation/pitch | X.5 Prototype → Prototyping (make)
//   X.6 Test → Prototyping (test) | X.7 Learn → Prototyping/Growth
export const suggestedCardsMap: Record<string, string[]> = {
  // Phase 1: Discover
  "1.1": ["interviews", "people-shadowing", "culture-probe"],
  "1.2": ["themes", "2-by-2-axis", "journey-map"],
  "1.3": ["point-of-view", "hmw-questions", "idea-napkin"],
  "1.4": ["elevator-pitch", "heaven-and-hell", "stakeholder-maps"],
  "1.5": ["graphic-recording", "legos"], // legos: newly homed (Prototyping make)
  "1.6": ["feedback-grid", "role-playing"],
  "1.7": ["my-top-5", "idea-fridge"],
  // Phase 2: Habits & Understand
  "2.1": ["culture-probe", "photo-studies", "diaries"],
  "2.2": ["end-user-maps", "empathy-map", "experience-map", "behavior-engine"],
  "2.3": ["idea-shopping", "hmw-questions", "brainstorming"],
  "2.4": ["elevator-pitch", "heaven-and-hell"],
  "2.5": ["conversation-starters", "mood-board"],
  "2.6": ["feedback-grid", "card-sorting"], // card-sorting: newly homed (Prototyping test)
  "2.7": ["future-scenarios", "my-top-5"],
  // Phase 3: Build
  "3.1": ["desk-research", "trend-research"],
  "3.2": ["system-map", "journey-map", "end-user-maps"],
  "3.3": ["idea-shopping", "idea-napkin", "brainstorming"],
  "3.4": ["world-cafe", "feedback-grid"],
  "3.5": ["collage", "mood-board", "props"], // props: newly homed (Prototyping make)
  "3.6": ["role-playing", "feedback-grid"],
  "3.7": ["future-scenarios", "my-top-5"],
  // Phase 4: Money
  "4.1": ["desk-research", "trend-research", "competitive-analysis"], // competitive-analysis: newly homed (Research / positioning)
  "4.2": ["2-by-2-axis", "semantic-analysis"],
  "4.3": ["golden-circle", "idea-napkin"],
  "4.4": ["world-cafe", "workshops"],
  "4.5": ["pitch-deck", "props"],
  "4.6": ["interviews", "feedback-grid"],
  "4.7": ["my-top-5", "future-scenarios"],
  // Phase 5: Launch
  "5.1": ["stakeholder-maps", "primary-research"],
  "5.2": ["experience-journey", "org-charts"],
  "5.3": ["brainstorming", "org-charts"],
  "5.4": ["team-journey", "workshops"],
  "5.5": ["experience-journey", "marketing-funnel", "content-calendar"], // marketing-funnel + content-calendar: newly homed (Growth / consumer awareness)
  "5.6": ["feedback-grid", "primary-research", "conversation-starters"],
  "5.7": ["future-scenarios", "my-top-5", "team-journey", "content-calendar"],
};

export const industryDefaults: Record<string, string> = {
  "Sports & Recreation": "gym bookings, Muay Thai classes, and personal trainer slots",
  "Food & Drink": "healthy meal prep delivery and local restaurant reservations",
  "Transit & Delivery": "local taxi rides and motorcycle delivery couriers",
  "Arts & Culture": "gallery opening tickets and local museum passes",
  "Music & Nightlife": "lounge table bookings and VIP event guestlists",
  "Beauty & Wellness": "mobile spa appointments and home hair salon bookings",
  "Home & Professional": "mobile laundry requests and home deep cleaning",
  "Creatives & Design": "photoshoots, logo design, and video editing sessions",
  "Marketing & Content": "social media posts, UGC videos, and brand promotion",
  "Retail & Streetwear": "thrift clothing sales and custom sneaker customizations",
  "E-commerce & Digital": "online sticker packs and digital beat downloads",
  "Gen Z Gig Work": "micro-tasks, mystery shopping, and crowd-deliveries",
  "Furniture & Woodwork": "custom furniture orders and antique woodwork repairs",
  "Real Estate & Apartments": "house tour bookings and rental agent matching",
  "Car Hire & Rental": "local car rentals and peer-to-peer vehicle sharing",
  "Legal & Consulting": "contract drafting reviews and legal consulting hours",
  "Tech & Development": "custom website builds and mobile app hosting checks",
  "Data Analytics": "business dashboards and spreadsheet database cleanups",
  "Printing & Branding": "custom apparel prints, banners, and business flyers",
  "Accounting & Bookkeeping": "tax filing preparations and monthly sales calculations",
  "Travel & Touring": "itinerary planning and local safari tour bookings",
  "Airbnb & Property Hosting": "guest check-in coordination and property cleaning tasks"
};

export function getCaseStudyScenario(phaseId: string, name: string, industry: string, type: string): string {
  if (phaseId === "phase-1") {
    return `You are preparing to launch a local app for "${name}" in the "${industry}" industry, focusing on "${type}". Outline your startup plan in simple terms.`;
  }
  if (phaseId === "phase-2") {
    return `Your lifestyle app, "${name}" (in the "${industry}" industry), has 5,000 signups, but users order once and never return. You need to research the issue in the context of "${type}" and design a simple habit trigger.`;
  }
  if (phaseId === "phase-3") {
    return `During a weekend sale of "${name}", your website slows down. The tech team blames the design layout, and the designer blames the server database. You need to coordinate a speed fix for booking "${type}".`;
  }
  if (phaseId === "phase-4") {
    return `A business client in the "${industry}" sector wants to hire you to build their delivery platform. They ask for a monthly retainer proposal for your work on "${name}".`;
  }
  if (phaseId === "phase-5") {
    return `You are launching your lifestyle app, "${name}", in a neighboring city next month. You have a $300 total budget and need to design a referral plan and track success for your "${type}" services.`;
  }
  return "";
}

interface IndustryTerms {
  actionVerb: string;
  itemSingular: string;
  providerTerm: string;
  userGoal: string;
  painPoint: string;
}

export function getIndustryTerms(industry: string): IndustryTerms {
  switch (industry) {
    case "Sports & Recreation":
      return { actionVerb: "book", itemSingular: "gym class", providerTerm: "gym instructors", userGoal: "getting fit", painPoint: "overbooked classes" };
    case "Food & Drink":
      return { actionVerb: "order", itemSingular: "meal delivery", providerTerm: "local kitchens", userGoal: "getting fresh food", painPoint: "late or cold deliveries" };
    case "Transit & Delivery":
      return { actionVerb: "hail", itemSingular: "ride", providerTerm: "local drivers", userGoal: "traveling safely", painPoint: "long pickup wait times" };
    case "Arts & Culture":
      return { actionVerb: "buy", itemSingular: "exhibition ticket", providerTerm: "galleries & museums", userGoal: "visiting art shows", painPoint: "sold out ticket passes" };
    case "Music & Nightlife":
      return { actionVerb: "reserve", itemSingular: "lounge table", providerTerm: "event organizers", userGoal: "attending events", painPoint: "denied entry at doors" };
    case "Beauty & Wellness":
      return { actionVerb: "schedule", itemSingular: "massage appointment", providerTerm: "beauty specialists", userGoal: "getting pampered", painPoint: "last-minute cancellations" };
    case "Home & Professional":
      return { actionVerb: "request", itemSingular: "cleaning service", providerTerm: "house cleaners", userGoal: "getting chores done", painPoint: "poor service quality" };
    case "Creatives & Design":
      return { actionVerb: "hire", itemSingular: "photoshoot project", providerTerm: "creative freelancers", userGoal: "getting assets created", painPoint: "delayed project drafts" };
    case "Marketing & Content":
      return { actionVerb: "order", itemSingular: "UGC video promo", providerTerm: "content creators", userGoal: "growing online presence", painPoint: "low video engagement" };
    case "Retail & Streetwear":
      return { actionVerb: "buy", itemSingular: "streetwear item", providerTerm: "thrift clothing sellers", userGoal: "buying unique outfits", painPoint: "damaged items received" };
    case "E-commerce & Digital":
      return { actionVerb: "download", itemSingular: "digital asset", providerTerm: "digital creators", userGoal: "getting digital files", painPoint: "expired download links" };
    case "Gen Z Gig Work":
      return { actionVerb: "claim", itemSingular: "micro-task", providerTerm: "gig companies", userGoal: "making side money", painPoint: "delayed gig payments" };
    case "Furniture & Woodwork":
      return { actionVerb: "order", itemSingular: "custom woodwork item", providerTerm: "carpenters", userGoal: "getting custom furniture", painPoint: "wrong size dimensions" };
    case "Real Estate & Apartments":
      return { actionVerb: "book", itemSingular: "flat viewing", providerTerm: "property agents", userGoal: "finding a rental apartment", painPoint: "fake listing photos" };
    case "Car Hire & Rental":
      return { actionVerb: "rent", itemSingular: "vehicle", providerTerm: "car owners", userGoal: "hiring a car", painPoint: "unmaintained engine issues" };
    case "Legal & Consulting":
      return { actionVerb: "request", itemSingular: "contract review", providerTerm: "freelance lawyers", userGoal: "verifying agreements", painPoint: "hidden legal clauses" };
    case "Tech & Development":
      return { actionVerb: "request", itemSingular: "website build", providerTerm: "web developers", userGoal: "getting a site launched", painPoint: "buggy mobile screen errors" };
    case "Data Analytics":
      return { actionVerb: "request", itemSingular: "analytics dashboard", providerTerm: "data analysts", userGoal: "understanding sales reports", painPoint: "inaccurate spreadsheet calculations" };
    case "Printing & Branding":
      return { actionVerb: "order", itemSingular: "custom apparel print", providerTerm: "print shops", userGoal: "getting items printed", painPoint: "blurry logo prints" };
    case "Accounting & Bookkeeping":
      return { actionVerb: "request", itemSingular: "tax filing prep", providerTerm: "accountants", userGoal: "filing sales taxes", painPoint: "missing expense receipts" };
    case "Travel & Touring":
      return { actionVerb: "book", itemSingular: "safari tour itinerary", providerTerm: "local travel guides", userGoal: "booking custom tours", painPoint: "cancelled tour schedules" };
    case "Airbnb & Property Hosting":
      return { actionVerb: "book", itemSingular: "property cleaning", providerTerm: "cleaning managers", userGoal: "preparing rooms for guests", painPoint: "unclean rooms on check-in" };
    default:
      return { actionVerb: "book", itemSingular: "service", providerTerm: "service providers", userGoal: "scheduling appointments", painPoint: "unreliable service quality" };
  }
}

export function getVentureApplication(cardId: string, name: string, industry: string, type: string): string {
  const terms = getIndustryTerms(industry);
  const lowercaseType = type.toLowerCase();

  switch (cardId) {
    case "interviews":
      return `Find 5 potential clients who frequently ${terms.actionVerb} ${terms.itemSingular}s. Run direct interviews, asking: "Walk me through the last time you attempted to ${terms.actionVerb} a ${terms.itemSingular}. What was the biggest hassle?"\n\n👉 **Example:** Ask a friend who uses similar services: 'Tell me about the last time you tried to ${terms.actionVerb} a ${terms.itemSingular}. What went wrong?' Listen closely for complaints about ${terms.painPoint}.`;
    case "people-shadowing":
      return `Watch a customer in real-time as they look for and try to ${terms.actionVerb} a ${terms.itemSingular} online. Write down exactly where they hesitate, look confused, or get stuck before finishing their checkout.\n\n👉 **Example:** Sit next to a user and watch them try to ${terms.actionVerb} a ${terms.itemSingular} on their phone. Note if they spend too long looking for pricing or get stuck on the confirmation screen.`;
    case "culture-probe":
      return `Have 3 active users text you a feedback log (e.g. an emoji and a 1-sentence description) every single time they use ${name} to ${terms.actionVerb} ${terms.itemSingular}s this week.\n\n👉 **Example:** Ask 3 testers to text you a quick emoji (like 😡 for 'frustrated by ${terms.painPoint}' or 😊 for 'service completed') every time they try ${terms.userGoal} this week.`;
    case "primary-research":
      return `Gather 3 target gig workers or clients from the ${industry} market. Pitch them the core "${name}" model and check if they would trust the platform enough to execute bookings.\n\n👉 **Example:** Call 3 local ${terms.providerTerm} and pitch them: 'If we build ${name} to help you get customers for your ${lowercaseType} services, would you list with us for a 10% booking fee?'`;
    case "desk-research":
      return `Research 2 major local competitors offering ${lowercaseType} services. Analyze their pricing, booking convenience levels, and map what local regulations protect user safety in the ${industry} sector.\n\n👉 **Example:** Download a competitor's app. Try to ${terms.actionVerb} a ${terms.itemSingular} ourselves, verify how much they charge, and read Google reviews to see if customers complain about ${terms.painPoint}.`;
    case "diaries":
      return `Have 2 clients keep a simple journal for 10 days, tracking every time they encounter a ${terms.painPoint} while trying to handle their ${lowercaseType} needs.\n\n👉 **Example:** Have a regular client write down a quick note in their notes app every time they fail to get a reliable ${terms.itemSingular} or have to deal with ${terms.painPoint}.`;
    case "stakeholder-maps":
      return `Draw a map connecting all key players for ${name}: the core users, the ${terms.providerTerm} who deliver the actual service, and the payment and logistics suppliers.\n\n👉 **Example:** Sketch a simple flowchart: User -> ${name} App -> Partner ${terms.providerTerm} -> Payment Gateway. Draw lines representing how money, bookings, and notifications flow between them.`;
    case "semantic-analysis":
      return `Audit your website copy for ${name}. Remove any complex technical jargon and replace it with direct client-friendly terms (e.g., use "Book ${terms.itemSingular}" instead of "Initialize Transaction Schema Pipeline").\n\n👉 **Example:** Instead of 'Deploying automated localized provider lookup interfaces', write a simple, friendly slogan: 'Find and ${terms.actionVerb} ${terms.itemSingular}s near you instantly in 3 taps.'`;
    case "system-map":
      return `Draft a flowchart showing how data flows when a user clicks "${terms.actionVerb.toUpperCase()}" on ${name}. Ensure that notifying ${terms.providerTerm} does not bottleneck the database speed.\n\n👉 **Example:** Draw a technical sequence diagram: User taps '${terms.actionVerb.toUpperCase()}' -> Database creates booking -> Webhook triggers push notification to partner ${terms.providerTerm} -> Partner accepts booking.`;
    case "journey-map":
      return `Map every step a customer goes through to complete a ${terms.itemSingular} checkout on ${name}. Identify and remove extra form fields to reduce total checkout time to under 3 minutes.\n\n👉 **Example:** List the 5 steps: 1. User wants to ${terms.actionVerb} a ${terms.itemSingular}, 2. Opens ${name}, 3. Selects ${terms.itemSingular}, 4. Inputs details, 5. Completes booking. Focus on reducing step 4 friction.`;
    case "org-charts":
      return `Map the roles for partner ${terms.providerTerm} on ${name}. Define who handles booking confirmations vs who updates the active service catalog lists.\n\n👉 **Example:** Assign responsibilities: Who is in charge of onboarding the partner ${terms.providerTerm}? Who handles billing issues? Who reviews customer complaints about ${terms.painPoint}?`;
    case "themes":
      return `Cluster customer feedback from your early ${name} trials into thematic categories: group complaints related to ${terms.painPoint} separate from pricing or usability bugs.\n\n👉 **Example:** Take 10 feedback texts and group them into 3 piles: 'Booking Latency' (e.g. late confirmation), 'Service Quality' (e.g. issues with ${terms.painPoint}), and 'Price Value'.`;
    case "2-by-2-axis":
      return `Plot proposed features for ${name} on a grid. Prioritize high-value core utilities (like instant booking confirmations) over complex additions that take weeks to code.\n\n👉 **Example:** Grid layout: place 'Instant checkout of ${terms.itemSingular}s' in the High-Impact/Low-Effort quadrant (build first), and 'Custom VR avatar interface' in the Low-Impact/High-Effort quadrant (discard).`;
    case "collage":
      return `Have 5 target users pick visual images representing their emotions when experiencing a ${terms.painPoint}. Use these findings to choose the colors and style of your brand logo.\n\n👉 **Example:** Ask users to pick images representing their feelings about ${terms.painPoint}. If they pick images of cluttered mazes, choose simple, clean typography and minimal layouts to show ease of use.`;
    case "mood-board":
      return `Assemble fonts, color schemes, and clean layouts from premium brands in the ${industry} space. Make sure ${name}'s style sheet feels premium and clean.\n\n👉 **Example:** Take screenshots of 3 leading apps in the ${industry} space. Identify their typography, tan/gold colors, and layouts, and adapt these to ${name}'s luxury dashboard aesthetic.`;
    case "team-journey":
      return `Draw a visual launch roadmap for ${name}. Set key weekly targets for onboarding the first 5 partner ${terms.providerTerm}, testing payments, and launching the beta.\n\n👉 **Example:** Month 1 Checklist: Week 1: Mockup the ${terms.itemSingular} booking screens. Week 2: Sign up 3 partner ${terms.providerTerm}. Week 3: Run end-to-end booking tests. Week 4: Public launch.`;
    case "pitch-deck":
      return `Draft a 5-slide proposal deck explaining how ${name} makes it stress-free to ${terms.actionVerb} ${terms.itemSingular}s. Present this to local merchant partners to convince them to join your network.\n\n👉 **Example:** Slide 1: Brand intro (${name}). Slide 2: The ${terms.painPoint} problem. Slide 3: Our app booking solution. Slide 4: 10% commission model. Slide 5: Launch timeline.`;
    case "feedback-grid":
      return `Present a simple clickable prototype of your ${terms.actionVerb} screen to 4 users. Categorize their comments into: Positive features, direct criticisms, user questions, and new feature suggestions.\n\n👉 **Example:** Show a demo of ${name} and group feedback: (+) Liked the 1-click booking, (-) Hated the gold font size on white backdrop, (?) Asked if we support card payments, (!) Suggested adding a rating system for ${terms.providerTerm}.`;
    case "future-scenarios":
      return `Map out how ${name} would adjust its fees if transaction processing costs rise, or if local rules limit how ${terms.providerTerm} list their services.\n\n👉 **Example:** What if card processing fees increase by 3% next year? Calculate if we should absorb the cost, increase the commission to partner ${terms.providerTerm}, or charge a small user convenience fee.`;
    case "experience-journey":
      return `Trace the customer's path from scanning an offline QR code flyer at a physical location to downloading the app, and finally completing their first ${terms.itemSingular} booking.\n\n👉 **Example:** Put a flyer with a QR code at a local hub. The customer scans it -> opens a web booking link -> selects a ${terms.itemSingular} -> checks out -> gets a calendar invite. Map each conversion rate.`;
    case "conversation-starters":
      return `Use prompt cards to ask target customers: "What is your single biggest complaint when trying to get a reliable ${terms.itemSingular} in your area?" Listen to their stories.\n\n👉 **Example:** Ask a target customer: 'What's the most annoying part of trying to get a reliable ${terms.itemSingular} in this neighborhood?' Listen for stories about overbooking or lack of customer service.`;
    case "behavior-engine":
      return `Create a helpful automatic trigger on ${name}: send a follow-up discount code or a friendly thank-you prompt exactly when a user finishes their ${terms.itemSingular} service.\n\n👉 **Example:** Set up a rule: When a user's ${terms.itemSingular} service status changes to 'COMPLETED', automatically send a WhatsApp alert: 'Thanks for booking! Use code RETRY5 for $5 off your next booking.'`;
    case "my-top-5":
      return `Present a list of 8 proposed features to 5 potential clients of ${name}. Have them rank their top 5 must-haves so you don't build features that nobody wants.\n\n👉 **Example:** Ask 5 target users to rank: 1. Instant SMS confirmations, 2. Chat with ${terms.providerTerm}, 3. Apple Pay, 4. Multi-booking, 5. Custom reminders, 6. Interactive maps, 7. Referral bonuses, 8. Review ratings. Build the top 5 first.`;
    default:
      return `Apply this toolkit card to map out customer behavior and simplify the checkout flow for ${name} in the ${industry} space.`;
  }
}
