# CertiROI - B2B Certification ROI Platform

A complete, fully-functional prototype for CertiROI, a B2B SaaS platform designed for certification providers (AWS, Microsoft, Google) to visualize salary progression, recruiter visibility, and economic outcomes at each stage of certification pathways.

## Features

- **Landing Page**: Targeted at certification providers with hero, problem/solution, and CTA
- **Provider Dashboard**: Real-time analytics with summary cards, funnel visualization, and economic growth charts
- **Certification Pathways**: Complete AWS certification ladder with salary ranges and recruiter demand signals
- **Certification Details**: In-depth salary projections, recruiter visibility, market insights, and performance tiers
- **Talent Pool**: Filtered view of certified candidates with recruiter signal scores
- **Analytics Dashboard**: Drop-off rates, salary uplift analysis, and performance distribution
- **Responsive Design**: Fully responsive across all devices
- **Enterprise UI**: Dark professional theme with Tailwind CSS and custom design system

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Recharts** for data visualization
- **Lucide React** for icons

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will open at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── Layout.tsx          # Main layout wrapper with sidebar
│   ├── Sidebar.tsx         # Navigation sidebar
│   └── StatCard.tsx        # Reusable stat card component
├── pages/
│   ├── LandingPage.tsx     # / - Marketing landing
│   ├── DashboardPage.tsx   # /provider/dashboard - Analytics dashboard
│   ├── PathwaysPage.tsx    # /provider/pathways - Certification ladder
│   ├── CertificationDetailPage.tsx  # /provider/pathways/:id - Detail view
│   ├── TalentPoolPage.tsx  # /provider/talent - Talent search & filter
│   ├── AnalyticsPage.tsx   # /provider/analytics - Provider insights
│   └── NotFoundPage.tsx    # * - 404 page
├── data.ts                 # All hardcoded demo data
├── App.tsx                 # Main app with routing
├── main.tsx                # Entry point
└── index.css               # Global styles
```

## Demo Data

All data is hardcoded and includes:

- **8 AWS Certifications** with different stages and salary ranges
- **10 Mock Candidates** with performance tiers and recruiter signals
- **Analytics Metrics** including dropout rates, salary progression, and demand data
- **Performance Tier System** (Bronze, Silver, Gold)

## Key Pages

### Landing Page (/)
Marketing-focused page targeting certification providers with:
- Hero section with value proposition
- Problem/Solution framework
- CTA buttons to explore the platform

### Provider Dashboard (/provider/dashboard)
Executive summary with:
- 4 KPI summary cards
- Salary progression bar chart
- Recruiter demand line chart
- Pipeline funnel visualization

### Certification Pathways (/provider/pathways)
Complete AWS certification ecosystem showing:
- 8 certification cards with metrics
- Salary ranges and recruiter demand
- Market competitiveness indicators
- Links to detailed views

### Certification Details (/provider/pathways/:id)
Deep dive into individual certifications:
- Salary projection chart
- Recruiter visibility gauge
- Job market insights
- Performance tier explanations
- Quick facts and key metrics

### Talent Pool (/provider/talent)
Searchable candidate database with:
- Real-time search and filtering
- Performance tier badges
- Recruiter signal scoring
- Salary band display
- Completion speed indicators

### Analytics (/provider/analytics)
Provider business intelligence:
- Stage drop-off rates
- Salary uplift analysis
- Performance tier distribution
- Certification-to-employment funnel
- Provider ROI metrics

## Design System

### Colors
- **Primary Gradient**: Cyan → Indigo (career growth)
- **Economic Gradient**: Emerald → Cyan (economic growth)
- **Status Colors**: 
  - Emerald-400: Salary growth, high performers
  - Cyan-400: Recruiter demand
  - Violet-400: Premium/Gold tier
  - Amber-400: Moderate/stable
  - Red-400: Low/declining

### Typography
- **Font**: Inter
- **Sizes**: 14px (xs) → 56px (hero)
- **Weights**: 400 (regular) → 800 (extra bold)

### Components
- Glass morphism effects with backdrop blur
- Smooth animations and transitions
- Responsive grid layouts
- Professional enterprise styling

## Important Notes

- **No Real Authentication**: This is a demo with hardcoded access
- **No Real APIs**: All data is static and embedded
- **No Backend**: Runs completely in the browser
- **Demo Purpose**: Designed to showcase product capability to stakeholders
- **Fully Responsive**: Works on desktop, tablet, and mobile

## Future Enhancements

- Real authentication system
- Backend API integration
- Live salary data from job market APIs
- Recruiter platform integration
- Advanced analytics and reporting
- Export functionality
- Multi-provider support

## License

Demo/Prototype - Not for production use without proper authorization

---

Built with React, TypeScript, and Tailwind CSS | CertiROI © 2026
