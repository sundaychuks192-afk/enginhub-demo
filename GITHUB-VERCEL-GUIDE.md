# EngiHub: GitHub → Vercel phone checklist

## 1. Extract the ZIP
Unzip the EngiHub project.

You want the project files themselves, not a ZIP nested inside GitHub.

At the repository root you should see:
- package.json
- index.html
- vite.config.js
- vercel.json
- src/
- README.md

## 2. GitHub
Open GitHub in Chrome Desktop Mode.

Open your EngiHub repository.

Use **Add file → Upload files**.

Select/upload the CONTENTS of the extracted EngiHub folder.

The repository root must contain `package.json`.

Commit the files.

## 3. Vercel
Open Vercel and choose to add/import a new project.

Select the EngiHub GitHub repository.

Vercel should detect Vite.

Build command:
`npm run build`

Output directory:
`dist`

Deploy.

## 4. After the first successful deployment
Do not add Supabase and AI simultaneously.

First confirm:
- Landing page loads.
- Courses open.
- Topic page opens.
- Practice works.
- AI Tutor page opens.
- Workshop page opens.
- Projects page opens.

Then connect Supabase.

## 5. Supabase
Later, create:
- Auth
- profiles
- departments
- courses
- topics
- lessons
- questions
- progress
- projects
- certificates

Then replace the demo service functions with real Supabase calls.

## 6. AI
Later, add a server-side endpoint/function for the AI tutor.

Never put an AI secret key in React frontend code.

## 7. GitHub becomes the source of truth
After deployment, normal workflow is:

Edit code
→ commit/push to GitHub
→ Vercel automatically builds
→ live EngiHub updates
