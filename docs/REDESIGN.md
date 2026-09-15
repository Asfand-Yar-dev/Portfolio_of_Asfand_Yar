# Local portfolio redesign

## Audit before implementation

- Stack: Next.js 15.5.15 App Router, React 19, TypeScript with JSX components, Tailwind 4. No custom deployment configuration beyond Next defaults; Vercel Analytics and Speed Insights are present.
- Public page: `/`. Preserve `#home`, `#about`, `#experience`, `#skills`, `#projects`, `#services`, `#contact`, plus the resume `/Asfand_Yar.pdf` and all existing public assets. No existing project detail routes or redirect configuration.
- SEO: canonical https://asfandyar.tech, existing title/description, allow-all robots and one-entry sitemap. No existing Open Graph, Twitter or JSON-LD data. Sitemap previously claimed a new modification date on every build.
- Content: three roles, nine projects, five skill groups and twelve overlapping service descriptions. Experience order was not chronological. No education details in the page source or README: do not invent a degree, institution or graduation date.
- Performance: whole page is a client boundary; broad Framer Motion usage and repeated entrance delays, continuously running typing/floating effects, redundant animation dependencies, 965 KB portrait with no intrinsic dimensions, universal 400ms transitions and unnecessary logo preload. Google font download makes builds depend on network access.
- Accessibility: mobile menu lacks accessible labels/expanded state and focus handling; navigation uses JS buttons instead of fragment links; skills overflow risk; reduced-motion preferences ignored; form labels lack associations.
- Functional defect: contact form simulates success after a timeout without a backend. Replace with real contact links, never fake submission success.
- Baseline lint passes. Initial sandbox build failed fetching Google Fonts; the network-authorized baseline build passed, with 151 kB first-load JavaScript. The redesign bundles the same font and its OFL license locally, removing this build-time network dependency.

## Design and implementation strategy

Graphite default, warm white alternate theme, restrained sage accent, generous whitespace, large typography and thin rules. Use editorial sections, two featured engineering projects with explanatory SVG diagrams, and an always-visible project library. Preserve factual content; omit unsupported precision in counters and skills ratings. Project diagrams illustrate only the documented conceptual flow and do not claim additional implementation details.

Render core content on the server. Keep narrow client components for navigation/theme and progressive visual enhancement. Use projected low-poly SVG geometry instead of a WebGL dependency: it remains visible without JavaScript or WebGL, and pointer interaction is lazy-loaded only for fine pointers without reduced-motion/data-saving preferences. Ambient movement uses CSS transforms; no continuous JavaScript animation loop. It pauses when hidden or offscreen and is disabled on mobile, reduced-motion and low-power devices.

Keep all original public URLs and section fragments, contact/social links and resume. Retain existing metadata title/description, add Open Graph/Twitter and truthful Person, WebSite, ProfilePage and CreativeWork structured data. Do not deploy, commit or push.

## Validation results — September 14, 2026

- Production build succeeds with static output for `/`, `/robots.txt`, and `/sitemap.xml`. First-load JavaScript is 112 kB, down from 151 kB (about 26%). The page-specific bundle is 9.38 kB, down from 48.7 kB. These local builds omit Vercel-only analytics; the original baseline included those components.
- TypeScript and ESLint validation pass. Original JSX sections were migrated to typed server components. Only navigation/theme and visual enhancement need client components. Five unused animation/icon/particle packages were removed, along with their unused dependencies.
- The displayed portrait is a 480×480 WebP, 9,512 bytes versus the original PNG's 965,609 bytes. Original image, logo, favicon and resume URLs are retained. The original portrait is not requested by the redesigned page.
- Lighthouse 13.4.1 local production audit: mobile performance **95**, accessibility **100**, best practices **100**, SEO **100**. Mobile LCP 2.3 s, total blocking time 200 ms, CLS 0. Desktop: **100/100/100/100**, LCP 0.5 s, total blocking time 0 ms, CLS 0. These are lab results; production hosting, analytics, traffic and devices affect real Core Web Vitals. An earlier mobile run scored 98; normal run-to-run variation is expected.
- Automated axe WCAG A/AA checks pass in dark and light themes. Browser checks cover mobile navigation, Escape and focus return, section focus, persisted theme preference, project case study disclosures and all five additional projects.
- No horizontal overflow at 320, 360, 390, 600, 768, 899, 900, 1024, 1280, 1440 and 1920 pixels. Desktop, mobile, light theme and menu screenshots were reviewed.
- Reduced-motion mode disables pointer transformation and smooth scrolling. SVG remains usable without WebGL. With JavaScript disabled, the portfolio content, native mobile menu and all nine projects remain usable. Native disclosure semantics report expansion without relying on JavaScript-updated ARIA.
- Additional browser checks pass for the keyboard skip link, desktop pointer response, reset on pointer leave, live changes to reduced-motion preferences, and theme switching when localStorage is blocked. Failed optional visual-chunk loading leaves the static SVG available.
- All seven original section anchors resolve. Resume response is a valid PDF; original public assets, robots, sitemap and new social image return 200. An unknown page returns 404. Static HTML includes all project and experience content, valid JSON-LD, one H1 and the preserved canonical. No accidental noindex or robots blocking was introduced.
- No browser runtime exceptions, console errors or hydration errors were observed. Local regression measurements reported CLS 0 and unthrottled LCP under one second; these do not replace Lighthouse or field data.
- Browser reports and screenshots are in the ignored `qa/` folder. Reproduction commands are in the README. No Git commit, push or deployment was performed.

## Content and external verification notes

- The existing resume confirms Computer Science studies at BUITEMS, with graduation expected in December 2026. About now includes this information and does not claim graduation has occurred. The resume itself is unchanged.
- **Review item:** the original website says “Gen AI Backend Developer” at Emumba, while the resume says “GenAI Engineer Intern” for January–March 2026. The existing portfolio title has been retained pending the owner's choice; no new title was invented.
- All nine original website projects remain available. No missing project repositories or demos were invented. Architecture diagrams are conceptual explanations of existing descriptions, not claims of additional technologies. The self-rated skill percentages, decorative summary counters, and dataset preparation percentage were omitted.
- GitHub and both client site URLs were checked via read-only web requests. Healing Hands redirects to its `www` hostname. The automated LinkedIn fetch was unavailable, so its original URL is preserved but live profile access needs manual verification. Email and WhatsApp destinations are preserved; no message was sent and delivery was not tested.
- The contact section intentionally uses working email/social links because the original form had no message-delivery integration. A future form would need a real delivery provider and error handling before presenting a success state.

## Review revisions — September 14, 2026

- Reduced desktop hero top padding from 84 to 28 px and main section padding from 99 to 60 px, with corresponding tablet/mobile reductions. The hero visual also uses a smaller height.
- Removed the portrait grayscale filter; the original colours are displayed.
- All nine projects are visible by default. Only the optional in-depth case study content remains expandable.
- Added verified View code links for Developer Portfolio and Snake Game Arcade, plus visible live-site links for both client projects. The GitHub public API was checked; no direct repository links were invented for unmatched projects, as explicitly requested by the owner.
- Added a shared SVG architectural field with layered contours, structural lines, subtle node detail and two moving signals. Detail is strongest at the edges, with a quiet central reading area. No canvas loop, textures, WebGL or additional animation dependency is needed.
- The hero now has slow automatic movement independent of pointer input, with pointer movement layered on top. Observers pause CSS animation offscreen, in hidden tabs, and on reduced-motion, mobile, data-saving or low-power devices.
- Theme changes crossfade using native View Transitions, with a colour-transition fallback and reduced-motion support.
- Browser verification confirms idle movement without cursor input, offscreen pause, live reduced-motion changes, mobile/low-power fallbacks, animated theme switching, colour portrait, all nine projects visible, verified repository destinations, and no horizontal overflow at the eleven tested widths. Production build, lint and TypeScript pass.

Earlier local Lighthouse run before the portrait-free hero revision: mobile 95 performance / 100 accessibility / 100 best practices / 100 SEO; desktop 100 in all four categories. CLS remains 0 on both. First-load JavaScript is 112 kB. Reports remain in `qa/lighthouse-mobile.report.html` and `qa/lighthouse-desktop.report.html`.


## Portrait-free hero revision — September 14, 2026

- Removed the portrait from the rendered page and Person image metadata at the owner’s request. Original image assets remain available, but are not loaded by the page.
- Replaced the oversized name layout with a compact identity block, a two-line engineering headline and aligned calls to action. About uses a factual profile list instead of a duplicate portrait.
- Replaced the wireframe lattice with three solid CSS 3D computational layers. Automatic desktop motion, optional pointer interaction and reduced-motion/mobile/low-power fallbacks remain. Decorative rings are contained within the scene on narrow screens.
- Production build includes lint and type validation and passes. First-load JavaScript is 106 kB. Browser regression passes for both themes, all nine projects, verified repository links, keyboard navigation, reduced motion, no JavaScript, and eleven viewport widths from 320 to 1920 px. Local measured CLS is 0. Earlier Lighthouse scores above belong to the prior revision.
- An unused neutral headshot experiment remains at `public/asfand-yar-headshot.webp` (7,532 bytes), generated with built-in imagegen from `public/asfand-yar.webp`. It is not displayed. Prompt: preserve the same person, face, expression, hairstyle, beard, round amber glasses, black turtleneck and suit; replace only the yellow background with neutral graphite, crop to head and upper chest, preserve full colour, restrained studio lighting, no text or decoration.
- All changes remain local; no commit, push or deployment.

## Mobile alignment and motion follow-up
- All mobile content sections and footer are centered at widths up to 600 px, including project links, tags and contact links.
- Compute core now supports subtle idle motion on capable mobile devices plus passive, frame-batched scroll tilt while visible. Background remains simplified on mobile; reduced-motion and low-power safeguards remain.
- Verified mobile idle/scroll movement, reduced-motion fallback, no overflow at five widths, lint and TypeScript.


## Scroll interactions
- Added one-time section and card entry animations via IntersectionObserver and Web Animations; static content is never hidden awaiting JavaScript. Mobile uses shorter movement and duration.
- Native scroll-timeline reading progress and restrained desktop card/link hover feedback. Reduced-motion changes cancel reveals and disable progress animation.
- Desktop/mobile browser checks passed for reveals, all nine projects, overflow and reduced motion; TypeScript and lint passed. Local only.


## Bidirectional scroll scenes
- Replaced one-time reveals with native view-timeline scenes: content enters at the viewport edge, stays fully opaque through the reading area, then exits. Scrolling upward reverses the same movement. Older browsers replay entry animations with IntersectionObserver.
- Reduced-motion removes the effect; focused content and printing remain fully visible. No scroll interception or continuously running JavaScript loop.
- Browser checks at 390 and 1440 px confirm entry/exit opacity, full readability in the middle, reverse scrolling, no overflow, and live reduced-motion cleanup. TypeScript and lint passed.


## Intervexa FYP feature
- Added a prominent Final Year Project card before the previous featured pair; all nine earlier projects remain (ten total). Includes a conceptual interview/analysis/feedback flow, expandable technical details, and verified GitHub code link.
- Source: https://github.com/Asfand-Yar-dev/Intervexa README, read via GitHub API. Descriptions reflect repository documentation; no deployment, production-readiness or measured accuracy claims are made.
- Browser checks pass for the link, ten projects, expanded details and five viewport widths; lint and TypeScript pass. Local only.

