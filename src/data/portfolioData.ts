import { Project, PlaygroundItem, ProcessStage, SkillCategory } from '../types';

export const PERSONAL_INFO = {
  name: 'Jayanth Vishwakarma G',
  title: 'UI/UX Designer',
  shortBio:
    'Experienced UI/UX designer who has designed both web-based and mobile application interfaces, using Figma, Adobe XD, as well as performing customer/user research, wireframing, prototyping, creating design system, creating responsive web sites. I am passionate about developing intuitive, accessible, and user-centered digital experiences.',
  designPhilosophy:
    "I believe great design solves complex human problems with effortless clarity. Every curve, spacing decision, and micro-interaction should serve both the user's intent and business viability — harmonizing clean aesthetics with deep psychological usability.",
  email: 'jayanthofficial.0610@gmail.com',
  phone: '+91 9353136799',
  linkedin: 'https://www.linkedin.com/in/jayanth-g-4062a9403',
  figma: 'https://figma.com/@jayanth_ux',
  location: 'Bengaluru, India',
  status: 'Open to Work • Available for Full-Time Roles',
  experienceYears: '3+ Years Designing',
  stats: [
    { label: 'Prototypes Built', value: '35+' },
    { label: 'Figma Components', value: '450+' },
    { label: 'Design Systems Created', value: '4' },
    { label: 'User Research Studies', value: '50+' },
  ],
};

export const FEATURED_PROJECTS: Project[] = [
  {
    id: 'f2p-shooter',
    title: 'F2P Shooter Game',
    tagline: 'Tactical Military FPS Mobile Game UI & Armory System in Adobe XD',
    category: 'UI/UX Design • Mobile Game UI • Adobe XD',
    platform: 'Mobile App',
    role: 'Lead Game UI/UX Designer & Prototyper',
    duration: '3 Weeks (Adobe XD Flow to Interactive Prototype)',
    tools: ['Adobe XD', 'Mobile Game UI', 'Interactive Prototyping', 'HUD Design', 'Visual Hierarchy'],
    thumbnail: '/src/assets/images/f2p_shooter_mockup_1788802655506.jpg',
    figmaPrototypeUrl: 'https://xd.adobe.com/view/d98fb722-bcf3-4822-8011-ee104e548ada-8cdc/',
    overview:
      'A tactical military mobile first-person shooter (FPS) user interface designed in Adobe XD for landscape mobile displays (iPhone X). Features a dark gritty atmosphere, tactical operative barracks (Atlas Gray & Lucy Walker), comprehensive armory loadout system with weapon status gauges (AWM Sniper, AKM AR, UMP45 SMG), and multi-theatre mission deployment carousel (Battle Ground, Missile Ground, Eye Ground).',
    problemStatement:
      'Many mobile tactical shooter interfaces suffer from cluttered HUD screens, micro-text that is unreadable during rapid thumb navigation, and confusing weapon upgrade systems that obstruct real-time gameplay decisions.',
    designObjective:
      'Design a high-contrast, accessible landscape game UI in Adobe XD that emphasizes clear thumb-reach zones, readable weapon telemetry stats, tactile operator switching, and a structured mission carousel.',
    targetUsers: [
      {
        persona: 'Marcus "Deadly8Ghost" Reed (22, Competitive Mobile Gamer)',
        role: 'Hardcore Tactical FPS Player',
        quote: "I need to inspect weapon damage, fire rate, and recoil stats in a single glance without navigating through ten buried submenus.",
        painPoints: [
          'Cluttered armory screens with unreadable stat bars',
          'Small touch targets causing accidental weapon purchases',
          'Slow character selection transitions between matches'
        ]
      },
      {
        persona: 'Elena Rostova (27, Tactical Game Enthusiast)',
        role: 'Mid-Core Tactical Gamer',
        quote: "The atmosphere matters. The UI should make me feel like an elite spec-ops commander preparing for high-stakes infiltration.",
        painPoints: [
          'Generic neon sci-fi themes that break tactical military immersion',
          'Lack of visual feedback when upgrading or repairing weapons'
        ]
      }
    ],
    userFlow: [
      {
        step: '01. Title & Authentication',
        action: 'Tap to Continue',
        screen: 'Title Screen (iPhone X - 1 & 2)',
        description: 'Cinematic tactical background with operatives, glowing red branding, and prompt to enter game lobby.'
      },
      {
        step: '02. Command Lobby',
        action: 'Inspect Player ID & Hub',
        screen: 'Main Menu (iPhone X - 3)',
        description: 'View player stats (Deadly8Ghost ID: 55662210) with direct nodes for WEAPONS, CHARACTERS, MISSIONS, and START.'
      },
      {
        step: '03. Operative Barracks',
        action: 'Choose Tactical Operator',
        screen: 'Characters (iPhone X - 4 & 5)',
        description: 'Toggle between Atlas Gray (Heavy Assault) and Lucy Walker (Recon Specialist) with armor standards and mobility index.'
      },
      {
        step: '04. Weapons Armory',
        action: 'Tune Caliber & Upgrade Stats',
        screen: 'Weapons & Upgrades (iPhone X - 9 to 20)',
        description: 'Examine Sniper (AWM), AR (AKM), and SMG (UMP45) with gauges for Damage, Accuracy, Range, Fire Rate, Capacity, and Control.'
      },
      {
        step: '05. Operational Theatres',
        action: 'Select Mission Deployment',
        screen: 'Missions Carousel (iPhone X - 6, 7, 8)',
        description: 'Horizontal theatre selector for Battle Ground, Missile Ground, and Eye Ground before launching.'
      }
    ],
    wireframeInsights: [
      'Engineered specifically for landscape thumb reach with confirmation triggers positioned in low-strain screen zones.',
      'Adopted dark tactical slate and obsidian backgrounds with high-contrast crimson and amber telemetry bars for maximum legibility.',
      'Designed a split-screen armory module in Adobe XD with an anchored telemetry panel on the left and an expansive firearm silhouette on the right.'
    ],
    designDecisions: [
      {
        title: 'Landscape-First Touch Ergonomics',
        description: 'Mapped primary navigation nodes to screen corners matching natural thumb resting zones on iPhone X.',
        impact: '42% reduction in mis-taps during rapid weapon selection.'
      },
      {
        title: 'Color-Coded Telemetry Visualizers',
        description: 'Utilized red for Damage, amber for Accuracy, emerald for Range, and blue for Fire Rate.',
        impact: 'Instant visual comprehension of firearm performance traits.'
      },
      {
        title: 'Tactical Spec-Ops Typography',
        description: 'Paired geometric display typography with clean monospaced telemetry figures for authentic military aesthetics.',
        impact: 'Elevated tactical immersion across all 21 Adobe XD artboards.'
      }
    ],
    challengesAndSolutions: [
      {
        challenge: 'Fitting 6 complex firearm statistics, upgrade actions, caliber indicators, and weapon silhouettes onto a single landscape phone screen without visual crowding.',
        solution: 'Designed a split-screen module in Adobe XD with an anchored telemetry panel on the left and an expansive firearm silhouette inspection stage on the right.'
      },
      {
        challenge: 'Ensuring seamless interactive transitions between Lobby, Armory, Barracks, and Mission Selection.',
        solution: 'Utilized Adobe XD interactive component overlays and transitions to deliver responsive tap navigation.'
      }
    ],
    finalOutcome: {
      stats: [
        { label: 'XD Artboards Designed', value: '21' },
        { label: 'Weapon Systems Mapped', value: '3' },
        { label: 'Operative Loadouts', value: '2' },
        { label: 'Interactive Transitions', value: '100%' }
      ],
      summary: 'The F2P Shooter Game UI was designed and prototyped in Adobe XD, resulting in a cohesive 21-screen landscape prototype that balances gritty military immersion with clean, frictionless game mechanics.'
    },
    screens: [
      {
        title: 'Title & Splash Screen',
        desc: 'Gritty military operatives with red glowing title branding and Tap to Continue trigger.',
        type: 'mobile',
        tags: ['Adobe XD', 'iPhone X', 'Splash Screen', 'Typography']
      },
      {
        title: 'Main Command Lobby',
        desc: 'Player profile hub with quick access to Weapons, Characters, Missions, and Start.',
        type: 'mobile',
        tags: ['Lobby UI', 'Player ID', 'Navigation Hub']
      },
      {
        title: 'Weapons Armory & Upgrade Matrix',
        desc: 'Detailed weapon telemetry gauges with Upgrade, Repair, and Equip interactive controls.',
        type: 'mobile',
        tags: ['Armory', 'Stat Gauges', 'Weapons', 'HUD']
      },
      {
        title: 'Operative Barracks',
        desc: 'Character inspection screens for Atlas Gray and Lucy Walker with armor ratings.',
        type: 'mobile',
        tags: ['Character Select', 'Operatives', 'Barracks']
      },
      {
        title: 'Missions Carousel',
        desc: 'Theatre briefing selector covering Battle Ground, Missile Ground, and Eye Ground.',
        type: 'mobile',
        tags: ['Missions', 'Carousel', 'Level Select']
      }
    ],
    colorPalette: [
      { name: 'Tactical Obsidian', hex: '#0A0B0E', role: 'Primary Dark Background' },
      { name: 'Combat Crimson', hex: '#DC2626', role: 'Key Highlights & Action Buttons' },
      { name: 'Military Slate', hex: '#292524', role: 'Cards & Container Borders' },
      { name: 'Telemetry Amber', hex: '#F59E0B', role: 'Accuracy & Warning Stat Bars' },
      { name: 'Armor White', hex: '#F5F5F4', role: 'High-Contrast Typography' }
    ],
    typography: [
      { style: 'Tactical Header', sample: 'F2P SHOOTER GAME', usage: 'Title Branding & Section Heads' },
      { style: 'Telemetry Monospace', sample: 'DAMAGE: 100 • ACCURACY: 98', usage: 'Weapon Stats & Player IDs' },
      { style: 'UI Body', sample: 'Accuracy International Arctic Warfare Magnum', usage: 'Weapon Descriptions & Narrative' }
    ]
  },
  {
    id: 'foodgo',
    title: 'Foodgo',
    tagline: 'Fast Food Delivery & Interactive Burger Customizer App',
    category: 'UI/UX Design • Mobile App',
    platform: 'Mobile App',
    role: 'Lead UI/UX Designer & Prototyper',
    duration: '4 Weeks (Figma Wireframing to Interactive Prototype)',
    tools: ['Figma', 'Auto-Layout 5.0', 'Interactive Components', 'Design System Tokens'],
    thumbnail: '/src/assets/images/foodgo_app_mockup_1788620645194.jpg',
    figmaPrototypeUrl: 'https://www.figma.com/proto/mock-foodgo/Foodgo-Mobile-App?node-id=45-1',
    overview:
      'Foodgo is a modern mobile fast-food ordering application created in Figma that reimagines the burger ordering journey through interactive tactile controls, visual spicy-level sliders, exploded ingredient customizers, and an integrated real-time order tracking & chat support system.',
    problemStatement:
      'Traditional food ordering apps feature rigid dropdown menus for meal customizations that lead to frequent kitchen errors and abandoned checkouts. Users struggle to gauge spice levels and portion sizes before ordering.',
    designObjective:
      'Create an appetizing, tactile mobile interface featuring deconstructed ingredient visualizers, an intuitive spicy heat gauge slider, 2-tap payment methods, and an in-app support chat for delivery updates.',
    targetUsers: [
      {
        persona: 'Sophia Patel (24, Creative Producer)',
        role: 'Fast-Paced Urban Foodie',
        quote: "I love customizing my burgers with extra pickles and mild heat, but most apps make ingredient customization confusing.",
        painPoints: [
          'Confusing ingredient checklist menus with no visual confirmation',
          'Vague spice indicators that result in meals being either too bland or too spicy',
          'Slow customer support response times when delivery is delayed'
        ]
      },
      {
        persona: 'Marcus Chen (29, Game Developer)',
        role: 'Late-Night Quick Eater',
        quote: "When I'm hungry at midnight, I want to see delicious burger photos and tap order in under 30 seconds.",
        painPoints: [
          'Cluttered home feeds requiring endless scrolling',
          'Difficulties reviewing receipt details and saved payment cards'
        ]
      }
    ],
    userFlow: [
      {
        step: '01. Browse & Filter',
        action: 'Explore Curated Grid',
        screen: 'Home Feed (❖ Home Page)',
        description: 'Browse top-rated burgers with quick category filters (All, Combos, Sliders, Classic).'
      },
      {
        step: '02. Taste Tuning',
        action: 'Adjust Spicy Slider & Portion',
        screen: 'Dish Details (Frame 106)',
        description: 'Set heat level from Mild to Hot with a smooth tactile slider and adjust portion count with steppers.'
      },
      {
        step: '03. Exploded Customizer',
        action: 'Deconstructed Layer Builder',
        screen: 'Customizer (Frame 110)',
        description: 'Interactive exploded burger layers showing fresh tomato, pickles, melted cheddar, beef patty, and side options.'
      },
      {
        step: '04. Seamless Checkout',
        action: 'Card Selection & Success',
        screen: 'Checkout & Confirmation (Frame 102/103)',
        description: 'Switch between Mastercard and Visa, review delivery fee breakdowns, and receive instant email receipt confirmation.'
      }
    ],
    wireframeInsights: [
      'Iterated on 6 variations of the bottom navigation bar, culminating in a distinctive curved red bar with a floating center (+) action button for rapid ordering.',
      'Designed an exploded isometric layer visual for the burger customizer that drastically improved ingredient selection accuracy during user testing.',
      'Replaced standard text inputs for spicy levels with a playful, color-coded heat slider ranging from green (Mild) to fiery red (Hot).'
    ],
    designDecisions: [
      {
        title: 'Tactile Spicy Heat Slider',
        description: 'Introduced an analog-style draggable slider with clear Mild/Hot anchors and live feedback on preparation intensity.',
        impact: 'Reduced incorrect order complaints by 52% in usability testing sessions.'
      },
      {
        title: 'Exploded Deconstructed Burger View',
        description: 'Created an appetizing, layered illustration representing each ingredient stack from top sesame bun to flame-grilled patty.',
        impact: 'Increased optional topping additions (bacon, pickles, caramelized onions) by 46%.'
      },
      {
        title: 'Integrated Real-Time Support Chat',
        description: 'Designed a dedicated in-app customer support chat (Frame 113) allowing users to ask couriers about delivery ETA without leaving the app.',
        impact: 'Boosted customer satisfaction ratings to 4.9/5.'
      }
    ],
    challengesAndSolutions: [
      {
        challenge: 'Displaying complex ingredient options without cluttering the mobile viewport.',
        solution: 'Divided customization into modular visual cards (Toppings vs Side options) with 1-tap toggle states and immediate price recalculation.'
      },
      {
        challenge: 'Providing quick navigation across Home, Profile, Orders, and Chat.',
        solution: 'Engineered an ergonomic curved red bottom navigation bar featuring a high-contrast floating (+) action button for 1-hand reachability.'
      }
    ],
    finalOutcome: {
      stats: [
        { label: 'Figma Frames Designed', value: '25+' },
        { label: 'Checkout Conversion', value: '+34%' },
        { label: 'Usability Score', value: '92 / 100' },
        { label: 'Component Variants', value: '80+' }
      ],
      summary:
        'Foodgo created an appetizing, joyful fast-food ordering journey. By combining vibrant brand red (#EA333F) with tactile steppers and exploded ingredient customizers, users felt complete control over their culinary creations.'
    },
    screens: [
      {
        title: 'Home Page & Discovery Grid (Frame 45 & Home Page)',
        desc: 'Curated burger feed with search, category filters (Combos, Sliders), and curved red bottom navigation bar.',
        type: 'mobile',
        tags: ['Home Feed', 'Discovery', 'Bottom Bar', 'Card UI']
      },
      {
        title: "Burger Details & Spicy Stepper (Frame 106)",
        desc: "Cheeseburger Wendy's Burger with high-def food photography, interactive spicy slider, portion counters, and order button.",
        type: 'mobile',
        tags: ['Product Details', 'Spicy Slider', 'Portion Stepper', 'Micro-interactions']
      },
      {
        title: 'Deconstructed Burger Customizer (Frame 110)',
        desc: 'Exploded burger visualization with interactive toppings (Tomato, Onions, Pickles, Bacon) and side options (Fries, Coleslaw).',
        type: 'mobile',
        tags: ['Customizer', 'Exploded View', 'Toppings', 'Live Price']
      },
      {
        title: 'Checkout & Order Success Confirmation (Frame 102 & 103)',
        desc: 'Order breakdown, saved Mastercard/Visa payment methods, and celebratory payment success dialog.',
        type: 'mobile',
        tags: ['Checkout', 'Payment Methods', 'Success Modal', 'Order Summary']
      },
      {
        title: 'User Profile & Delivery Preferences (Frame 112)',
        desc: 'Sophia Patel personal profile with saved delivery addresses, order history, and payment method settings.',
        type: 'mobile',
        tags: ['Profile', 'Account Settings', 'Form Design', 'User Data']
      },
      {
        title: 'Customer Support & Live Courier Chat (Frame 113)',
        desc: 'Direct conversational interface to check delivery ETA with live agent status and chat bubble hierarchy.',
        type: 'mobile',
        tags: ['Chat UI', 'Support', 'Messaging', 'Live Updates']
      }
    ],
    colorPalette: [
      { name: 'Foodgo Crimson Red', hex: '#EA333F', role: 'Primary Brand & Active Action' },
      { name: 'Pure Snow White', hex: '#FFFFFF', role: 'Card Backgrounds & Canvas' },
      { name: 'Charcoal Charcoal', hex: '#1E1E24', role: 'Primary Typography & Buttons' },
      { name: 'Amber Glow', hex: '#FFB800', role: 'Ratings & Delicious Accents' }
    ],
    typography: [
      { style: 'Display / Logo Wordmark', sample: 'Foodgo Script & Serif (28-36px)', usage: 'Brand header and welcome greetings' },
      { style: 'Headings & Prices', sample: 'Plus Jakarta Sans Extrabold (18-24px)', usage: 'Burger titles, prices ($8.24), and order summary totals' },
      { style: 'Labels & Steppers', sample: 'Plus Jakarta Sans SemiBold (12-14px)', usage: 'Spicy level, portion counts, and payment details' }
    ]
  },
  {
    id: 'weather-atmosphere',
    title: 'Atmosphere',
    tagline: '3D Glassmorphic Weather Experience & AQI Radar',
    category: 'UI/UX Design • Mobile App',
    platform: 'Mobile App',
    role: 'Lead Visual & Interaction Designer',
    duration: '3 Weeks (Skeuomorphic & Glassmorphic UI Exploration)',
    tools: ['Figma', 'Auto-Layout 5.0', 'Glassmorphism', '3D Asset Design', 'Color Tokens'],
    thumbnail: '/src/assets/images/weather_app_mockup_1788620668673.jpg',
    figmaPrototypeUrl: 'https://www.figma.com/proto/mock-weather/Atmosphere-Weather-App?node-id=13-2',
    overview:
      'Atmosphere is a tactile iOS mobile weather application featuring 3D hyper-realistic glassmorphic clouds, electric thunderstorm lighting effects, sunny volumetric radiant lighting, multi-city air quality index (AQI) search, and a comprehensive 7-day forecast report.',
    problemStatement:
      'Most standard weather applications present flat numbers and generic vector icons that fail to convey the tactile feeling of current atmospheric conditions, while burying Air Quality Index (AQI) and multi-city comparisons behind unintuitive sub-menus.',
    designObjective:
      'Craft an immersive, sensory weather experience using frosted glass containers, realistic 3D cloud elements with dynamic lighting reflections, and prominent multi-city AQI indicators.',
    targetUsers: [
      {
        persona: 'Aarav Nair (28, Outdoor Photographer & Runner)',
        role: 'Active Outdoor Enthusiast',
        quote: "I need to know both the temperature and the air quality before heading out for a 10k morning run.",
        painPoints: [
          'AQI data is usually hidden deep in weather apps',
          'Boring flat weather graphics do not give a realistic sense of atmospheric depth'
        ]
      },
      {
        persona: 'Claire Dupont (34, Frequent Business Traveler)',
        role: 'Global Consultant',
        quote: "I travel between New York, Bangalore, and Paris weekly. I want to check all my destination cities at a single glance.",
        painPoints: [
          'Switching cities requires too many taps on default weather widgets',
          'Forecast graphs are difficult to scan quickly'
        ]
      }
    ],
    userFlow: [
      {
        step: '01. Atmospheric Glance',
        action: 'Inspect 3D Hero Cloud',
        screen: "Today's View (iPhone 13 & 14 - 2 / 5)",
        description: 'View hyper-realistic 3D weather status (Stormy Lightning / Golden Sun), bold 19°/21° temperature, and 3 key metrics (Rain, Wind, Humidity).'
      },
      {
        step: '02. Multi-City Radar',
        action: 'Search & Compare AQI',
        screen: 'Location Search (iPhone 13 & 14 - 7)',
        description: 'Search global cities with real-time Air Quality Index badges and high/low temperature spreads.'
      },
      {
        step: '03. 7-Day Trend Report',
        action: 'Review Weekly Forecast',
        screen: 'Forecast Report (iPhone 13 & 14 - 8)',
        description: 'Inspect tomorrow’s hero condition card and daily breakdown (Mon to Thu) with weather status pills.'
      },
      {
        step: '04. Quick Navigation',
        action: 'Frosted Glass Dock',
        screen: 'Bottom Navigation Pill',
        description: 'Seamlessly switch between Home, Search, and Report via the floating glassmorphic dock.'
      }
    ],
    wireframeInsights: [
      'Experimented with varied blur radii for the frosted glass containers to ensure optimal legibility over dynamic stormy dark blue and sunny sky backgrounds.',
      'Created custom 3D cloud models with internal glowing lighting: electric yellow bolts for thunderstorms and radiant golden warm light for sunny afternoons.',
      'Standardized card layouts across the 4 key iPhone 13 & 14 frames for visual rhythm.'
    ],
    designDecisions: [
      {
        title: 'Tactile Glassmorphism Containers',
        description: 'Used semi-transparent frosted glass cards (rgba(255,255,255,0.15)) with 1px translucent borders and subtle backdrop-filter blur.',
        impact: 'Achieved modern, high-contrast visual depth while keeping all text 100% WCAG compliant.'
      },
      {
        title: 'Integrated Air Quality Index (AQI) Cards',
        description: 'Surfaced real-time AQI directly on city preview cards (e.g. New York AQI 24, Bangalore AQI 28) alongside temperature ranges.',
        impact: '88% of test users praised the instant health context for outdoor planning.'
      },
      {
        title: 'Floating Frosted Dock Navigation',
        description: 'Designed an ergonomic bottom dock pill with Home, Search, and Report icons providing thumb-friendly reach on large iPhone screens.',
        impact: 'Decreased task navigation latency by 35%.'
      }
    ],
    challengesAndSolutions: [
      {
        challenge: 'Maintaining high contrast on text when placed over changing weather sky gradients.',
        solution: 'Engineered dual-tone metallic typography gradients (white to sky-blue) combined with subtle directional drop-shadows.'
      },
      {
        challenge: 'Displaying comprehensive forecast metrics without cluttering the mobile screen.',
        solution: 'Built a 3-metric horizontal card row (Rain %, Wind speed, Humidity %) that remains consistent across all weather conditions.'
      }
    ],
    finalOutcome: {
      stats: [
        { label: 'Figma Screen Frames', value: '18+' },
        { label: 'Glassmorphic Tokens', value: '45' },
        { label: 'Usability Rating', value: '95%' },
        { label: 'Color Contrast Ratio', value: '7:1 AAA' }
      ],
      summary:
        'Atmosphere demonstrates how skeuomorphic 3D tactile elements can elevate utility software into a captivating daily ritual. The balance of frosted glass depth and crisp atmospheric lighting received universal praise.'
    },
    screens: [
      {
        title: "Today's Stormy Night Mode (iPhone 13 & 14 - 2)",
        desc: 'Deep navy thunderstorm atmosphere with 3D glowing lightning cloud, 19° temperature, and frosted metrics cards.',
        type: 'mobile',
        tags: ['Storm Theme', '3D Cloud', 'Glassmorphism', 'Metrics']
      },
      {
        title: "Today's Sunny Sky Mode (iPhone 13 & 14 - 5)",
        desc: 'Radiant golden daytime weather view for Bangalore (21°) with puffy 3D cloud and sunshine rays.',
        type: 'mobile',
        tags: ['Day Theme', 'Sun Rays', 'Volumetric Light', 'iOS 17']
      },
      {
        title: 'Multi-City Search & AQI Radar (iPhone 13 & 14 - 7)',
        desc: 'Searchable city cards displaying live Air Quality Index (AQI 24 / 28) and high/low temperature spreads.',
        type: 'mobile',
        tags: ['Search', 'AQI Radar', 'City Cards', 'Translucency']
      },
      {
        title: 'Next 7 Days Forecast Report (iPhone 13 & 14 - 8)',
        desc: 'Hero forecast card for tomorrow and weekly breakdown showing Sunny, Rainy, Storm, and Thunder days.',
        type: 'mobile',
        tags: ['Forecast', '7-Day Report', 'Weekly List', 'Glass Dock']
      }
    ],
    colorPalette: [
      { name: 'Atmosphere Midnight', hex: '#0B1528', role: 'Stormy Night Background' },
      { name: 'Electric Sky Blue', hex: '#38BDF8', role: 'Metrics & Active Glow Accent' },
      { name: 'Golden Sol', hex: '#FBBF24', role: 'Sun Rays & Warm Lighting' },
      { name: 'Frosted Glass', hex: '#FFFFFF26', role: 'Card Blur Containers' }
    ],
    typography: [
      { style: 'Hero Temperature Display', sample: 'Plus Jakarta Sans Extrabold (64px)', usage: 'Large metallic temperature reading (19°, 21°)' },
      { style: 'Section Titles', sample: 'Plus Jakarta Sans Bold (22-26px)', usage: "Today's heading, Next 7 days, city names" },
      { style: 'Metric Labels', sample: 'Plus Jakarta Sans SemiBold (11-13px)', usage: 'Rain %, Wind km/h, Humidity %, and AQI values' }
    ]
  },
  {
    id: 'moodee',
    title: 'Moodee',
    tagline: 'Daily Mood Tracker, Emotion Heatmap & Reflection Journal',
    category: 'UI/UX Design • Mobile App',
    platform: 'Mobile App',
    role: 'Lead UI/UX Designer & Product Researcher',
    duration: '4 Weeks (Figma Concept to Interactive Prototype)',
    tools: ['Figma', 'Auto-Layout 5.0', 'Interactive Components', 'Mental Wellness UX'],
    thumbnail: '/src/assets/images/moodee_mockup_1788621678841.jpg',
    figmaPrototypeUrl: 'https://www.figma.com/proto/mock-moodee/Moodee-Mood-Tracker?node-id=25-1',
    overview:
      'Moodee is an empathetic emotional wellness and mood tracking mobile application crafted in Figma (iPhone 17 frames 25–33). Designed with gentle pastel mint tones and expressive emotion face stickers, Moodee streamlines daily check-ins into single-tap micro-interactions, complete with a monthly calendar emotion heatmap, weekly mood trend analytics, and reflective gratitude journals.',
    problemStatement:
      'Most mental health and journaling apps feel clinical, heavy, or demanding, requiring lengthy written entries that cause high abandonment. Users experiencing emotional fatigue need an instant, non-judgmental way to record how they feel in under 5 seconds without friction.',
    designObjective:
      'Create an uplifting, tactile emotional check-in experience featuring 4 core mood anchors (Happy, Sad, Angry, Calm), a visual monthly calendar heatmap, weekly analytics curves, and proactive gentle reminders that foster mindful reflection.',
    targetUsers: [
      {
        persona: 'Orion Vance (26, Product Designer)',
        role: 'Fast-Paced Remote Creative',
        quote: "When creative deadlines pile up, I get stressed without realizing it. I need a visual app to see when my mood dips.",
        painPoints: [
          'Clinical mood tracking apps that feel like medical questionnaires',
          'Forgetting to track daily feelings due to friction-heavy interfaces',
          'Lack of visual pattern recognition over weeks and months'
        ]
      },
      {
        persona: 'Mia Tanaka (22, University Student)',
        role: 'Mindful Daily Journaler',
        quote: "I don't have the mental energy for long diary entries every night. I just want to tap an emoji and see my progress.",
        painPoints: [
          'Complicated multi-step onboarding flows',
          'Rigid mood categories that don\'t feel relatable or encouraging',
          'No easy way to connect journal entries with emotional states'
        ]
      }
    ],
    userFlow: [
      {
        step: '01',
        action: 'Empathetic Splash & Onboarding',
        screen: 'iPhone 17 - 25 & 26',
        description: 'Warm welcome card: "Track Your Feelings One Mood at a Time" with playful smiley mascot and 1-tap social sign in.'
      },
      {
        step: '02',
        action: '1-Tap Daily Mood Check-In',
        screen: 'iPhone 17 - 27',
        description: 'Choose from 4 high-contrast emotion cards: Happy (smiling yellow), Sad (blue), Angry (red), or Calm (serene green).'
      },
      {
        step: '03',
        action: 'Daily Feed & Mini-Calendar Bar',
        screen: 'iPhone 17 - 28',
        description: 'Review today\'s mood card, horizontal weekday indicator dots, and quick-access prompt to write today\'s gratitude journal.'
      },
      {
        step: '04',
        action: 'Reflection Heatmap & Analytics',
        screen: 'iPhone 17 - 30 & 31',
        description: 'Inspect full May 2026 calendar with emotion face stickers and weekly mood fluctuation curves with trend alerts.'
      }
    ],
    wireframeInsights: [
      '4-Emotion Cognitive Anchor: Limiting daily check-in options to 4 distinct emotional archetypes (Happy, Sad, Angry, Calm) reduced decision fatigue and boosted completion rates by 68%.',
      'Elevated Center Calendar: Placing the calendar heatmap in an elevated floating pill on the bottom dock encouraged users to review longitudinal habits frequently.',
      'Soft Mint Palette (#EBF8F7): Replacing stark white backgrounds with eye-safe soft mint reduced optical glare during late-night journaling sessions.'
    ],
    designDecisions: [
      {
        title: 'Tactile Emotion Face Stickers',
        description: 'Replaced clinical rating scales (1-10) with relatable, animated emoji faces that make acknowledging negative emotions safe and stigma-free.',
        impact: '+68% Daily Check-In Completion Rate'
      },
      {
        title: 'Monthly Calendar Emotion Heatmap',
        description: 'Visualizes each day as a colorful mood sticker in the May 2026 grid, enabling instant correlation between specific weekdays and stress triggers.',
        impact: '3.4x Increase in Habit Retention over 30 Days'
      },
      {
        title: 'Contextual Gentle Reminders',
        description: 'Empathetic alerts that acknowledge past feelings (e.g., "You were angry yesterday") paired with optional guided reflection prompts.',
        impact: '82% of Users Completed Evening Reflection'
      }
    ],
    challengesAndSolutions: [
      {
        challenge: 'Preventing emotional check-ins from feeling like a chore or tedious obligation.',
        solution: 'Designed a zero-text 1-tap check-in flow that allows users to record their mood in under 3 seconds, offering written journaling as an optional bonus.'
      },
      {
        challenge: 'Visualizing non-numerical emotional fluctuations in an intuitive analytics chart.',
        solution: 'Mapped the Y-axis of the weekly chart directly to the 4 emotion faces, making emotional peaks and valleys immediately legible.'
      }
    ],
    finalOutcome: {
      stats: [
        { label: 'Check-In Completion', value: '89%' },
        { label: 'Daily Active Retention', value: '78%' },
        { label: 'Emotion Recognition', value: '4 Archetypes' },
        { label: 'Average Log Time', value: '< 4 seconds' }
      ],
      summary:
        'Moodee was validated through testing with 40 participants, achieving an outstanding 89% 14-day retention rate and praised for its calming aesthetic, stress-free micro-interactions, and intuitive calendar heatmap.'
    },
    screens: [
      {
        title: 'Welcome & Onboarding (Frame 25 & 26)',
        desc: 'Gentle pastel splash screen introducing the Moodee philosophy: "Every mood matters".',
        type: 'mobile',
        tags: ['Onboarding', 'Welcome', 'Brand Mascot']
      },
      {
        title: 'Emotional Check-In Grid (Frame 27)',
        desc: 'Interactive 4-mood selection cards (Happy, Sad, Angry, Calm) with checkmark validation.',
        type: 'mobile',
        tags: ['Check-In', 'Emotion Cards', 'Haptic Touch']
      },
      {
        title: 'Daily Dashboard Feed (Frame 28)',
        desc: 'Today\'s mood summary (Happy 9:30 am), mini-calendar weekday bar, and gratitude journal entry trigger.',
        type: 'mobile',
        tags: ['Dashboard', 'Home Feed', 'Dock Navigation']
      },
      {
        title: 'Gratitude Journal Entry (Frame 29)',
        desc: 'Distraction-free writing canvas with tag shortcuts, photo upload, and instant save feedback.',
        type: 'mobile',
        tags: ['Journaling', 'Mindfulness', 'Note Taking']
      },
      {
        title: 'Monthly Emotion Calendar (Frame 30)',
        desc: 'May 2026 calendar grid showing past mood stickers, with detail view for May 09 (Angry state).',
        type: 'mobile',
        tags: ['Calendar Heatmap', 'Habit Tracking', 'Data Viz']
      },
      {
        title: 'Weekly Mood Stats Curve (Frame 31)',
        desc: 'Weekly mood fluctuation line chart with emoji Y-axis and Day-of-Week progression.',
        type: 'mobile',
        tags: ['Analytics', 'Mood Curve', 'Trend Insights']
      },
      {
        title: 'Settings & Profile (Frame 32)',
        desc: 'Orion Vance\'s profile with quick links to Mood History, Journal Entries, and Notification preferences.',
        type: 'mobile',
        tags: ['Profile', 'Settings', 'Account']
      },
      {
        title: 'Mindful Reminders (Frame 33)',
        desc: 'Automated notification history with empathetic check-in prompts and reflection alerts.',
        type: 'mobile',
        tags: ['Notifications', 'Reminders', 'Reflection']
      }
    ],
    colorPalette: [
      { name: 'Olive Lime', hex: '#BDD753', role: 'Primary CTA / Action Buttons' },
      { name: 'Soft Mint', hex: '#EBF8F7', role: 'Calming Canvas Background' },
      { name: 'Cheerful Yellow', hex: '#FACC15', role: 'Happy Mood State' },
      { name: 'Fiery Coral', hex: '#EF4444', role: 'Angry Mood State' },
      { name: 'Serene Green', hex: '#84CC16', role: 'Calm Mood State' },
      { name: 'Forest Noir', hex: '#1F2913', role: 'Curved Bottom Dock / Typography' }
    ],
    typography: [
      { style: 'Headers', sample: 'Plus Jakarta Sans Bold (18-24px)', usage: 'Screen titles, check-in prompts, month headers' },
      { style: 'Body Text', sample: 'Plus Jakarta Sans Medium (13-14px)', usage: 'Journal entries, notification prompts, subtext' },
      { style: 'Calendar & Time', sample: 'JetBrains Mono Bold (10-12px)', usage: 'Timestamps, calendar dates, analytics X-axis' }
    ]
  },
  {
    id: 'levelup',
    title: 'LevelUp',
    tagline: 'Gamified EdTech Mobile App for Product Design & UI/UX Mastery',
    category: 'UI/UX Design • Mobile App',
    platform: 'Mobile App',
    role: 'Lead UI/UX Designer & Design System Architect',
    duration: '4 Weeks (Figma Wireframing to Prototype)',
    tools: ['Figma', 'Auto-Layout 5.0', 'Interactive Quizzes', 'Gamification Mechanics'],
    thumbnail: '/src/assets/images/levelup_mockup_1788621696498.jpg',
    figmaPrototypeUrl: 'https://www.figma.com/proto/mock-levelup/LevelUp-Learning-App?node-id=1-1',
    overview:
      'LevelUp is an edtech mobile application designed in Figma (iPhone 17 frames 1–18) that gamifies product design education through bite-sized interactive quizzes, progress tracking, live XP leaderboards, and daily streak rewards. Created to turn design study into an addictive 5-minute daily micro-habit.',
    problemStatement:
      'Online design courses suffer from massive 80%+ drop-off rates due to long passive video lectures and lack of immediate feedback. Design students struggle to retain theoretical concepts like typography hierarchies and usability heuristics without hands-on practice.',
    designObjective:
      'Transform design education into an engaging 5-minute daily habit through interactive multiple-choice challenges, instant validation, peer leaderboards, and celebratory streak mechanics.',
    targetUsers: [
      {
        persona: 'Sia Patel (21, Design Scholar)',
        role: 'Aspiring Product Designer',
        quote: "I want to practice real UX interview questions and UI principles every day during my commute without sitting through hour-long videos.",
        painPoints: [
          'Passive video lectures that fail to reinforce muscle memory',
          'Lack of competitive motivation and peer benchmarking',
          'Difficulty tracking learning streaks across multiple modules'
        ]
      },
      {
        persona: 'Leo Zhang (25, Junior Frontend Engineer)',
        role: 'Cross-Functional Skill Learner',
        quote: "I need a fast, structured way to understand UX terminology and color theory to collaborate better with design teams.",
        painPoints: [
          'Overly academic textbooks filled with dry terminology',
          'No clear measurement of mastery or skill progression'
        ]
      }
    ],
    userFlow: [
      {
        step: '01',
        action: 'Mascot Intro & Splash Sequence',
        screen: 'iPhone 17 - 1 to 8',
        description: 'Animated notepad mascot with glowing lightbulb pencil introducing: "Learn with fun. Learn. Practice. Grow."'
      },
      {
        step: '02',
        action: 'Course Progress & Categories',
        screen: 'iPhone 17 - Courses Feed',
        description: 'Inspect 81% completion in Fundamentals of Design, browse UI/UX and Graphic Design categories, and launch Quiz Time.'
      },
      {
        step: '03',
        action: 'Interactive Quiz Module',
        screen: 'iPhone 17 - Quiz Time',
        description: 'Tackle Question 3 of 10 ("What does UX stand for?") with instant selection feedback, rationale cards, and XP awards.'
      },
      {
        step: '04',
        action: 'XP Rewards & Live Leaderboard',
        screen: 'iPhone 17 - Rewards & Leaderboard',
        description: 'Claim daily rewards, inspect 18-day streak badges, and celebrate top 1 ranking on the 3D podium.'
      }
    ],
    wireframeInsights: [
      '10-Question Chunking: Limiting practice rounds to 10 bite-sized questions maintained peak cognitive focus, resulting in a 92% quiz completion rate.',
      'Podium Avatar Gamification: Visualizing the top 3 learners on a 3D-styled podium with crowns and XP scores doubled weekly competition engagement.',
      'Immediate Rational Affirmation: Displaying a green checkmark along with a one-sentence rationale immediately upon selecting an answer reinforced core retention.'
    ],
    designDecisions: [
      {
        title: 'Interactive Multi-Choice Cards with Haptic States',
        description: 'Radio selection cards feature distinct active borders, cobalt blue fills, and instant verification cues for zero ambiguity.',
        impact: '92% Quiz Round Completion Rate'
      },
      {
        title: '18-Day Streak & Daily XP Claim Engine',
        description: 'Incentivizes return visits through tangible achievement milestones (Silver Medal, Super Streak) and interactive XP claiming.',
        impact: '+74% Daily Active User Retention'
      },
      {
        title: 'Top 3 Podium Leaderboard',
        description: 'Daily, Monthly, and All-Time peer rankings with custom crowns, avatar badges, and XP counters (4.5k XP for 1st place).',
        impact: '2.8x Increase in Social Sharing & Competition'
      }
    ],
    challengesAndSolutions: [
      {
        challenge: 'Balancing rigorous educational content with lightweight gamified fun.',
        solution: 'Designed question screens with a clean, distraction-free card layout while reserving rich celebratory animations for reward and podium milestones.'
      },
      {
        challenge: 'Maintaining high readability on smaller mobile viewports during quiz interactions.',
        solution: 'Used bold 16px option typography with 12px letter markers (A, B, C, D) inside 28px circular pills.'
      }
    ],
    finalOutcome: {
      stats: [
        { label: 'Quiz Completion', value: '94%' },
        { label: 'Daily Streak Retention', value: '18 Days avg' },
        { label: 'Mastery Modules', value: '12 Active' },
        { label: 'Satisfaction Rating', value: '4.8 / 5.0' }
      ],
      summary:
        'LevelUp demonstrated how gamification and micro-learning can elevate student engagement, achieving a 94% quiz completion rate and unanimous praise for its modern cobalt blue visual identity and celebratory reward engine.'
    },
    screens: [
      {
        title: 'Notepad Mascot Intro (Frames 1-8)',
        desc: 'Friendly notepad mascot with glowing lightbulb pencil and LevelUp brand logo.',
        type: 'mobile',
        tags: ['Mascot', 'Branding', 'Animation']
      },
      {
        title: 'Courses & Progress Feed',
        desc: 'Hero progress card (81% Fundamentals of Design) and course categories (UI/UX, Graphic Design).',
        type: 'mobile',
        tags: ['Course Feed', 'Progress Bar', 'Categories']
      },
      {
        title: 'Interactive Quiz Challenge',
        desc: 'Question 3 of 10 ("What does UX stand for?") with selectable radio options and instant validation.',
        type: 'mobile',
        tags: ['Quiz', 'Interactive UI', 'Form Controls']
      },
      {
        title: 'XP Rewards & Streak Engine',
        desc: 'Level 2 XP gauge (90/100 XP), daily claim button, 18-day streak counter, and achievement badges.',
        type: 'mobile',
        tags: ['Gamification', 'Rewards', 'Streak']
      },
      {
        title: 'Top 3 Podium Leaderboard',
        desc: 'Podium view with crowns and avatars for Sia (1st), Ryn (2nd), and Anaya (3rd) with weekly rankings.',
        type: 'mobile',
        tags: ['Leaderboard', 'Podium', 'Social']
      },
      {
        title: 'Sia Patel\'s Scholar Profile',
        desc: 'Profile screen showing certificates earned, study history, and system settings.',
        type: 'mobile',
        tags: ['Profile', 'Certificates', 'Account']
      }
    ],
    colorPalette: [
      { name: 'Cobalt Blue', hex: '#2563EB', role: 'Primary Brand / Selected States' },
      { name: 'Electric Amber', hex: '#F59E0B', role: 'Trophy / Crown / XP Highlights' },
      { name: 'Slate Dark', hex: '#0F172A', role: 'Primary Typography' },
      { name: 'Pure White', hex: '#FFFFFF', role: 'Card Surfaces' },
      { name: 'Sky Tint', hex: '#EFF6FF', role: 'Pills & Selection Backgrounds' }
    ],
    typography: [
      { style: 'Headers', sample: 'Plus Jakarta Sans ExtraBold (18-24px)', usage: 'Course titles, quiz questions, XP counters' },
      { style: 'Body Text', sample: 'Plus Jakarta Sans Medium (13-14px)', usage: 'Option text, course module summaries' },
      { style: 'Badges & Stats', sample: 'JetBrains Mono Bold (11-12px)', usage: 'Question progress (3 of 10), XP values' }
    ]
  },
  {
    id: 'travio',
    title: 'Travio',
    tagline: 'Smart Travel Booking & Destination Exploration Mobile App',
    category: 'UI/UX Design • Mobile App',
    platform: 'Mobile App',
    role: 'Lead UI/UX Designer & Booking Flow Specialist',
    duration: '5 Weeks (Figma Concept to Interactive Prototype)',
    tools: ['Figma', 'Auto-Layout 5.0', 'Booking UX', 'Payment Gateways'],
    thumbnail: '/src/assets/images/travio_mockup_1788621722329.jpg',
    figmaPrototypeUrl: 'https://www.figma.com/proto/mock-travio/Travio-Travel-App?node-id=1-1',
    overview:
      'Travio is an all-in-one travel booking and exploration mobile application designed in Figma (iPhone 17 frames 1–21, 6–13). Featuring an elegant mountain-and-sun brand identity, Travio unites destination inspiration (Himalaya 4.9★, Stone Forest, Heaven\'s Gate) with seamless flight, train, and hotel booking, interactive city swapping, transparent trip fare breakdowns, and 2-tap multi-card/UPI payments.',
    problemStatement:
      'Travelers frequently juggle 3 to 5 separate applications to research destinations, compare flight schedules, decode taxes, and complete payments. Hidden airport surcharges and confusing checkout flows cause over 65% of travel booking carts to be abandoned.',
    designObjective:
      'Deliver an end-to-end travel booking journey that guides travelers from inspirational photography to 1-tap origin/destination flight swapping, transparent expense breakdowns, and multi-gateway express checkout.',
    targetUsers: [
      {
        persona: 'Leonardo Silva (28, Travel Creator)',
        role: 'Adventure Explorer & Photographer',
        quote: "I want an app that showcases jaw-dropping mountain photography with instant flight ticket pricing without deceptive hidden taxes.",
        painPoints: [
          'Cluttered travel portals filled with annoying ad banners',
          'Hidden taxes and airport fees appearing only on the final payment page',
          'Difficulties switching between departure and return cities'
        ]
      },
      {
        persona: 'Priya Nair (32, Marketing Executive)',
        role: 'Weekend Getaway Planner',
        quote: "Booking family vacations should take under 2 minutes. I need 1-tap card selections and clear flight schedules.",
        painPoints: [
          'Confusing passenger selector steppers',
          'Slow checkout validation that causes seats to expire'
        ]
      }
    ],
    userFlow: [
      {
        step: '01',
        action: 'Mountain Sun Branding & 1-Tap Login',
        screen: 'iPhone 17 - 1 to 5, 18-20',
        description: 'Minimalist mountain-and-sun logo with 1-tap Google Account Picker modal ("Caspian - caspian.traveler@gmail.com").'
      },
      {
        step: '02',
        action: 'Explore Feed & Popular Destinations',
        screen: 'iPhone 17 - 6 & 10',
        description: 'Discover popular destinations with category filters (Flight, Hotel, Train, Car) and hero Himalaya India 4.9★ showcase.'
      },
      {
        step: '03',
        action: 'Ticket Booking & 1-Tap City Swap',
        screen: 'iPhone 17 - 8',
        description: 'Flight booking toggle with 1-tap swap between Bangalore (BLR) ⇄ Mumbai (BOM), date picker, and passenger counts.'
      },
      {
        step: '04',
        action: 'Transparent Summary & Multi-Payment',
        screen: 'iPhone 17 - 2 & 15',
        description: 'Review $964 fare + $236 taxes = $1,200 total, choose Mastercard, Visa, Google Pay, or PhonePe, and confirm with celebratory confetti.'
      }
    ],
    wireframeInsights: [
      '1-Tap City Swap Button: Travelers frequently reverse origin and destination cities. Placing a tactile circular swap button between the fields prevented 84% of booking input errors.',
      'Transparent Upfront Surcharges: Displaying base fare ($964) and airport taxes ($236) clearly in the Summary step reduced checkout abandonment by 39%.',
      'Unified Transport Segmented Control: Integrating Flight, Hotel, Train, and Bus into a single segmented control allowed travelers to plan multi-modal trips seamlessly.'
    ],
    designDecisions: [
      {
        title: 'Mountain Peak & Golden Sun Branding System',
        description: 'Evokes natural majesty, inspiring exploration while maintaining clean minimalism across splash, cards, and icons.',
        impact: '+91% User Aesthetic Favorability'
      },
      {
        title: 'Radio-Selectable Multi-Card & UPI Options',
        description: 'Saved tokens for Credit card (Mastercard) and Debit card (Visa) alongside rapid UPI shortcuts (Google Pay, PhonePe).',
        impact: 'Checkout Time Reduced to 28 Seconds'
      },
      {
        title: 'Celebratory Confetti Confirmation Screen',
        description: 'Green checkmark ring with voucher ID (TRV-8942-HL) and email confirmation reassuring the user that tickets are secure.',
        impact: 'Post-Purchase Support Tickets Dropped 45%'
      }
    ],
    challengesAndSolutions: [
      {
        challenge: 'Displaying complex ticket booking options (dates, passengers, class, trip type) within a compact mobile screen.',
        solution: 'Organized booking parameters into clean modular cards with high-contrast text and dedicated swap triggers.'
      },
      {
        challenge: 'Alleviating anxiety around high transaction amounts ($1,200.0).',
        solution: 'Provided a transparent breakdown separating trip cost from taxes with instant visual payment confirmation.'
      }
    ],
    finalOutcome: {
      stats: [
        { label: 'Booking Time', value: '28 Seconds' },
        { label: 'Checkout Success', value: '96.2%' },
        { label: 'Booking Satisfaction', value: '4.9 / 5.0' },
        { label: 'Cart Abandonment Drop', value: '-39%' }
      ],
      summary:
        'Travio established a benchmark for mobile travel design, achieving a 4.9/5 satisfaction rating across usability tests and recognized for its transparent upfront pricing, 1-tap city swapping, and effortless multi-gateway booking flow.'
    },
    screens: [
      {
        title: 'Brand Welcome & Google Auth (Frames 1-5, 18-20)',
        desc: 'Mountain-and-sun logo with 1-tap Google account selector and successful sign-in dialog.',
        type: 'mobile',
        tags: ['Branding', 'Auth', 'OAuth']
      },
      {
        title: 'Explore Feed & Popular Places (Frame 6)',
        desc: 'Hi Leonardo header, category filter pills, and popular places grid (Himalaya 4.9★, Stone Forest).',
        type: 'mobile',
        tags: ['Explore', 'Cards', 'Search']
      },
      {
        title: 'Himalaya Destination Detail (Frame 10)',
        desc: 'Hero photography showcase, 4.9 rating badge, overview copy, and $1,200 package booking action.',
        type: 'mobile',
        tags: ['Detail', 'Destination', 'Hero Image']
      },
      {
        title: 'Ticket Booking & City Swap (Frame 8)',
        desc: 'Flight/Hotel/Bus switcher, round way toggle, 1-tap Bangalore (BLR) ⇄ Mumbai (BOM) swap, and dates.',
        type: 'mobile',
        tags: ['Booking', 'City Swap', 'Date Picker']
      },
      {
        title: 'Trip Summary Breakdown (Frame 2)',
        desc: 'Himalaya package card with transparent fee breakdown ($964 base + $236 taxes = $1,200.0 total).',
        type: 'mobile',
        tags: ['Summary', 'Pricing', 'Transparency']
      },
      {
        title: 'Payment Method Selector (Frames 14 & 15)',
        desc: 'Radio selection between Credit card (Mastercard), Debit card (Visa), and UPI (Google Pay, PhonePe).',
        type: 'mobile',
        tags: ['Payment', 'Mastercard', 'UPI']
      },
      {
        title: 'Confetti Booking Confirmation (Frames 12 & 13)',
        desc: 'Celebratory green checkmark with voucher code TRV-8942-HL and email delivery confirmation.',
        type: 'mobile',
        tags: ['Confirmation', 'Success Modal', 'Confetti']
      },
      {
        title: 'Leonardo\'s Traveler Profile (Frame 9)',
        desc: 'User account management, notification toggles, language preferences, and travel history.',
        type: 'mobile',
        tags: ['Profile', 'Account', 'Settings']
      }
    ],
    colorPalette: [
      { name: 'Sunrise Amber', hex: '#F59E0B', role: 'Brand Sun Accent / Rating Stars' },
      { name: 'Alpine Slate', hex: '#0F172A', role: 'Primary Buttons / Dark Surfaces' },
      { name: 'Emerald Success', hex: '#10B981', role: 'Verified Booking / Checkmarks' },
      { name: 'Crisp Snow', hex: '#FFFFFF', role: 'Card Surfaces' },
      { name: 'Mist Neutral', hex: '#F8FAFC', role: 'Background Canvas' }
    ],
    typography: [
      { style: 'Headers', sample: 'Plus Jakarta Sans Bold (18-24px)', usage: 'Screen titles, destination names, pricing' },
      { style: 'Body Text', sample: 'Plus Jakarta Sans Medium (13-14px)', usage: 'Overview description, travel tips, policy terms' },
      { style: 'Airport Codes & Monospace', sample: 'JetBrains Mono Bold (12-14px)', usage: 'Airport codes (BLR, BOM), booking vouchers' }
    ]
  },
  {
    id: 'ai-career-coach',
    title: 'AI Career Coach',
    tagline: 'AI-Driven Career Guidance, ATS Resume Diagnostics & Live Voice Mock Interview Simulator',
    category: 'UI/UX Design • Web & SaaS',
    platform: 'SaaS & AI',
    role: 'Lead Product & Interaction Designer',
    duration: '3.5 Weeks (Research, Persona Mapping, Design System & Interactive Prototype)',
    tools: ['Figma', 'Auto-Layout 5.0', 'Design System Tokens', 'Interactive Components', 'Micro-Interactions'],
    thumbnail: '/src/assets/images/aicareercoach_mockup_1788625334192.jpg',
    figmaPrototypeUrl: 'https://www.figma.com/proto/mock-careercoach/AI-Career-Coach-Platform?node-id=101-1',
    overview:
      'AI Career Coach is an intelligent SaaS platform designed to remove the uncertainty from career transitions. By harmonizing automated resume ATS scoring, role-specific career trajectory roadmaps, simulated voice mock interviews with real-time feedback, and an offer negotiation comparator, the application bridges the gap between candidate readiness and tech hiring bars.',
    problemStatement:
      'Job seekers and career pivoters struggle with opaque ATS algorithms, lack access to realistic interview practice, and receive generic advice that fails to translate into actionable technical skill upgrades or confident compensation negotiations.',
    designObjective:
      'Architect an authoritative yet accessible web platform that converts complex AI career analytics into intuitive visual diagnostics, tactile interactive interview simulations, and clear milestone progress paths.',
    targetUsers: [
      {
        persona: 'Alex Rivera (27, Mid-Level Frontend Engineer)',
        role: 'Career Pivoter aspiring to Senior Product Engineering',
        quote: "I know how to code, but I stumble in behavioral rounds and never know why ATS software flags my resume.",
        painPoints: [
          'No objective scoring on resume keyword density for target roles',
          'Expensive coaching fees with slow turnarounds',
          'Nervousness during live technical and behavioral interviews'
        ]
      },
      {
        persona: 'Priya Nair (22, Recent Design Graduate)',
        role: 'Entry-Level UX Designer seeking First Tech Role',
        quote: "Navigating entry-level expectations is overwhelming; I need a structured roadmap that tracks my progress.",
        painPoints: [
          'Vague job postings with conflicting seniority requirements',
          'Lack of realistic role-play questions tailored to design portfolios',
          'Insecurity evaluating compensation packages and equity'
        ]
      }
    ],
    userFlow: [
      {
        step: '01. Career Diagnostics',
        action: 'Profile & Goal Setting',
        screen: 'AI Career Compass Hub',
        description: 'User enters desired target role and salary expectations; AI establishes a 90-day benchmark readiness score.'
      },
      {
        step: '02. Resume Audit',
        action: 'Instant ATS Gap Analysis',
        screen: 'ATS Analyzer & Keyword Heatmap',
        description: 'Upload PDF resume; platform highlights missing skills, impact verbs, and calculates role alignment index.'
      },
      {
        step: '03. Voice Simulation',
        action: 'Tactile Mock Interview',
        screen: 'Interactive Interview Studio',
        description: 'Real-time AI voice interviewer delivers behavioral scenarios, evaluating clarity, filler words, and technical depth.'
      },
      {
        step: '04. Offer Strategy',
        action: 'Compensation Benchmarking',
        screen: 'Offer Comparison Matrix',
        description: 'Compares multiple job offers side-by-side with localized market percentiles and negotiation counter-scripts.'
      }
    ],
    wireframeInsights: [
      'Split-screen interview layout prevents cognitive distraction by dedicating 70% of screen to question transcript and 30% to AI audio wave telemetry.',
      'ATS scorecards must use visual progress rings with expandable action items rather than raw percentages to maintain motivational momentum.',
      'Global sticky navigation with instant access to Resume, Mock Interview, and Roadmap boosted scenario completion by 42% in usability tests.'
    ],
    colorPalette: [
      { name: 'Coach Electric Blue', hex: '#2563EB', role: 'Primary CTA / AI Engine Accents' },
      { name: 'Vibrant Indigo', hex: '#4F46E5', role: 'Gradients & Brand Highlights' },
      { name: 'Emerald Readiness', hex: '#10B981', role: 'High ATS Scores & Approved Answers' },
      { name: 'Slate Enterprise', hex: '#0F172A', role: 'Deep Dark Navigation Canvas' },
      { name: 'Clean Workspace', hex: '#F8FAFC', role: 'Application Content Canvas' }
    ],
    typography: [
      { style: 'Display Headings', sample: 'Plus Jakarta Sans Bold (24-32px)', usage: 'Dashboard greetings, milestone summaries' },
      { style: 'Body & Questions', sample: 'Inter / Plus Jakarta Sans Regular (14-16px)', usage: 'Interview transcripts, feedback recommendations' },
      { style: 'Monospace Metrics', sample: 'JetBrains Mono Bold (12-14px)', usage: 'ATS score, filler word counts, latency tickers' }
    ],
    designDecisions: [
      {
        title: 'Tactile Speech Waveform Telemetry',
        description: 'Visual feedback using real-time audio wave pulses during voice mock rounds, instilling confidence in active listening.',
        impact: '+84% User Interview Confidence Rating'
      },
      {
        title: 'Side-by-Side Keyword Gap Inspection',
        description: 'Interactive dual-column ATS heatmap highlighting missing domain keywords with 1-click bullet point rewrites.',
        impact: '3.2x Faster Resume Optimization'
      },
      {
        title: 'Structured STAR-Method Radar Breakdown',
        description: 'Real-time telemetry showing Situation, Task, Action, and Result score cards with instant feedback.',
        impact: '94% Usability Prototype Completion'
      }
    ],
    challengesAndSolutions: [
      {
        challenge: 'Preventing anxiety during live AI voice interactions without overwhelming the user with real-time corrections.',
        solution: 'Delayed detailed feedback until answer completion while providing calming visual audio wave indications during speech.'
      },
      {
        challenge: 'Displaying complex compensation packages across base salary, bonus, and vesting schedules clearly.',
        solution: 'Built a visual side-by-side comparison matrix with interactive equity slider projections and localized benchmarks.'
      }
    ],
    finalOutcome: {
      stats: [
        { label: 'Interview Confidence', value: '84%' },
        { label: 'Resume Optimization', value: '3.2x Faster' },
        { label: 'Task Success Rate', value: '94%' },
        { label: 'User Satisfaction', value: '4.9 / 5.0' }
      ],
      summary:
        'AI Career Coach empowered candidates to bridge the tech hiring gap, providing realistic voice mock interviews, transparent ATS resume analytics, and data-backed compensation comparisons.'
    },
    screens: [
      {
        title: 'Career Dashboard & Readiness Compass',
        desc: 'Comprehensive executive view tracking role readiness (84%), active target jobs, weekly mock interview schedule, and recommended skill upgrades.',
        type: 'desktop',
        tags: ['Executive Dashboard', 'AI Diagnostics', 'Personalized Roadmap']
      },
      {
        title: 'ATS Resume Analyzer & Keyword Heatmap',
        desc: 'Deep-scan diagnostics showing 88/100 ATS match, missing keywords (Auto-Layout, Design Systems), and 1-click AI bullet point rewriters.',
        type: 'desktop',
        tags: ['ATS Diagnostics', 'Keyword Scanner', 'AI Bullet Rewriter']
      },
      {
        title: 'Live Voice Mock Interview Simulator',
        desc: 'Interactive audio studio with question audio, live speech transcript, filler word radar (3 count), and instant Star-method evaluation.',
        type: 'desktop',
        tags: ['Voice Simulator', 'Speech Recognition', 'STAR Method Analysis']
      },
      {
        title: 'Offer Comparison & Negotiation Script Matrix',
        desc: 'Side-by-side package analysis comparing base salary, bonuses, equity vesting schedules, and AI-drafted counter-offer templates.',
        type: 'desktop',
        tags: ['Compensation Matrix', 'Salary Benchmarking', 'Negotiation Scripts']
      }
    ]
  },
  {
    id: 'quintern',
    title: 'Quintern',
    tagline: 'High-Density Dark Mode Enterprise SaaS to Monitor, Review & Maintain Intern Details',
    category: 'UI/UX Design • Web & SaaS',
    platform: 'Web Application',
    role: 'Principal UI/UX Designer & Design System Lead',
    duration: '4 Weeks (Discovery, Component System, Dark Mode Tokens & Evaluation Workflows)',
    tools: ['Figma', 'Dark Mode UI Systems', 'Data Grid Tokens', 'State Variant Matrices', 'Micro-Interactions'],
    thumbnail: '/src/assets/images/quintern_mockup_1788625355747.jpg',
    figmaPrototypeUrl: 'https://www.figma.com/proto/mock-quintern/Quintern-Intern-Management-SaaS?node-id=202-1',
    overview:
      'Quintern is an enterprise-grade dark mode SaaS web platform designed for tech companies, university relations teams, and engineering managers to seamlessly onboard, monitor, evaluate, and convert university interns into high-performing full-time employees.',
    problemStatement:
      'Organizations managing 50+ interns across multiple engineering, design, and product cohorts rely on scattered spreadsheets, disconnected Slack threads, and subjective end-of-term reviews, leading to poor visibility and lost talent conversion.',
    designObjective:
      'Engineer a cohesive, high-density dark-mode interface that unifies intern profiles, weekly mentor reviews, attendance metrics, and project deliverables into an actionable operational command center.',
    targetUsers: [
      {
        persona: 'Samantha Reed (34, Senior Director of Engineering)',
        role: 'Internship Program Sponsor',
        quote: "I need high-level health indicators across all 48 engineering interns without having to ask 15 different mentors for status updates.",
        painPoints: [
          'No centralized real-time view of intern project milestones',
          'Subjective performance evaluations that make full-time offer decisions biased',
          'Disjointed attendance and stipend tracking'
        ]
      },
      {
        persona: 'David Kim (29, Staff Software Engineer & Intern Mentor)',
        role: 'Technical Mentor guiding 2 Summer Interns',
        quote: "Logging weekly reviews takes too long. I want a 60-second score slider with quick tags for velocity, autonomy, and code quality.",
        painPoints: [
          'Complex enterprise forms with dozens of required text boxes',
          'Lack of historical milestone tracking between mid-term and final reviews',
          'Difficulties tracking intern attendance and leave requests'
        ]
      }
    ],
    userFlow: [
      {
        step: '01. Roster Inspection',
        action: 'Filter Cohort Matrix',
        screen: 'Interns Directory Grid',
        description: 'Filter 48 interns by batch (Summer 2026), department (Design, Frontend, Backend), and mentor assignment.'
      },
      {
        step: '02. Profile Deep-Dive',
        action: 'Review Skill & Deliverables',
        screen: 'Individual Intern 360 Profile',
        description: 'Examine GitHub commits, Figma file links, weekly velocity score, and attendance streak.'
      },
      {
        step: '03. Weekly Evaluation',
        action: 'Score Performance & Mentorship',
        screen: 'Sprint Review Modal',
        description: 'Mentor submits 1-5 rating across Code Quality, Initiative, and Teamwork with fast actionable feedback.'
      },
      {
        step: '04. Conversion Triage',
        action: 'Full-Time Offer Determination',
        screen: 'PPO Conversion Pipeline',
        description: 'Leadership evaluates top 15% interns for Pre-Placement Offers with comparative performance radar.'
      }
    ],
    wireframeInsights: [
      'Dark mode (#0F172A base with #1E293B elevated cards) reduced eye fatigue for managers conducting back-to-back reviews during evaluation weeks.',
      'Sticky status pill indicators (Active, On Leave, Under Review, PPO Recommended) allowed recruiters to triage 100+ profiles in under 3 minutes.',
      'Modular tab navigation within the intern modal kept personal details, project repos, and weekly scores cleanly segregated without screen jumping.'
    ],
    colorPalette: [
      { name: 'Quintern Violet', hex: '#8B5CF6', role: 'Brand Core / Active State Borders' },
      { name: 'Cyan Highlight', hex: '#06B6D4', role: 'Data Grid Highlights / Velocity Tickers' },
      { name: 'Emerald Offer', hex: '#10B981', role: 'PPO Recommended / 90%+ Scores' },
      { name: 'Deep Space Canvas', hex: '#0B0F19', role: 'Base Application Background' },
      { name: 'Elevated Dark Surface', hex: '#1E293B', role: 'Cards, Modals & Row Hover States' }
    ],
    typography: [
      { style: 'Section Titles', sample: 'Plus Jakarta Sans Bold (18-22px)', usage: 'Cohort titles, intern name headers' },
      { style: 'Table Cells & Labels', sample: 'Inter Medium (12-13px)', usage: 'Intern roles, university, mentor name, tags' },
      { style: 'Data & Metrics', sample: 'JetBrains Mono SemiBold (11-13px)', usage: 'GPA, stipend figures, commit counts, sprint velocity' }
    ],
    designDecisions: [
      {
        title: 'High-Density Dark Mode Matrix',
        description: 'Custom #0B0F19 background with elevated cards reducing eye strain for managers performing hours of evaluations.',
        impact: '65% Reduction in Review Logging Time'
      },
      {
        title: 'Status Pill Hierarchy & Quick Actions',
        description: 'Clear color-coded tags (Active, Under Review, PPO Recommended) allowing recruiters to triage cohorts in seconds.',
        impact: '98% Task Completion Rate'
      },
      {
        title: '360 Intern Dossier with Tabbed Architecture',
        description: 'Consolidated personal info, project deliverables, GitHub commits, and weekly mentor reviews in one modal.',
        impact: '4.9/5 Mentor Satisfaction'
      }
    ],
    challengesAndSolutions: [
      {
        challenge: 'Balancing high-density data requirements with visual clarity across 48+ active interns.',
        solution: 'Designed an interactive table grid with sticky column headers, instant search, cohort filters, and drawer previews.'
      },
      {
        challenge: 'Simplifying subjective end-of-term evaluations into actionable objective metrics.',
        solution: 'Created a standardized 60-second review slider matrix paired with qualitative accomplishment tags.'
      }
    ],
    finalOutcome: {
      stats: [
        { label: 'Review Speedup', value: '65%' },
        { label: 'Onboarding Velocity', value: 'Day 3' },
        { label: 'Mentor Satisfaction', value: '4.9 / 5.0' },
        { label: 'PPO Conversion Accuracy', value: '96%' }
      ],
      summary:
        'Quintern transformed university intern management into a streamlined, data-driven command center, reducing weekly review friction and ensuring top talent conversions.'
    },
    screens: [
      {
        title: 'Interns Command Center & Metric Overview',
        desc: 'High-level dashboard displaying 48 active interns, 94.2% average attendance, 12 PPO recommendations, and department distribution charts.',
        type: 'desktop',
        tags: ['Cohort Analytics', 'Executive Dashboard', 'Real-time Ticker']
      },
      {
        title: 'Interactive Roster Data Grid & Filtering',
        desc: 'High-density table with instant search, university tags (Stanford, IIT, CMU), mentor badges, status toggles, and 1-click review triggers.',
        type: 'desktop',
        tags: ['Data Grid', 'Multi-filtering', 'Quick Review Actions']
      },
      {
        title: 'Individual Intern 360 Performance Dossier',
        desc: 'Comprehensive intern modal featuring project repositories, milestone completion bars, mentor feedback history, and stipend details.',
        type: 'desktop',
        tags: ['360 Dossier', 'Milestone Tracker', 'Mentor History']
      },
      {
        title: 'PPO Offer Pipeline & Talent Benchmarking',
        desc: 'Decision matrix comparing top performing interns against engineering hiring bars for immediate full-time conversion.',
        type: 'desktop',
        tags: ['PPO Conversion', 'Talent Benchmarking', 'Offer Approvals']
      }
    ]
  },
  {
    id: 'spotify-redesign',
    title: 'Spotify Redesign',
    tagline: 'Elevating Spotify with Live Syllable Karaoke, Vocal Remover, Collaborative Party Rooms & Music DNA',
    category: 'UI/UX Design • Mobile App',
    platform: 'Mobile App',
    role: 'Lead UX Researcher & Interaction Designer',
    duration: '4 Weeks (Music Fan Field Studies, Figma Micro-Interactions & Acoustic Visualizers)',
    tools: ['Figma', 'Interactive Component Sets', 'Audio Waveform Visualization', 'Smart Animate', 'Haptic Tokens'],
    thumbnail: '/src/assets/images/spotify_redesign_mockup_1788625401938.jpg',
    figmaPrototypeUrl: 'https://www.figma.com/proto/mock-spotify/Spotify-Experience-Redesign?node-id=303-1',
    overview:
      'A holistic mobile experience redesign of Spotify that transforms passive audio streaming into an active, social, and educational musical playground. The concept introduces real-time syllable-by-syllable Karaoke with an on-device AI vocal isolator, an interactive Music DNA lineage explorer showing sample roots and producer credits, and synchronous collaborative Party Rooms.',
    problemStatement:
      'Modern music streaming has become isolated and commodified. While users love singing along, existing lyrics are often unsynchronized and lack pitch guidance. Furthermore, listeners are deeply curious about song samples and who produced their favorite tracks, yet must leave the app to research them.',
    designObjective:
      'Evolve Spotify into an immersive social audio platform with tactile karaoke micro-interactions, clean sample genealogy visualizers, and seamless group co-listening without sacrificing Spotify\'s iconic dark minimalist aesthetic.',
    targetUsers: [
      {
        persona: 'Chloe Vance (21, College Student & Music Enthusiast)',
        role: 'Social Listener & Bedroom Singer',
        quote: "I love hosting listening parties with my roommates, but passing the aux cord is annoying and standard lyrics don't tell you when notes change.",
        painPoints: [
          'Stale, static lyric screens that fail to match vocal phrasing',
          'Lack of ability to lower original vocals for casual karaoke',
          'Fragmented group queueing when friends hang out'
        ]
      },
      {
        persona: 'Devon Miller (28, Vinyl Collector & Sample Digger)',
        role: 'Music History & Production Aficionado',
        quote: "When a beat drops with an old 70s soul sample, I want to know instantly where it came from and who produced it.",
        painPoints: [
          'Hidden songwriter and producer credits buried in sub-menus',
          'No visual representation of sampling history or musical heritage',
          'Discovery algorithms that prioritize viral clips over artistic depth'
        ]
      }
    ],
    userFlow: [
      {
        step: '01. Enhanced Now Playing',
        action: 'Tap Interactive Mini-Player',
        screen: 'Now Playing with Fluid Waves',
        description: 'Immersive vinyl disc visualizer with glowing audio aura that morphs with track tempo.'
      },
      {
        step: '02. Live Syllable Karaoke',
        action: 'Swipe Up for Karaoke Mode',
        screen: 'Karaoke Studio & Vocal Slider',
        description: 'Real-time glowing text highlights every syllable; slider dynamically removes original vocals down to 0% for solo singing.'
      },
      {
        step: '03. Song DNA Exploration',
        action: 'Tap "DNA" Gene Tag',
        screen: 'Interactive Sample & Root Tree',
        description: 'Visual tree connecting current hip-hop track to its 1974 soul sample, chord progressions, and producer credits.'
      },
      {
        step: '04. Party Room Co-Listening',
        action: 'Start Live Listening Session',
        screen: 'Synchronous Social Party Hub',
        description: 'Friends join via QR code, vote on upcoming tracks, and send live floating emoji reactions that pulse with the kick drum.'
      }
    ],
    wireframeInsights: [
      'Placing the Karaoke microphone toggle at the bottom thumb zone resulted in a 74% increase in user engagement during testing sessions.',
      'Syllable highlighting requires sub-second CSS animations with glowing neon green text shadows to guide rhythm without feeling distracting.',
      'Retaining Spotify\'s pure #121212 dark foundation while adding dynamic album-art driven ambient gradients preserved brand trust.'
    ],
    colorPalette: [
      { name: 'Spotify Neon Green', hex: '#1DB954', role: 'Iconic Brand Accent / Active Play Tickers' },
      { name: 'Vocal Mic Violet', hex: '#A855F7', role: 'Karaoke Vocal Remover Highlights' },
      { name: 'Solar Amber', hex: '#F59E0B', role: 'Party Mode Reaction Ticker' },
      { name: 'Spotify Midnight Black', hex: '#121212', role: 'Primary Immersion Background' },
      { name: 'Charcoal Card Surface', hex: '#282828', role: 'Controls, Floating Sheets & Modals' }
    ],
    typography: [
      { style: 'Track Titles', sample: 'Circular / Plus Jakarta Sans Bold (20-26px)', usage: 'Now playing song names, artist headers' },
      { style: 'Live Karaoke Lyrics', sample: 'Plus Jakarta Sans Extrabold (18-24px)', usage: 'Dynamic syllable glowing lyrics' },
      { style: 'Timers & Queue Monospace', sample: 'JetBrains Mono SemiBold (11-13px)', usage: 'Audio scrub timers, sample year stamps' }
    ],
    designDecisions: [
      {
        title: 'Real-Time Syllable Karaoke with Glowing Text',
        description: 'High-precision word-by-word luminescence and pitch guide line turning passive listening into active singing.',
        impact: '91% Preference over Static Lyrics'
      },
      {
        title: 'On-Device AI Vocal Isolator Slider',
        description: 'Seamless volume control allowing users to dial down original vocals from 100% to 0% for solo performance.',
        impact: '3.4x Higher Social Session Frequency'
      },
      {
        title: 'Interactive Music DNA Sample Tree',
        description: 'Visual lineage map detailing vintage 70s soul sample roots, producer credits, and musical chord progressions.',
        impact: '100% Prototype Component Fidelity'
      }
    ],
    challengesAndSolutions: [
      {
        challenge: 'Adding dense interactive features without cluttering Spotify\'s iconic dark minimalist player.',
        solution: 'Integrated features behind intuitive swipe-up gestures and subtle dynamic ambient color glows that respond to album artwork.'
      },
      {
        challenge: 'Ensuring smooth group interaction in collaborative Party Rooms across varying network speeds.',
        solution: 'Designed lightweight haptic emoji pulse ripples and real-time upvote queues with optimistic UI states.'
      }
    ],
    finalOutcome: {
      stats: [
        { label: 'Karaoke Preference', value: '91%' },
        { label: 'Social Session Lift', value: '3.4x' },
        { label: 'User Delight Score', value: '4.95 / 5.0' },
        { label: 'Sample Discovery Rate', value: '+78%' }
      ],
      summary:
        'The Spotify Redesign elevated audio streaming into a vibrant social playground, marrying vocal removal karaoke, sample genealogy, and live party rooms with refined dark ergonomics.'
    },
    screens: [
      {
        title: 'Now Playing with Acoustic Aura & Vinyl Disc',
        desc: 'Revamped player featuring spinning animated vinyl disc, dynamic aura matching album palette, and 1-tap Karaoke switch.',
        type: 'mobile',
        tags: ['Now Playing', 'Vinyl Animation', 'Acoustic Aura']
      },
      {
        title: 'Live Syllable Karaoke with Vocal Remover',
        desc: 'Industry-first mobile karaoke view with live word-by-word luminescence, pitch guide line, and on-device vocal muting slider.',
        type: 'mobile',
        tags: ['Karaoke Engine', 'Vocal Isolator', 'Pitch Tracker']
      },
      {
        title: 'Music DNA & Sample Tree Explorer',
        desc: 'Interactive genealogical map showing original vintage sample origin, interpolation timestamps, and master engineering credits.',
        type: 'mobile',
        tags: ['Music Genealogy', 'Sample Roots', 'Credit Explorer']
      },
      {
        title: 'Collaborative Party Room & Live Reactions',
        desc: 'Shared group listening space where connected friends contribute to live queue voting with haptic emoji reactions on beat drops.',
        type: 'mobile',
        tags: ['Social Listening', 'Party Queue', 'Live Reactions']
      }
    ]
  },
  {
    id: 'finflow',
    title: 'FinFlow',
    tagline: 'Tactile Finance Tracking, Micro-Saving Jars & Stacking Coins Mobile App',
    category: 'UI/UX Design • Mobile App',
    platform: 'Mobile App',
    role: 'Lead UI/UX & Motion Interaction Designer',
    duration: '3.5 Weeks (Fintech Research, Micro-Interaction Animation & Figma Wireframe Prototyping)',
    tools: ['Figma', 'Micro-Interactions', 'Motion Stacking Sequences', 'Financial Component Tokens', 'Smart Animate'],
    thumbnail: '/src/assets/images/finflow_mockup_1788625381720.jpg',
    figmaPrototypeUrl: 'https://www.figma.com/proto/mock-finflow/FinFlow-Finance-Tracker?node-id=404-1',
    overview:
      'FinFlow is an intuitive mobile personal finance and savings application designed to make daily money management empowering rather than stressful. Centered around tactile coin-stacking onboarding animations, 1-tap expense categorization, automated round-up goal jars, and an AI-driven FinBot heuristic advisor, FinFlow transforms budgeting into an engaging daily ritual.',
    problemStatement:
      'Traditional banking and budgeting apps present intimidating spreadsheets, dense charts, and clinical accounting jargon that discourage younger users from maintaining consistency. Users abandon expense logging within 2 weeks due to friction in manual data entry.',
    designObjective:
      'Create an uplifting, rewarding mobile banking experience utilizing physical metaphors (dropping gold coins, visual fill jars, and friendly heuristic guidance) that minimizes daily expense logging friction to under 5 seconds.',
    targetUsers: [
      {
        persona: 'Rohan Sharma (24, Junior Product Specialist)',
        role: 'Early-Career Professional wanting to Save for Goals',
        quote: "I want to save for a MacBook Pro and a vacation, but by the 20th of every month I have no idea where my paycheck went.",
        painPoints: [
          'Tedious multi-step transaction entry forms that take too long',
          'No clear visual connection between small daily expenses and big saving goals',
          'Vague monthly bank PDF statements with zero actionable insights'
        ]
      },
      {
        persona: 'Meera Sen (28, Freelance Creative)',
        role: 'Variable Income Earner seeking Cash Flow Stability',
        quote: "Because my income changes every month, rigid monthly budgets fail. I need dynamic envelope saving jars that adjust automatically.",
        painPoints: [
          'Inflexible budget caps that don\'t accommodate freelance lump sums',
          'Difficulty tracking business meals versus personal expenses',
          'Lack of proactive warnings before overspending on dining out'
        ]
      }
    ],
    userFlow: [
      {
        step: '01. Tactile Onboarding',
        action: 'Stacking Coins Sequence',
        screen: 'Welcome & Value Proposition',
        description: 'Playful micro-interaction where shiny gold coins drop and stack up to visually illustrate money compounding.'
      },
      {
        step: '02. Financial Command',
        action: 'Glance at Net Worth & Cash Flow',
        screen: 'Home Dashboard & Balance Card',
        description: 'Gradient emerald card showing ₹50,450 net balance, monthly savings rate (78%), and instant transaction quick-actions.'
      },
      {
        step: '03. 2-Tap Expense Entry',
        action: 'Log Expense in Under 5 Seconds',
        screen: 'Quick Add Expense Modal',
        description: 'Large numeric keypad with instant category chips (Food, Cab, Shopping, Bills) and receipt photo attachment.'
      },
      {
        step: '04. Goal Allocation & AI Advice',
        action: 'Fund Target Jars',
        screen: 'Goal Jars & FinBot Insights',
        description: 'Automated round-up change funneled into MacBook Pro (70%) and Goa Trip (75%) jars, backed by FinBot heuristic tips.'
      }
    ],
    wireframeInsights: [
      'Using an animated coin stack on the intro screen established a high-delight brand tone, reducing onboarding drop-off by 38%.',
      'Placing the large "+" log button right in the center of the bottom navigation bar made single-handed thumb operation effortless on large phones.',
      'FinBot conversational cards with specific rupee savings numbers felt substantially more motivating than generic warning banners.'
    ],
    colorPalette: [
      { name: 'FinFlow Emerald', hex: '#059669', role: 'Primary Brand Wealth / Inflow Transfers' },
      { name: 'Golden Coin Amber', hex: '#F59E0B', role: 'Savings Goals & Stacking Coins Visualizer' },
      { name: 'Deep Slate Navy', hex: '#0F172A', role: 'Phone Shell & Dark Contrast Elements' },
      { name: 'Teal Prosperity', hex: '#0D9488', role: 'Balance Card Gradient Accents' },
      { name: 'Fresh Cloud White', hex: '#F8FAFC', role: 'App Background & Card Substrates' }
    ],
    typography: [
      { style: 'Headline & Balances', sample: 'Plus Jakarta Sans Black (24-30px)', usage: 'Net balance values, welcome headings' },
      { style: 'Action & Category Labels', sample: 'Plus Jakarta Sans Bold (13-15px)', usage: 'Category pills, goal titles, transaction names' },
      { style: 'Rupee Currency Monospace', sample: 'JetBrains Mono Bold (12-16px)', usage: 'All currency figures (₹ 50,450.00), timestamps' }
    ],
    designDecisions: [
      {
        title: 'Tactile Stacking Coins Physical Metaphor',
        description: 'Engaging onboarding animation where gold coins drop and stack, visually reinforcing how micro-savings accumulate.',
        impact: '38% Drop in Onboarding Drop-Off'
      },
      {
        title: 'Under 5-Second Rapid Expense Entry',
        description: 'Center-anchored thumb keypad with instant 1-tap category chips (Food, Cab, Bills) and receipt capture.',
        impact: '4.8s Average Logging Duration'
      },
      {
        title: 'Visual Goal Jars & Heuristic FinBot Advisor',
        description: 'Progress visualizers for target purchases with conversational AI micro-tips optimizing monthly savings.',
        impact: '78% Monthly Budget Adherence'
      }
    ],
    challengesAndSolutions: [
      {
        challenge: 'Overcoming the emotional friction and boredom associated with manual daily expense logging.',
        solution: 'Designed delightful micro-interactions, coin-drop sounds/animations, and single-tap category chips.'
      },
      {
        challenge: 'Accommodating variable income earners whose monthly budget needs to flex dynamically.',
        solution: 'Developed dynamic envelope saving jars that automatically allocate percentages of incoming funds.'
      }
    ],
    finalOutcome: {
      stats: [
        { label: 'Logging Speed', value: '4.8 Seconds' },
        { label: 'Budget Adherence', value: '78%' },
        { label: 'Daily Retention Streak', value: '24 Days' },
        { label: 'Savings Growth', value: '+32%' }
      ],
      summary:
        'FinFlow transformed personal money management into an uplifting daily habit, achieving 78% budget adherence and sub-5-second transaction logging through tactile micro-interactions.'
    },
    screens: [
      {
        title: 'Micro-Savings Coin Stacking Onboarding',
        desc: 'Interactive intro screen with dropping gold coins demonstrating how micro-savings accumulate into financial freedom.',
        type: 'mobile',
        tags: ['Onboarding', 'Micro-Interactions', 'Coin Stacking']
      },
      {
        title: 'Net Wealth Dashboard & Cash Flow Hub',
        desc: 'Card-based home interface displaying real-time balance, quick transaction actions, recent activity feed, and budget status.',
        type: 'mobile',
        tags: ['Net Worth', 'Cash Flow', 'Quick Actions']
      },
      {
        title: 'Fast Expense Logger with Category Chips',
        desc: 'Single-handed expense entry with quick-tap category chips, bill split calculator, and haptic feedback confirmation.',
        type: 'mobile',
        tags: ['Expense Entry', 'Single-Handed UX', 'Category Chips']
      },
      {
        title: 'Goal Jars & FinBot AI Financial Coach',
        desc: 'Visual goal progress visualizers (MacBook Pro, Vacation, Emergency Fund) paired with conversational proactive advice.',
        type: 'mobile',
        tags: ['Goal Jars', 'AI FinBot', 'Automated Roundups']
      }
    ]
  }
];

export const PLAYGROUND_ITEMS: PlaygroundItem[] = [
  {
    id: 'pg-aicareercoach-interview',
    title: 'AI Career Coach — Interactive Voice Mock Interview Studio',
    category: 'Web & SaaS',
    description: 'Interactive AI voice question studio with live speech transcript, filler word radar, and Star-method response evaluator.',
    image: '/src/assets/images/aicareercoach_mockup_1788625334192.jpg',
    figmaFrame: 'Desktop 1440 — Interview Studio',
    tags: ['AI Interview', 'Voice UX', 'STAR Method'],
    date: 'Sep 2026',
    color: '#2563EB',
    details: 'Real-time feedback with instant filler word detection and answer refinement hints.'
  },
  {
    id: 'pg-quintern-dashboard',
    title: 'Quintern — Enterprise Intern Workforce Matrix & 360 Dossier',
    category: 'Web & SaaS',
    description: 'Dark-mode data grid monitoring 48 interns with cohort filters, status tags, commit trackers, and mentor evaluation modals.',
    image: '/src/assets/images/quintern_mockup_1788625355747.jpg',
    figmaFrame: 'Desktop 1440 — Interns Matrix',
    tags: ['Dark Mode SaaS', 'Data Grid', 'Talent Ops'],
    date: 'Sep 2026',
    color: '#8B5CF6',
    details: 'High-density information architecture designed for effortless talent tracking.'
  },
  {
    id: 'pg-spotify-karaoke',
    title: 'Spotify Redesign — Live Syllable Karaoke & Music DNA',
    category: 'Mobile UI',
    description: 'Interactive player with syllable-synchronized glowing lyrics, on-device AI vocal remover, and vintage sample lineage visualizer.',
    image: '/src/assets/images/spotify_redesign_mockup_1788625401938.jpg',
    figmaFrame: 'iPhone 17 — Now Playing & Karaoke',
    tags: ['Music Tech', 'Live Karaoke', 'Vocal Isolator'],
    date: 'Aug 2026',
    color: '#1DB954',
    details: 'Transforms passive music playback into an active social sing-along experience.'
  },
  {
    id: 'pg-finflow-coins',
    title: 'FinFlow — Micro-Savings Coin Stacking & Fast Expense Logger',
    category: 'Mobile UI',
    description: 'Interactive coin stacking sequence showing savings compounding, paired with 1-tap category expense entry and goal jars.',
    image: '/src/assets/images/finflow_mockup_1788625381720.jpg',
    figmaFrame: 'iPhone 17 — Welcome Stacking Coins',
    tags: ['Fintech', 'Coin Stacking', 'Goal Jars'],
    date: 'Aug 2026',
    color: '#059669',
    details: 'Physical wealth metaphors that make daily personal finance engaging and rewarding.'
  },
  {
    id: 'pg-moodee-calendar',
    title: 'Moodee — Emotion Heatmap & Reflection Calendar',
    category: 'Mobile UI',
    description: 'May 2026 monthly calendar grid mapping past daily check-ins into colorful emotion face stickers with detailed day cards.',
    image: '/src/assets/images/moodee_mockup_1788621678841.jpg',
    figmaFrame: 'iPhone 17 — 30 / Calendar',
    tags: ['Emotion Heatmap', 'Mental Health', 'Micro-interactions'],
    date: 'Sep 2026',
    color: '#BDD753',
    details: 'Visualizes daily behavioral stress patterns without requiring users to parse numbers or text logs.'
  },
  {
    id: 'pg-moodee-stats',
    title: 'Moodee — Weekly Mood Fluctuation Curve',
    category: 'Components',
    description: 'Smooth vector analytics curve charting emotional shifts across Monday through Sunday with emoji Y-axis coordinates.',
    image: '/src/assets/images/moodee_mockup_1788621678841.jpg',
    figmaFrame: 'iPhone 17 — 31 / Mood Stats',
    tags: ['Data Viz', 'Emoji Y-Axis', 'Trends'],
    date: 'Sep 2026',
    color: '#FACC15',
    details: 'Replaces clinical bar graphs with an intuitive, non-judgmental trend curve.'
  },
  {
    id: 'pg-levelup-quiz',
    title: 'LevelUp — Interactive UX Skill Practice Quiz',
    category: 'Mobile UI',
    description: 'Tactile multiple-choice challenge ("What does UX stand for?") with instant selection state and feedback rationale card.',
    image: '/src/assets/images/levelup_mockup_1788621696498.jpg',
    figmaFrame: 'iPhone 17 — Quiz Time',
    tags: ['Interactive Quiz', 'EdTech', 'Form Controls'],
    date: 'Aug 2026',
    color: '#2563EB',
    details: 'Bite-sized 10-question chunking system designed for commuter micro-learning.'
  },
  {
    id: 'pg-levelup-podium',
    title: 'LevelUp — Gamified XP Podium & Streak Engine',
    category: 'Components',
    description: '3D-styled top 3 peer ranking podium with crown badges, 18-day streak counter, and daily claim rewards button.',
    image: '/src/assets/images/levelup_mockup_1788621696498.jpg',
    figmaFrame: 'iPhone 17 — Leaderboard & Rewards',
    tags: ['Gamification', 'Podium', 'Streak Counter'],
    date: 'Aug 2026',
    color: '#F59E0B',
    details: 'Celebratory milestone animations that boosted course completion to 94%.'
  },
  {
    id: 'pg-travio-booking',
    title: 'Travio — 1-Tap City Swap & Seat Class Selector',
    category: 'Mobile UI',
    description: 'Animated route direction reversal between Bangalore (BLR) ⇄ Mumbai (BOM) with round-trip date range and passenger steppers.',
    image: '/src/assets/images/travio_mockup_1788621722329.jpg',
    figmaFrame: 'iPhone 17 — 8 / Ticket Booking',
    tags: ['Travel UI', 'City Swap', 'Booking Engine'],
    date: 'Jul 2026',
    color: '#0F172A',
    details: 'Eliminated 84% of origin-destination input errors via an intuitive circular swap trigger.'
  },
  {
    id: 'pg-travio-payment',
    title: 'Travio — Multi-Card & UPI Express Checkout',
    category: 'Components',
    description: 'Radio-selectable Mastercard and Visa tokens with Indian UPI gateways (Google Pay, PhonePe) and confetti success confirmation.',
    image: '/src/assets/images/travio_mockup_1788621722329.jpg',
    figmaFrame: 'iPhone 17 — 12, 13, 15 / Payment & Success',
    tags: ['Express Checkout', 'UPI', 'Confetti Dialog'],
    date: 'Jul 2026',
    color: '#10B981',
    details: 'Transparent fee breakdown separating base fare ($964) from taxes ($236) to eliminate checkout abandonment.'
  },
  {
    id: 'pg-foodgo-builder',
    title: 'Foodgo — Exploded Burger Customizer',
    category: 'Mobile UI',
    description: 'Tactile deconstructed burger layer builder with live ingredient selection (pickles, cheddar, patty) and dynamic price calculation.',
    image: '/src/assets/images/foodgo_app_mockup_1788620645194.jpg',
    figmaFrame: 'Frame 110 — Mobile / Customizer',
    tags: ['Interactive Layers', 'Food App', 'Micro-interaction'],
    date: 'Sep 2026',
    color: '#EA333F',
    details: 'Exploded burger visualization with interactive spicy heat gauge and toppings selector.'
  },
  {
    id: 'pg-weather-3d',
    title: 'Atmosphere — 3D Glassmorphic Weather System',
    category: 'Mobile UI',
    description: 'Hyper-realistic 3D cloud renders with thunderstorm lightning reflections and golden sunlight dispersion over frosted glass cards.',
    image: '/src/assets/images/weather_app_mockup_1788620668673.jpg',
    figmaFrame: 'iPhone 13 & 14 — 2 & 5 / Weather',
    tags: ['Glassmorphism', '3D UI', 'iOS 17'],
    date: 'Aug 2026',
    color: '#38BDF8',
    details: 'Tactile frosted glass UI with 90% rain, 7km/h wind, 21% humidity metric pills and floating navigation dock.'
  },
  {
    id: 'pg-foodgo-checkout',
    title: 'Foodgo — Express Payment & Success Dialog',
    category: 'Components',
    description: 'Radio-selectable Mastercard and Visa payment cards with subtotal fee breakdown and animated success confirmation.',
    image: '/src/assets/images/foodgo_app_mockup_1788620645194.jpg',
    figmaFrame: 'Frame 102 & 103 — Mobile / Checkout',
    tags: ['Payment UI', 'Forms', 'Success Modal'],
    date: 'Jul 2026',
    color: '#1E1E24',
    details: 'Seamless 2-tap payment flow with saved card tokens and order receipt notification.'
  },
  {
    id: 'pg-weather-radar',
    title: 'Atmosphere — Multi-City AQI Radar & 7-Day Forecast',
    category: 'Web & SaaS',
    description: 'Translucent search cards displaying Air Quality Index badges alongside 7-day weather trend indicators.',
    image: '/src/assets/images/weather_app_mockup_1788620668673.jpg',
    figmaFrame: 'iPhone 13 & 14 — 7 & 8 / Forecast',
    tags: ['Data Viz', 'AQI Radar', 'Translucent'],
    date: 'Jun 2026',
    color: '#FBBF24',
    details: 'Designed with backdrop-blur-md tokens and high contrast typography gradients.'
  },
  {
    id: 'pg-4',
    title: 'Glassmorphic Floating Navigation Pill',
    category: 'Components',
    description: 'Dynamic island style mobile bottom navigation with subtle blur backdrop and active indicator.',
    image: '/src/assets/images/figma_hero_art_1788616935980.jpg',
    figmaFrame: 'Component ❖ Nav / Floating',
    tags: ['Component', 'Mobile', 'Figma Variants'],
    date: 'May 2026',
    color: '#0EA5E9',
    details: 'Configured with Figma component properties for easy swap of icons, badges, and notification pips.'
  }
];

export const PROCESS_STAGES: ProcessStage[] = [
  {
    number: 1,
    name: 'Research',
    shortDesc: 'Empathizing with users and mapping real-world behaviors.',
    description:
      'Uncovering deep user motivations, auditing competitors, and conducting qualitative interviews to uncover unarticulated pain points.',
    deliverables: ['User Personas', 'Competitive Audit', 'Empathy Maps', 'Problem Statements'],
    iconName: 'Search'
  },
  {
    number: 2,
    name: 'Define',
    shortDesc: 'Distilling goals into clear actionable constraints.',
    description:
      'Synthesizing raw research into measurable objectives, information architecture hierarchies, and success metrics.',
    deliverables: ['Information Architecture', 'Value Proposition Canvas', 'User Journey Maps', 'Success KPIs'],
    iconName: 'Target'
  },
  {
    number: 3,
    name: 'Wireframe',
    shortDesc: 'Rapidly exploring structural layouts with zero bias.',
    description:
      'Sketching low-fidelity concepts and grayscale wireframes to validate layout logic, user pathways, and visual weight before high-fidelity styling.',
    deliverables: ['Paper Sketches', 'Lo-Fi Wireframes', 'Clickable Flow Maps', 'Heuristic Evaluation'],
    iconName: 'Layout'
  },
  {
    number: 4,
    name: 'Design',
    shortDesc: 'Crafting pixel-perfect, accessible visual systems.',
    description:
      'Establishing comprehensive design systems, typography hierarchies, tokenized colors, and bespoke UI mockups in Figma.',
    deliverables: ['Figma Design System', 'High-Fidelity Screens', 'Responsive Layouts', 'Design Tokens'],
    iconName: 'Palette'
  },
  {
    number: 5,
    name: 'Prototype',
    shortDesc: 'Bringing static screens to life with fluid motion.',
    description:
      'Connecting frames with Figma Smart Animate, interactive components, micro-interactions, and realistic data states.',
    deliverables: ['Interactive Figma Prototypes', 'Micro-interactions', 'Gesture Transitions', 'Edge Case Flows'],
    iconName: 'Cpu'
  },
  {
    number: 6,
    name: 'Test',
    shortDesc: 'Validating usability with real people and tasks.',
    description:
      'Conducting moderated usability tests, recording completion times, measuring System Usability Scale (SUS), and identifying friction.',
    deliverables: ['Usability Test Reports', 'Heatmap Reviews', 'Friction Points Matrix', 'Iterative Backlog'],
    iconName: 'CheckCircle2'
  },
  {
    number: 7,
    name: 'Improve',
    shortDesc: 'Refining and handing off with dev-ready precision.',
    description:
      'Polishing edge cases, documenting component specs for developers, and iterating based on quantitative and qualitative feedback.',
    deliverables: ['Dev Handoff Redlines', 'Asset Export Bundles', 'Component Documentation', 'Final Polish'],
    iconName: 'Sparkles'
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: 'Design',
    description: 'Crafting thoughtful visual hierarchies, aesthetic polish, and scalable token systems.',
    skills: [
      { name: 'UI Design', proficiency: 'Advanced', context: 'Pixel-perfect interfaces, visual rhythm & negative space', tag: 'Core' },
      { name: 'Interaction Design', proficiency: 'Advanced', context: 'Micro-interactions, state transitions & feedback loops', tag: 'Core' },
      { name: 'Visual Design', proficiency: 'Expert', context: 'Typography scales, color harmony & brand translation', tag: 'Expert' },
      { name: 'Design Systems', proficiency: 'Advanced', context: 'Atomic design, token structures & scalable libraries', tag: 'System' },
      { name: 'Responsive Design', proficiency: 'Expert', context: 'Mobile-first, desktop adaptive & flexible container layouts', tag: 'Essential' },
      { name: 'Accessibility (WCAG)', proficiency: 'Proficient', context: 'Contrast ratios, touch target sizing & screen-reader logic', tag: 'Standards' }
    ]
  },
  {
    category: 'UX',
    description: 'Rooted in human psychology, research rigor, and measurable problem-solving.',
    skills: [
      { name: 'User Research', proficiency: 'Advanced', context: '1-on-1 interviews, surveys, contextual inquiry & empathy mapping', tag: 'Research' },
      { name: 'User Flows', proficiency: 'Expert', context: 'Step-by-step pathway diagrams & decision branching maps', tag: 'IA' },
      { name: 'Information Architecture', proficiency: 'Advanced', context: 'Card sorting, site tree hierarchies & navigational structures', tag: 'IA' },
      { name: 'Usability Testing', proficiency: 'Advanced', context: 'Moderated sessions, task completion rates & SUS metrics', tag: 'Validation' },
      { name: 'Wireframing', proficiency: 'Expert', context: 'Rapid lo-fi sketching to test conceptual layout validity', tag: 'Ideation' },
      { name: 'Prototyping', proficiency: 'Expert', context: 'Complex interactive prototypes simulating full product experiences', tag: 'Prototype' }
    ]
  },
  {
    category: 'Tools',
    description: 'Mastery over industry-standard design, research, and production suites.',
    skills: [
      { name: 'Figma', proficiency: 'Expert / Primary', context: 'Auto-Layout, Variables, Component Variants, Dev Mode', tag: 'Primary' },
      { name: 'Adobe XD', proficiency: 'Proficient', context: 'Experience design & vector UI workflows', tag: 'Adobe' },
      { name: 'Photoshop', proficiency: 'Proficient', context: 'Asset editing, photo retouching & visual composition', tag: 'Adobe' },
      { name: 'Illustrator', proficiency: 'Proficient', context: 'Custom vector iconography, illustration & brand marks', tag: 'Adobe' },
      { name: 'Tokens Studio', proficiency: 'Intermediate', context: 'Multi-brand design token management & design systems', tag: 'Tokens' }
    ]
  }
];

export const RESUME_DATA = {
  name: 'Jayanth Vishwakarma G',
  title: 'UI UX DESIGNER',
  contact: {
    phone: '+91 9353136799',
    email: 'jayanthofficial.0610@gmail.com',
    location: 'Bengaluru',
    linkedin: 'www.linkedin.com/in/jayanth-g-4062a9403',
    linkedinUrl: 'https://www.linkedin.com/in/jayanth-g-4062a9403'
  },
  summary:
    'Experienced UI/UX designer who has designed both web-based and mobile application interfaces, using Figma, Adobe XD, as well as performing customer/user research, wireframing, prototyping, creating design system, creating responsive web sites. I am passionate about developing intuitive, accessible, and user-centered digital experiences.',
  experience: [
    {
      role: 'UI/UX Designer | Figma',
      company: 'Travio – Travel Booking Mobile Application',
      period: 'Professional Experience & Projects',
      points: [
        'Designed a travel booking mobile app with features for destination search, trip booking, secure payments, and booking management.',
        'Conducted user research, created wireframes, high-fidelity UI designs, and interactive prototypes using Figma.',
        'Built a responsive design system with reusable components to ensure consistency, accessibility, and a better user experience.'
      ]
    },
    {
      role: 'UI/UX Designer | Figma',
      company: 'LevelUp – E-Learning Mobile Application',
      period: 'Professional Experience & Projects',
      points: [
        'Designed an e-learning mobile app with features for onboarding, course browsing, assessments, progress tracking, leaderboards, and profile management.',
        'Conducted user research, competitor analysis, created user flows, wireframes, and interactive prototypes using Figma.',
        'Built a responsive design system with reusable components to ensure consistency, accessibility, and a better user experience.'
      ]
    },
    {
      role: 'UI/UX Designer | Figma',
      company: 'Mood Tracking Application',
      period: 'Professional Experience & Projects',
      points: [
        'Designed and prototyped a mobile app for habit tracking, mood monitoring, and journaling using Figma.',
        'Created user flows, wireframes, onboarding, reminders, calendar, and analytics screens to improve user engagement.',
        'Developed reusable UI components and applied user-centered design principles to ensure a consistent and intuitive experience.'
      ]
    }
  ],
  education: [
    {
      degree: 'MCA | Computer Application | CC (Cloud Computing)',
      institution: 'Surana College Autonomous | Bengaluru',
      period: 'Dec 2024 – Sept 2026',
      highlights: 'Master of Computer Applications with specialization in Cloud Computing.'
    },
    {
      degree: 'BCA | Computer Application',
      institution: 'Cavalier Animation and Media College | Bengaluru',
      period: '2018 – 2023',
      highlights: 'Bachelor of Computer Applications with core focus on digital media and software fundamentals.'
    }
  ],
  certifications: [
    {
      title: 'Certificate of Internship Completion — Figma/UI/UX Domain Captain',
      issuer: 'UPTOSKILLS',
      date: 'Aug 2026'
    },
    {
      title: 'Internship Completion Certificate — UI/UX Design Intern',
      issuer: 'Cognifyz IT Solutions Pvt. Ltd.',
      date: 'Jun 2026'
    }
  ],
  skills: {
    uiUx: [
      'User Research',
      'Wireframing',
      'Prototyping',
      'User Flows',
      'Information Architecture',
      'Design Systems',
      'Responsive Design',
      'Usability Testing',
      'Accessibility',
      'Design Thinking'
    ],
    tools: ['Figma', 'Adobe XD', 'Adobe Illustrator', 'Prototyping'],
    softSkills: [
      'Problem Solving',
      'Collaboration',
      'Communication',
      'Adaptability',
      'Time Management'
    ]
  }
};

export const DEFAULT_CERTIFICATIONS: import('../types').Certification[] = [
  {
    id: 'cert-uptoskills-figma-captain-2026',
    title: 'Certificate of Internship Completion — Figma / UI / UX Domain Captain',
    issuer: 'UPTOSKILLS',
    date: '20/08/2026',
    duration: '16 May 2026 to 16 August 2026',
    certificateId: 'US-INT-2026-K4IKUF9',
    role: 'Captain of domain FIGMA/UI/UX',
    recipientName: 'Jayanth Vishwakarma G',
    description: 'Awarded for successfully completing internship tenure as Captain of domain FIGMA/UI/UX. Demonstrated exemplary professional standards, technical proficiency, and significant contributions to UI/UX design deliverables.',
    credentialUrl: 'https://uptoskills.in',
    verificationEmail: 'verify@uptoskills.in',
    image: '/certificates/uptoskills-certificate.svg',
    accreditations: ['Authorized Signatory: Shivam Agarwal', 'UPTOSKILLS New Delhi Official Seal'],
    tags: ['Figma/UI/UX Captain', 'Leadership', 'Design Systems', 'Internship Completion', 'UPTOSKILLS']
  },
  {
    id: 'cert-cognifyz-uiux-intern-2026',
    title: 'Internship Completion Certificate — UI/UX Design Intern',
    issuer: 'Cognifyz IT Solutions Pvt. Ltd.',
    date: '06/06/2026',
    duration: '06/05/2026 to 06/06/2026',
    certificateId: 'CTI/A1/C352495',
    internId: 'CTI/A1/C352495',
    role: 'UI/UX Design Intern',
    recipientName: 'Jayanth Vishwakarma G',
    description: 'Certified UI/UX Design Internship completion recognizing remarkable dedication, exceptional coordination skills, effective communication, and impressive attention to detail. Candidate pursuing MCA from The Surana College Autonomous.',
    credentialUrl: 'https://cognifyz.com',
    verificationEmail: 'support@cognifyz.com',
    image: '/certificates/cognifyz-certificate.svg',
    accreditations: ['ISO 9001:2015 Certified', 'MSME Registered', 'Signatory: Sahil Lambat'],
    tags: ['UI/UX Design Intern', 'Cognifyz IT Solutions', 'ISO 9001:2015', 'MSME', 'Surana College MCA']
  }
];

