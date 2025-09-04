# DA+D Architecture Website

A modern architecture firm website built with Next.js 15, featuring responsive design, parallax animations, and comprehensive project galleries. The site showcases architectural projects with a focus on contemporary design and fire mitigation expertise.

## Features

- ✨ Responsive design optimized for all devices
- 🌙 Dark/Light mode theme toggle
- 🎨 Animated project showcase with infinite scroll
- 👥 Team member profiles
- ❓ Comprehensive FAQ section with accordion
- 📧 Contact form with validation (React Hook Form + Zod)
- 🔥 Fire mitigation expertise showcase
- 🖼️ Project galleries with lightbox functionality
- ⚡ Loading skeletons for optimal UX
- 📍 Interactive maps with Mapbox GL
- 🚀 Fast performance with Next.js 15 and Turbopack

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/                 # Next.js app router pages
│   ├── about/          # About page
│   ├── contact/        # Contact page with form
│   ├── faq/            # FAQ page with accordion
│   ├── fire-mitigation/ # Fire mitigation information page
│   ├── people/         # Team members page
│   ├── projects/       # Projects showcase
│   │   └── [slug]/     # Individual project details
│   ├── layout.tsx      # Root layout
│   ├── page.tsx       # Home page
│   └── providers.tsx  # Theme providers
├── components/         # React components
│   ├── common/        # Shared components (FAQItem, ServiceChip, TeamCard)
│   ├── fire-mitigation/ # Fire mitigation specific components
│   ├── forms/         # Form components (ContactForm, FormField)
│   ├── layout/        # Layout components (Footer, Header, ThemeToggle)
│   ├── projects/      # Project-related components (ProjectCard, ProjectsGrid, etc.)
│   └── ui/            # Generic UI components (Section)
├── content/           # JSON content files
│   ├── faq.json       # FAQ content
│   ├── people/team.json # Team member content
│   └── projects/      # Project JSON files
├── public/            # Static assets
│   └── projects/      # Project images organized by project
│       ├── contemporary-residence/    # Contemporary Residence images
│       ├── legend/                   # Legend project images
│       ├── markups/                  # Markups project images
│       ├── modern-luxury-residence/  # Modern Luxury Residence images
│       └── shia/                     # Shia project images
└── styles/            # Global styles
    └── globals.css
```

## Tech Stack

### Core Framework
- **Next.js 15** - React framework with App Router and Turbopack
- **TypeScript** - Type-safe development
- **React 19** - Latest React features

### UI & Styling
- **HeroUI** - Modern UI component library (NextUI fork)
- **Tailwind CSS v4.1** - Utility-first CSS with advanced features
- **Framer Motion** - Production-ready animation library
- **next-themes** - Theme management with dark mode support

### Forms & Validation
- **React Hook Form** - Performant forms with minimal re-renders
- **Zod** - TypeScript-first schema validation

### Galleries & Media
- **react-photo-album** - Responsive photo galleries
- **yet-another-react-lightbox** - Modern lightbox component
- **Mapbox GL** - Interactive maps with react-map-gl

## Development Commands

```bash
npm run dev      # Start development server with Turbopack
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
npx tsc --noEmit # Type checking
```

## Project Highlights

- **Static Site Generation** - All content is pre-rendered at build time for optimal performance
- **File-based Content** - JSON-based content management system
- **Responsive Design** - Mobile-first approach with fluid layouts
- **Accessibility** - WCAG compliant with semantic HTML and ARIA labels
- **SEO Optimized** - Meta tags, Open Graph, and structured data
- **Performance** - Optimized images, code splitting, and lazy loading

## Deployment

The site is deployed on Vercel and automatically deploys on push to main branch.

Live site: [da-d-architecture.vercel.app](https://da-d-architecture.vercel.app)
