# EngiHub — Engineering Learning Platform

EngiHub is a visual, school-aware engineering learning platform for courses, summarized lecture notes, practice, PTI past questions, AI-assisted learning, projects and future virtual laboratories.

## What is included
- Supabase email/password authentication and Google OAuth foundation
- Academic setup for institution, department, level and semester
- Visual course and topic experiences
- Supabase-ready course, topic, note, question and progress data model
- Private Supabase Storage bucket for lecture notes
- Real note upload flow from the Engineering Library
- Rich Virtual Lab and Project preview experiences instead of empty placeholder screens
- Responsive student, lecturer and admin surfaces

## Current active academic workspace
Petroleum Training Institute (PTI) → Mechanical Engineering → ND1 → Second Semester.

## Supabase setup
1. Open Supabase SQL Editor.
2. Run `supabase/schema.sql`.
3. In Vercel, add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
4. Add the same variables for Preview/Production as appropriate.
5. Redeploy after changing environment variables.
6. In Supabase Authentication, configure your email confirmation and Google provider if Google sign-in is required.

## Notes
The UI uses polished preview imagery for features that are not yet interactive. A "Coming Soon" label is intentionally paired with a visual preview and explanation so students never land on an empty screen.

The app can still show the built-in curriculum when the content tables are not populated, but production academic content should be created in Supabase and surfaced through `src/services/contentService.js`.
