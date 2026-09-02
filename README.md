# EngiHub V1 — Redesigned prototype

EngiHub is an engineering education and digital engineering platform: Learn → Understand → Practise → Simulate → Build.

## Run locally

```bash
npm install
npm run dev
```

## Production integration checklist

1. Connect the repository to the existing Vercel project.
2. Add Supabase Auth for production login/signup/session management.
3. Add Supabase Postgres tables for institutions, departments, levels, courses, topics, lessons, questions, users and progress.
4. Add Supabase Storage for lecture notes, PDFs, images and video assets.
5. Put the AI provider behind a secure server/API route; never expose provider secrets in VITE_* variables.
6. Replace demo/localStorage content with the database adapters in `src/services/`.
7. Add the actual PTI curriculum and verified PTI past-question bank.
8. Connect hosted video/audio assets and the physics/3D engine for virtual labs.

The current prototype intentionally uses demo data so the UI can be explored without credentials.

## MVP academic flow update

The MVP now uses the intended academic hierarchy: School → Department → Level → Semester. PTI and Mechanical Engineering ND1 are the active path. ND2/HND1/HND2, other departments, and other listed institutions are presented as Coming Soon. There is no ND3. The Virtual Lab remains platform-wide and is kept separate from the academic course hierarchy so the future multiplayer workshop can be expanded without restructuring the learning flow.

## Supabase production setup

The login now uses real Supabase Auth. Before deploying, add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to Vercel Project Settings → Environment Variables for Production (and Preview if desired), then redeploy. For Google login, enable Google under Supabase Authentication → Providers and configure the Google OAuth client with the production site URL and Supabase callback URL. The app intentionally shows a clear configuration error instead of silently pretending login succeeded when Supabase is not configured.

## Current academic priority

ND1 Mechanical Engineering → Second Semester is the active semester now. First Semester is displayed as a future/upcoming content area and does not block Second Semester access.
