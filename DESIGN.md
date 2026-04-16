# Futuristic Dark-Themed 3D Developer Portfolio for Akshay P

## Visual Identity
- **Background**: #0a0a0f (deep space black)
- **Primary Accent**: #c8ff00 (neon lime)
- **Secondary Accent**: #6C63FF (electric purple)
- **Fonts**: 
  - Headings: Space Grotesk (bold, futuristic)
  - Body: Inter (clean, readable)
- **Aesthetic**: Futuristic OS/space command center (inspired by igloo.inc and bruno-simon.com)
- **Effects**:
  - Glassmorphism cards: `bg-white/5 backdrop-blur border-white/10`
  - Noise/grain texture: 3% opacity overlay on main background
  - Custom cursor: glowing lime dot with trail

## Screen 1: Hero
- **Layout**: Full viewport (100vh)
- **Left/Center**:
  - Heading: "AKSHAY P" (80px, Space Grotesk, weight 800, color #ffffff)
  - Subtitle: "Builder · Founder · Engineer" (typewriter animation placeholder, Inter, color #c8ff00)
  - CTAs:
    - "View My Work" (lime border 2px, transparent bg, hover: bg-[#c8ff0010])
    - "Download Resume" (ghost: text-white/70, hover: text-white)
- **Right**: Placeholder for 3D Three.js canvas (labeled "3D Zone", dashed outline #c8ff0020)
- **Top Nav**: Glass-blur bg-white/5 backdrop-blur border-white/10
  - Logo: "AP" (Space Grotesk, #c8ff00)
  - Links: Work, Experience, Skills, Contact (Inter, text-white/60, hover: text-white)

## Screen 2: About + Stats
- **Background**: Subtle radial gradient from #0a0a0f to #000000
- **Left**:
  - Bio paragraph: Inter, text-white/80, max-width 400px
- **Right**: 2x2 grid of stat cards (glassmorphism)
  - Each card:
    - Large number (Space Grotesk, 48px, #c8ff00)
    - Muted label (Inter, text-white/50)
    - Stats: "40+ Projects", "5+ Hardware", "200+ Interviews", "1 Startup"
  - Animated numbers: count-up animation on scroll

## Screen 3: Projects (Masonry Grid)
- **Layout**: 3-column masonry grid (gap: 24px)
- **Cards** (glassmorphism):
  - Top accent bar: 4px height, color varies per project:
    - GasUllavidu: #ff6b6b (coral)
    - E2S: #4ecdc4 (teal)
    - FactoryScan: #ffd16a (yellow)
    - Gym Management: #6C63FF (purple)
    - Travel Booking: #ff9ff3 (pink)
    - Korvet Website: #c8ff00 (lime)
  - Content:
    - Title: Space Grotesk, 20px, #ffffff
    - Description: Inter, 14px, text-white/60, 1-line
    - Tech chips: Inter, bg-white/10, text-white/80, px-2 py-1 rounded
    - Tag badge: rounded-full, bg-white/5, text-white/70, border border-white/10
      - Tags: Social Impact, EdTech, AI, SaaS
- **Below grid**: "40+ more on GitHub →" link (Inter, text-[#c8ff00], hover: underline)

## Screen 4: Experience Timeline
- **Layout**: Horizontal scrolling timeline (scroll-snap-type x mandatory)
- **Axis**: Glowing line (height 2px, bg-gradient-to-r from #6C63FF to #c8ff00, opacity 0.3)
- **Cards** (glassmorphism, snap-center, min-w-[280px]):
  - Connected by axis line via vertical connector (2px wide, same glow)
  - Entries:
    1. TinkerHub (Tech Lead)
    2. CodeCatalyst (Founder)
    3. MedTourEasy (Intern)
    4. Korvet Innovations (Co-Founder/CTO) - *special treatment*
  - Korvet card:
    - Gold shimmer border: animated border-gradient (conic-gradient from #ffd700 to #ffff00)
    - Badge: "🏛 Govt. Recognized" (bg-white/5 text-[#ffd700] border border-[#ffd700/30])
- **Card content**:
  - Role: Space Grotesk, 18px, #ffffff
  - Company: Inter, 16px, text-white/60
  - Duration: Inter, 14px, text-white/50
  - Description: Inter, 14px, text-white/70, max-width 250px

## Screen 5: Skills
- **Background**: Dark section (#0a0a0f)
- **Top**: Placeholder sphere labeled "3D Skill Globe" (Three.js, dashed outline #6C63FF20)
- **Below**: Flat chip grid (wrap, gap: 12px)
  - Chips: Inter, bg-white/8, text-white/60, px-3 py-2 rounded-full
  - Skills: React, Node.js, Python, MySQL, Django, Git, Figma, JavaScript, HTML5, CSS3, Leadership, Project Management
  - Hover: bg-white/10, text-white

## Screen 6: Contact
- **Layout**: Minimal, center-aligned
- **Heading**: "Let's Build Something." (Space Grotesk, 48px, #ffffff, max-width 500px)
- **Icon links** (flex, gap: 24px, mt-12):
  - GitHub: lg.github icon (#ffffff, hover: #c8ff00)
  - LinkedIn: lg.linkedin icon (#ffffff, hover: #6C63FF)
  - Email: lg.mail icon (#ffffff, hover: #ffffff)
- **Footer text**: Inter, text-white/40, mt-8
  - "Open to collaborations, internships & projects."

## Interactions & Animations
- **Cursor**: Custom lime dot (4px radius) with trail (fade-out particles)
- **Transitions**: All elements: transition-all duration-300 ease-out
- **Hover effects**:
  - Glass cards: scale-105, border-white/20
  - Buttons: bg-[accent]/10 for lime border, bg-[accent]/20 for ghost
  - Skill chips: bg-white/10
- **Scroll animations**:
  - Fade-up on enter (opacity 0 → 1, translate-y 20px → 0)
  - Stat numbers: count-up animation
  - 3D elements: slow rotation
- **Responsive**: Breakpoints at 640px (mobile), 768px (tablet), 1024px (laptop)
  - Hero: stack vertically on mobile
  - About: stack vertically on mobile
  - Projects: 2-column on tablet, 1-column on mobile
  - Timeline: vertical on mobile (<640px)

## Technical Notes
- **Framework**: React 18 + Tailwind CSS 3 + Framer Motion (animations) + Three.js (@react-three/fiber)
- **Performance**: 
  - Lazy load images
  - Debounce scroll animations
  - Use requestAnimationFrame for 3D
  - Optimize grain texture with CSS repeating-linear-gradient
- **Accessibility**:
  - ARIA labels for icons
  - Focus-visible outlines (2px solid #c8ff00)
  - Skip-to-content link
  - Respect reduced motion preferences