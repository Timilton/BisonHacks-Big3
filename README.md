# SkillSprint - Upskilling Platform for Job-Ready Talent

A complete, fully-functional prototype for SkillSprint, a platform that helps people finish upskilling tracks so companies get real, job-ready talent. Learners progress through structured stages, complete courses, and connect with recruiters. Recruiters find verified candidates ready for their roles.

## Features

- **Landing Page**: Marketing-focused intro to SkillSprint platform
- **Learner Journey**: 
  - Structured tracks with stage progression and salary visibility
  - Course completion tracking with scores and skills
  - Skills profile with automatic updates
  - MentorMe AI feature using Gemini for personalized learning plans
  - Inbox for recruiter messages and opportunities
- **Recruiter Features**:
  - Learner database with skill filtering
  - Job center with candidate matching
  - AI-powered candidate recommendations
  - Outreach messaging directly to learners
- **Dark Professional Theme**: Navy blue, green, and blue color scheme
- **Responsive Design**: Fully responsive across all devices

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Google Gemini API** for AI mentoring
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
│   ├── Layout.tsx          # Main layout wrapper
│   ├── Header.tsx          # Navigation header with role selection
│   ├── Sidebar.tsx         # Navigation sidebar
│   └── StatCard.tsx        # Reusable stat card component
├── pages/
│   ├── LandingPage.tsx     # / - Platform marketing
│   ├── LoginPage.tsx       # /login - Simple auth (demo)
│   ├── LearnerTracksPage.tsx   # /learner/tracks - Available tracks
│   ├── TrackDetailPage.tsx     # /learner/tracks/:id - Track progress & stages
│   ├── CoursesPage.tsx         # /learner/courses - Course completion
│   ├── MentorMePage.tsx        # /learner/mentorMe - AI learning plans (Gemini)
│   ├── SkillsProfilePage.tsx   # /learner/skills - Skills dashboard
│   ├── LearnerInboxPage.tsx    # /learner/inbox - Recruiter messages
│   ├── LearnerDatabasePage.tsx # /recruiter/database - Find learners
│   ├── RecruiterJobCenterPage.tsx # /recruiter/jobs - Post jobs & find candidates
│   ├── JobCenterPage.tsx       # /learner/jobs - Job opportunities
│   ├── AnalyticsPage.tsx       # /provider/analytics - Analytics dashboard
│   └── NotFoundPage.tsx        # * - 404 page
├── store/
│   ├── DemoStore.tsx       # Main state management
│   └── AppContext.tsx      # App-level context
├── services/
│   └── gemini.ts           # Google Gemini API integration
├── data.ts                 # Certification data
├── App.tsx                 # Main app with routing
├── main.tsx                # Entry point
└── index.css               # Global styles
```

## Demo Data

Data includes

- **10 AWS Tracks** with 5 stages each
- **25 Mock Learners** with different skill levels and progress
- **30+ Courses** across cloud, DevOps, security, and data domains
- **10 Jobs** from Amazon with skill requirements
- **Performance Tracking** with scores, completions, and skills
- **Salary Ranges** by stage and certification

## Key Pages

### Landing Page (/)
Marketing-focused page with:
- Hero section with value proposition
- Problem/Solution framework
- Feature highlights
- CTA to sign up or explore

### Learner Tracks (/learner/tracks)
Shows available AWS tracks:
- Track cards with progress bars
- Stage information (5 stages per track)
- Start or continue track actions
- Responsive grid layout

### Track Detail (/learner/tracks/:id)
Deep dive into a specific track:
- Current stage and overall progress
- Stage progression ladder
- Certification names for each stage
- Salary ranges per stage
- Course resources
- Check-in and stage completion buttons
- Skills earned at each stage

### Courses (/learner/courses)
Mark courses complete:
- List of available courses
- Score submission
- Track course completion history
- Skills associated with courses

### MentorMe (/learner/mentorMe)
AI-powered learning assistant:
- Generate personalized daily plans using Google Gemini
- Get recommendations based on current progress
- Avoid falling behind with AI insights

### Skills Profile (/learner/skills)
Learner profile dashboard:
- Resume sections (summary, education, experience)
- All earned skills
- Track progress visualization
- Skills automatically update as stages complete

### Learner Inbox (/learner/inbox)
Messages from recruiters:
- View recruiter outreach messages
- See job opportunities
- Formatted message display with timestamps

### Learner Database (/recruiter/database)
Recruiter's view of learners:
- Filter learners by skills
- See learner profiles with skills and progress
- Identify who started your track courses

### Job Center (/recruiter/jobs)
Post jobs and find candidates:
- Create or view open positions
- See qualified candidates for each job
- Candidate matching based on skills and scores
- Send outreach messages directly to learners
- Candidate quality indicators (match %, average score)

## Design System

### Colors
- **Primary Blue**: #4DA3FF (actions, highlights)
- **Dark Navy**: #0B1E3B and #0F274A (backgrounds)
- **Success Green**: #22C55E (positive indicators)
- **Text Light**: #F8FAFC (primary text)
- **Text Muted**: #B6C2D6 (secondary text)

### Typography
- **Font**: Inter
- **Sizes**: 14px (xs) → 56px (hero)
- **Weights**: 400 (regular) → 800 (extra bold)

### Components
- Dark professional theme
- Smooth animations and transitions
- Responsive layouts
- Glassmorphic effects with borders

## Demo Flow

The ideal demo flow (0-90 seconds):

1. **Landing Page** (0:00-0:08): Show value proposition
2. **Login/Role Selection** (0:08-0:18): Login as learner, select role
3. **Learner Journey** (0:18-0:45):
   - Tracks: View available AWS Cloud Developer track
   - Courses: Mark a course complete with score
   - MentorMe: Generate AI learning plan
   - Skills Profile: Show updated skills
4. **Recruiter View** (0:45-1:12):
   - Switch to recruiter role
   - Learner Database: See learners
   - Job Center: View job with matched candidates
   - Send Outreach: Message top candidate
5. **Close** (1:12-1:30): Show how it connects talent to jobs

## Important Notes

- **Demo Environment**: Hardcoded data for presentation
- **No Real Authentication**: Simple login for demo purposes
- **No Backend**: Runs completely in the browser
- **API Integration**: Google Gemini API for MentorMe feature
- **Fully Responsive**: Works on desktop, tablet, and mobile

## Environment Variables

Create a `.env.local` file (optional, has fallback):

```
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

## Future Enhancements

- Real authentication system with auth0/firebase
- Backend API for persistent data
- Live job market data integration
- Advanced recruiter analytics
- Batch candidate outreach
- Mobile app
- Multi-language support

## License

Demo/Prototype - Not for production use without proper authorization

---

Built with React, TypeScript, Tailwind CSS, and Google Gemini | SkillSprint © 2026
