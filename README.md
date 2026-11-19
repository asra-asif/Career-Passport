# Career Passport - TechWiz 7

Career Passport is an interactive career guidance platform built for the TechWiz 7 competition by team **CODE CRASHERS**. The platform guides students, undergraduates, postgraduates, and fresh graduates through career exploration, stream selection, admission coaching, and professional readiness.

## Live Demo
The application is deployed on GitHub Pages:
- **Live URL**: https://asra-asif.github.io/Career-Passport/

## Team Members (CODE CRASHERS)
- **Fatima Aftab** - Team Lead & Vision
- **Zayaan Ahmeed** - Platform Architecture & Innovation
- **Asra Asif** - Content Strategy & Resource Development
- **Insiya Kanwal** - UI/UX Design & User Experience
- **Abdullah Bilal** - User Guidance & Research

## Key Features
- **Role-Based Experience**: Customized paths for School Students, Undergraduates/Postgraduates (UG/PG), and Freshers/Professionals.
- **Career Bank**: Searchable directory of careers with industry filtering, salary sorting, and note-taking bookmarks.
- **Interest Quiz**: Interactive assessment that evaluates user strengths and recommends matching career paths.
- **Multimedia Guidance**: Curated video lectures, audio guides, and learning resources.
- **Success Stories**: Real inspirational stories categorized by professional domain.
- **Resource Library**: Checklists, resume formats, scholarship guides, and external tools.
- **Admission & Coaching**: Stream selection advice, study abroad roadmaps, interview preparation, and resume building tips.
- **Feedback & Contact**: Direct inquiry submission and community testimonials.

## Project Structure
```
MSG-CODE CRASHERS/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Automated GitHub Pages CI/CD workflow
├── Documentation/
│   └── techwizProjectDocumentation.pdf # Complete project documentation
├── Source code/                # React + Vite application
│   ├── public/
│   │   ├── Data/               # JSON datasets (careers, quiz, stories, etc.)
│   │   └── images/             # Static graphics and team photos
│   ├── src/
│   │   ├── components/         # Reusable UI components (Navbar, Header, Footer)
│   │   ├── css/                # Component styles
│   │   ├── Pages/              # Application pages (CareerBank, Quiz, Stories, etc.)
│   │   ├── App.jsx             # Main application orchestrator
│   │   └── main.jsx            # React root mount
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Tech Stack
- **Frontend Framework**: React 18
- **Build Tool**: Vite 7
- **Styling**: Bootstrap 5, Bootstrap Icons, Custom CSS
- **Interactive UI Alerts**: SweetAlert2
- **Icons**: Bootstrap Icons, React Icons, FontAwesome

## Getting Started Locally

### Prerequisites
- Node.js (version 18 or newer)
- npm (version 9 or newer)

### Installation & Run

1. Navigate to the `Source code` folder:
   ```bash
   cd "Source code"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open the local address shown in your terminal (typically `http://localhost:5173/`).

### Production Build
To create an optimized production build:
```bash
npm run build
```
The output files will be generated in `Source code/dist`.
