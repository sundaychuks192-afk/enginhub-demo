-- EngiHub production content foundation
-- Run this in Supabase SQL Editor before uploading real course notes.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  institution text,
  department text,
  level text,
  semester text,
  role text not null default 'student' check (role in ('student','lecturer','admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  code text not null,
  name text not null,
  description text,
  institution text not null,
  department text not null,
  level text not null,
  semester text not null,
  image_url text,
  created_at timestamptz not null default now(),
  unique(code, institution, department, level, semester)
);

create table if not exists public.topics (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  title text not null,
  slug text not null,
  summary text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  unique(course_id, slug)
);

create table if not exists public.notes (
  id uuid primary key default gen_random_uuid(),
  course_id uuid references public.courses(id) on delete set null,
  topic_id uuid references public.topics(id) on delete set null,
  title text not null,
  description text,
  file_path text,
  file_url text,
  file_type text,
  uploaded_by uuid not null references auth.users(id) on delete cascade,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.questions (
  id uuid primary key default gen_random_uuid(),
  course_id uuid references public.courses(id) on delete cascade,
  topic_id uuid references public.topics(id) on delete cascade,
  difficulty text check (difficulty in ('Easy','Medium','Hard','Challenge')),
  question text not null,
  options jsonb,
  answer text,
  explanation text,
  source text,
  source_year integer,
  created_at timestamptz not null default now()
);

create table if not exists public.student_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  topic_id uuid references public.topics(id) on delete cascade,
  progress integer not null default 0 check (progress between 0 and 100),
  updated_at timestamptz not null default now(),
  unique(user_id, topic_id)
);

alter table public.profiles enable row level security;
alter table public.courses enable row level security;
alter table public.topics enable row level security;
alter table public.notes enable row level security;
alter table public.questions enable row level security;
alter table public.student_progress enable row level security;

-- Readable academic content for signed-in users.
drop policy if exists "authenticated read courses" on public.courses;
create policy "authenticated read courses" on public.courses for select to authenticated using (true);
drop policy if exists "authenticated read topics" on public.topics;
create policy "authenticated read topics" on public.topics for select to authenticated using (true);
drop policy if exists "authenticated read published notes" on public.notes;
create policy "authenticated read published notes" on public.notes for select to authenticated using (is_published = true or uploaded_by = auth.uid());
drop policy if exists "authenticated read questions" on public.questions;
create policy "authenticated read questions" on public.questions for select to authenticated using (true);

create policy "users read own profile" on public.profiles for select to authenticated using (id = auth.uid());
create policy "users insert own profile" on public.profiles for insert to authenticated with check (id = auth.uid());
create policy "users update own profile" on public.profiles for update to authenticated using (id = auth.uid()) with check (id = auth.uid());
create policy "users read own progress" on public.student_progress for select to authenticated using (user_id = auth.uid());
create policy "users write own progress" on public.student_progress for insert to authenticated with check (user_id = auth.uid());
create policy "users update own progress" on public.student_progress for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "users upload notes" on public.notes for insert to authenticated with check (uploaded_by = auth.uid());

-- Storage bucket for lecture notes. Keep files private; generate signed URLs in the app when needed.
insert into storage.buckets (id, name, public) values ('engihub-notes', 'engihub-notes', false) on conflict (id) do nothing;

drop policy if exists "authenticated note upload" on storage.objects;
create policy "authenticated note upload" on storage.objects for insert to authenticated with check (bucket_id = 'engihub-notes' and (storage.foldername(name))[1] = auth.uid()::text);
drop policy if exists "authenticated note read" on storage.objects;
create policy "authenticated note read" on storage.objects for select to authenticated using (bucket_id = 'engihub-notes');

-- Starter curriculum for the currently active academic workspace.
insert into public.courses (code,name,description,institution,department,level,semester,image_url) values
('MEC 124','Engineering Mechanics II','Motion, force systems and engineering applications.','Petroleum Training Institute (PTI)','Mechanical Engineering','ND1','Second Semester','https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=85'),
('MEC 125','Machine Tools & Practice','Machine tools, workshop processes and safe practice.','Petroleum Training Institute (PTI)','Mechanical Engineering','ND1','Second Semester','https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=85'),
('MEC 126','Workshop Technology','Materials, fabrication and workshop technology.','Petroleum Training Institute (PTI)','Mechanical Engineering','ND1','Second Semester','https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=1200&q=85'),
('MEC 127','Technical Drawing II','Engineering drawing, standards and visual communication.','Petroleum Training Institute (PTI)','Mechanical Engineering','ND1','Second Semester','https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=85')
on conflict (code,institution,department,level,semester) do nothing;
