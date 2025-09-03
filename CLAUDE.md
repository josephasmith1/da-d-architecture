# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Start development server with Turbopack on port 3000
- `npm run build` - Build production bundle with Turbopack
- `npm start` - Start production server
- `npm run lint` - Run ESLint for code quality checks

### Type Checking
- `npx tsc --noEmit` - Run TypeScript type checking (no dedicated script configured)

## Architecture Overview

This is a Next.js 15 architecture firm website using App Router with the following structure:

### Tech Stack
- **Framework**: Next.js 15 with Turbopack and App Router
- **UI Library**: HeroUI (NextUI fork) with custom theme configuration
- **Styling**: Tailwind CSS v4.1 with HeroUI plugin
- **Forms**: React Hook Form with Zod validation
- **Animation**: Framer Motion
- **Image Handling**: react-photo-album and yet-another-react-lightbox for galleries
- **Maps**: Mapbox GL with react-map-gl wrapper
- **Theme Management**: next-themes for dark mode support

### Data Architecture
- **Static Content**: JSON files in `src/content/` directory
  - Projects stored as individual JSON files in `src/content/projects/`
  - Team data in `src/content/people/team.json`
  - FAQ content in `src/content/faq.json`
- **Type Definitions**: TypeScript types in `src/types/`
- **No Database**: All content is file-based and statically rendered

### Component Organization
- `src/components/common/` - Reusable components (FAQItem, ServiceChip, TeamCard)
- `src/components/forms/` - Form components with React Hook Form integration
- `src/components/layout/` - Layout components (Header, Footer, ThemeToggle)
- `src/components/projects/` - Project-specific components (ProjectCard, ProjectsGrid, galleries)
- `src/components/ui/` - Generic UI wrapper components
- `src/components/fire-mitigation/` - Fire mitigation page specific components

### Routing Structure
All routes use Next.js App Router conventions:
- Static pages: `/about`, `/contact`, `/faq`, `/fire-mitigation`, `/people`, `/projects`
- Dynamic routes: `/projects/[slug]` for individual project pages
- Layout hierarchy: Root layout → Page-specific layouts

### Styling Conventions
- Uses Tailwind CSS classes directly in components
- HeroUI components for consistent UI elements
- Custom theme colors defined in `tailwind.config.js`:
  - Light theme: Black primary (#000000) on light background (#FAFAFA)
  - Dark theme: White primary (#FFFFFF) on dark background (#0A0A0A)
- Responsive design with mobile-first approach
- Framer Motion for animations (especially project showcase infinite scroll)

### Form Handling Pattern
Forms use React Hook Form with Zod schemas:
1. Define Zod schema for validation
2. Use `useForm` hook with `zodResolver`
3. Implement FormField components with HeroUI Input components
4. Handle submission with loading states

### Image Management
- Project images stored in `public/projects/[project-name]/`
- Responsive image handling with Next.js Image component
- Gallery implementation using react-photo-album with lightbox functionality
- Cover images referenced by filename (without extension) in project JSON files

### TypeScript Configuration
- Strict mode enabled
- Path alias `@/*` maps to `./src/*`
- Target ES2017 with modern lib features
- Module resolution set to bundler for optimal Next.js compatibility