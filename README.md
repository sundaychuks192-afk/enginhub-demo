# EngiHub

EngiHub is an engineering education and digital engineering platform for engineering students.

## Product vision

**Learn → Understand → Visualize → Practice → Simulate → Diagnose → Design → Build**

The MVP focuses on a strong engineering-learning foundation. Future phases add a secure AI tutor, Supabase-backed accounts/content/progress, virtual practicals, 3D engineering models, fault diagnosis, a virtual engineering workshop, project building, portfolios, skill courses and institutional tools.

## Current MVP

- Engineering-focused landing page
- Student dashboard
- Course/topic structure
- Topic explanation with formulas and real-world application
- Practice questions
- Flashcards
- Login UI ready for Supabase Auth
- Lecturer dashboard/management roadmap
- Admin dashboard/management roadmap
- AI tutor entry point (UI/integration placeholder)
- Virtual engineering workshop roadmap
- Student project area
- Skill courses and certificates roadmap
- Mobile-responsive UI
- Vercel SPA routing configuration
- Provider-independent service layer

## Technology

- React 18
- Vite
- React Router
- GitHub for source control
- Vercel for deployment
- Supabase planned for production authentication/database/storage
- AI provider planned through a secure server-side function

## Important security rule

Never put a secret AI API key in frontend code or in a `VITE_*` variable. AI secrets belong on a server-side function/backend.

## Local development

```bash
npm install
npm run dev
```

Production build check:

```bash
npm run build
```

## GitHub → Vercel workflow

1. Extract this ZIP.
2. Create/open the EngiHub repository on GitHub.
3. Upload the **contents of this project folder**, so `package.json`, `index.html`, `vite.config.js`, `vercel.json`, `src/`, and `public/` (if present) are at the repository root.
4. Commit the files.
5. Open Vercel and import the GitHub repository.
6. Vercel should detect Vite. Build command: `npm run build`. Output directory: `dist`.
7. Deploy.
8. After deployment, connect a custom domain later if desired.

Do not upload the ZIP file itself as the application source. Extract it first and upload the project files.

## Supabase plan

Supabase is not connected in this MVP yet. The service layer is prepared for a later connection.

Likely future data:
- profiles
- departments
- courses
- topics
- lessons
- questions
- progress
- assignments
- projects
- certificates
- AI usage records

When Supabase is added, use Supabase Auth and database security policies. Do not store plaintext passwords.

## AI plan

The AI tutor is intentionally not connected in this ZIP. The frontend has an integration point in `src/services/aiService.js`.

The long-term cost strategy is to pre-create reusable course explanations, summaries, flashcards, questions and worked examples, and use AI mainly for personalized help.

## Project structure

```text
src/
  data/          Demo educational data
  layouts/       Shared application layout
  pages/         Product screens
  services/      Backend/AI integration boundaries
  styles/        Global UI styles
```

## Next development order

1. Put this project on GitHub.
2. Deploy the frontend on Vercel.
3. Replace demo authentication with Supabase Auth.
4. Move course/content/progress data to Supabase.
5. Add a secure server-side AI tutor.
6. Add videos/animations and richer topic content.
7. Build virtual practicals and simulations.
8. Build the virtual engineering workshop.
9. Build the engineering project builder and portfolio.
10. Add premium/institutional features after validating student demand.

## Do not rebuild the entire app unnecessarily

Continue from this foundation. Keep the engineering/blueprint visual identity and add features incrementally.
