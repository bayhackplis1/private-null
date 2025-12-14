# Design Guidelines: Hacker-Themed Media Downloader

## Design Approach

**Selected Approach**: Reference-Based with Hacker/Cyberpunk Aesthetic

**Inspiration Sources**: 
- Terminal/Console interfaces (VS Code, iTerm2)
- Cyberpunk UI elements (Hacknet game, Matrix aesthetics)
- Modern dev tools (GitHub dark theme, Vercel dashboard)

**Core Principles**:
- Monospace typography for technical authenticity
- Geometric, angular components over rounded
- Matrix/code-style background effects
- Terminal-inspired input fields
- Glitch effects used sparingly for emphasis

## Typography

**Font Families**:
- Primary: `'Fira Code', 'JetBrains Mono', monospace` for all interface text
- Display: `'Orbitron', 'Rajdhana', sans-serif` for hero headlines and section titles
- Body: Stick with monospace for consistency

**Hierarchy**:
- H1 (Hero): 4xl-6xl, uppercase, letter-spacing wide
- H2 (Section): 2xl-3xl, bold
- Interface labels: sm uppercase, tracking-wider
- Body: base monospace
- Input text: lg monospace
- Status messages: sm-base monospace

## Layout System

**Spacing Units**: Tailwind units 1, 2, 4, 6, 8, 12, 16, 24

**Container Strategy**:
- Max-width: `max-w-7xl` for main content
- Padding: `px-4 md:px-8 lg:px-12`
- Section spacing: `py-12 md:py-16 lg:py-24`
- Component gaps: `gap-4` to `gap-8`

## Component Library

### Navigation
- Fixed top bar with glass-morphism effect (`backdrop-blur-md`)
- Logo: ASCII-style or geometric icon with brand text
- Nav items: uppercase, tracking-wide, monospace
- Terminal-style border-bottom (1px solid with glow effect)

### Hero Section
**Layout**: Full-viewport centered terminal window
- Simulated terminal header with typical window controls (close, minimize, maximize)
- Animated typing effect for headline: "DOWNLOAD.PROTOCOL://INITIATED"
- Tagline: "Extract media from YouTube & TikTok via secure API endpoints"
- Dual CTA buttons: "START DOWNLOAD" (primary) and "VIEW DOCS" (secondary/outline)
- Background: Subtle matrix rain effect or animated code snippets

**Images**: No hero image - use animated code/matrix background instead

### Download Interface (Main Feature)

**Platform Tabs**:
- Horizontal tab bar: "YOUTUBE" | "TIKTOK"
- Active state: underline with glow effect
- Content type selector within each: "VIDEO" | "AUDIO" | "SEARCH"

**Input Fields**:
Terminal-style design:
- Prefix with `$` or `>` prompt symbol
- Monospace input text
- Placeholder: "paste_url_here" or "enter_search_query"
- Border: thin solid, glows on focus
- Height: `h-12` to `h-14`

**Download Button**:
- Width: full or fixed `w-48`
- Height: `h-12`
- Text: "EXECUTE DOWNLOAD" or "FETCH.MP4"
- Icon: Download arrow or terminal icon (Heroicons)
- Blur background if on images

**Status/Progress Indicators**:
- Terminal-style loading: `[████░░░░░░] 40% DOWNLOADING...`
- Success: `✓ DOWNLOAD.COMPLETE`
- Error: `✗ ERROR.404 - Invalid endpoint`
- Live console output animation showing API calls

### Feature Cards Section

**Layout**: 3-column grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`)

**Card Design**:
- Terminal window frame aesthetic
- Icon: Heroicons (cloud-arrow-down, musical-note, magnifying-glass, video-camera)
- Title: uppercase, tracking-wide, bold
- Description: 2-3 lines max, opacity-80
- Border: 1px solid with subtle glow
- Padding: `p-6`
- Hover: slight border glow increase, no color change

**Features to Highlight**:
1. YouTube Video Download - High quality MP4 extraction
2. YouTube Audio Extract - Pure MP3 audio files
3. YouTube Search & Download - Find by title/artist
4. TikTok Video Fetch - Watermark-free downloads
5. TikTok Audio Rip - Extract soundtracks
6. TikTok Search API - Browse and download

### Download History/Preview Panel

**Layout**: Single column list with recent downloads
- Thumbnail preview (if available from API)
- Filename in monospace
- Download time/status
- Re-download icon button
- Each item: `p-4`, border-bottom separator

### Technical Specs Section

**Layout**: 2-column split (`grid-cols-1 lg:grid-cols-2`)
- Left: API Endpoints list (monospace, small font)
- Right: Supported formats table

**Styling**:
- Code blocks with `bg-opacity-20` treatment
- Inline code: backticks with slight highlight
- Borders: geometric, angular corners

### Footer

**Layout**: 3-column grid on desktop, stack on mobile
- Column 1: ASCII logo + tagline
- Column 2: Quick links (About, API Docs, Status, GitHub)
- Column 3: Terminal-style status display ("SYSTEM.STATUS: ONLINE", "UPTIME: 99.9%")
- Copyright: Small monospace at bottom
- Social icons: GitHub, Twitter (outline style, Heroicons)

## Animations

**Use Sparingly**:
- Matrix rain background (low opacity, slow speed)
- Typing effect for hero headline (one-time on load)
- Progress bar fill animation
- Subtle glow pulse on active download
- Button hover: slight scale or glow increase

**Avoid**:
- Excessive scroll animations
- Distracting parallax effects
- Color transitions

## Accessibility

- High contrast text (light on dark)
- Focus states: visible outline with glow effect
- ARIA labels for all interactive elements
- Keyboard navigation support
- Screen reader friendly status messages

## Icons

**Library**: Heroicons (outline style for consistency)

**Key Icons**:
- cloud-arrow-down (download)
- musical-note (audio)
- video-camera (video)
- magnifying-glass (search)
- play-circle (preview)
- clipboard-document (copy URL)

## Images

No traditional images needed - focus on:
- SVG geometric patterns
- ASCII art elements
- Icon sets from Heroicons
- Animated code/terminal backgrounds (CSS/JS generated)

## Viewport Strategy

- Hero: 80-90vh for impact
- Feature sections: Natural height based on content
- Download interface: Centered, contained height
- Footer: Natural height, no forced viewport