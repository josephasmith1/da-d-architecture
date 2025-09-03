# DA+D Inc. Architecture Website

A modern architecture firm website built with Next.js 15, HeroUI, and Tailwind CSS v4.1. This website showcases architectural projects with a focus on fire mitigation design and features a responsive, animated interface.

## Features

- Responsive design with mobile navigation
- Dark mode toggle (in progress)
- Project showcase with infinite scroll animation
- Team member profiles (6+ members)
- FAQ section with accordion and comprehensive content (8+ items)
- Contact form with Zod validation
- Fire mitigation information with inline images and CTA
- Project detail pages with Previous/Next navigation
- Image galleries with lightbox functionality
- Loading skeletons for improved UX

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3008](http://localhost:3008) in your browser (port 3000 may be in use)

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
│       ├── bel-air/   # Bel Air project images
│       ├── legend/   # Legend project images
│       ├── marinelli/ # Marinelli project images
│       ├── markups/  # Markups project images
│       └── shia/     # Shia project images
└── styles/            # Global styles
    └── globals.css
```

## Dependencies

- **Next.js 15** with App Router and Turbopack
- **HeroUI** for UI components
- **Tailwind CSS v4.1** for styling with advanced features
- **Framer Motion** for animations
- **React Hook Form** with Zod validation for forms
- **Mapbox GL** for maps
- **next-themes** for dark mode
- **react-photo-album** for image galleries
- **yet-another-react-lightbox** for image lightbox

## Development

This project uses:
- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- Tailwind CSS v4.1 for styling with advanced features like container queries and 3D transforms

All pages are built using HeroUI components with a clean, modern aesthetic focused on showcasing architectural work. The site features responsive design, smooth animations with Framer Motion, and comprehensive project showcases with lightbox galleries.
