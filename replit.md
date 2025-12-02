# Overview

Beethoven (formerly LibreShield) is a comprehensive privacy protection and cybersecurity education platform built with React, TypeScript, and Vite. The application provides users with privacy assessments, security recommendations, educational tools, a curated directory of privacy-focused applications, and extensive documentation. It features a multi-language interface (Spanish and English), dynamic theming, and interactive educational components.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

**Single-Page Application (SPA) Pattern**
- Built with React 19.2.0 using functional components and hooks
- Client-side routing via React Router DOM 7.9.6 using HashRouter for static deployment compatibility
- TypeScript for type safety and improved developer experience
- Fully client-side - no backend required

**State Management**
- Context API (`AppContext`) serves as the primary state management solution
- Centralized user profile, theme preferences, language settings, and localization
- LocalStorage persistence for:
  - User profile (assessment responses)
  - Theme & color preferences
  - Language selection
  - Assessment history (up to 50 records with timestamp & score)
- No external state management libraries (Redux, Zustand) - keeping dependencies minimal

**Component Architecture**
- Page-based routing structure with dedicated components for each feature
- Layout component wrapping all routes with navigation, theme controls, and global UI elements
- Separation of concerns between presentational and container components

## Styling and Theming

**Tailwind CSS via CDN**
- Runtime Tailwind configuration loaded from CDN
- Custom theme extension with dynamic primary color system using CSS variables
- Dark mode support using `class`-based strategy
- **10 pre-defined color palettes** (teal, blue, violet, rose, amber, cyan, indigo, emerald, fuchsia, orange) selectable at runtime
- Responsive design with mobile-first approach

**Dynamic Theming Implementation**
- CSS custom properties injected into document root for primary color palette
- RGB color values stored in context and applied via inline styles
- Theme and color preferences persisted to localStorage
- Smooth transitions between theme changes

## Internationalization (i18n)

**Custom Translation System**
- No external i18n library - custom implementation in `/data/locales.ts`
- Translation objects keyed by language code (`es`, `en`)
- Nested translation structure organized by feature/component
- Context-based translation function `t()` for accessing localized strings
- Spanish and English support fully implemented

## Key Features

**Privacy Assessment System**
- Multi-step questionnaire collecting user's digital habits
- Scoring algorithm analyzing platforms, browsers, password practices, update habits, etc.
- Dynamic recommendation generation based on user profile
- Results page with actionable security improvements
- **Export functionality**: Download assessment as JSON (backup) or TXT report (sharing)
- **Assessment History**: Track previous assessments with scores and timestamps

**Privacy Tools Suite**
- Password generator with customizable options
- Secure note encryptor/decryptor using Web Crypto API
- Privacy analyzer checking browser fingerprinting resistance, ad blockers, etc.
- Email alias generator for privacy-focused email practices
- QR code generator for secure information sharing
- Various privacy checkers (DNS leak, WebRTC, geolocation)

**Educational Components**
- Phishing simulator with interactive scenarios testing user recognition skills
- Image metadata lab for stripping EXIF data from photos
- Privacy Hub - curated directory of privacy-respecting applications
- Comprehensive documentation system with 14+ articles on cybersecurity topics
- FAQ section with collapsible answers
- Stories page explaining the project's mission and philosophy

**UI Innovations**
- Custom UI inspector mode for development/debugging
- Interactive canvas backgrounds with particle effects
- Animated components with fade-in effects
- Responsive navigation with mobile menu support

## External Dependencies

**Core Framework**
- React 19.2.0 - UI framework
- React DOM 19.2.0 - DOM rendering
- React Router DOM 7.9.6 - Client-side routing

**UI and Icons**
- Lucide React 0.554.0 - Icon library
- Tailwind CSS (CDN) - Utility-first CSS framework
- Google Fonts (Inter) - Typography

**Build Tools**
- Vite 6.2.0 - Build tool and dev server
- @vitejs/plugin-react 5.0.0 - React integration for Vite
- TypeScript 5.8.2 - Type checking and compilation

**Browser APIs**
- Web Crypto API - For secure encryption/decryption
- LocalStorage API - For persisting user preferences
- Canvas API - For interactive backgrounds and QR code generation
- Geolocation API - For privacy checks
- WebRTC - For leak detection

## Infrastructure

**Pure Client-Side Application**
- No backend or database required
- All data stored in browser localStorage
- Fully functional offline after initial load
- Can be deployed to any static hosting service

## Scripts

```json
"dev": "vite",           // Start dev server (port 5000)
"build": "vite build",   // Build for production
"preview": "vite preview"// Preview production build
```

## File Structure

```
/
├── App.tsx                    # Main app with routing
├── components/
│   ├── Layout.tsx            # Main layout with navigation
│   └── ... (other components)
├── pages/
│   ├── Home.tsx
│   ├── Tools.tsx
│   ├── Assessment.tsx
│   ├── Results.tsx
│   └── ... (other pages)
├── context/
│   └── AppContext.tsx        # Global state management
├── data/
│   └── locales.ts           # All translations (ES + EN)
└── types.ts                 # TypeScript types
```

## Recent Changes (December 1, 2025)

### 🎵 Mega-Update Session
1. **FAQs Massively Extended** - 22 Q&A pairs (each language) covering all Beethoven aspects, pricing, data storage, features, contributions, roadmap
2. **Legal Documents Fully Expanded** 
   - Terms of Use: 10 detailed sections (acceptance, educational nature, acceptable use, disclaimers, IP, changes, termination, applicable law)
   - Privacy Policy: 12 detailed sections (data collection, local processing, no third-parties, GDPR/CCPA compliance, contact)
3. **Color Themes Expanded** - 10 themes total: teal, blue, violet, rose, amber, cyan, indigo, emerald, fuchsia, orange
4. **Assessment Export** - Results can be exported as JSON (for backup/sharing) or TXT report
5. **Assessment History** - localStorage persistence of assessment records (score + timestamp) - max 50 records
6. **Removed Backend Dependencies** - Cleaned up for pure static deployment
7. **Fixed TypeScript Issues** - All LSP diagnostics resolved
8. **Optimized for Netlify** - Pure client-side application
9. **Extended Documentation** - 14+ comprehensive articles on cybersecurity

## Development Setup

**Prerequisites:**
- Node.js 18+

**Setup:**
```bash
npm install
npm run dev
```

**Access:**
- Frontend: http://localhost:5000

## Deployment (Netlify / Vercel / Static Hosting)

**Configuration:**
- Build command: `npm run build`
- Publish directory: `dist`
- No environment variables required
- HashRouter ensures routing works on static hosts

**Deployment Steps:**
1. Run `npm run build` locally to verify
2. Connect repository to Netlify/Vercel
3. Set build command to `npm run build`
4. Set publish directory to `dist`
5. Deploy!

The app will work perfectly on any static hosting platform.
